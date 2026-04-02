import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { BufoProject } from '@bufo/core';
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { rmSync } from 'node:fs';

// Gate iTerm2-dependent tests
const skipNoIterm = process.env.ITERM2_RUNNING !== '1' ? it.skip : it;

// Mock execa before importing
vi.mock('execa', () => ({
  execa: vi.fn(),
}));

// Mock @bufo/core iTerm2 functions (async)
vi.mock('@bufo/core', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    createWindow: vi.fn().mockResolvedValue({ windowId: 'w1', tabId: 'tab', sessionId: 'sess-term' }),
    createTab: vi.fn().mockResolvedValue({ tabId: 'tab', sessionId: 'sess-term' }),
    splitVertical: vi.fn().mockResolvedValue('sess-main'),
    splitHorizontal: vi.fn()
      .mockResolvedValueOnce('sess-info')
      .mockResolvedValue('sess-server'),
    sendText: vi.fn().mockResolvedValue(undefined),
    sendInterrupt: vi.fn().mockResolvedValue(undefined),
    focusSession: vi.fn().mockResolvedValue(undefined),
    closeSession: vi.fn().mockResolvedValue(undefined),
    closeTabBySession: vi.fn().mockResolvedValue(undefined),
    renameTabBySession: vi.fn().mockResolvedValue(undefined),
    resizeSession: vi.fn().mockResolvedValue(undefined),
    sessionExists: vi.fn().mockResolvedValue(false),
    getActiveSessions: vi.fn().mockReturnValue([]),
    isItermRunning: vi.fn().mockReturnValue(false),
    isItermInstalled: vi.fn().mockReturnValue(false),
    // State functions — use real implementations but override stateExists
    stateExists: vi.fn().mockResolvedValue(false),
  };
});

import { execa } from 'execa';
import {
  getTadpoleName,
  setTadpoleName,
  clearTadpoleName,
  computeTabTitle,
  lockTadpole,
  unlockTadpole,
  unlockAll,
  findUnlocked,
  listTadpoles,
  detectTadpoleFromDir,
  findNextSlot,
  destroyTadpole,
  cleanupTadpole,
  createTadpoleLayout,
  openTadpole,
  createNewTadpole,
  restartTadpole,
  continueTadpole,
  openMainTadpole,
  switchTadpole,
  prepareTadpoleForReuse,
} from '../src/tadpole.js';

const mockedExeca = vi.mocked(execa);

function makeProject(dir: string, overrides: Partial<BufoProject> = {}): BufoProject {
  return {
    alias: 'test',
    session_name: 'test-session',
    tadpole_base: dir,
    main_repo: dir,
    tadpoles: { count: 3, prefix: 'tp', branch_pattern: 'tp-{N}' },
    ...overrides,
  };
}

