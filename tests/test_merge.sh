#!/usr/bin/env bash
# Tests for merge command

section "Merge Command Tests"

# Source checks
run_test "merge.sh exists" "[ -f '$LIB/merge.sh' ]"
run_test "merge.sh is sourceable" "bash -c 'source $LIB/common.sh && source $LIB/config.sh && source $LIB/worktree.sh && source $LIB/merge.sh'"
run_test "handle_merge_command defined" "bash -c 'source $LIB/common.sh && source $LIB/config.sh && source $LIB/worktree.sh && source $LIB/merge.sh && declare -f handle_merge_command >/dev/null'"
run_test "_resolve_conflicts_with_ai defined" "bash -c 'source $LIB/common.sh && source $LIB/config.sh && source $LIB/worktree.sh && source $LIB/merge.sh && declare -f _resolve_conflicts_with_ai >/dev/null'"
run_test "_merge_usage defined" "bash -c 'source $LIB/common.sh && source $LIB/config.sh && source $LIB/worktree.sh && source $LIB/merge.sh && declare -f _merge_usage >/dev/null'"

# Help/cheat integration
run_test "Help mentions merge command" "'$BUFO' --help | grep -q 'merge'"
run_test "Cheat sheet includes merge" "'$BUFO' cheat | grep -q 'MERGE COMMANDS'"
run_test "Cheat sheet merge dry-run" "'$BUFO' cheat | grep -q 'dry-run'"

# Command recognition (merge without config should fail with config error, not unknown command)
run_test "merge is recognized command" "! '$BUFO' merge 2>&1 | grep -q 'Unknown command'"

# =============================================================================
# Behavioral Tests — requires a real git repo
# =============================================================================

MERGE_TEST_DIR=$(mktemp -d)
MERGE_MAIN_REPO="$MERGE_TEST_DIR/main"
MERGE_TADPOLE_BASE="$MERGE_TEST_DIR/workspaces"

# Initialize the "main" git repo
mkdir -p "$MERGE_MAIN_REPO"
git -C "$MERGE_MAIN_REPO" init -q
git -C "$MERGE_MAIN_REPO" config user.email "test@test.com"
git -C "$MERGE_MAIN_REPO" config user.name "Test"
git -C "$MERGE_MAIN_REPO" commit -q --allow-empty -m "init"
# Set origin/HEAD so _get_default_branch returns "main" rather than falling back
git -C "$MERGE_MAIN_REPO" symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main 2>/dev/null || true

_saved_main_repo="$MAIN_REPO"
_saved_tadpole_base="$TADPOLE_BASE"
_saved_workspace_base="${WORKSPACE_BASE:-}"
_saved_tadpole_prefix="${TADPOLE_PREFIX:-}"
_saved_workspace_prefix="${WORKSPACE_PREFIX:-}"
_saved_branch_pattern="${BRANCH_PATTERN:-}"

MAIN_REPO="$MERGE_MAIN_REPO"
TADPOLE_BASE="$MERGE_TADPOLE_BASE"
WORKSPACE_BASE="$MERGE_TADPOLE_BASE"
TADPOLE_PREFIX="tp"
WORKSPACE_PREFIX="tp"
BRANCH_PATTERN="bufo/{N}"

# Stubs
ai_tool_exists() { return 1; }
config_get()     { echo "${2:-}"; }

source "$LIB/common.sh"
source "$LIB/worktree.sh"
source "$LIB/merge.sh"

# Helper: create a real git worktree for a merge-test tadpole
_merge_make_worktree() {
  local num=$1
  local branch="bufo/$num"
  local dir="$MERGE_TADPOLE_BASE/$TADPOLE_PREFIX-$num"
  mkdir -p "$MERGE_TADPOLE_BASE"
  cd "$MERGE_MAIN_REPO"
  git worktree add -b "$branch" "$dir" HEAD &>/dev/null
  echo "$dir"
}

section "handle_merge_command Behavioral Tests"

# --- Dirty repo guard ---

echo "dirty" > "$MERGE_MAIN_REPO/dirty.txt"
run_test "handle_merge_command fails on dirty main repo" \
  "! handle_merge_command 2>/dev/null"
rm -f "$MERGE_MAIN_REPO/dirty.txt"

# --- No branches to merge (no worktrees) ---

run_test "handle_merge_command exits 0 when no tadpoles exist" \
  "handle_merge_command 2>/dev/null"

# --- Branch with no commits → skipped, overall exit 0 ---

_merge_tp2_dir=$(_merge_make_worktree 2)

run_test "handle_merge_command exits 0 when branch has no commits ahead" \
  "handle_merge_command --dry-run 2>/dev/null"
run_test "handle_merge_command dry-run output does not list branch with no commits" \
  "! handle_merge_command --dry-run 2>/dev/null | grep -q 'bufo/2'"

# --- Branch with commits → listed in dry-run ---

_merge_tp1_dir=$(_merge_make_worktree 1)

# Make a commit on bufo/1
cd "$_merge_tp1_dir"
git -C "$_merge_tp1_dir" config user.email "test@test.com"
git -C "$_merge_tp1_dir" config user.name "Test"
echo "feature" > "$_merge_tp1_dir/feature.txt"
git -C "$_merge_tp1_dir" add feature.txt
git -C "$_merge_tp1_dir" commit -q -m "add feature"
cd "$MERGE_MAIN_REPO"

run_test "handle_merge_command --dry-run exits 0" \
  "handle_merge_command --dry-run 2>/dev/null"
run_test "handle_merge_command --dry-run lists branch with commits" \
  "handle_merge_command --dry-run 2>/dev/null | grep -q 'bufo/1'"
run_test "handle_merge_command -n alias exits 0" \
  "handle_merge_command -n 2>/dev/null"

# --- Target specific tadpole N ---

run_test "handle_merge_command --dry-run 1 lists only tp-1 branch" \
  "handle_merge_command --dry-run 1 2>/dev/null | grep -q 'bufo/1'"
run_test "handle_merge_command --dry-run 2 shows no commits for tp-2" \
  "! handle_merge_command --dry-run 2 2>/dev/null | grep -q 'bufo/2.*commit'"

# --- Unknown argument → exit 1 ---

run_test "handle_merge_command rejects unknown argument" \
  "! handle_merge_command --bogus-flag 2>/dev/null"

# --- --help exits 0 ---

run_test "handle_merge_command --help exits 0" \
  "handle_merge_command --help 2>/dev/null"
run_test "handle_merge_command --help mentions --dry-run" \
  "handle_merge_command --help 2>/dev/null | grep -q 'dry-run'"

# Cleanup
MAIN_REPO="$_saved_main_repo"
TADPOLE_BASE="$_saved_tadpole_base"
WORKSPACE_BASE="$_saved_workspace_base"
TADPOLE_PREFIX="$_saved_tadpole_prefix"
WORKSPACE_PREFIX="$_saved_workspace_prefix"
BRANCH_PATTERN="$_saved_branch_pattern"

rm -rf "$MERGE_TEST_DIR"
