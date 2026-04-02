#!/usr/bin/env bash
# bufo - iTerm2 terminal setup (keyboard shortcuts, preferences)

# iTerm2 key binding action IDs (from iTermKeyBindingMgr.h)
_ITERM_ACTION_SELECT_PANE_LEFT=18
_ITERM_ACTION_SELECT_PANE_RIGHT=19
_ITERM_ACTION_SELECT_PANE_ABOVE=20
_ITERM_ACTION_SELECT_PANE_BELOW=21

# Modifier flags
_ITERM_MOD_CONTROL="0x40000"

# Virtual keycodes for HJKL (macOS kVK_ANSI_* values)
_ITERM_VK_H="0x4"
_ITERM_VK_J="0x26"
_ITERM_VK_K="0x28"
_ITERM_VK_L="0x25"

# Set an iTerm2 key binding in both GlobalKeyMap and all profiles
# Usage: _iterm_set_keybinding <hex_char> <hex_modifier> <virtual_keycode> <action_id>
_iterm_set_keybinding() {
  local hex_char="$1"
  local hex_modifier="$2"
  local virtual_keycode="$3"
  local action="$4"
  local plist="$HOME/Library/Preferences/com.googlecode.iterm2.plist"

  # --- Global key map (legacy format: char-modifier) ---
  local global_key="$hex_char-$hex_modifier"
  /usr/libexec/PlistBuddy -c "Add :GlobalKeyMap dict" "$plist" 2>/dev/null || true
  /usr/libexec/PlistBuddy -c "Delete :GlobalKeyMap:'$global_key'" "$plist" 2>/dev/null || true
  /usr/libexec/PlistBuddy -c "Add :GlobalKeyMap:'$global_key' dict" "$plist"
  /usr/libexec/PlistBuddy -c "Add :GlobalKeyMap:'$global_key':Action integer $action" "$plist"
  /usr/libexec/PlistBuddy -c "Add :GlobalKeyMap:'$global_key':Text string ''" "$plist"

  # --- Profile key maps (v2 format: char-modifier-keycode) ---
  local profile_key="$hex_char-$hex_modifier-$virtual_keycode"
  local i=0
  while /usr/libexec/PlistBuddy -c "Print :New\ Bookmarks:$i:Guid" "$plist" &>/dev/null; do
    local kb_path=":New Bookmarks:$i:Keyboard Map"

    # Ensure Keyboard Map exists
    /usr/libexec/PlistBuddy -c "Add '$kb_path' dict" "$plist" 2>/dev/null || true

    # Remove existing binding if present
    /usr/libexec/PlistBuddy -c "Delete '$kb_path':'$profile_key'" "$plist" 2>/dev/null || true

    # Add the v2 binding
    /usr/libexec/PlistBuddy -c "Add '$kb_path':'$profile_key' dict" "$plist"
    /usr/libexec/PlistBuddy -c "Add '$kb_path':'$profile_key':Action integer $action" "$plist"
    /usr/libexec/PlistBuddy -c "Add '$kb_path':'$profile_key':Text string ''" "$plist"
    /usr/libexec/PlistBuddy -c "Add '$kb_path':'$profile_key':Version integer 2" "$plist"
    /usr/libexec/PlistBuddy -c "Add '$kb_path':'$profile_key':Apply\ Mode integer 0" "$plist"
    /usr/libexec/PlistBuddy -c "Add '$kb_path':'$profile_key':Escaping integer 2" "$plist"

    i=$((i + 1))
  done
}

