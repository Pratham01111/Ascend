export type AccentKey = "amber" | "crimson" | "cyan" | "emerald" | "violet";

export const ACCENTS: Record<AccentKey, { accent: string; glow: string; dim: string; label: string }> = {
  amber: { accent: "#F2A94E", glow: "rgba(242,169,78,.5)", dim: "#a86f34", label: "Amber" },
  crimson: { accent: "#E5484D", glow: "rgba(229,72,77,.5)", dim: "#9c3236", label: "Crimson" },
  cyan: { accent: "#45B8E0", glow: "rgba(69,184,224,.5)", dim: "#2e7d9c", label: "Cyan" },
  emerald: { accent: "#2ECC8F", glow: "rgba(46,204,143,.5)", dim: "#1f8a61", label: "Emerald" },
  violet: { accent: "#A78BFA", glow: "rgba(167,139,250,.5)", dim: "#6f5cb0", label: "Violet" },
};
