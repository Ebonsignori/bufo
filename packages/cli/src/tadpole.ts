import { execa } from 'execa';
import { readFile, writeFile, readdir, access, rm, mkdir, rename } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import type {
  BufoProject,
  BufoTadpole,
  TadpoleMeta,
  TadpoleState,
  LayoutResult,
  CreateOptions,
} from '@bufo/core';
import {
  createWindow,
  createTab,
  splitVertical,
  splitHorizontal,
  sendText,
  sendInterrupt,
  focusSession,
  closeTabBySession,
  renameTabBySession,
  resizeSession,
  saveState,
  loadState,
  removeState,
  stateExists,
  listStates,
  readMeta,
  writeMeta,
  clearMeta,
} from '@bufo/core';

// ANSI colors
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const GRAY = '\x1b[90m';
const BOLD = '\x1b[1m';
const NC = '\x1b[0m';

// ============================================================================
// Helpers
// ============================================================================

function tadpoleDir(project: BufoProject, num: number): string {
  return join(project.tadpole_base, `${project.tadpoles.prefix}-${num}`);
}

function getBranchName(project: BufoProject, num: number): string {
  return project.tadpoles.branch_pattern.replace('{N}', String(num));
}

async function pathExists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function getDefaultBranch(dir: string): Promise<string> {
  try {
    const { stdout } = await execa('git', ['-C', dir, 'symbolic-ref', 'refs/remotes/origin/HEAD', '--short']);
    const branch = stdout.trim().replace('origin/', '');
    if (branch) return `origin/${branch}`;
  } catch {
    // fallback
  }
  // Try common branch names
  for (const name of ['main', 'master']) {
    try {
      await execa('git', ['-C', dir, 'rev-parse', '--verify', `origin/${name}`]);
      return `origin/${name}`;
    } catch {
      continue;
    }
  }
  return 'origin/main';
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Escape ERE metacharacters so a pattern is matched literally by pkill -f.
 */
function escapeKillPattern(pattern: string): string {
  return pattern.replace(/[\\.*+?^${}()|[\]]/g, '\\$&');
}

/**
 * Get the pane command from project config for a given pane name.
 */
function getPaneCommand(project: BufoProject, paneName: string, sessionName?: string): string {
  const panes = project.layout?.panes;
  if (!panes) return '';
  const pane = panes.find((p) => p.name === paneName);
  if (!pane) return '';

  let cmd = pane.command || '';

  // If this is the main pane and ai_tool is set, use AI interactive command
  if (paneName === 'main' && cmd && project.ai_tool) {
    cmd = getAiInteractiveCmd(project, sessionName);
  }

  return cmd;
}

/**
 * Get the AI tool name from project config.
 */
function getAiTool(project: BufoProject): string {
  return project.ai_tool ?? 'claude';
}

/**
 * Get the interactive AI command for the main pane.
 */
function getAiInteractiveCmd(project: BufoProject, sessionName?: string): string {
  const tool = getAiTool(project);
  switch (tool) {
    case 'codex':
      return 'codex --full-auto';
    case 'copilot':
      return 'copilot --allow-all';
    case 'gemini':
      return 'gemini --yolo';
    default: {
      let cmd = 'claude --dangerously-skip-permissions';
      if (sessionName) {
        cmd += ` --name ${shellQuote(sessionName)}`;
      }
      return cmd;
    }
  }
}

function shellQuote(s: string): string {
  return `'${s.replace(/'/g, "'\\''")}'`;
}

/**
 * Build a command to pipe a prompt file into the AI tool.
 */
function aiPipePromptFile(project: BufoProject, promptFile: string): string {
  const tool = getAiTool(project);
  switch (tool) {
    case 'codex':
    case 'copilot':
    case 'gemini':
      return `${getAiInteractiveCmd(project)} "$(cat '${promptFile}')"`;
    default:
      return `cat '${promptFile}' | ${getAiInteractiveCmd(project)}`;
  }
}

/**
 * Get the infobar command for a tadpole directory.
 * Falls back to a simple loop that reads .bufo-meta and displays status.
 */
function getInfobarCommand(dir: string): string {
  // Use the custom infobar script if it exists, otherwise a basic watch loop
  return `bash -c 'while true; do clear; echo "bufo infobar"; if [ -f "${dir}/.bufo-meta" ]; then cat "${dir}/.bufo-meta" | head -5; fi; sleep 30; done'`;
}

/**
 * Get the infobar command for the main tadpole.
 */
function getMainInfobarCommand(dir: string): string {
  return `bash -c 'while true; do clear; echo "bufo main"; sleep 30; done'`;
}

// ============================================================================
// Tadpole Naming
// ============================================================================

/**
 * Get the display name for a tadpole (custom name or tp<N>).
 */
export function getTadpoleName(project: BufoProject, num: number): string {
  const dir = tadpoleDir(project, num);
  const nameFile = join(dir, '.bufo-name');
  try {
    // Sync read is intentional — this is a hot path used for display
    const { readFileSync } = require('node:fs') as typeof import('node:fs');
    return readFileSync(nameFile, 'utf-8').trim();
  } catch {
    return `tp${num}`;
  }
}

/**
 * Set a custom name for a tadpole.
 */
export async function setTadpoleName(
  project: BufoProject,
  num: number,
  name: string,
): Promise<void> {
  const dir = tadpoleDir(project, num);
  const nameFile = join(dir, '.bufo-name');
  const tmpFile = `${nameFile}.${Date.now()}.tmp`;
  await writeFile(tmpFile, name, 'utf-8');
  await rename(tmpFile, nameFile);
}

/**
 * Clear the custom name for a tadpole.
 */
export async function clearTadpoleName(
  project: BufoProject,
  num: number,
): Promise<void> {
  const dir = tadpoleDir(project, num);
  try {
    await rm(join(dir, '.bufo-name'));
  } catch {
    // ignore
  }
}

/**
 * Compute the terminal tab title for a tadpole.
 * Priority: {name}: {PR title} > {name} (ticket) > {branch} > tp{N}
 */
export async function computeTabTitle(
  project: BufoProject,
  num: number,
): Promise<string> {
  const dir = tadpoleDir(project, num);
  const name = getTadpoleName(project, num);
  let title = '';

  const meta = await readMeta(dir);
  if (meta) {
    if (meta.pr_title) {
      title = `${name}: ${meta.pr_title}`;
    } else if (meta.ticket) {
      title = name;
    }
  }

  if (!title) {
    let branch = '';
    try {
      const { stdout } = await execa('git', ['-C', dir, 'branch', '--show-current']);
      branch = stdout.trim();
    } catch {
      // ignore
    }
    if (branch && branch !== 'main' && branch !== 'master') {
      title = branch;
    } else {
      title = name;
    }
  }

  // Prefix with project alias
  if (project.alias) {
    title = `@${project.alias} ${title}`;
  }

  // Truncate to 60 chars
  if (title.length > 60) {
    title = title.slice(0, 57) + '...';
  }

  return title;
}

/**
 * Update the iTerm2 tab title for an active tadpole using computed title.
 */
async function updateTabTitle(project: BufoProject, num: number): Promise<void> {
  const alive = await stateExists(project.session_name, num);
  if (!alive) return;
  const title = await computeTabTitle(project, num);
  const state = await loadState(project.session_name, num);
  if (state?.panes?.main) {
    try {
      await renameTabBySession(state.panes.main, title);
    } catch {
      // ignore
    }
  }
}

// ============================================================================
// Tadpole Locking
// ============================================================================

export async function lockTadpole(
  project: BufoProject,
  num: number,
): Promise<void> {
  const dir = tadpoleDir(project, num);
  if (!existsSync(dir)) {
    throw new Error(`Tadpole ${num} does not exist`);
  }
  await writeFile(join(dir, '.bufo-lock'), '', 'utf-8');
}

export async function unlockTadpole(
  project: BufoProject,
  num: number,
): Promise<void> {
  const dir = tadpoleDir(project, num);
  if (!existsSync(dir)) {
    throw new Error(`Tadpole ${num} does not exist`);
  }
  try {
    await rm(join(dir, '.bufo-lock'));
  } catch {
    // ignore
  }
}

export async function unlockAll(project: BufoProject): Promise<void> {
  const prefix = project.tadpoles.prefix;
  let entries: string[];
  try {
    entries = await readdir(project.tadpole_base);
  } catch {
    return;
  }

  for (const entry of entries) {
    if (!entry.startsWith(`${prefix}-`)) continue;
    const numStr = entry.slice(prefix.length + 1);
    if (!/^\d+$/.test(numStr)) continue;
    const num = parseInt(numStr, 10);
    const dir = join(project.tadpole_base, entry);
    const lockFile = join(dir, '.bufo-lock');

    if (!existsSync(lockFile)) continue;

    // Skip active tadpoles
    const alive = await stateExists(project.session_name, num);
    if (alive) continue;

    try {
      await rm(lockFile);
    } catch {
      // ignore
    }
  }
}

export async function findUnlocked(
  project: BufoProject,
): Promise<number | null> {
  const prefix = project.tadpoles.prefix;
  let entries: string[];
  try {
    entries = await readdir(project.tadpole_base);
  } catch {
    return null;
  }

  // Sort numerically so we find the lowest-numbered unlocked tadpole
  const nums = entries
    .filter((e) => e.startsWith(`${prefix}-`))
    .map((e) => parseInt(e.slice(prefix.length + 1), 10))
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);

  for (const num of nums) {
    const dir = join(project.tadpole_base, `${prefix}-${num}`);
    if (!existsSync(join(dir, '.bufo-lock'))) {
      return num;
    }
  }
  return null;
}

