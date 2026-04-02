import { spawnSync, spawn } from "child_process";

/**
 * Validate that a session ID is a safe iTerm2 UUID before embedding it in
 * AppleScript. iTerm2 session IDs are always hyphenated UUIDs; anything else
 * is unexpected and could indicate injection.
 */
function sanitizeSessionId(id: string): string {
  if (
    !/^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/.test(id)
  ) {
    throw new Error(`Invalid iTerm2 session ID: ${JSON.stringify(id)}`);
  }
  return id;
}

/**
 * Run an AppleScript by passing it on stdin to osascript.
 * Avoids shell-quoting issues and argument-length limits.
 */
function runAppleScriptSync(script: string, timeoutMs = 5000): string {
  const result = spawnSync("/usr/bin/osascript", [], {
    input: script,
    encoding: "utf-8",
    timeout: timeoutMs,
  });
  if (result.error) throw result.error;
  return (result.stdout as string) ?? "";
}

export function focusSession(sessionId: string): void {
  const safeId = sanitizeSessionId(sessionId);
  const script = `
    tell application "iTerm2"
      activate
      repeat with w in windows
        tell w
          repeat with t in tabs
            tell t
              repeat with s in sessions
                if (unique ID of s) is "${safeId}" then
                  select t
                  select s
                  tell w to select
                  return
                end if
              end repeat
            end tell
          end repeat
        end tell
      end repeat
    end tell
  `;
  try {
    runAppleScriptSync(script);
  } catch {
    // iTerm2 may not be running
  }
}

export function getActiveSessions(): Set<string> {
  const script = `
    tell application "iTerm2"
      set allIDs to {}
      repeat with w in windows
        tell w
          repeat with t in tabs
            tell t
              repeat with s in sessions
                set end of allIDs to (unique ID of s)
              end repeat
            end tell
          end repeat
        end tell
      end repeat
      set AppleScript's text item delimiters to ","
      return allIDs as text
    end tell
  `;
  try {
    const result = runAppleScriptSync(script).trim();
    if (!result) return new Set();
    return new Set(result.split(",").map((s) => s.trim()));
  } catch {
    return new Set();
  }
}

export function isItermRunning(): boolean {
  try {
    const result = spawnSync("pgrep", ["-x", "iTerm2"], { encoding: "utf-8" });
    return (result.stdout as string).trim().length > 0;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Async variants (used by the TypeScript CLI layer)
// ---------------------------------------------------------------------------

/**
 * Run an AppleScript asynchronously, returning stdout.
 */
function runAppleScript(script: string, timeoutMs = 5000): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn("/usr/bin/osascript", [], { stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error("AppleScript timed out"));
    }, timeoutMs);
    child.stdout.on("data", (d: Buffer) => { stdout += d.toString(); });
    child.stderr.on("data", (d: Buffer) => { stderr += d.toString(); });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code !== 0) {
        reject(new Error(`osascript exited ${code}: ${stderr.trim()}`));
      } else {
        resolve(stdout);
      }
    });
    child.stdin.write(script);
    child.stdin.end();
  });
}

/**
 * Async version of focusSession — focuses the iTerm2 window/tab containing
 * the given session ID.
 */
export async function focusSessionAsync(sessionId: string): Promise<void> {
  const safeId = sanitizeSessionId(sessionId);
  const script = `
    tell application "iTerm2"
      activate
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) is "${safeId}" then
              select aWindow
              tell aWindow
                select aTab
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
    // iTerm2 may not be running
  }
}

/**
 * Check whether an iTerm2 session ID is still alive.
 */
export async function sessionExists(sessionId: string): Promise<boolean> {
  const safeId = sanitizeSessionId(sessionId);
  const script = `
    tell application "iTerm2"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) is "${safeId}" then
              return "true"
            end if
          end repeat
        end repeat
      end repeat
      return "false"
    end tell
  `;
  try {
    const result = await runAppleScript(script);
    return result.trim() === "true";
  } catch {
    return false;
  }
}

/**
 * Send text (+ implicit newline) to an iTerm2 session pane.
 */
export async function sendText(sessionId: string, text: string): Promise<void> {
  const safeId = sanitizeSessionId(sessionId);
  // Escape backslashes and double-quotes for embedding in AppleScript string
  const safeText = text.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const script = `
    tell application "iTerm2"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) is "${safeId}" then
              tell aSession
                write text "${safeText}"
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
    // ignore — iTerm2 may not be running
  }
}

/**
 * Send Ctrl-C to an iTerm2 session pane.
 */
export async function sendInterrupt(sessionId: string): Promise<void> {
  const safeId = sanitizeSessionId(sessionId);
  const script = `
    tell application "iTerm2"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) is "${safeId}" then
              tell aSession
                write text (ASCII character 3)
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
    // ignore — iTerm2 may not be running
  }
}

/**
 * Close the iTerm2 tab that contains the given session ID.
 */
export async function closeTabBySession(sessionId: string): Promise<void> {
  const safeId = sanitizeSessionId(sessionId);
  const script = `
    tell application "iTerm2"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) is "${safeId}" then
              tell aTab to close
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
    // ignore — tab may already be closed
  }
}
