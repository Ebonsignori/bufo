import { readFile, writeFile, mkdir, rename, access } from 'fs/promises';
import { join, dirname } from 'path';
import { randomBytes } from 'crypto';

// ---------------------------------------------------------------------------
// Default prompt content — ported from src/lib/prompts.sh heredocs
// ---------------------------------------------------------------------------

const DEFAULT_PROMPTS: Record<string, string> = {
  'chorus-conductor': `## Chorus Review Protocol

You are the **CONDUCTOR** of a multi-agent code review. The singers are already running independently in adjacent panes — do NOT spawn any additional agents. Your job is to wait for all of them to finish, then validate and aggregate their findings into a final verdict.

### Your Role as Conductor:
- **Wait** for all singers to complete their independent reviews
- **Collect** findings from every singer's output file
- **Verify** each finding by tracing it to actual code
- **Resolve** disagreements between singers
- **Deliver** a final verdict with zero false positives

### Phase 1: Wait for the Singers

All singers are already running. Poll for their output files using the Read tool every ~30 seconds (up to 10 minutes). If a file contains "Singer Failed", that singer had an error — note it and proceed without their findings. If a file does not appear within 10 minutes, proceed without that singer's findings.

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
5. **Explain dismissals** — if you reject a finding, say why`,

  'singer-codex': `You are a reviewer agent in a bufo multi-agent code review. Read context.md for the full PR diff. Review independently for bugs, security issues, and code quality. Structure findings as Critical/Warning/Suggestion with file:line references. Save your complete findings to {output_file} when done.`,

  'review-standard': `## Instructions
Review this PR. Analyze the changes and:
1. First, propose logical review areas (group related files)
2. Wait for my approval on the areas
3. Then review each area, providing specific findings with file paths and line numbers
4. Generate a summary with actionable feedback
5. **IMPORTANT:** When done, save your complete review findings to \`review-output.md\` in the current directory. Include all issues found, suggestions, and your overall assessment.`,

  'review-summary': `Summarize this review session in ONE short line (under 60 chars). Format: '<main finding/status> - <key detail>'. Example: 'Found 3 issues - N+1 query, missing index, race condition'. Just output the summary, nothing else.`,

  'pr-open': `You are working on PR #{number} in {repo}.

**Title:** {title}
**URL:** {url}
**Branch:** {branch}

Fetch the PR diff using \`gh pr diff {number}\` and review the changes. Then:
1. Understand what the PR does
2. Check if there are any issues, failing tests, or incomplete work
3. Ask me how you can help (fix issues, add tests, continue implementation, etc.)

Start by reading the PR description with \`gh pr view {number}\` and the diff.`,

  'ticket-linear': `Fetch the Linear ticket {identifier} using your Linear MCP tools. Read the ticket title, description, and any relevant comments. Then:
1. Create and checkout a git branch using the ticket's suggested branch name from Linear
2. Analyze the requirements from the ticket
3. Create an implementation plan and enter plan mode for my approval before writing any code
If you need clarification on the requirements, ask me before proceeding.`,

  'ticket-github-issue': `Fetch the GitHub issue at {url} using your GitHub MCP tools. Read the issue title, description, labels, and any relevant comments. Then:
1. Create and checkout a descriptive git branch based on the issue
2. Analyze the requirements from the issue
3. Create an implementation plan and enter plan mode for my approval before writing any code
If you need clarification on the requirements, ask me before proceeding.`,

  'claude-md-team-mode': `## Team Mode

You can spawn agent teammates for complex tasks. Use the Task tool to create specialized agents (researcher, implementer, reviewer, debugger) that work in parallel. Coordinate the team, assign tasks, and synthesize results. Only spawn teams when the task benefits from parallel work.`,

  'merge-conflict': `You are resolving merge conflicts in a git repository.

Branch '{branch}' is being merged into {default_branch}. The following files have conflicts:
{files}

Commits from {branch}:
{commit_log}

For each conflicted file:
1. Read the file
2. Resolve all conflict markers (<<<<<<< ======= >>>>>>>) by keeping the intent of BOTH sides
3. Write the resolved file

Do NOT leave any conflict markers. Preserve all functionality from both branches.`,

  'wip-summary': `Based on this git diff, provide a JSON response with exactly this format (no markdown, just raw JSON):
{"slug": "short-kebab-case-name-max-30-chars", "summary": "One sentence describing the changes"}

Git diff:
{diff}`,
};

/**
 * The default prompt names (mirrors the bash defaults from prompts.sh).
 */
export const DEFAULT_PROMPT_NAMES: readonly string[] = [
  'chorus-conductor',
  'singer-codex',
  'review-standard',
  'review-summary',
  'pr-open',
  'ticket-linear',
  'ticket-github-issue',
  'claude-md-team-mode',
  'merge-conflict',
  'wip-summary',
] as const;

/**
 * Check if a file exists.
 */
async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Atomically write a file (write to tmp, then rename).
 */
async function atomicWrite(filePath: string, content: string): Promise<void> {
  const dir = dirname(filePath);
  const tmpFile = join(dir, `.tmp-${randomBytes(8).toString('hex')}`);
  await writeFile(tmpFile, content, 'utf-8');
  await rename(tmpFile, filePath);
}

/**
 * Load a prompt file with 3-tier resolution:
 *   1. ~/.bufo/projects/<alias>/prompts/<name>.md  (project-specific override)
 *   2. ~/.bufo/prompts/<name>.md                   (global user override)
 *   3. defaultContent                              (hardcoded fallback)
 *
 * Then substitute {KEY} → vars[KEY] in the resolved content.
 */
export async function loadPrompt(
  name: string,
  defaultContent: string,
  vars?: Record<string, string>,
  projectAlias?: string,
): Promise<string> {
  const configDir = join(process.env.HOME ?? '', '.bufo');
  let content: string | undefined;

  // 1. Per-project override
  if (projectAlias) {
    const projFile = join(configDir, 'projects', projectAlias, 'prompts', `${name}.md`);
    if (await fileExists(projFile)) {
      content = await readFile(projFile, 'utf-8');
    }
  }

  // 2. Global prompt file
  if (content === undefined) {
    const globalFile = join(configDir, 'prompts', `${name}.md`);
    if (await fileExists(globalFile)) {
      content = await readFile(globalFile, 'utf-8');
    }
  }

  // 3. Hardcoded default
  if (content === undefined) {
    content = defaultContent;
  }

  // Variable substitution: replace {KEY} with vars[KEY]
  if (vars) {
    for (const [key, value] of Object.entries(vars)) {
      content = content.replaceAll(`{${key}}`, value);
    }
  }

  return content;
}

/**
 * Write default prompt files to dir if they don't already exist.
 * Non-destructive — never overwrites existing files.
 */
export async function initPrompts(dir: string): Promise<void> {
  await mkdir(dir, { recursive: true });

  for (const name of DEFAULT_PROMPT_NAMES) {
    const filePath = join(dir, `${name}.md`);
    if (!(await fileExists(filePath))) {
      const content = DEFAULT_PROMPTS[name];
      if (content !== undefined) {
        await atomicWrite(filePath, content + '\n');
      }
    }
  }
}

/**
 * Get the default content for a built-in prompt by name.
 * Returns undefined if the name is not a known default prompt.
 */
export function getDefaultContent(name: string): string | undefined {
  return DEFAULT_PROMPTS[name];
}
