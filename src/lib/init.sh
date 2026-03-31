#!/usr/bin/env bash
# bufo - init, config scan, templates

show_init() {
  # Parse arguments
  local template_name=""
  local alias_input=""
  while [ $# -gt 0 ]; do
    case "$1" in
      --template|-t)
        template_name="$2"
        shift 2
        ;;
      --alias|-a)
        alias_input="$2"
        shift 2
        ;;
      --list-templates)
        echo "No templates available."
        return
        ;;
      *)
        shift
        ;;
    esac
  done

  echo -e "${CYAN}Bufo Project Setup${NC}"
  echo -e "  ${GRAY}Register a project repo. Run 'bufo init' again to add more.${NC}"
  echo ""

  # Main repo
  local default_repo=$(pwd)
  echo -e "Path to the repo you want to manage with bufo"
  echo -e "  ${GRAY}(bufo will create git worktrees from this repo)${NC}"
  read -p "  [$default_repo]: " main_repo
  main_repo=${main_repo:-$default_repo}

  main_repo="${main_repo/#\~/$HOME}"

  if [ ! -d "$main_repo" ]; then
    error "Directory does not exist: $main_repo"
    return 1
  fi

  if [ ! -d "$main_repo/.git" ]; then
    warn "Not a git repository: $main_repo"
    read -p "Continue anyway? [y/N]: " confirm
    if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
      return 1
    fi
  fi

  # Project alias
  if [ -z "$alias_input" ]; then
    local default_alias=$(basename "$main_repo" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9_-]/-/g')
    echo ""
    echo -e "Project alias (used in ${GREEN}bufo @alias ws 1${NC})"
    read -p "  [$default_alias]: " alias_input
    alias_input=${alias_input:-$default_alias}
  fi

  if ! [[ "$alias_input" =~ ^[a-zA-Z0-9_-]+$ ]]; then
    error "Alias must be alphanumeric (dashes and underscores allowed)"
    return 1
  fi

  if [ -f "$PROJECTS_DIR/${alias_input}.yaml" ]; then
    echo -e "${YELLOW}Project @$alias_input already exists.${NC}"
    read -p "Overwrite? [y/N]: " confirm
    if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
      echo "Cancelled."
      return
    fi
  fi

  CONFIG_FILE="$PROJECTS_DIR/${alias_input}.yaml"
  PROJECT_ALIAS="$alias_input"

  # Tadpole base
  local repo_name=$(basename "$main_repo")
  local repo_parent=$(dirname "$main_repo")

  local global_ws_base=""
  if [ -f "$GLOBAL_CONFIG" ]; then
    global_ws_base=$(yq -r '.default_workspace_base // ""' "$GLOBAL_CONFIG" 2>/dev/null)
    [ "$global_ws_base" = "null" ] && global_ws_base=""
  fi


  local default_base
  if [ -n "$global_ws_base" ]; then
    default_base="${global_ws_base/\{alias\}/$alias_input}"
    default_base="${default_base/#\~/$HOME}"
  else
    default_base="$repo_parent/${repo_name}-workspaces"
  fi

  echo ""
  echo -e "Where should workspaces be created?"
  echo -e "  (Each tadpole is a git worktree, e.g., ${repo_name}-tadpoles/tp-1)"
  read -p "  [$default_base]: " workspace_base
  workspace_base=${workspace_base:-$default_base}

  workspace_base="${workspace_base/#\~/$HOME}"

  # Check for project-level config in repo directory
  local project_config="$main_repo/.bufo.yaml"
  if [ -f "$project_config" ]; then
    echo ""
    echo -e "${GREEN}Found project config: .bufo.yaml${NC}"
    read -p "Import settings from it? [Y/n]: " use_project
    if [ "$use_project" != "n" ] && [ "$use_project" != "N" ]; then
      mkdir -p "$PROJECTS_DIR"
      cp "$project_config" "$CONFIG_FILE"

      # Warn about any install commands that will run on this machine
      local imported_install
      imported_install=$(yq -r '.install_command // ""' "$project_config" 2>/dev/null)
      local sub_installs
      sub_installs=$(yq -r '.submodules[]?.install_command // ""' "$project_config" 2>/dev/null | grep -v '^$' || true)
      if [ -n "$imported_install" ] || [ -n "$sub_installs" ]; then
        echo ""
        echo -e "${YELLOW}⚠  This config contains install commands that will run on your machine:${NC}"
        [ -n "$imported_install" ] && echo -e "   install_command: ${RED}$imported_install${NC}"
        if [ -n "$sub_installs" ]; then
          while IFS= read -r cmd; do
            echo -e "   submodule install: ${RED}$cmd${NC}"
          done <<< "$sub_installs"
        fi
        echo ""
        read -p "Allow these commands to run? [y/N]: " allow_cmds
        if [ "$allow_cmds" != "y" ] && [ "$allow_cmds" != "Y" ]; then
          yq -i 'del(.install_command) | del(.install_env) | del(.submodules[]?.install_command)' "$CONFIG_FILE" 2>/dev/null || true
          echo -e "${YELLOW}Install commands removed. Add them manually after reviewing: bufo @$alias_input config${NC}"
        fi
      fi

      local main_repo_val=$(yq -r '.main_repo // ""' "$CONFIG_FILE" 2>/dev/null)
      if [ -z "$main_repo_val" ] || [ "$main_repo_val" = "null" ] || [[ "$main_repo_val" == "~/"* ]] || [[ "$main_repo_val" == "./"* ]]; then
        VALUE="$main_repo" yq -i '.main_repo = strenv(VALUE)' "$CONFIG_FILE"
      fi

      local ws_base_val=$(yq -r '.tadpole_base // .workspace_base // ""' "$CONFIG_FILE" 2>/dev/null)
      if [ -z "$ws_base_val" ] || [ "$ws_base_val" = "null" ]; then
        VALUE="$workspace_base" yq -i '.workspace_base = strenv(VALUE)' "$CONFIG_FILE"
      fi

      VALUE="$alias_input" yq -i '.session_name = strenv(VALUE)' "$CONFIG_FILE"

      _init_set_default_if_first "$alias_input"

      echo ""
      success "Project @$alias_input registered at $CONFIG_FILE"
      echo ""
      echo -e "${CYAN}Next steps:${NC}"
      echo "  1. Review config: bufo @$alias_input config"
      echo "  2. Run 'bufo @$alias_input config scan' to detect ports"
      echo "  3. Run 'bufo @$alias_input spawn' to create your first tadpole"
      return
    fi
    echo ""
  fi

  # Template handling
  if [ -n "$template_name" ]; then
    error "Unknown template: $template_name"
    echo "No templates are currently available."
    return 1
  fi

  # No template - generate minimal config
  mkdir -p "$PROJECTS_DIR"

  # Auto-detect .env files in the main repo
  local env_files=""
  local env_count=0
  while IFS= read -r file; do
    [ -z "$file" ] && continue
    env_files="$env_files$file"$'\n'
    env_count=$((env_count + 1))
  done < <(find "$main_repo" -maxdepth 3 -type f -name ".env" ! -path "*/node_modules/*" ! -path "*/.git/*" 2>/dev/null | sort)

  local env_sync_block=""
  if [ "$env_count" -gt 0 ]; then
    env_sync_block=$'\n'"env_sync:"$'\n'"  files:"
    while IFS= read -r file; do
      [ -z "$file" ] && continue
      local rel_path="${file#$main_repo/}"
      env_sync_block="$env_sync_block"$'\n'"    - path: $rel_path"
    done <<< "$env_files"
  fi

  cat > "$CONFIG_FILE" << EOF
