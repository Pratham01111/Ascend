import type { SpecKey } from "./specs";

const STORAGE_KEY = "ascend:music-prefs";

type MusicPrefs = { enabled: boolean; volume: number };

const DEFAULT_PREFS: MusicPrefs = { enabled: false, volume: 0.35 };

function readPrefs(): MusicPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw);
    return {
      enabled: false, // never resume audio without a fresh user gesture (autoplay policy)
      volume: typeof parsed.volume === "number" ? parsed.volume : DEFAULT_PREFS.volume,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

function writePrefs(prefs: MusicPrefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // in-memory state below still works for this session
  }
}

// Lazily hydrated from localStorage on first read (client-only) — see getMusicPrefsSnapshot.
let memoryPrefs: MusicPrefs | null = null;

const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((cb) => cb());
}

export function subscribeMusicPrefs(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getMusicPrefsSnapshot(): MusicPrefs {
  if (memoryPrefs === null) memoryPrefs = readPrefs();
  return memoryPrefs;
}

export function getServerMusicPrefsSnapshot(): MusicPrefs {
  return DEFAULT_PREFS;
}

// --- Generative ambient pad engine ---

type Voice = {
  osc: OscillatorNode;
  gain: GainNode;
  lfo: OscillatorNode;
  lfoGain: GainNode;
  detuneLfo: OscillatorNode;
  detuneGain: GainNode;
};

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let filter: BiquadFilterNode | null = null;
let delay: DelayNode | null = null;
let delayFeedback: GainNode | null = null;
let delayWet: GainNode | null = null;
let voices: Voice[] = [];

// Low, spaced-out chord voicings per specialization — kept close in register so
// switching specs doesn't jump octaves dramatically.
const CHORDS: Record<SpecKey, number[]> = {
  initiate: [110, 164.81, 220],
  builder: [130.81, 164.81, 196, 261.63],
  warrior: [110, 130.81, 196],
  scholar: [146.83, 220, 293.66],
};

function ensureContext(): AudioContext {
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor();

    masterGain = ctx.createGain();
    masterGain.gain.value = 0;

    filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1400;
    filter.Q.value = 0.3;

    delay = ctx.createDelay(2);
    delay.delayTime.value = 0.35;
    delayFeedback = ctx.createGain();
    delayFeedback.gain.value = 0.28;
    delayWet = ctx.createGain();
    delayWet.gain.value = 0.18;

    filter.connect(masterGain);
    filter.connect(delay);
    delay.connect(delayFeedback);
    delayFeedback.connect(delay);
    delay.connect(delayWet);
    delayWet.connect(masterGain);

    masterGain.connect(ctx.destination);
  }
  return ctx;
}

function buildVoices(spec: SpecKey) {
  const audio = ensureContext();
  const freqs = CHORDS[spec] ?? CHORDS.initiate;

  voices = freqs.map((freq, i) => {
    const osc = audio.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;

    const gain = audio.createGain();
    const baseLevel = 0.2 / freqs.length;
    gain.gain.value = baseLevel;

    // Slow swell so each note breathes in and out on its own cycle.
    const lfo = audio.createOscillator();
    lfo.frequency.value = 0.035 + i * 0.014;
    const lfoGain = audio.createGain();
    lfoGain.gain.value = baseLevel * 0.65;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    // Subtle detune drift for a living, non-static pad.
    const detuneLfo = audio.createOscillator();
    detuneLfo.frequency.value = 0.025 + i * 0.009;
    const detuneGain = audio.createGain();
    detuneGain.gain.value = 5;
    detuneLfo.connect(detuneGain);
    detuneGain.connect(osc.detune);

    osc.connect(gain);
    gain.connect(filter!);

    osc.start();
    lfo.start();
    detuneLfo.start();

    return { osc, gain, lfo, lfoGain, detuneLfo, detuneGain };
  });
}

function teardownVoices() {
  voices.forEach((v) => {
    try {
      v.osc.stop();
      v.lfo.stop();
      v.detuneLfo.stop();
    } catch {
      // already stopped
    }
    v.osc.disconnect();
    v.gain.disconnect();
    v.lfo.disconnect();
    v.lfoGain.disconnect();
    v.detuneLfo.disconnect();
    v.detuneGain.disconnect();
  });
  voices = [];
}

export function setMusicVolume(volume: number) {
  const prefs = getMusicPrefsSnapshot();
  memoryPrefs = { ...prefs, volume };
  writePrefs(memoryPrefs);
  if (ctx && masterGain && memoryPrefs.enabled) {
    masterGain.gain.setTargetAtTime(volume, ctx.currentTime, 0.3);
  }
  notify();
}

export function stopMusic() {
  const prefs = getMusicPrefsSnapshot();
  memoryPrefs = { ...prefs, enabled: false };
  writePrefs(memoryPrefs);
  if (ctx && masterGain) {
    masterGain.gain.setTargetAtTime(0, ctx.currentTime, 0.6);
    setTimeout(teardownVoices, 1200);
  }
  notify();
}

export function startMusic(spec: SpecKey) {
  const audio = ensureContext();
  if (audio.state === "suspended") audio.resume();
  teardownVoices();
  buildVoices(spec);

  const prefs = getMusicPrefsSnapshot();
  memoryPrefs = { ...prefs, enabled: true };
  writePrefs(memoryPrefs);

  if (masterGain) {
    masterGain.gain.cancelScheduledValues(audio.currentTime);
    masterGain.gain.setValueAtTime(0, audio.currentTime);
    masterGain.gain.linearRampToValueAtTime(memoryPrefs.volume, audio.currentTime + 2.2);
  }
  notify();
}

export function toggleMusic(spec: SpecKey) {
  if (getMusicPrefsSnapshot().enabled) {
    stopMusic();
  } else {
    startMusic(spec);
  }
}
