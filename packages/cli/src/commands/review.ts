import { execa } from 'execa';
import { mkdir, readdir, readFile, writeFile, rm, rename } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { randomUUID } from 'node:crypto';
import type { BufoProject } from '@bufo/core';

// ---------------------------------------------------------------------------
// ANSI helpers
// ---------------------------------------------------------------------------
const BOLD = '\x1b[1m';
const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const GRAY = '\x1b[90m';
const NC = '\x1b[0m';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FetchOpts {
  includeDiff?: boolean;
  includeComments?: boolean;
}

interface ChorusConfig {
  conductor: string;
  singers: Array<{
    name: string;
    tool: string;
    prompt_delay?: number;
  }>;
}

interface SingerPrep {
  cmd: string;
  prompt: string;
  delay: number;
}

// ---------------------------------------------------------------------------
// Prompt loading
// ---------------------------------------------------------------------------

function getBufoDir(): string { return join(homedir(), '.bufo'); }
function getPromptsDir(): string { return join(getBufoDir(), 'prompts'); }

/**
 * Load a named prompt file, with variable substitution.
 * Resolution order:
 *   1. ~/.bufo/projects/<alias>/prompts/<name>.md  (project override)
 *   2. ~/.bufo/prompts/<name>.md                   (global)
 *   3. Hardcoded default
 */
async function loadPrompt(
  name: string,
  defaultContent: string,
  vars?: Record<string, string>,
  projectAlias?: string,
): Promise<string> {
  let content: string | undefined;

  // 1. Per-project override
  if (projectAlias) {
    const projFile = join(getBufoDir(), 'projects', projectAlias, 'prompts', `${name}.md`);
    try {
      content = await readFile(projFile, 'utf-8');
    } catch {
      // not found
    }
  }

  // 2. Global prompt file
  if (content === undefined) {
    const globalFile = join(getPromptsDir(), `${name}.md`);
    try {
      content = await readFile(globalFile, 'utf-8');
    } catch {
      // not found
    }
  }

  // 3. Hardcoded default
  if (content === undefined) {
    content = defaultContent;
  }

  // Variable substitution
  if (vars) {
    for (const [key, value] of Object.entries(vars)) {
      content = content.replaceAll(`{${key}}`, value);
    }
  }

  return content;
}

// ---------------------------------------------------------------------------
// Sessions directory helpers
// ---------------------------------------------------------------------------

function getSessionsDir(project: BufoProject): string {
  return join(getBufoDir(), 'sessions', project.alias);
}

/**
 * Write a file atomically: write to a tmp file in the same directory, then rename.
 */
async function atomicWrite(filePath: string, content: string): Promise<void> {
  const dir = join(filePath, '..');
  const tmp = join(dir, `.tmp-${randomUUID()}`);
  await writeFile(tmp, content, 'utf-8');
  await rename(tmp, filePath);
}

// ---------------------------------------------------------------------------
// PR Identifier Parsing
// ---------------------------------------------------------------------------

/**
 * Parse a PR identifier: GitHub URL, "org/repo#N", or bare number.
 * Returns { owner, repo, number } or throws on invalid input.
 */
