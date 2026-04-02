import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { BufoProject } from '@bufo/core';

// Mock execa before importing merge
vi.mock('execa', () => ({
  execa: vi.fn(),
}));

// Mock fs/promises
vi.mock('fs/promises', () => ({
  readdir: vi.fn(),
}));

import { getDefaultBranch, handleMerge } from '../src/commands/merge.js';
import { execa } from 'execa';
import { readdir } from 'fs/promises';

const mockedExeca = vi.mocked(execa);
const mockedReaddir = vi.mocked(readdir);

function makeProject(overrides: Partial<BufoProject> = {}): BufoProject {
  return {
    alias: 'test',
    session_name: 'test-session',
    tadpole_base: '/tmp/test-tadpoles',
    main_repo: '/tmp/test-main',
    tadpoles: { count: 3, prefix: 'tp', branch_pattern: 'tp-{N}' },
    ...overrides,
  };
}

/**
 * Helper: configure mockedExeca to handle git commands by matching on argument patterns.
 * handlers is an array of { match, result } objects. match is a function that receives
 * (cmd, args) and returns true if this handler should respond. result is the mock return.
 */
type ExecaHandler = {
  match: (cmd: string, args: string[]) => boolean;
  result: { stdout: string } | Error;
};

function setupExecaHandlers(handlers: ExecaHandler[]) {
  mockedExeca.mockImplementation(async (cmd: any, args: any, _opts?: any) => {
    const cmdStr = cmd as string;
    const argsArr = (args ?? []) as string[];
    for (const h of handlers) {
      if (h.match(cmdStr, argsArr)) {
        if (h.result instanceof Error) throw h.result;
        return { ...h.result, stderr: '', exitCode: 0 } as any;
      }
    }
    throw new Error(`Unexpected execa call: ${cmdStr} ${argsArr.join(' ')}`);
  });
}

describe('getDefaultBranch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('returns branch from symbolic-ref when available', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'git' && args.includes('symbolic-ref'),
        result: { stdout: 'refs/remotes/origin/develop' },
      },
    ]);

    const branch = await getDefaultBranch('/some/repo');
    expect(branch).toBe('develop');
  });

  it('falls back to checking remote branches', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'git' && args.includes('symbolic-ref'),
        result: new Error('not configured'),
      },
      {
        match: (cmd, args) =>
          cmd === 'git' && args.includes('show-ref') && args.includes('refs/remotes/origin/main'),
        result: new Error('not found'),
      },
      {
        match: (cmd, args) =>
          cmd === 'git' && args.includes('show-ref') && args.includes('refs/remotes/origin/master'),
        result: { stdout: '' },
      },
    ]);

    const branch = await getDefaultBranch('/some/repo');
    expect(branch).toBe('master');
  });

  it('returns "main" when no remote branches match', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'git' && args.includes('symbolic-ref'),
        result: new Error('not configured'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('show-ref'),
        result: new Error('not found'),
      },
    ]);

    const branch = await getDefaultBranch('/some/repo');
    expect(branch).toBe('main');
  });
});

