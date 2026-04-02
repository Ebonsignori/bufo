import { spawnSync } from 'node:child_process';

function sanitizeSessionId(id: string): string {
  if (!/^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/.test(id)) {
    throw new Error(`Invalid iTerm2 session ID: ${JSON.stringify(id)}`);
  }
  return id;
}

function runAppleScriptSync(script: string, timeoutMs = 5000): string {
  const result = spawnSync('/usr/bin/osascript', [], { input: script, encoding: 'utf-8', timeout: timeoutMs });
  if (result.error) throw result.error;
  return (result.stdout as string) ?? '';
}

async function runAppleScript(script: string, timeoutMs = 10000): Promise<string> {
  const { execFile } = await import('node:child_process');
  return new Promise((resolve, reject) => {
    const child = execFile('/usr/bin/osascript', [], { encoding: 'utf-8', timeout: timeoutMs }, (error, stdout) => {
      if (error) reject(error);
      else resolve(stdout?.trim() ?? '');
    });
    if (child.stdin) { child.stdin.write(script); child.stdin.end(); }
  });
}

export function focusSession(sessionId: string): void {
  const safeId = sanitizeSessionId(sessionId);
  try {
    runAppleScriptSync(`
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
    `);
  } catch { /* iTerm2 may not be running */ }
}

export async function focusSessionAsync(sessionId: string): Promise<void> {
  const safeId = sanitizeSessionId(sessionId);
  try {
    await runAppleScript(`
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
    `);
  } catch { /* iTerm2 may not be running */ }
}

export function getActiveSessions(): Set<string> {
  try {
    const result = runAppleScriptSync(`
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
    `).trim();
    if (!result) return new Set();
    return new Set(result.split(',').map((s) => s.trim()));
  } catch { return new Set(); }
}

export async function sessionExists(sessionId: string): Promise<boolean> {
  const safeId = sanitizeSessionId(sessionId);
  try {
    const result = await runAppleScript(`
      tell application "iTerm2"
        repeat with w in windows
          tell w
            repeat with t in tabs
              tell t
                repeat with s in sessions
                  if (unique ID of s) is "${safeId}" then
                    return "yes"
                  end if
                end repeat
              end tell
            end repeat
          end tell
        end repeat
        return "no"
      end tell
    `);
    return result.trim() === 'yes';
  } catch { return false; }
}

export async function sendText(sessionId: string, text: string): Promise<void> {
  const safeId = sanitizeSessionId(sessionId);
  const safeText = text.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  try {
    await runAppleScript(`
      tell application "iTerm2"
        repeat with w in windows
          tell w
            repeat with t in tabs
              tell t
                repeat with s in sessions
                  if (unique ID of s) is "${safeId}" then
                    tell s to write text "${safeText}"
                    return
                  end if
                end repeat
              end tell
            end repeat
          end tell
        end repeat
      end tell
    `);
  } catch { /* session may be dead */ }
}

export async function sendInterrupt(sessionId: string): Promise<void> {
  const safeId = sanitizeSessionId(sessionId);
  try {
    await runAppleScript(`
      tell application "iTerm2"
        repeat with w in windows
          tell w
            repeat with t in tabs
              tell t
                repeat with s in sessions
                  if (unique ID of s) is "${safeId}" then
                    tell s to write text (ASCII character 3)
                    return
                  end if
                end repeat
              end tell
            end repeat
          end tell
        end repeat
      end tell
    `);
  } catch { /* session may be dead */ }
}

export async function closeTabBySession(sessionId: string): Promise<void> {
  const safeId = sanitizeSessionId(sessionId);
  try {
    await runAppleScript(`
      tell application "iTerm2"
        repeat with w in windows
          tell w
            repeat with t in tabs
              tell t
                repeat with s in sessions
                  if (unique ID of s) is "${safeId}" then
                    close t
                    return
                  end if
                end repeat
              end tell
            end repeat
          end tell
        end repeat
      end tell
    `);
  } catch { /* tab may already be closed */ }
}

export function isItermRunning(): boolean {
  try {
    const result = spawnSync('pgrep', ['-x', 'iTerm2'], { encoding: 'utf-8' });
    return (result.stdout as string).trim().length > 0;
  } catch { return false; }
}
