#!/usr/bin/env bash
# bufo - companion repo management
# Companion repos are canonical clones that live alongside worktrees (not inside them).
# They are symlinked into each worktree so every tadpole has access without duplication.

# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

# Resolve the companions base directory (defaults to WORKSPACE_BASE)
_companions_base() {
  local base
  base=$(config_get "companions.base" "")
  if [ -n "$base" ] && [ "$base" != "null" ]; then
    expand_path "$base"
  else
    echo "$WORKSPACE_BASE"
  fi
}

# Iterate companion repos; call callback(name remote link_as companion_path workspace_dir force)
# Usage: _each_companion <callback_fn> [workspace_dir] [force]
_each_companion() {
  local callback="$1"
  local workspace_dir="${2:-}"
  local force="${3:-false}"

  local count
  count=$(yq -r '.companions.repos | length // 0' "$CONFIG_FILE" 2>/dev/null)
  [ "$count" = "0" ] && return
  [ "$count" = "null" ] && return

  local base
  base=$(_companions_base)

  for ((i=0; i<count; i++)); do
    local name remote link_as companion_path
    name=$(yq -r ".companions.repos[$i].name // \"\"" "$CONFIG_FILE" 2>/dev/null)
    remote=$(yq -r ".companions.repos[$i].remote // \"\"" "$CONFIG_FILE" 2>/dev/null)
    link_as=$(yq -r ".companions.repos[$i].link_as // \"\"" "$CONFIG_FILE" 2>/dev/null)

    [ -z "$name" ] || [ "$name" = "null" ] && continue

    # Default link_as to name
    if [ -z "$link_as" ] || [ "$link_as" = "null" ]; then
      link_as="$name"
    fi
    # Treat "null" remote as empty
    [ "$remote" = "null" ] && remote=""

    companion_path="$base/$name"

    "$callback" "$name" "$remote" "$link_as" "$companion_path" "$workspace_dir" "$force"
  done
}

# Ensure a companion entry is in .git/info/exclude (never in .gitignore)
_add_to_git_exclude() {
  local workspace_dir="$1"
  local link_as="$2"

  local exclude_file="$workspace_dir/.git/info/exclude"
  if [ ! -f "$exclude_file" ]; then
    return 0
  fi

  if ! grep -qF "$link_as" "$exclude_file" 2>/dev/null; then
    echo "" >> "$exclude_file"
    echo "# Companion repo symlink (bufo)" >> "$exclude_file"
    echo "$link_as" >> "$exclude_file"
  fi
}

# ---------------------------------------------------------------------------
# _setup_one_companion — per-repo logic called by _each_companion
# ---------------------------------------------------------------------------
_setup_one_companion() {
  local name="$1"
  local remote="$2"
  local link_as="$3"
  local companion_path="$4"
  local workspace_dir="$5"
  local force="${6:-false}"

  # 1. Clone if absent and remote is configured
  if [ ! -d "$companion_path" ]; then
    if [ -n "$remote" ]; then
      echo -e "  ${CYAN}Cloning companion ${BOLD}$name${NC}${CYAN} → $companion_path${NC}"
      # Use partial clone for large repos when git supports it
      if git clone --filter=blob:none "$remote" "$companion_path" 2>/dev/null; then
        echo -e "  ${GREEN}Cloned $name${NC}"
      else
        warn "Failed to clone companion $name from $remote — skipping"
        return 0
      fi
    else
      warn "Companion $name not found at $companion_path (no remote configured — skipping)"
      return 0
    fi
  fi

  # 2. Symlink into tadpole (idempotent)
  if [ -n "$workspace_dir" ] && [ -d "$workspace_dir" ]; then
    local link_path="$workspace_dir/$link_as"

    if [ -L "$link_path" ]; then
      local current_target
      current_target=$(readlink "$link_path")
      if [ "$current_target" = "$companion_path" ]; then
        return 0  # Already correct — skip silently
      else
        echo -e "  ${YELLOW}Updating symlink $link_as (was → $current_target)${NC}"
        rm "$link_path"
      fi
    elif [ -d "$link_path" ]; then
      if [ "$force" = "true" ]; then
        echo -e "  ${YELLOW}Replacing directory $link_as with symlink (--replace)${NC}"
        rm -rf "$link_path"
      else
        warn "$link_path is a directory — use 'companions sync --replace' to convert it to a symlink"
        return 0
      fi
    elif [ -e "$link_path" ]; then
      warn "$link_path exists and is not a symlink — skipping companion $name"
      return 0
    fi

    ln -sf "$companion_path" "$link_path"
    echo -e "  ${GREEN}Linked $link_as → $companion_path${NC}"

    # 3. Exclude from git tracking
    _add_to_git_exclude "$workspace_dir" "$link_as"
  fi
}

# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

# setup_companions <workspace_dir> [force]
# Called from create_workspace() and check_and_setup_workspace().
# Clones any missing companions (if remote is set) and symlinks all present
# companions into the given tadpole directory.
setup_companions() {
  local workspace_dir="$1"
  local force="${2:-false}"

  # No-op if no companions configured
  local count
  count=$(yq -r '.companions.repos | length // 0' "$CONFIG_FILE" 2>/dev/null)
  [ "$count" = "0" ] && return 0
  [ "$count" = "null" ] && return 0

  _each_companion _setup_one_companion "$workspace_dir" "$force"
}

# sync_all_companions [--replace|--force]
# Iterates every PREFIX-N dir under WORKSPACE_BASE and calls setup_companions.
# Useful for retroactively adding symlinks to existing worktrees.
# Pass --replace (or --force) to remove real directories and replace with symlinks.
sync_all_companions() {
  local force="false"
  for arg in "$@"; do
    case "$arg" in
      --replace|--force|-f) force="true" ;;
    esac
  done

  local count
  count=$(yq -r '.companions.repos | length // 0' "$CONFIG_FILE" 2>/dev/null)
  if [ "$count" = "0" ] || [ "$count" = "null" ]; then
    echo -e "${YELLOW}No companions configured for this project.${NC}"
    return 0
  fi

  echo -e "${CYAN}Syncing companion symlinks into all workspaces...${NC}"
  if [ "$force" = "true" ]; then
    echo -e "${YELLOW}  --replace active: existing directories will be replaced with symlinks${NC}"
  fi
  echo ""

  local found=0
  for tp_dir in "$WORKSPACE_BASE/$WORKSPACE_PREFIX"-*; do
    [ -d "$tp_dir" ] || continue
    # Skip bare directories and non-worktree dirs (must have a .git file/dir)
    if [ ! -e "$tp_dir/.git" ]; then
      continue
    fi
    local ws_name
    ws_name=$(basename "$tp_dir")
    echo -e "${BLUE}  $ws_name${NC}"
    setup_companions "$tp_dir" "$force"
    found=$((found + 1))
  done

  if [ "$found" = "0" ]; then
    echo -e "${YELLOW}No workspaces found under $WORKSPACE_BASE/${WORKSPACE_PREFIX}-*${NC}"
  else
    echo ""
    echo -e "${GREEN}Synced companions into $found tadpole(s)${NC}"
  fi
}

