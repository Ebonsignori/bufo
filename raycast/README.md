# Bufo

Manage [bufo](https://github.com/ebonsignori/bufo) tadpoles directly from Raycast. Bufo is a git worktree manager for macOS that lets you run multiple branches of a project simultaneously as isolated "tadpoles" — each with its own iTerm2 window, dev server, and environment.

## Setup

This extension requires the `bufo` CLI to be installed and configured.

**1. Install bufo:**

```bash
curl -fsSL https://raw.githubusercontent.com/ebonsignori/bufo/main/install.sh | bash
```

**2. Initialize a project:**

```bash
cd ~/your-repo
bufo init
```

That's it. Once bufo is configured the extension will automatically discover your projects and tadpoles.

## Commands

### List Tadpoles

Browse all tadpoles across all projects. Active tadpoles (currently open in iTerm2) are marked with a green dot.

- **Focus** — bring an active tadpole's iTerm2 window to the front
- **Open** (`⌘O`) — open or reopen a tadpole
- **Lock / Unlock** (`⌘L`) — prevent a tadpole from being cleaned up
- **Copy Branch Name** (`⌘B`) — copy the worktree's branch to clipboard
- **Cleanup** (`⌘⇧C`) — close the window and reset to origin/main
- **Destroy** (`⌘⇧D`) — permanently remove the worktree

### New Tadpole

Create a new tadpole. Choose a project, optionally specify a tadpole number, or provide a Linear ticket ID/URL to automatically name the branch.

### Switch Project

View all registered bufo projects with live active tadpole counts. Set a default project or open a project's main repo.
