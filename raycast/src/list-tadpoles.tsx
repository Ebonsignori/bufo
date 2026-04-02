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
import { getAllTadpoles, getTadpoleTitle, getTadpoleSubtitle, bufoExists, focusSession, runBufoAsync } from "@bufo/core";
import type { BufoTadpole } from "@bufo/core";
import { existsSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";

export default function ListTadpoles() {
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

  const { data, isLoading, revalidate } = useCachedPromise(async () => getAllTadpoles(), [], {
    keepPreviousData: true,
  });

  const tadpoles = data?.tadpoles ?? [];
  const projects = data?.projects ?? [];

  // Group by project, active tadpoles first within each group
  const grouped = new Map<string, BufoTadpole[]>();
  for (const tp of tadpoles) {
    const key = tp.project.alias;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(tp);
  }
  for (const [key, tpList] of grouped) {
    grouped.set(key, [...tpList].sort((a, b) => Number(b.active) - Number(a.active)));
  }

  // Projects with any active tadpoles first
  const sortedEntries = [...grouped.entries()].sort(
    ([, a], [, b]) => Number(b.some((tp) => tp.active)) - Number(a.some((tp) => tp.active))
  );

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Filter tadpoles...">
      {projects.length === 0 && !isLoading && (
        <List.EmptyView
          title="No Projects Found"
          description="Run `bufo init` to register a project."
          icon={Icon.Plus}
        />
      )}
      {tadpoles.length === 0 && projects.length > 0 && !isLoading && (
        <List.EmptyView
          title="No Tadpoles Found"
          description="Open a tadpole with `bufo tp <N>` or use New Tadpole."
          icon={Icon.Desktop}
        />
      )}
      {sortedEntries.map(([alias, tpList]) => (
        <List.Section key={alias} title={`@${alias}`} subtitle={`${tpList.length} tadpole(s)`}>
          {tpList.map((tp) => (
            <TadpoleItem key={`${alias}-${tp.number}`} tp={tp} revalidate={revalidate} />
          ))}
        </List.Section>
      ))}
    </List>
  );
}

function TadpoleItem({ tp, revalidate }: { tp: BufoTadpole; revalidate: () => void }) {
  const title = getTadpoleTitle(tp);
  const subtitle = getTadpoleSubtitle(tp);

  const accessories: List.Item.Accessory[] = [];
  if (tp.active) {
    accessories.push({ icon: { source: Icon.Circle, tintColor: Color.Green }, tooltip: "Active" });
  }
  if (tp.locked) {
    accessories.push({ icon: { source: Icon.Lock, tintColor: Color.Orange }, tooltip: "Locked" });
  }
  if (tp.meta?.type === "pr") {
    accessories.push({ tag: { value: `PR`, color: Color.Purple } });
  } else if (tp.meta?.type === "ticket") {
    accessories.push({ tag: { value: tp.meta.ticket || "ticket", color: Color.Blue } });
  }

  const icon = tp.active
    ? { source: Icon.Terminal, tintColor: Color.Green }
    : { source: Icon.Terminal, tintColor: Color.SecondaryText };

  const keywords = [
    tp.project.alias,
    tp.project.session_name,
    tp.branch,
    tp.meta?.ticket,
    tp.meta?.pr_title,
    tp.meta?.name,
    tp.customName,
  ].filter((k): k is string => !!k);

  return (
    <List.Item
      title={title}
      subtitle={subtitle}
      icon={icon}
      accessories={accessories}
      keywords={keywords}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            {tp.active && tp.state?.panes.terminal && (
              <Action
                title="Focus Tadpole"
                icon={Icon.Eye}
                onAction={async () => {
                  focusSession(tp.state!.panes.terminal);
                  await closeMainWindow();
                }}
              />
            )}
            <Action
              title="Open Tadpole"
              icon={Icon.Play}
              shortcut={{ modifiers: ["cmd"], key: "o" }}
              onAction={async () => {
                await showToast({ style: Toast.Style.Animated, title: "Opening tadpole..." });
                try {
                  await runBufoAsync(`@${tp.project.alias} tp ${tp.number}`);
                  await showToast({ style: Toast.Style.Success, title: "Tadpole opened" });
                  revalidate();
                } catch (e) {
                  await showToast({
                    style: Toast.Style.Failure,
                    title: "Failed to open",
                    message: String(e),
                  });
                }
              }}
            />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action
              title={tp.locked ? "Unlock Tadpole" : "Lock Tadpole"}
              icon={tp.locked ? Icon.LockUnlocked : Icon.Lock}
              shortcut={{ modifiers: ["cmd"], key: "l" }}
              onAction={() => {
                const lockFile = join(tp.directory, ".bufo-lock");
                if (tp.locked) {
                  try {
                    unlinkSync(lockFile);
                  } catch {
                    /* already unlocked */
                  }
                } else {
                  writeFileSync(lockFile, "");
                }
                showToast({
                  style: Toast.Style.Success,
                  title: tp.locked ? "Unlocked" : "Locked",
                });
                revalidate();
              }}
            />
            <Action
              title="Copy Branch Name"
              icon={Icon.Clipboard}
              shortcut={{ modifiers: ["cmd"], key: "b" }}
              onAction={async () => {
                await Clipboard.copy(tp.branch);
                await showToast({ style: Toast.Style.Success, title: "Branch copied" });
              }}
            />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action
              title="Cleanup Tadpole"
              icon={Icon.Trash}
              style={Action.Style.Destructive}
              shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
              onAction={async () => {
                if (
                  await confirmAlert({
                    title: "Cleanup Tadpole?",
                    message: `This will close the window and reset @${tp.project.alias} tp${tp.number} to origin/main.`,
                    primaryAction: { title: "Cleanup", style: Alert.ActionStyle.Destructive },
                  })
                ) {
                  await showToast({ style: Toast.Style.Animated, title: "Cleaning up..." });
                  try {
                    await runBufoAsync(`@${tp.project.alias} tp ${tp.number} cleanup`);
                    await showToast({ style: Toast.Style.Success, title: "Cleaned up" });
                    revalidate();
                  } catch (e) {
                    await showToast({
                      style: Toast.Style.Failure,
                      title: "Cleanup failed",
                      message: String(e),
                    });
                  }
                }
              }}
            />
            <Action
              title="Destroy Tadpole"
              icon={Icon.XMarkCircle}
              style={Action.Style.Destructive}
              shortcut={{ modifiers: ["cmd", "shift"], key: "d" }}
              onAction={async () => {
                if (
                  await confirmAlert({
                    title: "Destroy Tadpole?",
                    message: `This will permanently remove @${tp.project.alias} tp${tp.number} and its git worktree. This cannot be undone.`,
                    primaryAction: { title: "Destroy", style: Alert.ActionStyle.Destructive },
                  })
                ) {
                  await showToast({ style: Toast.Style.Animated, title: "Destroying..." });
                  try {
                    await runBufoAsync(`@${tp.project.alias} tp ${tp.number} destroy`);
                    await showToast({ style: Toast.Style.Success, title: "Destroyed" });
                    revalidate();
                  } catch (e) {
                    await showToast({
                      style: Toast.Style.Failure,
                      title: "Destroy failed",
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
