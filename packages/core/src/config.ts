import { readFile, readdir, stat } from 'node:fs/promises';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';
import * as yaml from 'js-yaml';
import type {
  BufoProject,
  GlobalConfig,
  TadpoleMeta,
  TadpoleState,
  BufoSession,
  SessionLayout,
} from './types.js';

// Use getter functions instead of top-level constants so that mocked homedir()
// is called at runtime rather than at module load time.
function getBufoDirPath(): string {
  return join(homedir(), '.bufo');
}
function getProjectsDir(): string {
  return join(getBufoDirPath(), 'projects');
}
function getStateDir(): string {
  return join(getBufoDirPath(), 'state');
}
function getSessionsDir(): string {
  return join(getBufoDirPath(), 'sessions');
}
function getGlobalConfigPath(): string {
  return join(getBufoDirPath(), 'config.yaml');
}

export function getBufoDir(): string {
  return getBufoDirPath();
}

export function bufoExists(): boolean {
  return existsSync(getBufoDirPath());
}

function expandPath(p: string): string {
  if (p.startsWith('~/') || p === '~') {
    return join(homedir(), p.slice(2));
  }
  return p;
}

export function loadGlobalConfig(): GlobalConfig {
  const globalConfig = getGlobalConfigPath();
  if (!existsSync(globalConfig)) return {};
  try {
    const raw = readFileSync(globalConfig, 'utf-8');
    return (yaml.load(raw) as GlobalConfig) || {};
  } catch {
    return {};
  }
}

export function loadProject(alias: string, filePath: string): BufoProject {
  const raw = readFileSync(filePath, 'utf-8');
  const doc = yaml.load(raw) as Record<string, unknown>;

  // Support both new tadpoles: and legacy workspaces: keys
  const tadpoles =
    (doc.tadpoles as Record<string, unknown>) ||
    (doc.workspaces as Record<string, unknown>) ||
    {};
  const ports = (doc.ports as Record<string, unknown>) || {};
  const ticket = (doc.ticket as Record<string, unknown>) || undefined;

  return {
    alias,
    session_name: (doc.session_name as string) || alias,
    tadpole_base: expandPath(
      (doc.tadpole_base as string) || (doc.workspace_base as string) || '',
    ),
    main_repo: expandPath((doc.main_repo as string) || ''),
    tadpoles: {
      count: (tadpoles.count as number) || 5,
      prefix: (tadpoles.prefix as string) || 'tadpole',
      branch_pattern: (tadpoles.branch_pattern as string) || 'tadpole-{N}',
    },
    ports: ports
      ? {
          api_base: ports.api_base as number | undefined,
          app_base: ports.app_base as number | undefined,
        }
      : undefined,
    layout: doc.layout as BufoProject['layout'],
    ticket: ticket
      ? {
          linear_team: (ticket.linear_team as string) || undefined,
          github_repo: (ticket.github_repo as string) || undefined,
        }
      : undefined,
  };
}

export function discoverProjects(): BufoProject[] {
  const projectsDir = getProjectsDir();
  if (!existsSync(projectsDir)) return [];
  const files = readdirSync(projectsDir).filter(
    (f) => f.endsWith('.yaml') || f.endsWith('.yml'),
  );
  const projects: BufoProject[] = [];
  for (const file of files) {
    const alias = file.replace(/\.ya?ml$/, '');
    try {
      projects.push(loadProject(alias, join(projectsDir, file)));
    } catch {
      // skip invalid configs
    }
  }
  const defaultAlias = loadGlobalConfig().default_project;
  if (defaultAlias) {
    projects.sort((a, b) =>
      a.alias === defaultAlias ? -1 : b.alias === defaultAlias ? 1 : 0,
    );
  }
  return projects;
}

