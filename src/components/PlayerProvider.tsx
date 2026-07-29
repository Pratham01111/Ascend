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
  // Stay The Initiate through level 9 — specialization only resolves once
  // you've actually put in enough sustained work to have a clear direction.
  const spec = level >= 10 ? computeSpecFromCategoryXP(progress.lifetimeCategoryXP) : "initiate";

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
    streak: progress.streak,
    activeDaysInWindow: progress.activeDaysInWindow,
    windowDays: progress.windowDays,
    lastSeenLevel: progress.lastSeenLevel,
  };
}

export function useSpecInfo() {
  const { spec } = usePlayer();
  return SPECS[spec];
}
