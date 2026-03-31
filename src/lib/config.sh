#!/usr/bin/env bash
# bufo - configuration loading and management

# Load a config value, with optional default
# Usage: config_get "path.to.value" "default"
config_get() {
  local path="$1"
  local default="${2:-}"
  local value

  if [ ! -f "$CONFIG_FILE" ]; then
    echo "$default"
    return
  fi

  value=$(yq -r ".$path // \"\"" "$CONFIG_FILE" 2>/dev/null)
  if [ -z "$value" ] || [ "$value" = "null" ]; then
    echo "$default"
  else
    echo "$value"
  fi
}

# Run an install command safely without shell interpretation.
# install_env is validated to contain only KEY=VALUE pairs before use.
# Usage: run_install_command "$install_cmd" "$install_env" "$context_label"
run_install_command() {
  local install_cmd="$1"
  local install_env="${2:-}"
  local context="${3:-}"

  # Validate install_env: each space-separated token must be KEY=VALUE
  if [ -n "$install_env" ] && [ "$install_env" != "null" ]; then
    for token in $install_env; do
      if ! [[ "$token" =~ ^[A-Za-z_][A-Za-z0-9_]*= ]]; then
        local label="${context:+($context) }"
        error "Invalid install_env value ${label}'${token}' — must be KEY=VALUE format. Skipping install."
        return 1
      fi
    done
  fi

  # Execute without shell interpretation using env + xargs.
  # xargs handles shell quoting in install_cmd (e.g. pip install -e ".[dev]").
  # env -- prevents flags in the command from being misread as env var assignments.
  if [ -n "$install_env" ] && [ "$install_env" != "null" ]; then
    echo "$install_cmd" | xargs env $install_env --
  else
    echo "$install_cmd" | xargs env --
  fi
}

# Check if config exists and is valid
config_exists() {
  [ -f "$CONFIG_FILE" ]
}

