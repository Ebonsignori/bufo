"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCleanup = runCleanup;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const config_1 = require("./lib/config");
const DEFAULT_LOG_RETENTION_DAYS = 30;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
function getRetentionMs() {
    const config = (0, config_1.loadGlobalConfig)();
    const raw = config.log_retention_days;
    if (raw === undefined || raw === null)
        return DEFAULT_LOG_RETENTION_DAYS * MS_PER_DAY;
    const days = Math.floor(raw);
    if (days <= 0) {
        console.warn(`[cleanup] log_retention_days=${raw} is invalid (must be > 0); ` +
            `using default of ${DEFAULT_LOG_RETENTION_DAYS} days`);
        return DEFAULT_LOG_RETENTION_DAYS * MS_PER_DAY;
    }
    return days * MS_PER_DAY;
}
function cleanSessionLogs(logDir, retentionMs, now) {
    let entries;
    try {
        entries = fs_1.default.readdirSync(logDir, { withFileTypes: true });
    }
    catch (err) {
        if (err.code === "ENOENT")
            return;
        throw err;
    }
    const cutoff = now.getTime() - retentionMs;
    let deleted = 0;
    for (const entry of entries) {
        if (!entry.isFile() || !entry.name.endsWith(".log"))
            continue;
        const filePath = path_1.default.join(logDir, entry.name);
        let stat;
        try {
            stat = fs_1.default.statSync(filePath);
        }
        catch {
            continue;
        }
        if (stat.mtimeMs < cutoff) {
            try {
                fs_1.default.unlinkSync(filePath);
                deleted++;
            }
            catch (err) {
                console.warn(`[cleanup] Failed to delete ${filePath}: ${err.message}`);
            }
        }
    }
    if (deleted > 0) {
        console.log(`[cleanup] Deleted ${deleted} session log(s) older than ${retentionMs / MS_PER_DAY} day(s).`);
    }
}
function cleanDaemonLog(bufoDir, retentionMs, now) {
    const daemonLogPath = path_1.default.join(bufoDir, "daemon.log");
    let stat;
    try {
        stat = fs_1.default.statSync(daemonLogPath);
    }
    catch (err) {
        if (err.code === "ENOENT")
            return;
        throw err;
    }
    const cutoff = now.getTime() - retentionMs;
    if (stat.mtimeMs >= cutoff)
        return;
    try {
        fs_1.default.truncateSync(daemonLogPath, 0);
        console.log(`[cleanup] Truncated daemon.log (last modified ` +
            `${Math.round((now.getTime() - stat.mtimeMs) / MS_PER_DAY)} day(s) ago).`);
    }
    catch (err) {
        console.warn(`[cleanup] Failed to truncate daemon.log: ${err.message}`);
    }
}
function runCleanup() {
    const retentionMs = getRetentionMs();
    const bufoDir = (0, config_1.getBufoDir)();
    const logDir = process.env.BUFO_LOG_DIR ?? path_1.default.join(os_1.default.homedir(), ".bufo", "logs");
    const now = new Date();
    console.log(`[cleanup] Running log cleanup (retention: ${retentionMs / MS_PER_DAY} days)...`);
    cleanSessionLogs(logDir, retentionMs, now);
    cleanDaemonLog(bufoDir, retentionMs, now);
}
