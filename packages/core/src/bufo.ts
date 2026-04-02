import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { BufoProject, BufoTadpole } from './types.js';
import { loadTadpoleState, loadTadpoleMeta, isTadpoleLocked, getCustomName } from './config.js';
import { getGitBranch } from './exec.js';

export function getTadpoleDir(project: BufoProject, num: number): string {
  return join(project.tadpole_base, `${project.tadpoles.prefix}-${num}`);
}

export function discoverTadpoles(
  project: BufoProject,
  activeSessions?: Set<string>,
): BufoTadpole[] {
  const base = project.tadpole_base;
  if (!existsSync(base)) return [];
  const prefix = project.tadpoles.prefix;
  let entries: string[];
  try { entries = readdirSync(base); } catch { return []; }

  const tadpoles: BufoTadpole[] = [];
  for (const entry of entries) {
    if (!entry.startsWith(`${prefix}-`)) continue;
    const numStr = entry.replace(`${prefix}-`, '');
    const num = parseInt(numStr, 10);
    if (isNaN(num)) continue;
    const dir = join(base, entry);
    try { if (!statSync(dir).isDirectory()) continue; } catch { continue; }

    const state = loadTadpoleState(project.session_name, num);
    const meta = loadTadpoleMeta(dir);
    const locked = isTadpoleLocked(dir);
    const customName = getCustomName(dir);
    const branch = getGitBranch(dir);
    const active = state?.panes?.main ? (activeSessions?.has(state.panes.main) ?? false) : false;

    tadpoles.push({ project, number: num, directory: dir, branch, locked, active, meta, state, customName });
  }
  return tadpoles.sort((a, b) => a.number - b.number);
}

export function getAllTadpoles(): BufoTadpole[] { return []; }

export function getTadpoleTitle(tp: BufoTadpole): string {
  const base = `${tp.project.tadpoles.prefix}-${tp.number}`;
  if (tp.customName) return `${base} (${tp.customName})`;
  if (tp.meta?.name) return `${base} (${tp.meta.name})`;
  return base;
}

export function getTadpoleSubtitle(tp: BufoTadpole): string {
  const parts: string[] = [];
  if (tp.branch && tp.branch !== 'unknown') parts.push(tp.branch);
  if (tp.meta?.type === 'ticket' && tp.meta.ticket) parts.push(`[${tp.meta.ticket}]`);
  if (tp.meta?.type === 'pr' && tp.meta.pr_number) parts.push(`PR #${tp.meta.pr_number}`);
  if (tp.active) parts.push('active');
  if (tp.locked) parts.push('locked');
  return parts.join(' · ');
}
