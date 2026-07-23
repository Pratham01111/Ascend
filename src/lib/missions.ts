export type Mission = {
  id: string;
  name: string;
  cat: string;
  xp: number;
  done: boolean;
};

export const INITIAL_MISSIONS: Mission[] = [
  { id: "m1", name: "Ship the onboarding flow", cat: "Engineering", xp: 160, done: true },
  { id: "m2", name: "Morning strength session", cat: "Physical", xp: 90, done: true },
  { id: "m3", name: "Deep work — 90 min, no phone", cat: "Discipline", xp: 120, done: false },
  { id: "m4", name: "Read 20 pages", cat: "Mind", xp: 60, done: false },
  { id: "m5", name: "Send the follow-up email", cat: "Career", xp: 40, done: false },
];
