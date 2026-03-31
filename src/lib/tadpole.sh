#!/usr/bin/env bash
# bufo - tadpole operations (iTerm2 native)
# Core tadpole management: list, open, create layout, cleanup, restart, continue

# =============================================================================
# Tadpole Naming
# =============================================================================

# Get the display name for a tadpole
# Returns the custom name if set, otherwise "ws<N>"
get_tadpole_name() {
  local num=$1
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
  local name_file="$dir/.bufo-name"

  if [ -f "$name_file" ]; then
    cat "$name_file"
  else
    echo "tp$num"
  fi
}

# Set a custom name for a tadpole and update the iTerm2 tab title
set_tadpole_name() {
  local num=$1
  local name="$2"
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"

  echo "$name" > "$dir/.bufo-name"

  # Update iTerm2 tab title if tadpole is active (uses computed title from metadata)
  update_tab_title "$num"
}

# Clear the custom name for a tadpole
clear_tadpole_name() {
  local num=$1
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
  rm -f "$dir/.bufo-name"
}

# Compute the terminal tab title for a tadpole
# Priority: {name}: {PR title} > {name} (ticket) > {branch} > tp{N}
compute_tab_title() {
  local num="$1"
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
  local meta_file="$dir/.bufo-meta"
  local name
  name=$(get_tadpole_name "$num")

  local title=""

  if [ -f "$meta_file" ]; then
    local pr_title ticket
    pr_title=$(jq -r '.pr_title // ""' "$meta_file" 2>/dev/null) || true
    ticket=$(jq -r '.ticket // ""' "$meta_file" 2>/dev/null) || true

    if [ -n "$pr_title" ]; then
      title="$name: $pr_title"
    elif [ -n "$ticket" ]; then
      # Ticket ID is often the tadpole name already; avoid "ENG-123: ENG-123"
      title="$name"
    fi
  fi

  # If no PR/ticket metadata, show branch (or tadpole name as fallback)
  if [ -z "$title" ]; then
    local branch=""
    if [ -d "$dir" ]; then
      branch=$(cd "$dir" && git branch --show-current 2>/dev/null) || true
    fi
    if [ -n "$branch" ] && [ "$branch" != "main" ] && [ "$branch" != "master" ]; then
      title="$branch"
    else
      title="$name"
    fi
  fi

  # Prefix with project alias when available
  if [ -n "$PROJECT_ALIAS" ]; then
    title="@${PROJECT_ALIAS} $title"
  fi

  # Truncate to 60 chars
  if [ ${#title} -gt 60 ]; then
    title="${title:0:57}..."
  fi

  echo "$title"
}

# Update the iTerm2 tab title for an active tadpole using computed title
update_tab_title() {
  local num="$1"

  if state_workspace_exists "$SESSION_NAME" "$num"; then
    local title
    title=$(compute_tab_title "$num")
    state_load_workspace "$SESSION_NAME" "$num"
    iterm_rename_tab_by_session "$TP_MAIN_SID" "$title" 2>/dev/null || true
  fi
}

# =============================================================================
# Tadpole Locking
# =============================================================================

# Check if a tadpole is locked
# Tadpoles are unlocked by default (no lock file = unlocked)
is_tadpole_locked() {
  local num=$1
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
  [ -f "$dir/.bufo-lock" ]
}

# Lock a tadpole (mark as in-use, don't reuse for PR/ticket)
lock_tadpole() {
  local num=$1
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"

  if [ ! -d "$dir" ]; then
    error "Tadpole $num does not exist"
    return 1
  fi

  touch "$dir/.bufo-lock"
  success "Tadpole $num locked"
}

# Unlock a tadpole (mark as available for reuse by PR/ticket)
unlock_tadpole() {
  local num=$1
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"

  if [ ! -d "$dir" ]; then
    error "Tadpole $num does not exist"
    return 1
  fi

  rm -f "$dir/.bufo-lock"
  success "Tadpole $num unlocked (available for reuse)"
}

# Unlock all non-active tadpoles
unlock_all_tadpoles() {
  local unlocked=0
  local skipped=0

  for dir in "$TADPOLE_BASE/$TADPOLE_PREFIX-"*; do
    [ -d "$dir" ] || continue
    local num
    num=$(basename "$dir" | sed "s/${TADPOLE_PREFIX}-//")
    [[ "$num" =~ ^[0-9]+$ ]] || continue

    # Skip tadpoles that don't have a lock file
    if ! [ -f "$dir/.bufo-lock" ]; then
      continue
    fi

    # Skip active tadpoles
    if state_workspace_exists "$SESSION_NAME" "$num"; then
      skipped=$((skipped + 1))
      continue
    fi

    rm -f "$dir/.bufo-lock"
    unlocked=$((unlocked + 1))
  done

  if [ "$unlocked" -eq 0 ] && [ "$skipped" -eq 0 ]; then
    echo -e "${GRAY}No locked tadpoles found${NC}"
  else
    [ "$unlocked" -gt 0 ] && success "Unlocked $unlocked tadpole(s)"
    [ "$skipped" -gt 0 ] && echo -e "${GRAY}Skipped $skipped active tadpole(s)${NC}"
  fi
}

# Find the first unlocked tadpole
# Returns: tadpole number, or empty string if none found
find_unlocked_tadpole() {
  for dir in "$TADPOLE_BASE/$TADPOLE_PREFIX-"*; do
    [ -d "$dir" ] || continue
    local num
    num=$(basename "$dir" | sed "s/${TADPOLE_PREFIX}-//")
    [[ "$num" =~ ^[0-9]+$ ]] || continue

    if ! [ -f "$dir/.bufo-lock" ]; then
      echo "$num"
      return
    fi
  done

  echo ""
}

# Prepare an existing unlocked tadpole for reuse
# Resets to origin/main, closes any active tab, preserves .env files
prepare_tadpole_for_reuse() {
  local num=$1
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"

  echo -e "${YELLOW}Preparing tadpole $num for reuse...${NC}"

  # Close the iTerm2 tab if it exists
  if state_workspace_exists "$SESSION_NAME" "$num"; then
    state_load_workspace "$SESSION_NAME" "$num"
    iterm_close_tab_by_session "$TP_MAIN_SID" 2>/dev/null || true
    state_remove_workspace "$SESSION_NAME" "$num"
    sleep 0.3
  fi

  # Kill any running processes
  local kill_pattern=$(config_get "cleanup.kill_pattern" "")
  if [ -n "$kill_pattern" ]; then
    kill_pattern="${kill_pattern//\{N\}/$num}"
    kill_pattern="${kill_pattern//\{PREFIX\}/$TADPOLE_PREFIX}"
    # Escape ERE metacharacters so kill_pattern is matched literally by pkill -f
    kill_pattern="${kill_pattern//\\/\\\\}"
    kill_pattern="${kill_pattern//./\\.}"
    kill_pattern="${kill_pattern//\[/\\[}"
    kill_pattern="${kill_pattern//\]/\\]}"
    kill_pattern="${kill_pattern//\(/\\(}"
    kill_pattern="${kill_pattern//\)/\\)}"
    kill_pattern="${kill_pattern//\{/\\{}"
    kill_pattern="${kill_pattern//\}/\\}}"
    kill_pattern="${kill_pattern//\*/\\*}"
    kill_pattern="${kill_pattern//+/\\+}"
    kill_pattern="${kill_pattern//\?/\\?}"
    kill_pattern="${kill_pattern//^/\\^}"
    kill_pattern="${kill_pattern//\$/\\$}"
    kill_pattern="${kill_pattern//|/\\|}"
    pkill -f "$kill_pattern" 2>/dev/null || true
  fi

  cd "$dir"

  echo "  Fetching origin..."
  git fetch origin 2>/dev/null || true

  local default_branch
  default_branch=$(_get_default_branch "$dir")

  echo "  Resetting to $default_branch..."
  # We can't checkout 'main' in a worktree because it's already checked out in
  # the primary tadpole. Switch back to this worktree's own dedicated branch
  # (e.g. tadpole-3) and reset it to origin/main.
  local branch_name
  branch_name=$(get_branch_name "$num")
  git checkout "$branch_name" 2>/dev/null || git checkout -b "$branch_name" "$default_branch" 2>/dev/null || true
  git reset --hard "$default_branch" 2>/dev/null || true

  echo "  Cleaning untracked files..."
  local exclude_pattern=$(config_get "cleanup.preserve_files" ".env")
  git clean -fd --exclude="$exclude_pattern" --exclude=".bufo-*" 2>/dev/null || true

  reset_submodules "$dir"

  # Sync MCP servers config from main repo (matches fresh create_workspace behaviour)
  sync_mcp_servers "$dir"

  # Lock the tadpole now that it's being claimed
  touch "$dir/.bufo-lock"

  # Clear the old name and metadata (caller will set new ones)
  clear_tadpole_name "$num"
  clear_workspace_meta "$num"

  echo -e "${GREEN}Tadpole $num ready for reuse${NC}"
}

# =============================================================================
# Tadpole Listing
# =============================================================================

# List all tadpoles
list_tadpoles() {
  load_config

  echo -e "${CYAN}Bufo Tadpoles${NC}"
  echo ""

  if ! config_exists; then
    echo -e "${YELLOW}No config file found.${NC}"
    echo ""
    echo "Run 'bufo init' to set up bufo."
    return
  fi

  validate_config

  # Check for active tadpoles via state files
  local has_active=false
  if [ -d "$STATE_DIR/$SESSION_NAME" ]; then
    for sf in "$STATE_DIR/$SESSION_NAME"/tp*.json; do
      [ -f "$sf" ] || continue
      has_active=true
      break
    done
  fi

  if [ "$has_active" = true ]; then
    echo -e "${GREEN}Active session: $SESSION_NAME${NC}"
    echo ""
  fi

  echo -e "${YELLOW}Available tadpoles:${NC}"
  local found=false

  local max_ws=$TADPOLE_COUNT
  for dir in "$TADPOLE_BASE/$TADPOLE_PREFIX-"*; do
    if [ -d "$dir" ]; then
      local num=$(basename "$dir" | sed "s/${TADPOLE_PREFIX}-//")
      if [[ "$num" =~ ^[0-9]+$ ]] && [ "$num" -gt "$max_ws" ]; then
        max_ws=$num
      fi
    fi
  done

  for ((i=1; i<=max_ws; i++)); do
    local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$i"
    if [ -d "$dir" ]; then
      found=true
      local branch=$(cd "$dir" && git branch --show-current 2>/dev/null || echo "unknown")
      local port_spacing=$(yq -r '.env_sync.port_spacing // 10' "$CONFIG_FILE" 2>/dev/null)
      [ "$port_spacing" = "null" ] && port_spacing=10
      local api_port=$((API_PORT_BASE + (i * port_spacing)))
      local env_port=$(read_env_port "$dir" "api")
      [ -n "$env_port" ] && api_port="$env_port"

      local status="${YELLOW}[available]${NC}"
      if state_workspace_exists "$SESSION_NAME" "$i"; then
        status="${GREEN}[active]${NC}"
      fi
      local lock_icon=""
      if is_tadpole_locked "$i"; then
        lock_icon=" ${RED}[locked]${NC}"
      else
        lock_icon=" ${GRAY}[unlocked]${NC}"
      fi
      local tp_name
      tp_name=$(get_tadpole_name "$i")
      local name_display=""
      if [ "$tp_name" != "tp$i" ]; then
        name_display=" ${BOLD}$tp_name${NC}"
      fi
      echo -e "  $i: $TADPOLE_PREFIX-$i ($branch) :$api_port $status$lock_icon$name_display"
    fi
  done

  if [ "$found" = false ]; then
    echo "  No tadpoles found."
    echo ""
    echo "Run 'bufo spawn' to create a tadpole."
  fi
}

# Interactive tadpole menu
interactive_tadpole_menu() {
  load_config

  if ! config_exists; then
    echo -e "${YELLOW}No config file found.${NC}"
    echo ""
    echo "Run 'bufo init' to set up bufo."
    return
  fi

  validate_config

  echo -e "${CYAN}Bufo Tadpoles${NC}"
  echo ""

  local max_ws=$TADPOLE_COUNT
  local existing_tadpoles=""
  for dir in "$TADPOLE_BASE/$TADPOLE_PREFIX-"*; do
    if [ -d "$dir" ]; then
      local num=$(basename "$dir" | sed "s/${TADPOLE_PREFIX}-//")
      if [[ "$num" =~ ^[0-9]+$ ]]; then
        existing_tadpoles="$existing_tadpoles $num"
        [ "$num" -gt "$max_ws" ] && max_ws=$num
      fi
    fi
  done

  echo -e "${YELLOW}Tadpoles:${NC}"
  local found=false
  for ((i=1; i<=max_ws; i++)); do
    local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$i"
    if [ -d "$dir" ]; then
      found=true
      local branch=$(cd "$dir" && git branch --show-current 2>/dev/null || echo "unknown")
      local port_spacing=$(yq -r '.env_sync.port_spacing // 10' "$CONFIG_FILE" 2>/dev/null)
      [ "$port_spacing" = "null" ] && port_spacing=10
      local api_port=$((API_PORT_BASE + (i * port_spacing)))
      local env_port=$(read_env_port "$dir" "api")
      [ -n "$env_port" ] && api_port="$env_port"

      local status="${YELLOW}[available]${NC}"
      if state_workspace_exists "$SESSION_NAME" "$i"; then
        status="${GREEN}[active]${NC}"
      fi
      local lock_icon=""
      if is_tadpole_locked "$i"; then
        lock_icon=" ${RED}[locked]${NC}"
      else
        lock_icon=" ${GRAY}[unlocked]${NC}"
      fi
      local tp_name
      tp_name=$(get_tadpole_name "$i")
      local name_display=""
      if [ "$tp_name" != "tp$i" ]; then
        name_display=" ${BOLD}$tp_name${NC}"
      fi
      echo -e "  $i: $TADPOLE_PREFIX-$i ($branch) :$api_port $status$lock_icon$name_display"
    fi
  done

  if [ "$found" = false ]; then
    echo "  (none created yet)"
  fi

  echo ""
  echo -e "${CYAN}Actions:${NC}"
  echo "  [1-9] Open tadpole    [n] New    [r] Restart    [c] Cleanup    [q] Quit"
  echo ""
  printf "  > "

  read -r choice

  case "$choice" in
    q|Q|quit|exit|"")
      return 0
      ;;
    n|N|spawn)
      create_new_tadpole
      ;;
    r|R|restart)
      echo -n "  Restart which tadpole? [1-9]: "
      read -r tp_num
      if [[ "$tp_num" =~ ^[0-9]+$ ]]; then
        restart_tadpole "$tp_num"
      else
        error "Invalid tadpole number"
      fi
      ;;
    c|C|cleanup)
      echo -n "  Cleanup which tadpole? [1-9]: "
      read -r tp_num
      if [[ "$tp_num" =~ ^[0-9]+$ ]]; then
        cleanup_tadpole "$tp_num"
      else
        error "Invalid tadpole number"
      fi
      ;;
    *)
      if [[ "$choice" =~ ^[0-9]+$ ]]; then
        open_tadpole "$choice"
      else
        error "Unknown option: $choice"
      fi
      ;;
  esac
}

