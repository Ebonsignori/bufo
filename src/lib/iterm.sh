#!/usr/bin/env bash
# bufo - iTerm2 AppleScript abstraction layer
# Replaces all tmux calls with native iTerm2 window/tab/pane management

# Escape a value for safe embedding inside an AppleScript double-quoted string.
# Escapes backslashes first, then double-quotes. The caller should wrap the
# result in \" ... \" (not ' ... ') so that apostrophes in paths are safe.
_escape_as() {
  local val="$1"
  val="${val//\\/\\\\}"   # \ -> \\
  val="${val//\"/\\\"}"   # " -> \"
  printf '%s' "$val"
}

# Create a new iTerm2 window with a named tab, cd to dir
# Returns: window_id:tab_id:session_id
iterm_create_window() {
  local name="$1"
  local dir="$2"
  local _name _dir
  _name=$(_escape_as "$name")
  _dir=$(_escape_as "$dir")
  osascript -e "
    tell application \"iTerm2\"
      set newWindow to (create window with default profile)
      tell newWindow
        tell current session of current tab
          set name to \"$_name\"
          write text \"cd \\\"$_dir\\\" && clear\"
        end tell
        set winID to id of newWindow
        set sessID to unique ID of current session of current tab
        return (winID as text) & \":\" & \"$_name\" & \":\" & sessID
      end tell
    end tell
  " 2>/dev/null
}

# Add a new tab to the current (frontmost) iTerm2 window
# Returns: tab_id:session_id
iterm_create_tab() {
  local name="$1"
  local dir="$2"
  local _name _dir
  _name=$(_escape_as "$name")
  _dir=$(_escape_as "$dir")
  osascript -e "
    tell application \"iTerm2\"
      tell current window
        set newTab to (create tab with default profile)
        tell current session of newTab
          set name to \"$_name\"
          write text \"cd \\\"$_dir\\\" && clear\"
        end tell
        set sessID to unique ID of current session of newTab
        return \"$_name\" & \":\" & sessID
      end tell
    end tell
  " 2>/dev/null
}

# Split the given session vertically (right)
# Returns: new session_id
iterm_split_vertical() {
  local session_id="$1"
  local _sid
  _sid=$(_escape_as "$session_id")
  osascript -e "
    tell application \"iTerm2\"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = \"$_sid\" then
              tell aSession
                set newSession to (split vertically with default profile)
                return unique ID of newSession
              end tell
            end if
          end repeat
        end repeat
      end repeat
    end tell
  " 2>/dev/null
}

# Split the given session horizontally (below)
# Returns: new session_id
iterm_split_horizontal() {
  local session_id="$1"
  local _sid
  _sid=$(_escape_as "$session_id")
  osascript -e "
    tell application \"iTerm2\"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = \"$_sid\" then
              tell aSession
                set newSession to (split horizontally with default profile)
                return unique ID of newSession
              end tell
            end if
          end repeat
        end repeat
      end repeat
    end tell
  " 2>/dev/null
}

# Write text to a specific session (sends text + Enter)
iterm_send_text() {
  local session_id="$1"
  local text="$2"
  local _sid _txt
  _sid=$(_escape_as "$session_id")
  _txt=$(_escape_as "$text")
  osascript -e "
    tell application \"iTerm2\"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = \"$_sid\" then
              tell aSession
                write text \"$_txt\"
              end tell
              return
            end if
          end repeat
        end repeat
      end repeat
    end tell
  " 2>/dev/null
}

# Send text to a session, then send a second bare newline after a short pause.
# For TUI apps (gemini, codex) that don't treat the PTY newline from
# "write text" as a submit, the second newline re-triggers their input handler.
iterm_send_text_and_enter() {
  local session_id="$1"
  local text="$2"
  iterm_send_text "$session_id" "$text"
  sleep 0.5
  iterm_send_text "$session_id" ""
}

# Send Ctrl-C to a specific session
iterm_send_interrupt() {
  local session_id="$1"
  local _sid
  _sid=$(_escape_as "$session_id")
  osascript -e "
    tell application \"iTerm2\"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = \"$_sid\" then
              tell aSession
                write text (ASCII character 3)
              end tell
              return
            end if
          end repeat
        end repeat
      end repeat
    end tell
  " 2>/dev/null
}

# Capture recent output from a session
iterm_capture() {
  local session_id="$1"
  local _sid
  _sid=$(_escape_as "$session_id")
  osascript -e "
    tell application \"iTerm2\"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = \"$_sid\" then
              tell aSession
                return contents
              end tell
            end if
          end repeat
        end repeat
      end repeat
    end tell
  " 2>/dev/null
}

