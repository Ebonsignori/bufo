import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { BufoProject } from '@bufo/core';

// Mock execa before importing
vi.mock('execa', () => ({
  execa: vi.fn(),
}));

// Mock fs/promises
vi.mock('fs/promises', () => ({
  readdir: vi.fn(),
  writeFile: vi.fn(),
  access: vi.fn(),
  mkdir: vi.fn(),
  rename: vi.fn(),
  unlink: vi.fn(),
}));

import {
  fetchPrMetadata,
  parsePrIdentifier,
  checkoutPrBranch,
  extractTicketFromBranch,
  extractLinearUrlFromBody,
  parseTicketIdentifier,
  findTadpoleForBranch,
  findUnlockedTadpole,
  findNextTadpole,
  writeWorkspaceMeta,
  setTadpoleName,
  buildPrPrompt,
  handlePr,
  handleWsPr,
} from '../src/commands/pr.js';
import { execa } from 'execa';
import { readdir, writeFile, access, mkdir, rename, unlink } from 'fs/promises';

const mockedExeca = vi.mocked(execa);
const mockedReaddir = vi.mocked(readdir);
const mockedWriteFile = vi.mocked(writeFile);
const mockedAccess = vi.mocked(access);
const mockedMkdir = vi.mocked(mkdir);
const mockedRename = vi.mocked(rename);
const mockedUnlink = vi.mocked(unlink);

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
    throw new Error(`Unexpected execa call: ${cmdStr} ${argsArr.join(' ')}`);
  });
}

// ---------------------------------------------------------------------------
// parsePrIdentifier
// ---------------------------------------------------------------------------

describe('parsePrIdentifier', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('parses full GitHub URL', async () => {
    const result = await parsePrIdentifier('https://github.com/acme/widgets/pull/42');
    expect(result).toEqual({ owner: 'acme', repo: 'widgets', number: 42 });
  });

  it('parses repo#number format', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'git' && args.includes('get-url'),
        result: { stdout: 'git@github.com:myorg/myrepo.git' },
      },
    ]);

    const result = await parsePrIdentifier('widgets#99');
    expect(result).toEqual({ owner: 'myorg', repo: 'widgets', number: 99 });
  });

  it('parses bare number using mainRepo', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'git' && args.includes('get-url'),
        result: { stdout: 'https://github.com/acme/widgets.git' },
      },
    ]);

    const result = await parsePrIdentifier('123', '/some/repo');
    expect(result).toEqual({ owner: 'acme', repo: 'widgets', number: 123 });
  });

  it('throws on bare number without mainRepo', async () => {
    await expect(parsePrIdentifier('123')).rejects.toThrow('Cannot resolve bare PR number');
  });

  it('throws on unrecognized format', async () => {
    await expect(parsePrIdentifier('not-a-pr')).rejects.toThrow('Could not parse PR identifier');
  });
});

// ---------------------------------------------------------------------------
// fetchPrMetadata
// ---------------------------------------------------------------------------

describe('fetchPrMetadata', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches PR metadata via gh CLI', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'gh' && args.includes('--version'),
        result: { stdout: 'gh version 2.0.0' },
      },
      {
        match: (cmd, args) => cmd === 'gh' && args.includes('title,headRefName,url'),
        result: {
          stdout: JSON.stringify({
            title: 'Fix bug',
            headRefName: 'fix/ENG-123-bug',
            url: 'https://github.com/acme/widgets/pull/42',
          }),
        },
      },
      {
        match: (cmd, args) => cmd === 'gh' && args.some(a => a === 'body') && args.includes('--jq'),
        result: { stdout: 'PR body text' },
      },
      {
        match: (cmd, args) => cmd === 'gh' && args.some(a => a === 'comments') && args.includes('--jq'),
        result: { stdout: 'comment text' },
      },
    ]);

    const result = await fetchPrMetadata('acme', 'widgets', 42);
    expect(result).toEqual({
      branch: 'fix/ENG-123-bug',
      title: 'Fix bug',
      url: 'https://github.com/acme/widgets/pull/42',
      body: 'PR body text',
      comments: 'comment text',
    });
  });

  it('throws when gh is not installed', async () => {
    setupExecaHandlers([
      {
        match: (cmd) => cmd === 'gh',
        result: new Error('not found'),
      },
    ]);

    await expect(fetchPrMetadata('acme', 'widgets', 42)).rejects.toThrow('gh CLI required');
  });

  it('throws when PR is not found', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'gh' && args.includes('--version'),
        result: { stdout: 'gh version 2.0.0' },
      },
      {
        match: (cmd, args) => cmd === 'gh' && args.includes('title,headRefName,url'),
        result: new Error('not found'),
      },
    ]);

    await expect(fetchPrMetadata('acme', 'widgets', 999)).rejects.toThrow('Could not fetch PR #999');
  });
});

