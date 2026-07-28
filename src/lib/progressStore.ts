import { INITIAL_MISSIONS, type Mission } from "./missions";
import { MISSION_CATEGORIES } from "./specs";

const STORAGE_KEY = "ascend:progress";
const HISTORY_LIMIT = 120;
const STREAK_WINDOW_DAYS = 30;

type MissionDef = Omit<Mission, "done">;
type HistoryEntry = { date: string; doneCount: number };

type StoredProgress = {
  missionDefs: MissionDef[];
  todayKey: string;
  doneIds: string[];
  lifetimeXP: number;
  lifetimeCategoryXP: Record<string, number>;
  history: HistoryEntry[];
  lastSeenLevel: number;
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
    history: [],
    lastSeenLevel: 0,
  };
}

function readStored(): StoredProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw) as Partial<StoredProgress>;
    const normalized: StoredProgress = {
      missionDefs: parsed.missionDefs ?? defaultProgress().missionDefs,
      todayKey: parsed.todayKey ?? todayKey(),
      doneIds: parsed.doneIds ?? [],
      lifetimeXP: parsed.lifetimeXP ?? 0,
      lifetimeCategoryXP: parsed.lifetimeCategoryXP ?? {},
      history: parsed.history ?? [],
      lastSeenLevel: parsed.lastSeenLevel ?? 0,
    };

    // New calendar day: fold yesterday's tally into history, then clear
    // today's checkmarks. Mission list, lifetime totals, and history are
    // never touched here — only the daily checkboxes roll over.
    if (normalized.todayKey !== todayKey()) {
      const history = [
        ...normalized.history,
        { date: normalized.todayKey, doneCount: normalized.doneIds.length },
      ].slice(-HISTORY_LIMIT);
      return { ...normalized, todayKey: todayKey(), doneIds: [], history };
    }
    return normalized;
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
  streak: number;
  activeDaysInWindow: number;
  windowDays: number;
  lastSeenLevel: number;
};

/** Consecutive active days ending today (or yesterday, if today has no activity yet). */
function computeStreak(history: HistoryEntry[], todayActive: boolean): number {
  const activeByDate = new Map(history.map((h) => [h.date, h.doneCount > 0]));
  let streak = todayActive ? 1 : 0;
  const cursor = new Date();
  cursor.setDate(cursor.getDate() - 1);
  while (activeByDate.get(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** How many of the last `windowDays` calendar days had at least one completed mission. */
function computeActiveDaysInWindow(
  history: HistoryEntry[],
  todayActive: boolean,
  windowDays: number
): number {
  const activeByDate = new Map(history.map((h) => [h.date, h.doneCount > 0]));
  let active = 0;
  const cursor = new Date();
  for (let i = 0; i < windowDays; i++) {
    const isActive = i === 0 ? todayActive : !!activeByDate.get(cursor.toDateString());
    if (isActive) active += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return active;
}

function toPublic(s: StoredProgress): PublicProgress {
  const doneSet = new Set(s.doneIds);
  const todayActive = doneSet.size > 0;
  return {
    missions: s.missionDefs.map((m) => ({ ...m, done: doneSet.has(m.id) })),
    doneCount: doneSet.size,
    totalCount: s.missionDefs.length,
    lifetimeXP: s.lifetimeXP,
    lifetimeCategoryXP: s.lifetimeCategoryXP,
    streak: computeStreak(s.history, todayActive),
    activeDaysInWindow: computeActiveDaysInWindow(s.history, todayActive, STREAK_WINDOW_DAYS),
    windowDays: STREAK_WINDOW_DAYS,
    lastSeenLevel: s.lastSeenLevel,
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
  streak: 0,
  activeDaysInWindow: 0,
  windowDays: STREAK_WINDOW_DAYS,
  lastSeenLevel: 0,
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

/** Marks a level as "celebrated" so the evolution overlay won't re-fire for it. */
export function markLevelSeen(level: number) {
  const s = ensureState();
  if (level <= s.lastSeenLevel) return;
  commit({ ...s, lastSeenLevel: level });
}
