#!/usr/bin/env bash
# Tests for config parsing, config_get, expand_path

section "Config Parsing Tests"

TEST_CONFIG_DIR=$(mktemp -d)
TEST_CONFIG="$TEST_CONFIG_DIR/config.yaml"

cat > "$TEST_CONFIG" << 'EOF'
session_name: testbufo
tadpole_base: /tmp/test-tadpoles
main_repo: /tmp/test-main

tadpoles:
  count: 3
  prefix: test-tp
  branch_pattern: test-{N}

ports:
  api_base: 4000
  app_base: 5000

layout:
  panes:
    - name: terminal
      command: ""
    - name: server
      command: echo "server"
    - name: main
      command: echo "main"
EOF

if has_yq; then
  run_test "yq installed" "true"
  # Note: \$() defers command substitution to eval time; $TEST_CONFIG is expanded
  # at string-creation time since single quotes don't prevent expansion inside double quotes
  run_test "Parse session_name" "[ \"\$(yq -r '.session_name' '$TEST_CONFIG')\" = 'testbufo' ]"
  run_test "Parse tadpole_base" "[ \"\$(yq -r '.tadpole_base' '$TEST_CONFIG')\" = '/tmp/test-tadpoles' ]"
  run_test "Parse tadpoles.count" "[ \"\$(yq -r '.tadpoles.count' '$TEST_CONFIG')\" = '3' ]"
  run_test "Parse tadpoles.prefix" "[ \"\$(yq -r '.tadpoles.prefix' '$TEST_CONFIG')\" = 'test-tp' ]"
  run_test "Parse tadpoles.branch_pattern" "[ \"\$(yq -r '.tadpoles.branch_pattern' '$TEST_CONFIG')\" = 'test-{N}' ]"
  run_test "Parse ports.api_base" "[ \"\$(yq -r '.ports.api_base' '$TEST_CONFIG')\" = '4000' ]"
  run_test "Parse ports.app_base" "[ \"\$(yq -r '.ports.app_base' '$TEST_CONFIG')\" = '5000' ]"
  run_test "Parse pane command" "[ \"\$(yq -r '.layout.panes[1].command' '$TEST_CONFIG')\" = 'echo \"server\"' ]"
  run_test "Parse pane name" "[ \"\$(yq -r '.layout.panes[0].name' '$TEST_CONFIG')\" = 'terminal' ]"
  run_test "Parse pane count" "[ \"\$(yq -r '.layout.panes | length' '$TEST_CONFIG')\" = '3' ]"
else
  skip_test "Config parsing tests" "yq not installed"
fi

rm -rf "$TEST_CONFIG_DIR"

# =============================================================================
# config_get / config_exists / expand_path tests
# =============================================================================

section "Config Helper Function Tests"

source "$LIB/common.sh"

# Test expand_path
source "$LIB/config.sh"

run_test "expand_path with tilde" "[ '$(expand_path '~/foo')' = '$HOME/foo' ]"
run_test "expand_path with absolute path" "[ '$(expand_path '/tmp/foo')' = '/tmp/foo' ]"
run_test "expand_path with plain path" "[ '$(expand_path 'relative/path')' = 'relative/path' ]"

# Test config_get with a real config file
CFG_TEST_DIR=$(mktemp -d)
CFG_TEST_FILE="$CFG_TEST_DIR/test.yaml"
cat > "$CFG_TEST_FILE" << 'EOF'
name: testval
nested:
  key: nestedval
EOF

if has_yq; then
  # Save and restore CONFIG_FILE
  _saved_config_file="${CONFIG_FILE:-}"
  CONFIG_FILE="$CFG_TEST_FILE"

  run_test "config_get existing key" "[ '$(config_get 'name')' = 'testval' ]"
  run_test "config_get nested key" "[ '$(config_get 'nested.key')' = 'nestedval' ]"
  run_test "config_get missing key with default" "[ '$(config_get 'missing' 'fallback')' = 'fallback' ]"
  run_test "config_get missing key no default" "[ -z '$(config_get 'missing')' ]"
  run_test "config_exists with file" "config_exists"

  CONFIG_FILE="/nonexistent/file.yaml"
  run_test "config_get with missing file returns default" "[ '$(config_get 'name' 'default')' = 'default' ]"
  run_test "config_exists without file fails" "! config_exists"

  CONFIG_FILE="$_saved_config_file"
else
  skip_test "config_get tests" "yq not installed"
fi

