"use client";

import EvolutionVisual from "./EvolutionVisual";
import { usePlayer, useSpecInfo } from "./PlayerProvider";
import { useEvolutionPhases } from "./useEvolutionPhases";
import { markLevelSeen } from "@/lib/progressStore";

export default function LevelUpOverlay() {
  const { level, lastSeenLevel } = usePlayer();
  const spec = useSpecInfo();
  // Keyed on `level` so the charging->reveal sequence replays fresh every
  // time a real level-up produces a new value to celebrate.
  const { phase } = useEvolutionPhases(level);

  const shouldShow = level > lastSeenLevel;
  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-black/80 backdrop-blur-sm">
      <div
        className="relative h-[70vh] w-[92vw] max-w-3xl overflow-hidden rounded-[22px] border border-[#20242F]"
        style={{
          background: "#07080d",
          boxShadow: "0 50px 140px -50px rgba(0,0,0,.9)",
        }}
      >
        <EvolutionVisual spec={spec} level={level} phase={phase} beingSize={110} />
      </div>

      <button
        type="button"
        onClick={() => markLevelSeen(level)}
        className="cursor-pointer rounded-full border px-7 py-2.5 font-mono text-xs uppercase tracking-[0.2em]"
        style={{ borderColor: spec.accent, color: spec.accent }}
      >
        Continue
      </button>
    </div>
  );
}
