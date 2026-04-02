/**
 * Per-agent prompt templates for each migration task.
 *
 * Every prompt follows the same 4-section structure:
 *   1. ## Your Task         — one-sentence objective
 *   2. ## Context           — specific files to read first
 *   3. ## Spec              — exact function signatures and behaviors from spec.md
 *   4. ## Validation        — commands that must pass before committing
 *
 * The REPO_ROOT placeholder is replaced at runtime.
 */

// ─── Common preamble injected into every prompt ───────────────────────────────

const COMMON_PREAMBLE = `
You are a TypeScript migration agent working on the Bufo project — an iTerm2 workspace manager.
Your job is to implement exactly one migration task, then commit your work and stop.

**Critical rules:**
- Follow the spec.md exactly for function signatures and behaviors
- Keep \`make test\` (bash tests) green — never break them
- Use atomic file writes (write to tmp file, then rename) for all state/metadata
- Use ESM imports (\`import ... from '...';\` not \`require\`)
- All new \`package.json\` files must include \`"type": "module"\`
- Do not add dependencies not listed in the spec
- Write Vitest tests alongside every new module
- Commit when done: \`git add -A && git commit -m "feat: <your task name>"\`
- After committing, stop. Do not start other tasks.
`.trim();

// ─── Phase 0: Monorepo Scaffold ───────────────────────────────────────────────

export const M0_SCAFFOLD = `${COMMON_PREAMBLE}

## Your Task
Create the \`packages/core/\` package scaffold and the workspace root \`package.json\`.
This is the foundation everything else builds on — do it carefully.

## Context: Read These Files First
- \`spec.md\` sections 3 ("Target: packages/core"), 5 ("Target Monorepo Structure"), 6 ("Key Design Decisions")
- \`raycast/package.json\` — existing TypeScript setup
- \`daemon/package.json\` and \`daemon/tsconfig.json\` — existing TypeScript setup
- \`raycast/src/lib/types.ts\` — the types that will move to packages/core

## Spec

### Root \`package.json\`
Create at repo root:
\`\`\`json
{
  "name": "bufo",
  "private": true,
  "workspaces": ["packages/*", "daemon", "raycast"],
  "scripts": {
    "build": "npm run build --workspaces --if-present",
    "test:ts": "npm run test --workspace=packages/core",
    "test:bash": "make test"
  }
}
\`\`\`

### \`packages/core/package.json\`
\`\`\`json
{
  "name": "@bufo/core",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": { ".": "./dist/index.js" },
  "scripts": {
    "build": "tsc",
    "test": "vitest run",
    "dev": "tsc --watch"
  },
  "dependencies": { "js-yaml": "^4.1.0" },
  "devDependencies": {
    "typescript": "^5.5.0",
    "vitest": "^2.0.0",
    "@types/js-yaml": "^4.0.0",
    "@types/node": "^22.0.0"
  }
}
\`\`\`

### \`packages/core/tsconfig.json\`
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2022", "module": "Node16", "moduleResolution": "node16",
    "lib": ["ES2023"], "strict": true, "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true, "outDir": "./dist", "rootDir": "./src",
    "declaration": true, "declarationMap": true, "sourceMap": true
  },
  "include": ["src/**/*.ts"]
}
\`\`\`

### \`packages/core/vitest.config.ts\`
\`\`\`typescript
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { environment: 'node' } });
\`\`\`

### \`packages/core/src/index.ts\`
Create a barrel that re-exports everything from each module. Start with just:
\`\`\`typescript
export * from './types.js';
export * from './config.js';
export * from './bufo.js';
export * from './exec.js';
export * from './iterm.js';
// More exports will be added by subsequent agents
\`\`\`

### Copy existing lib files
Copy (do not symlink) the following files from \`raycast/src/lib/\` into \`packages/core/src/\`:
- \`types.ts\`
- \`config.ts\`
- \`bufo.ts\`
- \`exec.ts\`
- \`iterm.ts\`

Update any relative imports between them to use \`.js\` extensions (required for Node16 ESM).

## Validation
\`\`\`bash
cd packages/core && npm install && npm run build
make test
\`\`\`
Both must pass. If build fails, fix TypeScript errors. If make test fails, investigate immediately.
`;

export const M0_DAEMON_UPDATE = `${COMMON_PREAMBLE}

## Your Task
Remove the \`daemon/src/lib/\` symlink and update the daemon to import from \`@bufo/core\`.
PREREQUISITE: The M0-scaffold task must already be committed (packages/core must exist).

## Context: Read These Files First
- \`daemon/src/server.ts\` — main daemon (look at its imports)
- \`daemon/src/poller.ts\`, \`daemon/src/applescript.ts\`, \`daemon/src/cleanup.ts\`
- \`daemon/package.json\`, \`daemon/tsconfig.json\`
- \`packages/core/src/index.ts\` — what's exported from core

## Spec

### Step 1: Add workspace dependency to daemon
In \`daemon/package.json\`, add to dependencies:
\`\`\`json
"@bufo/core": "*"
\`\`\`
Also ensure \`"type": "module"\` is present in daemon/package.json.

### Step 2: Update daemon tsconfig
In \`daemon/tsconfig.json\`, ensure \`"moduleResolution": "bundler"\` or \`"node16"\` is set consistently.
Add \`"paths": { "@bufo/core": ["../packages/core/src/index.ts"] }\` to support TypeScript resolution.

### Step 3: Remove symlink, update imports
\`\`\`bash
rm daemon/src/lib  # removes the symlink
\`\`\`
Then update all imports in daemon/src/*.ts that were:
\`\`\`typescript
import { ... } from './lib/types.js';
import { ... } from './lib/config.js';
// etc
\`\`\`
to:
\`\`\`typescript
import { ... } from '@bufo/core';
\`\`\`

### Step 4: Verify daemon builds
\`\`\`bash
cd daemon && npm install && npm run build
\`\`\`

## Validation
\`\`\`bash
cd daemon && npm run build
make test
\`\`\`
`;