rm -rf "$CFG_TEST_DIR"

# =============================================================================
# validate_config Tests
# =============================================================================

section "Config Validation Tests"

if has_yq; then
  VAL_TEST_DIR=$(mktemp -d)

  # Valid config
  VAL_CONFIG="$VAL_TEST_DIR/valid.yaml"
  cat > "$VAL_CONFIG" << 'EOF'
session_name: testbufo
tadpole_base: /tmp/test-tp
main_repo: /tmp/test-main
EOF

  _saved_cf="$CONFIG_FILE"
  CONFIG_FILE="$VAL_CONFIG"
  # validate_config calls exit on error, so run in subshell
  # Note: CONFIG_FILE must be set AFTER sourcing common.sh since common.sh resets it
  run_test "validate_config passes with valid config" "(source '$LIB/common.sh' && source '$LIB/config.sh' && CONFIG_FILE='$VAL_CONFIG' && validate_config 2>/dev/null)"

  # Missing session_name
  VAL_BAD="$VAL_TEST_DIR/bad.yaml"
  cat > "$VAL_BAD" << 'EOF'
tadpole_base: /tmp/test-tp
main_repo: /tmp/test-main
EOF
  run_test "validate_config fails without session_name" "! (source '$LIB/common.sh' && source '$LIB/config.sh' && CONFIG_FILE='$VAL_BAD' && validate_config 2>/dev/null)"

  # Missing tadpole_base (and no workspace_base fallback)
  cat > "$VAL_BAD" << 'EOF'
session_name: testbufo
main_repo: /tmp/test-main
EOF
  run_test "validate_config fails without tadpole_base" "! (source '$LIB/common.sh' && source '$LIB/config.sh' && CONFIG_FILE='$VAL_BAD' && validate_config 2>/dev/null)"

  # Missing main_repo
  cat > "$VAL_BAD" << 'EOF'
session_name: testbufo
tadpole_base: /tmp/test-tp
EOF
  run_test "validate_config fails without main_repo" "! (source '$LIB/common.sh' && source '$LIB/config.sh' && CONFIG_FILE='$VAL_BAD' && validate_config 2>/dev/null)"

  # No config file at all
  run_test "validate_config fails with no config" "! (source '$LIB/common.sh' && source '$LIB/config.sh' && CONFIG_FILE='/nonexistent' && validate_config 2>/dev/null)"

  CONFIG_FILE="$_saved_cf"
  rm -rf "$VAL_TEST_DIR"
else
  skip_test "Config validation tests" "yq not installed"
fi

# =============================================================================
# load_config Tests
# =============================================================================

section "Load Config Tests"

if has_yq; then
  LOAD_TEST_DIR=$(mktemp -d)
  LOAD_CONFIG="$LOAD_TEST_DIR/config.yaml"
  cat > "$LOAD_CONFIG" << 'EOF'
session_name: loadtest
tadpole_base: /tmp/load-tp
main_repo: /tmp/load-main
tadpoles:
  count: 7
  prefix: ltp
  branch_pattern: load-{N}
ports:
  api_base: 5000
  app_base: 6000
EOF

  _saved_cf="$CONFIG_FILE"
  _saved_loaded="$_config_loaded"
  CONFIG_FILE="$LOAD_CONFIG"
  _config_loaded=false

  load_config

  run_test "load_config sets SESSION_NAME" "[ '$SESSION_NAME' = 'loadtest' ]"
  run_test "load_config sets TADPOLE_BASE" "[ '$TADPOLE_BASE' = '/tmp/load-tp' ]"
  run_test "load_config sets MAIN_REPO" "[ '$MAIN_REPO' = '/tmp/load-main' ]"
  run_test "load_config sets TADPOLE_COUNT" "[ '$TADPOLE_COUNT' = '7' ]"
  run_test "load_config sets TADPOLE_PREFIX" "[ '$TADPOLE_PREFIX' = 'ltp' ]"
  run_test "load_config sets BRANCH_PATTERN" "[ '$BRANCH_PATTERN' = 'load-{N}' ]"
  run_test "load_config sets API_PORT_BASE" "[ '$API_PORT_BASE' = '5000' ]"
  run_test "load_config sets APP_PORT_BASE" "[ '$APP_PORT_BASE' = '6000' ]"
  run_test "load_config marks loaded" "[ '$_config_loaded' = 'true' ]"

  # Second call should be a no-op (idempotent)
  SESSION_NAME="changed"
  load_config
  run_test "load_config is idempotent" "[ '$SESSION_NAME' = 'changed' ]"

  _config_loaded="$_saved_loaded"
  CONFIG_FILE="$_saved_cf"
  rm -rf "$LOAD_TEST_DIR"
