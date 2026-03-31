#!/usr/bin/env bash
# bufo - prompt file management
#
# All AI prompts are stored as editable markdown files in ~/.bufo/prompts/.
# Per-project overrides can be placed in ~/.bufo/projects/<alias>/prompts/.
#
# Resolution order:
#   1. ~/.bufo/projects/<alias>/prompts/<name>.md  (project override)
#   2. ~/.bufo/prompts/<name>.md                   (global)
#   3. Hardcoded default (safety fallback only — files are created at install time)

# Load a named prompt, optionally substituting {VAR} placeholders.
# Usage: load_prompt NAME DEFAULT [VAR VALUE ...]
#   NAME     — prompt file basename without .md (e.g. "pr-open")
#   DEFAULT  — hardcoded fallback string (used if no file found)
#   VAR VALUE pairs — replace {VAR} with VALUE in the loaded content
load_prompt() {
  local name="$1"
  local default="$2"
  shift 2

  local content="" file=""

  # 1. Per-project override
  if [ -n "${PROJECT_ALIAS:-}" ]; then
    local proj_file="$CONFIG_DIR/projects/$PROJECT_ALIAS/prompts/${name}.md"
    [ -f "$proj_file" ] && file="$proj_file"
  fi

  # 2. Global prompt file
  if [ -z "$file" ]; then
    local global_file="$PROMPTS_DIR/${name}.md"
    [ -f "$global_file" ] && file="$global_file"
  fi

  # 3. Hardcoded default (should not happen after install, but safe)
  if [ -z "$file" ]; then
    content="$default"
  else
    content=$(< "$file")
  fi

  # Variable substitution: remaining args are VAR VALUE pairs
  while [ $# -ge 2 ]; do
    local var="$1" val="$2"
    content="${content//\{${var}\}/${val}}"
    shift 2
  done

  printf '%s\n' "$content"
}

# Write all default prompt files to ~/.bufo/prompts/ if they don't already exist.
# Called at install time — safe to re-run (never overwrites existing files).
init_prompts() {
  mkdir -p "$PROMPTS_DIR"

  # Write a prompt file only if it doesn't already exist (preserves user edits)
  _write_prompt_if_missing() {
    local name="$1"
    local content="$2"
    local file="$PROMPTS_DIR/${name}.md"
    if [ ! -f "$file" ]; then
      printf '%s\n' "$content" > "$file"
    fi
  }

  # ---------------------------------------------------------------------------
  # README.md — directory index, written alongside the prompt files
  # ---------------------------------------------------------------------------
  _write_prompt_if_missing "README" \
'# Bufo Prompts

This directory contains the AI prompts used by bufo. Each file is plain markdown — edit any of them to change how bufo instructs the AI.

Changes take effect immediately with no restart required.

---

## Prompt files

| File | Used by | Template variables |
|---|---|---|
| `chorus-conductor.md` | `bufo chorus` — Orchestrator agent instructions | — |
| `singer.md` | `bufo chorus` — Shared reviewer agent prompt (all singers) | `{output_file}` |
| `singer-codex.md` | `bufo chorus` — Reviewer agent (Codex) prompt override | `{output_file}` |
| `review-standard.md` | `bufo review` — single-agent PR review | — |
| `review-summary.md` | `bufo review` / `bufo chorus` — auto-generated session summary | — |
| `pr-open.md` | `bufo pr <N>` — prompt sent when opening a PR workspace | `{number}` `{title}` `{url}` `{repo}` `{branch}` |
| `ticket-linear.md` | `bufo ticket <ID>` — Linear ticket workspace | `{identifier}` |
| `ticket-github-issue.md` | `bufo ticket <URL>` — GitHub issue workspace | `{url}` |
| `claude-md-team-mode.md` | All workspaces — text appended to `.claude/CLAUDE.md` | — |
| `merge-conflict.md` | `bufo merge` — AI-assisted conflict resolution | `{branch}` `{default_branch}` `{files}` `{commit_log}` |
| `wip-summary.md` | `bufo wip save` — slug/summary generation from git diff | `{diff}` |

---

## Template variables

Some prompts support `{variable}` placeholders that bufo fills in at runtime:

- **`{number}`** — PR number (e.g. `123`)
- **`{title}`** — PR or issue title
- **`{url}`** — PR or issue URL
- **`{repo}`** — repository name (e.g. `owner/repo`)
- **`{branch}`** — git branch name
- **`{identifier}`** — Linear ticket identifier (e.g. `ENG-456`)
- **`{default_branch}`** — trunk branch name (e.g. `main`)
- **`{files}`** — newline-separated list of conflicted files
- **`{commit_log}`** — one-line git log of commits being merged
- **`{diff}`** — truncated git diff output

---

## Per-project overrides

To use a different prompt for a specific project, create a file at:

```
~/.bufo/projects/<alias>/prompts/<filename>.md
```

For example, to override the PR prompt for project `@myapp`:

```
~/.bufo/projects/myapp/prompts/pr-open.md
```

Per-project files take priority over the global files in this directory. The hardcoded defaults are only used if no file exists at either location.

---

## Notes

- **`claude-md-team-mode.md`** must keep `## Team Mode` as its first heading — bufo uses it to avoid writing duplicate sections into `.claude/CLAUDE.md`.
- **`singer.md`** is the shared reviewer prompt used by all singer tools. To override for a specific tool, create `singer-codex.md`, `singer-claude.md`, etc. — tool-specific files take priority.
- **`singer-codex.md`** is passed as a single shell argument to `codex exec`. Keep it as one paragraph; line breaks are collapsed to spaces automatically.
- **`chorus-conductor.md`** defines the conductor agent instructions. The conductor waits for singers to finish, then verifies and aggregates findings.
- Running `bufo install` will create any missing prompt files but will **never overwrite** files you have edited.'

  # ---------------------------------------------------------------------------
  # chorus-conductor.md — Conductor agent instructions for bufo chorus
  # The conductor waits for all singers to finish, then verifies and aggregates.
  # ---------------------------------------------------------------------------
  _write_prompt_if_missing "chorus-conductor" \
'## Chorus Review Protocol

You are the **CONDUCTOR** of a multi-agent code review. The singers are already running independently in adjacent panes — do NOT spawn any additional agents. Your job is to wait for all of them to finish, then validate and aggregate their findings into a final verdict.

### Your Role as Conductor:
- **Wait** for all singers to complete their independent reviews
- **Collect** findings from every singer'\''s output file
- **Verify** each finding by tracing it to actual code
- **Resolve** disagreements between singers
- **Deliver** a final verdict with zero false positives

### Phase 1: Wait for the Singers

All singers are already running. Poll for their output files using the Read tool every ~30 seconds (up to 10 minutes). If a file contains "Singer Failed", that singer had an error — note it and proceed without their findings. If a file does not appear within 10 minutes, proceed without that singer'\''s findings.

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

**Critical Rule**: Do NOT include any finding you haven'\''t personally verified in the code.

### Phase 4: Resolve

For each finding, document:
- What was claimed, and by which singer(s)
- What you found when you examined the code
- Your ruling: CONFIRMED / DISMISSED / NEEDS-INVESTIGATION
- Reasoning

### Phase 5: Final Verdict

Write `review-output.md` with:

```markdown
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
```

### Rules:
1. **Do not spawn agents** — the singers are already running; your role is to wait and collect
2. **No false positives** — only confirm what you'\''ve verified in the code
3. **Show your work** — document how you verified each finding
4. **Cite evidence** — every confirmed issue needs file:line proof
5. **Explain dismissals** — if you reject a finding, say why'

  # ---------------------------------------------------------------------------
  # singer.md — Shared reviewer agent prompt for all singer tools in bufo chorus
  # Tool-specific overrides (singer-codex.md, singer-claude.md, etc.) take precedence.
  # Variable: {output_file} — absolute path where the singer should save findings
  # ---------------------------------------------------------------------------
  _write_prompt_if_missing "singer" \
'You are a reviewer agent in a bufo multi-agent code review. Read context.md for the full PR diff. Review independently for bugs, security issues, and code quality. Structure findings as Critical/Warning/Suggestion with file:line references. Save your complete findings to {output_file} when done.'

  # ---------------------------------------------------------------------------
  # singer-codex.md — Codex reviewer agent prompt for bufo chorus
  # Note: This prompt is passed as a single-line shell argument to codex exec.
  # Keep it as one paragraph — line breaks are collapsed to spaces automatically.
  # ---------------------------------------------------------------------------
  _write_prompt_if_missing "singer-codex" \
'You are a reviewer agent in a bufo multi-agent code review. Read context.md for the full PR diff. Review independently for bugs, security issues, and code quality. Structure findings as Critical/Warning/Suggestion with file:line references. Save your complete findings to {output_file} when done.'

  # ---------------------------------------------------------------------------
  # review-standard.md — Instructions for single-agent PR review (bufo review)
  # ---------------------------------------------------------------------------
  _write_prompt_if_missing "review-standard" \
'## Instructions
Review this PR. Analyze the changes and:
1. First, propose logical review areas (group related files)
2. Wait for my approval on the areas
3. Then review each area, providing specific findings with file paths and line numbers
4. Generate a summary with actionable feedback
5. **IMPORTANT:** When done, save your complete review findings to `review-output.md` in the current directory. Include all issues found, suggestions, and your overall assessment.'

  # ---------------------------------------------------------------------------
  # review-summary.md — Prompt used to auto-generate a one-line session summary
  # ---------------------------------------------------------------------------
  _write_prompt_if_missing "review-summary" \
"Summarize this review session in ONE short line (under 60 chars). Format: '<main finding/status> - <key detail>'. Example: 'Found 3 issues - N+1 query, missing index, race condition'. Just output the summary, nothing else."

  # ---------------------------------------------------------------------------
  # pr-open.md — Prompt sent when opening a PR workspace (bufo pr <N>)
  # Variables: {number}, {repo}, {title}, {url}, {branch}
  # ---------------------------------------------------------------------------
  _write_prompt_if_missing "pr-open" \
'You are working on PR #{number} in {repo}.

**Title:** {title}
**URL:** {url}
**Branch:** {branch}

Fetch the PR diff using `gh pr diff {number}` and review the changes. Then:
1. Understand what the PR does
2. Check if there are any issues, failing tests, or incomplete work
3. Ask me how you can help (fix issues, add tests, continue implementation, etc.)

Start by reading the PR description with `gh pr view {number}` and the diff.'

  # ---------------------------------------------------------------------------
  # ticket-linear.md — Prompt sent when opening a Linear ticket workspace
  # Variables: {identifier}
  # ---------------------------------------------------------------------------
  _write_prompt_if_missing "ticket-linear" \
'Fetch the Linear ticket {identifier} using your Linear MCP tools. Read the ticket title, description, and any relevant comments. Then:
1. Create and checkout a git branch using the ticket'\''s suggested branch name from Linear
2. Analyze the requirements from the ticket
3. Create an implementation plan and enter plan mode for my approval before writing any code
If you need clarification on the requirements, ask me before proceeding.'

  # ---------------------------------------------------------------------------
  # ticket-github-issue.md — Prompt sent when opening a GitHub issue workspace
  # Variables: {url}
  # ---------------------------------------------------------------------------
  _write_prompt_if_missing "ticket-github-issue" \
'Fetch the GitHub issue at {url} using your GitHub MCP tools. Read the issue title, description, labels, and any relevant comments. Then:
1. Create and checkout a descriptive git branch based on the issue
2. Analyze the requirements from the issue
3. Create an implementation plan and enter plan mode for my approval before writing any code
If you need clarification on the requirements, ask me before proceeding.'

  # ---------------------------------------------------------------------------
  # claude-md-team-mode.md — Text appended to .claude/CLAUDE.md in each workspace
  # IMPORTANT: Keep "## Team Mode" as the first heading — bufo uses it as a
  # sentinel to avoid appending duplicate sections to CLAUDE.md.
  # ---------------------------------------------------------------------------
  _write_prompt_if_missing "claude-md-team-mode" \
'## Team Mode

You can spawn agent teammates for complex tasks. Use the Task tool to create specialized agents (researcher, implementer, reviewer, debugger) that work in parallel. Coordinate the team, assign tasks, and synthesize results. Only spawn teams when the task benefits from parallel work.'

  # ---------------------------------------------------------------------------
  # merge-conflict.md — Prompt for AI-assisted merge conflict resolution
  # Variables: {branch}, {default_branch}, {files}, {commit_log}
  # ---------------------------------------------------------------------------
  _write_prompt_if_missing "merge-conflict" \
"You are resolving merge conflicts in a git repository.

Branch '{branch}' is being merged into {default_branch}. The following files have conflicts:
{files}

Commits from {branch}:
{commit_log}

For each conflicted file:
1. Read the file
2. Resolve all conflict markers (<<<<<<< ======= >>>>>>>) by keeping the intent of BOTH sides
3. Write the resolved file

Do NOT leave any conflict markers. Preserve all functionality from both branches."

  # ---------------------------------------------------------------------------
  # wip-summary.md — Prompt for generating a slug/summary from a git diff
  # Variables: {diff}
  # ---------------------------------------------------------------------------
  _write_prompt_if_missing "wip-summary" \
'Based on this git diff, provide a JSON response with exactly this format (no markdown, just raw JSON):
{"slug": "short-kebab-case-name-max-30-chars", "summary": "One sentence describing the changes"}

Git diff:
{diff}'
}
