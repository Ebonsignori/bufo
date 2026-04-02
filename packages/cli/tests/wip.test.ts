import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mkdtemp, mkdir, writeFile, readFile, readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import type { BufoProject } from '@bufo/core';

// Mock execa before importing wip
vi.mock('execa', () => ({
  execa: vi.fn(),
}));

// Fully mock @bufo/core (don't importActual — dist is incomplete)
vi.mock('@bufo/core', () => ({
  getWipDir: vi.fn(),
  listWips: vi.fn(),
  listAllWips: vi.fn(),
  listWipsInDir: vi.fn(),
  loadWipMetadata: vi.fn(),
  deleteWip: vi.fn(),
}));

import {
  wipSave,
  wipRestore,
  wipContinue,
  wipResume,
  generateWipSummary,
} from '../src/commands/wip.js';
import { execa } from 'execa';
import { getWipDir, listWips, listAllWips } from '@bufo/core';

const mockedExeca = vi.mocked(execa);
const mockedGetWipDir = vi.mocked(getWipDir);
const mockedListWips = vi.mocked(listWips);
const mockedListAllWips = vi.mocked(listAllWips);

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
    // Default: return empty stdout for unmatched git commands
    if (cmdStr === 'git') {
      return { stdout: '', stderr: '', exitCode: 0 } as any;
    }
    throw new Error(`Unexpected execa call: ${cmdStr} ${argsArr.join(' ')}`);
  });
}

describe('generateWipSummary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('returns fallback for empty diff', async () => {
    const result = await generateWipSummary('');
    expect(result.slug).toMatch(/^wip-\d{4}$/);
    expect(result.summary).toBe('Work in progress');
  });

  it('returns fallback when no AI tools available', async () => {
    setupExecaHandlers([
      {
        match: (cmd) => cmd === 'command',
        result: new Error('not found'),
      },
    ]);

    const result = await generateWipSummary('+ some diff content');
    expect(result.slug).toMatch(/^wip-\d{4}$/);
    expect(result.summary).toBe('Work in progress');
  });

  it('parses AI response when available', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'command' && args.includes('claude'),
        result: { stdout: '' },
      },
      {
        match: (cmd) => cmd === 'claude',
        result: { stdout: '{"slug": "fix-login-bug", "summary": "Fixed login validation"}' },
      },
    ]);

    const result = await generateWipSummary('+ some diff content');
    expect(result.slug).toBe('fix-login-bug');
    expect(result.summary).toBe('Fixed login validation');
  });

  it('truncates slug to 30 chars', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'command' && args.includes('claude'),
        result: { stdout: '' },
      },
      {
        match: (cmd) => cmd === 'claude',
        result: { stdout: '{"slug": "this-is-a-very-long-slug-name-that-exceeds-thirty-characters", "summary": "test"}' },
      },
    ]);

    const result = await generateWipSummary('+ diff');
    expect(result.slug.length).toBeLessThanOrEqual(30);
  });
});

