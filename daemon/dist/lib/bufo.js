"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTadpoleDir = getTadpoleDir;
exports.discoverTadpoles = discoverTadpoles;
exports.getAllTadpoles = getAllTadpoles;
exports.getTadpoleTitle = getTadpoleTitle;
exports.getTadpoleSubtitle = getTadpoleSubtitle;
const fs_1 = require("fs");
const path_1 = require("path");
const config_1 = require("./config");
const exec_1 = require("./exec");
const iterm_1 = require("./iterm");
function getTadpoleDir(project, num) {
    return (0, path_1.join)(project.tadpole_base, `${project.tadpoles.prefix}-${num}`);
}
function discoverTadpoles(project, activeSessions) {
    const tadpoles = [];
    for (let i = 1; i <= project.tadpoles.count; i++) {
        const dir = getTadpoleDir(project, i);
        if (!(0, fs_1.existsSync)(dir))
            continue;
        const state = (0, config_1.loadTadpoleState)(project.session_name, i);
        const meta = (0, config_1.loadTadpoleMeta)(dir);
        const locked = (0, config_1.isTadpoleLocked)(dir);
        const customName = (0, config_1.getCustomName)(dir);
        const branch = (0, exec_1.getGitBranch)(dir);
        let active = false;
        if (state && activeSessions) {
            const mainSid = state.panes.main;
            active = mainSid ? activeSessions.has(mainSid) : false;
        }
        tadpoles.push({
            project,
            number: i,
            directory: dir,
            branch,
            locked,
            active,
            meta,
            state,
            customName,
        });
    }
    return tadpoles;
}
function getAllTadpoles() {
    const projects = (0, config_1.discoverProjects)();
    const activeSessions = (0, iterm_1.getActiveSessions)();
    const tadpoles = [];
    for (const project of projects) {
        tadpoles.push(...discoverTadpoles(project, activeSessions));
    }
    return { projects, tadpoles };
}
function getTadpoleTitle(tp) {
    if (tp.meta?.pr_title) {
        const name = tp.customName || `tp${tp.number}`;
        return `${name}: ${tp.meta.pr_title}`;
    }
    if (tp.meta?.ticket) {
        const name = tp.customName || `tp${tp.number}`;
        return `${name} (${tp.meta.ticket})`;
    }
    if (tp.customName)
        return tp.customName;
    return `${tp.project.tadpoles.prefix}-${tp.number}`;
}
function getTadpoleSubtitle(tp) {
    const parts = [];
    if (tp.branch && tp.branch !== "unknown")
        parts.push(tp.branch);
    if (tp.meta?.type && tp.meta.type !== "tadpole")
        parts.push(tp.meta.type.toUpperCase());
    return parts.join(" | ");
}
