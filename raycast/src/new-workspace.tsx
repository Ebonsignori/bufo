import { Form, ActionPanel, Action, showToast, Toast, popToRoot } from "@raycast/api";
import { useState } from "react";
import { discoverProjects } from "./lib/config";
import { runBufoAsync } from "./lib/exec";

export default function NewTadpole() {
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
            title="Create Tadpole"
            onSubmit={async (values: { project: string; number: string; ticket: string }) => {
              setIsSubmitting(true);
              try {
                let cmd: string;
                if (values.ticket) {
                  cmd = `@${values.project} ticket ${values.ticket}`;
                } else if (values.number) {
                  cmd = `@${values.project} tp ${values.number}`;
                } else {
                  cmd = `@${values.project} spawn`;
                }

                await showToast({ style: Toast.Style.Animated, title: "Creating tadpole..." });
                await runBufoAsync(cmd);
                await showToast({ style: Toast.Style.Success, title: "Tadpole created" });
                popToRoot();
              } catch (e) {
                await showToast({
                  style: Toast.Style.Failure,
                  title: "Failed to create tadpole",
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
        id="number"
        title="Tadpole Number"
        placeholder="Auto-detect next free"
        info="Leave blank to automatically use the next available tadpole."
      />
      <Form.TextField
        id="ticket"
        title="Ticket ID or URL"
        placeholder="PROJ-123 or https://linear.app/..."
        info="If provided, creates a ticket tadpole instead. Overrides tadpole number."
      />
    </Form>
  );
}
