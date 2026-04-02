import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  existsSync,
  readFileSync,
  rmSync,
  symlinkSync,
} from 'node:fs';
import { join } from 'node:path';
import { tmpdir, homedir } from 'node:os';
import type { BufoProject } from '@bufo/core';

// Mock execa before any import of companions
vi.mock('execa', () => ({
  execa: vi.fn(),
}));

import {
  loadCompanionsConfig,
  getCompanionsBase,
  setupCompanions,
  syncAllCompanions,
  fetchCompanions,
} from '../src/companions.js';
import { execa } from 'execa';

const mockedExeca = vi.mocked(execa);

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

let tmpBase: string;

beforeEach(() => {
  tmpBase = mkdtempSync(join(tmpdir(), 'bufo-companions-test-'));
  vi.clearAllMocks();
  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  rmSync(tmpBase, { recursive: true, force: true });
});

function makeProject(overrides: Partial<BufoProject> = {}): BufoProject {
  return {
    alias: 'test',
    session_name: 'test-session',
    tadpole_base: tmpBase,
    main_repo: tmpBase,
    tadpoles: {
      count: 5,
      prefix: 'tp',
      branch_pattern: 'tp-{N}',
    },
    ...overrides,
  };
}

/** Write a YAML config file and return the project with config_file set. */
function makeProjectWithConfig(
  yamlContent: string,
  overrides: Partial<BufoProject> = {},
): BufoProject {
  const configPath = join(tmpBase, 'project.yaml');
  writeFileSync(configPath, yamlContent, 'utf-8');
  return makeProject({ config_file: configPath, ...overrides });
}

/** Create a fake tadpole directory with a .git/info/exclude. */
function makeTadpoleDir(num: number): string {
  const dir = join(tmpBase, `tp-${num}`);
  mkdirSync(join(dir, '.git', 'info'), { recursive: true });
  writeFileSync(join(dir, '.git', 'info', 'exclude'), '# git exclude\n', 'utf-8');
  return dir;
}

/** Create a fake companion repo directory (simulates a cloned repo). */
function makeCompanionDir(base: string, name: string): string {
  const dir = join(base, name);
  mkdirSync(dir, { recursive: true });
  return dir;
}

// ---------------------------------------------------------------------------
// loadCompanionsConfig
// ---------------------------------------------------------------------------