# =============================================================================
# Tadpole Layout (iTerm2)
# =============================================================================

# Get command for a pane from config
# Usage: get_pane_command <pane_name> [session_name]
get_pane_command() {
  local pane_name=$1
  local session_name="${2:-}"
  local panes_count=$(yq -r '.layout.panes | length // 0' "$CONFIG_FILE" 2>/dev/null)

  for ((i=0; i<panes_count; i++)); do
    local name=$(yq -r ".layout.panes[$i].name" "$CONFIG_FILE" 2>/dev/null)
    if [ "$name" = "$pane_name" ]; then
      local cmd
      cmd=$(yq -r ".layout.panes[$i].command // \"\"" "$CONFIG_FILE" 2>/dev/null)

      # If this is the main pane and ai_tool is explicitly set, use the configured AI command
      if [ "$pane_name" = "main" ] && [ -n "$cmd" ]; then
        local configured_tool=$(config_get "ai_tool" "")
        if [ -n "$configured_tool" ]; then
          cmd=$(get_ai_interactive_cmd "$session_name")
        fi
      fi

      echo "$cmd"
      return
    fi
  done
  echo ""
}

# Create the iTerm2 layout for a tadpole
# Layout:
# ┌─────────┬────────────────┐
# │terminal │                │
# ├─────────┤ main           │
# │ server  │                │
# ├──────────────────────────┤
# │ info bar (full width)    │
# └──────────────────────────┘
create_tadpole_layout() {
  local window_name=$1
  local dir=$2
  local dev_cmd=$3
  local claude_cmd=$4
  local port_msg=$5
  local mode=$6  # "new" or "add"
  local tp_num="${7:-}"  # tadpole number (optional, extracted from name if not provided)
  local infobar_override="${8:-}"  # optional: custom infobar command (skips get_infobar_command)

  # Create window or tab
  local ids=""
  if [ "$mode" = "new" ]; then
    ids=$(iterm_create_window "$window_name" "$dir")
  else
    ids=$(iterm_create_tab "$window_name" "$dir")
  fi

  # Parse returned IDs — full_pane is the initial pane spanning the whole tab
  # Note: window_name can contain colons (e.g. "PR #42: fix(app)"), so we
  # extract window_id from the front and session_id from the back, using
  # the fact that neither contains colons (integer and UUID respectively).
  local window_id=""
  local tab_id="$window_name"
  local full_pane=""

  if [ "$mode" = "new" ]; then
    window_id=$(echo "$ids" | cut -d: -f1)
    full_pane="${ids##*:}"
  else
    full_pane="${ids##*:}"
    window_id="current"
  fi

  if [ -z "$full_pane" ]; then
    error "Failed to get session ID from iTerm2 (ids='$ids')"
    return 1
  fi

  # Give iTerm2 time to fully register the new window
  sleep 0.5

  # Step 1: Split info bar off the bottom FIRST (full width)
  # Use a regular split first — we'll resize it at the end after layout settles
  local info_sid=$(iterm_split_horizontal "$full_pane")
  sleep 0.3

  if [ -z "$info_sid" ]; then
    warn "Info bar split failed (full_pane='$full_pane')"
  fi

  # full_pane is now the top area (terminal + main)
  local terminal_sid="$full_pane"

  # Step 2: Split terminal pane → right split for main
  local main_sid=$(iterm_split_vertical "$terminal_sid")
  sleep 0.3

  if [ -z "$main_sid" ]; then
    warn "Vertical split failed (terminal_sid='$terminal_sid')"
  fi

  # Step 3: Split terminal pane → bottom split for server
  local server_sid=$(iterm_split_horizontal "$terminal_sid")
  sleep 0.3

  if [ -z "$server_sid" ]; then
    warn "Horizontal split failed (terminal_sid='$terminal_sid')"
  fi

  # cd all panes to tadpole dir before sending commands
  # Stagger sends to avoid iTerm2 race conditions with rapid write text calls
  iterm_send_text "$terminal_sid" "cd '$dir' && clear"
  sleep 0.2
  iterm_send_text "$server_sid" "cd '$dir' && clear"
  sleep 0.2
  iterm_send_text "$main_sid" "cd '$dir' && clear"
  sleep 0.3

  # Send commands to panes
  [ -n "$dev_cmd" ] && iterm_send_text "$server_sid" "$dev_cmd"
  [ -n "$claude_cmd" ] && iterm_send_text "$main_sid" "$claude_cmd"

  # Start info bar watch loop and resize to minimal height
  # Resize AFTER all splits are done so iTerm2 layout has fully settled,
  # then resize again after a delay to catch post-window-manager resize
  if [ -n "$info_sid" ]; then
    local infobar_cmd
    if [ -n "$infobar_override" ]; then
      infobar_cmd="$infobar_override"
    else
      infobar_cmd=$(get_infobar_command "$dir")
    fi
    iterm_send_text "$info_sid" "cd '$dir' && clear && $infobar_cmd"
    sleep 0.3
    iterm_resize_session "$info_sid" 3
    # Second resize in background to catch tiling window manager expansion
    (sleep 2 && iterm_resize_session "$info_sid" 3) &
  fi

  # Export layout IDs for callers that manage their own state
  LAYOUT_WINDOW_ID="$window_id"
  LAYOUT_TERMINAL_SID="$terminal_sid"
  LAYOUT_SERVER_SID="$server_sid"
  LAYOUT_MAIN_SID="$main_sid"
  LAYOUT_INFO_SID="${info_sid:-}"

  # Save state for reconnection
  if [ -z "$tp_num" ] && [[ "$window_name" =~ ^tp([0-9]+)$ ]]; then
    tp_num="${BASH_REMATCH[1]}"
  fi

  if [ -n "$tp_num" ]; then
    state_save_workspace "$SESSION_NAME" "$tp_num" "$window_id" "$tab_id" "$terminal_sid" "$server_sid" "$main_sid" "$info_sid"
  fi

  # Set the computed title on all panes so the tab name is correct regardless of focus
  iterm_rename_tab_by_session "$terminal_sid" "$window_name" 2>/dev/null || true
}

