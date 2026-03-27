#!/usr/bin/env bash
# Tests for create_workspace and setup_shared_volume

# =============================================================================
# Setup
# =============================================================================

WT_TEST_DIR=$(mktemp -d)
MAIN_REPO="$WT_TEST_DIR/main"
TADPOLE_BASE="$WT_TEST_DIR/workspaces"
TADPOLE_PREFIX="tp"
BRANCH_PATTERN="bufo/{N}"
CONFIG_FILE="/dev/null"
SHARED_VOLUME_ENABLED="false"
SHARED_VOLUME_LINK="shared"
SHARED_VOLUME_PATH="$WT_TEST_DIR/shared"

# Initialize the "main" git repo
mkdir -p "$MAIN_REPO"
git -C "$MAIN_REPO" init -q
git -C "$MAIN_REPO" config user.email "test@test.com"
git -C "$MAIN_REPO" config user.name "Test"
git -C "$MAIN_REPO" commit -q --allow-empty -m "init"

# Stubs for external dependencies called by create_workspace
init_submodules()    { :; }
setup_shared_volume() { :; }
setup_companions()   { :; }
sync_env_files()     { :; }
sync_mcp_servers()   { :; }
run_install_command(){ return 0; }
config_get()         { echo "${2:-}"; }

source "$LIB/common.sh"
source "$LIB/worktree.sh"

# =============================================================================
# get_branch_name Tests
# =============================================================================

section "get_branch_name Tests"

_saved_branch_pattern="$BRANCH_PATTERN"

BRANCH_PATTERN="bufo/{N}"
run_test "get_branch_name substitutes N" "[ \"\$(get_branch_name 3)\" = 'bufo/3' ]"

BRANCH_PATTERN="feature/tp-{N}-dev"
run_test "get_branch_name with compound pattern" "[ \"\$(get_branch_name 7)\" = 'feature/tp-7-dev' ]"

BRANCH_PATTERN="{N}"
run_test "get_branch_name with bare N pattern" "[ \"\$(get_branch_name 1)\" = '1' ]"

BRANCH_PATTERN="$_saved_branch_pattern"

# =============================================================================
# create_workspace Tests
# =============================================================================

section "create_workspace Tests"

run_test "create_workspace exits 0 for new tadpole" "create_workspace 1 2>/dev/null"
run_test "create_workspace creates directory" "[ -d '$TADPOLE_BASE/tp-1' ]"
run_test "create_workspace creates .bufo-lock" "[ -f '$TADPOLE_BASE/tp-1/.bufo-lock' ]"
run_test "create_workspace creates git branch bufo/1" \
  "git -C '$MAIN_REPO' show-ref --verify --quiet 'refs/heads/bufo/1'"

# Second call on an existing workspace should not fail (idempotent / returns 0)
run_test "create_workspace exits 0 if workspace already exists" "create_workspace 1 2>/dev/null"

# Missing main repo → should exit non-zero
_saved_main_repo="$MAIN_REPO"
MAIN_REPO="/tmp/nonexistent-bufo-main-$$"
run_test "create_workspace fails when main repo missing" \
  "! (source '$LIB/common.sh' && MAIN_REPO='/tmp/nonexistent-bufo-main-$$' && TADPOLE_BASE='$TADPOLE_BASE' && TADPOLE_PREFIX='tp' && BRANCH_PATTERN='bufo/{N}' && CONFIG_FILE='/dev/null' && init_submodules() { :; } && setup_shared_volume() { :; } && setup_companions() { :; } && sync_env_files() { :; } && sync_mcp_servers() { :; } && config_get() { echo; } && run_install_command() { return 0; } && source '$LIB/worktree.sh' && create_workspace 5 2>/dev/null)"
MAIN_REPO="$_saved_main_repo"

# =============================================================================
# setup_shared_volume Tests
# =============================================================================

section "setup_shared_volume Tests"

# Re-source without our stub so the real function is used for these tests
unset -f setup_shared_volume
source "$LIB/worktree.sh"

ws_dir="$TADPOLE_BASE/tp-sv-test"
mkdir -p "$ws_dir"

# With shared volume disabled — no symlink should be created
SHARED_VOLUME_ENABLED="false"
run_test "setup_shared_volume exits 0 when disabled" "setup_shared_volume '$ws_dir' 2>/dev/null"
run_test "setup_shared_volume creates no symlink when disabled" "[ ! -L '$ws_dir/shared' ]"

# With shared volume enabled — symlink should be created
SHARED_VOLUME_ENABLED="true"
SHARED_VOLUME_LINK="shared"
SHARED_VOLUME_PATH="$WT_TEST_DIR/shared-vol"

run_test "setup_shared_volume exits 0 when enabled" "setup_shared_volume '$ws_dir' 2>/dev/null"
run_test "setup_shared_volume creates symlink" "[ -L '$ws_dir/shared' ]"
run_test "setup_shared_volume symlink points to correct target" \
  "[ \"\$(readlink '$ws_dir/shared')\" = '$WT_TEST_DIR/shared-vol' ]"
run_test "setup_shared_volume creates shared dir" "[ -d '$WT_TEST_DIR/shared-vol' ]"

# Check .gitignore was updated
run_test "setup_shared_volume adds link name to .gitignore" \
  "[ -f '$ws_dir/.gitignore' ] && grep -q '^shared$' '$ws_dir/.gitignore'"

# Calling again with the same symlink already in place should be idempotent (exit 0)
run_test "setup_shared_volume is idempotent" "setup_shared_volume '$ws_dir' 2>/dev/null"
run_test "setup_shared_volume symlink still correct after second call" \
  "[ \"\$(readlink '$ws_dir/shared')\" = '$WT_TEST_DIR/shared-vol' ]"

# The link name should appear in .gitignore only once
gitignore_count=$(grep -c '^shared$' "$ws_dir/.gitignore" 2>/dev/null || echo 0)
run_test "setup_shared_volume doesn't duplicate .gitignore entry" "[ '$gitignore_count' -le 1 ]"

# =============================================================================
# Teardown
# =============================================================================

rm -rf "$WT_TEST_DIR"
