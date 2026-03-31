"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBufoDir = getBufoDir;
exports.bufoExists = bufoExists;
exports.loadGlobalConfig = loadGlobalConfig;
exports.loadProject = loadProject;
exports.discoverProjects = discoverProjects;
exports.loadTadpoleState = loadTadpoleState;
exports.loadTadpoleMeta = loadTadpoleMeta;
exports.isTadpoleLocked = isTadpoleLocked;
exports.getCustomName = getCustomName;
const fs_1 = require("fs");
const path_1 = require("path");
const os_1 = require("os");
const yaml = __importStar(require("js-yaml"));
const BUFO_DIR = (0, path_1.join)((0, os_1.homedir)(), ".bufo");
const PROJECTS_DIR = (0, path_1.join)(BUFO_DIR, "projects");
const STATE_DIR = (0, path_1.join)(BUFO_DIR, "state");
const GLOBAL_CONFIG = (0, path_1.join)(BUFO_DIR, "config.yaml");
function getBufoDir() {
    return BUFO_DIR;
}
function bufoExists() {
    return (0, fs_1.existsSync)(BUFO_DIR);
}
function expandPath(p) {
    if (p.startsWith("~/") || p === "~") {
        return (0, path_1.join)((0, os_1.homedir)(), p.slice(2));
    }
    return p;
}
function loadGlobalConfig() {
    if (!(0, fs_1.existsSync)(GLOBAL_CONFIG))
        return {};
    try {
        const raw = (0, fs_1.readFileSync)(GLOBAL_CONFIG, "utf-8");
        return yaml.load(raw) || {};
    }
    catch {
        return {};
    }
}
function loadProject(alias, filePath) {
    const raw = (0, fs_1.readFileSync)(filePath, "utf-8");
    const doc = yaml.load(raw);
    // Support both new tadpoles: and legacy workspaces: keys
    const tadpoles = doc.tadpoles ||
        doc.workspaces || {};
    const ports = doc.ports || {};
    return {
        alias,
        session_name: doc.session_name || alias,
        tadpole_base: expandPath(doc.tadpole_base || doc.workspace_base || ""),
        main_repo: expandPath(doc.main_repo || ""),
        tadpoles: {
            count: tadpoles.count || 5,
            prefix: tadpoles.prefix || "tadpole",
            branch_pattern: tadpoles.branch_pattern || "tadpole-{N}",
        },
        ports: ports
            ? {
                api_base: ports.api_base,
                app_base: ports.app_base,
            }
            : undefined,
        layout: doc.layout,
    };
}
function discoverProjects() {
    if (!(0, fs_1.existsSync)(PROJECTS_DIR))
        return [];
    const files = (0, fs_1.readdirSync)(PROJECTS_DIR).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"));
    const projects = [];
    for (const file of files) {
        const alias = file.replace(/\.ya?ml$/, "");
        try {
            projects.push(loadProject(alias, (0, path_1.join)(PROJECTS_DIR, file)));
        }
        catch {
            // skip invalid configs
        }
    }
    return projects;
}
function loadTadpoleState(sessionName, num) {
    // Prefer tp<N>.json, fall back to legacy ws<N>.json
    let stateFile = (0, path_1.join)(STATE_DIR, sessionName, `tp${num}.json`);
    if (!(0, fs_1.existsSync)(stateFile)) {
        stateFile = (0, path_1.join)(STATE_DIR, sessionName, `ws${num}.json`);
    }
    if (!(0, fs_1.existsSync)(stateFile))
        return undefined;
    try {
        return JSON.parse((0, fs_1.readFileSync)(stateFile, "utf-8"));
    }
    catch {
        return undefined;
    }
}
function loadTadpoleMeta(tadpoleDir) {
    const metaFile = (0, path_1.join)(tadpoleDir, ".bufo-meta");
    if (!(0, fs_1.existsSync)(metaFile))
        return undefined;
    try {
        return JSON.parse((0, fs_1.readFileSync)(metaFile, "utf-8"));
    }
    catch {
        return undefined;
    }
}
function isTadpoleLocked(tadpoleDir) {
    return (0, fs_1.existsSync)((0, path_1.join)(tadpoleDir, ".bufo-lock"));
}
function getCustomName(tadpoleDir) {
    const nameFile = (0, path_1.join)(tadpoleDir, ".bufo-name");
    if (!(0, fs_1.existsSync)(nameFile))
        return undefined;
    try {
        return (0, fs_1.readFileSync)(nameFile, "utf-8").trim() || undefined;
    }
    catch {
        return undefined;
    }
}
