#!/usr/bin/env bash
# bufo - WIP (work-in-progress) save/restore

get_wip_dir() {
  local num=$1
  echo "$WIP_BASE/$WORKSPACE_PREFIX-$num"
}

wip_save() {
  local num=$1
  local do_restart=$2
  local custom_name="${3:-}"
  local dir="$WORKSPACE_BASE/$WORKSPACE_PREFIX-$num"
  local wip_dir=$(get_wip_dir "$num")
  local timestamp=$(date +%Y%m%d-%H%M%S)
  local branch_name=$(get_branch_name "$num")

  if [ ! -d "$dir" ]; then
    error "Tadpole $num does not exist"
    return 1
  fi

  echo -e "${CYAN}Saving WIP state for tadpole $num...${NC}"

  cd "$dir"
  local diff=$(git diff HEAD 2>/dev/null || echo "")
  local staged=$(git diff --cached HEAD 2>/dev/null || echo "")
  local status=$(git status --porcelain 2>/dev/null || echo "")
  local branch=$(git branch --show-current 2>/dev/null || echo "unknown")

  # Get untracked files
  local untracked_files=$(git ls-files --others --exclude-standard 2>/dev/null || echo "")

  git fetch origin main --quiet 2>/dev/null || true
  local commits_ahead=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo "0")
  local commit_log=""
  if [ "$commits_ahead" -gt 0 ] 2>/dev/null; then
    commit_log=$(git log --oneline origin/main..HEAD 2>/dev/null || echo "")
  fi

  # Collect submodule changes
  local submodule_diffs=""
  local submodules_count=$(yq -r '.submodules | length // 0' "$CONFIG_FILE" 2>/dev/null)
  for ((i=0; i<submodules_count; i++)); do
    local sub_path=$(yq -r ".submodules[$i].path" "$CONFIG_FILE" 2>/dev/null)
    [ -z "$sub_path" ] || [ "$sub_path" = "null" ] && continue

    if [ -d "$dir/$sub_path" ]; then
      cd "$dir/$sub_path"
      local sub_diff=$(git diff HEAD 2>/dev/null || echo "")
      local sub_staged=$(git diff --cached HEAD 2>/dev/null || echo "")
      [ -n "$sub_diff" ] && submodule_diffs="$submodule_diffs$sub_diff"
      [ -n "$sub_staged" ] && submodule_diffs="$submodule_diffs$sub_staged"
      cd "$dir"
    fi
  done

  # Check if there's anything to save
  local has_changes="false"
  if [ -n "$diff" ] || [ -n "$staged" ] || [ -n "$status" ] || [ -n "$submodule_diffs" ] || [ -n "$untracked_files" ]; then
    has_changes="true"
  elif [ "$commits_ahead" -gt 0 ] 2>/dev/null; then
    has_changes="true"
  elif [ "$branch" != "$branch_name" ] && [ "$branch" != "main" ]; then
    has_changes="true"
  fi

  if [ "$has_changes" = "false" ]; then
    echo -e "${YELLOW}No changes to save.${NC}"
    return 0
  fi

  local slug=""
  local summary=""

  # Use custom name if provided
  if [ -n "$custom_name" ]; then
    slug=$(echo "$custom_name" | tr ' ' '-' | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]//g')
    summary="$custom_name"
  else
    # Try to generate AI summary if AI tool is available
    slug="wip-$(date +%H%M)"
    summary="Work in progress"
    if ai_tool_exists; then
      local all_diffs="$diff$staged$submodule_diffs"
      local summary_json=$(generate_wip_summary "$all_diffs")
      local parsed_slug=$(echo "$summary_json" | jq -r '.slug // ""')
      local parsed_summary=$(echo "$summary_json" | jq -r '.summary // ""')
      [ -n "$parsed_slug" ] && slug="$parsed_slug"
      [ -n "$parsed_summary" ] && summary="$parsed_summary"
    fi
  fi

  local wip_path="$wip_dir/$timestamp-$slug"
  mkdir -p "$wip_path"

  local saved_count=0

  # Save patches
  if [ -n "$diff" ]; then
    echo "$diff" > "$wip_path/main-unstaged.patch"
    saved_count=$((saved_count + 1))
  fi
  if [ -n "$staged" ]; then
    echo "$staged" > "$wip_path/main-staged.patch"
    saved_count=$((saved_count + 1))
  fi
  [ -n "$status" ] && echo "$status" > "$wip_path/main-status.txt"
  [ -n "$commit_log" ] && echo "$commit_log" > "$wip_path/main-commits.txt"

  # Save untracked files (copy actual content)
  if [ -n "$untracked_files" ]; then
    local untracked_dir="$wip_path/untracked"
    mkdir -p "$untracked_dir"
    while IFS= read -r file; do
      [ -z "$file" ] && continue
      local file_dir
      file_dir=$(dirname "$file")
      mkdir -p "$untracked_dir/$file_dir"
      cp "$dir/$file" "$untracked_dir/$file" 2>/dev/null && saved_count=$((saved_count + 1))
    done <<< "$untracked_files"
    echo "$untracked_files" > "$wip_path/untracked-files.txt"
  fi

  # Save submodule patches
  for ((i=0; i<submodules_count; i++)); do
    local sub_path=$(yq -r ".submodules[$i].path" "$CONFIG_FILE" 2>/dev/null)
    [ -z "$sub_path" ] || [ "$sub_path" = "null" ] && continue

    if [ -d "$dir/$sub_path" ]; then
      cd "$dir/$sub_path"
      local sub_diff=$(git diff HEAD 2>/dev/null || echo "")
      local sub_staged=$(git diff --cached HEAD 2>/dev/null || echo "")
      local sub_status=$(git status --porcelain 2>/dev/null || echo "")
      local safe_name=$(echo "$sub_path" | tr '/' '-')
      [ -n "$sub_diff" ] && echo "$sub_diff" > "$wip_path/${safe_name}-unstaged.patch"
      [ -n "$sub_staged" ] && echo "$sub_staged" > "$wip_path/${safe_name}-staged.patch"
      [ -n "$sub_status" ] && echo "$sub_status" > "$wip_path/${safe_name}-status.txt"
      cd "$dir"
    fi
  done

  cat > "$wip_path/metadata.json" << EOF
{
  "timestamp": "$timestamp",
  "slug": "$slug",
  "summary": "$summary",
  "tadpole": $num,
  "branch": "$branch",
  "commits_ahead": $commits_ahead,
  "created_at": "$(date -Iseconds)"
}
EOF

  success "WIP saved: $slug"
  echo -e "   ${GRAY}$summary${NC}"

  if [ "$do_restart" = "true" ]; then
    echo ""
    restart_tadpole "$num"
  fi
}

