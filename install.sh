#!/usr/bin/env bash
# Bufo installer (macOS only - requires iTerm2)

set -e

REPO="https://github.com/Ebonsignori/bufo"
INSTALL_DIR="${BUFO_INSTALL_DIR:-$HOME/.local/bin}"
SCRIPT_NAME="bufo"
PERSISTED_REPO_DIR="__BUFO_REPO_DIR__"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
GRAY='\033[0;90m'
NC='\033[0m'

# Wizard: ask user to choose their default AI coding agent.
# Writes "default_ai_tool: <tool>" to ~/.bufo/config.yaml (idempotent — skip if already set).
prompt_ai_agent() {
  local claude_install="npm install -g @anthropic-ai/claude-code"
  local codex_install="npm install -g @openai/codex"
  local copilot_install="npm install -g @github/copilot-cli"
  local gemini_install="npm install -g @google/gemini-cli"

  local claude_status codex_status copilot_status gemini_status
  if command -v claude &>/dev/null; then
    claude_status="${GREEN}[installed]${NC}"
  else
    claude_status="${YELLOW}[not installed]${NC}"
  fi
  if command -v codex &>/dev/null; then
    codex_status="${GREEN}[installed]${NC}"
  else
    codex_status="${YELLOW}[not installed]${NC}"
  fi
  if command -v copilot &>/dev/null; then
    copilot_status="${GREEN}[installed]${NC}"
  else
    copilot_status="${YELLOW}[not installed]${NC}"
  fi
  if command -v gemini &>/dev/null; then
    gemini_status="${GREEN}[installed]${NC}"
  else
    gemini_status="${YELLOW}[not installed]${NC}"
  fi

  echo -e "${CYAN}Select your default AI coding agent:${NC}"
  echo ""
  echo -e "  1. Claude Code   (Anthropic — claude CLI)          $(echo -e "$claude_status")"
  echo -e "  2. Codex         (OpenAI — codex CLI)              $(echo -e "$codex_status")"
  echo -e "  3. Copilot CLI   (GitHub Copilot — copilot CLI)    $(echo -e "$copilot_status")"
  echo -e "  4. Gemini CLI    (Google — gemini CLI)             $(echo -e "$gemini_status")"
  echo ""

  local choice
  read -p "Choose [1-4, default: 1]: " choice
  choice="${choice:-1}"

  local selected_tool selected_name install_hint=""
  case "$choice" in
    1)
      selected_tool="claude"; selected_name="Claude Code"
      command -v claude &>/dev/null || install_hint="$claude_install"
      ;;
    2)
      selected_tool="codex"; selected_name="Codex"
      command -v codex &>/dev/null || install_hint="$codex_install"
      ;;
    3)
      selected_tool="copilot"; selected_name="Copilot CLI"
      command -v copilot &>/dev/null || install_hint="$copilot_install"
      ;;
    4)
      selected_tool="gemini"; selected_name="Gemini CLI"
      command -v gemini &>/dev/null || install_hint="$gemini_install"
      ;;
    *)
      echo -e "${YELLOW}Invalid choice — defaulting to Claude.${NC}"
      selected_tool="claude"; selected_name="Claude Code"
      command -v claude &>/dev/null || install_hint="$claude_install"
      ;;
  esac

  echo ""

  if [ -n "$install_hint" ]; then
    echo ""
    echo -e "${YELLOW}⚠  $selected_name is not installed.${NC}"
    echo -e "   Install with: ${CYAN}$install_hint${NC}"
  fi

  _write_default_ai_tool "$selected_tool" "$selected_name"
  echo ""
}

# Write default_ai_tool to ~/.bufo/config.yaml.
# Writes default_ai_tool to ~/.bufo/config.yaml.
# Always honors the user's explicit choice, showing what changed if overriding a prior value.
# Uses yq (already required by bufo) for safe in-place YAML editing.
_write_default_ai_tool() {
  local tool="$1"
  local name="$2"
  local global_cfg="${GLOBAL_CONFIG:-$HOME/.bufo/config.yaml}"

  # Show what's being replaced if different from existing value
  if [ -f "$global_cfg" ] && command -v yq &>/dev/null; then
    local existing
    existing=$(yq -r '.default_ai_tool // ""' "$global_cfg" 2>/dev/null)
    if [ -n "$existing" ] && [ "$existing" != "null" ] && [ "$existing" != "$tool" ]; then
      echo -e "  ${GRAY}(replacing '$existing' → '$tool')${NC}"
    fi
  fi

  mkdir -p "$(dirname "$global_cfg")"

  if [ -f "$global_cfg" ]; then
    # File exists: inject key with yq in-place (same idiom used throughout config.sh)
    VALUE="$tool" yq -i '.default_ai_tool = strenv(VALUE)' "$global_cfg"
  else
    # File doesn't exist: create with header
    cat > "$global_cfg" << EOF
# Bufo Global Configuration
default_ai_tool: $tool
EOF
  fi

  echo -e "${GREEN}✓${NC} Default AI agent: ${BOLD}$name${NC}"
}

echo -e "${CYAN}Installing bufo...${NC}"

