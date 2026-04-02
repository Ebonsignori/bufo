/**
 * Git worktree lifecycle management for migration agents.
 *
 * Worktrees are stored under <repo>/.claude/migrate-worktrees/<branch-slug>
 * so they are naturally excluded from git (the .claude/ directory is already
 * gitignored in most setups; ensureMigrationBranch() adds the entry if missing).
 *
 * Flow per agent:
 *   1. createWorktree(branch)  → isolated copy of HEAD on new branch
 *   2. agent runs (writes files, commits in the worktree)
 *   3. mergeWorktree(branch, targetBranch)  → squash-merge back into the migration branch
 *   4. removeWorktree(branch)  → prune worktree + delete branch
 */

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, appendFileSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";

/** Root of this git repo (resolved once at import time) */
export const REPO_ROOT = spawnSync("git", ["rev-parse", "--show-toplevel"], {
  encoding: "utf8",
}).stdout.trim();

/** Where all migration worktrees live */
export const WORKTREES_DIR = join(REPO_ROOT, ".claude", "migrate-worktrees");

/** The main migration branch all phase results land on */
export const MIGRATION_BRANCH = "migrate/typescript";

/**
 * Run a git (or other) command without a shell, using spawnSync with a split argv.
 * This avoids shell quoting issues with git format strings like %(refname:short).
 *
 * Simple arg splitting: respects double-quoted tokens (for paths with spaces)
 * but does not handle nested quoting or escapes beyond that.
 */
function run(cmd: string, opts: { cwd?: string; silent?: boolean } = {}): string {
  const argv = splitArgs(cmd);
  const [prog, ...args] = argv;
  if (!prog) throw new Error(`Empty command: ${cmd}`);

  const result = spawnSync(prog, args, {
    encoding: "utf8",
    cwd: opts.cwd ?? REPO_ROOT,
    stdio: opts.silent ? ["pipe", "pipe", "pipe"] : ["inherit", "pipe", "pipe"],
  });

  if (result.error) {
    throw new Error(`Command failed: ${cmd}\n${result.error.message}`);
  }
  if (result.status !== 0) {
    throw new Error(
      `Command failed: ${cmd}\n${result.stderr ?? ""}\n${result.stdout ?? ""}`
    );
  }
  return (result.stdout ?? "").trim();
}

/**
 * Split a command string into argv without invoking a shell.
 * Handles double-quoted tokens (e.g. paths with spaces).
 * Does NOT support single quotes, escape sequences, or $() expansion.
 */
function splitArgs(cmd: string): string[] {
  const args: string[] = [];
  let current = "";
  let inQuote = false;

  for (let i = 0; i < cmd.length; i++) {
    const ch = cmd[i]!;
    if (ch === '"') {
      inQuote = !inQuote;
    } else if (ch === " " && !inQuote) {
      if (current.length > 0) {
        args.push(current);
        current = "";
      }
    } else {
      current += ch;
    }
  }
  if (current.length > 0) args.push(current);
  return args;
}

/**
 * Ensure the migration branch exists and the worktrees dir is gitignored.
 * Creates the branch from current HEAD if absent.
 * Commits the .gitignore entry if it needed adding — so the working tree stays clean.
 */
export function ensureMigrationBranch(): void {
  // Ensure worktrees parent dir exists
  mkdirSync(WORKTREES_DIR, { recursive: true });

  // Add .claude/migrate-worktrees/ to .gitignore if not already there, then commit it
  const gitignore = join(REPO_ROOT, ".gitignore");
  const gitignoreContent = existsSync(gitignore) ? readFileSync(gitignore, "utf8") : "";
  if (!gitignoreContent.includes(".claude/migrate-worktrees")) {
    appendFileSync(
      gitignore,
      "\n# Migration worktrees (auto-added by scripts/migrate.ts)\n.claude/migrate-worktrees/\n"
    );
    // Stage and commit so the working tree is clean before any merges
    run("git add .gitignore", { silent: true });
    run('git commit -m "chore: add migrate-worktrees to .gitignore"', { silent: true });
  }

  // Create migration branch if it doesn't exist
  const branches = run("git branch --format=%(refname:short)", { silent: true });
  if (!branches.split("\n").includes(MIGRATION_BRANCH)) {
    run(`git branch ${MIGRATION_BRANCH}`);
  }
}