export function loadTadpoleState(
  sessionName: string,
  num: number,
): TadpoleState | undefined {
  const stateDir = getStateDir();
  // Prefer tp<N>.json, fall back to legacy ws<N>.json
  let stateFile = join(stateDir, sessionName, `tp${num}.json`);
  if (!existsSync(stateFile)) {
    stateFile = join(stateDir, sessionName, `ws${num}.json`);
  }
  if (!existsSync(stateFile)) return undefined;
  try {
    return JSON.parse(readFileSync(stateFile, 'utf-8')) as TadpoleState;
  } catch {
    return undefined;
  }
}

export function loadTadpoleMeta(tadpoleDir: string): TadpoleMeta | undefined {
  const metaFile = join(tadpoleDir, '.bufo-meta');
  if (!existsSync(metaFile)) return undefined;
  try {
    return JSON.parse(readFileSync(metaFile, 'utf-8')) as TadpoleMeta;
  } catch {
    return undefined;
  }
}

export function isTadpoleLocked(tadpoleDir: string): boolean {
  return existsSync(join(tadpoleDir, '.bufo-lock'));
}

export function getCustomName(tadpoleDir: string): string | undefined {
  const nameFile = join(tadpoleDir, '.bufo-name');
  if (!existsSync(nameFile)) return undefined;
  try {
    return readFileSync(nameFile, 'utf-8').trim() || undefined;
  } catch {
    return undefined;
  }
}

export function loadSession(
  projectAlias: string,
  sessionName: string,
  activeSessions?: Set<string>,
): BufoSession | undefined {
  const sessionsDir = getSessionsDir();
  const sessionDir = join(sessionsDir, projectAlias, sessionName);
  const sessionFile = join(sessionDir, 'session.yaml');
  if (!existsSync(sessionFile)) return undefined;
  try {
    const raw = readFileSync(sessionFile, 'utf-8');
    const doc = yaml.load(raw) as Record<string, unknown>;

    let layout: SessionLayout | undefined;
    const layoutFile = join(sessionDir, 'layout.json');
    if (existsSync(layoutFile)) {
      try {
        layout = JSON.parse(
          readFileSync(layoutFile, 'utf-8'),
        ) as SessionLayout;
      } catch {
        // stale or malformed layout — ignore
      }
    }

    const active = layout?.main_sid
      ? (activeSessions?.has(layout.main_sid) ?? false)
      : false;
    const hasReviewOutput = existsSync(join(sessionDir, 'review-output.md'));

    return {
      name: (doc.name as string) || sessionName,
      project: (doc.project as string) || projectAlias,
      created: (doc.created as string) || '',
      last_accessed: (doc.last_accessed as string) || '',
      summary: (doc.summary as string) || '',
      type: ((doc.type as string) || 'general') as BufoSession['type'],
      prs: doc.prs as string[] | undefined,
      active,
      hasReviewOutput,
      layout,
    };
  } catch {
    return undefined;
  }
}

export function discoverSessions(
  projectAlias: string,
  activeSessions?: Set<string>,
): BufoSession[] {
  const sessionsDir = getSessionsDir();
  const projectSessionsDir = join(sessionsDir, projectAlias);
  if (!existsSync(projectSessionsDir)) return [];
  let entries: string[];
  try {
    entries = readdirSync(projectSessionsDir);
  } catch {
    return [];
  }
  const sessions: BufoSession[] = [];
  for (const entry of entries) {
    const fullPath = join(projectSessionsDir, entry);
    try {
      if (!statSync(fullPath).isDirectory()) continue;
    } catch {
      continue;
    }
    const session = loadSession(projectAlias, entry, activeSessions);
    if (session) sessions.push(session);
  }
  return sessions;
}

export function getAllSessions(
  activeSessions?: Set<string>,
): { projectAlias: string; sessions: BufoSession[] }[] {
  const projects = discoverProjects();
  const result: { projectAlias: string; sessions: BufoSession[] }[] = [];
  for (const project of projects) {
    const sessions = discoverSessions(project.alias, activeSessions);
    if (sessions.length > 0) {
      result.push({ projectAlias: project.alias, sessions });
    }
  }
  return result;
}

