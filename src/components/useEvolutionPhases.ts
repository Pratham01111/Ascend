import { useEffect, useState } from "react";

/**
 * Drives the charging -> reveal phase sequence (0 -> 1 -> 2). Restarts
 * automatically whenever `dep` changes (e.g. a real level-up), and can also
 * be restarted manually via the returned `replay()`.
 *
 * Resetting `phase` to 0 happens during render (comparing `dep`/replay nonce
 * against their previous values) rather than in an effect, since an effect
 * calling setState synchronously on every fire is the pattern React's hooks
 * lint flags — the effect here only ever calls setState inside a setTimeout
 * callback, which is fine.
 */
export function useEvolutionPhases(dep: unknown) {
  const [replayNonce, setReplayNonce] = useState(0);
  const key = `${String(dep)}:${replayNonce}`;

  const [phase, setPhase] = useState(0);
  const [prevKey, setPrevKey] = useState(key);
  if (key !== prevKey) {
    setPrevKey(key);
    setPhase(0);
  }

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1400);
    const t2 = setTimeout(() => setPhase(2), 2900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [key]);

  function replay() {
    setReplayNonce((n) => n + 1);
  }

  return { phase, replay };
}
