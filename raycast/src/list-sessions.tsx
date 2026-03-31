import {
  List,
  ActionPanel,
  Action,
  Icon,
  Color,
  Clipboard,
  showToast,
  Toast,
  confirmAlert,
  Alert,
  closeMainWindow,
} from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { bufoExists, getAllSessions } from "./lib/config";
import { focusSession } from "./lib/iterm";
import { runBufoAsync } from "./lib/exec";
import { getActiveSessions } from "./lib/iterm";
import type { BufoSession } from "./lib/types";

export default function ListSessions() {
  if (!bufoExists()) {
    return (
      <List>
        <List.EmptyView
          title="Bufo Not Configured"
          description="Run `bufo init` in your terminal to set up bufo."
          icon={Icon.Warning}
        />
      </List>
    );
  }

  const { data, isLoading, revalidate } = useCachedPromise(
    async () => {
      const activeSessions = getActiveSessions();
      return getAllSessions(activeSessions);
    },
    [],
    { keepPreviousData: true }
  );

  const groups = data ?? [];
  const totalSessions = groups.reduce((sum, g) => sum + g.sessions.length, 0);

  // Sort each group: active sessions first
  const sortedGroups = groups.map((g) => ({
    ...g,
    sessions: [...g.sessions].sort((a, b) => Number(b.active) - Number(a.active)),
  }));

  // Projects with any active sessions first
  sortedGroups.sort(
    (a, b) =>
      Number(b.sessions.some((s) => s.active)) - Number(a.sessions.some((s) => s.active))
  );

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Filter sessions...">
      {groups.length === 0 && !isLoading && (
        <List.EmptyView
          title="No Sessions Found"
          description="Start a session with `bufo session start <name>` or use New Session."
          icon={Icon.Desktop}
        />
      )}
      {sortedGroups.map(({ projectAlias, sessions }) => (
        <List.Section
          key={projectAlias}
          title={`@${projectAlias}`}
          subtitle={`${sessions.length} session(s)`}
        >
          {sessions.map((session) => (
            <SessionItem
              key={`${projectAlias}-${session.name}`}
              session={session}
              projectAlias={projectAlias}
              revalidate={revalidate}
            />
          ))}
        </List.Section>
      ))}
    </List>
  );
}

function SessionItem({
  session,
  projectAlias,
  revalidate,
}: {
  session: BufoSession;
  projectAlias: string;
  revalidate: () => void;
}) {
  const subtitle = session.summary || session.type;

  const accessories: List.Item.Accessory[] = [];
  if (session.active) {
    accessories.push({ icon: { source: Icon.Circle, tintColor: Color.Green }, tooltip: "Active" });
  }
  if (session.type === "review") {
    accessories.push({ tag: { value: "REVIEW", color: Color.Blue } });
  } else if (session.type === "court") {
    accessories.push({ tag: { value: "COURT", color: Color.Purple } });
  }
  if (session.hasReviewOutput) {
    accessories.push({ tag: { value: "saved", color: Color.Green } });
  }

  const icon = session.active
    ? { source: Icon.Terminal, tintColor: Color.Green }
    : { source: Icon.Terminal, tintColor: Color.SecondaryText };

  return (
    <List.Item
      title={session.name}
      subtitle={subtitle}
      icon={icon}
      accessories={accessories}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            {session.active && session.layout?.terminal_sid && (
              <Action
                title="Focus Session"
                icon={Icon.Eye}
                onAction={async () => {
                  focusSession(session.layout!.terminal_sid);
                  await closeMainWindow();
                }}
              />
            )}
            <Action
              title="Resume Session"
              icon={Icon.Play}
              shortcut={{ modifiers: ["cmd"], key: "o" }}
              onAction={async () => {
                await showToast({ style: Toast.Style.Animated, title: "Resuming session..." });
                try {
                  await runBufoAsync(`@${projectAlias} session resume ${session.name}`);
                  await showToast({ style: Toast.Style.Success, title: "Session resumed" });
                  revalidate();
                } catch (e) {
                  await showToast({
                    style: Toast.Style.Failure,
                    title: "Failed to resume",
                    message: String(e),
                  });
                }
              }}
            />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action
              title="Copy Session Name"
              icon={Icon.Clipboard}
              shortcut={{ modifiers: ["cmd"], key: "b" }}
              onAction={async () => {
                await Clipboard.copy(session.name);
                await showToast({ style: Toast.Style.Success, title: "Session name copied" });
              }}
            />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action
              title="Delete Session"
              icon={Icon.XMarkCircle}
              style={Action.Style.Destructive}
              shortcut={{ modifiers: ["cmd", "shift"], key: "d" }}
              onAction={async () => {
                if (
                  await confirmAlert({
                    title: "Delete Session?",
                    message: `This will permanently delete the session "${session.name}" under @${projectAlias}. This cannot be undone.`,
                    primaryAction: { title: "Delete", style: Alert.ActionStyle.Destructive },
                  })
                ) {
                  await showToast({ style: Toast.Style.Animated, title: "Deleting session..." });
                  try {
                    // Pass "y\n" as stdin to bypass the interactive y/N confirmation prompt in the CLI
                    await runBufoAsync(`@${projectAlias} session delete ${session.name}`, "y\n");
                    await showToast({ style: Toast.Style.Success, title: "Session deleted" });
                    revalidate();
                  } catch (e) {
                    await showToast({
                      style: Toast.Style.Failure,
                      title: "Delete failed",
                      message: String(e),
                    });
                  }
                }
              }}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}
