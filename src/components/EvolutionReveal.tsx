"use client";

import EvolutionVisual from "./EvolutionVisual";
import { usePlayer, useSpecInfo } from "./PlayerProvider";
import { useEvolutionPhases } from "./useEvolutionPhases";

export default function EvolutionReveal() {
  const { level } = usePlayer();
  const spec = useSpecInfo();
  const { phase, replay } = useEvolutionPhases("demo");

  return (
    <div className="flex flex-col gap-4">
      <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#565d70]">
        03 — Evolution Reveal
      </div>

      <div
        className="relative h-[560px] overflow-hidden rounded-[22px] border border-[#20242F] lg:h-[840px]"
        style={{
          background: "#07080d",
          boxShadow: "0 50px 140px -50px rgba(0,0,0,.9)",
        }}
      >
        <EvolutionVisual spec={spec} level={level} phase={phase} />

        <button
          type="button"
          onClick={replay}
          className="absolute bottom-8 right-8 cursor-pointer rounded-full border border-[#20242F] px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase text-[#565d70] hover:text-[#9299AD]"
        >
          ↻ Replay
        </button>
      </div>
    </div>
  );
}
