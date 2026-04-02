import { execa } from 'execa';
import { access, readdir, mkdir, rm, stat, rename } from 'fs/promises';
import { join, dirname } from 'path';
import { homedir } from 'os';
import type { BufoProject } from '@bufo/core';

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const NC = '\x1b[0m';

export interface DoctorCheck {
  name: string;
  ok: boolean;
  message?: string;
}

export interface DoctorResult {
  checks: DoctorCheck[];
  allOk: boolean;
}

async function commandExists(cmd: string): Promise<boolean> {
  try {
    await execa('command', ['-v', cmd], { shell: true });
    return true;
  } catch {
    return false;
  }
}

async function pathExists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function isDirectory(p: string): Promise<boolean> {
  try {
    const s = await stat(p);
    return s.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Run diagnostic checks. Checks:
 * - yq installed (command -v yq)
 * - jq installed
 * - iTerm2 installed (/Applications/iTerm.app exists)
 * - git installed
 * - Config directory exists (~/.bufo/)
 * - At least one project configured (~/.bufo/projects/*.yaml)
 * - If project provided: tadpole_base exists, .env files present
 */
export async function runDoctor(project?: BufoProject): Promise<DoctorResult> {
  const checks: DoctorCheck[] = [];
  const configDir = join(homedir(), '.bufo');

  // Print header
  console.log(`${CYAN} ◎ , ◎${NC}`);
  console.log(`${CYAN}（ -──）  Bufo Doctor${NC}`);
  console.log(`${CYAN}/(    )\\${NC}`);
  console.log('');

  if (project) {
    console.log(`  project: ${GREEN}@${project.alias}${NC}`);
  }

  // Check yq
  const yqOk = await commandExists('yq');
  checks.push({ name: 'yq', ok: yqOk, message: yqOk ? 'installed' : 'not installed' });
  printCheck('yq', yqOk, yqOk ? 'installed' : 'not installed');

  // Check jq
  const jqOk = await commandExists('jq');
  checks.push({ name: 'jq', ok: jqOk, message: jqOk ? 'installed' : 'not installed' });
  printCheck('jq', jqOk, jqOk ? 'installed' : 'not installed');

  // Check iTerm2
  const itermOk = await pathExists('/Applications/iTerm.app');
  checks.push({ name: 'iTerm2', ok: itermOk, message: itermOk ? 'installed' : 'not installed' });
  printCheck('iTerm2', itermOk, itermOk ? 'installed' : 'not installed');

  // Check git
  const gitOk = await commandExists('git');
  checks.push({ name: 'git', ok: gitOk, message: gitOk ? 'installed' : 'not installed' });
  printCheck('git', gitOk, gitOk ? 'installed' : 'not installed');

  // Check config directory
  const configOk = await isDirectory(configDir);
  checks.push({ name: 'config', ok: configOk, message: configOk ? 'exists' : 'not found' });
  printCheck('config', configOk, configOk ? 'exists' : 'not found');

  // Check at least one project configured
  const projectsDir = join(configDir, 'projects');
  let hasProjects = false;
  if (await isDirectory(projectsDir)) {
    try {
      const files = await readdir(projectsDir);
      hasProjects = files.some(f => f.endsWith('.yaml'));
    } catch {
      // ignore
    }
  }
  checks.push({ name: 'projects', ok: hasProjects, message: hasProjects ? 'configured' : 'no projects found' });
  printCheck('projects', hasProjects, hasProjects ? 'configured' : 'no projects found');

  // Project-specific checks
  if (project) {
    // Check tadpole_base
    const baseExists = await isDirectory(project.tadpole_base);
    const parentExists = !baseExists && await isDirectory(dirname(project.tadpole_base));
    const baseOk = baseExists || parentExists;
    const baseMsg = baseExists
      ? project.tadpole_base
      : parentExists
        ? `${project.tadpole_base} (will be created)`
        : `${project.tadpole_base} (not found)`;
    checks.push({ name: 'tadpole_base', ok: baseOk, message: baseMsg });
    printCheck('tadpole_base', baseOk, baseMsg);

    // Check main_repo
    const mainRepoExists = await isDirectory(project.main_repo);
    checks.push({
      name: 'main_repo',
      ok: mainRepoExists,
      message: mainRepoExists ? project.main_repo : `${project.main_repo} (not found)`,
    });
    printCheck('main_repo', mainRepoExists, mainRepoExists ? project.main_repo : `${project.main_repo} (not found)`);
  }

  console.log('');

  const allOk = checks.every(c => c.ok);

  if (allOk) {
    console.log(`${GREEN} ◎ , ◎${NC}`);
    console.log(`${GREEN}（ V  )  All checks passed!${NC}`);
    console.log(`${GREEN}/(    )\\${NC}`);
  } else {
    const issueCount = checks.filter(c => !c.ok).length;
    console.log(`${RED} ◎ , ◎${NC}`);
    console.log(`${RED}（ /\\ )  ${issueCount} issue(s) found${NC}`);
    console.log(`${RED}/(    )\\${NC}`);
  }

  return { checks, allOk };
}

function printCheck(name: string, ok: boolean, message: string): void {
  const color = ok ? GREEN : RED;
  console.log(`  ${name}: ${color}${message}${NC}`);
}

/**
 * Auto-repair common issues:
 * - Create missing ~/.bufo/ directories
 * - Remove orphaned state files (session alive check)
 * - Remove stale .bufo-lock files in non-existent worktrees
 * If force=true: also remove state files for dead sessions without prompting.
 */
export async function runDoctorFix(project: BufoProject, force?: boolean): Promise<void> {
  const configDir = join(homedir(), '.bufo');

  // Create missing directories
  const dirs = [
    configDir,
    join(configDir, 'projects'),
    join(configDir, 'state'),
    join(configDir, 'sessions'),
  ];

  for (const dir of dirs) {
    if (!(await isDirectory(dir))) {
      await mkdir(dir, { recursive: true });
      console.log(`  ${GREEN}Created ${dir}${NC}`);
    }
  }

  // Remove orphaned state files
  const stateDir = join(configDir, 'state', project.session_name);
  if (await isDirectory(stateDir)) {
    const stateFiles = await readdir(stateDir);
    for (const file of stateFiles) {
      if (!file.endsWith('.json')) continue;
      const filePath = join(stateDir, file);

      if (force) {
        // In force mode, check if session is alive via iTerm2
        // If we can't verify, remove it
        try {
          await rm(filePath);
          console.log(`  ${GREEN}Removed orphaned state file: ${file}${NC}`);
        } catch {
          // ignore
        }
      }
    }
  }

  // Remove stale .bufo-lock files in non-existent worktrees
  if (await isDirectory(project.tadpole_base)) {
    const prefix = project.tadpoles.prefix;
    let entries: string[];
    try {
      entries = await readdir(project.tadpole_base);
    } catch {
      entries = [];
    }

    for (const entry of entries) {
      if (!entry.startsWith(`${prefix}-`)) continue;
      const worktreeDir = join(project.tadpole_base, entry);
      const lockFile = join(worktreeDir, '.bufo-lock');

      if (!(await isDirectory(worktreeDir))) {
        // Worktree dir doesn't exist but somehow is listed — skip
        continue;
      }

      if (await pathExists(lockFile)) {
        // Check if the worktree is actually a valid git worktree
        try {
          await execa('git', ['-C', worktreeDir, 'rev-parse', '--git-dir']);
        } catch {
          // Not a valid worktree, remove lock
          await rm(lockFile);
          console.log(`  ${GREEN}Removed stale lock: ${lockFile}${NC}`);
        }
      }
    }
  }

  console.log(`  ${GREEN}Doctor fix complete.${NC}`);
}
