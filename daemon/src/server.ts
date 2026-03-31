import http from "http";
import fs from "fs";
import path from "path";
import os from "os";
import { WebSocketServer, WebSocket } from "ws";
import { getAllTadpoles } from "./lib/bufo";
import { sendText, sendSignal, getSessionSize, captureSession } from "./applescript";
import { startPolling, stopPolling, stopAllPolling } from "./poller";
import { runCleanup } from "./cleanup";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const PORT = parseInt(process.env.PORT ?? "7373", 10);
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const LOG_DIR = process.env.BUFO_LOG_DIR
  ? path.resolve(process.env.BUFO_LOG_DIR)
  : path.join(os.homedir(), ".bufo", "logs");

// Ensure log directory exists (best effort)
try { fs.mkdirSync(LOG_DIR, { recursive: true }); } catch { /* ignore */ }

// ---------------------------------------------------------------------------
// Session ID validation
// ---------------------------------------------------------------------------

// Real iTerm2 session IDs have the form "w<N>t<N>p<N>:<UUID>".
// Validating before any file I/O prevents path traversal attacks where a
// malicious client sends a sessionId like "../../etc/passwd".
const SESSION_ID_RE =
  /^w\d+t\d+p\d+:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/;

function isValidSessionId(id: string): boolean {
  return SESSION_ID_RE.test(id);
}

// Cache static assets at startup to avoid blocking the event loop on each
// request. All three files are build artifacts that do not change while the
// server runs. Buffer is used for the JS/CSS files so binary-safe bytes are
// preserved; index.html is kept as a string for a minor convenience.
const indexHtmlPath = path.join(PUBLIC_DIR, "index.html");
let indexHtmlCache: string | null = null;
try {
  indexHtmlCache = fs.readFileSync(indexHtmlPath, "utf-8");
} catch { /* will serve 500 on request if cache is null */ }

const xtermBundlePath = path.join(PUBLIC_DIR, "xterm-bundle.js");
let xtermBundleCache: Buffer | null = null;
try {
  xtermBundleCache = fs.readFileSync(xtermBundlePath);
} catch { /* served as 404 if missing — run `npm run build` */ }

const xtermCssPath = path.join(PUBLIC_DIR, "xterm.css");
let xtermCssCache: Buffer | null = null;
try {
  xtermCssCache = fs.readFileSync(xtermCssPath);
} catch { /* served as 404 if missing — run `npm run build` */ }

// ---------------------------------------------------------------------------
// Message types (Client → Server)
// ---------------------------------------------------------------------------

interface ListTadpolesMsg {
  type: "list_tadpoles";
}

interface SubscribeMsg {
  type: "subscribe";
  sessionId: string;
}

interface UnsubscribeMsg {
  type: "unsubscribe";
  sessionId: string;
}

interface InputMsg {
  type: "input";
  sessionId: string;
  text: string;
}

interface SignalMsg {
  type: "signal";
  sessionId: string;
  signal: "SIGINT" | "SIGTSTP";
}

type ClientMessage =
  | ListTadpolesMsg
  | SubscribeMsg
  | UnsubscribeMsg
  | InputMsg
  | SignalMsg;

// ---------------------------------------------------------------------------
// Per-connection state
// ---------------------------------------------------------------------------

interface ConnectionState {
  subscribedSessions: Set<string>;
}

const connState = new WeakMap<WebSocket, ConnectionState>();

// ---------------------------------------------------------------------------
// Cleanup interval (log retention)
// ---------------------------------------------------------------------------

let cleanupInterval: ReturnType<typeof setInterval> | undefined;

// ---------------------------------------------------------------------------
// Tailscale IP detection
// ---------------------------------------------------------------------------

