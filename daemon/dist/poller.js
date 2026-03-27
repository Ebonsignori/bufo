"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startPolling = startPolling;
exports.stopPolling = stopPolling;
exports.stopAllPolling = stopAllPolling;
exports.activePolls = activePolls;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = require("crypto");
const applescript_1 = require("./applescript");
const logwatcher_1 = require("./logwatcher");
const polls = new Map();
const POLL_INTERVAL_MS = 500;
function hashContent(content) {
    return (0, crypto_1.createHash)("sha1").update(content).digest("hex");
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
function startPolling(sessionId, logDir, onChunk, onContent, onModeUpgrade) {
    const existing = polls.get(sessionId);
    if (existing) {
        existing.subscriberCount += 1;
        return existing.mode;
    }
    const logPath = path_1.default.join(logDir, `${sessionId}.log`);
    const logExists = fs_1.default.existsSync(logPath);
    if (logExists) {
        // ── ANSI mode — tail the raw log file ────────────────────────────────────
        const state = {
            mode: "ansi",
            lastHash: "",
            subscriberCount: 1,
        };
        polls.set(sessionId, state);
        (0, logwatcher_1.watchLog)(sessionId, logDir, (_sid, chunk) => {
            const entry = polls.get(sessionId);
            if (!entry)
                return;
            onChunk(sessionId, chunk.toString("base64"));
        });
        return "ansi";
    }
    else {
        // ── Plaintext mode — poll via AppleScript ─────────────────────────────────
        const state = {
            mode: "plaintext",
            intervalId: setInterval(async () => {
                const entry = polls.get(sessionId);
                if (!entry)
                    return;
                try {
                    const raw = await (0, applescript_1.captureSession)(sessionId);
                    // Strip trailing blank lines (the screen buffer is padded to terminal
                    // height with empty/whitespace-only lines — drop them so the web UI
                    // doesn't show a wall of empty space below the last real output line).
                    const content = raw.replace(/(\s*\n)+$/, "").trimEnd();
                    const hash = hashContent(content);
                    if (hash !== entry.lastHash) {
                        entry.lastHash = hash;
                        onContent(sessionId, content);
                    }
                }
                catch {
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
            const logDirWatcher = fs_1.default.watch(logDir, (event, filename) => {
                if (filename !== `${sessionId}.log`)
                    return;
                const entry = polls.get(sessionId);
                if (!entry || entry.mode !== "plaintext")
                    return;
                if (!fs_1.default.existsSync(logPath))
                    return;
                // Upgrade to ANSI mode: tear down plaintext polling.
                clearInterval(entry.intervalId);
                entry.intervalId = undefined;
                logDirWatcher.close();
                entry.logDirWatcher = undefined;
                entry.mode = "ansi";
                // Notify the server so it can inform connected clients.
                onModeUpgrade?.(sessionId);
                // Begin tailing the new log file.
                (0, logwatcher_1.watchLog)(sessionId, logDir, (_sid, chunk) => {
                    const e = polls.get(sessionId);
                    if (!e)
                        return;
                    onChunk(sessionId, chunk.toString("base64"));
                });
            });
            state.logDirWatcher = logDirWatcher;
        }
        catch {
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
function stopPolling(sessionId) {
    const entry = polls.get(sessionId);
    if (!entry)
        return;
    entry.subscriberCount -= 1;
    if (entry.subscriberCount <= 0) {
        if (entry.mode === "ansi") {
            (0, logwatcher_1.unwatchLog)(sessionId);
        }
        else {
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
function stopAllPolling() {
    for (const [sessionId, entry] of polls) {
        if (entry.mode === "ansi") {
            (0, logwatcher_1.unwatchLog)(sessionId);
        }
        else {
            if (entry.intervalId !== undefined) {
                clearInterval(entry.intervalId);
            }
            if (entry.logDirWatcher !== undefined) {
                entry.logDirWatcher.close();
            }
        }
        polls.delete(sessionId);
    }
    (0, logwatcher_1.unwatchAll)();
}
/** Return the set of currently polled session IDs (for diagnostics). */
function activePolls() {
    return Array.from(polls.keys());
}