// ============================================================================
// Project resolution functions (ported from src/lib/projects.sh)
// ============================================================================

/**
 * Load a single project config asynchronously by reading and parsing its YAML file.
 */
async function loadProjectAsync(
  alias: string,
  filePath: string,
): Promise<BufoProject> {
  const raw = await readFile(filePath, 'utf-8');
  const doc = yaml.load(raw) as Record<string, unknown>;

  const tadpoles =
    (doc.tadpoles as Record<string, unknown>) ||
    (doc.workspaces as Record<string, unknown>) ||
    {};
  const ports = (doc.ports as Record<string, unknown>) || {};
  const ticket = (doc.ticket as Record<string, unknown>) || undefined;

  return {
    alias,
    session_name: (doc.session_name as string) || alias,
    tadpole_base: expandPath(
      (doc.tadpole_base as string) || (doc.workspace_base as string) || '',
    ),
    main_repo: expandPath((doc.main_repo as string) || ''),
    tadpoles: {
      count: (tadpoles.count as number) || 5,
      prefix: (tadpoles.prefix as string) || 'tadpole',
      branch_pattern: (tadpoles.branch_pattern as string) || 'tadpole-{N}',
    },
    ports: ports
      ? {
          api_base: ports.api_base as number | undefined,
          app_base: ports.app_base as number | undefined,
        }
      : undefined,
    layout: doc.layout as BufoProject['layout'],
    ticket: ticket
      ? {
          linear_team: (ticket.linear_team as string) || undefined,
          github_repo: (ticket.github_repo as string) || undefined,
        }
      : undefined,
  };
}

/**
 * Load all project configs as a Map<alias, BufoProject>.
 */
export async function loadAllProjectConfigs(): Promise<
  Map<string, BufoProject>
> {
  const map = new Map<string, BufoProject>();
  const projectsDir = getProjectsDir();

  let files: string[];
  try {
    const entries = await readdir(projectsDir);
    files = entries.filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'));
  } catch {
    return map;
  }

  for (const file of files) {
    const alias = file.replace(/\.ya?ml$/, '');
    try {
      const project = await loadProjectAsync(alias, join(projectsDir, file));
      map.set(alias, project);
    } catch {
      // skip invalid configs
    }
  }

  return map;
}

/**
 * Validate a project config object. Returns {ok: true} or {ok: false, errors: string[]}.
 */
export function validateProject(
  project: BufoProject,
): { ok: true } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  if (!project.session_name) {
    errors.push('session_name is required');
  }
  if (!project.tadpole_base) {
    errors.push('tadpole_base is required');
  }
  if (!project.main_repo) {
    errors.push('main_repo is required');
  }
  if (!project.tadpoles?.prefix) {
    errors.push('tadpoles.prefix is required');
  }
  if (!project.tadpoles?.branch_pattern) {
    errors.push('tadpoles.branch_pattern is required');
  }
  if (
    project.tadpoles?.count != null &&
    (typeof project.tadpoles.count !== 'number' || project.tadpoles.count < 1)
  ) {
    errors.push('tadpoles.count must be a positive number');
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }
  return { ok: true };
}

/**
 * Find which project owns the given cwd by matching against tadpole_base and main_repo paths.
 * Returns null if no project matches.
 */
export async function resolveProjectFromCwd(
  cwd: string,
): Promise<BufoProject | null> {
  const projects = await loadAllProjectConfigs();
  const normalizedCwd = resolve(cwd);

  for (const project of projects.values()) {
    // Check tadpole_base first (more specific match)
    if (project.tadpole_base) {
      const normalizedBase = resolve(project.tadpole_base);
      if (
        normalizedCwd === normalizedBase ||
        normalizedCwd.startsWith(normalizedBase + '/')
      ) {
        return project;
      }
    }

    // Then check main_repo
    if (project.main_repo) {
      const normalizedRepo = resolve(project.main_repo);
      if (
        normalizedCwd === normalizedRepo ||
        normalizedCwd.startsWith(normalizedRepo + '/')
      ) {
        return project;
      }
    }
  }

  return null;
}

