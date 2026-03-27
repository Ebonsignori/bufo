#!/usr/bin/env bash
# bufo - merge tadpole branches into main

# Return the name of the default (trunk) branch for the given repo path.
# Falls back to "main" if origin/HEAD is not configured.
_get_default_branch() {
  git -C "${1:-.}" symbolic-ref refs/remotes/origin/HEAD 2>/dev/null \
    | sed 's|refs/remotes/origin/||' \
    || echo "main"
}

_merge_usage() {
  echo "Usage: bufo merge [--dry-run] [N]"
  echo ""
  echo "Merge tadpole branches that have commits ahead of main."
  echo ""
  echo "Options:"
  echo "  --dry-run    Show what would be merged without making changes"
  echo "  N            Only merge tadpole N's branch"
  echo ""
  echo "Examples:"
  echo "  bufo merge              Merge all tadpole branches into main"
  echo "  bufo merge 3            Merge only tadpole 3's branch"
  echo "  bufo merge --dry-run    Preview what would be merged"
}

_resolve_conflicts_with_ai() {
  local branch="$1"
  local ai_tool=$(get_ai_tool)

  if ! ai_tool_exists; then
    warn "$ai_tool CLI not found — cannot auto-resolve conflicts"
    return 1
  fi

  local conflicted_files
  conflicted_files=$(cd "$MAIN_REPO" && git diff --name-only --diff-filter=U)

  if [ -z "$conflicted_files" ]; then
    return 0
  fi

  local default_branch
  default_branch=$(_get_default_branch "$MAIN_REPO")

  local commit_log
  commit_log=$(cd "$MAIN_REPO" && git log "$default_branch..$branch" --format='%h %s' 2>/dev/null)

  local file_list
  file_list=$(echo "$conflicted_files" | sed 's/^/  - /')

  local default_prompt
  default_prompt="You are resolving merge conflicts in a git repository.

Branch '{branch}' is being merged into {default_branch}. The following files have conflicts:
{files}

Commits from {branch}:
{commit_log}

For each conflicted file:
1. Read the file
2. Resolve all conflict markers (<<<<<<< ======= >>>>>>>) by keeping the intent of BOTH sides
3. Write the resolved file

Do NOT leave any conflict markers. Preserve all functionality from both branches."

  local prompt
  prompt=$(load_prompt "merge-conflict" "$default_prompt" \
    "branch"         "$branch"         \
    "default_branch" "$default_branch" \
    "files"          "$file_list"      \
    "commit_log"     "$commit_log")

  echo -e "  ${CYAN}Asking $ai_tool to resolve conflicts...${NC}"
  cd "$MAIN_REPO"
  echo "$prompt" | ai_run_prompt

  # Check if conflicts remain
  local remaining
  remaining=$(git diff --name-only --diff-filter=U)
  if [ -z "$remaining" ]; then
    # Stage only the files the AI resolved — never stage unrelated dirty files (e.g. .env)
    local -a files_array
    mapfile -t files_array <<< "$conflicted_files"
    git add -- "${files_array[@]}"
    git commit --no-edit
    return 0
  else
    warn "Claude could not resolve all conflicts"
    echo "  Remaining conflicts:"
    echo "$remaining" | sed 's/^/    /'
    return 1
  fi
}