describe('wipSave', () => {
  let tmpDir: string;
  let wipDir: string;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    tmpDir = await mkdtemp(join(tmpdir(), 'bufo-wip-test-'));
    wipDir = join(tmpDir, 'wip');
    await mkdir(wipDir, { recursive: true });
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  it('throws when tadpole directory does not exist', async () => {
    const project = makeProject({ tadpole_base: '/nonexistent' });

    await expect(wipSave(project, 1)).rejects.toThrow('Tadpole 1 does not exist');
  });

  it('reports no changes when working tree is clean', async () => {
    const tpDir = join(tmpDir, 'tp-1');
    await mkdir(tpDir, { recursive: true });
    const project = makeProject({ tadpole_base: tmpDir });
    const logSpy = vi.spyOn(console, 'log');

    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'git' && args.includes('diff') && args.includes('HEAD'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--cached'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--porcelain'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--show-current'),
        result: { stdout: 'tp-1' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--exclude-standard'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('fetch'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('rev-list'),
        result: { stdout: '0' },
      },
    ]);

    mockedGetWipDir.mockReturnValue(wipDir);

    await wipSave(project, 1);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('No changes to save'));
  });

  it('saves diff patches and metadata with custom name', async () => {
    const tpDir = join(tmpDir, 'tp-2');
    await mkdir(tpDir, { recursive: true });
    const project = makeProject({ tadpole_base: tmpDir });

    const testWipDir = join(wipDir, 'tp-2');
    mockedGetWipDir.mockReturnValue(testWipDir);

    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'git' && args[0] === 'diff' && args[1] === 'HEAD',
        result: { stdout: '--- a/file.ts\n+++ b/file.ts\n+hello' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--cached'),
        result: { stdout: '--- a/staged.ts\n+++ b/staged.ts\n+world' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--porcelain'),
        result: { stdout: 'M file.ts' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--show-current'),
        result: { stdout: 'feature-branch' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--exclude-standard'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('fetch'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('rev-list'),
        result: { stdout: '0' },
      },
    ]);

    await wipSave(project, 2, { name: 'My Test Save' });

    // Verify WIP directory was created
    const wipEntries = await readdir(testWipDir);
    expect(wipEntries.length).toBe(1);
    expect(wipEntries[0]).toContain('my-test-save');

    // Verify metadata
    const metaPath = join(testWipDir, wipEntries[0], 'metadata.json');
    const meta = JSON.parse(await readFile(metaPath, 'utf-8'));
    expect(meta.slug).toBe('my-test-save');
    expect(meta.summary).toBe('My Test Save');
    expect(meta.tadpole).toBe(2);
    expect(meta.branch).toBe('feature-branch');

    // Verify patches exist
    const patchDir = join(testWipDir, wipEntries[0]);
    const patchFiles = await readdir(patchDir);
    expect(patchFiles).toContain('main-unstaged.patch');
    expect(patchFiles).toContain('main-staged.patch');
    expect(patchFiles).toContain('main-status.txt');
  });

  it('saves untracked files', async () => {
    const tpDir = join(tmpDir, 'tp-3');
    await mkdir(tpDir, { recursive: true });
    await writeFile(join(tpDir, 'newfile.txt'), 'untracked content');

    const project = makeProject({ tadpole_base: tmpDir });
    const testWipDir = join(wipDir, 'tp-3');
    mockedGetWipDir.mockReturnValue(testWipDir);

    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'git' && args[0] === 'diff' && args[1] === 'HEAD',
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--cached'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--porcelain'),
        result: { stdout: '?? newfile.txt' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--show-current'),
        result: { stdout: 'tp-3' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--exclude-standard'),
        result: { stdout: 'newfile.txt' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('fetch'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('rev-list'),
        result: { stdout: '0' },
      },
      {
        match: (cmd) => cmd === 'command',
        result: new Error('not found'),
      },
    ]);

    await wipSave(project, 3);

    const wipEntries = await readdir(testWipDir);
    expect(wipEntries.length).toBe(1);

    const untrackedDir = join(testWipDir, wipEntries[0], 'untracked');
    const untrackedContent = await readFile(join(untrackedDir, 'newfile.txt'), 'utf-8');
    expect(untrackedContent).toBe('untracked content');
  });
});

describe('wipRestore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('restores from a specific wipPath', async () => {
    const tmpDir = await mkdtemp(join(tmpdir(), 'bufo-wip-restore-'));
    try {
      const tpDir = join(tmpDir, 'tp-1');
      await mkdir(tpDir, { recursive: true });

      const wipPath = join(tmpDir, 'wip', '20240101-120000-test-wip');
      await mkdir(wipPath, { recursive: true });
      await writeFile(join(wipPath, 'metadata.json'), JSON.stringify({
        timestamp: '20240101-120000',
        slug: 'test-wip',
        summary: 'Test WIP',
        tadpole: 1,
        branch: 'feature-x',
        commits_ahead: 0,
        created_at: '2024-01-01T12:00:00Z',
      }));

      const project = makeProject({ tadpole_base: tmpDir });

      setupExecaHandlers([
        {
          match: (cmd, args) => cmd === 'git' && args.includes('--show-current'),
          result: { stdout: 'main' },
        },
        {
          match: (cmd, args) => cmd === 'git' && args.includes('checkout'),
          result: { stdout: '' },
        },
      ]);

      await wipRestore(project, { wipPath, num: 1 });

      const checkoutCalls = mockedExeca.mock.calls.filter(
        (call) => Array.isArray(call[1]) && (call[1] as string[]).includes('checkout'),
      );
      expect(checkoutCalls.length).toBeGreaterThan(0);
    } finally {
      await rm(tmpDir, { recursive: true, force: true });
    }
  });

  it('prints WIP list when no wipPath given', async () => {
    const project = makeProject();
    const logSpy = vi.spyOn(console, 'log');

    mockedListAllWips.mockResolvedValue([
      {
        path: '/tmp/wip/20240101-test',
        metadata: {
          timestamp: '20240101-120000',
          slug: 'test-wip',
          summary: 'A test save',
          tadpole: 1,
          branch: 'tp-1',
          commits_ahead: 0,
          created_at: '2024-01-01T12:00:00Z',
        },
      },
    ]);

    await wipRestore(project, {});
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('WIP States'));
  });

  it('shows message when no WIPs exist globally', async () => {
    const project = makeProject();
    const logSpy = vi.spyOn(console, 'log');
    mockedListAllWips.mockResolvedValue([]);

    await wipRestore(project, { global: true });
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('No WIP states saved'));
  });

  it('throws when wipPath given but num cannot be determined', async () => {
    const project = makeProject();
    await expect(wipRestore(project, { wipPath: '/some/weird/path' }))
      .rejects.toThrow('Cannot determine target tadpole number');
  });
});