// ============================================================================
// Tadpole Listing
// ============================================================================

export async function listTadpoles(
  project: BufoProject,
): Promise<BufoTadpole[]> {
  const prefix = project.tadpoles.prefix;
  let entries: string[];
  try {
    entries = await readdir(project.tadpole_base);
  } catch {
    return [];
  }

  const results: BufoTadpole[] = [];
  for (const entry of entries) {
    if (!entry.startsWith(`${prefix}-`)) continue;
    const numStr = entry.slice(prefix.length + 1);
    if (!/^\d+$/.test(numStr)) continue;
    const num = parseInt(numStr, 10);
    const dir = join(project.tadpole_base, entry);

    let branch = 'unknown';
    try {
      const { stdout } = await execa('git', ['-C', dir, 'branch', '--show-current']);
      branch = stdout.trim() || 'unknown';
    } catch {
      // ignore
    }

    const locked = existsSync(join(dir, '.bufo-lock'));
    const active = await stateExists(project.session_name, num);
    const meta = await readMeta(dir);
    const state = active ? await loadState(project.session_name, num) : undefined;
    const customName = getTadpoleName(project, num);

    results.push({
      project,
      number: num,
      directory: dir,
      branch,
      locked,
      active,
      meta: meta ?? undefined,
      state: state ?? undefined,
      customName: customName !== `tp${num}` ? customName : undefined,
    });
  }

  results.sort((a, b) => a.number - b.number);
  return results;
}