# Check and setup tadpole (dependencies, .env sync, shared volume)
check_and_setup_tadpole() {
  local dir=$1
  local num=$2

  check_and_install_deps "$dir"
  setup_shared_volume "$dir"
  setup_companions "$dir"

  echo -e "${BLUE}Syncing .env files for tadpole $num...${NC}"
  sync_env_files "$dir" "$num"
}

# Check if dependencies need installing
check_and_install_deps() {
  local dir=$1
  local install_cmd=$(config_get "install_command" "")

  [ -z "$install_cmd" ] && return

  cd "$dir"

  local marker="$dir/node_modules/.bufo-installed"
  local need_install="false"

  if [ ! -d "$dir/node_modules" ]; then
    need_install="true"
  elif [ ! -f "$marker" ]; then
    need_install="true"
  elif [ -f "$dir/pnpm-lock.yaml" ] && [ "$dir/pnpm-lock.yaml" -nt "$marker" ]; then
    need_install="true"
  elif [ -f "$dir/package-lock.json" ] && [ "$dir/package-lock.json" -nt "$marker" ]; then
    need_install="true"
  elif [ -f "$dir/yarn.lock" ] && [ "$dir/yarn.lock" -nt "$marker" ]; then
    need_install="true"
  fi

  if [ "$need_install" = "true" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    local install_env=$(config_get "install_env" "")
    if run_install_command "$install_cmd" "$install_env"; then
      touch "$marker"
      echo -e "${GREEN}Dependencies installed${NC}"
    else
      error "Failed to install dependencies"
      return 1
    fi
  fi

  local submodules_count=$(yq -r '.submodules | length // 0' "$CONFIG_FILE" 2>/dev/null)
  for ((i=0; i<submodules_count; i++)); do
    local sub_path=$(yq -r ".submodules[$i].path" "$CONFIG_FILE" 2>/dev/null)
    local sub_install=$(yq -r ".submodules[$i].install_command // \"\"" "$CONFIG_FILE" 2>/dev/null)

    [ -z "$sub_path" ] || [ "$sub_path" = "null" ] && continue
    [ -z "$sub_install" ] || [ "$sub_install" = "null" ] && continue

    local sub_dir="$dir/$sub_path"
    if [ -d "$sub_dir" ]; then
      local sub_marker="$sub_dir/node_modules/.bufo-installed"
      local sub_need_install="false"

      if [ ! -d "$sub_dir/node_modules" ]; then
        sub_need_install="true"
      elif [ ! -f "$sub_marker" ]; then
        sub_need_install="true"
      fi

      if [ "$sub_need_install" = "true" ]; then
        echo -e "${YELLOW}Installing $sub_path dependencies...${NC}"
        cd "$sub_dir"
        local install_env=$(config_get "install_env" "")
        if run_install_command "$sub_install" "$install_env" "$sub_path"; then
          [ -d "node_modules" ] && touch "$sub_marker"
          echo -e "${GREEN}$sub_path dependencies installed${NC}"
        else
          warn "Failed to install $sub_path dependencies"
        fi
        cd "$dir"
      fi
    fi
  done
}

# =============================================================================
# Open Tadpole
# =============================================================================

open_tadpole() {
  local num=$1
  local initial_prompt="${2:-}"
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
  local window_name
  window_name=$(compute_tab_title "$num")

  if [ ! -d "$dir" ]; then
    create_workspace "$num"
  fi

  # Auto-lock tadpole when opened
  touch "$dir/.bufo-lock"

  local port_info=$(get_workspace_ports "$num" "$dir")
  local api_port=$(echo "$port_info" | cut -d: -f1)
  local app_port=$(echo "$port_info" | cut -d: -f2)
  local need_override=$(echo "$port_info" | cut -d: -f3)
  local env_api_port=$(echo "$port_info" | cut -d: -f4)

  check_and_setup_tadpole "$dir" "$num"

  local dev_cmd=$(get_pane_command "server")
  local claude_cmd=$(get_pane_command "main" "$window_name")

  # Always ensure team context exists in CLAUDE.md (opt out via team_mode.enabled: false in config)
  local team_mode
  team_mode=$(yq -r '.team_mode.enabled // "true"' "$CONFIG_FILE" 2>/dev/null)
  if [ "$team_mode" != "false" ]; then
    local team_file="$dir/.claude/CLAUDE.md"
    mkdir -p "$dir/.claude"

    # IMPORTANT: keep "## Team Mode" as the first heading in claude-md-team-mode.md
    # — bufo uses it as a sentinel to avoid appending duplicate sections to CLAUDE.md.
    if ! grep -q "^## Team Mode$" "$team_file" 2>/dev/null; then
      local default_team_mode
      default_team_mode=$(cat << 'EOF'

## Team Mode

You can spawn agent teammates for complex tasks. Use the Task tool to create specialized agents (researcher, implementer, reviewer, debugger) that work in parallel. Coordinate the team, assign tasks, and synthesize results. Only spawn teams when the task benefits from parallel work.
EOF
)
      local team_mode_text
      team_mode_text=$(load_prompt "claude-md-team-mode" "$default_team_mode")
      printf '\n%s\n' "$team_mode_text" >> "$team_file"
    fi
  fi

  if [ "$need_override" = "true" ]; then
    dev_cmd="PORT=$api_port APP_PORT=$app_port $dev_cmd"
    echo -e "${YELLOW}  Port $env_api_port in use, using $api_port instead${NC}"
  fi

  local port_msg="Using port $env_api_port"
  [ "$need_override" = "true" ] && port_msg="Port $env_api_port in use → using $api_port"

  # Append initial prompt to claude command if provided
  if [ -n "$initial_prompt" ]; then
    if [ -z "$claude_cmd" ]; then
      # Ticket/PR workflows require an AI tool — default to configured tool if not in layout
      claude_cmd=$(get_ai_interactive_cmd "$window_name")
    fi
    # Write prompt to a file to avoid AppleScript escaping issues
    # (printf '%q' produces actual newlines that break osascript strings)
    local prompt_file="$dir/.bufo-prompt"
    echo "$initial_prompt" > "$prompt_file"
    claude_cmd=$(ai_pipe_prompt_file "$prompt_file")
  fi

  # Check if tadpole already has an active tab
  if state_workspace_exists "$SESSION_NAME" "$num"; then
    if [ -n "$initial_prompt" ]; then
      # Ticket mode: restart the main pane with the new prompt
      state_load_workspace "$SESSION_NAME" "$num"

      echo "  Tab exists, restarting with ticket prompt..."
      iterm_send_interrupt "$TP_SERVER_SID"
      sleep 0.3
      [ -n "$dev_cmd" ] && iterm_send_text "$TP_SERVER_SID" "$dev_cmd"

      # Interrupt clears any running shell command; /exit quits an interactive Claude session
      iterm_send_interrupt "$TP_MAIN_SID"
      sleep 0.3
      iterm_send_text "$TP_MAIN_SID" "/exit"
      sleep 0.5
      [ -n "$claude_cmd" ] && iterm_send_text "$TP_MAIN_SID" "clear && $claude_cmd"

      # Refresh info bar
      if [ -n "$TP_INFO_SID" ] && [ "$TP_INFO_SID" != "null" ]; then
        iterm_send_interrupt "$TP_INFO_SID"
        sleep 0.3
        local infobar_cmd
        infobar_cmd=$(get_infobar_command "$dir")
        iterm_send_text "$TP_INFO_SID" "clear && $infobar_cmd"
      fi

      success "Tadpole $num started with ticket prompt"
    else
      echo -e "${CYAN}Switching to tadpole $num...${NC}"
      state_load_workspace "$SESSION_NAME" "$num"

      # Refresh info bar on reconnect
      if [ -n "$TP_INFO_SID" ] && [ "$TP_INFO_SID" != "null" ]; then
        iterm_send_interrupt "$TP_INFO_SID"
        sleep 0.3
        local infobar_cmd
        infobar_cmd=$(get_infobar_command "$dir")
        iterm_send_text "$TP_INFO_SID" "clear && $infobar_cmd"
      fi

      iterm_focus_session "$TP_MAIN_SID"
    fi
  else
    # Create new layout
    if [ -n "$initial_prompt" ]; then
      echo -e "${CYAN}Starting tadpole $num (with ticket prompt)...${NC}"
    else
      echo -e "${CYAN}Starting tadpole $num...${NC}"
    fi
    echo "  Directory: $dir"
    echo -e "  ${YELLOW}$port_msg${NC}"

    create_tadpole_layout "$window_name" "$dir" "$dev_cmd" "$claude_cmd" "$port_msg" "new" "$num"
  fi
}

# Open tadpole in a separate iTerm2 window (always creates new window)
open_tadpole_separate() {
  local num=$1
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
  local window_name
  window_name=$(compute_tab_title "$num")

  if [ ! -d "$dir" ]; then
    create_workspace "$num"
  fi

  # Auto-lock tadpole when opened
  touch "$dir/.bufo-lock"

  local port_info=$(get_workspace_ports "$num" "$dir")
  local api_port=$(echo "$port_info" | cut -d: -f1)
  local app_port=$(echo "$port_info" | cut -d: -f2)
  local need_override=$(echo "$port_info" | cut -d: -f3)
  local env_api_port=$(echo "$port_info" | cut -d: -f4)

  echo -e "${CYAN}Starting tadpole $num in separate window...${NC}"

  check_and_setup_tadpole "$dir" "$num"

  local dev_cmd=$(get_pane_command "server")
  local claude_cmd=$(get_pane_command "main" "$window_name")

  if [ "$need_override" = "true" ]; then
    dev_cmd="PORT=$api_port APP_PORT=$app_port $dev_cmd"
    echo -e "${YELLOW}  Port $env_api_port in use, using $api_port instead${NC}"
  fi

  local port_msg="Using port $env_api_port"
  [ "$need_override" = "true" ] && port_msg="Port $env_api_port in use → using $api_port"

  create_tadpole_layout "$window_name" "$dir" "$dev_cmd" "$claude_cmd" "$port_msg" "new" "$num"
}

# =============================================================================
# Cleanup / Restart / Continue
# =============================================================================

cleanup_tadpole() {
  local num=$1
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
  local window_name="tp$num"

  if [ ! -d "$dir" ]; then
    error "Tadpole $num does not exist at $dir"
    exit 1
  fi

  echo -e "${YELLOW}Cleaning up tadpole $num...${NC}"

  # Close the iTerm2 tab if it exists
  if state_workspace_exists "$SESSION_NAME" "$num"; then
    state_load_workspace "$SESSION_NAME" "$num"
    iterm_close_tab_by_session "$TP_MAIN_SID" 2>/dev/null || true
    state_remove_workspace "$SESSION_NAME" "$num"
  fi

  # Kill any running processes for this tadpole
  local kill_pattern=$(config_get "cleanup.kill_pattern" "")
  if [ -n "$kill_pattern" ]; then
    kill_pattern="${kill_pattern//\{N\}/$num}"
    kill_pattern="${kill_pattern//\{PREFIX\}/$TADPOLE_PREFIX}"
    # Escape ERE metacharacters so kill_pattern is matched literally by pkill -f
    kill_pattern="${kill_pattern//\\/\\\\}"
    kill_pattern="${kill_pattern//./\\.}"
    kill_pattern="${kill_pattern//\[/\\[}"
    kill_pattern="${kill_pattern//\]/\\]}"
    kill_pattern="${kill_pattern//\(/\\(}"
    kill_pattern="${kill_pattern//\)/\\)}"
    kill_pattern="${kill_pattern//\{/\\{}"
    kill_pattern="${kill_pattern//\}/\\}}"
    kill_pattern="${kill_pattern//\*/\\*}"
    kill_pattern="${kill_pattern//+/\\+}"
    kill_pattern="${kill_pattern//\?/\\?}"
    kill_pattern="${kill_pattern//^/\\^}"
    kill_pattern="${kill_pattern//\$/\\$}"
    kill_pattern="${kill_pattern//|/\\|}"
    pkill -f "$kill_pattern" 2>/dev/null || true
  fi

  cd "$dir"

  echo "  Fetching origin..."
  git fetch origin 2>/dev/null || true

  local default_branch
  default_branch=$(_get_default_branch "$dir")

  echo "  Resetting to $default_branch..."
  # We can't checkout 'main' in a worktree because it's already checked out in
  # the primary tadpole. Switch back to this worktree's own dedicated branch
  # (e.g. tadpole-3) and reset it to origin/main.
  local branch_name
  branch_name=$(get_branch_name "$num")
  git checkout "$branch_name" 2>/dev/null || git checkout -b "$branch_name" "$default_branch"
  git reset --hard "$default_branch"

  echo "  Cleaning untracked files..."
  local exclude_pattern=$(config_get "cleanup.preserve_files" ".env")
  git clean -fd --exclude="$exclude_pattern" --exclude=".bufo-*"

  reset_submodules "$dir"

  # Unlock and clear name/metadata so the tadpole is available for reuse
  rm -f "$dir/.bufo-lock"
  clear_tadpole_name "$num"
  clear_workspace_meta "$num"

  success "Tadpole $num cleaned, unlocked, and ready for reuse"
}

# Completely destroy a tadpole (remove worktree and all files)
destroy_tadpole() {
  local num=$1
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
  local window_name="tp$num"
  local branch_name=$(get_branch_name "$num")

  if [ ! -d "$dir" ]; then
    error "Tadpole $num does not exist at $dir"
    exit 1
  fi

  echo -e "${RED}Destroying tadpole $num...${NC}"
  echo -e "${YELLOW}This will permanently delete all files in the tadpole!${NC}"
  echo ""

  if [ "${2:-}" != "--force" ] && [ "${2:-}" != "-f" ]; then
    echo -n "Are you sure? (y/N) "
    read -r confirm
    if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
      echo "Aborted."
      return 1
    fi
  fi

  # Close the iTerm2 tab if it exists
  if state_workspace_exists "$SESSION_NAME" "$num"; then
    echo "  Closing iTerm2 tab..."
    state_load_workspace "$SESSION_NAME" "$num"
    iterm_close_tab_by_session "$TP_MAIN_SID" 2>/dev/null || true
    state_remove_workspace "$SESSION_NAME" "$num"
  fi

  # Kill any running processes
  local kill_pattern=$(config_get "cleanup.kill_pattern" "")
  if [ -n "$kill_pattern" ]; then
    kill_pattern="${kill_pattern//\{N\}/$num}"
    kill_pattern="${kill_pattern//\{PREFIX\}/$TADPOLE_PREFIX}"
    echo "  Killing processes..."
    pkill -f "$kill_pattern" 2>/dev/null || true
  fi

  echo "  Removing git worktree..."
  cd "$MAIN_REPO"
  git worktree remove "$dir" --force 2>/dev/null || true

  if [ -d "$dir" ]; then
    echo "  Force removing directory..."
    rm -rf "$dir"
  fi

  if git show-ref --verify --quiet "refs/heads/$branch_name"; then
    local branch_in_use=$(git worktree list | grep "\[$branch_name\]" | wc -l | tr -d ' ')
    if [ "$branch_in_use" = "0" ]; then
      echo "  Deleting branch $branch_name..."
      git branch -D "$branch_name" 2>/dev/null || true
    fi
  fi

  success "Tadpole $num destroyed"
}

restart_tadpole() {
  local num=$1
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
  local window_name
  window_name=$(compute_tab_title "$num")
  local branch_name=$(get_branch_name "$num")

  if [ ! -d "$dir" ]; then
    error "Tadpole $num does not exist at $dir"
    exit 1
  fi

  echo -e "${YELLOW}Restarting tadpole $num...${NC}"

  cd "$dir"

  local current_branch=$(git branch --show-current)

  echo "  Fetching origin..."
  git fetch origin 2>/dev/null || true

  local default_branch
  default_branch=$(_get_default_branch "$dir")

  if [ "$current_branch" != "$branch_name" ]; then
    echo "  Switching from $current_branch to $branch_name..."
    git checkout "$branch_name" 2>/dev/null || git checkout -b "$branch_name"
  fi

  echo "  Resetting $branch_name to $default_branch content..."
  git reset --hard "$default_branch"

  echo "  Cleaning untracked files..."
  local exclude_pattern=$(config_get "cleanup.preserve_files" ".env")
  git clean -fd --exclude="$exclude_pattern" --exclude=".bufo-*"

  reset_submodules "$dir"
  setup_shared_volume "$dir"
  sync_env_files "$dir" "$num"
  check_and_install_deps "$dir"

  success "Git reset complete (on branch: $branch_name)"

  # Close old tab if exists, create fresh layout
  if state_workspace_exists "$SESSION_NAME" "$num"; then
    state_load_workspace "$SESSION_NAME" "$num"
    echo "  Closing old tab..."
    iterm_close_tab_by_session "$TP_MAIN_SID" 2>/dev/null || true
    state_remove_workspace "$SESSION_NAME" "$num"
    sleep 0.5
  fi

  local port_info=$(get_workspace_ports "$num" "$dir")
  local api_port=$(echo "$port_info" | cut -d: -f1)
  local app_port=$(echo "$port_info" | cut -d: -f2)
  local need_override=$(echo "$port_info" | cut -d: -f3)
  local env_api_port=$(echo "$port_info" | cut -d: -f4)

  local dev_cmd=$(get_pane_command "server")
  local claude_cmd=$(get_pane_command "main" "$window_name")

  if [ "$need_override" = "true" ]; then
    dev_cmd="PORT=$api_port APP_PORT=$app_port $dev_cmd"
  fi

  local port_msg="Using port $env_api_port"
  [ "$need_override" = "true" ] && port_msg="Port $env_api_port in use → using $api_port"

  echo "  Creating fresh tadpole layout..."
  create_tadpole_layout "$window_name" "$dir" "$dev_cmd" "$claude_cmd" "$port_msg" "new" "$num"

  success "Tadpole $num restarted with fresh layout!"
}

continue_tadpole() {
  local num=$1
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
  local window_name
  window_name=$(compute_tab_title "$num")

  if [ ! -d "$dir" ]; then
    error "Tadpole $num does not exist at $dir"
    exit 1
  fi

  echo -e "${CYAN}Continuing tadpole $num...${NC}"

  local port_info=$(get_workspace_ports "$num" "$dir")
  local api_port=$(echo "$port_info" | cut -d: -f1)
  local app_port=$(echo "$port_info" | cut -d: -f2)
  local need_override=$(echo "$port_info" | cut -d: -f3)

  local dev_cmd=$(get_pane_command "server")
  local claude_cmd=$(get_pane_command "main" "$window_name")

  # Add --continue to AI tool command
  local ai_tool=$(get_ai_tool)
  if [[ "$claude_cmd" == *"$ai_tool"* ]]; then
    claude_cmd="$claude_cmd --continue"
  fi

  if [ "$need_override" = "true" ]; then
    dev_cmd="PORT=$api_port APP_PORT=$app_port $dev_cmd"
  fi

  if state_workspace_exists "$SESSION_NAME" "$num"; then
    echo "  Tab exists, restarting with --continue..."
    state_load_workspace "$SESSION_NAME" "$num"

    iterm_send_interrupt "$TP_SERVER_SID"
    sleep 0.3
    [ -n "$dev_cmd" ] && iterm_send_text "$TP_SERVER_SID" "$dev_cmd"

    # Interrupt clears any running shell command; /exit quits an interactive Claude session
    iterm_send_interrupt "$TP_MAIN_SID"
    sleep 0.3
    iterm_send_text "$TP_MAIN_SID" "/exit"
    sleep 0.5
    [ -n "$claude_cmd" ] && iterm_send_text "$TP_MAIN_SID" "clear && $claude_cmd"

    success "Tadpole $num continued with previous session"
  else
    echo "  Creating window with --continue..."
    create_tadpole_layout "$window_name" "$dir" "$dev_cmd" "$claude_cmd" "" "new" "$num"

    success "Tadpole $num started with previous session"
  fi
}

# =============================================================================
# Tadpole Detection
# =============================================================================

# Detect tadpole number from current directory only
detect_tadpole_from_dir() {
  local cwd=$(pwd)
  if [[ "$cwd" =~ $TADPOLE_PREFIX-([0-9]+) ]]; then
    echo "${BASH_REMATCH[1]}"
    return
  fi
  echo ""
}

# Detect tadpole number from current directory or iTerm2 tab name
detect_tadpole() {
  # First try: current directory
  local cwd=$(pwd)
  if [[ "$cwd" =~ $TADPOLE_PREFIX-([0-9]+) ]]; then
    echo "${BASH_REMATCH[1]}"
    return
  fi

  # Second try: iTerm2 tab name (ws1, ws2, etc.)
  local tab_name
  tab_name=$(iterm_get_current_tab_name 2>/dev/null)
  if [[ "$tab_name" =~ ^tp([0-9]+)$ ]]; then
    echo "${BASH_REMATCH[1]}"
    return
  fi

  echo ""
}

# Find and atomically claim the next available tadpole number.
# Creates a .claim-N sentinel directory in TADPOLE_BASE to atomically reserve
# the slot (mkdir is atomic on POSIX filesystems).  The caller is responsible
# for removing the sentinel once the workspace directory has been created
# (worktree.sh:create_workspace), or if an error occurs before that point.
find_next_tadpole() {
  mkdir -p "$TADPOLE_BASE"
  local num=1
  while [ $num -le 100 ]; do
    local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
    local claim="$TADPOLE_BASE/.claim-$num"
    # Skip slots that already have a workspace directory
    if [ -d "$dir" ]; then
      num=$((num + 1))
      continue
    fi
    # A claim with no corresponding workspace is stale (left by a failed/aborted
    # spawn). Clean it up so the slot can be reused.
    if [ -d "$claim" ] && ! [ -d "$dir" ]; then
      rmdir "$claim" 2>/dev/null || true
    fi
    # Atomically claim this slot; if two processes race, only one mkdir wins
    if mkdir "$claim" 2>/dev/null; then
      echo "$num"
      return
    fi
    # Another process claimed this slot; move on
    num=$((num + 1))
  done
  echo ""
}

# Build a prompt for Claude to handle a Linear ticket
build_ticket_prompt() {
  local identifier="$1"
  local default='Fetch the Linear ticket {identifier} using your Linear MCP tools. Read the ticket title, description, and any relevant comments. Then:
1. Create and checkout a git branch using the ticket'\''s suggested branch name from Linear
2. Analyze the requirements from the ticket
3. Create an implementation plan and enter plan mode for my approval before writing any code
If you need clarification on the requirements, ask me before proceeding.'

  # Migrate legacy YAML config key → prompt file on first use (one-time, silent)
  local global_file="$PROMPTS_DIR/ticket-linear.md"
  if [ ! -f "$global_file" ]; then
    local legacy
    legacy=$(config_get "ticket.prompt_template" "")
    [ -n "$legacy" ] && default="$legacy"
  fi

  load_prompt "ticket-linear" "$default" "identifier" "$identifier"
}

build_github_issue_prompt() {
  local issue_url="$1"
  local default='Fetch the GitHub issue at {url} using your GitHub MCP tools. Read the issue title, description, labels, and any relevant comments. Then:
1. Create and checkout a descriptive git branch based on the issue
2. Analyze the requirements from the issue
3. Create an implementation plan and enter plan mode for my approval before writing any code
If you need clarification on the requirements, ask me before proceeding.'

  # Migrate legacy YAML config key → prompt file on first use (one-time, silent)
  local global_file="$PROMPTS_DIR/ticket-github-issue.md"
  if [ ! -f "$global_file" ]; then
    local legacy
    legacy=$(config_get "ticket.github_issue_prompt_template" "")
    [ -n "$legacy" ] && default="$legacy"
  fi

  load_prompt "ticket-github-issue" "$default" "url" "$issue_url"
}

# Create a new tadpole with the next available number
# Flags:
#   --reuse   Reuse an existing unlocked tadpole instead of creating a new worktree
create_new_tadpole() {
  local initial_prompt=""
  local reuse=false
  for arg in "$@"; do
    case "$arg" in
      --reuse) reuse=true ;;
      *) initial_prompt="$arg" ;;
    esac
  done

  if [ "$reuse" = true ]; then
    local unlocked_num
    unlocked_num=$(find_unlocked_tadpole)
    if [ -n "$unlocked_num" ]; then
      info "Reusing unlocked tadpole $unlocked_num for @${PROJECT_ALIAS}..."
      prepare_tadpole_for_reuse "$unlocked_num"
      open_tadpole "$unlocked_num" "$initial_prompt"
      return
    fi
    info "No unlocked tadpole found — creating new worktree..."
  fi

  local next_num
  next_num=$(find_next_tadpole)

  if [ -z "$next_num" ]; then
    error "Could not find an available tadpole number"
    exit 1
  fi

  echo -e "${CYAN}Creating new tadpole $next_num for @${PROJECT_ALIAS}...${NC}"
  # open_tadpole -> create_workspace will create the real workspace directory.
  # Remove the .claim-N sentinel afterwards so it doesn't accumulate.
  open_tadpole "$next_num" "$initial_prompt"
  rm -rf "$TADPOLE_BASE/.claim-$next_num" 2>/dev/null || true
}