describe('Tadpole Data Layer', () => {
  let tmpDir: string;
  let project: BufoProject;

  beforeEach(() => {
    vi.clearAllMocks();
    tmpDir = mkdtempSync(join(tmpdir(), 'bufo-test-'));
    project = makeProject(tmpDir);
    // Default execa mock
    mockedExeca.mockResolvedValue({ stdout: '', stderr: '', exitCode: 0 } as any);
  });

  afterEach(() => {
    try {
      rmSync(tmpDir, { recursive: true, force: true });
    } catch {
      // ignore
    }
  });

  describe('getTadpoleName', () => {
    it('returns default name when no custom name set', () => {
      mkdirSync(join(tmpDir, 'tp-1'), { recursive: true });
      expect(getTadpoleName(project, 1)).toBe('tp1');
    });

    it('returns custom name when .bufo-name exists', () => {
      const tpDir = join(tmpDir, 'tp-1');
      mkdirSync(tpDir, { recursive: true });
      writeFileSync(join(tpDir, '.bufo-name'), 'my-feature');
      expect(getTadpoleName(project, 1)).toBe('my-feature');
    });
  });

  describe('setTadpoleName', () => {
    it('writes .bufo-name file', async () => {
      const tpDir = join(tmpDir, 'tp-1');
      mkdirSync(tpDir, { recursive: true });
      await setTadpoleName(project, 1, 'feature-x');
      expect(readFileSync(join(tpDir, '.bufo-name'), 'utf-8')).toBe('feature-x');
    });
  });

  describe('clearTadpoleName', () => {
    it('removes .bufo-name file', async () => {
      const tpDir = join(tmpDir, 'tp-1');
      mkdirSync(tpDir, { recursive: true });
      writeFileSync(join(tpDir, '.bufo-name'), 'test');
      await clearTadpoleName(project, 1);
      expect(existsSync(join(tpDir, '.bufo-name'))).toBe(false);
    });

    it('does not throw when file does not exist', async () => {
      mkdirSync(join(tmpDir, 'tp-1'), { recursive: true });
      await expect(clearTadpoleName(project, 1)).resolves.toBeUndefined();
    });
  });

  describe('computeTabTitle', () => {
    it('includes project alias and branch', async () => {
      mkdirSync(join(tmpDir, 'tp-1'), { recursive: true });
      mockedExeca.mockResolvedValue({ stdout: 'feature/cool', stderr: '', exitCode: 0 } as any);
      const title = await computeTabTitle(project, 1);
      expect(title).toContain('@test');
      expect(title).toContain('feature/cool');
    });

    it('uses custom name as fallback when branch is main', async () => {
      const tpDir = join(tmpDir, 'tp-1');
      mkdirSync(tpDir, { recursive: true });
      writeFileSync(join(tpDir, '.bufo-name'), 'mywork');
      mockedExeca.mockResolvedValue({ stdout: 'main', stderr: '', exitCode: 0 } as any);
      const title = await computeTabTitle(project, 1);
      expect(title).toBe('@test mywork');
    });

    it('truncates long titles to 60 chars', async () => {
      const tpDir = join(tmpDir, 'tp-1');
      mkdirSync(tpDir, { recursive: true });
      const longBranch = 'a'.repeat(70);
      mockedExeca.mockResolvedValue({ stdout: longBranch, stderr: '', exitCode: 0 } as any);
      const title = await computeTabTitle(project, 1);
      expect(title.length).toBeLessThanOrEqual(60);
      expect(title.endsWith('...')).toBe(true);
    });

    it('shows PR title from metadata', async () => {
      const tpDir = join(tmpDir, 'tp-1');
      mkdirSync(tpDir, { recursive: true });
      writeFileSync(join(tpDir, '.bufo-meta'), JSON.stringify({ pr_title: 'Fix bug #42' }));
      const title = await computeTabTitle(project, 1);
      expect(title).toContain('Fix bug #42');
    });
  });

  describe('lockTadpole / unlockTadpole', () => {
    it('creates and removes .bufo-lock', async () => {
      const tpDir = join(tmpDir, 'tp-1');
      mkdirSync(tpDir, { recursive: true });
      await lockTadpole(project, 1);
      expect(existsSync(join(tpDir, '.bufo-lock'))).toBe(true);
      await unlockTadpole(project, 1);
      expect(existsSync(join(tpDir, '.bufo-lock'))).toBe(false);
    });

    it('throws when tadpole does not exist', async () => {
      await expect(lockTadpole(project, 99)).rejects.toThrow('does not exist');
    });
  });

  describe('findUnlocked', () => {
    it('returns null when all locked', async () => {
      const tp1 = join(tmpDir, 'tp-1');
      mkdirSync(tp1, { recursive: true });
      writeFileSync(join(tp1, '.bufo-lock'), '');
      expect(await findUnlocked(project)).toBeNull();
    });

    it('returns first unlocked number', async () => {
      const tp1 = join(tmpDir, 'tp-1');
      const tp2 = join(tmpDir, 'tp-2');
      mkdirSync(tp1, { recursive: true });
      mkdirSync(tp2, { recursive: true });
      writeFileSync(join(tp1, '.bufo-lock'), '');
      // tp2 is unlocked
      expect(await findUnlocked(project)).toBe(2);
    });
  });

  describe('unlockAll', () => {
    it('unlocks non-active tadpoles', async () => {
      const tp1 = join(tmpDir, 'tp-1');
      const tp2 = join(tmpDir, 'tp-2');
      mkdirSync(tp1, { recursive: true });
      mkdirSync(tp2, { recursive: true });
      writeFileSync(join(tp1, '.bufo-lock'), '');
      writeFileSync(join(tp2, '.bufo-lock'), '');

      await unlockAll(project);

      expect(existsSync(join(tp1, '.bufo-lock'))).toBe(false);
      expect(existsSync(join(tp2, '.bufo-lock'))).toBe(false);
    });
  });

  describe('listTadpoles', () => {
    it('returns sorted list of tadpoles', async () => {
      mkdirSync(join(tmpDir, 'tp-2'), { recursive: true });
      mkdirSync(join(tmpDir, 'tp-1'), { recursive: true });
      writeFileSync(join(tmpDir, 'tp-1', '.bufo-lock'), '');

      mockedExeca.mockResolvedValue({ stdout: 'main', stderr: '', exitCode: 0 } as any);

      const list = await listTadpoles(project);
      expect(list.length).toBe(2);
      expect(list[0].number).toBe(1);
      expect(list[0].locked).toBe(true);
      expect(list[1].number).toBe(2);
      expect(list[1].locked).toBe(false);
    });

    it('returns empty array when no tadpoles exist', async () => {
      const list = await listTadpoles(project);
      expect(list).toEqual([]);
    });
  });

  describe('detectTadpoleFromDir', () => {
    it('detects tadpole number from path', () => {
      const result = detectTadpoleFromDir(project, '/some/path/tp-3/src');
      expect(result).toBe(3);
    });

    it('returns null when path does not match', () => {
      const result = detectTadpoleFromDir(project, '/some/other/path');
      expect(result).toBeNull();
    });
  });

  describe('findNextSlot', () => {
    it('returns 1 when no tadpoles exist', () => {
      expect(findNextSlot(project)).toBe(1);
    });

    it('returns next available number', () => {
      mkdirSync(join(tmpDir, 'tp-1'), { recursive: true });
      mkdirSync(join(tmpDir, 'tp-2'), { recursive: true });
      expect(findNextSlot(project)).toBe(3);
    });

    it('fills gaps', () => {
      mkdirSync(join(tmpDir, 'tp-1'), { recursive: true });
      mkdirSync(join(tmpDir, 'tp-3'), { recursive: true });
      expect(findNextSlot(project)).toBe(2);
    });
  });
});