export const M0_RAYCAST_UPDATE = `${COMMON_PREAMBLE}

## Your Task
Update the Raycast extension to import from \`@bufo/core\` instead of its local \`src/lib/\` directory.
PREREQUISITE: M0-scaffold and M0-daemon-update must already be committed.

## Context: Read These Files First
- \`raycast/src/*.tsx\` — all Raycast commands (look at their imports)
- \`raycast/package.json\`, \`raycast/tsconfig.json\`
- \`packages/core/src/index.ts\` — what's exported from core

## Spec

### Step 1: Add workspace dependency to raycast
In \`raycast/package.json\`, add to dependencies:
\`\`\`json
"@bufo/core": "*"
\`\`\`

### Step 2: Update all imports
In each \`raycast/src/*.tsx\` file, update imports from:
\`\`\`typescript
import { ... } from './lib/types.js';
import { ... } from './lib/config.js';
// etc
\`\`\`
to:
\`\`\`typescript
import { ... } from '@bufo/core';
\`\`\`

### Step 3: Keep raycast/src/lib/ for now
Do NOT delete \`raycast/src/lib/\` yet — wait until both daemon and raycast are confirmed building.
The \`raycast/src/lib/\` directory is the canonical source that \`daemon/src/lib/\` symlinks to.
After this task, the symlink is gone and raycast/src/lib/ becomes unused (but harmless).

### Step 4: Verify raycast builds
\`\`\`bash
cd raycast && npm install && npm run build
\`\`\`

## Validation
\`\`\`bash
cd raycast && npm run build
make test
\`\`\`
`;

// ─── Phase 1: Core Data Layer ─────────────────────────────────────────────────

export const M1_STATE = `${COMMON_PREAMBLE}

## Your Task
Implement \`packages/core/src/state.ts\` — the TypeScript port of \`src/lib/state.sh\`.
This is a pure file I/O module that reads/writes iTerm2 session state JSON files.

## Context: Read These Files First
- \`src/lib/state.sh\` — the bash source to port
- \`packages/core/src/types.ts\` — TadpoleState interface (already exists)
- \`packages/core/src/iterm.ts\` — getActiveSessions() function you'll use in stateExists()
- \`spec.md\` section 3 "state (new)" and section 8 "Testing Strategy"

## Spec

\`\`\`typescript
// packages/core/src/state.ts
import { TadpoleState } from './types.js';

const STATE_DIR = join(homedir(), '.bufo', 'state');

/**
 * Atomically write state to ~/.bufo/state/<session>/tp<N>.json
 */
export async function saveState(session: string, num: number, state: TadpoleState): Promise<void>

/**
 * Read state. Falls back to ws<N>.json (legacy) if tp<N>.json absent.
 * Returns null if neither exists.
 */
export async function loadState(session: string, num: number): Promise<TadpoleState | null>

/**
 * Remove both tp<N>.json and ws<N>.json for a tadpole.
 */
export async function removeState(session: string, num: number): Promise<void>

/**
 * Returns true ONLY IF:
 * 1. State file exists, AND
 * 2. The main pane session ID is in the live iTerm2 session list
 * If the file exists but session is dead, removes the stale file and returns false.
 */
export async function stateExists(session: string, num: number): Promise<boolean>

/**
 * List all tadpole numbers that have state files for a session.
 * Returns tp<N> numbers; canonical (tp*.json) first, then legacy (ws*.json) without counterpart.
 */
export async function listStates(session: string): Promise<number[]>
\`\`\`

**Atomic write pattern (required):**
\`\`\`typescript
import { writeFile, rename, mkdir } from 'fs/promises';
import { tmpdir } from 'os';

async function atomicWrite(path: string, content: string): Promise<void> {
  const tmp = join(tmpdir(), \`bufo-\${Date.now()}-\${Math.random().toString(36).slice(2)}\`);
  await writeFile(tmp, content, 'utf8');
  await rename(tmp, path);
}
\`\`\`

**stateExists behavior:** Call \`getActiveSessions()\` from iterm.ts to get live session IDs.
Extract UUID from the \`panes.main\` field of the state file (format: \`w3t1p2:<UUID>\`).
If UUID is not in active sessions → delete the stale file and return false.

## Validation
Write tests in \`packages/core/tests/state.test.ts\`:
- Test saveState writes correctly structured JSON
- Test loadState falls back to ws<N>.json
- Test stateExists removes stale files (mock getActiveSessions)
- Test listStates returns numbers in correct order

\`\`\`bash
cd packages/core && npm run build && npm test
make test
\`\`\`
`;

export const M1_META = `${COMMON_PREAMBLE}

## Your Task
Implement \`packages/core/src/meta.ts\` — the TypeScript port of the .bufo-meta read/write
portion of \`src/lib/infobar.sh\`.

## Context: Read These Files First
- \`src/lib/infobar.sh\` — bash source; focus on write_workspace_meta, extract_ticket_from_branch, extract_linear_url_from_body
- \`packages/core/src/types.ts\` — TadpoleMeta interface
- \`spec.md\` section 3 "meta (new)"

## Spec

\`\`\`typescript
// packages/core/src/meta.ts

/**
 * Read .bufo-meta JSON from a tadpole directory.
 * Returns null if the file doesn't exist or is malformed.
 */
export async function readMeta(dir: string): Promise<TadpoleMeta | null>

/**
 * Atomically write .bufo-meta JSON to a tadpole directory.
 */
export async function writeMeta(dir: string, meta: TadpoleMeta): Promise<void>

/**
 * Delete .bufo-meta from a tadpole directory.
 */
export async function clearMeta(dir: string): Promise<void>

/**
 * Extract a ticket identifier (e.g. "ENG-123") from a branch name.
 * Regex: /([A-Z]+-\\d+)/i — returns first match or null.
 */
export function extractTicketFromBranch(branch: string): string | null

/**
 * Extract a Linear URL from PR body text.
 * Regex: /(https:\\/\\/linear\\.app\\/[^\\s)]+)/
 * Returns first match or null.
 */
export function extractLinearUrlFromBody(text: string): string | null
\`\`\`

Use the same atomicWrite pattern from state.ts. readMeta must not throw — return null on parse errors.

## Validation
Write tests in \`packages/core/tests/meta.test.ts\`:
- Test writeMeta + readMeta round-trip
- Test clearMeta removes the file
- Test extractTicketFromBranch with various branch names (feature/ENG-123-foo, main, no-ticket)
- Test extractLinearUrlFromBody

\`\`\`bash
cd packages/core && npm run build && npm test
make test
\`\`\`
`;