# =============================================================================
# Main Tadpole (open main repo with tadpole layout)
# =============================================================================

open_main_tadpole() {
  local dir="$MAIN_REPO"
  local tp_id="main"
  local window_name="@${PROJECT_ALIAS} main"

  # Reconnect if already open
  if state_workspace_exists "$SESSION_NAME" "$tp_id"; then
    echo -e "${CYAN}Switching to main tadpole...${NC}"
    state_load_workspace "$SESSION_NAME" "$tp_id"

    # Refresh info bar
    if [ -n "$TP_INFO_SID" ] && [ "$TP_INFO_SID" != "null" ]; then
      iterm_send_interrupt "$TP_INFO_SID"
      sleep 0.3
      local infobar_cmd
      infobar_cmd=$(get_main_infobar_command "$dir")
      iterm_send_text "$TP_INFO_SID" "clear && $infobar_cmd"
    fi

    iterm_focus_session "$TP_MAIN_SID"
    return
  fi

  echo -e "${CYAN}Opening main tadpole...${NC}"
  echo "  Directory: $dir"

  # Write metadata
  local meta_file="$dir/.bufo-meta"
  echo '{"type":"main"}' > "$meta_file"
  ensure_bufo_git_excludes "$dir"

  # Get pane commands from config
  local dev_cmd=$(get_pane_command "server")
  local claude_cmd=$(get_pane_command "main" "$window_name")

  # Get custom infobar command for main tadpole
  local infobar_cmd
  infobar_cmd=$(get_main_infobar_command "$dir")

  # Create layout with main-specific infobar
  create_tadpole_layout "$window_name" "$dir" "$dev_cmd" "$claude_cmd" "" "new" "$tp_id" "$infobar_cmd"
}