// ---------------------------------------------------------------------------
// extractTicketFromBranch
// ---------------------------------------------------------------------------

describe('extractTicketFromBranch', () => {
  it('extracts ticket from branch with prefix', () => {
    expect(extractTicketFromBranch('user/ENG-123-fix-bug')).toBe('ENG-123');
  });

  it('extracts ticket from simple branch', () => {
    expect(extractTicketFromBranch('eng-456')).toBe('ENG-456');
  });

  it('returns undefined for branch without ticket', () => {
    expect(extractTicketFromBranch('main')).toBeUndefined();
  });

  it('uppercases the ticket ID', () => {
    expect(extractTicketFromBranch('fix/proj-99-thing')).toBe('PROJ-99');
  });
});

// ---------------------------------------------------------------------------
// extractLinearUrlFromBody
// ---------------------------------------------------------------------------

describe('extractLinearUrlFromBody', () => {
  it('extracts Linear URL from text', () => {
    const body = 'See https://linear.app/acme/issue/ENG-123/fix-bug for details';
    expect(extractLinearUrlFromBody(body)).toBe(
      'https://linear.app/acme/issue/ENG-123/fix-bug',
    );
  });

  it('returns undefined when no URL found', () => {
    expect(extractLinearUrlFromBody('no link here')).toBeUndefined();
  });

  it('extracts URL from HTML context', () => {
    const body = 'Link: <a href="https://linear.app/team/issue/PROJ-42/title">ticket</a>';
    expect(extractLinearUrlFromBody(body)).toBe(
      'https://linear.app/team/issue/PROJ-42/title',
    );
  });
});

// ---------------------------------------------------------------------------
// parseTicketIdentifier
// ---------------------------------------------------------------------------