describe('wipContinue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('throws when no WIPs found', async () => {
    const project = makeProject();
    mockedListWips.mockResolvedValue([]);

    await expect(wipContinue(project, 1)).rejects.toThrow('No WIP states found for tadpole 1');
  });

  it('restores the most recent WIP', async () => {
    const tmpDir = await mkdtemp(join(tmpdir(), 'bufo-wip-continue-'));
    try {
      const tpDir = join(tmpDir, 'tp-1');
      await mkdir(tpDir, { recursive: true });

      const wipPath = join(tmpDir, 'wip', '20240102-130000-latest');
      await mkdir(wipPath, { recursive: true });
      await writeFile(join(wipPath, 'metadata.json'), JSON.stringify({
        timestamp: '20240102-130000',
        slug: 'latest',
        summary: 'Latest WIP',
        tadpole: 1,
        branch: 'tp-1',
        commits_ahead: 0,
        created_at: '2024-01-02T13:00:00Z',
      }));

      const project = makeProject({ tadpole_base: tmpDir });

      mockedListWips.mockResolvedValue([
        {
          path: wipPath,
          metadata: {
            timestamp: '20240102-130000',
            slug: 'latest',
            summary: 'Latest WIP',
            tadpole: 1,
            branch: 'tp-1',
            commits_ahead: 0,
            created_at: '2024-01-02T13:00:00Z',
          },
        },
      ]);

      setupExecaHandlers([
        {
          match: (cmd, args) => cmd === 'git' && args.includes('--show-current'),
          result: { stdout: 'tp-1' },
        },
      ]);

      const logSpy = vi.spyOn(console, 'log');
      await wipContinue(project, 1);

      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Restoring WIP: latest'));
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('WIP restored'));
    } finally {
      await rm(tmpDir, { recursive: true, force: true });
    }
  });
});

describe('wipResume', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('throws when no WIPs found', async () => {
    const project = makeProject();
    mockedListWips.mockResolvedValue([]);

    await expect(wipResume(project, 1)).rejects.toThrow('No WIP states found for tadpole 1');
  });

  it('selects the only WIP when there is just one and fzf unavailable', async () => {
    const tmpDir = await mkdtemp(join(tmpdir(), 'bufo-wip-resume-'));
    try {
      const tpDir = join(tmpDir, 'tp-1');
      await mkdir(tpDir, { recursive: true });

      const wipPath = join(tmpDir, 'wip', '20240101-single-wip');
      await mkdir(wipPath, { recursive: true });
      await writeFile(join(wipPath, 'metadata.json'), JSON.stringify({
        timestamp: '20240101-120000',
        slug: 'single-wip',
        summary: 'Only WIP',
        tadpole: 1,
        branch: 'tp-1',
        commits_ahead: 0,
        created_at: '2024-01-01T12:00:00Z',
      }));

      const project = makeProject({ tadpole_base: tmpDir });

      mockedListWips.mockResolvedValue([
        {
          path: wipPath,
          metadata: {
            timestamp: '20240101-120000',
            slug: 'single-wip',
            summary: 'Only WIP',
            tadpole: 1,
            branch: 'tp-1',
            commits_ahead: 0,
            created_at: '2024-01-01T12:00:00Z',
          },
        },
      ]);

      setupExecaHandlers([
        {
          match: (cmd) => cmd === 'command',
          result: new Error('fzf not found'),
        },
        {
          match: (cmd, args) => cmd === 'git' && args.includes('--show-current'),
          result: { stdout: 'tp-1' },
        },
      ]);

      const logSpy = vi.spyOn(console, 'log');
      await wipResume(project, 1);

      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Restoring WIP'));
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('WIP restored'));
    } finally {
      await rm(tmpDir, { recursive: true, force: true });
    }
  });
});

