import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { readMeta, writeMeta, clearMeta, extractTicketFromBranch, extractLinearUrlFromBody } from '../src/meta.js';
import { mkdtemp, readFile, rm } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

describe('extractTicketFromBranch', () => {
  it('extracts from simple branch', () => {
    expect(extractTicketFromBranch('ENG-123')).toBe('ENG-123');
  });

  it('extracts from prefixed branch', () => {
    expect(extractTicketFromBranch('user/ENG-456-fix-bug')).toBe('ENG-456');
  });

  it('extracts case-insensitively', () => {
    expect(extractTicketFromBranch('eng-789-something')).toBe('eng-789');
  });

  it('returns null for no match', () => {
    expect(extractTicketFromBranch('main')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(extractTicketFromBranch('')).toBeNull();
  });
});

describe('extractLinearUrlFromBody', () => {
  it('extracts a Linear URL', () => {
    expect(
      extractLinearUrlFromBody('See https://linear.app/team/issue/ENG-123 for details'),
    ).toBe('https://linear.app/team/issue/ENG-123');
  });

  it('returns null when no URL present', () => {
    expect(extractLinearUrlFromBody('No links here')).toBeNull();
  });

  it('stops at closing paren', () => {
    expect(
      extractLinearUrlFromBody('(https://linear.app/team/issue/ENG-123)'),
    ).toBe('https://linear.app/team/issue/ENG-123');
  });
});

describe('readMeta / writeMeta / clearMeta', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'bufo-meta-test-'));
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  it('returns null for missing meta file', async () => {
    expect(await readMeta(tmpDir)).toBeNull();
  });

  it('writes and reads meta', async () => {
    const meta = { type: 'ticket' as const, name: 'ENG-123', ticket: 'ENG-123' };
    await writeMeta(tmpDir, meta);
    const result = await readMeta(tmpDir);
    expect(result).toEqual(meta);
  });

  it('uses atomic write (tmp file renamed)', async () => {
    const meta = { type: 'pr' as const, name: 'test-pr' };
    await writeMeta(tmpDir, meta);
    const raw = await readFile(join(tmpDir, '.bufo-meta'), 'utf-8');
    expect(JSON.parse(raw)).toEqual(meta);
  });

  it('clears meta', async () => {
    await writeMeta(tmpDir, { type: 'ticket' as const });
    await clearMeta(tmpDir);
    expect(await readMeta(tmpDir)).toBeNull();
  });

  it('clearMeta is idempotent', async () => {
    await clearMeta(tmpDir); // should not throw
  });
});
