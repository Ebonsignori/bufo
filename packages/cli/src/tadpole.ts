/**
 * Tadpole data layer — lock/unlock, naming, listing, and detection.
 *
 * Does NOT include iTerm2 layout functions (open/create/restart/cleanup/destroy).
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { writeFile, unlink, rename } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import type { BufoProject, BufoTadpole, TadpoleMeta } from '@bufo/core';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Absolute path to a tadpole's worktree directory. */
export function getTadpoleDir(project: BufoProject, num: number): string {
  return join(project.tadpole_base, `${project.tadpoles.prefix}-${num}`);
}

/**
 * Atomically write a file: write to a tmp sibling, then rename.
 */
async function atomicWrite(filePath: string, content: string): Promise<void> {
  const dir = dirname(filePath);
  const tmp = join(dir, `.tmp-${process.pid}-${Date.now()}`);
  await writeFile(tmp, content, 'utf-8');
  await rename(tmp, filePath);
}

/**
 * Read `.bufo-meta` from a tadpole directory.
 * Returns undefined if missing or malformed.
 */
function readMeta(dir: string): TadpoleMeta | undefined {
  const metaFile = join(dir, '.bufo-meta');
  try {
    const raw = readFileSync(metaFile, 'utf-8');
    return JSON.parse(raw) as TadpoleMeta;
  } catch {
    return undefined;
  }
}

/**
 * Get git branch for a directory, synchronously.
 * Returns empty string on failure.
 */
