import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { readdir } from "fs/promises";
import { join } from "path";
import { homedir } from "os";
import * as yaml from "js-yaml";
import type { BufoProject, GlobalConfig, TadpoleMeta, TadpoleState, BufoSession, SessionLayout } from "./types.js";

// Top-level constants — only used by legacy sync functions.
// New async functions call homedir() lazily so tests can mock it.
const BUFO_DIR = join(homedir(), ".bufo");
const PROJECTS_DIR = join(BUFO_DIR, "projects");
const STATE_DIR = join(BUFO_DIR, "state");
const SESSIONS_DIR = join(BUFO_DIR, "sessions");
const GLOBAL_CONFIG = join(BUFO_DIR, "config.yaml");

export function getBufoDir(): string {
  return BUFO_DIR;
}

export function bufoExists(): boolean {
  return existsSync(BUFO_DIR);
}

function expandPath(p: string): string {
  if (p.startsWith("~/") || p === "~") {
    return join(homedir(), p.slice(2));
  }
  return p;
}

export function loadGlobalConfig(): GlobalConfig {
  if (!existsSync(GLOBAL_CONFIG)) return {};
  try {
    const raw = readFileSync(GLOBAL_CONFIG, "utf-8");
    return (yaml.load(raw) as GlobalConfig) || {};
  } catch {
    return {};
  }
}

export function loadProject(alias: string, filePath: string): BufoProject {
  const raw = readFileSync(filePath, "utf-8");
  const doc = yaml.load(raw) as Record<string, unknown>;

  // Support both new tadpoles: and legacy workspaces: keys
  const tadpoles = (doc.tadpoles as Record<string, unknown>) ||
    (doc.workspaces as Record<string, unknown>) || {};
  const ports = (doc.ports as Record<string, unknown>) || {};

  const ticket = doc.ticket as Record<string, string> | undefined;

  return {
    alias,
    session_name: (doc.session_name as string) || alias,
    tadpole_base: expandPath(
      (doc.tadpole_base as string) || (doc.workspace_base as string) || ""
    ),
    main_repo: expandPath((doc.main_repo as string) || ""),
    tadpoles: {
      count: (tadpoles.count as number) || 5,
      prefix: (tadpoles.prefix as string) || "tadpole",
      branch_pattern: (tadpoles.branch_pattern as string) || "tadpole-{N}",
    },
    ports: ports
      ? {
          api_base: ports.api_base as number | undefined,
          app_base: ports.app_base as number | undefined,
        }
      : undefined,
    layout: doc.layout as BufoProject["layout"],
    ticket: ticket
      ? {
          linear_team: ticket.linear_team,
          linear_base_url: ticket.linear_base_url,
          github_repo: ticket.github_repo,
        }
      : undefined,
    config_file: filePath,
  };
}

export function discoverProjects(): BufoProject[] {
  if (!existsSync(PROJECTS_DIR)) return [];
  const files = readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"));
  const projects: BufoProject[] = [];
  for (const file of files) {
    const alias = file.replace(/\.ya?ml$/, "");
    try {
      projects.push(loadProject(alias, join(PROJECTS_DIR, file)));
    } catch {
      // skip invalid configs
    }
  }
  const defaultAlias = loadGlobalConfig().default_project;
  if (defaultAlias) {
    projects.sort((a, b) => (a.alias === defaultAlias ? -1 : b.alias === defaultAlias ? 1 : 0));
  }
  return projects;
}

export function loadTadpoleState(sessionName: string, num: number): TadpoleState | undefined {
  // Prefer tp<N>.json, fall back to legacy ws<N>.json
  let stateFile = join(STATE_DIR, sessionName, `tp${num}.json`);
  if (!existsSync(stateFile)) {
    stateFile = join(STATE_DIR, sessionName, `ws${num}.json`);
  }
  if (!existsSync(stateFile)) return undefined;
  try {
    return JSON.parse(readFileSync(stateFile, "utf-8")) as TadpoleState;
  } catch {
    return undefined;
  }
}

export function loadTadpoleMeta(tadpoleDir: string): TadpoleMeta | undefined {
  const metaFile = join(tadpoleDir, ".bufo-meta");
  if (!existsSync(metaFile)) return undefined;
  try {
    return JSON.parse(readFileSync(metaFile, "utf-8")) as TadpoleMeta;
  } catch {
    return undefined;
  }
}

