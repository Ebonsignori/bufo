import fs from "fs";
import path from "path";

/** Callback invoked with raw PTY bytes as they arrive from the log file. */
export type ChunkCallback = (sessionId: string, chunk: Buffer) => void;

interface WatchState {
  watcher: fs.FSWatcher | null;
  stream: fs.ReadStream | null;
  /** Current read position in the file (byte offset). */
  offset: number;
  /** True while a drainNewData read is in flight — prevents concurrent drains. */
  draining: boolean;
}

/**
 * How many bytes of existing log content to replay on initial subscribe.
 * Replaying a window of recent PTY bytes lets xterm.js reconstruct the current
 * screen state from the raw ANSI stream — cursor position and all — so that
 * subsequent streaming bytes continue cleanly without corrupting the display.
 *
 * We intentionally do NOT replay from the very beginning of the log because
 * early sequences (e.g. \x1b[2K, \x1b[A from interactive prompts) were written
 * against a different cursor position and would corrupt the display.  A 32 KB
 * tail gives enough recent context to reconstruct a typical terminal screen
 * while skipping stale history.
 */
const INITIAL_TAIL_BYTES = 32768;

const watchers = new Map<string, WatchState>();

/**
 * Start tailing a session's raw log file.
 *
 * Replays the last INITIAL_TAIL_BYTES of the file immediately on subscribe
 * (avoiding stale cursor-erase sequences from earlier in the session), then
 * streams new bytes as they arrive via `fs.watch`.
 *
 * Safe to call multiple times for the same sessionId — subsequent calls are
 * no-ops (the existing watcher continues).
 */
export function watchLog(
  sessionId: string,
  logDir: string,
  onChunk: ChunkCallback
): void {
  if (watchers.has(sessionId)) return; // already watching

  const logPath = path.join(logDir, `${sessionId}.log`);

  // Start from the tail of the existing file (up to INITIAL_TAIL_BYTES back).
  // Reading from offset 0 replays the full session history, which includes old
  // cursor-erase sequences (e.g. \x1b[2K, \x1b[A) that corrupt the display.
  // Starting near the end gives us recent context without the stale redraws.
  let initialOffset = 0;
  try {
    const stat = fs.statSync(logPath);
    initialOffset = Math.max(0, stat.size - INITIAL_TAIL_BYTES);
  } catch {
    initialOffset = 0;
  }

  const state: WatchState = {
    watcher: null,
    stream: null,
    offset: initialOffset,
    draining: false,
  };

  watchers.set(sessionId, state);

  /** Read any new bytes since last offset and emit them. */
  function drainNewData(): void {
    const entry = watchers.get(sessionId);
    if (!entry) return;
    if (entry.draining) return; // already a read in flight; the end-handler will re-check

    let stat: fs.Stats;
    try {
      stat = fs.statSync(logPath);
    } catch {
      return; // File disappeared
    }

    if (stat.size <= entry.offset) return; // Nothing new

    // Claim the byte range immediately so concurrent calls skip it.
    const readStart = entry.offset;
    const readEnd = stat.size - 1;
    entry.offset = stat.size;
    entry.draining = true;

    const readStream = fs.createReadStream(logPath, {
      start: readStart,
      end: readEnd,
    });

    const chunks: Buffer[] = [];

    readStream.on("data", (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });

    readStream.on("end", () => {
      const e = watchers.get(sessionId);
      if (!e) return;
      e.draining = false;
      if (chunks.length > 0) {
        const combined = Buffer.concat(chunks);
        onChunk(sessionId, combined);
      }
      // If more data arrived while we were reading, drain it now.
      drainNewData();
    });

    readStream.on("error", () => {
      const e = watchers.get(sessionId);
      if (e) e.draining = false;
    });
  }

  // Start watching for file changes
  try {
    const watcher = fs.watch(logPath, { persistent: false }, (eventType) => {
      if (eventType === "change" || eventType === "rename") {
        drainNewData();
      }
    });

    watcher.on("error", () => {
      // Watcher errored — clean up silently
      unwatchLog(sessionId);
    });

    state.watcher = watcher;
  } catch {
    // fs.watch failed (file doesn't exist yet, permissions, etc.)
    // The caller should have verified the file exists before calling watchLog.
    watchers.delete(sessionId);
    return;
  }

  // Immediately replay existing content so the client sees the current
  // session state without waiting for the next PTY write.
  drainNewData();
}

/**
 * Stop watching a session's log file and clean up resources.
 */
export function unwatchLog(sessionId: string): void {
  const entry = watchers.get(sessionId);
  if (!entry) return;

  try { entry.watcher?.close(); } catch { /* ignore */ }
  try { entry.stream?.destroy(); } catch { /* ignore */ }

  watchers.delete(sessionId);
}

/**
 * Stop all log watchers.  Called on server shutdown.
 */
export function unwatchAll(): void {
  for (const sessionId of Array.from(watchers.keys())) {
    unwatchLog(sessionId);
  }
}

/** Return the set of currently watched session IDs (for diagnostics). */
export function activeWatchers(): string[] {
  return Array.from(watchers.keys());
}
