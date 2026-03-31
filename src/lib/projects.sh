#!/usr/bin/env bash
# bufo - multi-project resolution and management

# Resolve project from @alias argument or fall back to default
resolve_project() {
  local arg="${1:-}"

  if [[ "$arg" == @* ]]; then
    local alias="${arg#@}"
    local project_file="$PROJECTS_DIR/${alias}.yaml"
    if [ ! -f "$project_file" ]; then
      error "No project registered with alias: @$alias"
      echo "Run 'bufo projects' to see registered projects."
      exit 1
    fi
    CONFIG_FILE="$project_file"
    PROJECT_ALIAS="$alias"
    reset_config
    return
  fi

  resolve_default_project
}

# Resolve the default project when no @alias is given
resolve_default_project() {
  if [ ! -d "$PROJECTS_DIR" ] || [ -z "$(ls -A "$PROJECTS_DIR" 2>/dev/null)" ]; then
    return
  fi

  local default_alias=""
  if [ -f "$GLOBAL_CONFIG" ]; then
    default_alias=$(yq -r '.default_project // ""' "$GLOBAL_CONFIG" 2>/dev/null)
    [ "$default_alias" = "null" ] && default_alias=""
  fi

  if [ -n "$default_alias" ]; then
    local project_file="$PROJECTS_DIR/${default_alias}.yaml"
    if [ -f "$project_file" ]; then
      CONFIG_FILE="$project_file"
      PROJECT_ALIAS="$default_alias"
      reset_config
      return
    fi
    warn "Default project '@$default_alias' not found, ignoring."
  fi

  local count=0
  local single_file=""
  for f in "$PROJECTS_DIR"/*.yaml; do
    [ -f "$f" ] || continue
    count=$((count + 1))
    single_file="$f"
  done

  if [ "$count" -eq 1 ]; then
    local alias=$(basename "$single_file" .yaml)
    CONFIG_FILE="$single_file"
    PROJECT_ALIAS="$alias"
    reset_config
    return
  fi
}

# Try to resolve the correct project by matching a GitHub URL's owner/repo
# against the remote origin of each project's main_repo
resolve_project_from_github_url() {
  local url="${1:-}"

  # Extract owner/repo from GitHub PR URL
  local url_owner_repo
  url_owner_repo=$(echo "$url" | sed -n 's|.*github\.com[:/]\([^/]*/[^/]*\).*|\1|p')
  url_owner_repo="${url_owner_repo%.git}"
  [ -z "$url_owner_repo" ] && return 1

  if [ ! -d "$PROJECTS_DIR" ]; then
    return 1
  fi

  for f in "$PROJECTS_DIR"/*.yaml; do
    [ -f "$f" ] || continue
    local repo=$(yq -r '.main_repo // ""' "$f" 2>/dev/null)
    [ -z "$repo" ] || [ "$repo" = "null" ] && continue
    repo="${repo/#\~/$HOME}"
    [ -d "$repo" ] || continue

    local remote_url
    remote_url=$(git -C "$repo" remote get-url origin 2>/dev/null) || continue
    local remote_owner_repo
    remote_owner_repo=$(echo "$remote_url" | sed -n 's|.*github\.com[:/]\([^/]*/[^/]*\).*|\1|p')
    remote_owner_repo="${remote_owner_repo%.git}"
    [ -z "$remote_owner_repo" ] && continue

    if [ "$url_owner_repo" = "$remote_owner_repo" ]; then
      local alias=$(basename "$f" .yaml)
      CONFIG_FILE="$f"
      PROJECT_ALIAS="$alias"
      reset_config
      return 0
    fi
  done

  return 1
}

