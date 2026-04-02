import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { join } from 'path';
import { mkdtempSync, existsSync, readFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import * as yaml from 'js-yaml';
import type { SessionLayout } from '../src/types.js';

// We need to override the SESSIONS_DIR for testing.
// We'll mock the homedir to point to a temp directory.
import { vi } from 'vitest';

let tempHome: string;
let sessionsDir: string;

vi.mock('os', async () => {
  const actual = await vi.importActual<typeof import('os')>('os');
  return {
    ...actual,
    homedir: () => tempHome,
  };
});

// Import after mock setup
let session: typeof import('../src/session.js');

beforeEach(async () => {
  tempHome = mkdtempSync(join(tmpdir(), 'bufo-test-'));
  sessionsDir = join(tempHome, '.bufo', 'sessions');
  // Re-import to pick up new homedir
  vi.resetModules();
  session = await import('../src/session.js');
});

afterEach(() => {
  rmSync(tempHome, { recursive: true, force: true });
});

describe('getSessionsDir', () => {
  it('returns the correct path for a project alias', () => {
    const dir = session.getSessionsDir('myproject');
    expect(dir).toBe(join(tempHome, '.bufo', 'sessions', 'myproject'));
  });
});

describe('createSession', () => {
  it('creates session.yaml with correct structure', async () => {
    await session.createSession('proj', 'my-session');

    const sessionFile = join(sessionsDir, 'proj', 'my-session', 'session.yaml');
    expect(existsSync(sessionFile)).toBe(true);

    const raw = readFileSync(sessionFile, 'utf-8');
    const doc = yaml.load(raw) as Record<string, unknown>;

    expect(doc.name).toBe('my-session');
    expect(doc.project).toBe('proj');
    expect(doc.type).toBe('general');
    expect(doc.summary).toBe('');
    expect(doc.claude_session_id).toBe('');
    expect(doc.created).toBeDefined();
    expect(doc.last_accessed).toBeDefined();
  });

  it('creates context.md when context is provided', async () => {
    await session.createSession('proj', 'ctx-session', 'Review PR #42');

    const contextFile = join(sessionsDir, 'proj', 'ctx-session', 'context.md');
    expect(existsSync(contextFile)).toBe(true);
    expect(readFileSync(contextFile, 'utf-8')).toBe('Review PR #42');
  });

  it('throws if session already exists', async () => {
    await session.createSession('proj', 'dup');
    await expect(session.createSession('proj', 'dup')).rejects.toThrow(
      "Session 'dup' already exists"
    );
  });
});

describe('updateSession', () => {
  it('modifies a field in session.yaml', async () => {
    await session.createSession('proj', 'upd');
    await session.updateSession('proj', 'upd', 'summary', 'Updated summary');

    const sessionFile = join(sessionsDir, 'proj', 'upd', 'session.yaml');
    const doc = yaml.load(readFileSync(sessionFile, 'utf-8')) as Record<string, unknown>;
    expect(doc.summary).toBe('Updated summary');
  });

  it('throws if session does not exist', async () => {
    await expect(
      session.updateSession('proj', 'nonexistent', 'summary', 'x')
    ).rejects.toThrow("Session 'nonexistent' not found");
  });
});

describe('getSessionField', () => {
  it('reads back a field value', async () => {
    await session.createSession('proj', 'get-test');
    await session.updateSession('proj', 'get-test', 'summary', 'hello world');

    const val = await session.getSessionField('proj', 'get-test', 'summary');
    expect(val).toBe('hello world');
  });

  it('returns null for missing session', async () => {
    const val = await session.getSessionField('proj', 'nope', 'summary');
    expect(val).toBeNull();
  });

  it('returns null for empty field', async () => {
    await session.createSession('proj', 'empty-field');
    const val = await session.getSessionField('proj', 'empty-field', 'summary');
    expect(val).toBeNull();
  });
});

describe('deleteSession', () => {
  it('removes the session directory', async () => {
    await session.createSession('proj', 'del-me');
    const sessionDir = join(sessionsDir, 'proj', 'del-me');
    expect(existsSync(sessionDir)).toBe(true);

    await session.deleteSession('proj', 'del-me');
    expect(existsSync(sessionDir)).toBe(false);
  });

  it('throws if session does not exist', async () => {
    await expect(session.deleteSession('proj', 'ghost')).rejects.toThrow(
      "Session 'ghost' not found"
    );
  });
});

describe('saveSessionLayout + loadSessionLayout', () => {
  it('round-trips layout data', async () => {
    await session.createSession('proj', 'layout-test');
    const sessionDir = join(sessionsDir, 'proj', 'layout-test');

    const layout: SessionLayout = {
      window_id: 'w-123',
      terminal_sid: 't-456',
      server_sid: 's-789',
      main_sid: 'm-abc',
      info_sid: 'i-def',
    };

    await session.saveSessionLayout(sessionDir, layout);
    const loaded = await session.loadSessionLayout(sessionDir);

    expect(loaded).toEqual(layout);
  });

  it('returns null when no layout exists', async () => {
    await session.createSession('proj', 'no-layout');
    const sessionDir = join(sessionsDir, 'proj', 'no-layout');

    const loaded = await session.loadSessionLayout(sessionDir);
    expect(loaded).toBeNull();
  });
});
