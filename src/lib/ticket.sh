#!/usr/bin/env bash
# bufo - ticket command handler

# Parse a ticket identifier: plain ID, Linear URL, or GitHub Issue URL
# Linear URLs: https://linear.app/<workspace>/issue/ENG-123/optional-slug
# GitHub Issue URLs: https://github.com/<owner>/<repo>/issues/<number>
# Returns the ticket ID (e.g. ENG-123 or #42)
parse_ticket_identifier() {
  local input="$1"

  # Linear URL
  if [[ "$input" =~ ^https://linear\.app/[^/]+/issue/([A-Za-z0-9_-]+) ]]; then
    echo "${BASH_REMATCH[1]}"
    return
  fi

  # GitHub Issue URL
  if [[ "$input" =~ ^https://github\.com/[^/]+/[^/]+/issues/([0-9]+) ]]; then
    echo "#${BASH_REMATCH[1]}"
    return
  fi

  # Plain identifier
  echo "$input"
}

# Check if input is a GitHub Issue URL
is_github_issue_url() {
  [[ "$1" =~ ^https://github\.com/[^/]+/[^/]+/issues/[0-9]+ ]]
}

# Find an existing tadpole whose branch contains the ticket identifier
# Uses case-insensitive match (ENG-123 matches branch eng-123-fix-bug)
# Returns: tadpole number, or empty string if none found
find_tadpole_for_ticket() {
  local ticket_id="$1"
  local ticket_lower
  ticket_lower=$(echo "$ticket_id" | tr '[:upper:]' '[:lower:]')

  for dir in "$TADPOLE_BASE/$TADPOLE_PREFIX-"*; do
    [ -d "$dir" ] || continue
    local num
    num=$(basename "$dir" | sed "s/${TADPOLE_PREFIX}-//")
    [[ "$num" =~ ^[0-9]+$ ]] || continue

    local branch
    branch=$(cd "$dir" && git branch --show-current 2>/dev/null)
    local branch_lower
    branch_lower=$(echo "$branch" | tr '[:upper:]' '[:lower:]')

    if [[ "$branch_lower" == *"$ticket_lower"* ]]; then
      echo "$num"
      return
    fi
  done

  echo ""
}

# Handle top-level ticket command
handle_ticket_command() {
  local identifier="${1:-}"

  if [ -z "$identifier" ]; then
    error "Ticket identifier required"
    echo ""
    echo "Usage: bufo ticket <identifier>"
    echo "       bufo tp <N> ticket <identifier>"
    echo ""
    echo "Examples:"
    echo "  bufo ticket ENG-123"
    echo "  bufo ticket https://linear.app/team/issue/ENG-123/title"
    echo "  bufo ticket https://github.com/owner/repo/issues/42"
    echo "  bufo tp 3 ticket ENG-123"
    exit 1
  fi

  # Preserve original input to detect URLs before parsing
  local original_input="$identifier"

  # Extract ticket ID from URL if needed
  identifier=$(parse_ticket_identifier "$identifier")

  if ! [[ "$identifier" =~ ^#?[A-Za-z0-9_-]+$ ]]; then
    error "Invalid ticket identifier: $identifier"
    echo "Identifiers must be alphanumeric (dashes and underscores allowed)"
    exit 1
  fi

  # Resolve ticket URL for clickable info bar link
  local ticket_url=""
  local is_github_issue=false
  if [[ "$original_input" =~ ^https:// ]]; then
    # User passed a full URL — use it directly
    ticket_url="$original_input"
    is_github_issue_url "$original_input" && is_github_issue=true
  else
    # Try to construct from config
    local base_url
    base_url=$(yq -r '.ticket.linear_base_url // ""' "$CONFIG_FILE" 2>/dev/null)
    if [ -n "$base_url" ]; then
      ticket_url="${base_url%/}/${identifier}"
    fi
  fi

  # Check if an existing tadpole branch contains this ticket ID
  local existing_num
  existing_num=$(find_tadpole_for_ticket "$identifier")

  if [ -n "$existing_num" ]; then
    local existing_dir="$TADPOLE_BASE/$TADPOLE_PREFIX-$existing_num"
    local existing_branch
    existing_branch=$(cd "$existing_dir" && git branch --show-current 2>/dev/null)
    echo -e "${GREEN}Found existing tadpole $existing_num on branch $existing_branch${NC}"

    # Use the branch name for the tab title if it's a real branch (not the default tadpole pattern)
    local tab_name="$identifier"
    if [ -n "$existing_branch" ]; then
      tab_name="$existing_branch"
    fi

    # Write metadata so info bar has content
    write_workspace_meta "$existing_num" "ticket" \
      "name" "$tab_name" \
      "ticket" "$identifier" \
      "ticket_url" "$ticket_url"

    set_tadpole_name "$existing_num" "$tab_name"
    open_tadpole "$existing_num"
    return
  fi

  # Try to reuse an unlocked tadpole before creating a new one
  local num
  num=$(find_unlocked_tadpole)

  if [ -n "$num" ]; then
    echo -e "${CYAN}Reusing unlocked tadpole $num for ticket $identifier...${NC}"
    prepare_tadpole_for_reuse "$num"
  else
    num=$(find_next_tadpole)
    if [ -z "$num" ]; then
      error "No available tadpole slots (max 100)"
      exit 1
    fi
    echo -e "${CYAN}Creating tadpole $num for ticket $identifier...${NC}"
    create_workspace "$num"
  fi

  # Name the tadpole after the ticket
  set_tadpole_name "$num" "$identifier"

  # Write tadpole metadata for info bar (PR will be auto-discovered)
  write_workspace_meta "$num" "ticket" \
    "name" "$identifier" \
    "ticket" "$identifier" \
    "ticket_url" "$ticket_url"

  if [ "$is_github_issue" = true ]; then
    open_tadpole "$num" "$(build_github_issue_prompt "$ticket_url")"
  else
    open_tadpole "$num" "$(build_ticket_prompt "$identifier")"
  fi
}
