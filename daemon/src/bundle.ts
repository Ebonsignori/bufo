/**
 * Browser bundle entry point.
 *
 * Compiled by esbuild into public/xterm-bundle.js (IIFE format).
 * Exposes Terminal, FitAddon, and CanvasAddon as globals so that
 * index.html can use them exactly as it did when loading from CDN —
 * no changes to the HTML JS code are required.
 *
 * Build: npm run build:bundle
 */

import { Terminal } from "@xterm/xterm";
import * as FitAddon from "@xterm/addon-fit";
import * as CanvasAddon from "@xterm/addon-canvas";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any;
g.Terminal = Terminal;
g.FitAddon = FitAddon;
g.CanvasAddon = CanvasAddon;
