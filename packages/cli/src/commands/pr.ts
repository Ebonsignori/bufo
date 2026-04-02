import { execa } from 'execa';
import { readdir, writeFile, access, mkdir, rename, unlink } from 'fs/promises';
import { join, basename } from 'path';
import type { BufoProject, TadpoleMeta } from '@bufo/core';

const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const BLUE = '\x1b[34m';
const BOLD = '\x1b[1m';
const NC = '\x1b[0m';

// ---------------------------------------------------------------------------
// PR metadata
// ---------------------------------------------------------------------------

export interface PrMetadata {
  branch: string;
  title: string;
  url: string;
  body: string;
  comments: string;
}

/**
 * Fetch PR metadata from GitHub using gh CLI.
 * Returns { branch, title, url, body, comments }.
 */
export async function fetchPrMetadata(
  owner: string,
  repo: string,
  prNum: number,
): Promise<PrMetadata> {
  const fullRepo = `${owner}/${repo}`;

  // Check gh exists
  try {
    await execa('gh', ['--version']);
  } catch {
    throw new Error('gh CLI required for PR tadpoles. Install: brew install gh');
  }

  let prJson: string;
  try {
    const { stdout } = await execa('gh', [
      'pr', 'view', String(prNum), '--repo', fullRepo,
      '--json', 'title,headRefName,url',
    ]);
    prJson = stdout;
  } catch {
    throw new Error(`Could not fetch PR #${prNum} from ${fullRepo}`);
  }

  if (!prJson) {
    throw new Error(`Could not fetch PR #${prNum} from ${fullRepo}`);
  }

  const parsed = JSON.parse(prJson);
  const branch = parsed.headRefName as string;
  const title = parsed.title as string;
  const url = parsed.url as string;

  // Fetch body and comments separately to avoid control-character issues
  let body = '';
  try {
    const { stdout } = await execa('gh', [
      'pr', 'view', String(prNum), '--repo', fullRepo,
      '--json', 'body', '--jq', '.body // ""',
    ]);
    body = stdout;
  } catch {
    // non-fatal
  }

  let comments = '';
  try {
    const { stdout } = await execa('gh', [
      'pr', 'view', String(prNum), '--repo', fullRepo,
      '--json', 'comments', '--jq', '[.comments[].body // empty] | join("\\n")',
    ]);
    comments = stdout;
  } catch {
    // non-fatal
  }

  return { branch, title, url, body, comments };
}

// ---------------------------------------------------------------------------
// PR identifier parsing
// ---------------------------------------------------------------------------

export interface ParsedPr {
  owner: string;
  repo: string;
  number: number;
}

/**
 * Parse a PR identifier in one of three formats:
 *  - Full URL: https://github.com/owner/repo/pull/123
 *  - Submodule: repo#456
 *  - Bare number: 789 (uses mainRepo to derive owner/repo)
 */