describe('handleMerge', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('throws when main repo is not a git repo', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'git' && args.includes('rev-parse'),
        result: new Error('not a git repo'),
      },
    ]);

    const project = makeProject({ main_repo: '/nonexistent' });
    await expect(handleMerge(project)).rejects.toThrow('Main repo not found');
  });

  it('throws when working tree is dirty', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'git' && args.includes('rev-parse'),
        result: { stdout: '.git' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--porcelain'),
        result: { stdout: 'M dirty-file.txt' },
      },
    ]);

    const project = makeProject();
    await expect(handleMerge(project)).rejects.toThrow('uncommitted changes');
  });

  it('prints no-branches message when no tadpole branches have commits ahead', async () => {
    const logSpy = vi.spyOn(console, 'log');

    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'git' && args.includes('rev-parse'),
        result: { stdout: '.git' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--porcelain'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('symbolic-ref'),
        result: new Error('not configured'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('show-ref') && args.some(a => a.startsWith('refs/remotes')),
        result: new Error('not found'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('show-ref') && args.some(a => a.startsWith('refs/heads')),
        result: new Error('not found'),
      },
    ]);

    mockedReaddir.mockResolvedValue(['tp-1', 'tp-2'] as any);

    const project = makeProject();
    await handleMerge(project);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('No tadpole branches with commits ahead'),
    );
  });

  it('dry run shows branches but does not merge', async () => {
    const logSpy = vi.spyOn(console, 'log');

    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'git' && args.includes('rev-parse'),
        result: { stdout: '.git' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--porcelain'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('symbolic-ref'),
        result: new Error('not configured'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('show-ref') && args.some(a => a.startsWith('refs/remotes')),
        result: new Error('not found'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('show-ref') && args.some(a => a.startsWith('refs/heads')),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('log') && args.some(a => a.includes('..')),
        result: { stdout: 'abc1234 some commit' },
      },
    ]);

    mockedReaddir.mockResolvedValue(['tp-1'] as any);

    const project = makeProject();
    await handleMerge(project, { dryRun: true });

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Dry run'));
    // Should NOT have called checkout, fetch, merge
    const checkoutCalls = mockedExeca.mock.calls.filter(
      (call) => Array.isArray(call[1]) && (call[1] as string[]).includes('checkout'),
    );
    expect(checkoutCalls).toHaveLength(0);
  });

  it('merges a single tadpole when num is specified', async () => {
    const logSpy = vi.spyOn(console, 'log');

    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'git' && args.includes('rev-parse'),
        result: { stdout: '.git' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--porcelain'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('symbolic-ref'),
        result: new Error('not configured'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('show-ref') && args.some(a => a.startsWith('refs/remotes')),
        result: new Error('not found'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('show-ref') && args.some(a => a.startsWith('refs/heads')),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('log') && args.some(a => a.includes('..')),
        result: { stdout: 'abc1234 add feature' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('fetch'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('checkout'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('pull'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('merge'),
        result: { stdout: '' },
      },
    ]);

    // readdir should NOT be called when num is specified
    mockedReaddir.mockRejectedValue(new Error('should not be called'));

    const project = makeProject();
    await handleMerge(project, { num: 2 });

    // Verify readdir was not called (num was specified)
    expect(mockedReaddir).not.toHaveBeenCalled();

    // Verify merge was called with the correct branch
    const mergeCalls = mockedExeca.mock.calls.filter(
      (call) => Array.isArray(call[1]) && (call[1] as string[]).includes('merge'),
    );
    expect(mergeCalls.length).toBeGreaterThan(0);
    expect((mergeCalls[0][1] as string[])).toContain('tp-2');

    // Verify summary was printed
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Merged'));
  });

  it('handles merge conflicts by aborting', async () => {
    const logSpy = vi.spyOn(console, 'log');

    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'git' && args.includes('rev-parse'),
        result: { stdout: '.git' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--porcelain'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('symbolic-ref'),
        result: new Error('not configured'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('show-ref') && args.some(a => a.startsWith('refs/remotes')),
        result: new Error('not found'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('show-ref') && args.some(a => a.startsWith('refs/heads')),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('log') && args.some(a => a.includes('..')),
        result: { stdout: 'abc1234 conflicting change' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('fetch'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('checkout'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('pull'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('merge') && !args.includes('--abort'),
        result: new Error('merge conflict'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--abort'),
        result: { stdout: '' },
      },
    ]);

    mockedReaddir.mockResolvedValue(['tp-1'] as any);

    const project = makeProject();
    await handleMerge(project);

    // Should have called merge --abort
    const abortCalls = mockedExeca.mock.calls.filter(
      (call) => Array.isArray(call[1]) && (call[1] as string[]).includes('--abort'),
    );
    expect(abortCalls.length).toBeGreaterThan(0);

    // Summary should show failed
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Failed'));
  });
});