handle_merge_command() {
  local dry_run=false
  local target_num=""

  # Parse args
  while [ $# -gt 0 ]; do
    case "$1" in
      --dry-run|-n)
        dry_run=true
        shift
        ;;
      --help|-h)
        _merge_usage
        return 0
        ;;
      *)
        if [[ "$1" =~ ^[0-9]+$ ]]; then
          target_num="$1"
        else
          error "Unknown argument: $1"
          _merge_usage
          return 1
        fi
        shift
        ;;
    esac
  done

  # Validate main repo
  if [ ! -d "$MAIN_REPO" ]; then
    error "Main repo not found at $MAIN_REPO"
    return 1
  fi

  # Check for clean working tree
  local dirty
  dirty=$(cd "$MAIN_REPO" && git status --porcelain 2>/dev/null)
  if [ -n "$dirty" ]; then
    error "Main repo has uncommitted changes — commit or stash first"
    echo "  $MAIN_REPO"
    return 1
  fi

  cd "$MAIN_REPO"

  # Detect the default branch for this repo
  local default_branch
  default_branch=$(_get_default_branch "$MAIN_REPO")

  # Enumerate tadpole branches with commits ahead of the default branch
  local branches_to_merge=()
  local branch_commits=()

  # Collect tadpole directories (numbered)
  local ws_nums=()
  if [ -n "$target_num" ]; then
    ws_nums=("$target_num")
  else
    for dir in "$WORKSPACE_BASE/$WORKSPACE_PREFIX-"*; do
      [ -d "$dir" ] || continue
      local num
      num=$(basename "$dir" | sed "s/${WORKSPACE_PREFIX}-//")
      [[ "$num" =~ ^[0-9]+$ ]] || continue
      ws_nums+=("$num")
    done
  fi

  for num in "${ws_nums[@]}"; do
    local branch
    branch=$(get_branch_name "$num")

    # Check if branch exists locally (run in MAIN_REPO to avoid wrong-repo issues)
    if ! (cd "$MAIN_REPO" && git show-ref --verify --quiet "refs/heads/$branch" 2>/dev/null); then
      continue
    fi

    # Check if branch has commits ahead of the default branch
    local commits
    commits=$(git log "$default_branch..$branch" --oneline 2>/dev/null)
    if [ -z "$commits" ]; then
      continue
    fi

    branches_to_merge+=("$branch")
    branch_commits+=("$commits")
  done

  if [ ${#branches_to_merge[@]} -eq 0 ]; then
    echo -e "${YELLOW}No tadpole branches with commits ahead of $default_branch.${NC}"
    return 0
  fi

  # Show summary
  echo -e "${CYAN}Branches with commits ahead of $default_branch:${NC}"
  echo ""
  for i in "${!branches_to_merge[@]}"; do
    local branch="${branches_to_merge[$i]}"
    local commits="${branch_commits[$i]}"
    local count
    count=$(echo "$commits" | wc -l | tr -d ' ')
    echo -e "  ${BOLD}$branch${NC} ($count commit(s))"
    echo "$commits" | sed 's/^/    /'
    echo ""
  done

  if [ "$dry_run" = true ]; then
    echo -e "${YELLOW}Dry run — no changes made.${NC}"
    return 0
  fi

  # Confirm
  echo -n "Merge ${#branches_to_merge[@]} branch(es) into $default_branch? [y/N]: "
  read -r confirm
  if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "Aborted."
    return 0
  fi

  # Update the default branch
  echo ""
  echo -e "${CYAN}Fetching from origin...${NC}"
  git fetch origin 2>&1 | sed 's/^/  /' || true
  echo -e "${CYAN}Checking out $default_branch...${NC}"
  git checkout "$default_branch" 2>&1 | sed 's/^/  /'
  echo -e "${CYAN}Pulling latest $default_branch...${NC}"
  git pull origin "$default_branch" 2>&1 | sed 's/^/  /' || true

  # Merge each branch
  local merged=0
  local merge_failed=0

  for branch in "${branches_to_merge[@]}"; do
    echo ""
    echo -e "${CYAN}Merging $branch...${NC}"

    if git merge "$branch" --no-edit; then
      echo -e "  ${GREEN}Merged successfully${NC}"
      merged=$((merged + 1))
    else
      echo -e "  ${YELLOW}Conflicts detected — attempting auto-resolve...${NC}"
      if _resolve_conflicts_with_ai "$branch"; then
        echo -e "  ${GREEN}Conflicts resolved and merged${NC}"
        merged=$((merged + 1))
      else
        echo -e "  ${RED}Could not resolve conflicts — aborting merge of $branch${NC}"
        git merge --abort 2>/dev/null || true
        merge_failed=$((merge_failed + 1))
      fi
    fi
  done

  # Summary
  echo ""
  echo "════════════════════════════════════════"
  echo -e "  Merged: ${GREEN}$merged${NC}  Failed: ${RED}$merge_failed${NC}"
  if [ $merged -gt 0 ]; then
    echo ""
    echo -e "  ${YELLOW}Changes are local only — push when ready:${NC}"
    echo "    cd $MAIN_REPO && git push origin $default_branch"
  fi
  echo "════════════════════════════════════════"
}
