import { INITIAL_MISSIONS, type Mission } from "./missions";
import { MISSION_CATEGORIES } from "./specs";

const STORAGE_KEY = "ascend:progress";

type MissionDef = Omit<Mission, "done">;

type StoredProgress = {
  missionDefs: MissionDef[];
  todayKey: string;
  doneIds: string[];
  lifetimeXP: number;
  lifetimeCategoryXP: Record<string, number>;
};

function todayKey(): string {
  return new Date().toDateString();
}

function defaultProgress(): StoredProgress {
  return {
    missionDefs: INITIAL_MISSIONS.map(({ id, name, cat, xp }) => ({ id, name, cat, xp })),
    todayKey: todayKey(),
    doneIds: [],
    lifetimeXP: 0,
    lifetimeCategoryXP: {},
  };
}

function readStored(): StoredProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw) as StoredProgress;
    // New calendar day: clear today's checkmarks, keep the mission list and
    // lifetime totals untouched — level/spec never reset, only the checkboxes do.
    if (parsed.todayKey !== todayKey()) {
      return { ...parsed, todayKey: todayKey(), doneIds: [] };
    }
    return parsed;
  } catch {
    return defaultProgress();
  }
}

function writeStored(progress: StoredProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // in-memory state below still works for this session
  }
}

// Lazily hydrated from localStorage on first read (client-only).
let state: StoredProgress | null = null;

function ensureState(): StoredProgress {
  if (state === null) state = readStored();
  return state;
}

const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((cb) => cb());
}

export function subscribeProgress(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export type PublicProgress = {
  missions: Mission[];
  doneCount: number;
  totalCount: number;
  lifetimeXP: number;
  lifetimeCategoryXP: Record<string, number>;
};

function toPublic(s: StoredProgress): PublicProgress {
  const doneSet = new Set(s.doneIds);
  return {
    missions: s.missionDefs.map((m) => ({ ...m, done: doneSet.has(m.id) })),
    doneCount: doneSet.size,
    totalCount: s.missionDefs.length,
    lifetimeXP: s.lifetimeXP,
    lifetimeCategoryXP: s.lifetimeCategoryXP,
  };
}

// Memoize the public snapshot so useSyncExternalStore gets a stable reference
// across renders when nothing actually changed (required to avoid render loops).
let memoFor: StoredProgress | null = null;
let memoPublic: PublicProgress | null = null;

export function getProgressSnapshot(): PublicProgress {
  const s = ensureState();
  if (memoFor !== s) {
    memoFor = s;
    memoPublic = toPublic(s);
  }
  return memoPublic!;
}

const DEFAULT_PUBLIC: PublicProgress = {
  missions: INITIAL_MISSIONS,
  doneCount: 0,
  totalCount: INITIAL_MISSIONS.length,
  lifetimeXP: 0,
  lifetimeCategoryXP: {},
};

export function getServerProgressSnapshot(): PublicProgress {
  return DEFAULT_PUBLIC;
}

function commit(next: StoredProgress) {
  state = next;
  writeStored(next);
  notify();
}

export function toggleMission(id: string) {
  const s = ensureState();
  const def = s.missionDefs.find((m) => m.id === id);
  if (!def) return;

  const doneSet = new Set(s.doneIds);
  let lifetimeXP = s.lifetimeXP;
  const lifetimeCategoryXP = { ...s.lifetimeCategoryXP };

  if (doneSet.has(id)) {
    doneSet.delete(id);
    lifetimeXP -= def.xp;
    lifetimeCategoryXP[def.cat] = (lifetimeCategoryXP[def.cat] || 0) - def.xp;
  } else {
    doneSet.add(id);
    lifetimeXP += def.xp;
    lifetimeCategoryXP[def.cat] = (lifetimeCategoryXP[def.cat] || 0) + def.xp;
  }

  commit({ ...s, doneIds: Array.from(doneSet), lifetimeXP, lifetimeCategoryXP });
}

export function addMission() {
  const s = ensureState();
  const newDef: MissionDef = {
    id: crypto.randomUUID(),
    name: "New goal",
    cat: MISSION_CATEGORIES[0],
    xp: 50,
  };
  commit({ ...s, missionDefs: [...s.missionDefs, newDef] });
}

export function updateMission(
  id: string,
  edits: Partial<Pick<MissionDef, "name" | "cat" | "xp">>
) {
  const s = ensureState();
  const missionDefs = s.missionDefs.map((m) => (m.id === id ? { ...m, ...edits } : m));
  commit({ ...s, missionDefs });
}

export function removeMission(id: string) {
  const s = ensureState();
  const def = s.missionDefs.find((m) => m.id === id);
  if (!def) return;

  const doneSet = new Set(s.doneIds);
  let lifetimeXP = s.lifetimeXP;
  const lifetimeCategoryXP = { ...s.lifetimeCategoryXP };
  if (doneSet.has(id)) {
    doneSet.delete(id);
    lifetimeXP -= def.xp;
    lifetimeCategoryXP[def.cat] = (lifetimeCategoryXP[def.cat] || 0) - def.xp;
  }

  commit({
    ...s,
    missionDefs: s.missionDefs.filter((m) => m.id !== id),
    doneIds: Array.from(doneSet),
    lifetimeXP,
    lifetimeCategoryXP,
  });
}
