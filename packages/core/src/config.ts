import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import * as yaml from "js-yaml";
import type { BufoProject, GlobalConfig, TadpoleMeta, TadpoleState, BufoSession, SessionLayout } from "./types.js";

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