export function isTadpoleLocked(tadpoleDir: string): boolean {
  return existsSync(join(tadpoleDir, ".bufo-lock"));
}

export function getCustomName(tadpoleDir: string): string | undefined {
  const nameFile = join(tadpoleDir, ".bufo-name");
  if (!existsSync(nameFile)) return undefined;
  try {
    return readFileSync(nameFile, "utf-8").trim() || undefined;
  } catch {
    return undefined;
  }
}

export function loadSession(
  projectAlias: string,
  sessionName: string,
  activeSessions?: Set<string>
): BufoSession | undefined {
  const sessionDir = join(SESSIONS_DIR, projectAlias, sessionName);
  const sessionFile = join(sessionDir, "session.yaml");
  if (!existsSync(sessionFile)) return undefined;
  try {
    const raw = readFileSync(sessionFile, "utf-8");
    const doc = yaml.load(raw) as Record<string, unknown>;

    let layout: SessionLayout | undefined;
    const layoutFile = join(sessionDir, "layout.json");
    if (existsSync(layoutFile)) {
      try {
        layout = JSON.parse(readFileSync(layoutFile, "utf-8")) as SessionLayout;
      } catch {
        // stale or malformed layout — ignore
      }
    }

    const active = layout?.main_sid ? (activeSessions?.has(layout.main_sid) ?? false) : false;
    const hasReviewOutput = existsSync(join(sessionDir, "review-output.md"));

    return {
      name: (doc.name as string) || sessionName,
      project: (doc.project as string) || projectAlias,
      created: (doc.created as string) || "",
      last_accessed: (doc.last_accessed as string) || "",
      summary: (doc.summary as string) || "",
      type: ((doc.type as string) || "general") as BufoSession["type"],
      prs: doc.prs as string[] | undefined,
      active,
      hasReviewOutput,
      layout,
    };
  } catch {
    return undefined;
  }
}

export function discoverSessions(
  projectAlias: string,
  activeSessions?: Set<string>
): BufoSession[] {
  const projectSessionsDir = join(SESSIONS_DIR, projectAlias);
  if (!existsSync(projectSessionsDir)) return [];
  let entries: string[];
  try {
    entries = readdirSync(projectSessionsDir);
  } catch {
    return [];
  }
  const sessions: BufoSession[] = [];
  for (const entry of entries) {
    const fullPath = join(projectSessionsDir, entry);
    try {
      if (!statSync(fullPath).isDirectory()) continue;
    } catch {
      continue;
    }
    const session = loadSession(projectAlias, entry, activeSessions);
    if (session) sessions.push(session);
  }
  return sessions;
}

