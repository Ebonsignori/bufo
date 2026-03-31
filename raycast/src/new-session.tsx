import { Form, ActionPanel, Action, showToast, Toast, popToRoot } from "@raycast/api";
import { useState } from "react";
import { discoverProjects } from "./lib/config";
import { runBufoAsync } from "./lib/exec";

export default function NewSession() {
  const projects = discoverProjects();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (projects.length === 0) {
    return (
      <Form>
        <Form.Description text="No projects found. Run `bufo init` to register a project." />
      </Form>
    );
  }

  return (
    <Form
      isLoading={isSubmitting}
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Start Session"
            onSubmit={async (values: { project: string; name: string }) => {
              if (!values.name.trim()) {
                await showToast({
                  style: Toast.Style.Failure,
                  title: "Session name is required",
                });
                return;
              }
              setIsSubmitting(true);
              try {
                await showToast({ style: Toast.Style.Animated, title: "Starting session..." });
                await runBufoAsync(`@${values.project} session start ${values.name.trim()}`);
                await showToast({ style: Toast.Style.Success, title: "Session started" });
                popToRoot();
              } catch (e) {
                await showToast({
                  style: Toast.Style.Failure,
                  title: "Failed to start session",
                  message: String(e),
                });
              } finally {
                setIsSubmitting(false);
              }
            }}
          />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="project" title="Project" defaultValue={projects[0]?.alias}>
        {projects.map((p) => (
          <Form.Dropdown.Item key={p.alias} value={p.alias} title={`@${p.alias}`} />
        ))}
      </Form.Dropdown>
      <Form.TextField
        id="name"
        title="Session Name"
        placeholder="e.g. refactor-auth"
        info="A short identifier for this session. Used to resume it later with `bufo session resume <name>`."
      />
    </Form>
  );
}
