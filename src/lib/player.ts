import { CATEGORY_TO_SPEC, type SpecKey } from "./specs";

/**
 * XP required to go from `level` to `level + 1`. Grows each level so early
 * levels come quickly and later ones take real sustained effort. Fed by the
 * lifetime XP ledger (src/lib/progressStore.ts) — level never resets daily.
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

/** Which specialization dominates given lifetime XP earned per category. */
export function computeSpecFromCategoryXP(categoryXP: Record<string, number>): SpecKey {
  let bestCat: string | null = null;
  let bestXP = 0;
  for (const [cat, xp] of Object.entries(categoryXP)) {
    if (xp > bestXP) {
      bestXP = xp;
      bestCat = cat;
    }
  }
  if (!bestCat) return "initiate";
  return CATEGORY_TO_SPEC[bestCat] || "initiate";
}
