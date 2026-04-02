import { join } from 'node:path';
import type { BufoProject, BufoSession } from '@bufo/core';
import {
  createSession,
  updateSession,
  getSession,
  loadSessionFull,
  listSessions,
  deleteSession,
  getSessionDir,
  saveSessionLayout,
  loadSessionLayout,
} from '@bufo/core';
import {
  focusSessionAsync,
  sessionExists,
  sendText,
  sendInterrupt,
  closeTabBySession,
} from '@bufo/core';

const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const GRAY = '\x1b[90m';
const BOLD = '\x1b[1m';
const RED = '\x1b[31m';
const NC = '\x1b[0m';

/**
 * Create a new session and open its iTerm2 layout (3-pane: conductor + singer panes).
 */
export async function sessionStart(
  project: BufoProject,
  name: string,
  context?: string,
): Promise<void> {
  let sessionDir: string;
  try {
    sessionDir = await createSession(project, name, context);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`${RED}Error: ${msg}${NC}`);
    return;
  }

  console.log(`${CYAN}Starting session: ${name}${NC}`);

  const contextFile = join(sessionDir, 'context.md');
  try {
    const { access } = await import('node:fs/promises');
    await access(contextFile);
    console.log(`  Context loaded from: ${contextFile}`);
  } catch {
    // no context file
  }

  const now = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  await updateSession(project, name, 'last_accessed', now);

  // Shell out to bash bufo to create the iTerm2 layout — layout creation
  // (create_tadpole_layout) remains in bash during migration.
  const { execa } = await import('execa');
  try {
    await execa('bufo', ['session', 'start', name], { stdio: 'inherit' });
  } catch {
    console.log(`${GREEN}Session created: ${sessionDir}${NC}`);
  }
}

/**
 * Resume an existing session — focus its iTerm2 layout if still alive,
 * or recreate the layout if sessions died.
 */
export async function sessionResume(
  project: BufoProject,
  name: string,
): Promise<void> {
  const session = await loadSessionFull(project, name);
  if (!session) {
    console.error(`${RED}Error: Session '${name}' not found${NC}`);
    console.log("Use 'bufo session ls' to see available sessions");
    return;
  }

  console.log(`${CYAN}Resuming session: ${name}${NC}`);

  if (session.summary) {
    console.log(`  ${GRAY}${session.summary}${NC}`);
  }

  const sessionDir = getSessionDir(project, name);
  if (session.hasReviewOutput) {
    console.log(`  ${GREEN}Review output saved${NC}`);
  }

  const now = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  await updateSession(project, name, 'last_accessed', now);

  // Try to reconnect to existing layout
  const layout = await loadSessionLayout(sessionDir);
  if (layout?.main_sid) {
    const alive = await sessionExists(layout.main_sid);
    if (alive) {
      console.log(`${CYAN}Reconnecting to existing layout...${NC}`);
      await focusSessionAsync(layout.main_sid);

      // Restart main pane with --continue
      await sendInterrupt(layout.main_sid);
      // Brief delay for interrupt to register
      await new Promise((r) => setTimeout(r, 500));
      const claudeCmd = `claude --continue`;
      await sendText(layout.main_sid, `clear && ${claudeCmd}`);

      // Refresh info bar if alive
      if (layout.info_sid) {
        const infoAlive = await sessionExists(layout.info_sid);
        if (infoAlive) {
          await sendInterrupt(layout.info_sid);
          await new Promise((r) => setTimeout(r, 300));
        }
      }
      return;
    }
  }

  // Layout is stale or missing — shell out to bash to recreate
  const { execa } = await import('execa');
  try {
    await execa('bufo', ['session', 'resume', name], { stdio: 'inherit' });
  } catch {
    console.log(`${GREEN}Session directory: ${sessionDir}${NC}`);
  }
}

/**
 * Close all iTerm2 panes associated with a session.
 */
