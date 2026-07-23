"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "./Hero";
import { ACCENTS } from "@/lib/accent";
import { CHARACTER_NAME } from "@/lib/character";

const { accent, glow } = ACCENTS.amber;

export default function EvolutionReveal() {
  const [phase, setPhase] = useState(0);
  const t1 = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const t2 = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function scheduleTimers() {
    clearTimeout(t1.current);
    clearTimeout(t2.current);
    t1.current = setTimeout(() => setPhase(1), 1400);
    t2.current = setTimeout(() => setPhase(2), 2900);
  }

  function replay() {
    setPhase(0);
    scheduleTimers();
  }

  useEffect(() => {
    scheduleTimers();
    return () => {
      clearTimeout(t1.current);
      clearTimeout(t2.current);
    };
  }, []);

  const chargingStyle = {
    opacity: phase === 0 ? 1 : 0,
    transition: "opacity .8s ease",
  };
  const heroStyle = {
    filter: `blur(${phase === 0 ? 18 : 0}px)`,
    opacity: phase === 0 ? 0.55 : 1,
    transform: `scale(${phase === 0 ? 0.86 : 1})`,
    transition: "all 1.2s cubic-bezier(.2,.8,.2,1)",
  };
  const titleStyle = {
    opacity: phase >= 2 ? 1 : 0,
    transform: `translateY(${phase >= 2 ? 0 : 18}px)`,
    transition: "all .9s ease",
  };

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
        <div
          className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: `radial-gradient(circle,${glow} 0%,transparent 54%)`,
            animation: "ascPulse 3.4s ease-in-out infinite",
          }}
        />

        <div className="relative flex h-full flex-col items-center justify-center">
          <div
            className="absolute inset-x-0 top-10 text-center font-mono text-[13px] tracking-[0.42em] uppercase lg:top-20"
            style={{ ...chargingStyle, color: accent }}
          >
            Evolution Charging
          </div>

          <div className="mb-10" style={heroStyle}>
            <Hero size={150} color={accent} />
          </div>

          <div
            className="absolute inset-x-0 bottom-14 text-center lg:bottom-28"
            style={titleStyle}
          >
            <div className="mb-4 font-mono text-[13px] tracking-[0.42em] uppercase text-[#9299AD]">
              You have become
            </div>
            <div
              className="text-5xl font-bold leading-none lg:text-[84px]"
              style={{ color: accent, textShadow: `0 0 50px ${glow}` }}
            >
              {CHARACTER_NAME}
            </div>
            <div className="mt-6 text-sm text-[#9299AD]">
              Your actions over the last 30 days shaped this form.
            </div>
          </div>

          <button
            type="button"
            onClick={replay}
            className="absolute bottom-8 right-8 cursor-pointer rounded-full border border-[#20242F] px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase text-[#565d70] hover:text-[#9299AD]"
          >
            ↻ Replay
          </button>
        </div>
      </div>
    </div>
  );
}

