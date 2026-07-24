export type SpecKey = "initiate" | "builder" | "warrior" | "scholar";

export type SpecInfo = {
  key: SpecKey;
  name: string;
  colorName: string;
  accent: string;
  glow: string;
  dim: string;
  trait: string;
  back: string;
};

export const SPECS: Record<SpecKey, SpecInfo> = {
  initiate: {
    key: "initiate",
    name: "THE INITIATE",
    colorName: "UNLIT",
    accent: "#8B93A8",
    glow: "rgba(139,147,168,.4)",
    dim: "#565d70",
    trait:
      "A bare, luminous figure — thin bright strokes, a simple head, a faint aura. This is who you are before enough activity is logged.",
    back: "NO BACK ELEMENT · NEUTRAL SLATE",
  },
  builder: {
    key: "builder",
    name: "THE BUILDER",
    colorName: "AMBER",
    accent: "#F2A94E",
    glow: "rgba(242,169,78,.5)",
    dim: "#a86f34",
    trait:
      "Constructed, architectural. Folded-metal plates and blueprint lines frame the shoulders.",
    back: "BACK — FACETED FRAME + HEX CORE",
  },
  warrior: {
    key: "warrior",
    name: "THE WARRIOR",
    colorName: "CRIMSON",
    accent: "#E5484D",
    glow: "rgba(229,72,77,.5)",
    dim: "#9c3236",
    trait:
      "Aggressive, forceful. Energy blades sweep off the back above a wide combat stance.",
    back: "BACK — ENERGY BLADES + HELD BLADE",
  },
  scholar: {
    key: "scholar",
    name: "THE SCHOLAR",
    colorName: "CYAN",
    accent: "#45B8E0",
    glow: "rgba(69,184,224,.5)",
    dim: "#2e7d9c",
    trait:
      "Arcane, weightless. A halo and orbiting rune-glyphs circle a lean, robed silhouette.",
    back: "BACK — HALO + ORBITING GLYPHS",
  },
};

export const SPEC_ORDER: SpecKey[] = ["builder", "warrior", "scholar"];

/** Which specialization a mission category feeds XP into. */
export const CATEGORY_TO_SPEC: Record<string, SpecKey> = {
  Engineering: "builder",
  Physical: "warrior",
  Mind: "scholar",
};
