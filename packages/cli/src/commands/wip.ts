import { execa } from 'execa';
import { copyFile, mkdir, readdir, readFile, writeFile, rename, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import type { BufoProject, WipEntry } from '@bufo/core';
import { getWipDir, listWips, listAllWips } from '@bufo/core';

const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const GRAY = '\x1b[90m';
const NC = '\x1b[0m';

export interface RestoreOpts {
  wipPath?: string;
  num?: number;
  global?: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getBranchName(project: BufoProject, num: number): string {
  return project.tadpoles.branch_pattern.replace('{N}', String(num));
}

function tadpoleDir(project: BufoProject, num: number): string {
  return join(project.tadpole_base, `${project.tadpoles.prefix}-${num}`);
}

function formatTimestamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

async function dirExists(path: string): Promise<boolean> {
  try {
    const s = await stat(path);
    return s.isDirectory();
  } catch {
    return false;
  }
}

async function fileExists(path: string): Promise<boolean> {
  try {
    const s = await stat(path);
    return s.isFile();
  } catch {
    return false;
  }
}

async function fileNonEmpty(path: string): Promise<boolean> {
  try {
    const s = await stat(path);
    return s.isFile() && s.size > 0;
  } catch {
    return false;
  }
}

/** Run git in a given cwd, returning stdout. Returns fallback on error. */
async function git(args: string[], cwd: string, fallback?: string): Promise<string> {
  try {
    const { stdout } = await execa('git', args, { cwd });
    return stdout;
  } catch {
    if (fallback !== undefined) return fallback;
    throw new Error(`git ${args.join(' ')} failed in ${cwd}`);
  }
}

/** Atomic JSON write: write to tmp, then rename. */
async function atomicWriteJSON(filePath: string, data: unknown): Promise<void> {
  const tmp = filePath + '.tmp';
  await writeFile(tmp, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  await rename(tmp, filePath);
}

/** Atomic text write: write to tmp, then rename. */
async function atomicWriteText(filePath: string, content: string): Promise<void> {
  const tmp = filePath + '.tmp';
  await writeFile(tmp, content, 'utf-8');
  await rename(tmp, filePath);
}

// ---------------------------------------------------------------------------
// generateWipSummary
// ---------------------------------------------------------------------------

/**
 * Generate a WIP summary slug and description using the configured AI tool.
 * Returns { slug, summary } or falls back to { slug: 'wip', summary: '' } if AI unavailable.
 */
export async function generateWipSummary(diff: string): Promise<{ slug: string; summary: string }> {
  const now = new Date();
  const fallback = {
    slug: `wip-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`,
    summary: 'Work in progress',
  };

  if (!diff.trim()) return fallback;

  const truncated = diff.split('\n').slice(0, 100).join('\n');

  const prompt = `Based on this git diff, provide a JSON response with exactly this format (no markdown, just raw JSON):
{"slug": "short-kebab-case-name-max-30-chars", "summary": "One sentence describing the changes"}

Git diff:
${truncated}`;

  for (const cmd of ['claude', 'aichat', 'llm']) {
    try {
      await execa('command', ['-v', cmd]);
    } catch {
      continue;
    }

    try {
      const { stdout } = await execa(cmd, [], {
        input: prompt,
        timeout: 30000,
      });

      if (stdout) {
        const match = stdout.match(/\{[^}]*\}/);
        if (match) {
          const parsed = JSON.parse(match[0]);
          if (parsed.slug && typeof parsed.slug === 'string') {
            return {
              slug: parsed.slug.slice(0, 30),
              summary: parsed.summary || '',
            };
          }
        }
      }
    } catch {
      // AI tool failed
    }
  }

  return fallback;
}

// ---------------------------------------------------------------------------
// wipSave
// ---------------------------------------------------------------------------

/**
 * Save current work-in-progress state for a tadpole:
 * - git diff + git diff --cached -> patches
 * - untracked files -> copied
 * - branch name, commits ahead of main
 * - AI summary via configured ai_tool
 * If restart=true: opens a fresh tadpole after saving.
 */
export async function wipSave(
  project: BufoProject,
  num: number,
  opts: { restart?: boolean; name?: string } = {},
): Promise<void> {
  const dir = tadpoleDir(project, num);
  const wipDir = getWipDir(project.alias, project.tadpoles.prefix, num);
  const timestamp = formatTimestamp();
  const branchName = getBranchName(project, num);

  if (!(await dirExists(dir))) {
    throw new Error(`Tadpole ${num} does not exist`);
  }

  console.log(`${CYAN}Saving WIP state for tadpole ${num}...${NC}`);

  const diff = await git(['diff', 'HEAD'], dir, '');
  const staged = await git(['diff', '--cached', 'HEAD'], dir, '');
  const status = await git(['status', '--porcelain'], dir, '');
  const branch = await git(['branch', '--show-current'], dir, 'unknown');
  const untrackedRaw = await git(['ls-files', '--others', '--exclude-standard'], dir, '');

  await git(['fetch', 'origin', 'main', '--quiet'], dir, '');
  const commitsAheadStr = await git(['rev-list', '--count', 'origin/main..HEAD'], dir, '0');
  const commitsAhead = parseInt(commitsAheadStr, 10) || 0;

  let commitLog = '';
  if (commitsAhead > 0) {
    commitLog = await git(['log', '--oneline', 'origin/main..HEAD'], dir, '');
  }

  const hasChanges =
    diff !== '' ||
    staged !== '' ||
    status !== '' ||
    untrackedRaw !== '' ||
    commitsAhead > 0 ||
    (branch !== branchName && branch !== 'main');

  if (!hasChanges) {
    console.log(`${YELLOW}No changes to save.${NC}`);
    return;
  }

  let slug: string;
  let summary: string;

  if (opts.name) {
    slug = slugify(opts.name);
    summary = opts.name;
  } else {
    const allDiffs = diff + staged;
    const ai = await generateWipSummary(allDiffs);
    slug = ai.slug;
    summary = ai.summary;
  }

  const wipPath = join(wipDir, `${timestamp}-${slug}`);
  await mkdir(wipPath, { recursive: true });

  if (diff) {
    await atomicWriteText(join(wipPath, 'main-unstaged.patch'), diff + '\n');
  }
  if (staged) {
    await atomicWriteText(join(wipPath, 'main-staged.patch'), staged + '\n');
  }
  if (status) {
    await atomicWriteText(join(wipPath, 'main-status.txt'), status + '\n');
  }
  if (commitLog) {
    await atomicWriteText(join(wipPath, 'main-commits.txt'), commitLog + '\n');
  }

  if (untrackedRaw) {
    const untrackedFiles = untrackedRaw.split('\n').filter(Boolean);
    const untrackedDir = join(wipPath, 'untracked');
    await mkdir(untrackedDir, { recursive: true });

    for (const file of untrackedFiles) {
      const destDir = join(untrackedDir, dirname(file));
      await mkdir(destDir, { recursive: true });
      try {
        await copyFile(join(dir, file), join(untrackedDir, file));
      } catch {
        // skip files that can't be copied
      }
    }
    await atomicWriteText(join(wipPath, 'untracked-files.txt'), untrackedRaw + '\n');
  }

  await atomicWriteJSON(join(wipPath, 'metadata.json'), {
    timestamp,
    slug,
    summary,
    tadpole: num,
    branch,
    commits_ahead: commitsAhead,
    created_at: new Date().toISOString(),
  });

  console.log(`${GREEN}WIP saved: ${slug}${NC}`);
  console.log(`   ${GRAY}${summary}${NC}`);

  if (opts.restart) {
    console.log('');
    console.log(`Restart tadpole ${num} to continue with a clean slate.`);
  }
}

// ---------------------------------------------------------------------------
// wipRestore
// ---------------------------------------------------------------------------

/**
 * Restore a WIP entry: apply patches, restore untracked files, optionally replay commits.
 */
export async function wipRestore(project: BufoProject, opts: RestoreOpts): Promise<void> {
  const { wipPath, num, global: showGlobal } = opts;

  if (wipPath) {
    const targetNum = num ?? extractTadpoleNum(project, wipPath);
    if (targetNum === undefined) {
      throw new Error('Cannot determine target tadpole number. Specify --num.');
    }
    await restoreWip(project, targetNum, wipPath);
    return;
  }

  if (showGlobal) {
    const entries = await listAllWips(project.alias);
    if (entries.length === 0) {
      console.log(`${YELLOW}No WIP states saved${NC}`);
      return;
    }
    printWipList(entries);
    return;
  }

  if (num !== undefined) {
    const entries = await listWips(project.alias, project.tadpoles.prefix, num);
    if (entries.length === 0) {
      console.log(`${YELLOW}No WIP states saved for tadpole ${num}${NC}`);
      return;
    }
    printWipList(entries);
    return;
  }

  const entries = await listAllWips(project.alias);
  if (entries.length === 0) {
    console.log(`${YELLOW}No WIP states saved${NC}`);
    return;
  }
  printWipList(entries);
}

// ---------------------------------------------------------------------------
// wipContinue
// ---------------------------------------------------------------------------

/**
 * Restore the most recent WIP for a tadpole and optionally open it.
 */
export async function wipContinue(
  project: BufoProject,
  num: number,
  open?: boolean,
): Promise<void> {
  const entries = await listWips(project.alias, project.tadpoles.prefix, num);

  if (entries.length === 0) {
    throw new Error(`No WIP states found for tadpole ${num}`);
  }

  const latest = entries[0];
  console.log(`${CYAN}Restoring WIP: ${latest.metadata.slug}${NC}`);

  await restoreWip(project, num, latest.path);

  if (open) {
    console.log('');
    console.log(`  Run 'bufo ${num}' to open the tadpole`);
  }
}

// ---------------------------------------------------------------------------
// wipResume
// ---------------------------------------------------------------------------

/**
 * Interactive WIP restore selector using fzf (if available).
 */
export async function wipResume(project: BufoProject, num: number): Promise<void> {
  const entries = await listWips(project.alias, project.tadpoles.prefix, num);

  if (entries.length === 0) {
    throw new Error(`No WIP states found for tadpole ${num}`);
  }

  let selected: WipEntry | undefined;

  try {
    await execa('command', ['-v', 'fzf']);

    const lines = entries.map((e: WipEntry, i: number) => {
      const name = e.path.split('/').pop() ?? '';
      return `${i + 1}) ${name} — ${e.metadata.summary}`;
    });

    const { stdout } = await execa('fzf', ['--prompt', 'Select WIP: '], {
      input: lines.join('\n'),
    });

    const match = stdout.match(/^(\d+)\)/);
    if (match) {
      const idx = parseInt(match[1], 10) - 1;
      if (idx >= 0 && idx < entries.length) {
        selected = entries[idx];
      }
    }
  } catch {
    if (entries.length === 1) {
      selected = entries[0];
    } else {
      console.log(`${CYAN}Select WIP to restore:${NC}`);
      console.log('');
      for (let i = 0; i < entries.length; i++) {
        const e = entries[i];
        const name = e.path.split('/').pop() ?? '';
        console.log(`  ${GREEN}[${i + 1}]${NC} ${name}`);
        if (e.metadata.summary) {
          console.log(`      ${GRAY}${e.metadata.summary}${NC}`);
        }
      }
      selected = entries[0];
    }
  }

  if (!selected) {
    console.log('No WIP selected.');
    return;
  }

  const wipName = selected.path.split('/').pop() ?? '';
  console.log('');
  console.log(`${CYAN}Restoring WIP: ${wipName}${NC}`);

  await restoreWip(project, num, selected.path);
}

// ---------------------------------------------------------------------------
// Internal: restoreWip
// ---------------------------------------------------------------------------

async function restoreWip(project: BufoProject, num: number, wipPath: string): Promise<void> {
  const dir = tadpoleDir(project, num);
  const wipName = wipPath.split('/').pop() ?? '';

  if (!(await dirExists(dir))) {
    throw new Error(`Tadpole ${num} directory does not exist: ${dir}`);
  }

  const branchName = getBranchName(project, num);
  let savedBranch = branchName;

  const metadataPath = join(wipPath, 'metadata.json');
  if (await fileExists(metadataPath)) {
    try {
      const raw = await readFile(metadataPath, 'utf-8');
      const meta = JSON.parse(raw);
      savedBranch = meta.branch || meta.cloud_branch || branchName;
    } catch {
      // use default
    }
  }

  const currentBranch = await git(['branch', '--show-current'], dir, '');
  if (currentBranch !== savedBranch && savedBranch) {
    console.log(`  Switching to branch ${savedBranch}...`);
    try {
      await execa('git', ['checkout', savedBranch], { cwd: dir });
    } catch {
      await execa('git', ['checkout', '-b', savedBranch], { cwd: dir });
    }
  }

  let commitsFile: string | undefined;
  const mainCommitsPath = join(wipPath, 'main-commits.txt');
  const cloudCommitsPath = join(wipPath, 'cloud-commits.txt');

  if (await fileNonEmpty(mainCommitsPath)) {
    commitsFile = mainCommitsPath;
  } else if (await fileNonEmpty(cloudCommitsPath)) {
    commitsFile = cloudCommitsPath;
  }

  if (commitsFile) {
    console.log('  Restoring commits...');
    const content = await readFile(commitsFile, 'utf-8');
    const lines = content.trim().split('\n').filter(Boolean);
    const hashes = lines.map((l: string) => l.split(/\s+/)[0]).reverse();

    let cherryPickFailed = false;
    for (const hash of hashes) {
      try {
        await execa('git', ['cat-file', '-e', hash], { cwd: dir });
      } catch {
        console.log(`    (commit ${hash} not found in repo - may need to fetch)`);
        continue;
      }

      try {
        await execa('git', ['cherry-pick', hash, '--no-commit'], { cwd: dir });
      } catch {
        console.log(`    (commit ${hash} may need manual resolution)`);
        try {
          await execa('git', ['cherry-pick', '--abort'], { cwd: dir });
        } catch {
          // ignore
        }
        cherryPickFailed = true;
      }
    }

    if (!cherryPickFailed && hashes.length > 0) {
      try {
        await execa('git', ['commit', '--no-edit'], { cwd: dir });
      } catch {
        // nothing to commit
      }
    }
  }

  const stagedPatch = join(wipPath, 'main-staged.patch');
  if (await fileNonEmpty(stagedPatch)) {
    console.log('  Applying staged changes...');
    try {
      await execa('git', ['apply', stagedPatch], { cwd: dir });
      await execa('git', ['add', '-A'], { cwd: dir });
    } catch {
      console.log('    (some hunks may have failed)');
    }
  }

  const unstagedPatch = join(wipPath, 'main-unstaged.patch');
  if (await fileNonEmpty(unstagedPatch)) {
    console.log('  Applying unstaged changes...');
    try {
      await execa('git', ['apply', unstagedPatch], { cwd: dir });
    } catch {
      console.log('    (some hunks may have failed)');
    }
  }

  const untrackedDir = join(wipPath, 'untracked');
  if (await dirExists(untrackedDir)) {
    console.log('  Restoring untracked files...');
    await copyDirRecursive(untrackedDir, dir);
  }

  console.log(`${GREEN}WIP restored: ${wipName}${NC}`);
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function extractTadpoleNum(project: BufoProject, wipPath: string): number | undefined {
  const prefix = project.tadpoles.prefix;
  const match = wipPath.match(new RegExp(`${prefix}-(\\d+)`));
  return match ? parseInt(match[1], 10) : undefined;
}

function printWipList(entries: WipEntry[]): void {
  console.log(`${CYAN}WIP States${NC}`);
  console.log('');

  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    const name = e.path.split('/').pop() ?? '';
    const created = e.metadata.created_at;
    const displayDate = created.split('T')[0] ?? '';
    const timePart = created.split('T')[1] ?? '';
    const displayTime = timePart.replace(/[+-].*$/, '').slice(0, 5);

    console.log(`  ${GREEN}[${i + 1}]${NC} ${name}`);
    console.log(`      ${GRAY}${e.metadata.summary}${NC}`);
    console.log(`      Branch: ${e.metadata.branch} | Created: ${displayDate} ${displayTime}`);
    console.log('');
  }
}

/** Recursively copy contents of srcDir into destDir. */
async function copyDirRecursive(srcDir: string, destDir: string): Promise<void> {
  let entries;
  try {
    entries = await readdir(srcDir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const srcPath = join(srcDir, entry.name);
    const destPath = join(destDir, entry.name);

    if (entry.isDirectory()) {
      await mkdir(destPath, { recursive: true });
      await copyDirRecursive(srcPath, destPath);
    } else {
      await mkdir(dirname(destPath), { recursive: true });
      try {
        await copyFile(srcPath, destPath);
      } catch {
        // skip files that can't be copied
      }
    }
  }
}
