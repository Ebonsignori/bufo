#!/usr/bin/env bash
# bufo - web daemon management (bufo web)

_WEB_LABEL="com.bufo.daemon"
_WEB_PLIST="$HOME/Library/LaunchAgents/${_WEB_LABEL}.plist"
_WEB_LOG="$HOME/.bufo/daemon.log"
_WEB_PORT="${BUFO_PORT:-7373}"

# Resolve port from plist PORT env var if set, fall back to default
_web_resolve_port() {
  local plist_port
  plist_port=$(/usr/libexec/PlistBuddy -c "Print :EnvironmentVariables:PORT" "$_WEB_PLIST" 2>/dev/null) || true
  echo "${plist_port:-$_WEB_PORT}"
}

_web_is_loaded() {
  launchctl list "$_WEB_LABEL" &>/dev/null
}

_web_pid() {
  launchctl list "$_WEB_LABEL" 2>/dev/null | awk '/"PID"/{gsub(/[^0-9]/,"",$NF); print $NF}' || true
}

_web_is_responding() {
  local port="$1"
  curl -s --max-time 2 "http://localhost:$port/" -o /dev/null 2>/dev/null
}

handle_web_command() {
  local subcmd="${1:-status}"

  case "$subcmd" in
    "status"|"")
      web_status
      ;;
    "open")
      web_open
      ;;
    "start")
      web_start
      ;;
    "stop")
      web_stop
      ;;
    "restart")
      web_restart
      ;;
    "log"|"logs")
      web_log
      ;;
    *)
      echo -e "${RED}Unknown web subcommand: $subcmd${NC}"
      echo ""
      echo "Usage:"
      echo "  bufo web           Show daemon status"
      echo "  bufo web open      Open in browser"
      echo "  bufo web start     Start the daemon"
      echo "  bufo web stop      Stop the daemon"
      echo "  bufo web restart   Restart the daemon"
      echo "  bufo web log       Tail the daemon log"
      exit 1
      ;;
  esac
}

web_status() {
  local port
  port=$(_web_resolve_port)
  local pid
  pid=$(_web_pid)

  echo -e "${CYAN}Bufo Web UI${NC}"
  echo ""

  if _web_is_loaded && [ -n "$pid" ]; then
    if _web_is_responding "$port"; then
      echo -e "  ${GREEN}●${NC} Running"
    else
      echo -e "  ${YELLOW}●${NC} Loaded (not yet responding)"
    fi
    echo -e "  ${BOLD}URL:${NC}  http://localhost:$port"
    echo -e "  ${BOLD}PID:${NC}  $pid"
  elif _web_is_loaded; then
    echo -e "  ${YELLOW}●${NC} Loaded but not running  ${GRAY}(may be starting or crashed)${NC}"
    echo -e "  ${BOLD}URL:${NC}  http://localhost:$port"
  else
    echo -e "  ${RED}●${NC} Not running"
    if [ -f "$_WEB_PLIST" ]; then
      echo -e "  ${GRAY}plist exists but not loaded — run: bufo web start${NC}"
    else
      echo -e "  ${GRAY}plist not found at: $_WEB_PLIST${NC}"
    fi
  fi

  echo -e "  ${BOLD}Log:${NC}  $_WEB_LOG"
  echo ""

  if _web_is_loaded && [ -n "$pid" ]; then
    echo -e "  ${GRAY}bufo web open     — open in browser${NC}"
    echo -e "  ${GRAY}bufo web restart  — restart daemon${NC}"
    echo -e "  ${GRAY}bufo web log      — tail log file${NC}"
  else
    echo -e "  ${GRAY}bufo web start    — start daemon${NC}"
  fi
}

web_open() {
  local port
  port=$(_web_resolve_port)

  if ! _web_is_loaded || [ -z "$(_web_pid)" ]; then
    warn "Daemon does not appear to be running. Starting it first…"
    web_start
    # Give it a moment to bind
    sleep 1
  fi

  local url="http://localhost:$port"
  echo -e "  ${GREEN}Opening${NC} $url"
  open "$url"
}

web_start() {
  if ! [ -f "$_WEB_PLIST" ]; then
    error "Plist not found: $_WEB_PLIST"
    echo "Run 'bufo install' to install the daemon plist for this machine."
    exit 1
  fi

  if _web_is_loaded; then
    echo -e "  ${YELLOW}Already loaded.${NC} Use 'bufo web restart' to restart."
    return
  fi

  launchctl load "$_WEB_PLIST"
  echo -e "  ${GREEN}✓${NC} Daemon started"

  # Wait briefly and report status
  sleep 1
  web_status
}

web_stop() {
  if ! _web_is_loaded; then
    echo -e "  ${YELLOW}Daemon is not running.${NC}"
    return
  fi

  launchctl unload "$_WEB_PLIST"
  echo -e "  ${GREEN}✓${NC} Daemon stopped"
}

web_restart() {
  local port
  port=$(_web_resolve_port)

  echo -e "  Restarting daemon…"

  if _web_is_loaded; then
    launchctl unload "$_WEB_PLIST"
    sleep 1
  fi

  if ! [ -f "$_WEB_PLIST" ]; then
    error "Plist not found: $_WEB_PLIST"
    echo "Run 'bufo install' to install the daemon plist for this machine."
    exit 1
  fi

  launchctl load "$_WEB_PLIST"
  sleep 1
  echo -e "  ${GREEN}✓${NC} Daemon restarted"
  web_status
}

web_log() {
  if [ ! -f "$_WEB_LOG" ]; then
    warn "Log file not found: $_WEB_LOG"
    return
  fi

  echo -e "${GRAY}Tailing $_WEB_LOG — Ctrl+C to stop${NC}"
  echo ""
  tail -f "$_WEB_LOG"
}
