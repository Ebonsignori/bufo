import { exec, ExecOptions } from "child_process";

/**
 * Escape a string for safe embedding inside an AppleScript string literal.
 * AppleScript strings use double-quotes; we escape backslash and double-quote.
 */
function escapeAS(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

/**
 * Run an AppleScript string via osascript and return stdout.
 * The script is passed on stdin to avoid shell-quoting issues.
 * Throws if osascript exits non-zero.
 */
async function runAppleScript(script: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const opts: ExecOptions = { timeout: 10_000 };
    const child = exec(`/usr/bin/osascript`, opts, (err, stdout) => {
      if (err) { reject(err); return; }
      resolve(typeof stdout === "string" ? stdout : stdout.toString("utf-8"));
    });
    child.stdin?.end(script, "utf-8");
  });
}

/**
 * Capture the full text contents of an iTerm2 session (pane).
 * Returns the plain-text screen buffer — ANSI stripped by iTerm2 automatically.
 */
export async function captureSession(sessionId: string): Promise<string> {
  const sid = escapeAS(sessionId);
  const script = `
tell application "iTerm2"
  repeat with aWindow in windows
    repeat with aTab in tabs of aWindow
      repeat with aSession in sessions of aTab
        if (unique ID of aSession) = "${sid}" then
          tell aSession
            return contents
          end tell
        end if
      end repeat
    end repeat
  end repeat
end tell
`;
  try {
    const result = await runAppleScript(script);
    return result;
  } catch {
    return "";
  }
}

/**
 * Get the rows and columns of an iTerm2 session.
 * Returns null if the session is not found or iTerm2 is not running.
 */
export async function getSessionSize(
  sessionId: string
): Promise<{ rows: number; cols: number } | null> {
  const sid = escapeAS(sessionId);
  const script = `
tell application "iTerm2"
  repeat with aWindow in windows
    repeat with aTab in tabs of aWindow
      repeat with aSession in sessions of aTab
        if (unique ID of aSession) = "${sid}" then
          tell aSession
            return (rows as string) & "," & (columns as string)
          end tell
        end if
      end repeat
    end repeat
  end repeat
end tell
`;
  try {
    const result = (await runAppleScript(script)).trim();
    const [r, c] = result.split(",").map(Number);
    if (r > 0 && c > 0) return { rows: r, cols: c };
    return null;
  } catch {
    return null;
  }
}

/**
 * Send text to an iTerm2 session via AppleScript `write text`.
 * bytes arrive at the running process as real keyboard input — correctly
 * handling both cooked-mode shells and raw-mode interactive apps (vim,
 * Claude Code option selectors, etc.).
 *
 * - If text ends with "\n", the trailing newline is stripped and the
 *   `newline` parameter is left at its default (YES), so iTerm2 appends
 *   \r — the correct Enter character for both cooked and raw mode.
 * - If text does NOT end with "\n", `without newline` is used so the bytes
 *   are delivered without a trailing carriage return (needed for escape
 *   sequences like arrow keys: \x1b[A, \x1b[B, etc.).
 */
export async function sendText(sessionId: string, text: string): Promise<void> {
  const sid = escapeAS(sessionId);

  const withNewline = text.endsWith("\n");
  const payload = withNewline ? text.slice(0, -1) : text;
  const escapedPayload = escapeAS(payload);
  const newlineClause = withNewline ? "" : " without newline";

  const script = `
tell application "iTerm2"
  repeat with aWindow in windows
    repeat with aTab in tabs of aWindow
      repeat with aSession in sessions of aTab
        if (unique ID of aSession) = "${sid}" then
          tell aSession
            write text "${escapedPayload}"${newlineClause}
          end tell
          return
        end if
      end repeat
    end repeat
  end repeat
end tell
`;
  try {
    await runAppleScript(script);
  } catch {
    // Silently ignore — session may have closed
  }
}

/**
 * Send a signal to an iTerm2 session as a raw control character.
 *
 * - SIGINT  → ASCII 3  (Ctrl+C)
 * - SIGTSTP → ASCII 26 (Ctrl+Z)
 *
 * Uses `without newline` so the single control byte is delivered immediately
 * without a trailing \r.
 */
export async function sendSignal(
  sessionId: string,
  signal: "SIGINT" | "SIGTSTP"
): Promise<void> {
  const sid = escapeAS(sessionId);
  const charCode = signal === "SIGINT" ? 3 : 26;

  const script = `
tell application "iTerm2"
  repeat with aWindow in windows
    repeat with aTab in tabs of aWindow
      repeat with aSession in sessions of aTab
        if (unique ID of aSession) = "${sid}" then
          tell aSession
            write text (ASCII character ${charCode}) without newline
          end tell
          return
        end if
      end repeat
    end repeat
  end repeat
end tell
`;
  try {
    await runAppleScript(script);
  } catch {
    // Silently ignore — session may have closed
  }
}
