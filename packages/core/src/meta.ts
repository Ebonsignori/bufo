import { readFile, writeFile, unlink, rename } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import type { TadpoleMeta } from './types.js';

const META_FILENAME = '.bufo-meta';

/**
 * Read .bufo-meta JSON from a tadpole directory.
 * Returns null if the file doesn't exist or is malformed.
 */
export async function readMeta(dir: string): Promise<TadpoleMeta | null> {
  try {
    const content = await readFile(join(dir, META_FILENAME), 'utf-8');
    return JSON.parse(content) as TadpoleMeta;
  } catch {
    return null;
  }
}

/**
 * Atomically write .bufo-meta JSON to a tadpole directory.
 * Writes to a temp file first, then renames for atomicity.
 */
export async function writeMeta(dir: string, meta: TadpoleMeta): Promise<void> {
  const metaPath = join(dir, META_FILENAME);
  const tmpFile = join(dirname(metaPath), `.bufo-meta.tmp.${process.pid}.${Date.now()}`);
  const json = JSON.stringify(meta, null, 2) + '\n';
  await writeFile(tmpFile, json, 'utf-8');
  await rename(tmpFile, metaPath);
}

/**
 * Delete .bufo-meta from a tadpole directory.
 */
export async function clearMeta(dir: string): Promise<void> {
  try {
    await unlink(join(dir, META_FILENAME));
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && (err as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw err;
    }
  }
}

/**
 * Extract a ticket identifier (e.g. "ENG-123") from a branch name.
 * Regex: /([A-Z]+-\d+)/i — returns first match or null.
 */
export function extractTicketFromBranch(branch: string): string | null {
  const match = branch.match(/([A-Z]+-\d+)/i);
  const ticket = match?.[1];
  return ticket != null ? ticket.toUpperCase() : null;
}

/**
 * Extract a Linear URL from PR body text.
 * Regex: /(https:\/\/linear\.app\/[^\s)]+)/
 * Returns first match or null.
 */
export function extractLinearUrlFromBody(text: string): string | null {
  const match = text.match(/(https:\/\/linear\.app\/[^\s)]+)/);
  return match?.[1] ?? null;
}
