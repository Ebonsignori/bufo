"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const ws_1 = require("ws");
const bufo_1 = require("./lib/bufo");
const applescript_1 = require("./applescript");
const poller_1 = require("./poller");
const cleanup_1 = require("./cleanup");
// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const PORT = parseInt(process.env.PORT ?? "7373", 10);
const PUBLIC_DIR = path_1.default.join(__dirname, "..", "public");
const LOG_DIR = process.env.BUFO_LOG_DIR
    ? path_1.default.resolve(process.env.BUFO_LOG_DIR)
    : path_1.default.join(os_1.default.homedir(), ".bufo", "logs");
// Ensure log directory exists (best effort)
try {
    fs_1.default.mkdirSync(LOG_DIR, { recursive: true });
}
catch { /* ignore */ }
// ---------------------------------------------------------------------------
// Session ID validation
// ---------------------------------------------------------------------------
// Real iTerm2 session IDs have the form "w<N>t<N>p<N>:<UUID>".
// Validating before any file I/O prevents path traversal attacks where a
// malicious client sends a sessionId like "../../etc/passwd".
const SESSION_ID_RE = /^w\d+t\d+p\d+:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/;
function isValidSessionId(id) {
    return SESSION_ID_RE.test(id);
}
// Cache static assets at startup to avoid blocking the event loop on each
// request. All three files are build artifacts that do not change while the
// server runs. Buffer is used for the JS/CSS files so binary-safe bytes are
// preserved; index.html is kept as a string for a minor convenience.
const indexHtmlPath = path_1.default.join(PUBLIC_DIR, "index.html");
let indexHtmlCache = null;
try {
    indexHtmlCache = fs_1.default.readFileSync(indexHtmlPath, "utf-8");
}
catch { /* will serve 500 on request if cache is null */ }
const xtermBundlePath = path_1.default.join(PUBLIC_DIR, "xterm-bundle.js");
let xtermBundleCache = null;
try {
    xtermBundleCache = fs_1.default.readFileSync(xtermBundlePath);
}
catch { /* served as 404 if missing — run `npm run build` */ }
const xtermCssPath = path_1.default.join(PUBLIC_DIR, "xterm.css");
let xtermCssCache = null;
try {
    xtermCssCache = fs_1.default.readFileSync(xtermCssPath);
}
catch { /* served as 404 if missing — run `npm run build` */ }
const connState = new WeakMap();
// ---------------------------------------------------------------------------
// Cleanup interval (log retention)
// ---------------------------------------------------------------------------
let cleanupInterval;
// ---------------------------------------------------------------------------
// Tailscale IP detection
// ---------------------------------------------------------------------------
// Tailscale always assigns addresses in the 100.64.0.0/10 CGNAT range.
// We detect it by scanning network interfaces for an IPv4 address starting
// with "100." — no shell calls needed.
function detectTailscaleIP() {
    const nets = os_1.default.networkInterfaces();
    for (const iface of Object.values(nets)) {
        for (const addr of iface ?? []) {
            if (addr.family === "IPv4" && addr.address.startsWith("100.")) {
                return addr.address;
            }
        }
    }
    return null;
}
function staticFiles() {
    return {
        "/": { contentType: "text/html; charset=utf-8", cache: () => indexHtmlCache },
        "/xterm-bundle.js": { contentType: "application/javascript", cache: () => xtermBundleCache },
        "/xterm.css": { contentType: "text/css", cache: () => xtermCssCache },
    };
}
function handleRequest(req, res) {
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
        res.writeHead(503, { "Content-Type": "text/plain" });
        res.end("Asset not built — run `npm run build` in the daemon directory");
        return;
    }
    res.writeHead(200, { "Content-Type": entry.contentType });
    res.end(data);
}
// ---------------------------------------------------------------------------
// Shared WebSocket helpers
// ---------------------------------------------------------------------------
function send(ws, payload) {
    if (ws.readyState === ws_1.WebSocket.OPEN) {
        ws.send(JSON.stringify(payload));
    }
}
function sendError(ws, message) {
    send(ws, { type: "error", message });
}
function handleConnection(ws, wss) {
    const state = { subscribedSessions: new Set() };
    connState.set(ws, state);
    console.log(`[ws] client connected (total: ${wss.clients.size})`);
    ws.on("message", async (raw) => {
        let msg;
        try {
            msg = JSON.parse(raw.toString());
        }
        catch {
            sendError(ws, "Invalid JSON");
            return;
        }
        switch (msg.type) {
            case "list_tadpoles": {
                try {
                    const { projects, tadpoles } = (0, bufo_1.getAllTadpoles)();
                    send(ws, { type: "tadpoles", data: tadpoles, projects });
                }
                catch (err) {
                    sendError(ws, `Failed to list tadpoles: ${String(err)}`);
                }
                break;
            }
            case "subscribe": {
                const { sessionId } = msg;
                if (!sessionId) {
                    sendError(ws, "subscribe: missing sessionId");
                    return;
                }
                if (!isValidSessionId(sessionId)) {
                    sendError(ws, "subscribe: invalid sessionId");
                    return;
                }
                state.subscribedSessions.add(sessionId);
                // Fetch terminal dimensions and current screen content in parallel.
                let size, snapshot;
                try {
                    [size, snapshot] = await Promise.all([
                        (0, applescript_1.getSessionSize)(sessionId),
                        (0, applescript_1.captureSession)(sessionId),
                    ]);
                }
                catch (err) {
                    console.error(`[ws] Failed to initialize session ${sessionId}:`, err);
                    sendError(ws, "Failed to initialize session");
                    break;
                }
                // Check if the log file exists to determine mode.
                const logPath = path_1.default.join(LOG_DIR, `${sessionId}.log`);
                const modeHint = fs_1.default.existsSync(logPath) ? "ansi" : "plaintext";
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
                const mode = (0, poller_1.startPolling)(sessionId, LOG_DIR, 
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
                });
                console.log(`[ws] subscribed to session ${sessionId} (mode: ${mode})`);
                break;
            }
            case "unsubscribe": {
                const { sessionId } = msg;
                if (!sessionId) {
                    sendError(ws, "unsubscribe: missing sessionId");
                    return;
                }
                if (!isValidSessionId(sessionId)) {
                    sendError(ws, "unsubscribe: invalid sessionId");
                    return;
                }
                state.subscribedSessions.delete(sessionId);
                (0, poller_1.stopPolling)(sessionId);
                console.log(`[ws] unsubscribed from session ${sessionId}`);
                break;
            }
            case "input": {
                const { sessionId, text } = msg;
                if (!sessionId) {
                    sendError(ws, "input: missing sessionId");
                    return;
                }
                if (!isValidSessionId(sessionId)) {
                    sendError(ws, "input: invalid sessionId");
                    return;
                }
                if (typeof text !== "string") {
                    sendError(ws, "input: text must be a string");
                    return;
                }
                try {
                    await (0, applescript_1.sendText)(sessionId, text);
                }
                catch (err) {
                    sendError(ws, `Failed to send input: ${String(err)}`);
                }
                break;
            }
            case "signal": {
                const { sessionId, signal } = msg;
                if (!sessionId) {
                    sendError(ws, "signal: missing sessionId");
                    return;
                }
                if (!isValidSessionId(sessionId)) {
                    sendError(ws, "signal: invalid sessionId");
                    return;
                }
                if (signal !== "SIGINT" && signal !== "SIGTSTP") {
                    sendError(ws, `signal: unknown signal "${String(signal)}"`);
                    return;
                }
                try {
                    await (0, applescript_1.sendSignal)(sessionId, signal);
                }
                catch (err) {
                    sendError(ws, `Failed to send signal: ${String(err)}`);
                }
                break;
            }
            default: {
                sendError(ws, `Unknown message type: ${msg.type}`);
            }
        }
    });
    ws.on("close", () => {
        const s = connState.get(ws);
        if (s) {
            for (const sessionId of s.subscribedSessions) {
                (0, poller_1.stopPolling)(sessionId);
            }
            s.subscribedSessions.clear();
        }
        console.log(`[ws] client disconnected (total: ${wss.clients.size})`);
    });
    ws.on("error", (err) => {
        console.error(`[ws] error: ${err.message}`);
    });
}
function createServerPair(host) {
    const httpServer = http_1.default.createServer(handleRequest);
    const wss = new ws_1.WebSocketServer({
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
        verifyClient: ({ req }) => {
            const origin = req.headers["origin"];
            if (!origin)
                return true; // non-browser client — allow
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
const servers = [createServerPair("127.0.0.1")];
const tailscaleIP = detectTailscaleIP();
if (tailscaleIP) {
    servers.push(createServerPair(tailscaleIP));
    console.log(`[bufo-daemon] Tailscale interface detected — also bound to ${tailscaleIP}:${PORT}`);
}
else {
    console.log("[bufo-daemon] no Tailscale interface found — accessible via localhost only");
}
console.log(`[bufo-daemon] serving ${PUBLIC_DIR}`);
console.log(`[bufo-daemon] log dir: ${LOG_DIR}`);
// Run log cleanup immediately, then every 24 hours
(0, cleanup_1.runCleanup)();
cleanupInterval = setInterval(cleanup_1.runCleanup, 24 * 60 * 60 * 1000);
cleanupInterval.unref(); // don't prevent process exit
// ---------------------------------------------------------------------------
// Graceful shutdown
// ---------------------------------------------------------------------------
function shutdown() {
    console.log("[bufo-daemon] shutting down…");
    clearInterval(cleanupInterval);
    (0, poller_1.stopAllPolling)();
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
