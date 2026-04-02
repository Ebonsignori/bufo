/**
 * Phase and task definitions for the Bufo Bash→TypeScript migration.
 *
 * Each Phase has:
 *   - tasks: list of AgentTask objects (run in parallel unless parallelism=false)
 *   - parallelism: "parallel" | "sequential"
 *   - validationCmd: shell command to run after all tasks complete
 *
 * Each AgentTask has:
 *   - id: unique string key
 *   - name: human-readable label
 *   - branch: git branch for the worktree
 *   - prompt: the agent's full prompt (from prompts.ts)
 *   - maxTurns: override (default 80)
 *   - maxBudgetUsd: override (default 5.0)
 *   - depends: task IDs that must complete before this one runs (within-phase ordering)
 */

import {
  M0_SCAFFOLD,
  M0_DAEMON_UPDATE,
  M0_RAYCAST_UPDATE,
  M1_STATE,
  M1_META,
  M1_PORTS,
  M1_WIP,
  M1_SESSION,
  M1_PROMPTS,
  M2_CLI_SCAFFOLD,
  M2_WORKTREE,
  M2_COMPANIONS,
  M2_DOCTOR,
  M3_TADPOLE_DATA,
  M3_MERGE,
  M3_TICKET,
  M3_PROJECTS,
  M3_TADPOLE_LAYOUT,
  M3_PR,
  M3_WIP_FULL,
  M3_SESSION_FULL,
  M3_REVIEW,
  M4_CLI_ENTRY,
  M5_CLEANUP,
} from "./prompts.js";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AgentTask {
  id: string;
  name: string;
  branch: string;
  prompt: string;
  maxTurns?: number;
  maxBudgetUsd?: number;
  /** IDs of tasks within the same phase that must finish before this starts */
  depends?: string[];
}

export interface MigrationPhase {
  id: string;
  label: string;
  /**
   * "parallel"   → all tasks start concurrently (respecting depends within the phase)
   * "sequential" → tasks run one at a time in order
   */
  parallelism: "parallel" | "sequential";
  tasks: AgentTask[];
  /**
   * Shell command to run in REPO_ROOT after all tasks complete.
   * If it exits non-zero, the phase is marked failed and the report flags it.
   * The orchestrator still proceeds to the next phase.
   */
  validationCmd: string;
}

// ─── Phase 0: Monorepo Scaffold ───────────────────────────────────────────────

const phase0: MigrationPhase = {
  id: "M0",
  label: "Monorepo Scaffold",
  parallelism: "sequential",  // strict ordering: scaffold → daemon → raycast
  validationCmd: "npm install && npm run build --workspaces --if-present && make test",
  tasks: [
    {
      id: "m0-scaffold",
      name: "Create packages/core scaffold",
      branch: "migrate/m0-scaffold",
      prompt: M0_SCAFFOLD,
      maxTurns: 60,
      maxBudgetUsd: 4.0,
    },
    {
      id: "m0-daemon",
      name: "Update daemon to use @bufo/core",
      branch: "migrate/m0-daemon",
      prompt: M0_DAEMON_UPDATE,
      maxTurns: 40,
      maxBudgetUsd: 3.0,
      depends: ["m0-scaffold"],
    },
    {
      id: "m0-raycast",
      name: "Update Raycast to use @bufo/core",
      branch: "migrate/m0-raycast",
      prompt: M0_RAYCAST_UPDATE,
      maxTurns: 40,
      maxBudgetUsd: 3.0,
      depends: ["m0-daemon"],
    },
  ],
};

// ─── Phase 1: Core Data Layer ─────────────────────────────────────────────────

const phase1: MigrationPhase = {
  id: "M1",
  label: "Core Data Layer",
  parallelism: "parallel",  // all 6 modules are independent
  validationCmd: "npm run build --workspace=packages/core && npm test --workspace=packages/core && make test",
  tasks: [
    {
      id: "m1-state",
      name: "Implement state.ts",
      branch: "migrate/m1-state",
      prompt: M1_STATE,
      maxTurns: 60,
      maxBudgetUsd: 4.0,
    },
    {
      id: "m1-meta",
      name: "Implement meta.ts",
      branch: "migrate/m1-meta",
      prompt: M1_META,
      maxTurns: 50,
      maxBudgetUsd: 3.5,
    },
    {
      id: "m1-ports",
      name: "Implement ports.ts",
      branch: "migrate/m1-ports",
      prompt: M1_PORTS,
      maxTurns: 60,
      maxBudgetUsd: 4.0,
    },
    {
      id: "m1-wip",
      name: "Implement wip.ts (data layer)",
      branch: "migrate/m1-wip",
      prompt: M1_WIP,
      maxTurns: 60,
      maxBudgetUsd: 4.0,
    },
    {
      id: "m1-session",
      name: "Implement session.ts",
      branch: "migrate/m1-session",
      prompt: M1_SESSION,
      maxTurns: 60,
      maxBudgetUsd: 4.0,
    },
    {
      id: "m1-prompts",
      name: "Implement prompts.ts",
      branch: "migrate/m1-prompts",
      prompt: M1_PROMPTS,
      maxTurns: 70,
      maxBudgetUsd: 5.0,
    },
  ],
};

// ─── Phase 2: CLI Scaffold + Shell-out Modules ────────────────────────────────

