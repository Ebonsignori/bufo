import { execa } from 'execa';
import { readFileSync, existsSync } from 'node:fs';
import {
  mkdir,
  symlink,
  readlink,
  lstat,
  rm,
  readdir,
  appendFile,
  readFile,
} from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';
import * as yaml from 'js-yaml';
import type { BufoProject } from '@bufo/core';

// ---------------------------------------------------------------------------
// ANSI color constants
// ---------------------------------------------------------------------------

const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const BLUE = '\x1b[34m';
const GRAY = '\x1b[90m';
const BOLD = '\x1b[1m';
const NC = '\x1b[0m';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CompanionRepo {
  name: string;
  remote?: string;
  /** defaults to name */
  link_as?: string;
}

export interface CompanionsConfig {
  /** defaults to project.tadpole_base */
  base?: string;
  repos: CompanionRepo[];
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Expand a leading `~` to the real home directory. */
function expandPath(p: string): string {
  if (p.startsWith('~/')) {
    return homedir() + p.slice(1);
  }
  if (p === '~') {
    return homedir();
  }
  return p;
}

/** Returns true when `path` is an existing directory (not a symlink to one). */
async function isDirSync(path: string): Promise<boolean> {
  try {
    const s = await lstat(path);
    return s.isDirectory();
  } catch {
    return false;
  }
}

/** Returns true when `path` is an existing symlink. */
async function isSymlink(path: string): Promise<boolean> {
  try {
    const s = await lstat(path);
    return s.isSymbolicLink();
  } catch {
    return false;
  }
}

/** Returns true when `path` exists (any kind). */
async function pathExists(path: string): Promise<boolean> {
  try {
    await lstat(path);
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Public helpers
// ---------------------------------------------------------------------------

/**
 * Read the `companions:` block from the project's YAML config file.
 * Returns `null` when no companions block is present or the config file
 * path is unknown.
 */
export function loadCompanionsConfig(project: BufoProject): CompanionsConfig | null {
  const configFile = project.config_file;
  if (!configFile || !existsSync(configFile)) {
    return null;
  }

  let raw: unknown;
  try {
    raw = yaml.load(readFileSync(configFile, 'utf-8'));
  } catch {
    return null;
  }

  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const doc = raw as Record<string, unknown>;
  const companions = doc['companions'];
  if (!companions || typeof companions !== 'object') {
    return null;
  }

  const block = companions as Record<string, unknown>;
  const repos = block['repos'];
  if (!Array.isArray(repos) || repos.length === 0) {
    return null;
  }

  const parsedRepos: CompanionRepo[] = [];
  for (const r of repos) {
    if (!r || typeof r !== 'object') continue;
    const repo = r as Record<string, unknown>;
    const name = typeof repo['name'] === 'string' ? repo['name'] : '';
    if (!name) continue;
    parsedRepos.push({
      name,
      remote: typeof repo['remote'] === 'string' ? repo['remote'] : undefined,
      link_as: typeof repo['link_as'] === 'string' ? repo['link_as'] : undefined,
    });
  }

  if (parsedRepos.length === 0) {
    return null;
  }

  return {
    base: typeof block['base'] === 'string' ? block['base'] : undefined,
    repos: parsedRepos,
  };
}

/**
 * Resolve the canonical companions base directory.
 * Uses `config.base` when set (expanding `~`), otherwise falls back to
 * `project.tadpole_base`.
 */
export function getCompanionsBase(project: BufoProject, config: CompanionsConfig): string {
  if (config.base) {
    return expandPath(config.base);
  }
  return expandPath(project.tadpole_base);
}

// ---------------------------------------------------------------------------
// _addToGitExclude
// ---------------------------------------------------------------------------

/**
 * Ensure `linkAs` appears in `<tadpoleDir>/.git/info/exclude`.
 * Silently skips when the exclude file doesn't exist.
 */
async function addToGitExclude(tadpoleDir: string, linkAs: string): Promise<void> {
  const excludeFile = join(tadpoleDir, '.git', 'info', 'exclude');
  if (!existsSync(excludeFile)) {
    return;
  }

  const content = await readFile(excludeFile, 'utf-8');
  if (content.includes(linkAs)) {
    return;
  }

  await appendFile(excludeFile, `\n# Companion repo symlink (bufo)\n${linkAs}\n`);
}

// ---------------------------------------------------------------------------
// _setupOneCompanion
// ---------------------------------------------------------------------------

interface SetupOneOpts {
  name: string;
  remote?: string;
  linkAs: string;
  companionPath: string;
  tadpoleDir: string;
  force: boolean;
}

async function setupOneCompanion(opts: SetupOneOpts): Promise<void> {
  const { name, remote, linkAs, companionPath, tadpoleDir, force } = opts;

  // 1. Clone if absent and remote is configured
  if (!(await isDirSync(companionPath))) {
    if (remote) {
      console.log(`  ${CYAN}Cloning companion ${BOLD}${name}${NC}${CYAN} → ${companionPath}${NC}`);
      try {
        await execa('git', ['clone', '--filter=blob:none', remote, companionPath]);
        console.log(`  ${GREEN}Cloned ${name}${NC}`);
      } catch {
        console.warn(`  ${YELLOW}Warning: Failed to clone companion ${name} from ${remote} — skipping${NC}`);
        return;
      }
    } else {
      console.warn(
        `  ${YELLOW}Warning: Companion ${name} not found at ${companionPath} (no remote configured — skipping)${NC}`,
      );
      return;
    }
  }

  // 2. Symlink into tadpole (idempotent)
  if (!tadpoleDir || !(await isDirSync(tadpoleDir))) {
    return;
  }

  const linkPath = join(tadpoleDir, linkAs);

  if (await isSymlink(linkPath)) {
    const currentTarget = await readlink(linkPath);
    if (currentTarget === companionPath) {
      // Already correct — skip silently
      return;
    }
    console.log(`  ${YELLOW}Updating symlink ${linkAs} (was → ${currentTarget})${NC}`);
    await rm(linkPath);
  } else if (await isDirSync(linkPath)) {
    if (force) {
      console.log(`  ${YELLOW}Replacing directory ${linkAs} with symlink (--replace)${NC}`);
      await rm(linkPath, { recursive: true });
    } else {
      console.warn(
        `  ${YELLOW}Warning: ${linkPath} is a directory — use 'companions sync --replace' to convert it to a symlink${NC}`,
      );
      return;
    }
  } else if (await pathExists(linkPath)) {
    console.warn(
      `  ${YELLOW}Warning: ${linkPath} exists and is not a symlink — skipping companion ${name}${NC}`,
    );
    return;
  }

  await symlink(companionPath, linkPath);
  console.log(`  ${GREEN}Linked ${linkAs} → ${companionPath}${NC}`);

  // 3. Exclude from git tracking
  await addToGitExclude(tadpoleDir, linkAs);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * For a single tadpole: clone any missing repos (when a remote is configured),
 * then symlink all companions into the tadpole dir, and add each symlink to
 * `.git/info/exclude`.
 *
 * Called by `create_workspace` equivalent.
 */
export async function setupCompanions(
  project: BufoProject,
  tadpoleDir: string,
  force = false,
): Promise<void> {
  const config = loadCompanionsConfig(project);
  if (!config) {
    return;
  }

  const base = getCompanionsBase(project, config);

  for (const repo of config.repos) {
    const linkAs = repo.link_as ?? repo.name;
    const companionPath = join(base, repo.name);
    await setupOneCompanion({
      name: repo.name,
      remote: repo.remote,
      linkAs,
      companionPath,
      tadpoleDir,
      force,
    });
  }
}

/**
 * Iterate every `PREFIX-N` dir under `tadpole_base` that has a `.git` entry
 * and call `setupCompanions` on each.
 *
 * Pass `{ replace: true }` (or `{ force: true }`) to replace real directories
 * with symlinks.
 */
export async function syncAllCompanions(
  project: BufoProject,
  opts: { replace?: boolean; force?: boolean } = {},
): Promise<void> {
  const config = loadCompanionsConfig(project);
  if (!config) {
    console.log(`${YELLOW}No companions configured for this project.${NC}`);
    return;
  }

  const force = opts.replace ?? opts.force ?? false;

  console.log(`${CYAN}Syncing companion symlinks into all workspaces...${NC}`);
  if (force) {
    console.log(`${YELLOW}  --replace active: existing directories will be replaced with symlinks${NC}`);
  }
  console.log('');

  const base = expandPath(project.tadpole_base);
  const prefix = project.tadpoles.prefix;

  let entries: string[] = [];
  try {
    const allEntries = await readdir(base, { withFileTypes: true });
    entries = allEntries
      .filter((e) => e.isDirectory() && new RegExp(`^${prefix}-\\d+$`).test(e.name))
      .map((e) => e.name);
    entries.sort((a, b) => {
      const na = parseInt(a.split('-').pop() ?? '0', 10);
      const nb = parseInt(b.split('-').pop() ?? '0', 10);
      return na - nb;
    });
  } catch {
    // base doesn't exist
  }

  let found = 0;
  for (const dirName of entries) {
    const tpDir = join(base, dirName);
    // Must have .git (file or directory)
    if (!existsSync(join(tpDir, '.git'))) {
      continue;
    }
    console.log(`${BLUE}  ${dirName}${NC}`);
    await setupCompanions(project, tpDir, force);
    found++;
  }

  if (found === 0) {
    console.log(`${YELLOW}No workspaces found under ${base}/${prefix}-*${NC}`);
  } else {
    console.log('');
    console.log(`${GREEN}Synced companions into ${found} tadpole(s)${NC}`);
  }
}

/**
 * Pretty-print companion status: canonical path, last fetch time, and
 * per-tadpole symlink status. Writes to stdout.
 */
export async function showCompanions(project: BufoProject): Promise<void> {
  const config = loadCompanionsConfig(project);
  if (!config) {
    console.log(`${YELLOW}No companions configured for this project.${NC}`);
    console.log('');
    const cfgName = project.config_file ? project.config_file.split('/').pop() ?? '' : '';
    console.log(`Add a companions block to ${cfgName || 'your project config'}:`);
    console.log('');
    console.log('  companions:');
    console.log('    repos:');
    console.log('      - name: my-shared-lib');
    console.log('        remote: git@github.com:org/my-shared-lib.git');
    return;
  }

  const base = getCompanionsBase(project, config);
  const alias = project.alias;

  console.log(`${CYAN}Companion Repos — @${alias}${NC}`);
  console.log('');
  console.log(`  Base: ${GRAY}${base}${NC}`);
  console.log('');

  // Collect tadpole dirs that exist and have .git
  const tpBase = expandPath(project.tadpole_base);
  const prefix = project.tadpoles.prefix;
  const wsDirs: string[] = [];

  try {
    const allEntries = await readdir(tpBase, { withFileTypes: true });
    for (const e of allEntries) {
      if (!e.isDirectory()) continue;
      if (!new RegExp(`^${prefix}-\\d+$`).test(e.name)) continue;
      const tpDir = join(tpBase, e.name);
      if (existsSync(join(tpDir, '.git'))) {
        wsDirs.push(tpDir);
      }
    }
    wsDirs.sort();
  } catch {
    // ignore
  }

  for (const repo of config.repos) {
    const linkAs = repo.link_as ?? repo.name;
    const companionPath = join(base, repo.name);

    console.log(`  ${BOLD}${repo.name}${NC}`);

    const exists = await isDirSync(companionPath);
    if (exists) {
      console.log(`    Canonical:  ${GREEN}exists${NC}  (${companionPath})`);

      // Last fetch time via FETCH_HEAD mtime
      const fetchHead = join(companionPath, '.git', 'FETCH_HEAD');
      try {
        const { stat } = await import('node:fs/promises');
        const s = await stat(fetchHead);
        const d = s.mtime;
        const pad = (n: number) => String(n).padStart(2, '0');
        const fetchTime = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
        console.log(`    Last fetch: ${GRAY}${fetchTime}${NC}`);
      } catch {
        console.log(`    Last fetch: ${GRAY}never${NC}`);
      }
    } else {
      if (repo.remote) {
        console.log(`    Canonical:  ${YELLOW}not cloned yet${NC}  (${companionPath})`);
        console.log(`    Remote:     ${GRAY}${repo.remote}${NC}`);
      } else {
        console.log(`    Canonical:  ${RED}missing${NC}  (no remote configured)`);
      }
    }

    // Per-tadpole symlink status
    if (wsDirs.length > 0) {
      console.log('    Symlinks:');
      for (const tpDir of wsDirs) {
        const wsName = tpDir.split('/').pop() ?? '';
        const linkPath = join(tpDir, linkAs);

        let statusStr: string;
        if (await isSymlink(linkPath)) {
          statusStr = `${GREEN}✓ linked${NC}`;
        } else if (await pathExists(linkPath)) {
          statusStr = `${YELLOW}! exists (not a symlink)${NC}`;
        } else {
          statusStr = `${RED}✗ missing${NC}`;
        }

        // Pad wsName to 12 chars
        const padded = wsName.padEnd(12);
        // Use process.stdout.write for printf-style output without trailing newline issues
        console.log(`      ${padded} ${statusStr}`);
      }
    }

    console.log('');
  }
}

/**
 * Run `git fetch origin` in each canonical companion clone.
 * Silently skips companions that haven't been cloned yet.
 */
export async function fetchCompanions(project: BufoProject): Promise<void> {
  const config = loadCompanionsConfig(project);
  if (!config) {
    console.log(`${YELLOW}No companions configured for this project.${NC}`);
    return;
  }

  const base = getCompanionsBase(project, config);

  console.log(`${CYAN}Fetching companion repos...${NC}`);
  console.log('');

  for (const repo of config.repos) {
    const companionPath = join(base, repo.name);

    if (!(await isDirSync(companionPath))) {
      console.log(`  ${YELLOW}${repo.name}${NC}: not cloned — skipping`);
      continue;
    }

    console.log(`  ${BLUE}${repo.name}${NC}`);
    try {
      await execa('git', ['-C', companionPath, 'fetch', 'origin', '--quiet']);
      console.log(`    ${GREEN}fetched${NC}`);
    } catch {
      console.warn(`  ${YELLOW}Warning: Failed to fetch ${repo.name}${NC}`);
    }
  }

  console.log('');
  console.log(`${GREEN}Done.${NC}`);
}
