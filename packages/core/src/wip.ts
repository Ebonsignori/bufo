import { readdir, readFile, rm, stat } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

export interface WipMetadata {
  timestamp: string;
  slug: string;
  summary: string;
  tadpole: number;
  branch: string;
  commits_ahead: number;
  created_at: string;
}

export interface WipEntry {
  path: string;      // absolute path to the WIP snapshot dir
  metadata: WipMetadata;
}

/**
 * Absolute path to the WIP directory for a specific tadpole.
 * Pattern: ~/.bufo/wip/<alias>/<prefix>-<N>/
 */
export function getWipDir(alias: string, prefix: string, num: number): string {
  return join(homedir(), '.bufo', 'wip', alias, `${prefix}-${num}`);
}

/**
 * Load metadata.json from a WIP snapshot directory.
 * Returns null if missing or malformed.
 */
export async function loadWipMetadata(wipPath: string): Promise<WipMetadata | null> {
  try {
    const metadataPath = join(wipPath, 'metadata.json');
    const raw = await readFile(metadataPath, 'utf-8');
    const data = JSON.parse(raw);

    // Validate required fields exist
    if (
      typeof data.timestamp !== 'string' ||
      typeof data.slug !== 'string' ||
      typeof data.summary !== 'string' ||
      typeof data.tadpole !== 'number' ||
      typeof data.branch !== 'string' ||
      typeof data.commits_ahead !== 'number' ||
      typeof data.created_at !== 'string'
    ) {
      return null;
    }

    return {
      timestamp: data.timestamp,
      slug: data.slug,
      summary: data.summary,
      tadpole: data.tadpole,
      branch: data.branch,
      commits_ahead: data.commits_ahead,
      created_at: data.created_at,
    };
  } catch {
    return null;
  }
}

/**
 * List all WIP entries for a specific tadpole, newest first.
 * Each entry is a timestamped subdirectory containing metadata.json.
 */
export async function listWips(alias: string, prefix: string, num: number): Promise<WipEntry[]> {
  const wipDir = getWipDir(alias, prefix, num);
  return listWipsInDir(wipDir);
}

/**
 * List all WIP entries across all tadpoles for a project, newest first.
 */
export async function listAllWips(alias: string): Promise<WipEntry[]> {
  const projectWipDir = join(homedir(), '.bufo', 'wip', alias);

  let tadpoleDirs: string[];
  try {
    const entries = await readdir(projectWipDir, { withFileTypes: true });
    tadpoleDirs = entries
      .filter((e) => e.isDirectory())
      .map((e) => join(projectWipDir, e.name));
  } catch {
    return [];
  }

  const allEntries: WipEntry[] = [];
  for (const tpDir of tadpoleDirs) {
    const entries = await listWipsInDir(tpDir);
    allEntries.push(...entries);
  }

  // Sort newest first by timestamp from metadata (falling back to dir name)
  allEntries.sort((a, b) => b.metadata.timestamp.localeCompare(a.metadata.timestamp));

  return allEntries;
}

/**
 * Delete a WIP snapshot directory and all its contents.
 */
export async function deleteWip(wipPath: string): Promise<void> {
  await rm(wipPath, { recursive: true, force: true });
}

// --- internal helpers ---

async function listWipsInDir(dir: string): Promise<WipEntry[]> {
  let subdirs: string[];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    subdirs = entries
      .filter((e) => e.isDirectory())
      .map((e) => join(dir, e.name));
  } catch {
    return [];
  }

  const results: WipEntry[] = [];
  for (const subdir of subdirs) {
    const metadata = await loadWipMetadata(subdir);
    if (metadata) {
      results.push({ path: subdir, metadata });
    }
  }

  // Sort newest first by timestamp
  results.sort((a, b) => b.metadata.timestamp.localeCompare(a.metadata.timestamp));

  return results;
}
