const STORAGE_KEY = "ascend:quote-unlock";

type StoredUnlock = { day: string; unlocked: boolean };

function todayKey(): string {
  return new Date().toDateString();
}

function readStored(): StoredUnlock | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredUnlock) : null;
  } catch {
    return null;
  }
}

// In-memory fallback so the reveal still works for this session even if
// localStorage is unavailable (private browsing, storage disabled, etc.) —
// it just won't survive a reload in that case.
let memoryUnlockedDay: string | null = null;

const listeners = new Set<() => void>();

export function subscribeQuoteUnlock(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getQuoteUnlockSnapshot(): boolean {
  const today = todayKey();
  if (memoryUnlockedDay === today) return true;
  const stored = readStored();
  return !!stored && stored.day === today && stored.unlocked;
}

export function getServerQuoteUnlockSnapshot(): boolean {
  return false;
}

export function unlockTodayQuote() {
  const today = todayKey();
  memoryUnlockedDay = today;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ day: today, unlocked: true }));
  } catch {
    // fall back to the in-memory flag above
  }
  listeners.forEach((cb) => cb());
}
