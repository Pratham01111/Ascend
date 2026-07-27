"use client";

import { useSyncExternalStore } from "react";
import { computeLevel, computeSpecFromCategoryXP } from "@/lib/player";
import {
  addMission,
  getProgressSnapshot,
  getServerProgressSnapshot,
  removeMission,
  subscribeProgress,
  toggleMission,
  updateMission,
} from "@/lib/progressStore";
import { SPECS } from "@/lib/specs";

export function usePlayer() {
  const progress = useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot,
    getServerProgressSnapshot
  );
  const { level, xpInLevel, xpMax } = computeLevel(progress.lifetimeXP);
  const spec = computeSpecFromCategoryXP(progress.lifetimeCategoryXP);

  return {
    missions: progress.missions,
    toggleMission,
    addMission,
    updateMission,
    removeMission,
    doneCount: progress.doneCount,
    totalCount: progress.totalCount,
    totalXP: progress.lifetimeXP,
    level,
    xpInLevel,
    xpMax,
    spec,
    categoryXP: progress.lifetimeCategoryXP,
  };
}

export function useSpecInfo() {
  const { spec } = usePlayer();
  return SPECS[spec];
}
