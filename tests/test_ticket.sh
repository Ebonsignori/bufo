#!/usr/bin/env bash
# Tests for ticket command validation and URL parsing

# =============================================================================
# Ticket Command Validation Tests
# =============================================================================

section "Ticket Command Tests"

run_test "Ticket no args shows usage" "'$BUFO' ticket 2>&1 | grep -qE 'Usage.*bufo ticket'"
run_test "Ticket rejects semicolon" "'$BUFO' ticket 'foo;bar' 2>&1 | grep -q 'Invalid ticket identifier'"
run_test "Ticket rejects spaces" "'$BUFO' ticket 'foo bar' 2>&1 | grep -q 'Invalid ticket identifier'"
run_test "Ticket rejects shell chars" "'$BUFO' ticket 'ENG\$(whoami)' 2>&1 | grep -q 'Invalid ticket identifier'"
run_test "Ticket rejects braces" "'$BUFO' ticket '{identifier}' 2>&1 | grep -q 'Invalid ticket identifier'"
run_test "Ticket rejects backtick" "'$BUFO' ticket '\`cmd\`' 2>&1 | grep -q 'Invalid ticket identifier'"
run_test "Ticket rejects pipe" "'$BUFO' ticket 'foo|bar' 2>&1 | grep -q 'Invalid ticket identifier'"
run_test "Ticket rejects ampersand" "'$BUFO' ticket 'foo&bar' 2>&1 | grep -q 'Invalid ticket identifier'"

run_test "Ticket accepts ENG-123" "'$BUFO' ticket ENG-123 2>&1 | grep -vq 'Invalid ticket identifier'"
run_test "Ticket accepts PROJ_42" "'$BUFO' ticket PROJ_42 2>&1 | grep -vq 'Invalid ticket identifier'"
run_test "Ticket accepts Linear URL" "'$BUFO' ticket 'https://linear.app/myteam/issue/ENG-123/some-title' 2>&1 | grep -vq 'Invalid ticket identifier'"
run_test "Ticket accepts GitHub Issue URL" "'$BUFO' ticket 'https://github.com/owner/repo/issues/42' 2>&1 | grep -vq 'Invalid ticket identifier'"

if has_yq; then
  run_test "tp ticket no id shows error" "'$BUFO' tp 1 ticket 2>&1 | grep -qE 'Ticket identifier required'"
  run_test "tp ticket rejects bad id" "'$BUFO' tp 1 ticket 'bad!id' 2>&1 | grep -q 'Invalid ticket identifier'"
  run_test "tp ticket accepts valid id" "'$BUFO' tp 1 ticket ENG-123 2>&1 | grep -vq 'Invalid ticket identifier'"
else
  skip_test "tp ticket tests" "yq not installed"
fi

# =============================================================================
# PR Command Tests
# =============================================================================

section "PR Command Tests"

run_test "PR no args shows usage" "'$BUFO' pr 2>&1 | grep -qE 'Usage.*bufo pr'"

if has_yq; then
  run_test "tp pr no id shows error" "'$BUFO' tp 1 pr 2>&1 | grep -qE 'PR identifier required'"
else
  skip_test "tp pr tests" "yq not installed"
fi

# =============================================================================
# Lock/Unlock Command Tests (CLI-level, not functional)
# =============================================================================

section "Lock/Unlock CLI Tests"

run_test "Lock no tadpole shows error" "'$BUFO' lock 2>&1 | grep -qE 'Cannot detect tadpole'"
run_test "Unlock no tadpole shows error" "'$BUFO' unlock 2>&1 | grep -qE 'Cannot detect tadpole'"

# =============================================================================
# Ticket URL Parsing Tests (library-level)
# =============================================================================

section "Ticket URL Parsing Tests"

source "$LIB/common.sh"
source "$LIB/ticket.sh"

run_test "Parse plain identifier" "[ '$(parse_ticket_identifier 'ENG-123')' = 'ENG-123' ]"
run_test "Parse Linear URL" "[ '$(parse_ticket_identifier 'https://linear.app/myteam/issue/ENG-456/some-title')' = 'ENG-456' ]"
run_test "Parse Linear URL without slug" "[ '$(parse_ticket_identifier 'https://linear.app/myteam/issue/PROJ-789')' = 'PROJ-789' ]"
run_test "Parse GitHub Issue URL" "[ '$(parse_ticket_identifier 'https://github.com/owner/repo/issues/42')' = '#42' ]"
run_test "Parse GitHub Issue URL with trailing path" "[ '$(parse_ticket_identifier 'https://github.com/org/project/issues/123')' = '#123' ]"
run_test "is_github_issue_url detects issue URL" "is_github_issue_url 'https://github.com/owner/repo/issues/42'"
run_test "is_github_issue_url rejects PR URL" "! is_github_issue_url 'https://github.com/owner/repo/pull/42'"
run_test "is_github_issue_url rejects Linear URL" "! is_github_issue_url 'https://linear.app/team/issue/ENG-123'"
run_test "Non-Linear URL passes through" "[ '$(parse_ticket_identifier 'https://example.com/foo')' = 'https://example.com/foo' ]"
run_test "Parse identifier with underscore" "[ '$(parse_ticket_identifier 'PROJ_42')' = 'PROJ_42' ]"
run_test "Parse lowercase identifier" "[ '$(parse_ticket_identifier 'eng-100')' = 'eng-100' ]"
