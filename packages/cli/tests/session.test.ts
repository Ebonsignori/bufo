import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { BufoProject } from '@bufo/core';

// Mock @bufo/core session functions
vi.mock('@bufo/core', async () => {
  const actual = await vi.importActual<typeof import('@bufo/core')>('@bufo/core');
  return {
    ...actual,
    createSession: vi.fn(),
    updateSession: vi.fn(),
    getSession: vi.fn(),
    loadSessionFull: vi.fn(),
    listSessions: vi.fn(),
    deleteSession: vi.fn(),
    getSessionDir: vi.fn(),
    saveSessionLayout: vi.fn(),
    loadSessionLayout: vi.fn(),
    focusSessionAsync: vi.fn(),
    sessionExists: vi.fn(),
    sendText: vi.fn(),
    sendInterrupt: vi.fn(),
    closeTabBySession: vi.fn(),
  };
});

// Mock execa
vi.mock('execa', () => ({
  execa: vi.fn(),
}));

import {
  handleSession,
  sessionStart,
  sessionResume,
  closeSessionPanes,
} from '../src/commands/session.js';

import {
  createSession,
  updateSession,
  loadSessionFull,
  listSessions,
  deleteSession,
  getSessionDir,
  loadSessionLayout,
  sessionExists,
  focusSessionAsync,
  sendText,
  sendInterrupt,
  closeTabBySession,
} from '@bufo/core';

const mockedCreateSession = vi.mocked(createSession);
const mockedUpdateSession = vi.mocked(updateSession);
const mockedLoadSessionFull = vi.mocked(loadSessionFull);
const mockedListSessions = vi.mocked(listSessions);
const mockedDeleteSession = vi.mocked(deleteSession);
const mockedGetSessionDir = vi.mocked(getSessionDir);
const mockedLoadSessionLayout = vi.mocked(loadSessionLayout);
const mockedSessionExists = vi.mocked(sessionExists);
const mockedFocusSessionAsync = vi.mocked(focusSessionAsync);
const mockedSendText = vi.mocked(sendText);
const mockedSendInterrupt = vi.mocked(sendInterrupt);
const mockedCloseTabBySession = vi.mocked(closeTabBySession);

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

describe('handleSession', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('ls / list', () => {
    it('lists sessions with default subcommand', async () => {
      const logSpy = vi.spyOn(console, 'log');
      mockedListSessions.mockResolvedValue([]);
      const project = makeProject();
      await handleSession(project, []);
      expect(mockedListSessions).toHaveBeenCalledWith(project, undefined);
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Sessions'));
    });

    it('lists sessions with explicit ls', async () => {
      mockedListSessions.mockResolvedValue([
        {
          name: 'my-review',
          project: 'test',
          created: '2026-04-01T00:00:00Z',
          last_accessed: '2026-04-01T00:00:00Z',
          summary: 'Test review',
          type: 'general',
          active: false,
          hasReviewOutput: false,
        },
      ]);
      const project = makeProject();
      await handleSession(project, ['ls']);
      expect(mockedListSessions).toHaveBeenCalledWith(project, undefined);
    });

    it('passes filter to listSessions', async () => {
      mockedListSessions.mockResolvedValue([]);
      const project = makeProject();
      await handleSession(project, ['ls', 'review']);
      expect(mockedListSessions).toHaveBeenCalledWith(project, 'review');
    });
  });

  describe('start / new', () => {
    it('errors when no name provided', async () => {
      const errSpy = vi.spyOn(console, 'error');
      const project = makeProject();
      await handleSession(project, ['start']);
      expect(errSpy).toHaveBeenCalledWith(expect.stringContaining('Name required'));
      expect(mockedCreateSession).not.toHaveBeenCalled();
    });
  });

  describe('resume / continue', () => {
    it('errors when no name provided', async () => {
      const errSpy = vi.spyOn(console, 'error');
      const project = makeProject();
      await handleSession(project, ['resume']);
      expect(errSpy).toHaveBeenCalledWith(expect.stringContaining('Specify session name'));
    });
  });

  describe('delete / rm', () => {
    it('errors when no name provided', async () => {
      const errSpy = vi.spyOn(console, 'error');
      const project = makeProject();
      await handleSession(project, ['delete']);
      expect(errSpy).toHaveBeenCalledWith(expect.stringContaining('Specify session name'));
    });

    it('deletes a session', async () => {
      mockedGetSessionDir.mockReturnValue('/tmp/sessions/test/my-session');
      mockedLoadSessionLayout.mockResolvedValue(null);
      mockedDeleteSession.mockResolvedValue(undefined);

      const logSpy = vi.spyOn(console, 'log');
      const project = makeProject();
      await handleSession(project, ['delete', 'my-session']);
      expect(mockedDeleteSession).toHaveBeenCalledWith(project, 'my-session');
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Deleted session'));
    });

    it('reports error when session not found', async () => {
      mockedGetSessionDir.mockReturnValue('/tmp/sessions/test/nope');
      mockedLoadSessionLayout.mockResolvedValue(null);
      mockedDeleteSession.mockRejectedValue(new Error("Session 'nope' not found"));

      const errSpy = vi.spyOn(console, 'error');
      const project = makeProject();
      await handleSession(project, ['delete', 'nope']);
      expect(errSpy).toHaveBeenCalledWith(expect.stringContaining('not found'));
    });
  });

  describe('summary', () => {
    it('errors when no name provided', async () => {
      const errSpy = vi.spyOn(console, 'error');
      const project = makeProject();
      await handleSession(project, ['summary']);
      expect(errSpy).toHaveBeenCalledWith(expect.stringContaining('Usage'));
    });

    it('errors when no summary text provided', async () => {
      const errSpy = vi.spyOn(console, 'error');
      const project = makeProject();
      await handleSession(project, ['summary', 'my-session']);
      expect(errSpy).toHaveBeenCalledWith(expect.stringContaining('Summary text required'));
    });

    it('updates summary', async () => {
      mockedUpdateSession.mockResolvedValue(undefined);
      const logSpy = vi.spyOn(console, 'log');
      const project = makeProject();
      await handleSession(project, ['summary', 'my-session', 'Great work']);
      expect(mockedUpdateSession).toHaveBeenCalledWith(project, 'my-session', 'summary', 'Great work');
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Updated summary'));
    });
  });

  describe('unknown command', () => {
    it('reports error for unknown subcommand', async () => {
      const errSpy = vi.spyOn(console, 'error');
      const project = makeProject();
      await handleSession(project, ['foobar']);
      expect(errSpy).toHaveBeenCalledWith(expect.stringContaining('Unknown session command'));
    });
  });
});

