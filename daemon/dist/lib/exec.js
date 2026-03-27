"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBufoSync = runBufoSync;
exports.runBufoAsync = runBufoAsync;
exports.getGitBranch = getGitBranch;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
let resolvedBufoPath = null;
function expandHome(p) {
    if (p.startsWith("~/"))
        return `${process.env.HOME}${p.slice(1)}`;
    return p;
}
function findBufo() {
    if (resolvedBufoPath)
        return resolvedBufoPath;
    // Explicit override — highest priority
    const envPath = process.env.BUFO_PATH;
    // Derive the repo-relative path from __dirname (daemon/dist/lib → repo root → src/bufo)
    const repoScript = path_1.default.join(__dirname, "..", "..", "..", "src", "bufo");
    // Check common locations
    const candidates = [
        envPath,
        repoScript,
        "/usr/local/bin/bufo",
        "/opt/homebrew/bin/bufo",
        `${process.env.HOME}/bin/bufo`,
        `${process.env.HOME}/.local/bin/bufo`,
    ].filter((c) => Boolean(c));
    for (const c of candidates) {
        if ((0, fs_1.existsSync)(c)) {
            resolvedBufoPath = c;
            return c;
        }
    }
    // Try resolving via zsh (handles aliases and functions)
    try {
        const output = (0, child_process_1.execSync)("zsh -ilc 'which bufo' 2>/dev/null", { encoding: "utf-8" }).trim();
        // `which` may return "bufo: aliased to ~/Projects/bufo/src/bufo"
        const aliasMatch = output.match(/aliased to (.+)$/);
        if (aliasMatch) {
            const resolved = expandHome(aliasMatch[1].trim());
            if ((0, fs_1.existsSync)(resolved)) {
                resolvedBufoPath = resolved;
                return resolved;
            }
        }
        // Or a plain path
        if (output && !output.includes(":") && (0, fs_1.existsSync)(output)) {
            resolvedBufoPath = output;
            return output;
        }
    }
    catch {
        // fall through
    }
    throw new Error("Could not find `bufo` binary. Ensure bufo is installed and in your PATH.");
}
const SHELL_ENV = {
    ...process.env,
    PATH: `/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:${process.env.PATH || ""}`,
};
function runBufoSync(args) {
    const bufo = findBufo();
    return (0, child_process_1.execSync)(`/bin/bash "${bufo}" ${args}`, {
        encoding: "utf-8",
        timeout: 30000,
        env: SHELL_ENV,
    }).trim();
}
function runBufoAsync(args) {
    const bufo = findBufo();
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`/bin/bash "${bufo}" ${args}`, {
            encoding: "utf-8",
            timeout: 30000,
            env: SHELL_ENV,
        }, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(stderr || error.message));
            }
            else {
                resolve(stdout.trim());
            }
        });
    });
}
function getGitBranch(dir) {
    try {
        return (0, child_process_1.execSync)(`git -C "${dir}" rev-parse --abbrev-ref HEAD 2>/dev/null`, {
            encoding: "utf-8",
            timeout: 5000,
        }).trim();
    }
    catch {
        return "unknown";
    }
}
