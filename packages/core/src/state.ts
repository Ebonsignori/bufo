import { readFile, writeFile, mkdir, readdir, rm, rename } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import type { TadpoleState } from './types.js';

const STATE_DIR = join(homedir(), '.bufo', 'state');

function stateFilePath(session: string, num: number | string): string {
  return join(STATE_DIR, session, `tp${num}.json`);
}

function legacyFilePath(session: string, num: number | string): string {
  return join(STATE_DIR, session, `ws${num}.json`);
}

/**
 * Save tadpole state atomically (write to tmp, then rename).
 */
export async function saveState(
  session: string,
  num: number | string,
  state: TadpoleState,
): Promise<void> {
  const filePath = stateFilePath(session, num);
  await mkdir(dirname(filePath), { recursive: true });
  const tmpFile = `${filePath}.${Date.now()}.tmp`;
  await writeFile(tmpFile, JSON.stringify(state, null, 2), 'utf-8');
  await rename(tmpFile, filePath);
}

/**
 * Load tadpole state from disk.
 * Prefers tp<N>.json, falls back to legacy ws<N>.json.
 */
export async function loadState(
  session: string,
  num: number | string,
): Promise<TadpoleState | null> {
  for (const path of [stateFilePath(session, num), legacyFilePath(session, num)]) {
    try {
      const raw = await readFile(path, 'utf-8');
      return JSON.parse(raw) as TadpoleState;
    } catch {
      continue;
    }
  }
  return null;
}

/**
 * Remove state file (both tp and legacy formats).
 */
export async function removeState(
  session: string,
  num: number | string,
): Promise<void> {
  for (const path of [stateFilePath(session, num), legacyFilePath(session, num)]) {
    try {
      await rm(path);
    } catch {
      // ignore
    }
  }
}

/**
 * List all tadpole numbers that have state files for a session.
 */
export async function listStates(session: string): Promise<(number | string)[]> {
  const dir = join(STATE_DIR, session);
  try {
    const entries = await readdir(dir);
    const nums: (number | string)[] = [];
    const seen = new Set<string>();

    for (const entry of entries) {
      const tpMatch = entry.match(/^tp(.+)\.json$/);
      const wsMatch = entry.match(/^ws(.+)\.json$/);
      const id = tpMatch?.[1] ?? wsMatch?.[1];
      if (id && !seen.has(id)) {
        seen.add(id);
        nums.push(/^\d+$/.test(id) ? parseInt(id, 10) : id);
      }
    }
    return nums;
  } catch {
    return [];
  }
}

/**
 * Check if state exists AND the main session is alive in iTerm2.
 * Removes stale state files automatically.
 * Accepts an optional set of active session IDs to avoid repeated iTerm2 queries.
 */
export async function stateExists(
  session: string,
  num: number | string,
  activeSessions?: Set<string>,
): Promise<boolean> {
  const state = await loadState(session, num);
  if (!state) return false;

  const mainSid = state.panes?.main;
  if (!mainSid) {
    await removeState(session, num);
    return false;
  }

  if (activeSessions) {
    const alive = activeSessions.has(mainSid);
    if (!alive) {
      await removeState(session, num);
    }
    return alive;
  }

  // Dynamic import to avoid circular deps — only needed when no activeSessions provided
  try {
    const { sessionExists: checkSession } = await import('./iterm.js');
    const alive = await checkSession(mainSid);
    if (!alive) {
      await removeState(session, num);
    }
    return alive;
  } catch {
    // If iTerm2 check fails, trust the file
    return true;
  }
}
