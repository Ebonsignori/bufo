import { readFile, writeFile, rm, rename, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import type { TadpoleMeta } from './types.js';

/**
 * Read .bufo-meta from a directory. Returns null if missing or malformed.
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
 * Write .bufo-meta atomically.
 */
export async function writeMeta(dir: string, meta: TadpoleMeta): Promise<void> {
  const filePath = join(dir, '.bufo-meta');
  const tmpFile = `${filePath}.${Date.now()}.tmp`;
  await writeFile(tmpFile, JSON.stringify(meta, null, 2), 'utf-8');
  await rename(tmpFile, filePath);
}

/**
 * Remove .bufo-meta from a directory.
 */
export async function clearMeta(dir: string): Promise<void> {
  try {
    await rm(join(dir, '.bufo-meta'));
  } catch {
    // ignore
  }
}

/**
 * Extract a ticket identifier (e.g. "ENG-123") from a branch name.
 */
export function extractTicketFromBranch(branch: string): string | null {
  const match = branch.match(/([A-Z]+-\d+)/i);
  return match ? match[1] : null;
}

/**
 * Extract a Linear URL from a text body.
 */
export function extractLinearUrlFromBody(text: string): string | null {
  const match = text.match(/(https:\/\/linear\.app\/[^\s)]+)/);
  return match ? match[1] : null;
}
