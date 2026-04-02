export { runDoctor, runDoctorFix } from './doctor.js';
export type { DoctorCheck, DoctorResult } from './doctor.js';

export {
  openTadpole,
  createNewTadpole,
  createTadpoleLayout,
  restartTadpole,
  cleanupTadpole,
  continueTadpole,
  destroyTadpole,
  quitTadpole,
  openMainTadpole,
  switchTadpole,
  prepareTadpoleForReuse,
  getTadpoleName,
  setTadpoleName,
  clearTadpoleName,
  computeTabTitle,
  lockTadpole,
  unlockTadpole,
  unlockAll,
  findUnlocked,
  listTadpoles,
  detectTadpoleFromDir,
  findNextSlot,
} from './tadpole.js';
