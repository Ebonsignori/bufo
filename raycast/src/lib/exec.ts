import { execSync, exec } from "child_process";
import { existsSync } from "fs";
import path from "path";

let resolvedBufoPath: string | null = null;

function expandHome(p: string): string {
  if (p.startsWith("~/")) return `${process.env.HOME}${p.slice(1)}`;
  return p;
}

function findBufo(): string {
  if (resolvedBufoPath) return resolvedBufoPath;

  // Explicit override — highest priority
  const envPath = process.env.BUFO_PATH;

  // Derive the repo-relative path from __dirname (daemon/dist/lib → repo root → src/bufo)
  const repoScript = path.join(__dirname, "..", "..", "..", "src", "bufo");

  // Check common locations
  const candidates = [
    envPath,
    repoScript,
    "/usr/local/bin/bufo",
    "/opt/homebrew/bin/bufo",
    `${process.env.HOME}/bin/bufo`,
    `${process.env.HOME}/.local/bin/bufo`,
  ].filter((c): c is string => Boolean(c));

  for (const c of candidates) {
    if (existsSync(c)) {
      resolvedBufoPath = c;
      return c;
    }
  }

  // Try resolving via zsh (handles aliases and functions)
  try {
    const output = execSync("zsh -ilc 'which bufo' 2>/dev/null", { encoding: "utf-8" }).trim();
    // `which` may return "bufo: aliased to ~/Projects/bufo/src/bufo"
    const aliasMatch = output.match(/aliased to (.+)$/);
    if (aliasMatch) {
      const resolved = expandHome(aliasMatch[1].trim());
      if (existsSync(resolved)) {
        resolvedBufoPath = resolved;
        return resolved;
      }
    }
    // Or a plain path
    if (output && !output.includes(":") && existsSync(output)) {
      resolvedBufoPath = output;
      return output;
    }
  } catch {
    // fall through
  }

  throw new Error("Could not find `bufo` binary. Ensure bufo is installed and in your PATH.");
}

const SHELL_ENV = {
  ...process.env,
  PATH: `/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:${process.env.PATH || ""}`,
};

export function runBufoSync(args: string): string {
  const bufo = findBufo();
  return execSync(`/bin/bash "${bufo}" ${args}`, {
    encoding: "utf-8",
    timeout: 30000,
    env: SHELL_ENV,
  }).trim();
}

export function runBufoAsync(args: string): Promise<string> {
  const bufo = findBufo();
  return new Promise((resolve, reject) => {
    exec(
      `/bin/bash "${bufo}" ${args}`,
      {
        encoding: "utf-8",
        timeout: 30000,
        env: SHELL_ENV,
      },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(stderr || error.message));
        } else {
          resolve(stdout.trim());
        }
      },
    );
  });
}

export function getGitBranch(dir: string): string {
  try {
    return execSync(`git -C "${dir}" rev-parse --abbrev-ref HEAD 2>/dev/null`, {
      encoding: "utf-8",
      timeout: 5000,
    }).trim();
  } catch {
    return "unknown";
  }
}