describe('parseTicketIdentifier', () => {
  it('parses Linear URL', () => {
    expect(parseTicketIdentifier('https://linear.app/acme/issue/ENG-123/slug')).toBe('ENG-123');
  });

  it('parses GitHub issue URL', () => {
    expect(parseTicketIdentifier('https://github.com/acme/repo/issues/42')).toBe('#42');
  });

  it('passes through plain ID', () => {
    expect(parseTicketIdentifier('ENG-123')).toBe('ENG-123');
  });

  it('returns undefined for empty string', () => {
    expect(parseTicketIdentifier('')).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// findTadpoleForBranch
// ---------------------------------------------------------------------------

describe('findTadpoleForBranch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns tadpole number when branch matches', async () => {
    mockedReaddir.mockResolvedValue(['tp-1', 'tp-2', 'tp-3'] as any);
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--show-current') && args.some(a => a.includes('tp-1')),
        result: { stdout: 'main' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--show-current') && args.some(a => a.includes('tp-2')),
        result: { stdout: 'feature-branch' },
      },
    ]);

    const project = makeProject();
    const result = await findTadpoleForBranch(project, 'feature-branch');
    expect(result).toBe(2);
  });

  it('returns undefined when no branch matches', async () => {
    mockedReaddir.mockResolvedValue(['tp-1'] as any);
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--show-current'),
        result: { stdout: 'main' },
      },
    ]);

    const project = makeProject();
    const result = await findTadpoleForBranch(project, 'other-branch');
    expect(result).toBeUndefined();
  });

  it('returns undefined when directory does not exist', async () => {
    mockedReaddir.mockRejectedValue(new Error('ENOENT'));

    const project = makeProject();
    const result = await findTadpoleForBranch(project, 'any-branch');
    expect(result).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// findUnlockedTadpole
// ---------------------------------------------------------------------------

describe('findUnlockedTadpole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns first unlocked tadpole', async () => {
    mockedReaddir.mockResolvedValue(['tp-1', 'tp-2', 'tp-3'] as any);
    mockedAccess.mockImplementation(async (path: any) => {
      if (typeof path === 'string' && path.includes('tp-1')) return undefined;
      if (typeof path === 'string' && path.includes('tp-2')) throw new Error('ENOENT');
      throw new Error('ENOENT');
    });

    const project = makeProject();
    const result = await findUnlockedTadpole(project);
    expect(result).toBe(2);
  });

  it('returns undefined when all tadpoles are locked', async () => {
    mockedReaddir.mockResolvedValue(['tp-1'] as any);
    mockedAccess.mockResolvedValue(undefined);

    const project = makeProject();
    const result = await findUnlockedTadpole(project);
    expect(result).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// findNextTadpole
// ---------------------------------------------------------------------------

describe('findNextTadpole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns first available slot', async () => {
    mockedMkdir.mockResolvedValue(undefined);
    mockedAccess.mockImplementation(async (path: any) => {
      const p = String(path);
      if (p.includes('tp-1') || p.includes('tp-2')) return undefined;
      throw new Error('ENOENT');
    });

    const project = makeProject();
    const result = await findNextTadpole(project);
    expect(result).toBe(3);
  });

  it('returns 1 when no tadpoles exist', async () => {
    mockedMkdir.mockResolvedValue(undefined);
    mockedAccess.mockRejectedValue(new Error('ENOENT'));

    const project = makeProject();
    const result = await findNextTadpole(project);
    expect(result).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// writeWorkspaceMeta
// ---------------------------------------------------------------------------

describe('writeWorkspaceMeta', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('writes meta atomically (tmp + rename)', async () => {
    mockedWriteFile.mockResolvedValue(undefined);
    mockedRename.mockResolvedValue(undefined);

    await writeWorkspaceMeta('/tmp/tp-1', { type: 'pr', name: 'branch', pr_number: '42' });

    expect(mockedWriteFile).toHaveBeenCalledTimes(1);
    const writtenPath = mockedWriteFile.mock.calls[0][0] as string;
    expect(writtenPath).toContain('.bufo-meta.tmp.');

    expect(mockedRename).toHaveBeenCalledTimes(1);
    expect(mockedRename.mock.calls[0][1]).toBe('/tmp/tp-1/.bufo-meta');
  });

  it('writes correct JSON content', async () => {
    mockedWriteFile.mockResolvedValue(undefined);
    mockedRename.mockResolvedValue(undefined);

    const meta = { type: 'pr' as const, name: 'fix-branch', pr_number: '7', pr_url: 'https://example.com' };
    await writeWorkspaceMeta('/tmp/tp-1', meta);

    const content = mockedWriteFile.mock.calls[0][1] as string;
    const parsed = JSON.parse(content);
    expect(parsed.type).toBe('pr');
    expect(parsed.name).toBe('fix-branch');
    expect(parsed.pr_number).toBe('7');
  });
});

// ---------------------------------------------------------------------------
// setTadpoleName
// ---------------------------------------------------------------------------

describe('setTadpoleName', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('writes name atomically', async () => {
    mockedWriteFile.mockResolvedValue(undefined);
    mockedRename.mockResolvedValue(undefined);

    await setTadpoleName('/tmp/tp-1', 'my-branch');

    expect(mockedWriteFile).toHaveBeenCalledTimes(1);
    const writtenPath = mockedWriteFile.mock.calls[0][0] as string;
    expect(writtenPath).toContain('.bufo-name.tmp.');

    const content = mockedWriteFile.mock.calls[0][1] as string;
    expect(content).toBe('my-branch\n');

    expect(mockedRename).toHaveBeenCalledTimes(1);
    expect(mockedRename.mock.calls[0][1]).toBe('/tmp/tp-1/.bufo-name');
  });
});

// ---------------------------------------------------------------------------
// buildPrPrompt
// ---------------------------------------------------------------------------

describe('buildPrPrompt', () => {
  it('substitutes all placeholders', () => {
    const prompt = buildPrPrompt(42, 'Fix bug', 'https://example.com/pull/42', 'acme/repo', 'fix-branch');
    expect(prompt).toContain('PR #42');
    expect(prompt).toContain('Fix bug');
    expect(prompt).toContain('https://example.com/pull/42');
    expect(prompt).toContain('acme/repo');
    expect(prompt).toContain('fix-branch');
    // Number should appear in gh commands too
    expect(prompt).toContain('gh pr diff 42');
    expect(prompt).toContain('gh pr view 42');
  });
});

// ---------------------------------------------------------------------------
// checkoutPrBranch
// ---------------------------------------------------------------------------

describe('checkoutPrBranch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('succeeds with gh pr checkout', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'gh' && args.includes('checkout'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--show-current'),
        result: { stdout: 'feature-branch' },
      },
    ]);

    const result = await checkoutPrBranch('/tmp/tp-1', 'feature-branch', 'acme', 'repo', 42);
    expect(result.status).toBe('ok');
  });

  it('falls back to git checkout when gh fails', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'gh' && args.includes('checkout'),
        result: new Error('gh checkout failed'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('fetch'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('checkout') && !args.includes('-b'),
        result: { stdout: '' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--show-current'),
        result: { stdout: 'feature-branch' },
      },
    ]);

    const result = await checkoutPrBranch('/tmp/tp-1', 'feature-branch', 'acme', 'repo', 42);
    expect(result.status).toBe('ok');
  });

  it('returns existing when branch is in another tadpole worktree', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'gh' && args.includes('checkout'),
        result: new Error('failed'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('fetch'),
        result: new Error('failed'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('checkout') && !args.includes('--porcelain'),
        result: new Error('already checked out'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--porcelain'),
        result: {
          stdout: [
            'worktree /tmp/test-tadpoles/tp-5',
            'HEAD abc1234',
            'branch refs/heads/feature-branch',
            '',
          ].join('\n'),
        },
      },
    ]);

    const result = await checkoutPrBranch('/tmp/tp-1', 'feature-branch', 'acme', 'repo', 42, 'tp');
    expect(result.status).toBe('existing');
    expect(result.existingTp).toBe(5);
  });

  it('throws when all checkout attempts fail', async () => {
    setupExecaHandlers([
      {
        match: (cmd, args) => cmd === 'gh',
        result: new Error('failed'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('fetch'),
        result: new Error('failed'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('checkout'),
        result: new Error('failed'),
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--porcelain'),
        result: { stdout: '' },
      },
    ]);

    await expect(
      checkoutPrBranch('/tmp/tp-1', 'nonexistent-branch', 'acme', 'repo', 42),
    ).rejects.toThrow('Failed to checkout PR branch');
  });
});