describe('loadCompanionsConfig', () => {
  it('returns null when config_file is undefined', () => {
    const project = makeProject();
    expect(loadCompanionsConfig(project)).toBeNull();
  });

  it('returns null when config_file does not exist', () => {
    const project = makeProject({ config_file: join(tmpBase, 'nonexistent.yaml') });
    expect(loadCompanionsConfig(project)).toBeNull();
  });

  it('returns null when companions block is absent', () => {
    const project = makeProjectWithConfig('session_name: test\n');
    expect(loadCompanionsConfig(project)).toBeNull();
  });

  it('returns null when companions.repos is empty', () => {
    const project = makeProjectWithConfig('companions:\n  repos: []\n');
    expect(loadCompanionsConfig(project)).toBeNull();
  });

  it('returns config with repos', () => {
    const project = makeProjectWithConfig(
      `companions:
  base: ~/companions
  repos:
    - name: my-shared-lib
      remote: git@github.com:org/my-shared-lib.git
      link_as: shared-lib
`,
    );
    const config = loadCompanionsConfig(project);
    expect(config).not.toBeNull();
    expect(config!.base).toBe('~/companions');
    expect(config!.repos).toHaveLength(1);
    expect(config!.repos[0].name).toBe('my-shared-lib');
    expect(config!.repos[0].remote).toBe('git@github.com:org/my-shared-lib.git');
    expect(config!.repos[0].link_as).toBe('shared-lib');
  });

  it('returns config when link_as and remote are absent (minimal)', () => {
    const project = makeProjectWithConfig(
      `companions:
  repos:
    - name: tools
`,
    );
    const config = loadCompanionsConfig(project);
    expect(config).not.toBeNull();
    expect(config!.base).toBeUndefined();
    expect(config!.repos[0].name).toBe('tools');
    expect(config!.repos[0].remote).toBeUndefined();
    expect(config!.repos[0].link_as).toBeUndefined();
  });

  it('skips repos without a name', () => {
    const project = makeProjectWithConfig(
      `companions:
  repos:
    - remote: git@github.com:org/unnamed.git
    - name: good-repo
`,
    );
    const config = loadCompanionsConfig(project);
    expect(config).not.toBeNull();
    expect(config!.repos).toHaveLength(1);
    expect(config!.repos[0].name).toBe('good-repo');
  });

  it('returns null for malformed YAML', () => {
    const configPath = join(tmpBase, 'bad.yaml');
    writeFileSync(configPath, '{ invalid yaml ]: oops\n', 'utf-8');
    const project = makeProject({ config_file: configPath });
    expect(loadCompanionsConfig(project)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// getCompanionsBase
// ---------------------------------------------------------------------------

describe('getCompanionsBase', () => {
  it('uses companions.base when set (no tilde)', () => {
    const project = makeProject();
    const base = join(tmpBase, 'companions');
    const config = { base, repos: [] };
    expect(getCompanionsBase(project, config)).toBe(base);
  });

  it('expands ~ in companions.base', () => {
    const project = makeProject();
    const config = { base: '~/my-companions', repos: [] };
    expect(getCompanionsBase(project, config)).toBe(join(homedir(), 'my-companions'));
  });

  it('expands ~ alone in companions.base', () => {
    const project = makeProject();
    const config = { base: '~', repos: [] };
    expect(getCompanionsBase(project, config)).toBe(homedir());
  });

  it('falls back to project.tadpole_base when base is absent', () => {
    const project = makeProject({ tadpole_base: tmpBase });
    const config = { repos: [] };
    expect(getCompanionsBase(project, config)).toBe(tmpBase);
  });

  it('expands ~ in tadpole_base when base is absent', () => {
    const project = makeProject({ tadpole_base: '~/worktrees' });
    const config = { repos: [] };
    expect(getCompanionsBase(project, config)).toBe(join(homedir(), 'worktrees'));
  });
});

// ---------------------------------------------------------------------------
// setupCompanions
// ---------------------------------------------------------------------------

describe('setupCompanions', () => {
  it('no-ops when no companions configured', async () => {
    const project = makeProject(); // no config_file
    const tpDir = makeTadpoleDir(1);
    await setupCompanions(project, tpDir);
    // No execa calls, no symlinks created
    expect(mockedExeca).not.toHaveBeenCalled();
  });

  it('creates symlink when companion dir already exists', async () => {
    const companionBase = join(tmpBase, 'companions');
    mkdirSync(companionBase, { recursive: true });
    const companionDir = makeCompanionDir(companionBase, 'my-lib');

    const project = makeProjectWithConfig(
      `companions:
  base: ${companionBase}
  repos:
    - name: my-lib
      remote: git@github.com:org/my-lib.git
`,
    );
    const tpDir = makeTadpoleDir(1);

    await setupCompanions(project, tpDir);

    const linkPath = join(tpDir, 'my-lib');
    expect(existsSync(linkPath)).toBe(true);

    // Should be a symlink pointing to the companion dir
    const { lstatSync, readlinkSync } = await import('node:fs');
    expect(lstatSync(linkPath).isSymbolicLink()).toBe(true);
    expect(readlinkSync(linkPath)).toBe(companionDir);

    // Should not have cloned anything
    expect(mockedExeca).not.toHaveBeenCalledWith(
      'git',
      expect.arrayContaining(['clone']),
      expect.anything(),
    );
  });

  it('uses link_as as the symlink name', async () => {
    const companionBase = join(tmpBase, 'companions');
    mkdirSync(companionBase, { recursive: true });
    makeCompanionDir(companionBase, 'my-lib');

    const project = makeProjectWithConfig(
      `companions:
  base: ${companionBase}
  repos:
    - name: my-lib
      link_as: shared-lib
`,
    );
    const tpDir = makeTadpoleDir(1);

    await setupCompanions(project, tpDir);

    expect(existsSync(join(tpDir, 'shared-lib'))).toBe(true);
    expect(existsSync(join(tpDir, 'my-lib'))).toBe(false);
  });

  it('skips when no remote and companion dir absent', async () => {
    const companionBase = join(tmpBase, 'companions');
    mkdirSync(companionBase, { recursive: true });
    // companion dir NOT created

    const project = makeProjectWithConfig(
      `companions:
  base: ${companionBase}
  repos:
    - name: missing-lib
`,
    );
    const tpDir = makeTadpoleDir(1);

    await setupCompanions(project, tpDir);

    expect(existsSync(join(tpDir, 'missing-lib'))).toBe(false);
    expect(mockedExeca).not.toHaveBeenCalled();
  });

  it('clones when remote is set and companion dir absent', async () => {
    const companionBase = join(tmpBase, 'companions');
    mkdirSync(companionBase, { recursive: true });
    const companionDir = join(companionBase, 'new-lib');

    // Mock execa: git clone creates the directory
    mockedExeca.mockImplementation(async (cmd: unknown, args: unknown) => {
      const a = args as string[];
      if (cmd === 'git' && a[0] === 'clone') {
        // Simulate the clone by creating the directory
        mkdirSync(companionDir, { recursive: true });
        return { stdout: '', stderr: '', exitCode: 0 } as ReturnType<typeof execa> extends Promise<infer R> ? R : never;
      }
      return { stdout: '', stderr: '', exitCode: 0 } as ReturnType<typeof execa> extends Promise<infer R> ? R : never;
    });

    const project = makeProjectWithConfig(
      `companions:
  base: ${companionBase}
  repos:
    - name: new-lib
      remote: git@github.com:org/new-lib.git
`,
    );
    const tpDir = makeTadpoleDir(1);

    await setupCompanions(project, tpDir);

    expect(mockedExeca).toHaveBeenCalledWith(
      'git',
      ['clone', '--filter=blob:none', 'git@github.com:org/new-lib.git', companionDir],
    );
    // After clone, symlink should exist
    const linkPath = join(tpDir, 'new-lib');
    expect(existsSync(linkPath)).toBe(true);
  });

  it('adds entry to .git/info/exclude', async () => {
    const companionBase = join(tmpBase, 'companions');
    mkdirSync(companionBase, { recursive: true });
    makeCompanionDir(companionBase, 'my-lib');

    const project = makeProjectWithConfig(
      `companions:
  base: ${companionBase}
  repos:
    - name: my-lib
`,
    );
    const tpDir = makeTadpoleDir(1);

    await setupCompanions(project, tpDir);

    const excludeContent = readFileSync(join(tpDir, '.git', 'info', 'exclude'), 'utf-8');
    expect(excludeContent).toContain('my-lib');
    expect(excludeContent).toContain('# Companion repo symlink (bufo)');
  });

  it('is idempotent — second call no-ops', async () => {
    const companionBase = join(tmpBase, 'companions');
    mkdirSync(companionBase, { recursive: true });
    const companionDir = makeCompanionDir(companionBase, 'my-lib');

    const project = makeProjectWithConfig(
      `companions:
  base: ${companionBase}
  repos:
    - name: my-lib
`,
    );
    const tpDir = makeTadpoleDir(1);

    await setupCompanions(project, tpDir);
    await setupCompanions(project, tpDir); // second call

    // Symlink should still point correctly
    const { readlinkSync } = await import('node:fs');
    expect(readlinkSync(join(tpDir, 'my-lib'))).toBe(companionDir);

    // exclude should not have duplicate entries
    const excludeContent = readFileSync(join(tpDir, '.git', 'info', 'exclude'), 'utf-8');
    const matches = excludeContent.split('\n').filter((l) => l.trim() === 'my-lib');
    expect(matches.length).toBe(1);
  });

  it('replaces stale symlink pointing to wrong target', async () => {
    const companionBase = join(tmpBase, 'companions');
    mkdirSync(companionBase, { recursive: true });
    const companionDir = makeCompanionDir(companionBase, 'my-lib');

    const project = makeProjectWithConfig(
      `companions:
  base: ${companionBase}
  repos:
    - name: my-lib
`,
    );
    const tpDir = makeTadpoleDir(1);

    // Create a stale symlink pointing somewhere else
    const staleTarget = join(tmpBase, 'old-location');
    mkdirSync(staleTarget, { recursive: true });
    symlinkSync(staleTarget, join(tpDir, 'my-lib'));

    await setupCompanions(project, tpDir);

    const { readlinkSync } = await import('node:fs');
    expect(readlinkSync(join(tpDir, 'my-lib'))).toBe(companionDir);
  });

  it('does not replace real directory without --force', async () => {
    const companionBase = join(tmpBase, 'companions');
    mkdirSync(companionBase, { recursive: true });
    makeCompanionDir(companionBase, 'my-lib');

    const project = makeProjectWithConfig(
      `companions:
  base: ${companionBase}
  repos:
    - name: my-lib
`,
    );
    const tpDir = makeTadpoleDir(1);

    // Create a real directory at the link path
    mkdirSync(join(tpDir, 'my-lib'), { recursive: true });

    await setupCompanions(project, tpDir, false);

    // Should still be a real directory
    const { lstatSync } = await import('node:fs');
    expect(lstatSync(join(tpDir, 'my-lib')).isDirectory()).toBe(true);
    expect(lstatSync(join(tpDir, 'my-lib')).isSymbolicLink()).toBe(false);
  });

  it('replaces real directory with --force', async () => {
    const companionBase = join(tmpBase, 'companions');
    mkdirSync(companionBase, { recursive: true });
    const companionDir = makeCompanionDir(companionBase, 'my-lib');

    const project = makeProjectWithConfig(
      `companions:
  base: ${companionBase}
  repos:
    - name: my-lib
`,
    );
    const tpDir = makeTadpoleDir(1);

    // Create a real directory at the link path
    mkdirSync(join(tpDir, 'my-lib'), { recursive: true });

    await setupCompanions(project, tpDir, true);

    const { lstatSync, readlinkSync } = await import('node:fs');
    expect(lstatSync(join(tpDir, 'my-lib')).isSymbolicLink()).toBe(true);
    expect(readlinkSync(join(tpDir, 'my-lib'))).toBe(companionDir);
  });
});

// ---------------------------------------------------------------------------
// syncAllCompanions
// ---------------------------------------------------------------------------

describe('syncAllCompanions', () => {
  it('prints message when no companions configured', async () => {
    const project = makeProject(); // no config_file
    await syncAllCompanions(project);
    expect(vi.mocked(console.log)).toHaveBeenCalledWith(
      expect.stringContaining('No companions configured'),
    );
  });

  it('symlinks into all PREFIX-N dirs that have .git', async () => {
    const companionBase = join(tmpBase, 'companions');
    mkdirSync(companionBase, { recursive: true });
    makeCompanionDir(companionBase, 'tools');

    // Reuse tmpBase as tadpole_base and make tadpole dirs inside it
    const tpBase = join(tmpBase, 'worktrees');
    mkdirSync(tpBase, { recursive: true });

    // Create two tadpole dirs with .git
    const tp1 = join(tpBase, 'tp-1');
    const tp2 = join(tpBase, 'tp-2');
    mkdirSync(join(tp1, '.git', 'info'), { recursive: true });
    mkdirSync(join(tp2, '.git', 'info'), { recursive: true });
    writeFileSync(join(tp1, '.git', 'info', 'exclude'), '');
    writeFileSync(join(tp2, '.git', 'info', 'exclude'), '');

    // Also create a dir WITHOUT .git — should be skipped
    const notTp = join(tpBase, 'tp-3');
    mkdirSync(notTp, { recursive: true });

    const project = makeProjectWithConfig(
      `companions:
  base: ${companionBase}
  repos:
    - name: tools
`,
      { tadpole_base: tpBase },
    );

    await syncAllCompanions(project);

    const { lstatSync } = await import('node:fs');
    expect(lstatSync(join(tp1, 'tools')).isSymbolicLink()).toBe(true);
    expect(lstatSync(join(tp2, 'tools')).isSymbolicLink()).toBe(true);
    expect(existsSync(join(notTp, 'tools'))).toBe(false);
  });

  it('reports count of synced tadpoles', async () => {
    const companionBase = join(tmpBase, 'companions');
    mkdirSync(companionBase, { recursive: true });
    makeCompanionDir(companionBase, 'tools');

    const tpBase = join(tmpBase, 'worktrees');
    mkdirSync(tpBase, { recursive: true });
    const tp1 = join(tpBase, 'tp-1');
    mkdirSync(join(tp1, '.git', 'info'), { recursive: true });
    writeFileSync(join(tp1, '.git', 'info', 'exclude'), '');

    const project = makeProjectWithConfig(
      `companions:
  base: ${companionBase}
  repos:
    - name: tools
`,
      { tadpole_base: tpBase },
    );

    await syncAllCompanions(project);

    const logCalls = vi.mocked(console.log).mock.calls.map((c) => c[0] as string);
    expect(logCalls.some((l) => l.includes('1 tadpole'))).toBe(true);
  });

  it('reports "No workspaces found" when base is empty', async () => {
    const companionBase = join(tmpBase, 'companions');
    mkdirSync(companionBase, { recursive: true });

    const tpBase = join(tmpBase, 'empty-worktrees');
    mkdirSync(tpBase, { recursive: true });

    const project = makeProjectWithConfig(
      `companions:
  base: ${companionBase}
  repos:
    - name: tools
`,
      { tadpole_base: tpBase },
    );

    await syncAllCompanions(project);

    const logCalls = vi.mocked(console.log).mock.calls.map((c) => c[0] as string);
    expect(logCalls.some((l) => l.includes('No workspaces found'))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// fetchCompanions
// ---------------------------------------------------------------------------

describe('fetchCompanions', () => {
  it('prints message when no companions configured', async () => {
    const project = makeProject();
    await fetchCompanions(project);
    expect(vi.mocked(console.log)).toHaveBeenCalledWith(
      expect.stringContaining('No companions configured'),
    );
    expect(mockedExeca).not.toHaveBeenCalled();
  });

  it('skips missing companion dirs gracefully', async () => {
    const companionBase = join(tmpBase, 'companions');
    mkdirSync(companionBase, { recursive: true });
    // Do NOT create the companion dir

    const project = makeProjectWithConfig(
      `companions:
  base: ${companionBase}
  repos:
    - name: missing-lib
      remote: git@github.com:org/missing-lib.git
`,
    );

    await fetchCompanions(project);

    expect(mockedExeca).not.toHaveBeenCalled();
    const logCalls = vi.mocked(console.log).mock.calls.map((c) => c[0] as string);
    expect(logCalls.some((l) => l.includes('not cloned'))).toBe(true);
  });

  it('calls git fetch for each cloned companion', async () => {
    const companionBase = join(tmpBase, 'companions');
    mkdirSync(companionBase, { recursive: true });
    const lib1 = makeCompanionDir(companionBase, 'lib1');
    const lib2 = makeCompanionDir(companionBase, 'lib2');

    mockedExeca.mockResolvedValue({
      stdout: '',
      stderr: '',
      exitCode: 0,
    } as ReturnType<typeof execa> extends Promise<infer R> ? R : never);

    const project = makeProjectWithConfig(
      `companions:
  base: ${companionBase}
  repos:
    - name: lib1
    - name: lib2
`,
    );

    await fetchCompanions(project);

    expect(mockedExeca).toHaveBeenCalledWith('git', ['-C', lib1, 'fetch', 'origin', '--quiet']);
    expect(mockedExeca).toHaveBeenCalledWith('git', ['-C', lib2, 'fetch', 'origin', '--quiet']);
  });

  it('continues after a fetch failure', async () => {
    const companionBase = join(tmpBase, 'companions');
    mkdirSync(companionBase, { recursive: true });
    makeCompanionDir(companionBase, 'failing-lib');
    makeCompanionDir(companionBase, 'good-lib');

    mockedExeca.mockImplementation(async (_cmd: unknown, args: unknown) => {
      const a = args as string[];
      if (a[1]?.includes('failing-lib')) {
        throw new Error('network error');
      }
      return { stdout: '', stderr: '', exitCode: 0 } as ReturnType<typeof execa> extends Promise<infer R> ? R : never;
    });

    const project = makeProjectWithConfig(
      `companions:
  base: ${companionBase}
  repos:
    - name: failing-lib
    - name: good-lib
`,
    );

    // Should not throw
    await expect(fetchCompanions(project)).resolves.toBeUndefined();

    // good-lib was still fetched
    expect(mockedExeca).toHaveBeenCalledTimes(2);
  });
});
