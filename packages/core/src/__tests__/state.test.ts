import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { readFile, mkdir, writeFile, rm } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import type { TadpoleState } from '../types.js';

// Use vi.hoisted so the variable is available to the mock factory
const { fakeHome } = vi.hoisted(() => {
  return { fakeHome: { value: '' } };
});

// Mock os.homedir so STATE_DIR resolves to our temp directory
vi.mock('os', async (importOriginal) => {
  const actual = await importOriginal<typeof import('os')>();
  return {
    ...actual,
    homedir: () => fakeHome.value,
  };
});

// Mock iterm.ts before importing state.ts
vi.mock('../iterm.js', () => ({
  getActiveSessions: vi.fn(() => new Set<string>()),
}));

// Force re-evaluation of state.js for each test file by using dynamic import
// But since STATE_DIR is computed at import time, we need homedir mock set before import.
// With vi.hoisted + vi.mock, the mock is hoisted above imports, so STATE_DIR will
// call our mocked homedir(). However STATE_DIR is computed once at module load.
// We need to make STATE_DIR lazy or re-import the module.

// Actually: vi.mock is hoisted, but STATE_DIR = join(homedir(), ...) runs once.
// So fakeHome.value must be set before the module loads. But beforeEach runs after.
// Solution: use resetModules + dynamic import in each test.

import { getActiveSessions } from '../iterm.js';

const mockedGetActiveSessions = vi.mocked(getActiveSessions);

function makeTmpDir(): string {
  return join(tmpdir(), `bufo-test-state-${Date.now()}-${Math.random().toString(36).slice(2)}`);
}

function makeState(num: number, mainSid = 'ABC-DEF-123'): TadpoleState {
  return {
    tadpole: num,
    window_id: 'w1',
    tab_id: 't1',
    panes: {
      terminal: 'term-sid',
      server: 'server-sid',
      main: mainSid,
    },
    created_at: new Date().toISOString(),
  };
}