# Bufo Configuration
# Generated by 'bufo init'
# Project: @$alias_input

session_name: $alias_input
tadpole_base: $workspace_base
main_repo: $main_repo

# AI tool: "claude" (default) or "codex"
# ai_tool: claude

tadpoles:
  prefix: tp
  branch_pattern: tadpole-{N}

layout:
  panes:
    - name: terminal
      command: ""
    - name: server
      command: ""
    - name: main
      command: ""

# Run 'bufo config scan' to detect .env files and generate env_sync config
# .env files are copied from the same path in your main repo
# Then edit this file to customize:
#
# env_sync:
#   files:
#     - path: .env               # copied from main_repo/.env
#       ports: [PORT, API_PORT]
#       overrides:               # optional: override env vars in workspaces
#         DEBUG: "true"
#
# layout:
#   panes:
#     - name: terminal
#       command: ""
#     - name: server
#       command: "npm run dev"
#     - name: main
#       command: "claude"          # or set ai_tool: codex above
#
# shared_volume:
#   enabled: true
#   path: ~/.bufo/shared
#   link_as: .local
#
# submodules:
#   - path: my-submodule
#     reset_to: origin/main
#
# ticket:
#   linear_team: myteam          # auto-select this project for linear.app/myteam/... URLs
#   github_repo: owner/repo      # auto-select this project for github.com/owner/repo/issues/...
#   linear_base_url: https://linear.app/myteam/issue  # constructs clickable ticket links
EOF

  # Append env_sync if .env files were detected
  if [ -n "$env_sync_block" ]; then
    echo "$env_sync_block" >> "$CONFIG_FILE"
  fi

  _init_set_default_if_first "$alias_input"

  echo ""
  success "Project @$alias_input registered at $CONFIG_FILE"
  if [ "$env_count" -gt 0 ]; then
    echo -e "  ${GREEN}Auto-detected ${env_count} .env file(s)${NC} — added to env_sync"
  fi
  echo ""
  echo -e "${CYAN}Next steps:${NC}"
  echo ""
  echo "  1. Edit $CONFIG_FILE to set your layout commands:"
  echo "     - server pane: your dev server command (e.g., pnpm dev)"
  echo "     - main pane: your main tool (e.g., claude)"
  if [ "$env_count" -gt 0 ]; then
    echo "  2. Optionally add ports/overrides to env_sync (run 'bufo @$alias_input config scan' for guidance)"
    echo "  3. Run 'bufo @$alias_input spawn' to create your first tadpole"
  else
    echo "  2. Run 'bufo @$alias_input spawn' to create your first tadpole"
  fi
  echo ""
}

