import { mkdir, writeFile, readFile, rm, readdir, stat, access } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import * as yaml from 'js-yaml';
import type { BufoProject, BufoSession, SessionLayout } from './types.js';

// ---------------------------------------------------------------------------
// Path helpers — use functions so homedir() is resolved lazily (testable)
// ---------------------------------------------------------------------------

export function getSessionsDir(project: BufoProject): string {
  return join(homedir(), '.bufo', 'sessions', project.alias);
}

export function getSessionDir(project: BufoProject, name: string): string {
  return join(getSessionsDir(project), name);
}

// ---------------------------------------------------------------------------
// CRUD
// ---------------------------------------------------------------------------

/**
 * Create a new session directory + session.yaml, optionally writing context.md.
 * Returns the session directory path.
 */
export async function createSession(
  project: BufoProject,
  name: string,
  context?: string,
): Promise<string> {
  const sessionDir = getSessionDir(project, name);

  // Fail loudly if it already exists
  try {
    await access(sessionDir);
    throw new Error(`Session '${name}' already exists`);
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
 * Get a single field value from a session's session.yaml.
 * Returns null if session or field not found.
 */
export async function getSession(
  project: BufoProject,
  name: string,
  field: string,
): Promise<string | null> {
  const sessionFile = join(getSessionDir(project, name), 'session.yaml');
  let raw: string;
  try {
    raw = await readFile(sessionFile, 'utf-8');
  } catch {
    return null;
  }
  const doc = (yaml.load(raw) as Record<string, unknown>) ?? {};
  const val = doc[field];
  if (val === undefined || val === null) return null;
  return String(val);
}

/**
 * Load a full BufoSession object by project + name. Returns null if not found.
 */
export async function loadSessionFull(
  project: BufoProject,
  name: string,
): Promise<BufoSession | null> {
  const sessionDir = getSessionDir(project, name);
  const sessionFile = join(sessionDir, 'session.yaml');
  let raw: string;
  try {
    raw = await readFile(sessionFile, 'utf-8');
  } catch {
    return null;
  }
  const doc = (yaml.load(raw) as Record<string, string>) ?? {};

  const hasReviewOutput = existsSync(join(sessionDir, 'review-output.md'));
  const layout = await loadSessionLayout(sessionDir);

  return {
    name: doc['name'] ?? name,
    project: doc['project'] ?? project.alias,
    created: doc['created'] ?? '',
    last_accessed: doc['last_accessed'] ?? '',
    summary: doc['summary'] ?? '',
    type: (doc['type'] as BufoSession['type']) ?? 'general',
    active: false, // iTerm2 session liveness is checked externally
    hasReviewOutput,
    layout: layout ?? undefined,
  };
}

/**
 * List all sessions for a project, optionally filtered by name prefix or type.
 */
export async function listSessions(
  project: BufoProject,
  filter?: string,
): Promise<BufoSession[]> {
  const sessionsDir = getSessionsDir(project);
  let entries: string[];
  try {
    entries = await readdir(sessionsDir);
  } catch {
    return [];
  }

  const sessions: BufoSession[] = [];
  for (const entry of entries) {
    const sessionDir = join(sessionsDir, entry);
    try {
      const info = await stat(sessionDir);
      if (!info.isDirectory()) continue;
    } catch {
      continue;
    }
    const session = await loadSessionFull(project, entry);
    if (!session) continue;
    if (filter && !entry.startsWith(filter) && session.type !== filter) continue;
    sessions.push(session);
  }
  return sessions;
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
 * Read layout.json from a session directory. Returns null if missing or invalid
 * (requires at minimum a main_sid field to be considered valid).
 */
export async function loadSessionLayout(
  sessionDir: string,
): Promise<SessionLayout | null> {
  const layoutFile = join(sessionDir, 'layout.json');
  try {
    const raw = await readFile(layoutFile, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<SessionLayout>;
    // Require the essential fields
    if (!parsed.main_sid) return null;
    return parsed as SessionLayout;
  } catch {
    return null;
  }
}
