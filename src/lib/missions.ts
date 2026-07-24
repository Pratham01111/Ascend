export type Mission = {
  id: string;
  name: string;
  cat: string;
  xp: number;
  done: boolean;
};

// XP ranking (highest to lowest): DSA > Python logic > Course work > Cardio >
// Project design > Strength training > AI literacy — kept within a tight band
// so no single task dominates a day.
export const INITIAL_MISSIONS: Mission[] = [
  { id: "m1", name: "Python logic", cat: "Mind", xp: 100, done: false },
  { id: "m2", name: "DSA", cat: "Mind", xp: 110, done: false },
  { id: "m3", name: "Course work", cat: "Engineering", xp: 95, done: false },
  { id: "m4", name: "Project design", cat: "Engineering", xp: 85, done: false },
  { id: "m5", name: "AI literacy", cat: "Engineering", xp: 70, done: false },
  { id: "m6", name: "Cardio — burn 500 cal", cat: "Physical", xp: 90, done: false },
  { id: "m7", name: "Strength training", cat: "Physical", xp: 80, done: false },
];