# show_companions
# Pretty-prints companion status: canonical path exists/missing, last fetch time,
# and per-worktree symlink status.
show_companions() {
  local count
  count=$(yq -r '.companions.repos | length // 0' "$CONFIG_FILE" 2>/dev/null)
  if [ "$count" = "0" ] || [ "$count" = "null" ]; then
    echo -e "${YELLOW}No companions configured for this project.${NC}"
    echo ""
    echo "Add a companions block to $(basename "$CONFIG_FILE"):"
    echo ""
    echo "  companions:"
    echo "    repos:"
    echo "      - name: my-shared-lib"
    echo "        remote: git@github.com:org/my-shared-lib.git"
    return 0
  fi

  local base
  base=$(_companions_base)

  echo -e "${CYAN}Companion Repos — @${PROJECT_ALIAS:-$(basename "$CONFIG_FILE" .yaml)}${NC}"
  echo ""
  echo -e "  Base: ${GRAY}$base${NC}"
  echo ""

  # Collect tadpole dirs for the symlink column
  local ws_dirs=()
  for tp_dir in "$WORKSPACE_BASE/$WORKSPACE_PREFIX"-*; do
    [ -d "$tp_dir" ] && [ -e "$tp_dir/.git" ] && ws_dirs+=("$tp_dir")
  done

  _show_one_companion() {
    local name="$1"
    local remote="$2"
    local link_as="$3"
    local companion_path="$4"
    # $5 is workspace_dir (unused here)

    echo -e "  ${BOLD}$name${NC}"

    # Canonical path status
    if [ -d "$companion_path" ]; then
      echo -e "    Canonical:  ${GREEN}exists${NC}  ($companion_path)"
      # Last fetch time via FETCH_HEAD mtime
      local fetch_head="$companion_path/.git/FETCH_HEAD"
      if [ -f "$fetch_head" ]; then
        local fetch_time
        fetch_time=$(stat -f "%Sm" -t "%Y-%m-%d %H:%M" "$fetch_head" 2>/dev/null \
                     || stat -c "%y" "$fetch_head" 2>/dev/null | cut -c1-16)
        echo -e "    Last fetch: ${GRAY}$fetch_time${NC}"
      else
        echo -e "    Last fetch: ${GRAY}never${NC}"
      fi
    else
      if [ -n "$remote" ]; then
        echo -e "    Canonical:  ${YELLOW}not cloned yet${NC}  ($companion_path)"
      else
        echo -e "    Canonical:  ${RED}missing${NC}  (no remote configured)"
      fi
      if [ -n "$remote" ]; then
        echo -e "    Remote:     ${GRAY}$remote${NC}"
      fi
    fi

    # Per-worktree symlink status
    if [ "${#ws_dirs[@]}" -gt 0 ]; then
      echo -e "    Symlinks:"
      for tp_dir in "${ws_dirs[@]}"; do
        local ws_name link_path status_str
        ws_name=$(basename "$tp_dir")
        link_path="$tp_dir/$link_as"
        if [ -L "$link_path" ]; then
          status_str="${GREEN}✓ linked${NC}"
        elif [ -e "$link_path" ]; then
          status_str="${YELLOW}! exists (not a symlink)${NC}"
        else
          status_str="${RED}✗ missing${NC}"
        fi
        printf "      %-12s %b\n" "$ws_name" "$status_str"
      done
    fi

    echo ""
  }

  _each_companion _show_one_companion ""
}

# fetch_companions
# Runs `git fetch origin` in each canonical companion clone.
fetch_companions() {
  local count
  count=$(yq -r '.companions.repos | length // 0' "$CONFIG_FILE" 2>/dev/null)
  if [ "$count" = "0" ] || [ "$count" = "null" ]; then
    echo -e "${YELLOW}No companions configured for this project.${NC}"
    return 0
  fi

  echo -e "${CYAN}Fetching companion repos...${NC}"
  echo ""

  _fetch_one_companion() {
    local name="$1"
    local remote="$2"
    local link_as="$3"
    local companion_path="$4"

    if [ ! -d "$companion_path" ]; then
      echo -e "  ${YELLOW}$name${NC}: not cloned — skipping"
      return 0
    fi

    echo -e "  ${BLUE}$name${NC}"
    if git -C "$companion_path" fetch origin --quiet 2>/dev/null; then
      echo -e "    ${GREEN}fetched${NC}"
    else
      warn "  Failed to fetch $name"
    fi
  }

  _each_companion _fetch_one_companion ""
  echo ""
  echo -e "${GREEN}Done.${NC}"
}
