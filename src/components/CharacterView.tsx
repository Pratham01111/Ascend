"use client";

import Being from "./Being";
import { usePlayer, useSpecInfo } from "./PlayerProvider";
import { CATEGORY_COLORS, MILESTONES } from "@/lib/character";

const CATEGORY_ORDER = ["Mind", "Engineering", "Physical"];

export default function CharacterView() {
  const { missions, doneCount, totalCount, totalXP, level, categoryXP } = usePlayer();
  const spec = useSpecInfo();

  const consistencyPct = totalCount ? (doneCount / totalCount) * 100 : 0;
  const consistencyLabel =
    doneCount === 0 ? "UNPROVEN" : doneCount === totalCount ? "RELENTLESS" : "BUILDING";

  const completedMissions = missions.filter((m) => m.done);

  return (
    <div className="flex flex-col gap-4">
      <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#565d70]">
        02 — Character
      </div>

      <div
        className="flex flex-col overflow-hidden rounded-[22px] border border-[#20242F] bg-[#0B0D14] lg:flex-row"
        style={{
          boxShadow:
            "0 50px 140px -50px rgba(0,0,0,.9), inset 0 0 240px 50px rgba(0,0,0,.55)",
        }}
      >
        {/* Hero column */}
        <div
          className="flex w-full flex-none flex-col items-center justify-center border-b border-[#20242F] px-9 py-12 text-center lg:w-[420px] lg:border-r lg:border-b-0"
          style={{
            background: "radial-gradient(circle at 50% 42%,#12141d 0%,#0B0D14 62%)",
          }}
        >
          <Being spec={spec.key} level={level} size={140} color={spec.accent} />
          <div
            className="mt-5 text-4xl font-bold lg:text-[46px]"
            style={{ color: spec.accent, textShadow: `0 0 32px ${spec.glow}` }}
          >
            {spec.name}
          </div>
          <div className="mt-4 max-w-[360px] text-sm leading-relaxed text-[#9299AD]">
            {spec.trait}
          </div>
        </div>

        {/* Data column */}
        <div className="flex flex-1 flex-col justify-center gap-10 px-9 py-12 lg:px-14 lg:py-16">
          {/* Consistency card */}
          <div className="relative rounded-2xl border border-[#20242F] bg-[#12151F] px-7 py-6">
            <CornerMark accent="#565d70" corner="tl" />
            <CornerMark accent="#565d70" corner="tr" />
            <CornerMark accent="#565d70" corner="bl" />
            <CornerMark accent="#565d70" corner="br" />
            <div className="mb-4 flex items-baseline justify-between">
              <div className="font-mono text-[11px] tracking-[0.26em] uppercase text-[#9299AD]">
                Consistency
              </div>
              <div className="font-mono text-[11px] tracking-wide text-[#2ECC8F]">
                {doneCount > 0 ? "▲ RISING" : "— NOT STARTED"}
              </div>
            </div>
            <div className="mb-4 flex items-baseline gap-4">
              <div
                className="text-3xl font-bold tracking-wide"
                style={{ color: spec.accent }}
              >
                {consistencyLabel}
              </div>
              <div className="font-mono text-[13px] text-[#9299AD]">
                {doneCount} / {totalCount} missions today
              </div>
            </div>
            <div className="h-[7px] overflow-hidden rounded-full bg-[#161a26]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${consistencyPct}%`,
                  background: `linear-gradient(90deg,${spec.dim},${spec.accent})`,
                  boxShadow: `0 0 14px ${spec.glow}`,
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row">
            {/* XP by category */}
            <div className="lg:flex-[1.25]">
              <div className="mb-5 font-mono text-[11px] tracking-[0.22em] uppercase text-[#9299AD]">
                Where the XP went — today
              </div>
              {CATEGORY_ORDER.map((cat) => {
                const xp = categoryXP[cat] || 0;
                const pct = totalXP ? (xp / totalXP) * 100 : 0;
                const color = CATEGORY_COLORS[cat];
                return (
                  <div key={cat} className="mb-5">
                    <div className="mb-2 flex justify-between font-mono text-[11px] tracking-wide">
                      <span className="uppercase text-[#9299AD]">{cat}</span>
                      <span className="text-[#565d70]">
                        {xp ? `${xp} XP` : "—"}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[#161a26]">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${pct}%`,
                          background: color,
                          boxShadow: pct ? `0 0 10px ${color}66` : "none",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent actions */}
            <div className="border-t border-[#20242F] pt-8 lg:flex-1 lg:border-l lg:border-t-0 lg:pl-11 lg:pt-0">
              <div className="mb-4 font-mono text-[11px] tracking-[0.22em] uppercase text-[#9299AD]">
                Recent Actions
              </div>
              {completedMissions.length === 0 ? (
                <div className="text-sm text-[#565d70]">
                  No actions logged yet today.
                </div>
              ) : (
                completedMissions.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between gap-4 border-b border-[#171b26] py-3"
                  >
                    <span className="text-sm text-[#c9cdda]">{m.name}</span>
                    <span className="whitespace-nowrap font-mono text-[11px] text-[#565d70]">
                      Today · +{m.xp}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Evolution path */}
          <div>
            <div className="mb-4 font-mono text-[11px] tracking-[0.22em] uppercase text-[#9299AD]">
              Evolution Path
            </div>
            <div className="flex gap-3">
              {MILESTONES.map((ms) => {
                const reached = level >= ms.lv;
                return (
                  <div
                    key={ms.lv}
                    className="flex-1 rounded-xl border px-1.5 py-4 text-center"
                    style={{
                      borderColor: reached ? spec.accent : "#20242F",
                      background: reached ? "rgba(242,169,78,.06)" : "#101320",
                    }}
                  >
                    <div
                      className="mx-auto mb-2.5 h-2 w-2 rounded-full"
                      style={{
                        background: reached ? spec.accent : "#2d3342",
                        boxShadow: reached ? `0 0 9px ${spec.glow}` : "none",
                      }}
                    />
                    <div
                      className="text-xs font-semibold tracking-wide"
                      style={{ color: reached ? "#E8EAF2" : "#565d70" }}
                    >
                      {ms.name}
                    </div>
                    <div className="mt-1 font-mono text-[10px] tracking-wide text-[#565d70]">
                      LV {ms.lv}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CornerMark({
  accent,
  corner,
}: {
  accent: string;
  corner: "tl" | "tr" | "bl" | "br";
}) {
  const pos: Record<string, React.CSSProperties> = {
    tl: { top: -1, left: -1, borderTop: `1.5px solid ${accent}`, borderLeft: `1.5px solid ${accent}` },
    tr: { top: -1, right: -1, borderTop: `1.5px solid ${accent}`, borderRight: `1.5px solid ${accent}` },
    bl: { bottom: -1, left: -1, borderBottom: `1.5px solid ${accent}`, borderLeft: `1.5px solid ${accent}` },
    br: { bottom: -1, right: -1, borderBottom: `1.5px solid ${accent}`, borderRight: `1.5px solid ${accent}` },
  };
  return <div className="absolute h-4 w-4 opacity-60" style={pos[corner]} />;
}
