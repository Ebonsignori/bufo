export { runDoctor, runDoctorFix } from './doctor.js';
export type { DoctorCheck, DoctorResult } from './doctor.js';

export {
  loadCompanionsConfig,
  getCompanionsBase,
  setupCompanions,
  syncAllCompanions,
  showCompanions,
  fetchCompanions,
} from './companions.js';
export type { CompanionRepo, CompanionsConfig } from './companions.js';

export {
  getTadpoleDir,
  lockTadpole,
  unlockTadpole,
  unlockAll,
  findUnlocked,
  getTadpoleName,
  setTadpoleName,
  clearTadpoleName,
  computeTabTitle,
  listTadpoles,
  detectTadpoleFromDir,
  findNextSlot,
} from './tadpole.js';
