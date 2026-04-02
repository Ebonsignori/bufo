import { existsSync, readdirSync } from "fs";
import { join } from "path";
import type { BufoProject, BufoTadpole } from "./types.js";
import {
  discoverProjects,
  loadTadpoleState,
  loadTadpoleMeta,
  isTadpoleLocked,
  getCustomName,
} from "./config.js";
import { getGitBranch } from "./exec.js";
import { getActiveSessions } from "./iterm.js";

export function getTadpoleDir(project: BufoProject, num: number): string {
  return join(project.tadpole_base, `${project.tadpoles.prefix}-${num}`);
}

export function discoverTadpoles(project: BufoProject, activeSessions?: Set<string>): BufoTadpole[] {
  const tadpoles: BufoTadpole[] = [];

  // Discover by scanning the tadpole_base directory for <prefix>-<N> dirs,
  // rather than iterating 1..count. `count` controls how many to *create*,
  // not a ceiling on how many can exist.
  if (!existsSync(project.tadpole_base)) return tadpoles;

  const prefix = project.tadpoles.prefix;
  const entries = readdirSync(project.tadpole_base, { withFileTypes: true });
  const nums: number[] = entries
    .filter((e) => e.isDirectory() && e.name.startsWith(`${prefix}-`))
    .map((e) => parseInt(e.name.slice(prefix.length + 1), 10))
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);

  for (const i of nums) {
    const dir = getTadpoleDir(project, i);

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

export function getAllTadpoles(): { projects: BufoProject[]; tadpoles: BufoTadpole[] } {
  const projects = discoverProjects();
  const activeSessions = getActiveSessions();
  const tadpoles: BufoTadpole[] = [];

  for (const project of projects) {
    tadpoles.push(...discoverTadpoles(project, activeSessions));
  }

  return { projects, tadpoles };
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

export function getTadpoleSubtitle(tp: BufoTadpole): string {
  const parts: string[] = [];
  if (tp.branch && tp.branch !== "unknown") parts.push(tp.branch);
  if (tp.meta?.type && tp.meta.type !== "tadpole") parts.push(tp.meta.type.toUpperCase());
  return parts.join(" | ");
}
