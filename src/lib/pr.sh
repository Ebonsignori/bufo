#!/usr/bin/env bash
# bufo - PR tadpole command handler

# Find an existing tadpole whose current branch matches the given branch name
# Returns: tadpole number, or empty string if none found
find_tadpole_for_branch() {
  local target_branch="$1"

  for dir in "$TADPOLE_BASE/$TADPOLE_PREFIX-"*; do
    [ -d "$dir" ] || continue
    local num
    num=$(basename "$dir" | sed "s/${TADPOLE_PREFIX}-//")
    [[ "$num" =~ ^[0-9]+$ ]] || continue

    local branch
    branch=$(cd "$dir" && git branch --show-current 2>/dev/null)
    if [ "$branch" = "$target_branch" ]; then
      echo "$num"
      return
    fi
  done

  echo ""
}

# Fetch PR metadata using gh CLI
# Sets globals: PR_BRANCH, PR_TITLE, PR_URL, PR_BODY, PR_COMMENTS_TEXT
fetch_pr_metadata() {
  local owner="$1"
  local repo="$2"
  local number="$3"
  local full_repo="$owner/$repo"

  if ! command_exists gh; then
    error "gh CLI required for PR tadpoles"
    echo "Install: brew install gh"
    return 1
  fi

  local pr_json
  pr_json=$(gh pr view "$number" --repo "$full_repo" --json title,headRefName,url 2>/dev/null)
  if [ -z "$pr_json" ]; then
    error "Could not fetch PR #$number from $full_repo"
    return 1
  fi

  PR_BRANCH=$(echo "$pr_json" | jq -r '.headRefName')
  PR_TITLE=$(echo "$pr_json" | jq -r '.title')
  PR_URL=$(echo "$pr_json" | jq -r '.url')

  # Fetch body and comments separately using gh's --jq flag to avoid
  # control character issues that break external jq parsing
  PR_BODY=$(gh pr view "$number" --repo "$full_repo" --json body --jq '.body // ""' 2>/dev/null)
  PR_COMMENTS_TEXT=$(gh pr view "$number" --repo "$full_repo" --json comments --jq '[.comments[].body // empty] | join("\n")' 2>/dev/null)
}