describe('closeSessionPanes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does nothing when no layout exists', async () => {
    mockedLoadSessionLayout.mockResolvedValue(null);
    await closeSessionPanes('/some/dir');
    expect(mockedCloseTabBySession).not.toHaveBeenCalled();
  });

  it('closes tab by info_sid when present', async () => {
    mockedLoadSessionLayout.mockResolvedValue({
      window_id: 'w1',
      terminal_sid: 'aabbccdd-1111-2222-3333-444444444444',
      server_sid: 'aabbccdd-1111-2222-3333-555555555555',
      main_sid: 'aabbccdd-1111-2222-3333-666666666666',
      info_sid: 'aabbccdd-1111-2222-3333-777777777777',
    });
    mockedSessionExists.mockResolvedValue(true);
    mockedCloseTabBySession.mockResolvedValue(undefined);

    await closeSessionPanes('/some/dir');
    expect(mockedCloseTabBySession).toHaveBeenCalledWith('aabbccdd-1111-2222-3333-777777777777');
  });

  it('closes tab by main_sid when no info_sid', async () => {
    mockedLoadSessionLayout.mockResolvedValue({
      window_id: 'w1',
      terminal_sid: 'aabbccdd-1111-2222-3333-444444444444',
      server_sid: 'aabbccdd-1111-2222-3333-555555555555',
      main_sid: 'aabbccdd-1111-2222-3333-666666666666',
      info_sid: '',
    });
    mockedSessionExists.mockResolvedValue(true);
    mockedCloseTabBySession.mockResolvedValue(undefined);

    await closeSessionPanes('/some/dir');
    expect(mockedCloseTabBySession).toHaveBeenCalledWith('aabbccdd-1111-2222-3333-666666666666');
  });

  it('does not close when session is dead', async () => {
    mockedLoadSessionLayout.mockResolvedValue({
      window_id: 'w1',
      terminal_sid: 'aabbccdd-1111-2222-3333-444444444444',
      server_sid: 'aabbccdd-1111-2222-3333-555555555555',
      main_sid: 'aabbccdd-1111-2222-3333-666666666666',
      info_sid: '',
    });
    mockedSessionExists.mockResolvedValue(false);

    await closeSessionPanes('/some/dir');
    expect(mockedCloseTabBySession).not.toHaveBeenCalled();
  });
});

describe('sessionResume', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('errors when session not found', async () => {
    const errSpy = vi.spyOn(console, 'error');
    mockedLoadSessionFull.mockResolvedValue(null);
    const project = makeProject();
    await sessionResume(project, 'missing');
    expect(errSpy).toHaveBeenCalledWith(expect.stringContaining('not found'));
  });

  it('reconnects to existing layout when alive', async () => {
    mockedLoadSessionFull.mockResolvedValue({
      name: 'test-session',
      project: 'test',
      created: '2026-04-01T00:00:00Z',
      last_accessed: '2026-04-01T00:00:00Z',
      summary: 'My session',
      type: 'general',
      active: true,
      hasReviewOutput: false,
    });
    mockedGetSessionDir.mockReturnValue('/tmp/sessions/test/test-session');
    mockedUpdateSession.mockResolvedValue(undefined);
    mockedLoadSessionLayout.mockResolvedValue({
      window_id: 'w1',
      terminal_sid: 'aabbccdd-1111-2222-3333-444444444444',
      server_sid: 'aabbccdd-1111-2222-3333-555555555555',
      main_sid: 'aabbccdd-1111-2222-3333-666666666666',
      info_sid: '',
    });
    mockedSessionExists.mockResolvedValue(true);
    mockedFocusSessionAsync.mockResolvedValue(undefined);
    mockedSendInterrupt.mockResolvedValue(undefined);
    mockedSendText.mockResolvedValue(undefined);

    const project = makeProject();
    await sessionResume(project, 'test-session');

    expect(mockedFocusSessionAsync).toHaveBeenCalledWith('aabbccdd-1111-2222-3333-666666666666');
    expect(mockedSendInterrupt).toHaveBeenCalledWith('aabbccdd-1111-2222-3333-666666666666');
    expect(mockedSendText).toHaveBeenCalledWith(
      'aabbccdd-1111-2222-3333-666666666666',
      expect.stringContaining('--continue'),
    );
  });
});