function getGitBranch(dir: string): string {
  try {
    return execSync('git branch --show-current', {
      cwd: dir,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  } catch {
    return '';
  }
}

// ---------------------------------------------------------------------------
// Locking
// ---------------------------------------------------------------------------

/** Lock a tadpole (create `.bufo-lock` sentinel). */
export async function lockTadpole(project: BufoProject, num: number): Promise<void> {
  const dir = getTadpoleDir(project, num);
  if (!existsSync(dir)) {
    throw new Error(`Tadpole ${num} does not exist`);
  }
  await atomicWrite(join(dir, '.bufo-lock'), '');
}

/** Unlock a tadpole (remove `.bufo-lock` sentinel). */
export async function unlockTadpole(project: BufoProject, num: number): Promise<void> {
  const dir = getTadpoleDir(project, num);
  if (!existsSync(dir)) {
    throw new Error(`Tadpole ${num} does not exist`);
  }
  try {
    await unlink(join(dir, '.bufo-lock'));
  } catch (err: any) {
    if (err.code !== 'ENOENT') throw err;
  }
}

/** Unlock all tadpoles (skip those that don't have a lock file). */
export async function unlockAll(project: BufoProject): Promise<void> {
  if (!existsSync(project.tadpole_base)) return;

  const prefix = project.tadpoles.prefix;
  const entries = readdirSync(project.tadpole_base, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (!entry.name.startsWith(`${prefix}-`)) continue;
    const numStr = entry.name.slice(prefix.length + 1);
    const num = parseInt(numStr, 10);
    if (isNaN(num)) continue;

    const lockFile = join(project.tadpole_base, entry.name, '.bufo-lock');
    try {
      await unlink(lockFile);
    } catch (err: any) {
      if (err.code !== 'ENOENT') throw err;
    }
  }
}

/** Find the first unlocked tadpole. Returns its number or null. */
export async function findUnlocked(project: BufoProject): Promise<number | null> {
  if (!existsSync(project.tadpole_base)) return null;

  const prefix = project.tadpoles.prefix;
  const entries = readdirSync(project.tadpole_base, { withFileTypes: true });
  const nums: number[] = entries
    .filter((e) => e.isDirectory() && e.name.startsWith(`${prefix}-`))
    .map((e) => parseInt(e.name.slice(prefix.length + 1), 10))
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);

  for (const n of nums) {
    const lockFile = join(project.tadpole_base, `${prefix}-${n}`, '.bufo-lock');
    if (!existsSync(lockFile)) {
      return n;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Naming
// ---------------------------------------------------------------------------

/** Read the custom name for a tadpole (synchronous). Returns `tp{N}` if unset. */
export function getTadpoleName(project: BufoProject, num: number): string {
  const dir = getTadpoleDir(project, num);
  const nameFile = join(dir, '.bufo-name');
  try {
    return readFileSync(nameFile, 'utf-8').trim();
  } catch {
    return `tp${num}`;
  }
}

/** Set a custom name for a tadpole (atomic write). */
export async function setTadpoleName(
  project: BufoProject,
  num: number,
  name: string,
): Promise<void> {
  const dir = getTadpoleDir(project, num);
  if (!existsSync(dir)) {
    throw new Error(`Tadpole ${num} does not exist`);
  }
  await atomicWrite(join(dir, '.bufo-name'), name);
}

/** Clear the custom name for a tadpole. */
export async function clearTadpoleName(project: BufoProject, num: number): Promise<void> {
  const dir = getTadpoleDir(project, num);
  try {
    await unlink(join(dir, '.bufo-name'));
  } catch (err: any) {
    if (err.code !== 'ENOENT') throw err;
  }
}

// ---------------------------------------------------------------------------
// Tab title
// ---------------------------------------------------------------------------

/**
 * Compute the terminal tab title for a tadpole.
 *
 * Priority: `{name}: {PR title}` > `{name}` (ticket) > `{branch}` > `tp{N}`
 * Prefix with `@{alias}` when project alias is set.
 * Truncate to 60 chars.
 */
export async function computeTabTitle(project: BufoProject, num: number): Promise<string> {
  const dir = getTadpoleDir(project, num);
  const name = getTadpoleName(project, num);
  const meta = readMeta(dir);

  let title = '';

  if (meta) {
    const prTitle = meta.pr_title || '';
    const ticket = meta.ticket || '';

    if (prTitle) {
      title = `${name}: ${prTitle}`;
    } else if (ticket) {
      title = name;
    }
  }

  // Fallback: branch (if not main/master) > name
  if (!title) {
    const branch = existsSync(dir) ? getGitBranch(dir) : '';
    if (branch && branch !== 'main' && branch !== 'master') {
      title = branch;
    } else {
      title = name;
    }
  }

  // Prefix with project alias
  if (project.alias) {
    title = `@${project.alias} ${title}`;
  }

  // Truncate to 60 chars
  if (title.length > 60) {
    title = title.slice(0, 57) + '...';
  }

  return title;
}

// ---------------------------------------------------------------------------
// Listing
// ---------------------------------------------------------------------------

/**
 * List all discovered tadpoles for a project.
 * Scans the tadpole_base directory for `<prefix>-<N>` directories.
 */
export async function listTadpoles(project: BufoProject): Promise<BufoTadpole[]> {
  if (!existsSync(project.tadpole_base)) return [];

  const prefix = project.tadpoles.prefix;
  const entries = readdirSync(project.tadpole_base, { withFileTypes: true });
  const nums: number[] = entries
    .filter((e) => e.isDirectory() && e.name.startsWith(`${prefix}-`))
    .map((e) => parseInt(e.name.slice(prefix.length + 1), 10))
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);

  const tadpoles: BufoTadpole[] = [];

  for (const n of nums) {
    const dir = getTadpoleDir(project, n);
    const locked = existsSync(join(dir, '.bufo-lock'));
    const meta = readMeta(dir);
    const customName = getTadpoleName(project, n);
    const branch = getGitBranch(dir);

    tadpoles.push({
      project,
      number: n,
      directory: dir,
      branch: branch || 'unknown',
      locked,
      active: false, // requires iTerm2 session check — not available in data layer
      meta,
      customName: customName !== `tp${n}` ? customName : undefined,
    });
  }

  return tadpoles;
}

// ---------------------------------------------------------------------------
// Detection
// ---------------------------------------------------------------------------

/**
 * Detect which tadpole number corresponds to the given working directory.
 * Matches cwd against `tadpole_base/prefix-N` paths.
 * Returns null if cwd is not inside a tadpole directory.
 */
export function detectTadpoleFromDir(project: BufoProject, cwd: string): number | null {
  const prefix = project.tadpoles.prefix;
  const base = resolve(project.tadpole_base);
  const resolved = resolve(cwd);

  // Match pattern: <base>/<prefix>-<N> (or deeper subdirectory)
  const pattern = new RegExp(
    `${escapeRegex(base)}/${escapeRegex(prefix)}-(\\d+)(?:/|$)`,
  );
  const match = resolved.match(pattern);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---------------------------------------------------------------------------
// Slot allocation
// ---------------------------------------------------------------------------

/**
 * Find the first available tadpole number where `<prefix>-<N>` does not exist
 * as a directory. Starts at 1.
 */
export function findNextSlot(project: BufoProject): number {
  let num = 1;
  while (num <= 100) {
    const dir = getTadpoleDir(project, num);
    if (!existsSync(dir)) {
      return num;
    }
    num++;
  }
  throw new Error('No available tadpole slot (checked 1-100)');
}