export const M1_PORTS = `${COMMON_PREAMBLE}

## Your Task
Implement \`packages/core/src/ports.ts\` — the TypeScript port of the port math and
.env file management portions of \`src/lib/ports.sh\`.

## Context: Read These Files First
- \`src/lib/ports.sh\` — bash source (focus on get_workspace_ports, sync_env_files, read_env_port, write_env_ports)
- \`packages/core/src/types.ts\` — BufoProject interface
- \`spec.md\` section 3 "ports (new, data layer)"

## Spec

\`\`\`typescript
// packages/core/src/ports.ts

export interface PortResult {
  apiPort: number;
  appPort: number;
  needOverride: boolean;
}

/**
 * Compute ports for a tadpole.
 * apiPort = api_base + (num * port_spacing)
 * appPort = app_base + (num * port_spacing)
 * port_spacing defaults to 10
 */
export function computePorts(project: BufoProject, num: number): PortResult

/**
 * Find next available port starting from base using lsof.
 * Increments until a free port is found.
 */
export async function findAvailablePort(base: number): Promise<number>

/**
 * Sync .env files for a tadpole directory per project config.
 * For each env_sync.files[] entry:
 *   a. Determine source: copy_from if set, else same relative path in main_repo
 *   b. Copy to tadpole dir if missing
 *   c. Rewrite ports: variables to computed port value
 *   d. Rewrite refs: URL variables (replace port number inside URL)
 *   e. Apply overrides: static key=value substitutions
 */
export async function syncEnvFiles(
  dir: string,
  num: number,
  project: BufoProject,
  quiet?: boolean
): Promise<void>

/**
 * Read a specific port variable value from .env files in a tadpole dir.
 * Returns the port number or null if not found.
 */
export async function readEnvPort(
  dir: string,
  type: 'api' | 'app',
  project: BufoProject
): Promise<number | null>
\`\`\`

**Port variable rewriting:** In .env files, a line like \`API_PORT=3200\` should be rewritten
to \`API_PORT=3220\` for tadpole 2 (with port_spacing=10). URLs like
\`API_URL=http://localhost:3200\` should become \`http://localhost:3220\`.
Use regex replacement on lines, not on the whole file.

## Validation
Write tests in \`packages/core/tests/ports.test.ts\`:
- Test computePorts with default and custom port_spacing
- Test syncEnvFiles rewrites ports correctly in a temp .env file
- Test syncEnvFiles handles refs: (URL port replacement)
- Test readEnvPort reads back the correct value

\`\`\`bash
cd packages/core && npm run build && npm test
make test
\`\`\`
`;

export const M1_WIP = `${COMMON_PREAMBLE}

## Your Task
Implement \`packages/core/src/wip.ts\` — the TypeScript data layer for WIP save/restore
metadata (reading/listing/deleting WIP entries, NOT the git patch operations).

## Context: Read These Files First
- \`src/lib/wip.sh\` — bash source; focus on wip_list, get_wip_dir, wip_list_global, wip_delete
- \`packages/core/src/types.ts\` — existing interfaces
- \`spec.md\` section 3 "wip data layer (new)"

## Spec

\`\`\`typescript
// packages/core/src/wip.ts

export interface WipMetadata {
  timestamp: string;
  slug: string;
  summary: string;
  tadpole: number;
  branch: string;
  commits_ahead: number;
  created_at: string;
}

export interface WipEntry {
  path: string;      // absolute path to the WIP snapshot dir
  metadata: WipMetadata;
}

/**
 * Absolute path to the WIP directory for a specific tadpole.
 * Pattern: ~/.bufo/wip/<alias>/<prefix>-<N>/
 */
export function getWipDir(alias: string, prefix: string, num: number): string

/**
 * List all WIP entries for a specific tadpole, newest first.
 * Each entry is a timestamped subdirectory containing metadata.json.
 */
export async function listWips(alias: string, prefix: string, num: number): Promise<WipEntry[]>

/**
 * List all WIP entries across all tadpoles for a project, newest first.
 */
export async function listAllWips(alias: string): Promise<WipEntry[]>

/**
 * Load metadata.json from a WIP snapshot directory.
 * Returns null if missing or malformed.
 */
export async function loadWipMetadata(wipPath: string): Promise<WipMetadata | null>

/**
 * Delete a WIP snapshot directory and all its contents.
 */
export async function deleteWip(wipPath: string): Promise<void>
\`\`\`

WIP directory structure:
\`\`\`
~/.bufo/wip/<alias>/<prefix>-<N>/<timestamp>-<slug>/
  metadata.json
  changes.patch
  staged.patch
  untracked/
\`\`\`

## Validation
Write tests in \`packages/core/tests/wip.test.ts\`:
- Test getWipDir returns correct path
- Test listWips finds entries and loads metadata, sorted newest-first
- Test listAllWips aggregates across tadpoles
- Test deleteWip removes the directory
- Use os.tmpdir() for all temp dirs

\`\`\`bash
cd packages/core && npm run build && npm test
make test
\`\`\`
`;

export const M1_SESSION = `${COMMON_PREAMBLE}

## Your Task
Implement \`packages/core/src/session.ts\` — the TypeScript data layer for named review
sessions (reading/writing session.yaml and layout.json, NOT the iTerm2 layout operations).

## Context: Read These Files First
- \`src/lib/session.sh\` — bash source; focus on session_create, session_update, session_get, session_list
- \`packages/core/src/types.ts\` — BufoSession, SessionLayout interfaces
- \`packages/core/src/config.ts\` — loadSession, discoverSessions (already implemented — DO NOT duplicate)
- \`spec.md\` section 3 "session data layer (new)"

## Spec

\`\`\`typescript
// packages/core/src/session.ts

/**
 * Absolute path to the sessions directory for a project.
 * Pattern: ~/.bufo/sessions/<project-alias>/
 */
export function getSessionsDir(projectAlias: string): string

/**
 * Create a new session YAML file.
 * Writes ~/.bufo/sessions/<alias>/<name>/session.yaml
 */
export async function createSession(
  projectAlias: string,
  name: string,
  context?: string
): Promise<void>

/**
 * Update a single field in session.yaml using yq-compatible key path.
 */
export async function updateSession(
  projectAlias: string,
  name: string,
  field: string,
  value: string
): Promise<void>

/**
 * Read a single field value from session.yaml.
 * Returns null if session or field doesn't exist.
 */
export async function getSessionField(
  projectAlias: string,
  name: string,
  field: string
): Promise<string | null>

/**
 * Delete a session directory and all its contents.
 */
export async function deleteSession(projectAlias: string, name: string): Promise<void>

/**
 * Atomically write the layout JSON for a session.
 */
export async function saveSessionLayout(
  sessionDir: string,
  layout: SessionLayout
): Promise<void>

/**
 * Read the layout JSON for a session.
 * Returns null if layout.json doesn't exist.
 */
export async function loadSessionLayout(sessionDir: string): Promise<SessionLayout | null>
\`\`\`

Session directory structure:
\`\`\`
~/.bufo/sessions/<alias>/<name>/
  session.yaml
  layout.json       (optional)
  review-output.md  (optional)
\`\`\`

Use js-yaml for YAML serialization. Use the atomicWrite pattern for all writes.
Do NOT re-implement loadSession/discoverSessions/getAllSessions — those are already in config.ts.

## Validation
Write tests in \`packages/core/tests/session.test.ts\`:
- Test createSession creates correct YAML structure
- Test updateSession modifies a field correctly
- Test getSessionField reads back a value
- Test deleteSession removes the directory
- Test saveSessionLayout + loadSessionLayout round-trip

\`\`\`bash
cd packages/core && npm run build && npm test
make test
\`\`\`
`;

