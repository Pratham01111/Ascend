import Being from "./Being";
import { SPECS, SPEC_ORDER } from "@/lib/specs";

const LADDER = [
  { lv: 1, label: "Base skeleton" },
  { lv: 10, label: "Partial frame" },
  { lv: 20, label: "Fuller armor + ring" },
  { lv: 30, label: "Floats · back extended" },
  { lv: 50, label: "Fully radiant + crown" },
];

export default function SpecializationsView() {
  const initiate = SPECS.initiate;

  return (
    <div className="flex flex-col gap-16">
      <div>
        <div className="mb-4 font-mono text-[11px] tracking-[0.22em] uppercase text-[#565d70]">
          Starting State
        </div>
        <div
          className="relative flex flex-col items-center gap-10 overflow-hidden rounded-[22px] border border-[#20242F] px-10 py-12 sm:flex-row sm:gap-16"
          style={{
            background: "radial-gradient(circle at 22% 50%,#12141d 0%,#0B0D14 60%)",
            boxShadow: "inset 0 0 200px 40px rgba(0,0,0,.5)",
          }}
        >
          <div className="flex-none">
            <Being spec="initiate" level={0} size={140} color={initiate.accent} />
          </div>
          <div className="max-w-[560px]">
            <div className="mb-3 font-mono text-xs tracking-[0.26em] uppercase text-[#8B93A8]">
              Unspecialized · Unlit
            </div>
            <div className="text-4xl font-bold leading-none text-[#C7CDD9] sm:text-5xl">
              {initiate.name}
            </div>
            <div className="mt-5 max-w-[480px] text-base leading-relaxed text-[#9299AD]">
              {initiate.trait} After enough consistent action in one category, the
              form resolves into one of five specializations and takes on its color.
            </div>
            <div className="mt-7 flex flex-wrap gap-6 font-mono text-[11px] tracking-[0.14em] text-[#565d70]">
              <div>LEVEL 0</div>
              <div>NO BACK ELEMENT</div>
              <div>NEUTRAL SLATE</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#565d70]">
            Five Specializations — shown at Level 30
          </div>
          <div className="font-mono text-[11px] tracking-[0.14em] text-[#565d70]">
            Same skeleton · color + back-element swap
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {SPEC_ORDER.map((key) => {
            const s = SPECS[key];
            return (
              <div
                key={key}
                className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-[#20242F] px-6 py-8"
                style={{ boxShadow: "inset 0 0 140px 24px rgba(0,0,0,.5)" }}
              >
                <div
                  className="pointer-events-none absolute left-1/2 top-[26%] h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background: `radial-gradient(circle,${s.accent}22 0%,transparent 62%)`,
                  }}
                />
                <div className="relative flex h-[220px] w-full items-center justify-center">
                  <Being spec={key} level={30} size={92} color={s.accent} />
                </div>
                <div className="relative mt-3 text-center">
                  <div className="text-xl font-bold" style={{ color: s.accent }}>
                    {s.name}
                  </div>
                  <div className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#565d70]">
                    {s.colorName}
                  </div>
                  <div className="mt-3 min-h-[56px] text-[13px] leading-relaxed text-[#9299AD]">
                    {s.trait}
                  </div>
                  <div className="mt-3 border-t border-[#20242F] pt-3 font-mono text-[10px] tracking-[0.16em] text-[#565d70]">
                    {s.back}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="mb-5 font-mono text-[11px] tracking-[0.22em] uppercase text-[#565d70]">
          Level unlocks completeness — one specialization over time (The Builder)
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {LADDER.map((l) => (
            <div
              key={l.lv}
              className="flex flex-col items-center rounded-2xl border border-[#20242F] px-5 py-6"
              style={{ boxShadow: "inset 0 0 120px 20px rgba(0,0,0,.5)" }}
            >
              <div className="flex h-[150px] w-full items-center justify-center">
                <Being spec="builder" level={l.lv} size={68} color={SPECS.builder.accent} />
              </div>
              <div
                className="mt-2 font-mono text-[13px] tracking-wide"
                style={{ color: SPECS.builder.accent }}
              >
                LEVEL {l.lv}
              </div>
              <div className="mt-2 text-center font-mono text-[10px] tracking-[0.12em] uppercase text-[#565d70]">
                {l.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
