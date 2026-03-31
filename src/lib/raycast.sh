#!/usr/bin/env bash
# bufo - Raycast extension management

handle_raycast_command() {
  local subcmd="${1:-help}"

  case "$subcmd" in
    install)
      _raycast_install
      ;;
    dev)
      _raycast_dev
      ;;
    *)
      echo "Usage: bufo raycast <subcommand>"
      echo ""
      echo "Subcommands:"
      echo "  install   Install the Raycast extension (no npm/node required)"
      echo "  dev       Start extension with hot-reload for development (requires npm)"
      ;;
  esac
}

_raycast_install() {
  local extensions_dir="$HOME/.config/raycast/extensions/bufo"

  # Locate the pre-built raycast assets.
  # install.sh stamps the absolute repo path in place of /Users/evan/Projects/bufo/raycast/dist-install.
  # If the stamped path isn't a directory (running from dev checkout before stamping),
  # fall back to resolving relative to this lib file.
  local dist_dir="${BUFO_RAYCAST_DIST:-/Users/evan/Projects/bufo/raycast/dist-install}"
  if [ ! -d "$dist_dir" ]; then
    dist_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)/raycast/dist-install"
  fi

  if [ ! -d "$dist_dir" ]; then
    error "Pre-built Raycast extension not found at: $dist_dir"
    echo "Run 'bufo raycast dev' once to build it, or re-install bufo from the latest release."
    exit 1
  fi

  info "Installing Raycast extension..."
  mkdir -p "$extensions_dir"
  cp -r "$dist_dir"/. "$extensions_dir/"
  # Remove dev-mode marker files so Raycast treats this as a regular extension
  # (not a development extension shown under the Development tab)
  rm -f "$extensions_dir/cli.pid" "$extensions_dir/dev.log"
  success "Raycast extension installed."
  echo "Open Raycast and search for 'Bufo' to use it."
  echo "If commands don't appear, restart Raycast (⌘Q then reopen)."
}

_raycast_dev() {
  # Locate the raycast source directory.
  # install.sh stamps the absolute repo path in place of /Users/evan/Projects/bufo/raycast.
  # If the stamped path isn't a directory (running from dev checkout before stamping),
  # fall back to resolving relative to this lib file.
  local raycast_dir="${BUFO_RAYCAST_DIR:-/Users/evan/Projects/bufo/raycast}"
  if [ ! -d "$raycast_dir" ]; then
    raycast_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)/raycast"
  fi

  if [ ! -d "$raycast_dir" ]; then
    error "Raycast source directory not found at: $raycast_dir"
    echo "Set BUFO_RAYCAST_DIR=/path/to/bufo/raycast to override."
    exit 1
  fi

  if ! command_exists ray; then
    error "'ray' CLI not found. Install it via the Raycast app or:"
    echo "  npm install -g @raycast/api"
    exit 1
  fi

  if [ ! -d "$raycast_dir/node_modules" ]; then
    info "Installing npm dependencies..."
    (cd "$raycast_dir" && npm install)
  fi

  info "Starting Raycast extension in dev mode (hot-reload)..."
  info "Press Ctrl-C to stop."
  (cd "$raycast_dir" && npm run dev)
}
