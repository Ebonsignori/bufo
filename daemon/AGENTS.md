# Bufo Daemon — Agent Guide

## What is the Daemon?

A lightweight Node.js/TypeScript web server (`bufo-daemon`) that lets you view and interact with your iTerm2 terminal sessions from a phone browser (or any browser). It runs locally on your Mac, serves a single-page web app, and bridges the web client to live iTerm2 sessions via AppleScript.

Managed by the `bufo web` subcommands; runs as a macOS LaunchAgent on port 7373.

## Architecture

### Source Layout

```
daemon/
  src/
    server.ts          # HTTP + WebSocket server — main entry point
    applescript.ts     # iTerm2 bridge: captureSession, sendText, sendSignal, getSessionSize
    poller.ts          # Output dispatch: ANSI log-file mode OR AppleScript plaintext polling
    logwatcher.ts      # Efficient log file tail via fs.watch + streaming reads
    lib/               # Symlink → raycast/src/lib (shared with Raycast extension)
      config.ts        # Config loading (~/.bufo/*.yaml)
      bufo.ts      # getAllWorkspaces() — workspace + project discovery
      iterm.ts         # iTerm2 session query helpers
      types.ts         # Shared TypeScript types
  public/
    index.html         # Self-contained web app (xterm.js, vanilla JS, ~30 KB)
  dist/                # Compiled JS output (tsc → CommonJS)
  com.bufo.daemon.plist.template  # LaunchAgent template — filled in by install.sh and copied to ~/Library/LaunchAgents/
  package.json
  tsconfig.json
```

### Request / Message Flow

```
Browser
  │
  ├─ GET /          → HTTP: serves public/index.html
  │
  └─ WebSocket /ws  → bidirectional JSON message bus
       │
       ├─ list_workspaces  → getAllWorkspaces() reads ~/.bufo state
       │                      → replies { type: "workspaces", data, projects }
       │
       ├─ subscribe        → getSessionSize() + captureSession() via AppleScript
       │   sessionId         → startPolling() picks mode:
       │                          ANSI:      watchLog() tails .log file
       │                          plaintext: setInterval polls captureSession()
       │                      → replies { type: "subscribed", mode, rows, cols }
       │                      → streams  { type: "output", sessionId, chunk|content }
       │
       ├─ unsubscribe      → stopPolling() (ref-counted)
       │   sessionId
       │
       ├─ input            → sendText(sessionId, text) via AppleScript
       │   sessionId, text
       │
       └─ signal           → sendSignal(sessionId, "SIGINT"|"SIGTSTP") via AppleScript
           sessionId,         maps to ASCII 3 (Ctrl-C) or 26 (Ctrl-Z)
           signal
```

### Output Modes

| Mode | Trigger | Mechanism | Client rendering |
|------|---------|-----------|-----------------|
| **ANSI** | `~/.bufo/logs/<sessionId>.log` exists | `fs.watch` + streaming read; replays last 32 KB on subscribe | xterm.js parses raw PTY bytes — full color, cursor movement |
| **plaintext** | No log file | AppleScript `contents` polled every 500 ms; SHA-1 deduplicated | xterm.js writes plain text; "fallback mode" banner shown |

ANSI mode is preferred. ANSI log files are written by iTerm2's trigger-based logging or an external PTY logger. Do **not** mix a plaintext snapshot with an ANSI stream — cursor-movement sequences in the stream will corrupt it.

### Reference Counting

`poller.ts` is reference-counted: multiple browser tabs subscribing to the same `sessionId` share one underlying watcher/interval. `stopPolling()` decrements the count and only tears down when it reaches zero.

## Key Concepts

### AppleScript Bridge (`applescript.ts`)

All iTerm2 interaction goes through this file. The script is passed on **stdin** to `osascript` (not as a shell argument) to avoid quoting issues. Every exported function silently ignores errors so a closed or missing session never crashes the server.

| Function | Purpose |
|----------|---------|
| `captureSession(sessionId)` | Returns plain-text screen buffer (ANSI stripped by iTerm2) |
| `getSessionSize(sessionId)` | Returns `{ rows, cols }` or `null` |
| `sendText(sessionId, text)` | Delivers text to a pane; handles `newline` vs `without newline` to support both cooked and raw-mode apps |
| `sendSignal(sessionId, signal)` | Sends Ctrl-C (ASCII 3) or Ctrl-Z (ASCII 26) `without newline` |

Never call `osascript` directly outside `applescript.ts`.

### Log Watcher (`logwatcher.ts`)

Tails a raw PTY log file efficiently:

1. On subscribe, starts from `max(0, fileSize − 32768)` — replays a 32 KB tail rather than the full history, which avoids corrupting the display with stale cursor-erase sequences.
2. Uses `fs.watch` for change notifications then reads the new byte range via `createReadStream({ start, end })`.
3. A `draining` flag prevents concurrent reads; if new data arrives while a read is in flight the `end` handler immediately kicks off another drain.

