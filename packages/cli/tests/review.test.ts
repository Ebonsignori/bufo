import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { BufoProject } from '@bufo/core';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomUUID } from 'node:crypto';

// Create TEST_HOME first, before any mocks reference it
const TEST_HOME = join(tmpdir(), `bufo-test-${randomUUID()}`);

// Mock os.homedir to use a temp directory
vi.mock('node:os', async () => {
  const actual = await vi.importActual<typeof import('node:os')>('node:os');
  return {
    ...actual,
    // Cannot reference TEST_HOME here — it's hoisted. Use a getter approach.
    homedir: vi.fn(),
  };
});

// Mock execa before importing review
vi.mock('execa', () => ({
  execa: vi.fn(),
}));

// Now import modules
import { parsePrIdentifier, fetchPrData, buildChorusInstructions, handleReview, handleChorus } from '../src/commands/review.js';
import { execa } from 'execa';
import { homedir } from 'node:os';

const mockedExeca = vi.mocked(execa);
const mockedHomedir = vi.mocked(homedir);

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
    return { stdout: '', stderr: '', exitCode: 0 } as any;
  });
}

describe('parsePrIdentifier', () => {
  const project = makeProject();

  it('parses a full GitHub URL', () => {
    const result = parsePrIdentifier(
      'https://github.com/acme/widgets/pull/42',
      project,
    );
    expect(result).toEqual({ owner: 'acme', repo: 'widgets', number: '42' });
  });

  it('parses org/repo#N format', () => {
    const result = parsePrIdentifier('acme/widgets#99', project);
    expect(result).toEqual({ owner: 'acme', repo: 'widgets', number: '99' });
  });

  it('parses repo#N format (no owner)', () => {
    const result = parsePrIdentifier('widgets#7', project);
    expect(result).toEqual({ owner: '', repo: 'widgets', number: '7' });
  });

  it('parses bare number', () => {
    const result = parsePrIdentifier('123', project);
    expect(result).toEqual({ owner: '', repo: '', number: '123' });
  });

  it('throws on invalid input', () => {
    expect(() => parsePrIdentifier('not-valid', project)).toThrow(
      'Invalid PR identifier',
    );
  });

  it('parses URL with trailing path segments', () => {
    const result = parsePrIdentifier(
      'https://github.com/org/repo/pull/55/files',
      project,
    );
    expect(result).toEqual({ owner: 'org', repo: 'repo', number: '55' });
  });
});

describe('fetchPrData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('fetches PR metadata and diff', async () => {
    const prMetadata = {
      title: 'Fix the bug',
      body: 'This fixes it',
      headRefName: 'fix-bug',
      baseRefName: 'main',
      additions: 10,
      deletions: 5,
      changedFiles: 3,
      url: 'https://github.com/acme/widgets/pull/42',
    };

    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'gh' && args.includes('--version'),
        result: { stdout: 'gh version 2.0.0' },
      },
      {
        match: (cmd, args) =>
          cmd === 'gh' && args.includes('pr') && args.includes('view') && args.includes('--json'),
        result: { stdout: JSON.stringify(prMetadata) },
      },
      {
        match: (cmd, args) =>
          cmd === 'gh' && args.includes('diff') && !args.includes('--name-only'),
        result: { stdout: 'diff --git a/file.ts b/file.ts\n+added line' },
      },
      {
        match: (cmd, args) =>
          cmd === 'gh' && args.includes('diff') && args.includes('--name-only'),
        result: { stdout: 'file.ts' },
      },
    ]);

    const result = await fetchPrData('acme', 'widgets', '42');

    expect(result).toContain('# PR Review Context');
    expect(result).toContain('Fix the bug');
    expect(result).toContain('acme/widgets');
    expect(result).toContain('#42');
    expect(result).toContain('file.ts');
    expect(result).toContain('+added line');
  });

  it('throws when gh is not installed', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'gh' && args.includes('--version'),
        result: new Error('not found'),
      },
    ]);

    await expect(fetchPrData('acme', 'widgets', '42')).rejects.toThrow(
      'gh CLI required',
    );
  });

  it('throws when PR cannot be fetched', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'gh' && args.includes('--version'),
        result: { stdout: 'gh version 2.0.0' },
      },
      {
        match: (cmd, args) =>
          cmd === 'gh' && args.includes('pr') && args.includes('view'),
        result: new Error('not found'),
      },
    ]);

    await expect(fetchPrData('acme', 'widgets', '999')).rejects.toThrow(
      'Could not fetch PR #999',
    );
  });

  it('respects includeDiff=false option', async () => {
    const prMetadata = {
      title: 'No diff needed',
      body: '',
      headRefName: 'feat',
      baseRefName: 'main',
      additions: 1,
      deletions: 0,
      changedFiles: 1,
      url: 'https://github.com/acme/widgets/pull/1',
    };

    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'gh' && args.includes('--version'),
        result: { stdout: 'gh version 2.0.0' },
      },
      {
        match: (cmd, args) =>
          cmd === 'gh' && args.includes('pr') && args.includes('view') && args.includes('--json'),
        result: { stdout: JSON.stringify(prMetadata) },
      },
    ]);

    const result = await fetchPrData('acme', 'widgets', '1', { includeDiff: false });
    expect(result).toContain('No diff needed');
    expect(result).not.toContain('```diff');
  });
});

describe('buildChorusInstructions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedHomedir.mockReturnValue(TEST_HOME);
  });

  it('returns conductor prompt with singer file list', async () => {
    const project = makeProject();
    const result = await buildChorusInstructions(project, [
      'singer-1-review.md',
      'singer-2-review.md',
    ]);

    expect(result).toContain('CONDUCTOR');
    expect(result).toContain('singer-1-review.md');
    expect(result).toContain('singer-2-review.md');
    expect(result).toContain('Singer Output Files');
  });

  it('defaults to single singer file when none provided', async () => {
    const project = makeProject();
    const result = await buildChorusInstructions(project);

    expect(result).toContain('singer-1-review.md');
  });
});

