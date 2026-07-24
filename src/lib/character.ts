export const CATEGORY_COLORS: Record<string, string> = {
  Mind: "#45B8E0",
  Engineering: "#F2A94E",
  Physical: "#E5484D",
};

export type Milestone = { name: string; lv: number };

export const MILESTONES: Milestone[] = [
  { name: "Base Form", lv: 1 },
  { name: "Ascendant", lv: 10 },
  { name: "Vanguard", lv: 20 },
  { name: "Paragon", lv: 30 },
  { name: "Legendary", lv: 50 },
];
