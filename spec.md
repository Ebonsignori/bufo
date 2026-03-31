# Bufo — TypeScript Migration Spec

> **Status:** Draft · Last updated: 2026-03-30
> This document is the living reference for Bufo's incremental rewrite from Bash to TypeScript. Update it as decisions are made and milestones are completed.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current Architecture](#2-current-architecture)
3. [Target: `packages/core`](#3-target-packagescore)
4. [Module-by-Module Migration](#4-module-by-module-migration)
5. [Target Monorepo Structure](#5-target-monorepo-structure)
6. [Key Design Decisions](#6-key-design-decisions)
7. [What Stays Bash](#7-what-stays-bash)
8. [Testing Strategy](#8-testing-strategy)
9. [Migration Milestones](#9-migration-milestones)

---

## 1. Executive Summary

### Why migrate?

Bufo's core logic lives in ~20 Bash modules (~4,000+ lines). Meanwhile, the daemon and Raycast extension are already TypeScript and share identical copies of five library files via a fragile symlink. The split creates real friction:

- Config logic is read-only in TS, duplicated between daemon and Raycast
- New features (WIP, sessions, companions) exist only in Bash, so the daemon/Raycast can't call them without shelling out to the CLI
- Bash has no types, no easy unit testing for complex logic, and poor IDE support
- The `daemon/src/lib/` directory is a symlink to `raycast/src/lib/` — a single-source-of-truth hack that breaks if either side is moved

### Goals

- **Single shared library** (`packages/core`) consumed by daemon, Raycast, and eventually the CLI
- **Typed data contracts** for all config, state, and iTerm2 interactions
- **Testable logic** — pure functions for port math, state R/W, config parsing, etc.
- **Incremental migration** — the Bash CLI remains fully functional at every step until Phase 4

### Non-goals

- No cross-platform support (this is macOS/iTerm2-only by design)
- No runtime environment change (Node.js is already a runtime dependency for the daemon)
- No user-facing breaking changes during migration

### Approach

Phases 0–3 add TypeScript equivalents module by module without touching the Bash CLI. Phase 4 replaces the Bash entry point with a compiled TS binary and retires `src/bufo`. The Bash test suite (`make test`) stays green throughout.

---

## 2. Current Architecture

### Source Layout

```
bufo/
├── src/                        # Bash CLI (~4,000 lines)
│   ├── bufo                    # Entry point: sources all libs, main() case router
│   └── lib/
│       ├── common.sh           # Colors, globals, error/warn/info/success
│       ├── config.sh           # Config loading, AI-tool helpers
│       ├── state.sh            # iTerm2 session-ID persistence (tp<N>.json)
│       ├── iterm.sh            # AppleScript wrapper (16+ functions)
│       ├── tadpole.sh          # Core tadpole operations
│       ├── worktree.sh         # Git worktree creation + submodules
│       ├── infobar.sh          # .bufo-meta R/W + info-bar rendering
│       ├── ports.sh            # Port math + env file syncing + port kill
│       ├── companions.sh       # Companion repo management
│       ├── session.sh          # Named session lifecycle
│       ├── review.sh           # PR review + chorus (multi-agent) review
│       ├── pr.sh               # bufo pr command
│       ├── merge.sh            # bufo merge command
│       ├── ticket.sh           # bufo ticket command
│       ├── wip.sh              # WIP save/restore
│       ├── projects.sh         # Multi-project resolution + alias management
│       ├── prompts.sh          # Prompt file loader + default writer
│       ├── init.sh             # bufo init (project registration)
│       ├── setup.sh            # iTerm2 keybindings + logging setup
│       ├── doctor.sh           # Dependency + config diagnostics
│       ├── web.sh              # launchctl daemon management
│       ├── raycast.sh          # Raycast install/dev shims
│       └── help.sh             # show_help, show_cheat
├── daemon/
│   ├── src/
│   │   ├── server.ts           # HTTP + WebSocket server
│   │   ├── applescript.ts      # Async osascript wrappers
│   │   ├── poller.ts           # Terminal output polling
│   │   ├── logwatcher.ts       # PTY log file tailing
│   │   ├── cleanup.ts          # Log retention
│   │   └── lib/                # ← SYMLINK → raycast/src/lib/
│   │       ├── types.ts
│   │       ├── config.ts
│   │       ├── bufo.ts
│   │       ├── exec.ts
│   │       └── iterm.ts
│   ├── package.json
│   └── tsconfig.json
├── raycast/
│   ├── src/
│   │   ├── list-tadpoles.tsx
│   │   ├── new-tadpole.tsx
│   │   ├── new-session.tsx
│   │   ├── list-sessions.tsx
│   │   ├── new-main-tadpole.tsx
│   │   └── lib/                # ← canonical source for symlink above
│   │       ├── types.ts
│   │       ├── config.ts
│   │       ├── bufo.ts
│   │       ├── exec.ts
│   │       └── iterm.ts
│   ├── package.json
│   └── tsconfig.json
├── tests/                      # Bash unit tests
├── install.sh
└── Makefile
```

### Data Flow (current)

```
CLI invocation
  └─ src/bufo (bash entry point)
       ├─ sources all lib/*.sh
       ├─ resolve_project → sets CONFIG_FILE, PROJECT_ALIAS
       ├─ load_config → populates globals (SESSION_NAME, TADPOLE_BASE, …)
       └─ case router
            ├─ tadpole commands → tadpole.sh + iterm.sh + state.sh
            ├─ pr/ticket/merge  → pr.sh / ticket.sh / merge.sh
            ├─ wip              → wip.sh
            ├─ session          → session.sh
            ├─ review/chorus    → review.sh
            └─ web/raycast      → web.sh / raycast.sh

Daemon (separate process, HTTP+WS)
  └─ server.ts
       ├─ reads state via lib/config.ts + lib/bufo.ts (file I/O)
       ├─ polls iTerm2 via poller.ts + logwatcher.ts
       └─ shells out to bufo CLI via lib/exec.ts for write ops

Raycast (extension process)
  └─ *.tsx commands
       ├─ reads state via lib/config.ts + lib/bufo.ts (same files as daemon)
       └─ shells out to bufo CLI via lib/exec.ts for all ops
```

### The Symlink Problem

`daemon/src/lib/` is a directory symlink pointing to `raycast/src/lib/`. This means:

- Edits to either appear in both — but only if you edit via the canonical `raycast/src/lib/` path
- Both packages compile their own copy: no shared package.json dependency, just a filesystem trick
- Any new file added to `raycast/src/lib/` is automatically "in" the daemon — surprising behavior
- The symlink is invisible to TypeScript module resolution and npm workspaces

The migration eliminates this by extracting into `packages/core`.

### External Runtime Dependencies

| Tool | Used for | Bash module | TS equivalent |
|---|---|---|---|
| `yq` | YAML parsing | `config.sh`, many | `js-yaml` (already used) |
| `jq` | JSON R/W | `state.sh`, `infobar.sh`, `wip.sh` | `fs` + `JSON.parse/stringify` |
| `git` | Worktrees, patches, branches | `worktree.sh`, `merge.sh`, `wip.sh` | `execa('git', ...)` |
| `gh` | PR checkout, PR data fetch | `pr.sh`, `review.sh` | `execa('gh', ...)` |
| `osascript` | iTerm2 AppleScript | `iterm.sh` | already in `applescript.ts` |
| `lsof` | Port detection | `ports.sh` | `execa('lsof', ...)` |
| `pkill` / `kill` | Port/process kill | `ports.sh` | `execa('pkill', ...)` |
| `launchctl` | Daemon management | `web.sh` | `execa('launchctl', ...)` |
| `PlistBuddy` | iTerm2 plist edit | `setup.sh` | `execa('/usr/libexec/PlistBuddy', ...)` |
| `fzf` | Interactive pickers | `wip.sh`, `session.sh` | keep as-is (optional dep) |
| `curl` | Self-update | `src/bufo` | Node `https` module |

---

## 3. Target: `packages/core`

The shared library consolidates all code currently in `daemon/src/lib/` and `raycast/src/lib/`, plus new modules for the data layer that currently exists only in Bash.

### Already-complete modules (move from raycast/src/lib/)

These files are already well-written and tested in production. Migration = move + update import paths.

#### `types.ts`
All shared TypeScript interfaces. Currently complete; minor additions needed as new modules land.

Key interfaces:
```typescript
BufoProject        // project YAML shape
TadpoleMeta        // .bufo-meta JSON
TadpoleState       // tp<N>.json shape
BufoTadpole        // fully-resolved tadpole (project + state + meta)
GlobalConfig       // ~/.bufo/config.yaml
BufoSession        // session.yaml + layout.json
SessionLayout      // layout.json
```

**New types to add:**
```typescript
WipMetadata        // ~/.bufo/wip/.../metadata.json
CompanionConfig    // companions: block in project YAML
EnvSyncConfig      // env_sync: block in project YAML
InfolinkConfig     // infobar.links[] in project YAML
PortResult         // { apiPort, appPort, needOverride }
```

#### `config.ts`
Reads all YAML/JSON config files from `~/.bufo/`. Currently handles projects, state, sessions, meta, lock files, custom names.

**Gaps to fill:**
- `loadWipMetadata(alias, prefix, num, wipName)` — read `metadata.json` from WIP dir
- `loadGlobalConfig` — already exists but `log_retention_days` and `default_ai_tool` not typed
- Full `BufoProject` schema coverage for `companions`, `env_sync`, `submodules`, `cleanup`, `ticket`, `review`, `infobar` sections

#### `bufo.ts`
`discoverTadpoles`, `getAllTadpoles`, `getTadpoleDir`, `getTadpoleTitle`, `getTadpoleSubtitle`. Complete.

#### `exec.ts`
`runBufoSync`, `runBufoAsync`, `getGitBranch`. Complete.

#### `iterm.ts`
Sync AppleScript: `focusSession`, `getActiveSessions`, `isItermRunning`. Complete.

---

### New modules to add to `packages/core`

#### `state.ts`

TypeScript port of `src/lib/state.sh`. Pure file I/O — no iTerm2 calls.

```typescript
// Read/write ~/.bufo/state/<session>/tp<N>.json
function saveState(session: string, num: number, state: TadpoleState): Promise<void>
function loadState(session: string, num: number): Promise<TadpoleState | null>
function removeState(session: string, num: number): Promise<void>
function listStates(session: string): Promise<number[]>
// Returns true only if file exists AND iTerm2 session ID is alive
function stateExists(session: string, num: number): Promise<boolean>
```

**Key detail:** `stateExists` must call `iterm_session_exists` equivalent (via `iterm.ts:getActiveSessions()`) to validate liveness, not just check the file.

#### `meta.ts`

TypeScript port of the `.bufo-meta` R/W portion of `src/lib/infobar.sh`.

```typescript
function readMeta(dir: string): Promise<TadpoleMeta | null>
function writeMeta(dir: string, meta: TadpoleMeta): Promise<void>
function clearMeta(dir: string): Promise<void>
function extractTicketFromBranch(branch: string): string | null  // "ENG-123" extraction
function extractLinearUrlFromBody(text: string): string | null
```

**Does not include** the infobar rendering logic (OSC-8 terminal output) — that stays bash or moves to `packages/cli`.

#### `ports.ts`

TypeScript port of `src/lib/ports.sh` (data/math layer only — not port killing).

```typescript
// Port arithmetic
function computePorts(project: BufoProject, num: number): PortResult
function findAvailablePort(base: number): Promise<number>

// .env file management
function syncEnvFiles(dir: string, num: number, project: BufoProject, quiet?: boolean): Promise<void>
function readEnvPort(dir: string, type: 'api' | 'app', project: BufoProject): Promise<number | null>
```

Port killing (`kill_workspace_ports`) is an I/O-heavy operation that goes in `packages/cli` (Phase 1), not `core`.

#### `wip.ts`

TypeScript port of the data layer of `src/lib/wip.sh`. The high-level `wip_save`/`wip_restore` functions (which create git patches and call AI) stay in Bash until Phase 3.

```typescript
// Data R/W only
function getWipDir(alias: string, prefix: string, num: number): string
function listWips(alias: string, prefix: string, num: number): Promise<WipEntry[]>
function listAllWips(alias: string): Promise<WipEntry[]>
function loadWipMetadata(wipPath: string): Promise<WipMetadata | null>
function deleteWip(wipPath: string): Promise<void>

interface WipEntry {
  path: string;
  metadata: WipMetadata;
}

interface WipMetadata {
  timestamp: string;
  slug: string;
  summary: string;
  tadpole: number;
  branch: string;
  commits_ahead: number;
  created_at: string;
}
```

#### `session.ts`

TypeScript port of the data layer of `src/lib/session.sh`. The iTerm2 layout open/resume functions stay bash until Phase 3.

```typescript
function getSessionsDir(project: BufoProject): string
function createSession(project: BufoProject, name: string, context?: string): Promise<void>
function updateSession(project: BufoProject, name: string, field: string, value: string): Promise<void>
function getSession(project: BufoProject, name: string, field: string): Promise<string | null>
function loadSessionFull(project: BufoProject, name: string): Promise<BufoSession | null>
function listSessions(project: BufoProject, filter?: string): Promise<BufoSession[]>
function deleteSession(project: BufoProject, name: string): Promise<void>
function saveSessionLayout(sessionDir: string, layout: SessionLayout): Promise<void>
function loadSessionLayout(sessionDir: string): Promise<SessionLayout | null>
```

#### `prompts.ts`

TypeScript port of `src/lib/prompts.sh`.

```typescript
// Resolution order: project-local > global > hardcoded default
function loadPrompt(name: string, defaultContent: string, vars?: Record<string, string>): Promise<string>
function initPrompts(promptsDir: string): Promise<void>  // writes defaults if missing
```

---

### `packages/core` Package Setup

```json
// packages/core/package.json
{
  "name": "@bufo/core",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "test": "vitest run",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "js-yaml": "^4.1.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "vitest": "^2.0.0",
    "@types/js-yaml": "^4.0.0",
    "@types/node": "^22.0.0"
  }
}
```

**`daemon/package.json`** and **`raycast/package.json`** gain a workspace dependency:
```json
"@bufo/core": "workspace:*"
```

Root `package.json` declares npm workspaces:
```json
{
  "workspaces": ["packages/*", "daemon", "raycast"]
}
```

---

## 4. Module-by-Module Migration

For each module: bash source → TS target, functions, dependencies, phase, test approach.

---

### Phase 0 — Pure Data Layer (no iTerm2, no shell-outs)

All of these can be written, tested, and adopted by daemon/Raycast without touching the Bash CLI.

---

#### `config` (extend existing)

**Bash source:** `src/lib/config.sh`
**TS target:** `packages/core/src/config.ts` (extend existing)
**Phase:** 0

Existing coverage: `loadGlobalConfig`, `loadProject`, `discoverProjects`, `loadTadpoleState`, `loadTadpoleMeta`, `isTadpoleLocked`, `getCustomName`, `loadSession`, `discoverSessions`, `getAllSessions`.

**New functions:**
```typescript
loadAllProjectConfigs(): Promise<Map<string, BufoProject>>
validateProject(project: BufoProject): ValidationResult
resolveProjectFromCwd(cwd: string): Promise<BufoProject | null>
resolveProjectFromGithubUrl(url: string): Promise<BufoProject | null>
resolveProjectFromTicketUrl(url: string): Promise<BufoProject | null>
```

**Dependencies:** `js-yaml`, `fs/promises`
**Tests:** Unit — temp dir with fixture YAML files; no system deps.

---

#### `state` (new)

**Bash source:** `src/lib/state.sh`
**TS target:** `packages/core/src/state.ts`
**Phase:** 0

See API in §3. Key behaviors:
- Writes to `~/.bufo/state/<session>/tp<N>.json` atomically (write tmp → rename)
- `stateExists` cross-references with live iTerm2 session list; removes stale files automatically
- Falls back to reading `ws<N>.json` (legacy) when `tp<N>.json` is absent

**Dependencies:** `config.ts`, `iterm.ts`
**Tests:** Unit — mock `iterm.ts:getActiveSessions()`, use temp dir for state files.

---

#### `meta` (new)

**Bash source:** `src/lib/infobar.sh` (meta portion only)
**TS target:** `packages/core/src/meta.ts`
**Phase:** 0

See API in §3.

`extractTicketFromBranch` regex: `/([A-Z]+-\d+)/i` (extracts first `ENG-123`-style segment)
`extractLinearUrlFromBody` regex: `/(https:\/\/linear\.app\/[^\s)]+)/`

**Dependencies:** `fs/promises`
**Tests:** Unit — pure string/file tests, no system deps.

---

#### `ports` (new, data layer)

**Bash source:** `src/lib/ports.sh`
**TS target:** `packages/core/src/ports.ts`
**Phase:** 0

Port math:
```
apiPort = api_base + (num * port_spacing)
appPort = app_base + (num * port_spacing)
port_spacing defaults to 10
```

`syncEnvFiles` logic:
1. For each `env_sync.files[]:` entry:
   a. Determine source: `copy_from` if set, else same path in `main_repo`
   b. Copy to tadpole dir if missing
   c. Rewrite `ports:` variables to computed port value
   d. Rewrite `refs:` URL variables (replace port number inside URL)
   e. Apply `overrides:` static key=value substitutions

**Dependencies:** `fs/promises`
**Tests:** Unit — fixture `.env` files in temp dir; assert rewrites.

---

#### `wip` data layer (new)

**Bash source:** `src/lib/wip.sh` (data layer only)
**TS target:** `packages/core/src/wip.ts`
**Phase:** 0

See API in §3.

WIP dir path: `~/.bufo/wip/<alias>/<prefix>-<N>/<timestamp>-<slug>/`

**Dependencies:** `fs/promises`
**Tests:** Unit — create fixture WIP dirs with `metadata.json`; assert list/load/delete.

---

#### `session` data layer (new)

**Bash source:** `src/lib/session.sh` (data layer only)
**TS target:** `packages/core/src/session.ts`
**Phase:** 0

See API in §3.

Session dir path: `~/.bufo/sessions/<project>/<name>/`
Files: `session.yaml`, `layout.json`, `.bufo-meta` (optional)

**Dependencies:** `config.ts`, `js-yaml`, `fs/promises`
**Tests:** Unit — temp dir fixtures; assert YAML round-trip and list.

---

#### `prompts` (new)

**Bash source:** `src/lib/prompts.sh`
**TS target:** `packages/core/src/prompts.ts`
**Phase:** 0

Resolution order for `loadPrompt(name, default)`:
1. `~/.bufo/projects/<alias>/prompts/<name>.md`
2. `~/.bufo/prompts/<name>.md`
3. `defaultContent` (hardcoded fallback)

Variable substitution: replace `{KEY}` with `vars[KEY]` (same as bash `sed -e "s|{KEY}|VALUE|g"`).

`initPrompts(dir)` writes default content for all prompt files if they don't exist.

**Default prompt names:**
`chorus-conductor`, `singer-codex`, `review-standard`, `review-summary`, `pr-open`, `ticket-linear`, `ticket-github-issue`, `claude-md-team-mode`, `merge-conflict`, `wip-summary`

**Dependencies:** `fs/promises`
**Tests:** Unit — temp dir, verify resolution order and variable substitution.

---

### Phase 1 — iTerm2 + Shell-out Operations

---

#### `iterm` (consolidate async + sync)

**Bash source:** `src/lib/iterm.sh`
**TS target:** `packages/core/src/iterm.ts` (extend existing) + keep `applescript.ts` in daemon only
**Phase:** 1

Currently there are two TS files:
- `raycast/src/lib/iterm.ts` — sync, used by Raycast (blocking AppleScript via `execSync`)
- `daemon/src/applescript.ts` — async, used by daemon for terminal I/O

`packages/core/src/iterm.ts` should provide **async** versions of all functions (matching the daemon's `applescript.ts` interface), plus re-export sync variants where needed:

```typescript
// Window/tab management
createWindow(name: string, dir: string): Promise<{ windowId: string; tabId: string; sessionId: string }>
createTab(name: string, dir: string): Promise<{ tabId: string; sessionId: string }>
splitVertical(sessionId: string): Promise<string>
splitHorizontal(sessionId: string): Promise<string>
splitHorizontalThin(sessionId: string, rows?: number): Promise<string>

// Interaction
sendText(sessionId: string, text: string): Promise<void>
sendInterrupt(sessionId: string): Promise<void>
captureSession(sessionId: string): Promise<string>
getSessionSize(sessionId: string): Promise<{ rows: number; cols: number }>

// Navigation
focusSession(sessionId: string): Promise<void>
focusTab(tabName: string): Promise<void>
closeSession(sessionId: string): Promise<void>
closeTabBySession(sessionId: string): Promise<void>
renameTabBySession(sessionId: string, name: string): Promise<void>

// Queries
sessionExists(sessionId: string): Promise<boolean>
getActiveSessions(): string[]  // sync — used at startup
isItermRunning(): boolean      // sync
isItermInstalled(): boolean    // sync
listSessions(): Promise<string[]>
```

**Session ID format:** `w<N>t<N>p<N>:<UUID>` — AppleScript uses `<UUID>` for addressing; the prefix is human-readable metadata.

**Dependencies:** `child_process` or `execa`
**Tests:** Integration — gated on `process.env.ITERM2_RUNNING === '1'`. Unit tests mock `osascript`.

---

#### Port kill (new, in `packages/cli`)

**Bash source:** `src/lib/ports.sh` (`kill_workspace_ports`)
**TS target:** `packages/cli/src/ports.ts`
**Phase:** 1

Three-phase kill:
1. `pkill -f <kill_pattern>` with `{N}` and `{PREFIX}` substituted
2. `lsof -t -c <process-that-matches-cwd>` → kill PIDs
3. `lsof -t -i:<port>` for each managed port → kill PIDs

Returns `{ killed: number[] }`.

**Dependencies:** `execa`, `ports.ts` from core
**Tests:** Unit — mock `execa`; verify correct patterns are constructed.

---

#### `worktree` (new, in `packages/cli`)

**Bash source:** `src/lib/worktree.sh`
**TS target:** `packages/cli/src/worktree.ts`
**Phase:** 1

```typescript
function getBranchName(project: BufoProject, num: number): string
function createWorktree(project: BufoProject, num: number): Promise<void>
function initSubmodules(dir: string, mainRepo: string, submodules: SubmoduleConfig[]): Promise<void>
function resetSubmodules(dir: string, submodules: SubmoduleConfig[]): Promise<void>
function setupSharedVolume(dir: string, volumePath: string, linkAs: string): Promise<void>
```

`getBranchName` expands `BRANCH_PATTERN` (`tadpole-{N}`) → `tadpole-2`.
`createWorktree` orchestrates: `git worktree add`, submodules, shared volume, companions, `.env` sync, `install_command`.

**Dependencies:** `execa` (git), `ports.ts` (env sync), `companions.ts` (Phase 2)
**Tests:** Unit — mock `execa`, assert git commands constructed correctly.

---

### Phase 2 — Tadpole + Project Logic (no iTerm2 layout creation)

---

#### Tadpole data layer (new, in `packages/cli`)

**Bash source:** `src/lib/tadpole.sh` (lock/name/list only)
**TS target:** `packages/cli/src/tadpole.ts`
**Phase:** 2

```typescript
function getTadpoleName(project: BufoProject, num: number): string
function setTadpoleName(project: BufoProject, num: number, name: string): Promise<void>
function clearTadpoleName(project: BufoProject, num: number): Promise<void>
function computeTabTitle(project: BufoProject, num: number): Promise<string>
function lockTadpole(project: BufoProject, num: number): Promise<void>
function unlockTadpole(project: BufoProject, num: number): Promise<void>
function unlockAll(project: BufoProject): Promise<void>
function findUnlocked(project: BufoProject): Promise<number | null>
function listTadpoles(project: BufoProject): Promise<BufoTadpole[]>
function detectTadpoleFromDir(project: BufoProject, cwd: string): number | null
function findNextSlot(project: BufoProject): number
```

**Dependencies:** `config.ts`, `state.ts`, `meta.ts`
**Tests:** Unit — temp dir fixtures; no iTerm2.

---

#### Project resolution (new, in `packages/core`)

**Bash source:** `src/lib/projects.sh`
**TS target:** `packages/core/src/config.ts` (add `resolveProject*` functions — see Phase 0 additions)
**Phase:** 2

The resolution functions (`resolveProjectFromCwd`, `resolveProjectFromGithubUrl`, `resolveProjectFromTicketUrl`) are pure config lookups and belong in `core`.

---

#### Companions (new, in `packages/cli`)

**Bash source:** `src/lib/companions.sh`
**TS target:** `packages/cli/src/companions.ts`
**Phase:** 2

```typescript
function setupCompanions(project: BufoProject, dir: string, force?: boolean): Promise<void>
function syncAllCompanions(project: BufoProject, replace?: boolean): Promise<void>
function showCompanions(project: BufoProject): Promise<void>
function fetchCompanions(project: BufoProject): Promise<void>
```

**Dependencies:** `execa` (git), `fs/promises` (symlinks)

---

#### Doctor (new, in `packages/cli`)

**Bash source:** `src/lib/doctor.sh`
**TS target:** `packages/cli/src/doctor.ts`
**Phase:** 2

```typescript
interface DoctorResult {
  checks: Array<{ name: string; ok: boolean; message?: string }>;
  allOk: boolean;
}

function runDoctor(project?: BufoProject): Promise<DoctorResult>
function runDoctorFix(project: BufoProject, force?: boolean): Promise<void>
```

Checks: yq, jq, iTerm2 installed, git, config exists, tadpole dirs exist, `.env` files present.

---

### Phase 3 — Full Command Implementations

These require all of Phase 0–2 to be complete. Each corresponds to a top-level `bufo` command group.

---

#### Tadpole layout (complete `tadpole.ts`)

**Bash source:** `src/lib/tadpole.sh` (create/open/restart/cleanup/destroy/quit)
**Phase:** 3

Adds to `packages/cli/src/tadpole.ts`:
```typescript
function openTadpole(project: BufoProject, num: number, prompt?: string): Promise<void>
function createNewTadpole(project: BufoProject, opts?: CreateOptions): Promise<void>
function restartTadpole(project: BufoProject, num: number): Promise<void>
function cleanupTadpole(project: BufoProject, num: number): Promise<void>
function continueTadpole(project: BufoProject, num: number): Promise<void>
function destroyTadpole(project: BufoProject, num: number, flag?: string): Promise<void>
function quitTadpole(project: BufoProject, dir: string): Promise<void>
function openMainTadpole(project: BufoProject): Promise<void>
function switchTadpole(project: BufoProject, num?: number): Promise<void>
function prepareTadpoleForReuse(project: BufoProject, num: number): Promise<void>
```

`createTadpoleLayout` (the iTerm2 pane-creation function) also moves here.

---

#### PR commands

**Bash source:** `src/lib/pr.sh`
**TS target:** `packages/cli/src/commands/pr.ts`
**Phase:** 3

```typescript
function handlePr(project: BufoProject, identifier: string): Promise<void>
function handleWsPr(project: BufoProject, tpNum: number, identifier: string): Promise<void>
```

Internally: `fetchPrMetadata` (gh CLI), `checkoutPrBranch`, `buildPrPrompt`, `openTadpole`.

---

#### Ticket commands

**Bash source:** `src/lib/ticket.sh`
**TS target:** `packages/cli/src/commands/ticket.ts`
**Phase:** 3

```typescript
function parseTicketIdentifier(input: string): string | null
function isGithubIssueUrl(url: string): boolean
function handleTicket(project: BufoProject, identifier: string): Promise<void>
```

---

#### Merge

**Bash source:** `src/lib/merge.sh`
**TS target:** `packages/cli/src/commands/merge.ts`
**Phase:** 3

```typescript
function getDefaultBranch(dir?: string): Promise<string>
function handleMerge(project: BufoProject, opts: { dryRun?: boolean; num?: number }): Promise<void>
```

---

#### WIP (full)

**Bash source:** `src/lib/wip.sh`
**TS target:** `packages/cli/src/commands/wip.ts`
**Phase:** 3

```typescript
function wipSave(project: BufoProject, num: number, opts: { restart?: boolean; name?: string }): Promise<void>
function wipRestore(project: BufoProject, opts: RestoreOpts): Promise<void>
function wipContinue(project: BufoProject, num: number, open?: boolean): Promise<void>
function wipResume(project: BufoProject, num: number): Promise<void>
```

AI integration: `generateWipSummary(diff: string): Promise<{ slug: string; summary: string }>` — pipes diff to configured AI tool.

---

#### Review/Chorus

**Bash source:** `src/lib/review.sh`
**TS target:** `packages/cli/src/commands/review.ts`
**Phase:** 3

This is the most complex module (~850 lines of Bash). Key functions:
```typescript
function handleReview(project: BufoProject, args: string[]): Promise<void>
function handleChorus(project: BufoProject, args: string[]): Promise<void>
function fetchPrData(owner: string, repo: string, num: string, opts?: FetchOpts): Promise<string>
function buildChorusInstructions(singerFiles?: string[]): string
```

Chorus creates multiple iTerm2 panes ("singers"), each running an AI agent. The conductor pane synthesizes results.

---

#### Session (full iTerm2 ops)

**Bash source:** `src/lib/session.sh` (layout open/resume)
**TS target:** `packages/cli/src/commands/session.ts`
**Phase:** 3

Adds iTerm2 layout operations on top of Phase 0's data layer:
```typescript
function sessionStart(project: BufoProject, name: string, context?: string): Promise<void>
function sessionResume(project: BufoProject, name: string): Promise<void>
function closeSessionPanes(sessionDir: string): Promise<void>
```

---

### Phase 4 — CLI Entry Point

Replace `src/bufo` (bash router) with a compiled TypeScript binary.

**Target:** `packages/cli/src/index.ts`

```typescript
#!/usr/bin/env node
import { main } from './main.js';
main(process.argv.slice(2)).catch((e) => {
  console.error(e.message);
  process.exit(1);
});
```

`main()` replicates the `case` router from `src/bufo`:
- Parse project prefix (`@alias` or default from cwd)
- Load and validate config
- Route to command handler

Command handlers map to: `tadpole.ts`, `pr.ts`, `ticket.ts`, `merge.ts`, `wip.ts`, `review.ts`, `session.ts`, `doctor.ts`, `companions.ts`, plus thin shims for `web`, `raycast`, `init`, `setup`.

**`src/bufo` shim** (kept during transition):
```bash
#!/usr/bin/env bash
# Temporary shim — delegates to compiled TS CLI
exec node "$(dirname "$0")/../packages/cli/dist/index.js" "$@"
```

**Init and setup** (`init.sh`, `setup.sh`):
These are interactive onboarding flows with complex prompts. Recommend keeping them Bash-last (Phase 4 but deprioritized) — they're rarely run and have no library consumers.

---

## 5. Target Monorepo Structure

```
bufo/
├── package.json                    # Workspace root — defines workspaces[]
├── packages/
│   ├── core/                       # @bufo/core — shared library
│   │   ├── src/
│   │   │   ├── index.ts            # Barrel export (re-exports all public API)
│   │   │   ├── types.ts            # All shared interfaces
│   │   │   ├── config.ts           # Config file readers + project resolution
│   │   │   ├── state.ts            # iTerm2 state file R/W
│   │   │   ├── meta.ts             # .bufo-meta R/W + ticket extraction
│   │   │   ├── ports.ts            # Port arithmetic + env file sync
│   │   │   ├── wip.ts              # WIP metadata R/W (data layer)
│   │   │   ├── session.ts          # Session YAML + layout JSON R/W
│   │   │   ├── prompts.ts          # Prompt file loader
│   │   │   ├── bufo.ts             # Tadpole discovery
│   │   │   ├── exec.ts             # CLI shell-out helpers
│   │   │   └── iterm.ts            # iTerm2 AppleScript wrappers (async)
│   │   ├── tests/
│   │   │   ├── config.test.ts
│   │   │   ├── state.test.ts
│   │   │   ├── meta.test.ts
│   │   │   ├── ports.test.ts
│   │   │   ├── wip.test.ts
│   │   │   ├── session.test.ts
│   │   │   └── prompts.test.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vitest.config.ts
│   └── cli/                        # @bufo/cli — Phase 4 entry point
│       ├── src/
│       │   ├── index.ts            # Entry: #!/usr/bin/env node + main()
│       │   ├── main.ts             # Command router
│       │   ├── worktree.ts         # Git worktree operations
│       │   ├── companions.ts       # Companion repo management
│       │   ├── doctor.ts           # Dependency checks
│       │   ├── tadpole.ts          # Tadpole data + layout operations
│       │   ├── infobar.ts          # Info-bar rendering (OSC-8 output)
│       │   └── commands/
│       │       ├── pr.ts
│       │       ├── ticket.ts
│       │       ├── merge.ts
│       │       ├── wip.ts
│       │       ├── review.ts
│       │       ├── session.ts
│       │       ├── web.ts
│       │       ├── init.ts
│       │       └── setup.ts
│       ├── tests/
│       ├── package.json
│       └── tsconfig.json
├── daemon/                         # Existing — updated to use @bufo/core
│   ├── src/
│   │   ├── server.ts
│   │   ├── applescript.ts          # Kept here (daemon-specific async ops)
│   │   ├── poller.ts
│   │   ├── logwatcher.ts
│   │   └── cleanup.ts
│   │   # lib/ symlink REMOVED — use @bufo/core instead
│   ├── package.json                # + "@bufo/core": "workspace:*"
│   └── tsconfig.json
├── raycast/                        # Existing — updated to use @bufo/core
│   ├── src/
│   │   ├── list-tadpoles.tsx
│   │   ├── new-tadpole.tsx
│   │   ├── new-session.tsx
│   │   ├── list-sessions.tsx
│   │   ├── new-main-tadpole.tsx
│   │   └── lib/                    # KEPT as canonical; daemon symlink replaced
│   ├── package.json                # + "@bufo/core": "workspace:*"
│   └── tsconfig.json
├── src/                            # Bash CLI (stays until Phase 4)
│   ├── bufo                        # → shim in Phase 4
│   └── lib/
│       └── *.sh
├── tests/                          # Bash tests — stay green throughout
│   └── *.sh
├── install.sh                      # Stays bash permanently
└── Makefile
```

### Workspace Root `package.json`

```json
{
  "name": "bufo",
  "private": true,
  "workspaces": [
    "packages/*",
    "daemon",
    "raycast"
  ],
  "scripts": {
    "build": "npm run build --workspaces",
    "test:ts": "npm run test --workspace=packages/core",
    "test:bash": "make test"
  }
}
```

---

## 6. Key Design Decisions

### Shell-out: `execa` over `child_process`

Use [`execa`](https://github.com/sindresorhus/execa) for all external process calls (git, gh, osascript, lsof, pkill). Reasons:
- Typed results (`{ stdout, stderr, exitCode }`)
- No shell injection risk (array argv, not shell string)
- Promise-based with clean error types
- Already transitively available (daemon uses Node's built-in `child_process` now — switch to execa)

```typescript
import { execa } from 'execa';
const { stdout } = await execa('git', ['branch', '--show-current'], { cwd: dir });
```

### Config Validation: Zod

Use [Zod](https://zod.dev) for project YAML and global config validation instead of hand-written checks. This replaces `validate_config` in `config.sh`.

```typescript
import { z } from 'zod';

const ProjectSchema = z.object({
  session_name: z.string(),
  tadpole_base: z.string(),
  main_repo: z.string(),
  tadpoles: z.object({ count: z.number(), prefix: z.string(), branch_pattern: z.string() }),
  // ... all optional fields with defaults
});
```

Zod `.safeParse()` returns a typed result — no exceptions on bad input.

### Atomic File Writes

All state and metadata writes use atomic rename:
```typescript
import { writeFile, rename } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

async function atomicWrite(path: string, content: string): Promise<void> {
  const tmp = join(tmpdir(), `bufo-${Date.now()}-${Math.random()}`);
  await writeFile(tmp, content, 'utf8');
  await rename(tmp, path);
}
```

This matches the existing Bash pattern (`tmpfile=$(mktemp); ... ; mv "$tmpfile" "$dest"`).

### iTerm2 Session ID Format

Session IDs from AppleScript have the format `w3t1p2:550E8400-E29B-41D4-A716-446655440000`.

- Prefix `w<N>t<N>p<N>` is a human-readable coordinate (window, tab, pane)
- UUID is the stable identifier AppleScript uses to address sessions
- `sessionExists(id)` extracts the UUID and checks `getActiveSessions()`

### Error Handling Conventions

**Library functions** (`packages/core`):
- Return `{ ok: true; value: T }` or `{ ok: false; error: string }` for fallible operations
- Do not `process.exit` — let callers decide
- `null` is acceptable for "not found" returns (config readers, state loaders)

**CLI commands** (`packages/cli`):
- `error(msg)` prints to stderr and calls `process.exit(1)`
- `warn(msg)` prints to stderr, continues
- Mirror the existing `error`/`warn`/`info`/`success` color convention from `common.sh`

### CLI Argument Parsing

Use [`commander`](https://github.com/tj/commander.js) for the Phase 4 CLI entry point. It's lightweight, widely used, and supports the `bufo tp 2 cleanup` style of subcommand + positional args well.

Avoid `yargs` (heavier) and plain `process.argv` parsing (too fragile for the full command surface).

### macOS Guard

```typescript
if (process.platform !== 'darwin') {
  console.error('bufo requires macOS');
  process.exit(1);
}
```

### TypeScript Configuration

All packages use:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

`"type": "module"` in all `package.json` files — ESM throughout.

### No New Runtime Dependencies for Core Logic

`packages/core` should have minimal dependencies:
- `js-yaml` — already used everywhere
- `zod` — config validation
- `execa` — shell-outs

No lodash, no moment, no heavy utility libraries. Node's built-in `fs/promises`, `path`, `os`, `crypto` cover the rest.

---

## 7. What Stays Bash

### `install.sh` — permanent

The installer runs before Node.js is guaranteed to be available. It also:
- Creates symlinks from `~/.local/bin/` to `src/`
- Stamps the repo path into the installed copy
- Manages launchd plist installation

Stays Bash permanently. Cannot be migrated to TypeScript.

### `src/bufo` — shim during Phase 4, then retired

During Phase 4 transition, `src/bufo` becomes a thin shim:
```bash
#!/usr/bin/env bash
exec node "$(dirname "$0")/../packages/cli/dist/index.js" "$@"
```

Once `packages/cli` is stable and `install.sh` is updated to install the compiled binary directly, the shim and all `src/lib/*.sh` files are archived and removed.

### `.bufo-infobar.sh` generated scripts

The info-bar loop scripts are generated by `get_infobar_command` and written to each tadpole's directory. They:
- Run as a persistent process in pane 4
- Poll and render terminal UI (OSC-8 links, key bindings)
- Call `bufo _infobar-render`

The generator can move to TypeScript (`infobar.ts`), but the generated script content can remain Bash — it's simple, and requiring Node to run the info bar would add latency.

### Interactive setup: `init.sh`, `setup.sh`

`bufo init` and `bufo setup` are run once per project. The Bash implementations are stable and rarely modified. Migrate last (Phase 4, low priority).

### Prompt `.md` files

Prompt files (`~/.bufo/prompts/*.md`) are user-editable Markdown. They stay Markdown — only the loader (`prompts.ts`) moves to TypeScript.

---

## 8. Testing Strategy

### Guiding Principles

1. **Bash suite stays green at all times.** `make test` must pass throughout the entire migration.
2. **iTerm2 is always optional.** All tests that require a live iTerm2 session are skipped in CI. This matches the existing `skip_test` pattern.
3. **No real filesystem side effects in unit tests.** Use `tmp` directories from `os.tmpdir()` + cleanup in `afterEach`.
4. **Test behavior, not implementation.** Assert on observable state (files written, values returned) not on internal function calls.

### Phase 0–1: `packages/core` with Vitest

Add [Vitest](https://vitest.dev/) to `packages/core`:

```typescript
// packages/core/tests/ports.test.ts
import { describe, it, expect } from 'vitest';
import { computePorts } from '../src/ports.js';

describe('computePorts', () => {
  it('computes ports with default spacing', () => {
    const project = { ports: { api_base: 3200, app_base: 3000 } } as BufoProject;
    expect(computePorts(project, 2)).toEqual({ apiPort: 3220, appPort: 3020 });
  });
});
```

Tests run with `npm test --workspace=packages/core` — no system dependencies required.

**Coverage targets per module:**
| Module | Min coverage |
|---|---|
| `config.ts` (new fns) | 90% |
| `state.ts` | 85% |
| `meta.ts` | 90% |
| `ports.ts` | 95% |
| `wip.ts` | 85% |
| `session.ts` | 85% |
| `prompts.ts` | 90% |

### Phase 1: iTerm2 Mocking

Mock the `osascript` shell-out via dependency injection:

```typescript
// In iterm.ts, accept optional executor:
type Executor = (script: string) => string;

export function createIterm(exec: Executor = defaultExec): ItermClient { ... }
```

In tests:
```typescript
const mockExec = vi.fn().mockReturnValue('w1t1p0:some-uuid\nw1t1p1:other-uuid');
const iterm = createIterm(mockExec);
```

Integration tests (require real iTerm2) use:
```typescript
import { describe, it } from 'vitest';
const skipNoIterm = process.env.ITERM2_RUNNING !== '1' ? it.skip : it;
```

### Phase 2–3: Command Unit Tests

`packages/cli/tests/` follows the same pattern:
- Mock all external calls (`execa`, `iterm`)
- Use temp dirs for filesystem state
- One test file per command module

### Phase 4: End-to-End CLI Tests

Add `tests/test_cli_ts.sh` to the bash suite — calls the compiled TS binary and asserts exit codes + stdout:

```bash
assert "ts: --version" 0 node packages/cli/dist/index.js --version
assert "ts: help" 0 node packages/cli/dist/index.js help
```

Parity check: every command in `tests/test_commands.sh` gets a matching test in `test_cli_ts.sh`.

### CI

Add a `test:ts` target to `Makefile`:
```makefile
test: test-bash test-ts

test-bash:
    ./tests/run.sh

test-ts:
    npm run test --workspace=packages/core
```

---

## 9. Migration Milestones

| Milestone | Description | Success Criteria |
|---|---|---|
| **M0: Core Package** | Create `packages/core`, move `raycast/src/lib/` files in, update imports in daemon + Raycast, remove symlink | `npm run build` succeeds in all packages; `make test` passes; no symlink |
| **M1: Data Layer** | Add `state.ts`, `meta.ts`, `ports.ts`, `wip.ts`, `session.ts`, `prompts.ts` to core | Vitest suite ≥85% coverage; daemon + Raycast import from core |
| **M2: Shell-out Modules** | `packages/cli` created with `worktree.ts`, `companions.ts`, `doctor.ts`, port kill; Vitest tests | Unit tests pass with mocked execa |
| **M3: Tadpole + Commands** | `tadpole.ts` (full), `pr.ts`, `ticket.ts`, `merge.ts`, `wip.ts`, `review.ts`, `session.ts` | All commands callable from TS; bash CLI unchanged and still passing |
| **M4: CLI Entry Point** | `packages/cli/src/index.ts` + command router; `src/bufo` becomes shim; `install.sh` updated | `bufo --version`, `bufo help`, all commands work via TS binary; bash tests pass against TS binary |
| **M5: Cleanup** | Remove `src/lib/*.sh` (archive in git history); remove shim; update docs | `src/bufo` is the TS binary directly; bash tests suite fully ported to Vitest |

### Suggested Ordering Within Milestones

**M0 (1–2 days):**
1. Create `packages/core` with `package.json`, `tsconfig.json`
2. Copy (not move) files from `raycast/src/lib/` to `packages/core/src/`
3. Add `"@bufo/core": "workspace:*"` to daemon + raycast
4. Update all imports in daemon + raycast
5. Verify both packages build
6. Delete `daemon/src/lib/` symlink + `raycast/src/lib/` directory
7. Re-verify builds; run `make test`

**M1 (3–5 days):**
- Implement modules in dependency order: `meta` → `state` → `ports` → `wip` → `session` → `prompts`
- Write tests alongside each module
- No changes to bash or to daemon/Raycast behavior

**M2 (2–3 days):**
- Create `packages/cli` scaffold
- Implement `worktree.ts`, `companions.ts`, `doctor.ts`, `ports.ts` (kill)

**M3 (1–2 weeks):**
- Implement command modules in order: `tadpole` (data layer) → `pr` → `ticket` → `merge` → `wip` (full) → `session` (iTerm2) → `review/chorus`
- Each module has feature parity with its bash counterpart before moving to the next

**M4 (3–5 days):**
- Wire up `main.ts` command router
- Map all existing bash command aliases
- Update `install.sh` to install TS binary
- Flip `src/bufo` to shim
- Smoke test all commands

**M5 (1–2 days):**
- Archive `src/lib/*.sh` in a `legacy/` branch
- Remove from `main`
- Port remaining bash test cases to Vitest
- Update README

---

## Appendix: CLI Command → Handler Map

For Phase 4 implementation reference.

| Command | Phase 3 handler |
|---|---|
| `bufo` (no args) | `tadpole.listTadpoles()` |
| `bufo spawn/create` | `tadpole.createNewTadpole()` |
| `bufo tp [N]` | `tadpole.handleTp()` |
| `bufo tp N restart/cleanup/continue/destroy/lock/unlock/kill` | respective `tadpole.*` functions |
| `bufo tp N pr <ID>` | `pr.handleWsPr()` |
| `bufo tp N ticket <ID>` | `ticket.handleWsTicket()` |
| `bufo pr <ID\|URL>` | `pr.handlePr()` |
| `bufo ticket/tkt <ID\|URL>` | `ticket.handleTicket()` |
| `bufo merge [--dry-run] [N]` | `merge.handleMerge()` |
| `bufo wip [save\|ls\|restore\|…]` | `wip.handleWip()` |
| `bufo review [new\|ls\|resume]` | `review.handleReview()` |
| `bufo chorus/court [init\|ls\|…]` | `review.handleChorus()` |
| `bufo session [ls\|start\|resume\|delete\|summary]` | `session.handleSession()` |
| `bufo companions [sync\|fetch]` | `companions.handleCompanions()` |
| `bufo doctor [--fix]` | `doctor.runDoctor()` |
| `bufo web [status\|start\|stop\|…]` | `web.handleWeb()` |
| `bufo raycast [install\|dev]` | `raycast.handleRaycast()` |
| `bufo projects [rm\|…]` | `config.handleProjects()` |
| `bufo default [alias]` | `config.handleDefault()` |
| `bufo alias [set\|rm\|…]` | `config.handleAlias()` |
| `bufo config [scan]` | `config.handleConfig()` |
| `bufo main` | `tadpole.openMainTadpole()` |
| `bufo switch [N]` | `tadpole.switchTadpole()` |
| `bufo lock/unlock/unlock-all` | `tadpole.lock/unlock/unlockAll()` |
| `bufo kill` | `ports.killWorkspacePorts()` |
| `bufo save [--restart] [name]` | `wip.wipSave()` |
| `bufo init` | `init.showInit()` |
| `bufo install/update/upgrade` | system shell-outs |
| `bufo help/-h/--help` | print help |
| `bufo cheat` | print cheat sheet |
| `bufo --version/-v` | print version |
| `bufo _infobar-render <dir>` | `infobar.renderInfobar()` |
| `bufo _quit-tadpole <dir>` | `tadpole.quitTadpole()` |
| `bufo _kill-ports <dir>` | `ports.killWorkspacePorts()` |
| `bufo _cleanup-tadpole <dir>` | `tadpole.cleanupTadpoleInfobar()` |
| `bufo _merge-main <dir>` | `merge.mergeMain()` |
| `<github-PR-url>` | `pr.handlePr()` (URL auto-detected) |
| `<linear-url>` | `ticket.handleTicket()` (URL auto-detected) |
| `<github-issue-url>` | `ticket.handleTicket()` (URL auto-detected) |
