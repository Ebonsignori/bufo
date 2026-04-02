import { execSync, exec as execCb, ExecOptions } from 'node:child_process';

/**
 * Escape a string for safe embedding inside an AppleScript string literal.
 */
function escapeAS(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/**
 * Validate that a session ID is a safe iTerm2 UUID.
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
 * Run an AppleScript string via osascript (async). Script is passed on stdin.
 */
async function runAppleScript(script: string, timeoutMs = 10_000): Promise<string> {
  return new Promise((resolve, reject) => {
    const opts: ExecOptions = { timeout: timeoutMs };
    const child = execCb('/usr/bin/osascript', opts, (err, stdout) => {
      if (err) { reject(err); return; }
      resolve(typeof stdout === 'string' ? stdout : stdout.toString('utf-8'));
    });
    child.stdin?.end(script, 'utf-8');
  });
}

/**
 * Run an AppleScript synchronously via osascript on stdin.
 */
function runAppleScriptSync(script: string, timeoutMs = 5000): string {
  const result = execSync('/usr/bin/osascript', {
    input: script,
    encoding: 'utf-8',
    timeout: timeoutMs,
  });
  return result ?? '';
}

// --- Window/Tab management ---

export async function createWindow(
  name: string,
  dir: string,
): Promise<{ windowId: string; tabId: string; sessionId: string }> {
  const _name = escapeAS(name);
  const _dir = escapeAS(dir);
  const script = `
    tell application "iTerm2"
      set newWindow to (create window with default profile)
      tell newWindow
        tell current session of current tab
          set name to "${_name}"
          write text "cd \\"${_dir}\\" && clear"
        end tell
        set winID to id of newWindow
        set sessID to unique ID of current session of current tab
        return (winID as text) & ":" & "${_name}" & ":" & sessID
      end tell
    end tell
  `;
  const result = (await runAppleScript(script)).trim();
  const windowId = result.split(':')[0];
  const sessionId = result.split(':').pop()!;
  return { windowId, tabId: name, sessionId };
}

export async function createTab(
  name: string,
  dir: string,
): Promise<{ tabId: string; sessionId: string }> {
  const _name = escapeAS(name);
  const _dir = escapeAS(dir);
  const script = `
    tell application "iTerm2"
      tell current window
        set newTab to (create tab with default profile)
        tell current session of newTab
          set name to "${_name}"
          write text "cd \\"${_dir}\\" && clear"
        end tell
        set sessID to unique ID of current session of newTab
        return "${_name}" & ":" & sessID
      end tell
    end tell
  `;
  const result = (await runAppleScript(script)).trim();
  const sessionId = result.split(':').pop()!;
  return { tabId: name, sessionId };
}

export async function splitVertical(sessionId: string): Promise<string> {
  const _sid = escapeAS(sessionId);
  const script = `
    tell application "iTerm2"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = "${_sid}" then
              tell aSession
                set newSession to (split vertically with default profile)
                return unique ID of newSession
              end tell
            end if
          end repeat
        end repeat
      end repeat
    end tell
  `;
  return (await runAppleScript(script)).trim();
}

export async function splitHorizontal(sessionId: string): Promise<string> {
  const _sid = escapeAS(sessionId);
  const script = `
    tell application "iTerm2"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = "${_sid}" then
              tell aSession
                set newSession to (split horizontally with default profile)
                return unique ID of newSession
              end tell
            end if
          end repeat
        end repeat
      end repeat
    end tell
  `;
  return (await runAppleScript(script)).trim();
}

export async function splitHorizontalThin(
  sessionId: string,
  rows = 3,
): Promise<string> {
  const newId = await splitHorizontal(sessionId);
  if (newId) {
    await resizeSession(newId, rows);
  }
  return newId;
}

// --- Interaction ---

export async function sendText(sessionId: string, text: string): Promise<void> {
  const _sid = escapeAS(sessionId);
  const withNewline = text.endsWith('\n');
  const payload = withNewline ? text.slice(0, -1) : text;
  const escapedPayload = escapeAS(payload);
  const newlineClause = withNewline ? '' : ' without newline';
  const script = `
    tell application "iTerm2"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = "${_sid}" then
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

export async function sendInterrupt(sessionId: string): Promise<void> {
  const _sid = escapeAS(sessionId);
  const script = `
    tell application "iTerm2"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = "${_sid}" then
              tell aSession
                write text (ASCII character 3) without newline
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
    // Silently ignore
  }
}