# Close main tadpole panes and remove state (no WIP save, no git cleanup)
quit_main_tadpole() {
  local dir="$1"
  local tp_id="main"

  if state_load_workspace "$SESSION_NAME" "$tp_id"; then
    state_remove_workspace "$SESSION_NAME" "$tp_id"

    # Close the entire tab
    local close_sid="${TP_INFO_SID:-$TP_MAIN_SID}"
    iterm_close_tab_by_session "$close_sid" 2>/dev/null || true
  fi

  # Clean up metadata
  rm -f "$dir/.bufo-meta"
  rm -f "$dir/.bufo-infobar.sh"
}

# =============================================================================
# Quit / Cleanup Tadpole (from info bar)
# =============================================================================

# Close tadpole panes, kill processes, remove state
# Shared helper for quit_tadpole and cleanup_tadpole_infobar
# Closes the entire tab (individual session close is unreliable due to
# iTerm2 confirmation dialogs on sessions with running processes)
_close_tadpole_panes() {
  local dir="$1"
  local num
  num=$(basename "$dir" | sed "s/${TADPOLE_PREFIX}-//")

  if state_load_workspace "$SESSION_NAME" "$num"; then
    # Kill running processes
    local kill_pattern=$(config_get "cleanup.kill_pattern" "")
    if [ -n "$kill_pattern" ]; then
      kill_pattern="${kill_pattern//\{N\}/$num}"
      kill_pattern="${kill_pattern//\{PREFIX\}/$TADPOLE_PREFIX}"
      pkill -f "$kill_pattern" 2>/dev/null || true
    fi

    state_remove_workspace "$SESSION_NAME" "$num"

    # Close the entire tab — individual session close is unreliable
    local close_sid="${TP_INFO_SID:-$TP_MAIN_SID}"
    iterm_close_tab_by_session "$close_sid" 2>/dev/null || true
  fi
}

