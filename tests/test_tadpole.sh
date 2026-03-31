#!/usr/bin/env bash
# Tests for tadpole lock/unlock, naming, detection, find_next

# =============================================================================
# Setup
# =============================================================================

source "$LIB/common.sh"
source "$LIB/prompts.sh"

TP_TEST_DIR=$(mktemp -d)
TADPOLE_BASE="$TP_TEST_DIR"
WORKSPACE_BASE="$TP_TEST_DIR"  # alias for compat
TADPOLE_PREFIX="test-tp"
WORKSPACE_PREFIX="test-tp"  # alias for compat

mkdir -p "$TADPOLE_BASE/$TADPOLE_PREFIX-1"
mkdir -p "$TADPOLE_BASE/$TADPOLE_PREFIX-2"
mkdir -p "$TADPOLE_BASE/$TADPOLE_PREFIX-3"

# Stub out external dependencies
state_workspace_exists() { return 1; }
state_load_workspace() { :; }
state_remove_workspace() { :; }
config_get() { echo "${2:-}"; }
reset_submodules() { :; }
iterm_rename_tab_by_session() { :; }
SESSION_NAME="test"
BRANCH_PATTERN="test-{N}"

source "$LIB/tadpole.sh"

# =============================================================================
# Lock/Unlock Tests
# =============================================================================

section "Lock/Unlock Functional Tests"

# Start fresh (remove any lock files)
rm -f "$TADPOLE_BASE/$TADPOLE_PREFIX-1/.bufo-lock"
rm -f "$TADPOLE_BASE/$TADPOLE_PREFIX-2/.bufo-lock"
rm -f "$TADPOLE_BASE/$TADPOLE_PREFIX-3/.bufo-lock"

run_test "Fresh tadpole is unlocked" "! is_tadpole_locked 1"
run_test "lock_tadpole creates lock file" "lock_tadpole 1 >/dev/null && [ -f '$TADPOLE_BASE/$TADPOLE_PREFIX-1/.bufo-lock' ]"
run_test "Locked tadpole detected" "is_tadpole_locked 1"
run_test "unlock_tadpole removes lock file" "unlock_tadpole 1 >/dev/null && ! [ -f '$TADPOLE_BASE/$TADPOLE_PREFIX-1/.bufo-lock' ]"
run_test "Unlocked tadpole detected" "! is_tadpole_locked 1"
run_test "Lock non-existent tadpole fails" "! lock_tadpole 99 2>/dev/null"
run_test "Unlock non-existent tadpole fails" "! unlock_tadpole 99 2>/dev/null"

# find_unlocked_tadpole tests
lock_tadpole 1 >/dev/null
run_test "find_unlocked_tadpole finds tp 2" "[ '$(find_unlocked_tadpole)' = '2' ]"

lock_tadpole 2 >/dev/null
lock_tadpole 3 >/dev/null
run_test "find_unlocked_tadpole empty when all locked" "[ -z '$(find_unlocked_tadpole)' ]"

unlock_tadpole 3 >/dev/null
run_test "find_unlocked_tadpole finds tp 3 after unlock" "[ '$(find_unlocked_tadpole)' = '3' ]"

# Unlock all (non-active) tadpoles
lock_tadpole 1 >/dev/null
lock_tadpole 2 >/dev/null
lock_tadpole 3 >/dev/null
# Note: || true needed because unlock_all_tadpoles uses [ ] && echo pattern
# which returns non-zero when condition is false, triggering set -e
unlock_all_tadpoles >/dev/null 2>&1 || true
run_test "unlock_all removes all lock files" "! is_tadpole_locked 1 && ! is_tadpole_locked 2 && ! is_tadpole_locked 3"

# =============================================================================
# Tadpole Naming Tests
# =============================================================================

section "Tadpole Naming Tests"

# Reset lock state
rm -f "$TADPOLE_BASE/$TADPOLE_PREFIX-1/.bufo-lock"
rm -f "$TADPOLE_BASE/$TADPOLE_PREFIX-2/.bufo-lock"
rm -f "$TADPOLE_BASE/$TADPOLE_PREFIX-3/.bufo-lock"

run_test "Default name is tp1" "[ '$(get_tadpole_name 1)' = 'tp1' ]"
run_test "Default name is tp2" "[ '$(get_tadpole_name 2)' = 'tp2' ]"

set_tadpole_name 1 "PR #42: Fix login" 2>/dev/null
run_test "set_tadpole_name creates name file" "[ -f '$TADPOLE_BASE/$TADPOLE_PREFIX-1/.bufo-name' ]"
run_test "get_tadpole_name returns custom name" "[ '$(get_tadpole_name 1)' = 'PR #42: Fix login' ]"

clear_tadpole_name 1
run_test "clear_tadpole_name removes name file" "! [ -f '$TADPOLE_BASE/$TADPOLE_PREFIX-1/.bufo-name' ]"
run_test "Name reverts to default after clear" "[ '$(get_tadpole_name 1)' = 'tp1' ]"

set_tadpole_name 2 "ENG-123" 2>/dev/null
run_test "Ticket name set correctly" "[ '$(get_tadpole_name 2)' = 'ENG-123' ]"

# Names with special characters
set_tadpole_name 1 "fix(auth): handle edge case" 2>/dev/null
run_test "Name with parens and colon" "[ '$(get_tadpole_name 1)' = 'fix(auth): handle edge case' ]"

set_tadpole_name 1 "PR #99 - long description here" 2>/dev/null
run_test "Name with hash and dash" "[ '$(get_tadpole_name 1)' = 'PR #99 - long description here' ]"