# Verify macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
  echo -e "${RED}Error: bufo requires macOS (uses iTerm2 AppleScript).${NC}"
  exit 1
fi

# Verify iTerm2
if [ ! -d "/Applications/iTerm.app" ] && [ ! -d "$HOME/Applications/iTerm.app" ]; then
  echo -e "${RED}Error: iTerm2 not found.${NC}"
  echo "Install from: https://iterm2.com"
  exit 1
fi

# Install dependencies via Homebrew
install_package() {
  local package="$1"
  echo -e "${CYAN}Installing $package...${NC}"
  if command -v brew &>/dev/null; then
    brew install "$package"
  else
    echo -e "${RED}Error: Homebrew not found. Install from https://brew.sh${NC}"
    echo "Then run: brew install $package"
    return 1
  fi
}

echo "Checking dependencies..."

# Check git (required)
if ! command -v git &>/dev/null; then
  echo -e "${YELLOW}git not found. Installing...${NC}"
  install_package git || {
    echo -e "${RED}Error: Failed to install git.${NC}"
    exit 1
  }
fi

# Check yq (required)
if ! command -v yq &>/dev/null; then
  echo -e "${YELLOW}yq not found. Installing...${NC}"
  install_package yq || {
    echo -e "${RED}Error: Failed to install yq. Install manually: brew install yq${NC}"
    exit 1
  }
fi

# Check jq (required for state management)
if ! command -v jq &>/dev/null; then
  echo -e "${YELLOW}jq not found. Installing...${NC}"
  install_package jq || {
    echo -e "${RED}Error: Failed to install jq. Install manually: brew install jq${NC}"
    exit 1
  }
fi

echo -e "${GREEN}All dependencies installed.${NC}"
echo ""

# Create install directory
mkdir -p "$INSTALL_DIR"

# Detect whether we're running from a local repo checkout
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$SCRIPT_DIR/src/bufo" ]; then
  echo "Using local repo at $SCRIPT_DIR..."
  src_dir="$SCRIPT_DIR/src"
  tmp_dir=""
else
  # Download from GitHub.
  # If called from an existing installation (bufo install), BUFO_VERSION is set to the
  # running version so we re-download that exact release rather than fetching latest.
  local_ref="${BUFO_VERSION:-}"
  if [ -z "$local_ref" ]; then
    # Resolve the latest release tag so we always install a stable, tagged version.
    local_ref=$(curl -fsSL \
      "https://api.github.com/repos/Ebonsignori/bufo/releases/latest" \
      2>/dev/null | grep '"tag_name"' | head -1 | cut -d'"' -f4 | sed 's/^v//')
    if [ -z "$local_ref" ]; then
      echo -e "${YELLOW}Warning: could not determine latest release, falling back to main.${NC}"
    fi
  fi
  if [ -n "$local_ref" ]; then
    archive_url="$REPO/archive/refs/tags/v${local_ref}.tar.gz"
    extract_dir="bufo-${local_ref}"
  else
    archive_url="$REPO/archive/refs/heads/main.tar.gz"
    extract_dir="bufo-main"
  fi

  echo "Downloading bufo..."
  tmp_dir=$(mktemp -d)
  if command -v curl &>/dev/null; then
    curl -fsSL "$archive_url" -o "$tmp_dir/bufo.tar.gz" || { echo -e "${RED}Error: Failed to download bufo. Is the repo public and does the branch exist?${NC}"; exit 1; }
    tar -xz -C "$tmp_dir" -f "$tmp_dir/bufo.tar.gz"
  elif command -v wget &>/dev/null; then
    wget -q "$archive_url" -O "$tmp_dir/bufo.tar.gz" || { echo -e "${RED}Error: Failed to download bufo. Is the repo public and does the branch exist?${NC}"; exit 1; }
    tar -xz -C "$tmp_dir" -f "$tmp_dir/bufo.tar.gz"
  else
    echo -e "${RED}Error: curl or wget required for download.${NC}"
    exit 1
  fi
  src_dir="$tmp_dir/${extract_dir}/src"
fi

# Install entry point and lib
cp "$src_dir/bufo" "$INSTALL_DIR/$SCRIPT_NAME"
chmod +x "$INSTALL_DIR/$SCRIPT_NAME"

# Install lib directory alongside the script
mkdir -p "$INSTALL_DIR/lib"
cp -r "$src_dir/lib/"* "$INSTALL_DIR/lib/"

# Install daemon directory (needed by _setup_web_plist for the LaunchAgent plist)
mkdir -p "$INSTALL_DIR/daemon"
cp "$src_dir/../daemon/com.bufo.daemon.plist.template" "$INSTALL_DIR/daemon/"
# Install compiled daemon JS so the LaunchAgent can actually run server.js
mkdir -p "$INSTALL_DIR/daemon/dist"
cp -r "$src_dir/../daemon/dist/." "$INSTALL_DIR/daemon/dist/"
# Install pre-built web UI assets (index.html, xterm-bundle.js, xterm.css)
mkdir -p "$INSTALL_DIR/daemon/public"
cp -r "$src_dir/../daemon/public/." "$INSTALL_DIR/daemon/public/"
# Copy package.json so npm can install runtime dependencies
cp "$src_dir/../daemon/package.json" "$INSTALL_DIR/daemon/"
# Install runtime dependencies (ws, js-yaml, etc.) needed by server.js
echo "Installing daemon dependencies..."
npm install --omit=dev --legacy-peer-deps --prefix "$INSTALL_DIR/daemon" 2>&1 || \
  echo -e "${RED}Warning: npm install for daemon failed. The daemon may not start correctly.${NC}"

