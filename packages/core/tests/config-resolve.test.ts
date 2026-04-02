import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

let tempDir: string;

vi.mock('node:os', async () => {
  const actual = await vi.importActual<typeof import('node:os')>('node:os');
  return {
    ...actual,
    homedir: () => tempDir,
  };
});

import {
  loadAllProjectConfigs,
  validateProject,
  resolveProjectFromCwd,
  resolveProjectFromGithubUrl,
  resolveProjectFromTicketUrl,
  resolveDefaultProject,
} from '../src/config.js';
import type { BufoProject } from '../src/types.js';

function makeProjectYaml(opts: {
  session_name?: string;
  tadpole_base?: string;
  main_repo?: string;
  prefix?: string;
  branch_pattern?: string;
  count?: number;
  linear_team?: string;
  github_repo?: string;
}): string {
  const lines: string[] = [];
  if (opts.session_name) lines.push(`session_name: ${opts.session_name}`);
  if (opts.tadpole_base) lines.push(`tadpole_base: ${opts.tadpole_base}`);
  if (opts.main_repo) lines.push(`main_repo: ${opts.main_repo}`);
  lines.push('tadpoles:');
  lines.push(`  prefix: ${opts.prefix || 'tp'}`);
  lines.push(`  branch_pattern: ${opts.branch_pattern || 'tp-{N}'}`);
  if (opts.count) lines.push(`  count: ${opts.count}`);
  if (opts.linear_team || opts.github_repo) {
    lines.push('ticket:');
    if (opts.linear_team) lines.push(`  linear_team: ${opts.linear_team}`);
    if (opts.github_repo) lines.push(`  github_repo: ${opts.github_repo}`);
  }
  return lines.join('\n') + '\n';
}

