import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import type { BufoProject } from '@bufo/core';
import {
  getTadpoleDir,
  lockTadpole,
  unlockTadpole,
  unlockAll,
  findUnlocked,
  getTadpoleName,
  setTadpoleName,
  clearTadpoleName,
  computeTabTitle,
  listTadpoles,
  detectTadpoleFromDir,
  findNextSlot,
} from '../src/tadpole.js';

let tmpBase: string;

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

function makeTadpoleDir(num: number): string {
  const dir = join(tmpBase, `tp-${num}`);
  mkdirSync(dir, { recursive: true });
  return dir;
}

beforeEach(() => {
  tmpBase = mkdtempSync(join(tmpdir(), 'bufo-tadpole-test-'));
});

afterEach(() => {
  rmSync(tmpBase, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// getTadpoleDir
// ---------------------------------------------------------------------------

describe('getTadpoleDir', () => {
  it('returns correct path', () => {
    const project = makeProject();
    expect(getTadpoleDir(project, 3)).toBe(join(tmpBase, 'tp-3'));
  });
});

// ---------------------------------------------------------------------------
// Locking
// ---------------------------------------------------------------------------

describe('lockTadpole / unlockTadpole', () => {
  it('creates and removes .bufo-lock', async () => {
    const project = makeProject();
    makeTadpoleDir(1);

    await lockTadpole(project, 1);
    expect(existsSync(join(tmpBase, 'tp-1', '.bufo-lock'))).toBe(true);

    await unlockTadpole(project, 1);
    expect(existsSync(join(tmpBase, 'tp-1', '.bufo-lock'))).toBe(false);
  });

  it('throws when tadpole dir does not exist', async () => {
    const project = makeProject();
    await expect(lockTadpole(project, 99)).rejects.toThrow('does not exist');
    await expect(unlockTadpole(project, 99)).rejects.toThrow('does not exist');
  });

  it('unlockTadpole is idempotent (no error if already unlocked)', async () => {
    const project = makeProject();
    makeTadpoleDir(1);
    // No lock file exists — should not throw
    await unlockTadpole(project, 1);
  });
});

describe('unlockAll', () => {
  it('removes all lock files', async () => {
    const project = makeProject();
    makeTadpoleDir(1);
    makeTadpoleDir(2);
    makeTadpoleDir(3);

    writeFileSync(join(tmpBase, 'tp-1', '.bufo-lock'), '');
    writeFileSync(join(tmpBase, 'tp-3', '.bufo-lock'), '');

    await unlockAll(project);

    expect(existsSync(join(tmpBase, 'tp-1', '.bufo-lock'))).toBe(false);
    expect(existsSync(join(tmpBase, 'tp-3', '.bufo-lock'))).toBe(false);
  });

  it('handles missing tadpole_base gracefully', async () => {
    const project = makeProject({ tadpole_base: join(tmpBase, 'nonexistent') });
    await unlockAll(project); // should not throw
  });
});

describe('findUnlocked', () => {
  it('returns first unlocked tadpole number', async () => {
    const project = makeProject();
    makeTadpoleDir(1);
    makeTadpoleDir(2);
    makeTadpoleDir(3);

    writeFileSync(join(tmpBase, 'tp-1', '.bufo-lock'), '');
    // tp-2 is unlocked
    writeFileSync(join(tmpBase, 'tp-3', '.bufo-lock'), '');

    expect(await findUnlocked(project)).toBe(2);
  });

  it('returns null when all locked', async () => {
    const project = makeProject();
    makeTadpoleDir(1);
    writeFileSync(join(tmpBase, 'tp-1', '.bufo-lock'), '');

    expect(await findUnlocked(project)).toBe(null);
  });

  it('returns null when no tadpoles exist', async () => {
    const project = makeProject({ tadpole_base: join(tmpBase, 'empty') });
    expect(await findUnlocked(project)).toBe(null);
  });
});

// ---------------------------------------------------------------------------
// Naming
// ---------------------------------------------------------------------------

describe('getTadpoleName', () => {
  it('returns custom name from .bufo-name', () => {
    const project = makeProject();
    const dir = makeTadpoleDir(1);
    writeFileSync(join(dir, '.bufo-name'), 'ENG-123');

    expect(getTadpoleName(project, 1)).toBe('ENG-123');
  });

  it('returns tp{N} when no custom name', () => {
    const project = makeProject();
    makeTadpoleDir(1);
    expect(getTadpoleName(project, 1)).toBe('tp1');
  });

  it('returns tp{N} when dir does not exist', () => {
    const project = makeProject();
    expect(getTadpoleName(project, 99)).toBe('tp99');
  });
});

describe('setTadpoleName / clearTadpoleName', () => {
  it('writes and clears .bufo-name', async () => {
    const project = makeProject();
    makeTadpoleDir(2);

    await setTadpoleName(project, 2, 'my-feature');
    expect(getTadpoleName(project, 2)).toBe('my-feature');

    await clearTadpoleName(project, 2);
    expect(getTadpoleName(project, 2)).toBe('tp2');
  });

  it('setTadpoleName throws when dir does not exist', async () => {
    const project = makeProject();
    await expect(setTadpoleName(project, 99, 'foo')).rejects.toThrow('does not exist');
  });

  it('clearTadpoleName is idempotent', async () => {
    const project = makeProject();
    makeTadpoleDir(1);
    await clearTadpoleName(project, 1); // no .bufo-name to remove
  });
});

// ---------------------------------------------------------------------------
// computeTabTitle
// ---------------------------------------------------------------------------

describe('computeTabTitle', () => {
  it('uses PR title: {name}: {pr_title}', async () => {
    const project = makeProject();
    const dir = makeTadpoleDir(1);
    writeFileSync(join(dir, '.bufo-name'), 'ENG-100');
    writeFileSync(join(dir, '.bufo-meta'), JSON.stringify({ pr_title: 'Fix the thing' }));

    const title = await computeTabTitle(project, 1);
    expect(title).toBe('@test ENG-100: Fix the thing');
  });

  it('uses ticket name only (no duplication)', async () => {
    const project = makeProject();
    const dir = makeTadpoleDir(1);
    writeFileSync(join(dir, '.bufo-name'), 'ENG-200');
    writeFileSync(join(dir, '.bufo-meta'), JSON.stringify({ ticket: 'ENG-200' }));

    const title = await computeTabTitle(project, 1);
    expect(title).toBe('@test ENG-200');
  });

  it('falls back to tp{N} when no metadata and no branch', async () => {
    const project = makeProject();
    makeTadpoleDir(1);

    const title = await computeTabTitle(project, 1);
    expect(title).toBe('@test tp1');
  });

  it('omits alias prefix when alias is empty', async () => {
    const project = makeProject({ alias: '' });
    makeTadpoleDir(1);

    const title = await computeTabTitle(project, 1);
    expect(title).toBe('tp1');
  });

  it('truncates to 60 chars', async () => {
    const project = makeProject();
    const dir = makeTadpoleDir(1);
    const longTitle = 'A'.repeat(80);
    writeFileSync(join(dir, '.bufo-meta'), JSON.stringify({ pr_title: longTitle }));

    const title = await computeTabTitle(project, 1);
    expect(title.length).toBe(60);
    expect(title.endsWith('...')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// listTadpoles
// ---------------------------------------------------------------------------

describe('listTadpoles', () => {
  it('lists all existing tadpole directories', async () => {
    const project = makeProject();
    makeTadpoleDir(1);
    makeTadpoleDir(3);
    // tp-2 does not exist

    const tadpoles = await listTadpoles(project);
    expect(tadpoles.map((t) => t.number)).toEqual([1, 3]);
    expect(tadpoles[0].directory).toBe(join(tmpBase, 'tp-1'));
    expect(tadpoles[0].locked).toBe(false);
  });

  it('includes lock status', async () => {
    const project = makeProject();
    makeTadpoleDir(1);
    writeFileSync(join(tmpBase, 'tp-1', '.bufo-lock'), '');

    const tadpoles = await listTadpoles(project);
    expect(tadpoles[0].locked).toBe(true);
  });

  it('includes custom name', async () => {
    const project = makeProject();
    const dir = makeTadpoleDir(1);
    writeFileSync(join(dir, '.bufo-name'), 'my-feature');

    const tadpoles = await listTadpoles(project);
    expect(tadpoles[0].customName).toBe('my-feature');
  });

  it('returns empty array for missing base', async () => {
    const project = makeProject({ tadpole_base: join(tmpBase, 'nope') });
    const tadpoles = await listTadpoles(project);
    expect(tadpoles).toEqual([]);
  });

  it('ignores non-matching directories', async () => {
    const project = makeProject();
    makeTadpoleDir(1);
    mkdirSync(join(tmpBase, 'random-dir'), { recursive: true });
    mkdirSync(join(tmpBase, 'tp-notanumber'), { recursive: true });

    const tadpoles = await listTadpoles(project);
    expect(tadpoles).toHaveLength(1);
    expect(tadpoles[0].number).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// detectTadpoleFromDir
// ---------------------------------------------------------------------------

describe('detectTadpoleFromDir', () => {
  it('detects tadpole from exact dir', () => {
    const project = makeProject();
    const dir = join(tmpBase, 'tp-3');
    expect(detectTadpoleFromDir(project, dir)).toBe(3);
  });

  it('detects tadpole from subdirectory', () => {
    const project = makeProject();
    const sub = join(tmpBase, 'tp-5', 'src', 'lib');
    expect(detectTadpoleFromDir(project, sub)).toBe(5);
  });

  it('returns null for non-tadpole dir', () => {
    const project = makeProject();
    expect(detectTadpoleFromDir(project, '/tmp/random')).toBe(null);
  });

  it('returns null for tadpole_base itself', () => {
    const project = makeProject();
    expect(detectTadpoleFromDir(project, tmpBase)).toBe(null);
  });
});

// ---------------------------------------------------------------------------
// findNextSlot
// ---------------------------------------------------------------------------

describe('findNextSlot', () => {
  it('returns 1 when no tadpoles exist', () => {
    const project = makeProject();
    expect(findNextSlot(project)).toBe(1);
  });

  it('returns first gap', () => {
    const project = makeProject();
    makeTadpoleDir(1);
    makeTadpoleDir(2);
    // 3 is missing
    makeTadpoleDir(4);

    expect(findNextSlot(project)).toBe(3);
  });

  it('returns N+1 when all contiguous', () => {
    const project = makeProject();
    makeTadpoleDir(1);
    makeTadpoleDir(2);
    makeTadpoleDir(3);

    expect(findNextSlot(project)).toBe(4);
  });
});
