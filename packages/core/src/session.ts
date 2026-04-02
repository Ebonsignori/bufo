import { readFile, writeFile, mkdir, readdir, rm, stat, rename, access } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { tmpdir } from 'node:os';
import * as yaml from 'js-yaml';
import type { BufoProject, BufoSession, SessionLayout } from './types.js';

/**
 * Get sessions directory for a project.
 * Pattern: ~/.bufo/sessions/<alias>/
 */
export function getSessionsDir(project: BufoProject): string {
  return join(homedir(), '.bufo', 'sessions', project.alias);
}

/**
 * Get the directory for a specific session.
 */
export function getSessionDir(project: BufoProject, name: string): string {
  return join(getSessionsDir(project), name);
}

/**
 * Atomically write a file: write to tmp, then rename.
 */
async function atomicWrite(filePath: string, content: string): Promise<void> {
  const dir = dirname(filePath);
  await mkdir(dir, { recursive: true });
  const tmpFile = join(dir, `.tmp-${process.pid}-${Date.now()}`);
  await writeFile(tmpFile, content, 'utf-8');
  await rename(tmpFile, filePath);
}

/**
 * Create a new session.
 * Throws if session already exists.
 */
export async function createSession(
  project: BufoProject,
  name: string,
  context?: string,
): Promise<string> {
  const sessionDir = getSessionDir(project, name);

  if (existsSync(sessionDir)) {
    throw new Error(`Session '${name}' already exists. Use 'bufo session resume ${name}' to continue it.`);
  }

  await mkdir(sessionDir, { recursive: true });

  const now = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  const sessionData = {
    name,
    project: project.alias,
    created: now,
    last_accessed: now,
    claude_session_id: '',
    summary: '',
    type: 'general',
  };

  const yamlContent = yaml.dump(sessionData, { lineWidth: -1 });
  await atomicWrite(join(sessionDir, 'session.yaml'), yamlContent);

  if (context) {
    await atomicWrite(join(sessionDir, 'context.md'), context);
  }

  return sessionDir;
}

/**
 * Update a single field in session.yaml.
 */
export async function updateSession(
  project: BufoProject,
  name: string,
  field: string,
  value: string,
): Promise<void> {
  const sessionFile = join(getSessionDir(project, name), 'session.yaml');

  let doc: Record<string, unknown>;
  try {
    const raw = await readFile(sessionFile, 'utf-8');
    doc = (yaml.load(raw) as Record<string, unknown>) || {};
  } catch {
    throw new Error(`Session '${name}' not found`);
  }

  doc[field] = value;
  const yamlContent = yaml.dump(doc, { lineWidth: -1 });
  await atomicWrite(sessionFile, yamlContent);
}

/**
 * Get a single field from session.yaml.
 */
export async function getSession(
  project: BufoProject,
  name: string,
  field: string,
): Promise<string | null> {
  const sessionFile = join(getSessionDir(project, name), 'session.yaml');

  try {
    const raw = await readFile(sessionFile, 'utf-8');
    const doc = yaml.load(raw) as Record<string, unknown>;
    const val = doc?.[field];
    if (val === undefined || val === null || val === '') return null;
    return String(val);
  } catch {
    return null;
  }
}

/**
 * Load full session metadata including layout and derived fields.
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

  const doc = yaml.load(raw) as Record<string, unknown>;
  if (!doc) return null;

  const layout = await loadSessionLayout(sessionDir);
  const hasReviewOutput = existsSync(join(sessionDir, 'review-output.md'));

  return {
    name: (doc.name as string) || name,
    project: (doc.project as string) || project.alias,
    created: (doc.created as string) || '',
    last_accessed: (doc.last_accessed as string) || '',
    summary: (doc.summary as string) || '',
    type: ((doc.type as string) || 'general') as BufoSession['type'],
    prs: doc.prs as string[] | undefined,
    active: false, // caller must determine liveness via iTerm2
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
    const fullPath = join(sessionsDir, entry);
    try {
      const s = await stat(fullPath);
      if (!s.isDirectory()) continue;
    } catch {
      continue;
    }

    const session = await loadSessionFull(project, entry);
    if (!session) continue;

    if (filter) {
      if (!entry.startsWith(filter) && session.type !== filter) continue;
    }

    sessions.push(session);
  }

  return sessions;
}

/**
 * Delete a session directory entirely.
 */
export async function deleteSession(
  project: BufoProject,
  name: string,
): Promise<void> {
  const sessionDir = getSessionDir(project, name);
  try {
    await access(sessionDir);
  } catch {
    throw new Error(`Session '${name}' not found`);
  }
  await rm(sessionDir, { recursive: true, force: true });
}

/**
 * Save layout.json for a session (atomic write).
 */
export async function saveSessionLayout(
  sessionDir: string,
  layout: SessionLayout,
): Promise<void> {
  const content = JSON.stringify(layout, null, 2) + '\n';
  await atomicWrite(join(sessionDir, 'layout.json'), content);
}

/**
 * Load layout.json for a session.
 * Returns null if missing or malformed.
 */
export async function loadSessionLayout(
  sessionDir: string,
): Promise<SessionLayout | null> {
  const layoutFile = join(sessionDir, 'layout.json');
  try {
    const raw = await readFile(layoutFile, 'utf-8');
    const data = JSON.parse(raw) as SessionLayout;
    if (!data.main_sid) return null;
    return data;
  } catch {
    return null;
  }
}