# Checkout the PR branch in an existing tadpole directory
checkout_pr_branch() {
  local dir="$1"
  local owner="$2"
  local repo="$3"
  local number="$4"
  local full_repo="$owner/$repo"

  CHECKOUT_EXISTING_TP=""

  echo -e "${BLUE}Checking out PR #$number branch...${NC}"
  cd "$dir"
  if ! gh pr checkout "$number" --repo "$full_repo" 2>/dev/null; then
    # Fallback: fetch and checkout the branch directly
    local branch="$PR_BRANCH"
    git fetch origin "$branch" 2>/dev/null || true
    git checkout "$branch" 2>/dev/null || git checkout -b "$branch" "origin/$branch" 2>/dev/null || {
      # Check if branch is already checked out in another worktree
      local target_ref="refs/heads/$branch"
      local worktree_path
      worktree_path=$(git worktree list --porcelain 2>/dev/null | awk -v ref="$target_ref" '
        /^worktree /{ wt=substr($0,10) }
        /^branch /{ if(substr($0,8)==ref) print wt }
      ')
      if [ -n "$worktree_path" ]; then
        # Check if it's another tadpole
        local tp_num
        tp_num=$(basename "$worktree_path" | sed "s/^${TADPOLE_PREFIX}-//")
        if [[ "$tp_num" =~ ^[0-9]+$ ]]; then
          CHECKOUT_EXISTING_TP="$tp_num"
          return 2
        fi
        # Branch is checked out in a non-tadpole worktree (e.g. main repo) —
        # detach HEAD there so we can use the branch here
        echo -e "${YELLOW}Branch checked out in $worktree_path, detaching it...${NC}"
        git -C "$worktree_path" checkout --detach 2>/dev/null || true
        # Retry checkout
        git checkout "$branch" 2>/dev/null || git checkout -b "$branch" "origin/$branch" 2>/dev/null || {
          error "Failed to checkout PR branch: $branch"
          return 1
        }
        echo -e "${GREEN}On branch: $(git branch --show-current)${NC}"
        return 0
      fi
      error "Failed to checkout PR branch: $branch"
      return 1
    }
  fi
  echo -e "${GREEN}On branch: $(git branch --show-current)${NC}"
}

# Build a prompt for Claude to work on a PR
build_pr_prompt() {
  local number="$1"
  local title="$2"
  local url="$3"
  local repo="$4"
  local branch="$5"

  local default='You are working on PR #{number} in {repo}.

**Title:** {title}
**URL:** {url}
**Branch:** {branch}

Fetch the PR diff using `gh pr diff {number}` and review the changes. Then:
1. Understand what the PR does
2. Check if there are any issues, failing tests, or incomplete work
3. Ask me how you can help (fix issues, add tests, continue implementation, etc.)

Start by reading the PR description with `gh pr view {number}` and the diff.'

  # Migrate legacy YAML config key → prompt file on first use (one-time, silent)
  local global_file="$PROMPTS_DIR/pr-open.md"
  if [ ! -f "$global_file" ]; then
    local legacy
    legacy=$(config_get "pr.prompt_template" "")
    [ -n "$legacy" ] && default="$legacy"
  fi

  load_prompt "pr-open" "$default" \
    "number" "$number" \
    "title"  "$title"  \
    "url"    "$url"    \
    "repo"   "$repo"   \
    "branch" "$branch"
}

# Main handler for: bufo pr <identifier>
handle_pr_command() {
  local identifier="${1:-}"

  if [ -z "$identifier" ]; then
    error "PR identifier required"
    echo ""
    echo "Usage: bufo pr <PR>"
    echo "       bufo tp <N> pr <PR>"
    echo ""
    echo "Formats:"
    echo "  bufo pr 123"
    echo "  bufo pr repo#456"
    echo "  bufo pr https://github.com/owner/repo/pull/789"
    exit 1
  fi

  # Parse PR identifier (reuses parse_pr_identifier from review.sh)
  local parsed
  parsed=($(parse_pr_identifier "$identifier"))
  local owner="${parsed[0]}"
  local repo="${parsed[1]}"
  local number="${parsed[2]}"

  if [ -z "$number" ]; then
    error "Could not parse PR identifier: $identifier"
    echo "Formats: 123, repo#456, https://github.com/.../pull/789"
    exit 1
  fi

  echo -e "${CYAN}Fetching PR #$number from $owner/$repo...${NC}"

  # Fetch PR metadata
  fetch_pr_metadata "$owner" "$repo" "$number" || exit 1

  echo -e "  Title: ${BOLD}$PR_TITLE${NC}"
  echo -e "  Branch: $PR_BRANCH"
  echo ""

  # Check if an existing tadpole is already on this branch
  local existing_num
  existing_num=$(find_tadpole_for_branch "$PR_BRANCH")

  if [ -n "$existing_num" ]; then
    echo -e "${GREEN}Found existing tadpole $existing_num on branch $PR_BRANCH${NC}"

    # Extract ticket info from branch name, PR body, and comments
    local ticket_id ticket_url
    ticket_id=$(extract_ticket_from_branch "$PR_BRANCH")
    ticket_url=$(extract_linear_url_from_body "$PR_BODY")
    if [ -z "$ticket_url" ] && [ -n "$PR_COMMENTS_TEXT" ]; then
      ticket_url=$(extract_linear_url_from_body "$PR_COMMENTS_TEXT")
    fi
    if [ -z "$ticket_id" ] && [ -n "$ticket_url" ]; then
      ticket_id=$(parse_ticket_identifier "$ticket_url")
    fi

    # Write metadata so info bar has content
    local meta_args=("$existing_num" "pr" \
      "name" "$PR_BRANCH" \
      "pr_number" "$number" \
      "pr_url" "$PR_URL" \
      "pr_title" "$PR_TITLE")
    [ -n "$ticket_id" ] && meta_args+=("ticket" "$ticket_id")
    [ -n "$ticket_url" ] && meta_args+=("ticket_url" "$ticket_url")
    write_workspace_meta "${meta_args[@]}"

    set_tadpole_name "$existing_num" "$PR_BRANCH"
    open_tadpole "$existing_num"
    return
  fi

  # Try to reuse an unlocked tadpole before creating a new one
  local num
  num=$(find_unlocked_tadpole)

  if [ -n "$num" ]; then
    echo -e "${CYAN}Reusing unlocked tadpole $num for PR #$number...${NC}"
    prepare_tadpole_for_reuse "$num"
  else
    num=$(find_next_tadpole)
    if [ -z "$num" ]; then
      error "No available tadpole slots (max 100)"
      exit 1
    fi
    echo -e "${CYAN}Creating tadpole $num for PR #$number...${NC}"
    create_workspace "$num"
  fi

  # Checkout the PR branch in the tadpole
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
  CHECKOUT_EXISTING_TP=""
  local checkout_rc=0
  checkout_pr_branch "$dir" "$owner" "$repo" "$number" || checkout_rc=$?

  if [ "$checkout_rc" -eq 2 ] && [ -n "$CHECKOUT_EXISTING_TP" ]; then
    # Branch is already checked out in another tadpole — use that one
    echo -e "${YELLOW}Branch already checked out in tadpole $CHECKOUT_EXISTING_TP, switching to it...${NC}"
    rm -f "$dir/.bufo-lock"
    num="$CHECKOUT_EXISTING_TP"
    dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
  elif [ "$checkout_rc" -ne 0 ]; then
    exit 1
  fi

  # Name the tadpole after the PR branch
  set_tadpole_name "$num" "$PR_BRANCH"

  # Extract ticket info from branch name, PR body, and comments
  local ticket_id ticket_url
  ticket_id=$(extract_ticket_from_branch "$PR_BRANCH")
  ticket_url=$(extract_linear_url_from_body "$PR_BODY")
  # Fall back to scanning PR comments (Linear bot often comments with ticket link)
  if [ -z "$ticket_url" ] && [ -n "$PR_COMMENTS_TEXT" ]; then
    ticket_url=$(extract_linear_url_from_body "$PR_COMMENTS_TEXT")
  fi
  # If we found a Linear URL but no ticket ID from the branch, extract from the URL
  if [ -z "$ticket_id" ] && [ -n "$ticket_url" ]; then
    ticket_id=$(parse_ticket_identifier "$ticket_url")
  fi

  # Write tadpole metadata for info bar
  local meta_args=("$num" "pr" \
    "name" "$PR_BRANCH" \
    "pr_number" "$number" \
    "pr_url" "$PR_URL" \
    "pr_title" "$PR_TITLE")
  [ -n "$ticket_id" ] && meta_args+=("ticket" "$ticket_id")
  [ -n "$ticket_url" ] && meta_args+=("ticket_url" "$ticket_url")
  write_workspace_meta "${meta_args[@]}"

  # Build prompt and open tadpole
  local prompt
  prompt=$(build_pr_prompt "$number" "$PR_TITLE" "$PR_URL" "$owner/$repo" "$PR_BRANCH")
  open_tadpole "$num" "$prompt"
}

# Handle: bufo tp <N> pr <PR>
handle_ws_pr_command() {
  local num="$1"
  local identifier="${2:-}"

  if [ -z "$identifier" ]; then
    error "PR identifier required: bufo tp $num pr <PR>"
    exit 1
  fi

  # Parse PR identifier
  local parsed
  parsed=($(parse_pr_identifier "$identifier"))
  local owner="${parsed[0]}"
  local repo="${parsed[1]}"
  local number="${parsed[2]}"

  if [ -z "$number" ]; then
    error "Could not parse PR identifier: $identifier"
    echo "Formats: 123, repo#456, https://github.com/.../pull/789"
    exit 1
  fi

  echo -e "${CYAN}Fetching PR #$number from $owner/$repo...${NC}"

  # Fetch PR metadata
  fetch_pr_metadata "$owner" "$repo" "$number" || exit 1

  echo -e "  Title: ${BOLD}$PR_TITLE${NC}"
  echo -e "  Branch: $PR_BRANCH"
  echo ""

  # Create tadpole if it doesn't exist
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
  if [ ! -d "$dir" ]; then
    echo -e "${CYAN}Creating tadpole $num...${NC}"
    create_workspace "$num"
  fi

  # Checkout the PR branch
  CHECKOUT_EXISTING_TP=""
  local checkout_rc=0
  checkout_pr_branch "$dir" "$owner" "$repo" "$number" || checkout_rc=$?

  if [ "$checkout_rc" -eq 2 ] && [ -n "$CHECKOUT_EXISTING_TP" ]; then
    # Branch is already checked out in another tadpole — use that one
    echo -e "${YELLOW}Branch already checked out in tadpole $CHECKOUT_EXISTING_TP, switching to it...${NC}"
    num="$CHECKOUT_EXISTING_TP"
    dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
  elif [ "$checkout_rc" -ne 0 ]; then
    exit 1
  fi

  # Name the tadpole after the PR branch
  set_tadpole_name "$num" "$PR_BRANCH"

  # Extract ticket info from branch name, PR body, and comments
  local ticket_id ticket_url
  ticket_id=$(extract_ticket_from_branch "$PR_BRANCH")
  ticket_url=$(extract_linear_url_from_body "$PR_BODY")
  # Fall back to scanning PR comments (Linear bot often comments with ticket link)
  if [ -z "$ticket_url" ] && [ -n "$PR_COMMENTS_TEXT" ]; then
    ticket_url=$(extract_linear_url_from_body "$PR_COMMENTS_TEXT")
  fi
  # If we found a Linear URL but no ticket ID from the branch, extract from the URL
  if [ -z "$ticket_id" ] && [ -n "$ticket_url" ]; then
    ticket_id=$(parse_ticket_identifier "$ticket_url")
  fi

  # Write tadpole metadata for info bar
  local meta_args=("$num" "pr" \
    "name" "$PR_BRANCH" \
    "pr_number" "$number" \
    "pr_url" "$PR_URL" \
    "pr_title" "$PR_TITLE")
  [ -n "$ticket_id" ] && meta_args+=("ticket" "$ticket_id")
  [ -n "$ticket_url" ] && meta_args+=("ticket_url" "$ticket_url")
  write_workspace_meta "${meta_args[@]}"

  # Build prompt and open tadpole
  local prompt
  prompt=$(build_pr_prompt "$number" "$PR_TITLE" "$PR_URL" "$owner/$repo" "$PR_BRANCH")
  open_tadpole "$num" "$prompt"
}
