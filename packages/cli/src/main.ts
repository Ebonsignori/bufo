#!/usr/bin/env node
/**
 * bufo-ts — TypeScript CLI entry point for the bufo workspace manager.
 *
 * Routes ported commands to TypeScript handlers. Falls back to the bash
 * `bufo` binary for anything not yet migrated.
 */

import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { resolveProjectFromCwd, resolveDefaultProject } from '@bufo/core';
import type { BufoProject } from '@bufo/core';

// ---------------------------------------------------------------------------
// Version
// ---------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getVersion(): string {
  try {
    const require = createRequire(import.meta.url);
    const pkg = require(join(__dirname, '..', 'package.json')) as { version: string };
    return pkg.version;
  } catch {
    return '0.0.0';
  }
}

// ---------------------------------------------------------------------------
// Bash passthrough
// ---------------------------------------------------------------------------

/**
 * Locate the bash `bufo` binary.
 * Tries PATH first via `which`, then falls back to ~/.local/bin/bufo.
 */
function findBashBufo(): string {
  const which = spawnSync('which', ['bufo'], { encoding: 'utf-8' });
  if (which.status === 0 && which.stdout.trim()) {
    return which.stdout.trim();
  }
  // Fallback to well-known install location
  return `${process.env['HOME'] ?? '~'}/.local/bin/bufo`;
}

/**
 * Exec bash bufo with the given arguments, inheriting stdio.
 * This replaces the current process (exit code forwarded).
 */
function execBashBufo(args: string[]): never {
  const bin = findBashBufo();
  const result = spawnSync(bin, args, { stdio: 'inherit' });
  process.exit(result.status ?? 1);
}

// ---------------------------------------------------------------------------
// Project resolution
// ---------------------------------------------------------------------------

/**
 * Resolve the active BufoProject, or null if none found.
 * Resolution order: CWD → default project.
 */
async function resolveProject(): Promise<BufoProject | null> {
  const cwd = process.cwd();
  const fromCwd = await resolveProjectFromCwd(cwd);
  if (fromCwd) return fromCwd;
  return resolveDefaultProject();
}

// ---------------------------------------------------------------------------
// Usage
// ---------------------------------------------------------------------------

