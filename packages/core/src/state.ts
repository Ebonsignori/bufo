import { readFile, writeFile, rename, mkdir, unlink, readdir } from 'fs/promises';
import { join } from 'path';
import { homedir, tmpdir } from 'os';
import type { TadpoleState } from './types.js';
import { getActiveSessions } from './iterm.js';

export const STATE_DIR = join(homedir(), '.bufo', 'state');

/**
 * Atomically write content to a file path.
 * Writes to a temp file first, then renames to avoid partial reads.
 */
async function atomicWrite(path: string, content: string): Promise<void> {
  const tmp = join(tmpdir(), `bufo-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  await writeFile(tmp, content, 'utf8');
  await rename(tmp, path);
}

/**
 * Atomically write state to ~/.bufo/state/<session>/tp<N>.json
 */
export async function saveState(session: string, num: number, state: TadpoleState): Promise<void> {
  const dir = join(STATE_DIR, session);
  await mkdir(dir, { recursive: true });
  const filePath = join(dir, `tp${num}.json`);
  await atomicWrite(filePath, JSON.stringify(state, null, 2) + '\n');
}

/**
 * Read state. Falls back to ws<N>.json (legacy) if tp<N>.json absent.
 * Returns null if neither exists.
 */
export async function loadState(session: string, num: number): Promise<TadpoleState | null> {
  const dir = join(STATE_DIR, session);

  // Try canonical tp<N>.json first
  const tpPath = join(dir, `tp${num}.json`);
  try {
    const content = await readFile(tpPath, 'utf8');
    return JSON.parse(content) as TadpoleState;
  } catch {
    // fall through to legacy
  }

  // Fall back to legacy ws<N>.json
  const wsPath = join(dir, `ws${num}.json`);
  try {
    const content = await readFile(wsPath, 'utf8');
    return JSON.parse(content) as TadpoleState;
  } catch {
    return null;
  }
}

/**
 * Remove both tp<N>.json and ws<N>.json for a tadpole.
 */
export async function removeState(session: string, num: number): Promise<void> {
  const dir = join(STATE_DIR, session);
  const tpPath = join(dir, `tp${num}.json`);
  const wsPath = join(dir, `ws${num}.json`);

  await silentUnlink(tpPath);
  await silentUnlink(wsPath);
}

async function silentUnlink(path: string): Promise<void> {
  try {
    await unlink(path);
  } catch {
    // file may not exist — that's fine
  }
}

/**
 * Extract the UUID portion from a pane session ID.
 * Handles both plain UUIDs and prefixed format like "w3t1p2:<UUID>".
 */
function extractUuid(paneId: string): string {
  const colonIdx = paneId.lastIndexOf(':');
  return colonIdx >= 0 ? paneId.slice(colonIdx + 1) : paneId;
}

/**
 * Returns true ONLY IF:
 * 1. State file exists, AND
 * 2. The main pane session ID is in the live iTerm2 session list
 * If the file exists but session is dead, removes the stale file and returns false.
 */
export async function stateExists(session: string, num: number): Promise<boolean> {
  const state = await loadState(session, num);
  if (!state) return false;

  const mainSid = state.panes.main;
  if (!mainSid) return false;

  const uuid = extractUuid(mainSid);
  const activeSessions = getActiveSessions();

  if (activeSessions.has(uuid)) {
    return true;
  }

  // Session is dead — remove stale state
  await removeState(session, num);
  return false;
}

/**
 * List all tadpole numbers that have state files for a session.
 * Returns tp<N> numbers; canonical (tp*.json) first, then legacy (ws*.json) without counterpart.
 */
export async function listStates(session: string): Promise<number[]> {
  const dir = join(STATE_DIR, session);

  let files: string[];
  try {
    files = await readdir(dir);
  } catch {
    return [];
  }

  const tpNumbers = new Set<number>();
  const wsNumbers: number[] = [];

  // Collect canonical tp<N>.json entries
  for (const f of files) {
    const tpMatch = /^tp(\d+)\.json$/.exec(f);
    if (tpMatch) {
      tpNumbers.add(Number(tpMatch[1]));
    }
  }

  // Collect legacy ws<N>.json entries without a tp counterpart
  for (const f of files) {
    const wsMatch = /^ws(\d+)\.json$/.exec(f);
    if (wsMatch) {
      const num = Number(wsMatch[1]);
      if (!tpNumbers.has(num)) {
        wsNumbers.push(num);
      }
    }
  }

  // tp numbers first (sorted), then legacy ws numbers (sorted)
  return [...[...tpNumbers].sort((a, b) => a - b), ...wsNumbers.sort((a, b) => a - b)];
}
