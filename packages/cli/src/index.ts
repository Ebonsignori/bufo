export { runDoctor, runDoctorFix } from './doctor.js';
export type { DoctorCheck, DoctorResult } from './doctor.js';

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
