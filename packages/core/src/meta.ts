import { readFile, writeFile, unlink, rename } from 'fs/promises';
import { join, dirname } from 'path';
import { randomBytes } from 'crypto';
import type { TadpoleMeta } from './types.js';

/**
 * Read .bufo-meta JSON from a tadpole directory.
 * Returns null if the file doesn't exist or is malformed.
 */
export async function readMeta(dir: string): Promise<TadpoleMeta | null> {
  try {
    const raw = await readFile(join(dir, '.bufo-meta'), 'utf-8');
    return JSON.parse(raw) as TadpoleMeta;
  } catch {
    return null;
  }
}

/**
 * Write .bufo-meta JSON to a tadpole directory.
 * Uses atomic write (write to tmp, then rename).
 */
export async function writeMeta(dir: string, meta: TadpoleMeta): Promise<void> {
  const target = join(dir, '.bufo-meta');
  const tmp = join(dirname(target), `.bufo-meta.tmp.${randomBytes(4).toString('hex')}`);
  await writeFile(tmp, JSON.stringify(meta, null, 2) + '\n', 'utf-8');
  await rename(tmp, target);
}

/**
 * Remove .bufo-meta from a tadpole directory.
 */
export async function clearMeta(dir: string): Promise<void> {
  try {
    await unlink(join(dir, '.bufo-meta'));
  } catch {
    // ignore if doesn't exist
  }
}

/**
 * Extract a ticket identifier (e.g. ENG-123) from a branch name.
 * Matches patterns like: user/ENG-123-fix-bug, ENG-123-description, eng-123
 * Returns null if no ticket found.
 */
export function extractTicketFromBranch(branch: string): string | null {
  const match = branch.match(/([A-Z]+-\d+)/i);
  return match ? match[1] : null;
}

/**
 * Extract a Linear URL from text (e.g. PR body).
 * Returns null if not found.
 */
export function extractLinearUrlFromBody(text: string): string | null {
  const match = text.match(/(https:\/\/linear\.app\/[^\s)]+)/);
  return match ? match[1] : null;
}
