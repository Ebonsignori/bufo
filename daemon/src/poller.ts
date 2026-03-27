import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import { captureSession } from "./applescript";
import { watchLog, unwatchLog, unwatchAll as unwatchAllLogs } from "./logwatcher";

/** Mode returned by startPolling — tells the caller which renderer to use. */
export type PollMode = "ansi" | "plaintext";

/** Callback for ANSI mode — raw PTY bytes, base64-encoded for JSON transport. */
export type ChunkCallback = (sessionId: string, chunk: string) => void;

/** Callback for plaintext mode — screen content as a plain string. */
export type ContentCallback = (sessionId: string, content: string) => void;

/**
 * Optional callback invoked when a session upgrades from plaintext to ANSI
 * mode because its log file appeared after polling had already started.
 */
export type ModeUpgradeCallback = (sessionId: string) => void;

interface PollState {
  mode: PollMode;
  /** Set for plaintext mode. */
  intervalId?: ReturnType<typeof setInterval>;
  /** Watches logDir for the session log file to appear (plaintext mode only). */
  logDirWatcher?: import("fs").FSWatcher;
  lastHash: string;
  subscriberCount: number;
}

const polls = new Map<string, PollState>();

const POLL_INTERVAL_MS = 500;

function hashContent(content: string): string {
  return createHash("sha1").update(content).digest("hex");
}

/**
 * Start polling/watching a session for output.
 *
 * If `<logDir>/<sessionId>.log` exists, delegates to the logwatcher (ANSI mode)
 * and invokes `onChunk` with base64-encoded raw bytes.
 *
 * Otherwise falls back to AppleScript content polling (plaintext mode) and
 * invokes `onContent` with the plain-text screen buffer.
 *
 * Returns the mode that was selected so the caller can inform the client.
 *
 * Reference-counted: multiple calls for the same sessionId reuse the same
 * underlying watcher/interval.
 */
export function startPolling(
  sessionId: string,
  logDir: string,
  onChunk: ChunkCallback,
  onContent: ContentCallback,
  onModeUpgrade?: ModeUpgradeCallback
): PollMode {
  const existing = polls.get(sessionId);
  if (existing) {
    existing.subscriberCount += 1;
    return existing.mode;
  }

  const logPath = path.join(logDir, `${sessionId}.log`);
  const logExists = fs.existsSync(logPath);

  if (logExists) {
    // ── ANSI mode — tail the raw log file ────────────────────────────────────
    const state: PollState = {
      mode: "ansi",
      lastHash: "",
      subscriberCount: 1,
    };
    polls.set(sessionId, state);

    watchLog(sessionId, logDir, (_sid, chunk) => {
      const entry = polls.get(sessionId);
      if (!entry) return;
      onChunk(sessionId, chunk.toString("base64"));
    });

    return "ansi";
  } else {
    // ── Plaintext mode — poll via AppleScript ─────────────────────────────────
    const state: PollState = {
      mode: "plaintext",
      intervalId: setInterval(async () => {
        const entry = polls.get(sessionId);
        if (!entry) return;

        try {
          const raw = await captureSession(sessionId);
          // Strip trailing blank lines (the screen buffer is padded to terminal
          // height with empty/whitespace-only lines — drop them so the web UI
          // doesn't show a wall of empty space below the last real output line).
          const content = raw.replace(/(\s*\n)+$/, "").trimEnd();
          const hash = hashContent(content);
          if (hash !== entry.lastHash) {
            entry.lastHash = hash;
            onContent(sessionId, content);
          }
        } catch {
          // iTerm2 may not be running; just skip this tick
        }
      }, POLL_INTERVAL_MS),
      lastHash: "",
      subscriberCount: 1,
    };

    polls.set(sessionId, state);

    // Watch the log directory for this session's log file to appear.
    // If iTerm2 starts logging the session after polling has begun (e.g.
    // because the user ran `bufo setup` or restarted iTerm2 with a new
    // profile), we upgrade from plaintext to ANSI mode automatically.
    try {
      const logDirWatcher = fs.watch(logDir, (event, filename) => {
        if (filename !== `${sessionId}.log`) return;
        const entry = polls.get(sessionId);
        if (!entry || entry.mode !== "plaintext") return;
        if (!fs.existsSync(logPath)) return;

        // Upgrade to ANSI mode: tear down plaintext polling.
        clearInterval(entry.intervalId);
        entry.intervalId = undefined;
        logDirWatcher.close();
        entry.logDirWatcher = undefined;
        entry.mode = "ansi";

        // Notify the server so it can inform connected clients.
        onModeUpgrade?.(sessionId);

        // Begin tailing the new log file.
        watchLog(sessionId, logDir, (_sid, chunk) => {
          const e = polls.get(sessionId);
          if (!e) return;
          onChunk(sessionId, chunk.toString("base64"));
        });
      });
      state.logDirWatcher = logDirWatcher;
    } catch {
      // If fs.watch() fails (e.g. the directory disappeared), just continue
      // in plaintext mode — this is a best-effort upgrade path.
    }

    return "plaintext";
  }
}

/**
 * Decrement the subscriber count for a session.  When it reaches zero the
 * polling interval / log watcher is stopped and the entry is removed.
 */
export function stopPolling(sessionId: string): void {
  const entry = polls.get(sessionId);
  if (!entry) return;

  entry.subscriberCount -= 1;
  if (entry.subscriberCount <= 0) {
    if (entry.mode === "ansi") {
      unwatchLog(sessionId);
    } else {
      if (entry.intervalId !== undefined) {
        clearInterval(entry.intervalId);
      }
      if (entry.logDirWatcher !== undefined) {
        entry.logDirWatcher.close();
      }
    }
    polls.delete(sessionId);
  }
}

/**
 * Stop all polling loops and log watchers.  Called on server shutdown.
 */
export function stopAllPolling(): void {
  for (const [sessionId, entry] of polls) {
    if (entry.mode === "ansi") {
      unwatchLog(sessionId);
    } else {
      if (entry.intervalId !== undefined) {
        clearInterval(entry.intervalId);
      }
      if (entry.logDirWatcher !== undefined) {
        entry.logDirWatcher.close();
      }
    }
    polls.delete(sessionId);
  }
  unwatchAllLogs();
}

/** Return the set of currently polled session IDs (for diagnostics). */
export function activePolls(): string[] {
  return Array.from(polls.keys());
}