export async function parsePrIdentifier(
  identifier: string,
  mainRepo?: string,
): Promise<ParsedPr> {
  // Full URL
  const urlMatch = identifier.match(
    /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/,
  );
  if (urlMatch) {
    return {
      owner: urlMatch[1],
      repo: urlMatch[2],
      number: parseInt(urlMatch[3], 10),
    };
  }

  // repo#number
  const subMatch = identifier.match(/^([^#]+)#(\d+)$/);
  if (subMatch) {
    const repo = subMatch[1];
    const number = parseInt(subMatch[2], 10);
    // Derive owner from git remote
    let owner = '';
    try {
      const { stdout } = await execa('git', ['remote', 'get-url', 'origin']);
      const m = stdout.match(/github\.com[:/]([^/]+)\//);
      if (m) owner = m[1];
    } catch {
      // ignore
    }
    if (!owner) {
      throw new Error(`Could not determine owner for repo '${repo}' from git remote`);
    }
    return { owner, repo, number };
  }

  // Bare number
  const bareMatch = identifier.match(/^(\d+)$/);
  if (bareMatch) {
    const number = parseInt(bareMatch[1], 10);
    if (!mainRepo) {
      throw new Error('Cannot resolve bare PR number without a main_repo');
    }
    try {
      const { stdout } = await execa('git', ['-C', mainRepo, 'remote', 'get-url', 'origin']);
      const m = stdout.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
      if (m) {
        return { owner: m[1], repo: m[2], number };
      }
    } catch {
      // fall through
    }
    throw new Error(`Could not determine owner/repo from ${mainRepo}`);
  }

  throw new Error(
    `Could not parse PR identifier: ${identifier}\nFormats: 123, repo#456, https://github.com/.../pull/789`,
  );
}

// ---------------------------------------------------------------------------
// Branch checkout
// ---------------------------------------------------------------------------

export interface CheckoutResult {
  /** 'ok' = checked out, 'existing' = branch lives in another tadpole */
  status: 'ok' | 'existing';
  /** When status === 'existing', the tadpole number that already has the branch */
  existingTp?: number;
}

/**
 * Checkout a PR branch in an existing tadpole directory.
 * Tries `gh pr checkout` first, falls back to git fetch + checkout.
 */
export async function checkoutPrBranch(
  dir: string,
  branch: string,
  owner?: string,
  repo?: string,
  prNum?: number,
  tadpolePrefix?: string,
): Promise<CheckoutResult> {
  console.log(`${BLUE}Checking out PR branch...${NC}`);

  // Try gh pr checkout first if we have the info
  if (owner && repo && prNum) {
    try {
      await execa('gh', ['pr', 'checkout', String(prNum), '--repo', `${owner}/${repo}`], { cwd: dir });
      const { stdout: currentBranch } = await execa('git', ['-C', dir, 'branch', '--show-current']);
      console.log(`${GREEN}On branch: ${currentBranch}${NC}`);
      return { status: 'ok' };
    } catch {
      // Fallback below
    }
  }

  // Fallback: fetch + checkout
  try {
    await execa('git', ['-C', dir, 'fetch', 'origin', branch]);
  } catch {
    // non-fatal
  }

  try {
    await execa('git', ['-C', dir, 'checkout', branch]);
    const { stdout: currentBranch } = await execa('git', ['-C', dir, 'branch', '--show-current']);
    console.log(`${GREEN}On branch: ${currentBranch}${NC}`);
    return { status: 'ok' };
  } catch {
    // try creating from origin
  }

  try {
    await execa('git', ['-C', dir, 'checkout', '-b', branch, `origin/${branch}`]);
    const { stdout: currentBranch } = await execa('git', ['-C', dir, 'branch', '--show-current']);
    console.log(`${GREEN}On branch: ${currentBranch}${NC}`);
    return { status: 'ok' };
  } catch {
    // Check if branch is in another worktree
  }

  // Check if branch is already checked out in another worktree
  const prefix = tadpolePrefix ?? 'tp';
  try {
    const { stdout: worktreeList } = await execa('git', ['-C', dir, 'worktree', 'list', '--porcelain']);
    const targetRef = `refs/heads/${branch}`;
    let currentWorktree = '';

    for (const line of worktreeList.split('\n')) {
      if (line.startsWith('worktree ')) {
        currentWorktree = line.slice(9);
      }
      if (line.startsWith('branch ') && line.slice(7) === targetRef && currentWorktree) {
        // Found the worktree with this branch
        const dirName = basename(currentWorktree);
        const tpMatch = dirName.match(new RegExp(`^${prefix}-(\\d+)$`));
        if (tpMatch) {
          return { status: 'existing', existingTp: parseInt(tpMatch[1], 10) };
        }

        // Non-tadpole worktree — detach HEAD there and retry
        console.log(`${YELLOW}Branch checked out in ${currentWorktree}, detaching it...${NC}`);
        try {
          await execa('git', ['-C', currentWorktree, 'checkout', '--detach']);
        } catch {
          // ignore
        }

        // Retry checkout
        try {
          await execa('git', ['-C', dir, 'checkout', branch]);
          const { stdout: currentBranch } = await execa('git', ['-C', dir, 'branch', '--show-current']);
          console.log(`${GREEN}On branch: ${currentBranch}${NC}`);
          return { status: 'ok' };
        } catch {
          // try create
        }
        try {
          await execa('git', ['-C', dir, 'checkout', '-b', branch, `origin/${branch}`]);
          const { stdout: currentBranch } = await execa('git', ['-C', dir, 'branch', '--show-current']);
          console.log(`${GREEN}On branch: ${currentBranch}${NC}`);
          return { status: 'ok' };
        } catch {
          // fall through to error
        }
      }
    }
  } catch {
    // worktree list failed
  }

  throw new Error(`Failed to checkout PR branch: ${branch}`);
}

// ---------------------------------------------------------------------------
// Ticket extraction helpers
// ---------------------------------------------------------------------------

/**
 * Extract a ticket identifier (e.g. ENG-123) from a branch name.
 */
export function extractTicketFromBranch(branch: string): string | undefined {
  const m = branch.match(/([A-Za-z][A-Za-z0-9_]*-\d+)/);
  return m ? m[1].toUpperCase() : undefined;
}

/**
 * Extract a Linear ticket URL from text (PR body, comments, etc.).
 */
export function extractLinearUrlFromBody(body: string): string | undefined {
  const m = body.match(/https:\/\/linear\.app\/[^"\s>)]+\/issue\/[^"\s>)]+/);
  return m ? m[0] : undefined;
}

/**
 * Parse a ticket identifier from a URL or plain ID.
 */
export function parseTicketIdentifier(input: string): string | undefined {
  // Linear URL
  const linearMatch = input.match(
    /^https:\/\/linear\.app\/[^/]+\/issue\/([A-Za-z0-9_-]+)/,
  );
  if (linearMatch) return linearMatch[1];

  // GitHub Issue URL
  const ghMatch = input.match(
    /^https:\/\/github\.com\/[^/]+\/[^/]+\/issues\/(\d+)/,
  );
  if (ghMatch) return `#${ghMatch[1]}`;

  return input || undefined;
}

// ---------------------------------------------------------------------------
// Tadpole helpers
// ---------------------------------------------------------------------------

/**
 * Find an existing tadpole whose current branch matches the given branch name.
 * Returns the tadpole number, or undefined if none found.
 */
export async function findTadpoleForBranch(
  project: BufoProject,
  targetBranch: string,
): Promise<number | undefined> {
  const prefix = project.tadpoles.prefix;
  let entries: string[];
  try {
    entries = await readdir(project.tadpole_base);
  } catch {
    return undefined;
  }

  for (const entry of entries) {
    if (!entry.startsWith(`${prefix}-`)) continue;
    const numStr = entry.replace(`${prefix}-`, '');
    const num = parseInt(numStr, 10);
    if (isNaN(num)) continue;

    const dir = join(project.tadpole_base, entry);
    try {
      const { stdout: branch } = await execa('git', ['-C', dir, 'branch', '--show-current']);
      if (branch.trim() === targetBranch) {
        return num;
      }
    } catch {
      continue;
    }
  }

  return undefined;
}

/**
 * Find the first unlocked tadpole. Returns tadpole number or undefined.
 */
export async function findUnlockedTadpole(
  project: BufoProject,
): Promise<number | undefined> {
  const prefix = project.tadpoles.prefix;
  let entries: string[];
  try {
    entries = await readdir(project.tadpole_base);
  } catch {
    return undefined;
  }

  for (const entry of entries) {
    if (!entry.startsWith(`${prefix}-`)) continue;
    const numStr = entry.replace(`${prefix}-`, '');
    const num = parseInt(numStr, 10);
    if (isNaN(num)) continue;

    const lockFile = join(project.tadpole_base, entry, '.bufo-lock');
    try {
      await access(lockFile);
      // Lock file exists — skip
    } catch {
      // No lock file — this tadpole is unlocked
      return num;
    }
  }

  return undefined;
}

/**
 * Find the next available tadpole slot (1-100).
 */
export async function findNextTadpole(
  project: BufoProject,
): Promise<number | undefined> {
  const prefix = project.tadpoles.prefix;
  try {
    await mkdir(project.tadpole_base, { recursive: true });
  } catch {
    // ignore
  }

  for (let num = 1; num <= 100; num++) {
    const dir = join(project.tadpole_base, `${prefix}-${num}`);
    try {
      await access(dir);
      // Exists — skip
    } catch {
      // Does not exist — available
      return num;
    }
  }

  return undefined;
}

// ---------------------------------------------------------------------------
// Metadata writing (atomic)
// ---------------------------------------------------------------------------

/**
 * Write .bufo-meta JSON to a tadpole directory (atomic write).
 */
export async function writeWorkspaceMeta(
  dir: string,
  meta: TadpoleMeta,
): Promise<void> {
  const metaFile = join(dir, '.bufo-meta');
  const tmpFile = join(dir, `.bufo-meta.tmp.${process.pid}`);
  await writeFile(tmpFile, JSON.stringify(meta, null, 2) + '\n', 'utf-8');
  await rename(tmpFile, metaFile);
}

/**
 * Set the custom name for a tadpole (writes .bufo-name, atomic).
 */
export async function setTadpoleName(dir: string, name: string): Promise<void> {
  const nameFile = join(dir, '.bufo-name');
  const tmpFile = join(dir, `.bufo-name.tmp.${process.pid}`);
  await writeFile(tmpFile, name + '\n', 'utf-8');
  await rename(tmpFile, nameFile);
}

// ---------------------------------------------------------------------------
// Prompt building
// ---------------------------------------------------------------------------

const DEFAULT_PR_PROMPT = `You are working on PR #{number} in {repo}.

**Title:** {title}
**URL:** {url}
**Branch:** {branch}

Fetch the PR diff using \`gh pr diff {number}\` and review the changes. Then:
1. Understand what the PR does
2. Check if there are any issues, failing tests, or incomplete work
3. Ask me how you can help (fix issues, add tests, continue implementation, etc.)

Start by reading the PR description with \`gh pr view {number}\` and the diff.`;

/**
 * Build a prompt for Claude to work on a PR.
 */
export function buildPrPrompt(
  number: number,
  title: string,
  url: string,
  repo: string,
  branch: string,
): string {
  return DEFAULT_PR_PROMPT
    .replace(/\{number\}/g, String(number))
    .replace(/\{title\}/g, title)
    .replace(/\{url\}/g, url)
    .replace(/\{repo\}/g, repo)
    .replace(/\{branch\}/g, branch);
}

// ---------------------------------------------------------------------------
// Shared helper: extract ticket info from PR metadata
// ---------------------------------------------------------------------------

interface TicketInfo {
  ticketId?: string;
  ticketUrl?: string;
}

function extractTicketInfo(branch: string, body: string, comments: string): TicketInfo {
  const ticketUrl = extractLinearUrlFromBody(body)
    ?? (comments ? extractLinearUrlFromBody(comments) : undefined);

  let ticketId = extractTicketFromBranch(branch);
  if (!ticketId && ticketUrl) {
    ticketId = parseTicketIdentifier(ticketUrl);
  }

  return { ticketId, ticketUrl };
}

/**
 * Build TadpoleMeta for a PR.
 */
function buildPrMeta(
  branch: string,
  prNum: number,
  prUrl: string,
  prTitle: string,
  ticketInfo: TicketInfo,
): TadpoleMeta {
  const meta: TadpoleMeta = {
    type: 'pr',
    name: branch,
    pr_number: String(prNum),
    pr_url: prUrl,
    pr_title: prTitle,
  };
  if (ticketInfo.ticketId) meta.ticket = ticketInfo.ticketId;
  if (ticketInfo.ticketUrl) meta.ticket_url = ticketInfo.ticketUrl;
  return meta;
}

// ---------------------------------------------------------------------------
// Main handlers
// ---------------------------------------------------------------------------

/**
 * Main PR command handler:
 * 1. Parse PR identifier (URL, repo#N, or bare number)
 * 2. Find existing tadpole on that branch, else find/create unlocked tadpole
 * 3. Checkout branch
 * 4. Write .bufo-meta with PR info
 * 5. Open tadpole layout with PR prompt
 */
export async function handlePr(
  project: BufoProject,
  identifier: string,
): Promise<void> {
  if (!identifier) {
    throw new Error(
      'PR identifier required\n\nUsage: bufo pr <PR>\n       bufo tp <N> pr <PR>\n\n' +
      'Formats:\n  bufo pr 123\n  bufo pr repo#456\n  bufo pr https://github.com/owner/repo/pull/789',
    );
  }

  const parsed = await parsePrIdentifier(identifier, project.main_repo);
  const { owner, repo, number: prNum } = parsed;

  console.log(`${CYAN}Fetching PR #${prNum} from ${owner}/${repo}...${NC}`);

  const pr = await fetchPrMetadata(owner, repo, prNum);

  console.log(`  Title: ${BOLD}${pr.title}${NC}`);
  console.log(`  Branch: ${pr.branch}`);
  console.log('');

  const prefix = project.tadpoles.prefix;

  // Check if an existing tadpole is already on this branch
  const existingNum = await findTadpoleForBranch(project, pr.branch);

  if (existingNum != null) {
    console.log(`${GREEN}Found existing tadpole ${existingNum} on branch ${pr.branch}${NC}`);

    const ticketInfo = extractTicketInfo(pr.branch, pr.body, pr.comments);
    const meta = buildPrMeta(pr.branch, prNum, pr.url, pr.title, ticketInfo);
    const dir = join(project.tadpole_base, `${prefix}-${existingNum}`);

    await writeWorkspaceMeta(dir, meta);
    await setTadpoleName(dir, pr.branch);

    // Open existing tadpole (delegate to bufo CLI)
    await execa('bufo', ['open', String(existingNum)]);
    return;
  }

  // Try to reuse an unlocked tadpole
  let num = await findUnlockedTadpole(project);

  if (num != null) {
    console.log(`${CYAN}Reusing unlocked tadpole ${num} for PR #${prNum}...${NC}`);
  } else {
    num = await findNextTadpole(project);
    if (num == null) {
      throw new Error('No available tadpole slots (max 100)');
    }
    console.log(`${CYAN}Creating tadpole ${num} for PR #${prNum}...${NC}`);
  }

  const dir = join(project.tadpole_base, `${prefix}-${num}`);

  // Checkout PR branch
  const checkoutResult = await checkoutPrBranch(
    dir, pr.branch, owner, repo, prNum, prefix,
  );

  if (checkoutResult.status === 'existing' && checkoutResult.existingTp != null) {
    console.log(
      `${YELLOW}Branch already checked out in tadpole ${checkoutResult.existingTp}, switching to it...${NC}`,
    );
    // Remove lock from the unused tadpole
    try {
      await unlink(join(dir, '.bufo-lock'));
    } catch {
      // ignore
    }
    num = checkoutResult.existingTp;
  }

  const finalDir = join(project.tadpole_base, `${prefix}-${num}`);

  // Name the tadpole after the PR branch
  await setTadpoleName(finalDir, pr.branch);

  // Extract ticket info and write metadata
  const ticketInfo = extractTicketInfo(pr.branch, pr.body, pr.comments);
  const meta = buildPrMeta(pr.branch, prNum, pr.url, pr.title, ticketInfo);
  await writeWorkspaceMeta(finalDir, meta);

  // Build prompt and open tadpole
  const prompt = buildPrPrompt(prNum, pr.title, pr.url, `${owner}/${repo}`, pr.branch);
  await execa('bufo', ['open', String(num), '--prompt', prompt]);
}

/**
 * Handle bufo tp N pr <identifier> -- force a specific tadpole for the PR.
 */
export async function handleWsPr(
  project: BufoProject,
  tpNum: number,
  identifier: string,
): Promise<void> {
  if (!identifier) {
    throw new Error(`PR identifier required: bufo tp ${tpNum} pr <PR>`);
  }

  const parsed = await parsePrIdentifier(identifier, project.main_repo);
  const { owner, repo, number: prNum } = parsed;

  console.log(`${CYAN}Fetching PR #${prNum} from ${owner}/${repo}...${NC}`);

  const pr = await fetchPrMetadata(owner, repo, prNum);

  console.log(`  Title: ${BOLD}${pr.title}${NC}`);
  console.log(`  Branch: ${pr.branch}`);
  console.log('');

  const prefix = project.tadpoles.prefix;
  const dir = join(project.tadpole_base, `${prefix}-${tpNum}`);

  // Create tadpole directory if it doesn't exist
  try {
    await access(dir);
  } catch {
    console.log(`${CYAN}Creating tadpole ${tpNum}...${NC}`);
  }

  // Checkout the PR branch
  let num = tpNum;
  const checkoutResult = await checkoutPrBranch(
    dir, pr.branch, owner, repo, prNum, prefix,
  );

  if (checkoutResult.status === 'existing' && checkoutResult.existingTp != null) {
    console.log(
      `${YELLOW}Branch already checked out in tadpole ${checkoutResult.existingTp}, switching to it...${NC}`,
    );
    num = checkoutResult.existingTp;
  }

  const finalDir = join(project.tadpole_base, `${prefix}-${num}`);

  // Name the tadpole after the PR branch
  await setTadpoleName(finalDir, pr.branch);

  // Extract ticket info and write metadata
  const ticketInfo = extractTicketInfo(pr.branch, pr.body, pr.comments);
  const meta = buildPrMeta(pr.branch, prNum, pr.url, pr.title, ticketInfo);
  await writeWorkspaceMeta(finalDir, meta);

  // Build prompt and open tadpole
  const prompt = buildPrPrompt(prNum, pr.title, pr.url, `${owner}/${repo}`, pr.branch);
  await execa('bufo', ['open', String(num), '--prompt', prompt]);
}