export const M1_PROMPTS = `${COMMON_PREAMBLE}

## Your Task
Implement \`packages/core/src/prompts.ts\` — the TypeScript port of \`src/lib/prompts.sh\`.
This handles prompt file loading with 3-tier resolution and variable substitution.

## Context: Read These Files First
- \`src/lib/prompts.sh\` — bash source; read ALL of it (it contains hardcoded default prompts)
- \`spec.md\` section 3 "prompts (new)"

## Spec

\`\`\`typescript
// packages/core/src/prompts.ts

/**
 * Load a prompt file with 3-tier resolution:
 *   1. ~/.bufo/projects/<alias>/prompts/<name>.md  (project-specific override)
 *   2. ~/.bufo/prompts/<name>.md                   (global user override)
 *   3. defaultContent                              (hardcoded fallback)
 *
 * Then substitute {KEY} → vars[KEY] in the resolved content.
 */
export async function loadPrompt(
  name: string,
  defaultContent: string,
  vars?: Record<string, string>,
  projectAlias?: string
): Promise<string>

/**
 * Write default prompt files to dir if they don't already exist.
 * Non-destructive — never overwrites existing files.
 */
export async function initPrompts(dir: string): Promise<void>

/**
 * The default prompt names (mirrors the bash defaults from prompts.sh).
 * These are the keys that initPrompts() writes defaults for.
 */
export const DEFAULT_PROMPT_NAMES: readonly string[]
\`\`\`

**Default prompt names to include:**
\`chorus-conductor\`, \`singer-codex\`, \`review-standard\`, \`review-summary\`,
\`pr-open\`, \`ticket-linear\`, \`ticket-github-issue\`, \`claude-md-team-mode\`,
\`merge-conflict\`, \`wip-summary\`

**Variable substitution:** Replace \`{KEY}\` with \`vars[KEY]\` for all keys in vars.
Same behavior as bash: \`sed -e "s|{KEY}|VALUE|g"\`

**Default content:** Copy the actual default prompt strings from \`src/lib/prompts.sh\` —
they are hardcoded there as bash heredocs. Port them as TypeScript template strings.

## Validation
Write tests in \`packages/core/tests/prompts.test.ts\`:
- Test loadPrompt uses defaultContent when no files exist
- Test loadPrompt prefers project-specific over global over default
- Test variable substitution works correctly
- Test initPrompts creates files that don't exist and skips existing ones

\`\`\`bash
cd packages/core && npm run build && npm test
make test
\`\`\`
`;

// ─── Phase 2: CLI Scaffold + Shell-out Modules ────────────────────────────────

export const M2_CLI_SCAFFOLD = `${COMMON_PREAMBLE}

## Your Task
Create the \`packages/cli/\` scaffold — package.json, tsconfig.json, and stub entry files.
This creates the empty structure that Phase 3 agents will fill in.

## Context: Read These Files First
- \`spec.md\` section 5 "Target Monorepo Structure" (the packages/cli/ tree)
- \`packages/core/package.json\` — for workspace dep reference
- \`daemon/package.json\` — for execa, commander reference

## Spec

### \`packages/cli/package.json\`
\`\`\`json
{
  "name": "@bufo/cli",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "bin": { "bufo-ts": "./dist/index.js" },
  "scripts": {
    "build": "tsc",
    "test": "vitest run",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "@bufo/core": "*",
    "commander": "^12.0.0",
    "execa": "^9.0.0",
    "js-yaml": "^4.1.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "vitest": "^2.0.0",
    "@types/node": "^22.0.0",
    "@types/js-yaml": "^4.0.0"
  }
}
\`\`\`

### \`packages/cli/tsconfig.json\`
Same as packages/core/tsconfig.json but rootDir is ./src.

### \`packages/cli/vitest.config.ts\`
Same as packages/core/vitest.config.ts.

### \`packages/cli/src/index.ts\`
\`\`\`typescript
#!/usr/bin/env node
// Entry point stub — will be completed in Phase 4
console.error('bufo-ts: CLI not yet implemented. Use the bash CLI.');
process.exit(1);
\`\`\`

### Directory structure to create
\`\`\`
packages/cli/src/
  index.ts          (stub above)
  main.ts           (empty, Phase 4)
  worktree.ts       (stub, Phase 2)
  companions.ts     (stub, Phase 2)
  doctor.ts         (stub, Phase 2)
  tadpole.ts        (stub, Phase 3)
  infobar.ts        (stub, Phase 3)
  commands/
    pr.ts           (stub)
    ticket.ts       (stub)
    merge.ts        (stub)
    wip.ts          (stub)
    review.ts       (stub)
    session.ts      (stub)
    web.ts          (stub)
    init.ts         (stub)
    setup.ts        (stub)
packages/cli/tests/
  .gitkeep
\`\`\`

Stubs should export a single placeholder comment, not actual implementations.

## Validation
\`\`\`bash
cd packages/cli && npm install && npm run build
make test
\`\`\`
`;

export const M2_WORKTREE = `${COMMON_PREAMBLE}

## Your Task
Implement \`packages/cli/src/worktree.ts\` — the TypeScript port of \`src/lib/worktree.sh\`.

## Context: Read These Files First
- \`src/lib/worktree.sh\` — full bash source to port
- \`packages/core/src/types.ts\` — BufoProject interface
- \`packages/core/src/ports.ts\` — syncEnvFiles function
- \`spec.md\` section "worktree (new, in packages/cli)"

## Spec

\`\`\`typescript
// packages/cli/src/worktree.ts
import { execa } from 'execa';
import { BufoProject } from '@bufo/core';

/**
 * Expand branch_pattern for a tadpole number.
 * e.g. "tadpole-{N}" with num=2 → "tadpole-2"
 */
export function getBranchName(project: BufoProject, num: number): string

/**
 * Create a git worktree for a tadpole number.
 * Orchestrates: git worktree add → submodules → shared volume → companions → env sync → install_command
 * New worktrees are locked by default (.bufo-lock created).
 */
export async function createWorktree(project: BufoProject, num: number): Promise<void>

/**
 * Initialize submodules in a worktree directory.
 * Fast-copies from main repo if already initialized there.
 */
export async function initSubmodules(
  dir: string,
  mainRepo: string,
  submodules: SubmoduleConfig[]
): Promise<void>

/**
 * Reset submodules to origin/main.
 */
export async function resetSubmodules(dir: string, submodules: SubmoduleConfig[]): Promise<void>

/**
 * Create shared volume symlink: dir/<link_as> → volumePath
 * If <link_as> is an existing plain dir (not symlink), migrate its contents first.
 */
export async function setupSharedVolume(
  dir: string,
  volumePath: string,
  linkAs: string
): Promise<void>

/**
 * Remove a git worktree and prune the ref.
 */
export async function removeWorktree(project: BufoProject, num: number): Promise<void>
\`\`\`

Use \`execa\` for all git commands (not execSync). Throw descriptive errors on failure.
SubmoduleConfig is defined in types.ts or inline if not yet there.

## Validation
Write tests in \`packages/cli/tests/worktree.test.ts\`:
- Test getBranchName expansion
- Test createWorktree constructs correct git arguments (mock execa)
- Test setupSharedVolume creates symlink correctly in temp dir

\`\`\`bash
cd packages/cli && npm run build && npm test
make test
\`\`\`
`;