/**
 * Create an isolated git worktree for an agent task.
 *
 * @param branch  Branch name for the worktree, e.g. "migrate/state"
 * @returns       Absolute path to the worktree directory
 */
export function createWorktree(branch: string): string {
  // Ensure worktrees parent dir exists (gitignore is handled by ensureMigrationBranch)
  mkdirSync(WORKTREES_DIR, { recursive: true });

  // Slugify branch name for the directory path
  const slug = branch.replace(/\//g, "-");
  const worktreePath = join(WORKTREES_DIR, slug);

  if (existsSync(worktreePath)) {
    // Already exists (resume scenario) — just return the path
    return worktreePath;
  }

  // Check if the branch already exists (resume scenario)
  const existingBranches = run("git branch --format=%(refname:short)", { silent: true });
  if (existingBranches.split("\n").includes(branch)) {
    // Branch exists but no worktree — recreate the worktree from the existing branch
    run(`git worktree add "${worktreePath}" "${branch}"`);
  } else {
    // Fresh branch from MIGRATION_BRANCH (or HEAD if migration branch doesn't exist yet)
    const base = existingBranches.split("\n").includes(MIGRATION_BRANCH)
      ? MIGRATION_BRANCH
      : "HEAD";
    run(`git worktree add -b "${branch}" "${worktreePath}" "${base}"`);
  }

  return worktreePath;
}

/**
 * Merge a completed agent worktree branch into the migration branch.
 * Uses --no-ff so each agent contribution is clearly visible in history.
 *
 * @param branch  The agent's branch, e.g. "migrate/state"
 */
export function mergeWorktree(branch: string): void {
  ensureMigrationBranch();

  // Must be on migration branch to merge
  const current = run("git rev-parse --abbrev-ref HEAD", { silent: true });
  if (current !== MIGRATION_BRANCH) {
    run(`git checkout "${MIGRATION_BRANCH}"`);
  }

  run(`git merge "${branch}" --no-ff -m "feat: ${branch.replace("migrate/", "")}"`, {
    silent: false,
  });
}

/**
 * Remove a worktree and optionally delete its branch.
 *
 * @param branch       The agent's branch, e.g. "migrate/state"
 * @param deleteBranch Whether to also delete the branch after removing the worktree.
 *                     Default: true (after successful merge, branch is no longer needed).
 */
export function removeWorktree(branch: string, deleteBranch = true): void {
  const slug = branch.replace(/\//g, "-");
  const worktreePath = join(WORKTREES_DIR, slug);

  if (existsSync(worktreePath)) {
    try {
      run(`git worktree remove "${worktreePath}" --force`);
    } catch {
      // If the worktree is already gone from git's perspective, just remove the dir
      rmSync(worktreePath, { recursive: true, force: true });
    }
  }

  // Prune stale worktree refs
  run("git worktree prune", { silent: true });

  if (deleteBranch) {
    try {
      run(`git branch -d "${branch}"`, { silent: true });
    } catch {
      // Branch may already be deleted or not merged yet — non-fatal
    }
  }
}

/**
 * List all active migration worktrees (branches under "migrate/").
 */
export function listMigrationWorktrees(): string[] {
  const output = run("git worktree list --porcelain", { silent: true });
  const worktrees: string[] = [];
  let currentBranch = "";
  for (const line of output.split("\n")) {
    if (line.startsWith("branch refs/heads/")) {
      currentBranch = line.replace("branch refs/heads/", "");
    } else if (line.startsWith("worktree ") && currentBranch.startsWith("migrate/")) {
      worktrees.push(currentBranch);
      currentBranch = "";
    }
  }
  return worktrees;
}

/**
 * Get the absolute path for a worktree by branch name.
 */
export function worktreePath(branch: string): string {
  const slug = branch.replace(/\//g, "-");
  return join(WORKTREES_DIR, slug);
}