else
  skip_test "load_config tests" "yq not installed"
fi

# =============================================================================
# Legacy config key backwards-compat Tests
# =============================================================================

section "Legacy Config Key Tests"

if has_yq; then
  LEGACY_LOAD_DIR=$(mktemp -d)
  LEGACY_CONFIG="$LEGACY_LOAD_DIR/config.yaml"
  cat > "$LEGACY_CONFIG" << 'EOF'
session_name: legacytest
workspace_base: /tmp/legacy-ws
main_repo: /tmp/legacy-main
workspaces:
  count: 4
  prefix: lws
  branch_pattern: legacy-{N}
EOF

  _saved_cf="$CONFIG_FILE"
  _saved_loaded="$_config_loaded"
  CONFIG_FILE="$LEGACY_CONFIG"
  _config_loaded=false

  load_config

  run_test "load_config reads legacy workspace_base" "[ '$TADPOLE_BASE' = '/tmp/legacy-ws' ]"
  run_test "load_config reads legacy workspaces.count" "[ '$TADPOLE_COUNT' = '4' ]"
  run_test "load_config reads legacy workspaces.prefix" "[ '$TADPOLE_PREFIX' = 'lws' ]"

  _config_loaded="$_saved_loaded"
  CONFIG_FILE="$_saved_cf"
  rm -rf "$LEGACY_LOAD_DIR"
else
  skip_test "Legacy config key tests" "yq not installed"
fi

# =============================================================================
# is_legacy_config Tests
# =============================================================================

section "Legacy Config Detection Tests"

if has_yq; then
  LEGACY_TEST_DIR=$(mktemp -d)
  _saved_cd="$CONFIG_DIR"
  _saved_pd="$PROJECTS_DIR"
  CONFIG_DIR="$LEGACY_TEST_DIR"
  PROJECTS_DIR="$LEGACY_TEST_DIR/projects"

  # No config.yaml at all
  run_test "is_legacy_config false with no config" "! is_legacy_config"

  # Legacy config with main_repo, no projects dir
  cat > "$LEGACY_TEST_DIR/config.yaml" << 'EOF'
session_name: old
tadpole_base: /tmp/old-tp
main_repo: /tmp/old-main
EOF
  run_test "is_legacy_config true with legacy config" "is_legacy_config"

  # Legacy config but projects dir exists with files
  mkdir -p "$PROJECTS_DIR"
  cat > "$PROJECTS_DIR/proj.yaml" << 'EOF'
session_name: proj
EOF
  run_test "is_legacy_config false when projects exist" "! is_legacy_config"

  # Config without main_repo
  rm -rf "$PROJECTS_DIR"
  cat > "$LEGACY_TEST_DIR/config.yaml" << 'EOF'
session_name: global
EOF
  run_test "is_legacy_config false without main_repo" "! is_legacy_config"

  CONFIG_DIR="$_saved_cd"
  PROJECTS_DIR="$_saved_pd"
  rm -rf "$LEGACY_TEST_DIR"
else
  skip_test "Legacy config tests" "yq not installed"
fi

# =============================================================================
# AI Tool Command Tests (get_ai_interactive_cmd, get_ai_print_cmd, get_ai_prompt_cmd)
# =============================================================================

section "AI Tool Command Tests"

# Each tool gets its own project YAML with ai_tool set, so load_config picks it up
# correctly — setting AI_TOOL directly would be overwritten when get_ai_tool() calls load_config.
AI_TOOL_TEST_DIR=$(mktemp -d)

_saved_cf_ait="${CONFIG_FILE:-}"
_saved_gc_ait="${GLOBAL_CONFIG:-}"
_saved_loaded_ait="${_config_loaded:-false}"
GLOBAL_CONFIG="$AI_TOOL_TEST_DIR/global.yaml"  # empty — no global interference

_make_ai_proj() {
  local tool="$1"; local cfg="$AI_TOOL_TEST_DIR/proj-${tool}.yaml"
  printf 'session_name: aitest\ntadpole_base: /tmp/ai-tp\nmain_repo: /tmp/ai-main\nai_tool: %s\n' "$tool" > "$cfg"
  echo "$cfg"
}

