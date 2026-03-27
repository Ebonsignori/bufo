#!/usr/bin/env bash
# Tests for wip_save, wip_list, _workspace_has_changes, _restore_wip

# =============================================================================
# Setup
# =============================================================================

WIP_TEST_DIR=$(mktemp -d)
WORKSPACE_BASE="$WIP_TEST_DIR/workspaces"
TADPOLE_BASE="$WIP_TEST_DIR/workspaces"
WORKSPACE_PREFIX="tp"
WIP_BASE="$WIP_TEST_DIR/wip"
CONFIG_FILE="/dev/null"
MAIN_REPO="$WIP_TEST_DIR/main"

# Stubs for external dependencies
ai_tool_exists()    { return 1; }
restart_tadpole()   { :; }
open_tadpole()      { :; }
create_workspace()  { :; }
get_branch_name()   { echo "test-branch-$1"; }
load_prompt()       { echo "${2:-}"; }

source "$LIB/common.sh"
source "$LIB/wip.sh"

# Helper: create a real git repo as a workspace
_make_git_workspace() {
  local num=$1
  local dir="$WORKSPACE_BASE/$WORKSPACE_PREFIX-$num"
  mkdir -p "$dir"
  git -C "$dir" init -q
  git -C "$dir" config user.email "test@test.com"
  git -C "$dir" config user.name "Test"
  # Need at least one commit for git diff HEAD to work
  touch "$dir/.gitkeep"
  git -C "$dir" add .gitkeep
  git -C "$dir" commit -q -m "init"
  echo "$dir"
}

# =============================================================================
# _workspace_has_changes Tests
# =============================================================================

section "_workspace_has_changes Tests"

ws1=$(_make_git_workspace 1)

run_test "_workspace_has_changes false on clean repo" "! _workspace_has_changes '$ws1'"

echo "dirty content" > "$ws1/dirty.txt"
run_test "_workspace_has_changes true when untracked file exists" "_workspace_has_changes '$ws1'"

# Add and stage a file so it's tracked
git -C "$ws1" add dirty.txt &>/dev/null
run_test "_workspace_has_changes true when staged change exists" "_workspace_has_changes '$ws1'"

# Commit to clean state
git -C "$ws1" commit -q -m "add dirty" 2>/dev/null
run_test "_workspace_has_changes false after commit" "! _workspace_has_changes '$ws1'"

# Modify an existing tracked file
echo "modified" > "$ws1/dirty.txt"
run_test "_workspace_has_changes true when tracked file modified" "_workspace_has_changes '$ws1'"

# =============================================================================
# wip_save — missing directory
# =============================================================================

section "wip_save Error Handling Tests"

run_test "wip_save fails when tadpole dir missing" "! wip_save 99 false 2>/dev/null"

# =============================================================================
# wip_save — no changes
# =============================================================================

section "wip_save No-Changes Tests"

ws_clean=$(_make_git_workspace 2)

run_test "wip_save exits 0 with no changes" "wip_save 2 false 2>/dev/null"

# Should NOT create any WIP directory (nothing to save)
run_test "wip_save creates no dir when no changes" "[ ! -d '$WIP_BASE/tp-2' ] || [ -z \"\$(ls -A '$WIP_BASE/tp-2' 2>/dev/null)\" ]"

# =============================================================================
# wip_save — basic save with modified file
# =============================================================================

section "wip_save Basic Tests"

ws3=$(_make_git_workspace 3)

# Make a tracked change
echo "hello world" > "$ws3/hello.txt"
git -C "$ws3" add hello.txt &>/dev/null
echo "modified after stage" >> "$ws3/hello.txt"

run_test "wip_save exits 0 with changes" "wip_save 3 false 2>/dev/null"
run_test "wip_save creates WIP base dir" "[ -d '$WIP_BASE/tp-3' ]"

# Find the wip subdir that was created
wip3_path=""
if [ -d "$WIP_BASE/tp-3" ]; then
  wip3_path=$(find "$WIP_BASE/tp-3" -mindepth 1 -maxdepth 1 -type d | head -1)
fi

run_test "wip_save creates a timestamped subdir" "[ -n '$wip3_path' ] && [ -d '$wip3_path' ]"
run_test "wip_save creates metadata.json" "[ -f '$wip3_path/metadata.json' ]"

if has_jq; then
  run_test "metadata.json has correct tadpole number" \
    "[ \"\$(jq -r '.tadpole' '$wip3_path/metadata.json')\" = '3' ]"
  run_test "metadata.json has branch field" \
    "[ -n \"\$(jq -r '.branch' '$wip3_path/metadata.json')\" ]"
  run_test "metadata.json has slug field" \
    "[ -n \"\$(jq -r '.slug' '$wip3_path/metadata.json')\" ]"
  run_test "metadata.json has created_at field" \
    "[ -n \"\$(jq -r '.created_at' '$wip3_path/metadata.json')\" ]"
