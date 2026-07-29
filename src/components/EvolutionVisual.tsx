import Being from "./Being";
import type { SpecInfo } from "@/lib/specs";

type EvolutionVisualProps = {
  spec: SpecInfo;
  level: number;
  phase: number;
  beingSize?: number;
};

export default function EvolutionVisual({ spec, level, phase, beingSize = 130 }: EvolutionVisualProps) {
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
    <div className="relative h-full overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle,${spec.glow} 0%,transparent 54%)`,
          animation: "ascPulse 3.4s ease-in-out infinite",
        }}
      />

      <div className="relative flex h-full flex-col items-center justify-center">
        <div
          className="absolute inset-x-0 top-10 text-center font-mono text-[13px] tracking-[0.42em] uppercase lg:top-20"
          style={{ ...chargingStyle, color: spec.accent }}
        >
          Evolution Charging
        </div>

        <div className="mb-10" style={heroStyle}>
          <Being spec={spec.key} level={level} size={beingSize} color={spec.accent} />
        </div>

        <div className="absolute inset-x-0 bottom-14 text-center lg:bottom-28" style={titleStyle}>
          <div className="mb-4 font-mono text-[13px] tracking-[0.42em] uppercase text-[#9299AD]">
            You have become
          </div>
          <div
            className="text-5xl font-bold leading-none lg:text-[84px]"
            style={{ color: spec.accent, textShadow: `0 0 50px ${spec.glow}` }}
          >
            {spec.name}
          </div>
          <div className="mt-6 text-sm text-[#9299AD]">
            {spec.key === "initiate"
              ? level === 0
                ? "Complete a mission on Command to begin your journey."
                : `Specialization unlocks at level 10 — ${10 - level} to go.`
              : "Your consistency over time shaped this form."}
          </div>
        </div>
      </div>
    </div>
  );
}