describe('state', () => {
  let testDir: string;
  let stateModule: typeof import('../state.js');

  beforeEach(async () => {
    testDir = makeTmpDir();
    fakeHome.value = testDir;
    await mkdir(join(testDir, '.bufo', 'state'), { recursive: true });

    // Reset modules so STATE_DIR is recomputed with current fakeHome
    vi.resetModules();
    // Re-mock iterm since resetModules clears it
    vi.doMock('../iterm.js', () => ({
      getActiveSessions: mockedGetActiveSessions,
    }));
    stateModule = await import('../state.js');
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  function stateDir(): string {
    return join(testDir, '.bufo', 'state');
  }

  describe('saveState', () => {
    it('writes correctly structured JSON', async () => {
      const state = makeState(1);
      await stateModule.saveState('test-session', 1, state);

      const filePath = join(stateDir(), 'test-session', 'tp1.json');
      const content = await readFile(filePath, 'utf8');
      const parsed = JSON.parse(content);

      expect(parsed.tadpole).toBe(1);
      expect(parsed.window_id).toBe('w1');
      expect(parsed.tab_id).toBe('t1');
      expect(parsed.panes.terminal).toBe('term-sid');
      expect(parsed.panes.server).toBe('server-sid');
      expect(parsed.panes.main).toBe('ABC-DEF-123');
      expect(parsed.created_at).toBeDefined();
    });

    it('creates parent directories', async () => {
      const state = makeState(5);
      await stateModule.saveState('new-session', 5, state);

      const filePath = join(stateDir(), 'new-session', 'tp5.json');
      const content = await readFile(filePath, 'utf8');
      expect(JSON.parse(content).tadpole).toBe(5);
    });
  });

  describe('loadState', () => {
    it('loads tp<N>.json', async () => {
      const state = makeState(2);
      await stateModule.saveState('test-session', 2, state);

      const loaded = await stateModule.loadState('test-session', 2);
      expect(loaded).not.toBeNull();
      expect(loaded!.tadpole).toBe(2);
      expect(loaded!.panes.main).toBe('ABC-DEF-123');
    });

    it('falls back to ws<N>.json', async () => {
      // Write a legacy ws file directly
      const dir = join(stateDir(), 'legacy-session');
      await mkdir(dir, { recursive: true });
      const legacyState = makeState(3);
      await writeFile(join(dir, 'ws3.json'), JSON.stringify(legacyState), 'utf8');

      const loaded = await stateModule.loadState('legacy-session', 3);
      expect(loaded).not.toBeNull();
      expect(loaded!.tadpole).toBe(3);
    });

    it('prefers tp<N>.json over ws<N>.json', async () => {
      const dir = join(stateDir(), 'both-session');
      await mkdir(dir, { recursive: true });

      const tpState = makeState(4, 'tp-main-sid');
      const wsState = makeState(4, 'ws-main-sid');
      await writeFile(join(dir, 'tp4.json'), JSON.stringify(tpState), 'utf8');
      await writeFile(join(dir, 'ws4.json'), JSON.stringify(wsState), 'utf8');

      const loaded = await stateModule.loadState('both-session', 4);
      expect(loaded!.panes.main).toBe('tp-main-sid');
    });

    it('returns null if neither exists', async () => {
      const loaded = await stateModule.loadState('nonexistent-session', 99);
      expect(loaded).toBeNull();
    });
  });

  describe('removeState', () => {
    it('removes both tp and ws files', async () => {
      const dir = join(stateDir(), 'rm-session');
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, 'tp1.json'), '{}', 'utf8');
      await writeFile(join(dir, 'ws1.json'), '{}', 'utf8');

      await stateModule.removeState('rm-session', 1);

      // Both files should be gone
      await expect(readFile(join(dir, 'tp1.json'))).rejects.toThrow();
      await expect(readFile(join(dir, 'ws1.json'))).rejects.toThrow();
    });

    it('does not throw if files do not exist', async () => {
      await expect(stateModule.removeState('no-such-session', 42)).resolves.toBeUndefined();
    });
  });

  describe('stateExists', () => {
    it('returns false when no state file exists', async () => {
      const result = await stateModule.stateExists('empty', 1);
      expect(result).toBe(false);
    });

    it('returns true when state exists and session is alive', async () => {
      const uuid = 'AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE';
      const state = makeState(1, uuid);
      await stateModule.saveState('alive-session', 1, state);

      mockedGetActiveSessions.mockReturnValue(new Set([uuid]));

      const result = await stateModule.stateExists('alive-session', 1);
      expect(result).toBe(true);
    });

    it('removes stale file and returns false when session is dead', async () => {
      const state = makeState(1, 'DEAD-UUID');
      await stateModule.saveState('stale-session', 1, state);

      mockedGetActiveSessions.mockReturnValue(new Set());

      const result = await stateModule.stateExists('stale-session', 1);
      expect(result).toBe(false);

      // File should have been cleaned up
      const loaded = await stateModule.loadState('stale-session', 1);
      expect(loaded).toBeNull();
    });

    it('extracts UUID from prefixed format like w3t1p2:<UUID>', async () => {
      const uuid = 'AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE';
      const state = makeState(1, `w3t1p2:${uuid}`);
      await stateModule.saveState('prefixed-session', 1, state);

      mockedGetActiveSessions.mockReturnValue(new Set([uuid]));

      const result = await stateModule.stateExists('prefixed-session', 1);
      expect(result).toBe(true);
    });
  });

  describe('listStates', () => {
    it('returns empty array for nonexistent session', async () => {
      const nums = await stateModule.listStates('no-such-session');
      expect(nums).toEqual([]);
    });

    it('returns tp numbers sorted', async () => {
      const dir = join(stateDir(), 'list-session');
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, 'tp3.json'), JSON.stringify(makeState(3)), 'utf8');
      await writeFile(join(dir, 'tp1.json'), JSON.stringify(makeState(1)), 'utf8');
      await writeFile(join(dir, 'tp2.json'), JSON.stringify(makeState(2)), 'utf8');

      const nums = await stateModule.listStates('list-session');
      expect(nums).toEqual([1, 2, 3]);
    });

    it('includes legacy ws numbers without tp counterpart', async () => {
      const dir = join(stateDir(), 'mixed-session');
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, 'tp1.json'), JSON.stringify(makeState(1)), 'utf8');
      await writeFile(join(dir, 'ws2.json'), JSON.stringify(makeState(2)), 'utf8');
      // ws1 has tp1 counterpart, so should be excluded
      await writeFile(join(dir, 'ws1.json'), JSON.stringify(makeState(1)), 'utf8');

      const nums = await stateModule.listStates('mixed-session');
      expect(nums).toEqual([1, 2]);
    });

    it('puts canonical tp numbers before legacy ws numbers', async () => {
      const dir = join(stateDir(), 'order-session');
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, 'tp5.json'), JSON.stringify(makeState(5)), 'utf8');
      await writeFile(join(dir, 'ws1.json'), JSON.stringify(makeState(1)), 'utf8');

      const nums = await stateModule.listStates('order-session');
      expect(nums).toEqual([5, 1]);
    });
  });
});
