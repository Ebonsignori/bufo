// Parity tests for the TS CLI
import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';

const CLI = new URL('../dist/main.js', import.meta.url).pathname;

describe('bufo-ts CLI', () => {
  it('--version exits 0 and prints version', () => {
    const out = execFileSync(process.execPath, [CLI, '--version'], { encoding: 'utf8' });
    expect(out).toMatch(/\d+\.\d+\.\d+/);
  });

  it('help exits 0', () => {
    // help prints TS usage then tries to exec bash bufo — capture output
    // and just verify the TS portion runs without throwing
    const out = execFileSync(process.execPath, [CLI, '--help'], {
      encoding: 'utf8',
      // bash bufo may not exist in test env; allow non-zero exit
      stdio: ['pipe', 'pipe', 'pipe'],
    }).toString();
    expect(out).toContain('bufo-ts');
  });
});
