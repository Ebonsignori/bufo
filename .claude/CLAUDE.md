# Bufo

Bufo is a macOS iTerm2 workspace manager for parallel AI-assisted development. It manages **tadpoles** — git worktrees with their own branches, each opened as a dedicated iTerm2 window with pre-configured panes (terminal, server, main) where an AI coding agent runs autonomously.

@../AGENTS.md

---

## Claude Code-Specific Notes

### Where to Find Things Fast

| Task | File |
|------|------|
| New CLI command | `src/lib/<domain>.sh` + case in `src/bufo` + update `src/lib/help.sh` |
| New iTerm2 operation | `src/lib/iterm.sh` only — never call `osascript` elsewhere |
| New TS type | `raycast/src/lib/types.ts` |
| New config reader | `raycast/src/lib/config.ts` |
| New Raycast command | `raycast/src/<name>.tsx` + entry in `raycast/package.json` commands array + `cd raycast && npm run build` + `bufo raycast install` |
| New daemon WebSocket message | `daemon/src/server.ts` |

### Commands

```bash
make test                        # Run bash test suite (no iTerm2 needed)
make lint                        # shellcheck all bash files
./install.sh                     # Install locally (only needed once — ~/.local/bin/bufo and lib/ are symlinked to src/, so edits are live immediately)
cd daemon && npm run build       # Compile TypeScript → dist/
bufo web restart                 # Reload daemon after build
cd raycast && npm run build       # Build Raycast extension → dist-install/
bufo raycast install             # Copy dist-install/ → ~/.config/raycast/extensions/bufo/ (run after every build)
cd raycast && npm run dev        # Raycast hot-reload dev mode
gh workflow run release.yml -f version=x.y.z  # Release (no leading v)
```

### Critical Gotchas

- **`daemon/src/lib/` is a symlink** to `raycast/src/lib/`. `raycast/src/lib/` is canonical — edits there propagate to the daemon automatically. Never add files to `raycast/src/lib/` without going through the daemon symlink path.
- **macOS BSD sed** — always `sed -i ''`, never `sed -i` (GNU). The whole codebase is macOS-only.
- **`_config_loaded` guard** — `load_config` is idempotent by design. Config won't reload mid-session even if called again.
- **`WORKSPACE_*` globals** are kept as aliases of `TADPOLE_*` for backward compatibility — don't remove them.
- **State file naming** — files live at `~/.bufo/state/<session_name>/tp<N>.json` where `session_name` comes from the project YAML's `session_name:` field, not the project alias.
- **Tadpoles are locked by default** — `bufo pr` and `bufo ticket` only reuse unlocked tadpoles. This is intentional to prevent stealing an active AI session.
- **Port formula** — `base_port + (tadpole_num × port_spacing)`. `port_spacing` defaults to 10.
- **Infobar is a real pane** — pane 4 is a live iTerm2 pane running a polling loop (`src/lib/infobar.sh`), not rendered overlay text.

### Testing Without iTerm2

All tests that require a live iTerm2 session are automatically skipped. You can run the full suite safely in any environment:

```bash
make test                            # All suites
./tests/run.sh config ports state    # Specific suites
./tests/run.sh --list                # List available suites
```

Prefer `assert` over `run_test` for new tests — `assert` doesn't use `eval` and is safer.

### Releasing

Releases are triggered via GitHub Actions only — there is no local `make release`:

```bash
gh workflow run release.yml -f version=x.y.z   # bare semver, no leading v
```

The workflow bumps `VERSION` in `src/lib/common.sh`, commits + tags, builds assets, and creates a GitHub Release with auto-generated notes from commit history. There is no `CHANGELOG.md`.

## Team Mode

You can spawn agent teammates for complex tasks. Use the Task tool to create specialized agents (researcher, implementer, reviewer, debugger) that work in parallel. Coordinate the team, assign tasks, and synthesize results. Only spawn teams when the task benefits from parallel work.