describe('restoreWip (via wipRestore with wipPath)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('applies staged and unstaged patches', async () => {
    const tmpDir = await mkdtemp(join(tmpdir(), 'bufo-wip-patches-'));
    try {
      const tpDir = join(tmpDir, 'tp-1');
      await mkdir(tpDir, { recursive: true });

      const wipPath = join(tmpDir, 'wip', '20240101-patches');
      await mkdir(wipPath, { recursive: true });
      await writeFile(join(wipPath, 'metadata.json'), JSON.stringify({
        timestamp: '20240101-120000',
        slug: 'patches',
        summary: 'Patches test',
        tadpole: 1,
        branch: 'tp-1',
        commits_ahead: 0,
        created_at: '2024-01-01T12:00:00Z',
      }));
      await writeFile(join(wipPath, 'main-staged.patch'), 'staged patch content');
      await writeFile(join(wipPath, 'main-unstaged.patch'), 'unstaged patch content');

      const project = makeProject({ tadpole_base: tmpDir });

      setupExecaHandlers([
        {
          match: (cmd, args) => cmd === 'git' && args.includes('--show-current'),
          result: { stdout: 'tp-1' },
        },
        {
          match: (cmd, args) => cmd === 'git' && args.includes('apply'),
          result: { stdout: '' },
        },
        {
          match: (cmd, args) => cmd === 'git' && args.includes('add'),
          result: { stdout: '' },
        },
      ]);

      const logSpy = vi.spyOn(console, 'log');
      await wipRestore(project, { wipPath, num: 1 });

      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Applying staged changes'));
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Applying unstaged changes'));

      const applyCalls = mockedExeca.mock.calls.filter(
        (call) => Array.isArray(call[1]) && (call[1] as string[]).includes('apply'),
      );
      expect(applyCalls.length).toBe(2);
    } finally {
      await rm(tmpDir, { recursive: true, force: true });
    }
  });

  it('restores untracked files from WIP', async () => {
    const tmpDir = await mkdtemp(join(tmpdir(), 'bufo-wip-untracked-'));
    try {
      const tpDir = join(tmpDir, 'tp-1');
      await mkdir(tpDir, { recursive: true });

      const wipPath = join(tmpDir, 'wip', '20240101-untracked');
      const untrackedDir = join(wipPath, 'untracked');
      await mkdir(join(untrackedDir, 'subdir'), { recursive: true });
      await writeFile(join(wipPath, 'metadata.json'), JSON.stringify({
        timestamp: '20240101-120000',
        slug: 'untracked',
        summary: 'Untracked test',
        tadpole: 1,
        branch: 'tp-1',
        commits_ahead: 0,
        created_at: '2024-01-01T12:00:00Z',
      }));
      await writeFile(join(untrackedDir, 'newfile.txt'), 'restored content');
      await writeFile(join(untrackedDir, 'subdir', 'nested.txt'), 'nested content');

      const project = makeProject({ tadpole_base: tmpDir });

      setupExecaHandlers([
        {
          match: (cmd, args) => cmd === 'git' && args.includes('--show-current'),
          result: { stdout: 'tp-1' },
        },
      ]);

      const logSpy = vi.spyOn(console, 'log');
      await wipRestore(project, { wipPath, num: 1 });

      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Restoring untracked files'));

      const restored = await readFile(join(tpDir, 'newfile.txt'), 'utf-8');
      expect(restored).toBe('restored content');
      const nested = await readFile(join(tpDir, 'subdir', 'nested.txt'), 'utf-8');
      expect(nested).toBe('nested content');
    } finally {
      await rm(tmpDir, { recursive: true, force: true });
    }
  });

  it('switches branch when metadata has different branch', async () => {
    const tmpDir = await mkdtemp(join(tmpdir(), 'bufo-wip-branch-'));
    try {
      const tpDir = join(tmpDir, 'tp-1');
      await mkdir(tpDir, { recursive: true });

      const wipPath = join(tmpDir, 'wip', '20240101-branch');
      await mkdir(wipPath, { recursive: true });
      await writeFile(join(wipPath, 'metadata.json'), JSON.stringify({
        timestamp: '20240101-120000',
        slug: 'branch',
        summary: 'Branch test',
        tadpole: 1,
        branch: 'feature-xyz',
        commits_ahead: 0,
        created_at: '2024-01-01T12:00:00Z',
      }));

      const project = makeProject({ tadpole_base: tmpDir });

      setupExecaHandlers([
        {
          match: (cmd, args) => cmd === 'git' && args.includes('--show-current'),
          result: { stdout: 'main' },
        },
        {
          match: (cmd, args) => cmd === 'git' && args.includes('checkout') && args.includes('feature-xyz'),
          result: { stdout: '' },
        },
      ]);

      const logSpy = vi.spyOn(console, 'log');
      await wipRestore(project, { wipPath, num: 1 });

      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Switching to branch feature-xyz'));
    } finally {
      await rm(tmpDir, { recursive: true, force: true });
    }
  });
});