export async function closeSessionPanes(sessionDir: string): Promise<void> {
  const layout = await loadSessionLayout(sessionDir);
  if (!layout) return;

  // Close tab by the info pane if present, otherwise main pane
  const closeSid = layout.info_sid || layout.main_sid;
  if (!closeSid) return;

  const alive = await sessionExists(closeSid);
  if (alive) {
    try {
      await closeTabBySession(closeSid);
    } catch {
      // tab may already be closed
    }
  }
}

/**
 * Format a time-ago string from an ISO timestamp.
 */
function formatTimeAgo(isoTimestamp: string): string {
  try {
    const ts = new Date(isoTimestamp).getTime();
    if (isNaN(ts)) return '';
    const now = Date.now();
    const diff = Math.floor((now - ts) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  } catch {
    return '';
  }
}

/**
 * Display session list (matches bash session_list output).
 */
async function displaySessionList(
  project: BufoProject,
  filter?: string,
): Promise<void> {
  const sessions = await listSessions(project, filter);

  const header = filter === 'review' ? 'Reviews' : 'Sessions';
  console.log(`${BOLD}@${project.alias} ${header}:${NC}`);
  console.log('');

  if (sessions.length === 0) {
    console.log(`  ${GRAY}(none)${NC}`);
    console.log('');
    return;
  }

  for (const s of sessions) {
    let summaryDisplay: string;
    if (s.summary) {
      const truncated = s.summary.length > 50 ? s.summary.slice(0, 47) + '...' : s.summary;
      summaryDisplay = `"${truncated}"`;
    } else {
      summaryDisplay = `${GRAY}(no summary)${NC}`;
    }

    const timeAgo = s.last_accessed ? formatTimeAgo(s.last_accessed) : '';
    const outputMarker = s.hasReviewOutput ? ` ${GREEN}[saved]${NC}` : '';

    const namePad = s.name.padEnd(20);
    console.log(`  ${BOLD}${namePad}${NC} ${CYAN}${summaryDisplay}${NC}${outputMarker} ${GRAY}${timeAgo}${NC}`);
  }
  console.log('');
}

/**
 * Route all bufo session <subcmd> commands.
 */
export async function handleSession(
  project: BufoProject,
  args: string[],
): Promise<void> {
  const cmd = args[0] || 'ls';
  const rest = args.slice(1);

  switch (cmd) {
    case 'ls':
    case 'list':
      await displaySessionList(project, rest[0]);
      break;

    case 'start':
    case 'new': {
      const name = rest[0];
      if (!name) {
        console.error(`${RED}Error: Name required${NC}`);
        console.log('Usage: bufo session start <name>');
        return;
      }
      await sessionStart(project, name, rest[1]);
      break;
    }

    case 'resume':
    case 'continue': {
      const name = rest[0];
      if (!name) {
        console.error(`${RED}Error: Specify session name: bufo session resume <name>${NC}`);
        return;
      }
      await sessionResume(project, name);
      break;
    }

    case 'delete':
    case 'rm': {
      const name = rest[0];
      if (!name) {
        console.error(`${RED}Error: Specify session name: bufo session delete <name>${NC}`);
        return;
      }
      const sessionDir = getSessionDir(project, name);
      await closeSessionPanes(sessionDir);
      try {
        await deleteSession(project, name);
        console.log(`${GREEN}Deleted session: ${name}${NC}`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`${RED}Error: ${msg}${NC}`);
      }
      break;
    }

    case 'summary': {
      const name = rest[0];
      const summary = rest[1];
      if (!name) {
        console.error(`${RED}Error: Usage: bufo session summary <name> "summary text"${NC}`);
        return;
      }
      if (!summary) {
        console.error(`${RED}Error: Summary text required${NC}`);
        return;
      }
      try {
        await updateSession(project, name, 'summary', summary);
        console.log(`${GREEN}Updated summary for: ${name}${NC}`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`${RED}Error: ${msg}${NC}`);
      }
      break;
    }

    default:
      console.error(`${RED}Error: Unknown session command: ${cmd}${NC}`);
      console.log('Usage: bufo session [ls|start|resume|delete|summary]');
      break;
  }
}