export function detectTadpoleFromDir(
  project: BufoProject,
  cwd: string,
): number | null {
  const prefix = project.tadpoles.prefix;
  const pattern = new RegExp(`${escapeRegExp(prefix)}-(\\d+)`);
  const match = cwd.match(pattern);
  return match ? parseInt(match[1], 10) : null;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function findNextSlot(project: BufoProject): number {
  let num = 1;
  while (num <= 100) {
    const dir = tadpoleDir(project, num);
    if (!existsSync(dir)) {
      return num;
    }
    num++;
  }
  return num;
}

// ============================================================================
// Tadpole Layout (iTerm2 pane creation)
// ============================================================================

/**
 * Create the iTerm2 layout for a tadpole.
 *
 * Layout:
 * ┌─────────┬────────────────┐
 * │terminal │                │
 * ├─────────┤ main           │
 * │ server  │                │
 * ├──────────────────────────┤
 * │ info bar (full width)    │
 * └──────────────────────────┘
 */
export async function createTadpoleLayout(
  project: BufoProject,
  num: number,
): Promise<LayoutResult> {
  const dir = tadpoleDir(project, num);
  const windowName = await computeTabTitle(project, num);
  const devCmd = getPaneCommand(project, 'server');
  const claudeCmd = getPaneCommand(project, 'main', windowName);

  return createTadpoleLayoutInternal(
    project,
    windowName,
    dir,
    devCmd,
    claudeCmd,
    'new',
    num,
  );
}

/**
 * Internal layout creation — handles both "new window" and "add tab" modes.
 */
async function createTadpoleLayoutInternal(
  project: BufoProject,
  windowName: string,
  dir: string,
  devCmd: string,
  claudeCmd: string,
  mode: 'new' | 'add',
  tpNum: number | string,
  infobarOverride?: string,
): Promise<LayoutResult> {
  // Create window or tab
  let windowId = 'current';
  let fullPane: string;

  if (mode === 'new') {
    const result = await createWindow(windowName, dir);
    windowId = result.windowId;
    fullPane = result.sessionId;
  } else {
    const result = await createTab(windowName, dir);
    fullPane = result.sessionId;
  }

  if (!fullPane) {
    throw new Error(`Failed to get session ID from iTerm2`);
  }

  // Give iTerm2 time to register the new window
  await sleep(500);

  // Step 1: Split info bar off the bottom FIRST (full width)
  const infoSid = await splitHorizontal(fullPane);
  await sleep(300);

  // fullPane is now the top area (terminal + main)
  const terminalSid = fullPane;

  // Step 2: Split terminal pane → right split for main
  const mainSid = await splitVertical(terminalSid);
  await sleep(300);

  // Step 3: Split terminal pane → bottom split for server
  const serverSid = await splitHorizontal(terminalSid);
  await sleep(300);

  // cd all panes to tadpole dir before sending commands
  await sendText(terminalSid, `cd '${dir}' && clear`);
  await sleep(200);
  await sendText(serverSid, `cd '${dir}' && clear`);
  await sleep(200);
  await sendText(mainSid, `cd '${dir}' && clear`);
  await sleep(300);

  // Send commands to panes
  if (devCmd) await sendText(serverSid, devCmd);
  if (claudeCmd) await sendText(mainSid, claudeCmd);

  // Start info bar watch loop and resize to minimal height
  if (infoSid) {
    const infobarCmd = infobarOverride ?? getInfobarCommand(dir);
    await sendText(infoSid, `cd '${dir}' && clear && ${infobarCmd}`);
    await sleep(300);
    await resizeSession(infoSid, 3);
    // Second resize in background to catch tiling window manager expansion
    setTimeout(async () => {
      try {
        await resizeSession(infoSid, 3);
      } catch {
        // ignore
      }
    }, 2000);
  }

  // Save state for reconnection
  const state: TadpoleState = {
    workspace: tpNum,
    window_id: windowId,
    tab_id: windowName,
    panes: {
      terminal: terminalSid,
      server: serverSid,
      main: mainSid,
      info: infoSid || undefined,
    },
    created_at: new Date().toISOString(),
  };
  await saveState(project.session_name, tpNum, state);

  // Set the computed title on all panes
  try {
    await renameTabBySession(terminalSid, windowName);
  } catch {
    // ignore
  }

  return {
    windowId,
    terminalSid,
    serverSid,
    mainSid,
    infoSid: infoSid || '',
  };
}

// ============================================================================
// Open Tadpole
// ============================================================================

/**
 * Open or reconnect to a tadpole. Creates the worktree and layout if needed.
 * If the tab already exists and a prompt is provided, restarts the main pane.
 */
export async function openTadpole(
  project: BufoProject,
  num: number,
  prompt?: string,
): Promise<void> {
  const dir = tadpoleDir(project, num);
  const windowName = await computeTabTitle(project, num);

  // Create worktree if it doesn't exist
  if (!existsSync(dir)) {
    console.log(`${CYAN}Creating worktree for tadpole ${num}...${NC}`);
    const branchName = getBranchName(project, num);
    await mkdir(project.tadpole_base, { recursive: true });
    try {
      await execa('git', ['-C', project.main_repo, 'worktree', 'add', '-b', branchName, dir]);
    } catch {
      // Branch may already exist
      await execa('git', ['-C', project.main_repo, 'worktree', 'add', dir, branchName]);
    }
  }

  // Auto-lock tadpole when opened
  await writeFile(join(dir, '.bufo-lock'), '', 'utf-8');

  // Setup team mode in CLAUDE.md
  const teamEnabled = project.team_mode?.enabled !== false;
  if (teamEnabled) {
    const claudeDir = join(dir, '.claude');
    await mkdir(claudeDir, { recursive: true });
    const teamFile = join(claudeDir, 'CLAUDE.md');
    let content = '';
    try {
      content = await readFile(teamFile, 'utf-8');
    } catch {
      // file doesn't exist yet
    }
    if (!content.includes('## Team Mode')) {
      const teamModeText = `
## Team Mode

You can spawn agent teammates for complex tasks. Use the Task tool to create specialized agents (researcher, implementer, reviewer, debugger) that work in parallel. Coordinate the team, assign tasks, and synthesize results. Only spawn teams when the task benefits from parallel work.
`;
      const tmpFile = `${teamFile}.${Date.now()}.tmp`;
      await writeFile(tmpFile, content + teamModeText, 'utf-8');
      await rename(tmpFile, teamFile);
    }
  }

  const devCmd = getPaneCommand(project, 'server');
  let claudeCmd = getPaneCommand(project, 'main', windowName);

  // Handle initial prompt
  if (prompt) {
    if (!claudeCmd) {
      claudeCmd = getAiInteractiveCmd(project, windowName);
    }
    const promptFile = join(dir, '.bufo-prompt');
    await writeFile(promptFile, prompt, 'utf-8');
    claudeCmd = aiPipePromptFile(project, promptFile);
  }

  // Check if tadpole already has an active tab
  const alive = await stateExists(project.session_name, num);
  if (alive) {
    const state = await loadState(project.session_name, num);
    if (!state) return;

    if (prompt) {
      // Ticket/PR mode: restart the main pane with the new prompt
      console.log('  Tab exists, restarting with ticket prompt...');
      await sendInterrupt(state.panes.server);
      await sleep(300);
      if (devCmd) await sendText(state.panes.server, devCmd);

      await sendInterrupt(state.panes.main);
      await sleep(300);
      await sendText(state.panes.main, '/exit');
      await sleep(500);
      if (claudeCmd) await sendText(state.panes.main, `clear && ${claudeCmd}`);

      // Refresh info bar
      if (state.panes.info && state.panes.info !== 'null') {
        await sendInterrupt(state.panes.info);
        await sleep(300);
        const infobarCmd = getInfobarCommand(dir);
        await sendText(state.panes.info, `clear && ${infobarCmd}`);
      }

      console.log(`${GREEN}Tadpole ${num} started with ticket prompt${NC}`);
    } else {
      // Just focus the existing tab
      console.log(`${CYAN}Switching to tadpole ${num}...${NC}`);

      // Refresh info bar on reconnect
      if (state.panes.info && state.panes.info !== 'null') {
        await sendInterrupt(state.panes.info);
        await sleep(300);
        const infobarCmd = getInfobarCommand(dir);
        await sendText(state.panes.info, `clear && ${infobarCmd}`);
      }

      await focusSession(state.panes.main);
    }
  } else {
    // Create new layout
    if (prompt) {
      console.log(`${CYAN}Starting tadpole ${num} (with ticket prompt)...${NC}`);
    } else {
      console.log(`${CYAN}Starting tadpole ${num}...${NC}`);
    }
    console.log(`  Directory: ${dir}`);

    await createTadpoleLayoutInternal(
      project,
      windowName,
      dir,
      devCmd,
      claudeCmd,
      'new',
      num,
    );
  }
}

// ============================================================================
// Create New Tadpole
// ============================================================================

/**
 * Create a new tadpole with the next available number.
 * If opts.reuse is true, reuses an existing unlocked tadpole first.
 */
export async function createNewTadpole(
  project: BufoProject,
  opts?: CreateOptions,
): Promise<void> {
  if (opts?.reuse) {
    const unlocked = await findUnlocked(project);
    if (unlocked !== null) {
      console.log(`${CYAN}Reusing unlocked tadpole ${unlocked} for @${project.alias}...${NC}`);
      await prepareTadpoleForReuse(project, unlocked);
      await openTadpole(project, unlocked, opts.prompt);
      return;
    }
    console.log(`${CYAN}No unlocked tadpole found — creating new worktree...${NC}`);
  }

  const nextNum = findNextSlot(project);
  console.log(`${CYAN}Creating new tadpole ${nextNum} for @${project.alias}...${NC}`);
  await openTadpole(project, nextNum, opts?.prompt);
}

// ============================================================================
// Restart Tadpole
// ============================================================================

/**
 * Full restart: git reset, clean, kill processes, create fresh layout.
 */
export async function restartTadpole(
  project: BufoProject,
  num: number,
): Promise<void> {
  const dir = tadpoleDir(project, num);
  const branchName = getBranchName(project, num);

  if (!existsSync(dir)) {
    throw new Error(`Tadpole ${num} does not exist at ${dir}`);
  }

  console.log(`${YELLOW}Restarting tadpole ${num}...${NC}`);

  console.log('  Fetching origin...');
  try {
    await execa('git', ['-C', dir, 'fetch', 'origin']);
  } catch {
    // ignore
  }

  const defaultBranch = await getDefaultBranch(dir);

  try {
    const { stdout } = await execa('git', ['-C', dir, 'branch', '--show-current']);
    if (stdout.trim() !== branchName) {
      console.log(`  Switching to ${branchName}...`);
      try {
        await execa('git', ['-C', dir, 'checkout', branchName]);
      } catch {
        await execa('git', ['-C', dir, 'checkout', '-b', branchName]);
      }
    }
  } catch {
    // ignore
  }

  console.log(`  Resetting to ${defaultBranch}...`);
  await execa('git', ['-C', dir, 'reset', '--hard', defaultBranch]);

  console.log('  Cleaning untracked files...');
  const preserveFiles = project.cleanup?.preserve_files ?? '.env';
  await execa('git', ['-C', dir, 'clean', '-fd', `--exclude=${preserveFiles}`, '--exclude=.bufo-*']);

  console.log(`${GREEN}Git reset complete (on branch: ${branchName})${NC}`);

  // Close old tab if exists, create fresh layout
  const alive = await stateExists(project.session_name, num);
  if (alive) {
    const state = await loadState(project.session_name, num);
    if (state?.panes?.main) {
      console.log('  Closing old tab...');
      try {
        await closeTabBySession(state.panes.main);
      } catch {
        // ignore
      }
    }
    await removeState(project.session_name, num);
    await sleep(500);
  }

  console.log('  Creating fresh tadpole layout...');
  await createTadpoleLayout(project, num);

  console.log(`${GREEN}Tadpole ${num} restarted with fresh layout!${NC}`);
}

// ============================================================================
// Cleanup Tadpole
// ============================================================================

/**
 * Reset git, unlock, clear metadata, keep tadpole directory.
 * Closes the iTerm2 tab if active.
 */
export async function cleanupTadpole(
  project: BufoProject,
  num: number,
): Promise<void> {
  const dir = tadpoleDir(project, num);

  if (!existsSync(dir)) {
    throw new Error(`Tadpole ${num} does not exist at ${dir}`);
  }

  console.log(`${YELLOW}Cleaning up tadpole ${num}...${NC}`);

  // Close iTerm2 tab if exists
  const alive = await stateExists(project.session_name, num);
  if (alive) {
    const state = await loadState(project.session_name, num);
    if (state?.panes?.main) {
      try {
        await closeTabBySession(state.panes.main);
      } catch {
        // ignore
      }
    }
    await removeState(project.session_name, num);
  }

  // Kill running processes
  await killTadpoleProcesses(project, num);

  console.log('  Fetching origin...');
  try {
    await execa('git', ['-C', dir, 'fetch', 'origin']);
  } catch {
    // ignore
  }

  const defaultBranch = await getDefaultBranch(dir);
  const branchName = getBranchName(project, num);

  console.log(`  Resetting to ${defaultBranch}...`);
  try {
    await execa('git', ['-C', dir, 'checkout', branchName]);
  } catch {
    try {
      await execa('git', ['-C', dir, 'checkout', '-b', branchName, defaultBranch]);
    } catch {
      // ignore
    }
  }
  try {
    await execa('git', ['-C', dir, 'reset', '--hard', defaultBranch]);
  } catch {
    // ignore
  }

  console.log('  Cleaning untracked files...');
  const preserveFiles = project.cleanup?.preserve_files ?? '.env';
  try {
    await execa('git', ['-C', dir, 'clean', '-fd', `--exclude=${preserveFiles}`, '--exclude=.bufo-*']);
  } catch {
    // ignore
  }

  // Unlock and clear name/metadata
  try { await rm(join(dir, '.bufo-lock')); } catch { /* ignore */ }
  await clearTadpoleName(project, num);
  await clearMeta(dir);

  console.log(`${GREEN}Tadpole ${num} cleaned, unlocked, and ready for reuse${NC}`);
}

// ============================================================================
// Continue Tadpole
// ============================================================================

/**
 * Restart with --continue flag appended to the AI tool command.
 */
export async function continueTadpole(
  project: BufoProject,
  num: number,
): Promise<void> {
  const dir = tadpoleDir(project, num);
  const windowName = await computeTabTitle(project, num);

  if (!existsSync(dir)) {
    throw new Error(`Tadpole ${num} does not exist at ${dir}`);
  }

  console.log(`${CYAN}Continuing tadpole ${num}...${NC}`);

  const devCmd = getPaneCommand(project, 'server');
  let claudeCmd = getPaneCommand(project, 'main', windowName);

  // Add --continue to AI tool command
  const aiTool = getAiTool(project);
  if (claudeCmd.includes(aiTool)) {
    claudeCmd = `${claudeCmd} --continue`;
  }

  const alive = await stateExists(project.session_name, num);
  if (alive) {
    console.log('  Tab exists, restarting with --continue...');
    const state = await loadState(project.session_name, num);
    if (!state) return;

    await sendInterrupt(state.panes.server);
    await sleep(300);
    if (devCmd) await sendText(state.panes.server, devCmd);

    await sendInterrupt(state.panes.main);
    await sleep(300);
    await sendText(state.panes.main, '/exit');
    await sleep(500);
    if (claudeCmd) await sendText(state.panes.main, `clear && ${claudeCmd}`);

    console.log(`${GREEN}Tadpole ${num} continued with previous session${NC}`);
  } else {
    console.log('  Creating window with --continue...');
    await createTadpoleLayoutInternal(
      project,
      windowName,
      dir,
      devCmd,
      claudeCmd,
      'new',
      num,
    );
    console.log(`${GREEN}Tadpole ${num} started with previous session${NC}`);
  }
}

// ============================================================================
// Destroy Tadpole
// ============================================================================

/**
 * Permanently remove a tadpole (worktree and all files).
 * Requires --force flag or confirmation.
 */
export async function destroyTadpole(
  project: BufoProject,
  num: number,
  flag?: string,
): Promise<void> {
  const dir = tadpoleDir(project, num);
  const branchName = getBranchName(project, num);

  if (!existsSync(dir)) {
    throw new Error(`Tadpole ${num} does not exist at ${dir}`);
  }

  console.log(`${RED}Destroying tadpole ${num}...${NC}`);

  if (flag !== '--force' && flag !== '-f') {
    // In non-interactive contexts, require --force
    throw new Error('Destroying a tadpole requires --force flag');
  }

  // Close iTerm2 tab if exists
  const alive = await stateExists(project.session_name, num);
  if (alive) {
    console.log('  Closing iTerm2 tab...');
    const state = await loadState(project.session_name, num);
    if (state?.panes?.main) {
      try {
        await closeTabBySession(state.panes.main);
      } catch {
        // ignore
      }
    }
    await removeState(project.session_name, num);
  }

  // Kill running processes
  await killTadpoleProcesses(project, num);

  console.log('  Removing git worktree...');
  try {
    await execa('git', ['-C', project.main_repo, 'worktree', 'remove', dir, '--force']);
  } catch {
    // ignore
  }

  // Force remove directory if it still exists
  if (existsSync(dir)) {
    console.log('  Force removing directory...');
    await rm(dir, { recursive: true, force: true });
  }

  // Delete branch if not in use elsewhere
  try {
    await execa('git', ['-C', project.main_repo, 'show-ref', '--verify', '--quiet', `refs/heads/${branchName}`]);
    const { stdout } = await execa('git', ['-C', project.main_repo, 'worktree', 'list']);
    if (!stdout.includes(`[${branchName}]`)) {
      console.log(`  Deleting branch ${branchName}...`);
      try {
        await execa('git', ['-C', project.main_repo, 'branch', '-D', branchName]);
      } catch {
        // ignore
      }
    }
  } catch {
    // branch doesn't exist, that's fine
  }

  console.log(`${GREEN}Tadpole ${num} destroyed${NC}`);
}

// ============================================================================
// Quit Tadpole
// ============================================================================

/**
 * Gracefully quit: save WIP, close all panes.
 */
export async function quitTadpole(
  project: BufoProject,
  dir: string,
): Promise<void> {
  const prefix = project.tadpoles.prefix;
  const dirBasename = basename(dir);
  const numStr = dirBasename.startsWith(`${prefix}-`)
    ? dirBasename.slice(prefix.length + 1)
    : '';
  const num = /^\d+$/.test(numStr) ? parseInt(numStr, 10) : null;

  if (num === null) return;

  // Save WIP state (best effort)
  // Note: full WIP save requires bash; skip in TS for now
  // wip_save is complex and will be ported in M3-wip

  // Close tadpole panes
  await closeTadpolePanes(project, dir);
}

// ============================================================================
// Main Tadpole
// ============================================================================

/**
 * Open main repo with tadpole layout.
 */
export async function openMainTadpole(
  project: BufoProject,
): Promise<void> {
  const dir = project.main_repo;
  const tpId = 'main';
  const windowName = `@${project.alias} main`;

  // Reconnect if already open
  const alive = await stateExists(project.session_name, tpId);
  if (alive) {
    console.log(`${CYAN}Switching to main tadpole...${NC}`);
    const state = await loadState(project.session_name, tpId);
    if (!state) return;

    // Refresh info bar
    if (state.panes.info && state.panes.info !== 'null') {
      await sendInterrupt(state.panes.info);
      await sleep(300);
      const infobarCmd = getMainInfobarCommand(dir);
      await sendText(state.panes.info, `clear && ${infobarCmd}`);
    }

    await focusSession(state.panes.main);
    return;
  }

  console.log(`${CYAN}Opening main tadpole...${NC}`);
  console.log(`  Directory: ${dir}`);

  // Write metadata
  await writeMeta(dir, { type: 'main' });

  // Get pane commands
  const devCmd = getPaneCommand(project, 'server');
  const claudeCmd = getPaneCommand(project, 'main', windowName);
  const infobarCmd = getMainInfobarCommand(dir);

  await createTadpoleLayoutInternal(
    project,
    windowName,
    dir,
    devCmd,
    claudeCmd,
    'new',
    tpId,
    infobarCmd,
  );
}

// ============================================================================
// Switch Tadpole
// ============================================================================

/**
 * Switch focus to a tadpole. If num is given, switch directly.
 * If no num, show active tadpoles and switch to the only one (or list).
 */
export async function switchTadpole(
  project: BufoProject,
  num?: number,
): Promise<void> {
  // Direct switch
  if (num !== undefined) {
    const alive = await stateExists(project.session_name, num);
    if (!alive) {
      throw new Error(`Tadpole ${num} is not active`);
    }
    const state = await loadState(project.session_name, num);
    if (state?.panes?.main) {
      await focusSession(state.panes.main);
    }
    const name = getTadpoleName(project, num);
    console.log(`${GREEN}Switched to tadpole ${num} (${name})${NC}`);
    return;
  }

  // Collect active tadpoles
  const tadpoles = await listTadpoles(project);
  const activeNums = tadpoles.filter((t) => t.active).map((t) => t.number);

  if (activeNums.length === 0) {
    console.log('No active tadpoles.');
    console.log("Run 'bufo tp <N>' to open a tadpole.");
    return;
  }

  // Single active tadpole — switch immediately
  if (activeNums.length === 1) {
    const n = activeNums[0];
    const state = await loadState(project.session_name, n);
    if (state?.panes?.main) {
      await focusSession(state.panes.main);
    }
    const name = getTadpoleName(project, n);
    console.log(`${GREEN}Switched to tadpole ${n} (${name})${NC}`);
    return;
  }

  // Multiple active — list them (interactive picker not supported in lib)
  console.log(`${CYAN}Active tadpoles:${NC}`);
  console.log('');
  for (const n of activeNums) {
    const tp = tadpoles.find((t) => t.number === n);
    const name = tp?.customName ?? `tp${n}`;
    const branch = tp?.branch ?? 'unknown';
    console.log(`  ${BOLD}${n}${NC}: ${project.tadpoles.prefix}-${n} (${branch}) ${name}`);
  }
  console.log('');
  console.log(`Use 'bufo switch <N>' to switch directly.`);
}

// ============================================================================
// Prepare Tadpole For Reuse
// ============================================================================

/**
 * Reset an unlocked tadpole for reuse: close tab, kill processes,
 * reset git, clean files, lock it.
 */
export async function prepareTadpoleForReuse(
  project: BufoProject,
  num: number,
): Promise<void> {
  const dir = tadpoleDir(project, num);

  console.log(`${YELLOW}Preparing tadpole ${num} for reuse...${NC}`);

  // Close iTerm2 tab if it exists
  const alive = await stateExists(project.session_name, num);
  if (alive) {
    const state = await loadState(project.session_name, num);
    if (state?.panes?.main) {
      try {
        await closeTabBySession(state.panes.main);
      } catch {
        // ignore
      }
    }
    await removeState(project.session_name, num);
    await sleep(300);
  }

  // Kill running processes
  await killTadpoleProcesses(project, num);

  console.log('  Fetching origin...');
  try {
    await execa('git', ['-C', dir, 'fetch', 'origin']);
  } catch {
    // ignore
  }

  const defaultBranch = await getDefaultBranch(dir);
  const branchName = getBranchName(project, num);

  console.log(`  Resetting to ${defaultBranch}...`);
  try {
    await execa('git', ['-C', dir, 'checkout', branchName]);
  } catch {
    try {
      await execa('git', ['-C', dir, 'checkout', '-b', branchName, defaultBranch]);
    } catch {
      // ignore
    }
  }
  try {
    await execa('git', ['-C', dir, 'reset', '--hard', defaultBranch]);
  } catch {
    // ignore
  }

  console.log('  Cleaning untracked files...');
  const preserveFiles = project.cleanup?.preserve_files ?? '.env';
  try {
    await execa('git', ['-C', dir, 'clean', '-fd', `--exclude=${preserveFiles}`, '--exclude=.bufo-*']);
  } catch {
    // ignore
  }

  // Lock the tadpole now that it's being claimed
  await writeFile(join(dir, '.bufo-lock'), '', 'utf-8');

  // Clear old name and metadata
  await clearTadpoleName(project, num);
  await clearMeta(dir);

  console.log(`${GREEN}Tadpole ${num} ready for reuse${NC}`);
}

// ============================================================================
// Internal Helpers
// ============================================================================

/**
 * Kill processes matching the configured kill_pattern for a tadpole.
 */
async function killTadpoleProcesses(
  project: BufoProject,
  num: number,
): Promise<void> {
  let killPattern = project.cleanup?.kill_pattern;
  if (!killPattern) return;

  killPattern = killPattern.replace(/\{N\}/g, String(num));
  killPattern = killPattern.replace(/\{PREFIX\}/g, project.tadpoles.prefix);
  killPattern = escapeKillPattern(killPattern);

  try {
    await execa('pkill', ['-f', killPattern]);
  } catch {
    // pkill exits non-zero when no processes matched — that's fine
  }
}

/**
 * Close all panes of a tadpole and remove state.
 */
async function closeTadpolePanes(
  project: BufoProject,
  dir: string,
): Promise<void> {
  const prefix = project.tadpoles.prefix;
  const dirBasename = basename(dir);
  const numStr = dirBasename.startsWith(`${prefix}-`)
    ? dirBasename.slice(prefix.length + 1)
    : '';

  if (!numStr) return;
  const num = /^\d+$/.test(numStr) ? parseInt(numStr, 10) : null;
  if (num === null) return;

  const state = await loadState(project.session_name, num);
  if (!state) return;

  // Kill running processes
  await killTadpoleProcesses(project, num);

  await removeState(project.session_name, num);

  // Close the entire tab
  const closeSid = state.panes.info ?? state.panes.main;
  if (closeSid) {
    try {
      await closeTabBySession(closeSid);
    } catch {
      // ignore
    }
  }
}
