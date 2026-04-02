import { mkdir, readFile, writeFile, rename, rm } from "fs/promises";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { homedir } from "os";
import { randomUUID } from "crypto";
import * as yaml from "js-yaml";
import type { SessionLayout } from "./types.js";

const SESSIONS_DIR = join(homedir(), ".bufo", "sessions");

/**
 * Absolute path to the sessions directory for a project.
 * Pattern: ~/.bufo/sessions/<project-alias>/
 */
export function getSessionsDir(projectAlias: string): string {
  return join(SESSIONS_DIR, projectAlias);
}

/**
 * Atomically write content to a file (write to tmp, then rename).
 */
async function atomicWrite(filePath: string, content: string): Promise<void> {
  const dir = dirname(filePath);
  await mkdir(dir, { recursive: true });
  const tmpPath = join(dir, `.tmp-${randomUUID()}`);
  await writeFile(tmpPath, content, "utf-8");
  await rename(tmpPath, filePath);
}

/**
 * Create a new session YAML file.
 * Writes ~/.bufo/sessions/<alias>/<name>/session.yaml
 */
export async function createSession(
  projectAlias: string,
  name: string,
  context?: string
): Promise<void> {
  const sessionDir = join(getSessionsDir(projectAlias), name);
  const sessionFile = join(sessionDir, "session.yaml");

  if (existsSync(sessionFile)) {
    throw new Error(`Session '${name}' already exists`);
  }

  const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

  const doc = {
    name,
    project: projectAlias,
    created: now,
    last_accessed: now,
    claude_session_id: "",
    summary: "",
    type: "general",
  };

  await atomicWrite(sessionFile, yaml.dump(doc, { lineWidth: -1 }));

  if (context) {
    await atomicWrite(join(sessionDir, "context.md"), context);
  }
}

/**
 * Update a single field in session.yaml using a key path.
 */
export async function updateSession(
  projectAlias: string,
  name: string,
  field: string,
  value: string
): Promise<void> {
  const sessionFile = join(getSessionsDir(projectAlias), name, "session.yaml");

  if (!existsSync(sessionFile)) {
    throw new Error(`Session '${name}' not found`);
  }

  const raw = await readFile(sessionFile, "utf-8");
  const doc = (yaml.load(raw) as Record<string, unknown>) || {};
  doc[field] = value;

  await atomicWrite(sessionFile, yaml.dump(doc, { lineWidth: -1 }));
}

/**
 * Read a single field value from session.yaml.
 * Returns null if session or field doesn't exist.
 */
export async function getSessionField(
  projectAlias: string,
  name: string,
  field: string
): Promise<string | null> {
  const sessionFile = join(getSessionsDir(projectAlias), name, "session.yaml");

  if (!existsSync(sessionFile)) {
    return null;
  }

  try {
    const raw = await readFile(sessionFile, "utf-8");
    const doc = (yaml.load(raw) as Record<string, unknown>) || {};
    const val = doc[field];
    if (val === undefined || val === null || val === "") {
      return null;
    }
    return String(val);
  } catch {
    return null;
  }
}

/**
 * Delete a session directory and all its contents.
 */
export async function deleteSession(
  projectAlias: string,
  name: string
): Promise<void> {
  const sessionDir = join(getSessionsDir(projectAlias), name);

  if (!existsSync(sessionDir)) {
    throw new Error(`Session '${name}' not found`);
  }

  await rm(sessionDir, { recursive: true, force: true });
}

/**
 * Atomically write the layout JSON for a session.
 */
export async function saveSessionLayout(
  sessionDir: string,
  layout: SessionLayout
): Promise<void> {
  const layoutFile = join(sessionDir, "layout.json");
  await atomicWrite(layoutFile, JSON.stringify(layout, null, 2) + "\n");
}

/**
 * Read the layout JSON for a session.
 * Returns null if layout.json doesn't exist.
 */
export async function loadSessionLayout(
  sessionDir: string
): Promise<SessionLayout | null> {
  const layoutFile = join(sessionDir, "layout.json");

  if (!existsSync(layoutFile)) {
    return null;
  }

  try {
    const raw = await readFile(layoutFile, "utf-8");
    return JSON.parse(raw) as SessionLayout;
  } catch {
    return null;
  }
}