export async function captureSession(sessionId: string): Promise<string> {
  const _sid = escapeAS(sessionId);
  const script = `
    tell application "iTerm2"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = "${_sid}" then
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
    return await runAppleScript(script);
  } catch {
    return '';
  }
}

export async function getSessionSize(
  sessionId: string,
): Promise<{ rows: number; cols: number } | null> {
  const _sid = escapeAS(sessionId);
  const script = `
    tell application "iTerm2"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = "${_sid}" then
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
    const [r, c] = result.split(',').map(Number);
    if (r > 0 && c > 0) return { rows: r, cols: c };
    return null;
  } catch {
    return null;
  }
}

// --- Navigation ---

export async function focusSession(sessionId: string): Promise<void> {
  const _sid = escapeAS(sessionId);
  const script = `
    tell application "iTerm2"
      activate
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = "${_sid}" then
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

export async function focusTab(tabName: string): Promise<void> {
  const _name = escapeAS(tabName);
  const script = `
    tell application "iTerm2"
      activate
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          if name of aTab is "${_name}" then
            select aWindow
            tell aWindow
              select aTab
            end tell
            return
          end if
        end repeat
      end repeat
    end tell
  `;
  try {
    await runAppleScript(script);
  } catch {
    // ignore
  }
}

export async function closeSession(sessionId: string): Promise<void> {
  const _sid = escapeAS(sessionId);
  const script = `
    tell application "iTerm2"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = "${_sid}" then
              tell aSession to close
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
    // ignore
  }
}

export async function closeTabBySession(sessionId: string): Promise<void> {
  const _sid = escapeAS(sessionId);
  const script = `
    tell application "iTerm2"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = "${_sid}" then
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
    // ignore
  }
}

export async function renameTabBySession(
  sessionId: string,
  name: string,
): Promise<void> {
  const _sid = escapeAS(sessionId);
  const _name = escapeAS(name);
  const script = `
    tell application "iTerm2"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = "${_sid}" then
              repeat with s in sessions of aTab
                tell s
                  set name to "${_name}"
                end tell
              end repeat
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
    // ignore
  }
}

export async function resizeSession(
  sessionId: string,
  rows: number,
): Promise<void> {
  const _sid = escapeAS(sessionId);
  const safeRows = Math.max(1, Math.floor(rows));
  const script = `
    tell application "iTerm2"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = "${_sid}" then
              tell aSession
                set rows to ${safeRows}
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
    // ignore
  }
}

// --- Queries ---

export async function sessionExists(sessionId: string): Promise<boolean> {
  const _sid = escapeAS(sessionId);
  const script = `
    tell application "iTerm2"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = "${_sid}" then
              return "true"
            end if
          end repeat
        end repeat
      end repeat
      return "false"
    end tell
  `;
  try {
    const result = (await runAppleScript(script)).trim();
    return result === 'true';
  } catch {
    return false;
  }
}

export function getActiveSessions(): string[] {
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
    if (!result) return [];
    return result.split(',').map((s) => s.trim());
  } catch {
    return [];
  }
}

export function isItermRunning(): boolean {
  try {
    const result = execSync('pgrep -x iTerm2', { encoding: 'utf-8' });
    return result.trim().length > 0;
  } catch {
    return false;
  }
}

export function isItermInstalled(): boolean {
  try {
    const { statSync: statSyncFs } = require("node:fs") as typeof import("node:fs");
    return statSyncFs("/Applications/iTerm.app").isDirectory();
  } catch {
    return false;
  }
}
export async function listSessions(): Promise<string[]> {
  return getActiveSessions();
}