describe('Tadpole Layout (iTerm2)', () => {
  let tmpDir: string;
  let project: BufoProject;

  beforeEach(() => {
    vi.clearAllMocks();
    tmpDir = mkdtempSync(join(tmpdir(), 'bufo-layout-'));
    project = makeProject(tmpDir);
    mockedExeca.mockResolvedValue({ stdout: '', stderr: '', exitCode: 0 } as any);
  });

  afterEach(() => {
    try {
      rmSync(tmpDir, { recursive: true, force: true });
    } catch {
      // ignore
    }
  });

  skipNoIterm('createTadpoleLayout creates 4-pane layout', async () => {
    mkdirSync(join(tmpDir, 'tp-1'), { recursive: true });
    const result = await createTadpoleLayout(project, 1);
    expect(result.terminalSid).toBeTruthy();
    expect(result.serverSid).toBeTruthy();
    expect(result.mainSid).toBeTruthy();
    expect(result.infoSid).toBeTruthy();
  });

  it('destroyTadpole requires --force flag', async () => {
    mkdirSync(join(tmpDir, 'tp-1'), { recursive: true });
    await expect(destroyTadpole(project, 1)).rejects.toThrow('--force');
  });

  it('destroyTadpole removes worktree with --force', async () => {
    const tpDir = join(tmpDir, 'tp-1');
    mkdirSync(tpDir, { recursive: true });

    mockedExeca.mockResolvedValue({ stdout: '', stderr: '', exitCode: 0 } as any);

    await destroyTadpole(project, 1, '--force');

    // Verify git worktree remove was called
    const calls = mockedExeca.mock.calls;
    const worktreeRemoveCall = calls.find(
      (c) => c[0] === 'git' && Array.isArray(c[1]) && c[1].includes('worktree') && c[1].includes('remove'),
    );
    expect(worktreeRemoveCall).toBeDefined();
  });

  it('destroyTadpole throws when tadpole does not exist', async () => {
    await expect(destroyTadpole(project, 99, '--force')).rejects.toThrow('does not exist');
  });

  describe('switchTadpole', () => {
    it('prints message when no tadpoles active', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      await switchTadpole(project);
      expect(consoleSpy).toHaveBeenCalledWith('No active tadpoles.');
      consoleSpy.mockRestore();
    });

    it('throws when target tadpole not active', async () => {
      mkdirSync(join(tmpDir, 'tp-1'), { recursive: true });
      await expect(switchTadpole(project, 1)).rejects.toThrow('not active');
    });
  });
});
