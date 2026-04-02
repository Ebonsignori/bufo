import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, rm, readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { loadPrompt, initPrompts, DEFAULT_PROMPT_NAMES, getDefaultContent } from '../src/prompts.js';

describe('prompts', () => {
  let tmpDir: string;
  let origHome: string | undefined;

  beforeEach(async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'bufo-prompts-test-'));
    origHome = process.env.HOME;
    // Point HOME to tmpDir so loadPrompt looks in tmpDir/.bufo/
    process.env.HOME = tmpDir;
  });

  afterEach(async () => {
    process.env.HOME = origHome;
    await rm(tmpDir, { recursive: true, force: true });
  });

  describe('loadPrompt', () => {
    it('uses defaultContent when no files exist', async () => {
      const result = await loadPrompt('test-prompt', 'This is the default');
      expect(result).toBe('This is the default');
    });

    it('prefers global file over default', async () => {
      const globalDir = join(tmpDir, '.bufo', 'prompts');
      await mkdir(globalDir, { recursive: true });
      await writeFile(join(globalDir, 'test-prompt.md'), 'Global override content');

      const result = await loadPrompt('test-prompt', 'This is the default');
      expect(result).toBe('Global override content');
    });

    it('prefers project-specific file over global', async () => {
      // Write global file
      const globalDir = join(tmpDir, '.bufo', 'prompts');
      await mkdir(globalDir, { recursive: true });
      await writeFile(join(globalDir, 'test-prompt.md'), 'Global override');

      // Write project-specific file
      const projDir = join(tmpDir, '.bufo', 'projects', 'myapp', 'prompts');
      await mkdir(projDir, { recursive: true });
      await writeFile(join(projDir, 'test-prompt.md'), 'Project override');

      const result = await loadPrompt('test-prompt', 'default', undefined, 'myapp');
      expect(result).toBe('Project override');
    });

    it('falls through to global when project alias given but no project file exists', async () => {
      const globalDir = join(tmpDir, '.bufo', 'prompts');
      await mkdir(globalDir, { recursive: true });
      await writeFile(join(globalDir, 'test-prompt.md'), 'Global content');

      const result = await loadPrompt('test-prompt', 'default', undefined, 'myapp');
      expect(result).toBe('Global content');
    });

    it('falls through to default when project alias given but no files exist', async () => {
      const result = await loadPrompt('test-prompt', 'fallback default', undefined, 'myapp');
      expect(result).toBe('fallback default');
    });

    it('performs variable substitution', async () => {
      const result = await loadPrompt(
        'test-prompt',
        'Hello {name}, welcome to {project}!',
        { name: 'Alice', project: 'Bufo' },
      );
      expect(result).toBe('Hello Alice, welcome to Bufo!');
    });

    it('replaces all occurrences of a variable', async () => {
      const result = await loadPrompt(
        'test-prompt',
        '{x} and {x} again',
        { x: 'foo' },
      );
      expect(result).toBe('foo and foo again');
    });

    it('performs variable substitution on file content too', async () => {
      const globalDir = join(tmpDir, '.bufo', 'prompts');
      await mkdir(globalDir, { recursive: true });
      await writeFile(join(globalDir, 'test-prompt.md'), 'PR #{number} in {repo}');

      const result = await loadPrompt('test-prompt', 'default', {
        number: '42',
        repo: 'owner/repo',
      });
      expect(result).toBe('PR #42 in owner/repo');
    });

    it('leaves unknown placeholders untouched', async () => {
      const result = await loadPrompt(
        'test-prompt',
        'Hello {name}, {unknown} stays',
        { name: 'Bob' },
      );
      expect(result).toBe('Hello Bob, {unknown} stays');
    });
  });

  describe('initPrompts', () => {
    it('creates all default prompt files', async () => {
      const promptsDir = join(tmpDir, 'prompts');
      await initPrompts(promptsDir);

      for (const name of DEFAULT_PROMPT_NAMES) {
        const content = await readFile(join(promptsDir, `${name}.md`), 'utf-8');
        expect(content.length).toBeGreaterThan(0);
      }
    });

    it('does not overwrite existing files', async () => {
      const promptsDir = join(tmpDir, 'prompts');
      await mkdir(promptsDir, { recursive: true });

      // Write a custom file for one of the default prompts
      const customContent = 'My custom prompt\n';
      await writeFile(join(promptsDir, 'pr-open.md'), customContent);

      await initPrompts(promptsDir);

      // The custom file should be preserved
      const content = await readFile(join(promptsDir, 'pr-open.md'), 'utf-8');
      expect(content).toBe(customContent);

      // Other files should have been created
      const otherContent = await readFile(join(promptsDir, 'chorus-conductor.md'), 'utf-8');
      expect(otherContent.length).toBeGreaterThan(0);
    });

    it('creates the directory if it does not exist', async () => {
      const promptsDir = join(tmpDir, 'nested', 'dir', 'prompts');
      await initPrompts(promptsDir);

      for (const name of DEFAULT_PROMPT_NAMES) {
        const content = await readFile(join(promptsDir, `${name}.md`), 'utf-8');
        expect(content.length).toBeGreaterThan(0);
      }
    });
  });

  describe('DEFAULT_PROMPT_NAMES', () => {
    it('contains all 10 expected prompt names', () => {
      expect(DEFAULT_PROMPT_NAMES).toHaveLength(10);
      expect(DEFAULT_PROMPT_NAMES).toContain('chorus-conductor');
      expect(DEFAULT_PROMPT_NAMES).toContain('singer-codex');
      expect(DEFAULT_PROMPT_NAMES).toContain('review-standard');
      expect(DEFAULT_PROMPT_NAMES).toContain('review-summary');
      expect(DEFAULT_PROMPT_NAMES).toContain('pr-open');
      expect(DEFAULT_PROMPT_NAMES).toContain('ticket-linear');
      expect(DEFAULT_PROMPT_NAMES).toContain('ticket-github-issue');
      expect(DEFAULT_PROMPT_NAMES).toContain('claude-md-team-mode');
      expect(DEFAULT_PROMPT_NAMES).toContain('merge-conflict');
      expect(DEFAULT_PROMPT_NAMES).toContain('wip-summary');
    });
  });

  describe('getDefaultContent', () => {
    it('returns content for known prompt names', () => {
      for (const name of DEFAULT_PROMPT_NAMES) {
        const content = getDefaultContent(name);
        expect(content).toBeDefined();
        expect(content!.length).toBeGreaterThan(0);
      }
    });

    it('returns undefined for unknown prompt names', () => {
      expect(getDefaultContent('nonexistent')).toBeUndefined();
    });
  });
});