# =============================================================================
# find_next_tadpole Tests
# =============================================================================

section "Tadpole Discovery Tests"

run_test "find_next_tadpole skips existing" "[ '$(find_next_tadpole)' = '4' ]"
rm -rf "$TADPOLE_BASE"/.claim-* 2>/dev/null

# Create a gap
mkdir -p "$TADPOLE_BASE/$TADPOLE_PREFIX-5"
run_test "find_next_tadpole finds gap at 4" "[ '$(find_next_tadpole)' = '4' ]"
rm -rf "$TADPOLE_BASE"/.claim-* 2>/dev/null

# Fill the gap
mkdir -p "$TADPOLE_BASE/$TADPOLE_PREFIX-4"
run_test "find_next_tadpole finds 6" "[ '$(find_next_tadpole)' = '6' ]"
rm -rf "$TADPOLE_BASE"/.claim-* 2>/dev/null

# =============================================================================
# get_branch_name Tests
# =============================================================================

section "Branch Name Tests"

source "$LIB/worktree.sh"

BRANCH_PATTERN="tadpole-{N}"
run_test "get_branch_name substitutes N" "[ '$(get_branch_name 3)' = 'tadpole-3' ]"

BRANCH_PATTERN="feature/tp-{N}"
run_test "get_branch_name with prefix" "[ '$(get_branch_name 1)' = 'feature/tp-1' ]"

BRANCH_PATTERN="dev-{N}"
run_test "get_branch_name dev pattern" "[ '$(get_branch_name 42)' = 'dev-42' ]"

# =============================================================================
# build_ticket_prompt Tests
# =============================================================================

section "Ticket Prompt Tests"

# build_ticket_prompt is in tadpole.sh, already sourced
# config_get is stubbed to return the default (second arg)
run_test "build_ticket_prompt includes identifier" "build_ticket_prompt 'ENG-123' | grep -q 'ENG-123'"
run_test "build_ticket_prompt includes Linear" "build_ticket_prompt 'ENG-123' | grep -q 'Linear'"
run_test "build_ticket_prompt includes branch" "build_ticket_prompt 'ENG-123' | grep -q 'branch'"

# =============================================================================
# get_pane_command Tests
# =============================================================================

section "Pane Command Tests"

if has_yq; then
  PANE_TEST_DIR=$(mktemp -d)
  PANE_CONFIG="$PANE_TEST_DIR/config.yaml"
  cat > "$PANE_CONFIG" << 'PANEEOF'
layout:
  panes:
    - name: terminal
      command: ""
    - name: server
      command: pnpm dev
    - name: main
      command: claude --dangerously-skip-permissions
PANEEOF

  _saved_cf="$CONFIG_FILE"
  CONFIG_FILE="$PANE_CONFIG"

  # Temporarily replace config_get with real version for pane tests
  _stub_config_get() { echo "${2:-}"; }
  # get_pane_command reads CONFIG_FILE directly via yq, doesn't use config_get

  run_test "get_pane_command finds server" "[ \"\$(get_pane_command 'server')\" = 'pnpm dev' ]"
  run_test "get_pane_command finds main" "[ \"\$(get_pane_command 'main')\" = 'claude --dangerously-skip-permissions' ]"
  run_test "get_pane_command terminal is empty" "[ -z \"\$(get_pane_command 'terminal')\" ]"
  run_test "get_pane_command missing pane is empty" "[ -z \"\$(get_pane_command 'nonexistent')\" ]"

  CONFIG_FILE="$_saved_cf"
  rm -rf "$PANE_TEST_DIR"
else
  skip_test "get_pane_command tests" "yq not installed"
fi

# =============================================================================
# build_ticket_prompt with custom template
# =============================================================================

section "Custom Ticket Prompt Tests"

# Use a temp PROMPTS_DIR with a custom ticket-linear.md template
CUSTOM_PROMPT_DIR=$(mktemp -d)
_saved_prompts_dir="${PROMPTS_DIR:-}"
PROMPTS_DIR="$CUSTOM_PROMPT_DIR"
printf 'Work on ticket {identifier} now. Branch: {identifier}-fix\n' > "$CUSTOM_PROMPT_DIR/ticket-linear.md"

run_test "Custom prompt substitutes identifier" "[ \"\$(build_ticket_prompt 'PROJ-99')\" = 'Work on ticket PROJ-99 now. Branch: PROJ-99-fix' ]"

PROMPTS_DIR="$_saved_prompts_dir"
rm -rf "$CUSTOM_PROMPT_DIR"

# =============================================================================
# Tadpole Detection Tests
# =============================================================================

section "Tadpole Detection Tests"

# detect_tadpole_from_dir uses pwd, so we test by cd-ing
# First, create dirs that match the pattern
TADPOLE_PREFIX="test-tp"
WORKSPACE_PREFIX="test-tp"

_orig_dir=$(pwd)

cd "$TADPOLE_BASE/$TADPOLE_PREFIX-2"
run_test "detect_tadpole_from_dir finds tp 2" "[ '$(detect_tadpole_from_dir)' = '2' ]"

cd "$TADPOLE_BASE/$TADPOLE_PREFIX-1"
run_test "detect_tadpole_from_dir finds tp 1" "[ '$(detect_tadpole_from_dir)' = '1' ]"

cd /tmp
run_test "detect_tadpole_from_dir empty outside tadpole" "[ -z '$(detect_tadpole_from_dir)' ]"

cd "$_orig_dir"

# =============================================================================
# Cleanup
# =============================================================================

rm -rf "$TP_TEST_DIR"