function printUsage(): void {
  console.log('bufo-ts — TypeScript CLI for the bufo workspace manager');
  console.log('');
  console.log('Usage: bufo-ts <command> [options]');
  console.log('');
  console.log('Ported commands (TypeScript):');
  console.log('  merge           Merge tadpole branches into default branch');
  console.log('  pr <PR>         Open a PR in a tadpole');
  console.log('  review          Single-agent PR review');
  console.log('  court           Multi-agent chorus review (alias: chorus)');
  console.log('  chorus          Multi-agent chorus review');
  console.log('  session         Manage named sessions');
  console.log('  ticket <id>     Open a Linear/GitHub ticket in a tadpole');
  console.log('  tkt <id>        Alias for ticket');
  console.log('  wip             Work-in-progress save/restore');
  console.log('  doctor          Run diagnostic checks');
  console.log('');
  console.log('All other commands are passed through to the bash bufo binary.');
  console.log('');
  console.log('Options:');
  console.log('  --version, -v   Print version');
  console.log('  --help, -h      Print this help');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const cmd = argv[0] ?? '';
  const rest = argv.slice(1);

  // --version / -v
  if (cmd === '--version' || cmd === '-v') {
    console.log(`bufo-ts v${getVersion()}`);
    process.exit(0);
  }

  // --help / -h → print TS usage, then exec bash help
  if (cmd === '--help' || cmd === '-h' || cmd === 'help') {
    printUsage();
    execBashBufo(['help']);
  }

  // -------------------------------------------------------------------------
  // Ported commands
  // -------------------------------------------------------------------------

  switch (cmd) {
    // -----------------------------------------------------------------------
    // doctor — no project required (optional)
    // -----------------------------------------------------------------------
    case 'doctor': {
      const { runDoctor, runDoctorFix } = await import('./doctor.js');
      const fix = rest.includes('--fix') || rest.includes('-f');
      const project = await resolveProject();

      if (fix && project) {
        await runDoctorFix(project, true);
      } else {
        await runDoctor(project ?? undefined);
      }
      break;
    }

    // -----------------------------------------------------------------------
    // merge
    // -----------------------------------------------------------------------
    case 'merge': {
      const { handleMerge } = await import('./commands/merge.js');
      const project = await resolveProject();
      if (!project) {
        console.error('Error: No project found. Run from within a project directory.');
        process.exit(1);
      }

      const dryRun = rest.includes('--dry-run') || rest.includes('-n');
      const numIdx = rest.findIndex((a) => a === '--num' || a === '-N');
      const num = numIdx !== -1 ? parseInt(rest[numIdx + 1] ?? '', 10) : undefined;

      try {
        await handleMerge(project, { dryRun, num: isNaN(num ?? NaN) ? undefined : num });
      } catch (err) {
        console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
        process.exit(1);
      }
      break;
    }

    // -----------------------------------------------------------------------
    // pr
    // -----------------------------------------------------------------------
    case 'pr': {
      const { handlePr } = await import('./commands/pr.js');
      const project = await resolveProject();
      if (!project) {
        console.error('Error: No project found. Run from within a project directory.');
        process.exit(1);
      }

      const identifier = rest[0] ?? '';
      try {
        await handlePr(project, identifier);
      } catch (err) {
        console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
        process.exit(1);
      }
      break;
    }

    // -----------------------------------------------------------------------
    // review
    // -----------------------------------------------------------------------
    case 'review': {
      const { handleReview } = await import('./commands/review.js');
      const project = await resolveProject();
      if (!project) {
        console.error('Error: No project found. Run from within a project directory.');
        process.exit(1);
      }

      try {
        await handleReview(project, rest);
      } catch (err) {
        console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
        process.exit(1);
      }
      break;
    }

    // -----------------------------------------------------------------------
    // court / chorus
    // -----------------------------------------------------------------------
    case 'court':
    case 'chorus': {
      const { handleChorus } = await import('./commands/review.js');
      const project = await resolveProject();
      if (!project) {
        console.error('Error: No project found. Run from within a project directory.');
        process.exit(1);
      }

      try {
        await handleChorus(project, rest);
      } catch (err) {
        console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
        process.exit(1);
      }
      break;
    }

    // -----------------------------------------------------------------------
    // session
    // -----------------------------------------------------------------------
    case 'session': {
      const { handleSession } = await import('./commands/session.js');
      const project = await resolveProject();
      if (!project) {
        console.error('Error: No project found. Run from within a project directory.');
        process.exit(1);
      }

      try {
        await handleSession(project, rest);
      } catch (err) {
        console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
        process.exit(1);
      }
      break;
    }

    // -----------------------------------------------------------------------
    // ticket / tkt
    // -----------------------------------------------------------------------
    case 'ticket':
    case 'tkt': {
      const { handleTicket } = await import('./commands/ticket.js');
      const project = await resolveProject();
      if (!project) {
        console.error('Error: No project found. Run from within a project directory.');
        process.exit(1);
      }

      const identifier = rest[0] ?? '';
      try {
        await handleTicket(project, identifier);
      } catch (err) {
        console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
        process.exit(1);
      }
      break;
    }

    // -----------------------------------------------------------------------
    // wip
    // -----------------------------------------------------------------------
    case 'wip': {
      const { wipSave, wipRestore, wipContinue, wipResume } = await import('./commands/wip.js');
      const subCmd = rest[0] ?? '';
      const project = await resolveProject();
      if (!project) {
        console.error('Error: No project found. Run from within a project directory.');
        process.exit(1);
      }

      try {
        switch (subCmd) {
          case 'save': {
            const num = parseInt(rest[1] ?? '', 10);
            if (isNaN(num)) {
              console.error('Error: Usage: bufo wip save <tadpole-num> [--name <name>]');
              process.exit(1);
            }
            const nameIdx = rest.indexOf('--name');
            const name = nameIdx !== -1 ? rest[nameIdx + 1] : undefined;
            const restart = rest.includes('--restart');
            await wipSave(project, num, { restart, name });
            break;
          }

          case 'restore': {
            const wipPath = rest[1];
            const numArg = rest.find((a) => a.startsWith('--num='))?.split('=')[1]
              ?? rest[rest.indexOf('--num') + 1];
            const num = numArg ? parseInt(numArg, 10) : undefined;
            const global = rest.includes('--global') || rest.includes('-g');
            await wipRestore(project, {
              wipPath,
              num: num != null && !isNaN(num) ? num : undefined,
              global,
            });
            break;
          }

          case 'continue': {
            const num = parseInt(rest[1] ?? '', 10);
            if (isNaN(num)) {
              console.error('Error: Usage: bufo wip continue <tadpole-num>');
              process.exit(1);
            }
            const open = rest.includes('--open');
            await wipContinue(project, num, open);
            break;
          }

          case 'resume': {
            const num = parseInt(rest[1] ?? '', 10);
            if (isNaN(num)) {
              console.error('Error: Usage: bufo wip resume <tadpole-num>');
              process.exit(1);
            }
            await wipResume(project, num);
            break;
          }

          case 'list':
          case 'ls': {
            // Show all WIPs (list mode via wipRestore with no path)
            const global = rest.includes('--global') || rest.includes('-g');
            const numArg = rest[1];
            const num = numArg && /^\d+$/.test(numArg) ? parseInt(numArg, 10) : undefined;
            await wipRestore(project, { global, num });
            break;
          }

          case 'delete':
          case 'rm': {
            // Fall through to bash for delete — not yet ported
            execBashBufo(argv);
            break;
          }

          default: {
            // Unknown wip subcommand → pass through to bash
            execBashBufo(argv);
            break;
          }
        }
      } catch (err) {
        console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
        process.exit(1);
      }
      break;
    }

    // -----------------------------------------------------------------------
    // Empty / no command
    // -----------------------------------------------------------------------
    case '': {
      printUsage();
      execBashBufo(['help']);
      break;
    }

    // -----------------------------------------------------------------------
    // Passthrough — exec bash bufo for anything not yet ported
    // -----------------------------------------------------------------------
    default: {
      execBashBufo(argv);
      break;
    }
  }
}

main().catch((err) => {
  console.error(`Fatal: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
