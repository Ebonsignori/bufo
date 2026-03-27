import fs from "fs";
import path from "path";
import os from "os";
import { loadGlobalConfig, getBufoDir } from "./lib/config";

const DEFAULT_LOG_RETENTION_DAYS = 30;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function getRetentionMs(): number {
  const config = loadGlobalConfig();
  const raw = config.log_retention_days;
  if (raw === undefined || raw === null) return DEFAULT_LOG_RETENTION_DAYS * MS_PER_DAY;
  const days = Math.floor(raw);
  if (days <= 0) {
    console.warn(
      `[cleanup] log_retention_days=${raw} is invalid (must be > 0); ` +
      `using default of ${DEFAULT_LOG_RETENTION_DAYS} days`
    );
    return DEFAULT_LOG_RETENTION_DAYS * MS_PER_DAY;
  }
  return days * MS_PER_DAY;
}

function cleanSessionLogs(logDir: string, retentionMs: number, now: Date): void {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(logDir, { withFileTypes: true });
  } catch (err: any) {
    if (err.code === "ENOENT") return;
    throw err;
  }

  const cutoff = now.getTime() - retentionMs;
  let deleted = 0;

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".log")) continue;
    const filePath = path.join(logDir, entry.name);
    let stat: fs.Stats;
    try { stat = fs.statSync(filePath); } catch { continue; }
    if (stat.mtimeMs < cutoff) {
      try {
        fs.unlinkSync(filePath);
        deleted++;
      } catch (err: any) {
        console.warn(`[cleanup] Failed to delete ${filePath}: ${err.message}`);
      }
    }
  }

  if (deleted > 0) {
    console.log(`[cleanup] Deleted ${deleted} session log(s) older than ${retentionMs / MS_PER_DAY} day(s).`);
  }
}

function cleanDaemonLog(bufoDir: string, retentionMs: number, now: Date): void {
  const daemonLogPath = path.join(bufoDir, "daemon.log");
  let stat: fs.Stats;
  try { stat = fs.statSync(daemonLogPath); } catch (err: any) {
    if (err.code === "ENOENT") return;
    throw err;
  }

  const cutoff = now.getTime() - retentionMs;
  if (stat.mtimeMs >= cutoff) return;

  try {
    fs.truncateSync(daemonLogPath, 0);
    console.log(
      `[cleanup] Truncated daemon.log (last modified ` +
      `${Math.round((now.getTime() - stat.mtimeMs) / MS_PER_DAY)} day(s) ago).`
    );
  } catch (err: any) {
    console.warn(`[cleanup] Failed to truncate daemon.log: ${err.message}`);
  }
}

export function runCleanup(): void {
  const retentionMs = getRetentionMs();
  const bufoDir = getBufoDir();
  const logDir = process.env.BUFO_LOG_DIR ?? path.join(os.homedir(), ".bufo", "logs");
  const now = new Date();
  console.log(`[cleanup] Running log cleanup (retention: ${retentionMs / MS_PER_DAY} days)...`);
  cleanSessionLogs(logDir, retentionMs, now);
  cleanDaemonLog(bufoDir, retentionMs, now);
}
