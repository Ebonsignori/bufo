import { Form, ActionPanel, Action, showToast, Toast, popToRoot } from "@raycast/api";
import { useState } from "react";
import { discoverProjects } from "./lib/config";
import { runBufoAsync } from "./lib/exec";

export default function NewMainTadpole() {
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
            title="Open Main Tadpole"
            onSubmit={async (values: { project: string }) => {
              setIsSubmitting(true);
              try {
                await showToast({ style: Toast.Style.Animated, title: "Opening main tadpole..." });
                await runBufoAsync(`@${values.project} main`);
                await showToast({ style: Toast.Style.Success, title: "Main tadpole opened" });
                popToRoot();
              } catch (e) {
                await showToast({
                  style: Toast.Style.Failure,
                  title: "Failed to open main tadpole",
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
      <Form.Description text="Opens the main repo checkout directly — no worktree is created. Works on whatever branch the repo is currently on." />
    </Form>
  );
}
