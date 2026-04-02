import { execa } from 'execa';
import { readdir, stat, writeFile, mkdir, access, rename } from 'fs/promises';
import { join, dirname } from 'path';
import { randomBytes } from 'crypto';
import type { BufoProject, TadpoleMeta } from '@bufo/core';
import { writeMeta } from '@bufo/core';

const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const NC = '\x1b[0m';

/**
 * Parse a ticket identifier from various input formats:
 * - Linear URL: https://linear.app/org/issue/ENG-123-title -> "ENG-123"
 * - GitHub Issue URL: https://github.com/org/repo/issues/456 -> "GH-456"
 * - Plain string: "ENG-123" -> "ENG-123"
 * Returns null if unrecognized.
 */
export function parseTicketIdentifier(input: string): string | null {
  if (!input || input.trim().length === 0) return null;

  const linearMatch = input.match(
    /^https:\/\/linear\.app\/[^/]+\/issue\/([A-Za-z0-9_-]+)/,
  );
  if (linearMatch) return linearMatch[1];

  const ghMatch = input.match(
    /^https:\/\/github\.com\/[^/]+\/[^/]+\/issues\/(\d+)/,
  );
  if (ghMatch) return `GH-${ghMatch[1]}`;

  if (/^#?[A-Za-z0-9_-]+$/.test(input)) return input;

  return null;
}

/**
 * Returns true if input is a GitHub issue URL.
 */
export function isGithubIssueUrl(url: string): boolean {
  return /^https:\/\/github\.com\/[^/]+\/[^/]+\/issues\/\d+/.test(url);
}

async function getGitBranch(dir: string): Promise<string | null> {
  try {
    const { stdout } = await execa('git', ['branch', '--show-current'], { cwd: dir });
    return stdout.trim() || null;
  } catch {
    return null;
  }
}

async function findTadpoleForTicket(
  project: BufoProject,
  ticketId: string,
): Promise<number | null> {
  const ticketLower = ticketId.toLowerCase();
  const { tadpole_base, tadpoles } = project;
  const prefix = tadpoles.prefix;

  let entries: string[];
  try {
    entries = await readdir(tadpole_base);
  } catch {
    return null;
  }

  for (const entry of entries) {
    if (!entry.startsWith(`${prefix}-`)) continue;
    const numStr = entry.slice(prefix.length + 1);
    const num = parseInt(numStr, 10);
    if (isNaN(num)) continue;

    const dir = join(tadpole_base, entry);
    const dirStat = await stat(dir).catch(() => null);
    if (!dirStat?.isDirectory()) continue;

    const branch = await getGitBranch(dir);
    if (branch && branch.toLowerCase().includes(ticketLower)) {
      return num;
    }
  }
  return null;
}

async function findUnlockedTadpole(project: BufoProject): Promise<number | null> {
  const { tadpole_base, tadpoles } = project;
  const prefix = tadpoles.prefix;

  let entries: string[];
  try {
    entries = await readdir(tadpole_base);
  } catch {
    return null;
  }

  for (const entry of entries) {
    if (!entry.startsWith(`${prefix}-`)) continue;
    const numStr = entry.slice(prefix.length + 1);
    const num = parseInt(numStr, 10);
    if (isNaN(num)) continue;

    const dir = join(tadpole_base, entry);
    const dirStat = await stat(dir).catch(() => null);
    if (!dirStat?.isDirectory()) continue;

    const locked = await access(join(dir, '.bufo-lock'))
      .then(() => true)
      .catch(() => false);
    if (!locked) return num;
  }
  return null;
}

async function findNextTadpole(project: BufoProject): Promise<number | null> {
  const { tadpole_base, tadpoles } = project;
  const prefix = tadpoles.prefix;

  await mkdir(tadpole_base, { recursive: true });

  for (let num = 1; num <= 100; num++) {
    const dir = join(tadpole_base, `${prefix}-${num}`);
    const claim = join(tadpole_base, `.claim-${num}`);

    const exists = await stat(dir).then(() => true).catch(() => false);
    if (exists) continue;

    const claimExists = await stat(claim).then(() => true).catch(() => false);
    if (claimExists) {
      try { await execa('rmdir', [claim]); } catch { /* ignore */ }
    }

    try {
      await mkdir(claim);
      return num;
    } catch {
      continue;
    }
  }
  return null;
}

function getTadpoleDir(project: BufoProject, num: number): string {
  return join(project.tadpole_base, `${project.tadpoles.prefix}-${num}`);
}

async function setTadpoleName(dir: string, name: string): Promise<void> {
  const target = join(dir, '.bufo-name');
  const tmp = join(dirname(target), `.bufo-name.tmp.${randomBytes(4).toString('hex')}`);
  await writeFile(tmp, name + '\n', 'utf-8');
  await rename(tmp, target);
}

async function resolveTicketUrl(
  project: BufoProject,
  originalInput: string,
  ticketId: string,
): Promise<string> {
  if (originalInput.startsWith('https://')) return originalInput;

  try {
    const configFile = project.config_file;
    if (!configFile) throw new Error('no config_file');
    const { stdout } = await execa('yq', [
      '-r', '.ticket.linear_base_url // ""', configFile,
    ]);
    const baseUrl = stdout.trim();
    if (baseUrl) return `${baseUrl.replace(/\/$/, '')}/${ticketId}`;
  } catch { /* yq not available or config missing */ }

  return '';
}

function buildTicketPrompt(identifier: string): string {
  return `Fetch the Linear ticket ${identifier} using your Linear MCP tools. Read the ticket title, description, and any relevant comments. Then:
1. Create and checkout a git branch using the ticket's suggested branch name from Linear
2. Analyze the requirements from the ticket
3. Create an implementation plan and enter plan mode for my approval before writing any code
If you need clarification on the requirements, ask me before proceeding.`;
}

function buildGithubIssuePrompt(issueUrl: string): string {
  return `Fetch the GitHub issue at ${issueUrl} using your GitHub MCP tools. Read the issue title, description, labels, and any relevant comments. Then:
1. Create and checkout a descriptive git branch based on the issue
2. Analyze the requirements from the issue
3. Create an implementation plan and enter plan mode for my approval before writing any code
If you need clarification on the requirements, ask me before proceeding.`;
}

async function prepareTadpoleForReuse(project: BufoProject, num: number): Promise<void> {
  await execa('bufo', [`@${project.alias}`, 'tp', String(num), 'reset'], {
    stdio: 'inherit',
  }).catch(() => {
    const dir = getTadpoleDir(project, num);
    return execa('git', ['checkout', '.'], { cwd: dir });
  });
}

async function createWorkspace(project: BufoProject, num: number): Promise<void> {
  await execa('bufo', [`@${project.alias}`, 'worktree', 'create', String(num)], {
    stdio: 'inherit',
  }).catch(() => {
    const dir = getTadpoleDir(project, num);
    const branchPattern = project.tadpoles.branch_pattern || '{prefix}-{N}';
    const branch = branchPattern
      .replace('{prefix}', project.tadpoles.prefix)
      .replace('{N}', String(num));
    return execa('git', ['worktree', 'add', '-b', branch, dir], {
      cwd: project.main_repo,
    });
  });
}

async function openTadpole(project: BufoProject, num: number, prompt?: string): Promise<void> {
  const args = [`@${project.alias}`, 'open', String(num)];
  if (prompt) args.push('--prompt', prompt);
  await execa('bufo', args, { stdio: 'inherit' });
}

/**
 * Handle the bufo ticket command:
 * 1. Parse ticket identifier
 * 2. Find existing tadpole on matching branch, or find/create unlocked tadpole
 * 3. Create branch if needed
 * 4. Write .bufo-meta with ticket info
 * 5. Open the tadpole layout
 */
export async function handleTicket(
  project: BufoProject,
  identifier: string,
): Promise<void> {
  if (!identifier) {
    throw new Error(
      'Ticket identifier required\n\n' +
      'Usage: bufo ticket <identifier>\n' +
      '       bufo tp <N> ticket <identifier>\n\n' +
      'Examples:\n' +
      '  bufo ticket ENG-123\n' +
      '  bufo ticket https://linear.app/team/issue/ENG-123/title\n' +
      '  bufo ticket https://github.com/owner/repo/issues/42\n' +
      '  bufo tp 3 ticket ENG-123',
    );
  }

  const originalInput = identifier;
  const isGithub = isGithubIssueUrl(originalInput);

  const ticketId = parseTicketIdentifier(identifier);
  if (!ticketId) {
    throw new Error(
      `Invalid ticket identifier: ${identifier}\n` +
      'Identifiers must be alphanumeric (dashes and underscores allowed)',
    );
  }

  if (!/^#?[A-Za-z0-9_-]+$/.test(ticketId)) {
    throw new Error(
      `Invalid ticket identifier: ${ticketId}\n` +
      'Identifiers must be alphanumeric (dashes and underscores allowed)',
    );
  }

  const ticketUrl = await resolveTicketUrl(project, originalInput, ticketId);
  const existingNum = await findTadpoleForTicket(project, ticketId);

  if (existingNum !== null) {
    const existingDir = getTadpoleDir(project, existingNum);
    const existingBranch = await getGitBranch(existingDir);
    console.log(`${GREEN}Found existing tadpole ${existingNum} on branch ${existingBranch}${NC}`);

    const tabName = existingBranch ?? ticketId;
    const meta: TadpoleMeta = {
      type: 'ticket',
      name: tabName,
      ticket: ticketId,
      ticket_url: ticketUrl || undefined,
    };
    await writeMeta(existingDir, meta);
    await setTadpoleName(existingDir, tabName);
    await openTadpole(project, existingNum);
    return;
  }

  let num = await findUnlockedTadpole(project);

  if (num !== null) {
    console.log(`${CYAN}Reusing unlocked tadpole ${num} for ticket ${ticketId}...${NC}`);
    await prepareTadpoleForReuse(project, num);
  } else {
    num = await findNextTadpole(project);
    if (num === null) {
      throw new Error('No available tadpole slots (max 100)');
    }
    console.log(`${CYAN}Creating tadpole ${num} for ticket ${ticketId}...${NC}`);
    await createWorkspace(project, num);
  }

  const dir = getTadpoleDir(project, num);
  await setTadpoleName(dir, ticketId);

  const meta: TadpoleMeta = {
    type: 'ticket',
    name: ticketId,
    ticket: ticketId,
    ticket_url: ticketUrl || undefined,
  };
  await writeMeta(dir, meta);

  const prompt = isGithub
    ? buildGithubIssuePrompt(ticketUrl)
    : buildTicketPrompt(ticketId);
  await openTadpole(project, num, prompt);
}
