import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { parseTicketIdentifier, isGithubIssueUrl } from '../src/commands/ticket.js';

describe('parseTicketIdentifier', () => {
  it('parses a Linear URL', () => {
    expect(
      parseTicketIdentifier('https://linear.app/myteam/issue/ENG-123/fix-the-bug'),
    ).toBe('ENG-123');
  });

  it('parses a Linear URL without slug', () => {
    expect(
      parseTicketIdentifier('https://linear.app/myteam/issue/ENG-456'),
    ).toBe('ENG-456');
  });

  it('parses a GitHub issue URL', () => {
    expect(
      parseTicketIdentifier('https://github.com/owner/repo/issues/456'),
    ).toBe('GH-456');
  });

  it('returns plain identifier as-is', () => {
    expect(parseTicketIdentifier('ENG-123')).toBe('ENG-123');
  });

  it('returns plain identifier with hash prefix', () => {
    expect(parseTicketIdentifier('#42')).toBe('#42');
  });

  it('returns null for empty string', () => {
    expect(parseTicketIdentifier('')).toBeNull();
  });

  it('returns null for whitespace', () => {
    expect(parseTicketIdentifier('   ')).toBeNull();
  });

  it('returns null for unrecognized URL', () => {
    expect(parseTicketIdentifier('https://example.com/something')).toBeNull();
  });

  it('returns null for string with spaces', () => {
    expect(parseTicketIdentifier('ENG 123')).toBeNull();
  });
});

describe('isGithubIssueUrl', () => {
  it('returns true for a valid GitHub issue URL', () => {
    expect(isGithubIssueUrl('https://github.com/owner/repo/issues/42')).toBe(true);
  });

  it('returns false for a Linear URL', () => {
    expect(isGithubIssueUrl('https://linear.app/team/issue/ENG-123')).toBe(false);
  });

  it('returns false for a plain string', () => {
    expect(isGithubIssueUrl('ENG-123')).toBe(false);
  });

  it('returns false for a GitHub PR URL', () => {
    expect(isGithubIssueUrl('https://github.com/owner/repo/pull/42')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isGithubIssueUrl('')).toBe(false);
  });
});

describe('handleTicket', () => {
  let handleTicket: typeof import('../src/commands/ticket.js').handleTicket;

  const mockProject = {
    alias: 'test',
    session_name: 'test-session',
    tadpole_base: '/tmp/bufo-test-tadpoles',
    main_repo: '/tmp/bufo-test-repo',
    config_file: '/tmp/bufo-test-config.yaml',
    tadpoles: { count: 5, prefix: 'tp', branch_pattern: 'tp-{N}' },
  };

  beforeEach(async () => {
    vi.resetModules();

    vi.doMock('execa', () => ({
      execa: vi.fn().mockRejectedValue(new Error('mocked')),
    }));

    vi.doMock('@bufo/core', () => ({
      writeMeta: vi.fn().mockResolvedValue(undefined),
    }));

    vi.doMock('fs/promises', () => ({
      readdir: vi.fn().mockResolvedValue([]),
      stat: vi.fn().mockRejectedValue(new Error('ENOENT')),
      writeFile: vi.fn().mockResolvedValue(undefined),
      mkdir: vi.fn().mockResolvedValue(undefined),
      access: vi.fn().mockRejectedValue(new Error('ENOENT')),
      rename: vi.fn().mockResolvedValue(undefined),
    }));

    const mod = await import('../src/commands/ticket.js');
    handleTicket = mod.handleTicket;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('throws when identifier is empty', async () => {
    await expect(handleTicket(mockProject, '')).rejects.toThrow(
      'Ticket identifier required',
    );
  });

  it('throws for invalid identifier (unrecognized URL)', async () => {
    await expect(
      handleTicket(mockProject, 'https://example.com/not-a-ticket'),
    ).rejects.toThrow('Invalid ticket identifier');
  });
});