# Install install.sh itself so 'bufo install' can re-run it,
# stamping in INSTALL_DIR as the repo dir so _setup_web_plist can find daemon/
LC_ALL=C sed "s|__BUFO_REPO_DIR__|$INSTALL_DIR|g" "$src_dir/../install.sh" > "$INSTALL_DIR/install.sh"
chmod +x "$INSTALL_DIR/install.sh"

[ -n "$tmp_dir" ] && rm -rf "$tmp_dir"

# Add to PATH if needed
add_to_path() {
  local shell_profile=""
  local export_line="export PATH=\"\$PATH:$INSTALL_DIR\""

  case "$SHELL" in
    */zsh)
      shell_profile="$HOME/.zshrc"
      ;;
    */bash)
      if [[ -f "$HOME/.bash_profile" ]]; then
        shell_profile="$HOME/.bash_profile"
      else
        shell_profile="$HOME/.bashrc"
      fi
      ;;
    *)
      shell_profile="$HOME/.profile"
      ;;
  esac

  if [[ -f "$shell_profile" ]] && grep -q "$INSTALL_DIR" "$shell_profile" 2>/dev/null; then
    echo -e "${GREEN}PATH already configured in $shell_profile${NC}"
    return 0
  fi

  echo "" >> "$shell_profile"
  echo "# Added by bufo installer" >> "$shell_profile"
  echo "$export_line" >> "$shell_profile"

  echo -e "${GREEN}Added $INSTALL_DIR to PATH in $shell_profile${NC}"
  echo -e "${YELLOW}Run 'source $shell_profile' or open a new terminal to use bufo${NC}"
}

if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
  echo ""
  echo -e "${YELLOW}$INSTALL_DIR is not in your PATH.${NC}"
  add_to_path
  echo ""
else
  # Still call add_to_path so the profile-file grep guard runs and prevents
  # duplicate entries if the user re-installs with a different BUFO_INSTALL_DIR.
  add_to_path
fi

# Run iTerm2 setup unless --no-setup flag was passed
skip_setup=false
for arg in "$@"; do
  if [ "$arg" = "--no-setup" ] || [ "$arg" = "--skip-setup" ]; then
    skip_setup=true
    break
  fi
done

if [ "$skip_setup" = false ]; then
  echo ""
  # Source the freshly-installed lib so we can call setup_terminal.
  # BUFO_REPO_DIR tells _setup_web_plist where to find the daemon/ template.
  # Prefer an explicit env override, then the persisted value stamped into this
  # script at install time, then the directory containing install.sh itself.
  if [ -z "${BUFO_REPO_DIR:-}" ]; then
    if [ "$PERSISTED_REPO_DIR" != "__BUFO_REPO_DIR__" ]; then
      export BUFO_REPO_DIR="$PERSISTED_REPO_DIR"
    else
      export BUFO_REPO_DIR="$INSTALL_DIR"
    fi
  fi
  export BUFO_DIR="$INSTALL_DIR"
  # shellcheck source=/dev/null
  source "$INSTALL_DIR/lib/common.sh"
  # shellcheck source=/dev/null
  source "$INSTALL_DIR/lib/config.sh"
  # shellcheck source=/dev/null
  source "$INSTALL_DIR/lib/prompts.sh"
  # shellcheck source=/dev/null
  source "$INSTALL_DIR/lib/iterm.sh"
  # shellcheck source=/dev/null
  source "$INSTALL_DIR/lib/setup.sh"
  setup_terminal
else
  # --no-setup path: source the minimum needed for init_prompts
  export BUFO_DIR="${BUFO_DIR:-$INSTALL_DIR}"
  # shellcheck source=/dev/null
  source "$INSTALL_DIR/lib/common.sh"
  # shellcheck source=/dev/null
  source "$INSTALL_DIR/lib/prompts.sh"
fi

# Write default prompt files to ~/.bufo/prompts/ (idempotent — won't overwrite edits)
init_prompts
echo -e "${GREEN}✓${NC} Default prompt files written to ~/.bufo/prompts/"

echo ""
prompt_ai_agent

echo ' ◎ , ◎'
echo '（ -──）  Installation complete!'
echo -e "/(    )\\"
echo ""
echo "You can now use the 'bufo' command."
echo ""
echo "Next steps:"
echo "  1. Run 'source ~/.zshrc' (or open new terminal)"
echo "  2. Run 'bufo init' to create your config"
echo "  3. Run 'bufo tp 1' to start your first tadpole"
echo ""
echo "Run 'bufo cheat' for a quick reference."
echo "Run 'bufo install' at any time to re-run this setup."
