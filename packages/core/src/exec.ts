import { execSync, exec } from 'node:child_process';

function runInShell(args: string): string {
  return `zsh -ilc 'bufo ${args}' 2>&1`;
}

export function runBufoSync(args: string): string {
  return execSync(runInShell(args), { encoding: 'utf-8', timeout: 30000 }).trim();
}

export function runBufoAsync(args: string, stdin?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = exec(
      runInShell(args),
      { encoding: 'utf-8', timeout: 0 },
      (error, stdout) => {
        if (error) reject(new Error(error.message));
        else resolve(stdout.trim());
      },
    );
    if (stdin !== undefined && child.stdin) {
      child.stdin.write(stdin);
      child.stdin.end();
    }
  });
}

export function getGitBranch(dir: string): string {
  try {
    return execSync(`git -C "${dir}" rev-parse --abbrev-ref HEAD 2>/dev/null`, {
      encoding: 'utf-8',
      timeout: 5000,
    }).trim();
  } catch {
    return 'unknown';
  }
}
