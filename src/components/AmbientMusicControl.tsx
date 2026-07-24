"use client";

import { useSyncExternalStore } from "react";
import { useSpecInfo } from "./PlayerProvider";
import {
  getMusicPrefsSnapshot,
  getServerMusicPrefsSnapshot,
  setMusicVolume,
  subscribeMusicPrefs,
  toggleMusic,
} from "@/lib/ambientMusic";

export default function AmbientMusicControl() {
  const spec = useSpecInfo();
  const prefs = useSyncExternalStore(
    subscribeMusicPrefs,
    getMusicPrefsSnapshot,
    getServerMusicPrefsSnapshot
  );

  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        onClick={() => toggleMusic(spec.key)}
        className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors"
        style={
          prefs.enabled
            ? { borderColor: spec.accent, color: spec.accent }
            : { borderColor: "#2d3342", color: "#565d70" }
        }
        aria-pressed={prefs.enabled}
        aria-label={prefs.enabled ? "Pause ambient music" : "Play ambient music"}
      >
        <span>{prefs.enabled ? "♪ playing" : "♪ music"}</span>
      </button>
      {prefs.enabled && (
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={prefs.volume}
          onChange={(e) => setMusicVolume(Number(e.target.value))}
          aria-label="Music volume"
          className="h-1 w-16 accent-current"
          style={{ color: spec.accent }}
        />
      )}
    </div>
  );
}
