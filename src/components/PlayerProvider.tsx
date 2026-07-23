"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { INITIAL_MISSIONS, type Mission } from "@/lib/missions";
import { computeCategoryXP, computeLevel, computeSpec } from "@/lib/player";
import { SPECS, type SpecKey } from "@/lib/specs";

type PlayerContextValue = {
  missions: Mission[];
  toggleMission: (id: string) => void;
  doneCount: number;
  totalCount: number;
  totalXP: number;
  level: number;
  xpInLevel: number;
  xpMax: number;
  spec: SpecKey;
  categoryXP: Record<string, number>;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);

  function toggleMission(id: string) {
    setMissions((prev) => prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m)));
  }

  const value = useMemo<PlayerContextValue>(() => {
    const doneCount = missions.filter((m) => m.done).length;
    const totalXP = missions.filter((m) => m.done).reduce((sum, m) => sum + m.xp, 0);
    const { level, xpInLevel, xpMax } = computeLevel(totalXP);
    const spec = computeSpec(missions);
    const categoryXP = computeCategoryXP(missions);

    return {
      missions,
      toggleMission,
      doneCount,
      totalCount: missions.length,
      totalXP,
      level,
      xpInLevel,
      xpMax,
      spec,
      categoryXP,
    };
  }, [missions]);

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within a PlayerProvider");
  return ctx;
}

export function useSpecInfo() {
  const { spec } = usePlayer();
  return SPECS[spec];
}