const phase2: MigrationPhase = {
  id: "M2",
  label: "CLI Scaffold + Shell-out Modules",
  parallelism: "parallel",
  validationCmd: "npm run build --workspace=packages/cli && npm test --workspace=packages/cli && make test",
  tasks: [
    {
      id: "m2-scaffold",
      name: "Create packages/cli scaffold",
      branch: "migrate/m2-cli-scaffold",
      prompt: M2_CLI_SCAFFOLD,
      maxTurns: 40,
      maxBudgetUsd: 3.0,
    },
    {
      id: "m2-worktree",
      name: "Implement worktree.ts",
      branch: "migrate/m2-worktree",
      prompt: M2_WORKTREE,
      maxTurns: 80,
      maxBudgetUsd: 5.0,
      // worktree.ts goes into packages/cli — needs the scaffold to exist first
      depends: ["m2-scaffold"],
    },
    {
      id: "m2-companions",
      name: "Implement companions.ts",
      branch: "migrate/m2-companions",
      prompt: M2_COMPANIONS,
      maxTurns: 60,
      maxBudgetUsd: 4.0,
      depends: ["m2-scaffold"],
    },
    {
      id: "m2-doctor",
      name: "Implement doctor.ts",
      branch: "migrate/m2-doctor",
      prompt: M2_DOCTOR,
      maxTurns: 60,
      maxBudgetUsd: 4.0,
      depends: ["m2-scaffold"],
    },
  ],
};

// ─── Phase 3 Wave A: Independent Command Modules ──────────────────────────────

const phase3a: MigrationPhase = {
  id: "M3A",
  label: "Phase 3 Wave A — Independent Commands",
  parallelism: "parallel",
  validationCmd: "npm run build --workspace=packages/cli && npm test --workspace=packages/cli && make test",
  tasks: [
    {
      id: "m3-tadpole-data",
      name: "Implement tadpole.ts (data layer)",
      branch: "migrate/m3-tadpole-data",
      prompt: M3_TADPOLE_DATA,
      maxTurns: 80,
      maxBudgetUsd: 5.0,
    },
    {
      id: "m3-merge",
      name: "Implement merge.ts",
      branch: "migrate/m3-merge",
      prompt: M3_MERGE,
      maxTurns: 70,
      maxBudgetUsd: 4.5,
    },
    {
      id: "m3-ticket",
      name: "Implement ticket.ts",
      branch: "migrate/m3-ticket",
      prompt: M3_TICKET,
      maxTurns: 60,
      maxBudgetUsd: 4.0,
    },
    {
      id: "m3-projects",
      name: "Add project resolution to config.ts",
      branch: "migrate/m3-projects",
      prompt: M3_PROJECTS,
      maxTurns: 70,
      maxBudgetUsd: 4.5,
    },
  ],
};

// ─── Phase 3 Wave B: Dependent Command Modules ────────────────────────────────

const phase3b: MigrationPhase = {
  id: "M3B",
  label: "Phase 3 Wave B — iTerm2 + Complex Commands",
  parallelism: "parallel",
  validationCmd: "npm run build --workspace=packages/cli && npm test --workspace=packages/cli && make test",
  tasks: [
    {
      id: "m3-tadpole-layout",
      name: "Implement tadpole.ts (iTerm2 layout)",
      branch: "migrate/m3-tadpole-layout",
      prompt: M3_TADPOLE_LAYOUT,
      maxTurns: 100,
      maxBudgetUsd: 7.0,
    },
    {
      id: "m3-pr",
      name: "Implement pr.ts",
      branch: "migrate/m3-pr",
      prompt: M3_PR,
      maxTurns: 80,
      maxBudgetUsd: 5.0,
    },
    {
      id: "m3-wip-full",
      name: "Implement wip.ts (full CLI commands)",
      branch: "migrate/m3-wip-full",
      prompt: M3_WIP_FULL,
      maxTurns: 100,
      maxBudgetUsd: 7.0,
    },
    {
      id: "m3-session-full",
      name: "Implement session.ts (iTerm2 layout ops)",
      branch: "migrate/m3-session-full",
      prompt: M3_SESSION_FULL,
      maxTurns: 80,
      maxBudgetUsd: 5.0,
    },
    {
      id: "m3-review",
      name: "Implement review.ts (chorus/court)",
      branch: "migrate/m3-review",
      prompt: M3_REVIEW,
      // review.sh is 1728 lines — give it maximum headroom
      maxTurns: 150,
      maxBudgetUsd: 10.0,
    },
  ],
};

// ─── Phase 4: CLI Entry Point ──────────────────────────────────────────────────

const phase4: MigrationPhase = {
  id: "M4",
  label: "CLI Entry Point",
  parallelism: "sequential",
  validationCmd: [
    "npm run build --workspace=packages/cli",
    "node packages/cli/dist/index.js --version",
    "node packages/cli/dist/index.js help",
    "make test",
  ].join(" && "),
  tasks: [
    {
      id: "m4-cli-entry",
      name: "Implement CLI entry point + command router",
      branch: "migrate/m4-cli-entry",
      prompt: M4_CLI_ENTRY,
      maxTurns: 120,
      maxBudgetUsd: 8.0,
    },
  ],
};

// ─── Phase 5: Cleanup ─────────────────────────────────────────────────────────

const phase5: MigrationPhase = {
  id: "M5",
  label: "Cleanup",
  parallelism: "sequential",
  validationCmd: "make test",
  tasks: [
    {
      id: "m5-cleanup",
      name: "Update Makefile, port CLI tests, update README",
      branch: "migrate/m5-cleanup",
      prompt: M5_CLEANUP,
      maxTurns: 60,
      maxBudgetUsd: 3.0,
    },
  ],
};

// ─── Exported phase list ──────────────────────────────────────────────────────

export const PHASES: MigrationPhase[] = [phase0, phase1, phase2, phase3a, phase3b, phase4, phase5];

/**
 * Map phase ID → phase for quick lookup.
 */
export const PHASE_MAP: Record<string, MigrationPhase> = Object.fromEntries(
  PHASES.map((p) => [p.id.toLowerCase(), p])
);
