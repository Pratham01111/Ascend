import { CATEGORY_TO_SPEC, SPECS, type SpecInfo, type SpecKey } from "./specs";
import type { Mission } from "./missions";

/**
 * XP required to go from `level` to `level + 1`. Grows each level so early
 * levels come quickly and later ones take real sustained effort — no backend
 * yet, so this only tracks XP earned this session.
 */
function xpToNextLevel(level: number): number {
  return 100 + level * 40;
}

export function computeLevel(totalXP: number) {
  let level = 0;
  let remaining = totalXP;
  let threshold = xpToNextLevel(level);
  while (remaining >= threshold) {
    remaining -= threshold;
    level += 1;
    threshold = xpToNextLevel(level);
  }
  return { level, xpInLevel: remaining, xpMax: threshold };
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