# Helper: set as default project if it's the first one registered
_init_set_default_if_first() {
  local alias="$1"
  local count=0
  for f in "$PROJECTS_DIR"/*.yaml; do
    [ -f "$f" ] || continue
    count=$((count + 1))
  done

  if [ "$count" -le 1 ]; then
    mkdir -p "$CONFIG_DIR"
    if [ -f "$GLOBAL_CONFIG" ] && yq -r '.default_project' "$GLOBAL_CONFIG" &>/dev/null; then
      VALUE="$alias" yq -i '.default_project = strenv(VALUE)' "$GLOBAL_CONFIG"
    else
      cat > "$GLOBAL_CONFIG" << EOF
# Bufo Global Configuration
default_project: $alias
EOF
    fi
    echo -e "  ${GREEN}Set as default project${NC} (use 'bufo default' to change)"
  fi
}

# =============================================================================
# Config Scan - Discover env files and provide template
# =============================================================================

config_scan() {
  if ! config_exists; then
    error "No config file found. Run 'bufo init' first."
    return 1
  fi

  load_config

  local repo_path=$(expand_path "$MAIN_REPO")
  if [ ! -d "$repo_path" ]; then
    error "Main repo not found: $repo_path"
    return 1
  fi

  # --- Install command detection ---
  local current_install=$(config_get "install_command" "")
  if [ -z "$current_install" ] || [ "$current_install" = "null" ]; then
    if [ -f "$repo_path/package.json" ]; then
      local suggested="npm install"
      if [ -f "$repo_path/pnpm-lock.yaml" ]; then
        suggested="pnpm install"
      elif [ -f "$repo_path/yarn.lock" ]; then
        suggested="yarn install"
      elif [ -f "$repo_path/bun.lockb" ] || [ -f "$repo_path/bun.lock" ]; then
        suggested="bun install"
      fi

      echo -e "${CYAN}Detected package.json in main repo${NC}"
      echo ""
      read -rp "  Install command [$suggested]: " user_install
      local install_cmd="${user_install:-$suggested}"

      if [ -n "$install_cmd" ]; then
        VALUE="$install_cmd" yq -i '.install_command = strenv(VALUE)' "$CONFIG_FILE"
        echo -e "  ${GREEN}Set install_command: $install_cmd${NC}"
      fi
      echo ""
    fi
  fi

  # --- Env file scanning ---
  echo -e "${CYAN}Scanning for .env files in main repo...${NC}"
  echo ""

  local env_files=""
  local file_count=0

  # Only scan for .env files (not .env.example) since we copy from main repo
  while IFS= read -r file; do
    [ -z "$file" ] && continue
    env_files="$env_files$file"$'\n'
    file_count=$((file_count + 1))
  done < <(find "$repo_path" -maxdepth 3 -type f -name ".env" ! -path "*/node_modules/*" ! -path "*/.git/*" 2>/dev/null | sort)

  if [ $file_count -eq 0 ]; then
    echo "  No .env files found in $repo_path"
    echo ""
    echo "  You can manually configure env_sync in $CONFIG_FILE"
    return 0
  fi

  echo -e "Found ${GREEN}${file_count}${NC} .env file(s) in main repo:"
  echo ""

  echo "$env_files" | while IFS= read -r file; do
    [ -z "$file" ] && continue
    local rel_path="${file#$repo_path/}"
    echo -e "  ${BOLD}$rel_path${NC}"
  done

  echo ""
  echo -e "${CYAN}Add to $CONFIG_FILE:${NC}"
  echo ""
  echo "env_sync:"
  echo "  files:"

  echo "$env_files" | while IFS= read -r file; do
    [ -z "$file" ] && continue
    local rel_path="${file#$repo_path/}"
    echo "    - path: $rel_path        # copied from main repo"
    echo "      ports: []              # e.g., [API_PORT, ADMIN_PORT]"
    echo "      # refs:                # optional: URL vars that reference ports"
    echo "      #   VITE_API_URL: API_PORT"
    echo "      # overrides:           # optional: override specific vars per tadpole"
    echo "      #   DEBUG: \"true\""
  done

  echo ""
  echo -e "${CYAN}How it works:${NC}"
  echo "  - Each file is copied from the same path in your main repo"
  echo "  - ports: vars bufo manages (increments per tadpole, checks availability)"
  echo "  - refs: URL vars that reference a managed port (auto-rewritten)"
  echo "  - overrides: set specific env vars differently in workspaces"
}

show_config() {
  if ! config_exists; then
    echo -e "${YELLOW}No config file found.${NC}"
    echo "Run 'bufo init' to create one."
    return
  fi

  echo -e "${CYAN}Bufo Configuration${NC}"
  if [ -n "${PROJECT_ALIAS:-}" ]; then
    echo "Project: @$PROJECT_ALIAS"
  fi
  echo "File: $CONFIG_FILE"
  echo ""
  cat "$CONFIG_FILE"
}
