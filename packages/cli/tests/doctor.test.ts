import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { BufoProject } from '@bufo/core';

// Mock execa before importing doctor
vi.mock('execa', () => ({
  execa: vi.fn(),
}));

// Mock fs/promises
vi.mock('fs/promises', () => ({
  access: vi.fn(),
  readdir: vi.fn(),
  mkdir: vi.fn(),
  rm: vi.fn(),
  stat: vi.fn(),
  rename: vi.fn(),
}));

import { runDoctor } from '../src/doctor.js';
import { execa } from 'execa';
import { access, readdir, stat } from 'fs/promises';

const mockedExeca = vi.mocked(execa);
const mockedAccess = vi.mocked(access);
const mockedReaddir = vi.mocked(readdir);
const mockedStat = vi.mocked(stat);

function mockCommandExists(available: string[]) {
  mockedExeca.mockImplementation(async (cmd: any, args: any, _opts?: any) => {
    if (cmd === 'command' && Array.isArray(args) && args[0] === '-v') {
      const tool = args[1] as string;
      if (available.includes(tool)) {
        return { stdout: `/usr/bin/${tool}`, stderr: '', exitCode: 0 } as any;
      }
      throw new Error(`${tool} not found`);
    }
    throw new Error('unexpected call');
  });
}

function mockPathExists(paths: string[]) {
  mockedAccess.mockImplementation(async (p: any) => {
    if (paths.includes(p as string)) return undefined;
    throw new Error('ENOENT');
  });
}

function mockIsDirectory(dirs: string[]) {
  mockedStat.mockImplementation(async (p: any) => {
    if (dirs.includes(p as string)) {
      return { isDirectory: () => true } as any;
    }
    throw new Error('ENOENT');
  });
}

describe('runDoctor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Suppress console output during tests
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('returns correct DoctorResult structure', async () => {
    mockCommandExists(['yq', 'jq', 'git']);
    mockPathExists(['/Applications/iTerm.app']);
    mockIsDirectory([]);
    mockedReaddir.mockRejectedValue(new Error('ENOENT'));

    const result = await runDoctor();

    expect(result).toHaveProperty('checks');
    expect(result).toHaveProperty('allOk');
    expect(Array.isArray(result.checks)).toBe(true);
    for (const check of result.checks) {
      expect(check).toHaveProperty('name');
      expect(check).toHaveProperty('ok');
      expect(typeof check.name).toBe('string');
      expect(typeof check.ok).toBe('boolean');
    }
  });

  it('detects missing tools', async () => {
    // Only git is available; yq and jq are missing
    mockCommandExists(['git']);
    mockPathExists([]);
    mockIsDirectory([]);
    mockedReaddir.mockRejectedValue(new Error('ENOENT'));

    const result = await runDoctor();

    const yqCheck = result.checks.find(c => c.name === 'yq');
    const jqCheck = result.checks.find(c => c.name === 'jq');
    const gitCheck = result.checks.find(c => c.name === 'git');
    const itermCheck = result.checks.find(c => c.name === 'iTerm2');

    expect(yqCheck?.ok).toBe(false);
    expect(yqCheck?.message).toBe('not installed');
    expect(jqCheck?.ok).toBe(false);
    expect(jqCheck?.message).toBe('not installed');
    expect(gitCheck?.ok).toBe(true);
    expect(gitCheck?.message).toBe('installed');
    expect(itermCheck?.ok).toBe(false);
    expect(itermCheck?.message).toBe('not installed');
    expect(result.allOk).toBe(false);
  });

  it('all checks pass when everything is available', async () => {
    const home = process.env.HOME || '/Users/test';
    const configDir = `${home}/.bufo`;
    const projectsDir = `${configDir}/projects`;

    mockCommandExists(['yq', 'jq', 'git']);
    mockPathExists(['/Applications/iTerm.app']);
    mockIsDirectory([configDir, projectsDir]);
    mockedReaddir.mockResolvedValue(['test.yaml'] as any);

    const result = await runDoctor();

    expect(result.allOk).toBe(true);
    expect(result.checks.every(c => c.ok)).toBe(true);
  });

  it('includes project-specific checks when project is provided', async () => {
    const home = process.env.HOME || '/Users/test';
    const configDir = `${home}/.bufo`;
    const projectsDir = `${configDir}/projects`;

    const project: BufoProject = {
      alias: 'test',
      session_name: 'test-session',
      tadpole_base: '/tmp/test-tadpoles',
      main_repo: '/tmp/test-main',
      tadpoles: { count: 3, prefix: 'tp', branch_pattern: 'tp-{N}' },
    };

    mockCommandExists(['yq', 'jq', 'git']);
    mockPathExists(['/Applications/iTerm.app']);
    mockIsDirectory([configDir, projectsDir, project.tadpole_base, project.main_repo]);
    mockedReaddir.mockResolvedValue(['test.yaml'] as any);

    const result = await runDoctor(project);

    const baseCheck = result.checks.find(c => c.name === 'tadpole_base');
    const repoCheck = result.checks.find(c => c.name === 'main_repo');

    expect(baseCheck).toBeDefined();
    expect(baseCheck?.ok).toBe(true);
    expect(repoCheck).toBeDefined();
    expect(repoCheck?.ok).toBe(true);
  });

  it('reports missing tadpole_base and main_repo', async () => {
    const home = process.env.HOME || '/Users/test';
    const configDir = `${home}/.bufo`;
    const projectsDir = `${configDir}/projects`;

    const project: BufoProject = {
      alias: 'test',
      session_name: 'test-session',
      tadpole_base: '/nonexistent/tadpoles',
      main_repo: '/nonexistent/repo',
      tadpoles: { count: 3, prefix: 'tp', branch_pattern: 'tp-{N}' },
    };

    mockCommandExists(['yq', 'jq', 'git']);
    mockPathExists(['/Applications/iTerm.app']);
    mockIsDirectory([configDir, projectsDir]);
    mockedReaddir.mockResolvedValue(['test.yaml'] as any);

    const result = await runDoctor(project);

    const baseCheck = result.checks.find(c => c.name === 'tadpole_base');
    const repoCheck = result.checks.find(c => c.name === 'main_repo');

    expect(baseCheck?.ok).toBe(false);
    expect(repoCheck?.ok).toBe(false);
    expect(result.allOk).toBe(false);
  });
});