CONFIG_FILE="$(_make_ai_proj claude)"; _config_loaded=false; load_config
run_test "claude: get_ai_interactive_cmd" "[ \"\$(get_ai_interactive_cmd)\" = 'claude --dangerously-skip-permissions --chrome' ]"
run_test "claude: get_ai_interactive_cmd with session name" "[ \"\$(get_ai_interactive_cmd 'my-session')\" = 'claude --dangerously-skip-permissions --chrome --name my-session' ]"
run_test "claude: get_ai_print_cmd"  "[ \"\$(get_ai_print_cmd)\"  = 'claude --print' ]"
run_test "claude: get_ai_prompt_cmd" "[ \"\$(get_ai_prompt_cmd)\" = 'claude --dangerously-skip-permissions -p' ]"

CONFIG_FILE="$(_make_ai_proj codex)"; _config_loaded=false; load_config
run_test "codex: get_ai_interactive_cmd" "[ \"\$(get_ai_interactive_cmd)\" = 'codex --full-auto' ]"
run_test "codex: get_ai_print_cmd"       "[ \"\$(get_ai_print_cmd)\"  = 'codex exec --full-auto -q' ]"
run_test "codex: get_ai_prompt_cmd"      "[ \"\$(get_ai_prompt_cmd)\" = 'codex exec --full-auto' ]"

CONFIG_FILE="$(_make_ai_proj copilot)"; _config_loaded=false; load_config
run_test "copilot: get_ai_interactive_cmd" "[ \"\$(get_ai_interactive_cmd)\" = 'copilot --allow-all' ]"
run_test "copilot: get_ai_print_cmd"       "[ \"\$(get_ai_print_cmd)\"  = 'copilot --allow-all-tools -p' ]"
run_test "copilot: get_ai_prompt_cmd"      "[ \"\$(get_ai_prompt_cmd)\" = 'copilot --allow-all-tools -p' ]"

CONFIG_FILE="$(_make_ai_proj gemini)"; _config_loaded=false; load_config
run_test "gemini: get_ai_interactive_cmd" "[ \"\$(get_ai_interactive_cmd)\" = 'gemini --yolo' ]"
run_test "gemini: get_ai_print_cmd"       "[ \"\$(get_ai_print_cmd)\"  = 'gemini -p' ]"
run_test "gemini: get_ai_prompt_cmd"      "[ \"\$(get_ai_prompt_cmd)\" = 'gemini -p' ]"

_config_loaded="$_saved_loaded_ait"
CONFIG_FILE="$_saved_cf_ait"
GLOBAL_CONFIG="$_saved_gc_ait"
rm -rf "$AI_TOOL_TEST_DIR"

# =============================================================================
# ai_pipe_prompt_file Tests
# =============================================================================

section "AI Pipe Prompt File Tests"

PIPE_TEST_DIR=$(mktemp -d)
PIPE_PROMPT_FILE="$PIPE_TEST_DIR/prompt.md"
echo "test prompt" > "$PIPE_PROMPT_FILE"

_saved_cf_pipe="${CONFIG_FILE:-}"
_saved_gc_pipe="${GLOBAL_CONFIG:-}"
_saved_loaded_pipe="${_config_loaded:-false}"
GLOBAL_CONFIG="$PIPE_TEST_DIR/global.yaml"

_make_pipe_proj() {
  local tool="$1"; local cfg="$PIPE_TEST_DIR/proj-${tool}.yaml"
  printf 'session_name: pipetest\ntadpole_base: /tmp/pipe-tp\nmain_repo: /tmp/pipe-main\nai_tool: %s\n' "$tool" > "$cfg"
  echo "$cfg"
}

CONFIG_FILE="$(_make_pipe_proj claude)"; _config_loaded=false; load_config
run_test "claude: pipe uses stdin" \
  "[ \"\$(ai_pipe_prompt_file '$PIPE_PROMPT_FILE')\" = \"cat '$PIPE_PROMPT_FILE' | claude --dangerously-skip-permissions --chrome\" ]"

CONFIG_FILE="$(_make_pipe_proj codex)"; _config_loaded=false; load_config
run_test "codex: pipe uses positional arg" \
  "[ \"\$(ai_pipe_prompt_file '$PIPE_PROMPT_FILE')\" = \"codex --full-auto \\\"\\\$(cat '$PIPE_PROMPT_FILE')\\\"\" ]"

