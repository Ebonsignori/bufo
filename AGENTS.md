# Bufo - Agent Guide

## What is Bufo?

An iTerm2-native workspace (tadpoles) manager for multi-repo development on macOS. 

Each tadpole is a **git worktree** with its own branch. Opening a tadpole creates an iTerm2 window/tab with 3 panes (terminal, server, main) and runs configured commands in each.

## Architecture

### Source Layout

```
src/
  bufo                # Entry point: sources all libs, main() case router
  lib/
    common.sh             # Colors, VERSION, CONFIG_DIR, error/warn/info/success, command_exists
    config.sh             # config_get, config_exists, validate_config, load_config, sync_mcp_servers
    projects.sh           # Multi-project resolution, show_projects, handle_alias_command
    iterm.sh              # iTerm2 AppleScript abstraction layer (16 functions)
    state.sh              # Tadpole pane state persistence (JSON files)
    ports.sh              # Port management, env file syncing
    worktree.sh           # Git worktree creation, submodules, shared volume
    tadpole.sh            # Core tadpole operations (open, create, cleanup, restart, etc.)
    wip.sh                # WIP save/restore with git patches
    session.sh            # Named session management for Claude Code
    review.sh             # PR review and court (multi-agent) review
    ticket.sh             # Linear ticket tadpole creation
    doctor.sh             # Diagnostic checks
    init.sh               # Project registration, templates, config scan
    setup.sh              # iTerm2 setup (keybindings, logging, web plist); check_setup_reminder
    raycast.sh            # Raycast extension install/dev commands
    help.sh               # Help text and cheat sheet
install.sh            # Bootstrap installer — also copied to ~/.local/bin/install.sh for 'bufo install'
daemon/                   # Mobile web daemon (Node.js/TypeScript) — see daemon/AGENTS.md
raycast/                  # Raycast extension (TypeScript/React) — see raycast/AGENTS.md
```

### Key Directories

| Path | Purpose |
|------|---------|
| `~/.bufo/` | Config directory (CONFIG_DIR) |
| `~/.bufo/projects/<alias>.yaml` | Per-project config files |
| `~/.bufo/config.yaml` | Global config (default_project, aliases, setup_completed) |
| `~/.bufo/state/<session>/*.json` | iTerm2 session ID state files |
| `~/.bufo/sessions/<project>/` | Named Claude sessions |
| `~/.bufo/wip/<prefix>-<N>/` | Saved WIP states (patches, metadata) |
| `~/.bufo/shared/` | Shared volume (symlinked into tadpoles) |
| `~/.local/bin/bufo` | Installed CLI entry point |
| `~/.local/bin/lib/` | Installed lib files (copied from `src/lib/`) |
| `~/.local/bin/daemon/` | Installed daemon plist template (copied from `daemon/`) |
| `~/.local/bin/install.sh` | Installed installer copy with repo path stamped in (used by `bufo install`) |

### Data Flow

```
main() → resolve project (@alias or cwd detection)
       → resolve command aliases
       → case router → load_config → validate_config → handler function
```

For tadpole operations:
```
open_tadpole → state_workspace_exists? → iterm_focus_tab (existing)
                                       → create_tadpole_layout (new)
                                         → create_workspace (git worktree)
                                         → iterm_create_window/tab
                                         → iterm_split_vertical/horizontal
                                         → iterm_send_text (run commands)
                                         → state_save_workspace (persist IDs)
```

## Tech Stack

### CLI (`src/`)
- **Bash** - Pure bash, no compiled dependencies
- **iTerm2 AppleScript** (`osascript`) - Window/pane management
- **yq** - YAML config parsing
- **jq** - JSON state file parsing
- **git** - Worktrees, submodules, patches

### Daemon (`daemon/`)
- **Node.js / TypeScript** - HTTP + WebSocket server, compiled via `tsc`
- **ws** - WebSocket library
- **js-yaml** - YAML config parsing
- See `daemon/AGENTS.md` for full details

### Raycast Extension (`raycast/`)
- **TypeScript / React** - Raycast commands, compiled via `ray build`
- **@raycast/api** - UI primitives (List, Form, ActionPanel, etc.)
- **js-yaml** - YAML config parsing (shared with daemon via `src/lib/` symlink)
- See `raycast/AGENTS.md` for full details

## Key Concepts

### iTerm2 Abstraction (`iterm.sh`)

All iTerm2 interaction goes through `iterm_*` functions. Never call `osascript` directly outside this file. Key functions:

| Function | Returns | Purpose |
|----------|---------|---------|
| `iterm_create_window <name> <dir>` | `window_id:tab_id:session_id` | New window with named tab |
| `iterm_create_tab <name> <dir>` | `tab_id:session_id` | New tab in current window |
| `iterm_split_vertical <session_id>` | `new_session_id` | Split pane right |
| `iterm_split_horizontal <session_id>` | `new_session_id` | Split pane below |
| `iterm_send_text <session_id> <text>` | - | Send command to pane |
| `iterm_send_interrupt <session_id>` | - | Send Ctrl-C to pane |
| `iterm_focus_tab <tab_name>` | - | Activate + select tab by name |
| `iterm_session_exists <session_id>` | bool | Check if session is alive |

### State Persistence (`state.sh`)

iTerm2 has no built-in session tracking like tmux. State files at `~/.bufo/state/<session_name>/tp<N>.json` store:

```json
{
  "workspace": 1,
  "window_id": "...",
  "tab_id": "...",
  "panes": {
    "terminal": "<session_id>",
    "server": "<session_id>",
    "main": "<session_id>"
  },
  "created_at": "..."
}
```