# Gracefully quit a tadpole: save WIP, close panes, kill processes
quit_tadpole() {
  local dir="$1"
  local num
  num=$(basename "$dir" | sed "s/${TADPOLE_PREFIX}-//")

  # Save WIP state (skip if no changes)
  wip_save "$num" "false" 2>/dev/null || true

  _close_tadpole_panes "$dir"
}

# Cleanup a tadpole from the info bar: reset git, unlock, clear metadata, close tab
cleanup_tadpole_infobar() {
  local dir="$1"
  local num
  num=$(basename "$dir" | sed "s/${TADPOLE_PREFIX}-//")

  # Reset git to the default branch.
  # We can't checkout 'main' in a worktree because it's already checked out in
  # the primary tadpole. Instead, switch back to this worktree's own dedicated
  # branch (e.g. tadpole-3) and reset it to origin/main. That branch belongs
  # exclusively to this worktree, so the checkout is always safe.
  local branch_name
  branch_name=$(get_branch_name "$num")
  local default_branch
  default_branch=$(_get_default_branch "$dir")
  cd "$dir"
  git fetch origin 2>/dev/null || true
  git checkout "$branch_name" 2>/dev/null || git checkout -b "$branch_name" "$default_branch" 2>/dev/null || true
  git reset --hard "$default_branch" 2>/dev/null || true

  local exclude_pattern=$(config_get "cleanup.preserve_files" ".env")
  git clean -fd --exclude="$exclude_pattern" --exclude=".bufo-*" 2>/dev/null || true

  reset_submodules "$dir"

  # Unlock and clear name/metadata so the tadpole is available for reuse
  rm -f "$dir/.bufo-lock"
  clear_tadpole_name "$num"
  clear_workspace_meta "$num"

  # Update the tab title to reflect the cleared state (e.g. back to "ws-N")
  update_tab_title "$num"

  # Close tab last — this kills all panes including the info bar.
  # For sessions (chorus/court), _close_tadpole_panes finds no tadpole
  # state and returns without closing; fall back to the session layout.
  _close_tadpole_panes "$dir" || _close_session_panes "$dir"
}