_setup_session_logging() {
  local log_dir="$HOME/.bufo/logs"
  local plist="$HOME/Library/Preferences/com.googlecode.iterm2.plist"

  mkdir -p "$log_dir"

  local i=0
  local count=0
  while /usr/libexec/PlistBuddy -c "Print ':New Bookmarks:$i:Guid'" "$plist" &>/dev/null; do
    # Enable automatic logging
    /usr/libexec/PlistBuddy -c "Delete ':New Bookmarks:$i:Automatically Log'" "$plist" 2>/dev/null || true
    /usr/libexec/PlistBuddy -c "Add ':New Bookmarks:$i:Automatically Log' bool true" "$plist"

    # Set log directory to ~/.bufo/logs/
    /usr/libexec/PlistBuddy -c "Delete ':New Bookmarks:$i:Log Directory'" "$plist" 2>/dev/null || true
    /usr/libexec/PlistBuddy -c "Add ':New Bookmarks:$i:Log Directory' string '$log_dir/'" "$plist"

    # Set filename format to \(id).log — \(id) is the session UUID which matches
    # the unique ID returned by AppleScript and used by bufo as sessionId.
    # (four backslashes → two in shell → PlistBuddy writes one literal backslash to the plist)
    /usr/libexec/PlistBuddy -c "Delete ':New Bookmarks:$i:Log Filename Format'" "$plist" 2>/dev/null || true
    /usr/libexec/PlistBuddy -c "Add ':New Bookmarks:$i:Log Filename Format' string '\\\\(id).log'" "$plist"

    # Set logging style to 0 = raw data (iTermLoggingStyleRaw)
    # "Plain Text Logging" is the plist key name (legacy — now stores an integer, 0=raw)
    /usr/libexec/PlistBuddy -c "Delete ':New Bookmarks:$i:Plain Text Logging'" "$plist" 2>/dev/null || true
    /usr/libexec/PlistBuddy -c "Add ':New Bookmarks:$i:Plain Text Logging' integer 0" "$plist"

    count=$((count + 1))
    i=$((i + 1))
  done

  echo -e "  ${GREEN}✓${NC} Session logging enabled on $count profile(s) → $log_dir/"
  echo -e "  ${GREEN}✓${NC} Log format: \\(id).log  (matches bufo session IDs)"
  echo -e "  ${GREEN}✓${NC} Log style: raw data (full ANSI/color output)"
}

_setup_paste_image_script() {
  # iTerm2 requires scripts that use PyPI packages (e.g. pyobjc/AppKit) to be
  # installed as a "full environment" directory rather than a bare .py file.
  # Structure: AutoLaunch/paste_image/paste_image.py + setup.cfg
  # iTerm2 replaces the $$PYTHON_VERSION$$ shebang token with its pyenv python path.
  local scripts_dir="$HOME/Library/Application Support/iTerm2/Scripts/AutoLaunch"
  local script_src="$BUFO_DIR/lib/scripts/paste_image.py"
  local setup_cfg_src="$BUFO_DIR/lib/scripts/setup.cfg"
  local dest_dir="$scripts_dir/paste_image"

  if [ ! -f "$script_src" ]; then
    warn "paste_image.py not found in bufo installation"
    return 1
  fi

  mkdir -p "$dest_dir"
  cp "$script_src" "$dest_dir/paste_image.py"
  cp "$setup_cfg_src" "$dest_dir/setup.cfg"
  echo -e "  ${GREEN}✓${NC} Installed paste_image/ to iTerm2 AutoLaunch"

  # Enable the Python API if not already enabled
  defaults write com.googlecode.iterm2 EnableAPIServer -bool true 2>/dev/null || true
  echo -e "  ${GREEN}✓${NC} iTerm2 Python API enabled"
}

_setup_split_pane_cwd() {
  local plist="$HOME/Library/Preferences/com.googlecode.iterm2.plist"

  local i=0
  local count=0
  while /usr/libexec/PlistBuddy -c "Print ':New Bookmarks:$i:Guid'" "$plist" &>/dev/null; do
    /usr/libexec/PlistBuddy -c "Delete ':New Bookmarks:$i:New Split Pane Inherits CWD'" "$plist" 2>/dev/null || true
    /usr/libexec/PlistBuddy -c "Add ':New Bookmarks:$i:New Split Pane Inherits CWD' bool true" "$plist"

    count=$((count + 1))
    i=$((i + 1))
  done

  echo -e "  ${GREEN}✓${NC} Split panes inherit CWD enabled on $count profile(s)"
}

