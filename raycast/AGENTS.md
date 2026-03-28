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
    lib/                 # Shared library (symlinked into daemon/src/lib/)
      types.ts           # BufoProject, BufoTadpole, TadpoleState, TadpoleMeta, GlobalConfig
      config.ts          # Config + state readers (no shell — pure fs/yaml)
      bufo.ts            # Tadpole discovery + display helpers
      exec.ts            # bufo CLI runner + git branch helper
      iterm.ts           # iTerm2 AppleScript helpers (focusSession, getActiveSessions)
  package.json           # Raycast extension manifest + dependencies
```

### Commands

| Command file | Raycast title | What it does |
|---|---|---|
| `list-tadpoles.tsx` | List Tadpoles | Shows all tadpoles grouped by project; focus, open, lock/unlock, copy branch, cleanup, destroy |
| `new-tadpole.tsx` | New Tadpole | Form to create a tadpole from a ticket/PR URL or slot number (`bufo @alias ticket` / `bufo @alias pr` / `bufo @alias tp N`) |

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
| `types.ts` | `BufoProject`, `BufoTadpole`, `TadpoleState`, `TadpoleMeta`, `GlobalConfig` |
| `config.ts` | `discoverProjects()`, `loadProject()`, `loadGlobalConfig()`, `loadTadpoleState()`, `loadTadpoleMeta()`, `isTadpoleLocked()`, `getCustomName()`, `bufoExists()` |
| `bufo.ts` | `getAllTadpoles()`, `discoverTadpoles()`, `getTadpoleTitle()`, `getTadpoleSubtitle()` |
| `exec.ts` | `runBufoAsync()`, `runBufoSync()`, `getGitBranch()` |
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
npm run build     # ray build — production build (e.g. before store submission)
npm run lint      # ray lint (eslint + prettier)
npm run fix-lint  # ray lint --fix
```

### Running the Extension

Run `npm run dev` — this registers all commands in Raycast and keeps them available as long as the process is running. There is no "import from filesystem" option for non-store extensions.

Alternatives if a persistent background process is undesirable:
- **Raycast Teams (Pro)** — share private extensions without publishing publicly
- **Publish to the store** — requires a review process, makes it public

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
- [ ] No `@raycast/api` imports inside `src/lib/` files
- [ ] `daemon/src/lib/` symlink still resolves correctly after any `lib/` file additions