# Try to auto-resolve a project from a Linear or GitHub Issue URL
# using ticket.linear_team or ticket.github_repo in each project's config.
#
# Returns 0 and sets CONFIG_FILE/PROJECT_ALIAS on a unique match.
# Returns 0 (with a warning + interactive fallback) on conflict.
# Returns 1 if no project has the relevant config fields set.
resolve_project_from_ticket_url() {
  local url="$1"

  [ ! -d "$PROJECTS_DIR" ] && return 1

  local is_linear=false
  local match_value=""

  # Determine URL type and extract the matchable token
  if [[ "$url" =~ ^https://linear\.app/([^/]+)/ ]]; then
    is_linear=true
    match_value="${BASH_REMATCH[1]}"   # e.g. "myteam"
  elif [[ "$url" =~ ^https://github\.com/([^/]+/[^/]+)/issues/ ]]; then
    match_value="${BASH_REMATCH[1]%.git}"   # e.g. "owner/repo"
  fi

  # URL type not matched — bail early
  [ -z "$match_value" ] && return 1

  local -a matched_aliases=()
  local -a matched_files=()

  for f in "$PROJECTS_DIR"/*.yaml; do
    [ -f "$f" ] || continue

    local configured_value=""
    if [ "$is_linear" = true ]; then
      configured_value=$(yq -r '.ticket.linear_team // ""' "$f" 2>/dev/null)
    else
      configured_value=$(yq -r '.ticket.github_repo // ""' "$f" 2>/dev/null)
    fi
    [ -z "$configured_value" ] || [ "$configured_value" = "null" ] && continue

    # Normalize: strip trailing .git
    configured_value="${configured_value%.git}"

    if [ "$configured_value" = "$match_value" ]; then
      matched_aliases+=("$(basename "$f" .yaml)")
      matched_files+=("$f")
    fi
  done

  # No project has this field configured → let caller fall through
  [ ${#matched_aliases[@]} -eq 0 ] && return 1

  # Exactly one match → auto-resolve silently
  if [ ${#matched_aliases[@]} -eq 1 ]; then
    CONFIG_FILE="${matched_files[0]}"
    PROJECT_ALIAS="${matched_aliases[0]}"
    reset_config
    return 0
  fi

  # Multiple matches → warn + interactive picker
  local conflict_label
  if [ "$is_linear" = true ]; then
    conflict_label="Linear team '$match_value'"
  else
    conflict_label="GitHub repo '$match_value'"
  fi

  warn "Multiple projects claim $conflict_label:"
  for a in "${matched_aliases[@]}"; do
    echo -e "  ${YELLOW}@$a${NC}"
  done
  echo ""
  select_project_interactive "for $conflict_label"
  return 0
}

# Try to resolve the correct project from the current working directory
resolve_project_from_cwd() {
  local cwd=$(pwd)

  if [ ! -d "$PROJECTS_DIR" ]; then
    return 1
  fi

  for f in "$PROJECTS_DIR"/*.yaml; do
    [ -f "$f" ] || continue
    local ws_base=$(yq -r '.tadpole_base // .workspace_base // ""' "$f" 2>/dev/null)
    [ -z "$ws_base" ] || [ "$ws_base" = "null" ] && continue
    ws_base="${ws_base/#\~/$HOME}"

    if [[ "$cwd" == "$ws_base" || "$cwd" == "$ws_base/"* ]]; then
      local alias=$(basename "$f" .yaml)
      CONFIG_FILE="$f"
      PROJECT_ALIAS="$alias"
      reset_config
      return 0
    fi

    local repo=$(yq -r '.main_repo // ""' "$f" 2>/dev/null)
    [ -z "$repo" ] || [ "$repo" = "null" ] && continue
    repo="${repo/#\~/$HOME}"

    if [[ "$cwd" == "$repo" || "$cwd" == "$repo/"* ]]; then
      local alias=$(basename "$f" .yaml)
      CONFIG_FILE="$f"
      PROJECT_ALIAS="$alias"
      reset_config
      return 0
    fi
  done

  return 1
}

# Resolve user-configured command aliases from global config
resolve_command_aliases() {
  local cmd="${1:-}"
  [ -z "$cmd" ] && return 1

  if [ ! -f "$GLOBAL_CONFIG" ]; then
    return 1
  fi

  local resolved
  resolved=$(cmd="$cmd" yq -r '.aliases.[strenv(cmd)] // ""' "$GLOBAL_CONFIG" 2>/dev/null)
  if [ -n "$resolved" ] && [ "$resolved" != "null" ]; then
    echo "$resolved"
    return 0
  fi
  return 1
}

# Interactively prompt user to select a project
# Sets CONFIG_FILE and PROJECT_ALIAS on success, exits on failure
select_project_interactive() {
  local context="${1:-}"

  if [ ! -d "$PROJECTS_DIR" ] || [ -z "$(ls -A "$PROJECTS_DIR" 2>/dev/null)" ]; then
    error "No projects registered. Run 'bufo init' first."
    exit 1
  fi

  # Collect project aliases
  local aliases=()
  local repos=()
  for f in "$PROJECTS_DIR"/*.yaml; do
    [ -f "$f" ] || continue
    local alias=$(basename "$f" .yaml)
    local repo=$(yq -r '.main_repo // ""' "$f" 2>/dev/null)
    aliases+=("$alias")
    repos+=("$repo")
  done

  # If only one project, use it directly
  if [ ${#aliases[@]} -eq 1 ]; then
    CONFIG_FILE="$PROJECTS_DIR/${aliases[0]}.yaml"
    PROJECT_ALIAS="${aliases[0]}"
    reset_config
    return
  fi

  echo -e "${CYAN}Select a project${NC}"
  if [ -n "$context" ]; then
    echo -e "  ${GRAY}$context${NC}"
  fi
  echo ""

  local i
  for i in "${!aliases[@]}"; do
    echo -e "  $((i + 1))) ${BOLD}@${aliases[$i]}${NC}  ${GRAY}${repos[$i]}${NC}"
  done
  echo ""

  local choice
  read -p "  Project [1-${#aliases[@]}]: " choice

  if ! [[ "$choice" =~ ^[0-9]+$ ]] || [ "$choice" -lt 1 ] || [ "$choice" -gt ${#aliases[@]} ]; then
    error "Invalid selection"
    exit 1
  fi

  local selected_alias="${aliases[$((choice - 1))]}"
  CONFIG_FILE="$PROJECTS_DIR/${selected_alias}.yaml"
  PROJECT_ALIAS="$selected_alias"
  reset_config
}

# List all registered projects
show_projects() {
  local subcmd="${1:-}"

  if [ "$subcmd" = "rm" ] || [ "$subcmd" = "remove" ] || [ "$subcmd" = "delete" ]; then
    remove_project "${2:-}"
    return
  fi

  if [ "$subcmd" = "default" ]; then
    set_default_project "${2:-}"
    return
  fi

  echo -e "${CYAN}Registered Projects${NC}"
  echo ""

  if [ ! -d "$PROJECTS_DIR" ] || [ -z "$(ls -A "$PROJECTS_DIR" 2>/dev/null)" ]; then
    echo "  No projects registered."
    echo ""
    echo "  Run 'bufo init' to register your first project."
    return
  fi

  local default_alias=""
  if [ -f "$GLOBAL_CONFIG" ]; then
    default_alias=$(yq -r '.default_project // ""' "$GLOBAL_CONFIG" 2>/dev/null)
    [ "$default_alias" = "null" ] && default_alias=""
  fi

  for f in "$PROJECTS_DIR"/*.yaml; do
    [ -f "$f" ] || continue
    local alias=$(basename "$f" .yaml)
    local repo=$(yq -r '.main_repo // ""' "$f" 2>/dev/null)
    local session=$(yq -r '.session_name // ""' "$f" 2>/dev/null)

    # Check if tadpole state exists for this session
    local status_icon="  "
    local state_dir="$CONFIG_DIR/state/$session"
    if [ -d "$state_dir" ] && [ -n "$(ls -A "$state_dir" 2>/dev/null)" ]; then
      status_icon="${GREEN}●${NC} "
    fi

    local default_marker=""
    if [ "$alias" = "$default_alias" ]; then
      default_marker=" ${YELLOW}(default)${NC}"
    fi

    echo -e "  ${status_icon}${BOLD}@$alias${NC}${default_marker}"
    echo -e "    ${GRAY}$repo${NC}"
  done
  echo ""
}

# Remove a project registration (config only) or fully delete a project
remove_project() {
  local alias="${1:-}"

  if [ -z "$alias" ]; then
    error "Usage: bufo projects delete <alias>"
    return 1
  fi

  alias="${alias#@}"

  local project_file="$PROJECTS_DIR/${alias}.yaml"
  if [ ! -f "$project_file" ]; then
    error "No project registered with alias: @$alias"
    return 1
  fi

  # Load project settings from the config
  local p_session p_ws_base p_main_repo p_prefix p_branch_pattern
  p_session=$(yq -r '.session_name // ""' "$project_file" 2>/dev/null)
  p_ws_base=$(yq -r '.tadpole_base // .workspace_base // ""' "$project_file" 2>/dev/null)
  p_ws_base="${p_ws_base/#\~/$HOME}"
  p_main_repo=$(yq -r '.main_repo // ""' "$project_file" 2>/dev/null)
  p_main_repo="${p_main_repo/#\~/$HOME}"
  p_prefix=$(yq -r '.tadpoles.prefix // "workspace"' "$project_file" 2>/dev/null)
  p_branch_pattern=$(yq -r '.tadpoles.branch_pattern // .workspaces.branch_pattern // "workspace-{N}"' "$project_file" 2>/dev/null)

  # Inventory what exists
  local ws_dirs=()
  if [ -d "$p_ws_base" ]; then
    for d in "$p_ws_base/$p_prefix"-*; do
      [ -d "$d" ] && ws_dirs+=("$d")
    done
  fi
  local state_dir="$CONFIG_DIR/state/$p_session"
  local wip_dir="$CONFIG_DIR/wip/$alias"

  # Show summary
  echo ""
  echo -e "${RED}${BOLD}Delete project @$alias${NC}"
  echo ""
  echo -e "  ${BOLD}Config:${NC}       $project_file"
  if [ ${#ws_dirs[@]} -gt 0 ]; then
    echo -e "  ${BOLD}Workspaces:${NC}   ${#ws_dirs[@]} found"
    for d in "${ws_dirs[@]}"; do
      echo -e "    ${GRAY}$d${NC}"
    done
  else
    echo -e "  ${BOLD}Workspaces:${NC}   ${GRAY}none${NC}"
  fi
  if [ -d "$state_dir" ]; then
    echo -e "  ${BOLD}State:${NC}        $state_dir"
  fi
  if [ -d "$wip_dir" ]; then
    echo -e "  ${BOLD}WIP data:${NC}     $wip_dir"
  fi
  echo ""
  echo -e "  ${GRAY}This will NOT delete your main repo at ${p_main_repo}${NC}"
  echo ""

  # First confirmation
  read -p "Are you sure you want to delete project @$alias? [y/N]: " confirm
  if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "Cancelled."
    return
  fi

  # Second confirmation — type alias to confirm
  read -p "Type the project alias to confirm: " confirm_alias
  if [ "$confirm_alias" != "$alias" ]; then
    echo "Alias does not match. Cancelled."
    return
  fi

  echo ""

  # Close any active iTerm2 tabs for this project's workspaces
  if [ -d "$state_dir" ]; then
    for f in "$state_dir"/tp*.json "$state_dir"/ws*.json; do
      [ -f "$f" ] || continue
      local tp_num main_sid
      tp_num=$(jq -r '.workspace' "$f" 2>/dev/null) || continue
      main_sid=$(jq -r '.panes.main' "$f" 2>/dev/null) || continue
      if [ -n "$main_sid" ] && [ "$main_sid" != "null" ]; then
        echo "  Closing tab for tadpole $tp_num..."
        iterm_close_tab_by_session "$main_sid" 2>/dev/null || true
      fi
    done
  fi

  # Remove tadpole directories via git worktree remove + fallback rm -rf
  if [ ${#ws_dirs[@]} -gt 0 ] && [ -d "$p_main_repo" ]; then
    for d in "${ws_dirs[@]}"; do
      local ws_basename
      ws_basename=$(basename "$d")
      echo "  Removing worktree $ws_basename..."
      git -C "$p_main_repo" worktree remove "$d" --force 2>/dev/null || true
      [ -d "$d" ] && rm -rf "$d"

      # Delete the tadpole branch if it exists
      local tp_num="${ws_basename##*-}"
      local branch_name="${p_branch_pattern//\{N\}/$tp_num}"
      if git -C "$p_main_repo" show-ref --verify --quiet "refs/heads/$branch_name" 2>/dev/null; then
        local in_use
        in_use=$(git -C "$p_main_repo" worktree list 2>/dev/null | grep -c "\[$branch_name\]" || true)
        if [ "$in_use" = "0" ]; then
          echo "  Deleting branch $branch_name..."
          git -C "$p_main_repo" branch -D "$branch_name" 2>/dev/null || true
        fi
      fi
    done
  fi

  # Remove tadpole base directory if empty
  if [ -d "$p_ws_base" ]; then
    rmdir "$p_ws_base" 2>/dev/null || true
  fi

  # Remove state directory
  if [ -d "$state_dir" ]; then
    echo "  Removing state directory..."
    rm -rf "$state_dir"
  fi

  # Remove WIP directory
  if [ -d "$wip_dir" ]; then
    echo "  Removing WIP data..."
    rm -rf "$wip_dir"
  fi

  # Remove config file
  echo "  Removing config..."
  rm "$project_file"

  # Clear default project if it was this alias
  if [ -f "$GLOBAL_CONFIG" ]; then
    local current_default
    current_default=$(yq -r '.default_project // ""' "$GLOBAL_CONFIG" 2>/dev/null)
    if [ "$current_default" = "$alias" ]; then
      yq -i '.default_project = ""' "$GLOBAL_CONFIG"
      echo -e "  ${YELLOW}Cleared default project (was @$alias)${NC}"
    fi
  fi

  echo ""
  success "Deleted project @$alias"
}

# Set or show the default project
set_default_project() {
  local alias="${1:-}"

  if [ -z "$alias" ]; then
    if [ ! -d "$PROJECTS_DIR" ] || [ -z "$(ls -A "$PROJECTS_DIR" 2>/dev/null)" ]; then
      echo "No projects registered. Run 'bufo init' to register a project."
      return
    fi

    local current=""
    if [ -f "$GLOBAL_CONFIG" ]; then
      current=$(yq -r '.default_project // ""' "$GLOBAL_CONFIG" 2>/dev/null)
      [ "$current" = "null" ] && current=""
    fi

    echo -e "${CYAN}Set Default Project${NC}"
    echo ""

    local -a aliases=()
    for f in "$PROJECTS_DIR"/*.yaml; do
      aliases+=("$(basename "$f" .yaml)")
    done

    local i=1
    for a in "${aliases[@]}"; do
      local marker=""
      [ "$a" = "$current" ] && marker=" ${YELLOW}(current)${NC}"
      echo -e "  ${BOLD}$i)${NC} @$a${marker}"
      (( i++ ))
    done

    echo ""
    printf "Select project [1-%d]: " "${#aliases[@]}"
    read -r selection

    if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt "${#aliases[@]}" ]; then
      error "Invalid selection."
      return 1
    fi

    alias="${aliases[$((selection - 1))]}"
  fi

  alias="${alias#@}"

  local project_file="$PROJECTS_DIR/${alias}.yaml"
  if [ ! -f "$project_file" ]; then
    error "No project registered with alias: @$alias"
    echo "Run 'bufo projects' to see registered projects."
    return 1
  fi

  mkdir -p "$CONFIG_DIR"
  if [ -f "$GLOBAL_CONFIG" ]; then
    VALUE="$alias" yq -i '.default_project = strenv(VALUE)' "$GLOBAL_CONFIG"
  else
    # Write atomically (temp file + rename) to avoid a partial file on interruption
    local tmp_global
    tmp_global=$(mktemp "$CONFIG_DIR/.global_config.XXXXXX")
    cat > "$tmp_global" << EOF
# Bufo Global Configuration
default_project: $alias
EOF
    mv "$tmp_global" "$GLOBAL_CONFIG"
  fi

  success "Default project set to @$alias"
}

# =============================================================================
# Alias Management
# =============================================================================

handle_alias_command() {
  local subcmd="${1:-}"

  case "$subcmd" in
    "")
      if [ ! -f "$GLOBAL_CONFIG" ]; then
        echo -e "${YELLOW}No aliases configured.${NC}"
        echo ""
        echo "Set one with: bufo alias set <name> <command...>"
        return
      fi

      local aliases
      aliases=$(yq -r '.aliases // {} | to_entries[] | .key + " → " + (.value | tostring)' "$GLOBAL_CONFIG" 2>/dev/null)
      if [ -z "$aliases" ]; then
        echo -e "${YELLOW}No aliases configured.${NC}"
        echo ""
        echo "Set one with: bufo alias set <name> <command...>"
        return
      fi

      echo -e "${CYAN}Command Aliases${NC}"
      echo ""
      while IFS= read -r line; do
        local name="${line%% →*}"
        local value="${line#*→ }"
        echo -e "  ${GREEN}$name${NC} → $value"
      done <<< "$aliases"
      echo ""
      echo -e "${GRAY}Config: $GLOBAL_CONFIG${NC}"
      ;;
    "set"|"add")
      local name="${2:-}"
      if [ -z "$name" ]; then
        error "Usage: bufo alias set <name> <command...>"
        exit 1
      fi
      if ! [[ "$name" =~ ^[a-zA-Z0-9_-]+$ ]]; then
        error "Invalid alias name '$name'. Use only letters, numbers, hyphens, and underscores."
        exit 1
      fi

      shift 2
      local value="$*"
      if [ -z "$value" ]; then
        error "Usage: bufo alias set <name> <command...>"
        exit 1
      fi

      mkdir -p "$CONFIG_DIR"
      if [ ! -f "$GLOBAL_CONFIG" ]; then
        echo "{}" > "$GLOBAL_CONFIG"
      fi

      NAME="$name" VALUE="$value" yq -i '.aliases.[strenv(NAME)] = strenv(VALUE)' "$GLOBAL_CONFIG"
      echo -e "${GREEN}Alias set:${NC} $name → $value"
      ;;
    "rm"|"remove"|"delete")
      local name="${2:-}"
      if [ -z "$name" ]; then
        error "Usage: bufo alias rm <name>"
        exit 1
      fi

      if [ ! -f "$GLOBAL_CONFIG" ]; then
        error "No aliases configured"
        exit 1
      fi

      local existing
      existing=$(NAME="$name" yq -r '.aliases.[strenv(NAME)] // ""' "$GLOBAL_CONFIG" 2>/dev/null)
      if [ -z "$existing" ] || [ "$existing" = "null" ]; then
        error "Alias '$name' not found"
        exit 1
      fi

      NAME="$name" yq -i 'del(.aliases.[strenv(NAME)])' "$GLOBAL_CONFIG"

      local remaining
      remaining=$(yq -r '.aliases // {} | length' "$GLOBAL_CONFIG" 2>/dev/null)
      if [ "$remaining" = "0" ]; then
        yq -i 'del(.aliases)' "$GLOBAL_CONFIG"
      fi

      echo -e "${GREEN}Removed alias:${NC} $name"
      ;;
    *)
      error "Unknown alias subcommand: $subcmd"
      echo ""
      echo "Usage:"
      echo "  bufo alias              List all aliases"
      echo "  bufo alias set <name> <command...>  Set an alias"
      echo "  bufo alias rm <name>    Remove an alias"
      exit 1
      ;;
  esac
}
