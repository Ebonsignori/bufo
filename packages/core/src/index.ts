export * from './types.js';
export * from './config.js';
export * from './bufo.js';
export * from './exec.js';
export * from './session.js';
export * from './meta.js';

// iTerm2 AppleScript abstraction (async + sync)
export {
  createWindow,
  createTab,
  splitVertical,
  splitHorizontal,
  splitHorizontalThin,
  sendText,
  sendInterrupt,
  captureSession,
  getSessionSize,
  focusSession,
  focusTab,
  closeSession,
  closeTabBySession,
  renameTabBySession,
  resizeSession,
  sessionExists,
  getActiveSessions,
  isItermRunning,
  isItermInstalled,
  listSessions,
} from './iterm.js';

// State persistence
export {
  saveState,
  loadState,
  removeState,
  listStates,
  stateExists,
} from './state.js';

// Meta R/W
export {
  readMeta,
  writeMeta,
  clearMeta,
  extractTicketFromBranch,
  extractLinearUrlFromBody,
} from './meta.js';

// WIP data layer
export {
  getWipDir,
  listWips,
  listAllWips,
  loadWipMetadata,
  deleteWip,
} from './wip.js';

export type { WipMetadata, WipEntry } from './wip.js';