/**
 * Extract owner/repo from a GitHub URL (https or ssh).
 * Returns null if the URL doesn't match.
 */
function extractGithubOwnerRepo(url: string): string | null {
  const match = url.match(/github\.com[:/]([^/]+\/[^/]+)/);
  if (!match) return null;
  return match[1].replace(/\.git$/, '');
}

/**
 * Find which project owns a GitHub PR/issue URL by matching the URL's owner/repo
 * against each project's configured ticket.github_repo.
 */
export async function resolveProjectFromGithubUrl(
  url: string,
): Promise<BufoProject | null> {
  const urlOwnerRepo = extractGithubOwnerRepo(url);
  if (!urlOwnerRepo) return null;

  const projects = await loadAllProjectConfigs();

  for (const project of projects.values()) {
    // Check ticket.github_repo config if present
    if (project.ticket?.github_repo) {
      const configuredRepo = project.ticket.github_repo.replace(/\.git$/, '');
      if (configuredRepo === urlOwnerRepo) {
        return project;
      }
    }
  }

  return null;
}

/**
 * Find which project owns a Linear or GitHub Issue ticket URL.
 * Matches against ticket.linear_team or ticket.github_repo in project configs.
 * Returns the first unique match, or null if no match or ambiguous.
 */
export async function resolveProjectFromTicketUrl(
  url: string,
): Promise<BufoProject | null> {
  let matchValue: string | null = null;
  let isLinear = false;

  // Determine URL type and extract the matchable token
  const linearMatch = url.match(/^https:\/\/linear\.app\/([^/]+)\//);
  if (linearMatch) {
    isLinear = true;
    matchValue = linearMatch[1];
  } else {
    const githubMatch = url.match(
      /^https:\/\/github\.com\/([^/]+\/[^/]+)\/issues\//,
    );
    if (githubMatch) {
      matchValue = githubMatch[1].replace(/\.git$/, '');
    }
  }

  if (!matchValue) return null;

  const projects = await loadAllProjectConfigs();
  const matches: BufoProject[] = [];

  for (const project of projects.values()) {
    let configuredValue: string | undefined;
    if (isLinear) {
      configuredValue = project.ticket?.linear_team;
    } else {
      configuredValue = project.ticket?.github_repo;
    }

    if (!configuredValue) continue;

    // Normalize: strip trailing .git
    configuredValue = configuredValue.replace(/\.git$/, '');

    if (configuredValue === matchValue) {
      matches.push(project);
    }
  }

  // No match
  if (matches.length === 0) return null;

  // Exactly one match — return it
  if (matches.length === 1) return matches[0];

  // Multiple matches — ambiguous, return null (CLI layer handles interactive picker)
  return null;
}

/**
 * Get the default project (from global config default_project, or the only project if one exists).
 * Returns null if there are multiple projects and none is set as default.
 */
export async function resolveDefaultProject(): Promise<BufoProject | null> {
  const projects = await loadAllProjectConfigs();

  if (projects.size === 0) return null;

  // Check global config for default_project
  const globalConfigPath = getGlobalConfigPath();
  let globalConfig: GlobalConfig;
  try {
    const raw = await readFile(globalConfigPath, 'utf-8');
    globalConfig = (yaml.load(raw) as GlobalConfig) || {};
  } catch {
    globalConfig = {};
  }

  if (globalConfig.default_project) {
    const project = projects.get(globalConfig.default_project);
    if (project) return project;
    // Default project configured but not found — fall through
  }

  // If there's exactly one project, use it
  if (projects.size === 1) {
    return projects.values().next().value!;
  }

  // Multiple projects, no default set
  return null;
}
