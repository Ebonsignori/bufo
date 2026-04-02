import { mkdir, writeFile, readFile, rm, readdir, stat, access } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';
import * as yaml from 'js-yaml';
import type { BufoProject, BufoSession, SessionLayout } from './types.js';
import { loadSession, discoverSessions } from './config.js';

const BUFO_DIR = join(homedir(), '.bufo');
const SESSIONS_DIR = join(BUFO_DIR, 'sessions');

// ---------------------------------------------------------------------------
// Path helpers
// ---------------------------------------------------------------------------

/**
 * Returns the on-disk directory for a named session (sync, no I/O).
 */
export function getSessionDir(project: BufoProject, name: string): string {
  return join(SESSIONS_DIR, project.alias, name);
}

// ---------------------------------------------------------------------------
// CRUD
// ---------------------------------------------------------------------------

/**
 * Create a new session directory + session.yaml, optionally writing context.md.
 * Returns the session directory path (mirrors bash session_create output).
 */
export async function createSession(
  project: BufoProject,
  name: string,
  context?: string,
): Promise<string> {
  const sessionDir = getSessionDir(project, name);

  // Fail loudly if it already exists — mirrors bash behaviour
  try {
    await access(sessionDir);
    throw new Error(
      `Session '${name}' already exists. Use 'bufo session resume ${name}' to continue it.`,
    );
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
  }

  await mkdir(sessionDir, { recursive: true });

  const now = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  const sessionYaml = yaml.dump({
    name,
    project: project.alias,
    created: now,
    last_accessed: now,
    claude_session_id: '',
    summary: '',
    type: 'general',
  });
  await writeFile(join(sessionDir, 'session.yaml'), sessionYaml, 'utf-8');

  if (context) {
    await writeFile(join(sessionDir, 'context.md'), context, 'utf-8');
  }

  return sessionDir;
}

/**
 * Update a single field in a session's session.yaml.
 * Mirrors bash session_update: rewrites the field via yaml round-trip.
 */
export async function updateSession(
  project: BufoProject,
  name: string,
  field: string,
  value: string,
): Promise<void> {
  const sessionFile = join(getSessionDir(project, name), 'session.yaml');
  let raw: string;
  try {
    raw = await readFile(sessionFile, 'utf-8');
  } catch {
    throw new Error(`Session '${name}' not found`);
  }
  const doc = (yaml.load(raw) as Record<string, unknown>) ?? {};
  doc[field] = value;
  await writeFile(sessionFile, yaml.dump(doc), 'utf-8');
}

/**
 * Load a session by project + name. Returns null if not found.
 */
export async function getSession(
  project: BufoProject,
  name: string,
): Promise<BufoSession | null> {
  return loadSession(project.alias, name) ?? null;
}

/**
 * Richer alias of getSession — loads layout and active status alongside
 * the session.yaml data. Returns null if not found.
 */
export async function loadSessionFull(
  project: BufoProject,
  name: string,
): Promise<BufoSession | null> {
  return getSession(project, name);
}

/**
 * List all sessions for a project, optionally filtered by type prefix or name prefix.
 * Mirrors bash session_list filtering: matches on name prefix OR type equals filter.
 */
export async function listSessions(
  project: BufoProject,
  filter?: string,
): Promise<BufoSession[]> {
  const all = discoverSessions(project.alias);
  if (!filter) return all;
  return all.filter(
    (s) => s.name.startsWith(filter) || s.type === filter,
  );
}

/**
 * Delete a session directory recursively.
 */
export async function deleteSession(
  project: BufoProject,
  name: string,
): Promise<void> {
  const sessionDir = getSessionDir(project, name);
  try {
    const info = await stat(sessionDir);
    if (!info.isDirectory()) {
      throw new Error(`Session '${name}' not found`);
    }
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(`Session '${name}' not found`);
    }
    throw err;
  }
  await rm(sessionDir, { recursive: true, force: true });
}

// ---------------------------------------------------------------------------
// Layout persistence
// ---------------------------------------------------------------------------

/**
 * Write layout.json to a session directory.
 */
export async function saveSessionLayout(
  sessionDir: string,
  layout: SessionLayout,
): Promise<void> {
  await writeFile(
    join(sessionDir, 'layout.json'),
    JSON.stringify(layout, null, 2),
    'utf-8',
  );
}

/**
 * Read layout.json from a session directory. Returns null if missing/invalid.
 */
export async function loadSessionLayout(
  sessionDir: string,
): Promise<SessionLayout | null> {
  const layoutFile = join(sessionDir, 'layout.json');
  try {
    const raw = await readFile(layoutFile, 'utf-8');
    return JSON.parse(raw) as SessionLayout;
  } catch {
    return null;
  }
}