_setup_web_plist() {
  local repo_dir
  if [ -n "${BUFO_REPO_DIR:-}" ]; then
    repo_dir="$BUFO_REPO_DIR"
  else
    repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
  fi
  local template="$repo_dir/daemon/com.bufo.daemon.plist.template"
  local plist="$HOME/Library/LaunchAgents/com.bufo.daemon.plist"

  if [ ! -f "$template" ]; then
    echo -e "  ${YELLOW}⚠${NC}  Plist template not found — skipping web agent setup"
    echo -e "  ${GRAY}Expected: $template${NC}"
    return
  fi

  local node_bin
  node_bin=$(command -v node 2>/dev/null)
  if [ -z "$node_bin" ]; then
    echo -e "  ${YELLOW}⚠${NC}  node not found in PATH — skipping web agent setup"
    echo -e "  ${GRAY}Install Node.js, then re-run 'bufo install'${NC}"
    return
  fi

  mkdir -p "$HOME/Library/LaunchAgents"
  # Prepend the directory containing node so NVM/mise/pyenv-managed binaries are found
  local node_dir
  node_dir=$(dirname "$node_bin")
  local resolved_path="${node_dir}:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
  sed \
    -e "s|__HOME__|$HOME|g" \
    -e "s|__NODE_BIN__|$node_bin|g" \
    -e "s|__BUFO_REPO__|$repo_dir|g" \
    -e "s|__PATH__|$resolved_path|g" \
    "$template" > "$plist"

  echo -e "  ${GREEN}✓${NC} Installed plist → $plist"
  echo -e "  ${GREEN}✓${NC} node: $node_bin"

  # Unload any previously registered job so launchd picks up the new plist cleanly
  launchctl unload "$plist" 2>/dev/null || true

  # Kill any orphaned daemon process holding the port (e.g. from a previous manual run)
  local port="${BUFO_PORT:-7373}"
  local orphan_pid
  orphan_pid=$(lsof -ti ":$port" -sTCP:LISTEN 2>/dev/null || true)
  if [ -n "$orphan_pid" ]; then
    kill "$orphan_pid" 2>/dev/null || true
    sleep 1
  fi

  launchctl load "$plist"
  echo -e "  ${GREEN}✓${NC} Web agent loaded (starts automatically via RunAtLoad + KeepAlive)"
  echo ""
  echo -e "  Run ${GREEN}bufo web${NC} to check status."
}

