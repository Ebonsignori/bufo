#!/usr/bin/env bash
# bufo - help and cheat sheet

show_cheat() {
  cat << 'EOF'
+===============================================================================+
|                                                                               |
|      ◎ , ◎                                                                    |
|    （ -──）        BUFO CHEAT SHEET                                       |
|    /(    )\        Tadpole manager for multi-repo development               |
|                                                                               |
|                                                                               |
|                                                                               |
+===============================================================================+
|                                                                               |
|  MULTI-PROJECT (bufo @alias ...)                                             |
|  ────────────────────────────────────────────────────────────────────────     |
|  bufo init              Register a new project (asks for alias)               |
|  bufo @pf ws 1          Open tadpole 1 for project "pf"                    |
|  bufo @cb config        Show config for project "cb"                          |
|  bufo tp 1              Uses default project (or detects from cwd)            |
|  bufo projects          List all registered projects                          |
|  bufo projects rm <a>   Remove a project registration                         |
|  bufo projects delete <a> Delete project + tadpoles + state (double confirm)|
|  bufo default pf        Set default project                                   |
|  bufo default           Show current default                                  |
|                                                                               |
|  Config: ~/.bufo/projects/<alias>.yaml                                   |
|  Auto-detect: bufo figures out which project from your cwd                    |
|                                                                               |
+===============================================================================+
|                                                                               |
|  TADPOLE COMMANDS (bufo tp ...)                                             |
|  ────────────────────────────────────────────────────────────────────────     |
|  bufo tp               Interactive menu (list + actions)                      |
|  bufo tp ls            List tadpoles (non-interactive)                      |
|  bufo tp spawn         Create next available tadpole                        |
|  bufo tp <N>           Open/create tadpole N                                |
|  bufo tp <N> --separate   Open in new terminal window                         |
|  bufo tp <N> restart   Reset git + restart panes (recreates full layout)      |
|  bufo tp <N> cleanup   Kill window + reset to origin/main                     |
|  bufo tp <N> destroy   Completely remove tadpole (worktree + files)         |
|  bufo destroy <N>      Shorthand for above                                    |
|  bufo tp <N> continue  Resume with --continue flag                            |
|  bufo tp <N> kill      Kill processes on managed ports                         |
|  bufo tp <N> lock      Lock tadpole (prevent reuse by pr/ticket)            |
|  bufo tp <N> unlock    Unlock tadpole (allow reuse by pr/ticket)            |
|  bufo unlock-all       Unlock all non-active tadpoles                      |
|                                                                               |
|  New tadpoles are locked by default. Unlock when done to allow              |
|  pr/ticket commands to reuse the tadpole instead of creating new ones.      |
|                                                                               |
|  INFO BAR: Tadpoles include a status bar at the bottom showing             |
|  clickable links (Cmd+click): GitHub PR, ticket ID, localhost port.          |
|  Actions: [c] Cleanup [u] Lock/Unlock [p] Pull [k] Kill ports [q] Quit      |
|  The bar auto-refreshes every 60s and discovers PRs automatically.           |
|                                                                               |
|  SHORTCUTS (auto-detect tadpole from cwd or iTerm2 tab)                    |
|  ────────────────────────────────────────────────────────────────────────     |
|  bufo restart          Restart current tadpole                              |
|  bufo cleanup          Cleanup current tadpole                              |
|  bufo continue         Continue current tadpole                             |
|  bufo kill             Kill managed ports for current tadpole               |
|  bufo lock             Lock current tadpole                                 |
|  bufo unlock           Unlock current tadpole                               |
|  bufo unlock-all       Unlock all non-active tadpoles                      |
|  bufo switch           Switch between active tadpoles (interactive)        |
|  bufo switch <N>       Switch directly to tadpole N                        |
|  bufo <N>              Shorthand for: bufo tp <N>                             |
|  bufo <github-pr-url>  Shorthand for: bufo pr <url>                          |
|  bufo <linear-url>     Shorthand for: bufo ticket <url>                      |
|  bufo <github-issue>   Shorthand for: bufo ticket <url> (prompts project)    |
|                                                                               |
+===============================================================================+
|                                                                               |
|  SESSION COMMANDS (bufo session ...)                                          |
|  ────────────────────────────────────────────────────────────────────────     |
|  bufo session ls           List sessions with summaries                       |
|  bufo session start "name" Start new named session                            |
|  bufo session resume "name" Resume existing session                           |
|  bufo session delete "name" Delete a session                                  |
|  bufo session summary "name" "text"  Update session summary                   |
|                                                                               |
|  REVIEW COMMANDS (bufo review ...)                                            |
|  ────────────────────────────────────────────────────────────────────────     |
|  bufo review <PR>          Quick review (number, repo#num, or URL)            |
|  bufo review new           Interactive mode (multiple PRs + context)          |
|  bufo review ls            List review sessions                               |
|  bufo review resume <PR>   Resume a review session                            |
|                                                                               |
|  PR formats: 3230, org#456, https://github.com/.../pull/123                 |
|                                                                               |
+===============================================================================+
|                                                                               |
|  CHORUS COMMANDS (bufo chorus ...)                                            |
|  ────────────────────────────────────────────────────────────────────────     |
|  bufo chorus init          Configure conductor + singers (1–3 AI tools)       |
|  bufo chorus <PR>          Multi-agent chorus review for a PR                 |
|  bufo chorus new           Interactive mode (multiple PRs + context)          |
|  bufo chorus ls            List chorus sessions                               |
|  bufo chorus resume <name> Resume a chorus session                            |
|  bufo chorus show <name>   View saved verdict                                 |
|  bufo chorus apply [name]  Apply findings to a PR tadpole for fixing          |
|  bufo chorus delete <name> Delete a chorus session                            |
|                                                                               |
|  Conductor orchestrates; singers run in separate panes, save findings to      |
|  singer-<N>-review.md; conductor delivers a verified final verdict.           |
|  Configure tools: bufo chorus init  (claude/codex/gemini/copilot)             |
|                                                                               |
+===============================================================================+
|                                                                               |
|  PR COMMANDS (bufo pr ...)                                                    |
|  ────────────────────────────────────────────────────────────────────────     |
|  bufo pr <PR>              Create/reopen tadpole for a GitHub PR            |
|  bufo tp <N> pr <PR>       Use tadpole N for a PR                           |
|  bufo @pf pr <PR>          PR tadpole for specific project                  |
|                                                                               |
|  PR formats: 123, repo#456, https://github.com/.../pull/789                  |
|  Re-running the same PR finds and reopens the existing tadpole              |
|                                                                               |
+===============================================================================+
|                                                                               |
|  MERGE COMMANDS (bufo merge ...)                                              |
|  ────────────────────────────────────────────────────────────────────────     |
|  bufo merge              Merge all tadpole branches into main               |
|  bufo merge <N>          Merge only tadpole N's branch                      |
|  bufo merge --dry-run    Show what would be merged (no changes)               |
|                                                                               |
+===============================================================================+
|                                                                               |
|  TICKET COMMANDS (bufo ticket ...)                                            |
|  ────────────────────────────────────────────────────────────────────────     |
|  bufo ticket ENG-123       Auto-create tadpole for ticket                   |
|  bufo ticket <linear-url>  Create tadpole from Linear URL                   |
|  bufo ticket <github-issue> Create tadpole from GitHub Issue URL            |
|  bufo tp 3 ticket ENG-123  Use tadpole 3 for ticket                         |
|  bufo @pf ticket ENG-123   Ticket for specific project                        |
|  Re-running the same ticket finds and reopens the existing tadpole          |
|                                                                               |
+===============================================================================+
|                                                                               |
|  WIP COMMANDS (bufo wip ...)                                                  |
|  ────────────────────────────────────────────────────────────────────────     |
|  bufo wip save              Save current changes (branch, commits, patches)   |
|  bufo wip save --restart    Save then restart tadpole                       |
|  bufo wip ls                List all WIPs globally with metadata              |
|  bufo wip restore           Interactive restore from all WIPs                 |
|  bufo wip restore <N>       Restore WIP #N to original tadpole              |
|  bufo wip restore <N> --to <tp>  Restore to different tadpole               |
|  bufo wip restore <N> --open     Restore and open tadpole with claude       |
|  bufo wip --continue        Restore most recent WIP (current tadpole)       |
|  bufo wip delete <name>     Delete a saved WIP state                          |
|                                                                               |
+===============================================================================+
|                                                                               |
|  COMMAND ALIASES (bufo alias ...)                                            |
|  ────────────────────────────────────────────────────────────────────────     |
|  bufo alias              List all aliases                                     |
|  bufo alias set cu cleanup          Set alias: cu -> cleanup                  |
|  bufo alias set rr "tp restart"     Multi-word: rr -> tp restart              |
|  bufo alias rm cu        Remove an alias                                      |
|                                                                               |
|  Config: ~/.bufo/config.yaml (aliases section)                           |
|                                                                               |
+===============================================================================+
|                                                                               |
|  COMPANION REPOS (bufo companions ...)                                        |
|  ────────────────────────────────────────────────────────────────────────     |
|  bufo companions            Show status of all companion repos                |
|  bufo companions sync       Symlink companions into all tadpoles            |
|  bufo companions sync --replace  Replace existing dirs with symlinks          |
|  bufo companions fetch      Run git fetch in each canonical clone             |
|                                                                               |
|  Companions are canonical clones that live once at $tadpole_base/<name>    |
|  and are symlinked into every worktree. Configure in your project YAML:      |
|    companions:                                                                |
|      repos:                                                                   |
|        - name: my-lib                                                         |
|          remote: git@github.com:org/my-lib.git                               |
|          link_as: my-lib   # optional, defaults to name                       |
|                                                                               |
+===============================================================================+
|                                                                               |
|  OTHER COMMANDS                                                               |
|  ────────────────────────────────────────────────────────────────────────     |
|  bufo config scan      Auto-detect .env files and ports                       |
|  bufo config           Show current configuration                             |
|  bufo doctor           Diagnose common issues                                 |
|  bufo doctor --fix     Fix missing .env files in tadpoles                   |
|  bufo doctor fix --force  Re-copy all .env files from main repo              |
|  bufo ports            Show port usage across tadpoles                      |
|  bufo shared           Show shared volume info                                |
|  bufo web              Show mobile web UI status (port 7373)                  |
|  bufo web open         Open mobile web UI in browser                          |
|  bufo web start/stop/restart  Manage the web daemon                          |
|  bufo web log          Tail the daemon log                                    |
|  bufo raycast install  Install the Raycast extension                          |
|  bufo raycast dev      Start extension with hot-reload (requires npm)         |
|  bufo update           Update bufo to latest version                      |
|  bufo install         Re-run installer (iTerm2 setup, deps, files)        |
|  bufo cheat            Show this cheat sheet                                  |
|                                                                               |
+===============================================================================+
EOF
}

show_help() {
  echo ' ◎ , ◎'
  echo '（ -──）  bufo'
  echo '/(    )\  Tadpole manager for multi-repo development'
  echo "         v$VERSION"
  echo ""
  echo "Usage: bufo [command] [arguments]"
  echo ""
  echo ""
  echo "Tadpole Commands:"
  echo "  tp                List all tadpoles"
  echo "  tp spawn          Create next available tadpole"
  echo "  tp <N>            Open/create tadpole N"
  echo "  tp <N> restart    Reset git + restart panes (recreates layout)"
  echo "  tp <N> cleanup    Kill window + reset to origin/main"
  echo "  tp <N> continue   Resume with --continue flag"
  echo "  tp <N> kill       Kill processes on managed ports"
  echo "  tp <N> lock       Lock tadpole (prevent reuse)"
  echo "  tp <N> unlock     Unlock tadpole (allow reuse by pr/ticket)"
  echo "  tp <N> --separate Open in new terminal window"
  echo ""
  echo ""
  echo "  Tadpoles include an info bar at the bottom with clickable"
  echo "  links (PR, ticket, localhost). Auto-refreshes every 60s."
  echo ""
  echo "Shortcuts (auto-detect tadpole):"
  echo "  <N>               Shorthand for: tp <N>"
  echo "  <github-pr-url>   Shorthand for: pr <url>"
  echo "  <linear-url>      Shorthand for: ticket <url>"
  echo "  <github-issue>    Shorthand for: ticket <url>"
  echo "  restart           Restart current tadpole"
  echo "  cleanup           Cleanup current tadpole"
  echo "  continue          Continue current tadpole"
  echo "  kill              Kill managed ports for current tadpole"
  echo "  lock              Lock current tadpole"
  echo "  unlock            Unlock current tadpole"
  echo "  unlock-all        Unlock all non-active tadpoles"
  echo "  switch            Switch between active tadpoles"
  echo "  switch <N>        Switch directly to tadpole N"
  echo ""
  echo "Session Commands:"
  echo "  session ls        List sessions with summaries"
  echo "  session start     Start new named session"
  echo "  session resume    Resume existing session"
  echo "  session delete    Delete a session"
  echo ""
  echo "Review Commands:"
  echo "  review <PR>       Quick review (number, repo#num, or URL)"
  echo "  review new        Interactive (multiple PRs + context)"
  echo "  review ls         List review sessions"
  echo "  review resume     Resume a review"
  echo ""
  echo "Chorus Commands (multi-agent chorus review):"
  echo "  chorus init        Configure conductor + singers (run once per project)"
  echo "  chorus <PR>        Chorus review (conductor + 1-3 configured AI singers)"
  echo "  chorus new         Interactive mode (multiple PRs + context)"
  echo "  chorus ls          List chorus sessions"
  echo "  chorus resume      Resume a chorus session"
  echo "  chorus show        View saved verdict"
  echo "  chorus apply       Apply findings to a PR tadpole (auto-detects latest)"
  echo "  chorus delete      Delete a chorus session"
  echo ""
  echo "PR Commands:"
  echo "  pr <PR>           Create/reopen tadpole for a GitHub PR"
  echo "  tp <N> pr <PR>    Use specific tadpole for PR"
  echo "  Formats: 123, repo#456, https://github.com/.../pull/789"
  echo ""
  echo "Merge Commands:"
  echo "  merge             Merge all tadpole branches into main"
  echo "  merge <N>         Merge only tadpole N's branch"
  echo "  merge --dry-run   Preview what would be merged"
  echo ""
  echo "Ticket Commands:"
  echo "  ticket <ID>       Create tadpole for a ticket"
  echo "  ticket <URL>      Create tadpole from Linear or GitHub Issue URL"
  echo "  tp <N> ticket <ID> Use specific tadpole for ticket"
  echo ""
  echo "WIP Commands:"
  echo "  wip save          Save current changes"
  echo "  wip ls            List all WIPs globally"
  echo "  wip restore       Interactive restore from all WIPs"
  echo "  wip restore <N>   Restore WIP #N"
  echo "  wip restore <N> --to <tp>  Restore to different tadpole"
  echo "  wip --continue    Restore most recent WIP (current tadpole)"
  echo ""
  echo "Multi-Project Commands:"
  echo "  @alias <cmd>      Run command against a specific project"
  echo "  projects          List registered projects"
  echo "  projects delete   Delete project + tadpoles + state"
  echo "  default [alias]   Show/set default project"
  echo "  init              Register a new project (asks for alias)"
  echo ""
  echo "Alias Commands:"
  echo "  alias             List all aliases"
  echo "  alias set <name> <cmd>  Set a command alias"
  echo "  alias rm <name>   Remove an alias"
  echo ""
  echo "Other Commands:"
  echo "  companions        Show companion repo status"
  echo "  companions sync   Symlink companions into all tadpoles"
  echo "  companions sync --replace  Replace existing dirs with symlinks"
  echo "  companions fetch  Run git fetch in each canonical clone"
  echo "  init              Setup config (auto-detects project type)"
  echo "  config            Show configuration"
  echo "  config scan       Auto-detect .env files and ports"
  echo "  doctor            Diagnose issues"
  echo "  doctor --fix      Fix missing .env files"
  echo "  doctor fix --force  Re-copy .env files from main repo"
  echo "  ports             Show port usage"
  echo "  shared            Show shared volume info"
  echo "  web               Mobile web UI status"
  echo "  web open          Open web UI in browser"
  echo "  web start/stop/restart  Manage the web daemon"
  echo "  web log           Tail daemon log"
  echo "  raycast install   Install the Raycast extension"
  echo "  raycast dev       Start Raycast extension in dev/hot-reload mode"
  echo "  update            Update bufo to latest version"
  echo "  install           Re-run installer (iTerm2 setup, deps, files)"
  echo "  cheat             Show cheat sheet"
  echo ""
  echo "Config: $CONFIG_FILE"
}
