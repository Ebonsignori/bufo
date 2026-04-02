import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import * as yaml from 'js-yaml';

const hoisted = vi.hoisted(() => ({ tempDir: '' }));

vi.mock('node:os', async () => {
  const actual = await vi.importActual<typeof import('node:os')>('node:os');
  return {
    ...actual,
    homedir: () => hoisted.tempDir,
  };
});

// Keep `tempDir` as a local alias for readability in tests
let tempDir: string;

import {
  getSessionsDir,
  getSessionDir,
  createSession,
  updateSession,
  getSession,
  loadSessionFull,
  listSessions,
  deleteSession,
  saveSessionLayout,
  loadSessionLayout,
} from '../src/session.js';

import type { BufoProject, SessionLayout } from '../src/types.js';

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

describe('session data layer', () => {
  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'bufo-session-test-'));
    hoisted.tempDir = tempDir;
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  describe('getSessionsDir', () => {
    it('returns correct path', () => {
      const project = makeProject({ alias: 'myapp' });
      expect(getSessionsDir(project)).toBe(join(tempDir, '.bufo', 'sessions', 'myapp'));
    });
  });

  describe('getSessionDir', () => {
    it('returns correct path', () => {
      const project = makeProject({ alias: 'myapp' });
      expect(getSessionDir(project, 'review-1')).toBe(
        join(tempDir, '.bufo', 'sessions', 'myapp', 'review-1'),
      );
    });
  });

  describe('createSession', () => {
    it('creates session directory and session.yaml', async () => {
      const project = makeProject();
      const dir = await createSession(project, 'my-session');

      expect(dir).toBe(join(tempDir, '.bufo', 'sessions', 'test', 'my-session'));
      expect(existsSync(join(dir, 'session.yaml'))).toBe(true);

      const raw = await readFile(join(dir, 'session.yaml'), 'utf-8');
      const doc = yaml.load(raw) as Record<string, unknown>;
      expect(doc.name).toBe('my-session');
      expect(doc.project).toBe('test');
      expect(doc.type).toBe('general');
      expect(doc.created).toBeDefined();
    });

    it('creates context.md when context is provided', async () => {
      const project = makeProject();
      const dir = await createSession(project, 'ctx-session', 'Review PR #42');

      const ctx = await readFile(join(dir, 'context.md'), 'utf-8');
      expect(ctx).toBe('Review PR #42');
    });

    it('throws when session already exists', async () => {
      const project = makeProject();
      await createSession(project, 'dup-session');
      await expect(createSession(project, 'dup-session')).rejects.toThrow(
        "Session 'dup-session' already exists",
      );
    });
  });

  describe('updateSession', () => {
    it('updates a field in session.yaml', async () => {
      const project = makeProject();
      await createSession(project, 'upd-session');
      await updateSession(project, 'upd-session', 'summary', 'New summary');

      const raw = await readFile(
        join(tempDir, '.bufo', 'sessions', 'test', 'upd-session', 'session.yaml'),
        'utf-8',
      );
      const doc = yaml.load(raw) as Record<string, unknown>;
      expect(doc.summary).toBe('New summary');
    });

    it('throws when session does not exist', async () => {
      const project = makeProject();
      await expect(
        updateSession(project, 'nonexistent', 'summary', 'fail'),
      ).rejects.toThrow("Session 'nonexistent' not found");
    });
  });

  describe('getSession', () => {
    it('returns field value', async () => {
      const project = makeProject();
      await createSession(project, 'get-session');
      await updateSession(project, 'get-session', 'summary', 'Test summary');

      const val = await getSession(project, 'get-session', 'summary');
      expect(val).toBe('Test summary');
    });

    it('returns null for missing field', async () => {
      const project = makeProject();
      await createSession(project, 'get-session2');
      const val = await getSession(project, 'get-session2', 'nonexistent_field');
      expect(val).toBeNull();
    });

    it('returns null for missing session', async () => {
      const project = makeProject();
      const val = await getSession(project, 'nope', 'summary');
      expect(val).toBeNull();
    });
  });

  describe('loadSessionFull', () => {
    it('loads session with all fields', async () => {
      const project = makeProject();
      await createSession(project, 'full-session');
      await updateSession(project, 'full-session', 'summary', 'Full test');

      const session = await loadSessionFull(project, 'full-session');
      expect(session).not.toBeNull();
      expect(session!.name).toBe('full-session');
      expect(session!.summary).toBe('Full test');
      expect(session!.type).toBe('general');
      expect(session!.active).toBe(false);
      expect(session!.hasReviewOutput).toBe(false);
    });

    it('detects review-output.md', async () => {
      const project = makeProject();
      const dir = await createSession(project, 'review-session');
      await writeFile(join(dir, 'review-output.md'), '# Review');

      const session = await loadSessionFull(project, 'review-session');
      expect(session!.hasReviewOutput).toBe(true);
    });

    it('returns null for missing session', async () => {
      const project = makeProject();
      const session = await loadSessionFull(project, 'missing');
      expect(session).toBeNull();
    });
  });

  describe('listSessions', () => {
    it('lists all sessions for a project', async () => {
      const project = makeProject();
      await createSession(project, 'alpha');
      await createSession(project, 'beta');
      await createSession(project, 'gamma');

      const sessions = await listSessions(project);
      expect(sessions).toHaveLength(3);
      const names = sessions.map((s) => s.name).sort();
      expect(names).toEqual(['alpha', 'beta', 'gamma']);
    });

    it('filters by prefix', async () => {
      const project = makeProject();
      await createSession(project, 'review-1');
      await createSession(project, 'review-2');
      await createSession(project, 'general-1');

      const sessions = await listSessions(project, 'review');
      expect(sessions).toHaveLength(2);
    });

    it('returns empty array when no sessions exist', async () => {
      const project = makeProject();
      const sessions = await listSessions(project);
      expect(sessions).toEqual([]);
    });
  });

  describe('deleteSession', () => {
    it('removes session directory', async () => {
      const project = makeProject();
      const dir = await createSession(project, 'del-session');
      expect(existsSync(dir)).toBe(true);

      await deleteSession(project, 'del-session');
      expect(existsSync(dir)).toBe(false);
    });

    it('throws when session does not exist', async () => {
      const project = makeProject();
      await expect(deleteSession(project, 'nonexistent')).rejects.toThrow(
        "Session 'nonexistent' not found",
      );
    });
  });

  describe('saveSessionLayout / loadSessionLayout', () => {
    it('round-trips layout data', async () => {
      const project = makeProject();
      const dir = await createSession(project, 'layout-session');

      const layout: SessionLayout = {
        window_id: 'win-1',
        terminal_sid: 'aabbccdd-1111-2222-3333-444444444444',
        server_sid: 'aabbccdd-1111-2222-3333-555555555555',
        main_sid: 'aabbccdd-1111-2222-3333-666666666666',
        info_sid: 'aabbccdd-1111-2222-3333-777777777777',
      };

      await saveSessionLayout(dir, layout);
      const loaded = await loadSessionLayout(dir);
      expect(loaded).toEqual(layout);
    });

    it('returns null when layout.json is missing', async () => {
      const project = makeProject();
      const dir = await createSession(project, 'no-layout');
      const loaded = await loadSessionLayout(dir);
      expect(loaded).toBeNull();
    });

    it('returns null when layout.json has no main_sid', async () => {
      const project = makeProject();
      const dir = await createSession(project, 'bad-layout');
      await writeFile(join(dir, 'layout.json'), JSON.stringify({ window_id: 'x' }));
      const loaded = await loadSessionLayout(dir);
      expect(loaded).toBeNull();
    });
  });
});