else
  skip_test "metadata.json content tests" "jq not installed"
fi

# Should have saved at least an unstaged patch (we modified after staging)
run_test "wip_save creates unstaged patch" "[ -f '$wip3_path/main-unstaged.patch' ]"

# =============================================================================
# wip_save — custom name
# =============================================================================

section "wip_save Custom Name Tests"

ws4=$(_make_git_workspace 4)
echo "feature content" > "$ws4/feature.txt"
git -C "$ws4" add feature.txt &>/dev/null

run_test "wip_save with custom name exits 0" "wip_save 4 false 'my feature work' 2>/dev/null"

wip4_path=""
if [ -d "$WIP_BASE/tp-4" ]; then
  wip4_path=$(find "$WIP_BASE/tp-4" -mindepth 1 -maxdepth 1 -type d | head -1)
fi

run_test "wip_save custom name creates subdir" "[ -n '$wip4_path' ]"

if has_jq && [ -n "$wip4_path" ]; then
  run_test "custom name slug is kebab-case" \
    "jq -r '.slug' '$wip4_path/metadata.json' | grep -q 'my-feature-work'"
  run_test "custom name summary preserved" \
    "[ \"\$(jq -r '.summary' '$wip4_path/metadata.json')\" = 'my feature work' ]"
else
  skip_test "custom name slug tests" "jq not installed or no wip created"
fi

# =============================================================================
# wip_save — staged patch written
# =============================================================================

section "wip_save Staged Changes Tests"

ws5=$(_make_git_workspace 5)
echo "staged only" > "$ws5/staged.txt"
git -C "$ws5" add staged.txt &>/dev/null
# No unstaged changes after staging

run_test "wip_save exits 0 with staged-only changes" "wip_save 5 false 2>/dev/null"

wip5_path=""
if [ -d "$WIP_BASE/tp-5" ]; then
  wip5_path=$(find "$WIP_BASE/tp-5" -mindepth 1 -maxdepth 1 -type d | head -1)
fi

run_test "wip_save creates staged patch for staged changes" "[ -f '$wip5_path/main-staged.patch' ]"

# =============================================================================
# wip_list Tests
# =============================================================================

section "wip_list Tests"

# wip_list on tadpole with no WIP states (ws 2 had no changes, no subdir created)
run_test "wip_list exits 0 when no WIP dir exists" "wip_list 99 2>/dev/null"

# wip_list on a tadpole that has WIP states (ws 3)
run_test "wip_list exits 0 when WIP states exist" "wip_list 3 2>/dev/null"
run_test "wip_list output mentions tadpole number" "wip_list 3 2>/dev/null | grep -q '3'"

if has_jq && [ -n "$wip3_path" ]; then
  # The listing should show the slug in the output
  wip3_slug=$(jq -r '.slug' "$wip3_path/metadata.json" 2>/dev/null)
  if [ -n "$wip3_slug" ]; then
    run_test "wip_list shows the saved WIP entry" "wip_list 3 2>/dev/null | grep -q '$wip3_slug'"
  else
    skip_test "wip_list slug check" "could not read slug from metadata"
  fi
else
  skip_test "wip_list content tests" "jq not installed or wip3_path not set"
fi

# =============================================================================
# _restore_wip Tests
# =============================================================================

section "_restore_wip Tests"

if ! has_jq; then
  skip_test "_restore_wip tests" "jq not installed"
else
  ws6=$(_make_git_workspace 6)

  # Create a tracked file with known content, then modify it
  echo "original content" > "$ws6/restore_test.txt"
  git -C "$ws6" add restore_test.txt &>/dev/null
  git -C "$ws6" commit -q -m "add restore_test.txt" 2>/dev/null

  # Now modify the tracked file (unstaged)
  echo "modified content" > "$ws6/restore_test.txt"

  # Save WIP
  wip_save 6 false "restore-test" 2>/dev/null
  wip6_path=$(find "$WIP_BASE/tp-6" -mindepth 1 -maxdepth 1 -type d | head -1)

  # Reset the workspace back to committed state (undo the modification)
  git -C "$ws6" checkout -- restore_test.txt 2>/dev/null

  run_test "_restore_wip prereq: file is back to original" \
    "[ \"\$(cat '$ws6/restore_test.txt')\" = 'original content' ]"

  run_test "_restore_wip exits 0" "_restore_wip 6 '$wip6_path' false 2>/dev/null"

  run_test "_restore_wip restores file content" \
    "[ \"\$(cat '$ws6/restore_test.txt')\" = 'modified content' ]"
fi

# =============================================================================
# Teardown
# =============================================================================

rm -rf "$WIP_TEST_DIR"