export const M2_COMPANIONS = `${COMMON_PREAMBLE}

## Your Task
Implement \`packages/cli/src/companions.ts\` — the TypeScript port of \`src/lib/companions.sh\`.

## Context: Read These Files First
- \`src/lib/companions.sh\` — full bash source to port
- \`packages/core/src/types.ts\` — BufoProject interface (check for CompanionConfig)
- \`spec.md\` section "Companions (new, in packages/cli)"

## Spec

\`\`\`typescript
// packages/cli/src/companions.ts
import { execa } from 'execa';
import { BufoProject } from '@bufo/core';

/**
 * Set up companion repos for a tadpole directory.
 * For each companion: clone/fetch canonical copy → create symlink in dir.
 * If force=true, replace existing symlinks.
 */
export async function setupCompanions(
  project: BufoProject,
  dir: string,
  force?: boolean
): Promise<void>

/**
 * Retroactively add companion symlinks to all existing tadpole directories.
 * If replace=true, replace existing symlinks.
 */
export async function syncAllCompanions(
  project: BufoProject,
  replace?: boolean
): Promise<void>

/**
 * Print status of companion repos for a project.
 */
export async function showCompanions(project: BufoProject): Promise<void>

/**
 * git fetch in each canonical companion clone.
 */
export async function fetchCompanions(project: BufoProject): Promise<void>
\`\`\`

Companions base dir: \`~/.bufo/companions/<project-alias>/\`
Each companion is a canonical git clone; symlinked into each tadpole as \`<link_as>\`.

## Validation
Write tests in \`packages/cli/tests/companions.test.ts\`:
- Test setupCompanions creates symlinks in temp dir (mock execa)
- Test fetchCompanions calls git fetch for each companion

\`\`\`bash
cd packages/cli && npm run build && npm test
make test
\`\`\`
`;

export const M2_DOCTOR = `${COMMON_PREAMBLE}

## Your Task
Implement \`packages/cli/src/doctor.ts\` — the TypeScript port of \`src/lib/doctor.sh\`.

## Context: Read These Files First
- \`src/lib/doctor.sh\` — full bash source to port
- \`packages/core/src/types.ts\` — BufoProject interface
- \`spec.md\` section "Doctor (new, in packages/cli)"

## Spec

\`\`\`typescript
// packages/cli/src/doctor.ts
import { execa } from 'execa';
import { BufoProject } from '@bufo/core';

export interface DoctorCheck {
  name: string;
  ok: boolean;
  message?: string;
}

export interface DoctorResult {
  checks: DoctorCheck[];
  allOk: boolean;
}

/**
 * Run diagnostic checks. Checks:
 * - yq installed (command -v yq)
 * - jq installed
 * - iTerm2 installed (/Applications/iTerm.app exists)
 * - git installed
 * - Config directory exists (~/.bufo/)
 * - At least one project configured (~/.bufo/projects/*.yaml)
 * - If project provided: tadpole_base exists, .env files present
 */
export async function runDoctor(project?: BufoProject): Promise<DoctorResult>

/**
 * Auto-repair common issues:
 * - Create missing ~/.bufo/ directories
 * - Remove orphaned state files (session alive check)
 * - Remove stale .bufo-lock files in non-existent worktrees
 * If force=true: also remove state files for dead sessions without prompting.
 */
export async function runDoctorFix(project: BufoProject, force?: boolean): Promise<void>
\`\`\`

Print colored output matching the bash version (green ✓ / red ✗ for each check).
Use the same color constants: \`\\x1b[32m\` green, \`\\x1b[31m\` red, \`\\x1b[0m\` reset.

## Validation
Write tests in \`packages/cli/tests/doctor.test.ts\`:
- Test runDoctor returns correct structure
- Test checks detect missing tools (mock execa to simulate missing command)

\`\`\`bash
cd packages/cli && npm run build && npm test
make test
\`\`\`
`;

// ─── Phase 3 Wave A ───────────────────────────────────────────────────────────

export const M3_TADPOLE_DATA = `${COMMON_PREAMBLE}

## Your Task
Implement the data layer of \`packages/cli/src/tadpole.ts\` — lock/unlock, naming,
listing, and detection functions from \`src/lib/tadpole.sh\`.
Do NOT implement the iTerm2 layout functions (open/create/restart/cleanup/destroy) — those are Phase 3 Wave B.

## Context: Read These Files First
- \`src/lib/tadpole.sh\` — bash source; focus on functions: lock_tadpole, unlock_tadpole,
  unlock_all, get_tadpole_name, set_tadpole_name, compute_tab_title, find_unlocked_tadpole,
  find_next_tadpole, list_tadpoles_plain, detect_tadpole_from_dir
- \`packages/core/src/types.ts\` — BufoProject, BufoTadpole
- \`packages/core/src/config.ts\` — discoverTadpoles (already exists)
- \`spec.md\` section "Tadpole data layer (new, in packages/cli)"

## Spec

\`\`\`typescript
// packages/cli/src/tadpole.ts (data layer portion)
import { BufoProject, BufoTadpole } from '@bufo/core';

export function getTadpoleDir(project: BufoProject, num: number): string
export async function lockTadpole(project: BufoProject, num: number): Promise<void>
export async function unlockTadpole(project: BufoProject, num: number): Promise<void>
export async function unlockAll(project: BufoProject): Promise<void>
export async function findUnlocked(project: BufoProject): Promise<number | null>
export function getTadpoleName(project: BufoProject, num: number): string  // reads .bufo-name sync
export async function setTadpoleName(project: BufoProject, num: number, name: string): Promise<void>
export async function clearTadpoleName(project: BufoProject, num: number): Promise<void>
export async function computeTabTitle(project: BufoProject, num: number): Promise<string>
export async function listTadpoles(project: BufoProject): Promise<BufoTadpole[]>
export function detectTadpoleFromDir(project: BufoProject, cwd: string): number | null
export function findNextSlot(project: BufoProject): number
\`\`\`

**Tab title priority (from bash):** \`{name}: {PR title}\` > \`{name}\` (ticket) > \`{branch}\` > \`tp{N}\`
Prefix with \`@{alias}\` when project alias is set.
Truncate to 60 chars.

**Lock:** \`.bufo-lock\` sentinel file in the tadpole directory.
**detectTadpoleFromDir:** Matches cwd against tadpole_base/prefix-N paths.
**findNextSlot:** Returns first number N where prefix-N doesn't exist as a directory.

## Validation
\`\`\`bash
cd packages/cli && npm run build && npm test
make test
\`\`\`
`;

