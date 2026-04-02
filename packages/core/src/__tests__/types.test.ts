import { describe, it, expect } from 'vitest';
import type { BufoProject, TadpoleMeta, TadpoleState, BufoTadpole, GlobalConfig, BufoSession, SessionLayout } from '../types.js';

describe('types', () => {
  it('BufoProject can be constructed', () => {
    const project: BufoProject = {
      alias: 'test',
      session_name: 'test-session',
      tadpole_base: '/tmp/test',
      main_repo: '/tmp/main',
      tadpoles: {
        count: 5,
        prefix: 'tp',
        branch_pattern: 'tp-{N}',
      },
    };
    expect(project.alias).toBe('test');
    expect(project.tadpoles.count).toBe(5);
  });

  it('TadpoleMeta supports optional fields', () => {
    const meta: TadpoleMeta = { type: 'tadpole' };
    expect(meta.type).toBe('tadpole');
    expect(meta.ticket).toBeUndefined();
  });

  it('TadpoleState has required fields', () => {
    const state: TadpoleState = {
      tadpole: 1,
      window_id: 'w1',
      tab_id: 't1',
      panes: { terminal: 's1', server: 's2', main: 's3' },
      created_at: '2024-01-01',
    };
    expect(state.panes.main).toBe('s3');
  });

  it('BufoTadpole combines project and state', () => {
    const project: BufoProject = {
      alias: 'test',
      session_name: 'test',
      tadpole_base: '/tmp',
      main_repo: '/tmp/main',
      tadpoles: { count: 1, prefix: 'tp', branch_pattern: 'tp-{N}' },
    };
    const tp: BufoTadpole = {
      project,
      number: 1,
      directory: '/tmp/tp-1',
      branch: 'main',
      locked: false,
      active: false,
    };
    expect(tp.number).toBe(1);
    expect(tp.meta).toBeUndefined();
  });

  it('GlobalConfig supports optional fields', () => {
    const config: GlobalConfig = {};
    expect(config.default_project).toBeUndefined();
  });

  it('BufoSession has required and optional fields', () => {
    const session: BufoSession = {
      name: 'test',
      project: 'proj',
      created: '2024-01-01',
      last_accessed: '2024-01-01',
      summary: 'Test session',
      type: 'general',
      active: false,
      hasReviewOutput: false,
    };
    expect(session.type).toBe('general');
    expect(session.prs).toBeUndefined();
  });
});
