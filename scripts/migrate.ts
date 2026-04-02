#!/usr/bin/env tsx
/**
 * Bufo Migration Orchestrator
 *
 * Drives the full Bash→TypeScript rewrite using the Claude Code SDK.
 * Each migration task runs as an isolated Claude Code agent in its own git worktree.
 *
 * Usage:
 *   npx tsx scripts/migrate.ts                     # Run all phases (M0–M5)
 *   npx tsx scripts/migrate.ts --phase m1          # Run a single phase
 *   npx tsx scripts/migrate.ts --from m2           # Resume from a phase
 *   npx tsx scripts/migrate.ts --dry-run           # Print plan without executing
 *   npx tsx scripts/migrate.ts --list              # List all phases and tasks
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";

import { runAgent, runAgentsParallel, type RunAgentOptions } from "./lib/sdk.js";
import {
  REPO_ROOT,
  MIGRATION_BRANCH,
  ensureMigrationBranch,
  createWorktree,
  mergeWorktree,
  removeWorktree,
  worktreePath,
} from "./lib/worktree.js";
import { reporter, type PhaseRecord } from "./lib/reporter.js";
import { PHASES, PHASE_MAP, type MigrationPhase, type AgentTask } from "./lib/phases.js";

// ─── CLI argument parsing ──────────────────────────────────────────────────────

const { values: args } = parseArgs({
  options: {
    phase: { type: "string" },   // run only this phase (e.g. "m1")
    from: { type: "string" },    // start from this phase (e.g. "m2")
    "dry-run": { type: "boolean", default: false },
    list: { type: "boolean", default: false },
    help: { type: "boolean", default: false },
  },
  strict: false,
});

// ─── Help & list ──────────────────────────────────────────────────────────────

if (args.help) {
  console.log(`
Bufo Migration Orchestrator

USAGE:
  npx tsx scripts/migrate.ts [options]

OPTIONS:
  --phase <id>    Run only the specified phase (e.g. m0, m1, m2, m3a, m3b, m4, m5)
  --from <id>     Start from the specified phase (skips earlier phases)
  --dry-run       Print the execution plan without running any agents
  --list          List all phases and their tasks
  --help          Show this help

EXAMPLES:
  npx tsx scripts/migrate.ts                # Run everything (M0–M5)
  npx tsx scripts/migrate.ts --phase m1    # Run only Phase 1
  npx tsx scripts/migrate.ts --from m2     # Resume from Phase 2
  npx tsx scripts/migrate.ts --dry-run     # Preview what would run
`);
  process.exit(0);
}

if (args.list) {
  for (const phase of PHASES) {
    console.log(`\n${phase.id}: ${phase.label} [${phase.parallelism}]`);
    for (const task of phase.tasks) {
      const deps = task.depends ? ` (depends: ${task.depends.join(", ")})` : "";
      console.log(`  - ${task.id}: ${task.name}${deps}`);
    }
  }
  process.exit(0);
}

// ─── Determine which phases to run ────────────────────────────────────────────

function selectPhases(): MigrationPhase[] {
  if (args.phase && typeof args.phase === "string") {
    const key = args.phase.toLowerCase();
    const phase = PHASE_MAP[key];
    if (!phase) {
      console.error(`Unknown phase: ${args.phase}. Valid: ${Object.keys(PHASE_MAP).join(", ")}`);
      process.exit(1);
    }
    return [phase];
  }

  if (args.from && typeof args.from === "string") {
    const key = args.from.toLowerCase();
    const startIdx = PHASES.findIndex((p) => p.id.toLowerCase() === key);
    if (startIdx === -1) {
      console.error(`Unknown phase: ${args.from}. Valid: ${Object.keys(PHASE_MAP).join(", ")}`);
      process.exit(1);
    }
    return PHASES.slice(startIdx);
  }

  return PHASES;
}

const phasesToRun = selectPhases();

// ─── Dry run ──────────────────────────────────────────────────────────────────

if (args["dry-run"]) {
  console.log("DRY RUN — no agents will be launched\n");
  for (const phase of phasesToRun) {
    console.log(`Phase ${phase.id}: ${phase.label} [${phase.parallelism}]`);
    for (const task of phase.tasks) {
      const deps = task.depends ? ` → after: ${task.depends.join(", ")}` : "";
      const budget = task.maxBudgetUsd ?? 5.0;
      const turns = task.maxTurns ?? 80;
      console.log(`  ${task.id}: ${task.name}  (branch: ${task.branch}, $${budget}, ${turns} turns)${deps}`);
    }
    console.log(`  Validation: ${phase.validationCmd}`);
  }

  const totalBudget = phasesToRun
    .flatMap((p) => p.tasks)
    .reduce((sum, t) => sum + (t.maxBudgetUsd ?? 5.0), 0);
  console.log(`\nEstimated max budget: $${totalBudget.toFixed(2)}`);
  process.exit(0);
}

// ─── Pre-flight checks ────────────────────────────────────────────────────────

function preflight(): void {
  // Verify we're in the repo
  if (!existsSync(join(REPO_ROOT, "src", "bufo"))) {
    console.error("Error: must be run from the bufo repo root");
    process.exit(1);
  }

  // Verify claude CLI is available
  try {
    execSync("which claude", { stdio: "pipe" });
  } catch {
    console.error("Error: claude CLI not found. Install Claude Code first.");
    process.exit(1);
  }

  // Verify git is clean enough to create worktrees (unstaged changes are OK)
  try {
    const status = execSync("git status --porcelain", { encoding: "utf8", cwd: REPO_ROOT });
    const untracked = status.split("\n").filter((l) => l.startsWith("??")).length;
    if (untracked > 50) {
      console.warn(`Warning: ${untracked} untracked files. Migration will proceed.`);
    }
  } catch {
    console.error("Error: not a git repository");
    process.exit(1);
  }

  // Ensure migration branch exists
  ensureMigrationBranch();
}

// ─── Validation gate ──────────────────────────────────────────────────────────

function runValidation(phase: PhaseRecord, cmd: string): boolean {
  try {
    const output = execSync(cmd, {
      cwd: REPO_ROOT,
      encoding: "utf8",
      stdio: ["inherit", "pipe", "pipe"],
      timeout: 5 * 60 * 1000, // 5 min timeout
    });
    reporter.reportValidation(phase, true, output);
    return true;
  } catch (err: unknown) {
    const e = err as { stdout?: string; stderr?: string };
    const output = [e.stdout ?? "", e.stderr ?? ""].filter(Boolean).join("\n");
    reporter.reportValidation(phase, false, output);
    return false;
  }
}

// ─── Single task runner ───────────────────────────────────────────────────────

async function runTask(
  phaseRecord: PhaseRecord,
  task: AgentTask
): Promise<void> {
  reporter.startTask(phaseRecord, task.name, task.branch);

  // Create isolated worktree for this task
  let wt: string;
  try {
    wt = createWorktree(task.branch);
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    reporter.completeTask(phaseRecord, task.name, { ok: false, error: `worktree create failed: ${error}` });
    return;
  }

  // Run the agent
  const agentOpts: RunAgentOptions = {
    prompt: task.prompt,
    cwd: wt,
    taskName: task.id,
    maxTurns: task.maxTurns,
    maxBudgetUsd: task.maxBudgetUsd,
  };

  const result = await runAgent(agentOpts);
  reporter.completeTask(phaseRecord, task.name, result);

  if (result.ok) {
    // Merge the worktree branch back into the migration branch
    try {
      mergeWorktree(task.branch);
      removeWorktree(task.branch);
    } catch (mergeErr) {
      const error = mergeErr instanceof Error ? mergeErr.message : String(mergeErr);
      // Merge failure is non-fatal for the orchestrator — flag it in the report
      reporter.completeTask(phaseRecord, `${task.name} (merge)`, {
        ok: false,
        error: `merge failed: ${error}`,
      });
    }
  }
  // Leave worktree in place on failure so it can be inspected
}

// ─── Phase runner ─────────────────────────────────────────────────────────────

async function runPhase(phase: MigrationPhase): Promise<void> {
  const taskNames = phase.tasks.map((t) => t.name);
  const phaseRecord = reporter.startPhase(phase.id, phase.label, taskNames);

  if (phase.parallelism === "sequential") {
    // Run tasks one at a time, in order
    for (const task of phase.tasks) {
      await runTask(phaseRecord, task);
    }
  } else {
    // Parallel execution with dependency awareness
    // Build dependency groups: tasks with no depends go in wave 0,
    // tasks whose depends are all complete go in subsequent waves.

    const completed = new Set<string>();
    const remaining = [...phase.tasks];

    while (remaining.length > 0) {
      // Find tasks whose dependencies are all satisfied
      const ready = remaining.filter(
        (t) => !t.depends || t.depends.every((d) => completed.has(d))
      );

      if (ready.length === 0) {
        // Dependency cycle or unresolvable — run everything left sequentially
        console.warn("Warning: dependency cycle detected, falling back to sequential");
        for (const task of remaining) {
          await runTask(phaseRecord, task);
          completed.add(task.id);
        }
        break;
      }

      // Remove ready tasks from remaining
      for (const t of ready) {
        remaining.splice(remaining.indexOf(t), 1);
      }

      // Launch ready tasks in parallel
      const agentOpts: RunAgentOptions[] = ready.map((task) => {
        // We need the worktree path before starting
        const wt = worktreePath(task.branch);
        return {
          prompt: task.prompt,
          cwd: wt,
          taskName: task.id,
          maxTurns: task.maxTurns,
          maxBudgetUsd: task.maxBudgetUsd,
        };
      });

      // Create all worktrees before launching agents
      for (const task of ready) {
        reporter.startTask(phaseRecord, task.name, task.branch);
        createWorktree(task.branch);
      }

      // Run all ready tasks in parallel
      const results = await runAgentsParallel(agentOpts);

      // Process results
      for (let i = 0; i < ready.length; i++) {
        const task = ready[i]!;
        const result = results[i]!;
        reporter.completeTask(phaseRecord, task.name, result);

        if (result.ok) {
          completed.add(task.id);
          try {
            mergeWorktree(task.branch);
            removeWorktree(task.branch);
          } catch (mergeErr) {
            const error = mergeErr instanceof Error ? mergeErr.message : String(mergeErr);
            reporter.completeTask(phaseRecord, `${task.name} (merge)`, {
              ok: false,
              error: `merge failed: ${error}`,
            });
          }
        }
        // Failed tasks: leave worktree for inspection; still mark as "done" for dep resolution
        completed.add(task.id);
      }
    }
  }

  // Run validation gate
  runValidation(phaseRecord, phase.validationCmd);
  reporter.finishPhase(phaseRecord);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  preflight();

  reporter.init(phasesToRun.length);

  console.log(`\nRunning ${phasesToRun.length} phase(s): ${phasesToRun.map((p) => p.id).join(", ")}`);
  console.log(`Migration branch: ${MIGRATION_BRANCH}`);
  console.log(`Repo root: ${REPO_ROOT}\n`);

  // Ensure we're on the migration branch before starting
  try {
    execSync(`git checkout ${MIGRATION_BRANCH}`, { cwd: REPO_ROOT, stdio: "pipe" });
  } catch {
    // Already on the branch or branch doesn't exist yet (ensured by ensureMigrationBranch above)
  }

  for (const phase of phasesToRun) {
    await runPhase(phase);
  }

  reporter.finish();
}

main().catch((err) => {
  console.error("Fatal error:", err instanceof Error ? err.message : String(err));
  process.exit(1);
});