export const M3_MERGE = `${COMMON_PREAMBLE}

## Your Task
Implement \`packages/cli/src/commands/merge.ts\` — the TypeScript port of \`src/lib/merge.sh\`.

## Context: Read These Files First
- \`src/lib/merge.sh\` — full bash source to port
- \`packages/core/src/types.ts\` — BufoProject
- \`spec.md\` section "Merge"

## Spec

\`\`\`typescript
// packages/cli/src/commands/merge.ts
import { execa } from 'execa';
import { BufoProject } from '@bufo/core';

/**
 * Detect the default branch (main/master/trunk) for a git repo.
 */
export async function getDefaultBranch(dir?: string): Promise<string>

/**
 * Merge tadpole branches that have commits ahead of the default branch into it.
 * If dryRun: print what would be merged without doing it.
 * If num: only merge the specified tadpole number.
 * On conflict: call AI tool to auto-resolve if configured.
 */
export async function handleMerge(
  project: BufoProject,
  opts: { dryRun?: boolean; num?: number }
): Promise<void>
\`\`\`

## Validation
\`\`\`bash
cd packages/cli && npm run build && npm test
make test
\`\`\`
`;

export const M3_TICKET = `${COMMON_PREAMBLE}

## Your Task
Implement \`packages/cli/src/commands/ticket.ts\` — the TypeScript port of \`src/lib/ticket.sh\`.

## Context: Read These Files First
- \`src/lib/ticket.sh\` — full bash source to port
- \`packages/core/src/types.ts\` — BufoProject
- \`spec.md\` section "Ticket commands"

## Spec

\`\`\`typescript
// packages/cli/src/commands/ticket.ts
import { BufoProject } from '@bufo/core';

/**
 * Parse a ticket identifier from various input formats:
 * - Linear URL: https://linear.app/org/issue/ENG-123-title → "ENG-123"
 * - GitHub Issue URL: https://github.com/org/repo/issues/456 → "GH-456"
 * - Plain string: "ENG-123" → "ENG-123"
 * Returns null if unrecognized.
 */
export function parseTicketIdentifier(input: string): string | null

/**
 * Returns true if input is a GitHub issue URL.
 */
export function isGithubIssueUrl(url: string): boolean

/**
 * Handle the bufo ticket command:
 * 1. Parse ticket identifier
 * 2. Find existing tadpole on matching branch, or find/create unlocked tadpole
 * 3. Create branch if needed
 * 4. Write .bufo-meta with ticket info
 * 5. Open the tadpole layout
 */
export async function handleTicket(project: BufoProject, identifier: string): Promise<void>
\`\`\`

## Validation
\`\`\`bash
cd packages/cli && npm run build && npm test
make test
\`\`\`
`;

export const M3_PROJECTS = `${COMMON_PREAMBLE}

## Your Task
Add project resolution functions to \`packages/core/src/config.ts\` — the TypeScript port
of the project resolution logic in \`src/lib/projects.sh\`.

## Context: Read These Files First
- \`src/lib/projects.sh\` — full bash source; focus on resolve_project_from_cwd,
  resolve_project_from_github_url, resolve_project_from_ticket_url, resolve_default_project
- \`packages/core/src/config.ts\` — existing implementation (DO NOT break what's there)
- \`packages/core/src/types.ts\`
- \`spec.md\` section "Project resolution (new, in packages/core)"

## Spec

Add these functions to \`packages/core/src/config.ts\`:

\`\`\`typescript
/**
 * Load all project configs as a Map<alias, BufoProject>.
 */
export async function loadAllProjectConfigs(): Promise<Map<string, BufoProject>>

/**
 * Validate a project config object. Returns {ok: true} or {ok: false, errors: string[]}.
 */
export function validateProject(project: BufoProject): { ok: boolean; errors?: string[] }

/**
 * Find which project owns the given cwd by matching against main_repo and tadpole_base paths.
 * Returns null if no project matches.
 */
export async function resolveProjectFromCwd(cwd: string): Promise<BufoProject | null>

/**
 * Find which project owns a GitHub PR/issue URL by matching the URL against configured repos.
 */
export async function resolveProjectFromGithubUrl(url: string): Promise<BufoProject | null>

/**
 * Find which project owns a Linear/GitHub Issue ticket URL.
 */
export async function resolveProjectFromTicketUrl(url: string): Promise<BufoProject | null>

/**
 * Get the default project (from global config default_project, or the only project if one exists).
 * Returns null if there are multiple projects and none is set as default.
 */
export async function resolveDefaultProject(): Promise<BufoProject | null>
\`\`\`

These functions must NOT modify any existing functions in config.ts. Add only.

## Validation
Write tests in \`packages/core/tests/config-resolve.test.ts\`:
- Test resolveProjectFromCwd with temp fixture YAML files
- Test resolveDefaultProject with single and multiple projects

\`\`\`bash
cd packages/core && npm run build && npm test
make test
\`\`\`
`;

// ─── Phase 3 Wave B ───────────────────────────────────────────────────────────

