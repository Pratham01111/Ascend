"use client";

import { useMemo, useState } from "react";
import Hero from "./Hero";
import { ACCENTS, type AccentKey } from "@/lib/accent";
import { INITIAL_MISSIONS } from "@/lib/missions";

const LEVEL = 18;
const XP = 7840;
const XP_MAX = 10000;

export default function CommandDashboard() {
  const [accentKey, setAccentKey] = useState<AccentKey>("amber");
  const [missions, setMissions] = useState(INITIAL_MISSIONS);

  const { accent, glow, dim } = ACCENTS[accentKey];

  const doneCount = missions.filter((m) => m.done).length;
  const totalCount = missions.length;
  const dayPct = useMemo(
    () => (totalCount ? (doneCount / totalCount) * 100 : 0),
    [doneCount, totalCount]
  );
  const xpPct = (XP / XP_MAX) * 100;

  function toggleMission(id: string) {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m))
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#565d70]">
          01 — Command
        </div>
        <div className="flex items-center gap-2">
          {(Object.keys(ACCENTS) as AccentKey[]).map((key) => (
            <button
              key={key}
              type="button"
              aria-label={`Set accent to ${ACCENTS[key].label}`}
              onClick={() => setAccentKey(key)}
              className="h-6 w-6 rounded-full border transition-transform hover:scale-110"
              style={{
                background: ACCENTS[key].accent,
                borderColor: key === accentKey ? "#E8EAF2" : "transparent",
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="flex flex-col lg:flex-row overflow-hidden rounded-[22px] border border-[#20242F] bg-[#0B0D14]"
        style={{
          boxShadow:
            "0 50px 140px -50px rgba(0,0,0,.9), inset 0 0 220px 40px rgba(0,0,0,.55)",
        }}
      >
        {/* Identity column */}
        <div
          className="relative flex w-full flex-none flex-col border-b border-[#20242F] px-9 py-12 lg:w-[420px] lg:border-r lg:border-b-0"
          style={{
            background: "linear-gradient(180deg,#0e1119 0%,#0B0D14 100%)",
          }}
        >
          <div
            className="absolute right-8 top-8"
            style={{ animation: "ascFloat 6s ease-in-out infinite" }}
          >
            <Hero size={64} color={accent} />
          </div>

          <div className="flex flex-1 flex-col justify-center py-10">
            <div className="mb-3 font-mono text-[11px] tracking-[0.26em] uppercase text-[#9299AD]">
              You are becoming
            </div>
            <div
              className="text-5xl leading-none font-bold"
              style={{ color: accent, textShadow: `0 0 34px ${glow}` }}
            >
              THE BUILDER
            </div>
            <div className="mt-4 font-mono text-[11px] tracking-[0.16em] text-[#565d70]">
              FORGED OVER 30 DAYS OF ACTION
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <div className="text-lg font-semibold tracking-wide">
                LEVEL {LEVEL}
              </div>
              <div className="font-mono text-xs tracking-wide text-[#9299AD]">
                {XP.toLocaleString()} / {XP_MAX.toLocaleString()} XP
              </div>
            </div>
            <div className="h-[9px] overflow-hidden rounded-full border border-[#20242F] bg-[#161a26]">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${xpPct}%`,
                  background: `linear-gradient(90deg,${dim},${accent})`,
                  boxShadow: `0 0 16px ${glow}`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Main column */}
        <div className="flex flex-1 flex-col px-9 py-12 lg:px-14 lg:py-16">
          <div
            className="relative max-w-[760px] rounded-2xl border border-[#20242F] bg-[#12151F] px-8 py-8"
            style={{ borderLeft: `3px solid ${accent}` }}
          >
            <CornerMark accent={accent} corner="tr" />
            <CornerMark accent={accent} corner="bl" />
            <CornerMark accent={accent} corner="br" />
            <div className="mb-4 font-mono text-[11px] tracking-[0.26em] uppercase text-[#9299AD]">
              Today&apos;s Battle Cry
            </div>
            <div
              className="text-[38px] leading-[1.22] font-semibold text-[#E8EAF2]"
              style={{ textWrap: "pretty" as const }}
            >
              Your excuses have a perfect attendance record.
            </div>
          </div>

          <div className="mt-12 max-w-[760px] flex-1">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-mono text-xs tracking-[0.24em] uppercase text-[#9299AD]">
                Today&apos;s Missions
              </div>
              <div className="font-mono text-xs text-[#565d70]">
                {doneCount}/{totalCount} complete
              </div>
            </div>
            <div className="mb-2 h-1 overflow-hidden rounded-full bg-[#161a26]">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${dayPct}%`,
                  background: `linear-gradient(90deg,${dim},${accent})`,
                }}
              />
            </div>

            <div>
              {missions.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => toggleMission(m.id)}
                  className="flex w-full items-center gap-5 border-b border-[#171b26] px-1.5 py-[19px] text-left cursor-pointer"
                >
                  <span
                    className="flex h-6 w-6 flex-none items-center justify-center rounded-[7px]"
                    style={
                      m.done
                        ? { background: accent, boxShadow: `0 0 14px ${glow}` }
                        : { border: "1.5px solid #2d3342", background: "transparent" }
                    }
                  >
                    {m.done && (
                      <span className="text-sm leading-none font-bold text-[#0B0D14]">
                        ✓
                      </span>
                    )}
                  </span>
                  <span
                    className="min-w-0 flex-1 text-base font-medium"
                    style={
                      m.done
                        ? {
                            color: "#6b7183",
                            textDecoration: "line-through",
                            textDecorationColor: "#3a4050",
                          }
                        : { color: "#E8EAF2" }
                    }
                  >
                    {m.name}
                  </span>
                  <span className="whitespace-nowrap font-mono text-[11px] tracking-wide text-[#565d70]">
                    {m.cat.toUpperCase()} · +{m.xp} XP
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CornerMark({ accent, corner }: { accent: string; corner: "tr" | "bl" | "br" }) {
  const pos: Record<string, React.CSSProperties> = {
    tr: { top: -1, right: -1, borderTop: `1.5px solid ${accent}`, borderRight: `1.5px solid ${accent}` },
    bl: { bottom: -1, left: -1, borderBottom: `1.5px solid ${accent}`, borderLeft: `1.5px solid ${accent}` },
    br: { bottom: -1, right: -1, borderBottom: `1.5px solid ${accent}`, borderRight: `1.5px solid ${accent}` },
  };
  return (
    <div
      className="absolute h-4 w-4 opacity-50"
      style={pos[corner]}
    />
  );
}
