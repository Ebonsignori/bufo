import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, rm, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import {
  readMeta,
  writeMeta,
  clearMeta,
  extractTicketFromBranch,
  extractLinearUrlFromBody,
} from '../src/meta.js';
import type { TadpoleMeta } from '../src/types.js';

describe('meta', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'bufo-meta-test-'));
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  describe('writeMeta + readMeta round-trip', () => {
    it('writes and reads back identical metadata', async () => {
      const meta: TadpoleMeta = {
        type: 'ticket',
        name: 'fix login bug',
        ticket: 'ENG-123',
        ticket_url: 'https://linear.app/team/issue/ENG-123',
        pr_number: '42',
        pr_title: 'Fix login bug',
        pr_url: 'https://github.com/org/repo/pull/42',
        links: [{ label: 'Docs', url: 'https://docs.example.com' }],
      };

      await writeMeta(tmpDir, meta);
      const result = await readMeta(tmpDir);
      expect(result).toEqual(meta);
    });

    it('writes valid JSON to .bufo-meta', async () => {
      const meta: TadpoleMeta = { type: 'tadpole', name: 'test' };
      await writeMeta(tmpDir, meta);

      const raw = await readFile(join(tmpDir, '.bufo-meta'), 'utf-8');
      expect(() => JSON.parse(raw)).not.toThrow();
      expect(JSON.parse(raw)).toEqual(meta);
    });

    it('overwrites existing metadata', async () => {
      await writeMeta(tmpDir, { type: 'tadpole', name: 'first' });
      await writeMeta(tmpDir, { type: 'ticket', name: 'second', ticket: 'ENG-1' });

      const result = await readMeta(tmpDir);
      expect(result).toEqual({ type: 'ticket', name: 'second', ticket: 'ENG-1' });
    });

    it('handles empty metadata object', async () => {
      await writeMeta(tmpDir, {});
      const result = await readMeta(tmpDir);
      expect(result).toEqual({});
    });
  });

  describe('readMeta', () => {
    it('returns null when file does not exist', async () => {
      const result = await readMeta(tmpDir);
      expect(result).toBeNull();
    });

    it('returns null for malformed JSON', async () => {
      await writeFile(join(tmpDir, '.bufo-meta'), '{broken json!!!', 'utf-8');
      const result = await readMeta(tmpDir);
      expect(result).toBeNull();
    });

    it('returns null for non-existent directory', async () => {
      const result = await readMeta('/tmp/nonexistent-bufo-dir-12345');
      expect(result).toBeNull();
    });
  });

  describe('clearMeta', () => {
    it('removes the .bufo-meta file', async () => {
      await writeMeta(tmpDir, { type: 'tadpole' });
      expect(await readMeta(tmpDir)).not.toBeNull();

      await clearMeta(tmpDir);
      expect(await readMeta(tmpDir)).toBeNull();
    });

    it('does not throw when file does not exist', async () => {
      await expect(clearMeta(tmpDir)).resolves.toBeUndefined();
    });
  });

  describe('extractTicketFromBranch', () => {
    it('extracts ticket from feature/ENG-123-foo', () => {
      expect(extractTicketFromBranch('feature/ENG-123-foo')).toBe('ENG-123');
    });

    it('extracts ticket from user/ENG-456-fix-bug', () => {
      expect(extractTicketFromBranch('user/ENG-456-fix-bug')).toBe('ENG-456');
    });

    it('extracts ticket from bare ENG-789', () => {
      expect(extractTicketFromBranch('ENG-789')).toBe('ENG-789');
    });

    it('extracts ticket from ENG-123-description', () => {
      expect(extractTicketFromBranch('ENG-123-description')).toBe('ENG-123');
    });

    it('uppercases lowercase ticket IDs', () => {
      expect(extractTicketFromBranch('eng-123-some-fix')).toBe('ENG-123');
    });

    it('returns null for main', () => {
      expect(extractTicketFromBranch('main')).toBeNull();
    });

    it('returns null for no-ticket branch', () => {
      expect(extractTicketFromBranch('feature/add-login')).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(extractTicketFromBranch('')).toBeNull();
    });

    it('extracts first match when multiple tickets present', () => {
      expect(extractTicketFromBranch('ABC-1-and-DEF-2')).toBe('ABC-1');
    });
  });

  describe('extractLinearUrlFromBody', () => {
    it('extracts a Linear URL from text', () => {
      const body = 'Fixes https://linear.app/team/issue/ENG-123 in prod';
      expect(extractLinearUrlFromBody(body)).toBe(
        'https://linear.app/team/issue/ENG-123',
      );
    });

    it('extracts URL from multiline text', () => {
      const body = `## Changes
This fixes the bug.

Ticket: https://linear.app/myteam/issue/PROJ-456/fix-login-page
`;
      expect(extractLinearUrlFromBody(body)).toBe(
        'https://linear.app/myteam/issue/PROJ-456/fix-login-page',
      );
    });

    it('extracts URL from parenthesized context', () => {
      const body = 'Related (https://linear.app/team/issue/ENG-99)';
      expect(extractLinearUrlFromBody(body)).toBe(
        'https://linear.app/team/issue/ENG-99',
      );
    });

    it('returns null when no Linear URL present', () => {
      expect(extractLinearUrlFromBody('No links here')).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(extractLinearUrlFromBody('')).toBeNull();
    });

    it('returns null for non-Linear URLs', () => {
      expect(
        extractLinearUrlFromBody('See https://github.com/org/repo/issues/1'),
      ).toBeNull();
    });
  });
});
