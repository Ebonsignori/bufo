import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import * as yaml from "js-yaml";
import type { BufoProject, GlobalConfig, TadpoleMeta, TadpoleState } from "./types";

const BUFO_DIR = join(homedir(), ".bufo");
const PROJECTS_DIR = join(BUFO_DIR, "projects");
const STATE_DIR = join(BUFO_DIR, "state");
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

// Legacy alias
export const loadWorkspaceState = loadTadpoleState;

export function loadTadpoleMeta(tadpoleDir: string): TadpoleMeta | undefined {
  const metaFile = join(tadpoleDir, ".bufo-meta");
  if (!existsSync(metaFile)) return undefined;
  try {
    return JSON.parse(readFileSync(metaFile, "utf-8")) as TadpoleMeta;
  } catch {
    return undefined;
  }
}

// Legacy alias
export const loadWorkspaceMeta = loadTadpoleMeta;

export function isTadpoleLocked(tadpoleDir: string): boolean {
  return existsSync(join(tadpoleDir, ".bufo-lock"));
}

// Legacy alias
export const isWorkspaceLocked = isTadpoleLocked;

export function getCustomName(tadpoleDir: string): string | undefined {
  const nameFile = join(tadpoleDir, ".bufo-name");
  if (!existsSync(nameFile)) return undefined;
  try {
    return readFileSync(nameFile, "utf-8").trim() || undefined;
  } catch {
    return undefined;
  }
}
