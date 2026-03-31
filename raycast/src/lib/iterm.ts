import { spawnSync } from "child_process";

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