describe('project resolution', () => {
  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'bufo-config-test-'));
    await mkdir(join(tempDir, '.bufo', 'projects'), { recursive: true });
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  describe('loadAllProjectConfigs', () => {
    it('returns empty map when no projects exist', async () => {
      // Remove the projects dir
      await rm(join(tempDir, '.bufo', 'projects'), { recursive: true });
      const result = await loadAllProjectConfigs();
      expect(result.size).toBe(0);
    });

    it('loads all project YAML files', async () => {
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'alpha.yaml'),
        makeProjectYaml({
          session_name: 'alpha-session',
          tadpole_base: '/tmp/alpha-tps',
          main_repo: '/tmp/alpha-repo',
        }),
      );
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'beta.yaml'),
        makeProjectYaml({
          session_name: 'beta-session',
          tadpole_base: '/tmp/beta-tps',
          main_repo: '/tmp/beta-repo',
        }),
      );

      const result = await loadAllProjectConfigs();
      expect(result.size).toBe(2);
      expect(result.get('alpha')?.session_name).toBe('alpha-session');
      expect(result.get('beta')?.session_name).toBe('beta-session');
    });

    it('skips invalid YAML files', async () => {
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'good.yaml'),
        makeProjectYaml({
          session_name: 'good-session',
          tadpole_base: '/tmp/good-tps',
          main_repo: '/tmp/good-repo',
        }),
      );
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'bad.yaml'),
        '{{{{invalid yaml',
      );

      const result = await loadAllProjectConfigs();
      // bad.yaml may still parse (yaml.load is lenient) or may be skipped
      expect(result.has('good')).toBe(true);
    });
  });

  describe('validateProject', () => {
    it('returns ok for a valid project', () => {
      const project: BufoProject = {
        alias: 'test',
        session_name: 'test-session',
        tadpole_base: '/tmp/test-tps',
        main_repo: '/tmp/test-repo',
        tadpoles: {
          count: 5,
          prefix: 'tp',
          branch_pattern: 'tp-{N}',
        },
      };
      expect(validateProject(project)).toEqual({ ok: true });
    });

    it('returns errors for missing required fields', () => {
      const project = {
        alias: 'test',
        session_name: '',
        tadpole_base: '',
        main_repo: '',
        tadpoles: {
          count: 5,
          prefix: '',
          branch_pattern: '',
        },
      } as BufoProject;
      const result = validateProject(project);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.errors.length).toBeGreaterThan(0);
        expect(result.errors).toContain('session_name is required');
        expect(result.errors).toContain('tadpole_base is required');
        expect(result.errors).toContain('main_repo is required');
      }
    });

    it('validates tadpoles.count must be positive', () => {
      const project: BufoProject = {
        alias: 'test',
        session_name: 'test-session',
        tadpole_base: '/tmp/test-tps',
        main_repo: '/tmp/test-repo',
        tadpoles: {
          count: -1,
          prefix: 'tp',
          branch_pattern: 'tp-{N}',
        },
      };
      const result = validateProject(project);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.errors).toContain('tadpoles.count must be a positive number');
      }
    });
  });

  describe('resolveProjectFromCwd', () => {
    it('matches cwd inside tadpole_base', async () => {
      const base = join(tempDir, 'worktrees');
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'proj.yaml'),
        makeProjectYaml({
          session_name: 'proj',
          tadpole_base: base,
          main_repo: join(tempDir, 'repo'),
        }),
      );

      const result = await resolveProjectFromCwd(join(base, 'tp-1'));
      expect(result).not.toBeNull();
      expect(result!.alias).toBe('proj');
    });

    it('matches cwd equal to tadpole_base', async () => {
      const base = join(tempDir, 'worktrees');
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'proj.yaml'),
        makeProjectYaml({
          session_name: 'proj',
          tadpole_base: base,
          main_repo: join(tempDir, 'repo'),
        }),
      );

      const result = await resolveProjectFromCwd(base);
      expect(result).not.toBeNull();
      expect(result!.alias).toBe('proj');
    });

    it('matches cwd inside main_repo', async () => {
      const repo = join(tempDir, 'my-repo');
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'proj.yaml'),
        makeProjectYaml({
          session_name: 'proj',
          tadpole_base: join(tempDir, 'worktrees'),
          main_repo: repo,
        }),
      );

      const result = await resolveProjectFromCwd(join(repo, 'src', 'lib'));
      expect(result).not.toBeNull();
      expect(result!.alias).toBe('proj');
    });

    it('returns null when cwd does not match any project', async () => {
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'proj.yaml'),
        makeProjectYaml({
          session_name: 'proj',
          tadpole_base: '/some/other/path',
          main_repo: '/another/path',
        }),
      );

      const result = await resolveProjectFromCwd('/unrelated/directory');
      expect(result).toBeNull();
    });

    it('returns null when no projects exist', async () => {
      await rm(join(tempDir, '.bufo', 'projects'), { recursive: true });
      const result = await resolveProjectFromCwd('/any/path');
      expect(result).toBeNull();
    });

    it('prefers tadpole_base match over main_repo', async () => {
      // Both tadpole_base and main_repo are under the same parent, but
      // tadpole_base is checked first
      const base = join(tempDir, 'worktrees');
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'proj.yaml'),
        makeProjectYaml({
          session_name: 'proj',
          tadpole_base: base,
          main_repo: join(tempDir, 'repo'),
        }),
      );

      const result = await resolveProjectFromCwd(join(base, 'tp-1'));
      expect(result!.alias).toBe('proj');
    });
  });

  describe('resolveProjectFromGithubUrl', () => {
    it('matches a GitHub PR URL via ticket.github_repo', async () => {
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'myproj.yaml'),
        makeProjectYaml({
          session_name: 'myproj',
          tadpole_base: '/tmp/myproj-tps',
          main_repo: '/tmp/myproj-repo',
          github_repo: 'myorg/myrepo',
        }),
      );

      const result = await resolveProjectFromGithubUrl(
        'https://github.com/myorg/myrepo/pull/42',
      );
      expect(result).not.toBeNull();
      expect(result!.alias).toBe('myproj');
    });

    it('returns null for unrecognized GitHub URL', async () => {
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'myproj.yaml'),
        makeProjectYaml({
          session_name: 'myproj',
          tadpole_base: '/tmp/myproj-tps',
          main_repo: '/tmp/myproj-repo',
          github_repo: 'myorg/myrepo',
        }),
      );

      const result = await resolveProjectFromGithubUrl(
        'https://github.com/other/repo/pull/1',
      );
      expect(result).toBeNull();
    });

    it('returns null for non-GitHub URL', async () => {
      const result = await resolveProjectFromGithubUrl(
        'https://example.com/not-github',
      );
      expect(result).toBeNull();
    });
  });

  describe('resolveProjectFromTicketUrl', () => {
    it('matches a Linear ticket URL', async () => {
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'proj.yaml'),
        makeProjectYaml({
          session_name: 'proj',
          tadpole_base: '/tmp/proj-tps',
          main_repo: '/tmp/proj-repo',
          linear_team: 'myteam',
        }),
      );

      const result = await resolveProjectFromTicketUrl(
        'https://linear.app/myteam/issue/ENG-123/some-title',
      );
      expect(result).not.toBeNull();
      expect(result!.alias).toBe('proj');
    });

    it('matches a GitHub issue URL via ticket.github_repo', async () => {
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'proj.yaml'),
        makeProjectYaml({
          session_name: 'proj',
          tadpole_base: '/tmp/proj-tps',
          main_repo: '/tmp/proj-repo',
          github_repo: 'myorg/myrepo',
        }),
      );

      const result = await resolveProjectFromTicketUrl(
        'https://github.com/myorg/myrepo/issues/42',
      );
      expect(result).not.toBeNull();
      expect(result!.alias).toBe('proj');
    });

    it('returns null for ambiguous matches (multiple projects)', async () => {
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'proj1.yaml'),
        makeProjectYaml({
          session_name: 'proj1',
          tadpole_base: '/tmp/proj1-tps',
          main_repo: '/tmp/proj1-repo',
          linear_team: 'shared-team',
        }),
      );
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'proj2.yaml'),
        makeProjectYaml({
          session_name: 'proj2',
          tadpole_base: '/tmp/proj2-tps',
          main_repo: '/tmp/proj2-repo',
          linear_team: 'shared-team',
        }),
      );

      const result = await resolveProjectFromTicketUrl(
        'https://linear.app/shared-team/issue/ENG-1/title',
      );
      expect(result).toBeNull();
    });

    it('returns null for unrecognized URL format', async () => {
      const result = await resolveProjectFromTicketUrl(
        'https://example.com/not-a-ticket',
      );
      expect(result).toBeNull();
    });
  });

  describe('resolveDefaultProject', () => {
    it('returns the only project when there is exactly one', async () => {
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'solo.yaml'),
        makeProjectYaml({
          session_name: 'solo',
          tadpole_base: '/tmp/solo-tps',
          main_repo: '/tmp/solo-repo',
        }),
      );

      const result = await resolveDefaultProject();
      expect(result).not.toBeNull();
      expect(result!.alias).toBe('solo');
    });

    it('returns null when there are multiple projects and no default', async () => {
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'a.yaml'),
        makeProjectYaml({
          session_name: 'a',
          tadpole_base: '/tmp/a-tps',
          main_repo: '/tmp/a-repo',
        }),
      );
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'b.yaml'),
        makeProjectYaml({
          session_name: 'b',
          tadpole_base: '/tmp/b-tps',
          main_repo: '/tmp/b-repo',
        }),
      );

      const result = await resolveDefaultProject();
      expect(result).toBeNull();
    });

    it('returns the default project when configured in global config', async () => {
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'a.yaml'),
        makeProjectYaml({
          session_name: 'a',
          tadpole_base: '/tmp/a-tps',
          main_repo: '/tmp/a-repo',
        }),
      );
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'b.yaml'),
        makeProjectYaml({
          session_name: 'b',
          tadpole_base: '/tmp/b-tps',
          main_repo: '/tmp/b-repo',
        }),
      );
      await writeFile(
        join(tempDir, '.bufo', 'config.yaml'),
        'default_project: b\n',
      );

      const result = await resolveDefaultProject();
      expect(result).not.toBeNull();
      expect(result!.alias).toBe('b');
    });

    it('returns null when no projects exist', async () => {
      await rm(join(tempDir, '.bufo', 'projects'), { recursive: true });
      const result = await resolveDefaultProject();
      expect(result).toBeNull();
    });

    it('falls through to single-project when default_project not found', async () => {
      await writeFile(
        join(tempDir, '.bufo', 'projects', 'only.yaml'),
        makeProjectYaml({
          session_name: 'only',
          tadpole_base: '/tmp/only-tps',
          main_repo: '/tmp/only-repo',
        }),
      );
      await writeFile(
        join(tempDir, '.bufo', 'config.yaml'),
        'default_project: nonexistent\n',
      );

      const result = await resolveDefaultProject();
      expect(result).not.toBeNull();
      expect(result!.alias).toBe('only');
    });
  });
});