`state_workspace_exists()` checks both the file AND validates the session is alive (auto-cleans stale state).

Legacy state files (`ws<N>.json`) are read as a fallback for backwards compatibility.

### Config Loading (`config.sh`)

Config is lazily loaded via `load_config()`. Key globals set:

- `SESSION_NAME`, `TADPOLE_BASE`, `MAIN_REPO`, `CONFIG_FILE`
- `TADPOLE_PREFIX`, `TADPOLE_COUNT`, `BRANCH_PATTERN`
- `API_PORT_BASE`, `APP_PORT_BASE`
- `SHARED_VOLUME_ENABLED`, `SHARED_VOLUME_PATH`, `SHARED_VOLUME_LINK`
- `WIP_BASE`

Legacy aliases `WORKSPACE_BASE`, `WORKSPACE_PREFIX`, `WORKSPACE_COUNT` are set equal to their `TADPOLE_*` counterparts for compatibility with any remaining callsites.

### Multi-Project (`projects.sh`)

Projects are identified by alias (e.g., `@pf`). Resolution order:
1. Explicit `@alias` argument
2. Detect from current working directory (`resolve_project_from_cwd`)
3. Fall back to default project in global config

### Port Management (`ports.sh`)

Ports are auto-incremented per tadpole: `base_port + (tadpole_num * port_spacing)`. The `sync_env_files()` function handles:
- Copying `.env` from templates
- Incrementing port variables (`ports:` list)
- Rewriting URL variables that reference ports (`refs:` map)

## Releasing

Releases are triggered manually via GitHub Actions — there is no `make release` target.

### How to release

```bash
gh workflow run release.yml -f version=x.y.z
```

- `version` must be a bare semver string (e.g. `1.2.3`) — **no leading `v`**
- The workflow validates the format, then handles everything else automatically

### What the release workflow does

1. **Bumps the version** — rewrites `VERSION=` in `src/lib/common.sh` via `sed`
2. **Commits and tags** — pushes a `chore: bump version to x.y.z` commit to `main` and an annotated tag `vX.Y.Z`
3. **Builds release assets:**
   - `install.sh` — the installer script (so the one-liner always pulls a tagged release)
   - `install.sh.sha256` — SHA256 checksum
   - `bufo` — the CLI entry point (`src/bufo`)
   - `bufo-lib.tar.gz` — the full `src/lib/` directory
   - `bufo-daemon.tar.gz` — compiled daemon (`dist/` + `package.json`)
   - `bufo.sha256` / `bufo-lib.tar.gz.sha256` / `bufo-daemon.tar.gz.sha256` — SHA256 checksums
4. **Creates a GitHub Release** with auto-generated release notes (from commit messages) and all assets attached

### Version source of truth

The canonical version lives in **`src/lib/common.sh`**:

```bash
VERSION="x.y.z"
```

This is the only place the version is declared. There is no `CHANGELOG.md` — release notes are auto-generated by GitHub from commit history.

### Shortcut (from `make help`)

```bash
make help   # shows: gh workflow run release.yml -f version=x.y.z
```

---

## Development

### Prerequisites

- macOS with iTerm2
- `brew install yq jq git`

### Running

```bash
# Direct execution (uses src/ files directly, no install needed)
./src/bufo --version
./src/bufo doctor
./src/bufo cheat

# With a configured project
./src/bufo init          # Register a project
./src/bufo spawn         # Create your first tadpole
```

### Installing locally

```bash
# Install from this checkout (skips GitHub download)
./install.sh

# Re-run after making changes to src/ or install.sh
./install.sh
```

`install.sh` detects that `src/bufo` exists alongside it and copies local files directly instead of downloading from GitHub. It also stamps the repo path into `~/.local/bin/install.sh` so that `bufo install` (the re-run command) knows where to find `daemon/com.bufo.daemon.plist.template`.

### Testing

```bash
make test                    # Run unit tests
make lint                    # Run shellcheck
```

### Adding a New Command

1. Create handler function in the appropriate `src/lib/*.sh` file
2. Add case to `main()` in `src/bufo`
3. If it needs config, add to the project-aware commands case list
4. Update `show_help()` and `show_cheat()` in `src/lib/help.sh`
5. Add tests to `tests/run.sh`

### Adding an iTerm2 Operation

Add wrapper function to `src/lib/iterm.sh` following the existing pattern:
- Use `osascript -e` with AppleScript
- Iterate windows → tabs → sessions to find targets by ID
- Return IDs as colon-separated strings
- Redirect stderr to `/dev/null`

## Conventions

- **Pure bash** - No Python, Node, or compiled tools in the core
- **macOS only** - iTerm2 is macOS-only; use `sed -i ''` (BSD sed), not `sed -i` (GNU)
- **No tmux** - All terminal multiplexing via iTerm2 AppleScript
- **Modular files** - Each file handles one domain; source order matters (see entry point)
- **Color output** - Use `$RED`, `$GREEN`, `$YELLOW`, `$CYAN`, `$NC` from `common.sh`
- **Error handling** - Use `error "msg"` / `warn "msg"` / `success "msg"` helpers
- **Config access** - Always use `config_get "key" "default"` or `yq` directly on `$CONFIG_FILE`
- **State files** - JSON via `jq`; config files via `yq` on YAML
- **Exit codes** - `exit 1` for fatal errors; `return 1` for recoverable failures
- **Naming** - Functions use `snake_case`; private helpers prefixed with `_` (e.g., `_restore_wip`)