generate_wip_summary() {
  local diff_content="$1"
  local max_lines=100
  local truncated_diff=$(echo "$diff_content" | head -n $max_lines)

  if ai_tool_exists; then
    local default_prompt='Based on this git diff, provide a JSON response with exactly this format (no markdown, just raw JSON):
{"slug": "short-kebab-case-name-max-30-chars", "summary": "One sentence describing the changes"}

Git diff:
{diff}'
    local prompt
    prompt=$(load_prompt "wip-summary" "$default_prompt" "diff" "$truncated_diff")

    local result=$(echo "$prompt" | ai_run_print_with_timeout 30)

    if [ -n "$result" ]; then
      local json=$(echo "$result" | grep -o '{[^}]*}' | head -1)
      if [ -n "$json" ]; then
        echo "$json"
        return
      fi
    fi
  fi

  echo "{\"slug\": \"wip-$(date +%H%M)\", \"summary\": \"Work in progress\"}"
}

wip_list() {
  local num=$1
  local wip_dir=$(get_wip_dir "$num")

  if [ ! -d "$wip_dir" ]; then
    echo -e "${YELLOW}No WIP states saved for tadpole $num${NC}"
    return 0
  fi

  local -a wips
  mapfile -t wips < <(find "$wip_dir" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | sort -r)

  if [ ${#wips[@]} -eq 0 ]; then
    echo -e "${YELLOW}No WIP states saved for tadpole $num${NC}"
    return 0
  fi

  echo -e "${CYAN}WIP States for Tadpole $num${NC}"
  echo ""

  local i=1
  for wip in "${wips[@]}"; do
    local name=$(basename "$wip")
    local metadata="$wip/metadata.json"

    if [ -f "$metadata" ]; then
      local summary=$(jq -r '.summary // ""' "$metadata" 2>/dev/null)
      local created=$(jq -r '.created_at // ""' "$metadata" 2>/dev/null)
      local branch=$(jq -r '.branch // .cloud_branch // ""' "$metadata" 2>/dev/null)

      local display_date=$(echo "$created" | cut -d'T' -f1)
      local display_time=$(echo "$created" | cut -d'T' -f2 | cut -d'+' -f1 | cut -d'-' -f1 | cut -c1-5)

      echo -e "  ${GREEN}[$i]${NC} $name"
      echo -e "      ${BLUE}$summary${NC}"
      echo -e "      Branch: $branch | Created: $display_date $display_time"
      echo ""
    else
      echo -e "  ${GREEN}[$i]${NC} $name (no metadata)"
      echo ""
    fi

    ((i++))
  done
}

# List all WIPs globally across all workspaces
wip_list_global() {
  if [ ! -d "$WIP_BASE" ]; then
    echo -e "${YELLOW}No WIP states saved${NC}"
    echo "  Save your work with: bufo wip save"
    return 0
  fi

  # Collect all WIPs with their metadata
  local all_wips=()

  for tp_dir in "$WIP_BASE"/*/; do
    [ ! -d "$tp_dir" ] && continue
    local ws_name=$(basename "$tp_dir")

    for wip in "$tp_dir"*/; do
      [ ! -d "$wip" ] && continue
      local metadata="$wip/metadata.json"
      if [ -f "$metadata" ]; then
        local timestamp=$(jq -r '.timestamp // ""' "$metadata")
        all_wips+=("$timestamp|$ws_name|$wip")
      else
        all_wips+=("00000000-000000|$ws_name|$wip")
      fi
    done
  done

  if [ ${#all_wips[@]} -eq 0 ]; then
    echo -e "${YELLOW}No WIP states saved${NC}"
    echo "  Save your work with: bufo wip save"
    return 0
  fi

  IFS=$'\n' sorted_wips=($(printf '%s\n' "${all_wips[@]}" | sort -r))
  unset IFS

  echo -e "${CYAN}${BOLD}All WIP States${NC}"
  echo ""

  local i=1
  for entry in "${sorted_wips[@]}"; do
    local ws_name=$(echo "$entry" | cut -d'|' -f2)
    local wip_path=$(echo "$entry" | cut -d'|' -f3)
    local wip_name=$(basename "$wip_path")
    local metadata="$wip_path/metadata.json"

    local tp_num=$(echo "$ws_name" | grep -o '[0-9]*$')

    local file_count=$(ls -1 "$wip_path"/*.patch 2>/dev/null | wc -l | tr -d ' ')
    [ -z "$file_count" ] && file_count=0

    if [ -f "$metadata" ]; then
      local summary=$(jq -r '.summary // ""' "$metadata" 2>/dev/null)
      local created=$(jq -r '.created_at // ""' "$metadata" 2>/dev/null)
      local branch=$(jq -r '.branch // .cloud_branch // ""' "$metadata" 2>/dev/null)

      local commits_ahead=$(jq -r '.commits_ahead // .cloud_commits_ahead // ""' "$metadata" 2>/dev/null)

      local display_date=$(echo "$created" | cut -d'T' -f1)
      local display_time=$(echo "$created" | cut -d'T' -f2 | cut -d'+' -f1 | cut -d'-' -f1 | cut -c1-5)

      echo -e "  ${GREEN}[$i]${NC} ${BOLD}$wip_name${NC}"
      echo -e "      ${BLUE}$summary${NC}"
      echo -e "      ${GRAY}Tadpole: ${NC}$tp_num  ${GRAY}Branch: ${NC}$branch  ${GRAY}Files: ${NC}$file_count patches"
      if [ -n "$commits_ahead" ] && [ "$commits_ahead" != "0" ]; then
        echo -e "      ${GRAY}Commits ahead: ${NC}$commits_ahead  ${GRAY}Created: ${NC}$display_date $display_time"
      else
        echo -e "      ${GRAY}Created: ${NC}$display_date $display_time"
      fi
      echo ""
    else
      echo -e "  ${GREEN}[$i]${NC} ${BOLD}$wip_name${NC} ${GRAY}(no metadata)${NC}"
      echo -e "      ${GRAY}Tadpole: ${NC}$tp_num  ${GRAY}Files: ${NC}$file_count patches"
      echo ""
    fi

    ((i++))
  done

  echo -e "${GRAY}Restore with: bufo wip restore <number> [--to <tadpole>]${NC}"
}

# Interactive restore from global WIP list
wip_restore_global() {
  local target_ws="${1:-}"
  local open_after="${2:-true}"

  if [ ! -d "$WIP_BASE" ]; then
    error "No WIP states found"
    return 1
  fi

  # Collect all WIPs
  local all_wips=()
  for tp_dir in "$WIP_BASE"/*/; do
    [ ! -d "$tp_dir" ] && continue
    local ws_name=$(basename "$tp_dir")

    for wip in "$tp_dir"*/; do
      [ ! -d "$wip" ] && continue
      local metadata="$wip/metadata.json"
      if [ -f "$metadata" ]; then
        local timestamp=$(jq -r '.timestamp // ""' "$metadata")
        all_wips+=("$timestamp|$ws_name|$wip")
      else
        all_wips+=("00000000-000000|$ws_name|$wip")
      fi
    done
  done

  if [ ${#all_wips[@]} -eq 0 ]; then
    error "No WIP states found"
    return 1
  fi

  IFS=$'\n' sorted_wips=($(printf '%s\n' "${all_wips[@]}" | sort -r))
  unset IFS

  echo -e "${CYAN}Select WIP to restore:${NC}"
  echo ""

  local i=1
  for entry in "${sorted_wips[@]}"; do
    local ws_name=$(echo "$entry" | cut -d'|' -f2)
    local wip_path=$(echo "$entry" | cut -d'|' -f3)
    local wip_name=$(basename "$wip_path")
    local metadata="$wip_path/metadata.json"
    local tp_num=$(echo "$ws_name" | grep -o '[0-9]*$')
    local summary=""

    if [ -f "$metadata" ]; then
      summary=$(jq -r '.summary // ""' "$metadata" 2>/dev/null)
    fi

    echo -e "  ${GREEN}[$i]${NC} $wip_name ${GRAY}(ws $tp_num)${NC}"
    [ -n "$summary" ] && echo -e "      ${BLUE}$summary${NC}"
    ((i++))
  done

  echo ""
  echo -e "  ${YELLOW}[0]${NC} Cancel"
  echo ""

  read -p "Select WIP [1-${#sorted_wips[@]}]: " selection

  if [ "$selection" = "0" ] || [ -z "$selection" ]; then
    echo "Cancelled."
    return 0
  fi

  if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt ${#sorted_wips[@]} ]; then
    error "Invalid selection"
    return 1
  fi

  local selected_entry="${sorted_wips[$((selection-1))]}"
  local selected_ws=$(echo "$selected_entry" | cut -d'|' -f2)
  local selected_wip=$(echo "$selected_entry" | cut -d'|' -f3)
  local original_ws_num=$(echo "$selected_ws" | grep -o '[0-9]*$')

  # Determine target tadpole
  local restore_to_ws="$original_ws_num"
  if [ -n "$target_ws" ]; then
    restore_to_ws="$target_ws"
  fi

  # Check if target tadpole exists
  local target_dir="$WORKSPACE_BASE/$WORKSPACE_PREFIX-$restore_to_ws"
  if [ ! -d "$target_dir" ]; then
    echo -e "${YELLOW}Tadpole $restore_to_ws does not exist.${NC}"
    read -p "Create it? [y/N]: " create_ws
    if [ "$create_ws" = "y" ] || [ "$create_ws" = "Y" ]; then
      create_workspace "$restore_to_ws"
    else
      echo "Cancelled."
      return 0
    fi
  else
    if _workspace_has_changes "$target_dir"; then
      echo -e "${YELLOW}Tadpole $restore_to_ws has uncommitted changes.${NC}"
      echo ""
      echo "  [1] Restore anyway (may conflict)"
      echo "  [2] Create a new tadpole"
      echo "  [0] Cancel"
      echo ""
      read -p "Choice [0-2]: " conflict_choice
      case "$conflict_choice" in
        1) ;;
        2)
          local next_ws=$(find_next_tadpole)
          echo -e "${CYAN}Creating tadpole $next_ws...${NC}"
          create_workspace "$next_ws"
          restore_to_ws="$next_ws"
          ;;
        *)
          echo "Cancelled."
          return 0
          ;;
      esac
    fi
  fi

  local wip_name=$(basename "$selected_wip")
  echo ""
  echo -e "${CYAN}Restoring WIP: $wip_name -> tadpole $restore_to_ws${NC}"

  _restore_wip "$restore_to_ws" "$selected_wip" "true"
}

# Check if tadpole directory has uncommitted changes
_workspace_has_changes() {
  local dir="$1"
  [ ! -d "$dir" ] && return 1
  cd "$dir"
  if ! git diff --quiet 2>/dev/null || ! git diff --cached --quiet 2>/dev/null; then
    return 0
  fi
  if [ -n "$(git ls-files --others --exclude-standard 2>/dev/null)" ]; then
    return 0
  fi
  return 1
}

# Restore by index from global list
wip_restore_by_index() {
  local index="$1"
  local target_ws="$2"
  local open_after="${3:-true}"

  if [ ! -d "$WIP_BASE" ]; then
    error "No WIP states found"
    return 1
  fi

  # Collect all WIPs
  local all_wips=()
  for tp_dir in "$WIP_BASE"/*/; do
    [ ! -d "$tp_dir" ] && continue
    local ws_name=$(basename "$tp_dir")

    for wip in "$tp_dir"*/; do
      [ ! -d "$wip" ] && continue
      local metadata="$wip/metadata.json"
      if [ -f "$metadata" ]; then
        local timestamp=$(jq -r '.timestamp // ""' "$metadata")
        all_wips+=("$timestamp|$ws_name|$wip")
      else
        all_wips+=("00000000-000000|$ws_name|$wip")
      fi
    done
  done

  if [ ${#all_wips[@]} -eq 0 ]; then
    error "No WIP states found"
    return 1
  fi

  IFS=$'\n' sorted_wips=($(printf '%s\n' "${all_wips[@]}" | sort -r))
  unset IFS

  if ! [[ "$index" =~ ^[0-9]+$ ]] || [ "$index" -lt 1 ] || [ "$index" -gt ${#sorted_wips[@]} ]; then
    error "Invalid WIP index: $index (valid range: 1-${#sorted_wips[@]})"
    return 1
  fi

  local selected_entry="${sorted_wips[$((index-1))]}"
  local selected_ws=$(echo "$selected_entry" | cut -d'|' -f2)
  local selected_wip=$(echo "$selected_entry" | cut -d'|' -f3)
  local original_ws_num=$(echo "$selected_ws" | grep -o '[0-9]*$')

  local restore_to_ws="$original_ws_num"
  if [ -n "$target_ws" ]; then
    restore_to_ws="$target_ws"
  fi

  local target_dir="$WORKSPACE_BASE/$WORKSPACE_PREFIX-$restore_to_ws"
  if [ ! -d "$target_dir" ]; then
    echo -e "${YELLOW}Tadpole $restore_to_ws does not exist.${NC}"
    read -p "Create it? [y/N]: " create_ws
    if [ "$create_ws" = "y" ] || [ "$create_ws" = "Y" ]; then
      create_workspace "$restore_to_ws"
    else
      echo "Cancelled."
      return 0
    fi
  else
    if _workspace_has_changes "$target_dir"; then
      echo -e "${YELLOW}Tadpole $restore_to_ws has uncommitted changes.${NC}"
      echo ""
      echo "  [1] Restore anyway (may conflict)"
      echo "  [2] Create a new tadpole"
      echo "  [0] Cancel"
      echo ""
      read -p "Choice [0-2]: " conflict_choice
      case "$conflict_choice" in
        1) ;;
        2)
          local next_ws=$(find_next_tadpole)
          echo -e "${CYAN}Creating tadpole $next_ws...${NC}"
          create_workspace "$next_ws"
          restore_to_ws="$next_ws"
          ;;
        *)
          echo "Cancelled."
          return 0
          ;;
      esac
    fi
  fi

  local wip_name=$(basename "$selected_wip")
  echo -e "${CYAN}Restoring WIP: $wip_name -> tadpole $restore_to_ws${NC}"

  _restore_wip "$restore_to_ws" "$selected_wip" "true"
}

wip_continue() {
  local num=$1
  local open_after="${2:-true}"
  local wip_dir=$(get_wip_dir "$num")

  if [ ! -d "$wip_dir" ]; then
    error "No WIP states found for tadpole $num"
    return 1
  fi

  local latest_wip=$(ls -1d "$wip_dir"/*/ 2>/dev/null | sort -r | head -1)

  if [ -z "$latest_wip" ]; then
    error "No WIP states found for tadpole $num"
    return 1
  fi

  local wip_name=$(basename "$latest_wip")
  echo -e "${CYAN}Restoring WIP: $wip_name${NC}"

  _restore_wip "$num" "$latest_wip" "$open_after"
}

wip_resume() {
  local num=$1
  local wip_dir=$(get_wip_dir "$num")

  if [ ! -d "$wip_dir" ]; then
    error "No WIP states found for tadpole $num"
    return 1
  fi

  local -a wips
  mapfile -t wips < <(find "$wip_dir" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | sort -r)

  if [ ${#wips[@]} -eq 0 ]; then
    error "No WIP states found for tadpole $num"
    return 1
  fi

  echo -e "${CYAN}Select WIP to restore:${NC}"
  echo ""

  local i=1
  for wip in "${wips[@]}"; do
    local name=$(basename "$wip")
    local metadata="$wip/metadata.json"
    local summary=""

    if [ -f "$metadata" ]; then
      summary=$(jq -r '.summary // ""' "$metadata" 2>/dev/null)
    fi

    echo -e "  ${GREEN}[$i]${NC} $name"
    [ -n "$summary" ] && echo -e "      ${BLUE}$summary${NC}"
    ((i++))
  done

  echo ""
  echo -e "  ${YELLOW}[0]${NC} Cancel"
  echo ""

  read -p "Select WIP [1-${#wips[@]}]: " selection

  if [ "$selection" = "0" ] || [ -z "$selection" ]; then
    echo "Cancelled."
    return 0
  fi

  if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt ${#wips[@]} ]; then
    error "Invalid selection"
    return 1
  fi

  local selected_wip="${wips[$((selection-1))]}"
  local wip_name=$(basename "$selected_wip")

  echo ""
  echo -e "${CYAN}Restoring WIP: $wip_name${NC}"

  _restore_wip "$num" "$selected_wip"
}

_restore_wip() {
  local num=$1
  local wip_path=$2
  local open_after="${3:-true}"
  local dir="$WORKSPACE_BASE/$WORKSPACE_PREFIX-$num"
  local wip_name=$(basename "$wip_path")
  local branch_name=$(get_branch_name "$num")
  local original_dir=$(pwd)

  local metadata="$wip_path/metadata.json"
  local saved_branch="$branch_name"
  if [ -f "$metadata" ]; then
    saved_branch=$(jq -r '.branch // .cloud_branch // ""' "$metadata")
    if [ -z "$saved_branch" ]; then
      saved_branch="$branch_name"
    fi
  fi

  cd "$dir"

  # Switch to saved branch
  local current_branch=$(git branch --show-current)
  if [ "$current_branch" != "$saved_branch" ] && [ -n "$saved_branch" ]; then
    echo "  Switching to branch $saved_branch..."
    git checkout "$saved_branch" 2>/dev/null || git checkout -b "$saved_branch"
  fi

  # Cherry-pick saved commits
  local commits_file=""
  if [ -f "$wip_path/main-commits.txt" ] && [ -s "$wip_path/main-commits.txt" ]; then
    commits_file="$wip_path/main-commits.txt"
  elif [ -f "$wip_path/cloud-commits.txt" ] && [ -s "$wip_path/cloud-commits.txt" ]; then
    commits_file="$wip_path/cloud-commits.txt"
  fi

  if [ -n "$commits_file" ]; then
    echo "  Restoring commits..."
    local commit_hashes=$(awk '{print $1}' "$commits_file" | tac)
    local cherry_pick_failed=false
    for hash in $commit_hashes; do
      if git cat-file -e "$hash" 2>/dev/null; then
        if ! git cherry-pick "$hash" --no-commit 2>/dev/null; then
          echo "    (commit $hash may need manual resolution)"
          git cherry-pick --abort 2>/dev/null || true
          cherry_pick_failed=true
        fi
      else
        echo "    (commit $hash not found in repo - may need to fetch)"
      fi
    done
    if [ "$cherry_pick_failed" = "false" ] && [ -n "$commit_hashes" ]; then
      git commit --no-edit 2>/dev/null || true
    fi
  fi

  # Apply main patches
  if [ -f "$wip_path/main-staged.patch" ] && [ -s "$wip_path/main-staged.patch" ]; then
    echo "  Applying staged changes..."
    git apply "$wip_path/main-staged.patch" 2>/dev/null && git add -A || echo "    (some hunks may have failed)"
  fi

  if [ -f "$wip_path/main-unstaged.patch" ] && [ -s "$wip_path/main-unstaged.patch" ]; then
    echo "  Applying unstaged changes..."
    git apply "$wip_path/main-unstaged.patch" 2>/dev/null || echo "    (some hunks may have failed)"
  fi

  # Apply submodule patches
  local submodules_count=$(yq -r '.submodules | length // 0' "$CONFIG_FILE" 2>/dev/null)
  for ((i=0; i<submodules_count; i++)); do
    local sub_path=$(yq -r ".submodules[$i].path" "$CONFIG_FILE" 2>/dev/null)
    [ -z "$sub_path" ] || [ "$sub_path" = "null" ] && continue

    if [ -d "$dir/$sub_path" ]; then
      cd "$dir/$sub_path"
      local safe_name=$(echo "$sub_path" | tr '/' '-')

      # Check for saved submodule branch in metadata
      local sub_branch=""
      if [ -f "$metadata" ]; then
        sub_branch=$(jq -r --arg key "${safe_name}_branch" '.[$key] // ""' "$metadata")
      fi

      if [ -n "$sub_branch" ] && [ "$sub_branch" != "null" ]; then
        local current_sub_branch=$(git branch --show-current 2>/dev/null)
        if [ "$current_sub_branch" != "$sub_branch" ]; then
          echo "  Switching $sub_path to branch $sub_branch..."
          git checkout "$sub_branch" 2>/dev/null || git checkout -b "$sub_branch" 2>/dev/null || true
        fi
      fi

      # Cherry-pick submodule commits
      local sub_commits_file=""
      if [ -f "$wip_path/${safe_name}-commits.txt" ] && [ -s "$wip_path/${safe_name}-commits.txt" ]; then
        sub_commits_file="$wip_path/${safe_name}-commits.txt"
      fi

      if [ -n "$sub_commits_file" ]; then
        echo "  Restoring $sub_path commits..."
        local sub_hashes=$(awk '{print $1}' "$sub_commits_file" | tac)
        for hash in $sub_hashes; do
          if git cat-file -e "$hash" 2>/dev/null; then
            git cherry-pick "$hash" --no-commit 2>/dev/null || echo "    (commit $hash may need manual resolution)"
          fi
        done
        git commit --no-edit 2>/dev/null || true
      fi

      if [ -f "$wip_path/${safe_name}-staged.patch" ] && [ -s "$wip_path/${safe_name}-staged.patch" ]; then
        echo "  Applying $sub_path staged changes..."
        git apply "$wip_path/${safe_name}-staged.patch" 2>/dev/null && git add -A || echo "    (some hunks may have failed)"
      fi

      if [ -f "$wip_path/${safe_name}-unstaged.patch" ] && [ -s "$wip_path/${safe_name}-unstaged.patch" ]; then
        echo "  Applying $sub_path unstaged changes..."
        git apply "$wip_path/${safe_name}-unstaged.patch" 2>/dev/null || echo "    (some hunks may have failed)"
      fi

      cd "$dir"
    fi
  done

  # Restore untracked files
  if [ -d "$wip_path/untracked" ]; then
    echo "  Restoring untracked files..."
    cp -r "$wip_path/untracked/." "$dir/" 2>/dev/null || true
  fi

  success "WIP restored: $wip_name"

  if [[ "$original_dir" == "$dir"* ]]; then
    :
  elif [ "$open_after" = "true" ]; then
    echo ""
    echo "  Opening tadpole $num..."
    open_tadpole "$num"
  else
    echo ""
    echo "  Run 'bufo $num' to open the tadpole"
  fi
}

wip_delete() {
  local num=$1
  local wip_name=$2
  local wip_dir=$(get_wip_dir "$num")

  if [ -z "$wip_name" ]; then
    error "Usage: bufo wip delete <wip-name>"
    return 1
  fi

  local wip_path="$wip_dir/$wip_name"

  if [ ! -d "$wip_path" ]; then
    wip_path=$(ls -1d "$wip_dir"/*"$wip_name"*/ 2>/dev/null | head -1)
  fi

  if [ ! -d "$wip_path" ]; then
    error "WIP not found: $wip_name"
    return 1
  fi

  local actual_name=$(basename "$wip_path")
  read -p "Delete WIP '$actual_name'? [y/N]: " confirm

  if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
    rm -rf "$wip_path"
    success "Deleted: $actual_name"
  else
    echo "Cancelled."
  fi
}

# Handle WIP commands for a specific tadpole
handle_wip_for_workspace() {
  local num=$1
  shift || true

  case "${1:-}" in
    "save")
      shift
      local do_restart="false"
      local custom_name=""
      while [ $# -gt 0 ]; do
        case "$1" in
          --restart|-r)
            do_restart="true"
            shift
            ;;
          *)
            custom_name="$1"
            shift
            ;;
        esac
      done
      wip_save "$num" "$do_restart" "$custom_name"
      ;;
    "ls"|"list")
      wip_list "$num"
      ;;
    "--continue"|"-c")
      wip_continue "$num"
      ;;
    "--resume"|"-r"|"resume")
      wip_resume "$num"
      ;;
    "delete"|"rm")
      wip_delete "$num" "${2:-}"
      ;;
    *)
      echo -e "${CYAN}WIP Commands for tadpole $num:${NC}"
      echo "  bufo tp $num wip save [\"name\"] [--restart]"
      echo "  bufo tp $num wip ls"
      echo "  bufo tp $num wip --continue"
      echo "  bufo tp $num wip --resume"
      echo "  bufo tp $num wip delete <name>"
      ;;
  esac
}
