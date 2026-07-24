export type Mission = {
  id: string;
  name: string;
  cat: string;
  xp: number;
  done: boolean;
};

export const INITIAL_MISSIONS: Mission[] = [
  { id: "m1", name: "Python logic", cat: "Engineering", xp: 80, done: false },
  { id: "m2", name: "DSA", cat: "Engineering", xp: 130, done: false },
  { id: "m3", name: "Course work", cat: "Mind", xp: 100, done: false },
  { id: "m4", name: "Project design", cat: "Engineering", xp: 110, done: false },
  { id: "m5", name: "AI literacy", cat: "Mind", xp: 70, done: false },
  { id: "m6", name: "Cardio — burn 500 cal", cat: "Physical", xp: 90, done: false },
  { id: "m7", name: "Strength training", cat: "Physical", xp: 100, done: false },
];
