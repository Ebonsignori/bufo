#!/usr/bin/env bash
# bufo - PR review and chorus review commands

# =============================================================================
# Review Commands (Sugar for Sessions)
# =============================================================================

# Parse PR identifier: number, repo#number, or full URL
# Returns: owner repo number
parse_pr_identifier() {
  local pr_id="$1"
  local owner=""
  local repo=""
  local number=""

  if [[ "$pr_id" =~ ^https://github\.com/([^/]+)/([^/]+)/pull/([0-9]+) ]]; then
    # Full URL
    owner="${BASH_REMATCH[1]}"
    repo="${BASH_REMATCH[2]}"
    number="${BASH_REMATCH[3]}"
  elif [[ "$pr_id" =~ ^([^#]+)#([0-9]+)$ ]]; then
    # repo#number format (submodule)
    repo="${BASH_REMATCH[1]}"
    number="${BASH_REMATCH[2]}"
    # Try to get owner from git remote
    owner=$(git remote get-url origin 2>/dev/null | sed -n 's|.*github\.com[:/]\([^/]*\)/.*|\1|p')
  elif [[ "$pr_id" =~ ^[0-9]+$ ]]; then
    # Just a number - use current project's main repo
    number="$pr_id"
    if [ -n "$MAIN_REPO" ]; then
      local remote_url=$(cd "$MAIN_REPO" && git remote get-url origin 2>/dev/null)
      if [[ "$remote_url" =~ github\.com[:/]([^/]+)/([^/.]+) ]]; then
        owner="${BASH_REMATCH[1]}"
        repo="${BASH_REMATCH[2]}"
      fi
    fi
  fi

  echo "$owner $repo $number"
}

# Get chorus instructions for the conductor pattern.
# Usage: get_chorus_instructions [singer_files_list]
#   singer_files_list: space-separated output filenames, e.g. "singer-1-review.md singer-2-review.md"
#   Defaults to the legacy "singer-1-review.md" when not supplied.
get_chorus_instructions() {
  local singer_files="${1:-singer-1-review.md}"

  # Build a human-readable bullet list of singer output files for the prompt
  local singer_bullets=""
  for f in $singer_files; do
    singer_bullets+="- \`$f\`"$'\n'
  done
  # Also expose as comma list for the "poll" phrase
  local singer_list
  singer_list=$(echo "$singer_files" | tr ' ' '\n' | paste -sd ', ' -)

  # Customize: ~/.bufo/prompts/chorus-conductor.md
  local default
  IFS= read -r -d '' default << CHORUS_EOF || true

## Chorus Review Protocol

You are the **CONDUCTOR** of a multi-agent code review. The singers are already running independently in adjacent panes — do NOT spawn any additional agents. Your job is to wait for all of them to finish, then validate and aggregate their findings into a final verdict.

### Your Role as Conductor:
- **Wait** for all singers to complete their independent reviews
- **Collect** findings from every singer's output file
- **Verify** each finding by tracing it to actual code
- **Resolve** disagreements between singers
- **Deliver** a final verdict with zero false positives

### Phase 1: Wait for the Singers

All singers are already running. Poll for their output files using the Read tool every ~30 seconds (up to 10 minutes):
${singer_bullets}
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
5. **Explain dismissals** — if you reject a finding, say why
CHORUS_EOF
  load_prompt "chorus-conductor" "$default"
}

# Filter a file list by review.ignore_files patterns
# Reads patterns from config, removes matching files
# Returns: filtered file list on stdout, sets _IGNORED_COUNT
_filter_file_list() {
  local file_list="$1"
  _IGNORED_COUNT=0

  # Read ignore patterns from config
  local patterns=()
  if [ -f "${CONFIG_FILE:-}" ]; then
    while IFS= read -r pattern; do
      [ -n "$pattern" ] && patterns+=("$pattern")
    done < <(yq -r '.review.ignore_files // [] | .[]' "$CONFIG_FILE" 2>/dev/null)
  fi

  # No patterns? Return as-is
  if [ ${#patterns[@]} -eq 0 ]; then
    echo "$file_list"
    return
  fi

  local filtered=""
  while IFS= read -r filepath; do
    [ -z "$filepath" ] && continue
    local basename="${filepath##*/}"
    local skip=false
    for pattern in "${patterns[@]}"; do
      # shellcheck disable=SC2254
      if [[ "$basename" == $pattern ]]; then
        skip=true
        break
      fi
    done
    if [ "$skip" = true ]; then
      _IGNORED_COUNT=$((_IGNORED_COUNT + 1))
    else
      filtered+="$filepath"$'\n'
    fi
  done <<< "$file_list"

  # Remove trailing newline
  echo -n "$filtered"
}

# Filter a unified diff by review.ignore_files patterns
# Removes entire file sections where the path matches an ignore pattern
_filter_diff() {
  local diff="$1"

  # Read ignore patterns from config
  local patterns=()
  if [ -f "${CONFIG_FILE:-}" ]; then
    while IFS= read -r pattern; do
      [ -n "$pattern" ] && patterns+=("$pattern")
    done < <(yq -r '.review.ignore_files // [] | .[]' "$CONFIG_FILE" 2>/dev/null)
  fi

  # No patterns? Return as-is
  if [ ${#patterns[@]} -eq 0 ]; then
    echo "$diff"
    return
  fi

  local output=""
  local skip=false
  while IFS= read -r line; do
    # Check for new file section
    if [[ "$line" == diff\ --git\ * ]]; then
      # Extract file path from "diff --git a/path b/path"
      local filepath="${line#diff --git a/}"
      filepath="${filepath%% b/*}"
      local basename="${filepath##*/}"
      skip=false
      for pattern in "${patterns[@]}"; do
        # shellcheck disable=SC2254
        if [[ "$basename" == $pattern ]]; then
          skip=true
          break
        fi
      done
    fi
    if [ "$skip" = false ]; then
      output+="$line"$'\n'
    fi
  done <<< "$diff"

  # Remove trailing newline
  echo -n "$output"
}

# Fetch PR data using gh CLI
# mode: "standard" (default) or "chorus"
# singer_files: space-separated list of output filenames (chorus mode only)
fetch_pr_data() {
  local owner="$1"
  local repo="$2"
  local number="$3"
  local mode="${4:-standard}"
  local singer_files="${5:-}"

  if ! command_exists gh; then
    error "gh CLI required for PR reviews"
    echo "Install: brew install gh"
    return 1
  fi

  local full_repo="$owner/$repo"

  echo -e "${CYAN}Fetching PR #$number from $full_repo...${NC}"

  # Get PR metadata
  local pr_json=$(gh pr view "$number" --repo "$full_repo" --json title,body,headRefName,baseRefName,additions,deletions,changedFiles,url 2>/dev/null)
  if [ -z "$pr_json" ]; then
    error "Could not fetch PR #$number from $full_repo"
    return 1
  fi

  local title=$(echo "$pr_json" | jq -r '.title')
  local additions=$(echo "$pr_json" | jq -r '.additions')
  local deletions=$(echo "$pr_json" | jq -r '.deletions')
  local files=$(echo "$pr_json" | jq -r '.changedFiles')
  local url=$(echo "$pr_json" | jq -r '.url')

  echo -e "  Title: ${BOLD}$title${NC}"
  echo -e "  Files: $files (+$additions / -$deletions)"
  echo ""

  # Get diff and file list
  local diff=$(gh pr diff "$number" --repo "$full_repo" 2>/dev/null)
  local file_list=$(gh pr diff "$number" --repo "$full_repo" --name-only 2>/dev/null)

  # Filter ignored files from review
  _IGNORED_COUNT=0
  file_list=$(_filter_file_list "$file_list")
  local ignored_count=$_IGNORED_COUNT
  diff=$(_filter_diff "$diff")

  if [ "$ignored_count" -gt 0 ]; then
    echo -e "  ${GRAY}Filtered $ignored_count ignored file(s) from review${NC}"
  fi

  # Get instructions based on mode
  local instructions=""
  if [ "$mode" = "chorus" ]; then
    instructions=$(get_chorus_instructions "${singer_files:-}")
  else
    local default_instructions
    default_instructions=$(cat << REVIEW_INSTRUCTIONS_EOF
## Instructions
Review this PR. Analyze the changes and:
1. First, propose logical review areas (group related files)
2. Wait for my approval on the areas
3. Then review each area, providing specific findings with file paths and line numbers
4. Generate a summary with actionable feedback
5. **IMPORTANT:** When done, save your complete review findings to \`review-output.md\` in the current directory. Include all issues found, suggestions, and your overall assessment.
REVIEW_INSTRUCTIONS_EOF
)
    instructions=$(load_prompt "review-standard" "$default_instructions")
  fi

  # Build ignored files note
  local ignored_note=""
  if [ "$ignored_count" -gt 0 ]; then
    ignored_note="- **Filtered:** $ignored_count file(s) excluded by review.ignore_files"
  fi

  # Return as structured output
  cat << EOF
# PR Review Context

## PR Information
- **Number:** #$number
- **Repository:** $full_repo
- **Title:** $title
- **URL:** $url
- **Changes:** $files files (+$additions / -$deletions)
${ignored_note:+$ignored_note}

## Files Changed
\`\`\`
$file_list
\`\`\`

$instructions

## Diff
\`\`\`diff
$diff
\`\`\`
EOF
}

# Extract ticket info from a PR (branch name, body, comments)
# Sets globals: _TICKET_ID, _TICKET_URL
_extract_pr_ticket_info() {
  local owner="$1"
  local repo="$2"
  local number="$3"
  local full_repo="$owner/$repo"

  _TICKET_ID=""
  _TICKET_URL=""

  local pr_extra
  pr_extra=$(gh pr view "$number" --repo "$full_repo" --json headRefName,body,comments 2>/dev/null)
  [ -n "$pr_extra" ] || return 0

  local branch
  branch=$(echo "$pr_extra" | jq -r '.headRefName // ""')
  [ -n "$branch" ] && _TICKET_ID=$(extract_ticket_from_branch "$branch")

  _TICKET_URL=$(extract_linear_url_from_body "$(echo "$pr_extra" | jq -r '.body // ""')")

  # Fall back to PR comments (Linear bot often comments with ticket link)
  if [ -z "$_TICKET_URL" ]; then
    local comments
    comments=$(echo "$pr_extra" | jq -r '[.comments[].body // empty] | join("\n")')
    [ -n "$comments" ] && _TICKET_URL=$(extract_linear_url_from_body "$comments")
  fi

  # If we found a URL but no ticket ID from branch, extract from the URL
  if [ -z "$_TICKET_ID" ] && [ -n "$_TICKET_URL" ]; then
    _TICKET_ID=$(echo "$_TICKET_URL" | grep -oE '/[A-Z][A-Z0-9_]*-[0-9]+' | head -1 | tr -d '/')
  fi
}

# Start a new review - interactive mode
review_new_interactive() {
  echo -e "${BOLD}Creating new review session${NC}"
  echo ""

  # Get session name
  local name=""
  read -p "Session name: " name
  [ -z "$name" ] && { error "Name required"; return 1; }

  # Collect PRs
  local prs=()
  echo ""
  echo "Add PRs (empty line when done):"
  while true; do
    read -p "> " pr_input
    [ -z "$pr_input" ] && break
    prs+=("$pr_input")
  done

  if [ ${#prs[@]} -eq 0 ]; then
    error "At least one PR required"
    return 1
  fi

  # Collect context
  echo ""
  echo "Context (optional, empty line when done):"
  local context_lines=()
  while true; do
    read -p "> " context_line
    [ -z "$context_line" ] && break
    context_lines+=("$context_line")
  done

  # Build context document
  local context="# Review Session: $name"$'\n\n'

  # Add user context if provided
  if [ ${#context_lines[@]} -gt 0 ]; then
    context+="## Context"$'\n'
    for line in "${context_lines[@]}"; do
      context+="$line"$'\n'
    done
    context+=$'\n'
  fi

  # Fetch and append PR data
  context+="## Pull Requests"$'\n\n'

  for pr_id in "${prs[@]}"; do
    local parsed=($(parse_pr_identifier "$pr_id"))
    local owner="${parsed[0]}"
    local repo="${parsed[1]}"
    local number="${parsed[2]}"

    if [ -z "$number" ]; then
      warn "Could not parse PR: $pr_id"
      continue
    fi

    local pr_data=$(fetch_pr_data "$owner" "$repo" "$number")
    context+="$pr_data"$'\n\n'
    context+="---"$'\n\n'
  done

  # Create session
  local sessions_dir=$(get_sessions_dir)
  local session_dir="$sessions_dir/$name"
  mkdir -p "$session_dir"

  # Write session metadata
  cat > "$session_dir/session.yaml" << EOF
name: $name
project: ${PROJECT_ALIAS:-default}
created: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
last_accessed: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
claude_session_id: ""
summary: ""
type: review
prs:
$(for pr in "${prs[@]}"; do echo "  - $pr"; done)
EOF

  # Write context
  echo "$context" > "$session_dir/context.md"

  echo ""
  echo -e "${GREEN}Review session created: $name${NC}"
  echo -e "Context written to: $session_dir/context.md"
  echo ""

  # Write metadata for info bar
  _write_session_meta "$session_dir" "$name" "review"

  # Start AI tool in iTerm2 layout
  read -p "Start review now? [Y/n] " start_now
  if [[ ! "$start_now" =~ ^[Nn]$ ]]; then
    session_update "$name" "last_accessed" "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
    local ai_cmd; ai_cmd="$(get_ai_interactive_cmd)"
    _open_session_layout "$name" "$session_dir" "$ai_cmd"
    ( sleep 5 && iterm_send_text "$LAYOUT_MAIN_SID" "Read context.md and begin the review." ) &
  fi

  echo ""
  echo -e "  ${GRAY}Resume:${NC}  bufo review resume $name"
  echo -e "  ${GRAY}Output:${NC}  bufo review show $name"
  echo -e "  ${GRAY}Delete:${NC}  bufo review delete $name"
}

# Prompt for review summary with auto-generate option
_prompt_review_summary() {
  local name="$1"
  echo ""
  echo "Save a summary for this review?"
  echo "  [a] Auto-generate (Claude summarizes)"
  echo "  [m] Manual (type your own)"
  echo "  [s] Skip"
  read -p "Choice [a/m/s]: " choice

  case "$choice" in
    a|A|"")
      echo -e "${CYAN}Generating summary...${NC}"
      local default_review_prompt="Summarize this review session in ONE short line (under 60 chars). Format: '<main finding/status> - <key detail>'. Example: 'Found 3 issues - N+1 query, missing index, race condition'. Just output the summary, nothing else."
      local review_prompt
      review_prompt=$(load_prompt "review-summary" "$default_review_prompt")
      local summary=$(echo "$review_prompt" | ai_run_print | tail -1)
      if [ -n "$summary" ]; then
        # Clean up the summary (remove quotes if present)
        summary="${summary#\"}"
        summary="${summary%\"}"
        session_update "$name" "summary" "$summary"
        echo -e "Summary: ${GREEN}$summary${NC}"
      else
        echo -e "${YELLOW}Could not generate summary${NC}"
      fi
      ;;
    m|M)
      read -p "Summary: " summary
      if [ -n "$summary" ]; then
        session_update "$name" "summary" "$summary"
        success "Summary saved"
      fi
      ;;
    *)
      echo "Skipped"
      ;;
  esac
}

# Quick review - single PR (standard single-agent review)
review_quick() {
  local pr_id="$1"

  local parsed=($(parse_pr_identifier "$pr_id"))
  local owner="${parsed[0]}"
  local repo="${parsed[1]}"
  local number="${parsed[2]}"

  if [ -z "$number" ]; then
    error "Could not parse PR identifier: $pr_id"
    echo "Formats: 3230, repo#456, https://github.com/.../pull/123"
    return 1
  fi

  local name="review-${repo:-pr}-$number"

  # Check if session already exists
  local sessions_dir=$(get_sessions_dir)
  if [ -d "$sessions_dir/$name" ]; then
    echo -e "${YELLOW}Review session already exists: $name${NC}"
    echo "  [r] Resume   [d] Delete & recreate   [q] Quit"
    read -p "Choice [r/d/q]: " choice
    case "$choice" in
      d|D)
        rm -rf "$sessions_dir/$name"
        echo -e "${GREEN}Deleted: $name${NC}"
        echo ""
        ;;
      q|Q|n|N)
        return 1
        ;;
      *)
        session_resume "$name"
        return
        ;;
    esac
  fi

  # Fetch PR data
  local context=$(fetch_pr_data "$owner" "$repo" "$number" "standard")
  [ $? -eq 0 ] || return 1

  # Create session
  local session_dir="$sessions_dir/$name"
  mkdir -p "$session_dir"

  cat > "$session_dir/session.yaml" << EOF
name: $name
project: ${PROJECT_ALIAS:-default}
created: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
last_accessed: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
claude_session_id: ""
summary: ""
type: review
prs:
  - $pr_id
EOF

  echo "$context" > "$session_dir/context.md"

  echo -e "${GREEN}Review session created: $name${NC}"
  echo ""

  # Write metadata for info bar (including ticket info from PR)
  local pr_title=$(echo "$context" | grep -m1 '\*\*Title:\*\*' | sed 's/.*\*\*Title:\*\* //')
  local pr_url=$(echo "$context" | grep -m1 '\*\*URL:\*\*' | sed 's/.*\*\*URL:\*\* //')
  _extract_pr_ticket_info "$owner" "$repo" "$number"
  local meta_args=("$session_dir" "$name" "review" \
    "pr_number" "$number" \
    "pr_url" "$pr_url" \
    "pr_title" "$pr_title")
  [ -n "$_TICKET_ID" ] && meta_args+=("ticket" "$_TICKET_ID")
  [ -n "$_TICKET_URL" ] && meta_args+=("ticket_url" "$_TICKET_URL")
  _write_session_meta "${meta_args[@]}"

  # Start AI tool in iTerm2 layout
  session_update "$name" "last_accessed" "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  local ai_cmd; ai_cmd="$(get_ai_interactive_cmd)"
  _open_session_layout "$name" "$session_dir" "$ai_cmd"
  ( sleep 5 && iterm_send_text "$LAYOUT_MAIN_SID" "Read context.md and begin the review." ) &

  echo ""
  echo -e "  ${GRAY}Resume:${NC}  bufo review resume $name"
  echo -e "  ${GRAY}Output:${NC}  bufo review show $name"
  echo -e "  ${GRAY}Delete:${NC}  bufo review delete $name"
}

# Show chorus intro animation.
# Reads CHORUS_CONDUCTOR, CHORUS_SINGER_NAMES[], CHORUS_SINGER_TOOLS[] globals
# set by _get_chorus_config before calling.
_show_chorus_intro() {
  # 256-color green/teal gradient tones
  local C1='\033[38;5;71m'   # medium green
  local C2='\033[38;5;77m'   # bright green
  local C3='\033[38;5;114m'  # light green
  local C4='\033[38;5;151m'  # pale green
  local DIM='\033[2m'
  local RST='\033[0m'
  local colors=("$C2" "$C3" "$C4")

  echo ""
  # FIGlet-style banner - "CHORUS" (no box - cleaner look)
  echo -e "${C1}██████╗ ██╗  ██╗ ██████╗ ██████╗ ██╗   ██╗███████╗${RST}"
  echo -e "${C2}██╔════╝██║  ██║██╔═══██╗██╔══██╗██║   ██║██╔════╝${RST}"
  echo -e "${C2}██║     ███████║██║   ██║██████╔╝██║   ██║███████╗${RST}"
  echo -e "${C3}██║     ██╔══██║██║   ██║██╔══██╗██║   ██║╚════██║${RST}"
  echo -e "${C3}╚██████╗██║  ██║╚██████╔╝██║  ██║╚██████╔╝███████║${RST}"
  echo -e "${C4}╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝${RST}"
  echo ""
  # Bufo conductor — open mouth singing
  # ◎ is double-width (2 cols), （）are double-width (2 cols each)
  # Left notes use fixed-width prefix so frog stays at col 18
  echo -e "          ${C4}♩${RST}       ${C2} ◎ , ◎ ${RST}   ${C3}♪${RST}"
  echo -e "   ${C3}♪${RST}              ${C2}（ o  ）${RST}  ${C1}♫${RST}"
  echo -e "       ${C1}♫${RST}          ${C3}/(    )\\\\${RST}      ${C4}♬${RST}"
  echo ""
  echo -e "            ${DIM}\"All voices in harmony!\"${RST}"
  echo ""

  # Dynamic singer boxes based on configured singers
  local sv_count="${#CHORUS_SINGER_NAMES[@]}"
  if [ "$sv_count" -gt 0 ]; then
    local conductor_str
    conductor_str=$(printf '%-11s' "$(echo "$CHORUS_CONDUCTOR" | tr '[:lower:]' '[:upper:]')")
    local row_top="  " row_mid1="  " row_mid2="  " row_bot="  "
    # Conductor box first
    row_top+="${C1}┌─────────────┐${RST}  "
    row_mid1+="${C1}│ ${conductor_str} │${RST}  "
    row_mid2+="${C1}│ CONDUCTOR   │${RST}  "
    row_bot+="${C1}└─────────────┘${RST}  "
    for i in "${!CHORUS_SINGER_NAMES[@]}"; do
      local sname="${CHORUS_SINGER_NAMES[$i]}"
      local stool="${CHORUS_SINGER_TOOLS[$i]:-codex}"
      local col="${colors[$i]:-$C4}"
      # Pad to 11 chars inside the box (13 wide including borders)
      local tool_str
      tool_str=$(printf '%-11s' "$(echo "$stool" | tr '[:lower:]' '[:upper:]')")
      local name_str
      name_str=$(printf '%-11s' "$sname")
      row_top+="${col}┌─────────────┐${RST}  "
      row_mid1+="${col}│ ${tool_str} │${RST}  "
      row_mid2+="${col}│ ${name_str} │${RST}  "
      row_bot+="${col}└─────────────┘${RST}  "
    done
    echo -e "$row_top"
    echo -e "$row_mid1"
    echo -e "$row_mid2"
    echo -e "$row_bot"
  else
    # Fallback: legacy hardcoded display
    echo -e "                  ${C2}┌─────────────┐${RST}           ${C3}┌─────────────┐${RST}"
    echo -e "                  ${C2}│   Claude    │${RST}    vs     ${C3}│    Codex    │${RST}"
    echo -e "                  ${C2}│   Singer A  │${RST}           ${C3}│   Singer B  │${RST}"
    echo -e "                  ${C2}└─────────────┘${RST}           ${C3}└─────────────┘${RST}"
  fi

  echo ""
  echo -e "  ${DIM}How this works:${RST}"
  echo ""
  echo -e "    ${C1}1.${RST} Assemble    ${DIM}Conductor assembles the singers${RST}"
  echo -e "    ${C2}2.${RST} Sing        ${DIM}All singers analyze the PR separately${RST}"
  echo -e "    ${C3}3.${RST} Solo        ${DIM}Conductor takes in notes from each singer${RST}"
  echo -e "    ${C4}4.${RST} Modulate    ${DIM}Conductor traces each note to actual code${RST}"
  echo -e "    ${C1}5.${RST} Harmonize   ${DIM}Resolve disagreements, rule on each note${RST}"
  echo -e "    ${C2}6.${RST} Song        ${DIM}Final results — wrong notes smoothed out${RST}"
  echo ""
  echo -e "  ${CYAN}Fetching PR data...${NC}"
  echo ""
}

# =============================================================================
# Chorus Configuration
# =============================================================================

# Read chorus config from project YAML into globals.
# Sets: CHORUS_CONDUCTOR, CHORUS_SINGER_NAMES[], CHORUS_SINGER_TOOLS[]
# Falls back to legacy defaults (claude conductor + 1 codex singer) when not configured.
_get_chorus_config() {
  CHORUS_CONDUCTOR=""
  CHORUS_SINGER_NAMES=()
  CHORUS_SINGER_TOOLS=()
  CHORUS_SINGER_DELAYS=()

  if [ -f "${CONFIG_FILE:-}" ]; then
    CHORUS_CONDUCTOR=$(yq -r '.chorus.conductor // ""' "$CONFIG_FILE" 2>/dev/null || echo "")
    local count
    count=$(yq -r '.chorus.singers | length' "$CONFIG_FILE" 2>/dev/null || echo "0")
    if [ "$count" -gt 0 ] 2>/dev/null; then
      local i
      for (( i=0; i<count; i++ )); do
        local sname stool sdelay
        sname=$(yq -r ".chorus.singers[$i].name // \"Singer $((i+1))\"" "$CONFIG_FILE" 2>/dev/null || echo "Singer $((i+1))")
        stool=$(yq -r ".chorus.singers[$i].tool // \"codex\"" "$CONFIG_FILE" 2>/dev/null || echo "codex")
        sdelay=$(yq -r ".chorus.singers[$i].prompt_delay // \"\"" "$CONFIG_FILE" 2>/dev/null || echo "")
        CHORUS_SINGER_NAMES+=("$sname")
        CHORUS_SINGER_TOOLS+=("$stool")
        CHORUS_SINGER_DELAYS+=("$sdelay")
      done
    fi
  fi

  # Defaults when no chorus config exists
  if [ -z "$CHORUS_CONDUCTOR" ] || [ "$CHORUS_CONDUCTOR" = "null" ]; then
    CHORUS_CONDUCTOR="$(get_ai_tool)"
  fi
  if [ "${#CHORUS_SINGER_NAMES[@]}" -eq 0 ]; then
    CHORUS_SINGER_NAMES=("Singer A")
    CHORUS_SINGER_TOOLS=("codex")
    CHORUS_SINGER_DELAYS=("")
  fi
}

# Prepare all singer commands and prompts for a chorus session.
# Usage: _prepare_singers <session_dir>
# Must be called directly (not in a subshell) — populates globals:
#   SINGER_CMDS[]    — pane launch command for each singer (bash runner path)
#   SINGER_PROMPTS[] — opening prompt to send each singer after it starts
# Uses: CHORUS_SINGER_TOOLS[], CHORUS_SINGER_NAMES[] (set by _get_chorus_config)
_prepare_singers() {
  local session_dir="${1:-.}"
  SINGER_CMDS=()
  SINGER_PROMPTS=()
  SINGER_DELAYS=()

  local i
  for (( i=0; i<${#CHORUS_SINGER_TOOLS[@]}; i++ )); do
    local tool="${CHORUS_SINGER_TOOLS[$i]}"
    local name="${CHORUS_SINGER_NAMES[$i]}"
    local idx="$((i+1))"
    local output_file="singer-${idx}-review.md"

    if ! command_exists "$tool"; then
      SINGER_CMDS+=("")
      SINGER_PROMPTS+=("")
      SINGER_DELAYS+=("15")
      continue
    fi

    local shared_default="You are a reviewer agent in a bufo multi-agent code review. Read context.md for the full PR diff. Review independently for bugs, security issues, and code quality. Structure findings as Critical/Warning/Suggestion with file:line references. Save your complete findings to {output_file} when done."
    local default
    default=$(load_prompt "singer" "$shared_default" "output_file" "${session_dir}/${output_file}")
    local prompt
    prompt=$(load_prompt "singer-${tool}" "$default" "output_file" "${session_dir}/${output_file}")
    SINGER_PROMPTS+=("$prompt")

    # Interactive launch command — tool opens interactively, prompt sent after startup
    local launch_cmd
    local prompt_delay
    case "$tool" in
      codex)   launch_cmd="codex --full-auto";                     prompt_delay=15 ;;
      gemini)  launch_cmd="gemini --yolo";                         prompt_delay=20 ;;
      copilot) launch_cmd="copilot --allow-all";                   prompt_delay=15 ;;
      claude)  launch_cmd="claude --dangerously-skip-permissions";  prompt_delay=15 ;;
      *)
        warn "Unknown singer tool: $tool — skipping"
        SINGER_CMDS+=("")
        SINGER_PROMPTS+=("")
        SINGER_DELAYS+=("15")
        continue
        ;;
    esac
    # Per-singer YAML override takes precedence over the tool default
    local configured_delay="${CHORUS_SINGER_DELAYS[$i]:-}"
    if [ -n "$configured_delay" ] && [ "$configured_delay" != "null" ]; then
      prompt_delay="$configured_delay"
    fi

    # Write a stub runner: after the interactive session exits, write a failure
    # stub if the output file was never produced (tool crashed or was killed).
    local abs_session_dir
    abs_session_dir=$(cd "$session_dir" && pwd)
    local abs_output="${abs_session_dir}/${output_file}"
    local runner_file="${abs_session_dir}/.singer-${idx}-runner.sh"
    cat > "$runner_file" << RUNNER_EOF
#!/usr/bin/env bash
cd '$abs_session_dir'
$launch_cmd
if [ ! -f '$abs_output' ]; then
  cat > '$abs_output' << 'STUB_EOF'
# ${name} (${tool}) — Singer Failed

The singer process exited without producing findings.
This may be a tool error or version incompatibility.
The conductor should proceed without these findings.
STUB_EOF
fi
RUNNER_EOF
    chmod +x "$runner_file"
    SINGER_CMDS+=("bash '$runner_file'")
    SINGER_DELAYS+=("$prompt_delay")
  done
}

# Open a chorus layout optimised for 1–3 singers.
#
# The conductor always gets the larger left pane.  Singers share the right side
# with no wasted terminal pane:
#
#  1 singer                2 singers               3 singers
#  ┌──────────┬─────────┐  ┌──────────┬─────────┐  ┌───────────────────────┐
#  │          │         │  │          │ SINGER1 │  │      CONDUCTOR        │
#  │ CONDUCTOR│ SINGER1 │  │ CONDUCTOR├─────────┤  ├────────┬──────┬───────┤
#  │          │         │  │          │ SINGER2 │  │SINGER1 │SING2 │SINGER3│
#  ├──────────┴─────────┤  ├──────────┴─────────┤  ├────────┴──────┴───────┤
#  │      info bar      │  │      info bar      │  │       info bar        │
#  └────────────────────┘  └────────────────────┘  └───────────────────────┘
#
# Usage: _open_chorus_layout <name> <session_dir> <conductor_cmd> <singer_cmd1> [singer_cmd2] [singer_cmd3]
# singer commands are passed as individual positional arguments (bash 3.2 compatible)
_open_chorus_layout() {
  local name="$1"
  local session_dir="$2"
  local conductor_cmd="$3"
  local _scmds=("${@:4}")  # remaining args are singer commands
  local num_singers="${#_scmds[@]}"

  # Try to reconnect to existing layout
  if _load_session_layout "$session_dir"; then
    echo -e "${CYAN}Reconnecting to existing layout...${NC}"
    iterm_focus_session "$SESSION_MAIN_SID"
    return 0
  fi

  echo -e "${CYAN}Creating iTerm2 layout for: $name${NC}"

  # ------------------------------------------------------------------
  # Build layout from scratch (no standard tadpole terminal pane needed)
  # ------------------------------------------------------------------
  local ids
  ids=$(iterm_create_window "$name" "$session_dir")
  local window_id
  window_id=$(echo "$ids" | cut -d: -f1)
  local full_pane="${ids##*:}"

  if [ -z "$full_pane" ]; then
    error "Failed to get session ID from iTerm2 (ids='$ids')"
    return 1
  fi

  sleep 0.5

  # Step 1: Split info bar off the bottom (full width)
  local info_sid
  info_sid=$(iterm_split_horizontal "$full_pane")
  sleep 0.3

  # full_pane is now the top area
  local conductor_sid="$full_pane"

  # Step 2: Build singer area based on count
  local singer_sids=()

  if [ "$num_singers" -le 2 ]; then
    # 1 or 2 singers: conductor left, singers stacked vertically on the right
    local singer_area_sid
    singer_area_sid=$(iterm_split_vertical "$conductor_sid")
    sleep 0.3
    singer_sids+=("$singer_area_sid")

    if [ "$num_singers" -ge 2 ]; then
      sleep 0.3
      local s2_sid
      s2_sid=$(iterm_split_horizontal "$singer_area_sid")
      sleep 0.3
      singer_sids+=("$s2_sid")
    fi
  else
    # 3 singers: conductor spans the full top, singers in a row on the bottom
    local singer_row_sid
    singer_row_sid=$(iterm_split_horizontal "$conductor_sid")
    sleep 0.3
    singer_sids+=("$singer_row_sid")

    sleep 0.3
    local s2_sid
    s2_sid=$(iterm_split_vertical "$singer_row_sid")
    sleep 0.3
    singer_sids+=("$s2_sid")

    sleep 0.3
    local s3_sid
    s3_sid=$(iterm_split_vertical "$s2_sid")
    sleep 0.3
    singer_sids+=("$s3_sid")
  fi

  # Step 3: cd all panes to session dir
  iterm_send_text "$conductor_sid" "cd '$session_dir' && clear"
  sleep 0.2
  local _si
  for (( _si=0; _si<${#singer_sids[@]}; _si++ )); do
    iterm_send_text "${singer_sids[$_si]}" "cd '$session_dir' && clear"
    sleep 0.2
  done

  # Step 4: Start conductor
  [ -n "$conductor_cmd" ] && iterm_send_text "$conductor_sid" "$conductor_cmd"

  # Step 5: Start singers (commands sent immediately; callers add deferred prompts)
  for (( _si=0; _si<${#_scmds[@]}; _si++ )); do
    [ -n "${_scmds[$_si]}" ] && iterm_send_text "${singer_sids[$_si]}" "${_scmds[$_si]}"
    sleep 0.1
  done

  # Step 6: Start info bar
  if [ -n "$info_sid" ]; then
    local infobar_cmd
    infobar_cmd=$(get_infobar_command "$session_dir")
    iterm_send_text "$info_sid" "cd '$session_dir' && clear && $infobar_cmd"
    sleep 0.3
    iterm_resize_session "$info_sid" 3
    (sleep 2 && iterm_resize_session "$info_sid" 3) &
  fi

  iterm_rename_tab_by_session "$conductor_sid" "$name" 2>/dev/null || true

  # Expose layout IDs (conductor fills the "main" role; no server/terminal pane)
  LAYOUT_WINDOW_ID="$window_id"
  LAYOUT_TERMINAL_SID="$conductor_sid"   # reuse terminal slot — no idle shell needed
  LAYOUT_SERVER_SID="${singer_sids[0]}"  # singer 1 in server slot for compat
  LAYOUT_MAIN_SID="$conductor_sid"
  LAYOUT_INFO_SID="${info_sid:-}"
  LAYOUT_SINGER_SIDS=("${singer_sids[@]}")

  # Persist layout including extra singer SIDs
  _save_session_layout "$session_dir" \
    "$LAYOUT_WINDOW_ID" \
    "$LAYOUT_TERMINAL_SID" \
    "$LAYOUT_SERVER_SID" \
    "$LAYOUT_MAIN_SID" \
    "$LAYOUT_INFO_SID" \
    "${singer_sids[@]}"
}

# Interactive setup wizard for chorus configuration.
# Writes a chorus: block into the current project's YAML config.
chorus_init() {
  load_config 2>/dev/null || true

  if [ -z "${CONFIG_FILE:-}" ] || [ ! -f "$CONFIG_FILE" ]; then
    error "No project config found. Run 'bufo init' first to register a project."
    return 1
  fi

  echo ""
  echo -e "${CYAN}Chorus Configuration${NC}"
  echo -e "${GRAY}────────────────────${NC}"
  echo "Configure the AI singers for multi-agent code review."
  echo ""

  # Number of singers
  local sv_count=""
  while true; do
    read -p "How many singers? [1-3] (default: 2): " sv_count
    sv_count="${sv_count:-2}"
    if [[ "$sv_count" =~ ^[123]$ ]]; then
      break
    fi
    echo "  Please enter 1, 2, or 3."
  done

  # Conductor
  local valid_tools="claude codex gemini copilot"
  local default_conductor
  default_conductor="$(get_ai_tool)"
  local conductor_tool=""
  echo ""
  echo -e "${CYAN}Conductor${NC} — orchestrates the review and delivers the final verdict"
  while true; do
    read -p "Conductor tool [claude/codex/gemini/copilot] (default: $default_conductor): " conductor_tool
    conductor_tool="${conductor_tool:-$default_conductor}"
    if echo "$valid_tools" | grep -qw "$conductor_tool"; then
      break
    fi
    echo "  Valid tools: claude, codex, gemini, copilot"
  done

  # Singers
  local singer_names=()
  local singer_tools=()
  local default_tools=("claude" "codex" "copilot")
  local default_names=("Singer A" "Singer B" "Singer C")

  for (( i=1; i<=sv_count; i++ )); do
    echo ""
    echo -e "${CYAN}Singer $i${NC}"
    local dname="${default_names[$((i-1))]}"
    local dtool="${default_tools[$((i-1))]}"
    local sname stool
    read -p "  Name (default: $dname): " sname
    sname="${sname:-$dname}"
    while true; do
      read -p "  Tool [claude/codex/gemini/copilot] (default: $dtool): " stool
      stool="${stool:-$dtool}"
      if echo "$valid_tools" | grep -qw "$stool"; then
        break
      fi
      echo "  Valid tools: claude, codex, gemini, copilot"
    done
    singer_names+=("$sname")
    singer_tools+=("$stool")
  done

  # Write chorus: block into project YAML using yq
  # Set conductor and reset the singers array, then append each singer entry
  CONDUCTOR="$conductor_tool" yq -i '.chorus.conductor = strenv(CONDUCTOR)' "$CONFIG_FILE"
  yq -i '.chorus.singers = []' "$CONFIG_FILE"
  local i
  for (( i=0; i<sv_count; i++ )); do
    SNAME="${singer_names[$i]}" STOOL="${singer_tools[$i]}" \
      yq -i '.chorus.singers += [{"name": strenv(SNAME), "tool": strenv(STOOL)}]' "$CONFIG_FILE"
  done

  echo ""
  echo -e "${GREEN}✓ Chorus configured in $CONFIG_FILE${NC}"
  echo ""
  echo -e "  Conductor: ${CYAN}${conductor_tool}${NC}"
  for (( i=0; i<sv_count; i++ )); do
    printf "  Singer %d:   ${CYAN}%-10s${NC} %s\n" "$((i+1))" "${singer_tools[$i]}" "(${singer_names[$i]})"
  done
  echo ""
  echo -e "  Run: ${CYAN}bufo chorus <PR>${NC}  to start a chorus review"
  echo ""
}

# Chorus review - Conductor pattern with configurable AI singers
review_chorus() {
  local pr_id="$1"

  # Load chorus config (sets CHORUS_CONDUCTOR, CHORUS_SINGER_NAMES[], CHORUS_SINGER_TOOLS[])
  _get_chorus_config

  # Immediate feedback
  echo -e "${CYAN}Preparing chorus review for: $pr_id${NC}"
  echo ""

  # Warn about any missing singer tools
  local i
  for (( i=0; i<${#CHORUS_SINGER_TOOLS[@]}; i++ )); do
    local stool="${CHORUS_SINGER_TOOLS[$i]}"
    if ! command_exists "$stool"; then
      warn "Singer tool '$stool' not found — ${CHORUS_SINGER_NAMES[$i]} will be skipped."
    fi
  done

  local parsed=($(parse_pr_identifier "$pr_id"))
  local owner="${parsed[0]}"
  local repo="${parsed[1]}"
  local number="${parsed[2]}"

  if [ -z "$number" ]; then
    error "Could not parse PR identifier: $pr_id"
    echo "Formats: 3230, repo#456, https://github.com/.../pull/123"
    return 1
  fi

  local name="chorus-${repo:-pr}-$number"

  # Check if session already exists
  local sessions_dir=$(get_sessions_dir)
  if [ -d "$sessions_dir/$name" ]; then
    echo -e "${YELLOW}Chorus review session already exists: $name${NC}"
    echo "  [r] Resume   [d] Delete & recreate   [q] Quit"
    read -p "Choice [r/d/q]: " choice
    case "$choice" in
      d|D)
        rm -rf "$sessions_dir/$name"
        echo -e "${GREEN}Deleted: $name${NC}"
        echo ""
        ;;
      q|Q|n|N)
        return 1
        ;;
      *)
        session_resume "$name"
        return
        ;;
    esac
  fi

  # Build singer output filenames for the conductor prompt
  local singer_files=""
  for (( i=0; i<${#CHORUS_SINGER_TOOLS[@]}; i++ )); do
    singer_files+="singer-$((i+1))-review.md "
  done
  singer_files="${singer_files% }"

  # Show the chorus intro while fetching
  _show_chorus_intro

  # Fetch PR data with chorus instructions (this can take a moment for large PRs)
  local context=$(fetch_pr_data "$owner" "$repo" "$number" "chorus" "$singer_files")
  [ $? -eq 0 ] || return 1

  # Create session
  local session_dir="$sessions_dir/$name"
  mkdir -p "$session_dir"

  cat > "$session_dir/session.yaml" << EOF
name: $name
project: ${PROJECT_ALIAS:-default}
created: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
last_accessed: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
claude_session_id: ""
summary: ""
type: chorus
prs:
  - $pr_id
EOF

  echo "$context" > "$session_dir/context.md"

  echo -e "${GREEN}Chorus review session created: $name${NC}"
  echo ""

  # Write metadata for info bar (including ticket info from PR)
  local pr_title=$(echo "$context" | grep -m1 '\*\*Title:\*\*' | sed 's/.*\*\*Title:\*\* //')
  local pr_url=$(echo "$context" | grep -m1 '\*\*URL:\*\*' | sed 's/.*\*\*URL:\*\* //')
  _extract_pr_ticket_info "$owner" "$repo" "$number"
  local meta_args=("$session_dir" "$name" "chorus" \
    "pr_number" "$number" \
    "pr_url" "$pr_url" \
    "pr_title" "$pr_title")
  [ -n "$_TICKET_ID" ] && meta_args+=("ticket" "$_TICKET_ID")
  [ -n "$_TICKET_URL" ] && meta_args+=("ticket_url" "$_TICKET_URL")
  _write_session_meta "${meta_args[@]}"

  # Build singer launch commands and prompts (populates SINGER_CMDS[], SINGER_PROMPTS[])
  _prepare_singers "$session_dir"

  # Start conductor + singers in iTerm2 layout
  session_update "$name" "last_accessed" "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  local conductor_cmd
  conductor_cmd="$(AI_TOOL="$CHORUS_CONDUCTOR" get_ai_interactive_cmd)"
  _open_chorus_layout "$name" "$session_dir" "$conductor_cmd" "${SINGER_CMDS[@]}"

  # Send each singer its opening prompt after it finishes loading.
  # iterm_send_text_and_enter sends the text then a second bare newline after
  # a short pause — needed for TUI apps (gemini, codex) that don't treat the
  # first PTY newline as a submit when their input buffer is being filled.
  # disown detaches each subshell so it survives the bufo process exiting
  # (without disown the 15s sleep would be killed before it fires).
  local _si
  for (( _si=0; _si<${#LAYOUT_SINGER_SIDS[@]}; _si++ )); do
    local _ssid="${LAYOUT_SINGER_SIDS[$_si]}"
    local _sprompt="${SINGER_PROMPTS[$_si]:-}"
    local _sdelay="${SINGER_DELAYS[$_si]:-15}"
    if [ -n "$_ssid" ] && [ -n "$_sprompt" ]; then
      ( sleep "$_sdelay" && iterm_send_text_and_enter "$_ssid" "$_sprompt" ) &
      disown $!
    fi
  done

  # Send conductor its opening prompt after it finishes loading
  ( sleep 5 && iterm_send_text "$LAYOUT_MAIN_SID" "Read context.md for your instructions, then begin polling for the singer output files." ) &
  disown $!

  echo ""
  echo -e "  ${GRAY}Conductor prompt in:${NC} 5s"
  for (( _si=0; _si<${#LAYOUT_SINGER_SIDS[@]}; _si++ )); do
    local _sname="${CHORUS_SINGER_NAMES[$_si]:-Singer $((_si+1))}"
    local _sdelay="${SINGER_DELAYS[$_si]:-15}"
    echo -e "  ${GRAY}${_sname} prompt in:${NC} ${_sdelay}s"
  done
  echo ""
  echo -e "  ${GRAY}Resume:${NC}  bufo chorus resume $name"
  echo -e "  ${GRAY}Output:${NC}  bufo chorus show $name"
  echo -e "  ${GRAY}Delete:${NC}  bufo chorus delete $name"
}

# Handle review commands
handle_review_command() {
  local cmd="${1:-}"
  shift || true

  case "$cmd" in
    "")
      error "Usage: bufo review <PR> or bufo chorus <PR>"
      echo ""
      echo "Commands:"
      echo "  bufo review <PR>       Quick single-agent review"
      echo "  bufo chorus <PR>        Chorus review (Conductor + singers, thorough)"
      echo "  bufo review new        Interactive mode (multiple PRs + context)"
      echo "  bufo review ls         List review sessions"
      echo "  bufo review resume     Resume a review"
      echo "  bufo review show       View saved review output"
      echo "  bufo review delete     Delete a review session"
      return 1
      ;;
    "new")
      review_new_interactive
      ;;
    "ls"|"list")
      session_list "review"
      ;;
    "resume"|"continue")
      local name="${1:-}"
      if [ -z "$name" ]; then
        error "Specify review to resume"
        echo "Use 'bufo review ls' to see reviews"
        return 1
      fi
      # Handle both "review-xxx" and just the PR number/name
      if [[ ! "$name" == review-* ]]; then
        local parsed=($(parse_pr_identifier "$name"))
        local repo="${parsed[1]}"
        local number="${parsed[2]}"
        name="review-${repo:-pr}-$number"
      fi
      session_resume "$name"
      ;;
    "delete"|"rm")
      local name="${1:-}"
      if [ -z "$name" ]; then
        error "Specify review to delete (or 'all' to delete all)"
        return 1
      fi
      if [ "$name" = "all" ]; then
        _delete_all_sessions "review"
      else
        if [[ ! "$name" == review-* ]] && [[ ! "$name" == court-* ]]; then
          local parsed=($(parse_pr_identifier "$name"))
          local repo="${parsed[1]}"
          local number="${parsed[2]}"
          name="review-${repo:-pr}-$number"
        fi
        session_delete "$name"
      fi
      ;;
    "show"|"view"|"output")
      local name="${1:-}"
      if [ -z "$name" ]; then
        error "Specify review to view"
        echo "Usage: bufo review show <name>"
        return 1
      fi
      if [[ ! "$name" == review-* ]]; then
        local parsed=($(parse_pr_identifier "$name"))
        local repo="${parsed[1]}"
        local number="${parsed[2]}"
        name="review-${repo:-pr}-$number"
      fi
      local sessions_dir=$(get_sessions_dir)
      local output_file="$sessions_dir/$name/review-output.md"
      if [ -f "$output_file" ]; then
        echo -e "${BOLD}Review output for: $name${NC}"
        echo ""
        cat "$output_file"
      else
        error "No saved review output for '$name'"
        echo "The review hasn't been saved yet. Resume the review and ask Claude to save findings."
      fi
      ;;
    *)
      # Assume it's a PR identifier
      review_quick "$cmd"
      ;;
  esac
}

# Handle chorus new command — interactive mode for multiple PRs
chorus_new_interactive() {
  # Load chorus config
  _get_chorus_config

  echo "Creating new chorus review session"
  echo ""

  # Get session name
  local name=""
  read -p "Session name: " name
  [ -z "$name" ] && { error "Name required"; return 1; }
  name="chorus-$name"

  # Warn about any missing singer tools
  local i
  for (( i=0; i<${#CHORUS_SINGER_TOOLS[@]}; i++ )); do
    local stool="${CHORUS_SINGER_TOOLS[$i]}"
    if ! command_exists "$stool"; then
      warn "Singer tool '$stool' not found — ${CHORUS_SINGER_NAMES[$i]} will be skipped."
    fi
  done

  # Collect PRs
  local prs=()
  echo ""
  echo "Add PRs (empty line when done):"
  while true; do
    read -p "> " pr_input
    [ -z "$pr_input" ] && break
    prs+=("$pr_input")
  done

  if [ ${#prs[@]} -eq 0 ]; then
    error "At least one PR required"
    return 1
  fi

  # Collect context
  echo ""
  echo "Additional context (optional, empty line when done):"
  local context_lines=()
  while true; do
    read -p "> " context_line
    [ -z "$context_line" ] && break
    context_lines+=("$context_line")
  done

  # Build singer output filenames for the conductor prompt
  local singer_files=""
  for (( i=0; i<${#CHORUS_SINGER_TOOLS[@]}; i++ )); do
    singer_files+="singer-$((i+1))-review.md "
  done
  singer_files="${singer_files% }"

  # Show the chorus intro
  _show_chorus_intro

  # Build context document with chorus instructions
  local chorus_instructions=$(get_chorus_instructions "$singer_files")
  local context="# Chorus Review Session: $name"$'\n\n'
  context+="$chorus_instructions"$'\n\n'

  # Add user context if provided
  if [ ${#context_lines[@]} -gt 0 ]; then
    context+="## Additional Context"$'\n'
    for line in "${context_lines[@]}"; do
      context+="$line"$'\n'
    done
    context+=$'\n'
  fi

  # Fetch and append PR data
  context+="## Pull Requests"$'\n\n'

  for pr_id in "${prs[@]}"; do
    local parsed=($(parse_pr_identifier "$pr_id"))
    local owner="${parsed[0]}"
    local repo="${parsed[1]}"
    local number="${parsed[2]}"

    if [ -z "$number" ]; then
      warn "Could not parse PR: $pr_id"
      continue
    fi

    # Fetch PR data without chorus instructions (we already added them above)
    local pr_data=$(fetch_pr_data "$owner" "$repo" "$number" "standard")
    context+="$pr_data"$'\n\n'
    context+="---"$'\n\n'
  done

  # Create session
  local sessions_dir=$(get_sessions_dir)
  local session_dir="$sessions_dir/$name"
  mkdir -p "$session_dir"

  # Write session metadata
  cat > "$session_dir/session.yaml" << EOF
name: $name
project: ${PROJECT_ALIAS:-default}
created: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
last_accessed: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
claude_session_id: ""
summary: ""
type: chorus
prs:
$(for pr in "${prs[@]}"; do echo "  - $pr"; done)
EOF

  # Write context
  echo "$context" > "$session_dir/context.md"

  echo ""
  echo -e "${GREEN}Chorus review session created: $name${NC}"
  echo ""

  # Write metadata for info bar
  _write_session_meta "$session_dir" "$name" "chorus"

  # Build singer launch commands and prompts (populates SINGER_CMDS[], SINGER_PROMPTS[])
  _prepare_singers "$session_dir"

  # Start conductor + singers in iTerm2 layout
  read -p "Start chorus session now? [Y/n] " start_now
  if [[ ! "$start_now" =~ ^[Nn]$ ]]; then
    session_update "$name" "last_accessed" "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
    local conductor_cmd
    conductor_cmd="$(AI_TOOL="$CHORUS_CONDUCTOR" get_ai_interactive_cmd)"
    _open_chorus_layout "$name" "$session_dir" "$conductor_cmd" "${SINGER_CMDS[@]}"

    # Send each singer its opening prompt after it finishes loading
    local _si
    for (( _si=0; _si<${#LAYOUT_SINGER_SIDS[@]}; _si++ )); do
      local _ssid="${LAYOUT_SINGER_SIDS[$_si]}"
      local _sprompt="${SINGER_PROMPTS[$_si]:-}"
      local _sdelay="${SINGER_DELAYS[$_si]:-15}"
      if [ -n "$_ssid" ] && [ -n "$_sprompt" ]; then
        ( sleep "$_sdelay" && iterm_send_text "$_ssid" "$_sprompt" ) &
        disown $!
      fi
    done

    # Send conductor its opening prompt after it finishes loading
    ( sleep 5 && iterm_send_text "$LAYOUT_MAIN_SID" "Read context.md for your instructions, then begin polling for the singer output files." ) &
    disown $!
  fi

  echo ""
  echo -e "  ${GRAY}Resume:${NC}  bufo chorus resume $name"
  echo -e "  ${GRAY}Output:${NC}  bufo chorus show $name"
  echo -e "  ${GRAY}Delete:${NC}  bufo chorus delete $name"
}

# Handle chorus command
handle_chorus_command() {
  local cmd="${1:-}"
  shift 2>/dev/null || true

  case "$cmd" in
    "")
      error "Usage: bufo chorus <PR> or bufo chorus new"
      echo ""
      echo "Chorus review: thorough multi-agent review with a configurable conductor and 1–3 singers."
      echo ""
      echo "Commands:"
      echo "  bufo chorus init           Configure singers (conductor + 1-3 AI tools)"
      echo "  bufo chorus <PR>           Quick chorus review for single PR"
      echo "  bufo chorus new            Interactive mode (multiple PRs + context)"
      echo "  bufo chorus ls             List chorus sessions"
      echo "  bufo chorus resume         Resume a chorus session"
      echo "  bufo chorus show           View saved chorus output"
      echo "  bufo chorus apply [name]   Apply findings to a PR tadpole for fixing"
      echo "  bufo chorus delete         Delete a chorus session"
      return 1
      ;;
    "init"|"setup")
      chorus_init
      ;;
    "new")
      chorus_new_interactive
      ;;
    "ls"|"list")
      session_list "chorus"
      ;;
    "resume"|"continue")
      local name="${1:-}"
      if [ -z "$name" ]; then
        error "Specify chorus session to resume"
        echo "Use 'bufo chorus ls' to see sessions"
        return 1
      fi
      # Handle both "chorus-xxx" and just the name
      if [[ ! "$name" == chorus-* ]]; then
        name="chorus-$name"
      fi
      session_resume "$name"
      ;;
    "show"|"view"|"output")
      local name="${1:-}"
      if [ -z "$name" ]; then
        error "Specify chorus session to view"
        echo "Usage: bufo chorus show <name>"
        return 1
      fi
      if [[ ! "$name" == chorus-* ]]; then
        name="chorus-$name"
      fi
      local sessions_dir=$(get_sessions_dir)
      local output_file="$sessions_dir/$name/review-output.md"
      if [ -f "$output_file" ]; then
        echo "Chorus verdict for: $name"
        echo ""
        cat "$output_file"
      else
        error "No saved verdict for '$name'"
        echo "Resume the chorus session and have the conductor deliver a verdict."
      fi
      ;;
    "delete"|"rm")
      local name="${1:-}"
      if [ -z "$name" ]; then
        error "Specify chorus session to delete (or 'all' to delete all)"
        return 1
      fi
      if [ "$name" = "all" ]; then
        _delete_all_sessions "chorus"
      else
        if [[ ! "$name" == chorus-* ]]; then
          name="chorus-$name"
        fi
        session_delete "$name"
      fi
      ;;
    "apply")
      local apply_target="${1:-}"
      chorus_apply "$apply_target"
      ;;
    *)
      # Assume it's a PR identifier
      review_chorus "$cmd"
      ;;
  esac
}

# Find the most recent chorus session that has a completed review-output.md.
# Echoes the full absolute path to the session directory and returns 0, or returns 1 if none.
# Searches the current project's sessions dir first, then all other project subdirs under
# SESSIONS_DIR — so running without a project context still finds sessions from any project.
_find_latest_chorus_with_findings() {
  local latest=""
  local latest_mtime=0
  local dir project_dir

  # Build list of session root dirs: current project first, then every other project subdir
  local search_dirs=()
  local current_dir
  current_dir=$(get_sessions_dir)
  search_dirs+=("$current_dir")
  for project_dir in "$SESSIONS_DIR"/*/; do
    [ -d "$project_dir" ] || continue
    local candidate="${project_dir%/}"
    if [ "$candidate" != "$current_dir" ]; then
      search_dirs+=("$candidate")
    fi
  done

  local sessions_dir
  for sessions_dir in "${search_dirs[@]}"; do
    [ -d "$sessions_dir" ] || continue
    for dir in "$sessions_dir"/chorus-*/; do
      [ -f "$dir/review-output.md" ] || continue
      local mtime
      mtime=$(stat -f %m "$dir/review-output.md" 2>/dev/null) || mtime=0
      if [ "$mtime" -gt "$latest_mtime" ]; then
        latest_mtime="$mtime"
        latest="${dir%/}"
      fi
    done
  done
  [ -n "$latest" ] && echo "$latest" && return 0
  return 1
}

# Apply chorus findings to a tadpole for the reviewed PR.
# Usage: chorus_apply [session-name|PR-identifier]
#   session-name: chorus-myrepo-123 or just myrepo-123
#   PR-identifier: 123, repo#456, or full GitHub PR URL
#   (empty) auto-detects the most recent chorus session with findings
chorus_apply() {
  local identifier="${1:-}"
  local sessions_dir name session_dir

  sessions_dir=$(get_sessions_dir)

  # --- Resolve the chorus session dir ---
  if [ -z "$identifier" ]; then
    # Auto-detect: most recent chorus session with a finished review-output.md
    # _find_latest_chorus_with_findings returns the full path to the session dir
    session_dir=$(_find_latest_chorus_with_findings) || {
      error "No chorus sessions with findings found"
      echo "Run 'bufo chorus <PR>' first, then wait for the conductor to deliver a verdict."
      return 1
    }
    name=$(basename "$session_dir")
    echo -e "${CYAN}Auto-detected chorus session: ${BOLD}$name${NC}"
  else
    # Normalize: strip optional "chorus-" prefix for lookup flexibility
    local bare_name="$identifier"
    [[ "$bare_name" == chorus-* ]] || bare_name="chorus-$identifier"

    # Check current project dir first, then scan all project dirs
    if [ -d "$sessions_dir/$bare_name" ]; then
      session_dir="$sessions_dir/$bare_name"
      name="$bare_name"
    else
      # Search all project subdirs under SESSIONS_DIR
      local found_dir=""
      local project_dir
      for project_dir in "$SESSIONS_DIR"/*/; do
        [ -d "$project_dir/$bare_name" ] && found_dir="$project_dir/$bare_name" && break
      done
      if [ -n "$found_dir" ]; then
        session_dir="$found_dir"
        name="$bare_name"
      else
        # Try to interpret as a PR identifier and derive the session name
        local parsed
        parsed=($(parse_pr_identifier "$identifier"))
        local p_repo="${parsed[1]}" p_number="${parsed[2]}"
        if [ -n "$p_number" ]; then
          bare_name="chorus-${p_repo:-pr}-$p_number"
          # Again: current project first, then all projects
          if [ -d "$sessions_dir/$bare_name" ]; then
            session_dir="$sessions_dir/$bare_name"
          else
            for project_dir in "$SESSIONS_DIR"/*/; do
              [ -d "$project_dir/$bare_name" ] && session_dir="$project_dir/$bare_name" && break
            done
          fi
          name="$bare_name"
        else
          error "Cannot find chorus session for: $identifier"
          echo "Use 'bufo chorus ls' to list sessions, or pass a PR number/URL."
          return 1
        fi
      fi
    fi
  fi

  # --- Validate session and findings ---
  if [ ! -d "$session_dir" ]; then
    error "Chorus session '$name' not found"
    echo "Use 'bufo chorus ls' to list sessions"
    return 1
  fi

  local output_file="$session_dir/review-output.md"
  if [ ! -f "$output_file" ]; then
    error "No findings in '$name' yet"
    echo "Resume the chorus session and wait for the conductor to deliver a verdict."
    echo "  bufo chorus resume $name"
    return 1
  fi

  # --- Read PR identifier from session.yaml ---
  local pr_id
  pr_id=$(yq e '.prs[0]' "$session_dir/session.yaml" 2>/dev/null || true)
  if [ -z "$pr_id" ] || [ "$pr_id" = "null" ]; then
    error "Could not read PR from session '$name'"
    return 1
  fi

  local parsed
  parsed=($(parse_pr_identifier "$pr_id"))
  local owner="${parsed[0]}" repo="${parsed[1]}" number="${parsed[2]}"
  if [ -z "$number" ]; then
    error "Could not parse PR identifier '$pr_id' from session '$name'"
    return 1
  fi

  echo -e "${CYAN}Fetching PR #$number from $owner/$repo...${NC}"
  fetch_pr_metadata "$owner" "$repo" "$number" || return 1
  echo -e "  Title:  ${BOLD}$PR_TITLE${NC}"
  echo -e "  Branch: $PR_BRANCH"
  echo ""

  # --- Build the findings prompt ---
  local findings
  findings=$(cat "$output_file")
  local default_prompt
  IFS= read -r -d '' default_prompt << 'APPLY_TMPL' || true
The chorus review for PR {pr_url} found the following issues. Please fix them.

{findings}
APPLY_TMPL

  local prompt
  prompt=$(load_prompt "chorus-apply" "$default_prompt" \
    "pr_url" "$PR_URL" \
    "findings" "$findings")

  # --- Find or create a tadpole (same logic as handle_pr_command) ---
  # Check for an existing tadpole already on this branch
  local existing_num num dir
  existing_num=$(find_tadpole_for_branch "$PR_BRANCH")

  if [ -n "$existing_num" ]; then
    echo -e "${GREEN}Found existing tadpole $existing_num on branch $PR_BRANCH${NC}"
    num="$existing_num"
  else
    num=$(find_unlocked_tadpole)
    if [ -n "$num" ]; then
      echo -e "${CYAN}Reusing unlocked tadpole $num for PR #$number...${NC}"
      prepare_tadpole_for_reuse "$num"
    else
      num=$(find_next_tadpole)
      if [ -z "$num" ]; then
        error "No available tadpole slots (max 100)"
        return 1
      fi
      echo -e "${CYAN}Creating tadpole $num for PR #$number...${NC}"
      create_workspace "$num"
    fi

    dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
    CHECKOUT_EXISTING_TP=""
    local checkout_rc=0
    checkout_pr_branch "$dir" "$owner" "$repo" "$number" || checkout_rc=$?

    if [ "$checkout_rc" -eq 2 ] && [ -n "$CHECKOUT_EXISTING_TP" ]; then
      echo -e "${YELLOW}Branch already checked out in tadpole $CHECKOUT_EXISTING_TP, switching to it...${NC}"
      rm -f "$dir/.bufo-lock"
      num="$CHECKOUT_EXISTING_TP"
    elif [ "$checkout_rc" -ne 0 ]; then
      return 1
    fi
  fi

  # Write tadpole metadata for info bar
  set_tadpole_name "$num" "$PR_BRANCH"
  local meta_args=("$num" "pr" \
    "name" "$PR_BRANCH" \
    "pr_number" "$number" \
    "pr_url" "$PR_URL" \
    "pr_title" "$PR_TITLE")
  write_workspace_meta "${meta_args[@]}"

  # Open the tadpole with the findings prompt
  # NOTE: we always pass the prompt even when reusing an existing tadpole,
  # so the agent receives the chorus findings regardless of prior state.
  echo -e "${GREEN}Opening tadpole $num with chorus findings...${NC}"
  open_tadpole "$num" "$prompt"
}
