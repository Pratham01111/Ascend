import { CATEGORY_TO_SPEC, SPECS, type SpecInfo, type SpecKey } from "./specs";
import type { Mission } from "./missions";

/** Flat XP-per-level curve. No backend yet, so this only tracks XP earned this session. */
export const XP_PER_LEVEL = 150;

export function computeLevel(totalXP: number) {
  const level = Math.floor(totalXP / XP_PER_LEVEL);
  const xpInLevel = totalXP - level * XP_PER_LEVEL;
  return { level, xpInLevel, xpMax: XP_PER_LEVEL };
}

export function computeCategoryXP(missions: Mission[]) {
  const totals: Record<string, number> = {};
  for (const m of missions) {
    if (!m.done) continue;
    totals[m.cat] = (totals[m.cat] || 0) + m.xp;
  }
  return totals;
}

export function computeSpec(missions: Mission[]): SpecKey {
  const totals = computeCategoryXP(missions);
  let bestCat: string | null = null;
  let bestXP = 0;
  for (const [cat, xp] of Object.entries(totals)) {
    if (xp > bestXP) {
      bestXP = xp;
      bestCat = cat;
    }
  }
  if (!bestCat) return "initiate";
  return CATEGORY_TO_SPEC[bestCat] || "initiate";
}

export function specInfo(spec: SpecKey): SpecInfo {
  return SPECS[spec];
}
