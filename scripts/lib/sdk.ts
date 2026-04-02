/**
 * Thin wrapper around @anthropic-ai/claude-agent-sdk
 *
 * All migration agents use:
 *   - model: claude-opus-4-6 (consistent quality for all tasks)
 *   - permissionMode: bypassPermissions (fully headless)
 *   - allowedTools: full coding toolset
 *   - settingSources: ["project"] so the repo's CLAUDE.md is loaded
 */

import { query, type SDKResultMessage } from "@anthropic-ai/claude-agent-sdk";

export interface AgentResult {
  ok: boolean;
  result?: string;
  cost?: number;
  turns?: number;
  error?: string;
}

export interface RunAgentOptions {
  /** Natural-language task prompt for the agent */
  prompt: string;
  /** Absolute path to the working directory (worktree or repo root) */
  cwd: string;
  /** Human-readable label used in log output */
  taskName: string;
  /** Max agentic turns before stopping. Default: 80 */
  maxTurns?: number | undefined;
  /** Spending cap in USD. Default: 5.00 */
  maxBudgetUsd?: number | undefined;
  /** Called on each streamed assistant message chunk (optional) */
  onProgress?: ((text: string) => void) | undefined;
}

/**
 * Run a Claude Code agent headlessly in the given working directory.
 * Returns when the agent emits a result message (success or error).
 */
export async function runAgent(opts: RunAgentOptions): Promise<AgentResult> {
  const {
    prompt,
    cwd,
    taskName,
    maxTurns = 80,
    maxBudgetUsd = 5.0,
    onProgress,
  } = opts;

  let agentResult: AgentResult = { ok: false, error: "Agent produced no result message" };

  try {
    for await (const msg of query({
      prompt,
      options: {
        cwd,
        permissionMode: "bypassPermissions",
        allowDangerouslySkipPermissions: true,
        allowedTools: ["Read", "Edit", "Write", "Bash", "Glob", "Grep"],
        model: "claude-opus-4-6",
        maxTurns,
        maxBudgetUsd,
        // Load CLAUDE.md + project-level settings from the worktree
        settingSources: ["project"],
      },
    })) {
      if (msg.type === "assistant") {
        // Stream progress to caller if requested
        if (onProgress) {
          for (const block of msg.message.content) {
            if ("text" in block && block.text) {
              onProgress(block.text);
            }
          }
        }
      } else if (msg.type === "result") {
        const r = msg as SDKResultMessage;
        if (r.subtype === "success") {
          agentResult = {
            ok: true,
            result: r.result,
            cost: r.total_cost_usd,
            turns: r.num_turns,
          };
        } else {
          agentResult = {
            ok: false,
            error: `Agent stopped: ${r.subtype}${
              "errors" in r && Array.isArray(r.errors) ? " — " + r.errors.join("; ") : ""
            }`,
            cost: "total_cost_usd" in r ? (r.total_cost_usd as number) : 0,
            turns: "num_turns" in r ? (r.num_turns as number) : 0,
          };
        }
      }
    }
  } catch (err) {
    agentResult = {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  return agentResult;
}

/**
 * Run multiple agents concurrently. Returns results in the same order as input.
 * All agents run to completion (Promise.allSettled — one failure doesn't abort others).
 */
export async function runAgentsParallel(
  tasks: RunAgentOptions[]
): Promise<AgentResult[]> {
  const settled = await Promise.allSettled(tasks.map((t) => runAgent(t)));
  return settled.map((s) =>
    s.status === "fulfilled"
      ? s.value
      : { ok: false, error: s.reason instanceof Error ? s.reason.message : String(s.reason) }
  );
}
