# Bufo Raycast Extension — Agent Guide

## What is This?

A [Raycast](https://raycast.com) extension that surfaces bufo tadpoles in the Raycast launcher. It reads `~/.bufo` state directly (no daemon dependency) and shells out to the `bufo` CLI for mutations.

## Architecture

### Source Layout

```
raycast/
  src/
    list-tadpoles.tsx    # Command: browse all tadpoles across projects
    new-tadpole.tsx      # Command: create a tadpole from a ticket, PR, or slot number
    list-sessions.tsx    # Command: browse all sessions across projects
    new-session.tsx      # Command: start a new named session
    new-main-tadpole.tsx # Command: open the main repo checkout (no worktree)
    lib/                 # Shared library (symlinked into daemon/src/lib/)
      types.ts           # BufoProject, BufoTadpole, TadpoleState, TadpoleMeta, BufoSession, SessionLayout, GlobalConfig
      config.ts          # Config + state readers (no shell — pure fs/yaml); includes session discovery
      bufo.ts            # Tadpole discovery + display helpers
      exec.ts            # bufo CLI runner + git branch helper
      iterm.ts           # iTerm2 AppleScript helpers (focusSession, getActiveSessions)
  dist-install/          # Pre-built .js bundles committed to repo — used by `bufo raycast install`
  package.json           # Raycast extension manifest + dependencies
```

### Commands

| Command file | Raycast title | What it does |
|---|---|---|
| `list-tadpoles.tsx` | List Tadpoles | Shows all tadpoles grouped by project; focus, open, lock/unlock, copy branch, cleanup, destroy |
| `new-tadpole.tsx` | New Tadpole | Form to create a tadpole from a ticket/PR URL or slot number (`bufo @alias ticket` / `bufo @alias pr` / `bufo @alias tp N`) |
| `list-sessions.tsx` | List Sessions | Shows all sessions grouped by project; focus, resume, copy name, delete |
| `new-session.tsx` | New Session | Form to start a new named session (`bufo @alias session start <name>`) |
| `new-main-tadpole.tsx` | New Main Tadpole | Form to open the main repo checkout directly — no worktree (`bufo @alias main`) |

### Data Flow

```
Command renders
  │
  ├─ Read-only data (no shell)
  │    config.ts: discoverProjects()      reads ~/.bufo/projects/*.yaml
  │    config.ts: loadGlobalConfig()      reads ~/.bufo/config.yaml
  │    config.ts: loadTadpoleState()      reads ~/.bufo/state/<session>/tp<N>.json
  │    config.ts: loadTadpoleMeta()       reads <tadpole>/.bufo-meta
  │    config.ts: isTadpoleLocked()       checks <tadpole>/.bufo-lock
  │    config.ts: getCustomName()         reads <tadpole>/.bufo-name
  │    exec.ts:   getGitBranch()          runs git -C <dir> rev-parse
  │    iterm.ts:  getActiveSessions()     osascript → comma-separated session IDs
  │
  └─ Mutations (shell out to bufo)
       exec.ts: runBufoAsync(args)        /bin/bash "<bufo>" <args>  (async, 30 s timeout)
       exec.ts: runBufoSync(args)         same, synchronous
       iterm.ts: focusSession(sessionId)  osascript → iTerm2 activate + select session
```

### Shared Library (`src/lib/`)

`src/lib/` is the **canonical location** for this library — `daemon/src/lib/` is a symlink pointing here. Always edit files in `raycast/src/lib/`; changes are automatically visible to the daemon.

| File | Key exports |
|------|------------|
| `types.ts` | `BufoProject`, `BufoTadpole`, `TadpoleState`, `TadpoleMeta`, `BufoSession`, `SessionLayout`, `GlobalConfig` |
| `config.ts` | `discoverProjects()`, `loadProject()`, `loadGlobalConfig()`, `loadTadpoleState()`, `loadTadpoleMeta()`, `isTadpoleLocked()`, `getCustomName()`, `bufoExists()`, `loadSession()`, `discoverSessions()`, `getAllSessions()` |
| `bufo.ts` | `getAllTadpoles()`, `discoverTadpoles()`, `getTadpoleTitle()`, `getTadpoleSubtitle()` |
| `exec.ts` | `runBufoAsync(args, stdin?)`, `runBufoSync()`, `getGitBranch()` |
| `iterm.ts` | `getActiveSessions()`, `focusSession()`, `isItermRunning()` |

### `bufo` Binary Resolution (`exec.ts`)

`findBufo()` resolves the binary once and caches it. Search order:

1. `~/Projects/bufo/src/bufo` (dev repo location)
2. `/usr/local/bin/bufo`, `/opt/homebrew/bin/bufo`, `~/bin/bufo`, `~/.local/bin/bufo`
3. `zsh -ilc 'which bufo'` — handles shell aliases (e.g. `bufo: aliased to ~/...`)

All `bufo` invocations use a hardened `PATH` that includes Homebrew prefixes, since Raycast runs without a login shell environment.

### Tadpole Metadata Files

Written by the `bufo` CLI into the tadpole directory root:

| File | Purpose |
|------|---------|
| `.bufo-meta` | JSON: `TadpoleMeta` — type (`tadpole`/`ticket`/`pr`), ticket ID, PR number/title/URL |
| `.bufo-lock` | Presence = locked (empty file) |
| `.bufo-name` | Custom display name (plain text) |

## Development

### Prerequisites

- macOS with [Raycast](https://raycast.com) installed
- Node.js 18+
- `npm install` in `raycast/`

### Build & Run

```bash
cd raycast

npm install       # install dependencies
npm run dev       # ray develop — registers commands in Raycast with hot-reload
npm run build     # ray build — compile to ~/.config/raycast/extensions/bufo/
npm run lint      # ray lint (eslint + prettier)
npm run fix-lint  # ray lint --fix
```

To build the pre-built `dist-install/` artifact (committed to the repo for `bufo raycast install`):

```bash
cd raycast
npx ray build -o dist-install --non-interactive
```

Run this after adding or modifying commands so the committed artifact stays up to date.

### Installing the Extension

For end users (no npm required):
```bash
bufo raycast install   # copies dist-install/ to ~/.config/raycast/extensions/bufo/
```

For development (hot-reload, requires npm + ray CLI):
```bash
bufo raycast dev       # wraps npm run dev
```

The installer (`./install.sh`) prompts to run `bufo raycast install` automatically during setup.

### Adding a New Command

1. Create `src/<command-name>.tsx` exporting a default React component
2. Add an entry to the `commands` array in `package.json`:
   ```json
   {
     "name": "command-name",
     "title": "Human Title",
     "description": "What it does",
     "mode": "view"
   }
   ```
3. Use `useCachedPromise` from `@raycast/utils` for async data — it handles loading states and caches between invocations
4. For mutations, call `runBufoAsync(args)` and show progress/result with `showToast`
5. Rebuild `dist-install/` so the committed artifact reflects the new command:
   ```bash
   npx ray build -o dist-install --non-interactive
   ```

### Adding a lib Function

- Pure reads (config, state files): add to `config.ts` or `bufo.ts`
- Shell execution: add to `exec.ts`
- iTerm2 AppleScript: add to `iterm.ts`
- New types: add to `types.ts`

Since `lib/` is shared with the daemon, keep functions generic — no `@raycast/api` imports inside `lib/`.

## Conventions

- **No `@raycast/api` in `lib/`** — the shared library must remain importable by the daemon (plain Node.js); all Raycast UI primitives stay in the command files
- **Read config directly, mutate via CLI** — never write to `~/.bufo` files directly from the extension; always shell out to `bufo` for mutations so the CLI remains the single source of truth
- **`useCachedPromise` for all async data** — provides keepPreviousData and automatic cache; don't use raw `useEffect` + `useState` for data fetching
- **Silent AppleScript failures** — `focusSession` and `getActiveSessions` swallow errors; iTerm2 may not be running
- **30-second timeout on `bufo` calls** — tadpole creation can be slow (git worktree + submodules); don't lower this
- **TypeScript strict** — tsconfig inherits Raycast's strict config; no `any`

## Verification Checklist

After changes, verify:

- [ ] `npm run build` succeeds with no TypeScript or lint errors
- [ ] `npm run dev` registers commands in Raycast without errors
- [ ] **List Tadpoles** shows projects and tadpoles; active ones have green dot
- [ ] **New Tadpole** form submits and creates a tadpole via `bufo`
- [ ] **List Sessions** shows sessions grouped by project; active ones have green dot
- [ ] **New Session** form submits and starts a session via `bufo`
- [ ] **New Main Tadpole** form submits and opens main repo via `bufo`
- [ ] `bufo raycast install` copies files cleanly and extension appears in Raycast (not under Development tab)
- [ ] No `@raycast/api` imports inside `src/lib/` files
- [ ] `daemon/src/lib/` symlink still resolves correctly after any `lib/` file additions
- [ ] `dist-install/` rebuilt and committed if commands or lib files changed
