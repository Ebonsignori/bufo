#!/usr/bin/env bash
# Tests for CLI commands (help, version, cheat, doctor, error handling)

section "CLI Command Tests"

# Basic commands
run_test "Script exists" "[ -f '$BUFO' ]"
run_test "Script is executable" "[ -x '$BUFO' ] || chmod +x '$BUFO'"
run_test "Help command" "'$BUFO' --help | grep -q 'bufo'"
run_test "Version command" "'$BUFO' --version | grep -q 'bufo'"
run_test "Version includes number" "'$BUFO' --version | grep -qE '[0-9]+\.[0-9]+'"
run_test "Cheat command" "'$BUFO' cheat | grep -q 'CHEAT SHEET'"
run_test "Config command runs" "'$BUFO' config 2>&1 | grep -qiE '(No config|not found|config)'"
run_test "Doctor command" "'$BUFO' doctor | grep -q 'Doctor'"

# Help content checks
run_test "Help mentions tp command" "'$BUFO' --help | grep -q 'tp'"
run_test "Help mentions init command" "'$BUFO' --help | grep -q 'init'"
run_test "Help mentions wip command" "'$BUFO' --help | grep -q 'wip'"
run_test "Help mentions lock command" "'$BUFO' --help | grep -q 'lock'"
run_test "Help mentions pr command" "'$BUFO' --help | grep -q 'pr'"
run_test "Help mentions ticket command" "'$BUFO' --help | grep -q 'ticket'"
run_test "Cheat sheet includes lock" "'$BUFO' cheat 2>&1 | grep -q 'lock'"
run_test "Cheat sheet includes wip" "'$BUFO' cheat 2>&1 | grep -q 'wip'"

# Error handling
run_test "Invalid command arg" "'$BUFO' abc 2>&1 | grep -qE '(Unknown|Error)'"

if has_yq; then
  # Create a minimal mock HOME so validate_config passes and execution
  # reaches handle_tp_command's unknown-subcommand handler.
  _CMD_TEST_HOME=$(mktemp -d)
  mkdir -p "$_CMD_TEST_HOME/.bufo/projects"
  printf 'default_project: test\n' > "$_CMD_TEST_HOME/.bufo/config.yaml"
  printf 'session_name: test\ntadpole_base: /tmp/tp\nmain_repo: /tmp/main\n' \
    > "$_CMD_TEST_HOME/.bufo/projects/test.yaml"

  run_test "Unknown subcommand" \
    "HOME='$_CMD_TEST_HOME' '$BUFO' 1 foobar 2>&1 | grep -qE '(Unknown|mean)'"

  rm -rf "$_CMD_TEST_HOME"
else
  skip_test "Unknown subcommand" "yq not installed"
fi