export function getAllSessions(
  activeSessions?: Set<string>
): { projectAlias: string; sessions: BufoSession[] }[] {
  const projects = discoverProjects();
  const result: { projectAlias: string; sessions: BufoSession[] }[] = [];
  for (const project of projects) {
    const sessions = discoverSessions(project.alias, activeSessions);
    if (sessions.length > 0) {
      result.push({ projectAlias: project.alias, sessions });
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Async project resolution (testable — use lazy homedir() calls)
// ---------------------------------------------------------------------------

/**
 * Load all project configs into a Map<alias, BufoProject>.
 * Async so callers don't need to handle sync I/O.
 */
export async function loadAllProjectConfigs(): Promise<Map<string, BufoProject>> {
  const projectsDir = join(homedir(), ".bufo", "projects");
  const result = new Map<string, BufoProject>();
  let files: string[];
  try {
    files = await readdir(projectsDir);
  } catch {
    return result;
  }
  for (const file of files) {
    if (!file.endsWith(".yaml") && !file.endsWith(".yml")) continue;
    const alias = file.replace(/\.ya?ml$/, "");
    try {
      result.set(alias, loadProject(alias, join(projectsDir, file)));
    } catch {
      // skip invalid configs silently
    }
  }
  return result;
}

export interface ValidationResult {
  ok: true;
}
export interface ValidationFailure {
  ok: false;
  errors: string[];
}

/**
 * Validate a BufoProject config object. Returns { ok: true } or { ok: false, errors }.
 */
export function validateProject(project: BufoProject): ValidationResult | ValidationFailure {
  const errors: string[] = [];
  if (!project.session_name) errors.push("session_name is required");
  if (!project.tadpole_base) errors.push("tadpole_base is required");
  if (!project.main_repo) errors.push("main_repo is required");
  if (!project.tadpoles.prefix) errors.push("tadpoles.prefix is required");
  if (!project.tadpoles.branch_pattern) errors.push("tadpoles.branch_pattern is required");
  if (typeof project.tadpoles.count === "number" && project.tadpoles.count <= 0) {
    errors.push("tadpoles.count must be a positive number");
  }
  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}

/**
 * Resolve a project from the current working directory.
 * Checks if `cwd` is inside `tadpole_base` or `main_repo` of any project.
 * Returns the first match (tadpole_base takes priority), or null.
 */
export async function resolveProjectFromCwd(cwd: string): Promise<BufoProject | null> {
  const projects = await loadAllProjectConfigs();
  // Normalise paths for prefix comparison
  const norm = (p: string) => (p.endsWith("/") ? p : p + "/");

  for (const project of projects.values()) {
    const base = norm(project.tadpole_base);
    const repo = norm(project.main_repo);
    const cwdN = norm(cwd);
    if (cwdN.startsWith(base) || cwd === project.tadpole_base) return project;
    if (cwdN.startsWith(repo) || cwd === project.main_repo) return project;
  }
  return null;
}

/**
 * Resolve a project from a GitHub URL (PR or issue).
 * Matches against ticket.github_repo field.
 * Returns null if no match or multiple matches.
 */
export async function resolveProjectFromGithubUrl(url: string): Promise<BufoProject | null> {
  const match = url.match(/github\.com\/([^/]+\/[^/]+)\//);
  if (!match) return null;
  const repo = match[1]!.toLowerCase();

  const projects = await loadAllProjectConfigs();
  const matches: BufoProject[] = [];
  for (const project of projects.values()) {
    const githubRepo = (project as BufoProject & { ticket?: { github_repo?: string } }).ticket?.github_repo;
    if (githubRepo && githubRepo.toLowerCase() === repo) {
      matches.push(project);
    }
  }
  return matches.length === 1 ? matches[0]! : null;
}

/**
 * Resolve a project from a ticket URL (Linear or GitHub issue).
 * Returns null if no match or ambiguous (multiple matches).
 */
export async function resolveProjectFromTicketUrl(url: string): Promise<BufoProject | null> {
  const projects = await loadAllProjectConfigs();
  const matches: BufoProject[] = [];

  // Linear: https://linear.app/<team>/issue/<id>/title
  const linearMatch = url.match(/linear\.app\/([^/]+)\/issue\//);
  if (linearMatch) {
    const team = linearMatch[1]!.toLowerCase();
    for (const project of projects.values()) {
      const linearTeam = (project as BufoProject & { ticket?: { linear_team?: string } }).ticket?.linear_team;
      if (linearTeam && linearTeam.toLowerCase() === team) {
        matches.push(project);
      }
    }
    return matches.length === 1 ? matches[0]! : null;
  }

  // GitHub issue: https://github.com/<org>/<repo>/issues/<n>
  const githubIssueMatch = url.match(/github\.com\/([^/]+\/[^/]+)\/issues\//);
  if (githubIssueMatch) {
    const repo = githubIssueMatch[1]!.toLowerCase();
    for (const project of projects.values()) {
      const githubRepo = (project as BufoProject & { ticket?: { github_repo?: string } }).ticket?.github_repo;
      if (githubRepo && githubRepo.toLowerCase() === repo) {
        matches.push(project);
      }
    }
    return matches.length === 1 ? matches[0]! : null;
  }

  return null;
}

/**
 * Resolve the default project.
 * Returns the sole project if there is exactly one,
 * or the one named in global config's `default_project`,
 * or null if ambiguous.
 */
export async function resolveDefaultProject(): Promise<BufoProject | null> {
  const projects = await loadAllProjectConfigs();
  if (projects.size === 0) return null;

  const globalCfgPath = join(homedir(), ".bufo", "config.yaml");
  let defaultAlias: string | undefined;
  try {
    const raw = readFileSync(globalCfgPath, "utf-8");
    const doc = yaml.load(raw) as Record<string, unknown>;
    defaultAlias = doc.default_project as string | undefined;
  } catch {
    // no global config
  }

  if (defaultAlias) {
    const found = projects.get(defaultAlias);
    if (found) return found;
    // default_project not found — fall through to single-project check
  }

  if (projects.size === 1) return projects.values().next().value as BufoProject;
  return null;
}