export const M3_TADPOLE_LAYOUT = `${COMMON_PREAMBLE}

## Your Task
Implement the iTerm2 layout operations in \`packages/cli/src/tadpole.ts\` — the functions
that create and manage iTerm2 window/pane layouts for tadpoles.
PREREQUISITE: M3-tadpole-data must already be committed.

## Context: Read These Files First
- \`src/lib/tadpole.sh\` — bash source; focus on open_tadpole_layout, create_tadpole_layout,
  restart_tadpole, cleanup_tadpole, continue_tadpole, destroy_tadpole, quit_tadpole,
  open_main_tadpole, switch_tadpole, prepare_tadpole_for_reuse
- \`packages/core/src/iterm.ts\` — existing iTerm2 functions
- \`spec.md\` section "Tadpole layout (complete tadpole.ts)"

## Spec

Add to \`packages/cli/src/tadpole.ts\`:

\`\`\`typescript
export async function openTadpole(project: BufoProject, num: number, prompt?: string): Promise<void>
export async function createNewTadpole(project: BufoProject, opts?: CreateOptions): Promise<void>
export async function createTadpoleLayout(project: BufoProject, num: number): Promise<void>
export async function restartTadpole(project: BufoProject, num: number): Promise<void>
export async function cleanupTadpole(project: BufoProject, num: number): Promise<void>
export async function continueTadpole(project: BufoProject, num: number): Promise<void>
export async function destroyTadpole(project: BufoProject, num: number, flag?: string): Promise<void>
export async function quitTadpole(project: BufoProject, dir: string): Promise<void>
export async function openMainTadpole(project: BufoProject): Promise<void>
export async function switchTadpole(project: BufoProject, num?: number): Promise<void>
export async function prepareTadpoleForReuse(project: BufoProject, num: number): Promise<void>
\`\`\`

Layout has 3 core panes + optional infobar (pane 4):
- terminal pane (left)
- server pane (right-top)
- main pane (right-bottom, where AI runs)
- info pane (thin bottom strip, runs infobar loop)

Tests for iTerm2 functions must be gated: \`const skipNoIterm = process.env.ITERM2_RUNNING !== '1' ? it.skip : it;\`

## Validation
\`\`\`bash
cd packages/cli && npm run build && npm test
make test
\`\`\`
`;

export const M3_PR = `${COMMON_PREAMBLE}

## Your Task
Implement \`packages/cli/src/commands/pr.ts\` — the TypeScript port of \`src/lib/pr.sh\`.

## Context: Read These Files First
- \`src/lib/pr.sh\` — full bash source to port
- \`packages/core/src/types.ts\`
- \`spec.md\` section "PR commands"

## Spec

\`\`\`typescript
// packages/cli/src/commands/pr.ts
import { execa } from 'execa';
import { BufoProject } from '@bufo/core';

/**
 * Fetch PR metadata from GitHub using gh CLI.
 * Returns { branch, title, url, body, comments }.
 */
export async function fetchPrMetadata(
  owner: string,
  repo: string,
  prNum: number
): Promise<{ branch: string; title: string; url: string; body: string; comments: string }>

/**
 * Checkout a PR branch in an existing tadpole directory.
 * Runs git fetch + checkout.
 */
export async function checkoutPrBranch(dir: string, branch: string): Promise<void>

/**
 * Main PR command handler:
 * 1. Parse PR identifier (URL, repo#N, or bare number)
 * 2. Find existing tadpole on that branch, else find/create unlocked tadpole
 * 3. Checkout branch
 * 4. Write .bufo-meta with PR info
 * 5. Open tadpole layout with PR prompt
 */
export async function handlePr(project: BufoProject, identifier: string): Promise<void>

/**
 * Handle bufo tp N pr <identifier> — force a specific tadpole for the PR.
 */
export async function handleWsPr(
  project: BufoProject,
  tpNum: number,
  identifier: string
): Promise<void>
\`\`\`

## Validation
\`\`\`bash
cd packages/cli && npm run build && npm test
make test
\`\`\`
`;

export const M3_WIP_FULL = `${COMMON_PREAMBLE}

## Your Task
Implement \`packages/cli/src/commands/wip.ts\` — the full WIP save/restore commands.
PREREQUISITE: packages/core/src/wip.ts (M1-wip) must already be committed.

## Context: Read These Files First
- \`src/lib/wip.sh\` — full bash source to port (all of it — 855 lines)
- \`packages/core/src/wip.ts\` — data layer already implemented
- \`packages/core/src/types.ts\`
- \`spec.md\` section "WIP (full)"

## Spec

\`\`\`typescript
// packages/cli/src/commands/wip.ts
import { execa } from 'execa';
import { BufoProject } from '@bufo/core';

export interface RestoreOpts {
  wipPath?: string;     // specific WIP path to restore
  num?: number;         // restore for specific tadpole
  global?: boolean;     // show all projects' WIPs
}

/**
 * Save current work-in-progress state for a tadpole:
 * - git diff + git diff --cached → patches
 * - untracked files → copied
 * - branch name, commits ahead of main
 * - AI summary via configured ai_tool
 * If restart=true: opens a fresh tadpole after saving.
 */
export async function wipSave(
  project: BufoProject,
  num: number,
  opts: { restart?: boolean; name?: string }
): Promise<void>

/**
 * Restore a WIP entry: apply patches, restore untracked files, optionally replay commits.
 */
export async function wipRestore(project: BufoProject, opts: RestoreOpts): Promise<void>

/**
 * Restore the most recent WIP for a tadpole and optionally open it.
 */
export async function wipContinue(
  project: BufoProject,
  num: number,
  open?: boolean
): Promise<void>

/**
 * Interactive WIP restore selector using fzf (if available).
 */
export async function wipResume(project: BufoProject, num: number): Promise<void>

/**
 * Generate a WIP summary slug and description using the configured AI tool.
 * Returns { slug, summary } or falls back to { slug: 'wip', summary: '' } if AI unavailable.
 */
export async function generateWipSummary(diff: string): Promise<{ slug: string; summary: string }>
\`\`\`

## Validation
\`\`\`bash
cd packages/cli && npm run build && npm test
make test
\`\`\`
`;

export const M3_SESSION_FULL = `${COMMON_PREAMBLE}

## Your Task
Implement \`packages/cli/src/commands/session.ts\` — the full session commands including
iTerm2 layout open/resume operations.
PREREQUISITE: packages/core/src/session.ts (M1-session) must be committed.

## Context: Read These Files First
- \`src/lib/session.sh\` — full bash source; focus on session_open_for_review,
  session_open_for_court, handle_session_command
- \`packages/core/src/session.ts\` — data layer already implemented
- \`packages/core/src/iterm.ts\` — iTerm2 functions
- \`spec.md\` section "Session (full iTerm2 ops)"

## Spec

\`\`\`typescript
// packages/cli/src/commands/session.ts
import { BufoProject } from '@bufo/core';

/**
 * Create a new session and open its iTerm2 layout (3-pane: conductor + singer panes).
 */
export async function sessionStart(
  project: BufoProject,
  name: string,
  context?: string
): Promise<void>

/**
 * Resume an existing session — focus its iTerm2 layout if still alive,
 * or recreate the layout if sessions died.
 */
export async function sessionResume(project: BufoProject, name: string): Promise<void>

/**
 * Close all iTerm2 panes associated with a session.
 */
export async function closeSessionPanes(sessionDir: string): Promise<void>

/**
 * Route all bufo session <subcmd> commands.
 */
export async function handleSession(project: BufoProject, args: string[]): Promise<void>
\`\`\`

## Validation
\`\`\`bash
cd packages/cli && npm run build && npm test
make test
\`\`\`
`;

