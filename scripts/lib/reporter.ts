/**
 * Progress reporter: real-time console output + continuous writes to migration-report.md
 */

import { writeFileSync, appendFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT } from "./worktree.js";

const REPORT_PATH = join(REPO_ROOT, "migration-report.md");

// ANSI colors (only when stdout is a TTY)
const isTTY = process.stdout.isTTY;
const c = {
  reset: isTTY ? "\x1b[0m" : "",
  bold: isTTY ? "\x1b[1m" : "",
  dim: isTTY ? "\x1b[2m" : "",
  green: isTTY ? "\x1b[32m" : "",
  red: isTTY ? "\x1b[31m" : "",
  yellow: isTTY ? "\x1b[33m" : "",
  cyan: isTTY ? "\x1b[36m" : "",
  blue: isTTY ? "\x1b[34m" : "",
  gray: isTTY ? "\x1b[90m" : "",
};

export type TaskStatus = "pending" | "running" | "success" | "failed" | "skipped";

export interface TaskRecord {
  phase: string;
  name: string;
  branch?: string;
  status: TaskStatus;
  startTime?: number;
  endTime?: number;
  cost?: number;
  turns?: number;
  error?: string;
}

export interface PhaseRecord {
  id: string;
  label: string;
  status: "pending" | "running" | "success" | "failed" | "partial";
  tasks: TaskRecord[];
  startTime?: number;
  endTime?: number;
  validationPassed?: boolean;
}

class Reporter {
  private phases: PhaseRecord[] = [];
  private startTime = Date.now();

  /** Initialize the report file with a header */
  init(totalPhases: number): void {
    const header = [
      "# Bufo Migration Report",
      "",
      `> Started: ${new Date().toISOString()}`,
      `> Phases: ${totalPhases}`,
      "> Model: claude-opus-4-6",
      "",
      "---",
      "",
    ].join("\n");

    writeFileSync(REPORT_PATH, header, "utf8");
    console.log(`${c.bold}${c.cyan}Bufo Migration Orchestrator${c.reset}`);
    console.log(`${c.dim}Report: ${REPORT_PATH}${c.reset}`);
    console.log(`${c.dim}${"─".repeat(60)}${c.reset}`);
  }

  /** Register a phase (call before running it) */
  startPhase(id: string, label: string, taskNames: string[]): PhaseRecord {
    const phase: PhaseRecord = {
      id,
      label,
      status: "running",
      tasks: taskNames.map((name) => ({ phase: id, name, status: "pending" })),
      startTime: Date.now(),
    };
    this.phases.push(phase);

    console.log(`\n${c.bold}${c.blue}▶ Phase ${id}: ${label}${c.reset}`);
    this._appendToReport(`\n## Phase ${id}: ${label}\n\n> Status: 🔄 Running\n\n`);

    return phase;
  }

  /** Mark a task as started */
  startTask(phase: PhaseRecord, taskName: string, branch?: string): void {
    const task = phase.tasks.find((t) => t.name === taskName);
    if (task) {
      task.status = "running";
      task.startTime = Date.now();
      if (branch) task.branch = branch;
    }
    console.log(`  ${c.yellow}⠿${c.reset} ${taskName}${branch ? c.dim + ` (${branch})` + c.reset : ""}`);
  }

  /** Mark a task as completed */
  completeTask(
    phase: PhaseRecord,
    taskName: string,
    result: { ok: boolean; cost?: number; turns?: number; error?: string }
  ): void {
    const task = phase.tasks.find((t) => t.name === taskName);
    if (task) {
      task.status = result.ok ? "success" : "failed";
      task.endTime = Date.now();
      if (result.cost !== undefined) task.cost = result.cost;
      if (result.turns !== undefined) task.turns = result.turns;
      if (result.error !== undefined) task.error = result.error;
    }

    const elapsed = task ? Math.round(((task.endTime ?? 0) - (task.startTime ?? 0)) / 1000) : 0;
    const costStr = result.cost ? ` ${c.dim}$${result.cost.toFixed(3)}${c.reset}` : "";
    const turnsStr = result.turns ? ` ${c.dim}${result.turns} turns${c.reset}` : "";
    const timeStr = ` ${c.dim}${elapsed}s${c.reset}`;

    if (result.ok) {
      console.log(`  ${c.green}✓${c.reset} ${taskName}${costStr}${turnsStr}${timeStr}`);
    } else {
      console.log(`  ${c.red}✗${c.reset} ${taskName}: ${result.error ?? "unknown error"}${timeStr}`);
    }
  }

  /** Report validation gate result */
  reportValidation(phase: PhaseRecord, passed: boolean, output: string): void {
    phase.validationPassed = passed;

    if (passed) {
      console.log(`  ${c.green}✓ Validation passed${c.reset}`);
    } else {
      console.log(`  ${c.red}✗ Validation FAILED${c.reset}`);
      // Show last 20 lines of output for context
      const lines = output.trim().split("\n").slice(-20);
      for (const line of lines) {
        console.log(`    ${c.gray}${line}${c.reset}`);
      }
    }
  }

