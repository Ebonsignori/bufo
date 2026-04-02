import { execa } from 'execa';
import { readdir } from 'fs/promises';
import type { BufoProject } from '@bufo/core';

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const NC = '\x1b[0m';

/**
 * Detect the default branch (main/master/trunk) for a git repo.
 * Falls back to "main" if origin/HEAD is not configured.
 */
export async function getDefaultBranch(dir?: string): Promise<string> {
  const cwd = dir ?? '.';

  // Try symbolic-ref first (set when origin/HEAD is configured)
  try {
    const { stdout } = await execa('git', ['-C', cwd, 'symbolic-ref', 'refs/remotes/origin/HEAD']);
    const branch = stdout.replace('refs/remotes/origin/', '');
    if (branch) return branch;
  } catch {
    // Not configured — fall through
  }

  // Fall back to inferring from remote branches
  for (const candidate of ['main', 'master', 'develop']) {
    try {
      await execa('git', ['-C', cwd, 'show-ref', '--verify', '--quiet', `refs/remotes/origin/${candidate}`]);
      return candidate;
    } catch {
      // Not found — try next
    }
  }

  return 'main';
}

/**
 * Get branch name for a given tadpole number using the project's branch pattern.
 */
function getBranchName(project: BufoProject, num: number): string {
  return project.tadpoles.branch_pattern.replace('{N}', String(num));
}

/**
 * Collect tadpole numbers from the tadpole base directory.
 */
async function collectTadpoleNums(project: BufoProject): Promise<number[]> {
  const prefix = project.tadpoles.prefix;
  let entries: string[];
  try {
    entries = await readdir(project.tadpole_base);
  } catch {
    return [];
  }

  const nums: number[] = [];
  for (const entry of entries) {
    if (!entry.startsWith(`${prefix}-`)) continue;
    const numStr = entry.replace(`${prefix}-`, '');
    const num = parseInt(numStr, 10);
    if (!isNaN(num)) nums.push(num);
  }
  return nums.sort((a, b) => a - b);
}

interface BranchInfo {
  branch: string;
  commits: string;
}

/**
 * Merge tadpole branches that have commits ahead of the default branch into it.
 * If dryRun: print what would be merged without doing it.
 * If num: only merge the specified tadpole number.
 * On conflict: abort the merge of that branch and continue.
 */
export async function handleMerge(
  project: BufoProject,
  opts: { dryRun?: boolean; num?: number } = {},
): Promise<void> {
  const { dryRun = false, num } = opts;
  const mainRepo = project.main_repo;

  // Validate main repo exists
  try {
    await execa('git', ['-C', mainRepo, 'rev-parse', '--git-dir']);
  } catch {
    throw new Error(`Main repo not found at ${mainRepo}`);
  }

  // Check for clean working tree
  const { stdout: dirty } = await execa('git', ['-C', mainRepo, 'status', '--porcelain']);
  if (dirty.trim() !== '') {
    throw new Error(`Main repo has uncommitted changes — commit or stash first\n  ${mainRepo}`);
  }

  const defaultBranch = await getDefaultBranch(mainRepo);

  // Determine which tadpole numbers to check
  const wsNums = num != null ? [num] : await collectTadpoleNums(project);

  // Collect branches with commits ahead of default branch
  const branchesToMerge: BranchInfo[] = [];

  for (const n of wsNums) {
    const branch = getBranchName(project, n);

    // Check if branch exists locally in main repo
    try {
      await execa('git', ['-C', mainRepo, 'show-ref', '--verify', '--quiet', `refs/heads/${branch}`]);
    } catch {
      continue;
    }

    // Check if branch has commits ahead of the default branch
    try {
      const { stdout: commits } = await execa('git', [
        '-C', mainRepo, 'log', `${defaultBranch}..${branch}`, '--oneline',
      ]);
      if (commits.trim() === '') continue;
      branchesToMerge.push({ branch, commits: commits.trim() });
    } catch {
      continue;
    }
  }

  if (branchesToMerge.length === 0) {
    console.log(`${YELLOW}No tadpole branches with commits ahead of ${defaultBranch}.${NC}`);
    return;
  }

  // Show summary
  console.log(`${CYAN}Branches with commits ahead of ${defaultBranch}:${NC}`);
  console.log('');

  for (const { branch, commits } of branchesToMerge) {
    const count = commits.split('\n').length;
    console.log(`  ${BOLD}${branch}${NC} (${count} commit(s))`);
    for (const line of commits.split('\n')) {
      console.log(`    ${line}`);
    }
    console.log('');
  }

  if (dryRun) {
    console.log(`${YELLOW}Dry run — no changes made.${NC}`);
    return;
  }

  // Update the default branch
  console.log('');
  console.log(`${CYAN}Fetching from origin...${NC}`);
  try {
    await execa('git', ['-C', mainRepo, 'fetch', 'origin']);
  } catch {
    // fetch failure is non-fatal
  }

  console.log(`${CYAN}Checking out ${defaultBranch}...${NC}`);
  await execa('git', ['-C', mainRepo, 'checkout', defaultBranch]);

  console.log(`${CYAN}Pulling latest ${defaultBranch}...${NC}`);
  try {
    await execa('git', ['-C', mainRepo, 'pull', 'origin', defaultBranch]);
  } catch {
    // pull failure is non-fatal
  }

  // Merge each branch
  let merged = 0;
  let mergeFailed = 0;

  for (const { branch } of branchesToMerge) {
    console.log('');
    console.log(`${CYAN}Merging ${branch}...${NC}`);

    try {
      await execa('git', ['-C', mainRepo, 'merge', branch, '--no-edit']);
      console.log(`  ${GREEN}Merged successfully${NC}`);
      merged++;
    } catch {
      console.log(`  ${YELLOW}Conflicts detected${NC}`);
      console.log(`  ${RED}Could not resolve conflicts — aborting merge of ${branch}${NC}`);
      try {
        await execa('git', ['-C', mainRepo, 'merge', '--abort']);
      } catch {
        // ignore abort failure
      }
      mergeFailed++;
    }
  }

  // Summary
  console.log('');
  console.log('\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
  console.log(`  Merged: ${GREEN}${merged}${NC}  Failed: ${RED}${mergeFailed}${NC}`);
  if (merged > 0) {
    console.log('');
    console.log(`  ${YELLOW}Changes are local only — push when ready:${NC}`);
    console.log(`    cd ${mainRepo} && git push origin ${defaultBranch}`);
  }
  console.log('\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
}