setup_terminal() {
  if ! iterm_is_installed; then
    error "iTerm2 is not installed"
    return 1
  fi

  echo -e "${CYAN}Bufo Terminal Setup${NC}"
  echo ""
  echo "This will configure:"
  echo ""
  echo -e "  ${BOLD}Keyboard shortcuts${NC}"
  echo -e "  ${GREEN}Ctrl+H${NC}  Move to pane left"
  echo -e "  ${GREEN}Ctrl+J${NC}  Move to pane below"
  echo -e "  ${GREEN}Ctrl+K${NC}  Move to pane above"
  echo -e "  ${GREEN}Ctrl+L${NC}  Move to pane right"
  echo ""
  echo -e "  ${BOLD}Clipboard image paste${NC}"
  echo -e "  ${GREEN}Cmd+Shift+V${NC}  Paste clipboard image as file path"
  echo -e "  ${GRAY}Useful for pasting screenshots into Claude Code${NC}"
  echo ""
  echo -e "  ${BOLD}Mobile terminal session logging${NC}"
  echo -e "  ${GREEN}~/.bufo/logs/\(id).log${NC}"
  echo -e "  ${GRAY}Enables full-color ANSI output in the Bufo mobile UI${NC}"
  echo ""
  echo -e "  ${BOLD}Split pane CWD${NC}"
  echo -e "  ${GRAY}New split panes open in the current working directory${NC}"
  echo ""
  echo -e "  ${BOLD}Web agent${NC}"
  echo -e "  ${GRAY}Installs and starts the LaunchAgent daemon${NC}"
  echo ""
  echo -e "  ${GRAY}Note: Ctrl+L (clear screen) will be overridden.${NC}"
  echo -e "  ${GRAY}Use 'clear' or Cmd+K to clear the terminal instead.${NC}"
  echo ""
  read -p "Apply these settings? [Y/n]: " confirm
  if [ "$confirm" = "n" ] || [ "$confirm" = "N" ]; then
    echo "Cancelled."
    return
  fi

  echo ""
  echo -e "${BOLD}Keyboard shortcuts:${NC}"

  # Ctrl+H (h=0x68, vk=0x4) → Select Pane Left
  _iterm_set_keybinding "0x68" "$_ITERM_MOD_CONTROL" "$_ITERM_VK_H" "$_ITERM_ACTION_SELECT_PANE_LEFT"
  echo -e "  ${GREEN}✓${NC} Ctrl+H → Select Pane Left"

  # Ctrl+J (j=0x6a, vk=0x26) → Select Pane Below
  _iterm_set_keybinding "0x6a" "$_ITERM_MOD_CONTROL" "$_ITERM_VK_J" "$_ITERM_ACTION_SELECT_PANE_BELOW"
  echo -e "  ${GREEN}✓${NC} Ctrl+J → Select Pane Below"

  # Ctrl+K (k=0x6b, vk=0x28) → Select Pane Above
  _iterm_set_keybinding "0x6b" "$_ITERM_MOD_CONTROL" "$_ITERM_VK_K" "$_ITERM_ACTION_SELECT_PANE_ABOVE"
  echo -e "  ${GREEN}✓${NC} Ctrl+K → Select Pane Above"

  # Ctrl+L (l=0x6c, vk=0x25) → Select Pane Right
  _iterm_set_keybinding "0x6c" "$_ITERM_MOD_CONTROL" "$_ITERM_VK_L" "$_ITERM_ACTION_SELECT_PANE_RIGHT"
  echo -e "  ${GREEN}✓${NC} Ctrl+L → Select Pane Right"

  echo ""
  echo -e "${BOLD}Clipboard image paste:${NC}"
  _setup_paste_image_script

  echo ""
  echo -e "${BOLD}Session logging (mobile ANSI colors):${NC}"
  _setup_session_logging

  echo ""
  echo -e "${BOLD}Split pane CWD:${NC}"
  _setup_split_pane_cwd

  echo ""

  # Mark setup as completed in global config
  if [ -f "$GLOBAL_CONFIG" ]; then
    yq -i '.setup_completed = true' "$GLOBAL_CONFIG"
  else
    mkdir -p "$CONFIG_DIR"
    cat > "$GLOBAL_CONFIG" << EOF
# Bufo Global Configuration
setup_completed: true
EOF
  fi

  if iterm_is_running; then
    echo -e "${YELLOW}Restart iTerm2 for all changes to take effect.${NC}"
  else
    success "Settings saved. They'll be active next time iTerm2 starts."
  fi

  echo ""
  echo -e "${BOLD}Web agent:${NC}"
  _setup_web_plist
}

check_setup_reminder() {
  local setup_done=""
  if [ -f "$GLOBAL_CONFIG" ]; then
    setup_done=$(yq -r '.setup_completed // ""' "$GLOBAL_CONFIG" 2>/dev/null)
  fi
  if [ "$setup_done" != "true" ]; then
    echo -e "${YELLOW}Tip:${NC} Run ${GREEN}bufo install${NC} to configure iTerm2 shortcuts and clipboard image paste"
    echo ""
  fi
}