  /** Finalize a phase */
  finishPhase(phase: PhaseRecord): void {
    const failed = phase.tasks.filter((t) => t.status === "failed");
    const succeeded = phase.tasks.filter((t) => t.status === "success");

    phase.status = failed.length === 0 ? "success" : failed.length < phase.tasks.length ? "partial" : "failed";
    phase.endTime = Date.now();

    const elapsed = Math.round(((phase.endTime ?? 0) - (phase.startTime ?? 0)) / 1000);
    const phaseCost = phase.tasks.reduce((sum, t) => sum + (t.cost ?? 0), 0);

    const icon = phase.status === "success" ? "✅" : phase.status === "partial" ? "⚠️" : "❌";
    console.log(
      `  ${c.dim}─── ${icon} ${phase.id} complete: ${succeeded.length}/${phase.tasks.length} tasks, ` +
      `$${phaseCost.toFixed(3)}, ${elapsed}s${c.reset}`
    );

    // Append full phase summary to report
    this._writePhaseReport(phase);
  }

  /** Print and write the final summary */
  finish(): void {
    const totalElapsed = Math.round((Date.now() - this.startTime) / 1000);
    const totalCost = this.phases
      .flatMap((p) => p.tasks)
      .reduce((sum, t) => sum + (t.cost ?? 0), 0);
    const failedPhases = this.phases.filter((p) => p.status === "failed" || p.status === "partial");
    const allOk = failedPhases.length === 0;

    console.log(`\n${c.dim}${"─".repeat(60)}${c.reset}`);
    console.log(
      `${c.bold}${allOk ? c.green : c.yellow}Migration ${allOk ? "complete" : "complete with failures"}${c.reset}`
    );
    console.log(`  Total cost:  $${totalCost.toFixed(3)}`);
    console.log(`  Total time:  ${totalElapsed}s`);
    if (!allOk) {
      console.log(`  ${c.red}Failed phases: ${failedPhases.map((p) => p.id).join(", ")}${c.reset}`);
    }
    console.log(`  Report:      ${REPORT_PATH}`);

    this._appendToReport(this._buildFinalSummary(totalElapsed, totalCost, failedPhases));
  }

  // ─── Private helpers ──────────────────────────────────────────────────────

  private _appendToReport(text: string): void {
    appendFileSync(REPORT_PATH, text, "utf8");
  }

  private _writePhaseReport(phase: PhaseRecord): void {
    const elapsed = Math.round(((phase.endTime ?? 0) - (phase.startTime ?? 0)) / 1000);
    const phaseCost = phase.tasks.reduce((sum, t) => sum + (t.cost ?? 0), 0);
    const icon = phase.status === "success" ? "✅" : phase.status === "partial" ? "⚠️" : "❌";

    const lines: string[] = [
      `\n> Status: ${icon} ${phase.status} · ${elapsed}s · $${phaseCost.toFixed(3)}\n`,
      "| Task | Status | Cost | Turns | Time |",
      "|------|--------|------|-------|------|",
    ];

    for (const task of phase.tasks) {
      const taskElapsed = task.endTime && task.startTime
        ? Math.round((task.endTime - task.startTime) / 1000)
        : 0;
      const taskIcon = task.status === "success" ? "✅" : task.status === "failed" ? "❌" : "⏳";
      lines.push(
        `| \`${task.name}\`${task.branch ? ` (${task.branch})` : ""} | ${taskIcon} ${task.status} | ` +
        `$${(task.cost ?? 0).toFixed(3)} | ${task.turns ?? "-"} | ${taskElapsed}s |`
      );
    }

    if (phase.validationPassed !== undefined) {
      lines.push("");
      lines.push(`**Validation:** ${phase.validationPassed ? "✅ passed" : "❌ FAILED"}`);
    }

    const failedTasks = phase.tasks.filter((t) => t.status === "failed");
    if (failedTasks.length > 0) {
      lines.push("\n### Failed Tasks\n");
      for (const task of failedTasks) {
        lines.push(`**${task.name}:** ${task.error ?? "unknown error"}\n`);
      }
    }

    lines.push("\n---");
    this._appendToReport(lines.join("\n") + "\n");
  }

  private _buildFinalSummary(
    elapsed: number,
    cost: number,
    failedPhases: PhaseRecord[]
  ): string {
    const lines: string[] = [
      "\n## Final Summary\n",
      `| Metric | Value |`,
      `|--------|-------|`,
      `| Total cost | $${cost.toFixed(3)} |`,
      `| Total time | ${elapsed}s |`,
      `| Phases run | ${this.phases.length} |`,
      `| Phases succeeded | ${this.phases.filter((p) => p.status === "success").length} |`,
      `| Phases failed/partial | ${failedPhases.length} |`,
      "",
    ];

    if (failedPhases.length > 0) {
      lines.push("### ⚠️ Phases Requiring Human Review\n");
      for (const phase of failedPhases) {
        lines.push(`- **${phase.id}: ${phase.label}** — ${phase.status}`);
        const failedTasks = phase.tasks.filter((t) => t.status === "failed");
        for (const t of failedTasks) {
          lines.push(`  - \`${t.name}\`: ${t.error ?? "unknown"}`);
        }
      }
    } else {
      lines.push("### ✅ All phases completed successfully\n");
      lines.push("Run `bufo --version` to verify the TypeScript CLI is working.\n");
    }

    lines.push(`\n> Generated: ${new Date().toISOString()}\n`);
    return lines.join("\n");
  }
}

// Export a singleton
export const reporter = new Reporter();
