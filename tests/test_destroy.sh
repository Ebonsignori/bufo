#!/usr/bin/env bash
# Tests for destroy_tadpole

# =============================================================================
# Setup
# =============================================================================

DESTROY_TEST_DIR=$(mktemp -d)
MAIN_REPO="$DESTROY_TEST_DIR/main"
TADPOLE_BASE="$DESTROY_TEST_DIR/workspaces"
TADPOLE_PREFIX="tp"
BRANCH_PATTERN="bufo/{N}"
SESSION_NAME="test"
CONFIG_FILE="/dev/null"

# Initialize main git repo
mkdir -p "$MAIN_REPO"
git -C "$MAIN_REPO" init -q
git -C "$MAIN_REPO" config user.email "test@test.com"
git -C "$MAIN_REPO" config user.name "Test"
git -C "$MAIN_REPO" commit -q --allow-empty -m "init"

# Stubs for external dependencies
state_workspace_exists()    { return 1; }
state_load_workspace()      { :; }
state_remove_workspace()    { :; }
iterm_close_tab_by_session(){ :; }
config_get()                { echo "${2:-}"; }
clear_tadpole_name()        { :; }
clear_workspace_meta()      { :; }
iterm_rename_tab_by_session(){ :; }
update_tab_title()          { :; }

source "$LIB/common.sh"
source "$LIB/worktree.sh"
source "$LIB/tadpole.sh"

# Helper: create a real git worktree for a tadpole
_make_worktree() {
  local num=$1
  local branch="bufo/$num"
  local dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$num"
  mkdir -p "$TADPOLE_BASE"
  cd "$MAIN_REPO"
  git worktree add -b "$branch" "$dir" HEAD &>/dev/null
  touch "$dir/.bufo-lock"
  echo "$dir"
}

# =============================================================================
# destroy_tadpole Tests
# =============================================================================

section "destroy_tadpole Tests"

# --- Missing directory → exit 1 ---

run_test "destroy_tadpole exits 1 when tadpole dir missing" \
  "! (destroy_tadpole 99 2>/dev/null)"

# --- Force flag skips confirmation prompt ---

tp1_dir=$(_make_worktree 1)

run_test "destroy_tadpole prereq: tp-1 directory exists" "[ -d '$tp1_dir' ]"
run_test "destroy_tadpole prereq: branch bufo/1 exists" \
  "git -C '$MAIN_REPO' show-ref --verify --quiet 'refs/heads/bufo/1'"

run_test "destroy_tadpole --force exits 0" "destroy_tadpole 1 --force 2>/dev/null"
run_test "destroy_tadpole removes the worktree directory" "[ ! -d '$tp1_dir' ]"
run_test "destroy_tadpole deletes the branch" \
  "! git -C '$MAIN_REPO' show-ref --verify --quiet 'refs/heads/bufo/1'"

# --- Also accept -f short form ---

tp5_dir=$(_make_worktree 5)

run_test "destroy_tadpole -f short form exits 0" "destroy_tadpole 5 -f 2>/dev/null"
run_test "destroy_tadpole -f removes directory" "[ ! -d '$tp5_dir' ]"

# --- Interactive confirmation: answer 'y' ---

tp2_dir=$(_make_worktree 2)

run_test "destroy_tadpole prereq: tp-2 exists" "[ -d '$tp2_dir' ]"

run_test "destroy_tadpole accepts 'y' confirmation" \
  "echo 'y' | destroy_tadpole 2 2>/dev/null"
run_test "destroy_tadpole 'y' removes directory" "[ ! -d '$tp2_dir' ]"

# --- Interactive confirmation: answer 'n' → abort, dir still exists ---

tp3_dir=$(_make_worktree 3)

run_test "destroy_tadpole prereq: tp-3 exists" "[ -d '$tp3_dir' ]"

run_test "destroy_tadpole 'n' answer returns 1" \
  "! (echo 'n' | destroy_tadpole 3 2>/dev/null)"
run_test "destroy_tadpole 'n' leaves directory intact" "[ -d '$tp3_dir' ]"

# Cleanup tp3 manually (it was not destroyed)
git -C "$MAIN_REPO" worktree remove "$tp3_dir" --force 2>/dev/null || true
rm -rf "$tp3_dir"
git -C "$MAIN_REPO" branch -D "bufo/3" 2>/dev/null || true

# --- Interactive confirmation: empty answer → abort ---

tp4_dir=$(_make_worktree 4)

run_test "destroy_tadpole empty answer returns 1" \
  "! (echo '' | destroy_tadpole 4 2>/dev/null)"
run_test "destroy_tadpole empty answer leaves directory intact" "[ -d '$tp4_dir' ]"

# Cleanup tp4
git -C "$MAIN_REPO" worktree remove "$tp4_dir" --force 2>/dev/null || true
rm -rf "$tp4_dir"
git -C "$MAIN_REPO" branch -D "bufo/4" 2>/dev/null || true

# =============================================================================
# Teardown
# =============================================================================

rm -rf "$DESTROY_TEST_DIR"