describe('handleReview', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    mockedHomedir.mockReturnValue(TEST_HOME);
  });

  it('shows help when no args', async () => {
    const logSpy = vi.spyOn(console, 'log');
    const project = makeProject();
    await handleReview(project, []);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Usage'));
  });

  it('shows help for "new" subcommand', async () => {
    const logSpy = vi.spyOn(console, 'log');
    const project = makeProject();
    await handleReview(project, ['new']);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('not yet available'),
    );
  });

  it('lists empty sessions for "ls"', async () => {
    const logSpy = vi.spyOn(console, 'log');
    const project = makeProject();
    await handleReview(project, ['ls']);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('No'));
  });

  it('resume without name shows error', async () => {
    const logSpy = vi.spyOn(console, 'log');
    const project = makeProject();
    await handleReview(project, ['resume']);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Specify review'));
  });

  it('delete without name shows error', async () => {
    const logSpy = vi.spyOn(console, 'log');
    const project = makeProject();
    await handleReview(project, ['delete']);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('Specify review to delete'),
    );
  });

  it('show without name shows error', async () => {
    const logSpy = vi.spyOn(console, 'log');
    const project = makeProject();
    await handleReview(project, ['show']);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('Specify review to view'),
    );
  });
});

describe('handleChorus', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    mockedHomedir.mockReturnValue(TEST_HOME);
  });

  it('shows help when no args', async () => {
    const logSpy = vi.spyOn(console, 'log');
    const project = makeProject();
    await handleChorus(project, []);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Usage'));
  });

  it('shows help for "init" subcommand', async () => {
    const logSpy = vi.spyOn(console, 'log');
    const project = makeProject();
    await handleChorus(project, ['init']);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('not yet available'),
    );
  });

  it('shows help for "new" subcommand', async () => {
    const logSpy = vi.spyOn(console, 'log');
    const project = makeProject();
    await handleChorus(project, ['new']);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('not yet available'),
    );
  });

  it('lists empty sessions for "ls"', async () => {
    const logSpy = vi.spyOn(console, 'log');
    const project = makeProject();
    await handleChorus(project, ['ls']);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('No'));
  });

  it('resume without name shows error', async () => {
    const logSpy = vi.spyOn(console, 'log');
    const project = makeProject();
    await handleChorus(project, ['resume']);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('Specify chorus session'),
    );
  });

  it('delete without name shows error', async () => {
    const logSpy = vi.spyOn(console, 'log');
    const project = makeProject();
    await handleChorus(project, ['delete']);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('Specify chorus session to delete'),
    );
  });

  it('show without name shows error', async () => {
    const logSpy = vi.spyOn(console, 'log');
    const project = makeProject();
    await handleChorus(project, ['show']);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('Specify chorus session to view'),
    );
  });
});

describe('session management', () => {
  const project = makeProject();
  let sessionsDir: string;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    mockedHomedir.mockReturnValue(TEST_HOME);

    sessionsDir = join(TEST_HOME, '.bufo', 'sessions', 'test');
    await mkdir(sessionsDir, { recursive: true });
  });

  afterEach(async () => {
    try {
      await rm(TEST_HOME, { recursive: true, force: true });
    } catch {
      // ignore
    }
  });

  it('delete removes a session directory', async () => {
    const sessionDir = join(sessionsDir, 'review-widgets-42');
    await mkdir(sessionDir, { recursive: true });
    await writeFile(join(sessionDir, 'session.yaml'), 'name: review-widgets-42\n');

    const logSpy = vi.spyOn(console, 'log');

    await handleReview(project, ['delete', 'review-widgets-42']);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Deleted'));
  });

  it('show displays review output when it exists', async () => {
    const sessionDir = join(sessionsDir, 'review-widgets-42');
    await mkdir(sessionDir, { recursive: true });
    await writeFile(
      join(sessionDir, 'review-output.md'),
      '# Review\nLooks good!',
    );

    const logSpy = vi.spyOn(console, 'log');
    await handleReview(project, ['show', 'review-widgets-42']);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Review output for'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Looks good!'));
  });

  it('show reports missing output gracefully', async () => {
    const logSpy = vi.spyOn(console, 'log');
    await handleReview(project, ['show', 'review-nonexistent-99']);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('No saved review output'),
    );
  });

  it('resolves PR identifier to review session name for resume', async () => {
    const logSpy = vi.spyOn(console, 'log');
    await handleReview(project, [
      'resume',
      'https://github.com/acme/widgets/pull/42',
    ]);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('review-widgets-42'),
    );
  });

  it('delete all removes all review sessions', async () => {
    await mkdir(join(sessionsDir, 'review-a-1'), { recursive: true });
    await mkdir(join(sessionsDir, 'review-b-2'), { recursive: true });
    await mkdir(join(sessionsDir, 'chorus-c-3'), { recursive: true });

    const logSpy = vi.spyOn(console, 'log');
    await handleReview(project, ['delete', 'all']);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Deleted 2'));
  });

  it('chorus delete all removes all chorus sessions', async () => {
    await mkdir(join(sessionsDir, 'review-a-1'), { recursive: true });
    await mkdir(join(sessionsDir, 'chorus-b-2'), { recursive: true });
    await mkdir(join(sessionsDir, 'chorus-c-3'), { recursive: true });

    const logSpy = vi.spyOn(console, 'log');
    await handleChorus(project, ['delete', 'all']);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Deleted 2'));
  });
});
