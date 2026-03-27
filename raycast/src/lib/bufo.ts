import { existsSync } from "fs";
import { join } from "path";
import type { BufoProject, BufoTadpole } from "./types";
import {
  discoverProjects,
  loadTadpoleState,
  loadTadpoleMeta,
  isTadpoleLocked,
  getCustomName,
} from "./config";
import { getGitBranch } from "./exec";
import { getActiveSessions } from "./iterm";

export function getTadpoleDir(project: BufoProject, num: number): string {
  return join(project.tadpole_base, `${project.tadpoles.prefix}-${num}`);
}

// Legacy alias
export const getWorkspaceDir = getTadpoleDir;

export function discoverTadpoles(project: BufoProject, activeSessions?: Set<string>): BufoTadpole[] {
  const tadpoles: BufoTadpole[] = [];

  for (let i = 1; i <= project.tadpoles.count; i++) {
    const dir = getTadpoleDir(project, i);
    if (!existsSync(dir)) continue;

    const state = loadTadpoleState(project.session_name, i);
    const meta = loadTadpoleMeta(dir);
    const locked = isTadpoleLocked(dir);
    const customName = getCustomName(dir);
    const branch = getGitBranch(dir);

    let active = false;
    if (state && activeSessions) {
      const mainSid = state.panes.main;
      active = mainSid ? activeSessions.has(mainSid) : false;
    }

    tadpoles.push({
      project,
      number: i,
      directory: dir,
      branch,
      locked,
      active,
      meta,
      state,
      customName,
    });
  }

  return tadpoles;
}

// Legacy alias
export const discoverWorkspaces = discoverTadpoles;

export function getAllTadpoles(): { projects: BufoProject[]; tadpoles: BufoTadpole[] } {
  const projects = discoverProjects();
  const activeSessions = getActiveSessions();
  const tadpoles: BufoTadpole[] = [];

  for (const project of projects) {
    tadpoles.push(...discoverTadpoles(project, activeSessions));
  }

  return { projects, tadpoles };
}

// Legacy alias (also returns tadpoles as workspaces for daemon compatibility)
export function getAllWorkspaces(): { projects: BufoProject[]; workspaces: BufoTadpole[] } {
  const { projects, tadpoles } = getAllTadpoles();
  return { projects, workspaces: tadpoles };
}

export function getTadpoleTitle(tp: BufoTadpole): string {
  if (tp.meta?.pr_title) {
    const name = tp.customName || `tp${tp.number}`;
    return `${name}: ${tp.meta.pr_title}`;
  }
  if (tp.meta?.ticket) {
    const name = tp.customName || `tp${tp.number}`;
    return `${name} (${tp.meta.ticket})`;
  }
  if (tp.customName) return tp.customName;
  return `${tp.project.tadpoles.prefix}-${tp.number}`;
}

// Legacy alias
export const getWorkspaceTitle = getTadpoleTitle;

export function getTadpoleSubtitle(tp: BufoTadpole): string {
  const parts: string[] = [];
  if (tp.branch && tp.branch !== "unknown") parts.push(tp.branch);
  if (tp.meta?.type && tp.meta.type !== "workspace" && tp.meta.type !== "tadpole") parts.push(tp.meta.type.toUpperCase());
  return parts.join(" | ");
}

// Legacy alias
export const getWorkspaceSubtitle = getTadpoleSubtitle;