export function parsePrIdentifier(
  input: string,
  project: BufoProject,
): { owner: string; repo: string; number: string } {
  // Full GitHub URL
  const urlMatch = input.match(
    /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/,
  );
  if (urlMatch) {
    return { owner: urlMatch[1], repo: urlMatch[2], number: urlMatch[3] };
  }

  // org/repo#N or just repo#N
  const repoHashMatch = input.match(/^(?:([^/#]+)\/)?([^#]+)#(\d+)$/);
  if (repoHashMatch) {
    const owner = repoHashMatch[1] || '';
    const repo = repoHashMatch[2];
    const number = repoHashMatch[3];
    return { owner, repo, number };
  }

  // Bare number — owner/repo must be resolved asynchronously by the caller
  if (/^\d+$/.test(input)) {
    return { owner: '', repo: '', number: input };
  }

  throw new Error(
    `Invalid PR identifier: ${input}\n` +
      'Formats: 123, org/repo#456, https://github.com/.../pull/789',
  );
}

/**
 * Resolve owner/repo from a git directory asynchronously.
 */
async function resolveOwnerRepo(
  dir: string,
): Promise<{ owner: string; repo: string }> {
  try {
    const { stdout } = await execa('git', ['-C', dir, 'remote', 'get-url', 'origin']);
    const match = stdout.match(/github\.com[/:]([^/]+)\/([^/.]+)/);
    if (match) {
      return { owner: match[1], repo: match[2] };
    }
  } catch {
    // ignore
  }
  return { owner: '', repo: '' };
}

/**
 * Async version of parsePrIdentifier that resolves owner/repo from git remote when needed.
 */
async function parsePrIdentifierAsync(
  input: string,
  project: BufoProject,
): Promise<{ owner: string; repo: string; number: string }> {
  const parsed = parsePrIdentifier(input, project);

  // If owner/repo are missing, resolve from project's main_repo
  if (!parsed.owner || !parsed.repo) {
    const remote = await resolveOwnerRepo(project.main_repo);
    if (!parsed.owner) parsed.owner = remote.owner;
    if (!parsed.repo) parsed.repo = remote.repo;
  }

  if (!parsed.owner || !parsed.repo) {
    throw new Error(
      `Could not determine repository for PR identifier: ${input}. ` +
        'Specify as owner/repo#N or provide a full GitHub URL.',
    );
  }

  return parsed;
}

// ---------------------------------------------------------------------------
// Fetch PR Data
// ---------------------------------------------------------------------------

/**
 * Fetch PR data for a review session via gh CLI.
 * Returns formatted string with diff, comments, and metadata.
 */
export async function fetchPrData(
  owner: string,
  repo: string,
  num: string,
  opts?: FetchOpts,
): Promise<string> {
  const { includeDiff = true, includeComments = false } = opts ?? {};
  const fullRepo = `${owner}/${repo}`;

  // Verify gh is available
  try {
    await execa('gh', ['--version']);
  } catch {
    throw new Error('gh CLI required for PR reviews. Install: brew install gh');
  }

  console.log(`${CYAN}Fetching PR #${num} from ${fullRepo}...${NC}`);

  // Get PR metadata
  let prJson: string;
  try {
    const result = await execa('gh', [
      'pr', 'view', num,
      '--repo', fullRepo,
      '--json', 'title,body,headRefName,baseRefName,additions,deletions,changedFiles,url',
    ]);
    prJson = result.stdout;
  } catch {
    throw new Error(`Could not fetch PR #${num} from ${fullRepo}`);
  }

  const pr = JSON.parse(prJson) as {
    title: string;
    body: string;
    headRefName: string;
    baseRefName: string;
    additions: number;
    deletions: number;
    changedFiles: number;
    url: string;
  };

  console.log(`  Title: ${BOLD}${pr.title}${NC}`);
  console.log(`  Files: ${pr.changedFiles} (+${pr.additions} / -${pr.deletions})`);
  console.log('');

  // Get diff and file list
  let diff = '';
  let fileList = '';
  if (includeDiff) {
    try {
      const diffResult = await execa('gh', ['pr', 'diff', num, '--repo', fullRepo]);
      diff = diffResult.stdout;
    } catch {
      diff = '(could not fetch diff)';
    }

    try {
      const filesResult = await execa('gh', [
        'pr', 'diff', num, '--repo', fullRepo, '--name-only',
      ]);
      fileList = filesResult.stdout;
    } catch {
      fileList = '(could not fetch file list)';
    }
  }

  // Get comments if requested
  let commentsSection = '';
  if (includeComments) {
    try {
      const commentsResult = await execa('gh', [
        'pr', 'view', num,
        '--repo', fullRepo,
        '--json', 'comments',
      ]);
      const commentsData = JSON.parse(commentsResult.stdout) as {
        comments: Array<{ author: { login: string }; body: string }>;
      };
      if (commentsData.comments.length > 0) {
        commentsSection = '\n## Comments\n';
        for (const c of commentsData.comments) {
          commentsSection += `\n### @${c.author.login}\n${c.body}\n`;
        }
      }
    } catch {
      // ignore comment fetch failures
    }
  }

  // Build formatted output
  let output = `# PR Review Context

## PR Information
- **Number:** #${num}
- **Repository:** ${fullRepo}
- **Title:** ${pr.title}
- **URL:** ${pr.url}
- **Changes:** ${pr.changedFiles} files (+${pr.additions} / -${pr.deletions})
`;

  if (fileList) {
    output += `\n## Files Changed\n\`\`\`\n${fileList}\n\`\`\`\n`;
  }

  if (commentsSection) {
    output += commentsSection;
  }

  if (diff) {
    output += `\n## Diff\n\`\`\`diff\n${diff}\n\`\`\`\n`;
  }

  return output;
}

// ---------------------------------------------------------------------------
// Chorus Instructions
// ---------------------------------------------------------------------------

const DEFAULT_CHORUS_CONDUCTOR_PROMPT = `## Chorus Review Protocol

You are the **CONDUCTOR** of a multi-agent code review. The singers are already running independently in adjacent panes — do NOT spawn any additional agents. Your job is to wait for all of them to finish, then validate and aggregate their findings into a final verdict.

### Your Role as Conductor:
- **Wait** for all singers to complete their independent reviews
- **Collect** findings from every singer's output file
- **Verify** each finding by tracing it to actual code
- **Resolve** disagreements between singers
- **Deliver** a final verdict with zero false positives

### Phase 1: Wait for the Singers

All singers are already running. Poll for their output files using the Read tool every ~30 seconds (up to 10 minutes).
If a file contains "Singer Failed", that singer had an error — note it and proceed without their findings.
If a file does not appear within 10 minutes, proceed without that singer's findings.

### Phase 2: Collect

Once all available singer files are present, read each one and compile all findings:
- List every finding from every singer
- Note which singers flagged each issue
- Note where singers agree and where they differ

### Phase 3: Verify

Trace each unique finding to actual code. For every claimed issue:
1. Read the relevant file at the referenced line
2. Determine if the finding is a real problem or a false positive
3. Check surrounding context and edge cases
4. When singers disagree, investigate further

**Critical Rule**: Do NOT include any finding you haven't personally verified in the code.

### Phase 4: Resolve

For each finding, document:
- What was claimed, and by which singer(s)
- What you found when you examined the code
- Your ruling: CONFIRMED / DISMISSED / NEEDS-INVESTIGATION
- Reasoning

### Phase 5: Final Verdict

Write \`review-output.md\` with:

\`\`\`markdown
# Chorus Review: PR #XXXX

## Summary
[1-2 sentence overall assessment]

## Confirmed Issues
[Issues verified by tracing code - include file:line and evidence]

## Dismissed Claims
[What singers flagged but you determined were false positives - explain why]

## Recommendations
[Actionable next steps]

## Review Record
[Which singers participated, what each found, how disagreements were resolved]
\`\`\`

### Rules:
1. **Do not spawn agents** — the singers are already running; your role is to wait and collect
2. **No false positives** — only confirm what you've verified in the code
3. **Show your work** — document how you verified each finding
4. **Cite evidence** — every confirmed issue needs file:line proof
5. **Explain dismissals** — if you reject a finding, say why`;

const DEFAULT_SINGER_PROMPT =
  'You are a reviewer agent in a bufo multi-agent code review. Read context.md for the full PR diff. Review independently for bugs, security issues, and code quality. Structure findings as Critical/Warning/Suggestion with file:line references. Save your complete findings to {output_file} when done.';

const DEFAULT_REVIEW_STANDARD_PROMPT = `## Instructions
Review this PR. Analyze the changes and:
1. First, propose logical review areas (group related files)
2. Wait for my approval on the areas
3. Then review each area, providing specific findings with file paths and line numbers
4. Generate a summary with actionable feedback
5. **IMPORTANT:** When done, save your complete review findings to \`review-output.md\` in the current directory. Include all issues found, suggestions, and your overall assessment.`;

/**
 * Build the chorus conductor instructions (uses loadPrompt with 'chorus-conductor').
 */
export async function buildChorusInstructions(
  project: BufoProject,
  singerFiles?: string[],
): Promise<string> {
  const files = singerFiles ?? ['singer-1-review.md'];

  // Build a human-readable bullet list of singer output files
  const singerBullets = files.map((f) => `- \`${f}\``).join('\n');
  const singerList = files.join(', ');

  const instructions = await loadPrompt(
    'chorus-conductor',
    DEFAULT_CHORUS_CONDUCTOR_PROMPT,
    undefined,
    project.alias,
  );

  // Inject singer file list into the prompt
  return `${instructions}\n\n### Singer Output Files\n${singerBullets}\n\nPoll for: ${singerList}`;
}

// ---------------------------------------------------------------------------
// Chorus Configuration
// ---------------------------------------------------------------------------

/**
 * Read chorus configuration from project YAML.
 * Falls back to defaults when not configured.
 */
async function getChorusConfig(project: BufoProject): Promise<ChorusConfig> {
  const configFile = join(getBufoDir(), 'projects', `${project.alias}.yaml`);

  let conductor = '';
  const singers: ChorusConfig['singers'] = [];

  try {
    const { stdout: rawConductor } = await execa('yq', [
      '-r', '.chorus.conductor // ""', configFile,
    ]);
    conductor = rawConductor.trim();

    const { stdout: countStr } = await execa('yq', [
      '-r', '.chorus.singers | length', configFile,
    ]);
    const count = parseInt(countStr.trim(), 10);

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const { stdout: sname } = await execa('yq', [
          '-r', `.chorus.singers[${i}].name // "Singer ${i + 1}"`, configFile,
        ]);
        const { stdout: stool } = await execa('yq', [
          '-r', `.chorus.singers[${i}].tool // "codex"`, configFile,
        ]);
        const { stdout: sdelay } = await execa('yq', [
          '-r', `.chorus.singers[${i}].prompt_delay // ""`, configFile,
        ]);
        singers.push({
          name: sname.trim() || `Singer ${i + 1}`,
          tool: stool.trim() || 'codex',
          prompt_delay: sdelay.trim() ? parseInt(sdelay.trim(), 10) : undefined,
        });
      }
    }
  } catch {
    // Config file missing or no chorus block — use defaults
  }

  // Defaults
  if (!conductor || conductor === 'null') {
    conductor = 'claude';
  }
  if (singers.length === 0) {
    singers.push({ name: 'Singer A', tool: 'codex' });
  }

  return { conductor, singers };
}

/**
 * Get the interactive launch command for a given AI tool.
 */
function getAiLaunchCommand(tool: string): { cmd: string; delay: number } | null {
  switch (tool) {
    case 'codex':
      return { cmd: 'codex --full-auto', delay: 15 };
    case 'gemini':
      return { cmd: 'gemini --yolo', delay: 20 };
    case 'copilot':
      return { cmd: 'copilot --allow-all', delay: 15 };
    case 'claude':
      return { cmd: 'claude --dangerously-skip-permissions', delay: 15 };
    default:
      return null;
  }
}

/**
 * Check if a command exists on PATH.
 */
async function commandExists(cmd: string): Promise<boolean> {
  try {
    await execa('which', [cmd]);
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Session YAML helpers
// ---------------------------------------------------------------------------

interface SessionYaml {
  name: string;
  project: string;
  created: string;
  last_accessed: string;
  claude_session_id: string;
  summary: string;
  type: string;
  prs: string[];
}

async function writeSessionYaml(
  sessionDir: string,
  data: SessionYaml,
): Promise<void> {
  const prsYaml = data.prs.map((pr) => `  - ${pr}`).join('\n');
  const yaml = `name: ${data.name}
project: ${data.project}
created: ${data.created}
last_accessed: ${data.last_accessed}
claude_session_id: "${data.claude_session_id}"
summary: "${data.summary}"
type: ${data.type}
prs:
${prsYaml}
`;
  await atomicWrite(join(sessionDir, 'session.yaml'), yaml);
}

// ---------------------------------------------------------------------------
// Session listing/management helpers
// ---------------------------------------------------------------------------

async function listSessions(
  project: BufoProject,
  typeFilter?: string,
): Promise<void> {
  const sessionsDir = getSessionsDir(project);
  let entries: string[];
  try {
    entries = await readdir(sessionsDir);
  } catch {
    console.log(`${YELLOW}No sessions found${NC}`);
    return;
  }

  const sessions: Array<{ name: string; type: string; created: string; summary: string }> = [];

  for (const entry of entries) {
    const sessionFile = join(sessionsDir, entry, 'session.yaml');
    if (!existsSync(sessionFile)) continue;
    try {
      const { stdout: stype } = await execa('yq', ['-r', '.type // ""', sessionFile]);
      if (typeFilter && stype.trim() !== typeFilter) continue;
      const { stdout: created } = await execa('yq', ['-r', '.created // ""', sessionFile]);
      const { stdout: summary } = await execa('yq', ['-r', '.summary // ""', sessionFile]);
      sessions.push({
        name: entry,
        type: stype.trim(),
        created: created.trim(),
        summary: summary.trim(),
      });
    } catch {
      continue;
    }
  }

  if (sessions.length === 0) {
    console.log(`${YELLOW}No ${typeFilter ?? ''} sessions found${NC}`);
    return;
  }

  console.log(`${BOLD}${typeFilter ?? 'All'} sessions:${NC}`);
  console.log('');
  for (const s of sessions) {
    const summaryStr = s.summary && s.summary !== 'null' ? ` \u2014 ${s.summary}` : '';
    console.log(`  ${CYAN}${s.name}${NC}${summaryStr}`);
    console.log(`    ${GRAY}Created: ${s.created}${NC}`);
  }
}

async function deleteSession(
  project: BufoProject,
  name: string,
): Promise<void> {
  const sessionsDir = getSessionsDir(project);
  const sessionDir = join(sessionsDir, name);
  if (!existsSync(sessionDir)) {
    console.log(`${RED}Session not found: ${name}${NC}`);
    return;
  }
  await rm(sessionDir, { recursive: true, force: true });
  console.log(`${GREEN}Deleted: ${name}${NC}`);
}

async function deleteAllSessions(
  project: BufoProject,
  typeFilter: string,
): Promise<void> {
  const sessionsDir = getSessionsDir(project);
  let entries: string[];
  try {
    entries = await readdir(sessionsDir);
  } catch {
    return;
  }

  let deleted = 0;
  for (const entry of entries) {
    if (typeFilter && !entry.startsWith(typeFilter)) continue;
    const sessionDir = join(sessionsDir, entry);
    try {
      await rm(sessionDir, { recursive: true, force: true });
      deleted++;
    } catch {
      // ignore
    }
  }
  console.log(`${GREEN}Deleted ${deleted} ${typeFilter} session(s)${NC}`);
}

async function showReviewOutput(
  project: BufoProject,
  name: string,
): Promise<void> {
  const sessionsDir = getSessionsDir(project);
  const outputFile = join(sessionsDir, name, 'review-output.md');
  try {
    const content = await readFile(outputFile, 'utf-8');
    console.log(`${BOLD}Review output for: ${name}${NC}`);
    console.log('');
    console.log(content);
  } catch {
    console.log(`${RED}No saved review output for '${name}'${NC}`);
    console.log(
      "The review hasn't been saved yet. Resume the review and ask the AI to save findings.",
    );
  }
}

// ---------------------------------------------------------------------------
// Session name resolution helpers
// ---------------------------------------------------------------------------

function resolveReviewName(
  nameOrPr: string,
  project: BufoProject,
): string {
  if (nameOrPr.startsWith('review-')) return nameOrPr;
  try {
    const parsed = parsePrIdentifier(nameOrPr, project);
    return `review-${parsed.repo || 'pr'}-${parsed.number}`;
  } catch {
    return `review-${nameOrPr}`;
  }
}

function resolveChorusName(
  nameOrPr: string,
  project: BufoProject,
): string {
  if (nameOrPr.startsWith('chorus-')) return nameOrPr;
  try {
    const parsed = parsePrIdentifier(nameOrPr, project);
    return `chorus-${parsed.repo || 'pr'}-${parsed.number}`;
  } catch {
    return `chorus-${nameOrPr}`;
  }
}

// ---------------------------------------------------------------------------
// Review Quick (single-agent review)
// ---------------------------------------------------------------------------

async function reviewQuick(
  project: BufoProject,
  prId: string,
): Promise<void> {
  const { owner, repo, number } = await parsePrIdentifierAsync(prId, project);

  const name = `review-${repo || 'pr'}-${number}`;
  const sessionsDir = getSessionsDir(project);
  const sessionDir = join(sessionsDir, name);

  // Check if session already exists
  if (existsSync(sessionDir)) {
    console.log(`${YELLOW}Review session already exists: ${name}${NC}`);
    console.log(`  Use 'bufo review resume ${name}' to resume`);
    console.log(`  Use 'bufo review delete ${name}' to delete and recreate`);
    return;
  }

  // Fetch PR data
  const reviewInstructions = await loadPrompt(
    'review-standard',
    DEFAULT_REVIEW_STANDARD_PROMPT,
    undefined,
    project.alias,
  );
  const prData = await fetchPrData(owner, repo, number);
  const context = `${prData}\n\n${reviewInstructions}\n`;

  // Create session
  await mkdir(sessionDir, { recursive: true });

  const now = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  await writeSessionYaml(sessionDir, {
    name,
    project: project.alias,
    created: now,
    last_accessed: now,
    claude_session_id: '',
    summary: '',
    type: 'review',
    prs: [prId],
  });

  await atomicWrite(join(sessionDir, 'context.md'), context);

  console.log(`${GREEN}Review session created: ${name}${NC}`);
  console.log('');
  console.log(`  ${GRAY}Resume:${NC}  bufo review resume ${name}`);
  console.log(`  ${GRAY}Output:${NC}  bufo review show ${name}`);
  console.log(`  ${GRAY}Delete:${NC}  bufo review delete ${name}`);
}

// ---------------------------------------------------------------------------
// handleReview
// ---------------------------------------------------------------------------

/**
 * Handle bufo review <subcmd> commands (new, open, list, resume, delete).
 */
export async function handleReview(
  project: BufoProject,
  args: string[],
): Promise<void> {
  const cmd = args[0] ?? '';
  const rest = args.slice(1);

  switch (cmd) {
    case '': {
      console.log(`${RED}Usage: bufo review <PR> or bufo review <subcommand>${NC}`);
      console.log('');
      console.log('Commands:');
      console.log('  bufo review <PR>       Quick single-agent review');
      console.log('  bufo review new        Interactive mode (multiple PRs + context)');
      console.log('  bufo review ls         List review sessions');
      console.log('  bufo review resume     Resume a review');
      console.log('  bufo review show       View saved review output');
      console.log('  bufo review delete     Delete a review session');
      break;
    }

    case 'new': {
      console.log(
        `${YELLOW}Interactive review creation is not yet available in the TS CLI.${NC}`,
      );
      console.log('Use: bufo review <PR> for quick single-PR review.');
      break;
    }

    case 'ls':
    case 'list': {
      await listSessions(project, 'review');
      break;
    }

    case 'resume':
    case 'continue': {
      const name = rest[0];
      if (!name) {
        console.log(`${RED}Specify review to resume${NC}`);
        console.log("Use 'bufo review ls' to see reviews");
        return;
      }
      const resolved = resolveReviewName(name, project);
      console.log(`${CYAN}To resume, open the session directory and start your AI tool:${NC}`);
      const dir = getSessionsDir(project);
      console.log(`  cd ${join(dir, resolved)}`);
      break;
    }

    case 'delete':
    case 'rm': {
      const name = rest[0];
      if (!name) {
        console.log(`${RED}Specify review to delete (or 'all' to delete all)${NC}`);
        return;
      }
      if (name === 'all') {
        await deleteAllSessions(project, 'review');
      } else {
        const resolved = resolveReviewName(name, project);
        await deleteSession(project, resolved);
      }
      break;
    }

    case 'show':
    case 'view':
    case 'output': {
      const name = rest[0];
      if (!name) {
        console.log(`${RED}Specify review to view${NC}`);
        console.log('Usage: bufo review show <name>');
        return;
      }
      const resolved = resolveReviewName(name, project);
      await showReviewOutput(project, resolved);
      break;
    }

    default: {
      // Assume it's a PR identifier
      await reviewQuick(project, cmd);
      break;
    }
  }
}

// ---------------------------------------------------------------------------
// Singer preparation
// ---------------------------------------------------------------------------

async function prepareSingers(
  project: BufoProject,
  sessionDir: string,
  config: ChorusConfig,
): Promise<SingerPrep[]> {
  const result: SingerPrep[] = [];

  for (let i = 0; i < config.singers.length; i++) {
    const singer = config.singers[i];
    const idx = i + 1;
    const outputFile = `singer-${idx}-review.md`;
    const absOutputFile = join(sessionDir, outputFile);

    // Check if tool is available
    const available = await commandExists(singer.tool);
    if (!available) {
      console.log(
        `${YELLOW}Singer tool '${singer.tool}' not found \u2014 ${singer.name} will be skipped.${NC}`,
      );
      result.push({ cmd: '', prompt: '', delay: 15 });
      continue;
    }

    // Load singer prompt (tool-specific override takes precedence)
    const sharedPrompt = await loadPrompt(
      'singer',
      DEFAULT_SINGER_PROMPT,
      { output_file: absOutputFile },
      project.alias,
    );
    const prompt = await loadPrompt(
      `singer-${singer.tool}`,
      sharedPrompt,
      { output_file: absOutputFile },
      project.alias,
    );

    // Get launch command
    const launchInfo = getAiLaunchCommand(singer.tool);
    if (!launchInfo) {
      console.log(`${YELLOW}Unknown singer tool: ${singer.tool} \u2014 skipping${NC}`);
      result.push({ cmd: '', prompt: '', delay: 15 });
      continue;
    }

    const delay = singer.prompt_delay ?? launchInfo.delay;

    // Write a runner script that handles tool exit without output
    const runnerContent = `#!/usr/bin/env bash
cd '${sessionDir}'
${launchInfo.cmd}
if [ ! -f '${absOutputFile}' ]; then
  cat > '${absOutputFile}' << 'STUB_EOF'
# ${singer.name} (${singer.tool}) \u2014 Singer Failed

The singer process exited without producing findings.
This may be a tool error or version incompatibility.
The conductor should proceed without these findings.
STUB_EOF
fi
`;
    const runnerPath = join(sessionDir, `.singer-${idx}-runner.sh`);
    await atomicWrite(runnerPath, runnerContent);
    await execa('chmod', ['+x', runnerPath]);

    result.push({
      cmd: `bash '${runnerPath}'`,
      prompt,
      delay,
    });
  }

  return result;
}

// ---------------------------------------------------------------------------
// handleChorus
// ---------------------------------------------------------------------------

/**
 * Handle bufo court/chorus commands — multi-agent review orchestration.
 * Creates conductor pane + N singer panes, each running an AI agent.
 */
export async function handleChorus(
  project: BufoProject,
  args: string[],
): Promise<void> {
  const cmd = args[0] ?? '';
  const rest = args.slice(1);

  switch (cmd) {
    case '': {
      console.log(`${RED}Usage: bufo chorus <PR> or bufo chorus <subcommand>${NC}`);
      console.log('');
      console.log(
        'Chorus review: thorough multi-agent review with a configurable conductor and 1-3 singers.',
      );
      console.log('');
      console.log('Commands:');
      console.log('  bufo chorus init        Configure singers');
      console.log('  bufo chorus <PR>        Quick chorus review for single PR');
      console.log('  bufo chorus new         Interactive mode (multiple PRs + context)');
      console.log('  bufo chorus ls          List chorus sessions');
      console.log('  bufo chorus resume      Resume a chorus session');
      console.log('  bufo chorus show        View saved chorus output');
      console.log('  bufo chorus delete      Delete a chorus session');
      break;
    }

    case 'init':
    case 'setup': {
      console.log(
        `${YELLOW}Interactive chorus configuration is not yet available in the TS CLI.${NC}`,
      );
      console.log('Edit your project YAML to add a chorus: block manually.');
      break;
    }

    case 'new': {
      console.log(
        `${YELLOW}Interactive chorus creation is not yet available in the TS CLI.${NC}`,
      );
      console.log('Use: bufo chorus <PR> for quick single-PR chorus review.');
      break;
    }

    case 'ls':
    case 'list': {
      await listSessions(project, 'chorus');
      break;
    }

    case 'resume':
    case 'continue': {
      const name = rest[0];
      if (!name) {
        console.log(`${RED}Specify chorus session to resume${NC}`);
        console.log("Use 'bufo chorus ls' to see sessions");
        return;
      }
      const resolved = resolveChorusName(name, project);
      console.log(`${CYAN}To resume, open the session directory and start your AI tool:${NC}`);
      const dir = getSessionsDir(project);
      console.log(`  cd ${join(dir, resolved)}`);
      break;
    }

    case 'show':
    case 'view':
    case 'output': {
      const name = rest[0];
      if (!name) {
        console.log(`${RED}Specify chorus session to view${NC}`);
        console.log('Usage: bufo chorus show <name>');
        return;
      }
      const resolved = resolveChorusName(name, project);
      await showReviewOutput(project, resolved);
      break;
    }

    case 'delete':
    case 'rm': {
      const name = rest[0];
      if (!name) {
        console.log(`${RED}Specify chorus session to delete (or 'all' to delete all)${NC}`);
        return;
      }
      if (name === 'all') {
        await deleteAllSessions(project, 'chorus');
      } else {
        const resolved = resolveChorusName(name, project);
        await deleteSession(project, resolved);
      }
      break;
    }

    default: {
      // Assume it's a PR identifier — run chorus review
      await chorusReview(project, cmd);
      break;
    }
  }
}

// ---------------------------------------------------------------------------
// Chorus Review (single PR quick mode)
// ---------------------------------------------------------------------------

async function chorusReview(
  project: BufoProject,
  prId: string,
): Promise<void> {
  const config = await getChorusConfig(project);

  console.log(`${CYAN}Preparing chorus review for: ${prId}${NC}`);
  console.log('');

  // Warn about missing singer tools
  for (const singer of config.singers) {
    const available = await commandExists(singer.tool);
    if (!available) {
      console.log(
        `${YELLOW}Singer tool '${singer.tool}' not found \u2014 ${singer.name} will be skipped.${NC}`,
      );
    }
  }

  const { owner, repo, number } = await parsePrIdentifierAsync(prId, project);

  const name = `chorus-${repo || 'pr'}-${number}`;
  const sessionsDir = getSessionsDir(project);
  const sessionDir = join(sessionsDir, name);

  // Check if session already exists
  if (existsSync(sessionDir)) {
    console.log(`${YELLOW}Chorus review session already exists: ${name}${NC}`);
    console.log(`  Use 'bufo chorus resume ${name}' to resume`);
    console.log(`  Use 'bufo chorus delete ${name}' to delete and recreate`);
    return;
  }

  // Build singer output filenames for the conductor prompt
  const singerFiles = config.singers.map((_, i) => `singer-${i + 1}-review.md`);

  // Fetch PR data
  const prData = await fetchPrData(owner, repo, number);

  // Build chorus instructions
  const chorusInstructions = await buildChorusInstructions(project, singerFiles);

  const context = `${prData}\n\n${chorusInstructions}\n`;

  // Create session
  await mkdir(sessionDir, { recursive: true });

  const now = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  await writeSessionYaml(sessionDir, {
    name,
    project: project.alias,
    created: now,
    last_accessed: now,
    claude_session_id: '',
    summary: '',
    type: 'chorus',
    prs: [prId],
  });

  await atomicWrite(join(sessionDir, 'context.md'), context);

  console.log(`${GREEN}Chorus review session created: ${name}${NC}`);
  console.log('');

  // Prepare singer launch scripts
  const singers = await prepareSingers(project, sessionDir, config);

  // Report what would be launched
  console.log(`  ${CYAN}Conductor:${NC} ${config.conductor}`);
  for (let i = 0; i < config.singers.length; i++) {
    const singer = config.singers[i];
    const prep = singers[i];
    const status = prep.cmd ? 'ready' : 'skipped';
    console.log(`  ${CYAN}${singer.name}:${NC} ${singer.tool} (${status})`);
  }
  console.log('');
  console.log(`  ${GRAY}Resume:${NC}  bufo chorus resume ${name}`);
  console.log(`  ${GRAY}Output:${NC}  bufo chorus show ${name}`);
  console.log(`  ${GRAY}Delete:${NC}  bufo chorus delete ${name}`);
}