CONFIG_FILE="$(_make_pipe_proj copilot)"; _config_loaded=false; load_config
run_test "copilot: pipe uses positional arg" \
  "[ \"\$(ai_pipe_prompt_file '$PIPE_PROMPT_FILE')\" = \"copilot --allow-all \\\"\\\$(cat '$PIPE_PROMPT_FILE')\\\"\" ]"

CONFIG_FILE="$(_make_pipe_proj gemini)"; _config_loaded=false; load_config
run_test "gemini: pipe uses positional arg" \
  "[ \"\$(ai_pipe_prompt_file '$PIPE_PROMPT_FILE')\" = \"gemini --yolo \\\"\\\$(cat '$PIPE_PROMPT_FILE')\\\"\" ]"

_config_loaded="$_saved_loaded_pipe"
CONFIG_FILE="$_saved_cf_pipe"
GLOBAL_CONFIG="$_saved_gc_pipe"
rm -rf "$PIPE_TEST_DIR"

# =============================================================================
# AI Tool Fallback Chain Tests (load_config + global default_ai_tool)
# =============================================================================

section "AI Tool Fallback Chain Tests"

if has_yq; then
  AI_FB_DIR=$(mktemp -d)
  AI_FB_PROJ="$AI_FB_DIR/proj.yaml"
  AI_FB_GLOBAL="$AI_FB_DIR/global.yaml"

  _saved_cf_fb="${CONFIG_FILE:-}"
  _saved_gc_fb="${GLOBAL_CONFIG:-}"
  _saved_loaded_fb="${_config_loaded:-false}"

  # Base project config — no ai_tool key
  cat > "$AI_FB_PROJ" << 'EOF'
session_name: fbtest
tadpole_base: /tmp/fb-tp
main_repo: /tmp/fb-main
EOF

  CONFIG_FILE="$AI_FB_PROJ"
  GLOBAL_CONFIG="$AI_FB_GLOBAL"

  # global default_ai_tool=gemini
  printf 'default_ai_tool: gemini\n' > "$AI_FB_GLOBAL"
  _config_loaded=false; load_config
  run_test "fallback: global default_ai_tool=gemini" "[ '$AI_TOOL' = 'gemini' ]"

  # global default_ai_tool=copilot
  printf 'default_ai_tool: copilot\n' > "$AI_FB_GLOBAL"
  _config_loaded=false; load_config
  run_test "fallback: global default_ai_tool=copilot" "[ '$AI_TOOL' = 'copilot' ]"

  # global default_ai_tool=codex
  printf 'default_ai_tool: codex\n' > "$AI_FB_GLOBAL"
  _config_loaded=false; load_config
  run_test "fallback: global default_ai_tool=codex" "[ '$AI_TOOL' = 'codex' ]"

  # global config has no default_ai_tool key → falls back to claude
  printf 'setup_completed: true\n' > "$AI_FB_GLOBAL"
  _config_loaded=false; load_config
  run_test "fallback: no default_ai_tool key → claude" "[ '$AI_TOOL' = 'claude' ]"

  # global config file is missing → falls back to claude
  rm -f "$AI_FB_GLOBAL"
  _config_loaded=false; load_config
  run_test "fallback: missing global config → claude" "[ '$AI_TOOL' = 'claude' ]"

  # per-project ai_tool overrides global default_ai_tool
  printf 'default_ai_tool: gemini\n' > "$AI_FB_GLOBAL"
  printf 'session_name: fbtest\ntadpole_base: /tmp/fb-tp\nmain_repo: /tmp/fb-main\nai_tool: codex\n' > "$AI_FB_PROJ"
  _config_loaded=false; load_config
  run_test "fallback: project ai_tool overrides global default" "[ '$AI_TOOL' = 'codex' ]"

  # per-project ai_tool=copilot overrides global default_ai_tool=gemini
  printf 'session_name: fbtest\ntadpole_base: /tmp/fb-tp\nmain_repo: /tmp/fb-main\nai_tool: copilot\n' > "$AI_FB_PROJ"
  _config_loaded=false; load_config
  run_test "fallback: project ai_tool=copilot overrides global" "[ '$AI_TOOL' = 'copilot' ]"

  _config_loaded="$_saved_loaded_fb"
  CONFIG_FILE="$_saved_cf_fb"
  GLOBAL_CONFIG="$_saved_gc_fb"
  rm -rf "$AI_FB_DIR"
else
  skip_test "AI Tool Fallback Chain Tests" "yq not installed"
fi
