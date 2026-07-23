export const CHARACTER_NAME = "THE BUILDER";
export const CHARACTER_LEVEL = 18;
export const ACTIVE_DAYS = 26;
export const ACTIVE_DAYS_MAX = 30;

export type Category = { name: string; pct: number; color: string };

export const CATEGORIES: Category[] = [
  { name: "Mind", pct: 22, color: "#45B8E0" },
  { name: "Engineering", pct: 34, color: "#F2A94E" },
  { name: "Physical", pct: 18, color: "#E5484D" },
  { name: "Discipline", pct: 16, color: "#8A93A8" },
  { name: "Career", pct: 10, color: "#2ECC8F" },
];

export type RecentAction = { name: string; meta: string };

export const RECENT_ACTIONS: RecentAction[] = [
  { name: "Ship the onboarding flow", meta: "2h ago · +160" },
  { name: "Morning strength session", meta: "6h ago · +90" },
  { name: "Weekly review completed", meta: "Yesterday · +75" },
  { name: "Reached Level 18", meta: "2 days ago · Milestone" },
];

export type Milestone = { name: string; lv: number };

export const MILESTONES: Milestone[] = [
  { name: "Base Form", lv: 1 },
  { name: "Ascendant", lv: 10 },
  { name: "Vanguard", lv: 20 },
  { name: "Paragon", lv: 30 },
  { name: "Legendary", lv: 50 },
];