# =============================================================================
# Tadpole Subcommand Handler
# =============================================================================

switch_tadpole() {
  local target="${1:-}"

  # Direct switch: bufo switch <N>
  if [[ "$target" =~ ^[0-9]+$ ]]; then
    if ! state_workspace_exists "$SESSION_NAME" "$target"; then
      error "Tadpole $target is not active"
      return 1
    fi
    state_load_workspace "$SESSION_NAME" "$target"
    iterm_focus_session "$TP_MAIN_SID"
    local tp_name=$(get_tadpole_name "$target")
    echo -e "${GREEN}Switched to tadpole $target ($tp_name)${NC}"
    return 0
  fi

  # Collect active tadpoles
  local active_nums=()
  for dir in "$TADPOLE_BASE/$TADPOLE_PREFIX-"*; do
    [ -d "$dir" ] || continue
    local num=$(basename "$dir" | sed "s/${TADPOLE_PREFIX}-//")
    [[ "$num" =~ ^[0-9]+$ ]] || continue
    if state_workspace_exists "$SESSION_NAME" "$num"; then
      active_nums+=("$num")
    fi
  done

  if [ ${#active_nums[@]} -eq 0 ]; then
    echo "No active tadpoles."
    echo "Run 'bufo tp <N>' to open a tadpole."
    return 0
  fi

  # Single active tadpole — switch immediately
  if [ ${#active_nums[@]} -eq 1 ]; then
    local num="${active_nums[0]}"
    state_load_workspace "$SESSION_NAME" "$num"
    iterm_focus_session "$TP_MAIN_SID"
    local tp_name=$(get_tadpole_name "$num")
    echo -e "${GREEN}Switched to tadpole $num ($tp_name)${NC}"
    return 0
  fi

  # Multiple active — show picker
  echo -e "${CYAN}Active tadpoles:${NC}"
  echo ""

  local idx=1
  for num in "${active_nums[@]}"; do
    local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
    local branch=$(cd "$dir" && git branch --show-current 2>/dev/null || echo "unknown")
    local tp_name=$(get_tadpole_name "$num")
    local name_display=""
    [ "$tp_name" != "tp$num" ] && name_display=" ${BOLD}$tp_name${NC}"

    local lock_icon=""
    if is_tadpole_locked "$num"; then
      lock_icon=" ${RED}[locked]${NC}"
    fi

    echo -e "  [${idx}] ${BOLD}$num${NC}: $TADPOLE_PREFIX-$num ($branch)$lock_icon$name_display"
    idx=$((idx + 1))
  done

  echo ""
  printf "  Switch to [1-${#active_nums[@]}, q to cancel]: "
  read -r choice

  case "$choice" in
    q|Q|"") return 0 ;;
  esac

  if ! [[ "$choice" =~ ^[0-9]+$ ]] || [ "$choice" -lt 1 ] || [ "$choice" -gt ${#active_nums[@]} ]; then
    error "Invalid selection"
    return 1
  fi

  local selected_num="${active_nums[$((choice-1))]}"
  state_load_workspace "$SESSION_NAME" "$selected_num"
  iterm_focus_session "$TP_MAIN_SID"
  local tp_name=$(get_tadpole_name "$selected_num")
  echo -e "${GREEN}Switched to tadpole $selected_num ($tp_name)${NC}"
}

handle_tp_command() {
  local arg="${1:-}"
  shift || true

  case "$arg" in
    "")
      interactive_tadpole_menu
      ;;
    "ls"|"list")
      list_tadpoles
      ;;
    "spawn"|"create")
      create_new_tadpole
      ;;
    *)
      if [[ "$arg" =~ ^[0-9]+$ ]]; then
        local num="$arg"

        case "${1:-}" in
          "cleanup"|"clean")
            cleanup_tadpole "$num"
            ;;
          "destroy"|"rm"|"remove")
            destroy_tadpole "$num" "${2:-}"
            ;;
          "restart"|"reset"|"refresh")
            restart_tadpole "$num"
            ;;
          "continue"|"resume")
            continue_tadpole "$num"
            ;;
          "--separate"|"-s"|"separate")
            open_tadpole_separate "$num"
            ;;
          "wip")
            handle_wip_for_workspace "$num" "${@:2}"
            ;;
          "ticket"|"tkt")
            local ticket_id="${2:-}"
            if [ -z "$ticket_id" ]; then
              error "Ticket identifier required: bufo tp $num ticket <identifier>"
              exit 1
            fi
            local original_ticket_input="$ticket_id"
            ticket_id=$(parse_ticket_identifier "$ticket_id")
            if ! [[ "$ticket_id" =~ ^#?[A-Za-z0-9_-]+$ ]]; then
              error "Invalid ticket identifier: $ticket_id"
              echo "Identifiers must be alphanumeric (dashes and underscores allowed)"
              exit 1
            fi
            if is_github_issue_url "$original_ticket_input"; then
              open_tadpole "$num" "$(build_github_issue_prompt "$original_ticket_input")"
            else
              open_tadpole "$num" "$(build_ticket_prompt "$ticket_id")"
            fi
            ;;
          "pr")
            handle_ws_pr_command "$num" "${2:-}"
            ;;
          "lock")
            lock_tadpole "$num"
            ;;
          "unlock")
            unlock_tadpole "$num"
            ;;
          "kill")
            local tp_dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
            echo -e "${YELLOW}Killing ports for tadpole $num...${NC}"
            kill_workspace_ports "$tp_dir"
            ;;
          "")
            open_tadpole "$num"
            ;;
          *)
            error "Unknown command: bufo tp $num $1"
            echo "Try: bufo tp $num restart|cleanup|continue|wip|ticket|pr|lock|unlock|kill"
            exit 1
            ;;
        esac
      else
        error "Invalid tadpole argument: $arg"
        echo "Usage: bufo tp <N> or bufo spawn"
        exit 1
      fi
      ;;
  esac
}
