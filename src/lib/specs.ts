export type SpecKey =
  | "initiate"
  | "builder"
  | "warrior"
  | "scholar"
  | "operator"
  | "disciplined";

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
  operator: {
    key: "operator",
    name: "THE OPERATOR",
    colorName: "EMERALD",
    accent: "#2ECC8F",
    glow: "rgba(46,204,143,.5)",
    dim: "#1f8a61",
    trait:
      "Sleek, commanding. A sharp mantle and a thin network-constellation of linked points.",
    back: "BACK — MANTLE + NETWORK",
  },
  disciplined: {
    key: "disciplined",
    name: "THE DISCIPLINED",
    colorName: "STEEL / SILVER",
    accent: "#C7CDD9",
    glow: "rgba(199,205,217,.45)",
    dim: "#8b93a8",
    trait:
      "Restraint as power. No excess armor — one perfect aura, a meditative floating pose.",
    back: "BACK — NONE · PURE AURA",
  },
};

export const SPEC_ORDER: SpecKey[] = [
  "builder",
  "warrior",
  "scholar",
  "operator",
  "disciplined",
];

/** Which specialization a mission category feeds XP into. */
export const CATEGORY_TO_SPEC: Record<string, SpecKey> = {
  Engineering: "builder",
  Physical: "warrior",
  Mind: "scholar",
  Career: "operator",
  Discipline: "disciplined",
};