export const M3_REVIEW = `${COMMON_PREAMBLE}

## Your Task
Implement \`packages/cli/src/commands/review.ts\` — the TypeScript port of \`src/lib/review.sh\`.
This is the most complex module (~1728 lines of bash). Take your time and be thorough.
PREREQUISITE: All Phase 0 and Phase 2 tasks must be committed.

## Context: Read These Files First
- \`src/lib/review.sh\` — full bash source (read all ~1728 lines)
- \`src/lib/prompts.sh\` — for the chorus/singer prompt defaults
- \`packages/core/src/prompts.ts\` — loadPrompt function
- \`packages/core/src/iterm.ts\` — iTerm2 functions
- \`packages/core/src/session.ts\` — session data layer
- \`spec.md\` section "Review/Chorus"

## Spec

\`\`\`typescript
// packages/cli/src/commands/review.ts
import { BufoProject } from '@bufo/core';

export interface FetchOpts {
  includeDiff?: boolean;
  includeComments?: boolean;
}

/**
 * Parse a PR identifier: GitHub URL, "org/repo#N", or bare number.
 * Returns { owner, repo, number } or throws on invalid input.
 */
export function parsePrIdentifier(
  input: string,
  project: BufoProject
): { owner: string; repo: string; number: string }

/**
 * Fetch PR data for a review session via gh CLI.
 * Returns formatted string with diff, comments, and metadata.
 */
export async function fetchPrData(
  owner: string,
  repo: string,
  num: string,
  opts?: FetchOpts
): Promise<string>

/**
 * Build the chorus conductor instructions (uses loadPrompt with 'chorus-conductor').
 */
export async function buildChorusInstructions(
  project: BufoProject,
  singerFiles?: string[]
): Promise<string>

/**
 * Handle bufo review <subcmd> commands (new, open, list, resume, delete).
 */
export async function handleReview(project: BufoProject, args: string[]): Promise<void>

/**
 * Handle bufo court/chorus commands — multi-agent review orchestration.
 * Creates conductor pane + N singer panes, each running an AI agent.
 */
export async function handleChorus(project: BufoProject, args: string[]): Promise<void>
\`\`\`

The chorus/court feature creates multiple iTerm2 panes ("singers") each running an independent
AI agent reviewing a PR from a different angle. The conductor pane waits for all singers to
write output files then synthesizes.

## Validation
\`\`\`bash
cd packages/cli && npm run build && npm test
make test
\`\`\`
`;

// ─── Phase 4: CLI Entry Point ──────────────────────────────────────────────────

export const M4_CLI_ENTRY = `${COMMON_PREAMBLE}

## Your Task
Implement the TypeScript CLI entry point and command router. This wires together all Phase 3
modules into a working \`bufo-ts\` binary that mirrors the behavior of the bash \`src/bufo\`.

PREREQUISITE: ALL Phase 3 tasks must be committed. Check that packages/cli builds cleanly first.

## Context: Read These Files First
- \`src/bufo\` — the bash entry point (read ALL 850 lines) — this is the routing spec
- \`spec.md\` section 4 "Phase 4 — CLI Entry Point" and "Appendix: CLI Command → Handler Map"
- \`packages/cli/src/\` — all the command implementations from Phase 3
- \`packages/core/src/config.ts\` — resolveProjectFromCwd, resolveDefaultProject

## Spec

### \`packages/cli/src/main.ts\`
Implements the command router using Commander.js:
- Parse \`@alias\` prefix → set project
- Load and validate project config
- Route each command to its handler (see Appendix in spec.md)
- Handle URL auto-detection (GitHub PR URLs, Linear URLs → appropriate handler)
- Keep all command aliases from bash version
- Print help and cheat sheet

### \`packages/cli/src/index.ts\`
\`\`\`typescript
#!/usr/bin/env node
import { main } from './main.js';
main(process.argv.slice(2)).catch((e) => {
  console.error(e.message);
  process.exit(1);
});
\`\`\`

### Shim \`src/bufo\`
After confirming the TS binary works, update \`src/bufo\` to:
\`\`\`bash
#!/usr/bin/env bash
exec node "$(dirname "$0")/../packages/cli/dist/index.js" "$@"
\`\`\`

### Smoke tests
After implementation, run:
\`\`\`bash
node packages/cli/dist/index.js --version
node packages/cli/dist/index.js help
node packages/cli/dist/index.js doctor
\`\`\`

## Validation
\`\`\`bash
cd packages/cli && npm run build
node packages/cli/dist/index.js --version
node packages/cli/dist/index.js help
make test
\`\`\`
`;

// ─── Phase 5: Cleanup ─────────────────────────────────────────────────────────

export const M5_CLEANUP = `${COMMON_PREAMBLE}

## Your Task
Final cleanup: update Makefile test targets, port key bash test patterns to Vitest,
and update the README to reflect the TypeScript CLI.

PREREQUISITE: Phase 4 (M4) must be committed and working.

## Context: Read These Files First
- \`Makefile\` — current targets
- \`tests/test_commands\` — bash smoke tests to port to Vitest
- \`tests/test_structure\` — structure tests to keep or port
- \`README.md\` — update installation and usage sections

## Spec

### Update Makefile
\`\`\`makefile
test: test-bash test-ts

test-bash:
	./tests/run.sh

test-ts:
	npm run test --workspace=packages/core
	npm run test --workspace=packages/cli

lint:
	shellcheck src/bufo src/lib/*.sh
	cd packages/core && npx tsc --noEmit
	cd packages/cli && npx tsc --noEmit

build:
	npm run build --workspaces --if-present
\`\`\`

### Add \`packages/cli/tests/cli.test.ts\`
Port the key tests from \`tests/test_commands\` to Vitest:
\`\`\`typescript
// Parity tests for the TS CLI
import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';

const CLI = new URL('../dist/index.js', import.meta.url).pathname;

describe('bufo-ts CLI', () => {
  it('--version exits 0 and prints version', () => {
    const out = execFileSync(process.execPath, [CLI, '--version'], { encoding: 'utf8' });
    expect(out).toMatch(/\\d+\\.\\d+\\.\\d+/);
  });

  it('help exits 0', () => {
    expect(() => execFileSync(process.execPath, [CLI, 'help'], { encoding: 'utf8' })).not.toThrow();
  });
});
\`\`\`

### Update README
- Update installation section to mention the TS binary
- Update "Running" section to note \`bufo-ts\` or \`bufo\` (via shim)

## Validation
\`\`\`bash
make test
make lint
\`\`\`
`;
