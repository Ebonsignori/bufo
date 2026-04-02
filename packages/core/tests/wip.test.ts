import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, mkdir, writeFile, rm, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  getWipDir,
  listWips,
  listAllWips,
  loadWipMetadata,
  deleteWip,
} from '../src/wip.js';

// We need to mock homedir so we can control the base path
import { vi } from 'vitest';

let tempDir: string;

vi.mock('node:os', async () => {
  const actual = await vi.importActual<typeof import('node:os')>('node:os');
  return {
    ...actual,
    homedir: () => tempDir,
  };
});

function makeMetadata(overrides: Partial<import('../src/wip.js').WipMetadata> = {}): import('../src/wip.js').WipMetadata {
  return {
    timestamp: '20260401-120000',
    slug: 'test-wip',
    summary: 'Test work in progress',
    tadpole: 1,
    branch: 'feature/test',
    commits_ahead: 2,
    created_at: '2026-04-01T12:00:00+00:00',
    ...overrides,
  };
}

describe('wip', () => {
  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'bufo-wip-test-'));
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  describe('getWipDir', () => {
    it('returns correct path pattern', () => {
      const result = getWipDir('myproject', 'tp', 3);
      expect(result).toBe(join(tempDir, '.bufo', 'wip', 'myproject', 'tp-3'));
    });

    it('handles different alias/prefix/num combos', () => {
      const result = getWipDir('pf', 'workspace', 12);
      expect(result).toBe(join(tempDir, '.bufo', 'wip', 'pf', 'workspace-12'));
    });
  });

  describe('loadWipMetadata', () => {
    it('loads valid metadata.json', async () => {
      const wipPath = join(tempDir, 'some-wip');
      await mkdir(wipPath, { recursive: true });
      const meta = makeMetadata();
      await writeFile(join(wipPath, 'metadata.json'), JSON.stringify(meta));

      const result = await loadWipMetadata(wipPath);
      expect(result).toEqual(meta);
    });

    it('returns null for missing metadata.json', async () => {
      const wipPath = join(tempDir, 'no-metadata');
      await mkdir(wipPath, { recursive: true });

      const result = await loadWipMetadata(wipPath);
      expect(result).toBeNull();
    });

    it('returns null for malformed JSON', async () => {
      const wipPath = join(tempDir, 'bad-json');
      await mkdir(wipPath, { recursive: true });
      await writeFile(join(wipPath, 'metadata.json'), 'not json');

      const result = await loadWipMetadata(wipPath);
      expect(result).toBeNull();
    });

    it('returns null for metadata missing required fields', async () => {
      const wipPath = join(tempDir, 'incomplete');
      await mkdir(wipPath, { recursive: true });
      await writeFile(
        join(wipPath, 'metadata.json'),
        JSON.stringify({ timestamp: '20260401', slug: 'test' }),
      );

      const result = await loadWipMetadata(wipPath);
      expect(result).toBeNull();
    });

    it('returns null for non-existent directory', async () => {
      const result = await loadWipMetadata(join(tempDir, 'does-not-exist'));
      expect(result).toBeNull();
    });
  });

  describe('listWips', () => {
    it('returns empty array when wip dir does not exist', async () => {
      const result = await listWips('proj', 'tp', 1);
      expect(result).toEqual([]);
    });

    it('finds entries and loads metadata, sorted newest-first', async () => {
      const wipDir = join(tempDir, '.bufo', 'wip', 'proj', 'tp-1');

      // Create two WIP snapshots
      const older = join(wipDir, '20260401-100000-older-wip');
      const newer = join(wipDir, '20260401-140000-newer-wip');
      await mkdir(older, { recursive: true });
      await mkdir(newer, { recursive: true });

      await writeFile(
        join(older, 'metadata.json'),
        JSON.stringify(makeMetadata({ timestamp: '20260401-100000', slug: 'older-wip' })),
      );
      await writeFile(
        join(newer, 'metadata.json'),
        JSON.stringify(makeMetadata({ timestamp: '20260401-140000', slug: 'newer-wip' })),
      );

      const result = await listWips('proj', 'tp', 1);
      expect(result).toHaveLength(2);
      expect(result[0].metadata.slug).toBe('newer-wip');
      expect(result[1].metadata.slug).toBe('older-wip');
      expect(result[0].path).toBe(newer);
      expect(result[1].path).toBe(older);
    });

    it('skips entries without valid metadata', async () => {
      const wipDir = join(tempDir, '.bufo', 'wip', 'proj', 'tp-2');
      const good = join(wipDir, '20260401-120000-good');
      const bad = join(wipDir, '20260401-110000-bad');
      await mkdir(good, { recursive: true });
      await mkdir(bad, { recursive: true });

      await writeFile(
        join(good, 'metadata.json'),
        JSON.stringify(makeMetadata({ timestamp: '20260401-120000' })),
      );
      // bad directory has no metadata.json

      const result = await listWips('proj', 'tp', 2);
      expect(result).toHaveLength(1);
      expect(result[0].path).toBe(good);
    });
  });

  describe('listAllWips', () => {
    it('returns empty array when project wip dir does not exist', async () => {
      const result = await listAllWips('nonexistent');
      expect(result).toEqual([]);
    });

    it('aggregates across tadpoles, sorted newest-first', async () => {
      const baseDir = join(tempDir, '.bufo', 'wip', 'proj');

      // Tadpole 1
      const tp1 = join(baseDir, 'tp-1', '20260401-100000-first');
      await mkdir(tp1, { recursive: true });
      await writeFile(
        join(tp1, 'metadata.json'),
        JSON.stringify(makeMetadata({ timestamp: '20260401-100000', slug: 'first', tadpole: 1 })),
      );

      // Tadpole 2
      const tp2 = join(baseDir, 'tp-2', '20260401-150000-second');
      await mkdir(tp2, { recursive: true });
      await writeFile(
        join(tp2, 'metadata.json'),
        JSON.stringify(makeMetadata({ timestamp: '20260401-150000', slug: 'second', tadpole: 2 })),
      );

      // Tadpole 1 another entry
      const tp1b = join(baseDir, 'tp-1', '20260401-120000-third');
      await mkdir(tp1b, { recursive: true });
      await writeFile(
        join(tp1b, 'metadata.json'),
        JSON.stringify(makeMetadata({ timestamp: '20260401-120000', slug: 'third', tadpole: 1 })),
      );

      const result = await listAllWips('proj');
      expect(result).toHaveLength(3);
      // Newest first
      expect(result[0].metadata.slug).toBe('second');   // 150000
      expect(result[1].metadata.slug).toBe('third');     // 120000
      expect(result[2].metadata.slug).toBe('first');     // 100000
    });
  });

  describe('deleteWip', () => {
    it('removes the directory and all contents', async () => {
      const wipPath = join(tempDir, 'to-delete');
      await mkdir(wipPath, { recursive: true });
      await writeFile(join(wipPath, 'metadata.json'), '{}');
      await writeFile(join(wipPath, 'changes.patch'), 'patch content');

      await deleteWip(wipPath);

      // Verify it's gone
      await expect(readdir(wipPath)).rejects.toThrow();
    });

    it('does not throw for non-existent path', async () => {
      await expect(deleteWip(join(tempDir, 'nope'))).resolves.toBeUndefined();
    });
  });
});