// Tailscale always assigns addresses in the 100.64.0.0/10 CGNAT range.
// We detect it by scanning network interfaces for an IPv4 address starting
// with "100." — no shell calls needed.
function detectTailscaleIP(): string | null {
  const nets = os.networkInterfaces();
  for (const iface of Object.values(nets)) {
    for (const addr of iface ?? []) {
      if (addr.family === "IPv4" && addr.address.startsWith("100.")) {
        return addr.address;
      }
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Shared HTTP request handler
// ---------------------------------------------------------------------------

// Explicit allowlist of servable paths → { contentType, cache }.
// Nothing outside this map is ever read from disk, preventing path traversal
// via the HTTP server itself.
interface StaticEntry { contentType: string; cache: () => Buffer | string | null; }
function staticFiles(): Record<string, StaticEntry> {
  return {
    "/":                { contentType: "text/html; charset=utf-8",  cache: () => indexHtmlCache },
    "/xterm-bundle.js": { contentType: "application/javascript",    cache: () => xtermBundleCache },
    "/xterm.css":       { contentType: "text/css",                  cache: () => xtermCssCache },
  };
}

function handleRequest(req: http.IncomingMessage, res: http.ServerResponse): void {
  const url = req.url ?? "/";
  const pathname = url.split("?")[0];

  if (req.method !== "GET") {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
    return;
  }

  const entry = staticFiles()[pathname];
  if (!entry) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
    return;
  }

  const data = entry.cache();
  if (data === null) {
    res.writeHead(503, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Web UI assets are missing. Re-run the bufo installer with: bufo install");
    return;
  }

  res.writeHead(200, { "Content-Type": entry.contentType });
  res.end(data);
}

// ---------------------------------------------------------------------------
// Shared WebSocket helpers
// ---------------------------------------------------------------------------

function send(ws: WebSocket, payload: unknown): void {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(payload));
  }
}

function sendError(ws: WebSocket, message: string): void {
  send(ws, { type: "error", message });
}

function handleConnection(ws: WebSocket, wss: WebSocketServer): void {
  const state: ConnectionState = { subscribedSessions: new Set() };
  connState.set(ws, state);

  console.log(`[ws] client connected (total: ${wss.clients.size})`);

  ws.on("message", async (raw) => {
    let msg: ClientMessage;
    try {
      msg = JSON.parse(raw.toString()) as ClientMessage;
    } catch {
      sendError(ws, "Invalid JSON");
      return;
    }

    switch (msg.type) {
      case "list_tadpoles": {
        try {
          const { projects, tadpoles } = getAllTadpoles();
          send(ws, { type: "tadpoles", data: tadpoles, projects });
        } catch (err) {
          sendError(ws, `Failed to list tadpoles: ${String(err)}`);
        }
        break;
      }

      case "subscribe": {
        const { sessionId } = msg;
        if (!sessionId) { sendError(ws, "subscribe: missing sessionId"); return; }
        if (!isValidSessionId(sessionId)) { sendError(ws, "subscribe: invalid sessionId"); return; }

        state.subscribedSessions.add(sessionId);

        // Fetch terminal dimensions and current screen content in parallel.
        let size, snapshot;
        try {
          [size, snapshot] = await Promise.all([
            getSessionSize(sessionId),
            captureSession(sessionId),
          ]);
        } catch (err) {
          console.error(`[ws] Failed to initialize session ${sessionId}:`, err);
          sendError(ws, "Failed to initialize session");
          break;
        }

        // Check if the log file exists to determine mode.
        const logPath = path.join(LOG_DIR, `${sessionId}.log`);
        const modeHint: "ansi" | "plaintext" = fs.existsSync(logPath) ? "ansi" : "plaintext";

        // Send subscribed first so the client resets and fits the terminal.
        send(ws, { type: "subscribed", sessionId, mode: modeHint, ...(size ?? {}) });

        // In plaintext mode, send the current screen as a plain-text snapshot.
        // In ANSI mode we do NOT send a plain-text snapshot — the log watcher
        // replays a tail of recent PTY bytes (INITIAL_TAIL_BYTES) so xterm.js
        // reconstructs the correct screen state from the raw ANSI stream.
        // Mixing a plain-text snapshot with a subsequent ANSI stream causes
        // cursor-movement sequences (e.g. \x1b[A, \x1b[2K) in the stream to
        // erase lines from the snapshot because the cursor positions don't match.
        if (modeHint === "plaintext" && snapshot) {
          const clean = snapshot.replace(/(\s*\n)+$/, "").trimEnd();
          if (clean) {
            send(ws, { type: "output", sessionId, content: clean });
          }
        }

        // Start polling — in ANSI mode the log watcher replays a recent tail
        // of PTY bytes for initial context, then streams new bytes as they arrive.
        const mode = startPolling(
          sessionId,
          LOG_DIR,
          // ANSI chunk callback — chunk is base64-encoded raw PTY bytes
          (sid, chunk) => {
            const s = connState.get(ws);
            if (s?.subscribedSessions.has(sid)) {
              send(ws, { type: "output", sessionId: sid, chunk });
            }
          },
          // Plaintext content callback
          (sid, content) => {
            const s = connState.get(ws);
            if (s?.subscribedSessions.has(sid)) {
              send(ws, { type: "output", sessionId: sid, content });
            }
          },
          // Mode upgrade callback — fired when a log file appears for a
          // session that started in plaintext mode
          (sid) => {
            const s = connState.get(ws);
            if (s?.subscribedSessions.has(sid)) {
              send(ws, { type: "mode_upgrade", sessionId: sid, mode: "ansi" });
            }
          }
        );

        console.log(`[ws] subscribed to session ${sessionId} (mode: ${mode})`);
        break;
      }

      case "unsubscribe": {
        const { sessionId } = msg;
        if (!sessionId) { sendError(ws, "unsubscribe: missing sessionId"); return; }
        if (!isValidSessionId(sessionId)) { sendError(ws, "unsubscribe: invalid sessionId"); return; }

        state.subscribedSessions.delete(sessionId);
        stopPolling(sessionId);
        console.log(`[ws] unsubscribed from session ${sessionId}`);
        break;
      }

      case "input": {
        const { sessionId, text } = msg;
        if (!sessionId) { sendError(ws, "input: missing sessionId"); return; }
        if (!isValidSessionId(sessionId)) { sendError(ws, "input: invalid sessionId"); return; }
        if (typeof text !== "string") { sendError(ws, "input: text must be a string"); return; }

        try {
          await sendText(sessionId, text);
        } catch (err) {
          sendError(ws, `Failed to send input: ${String(err)}`);
        }
        break;
      }

      case "signal": {
        const { sessionId, signal } = msg;
        if (!sessionId) { sendError(ws, "signal: missing sessionId"); return; }
        if (!isValidSessionId(sessionId)) { sendError(ws, "signal: invalid sessionId"); return; }
        if (signal !== "SIGINT" && signal !== "SIGTSTP") {
          sendError(ws, `signal: unknown signal "${String(signal)}"`);
          return;
        }

        try {
          await sendSignal(sessionId, signal);
        } catch (err) {
          sendError(ws, `Failed to send signal: ${String(err)}`);
        }
        break;
      }

      default: {
        sendError(ws, `Unknown message type: ${(msg as { type: string }).type}`);
      }
    }
  });

  ws.on("close", () => {
    const s = connState.get(ws);
    if (s) {
      for (const sessionId of s.subscribedSessions) {
        stopPolling(sessionId);
      }
      s.subscribedSessions.clear();
    }
    console.log(`[ws] client disconnected (total: ${wss.clients.size})`);
  });

  ws.on("error", (err) => {
    console.error(`[ws] error: ${err.message}`);
  });
}

// ---------------------------------------------------------------------------
// Server factory — one HTTP + WS pair per bound interface
// ---------------------------------------------------------------------------

interface ServerPair {
  httpServer: http.Server;
  wss: WebSocketServer;
}

function createServerPair(host: string): ServerPair {
  const httpServer = http.createServer(handleRequest);
  const wss = new WebSocketServer({
    server: httpServer,
    path: "/ws",
    // Reject cross-origin WebSocket upgrade requests.  A malicious web page
    // served from any origin could otherwise connect to the daemon and send
    // arbitrary commands to iTerm2 (CSRF via WebSocket).
    //
    // Allowed:
    //   • No Origin header  — non-browser clients (CLI tools, curl) are fine.
    //   • http://<host>:PORT — the daemon's own web UI on any bound interface.
    //   • http://localhost:PORT / http://127.0.0.1:PORT — common aliases.
    verifyClient: ({ req }: { req: http.IncomingMessage }) => {
      const origin = req.headers["origin"];
      if (!origin) return true; // non-browser client — allow
      const allowed = new Set([
        `http://127.0.0.1:${PORT}`,
        `http://localhost:${PORT}`,
        `http://${host}:${PORT}`,
      ]);
      return allowed.has(origin);
    },
  });
  wss.on("connection", (ws) => handleConnection(ws, wss));
  httpServer.listen(PORT, host, () => {
    console.log(`[bufo-daemon] listening on http://${host}:${PORT}`);
  });
  return { httpServer, wss };
}

// ---------------------------------------------------------------------------
// Start — bind to localhost, and Tailscale interface if present
// ---------------------------------------------------------------------------

const servers: ServerPair[] = [createServerPair("127.0.0.1")];

const tailscaleIP = detectTailscaleIP();
if (tailscaleIP) {
  servers.push(createServerPair(tailscaleIP));
  console.log(`[bufo-daemon] Tailscale interface detected — also bound to ${tailscaleIP}:${PORT}`);
} else {
  console.log("[bufo-daemon] no Tailscale interface found — accessible via localhost only");
}

console.log(`[bufo-daemon] serving ${PUBLIC_DIR}`);
console.log(`[bufo-daemon] log dir: ${LOG_DIR}`);

// Run log cleanup immediately, then every 24 hours
runCleanup();
cleanupInterval = setInterval(runCleanup, 24 * 60 * 60 * 1000);
cleanupInterval.unref(); // don't prevent process exit

// ---------------------------------------------------------------------------
// Graceful shutdown
// ---------------------------------------------------------------------------

function shutdown(): void {
  console.log("[bufo-daemon] shutting down…");
  clearInterval(cleanupInterval);
  stopAllPolling();
  // Close all server pairs; exit once the first HTTP server finishes draining.
  for (const { wss, httpServer } of servers) {
    wss.close();
    httpServer.close();
  }
  servers[0].httpServer.close(() => process.exit(0));
  // Force exit after 3s if something hangs
  setTimeout(() => process.exit(1), 3000).unref();
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
process.on("unhandledRejection", (reason) => {
  console.error("[daemon] Unhandled rejection:", reason);
});