// ---------------------------------------------------------------------------
// handlePr
// ---------------------------------------------------------------------------

describe('handlePr', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('throws when no identifier is given', async () => {
    const project = makeProject();
    await expect(handlePr(project, '')).rejects.toThrow('PR identifier required');
  });

  it('reuses existing tadpole on same branch', async () => {
    // readdir returns tadpoles
    mockedReaddir.mockResolvedValue(['tp-1', 'tp-2'] as any);
    mockedWriteFile.mockResolvedValue(undefined);
    mockedRename.mockResolvedValue(undefined);

    setupExecaHandlers([
      // gh --version
      {
        match: (cmd, args) => cmd === 'gh' && args.includes('--version'),
        result: { stdout: 'gh version 2.0.0' },
      },
      // gh pr view (JSON)
      {
        match: (cmd, args) => cmd === 'gh' && args.includes('title,headRefName,url'),
        result: {
          stdout: JSON.stringify({
            title: 'Fix it',
            headRefName: 'fix-branch',
            url: 'https://github.com/acme/repo/pull/42',
          }),
        },
      },
      // gh pr view (body)
      {
        match: (cmd, args) => cmd === 'gh' && args.some(a => a === 'body') && args.includes('--jq'),
        result: { stdout: '' },
      },
      // gh pr view (comments)
      {
        match: (cmd, args) => cmd === 'gh' && args.some(a => a === 'comments') && args.includes('--jq'),
        result: { stdout: '' },
      },
      // findTadpoleForBranch: tp-1 is on main, tp-2 is on fix-branch
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--show-current') && args.some(a => a.includes('tp-1')),
        result: { stdout: 'main' },
      },
      {
        match: (cmd, args) => cmd === 'git' && args.includes('--show-current') && args.some(a => a.includes('tp-2')),
        result: { stdout: 'fix-branch' },
      },
      // bufo open
      {
        match: (cmd, args) => cmd === 'bufo' && args.includes('open'),
        result: { stdout: '' },
      },
    ]);

    const project = makeProject();
    await handlePr(project, 'https://github.com/acme/repo/pull/42');

    // Should have called bufo open with tadpole 2
    const bufoCalls = mockedExeca.mock.calls.filter(
      (call) => call[0] === 'bufo',
    );
    expect(bufoCalls.length).toBe(1);
    expect((bufoCalls[0][1] as string[])).toContain('2');
  });
});

// ---------------------------------------------------------------------------
// handleWsPr
// ---------------------------------------------------------------------------

describe('handleWsPr', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('throws when no identifier is given', async () => {
    const project = makeProject();
    await expect(handleWsPr(project, 1, '')).rejects.toThrow('PR identifier required');
  });
});