# Close a specific session (pane)
iterm_close_session() {
  local session_id="$1"
  local _sid
  _sid=$(_escape_as "$session_id")
  osascript -e "
    tell application \"iTerm2\"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = \"$_sid\" then
              tell aSession to close
              return
            end if
          end repeat
        end repeat
      end repeat
    end tell
  " 2>/dev/null
}

# Close a tab by finding any session that belongs to it
iterm_close_tab_by_session() {
  local session_id="$1"
  local _sid
  _sid=$(_escape_as "$session_id")
  osascript -e "
    tell application \"iTerm2\"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = \"$_sid\" then
              tell aTab to close
              return
            end if
          end repeat
        end repeat
      end repeat
    end tell
  " 2>/dev/null
}

# Focus (activate + select) the window/tab containing a session by unique ID
iterm_focus_session() {
  local session_id="$1"
  local _sid
  _sid=$(_escape_as "$session_id")
  osascript -e "
    tell application \"iTerm2\"
      activate
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = \"$_sid\" then
              select aWindow
              tell aWindow
                select aTab
              end tell
              return
            end if
          end repeat
        end repeat
      end repeat
    end tell
  " 2>/dev/null
}

# Get the name of the currently active tab
iterm_get_current_tab_name() {
  osascript -e "
    tell application \"iTerm2\"
      tell current window
        return name of current tab
      end tell
    end tell
  " 2>/dev/null
}

# Set the name of the currently active tab
iterm_set_tab_name() {
  local name="$1"
  local _name
  _name=$(_escape_as "$name")
  osascript -e "
    tell application \"iTerm2\"
      tell current window
        set name of current tab to \"$_name\"
      end tell
    end tell
  " 2>/dev/null
}

# Rename all sessions in the tab containing a specific session
# Sets every pane's title so the tab name is correct regardless of focus
iterm_rename_tab_by_session() {
  local session_id="$1"
  local name="$2"
  local _sid _name
  _sid=$(_escape_as "$session_id")
  _name=$(_escape_as "$name")
  osascript -e "
    tell application \"iTerm2\"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = \"$_sid\" then
              repeat with s in sessions of aTab
                tell s
                  set name to \"$_name\"
                end tell
              end repeat
              return
            end if
          end repeat
        end repeat
      end repeat
    end tell
  " 2>/dev/null
}

# Check if a session ID is still alive
iterm_session_exists() {
  local session_id="$1"
  local _sid result
  _sid=$(_escape_as "$session_id")
  result=$(osascript -e "
    tell application \"iTerm2\"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = \"$_sid\" then
              return \"true\"
            end if
          end repeat
        end repeat
      end repeat
      return \"false\"
    end tell
  " 2>/dev/null)
  [ "$result" = "true" ]
}

# List all session names across all windows
iterm_list_sessions() {
  osascript -e "
    tell application \"iTerm2\"
      set sessNames to {}
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            set end of sessNames to name of aSession
          end repeat
        end repeat
      end repeat
      set AppleScript's text item delimiters to linefeed
      return sessNames as text
    end tell
  " 2>/dev/null
}

# Split the given session horizontally (below) and resize to a thin pane
# Returns: new session_id
iterm_split_horizontal_thin() {
  local session_id="$1"
  local rows="${2:-1}"
  # Split first, then resize in a separate call for reliability
  local new_id
  new_id=$(iterm_split_horizontal "$session_id")
  if [ -n "$new_id" ]; then
    iterm_resize_session "$new_id" "$rows"
  fi
  echo "$new_id"
}

# Resize a session to a specific number of rows
iterm_resize_session() {
  local session_id="$1"
  local rows="$2"
  local _sid
  _sid=$(_escape_as "$session_id")
  # Validate rows is a positive integer to prevent AppleScript injection
  rows="${rows//[^0-9]/}"
  rows="${rows:-1}"
  osascript -e "
    tell application \"iTerm2\"
      repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
          repeat with aSession in sessions of aTab
            if (unique ID of aSession) = \"$_sid\" then
              tell aSession
                set rows to $rows
              end tell
              return
            end if
          end repeat
        end repeat
      end repeat
    end tell
  " 2>/dev/null
}

# Check if iTerm2 is running
iterm_is_running() {
  osascript -e 'tell application "System Events" to (name of processes) contains "iTerm2"' 2>/dev/null | grep -q "true"
}

# Check if iTerm2 is installed
iterm_is_installed() {
  [ -d "/Applications/iTerm.app" ] || [ -d "$HOME/Applications/iTerm.app" ]
}