# Validate required config fields
validate_config() {
  local errors=0

  # If no project was resolved and CONFIG_FILE still points at the global
  # config, the user ran a project command without a project context.
  if [ -z "${PROJECT_ALIAS:-}" ] && [ "$CONFIG_FILE" = "$GLOBAL_CONFIG" ]; then
    local project_count=0
    if [ -d "$PROJECTS_DIR" ]; then
      project_count=$(ls -1 "$PROJECTS_DIR"/*.yaml 2>/dev/null | wc -l | tr -d ' ')
    fi
    if [ "$project_count" -eq 0 ]; then
      error "No projects registered."
      echo "Run 'bufo init' to register your first project."
    else
      error "Multiple projects found — specify one with @alias:"
      for f in "$PROJECTS_DIR"/*.yaml; do
        [ -f "$f" ] || continue
        echo "  bufo @$(basename "$f" .yaml) spawn"
      done
      echo ""
      echo "Or set a default: bufo default <alias>"
    fi
    exit 1
  fi

  if ! config_exists; then
    if [ -n "${PROJECT_ALIAS:-}" ]; then
      error "Config not found for project @$PROJECT_ALIAS at $CONFIG_FILE"
    else
      error "No config file found at $CONFIG_FILE"
    fi
    echo "Run 'bufo init' to create one."
    exit 1
  fi

  local session_name=$(config_get "session_name")
  local tadpole_base=$(config_get "tadpole_base" "$(config_get "workspace_base")")
  local main_repo=$(config_get "main_repo")

  if [ -z "$session_name" ]; then
    error "Missing required config: session_name"
    errors=$((errors + 1))
  fi

  if [ -z "$tadpole_base" ]; then
    error "Missing required config: tadpole_base (or workspace_base)"
    errors=$((errors + 1))
  fi

  if [ -z "$main_repo" ]; then
    error "Missing required config: main_repo"
    errors=$((errors + 1))
  fi

  if [ $errors -gt 0 ]; then
    echo ""
    echo "Run 'bufo doctor' to diagnose issues."
    exit 1
  fi
}

# Sync MCP config from main repo to tadpole
sync_mcp_servers() {
  local workspace_dir=$1
  local main_repo=$(config_get "main_repo" "")

  [ -z "$main_repo" ] && return

  if [ -f "$main_repo/.mcp.json" ]; then
    cp "$main_repo/.mcp.json" "$workspace_dir/.mcp.json"
    echo -e "${GREEN}Copied .mcp.json from main repo${NC}"
  fi
}

# Expand ~ and environment variables in paths
expand_path() {
  local path="$1"
  path="${path/#\~/$HOME}"
  echo "$path"
}

# =============================================================================
# Config Variables (loaded lazily)
# =============================================================================

_config_loaded=false

# Reset the config-loaded guard so load_config re-reads the current CONFIG_FILE.
# Call this whenever CONFIG_FILE is reassigned to a different project.
reset_config() {
  _config_loaded=false
}

load_config() {
  if [ "$_config_loaded" = true ]; then
    return
  fi

  if ! config_exists; then
    return
  fi

  SESSION_NAME=$(config_get "session_name" "bufo")
  TADPOLE_BASE=$(expand_path "$(config_get "tadpole_base" "$(config_get "workspace_base")")")
  WORKSPACE_BASE="$TADPOLE_BASE"  # alias for compatibility
  MAIN_REPO=$(expand_path "$(config_get "main_repo")")

  TADPOLE_COUNT=$(config_get "tadpoles.count" "$(config_get "workspaces.count" "5")")
  WORKSPACE_COUNT="$TADPOLE_COUNT"  # alias for compatibility
  TADPOLE_PREFIX=$(config_get "tadpoles.prefix" "$(config_get "workspaces.prefix" "workspace")")
  WORKSPACE_PREFIX="$TADPOLE_PREFIX"  # alias for compatibility
  BRANCH_PATTERN=$(config_get "tadpoles.branch_pattern" "$(config_get "workspaces.branch_pattern" "workspace-{N}")")

  API_PORT_BASE=$(config_get "ports.api_base" "3200")
  APP_PORT_BASE=$(config_get "ports.app_base" "3000")

  # Shared volume settings
  SHARED_VOLUME_PATH=$(expand_path "$(config_get "shared_volume.path" "$CONFIG_DIR/shared")")
  SHARED_VOLUME_LINK=$(config_get "shared_volume.link_as" ".local")
  SHARED_VOLUME_ENABLED=$(config_get "shared_volume.enabled" "true")

  # AI tool: "claude" (default), "codex", "copilot", or "gemini"
  # Per-project "ai_tool" key overrides global "default_ai_tool" in ~/.bufo/config.yaml.
  local _project_ai_tool
  _project_ai_tool=$(config_get "ai_tool" "")
  if [ -n "$_project_ai_tool" ]; then
    AI_TOOL="$_project_ai_tool"
  else
    AI_TOOL=$(yq -r '.default_ai_tool // "claude"' "$GLOBAL_CONFIG" 2>/dev/null || echo "")
    if [ -z "$AI_TOOL" ] || [ "$AI_TOOL" = "null" ]; then
      AI_TOOL="claude"
    fi
  fi

  _config_loaded=true

  # WIP isolation: per-project WIP directories
  if [ -n "${PROJECT_ALIAS:-}" ]; then
    WIP_BASE="$CONFIG_DIR/wip/$PROJECT_ALIAS"
  fi
}

# Check if we're in legacy single-project mode
is_legacy_config() {
  if [ ! -f "$CONFIG_DIR/config.yaml" ]; then
    return 1
  fi
  local has_main_repo=$(yq -r '.main_repo // ""' "$CONFIG_DIR/config.yaml" 2>/dev/null)
  if [ -z "$has_main_repo" ] || [ "$has_main_repo" = "null" ]; then
    return 1
  fi
  if [ -d "$PROJECTS_DIR" ] && [ -n "$(ls -A "$PROJECTS_DIR" 2>/dev/null)" ]; then
    return 1
  fi
  return 0
}

# Prompt user to migrate legacy config.yaml → projects/<alias>.yaml
check_legacy_migration() {
  echo -e "${CYAN}Multi-project support detected.${NC}"
  echo ""
  echo "Your config at ~/.bufo/config.yaml can be migrated to the new"
  echo "per-project format. This enables managing multiple repos with bufo."
  echo ""
  read -p "Migrate now? [Y/n]: " migrate
  if [ "$migrate" = "n" ] || [ "$migrate" = "N" ]; then
    return
  fi

  local repo_path=$(yq -r '.main_repo // ""' "$CONFIG_DIR/config.yaml" 2>/dev/null)
  local default_alias=$(basename "$repo_path" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9_-]/-/g')
  echo ""
  read -p "Project alias [$default_alias]: " alias_input
  alias_input=${alias_input:-$default_alias}

  if ! [[ "$alias_input" =~ ^[a-zA-Z0-9_-]+$ ]]; then
    error "Alias must be alphanumeric (dashes and underscores allowed)"
    return 1
  fi

  mkdir -p "$PROJECTS_DIR"
  cp "$CONFIG_DIR/config.yaml" "$PROJECTS_DIR/${alias_input}.yaml"

  # Update session_name in the project config to use the alias
  VALUE="$alias_input" yq -i '.session_name = strenv(VALUE)' "$PROJECTS_DIR/${alias_input}.yaml"

  # Backup old config with a timestamp to avoid clobbering previous backups
  local bak_suffix
  bak_suffix=$(date +%Y%m%dT%H%M%S)
  cp "$CONFIG_DIR/config.yaml" "$CONFIG_DIR/config.yaml.bak.$bak_suffix"
  # Keep a "config.yaml.bak" symlink pointing to the most recent backup
  ln -sf "config.yaml.bak.$bak_suffix" "$CONFIG_DIR/config.yaml.bak"

  # Write global config atomically (temp file + rename) to avoid partial writes
  local tmp_global
  tmp_global=$(mktemp "$CONFIG_DIR/.global_config.XXXXXX")
  cat > "$tmp_global" << EOF
# Bufo Global Configuration
default_project: $alias_input
EOF
  mv "$tmp_global" "$GLOBAL_CONFIG"

  CONFIG_FILE="$PROJECTS_DIR/${alias_input}.yaml"
  PROJECT_ALIAS="$alias_input"

  echo ""
  success "Migrated to @$alias_input"
  echo "  Project config: $PROJECTS_DIR/${alias_input}.yaml"
  echo "  Backup: ~/.bufo/config.yaml.bak.$bak_suffix"
  echo "  Default set to: @$alias_input"
  echo ""
}

# =============================================================================
# AI Tool Helpers
# =============================================================================

# Get the configured AI tool name ("claude", "codex", "copilot", or "gemini")
get_ai_tool() {
  load_config
  echo "${AI_TOOL:-claude}"
}

# Get the interactive AI command (for the main pane)
# Usage: get_ai_interactive_cmd [session_name]
# Returns e.g. "claude --dangerously-skip-permissions --name 'foo'" or "codex --full-auto"
get_ai_interactive_cmd() {
  local session_name="${1:-}"
  local tool=$(get_ai_tool)
  case "$tool" in
    codex)
      echo "codex --full-auto"
      ;;
    copilot)
      echo "copilot --allow-all"
      ;;
    gemini)
      echo "gemini --yolo"
      ;;
    *)
      local cmd="claude --dangerously-skip-permissions"
      if [ -n "$session_name" ]; then
        cmd="$cmd --name $(printf '%q' "$session_name")"
      fi
      echo "$cmd"
      ;;
  esac
}

# Get the non-interactive print command (for WIP summaries, etc.)
# Returns e.g. "claude --print" or "codex exec --full-auto -q"
get_ai_print_cmd() {
  local tool=$(get_ai_tool)
  case "$tool" in
    codex)
      echo "codex exec --full-auto -q"
      ;;
    copilot)
      echo "copilot --allow-all-tools -p"
      ;;
    gemini)
      echo "gemini -p"
      ;;
    *)
      echo "claude --print"
      ;;
  esac
}

# Get the non-interactive prompt command (for conflict resolution, etc.)
# Returns e.g. "claude --dangerously-skip-permissions -p" or "codex exec --full-auto"
get_ai_prompt_cmd() {
  local tool=$(get_ai_tool)
  case "$tool" in
    codex)
      echo "codex exec --full-auto"
      ;;
    copilot)
      echo "copilot --allow-all-tools -p"
      ;;
    gemini)
      echo "gemini -p"
      ;;
    *)
      echo "claude --dangerously-skip-permissions -p"
      ;;
  esac
}

# Build the shell command to pipe a prompt file into the AI tool
# Usage: ai_pipe_prompt_file "/path/to/prompt"
# Claude reads stdin; Codex takes a prompt file as an argument
ai_pipe_prompt_file() {
  local prompt_file="$1"
  local tool=$(get_ai_tool)
  case "$tool" in
    codex|copilot|gemini)
      echo "$(get_ai_interactive_cmd) \"\$(cat '$prompt_file')\""
      ;;
    *)
      echo "cat '$prompt_file' | $(get_ai_interactive_cmd)"
      ;;
  esac
}

# Run the AI print command with a prompt string
# Usage: echo "$prompt" | ai_run_print
# Claude reads stdin; Codex takes prompt as argument
ai_run_print() {
  local tool=$(get_ai_tool)
  local prompt
  prompt=$(cat)  # read stdin
  local -a cmd
  read -ra cmd <<< "$(get_ai_print_cmd)"
  case "$tool" in
    codex|copilot|gemini)
      "${cmd[@]}" "$prompt" 2>/dev/null
      ;;
    *)
      echo "$prompt" | "${cmd[@]}" 2>/dev/null
      ;;
  esac
}

# Run the AI print command with a timeout
# Usage: echo "$prompt" | ai_run_print_with_timeout <seconds>
ai_run_print_with_timeout() {
  local seconds="${1:-30}"
  local tool=$(get_ai_tool)
  local prompt
  prompt=$(cat)  # read stdin
  local -a cmd
  read -ra cmd <<< "$(get_ai_print_cmd)"
  case "$tool" in
    codex|copilot|gemini)
      timeout "$seconds" "${cmd[@]}" "$prompt" 2>/dev/null || echo ""
      ;;
    *)
      echo "$prompt" | timeout "$seconds" "${cmd[@]}" 2>/dev/null || echo ""
      ;;
  esac
}

# Run the AI prompt command with a prompt string
# Usage: echo "$prompt" | ai_run_prompt
# Claude reads stdin; Codex takes prompt as argument
ai_run_prompt() {
  local tool=$(get_ai_tool)
  local prompt
  prompt=$(cat)  # read stdin
  local -a cmd
  read -ra cmd <<< "$(get_ai_prompt_cmd)"
  case "$tool" in
    codex|copilot|gemini)
      "${cmd[@]}" "$prompt" 2>/dev/null
      ;;
    *)
      echo "$prompt" | "${cmd[@]}" 2>/dev/null
      ;;
  esac
}

# Check if the configured AI tool is available
ai_tool_exists() {
  command_exists "$(get_ai_tool)"
}