### Poller (`poller.ts`)

Chooses the output mode at subscribe time (checks whether the log file exists), then manages one `PollState` entry per `sessionId`. In plaintext mode a `setInterval` at 500 ms calls `captureSession` and emits only when the SHA-1 hash changes.

### Shared Library (`src/lib/`)

`src/lib/` is a symlink to `raycast/src/lib/`. Changes there affect both the daemon and the Raycast extension. Key exports:

- `getAllWorkspaces()` — reads all `~/.bufo/projects/*.yaml` configs and `~/.bufo/state/**/*.json` state files, queries iTerm2 for live session IDs, returns `{ projects, workspaces }`
- `config.ts` — loads per-project YAML configs
- `types.ts` — shared types (`WorkspaceInfo`, `ProjectConfig`, etc.)

### LaunchAgent (`com.bufo.daemon.plist.template`)

The file `daemon/com.bufo.daemon.plist.template` is a template with `__HOME__`, `__NODE_BIN__`, and `__BUFO_REPO__` placeholders. `install.sh` fills these in and writes the result to `~/Library/LaunchAgents/com.bufo.daemon.plist`. A copy of just the template is also placed at `~/.local/bin/daemon/com.bufo.daemon.plist.template` so that `bufo install` can re-run the setup without needing the original repo.

| Setting | Value |
|---------|-------|
| Binary | `node dist/server.js` (absolute path to repo's `daemon/dist/server.js`, stamped at install time) |
| Port | `7373` (override with `PORT` env var) |
| Log | `~/.bufo/daemon.log` (stdout + stderr) |
| Auto-start | `RunAtLoad: true` |
| Keep-alive | `KeepAlive: true` (restarts on crash) |
| Crash throttle | `ThrottleInterval: 5` seconds |

Installed to `~/Library/LaunchAgents/` by `bufo install`.

## Development

### Prerequisites

- macOS with iTerm2
- Node.js 18+ (tested on 24)
- `npm install` in `daemon/`

```bash
bufo web start       # launchctl load (plist must already be installed via bufo install)
bufo web stop        # launchctl unload
bufo web restart     # stop + start
bufo web status      # show launchctl status
bufo web log         # tail -f ~/.bufo/daemon.log
bufo web open        # open http://localhost:7373 in browser
```

The plist is installed (and the daemon first started) by `bufo install` / `./install.sh`. `bufo web start/restart` only manage the already-installed plist — they do not re-install it. If the plist is missing, re-run `bufo install`.

### Development workflow

The installed plist points `node` at `<repo>/daemon/dist/server.js` (the path is stamped in at install time). So the development loop is:

```bash
cd daemon
npm run build        # recompile TypeScript → dist/
bufo web restart     # launchctl unload + load to pick up new dist/
```

Or skip the LaunchAgent entirely during active development:

```bash
cd daemon
npm run dev          # ts-node src/server.ts — no compile, live reload, Ctrl+C to stop
```

### Enabling ANSI Mode

ANSI mode requires a raw PTY log file per session. One way to create these is an iTerm2 trigger on session start that runs a shell command logging PTY output to `~/.bufo/logs/<sessionId>.log`. Without log files the daemon falls back to plaintext polling automatically.

## Conventions

- **TypeScript strict** — all source in `src/`, compiled to `dist/` via `tsc`
- **CommonJS output** — `tsconfig.json` targets `commonjs`; use `require`-compatible imports
- **No HTTP REST** — all dynamic communication goes over the WebSocket; HTTP serves only `index.html`
- **No throwing in AppleScript wrappers** — all `applescript.ts` functions catch and return a safe default; the server must never crash due to a missing iTerm2 session
- **Graceful shutdown** — `server.ts` handles `SIGTERM`/`SIGINT`, calls `stopAllPolling()`, closes the WebSocket server, then the HTTP server; force-exits after 3 seconds
- **Shared lib is a symlink** — never duplicate code between `daemon/src/lib/` and `raycast/src/lib/`; edit in `raycast/src/lib/` and both packages pick it up
- **No tests** — the daemon has no automated test suite; test manually with `npm run dev` and a browser

## Verification Checklist

After changes, verify:

- [ ] `npm run build` succeeds with no TypeScript errors
- [ ] `npm run dev` starts and logs `listening on http://0.0.0.0:7373`
- [ ] `GET /` returns `index.html` (200)
- [ ] `GET /anything-else` returns 404
- [ ] WebSocket connects; `list_workspaces` returns workspace list
- [ ] `subscribe` → `subscribed` event arrives with correct `mode` (`ansi` or `plaintext`)
- [ ] Terminal output streams to the web UI
- [ ] Typing in the web UI sends keystrokes to the correct iTerm2 pane
- [ ] Ctrl-C / Ctrl-Z buttons work
- [ ] `bufo web restart` cleanly restarts the daemon
- [ ] No `raycast/src/lib/` files were edited directly (edit via `daemon/src/lib/` symlink)
