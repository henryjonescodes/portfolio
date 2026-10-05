export type Waveform = 'sine' | 'square' | 'sawtooth' | 'triangle';

type SoundId = 'click' | 'hover' | 'open' | 'close' | 'toggle' | 'type';

type Patch = {
  enabled: boolean;
  volume: number;
  waveform: Waveform;
  /** Lowpass cutoff in Hz. */
  cutoff: number;
  /** Lowpass resonance (Q). */
  resonance: number;
  /** Envelope release in seconds. */
  release: number;
  /** Detune of the second oscillator in cents; 0 leaves it off. */
  detune: number;
};

type Note = { freq: number; at: number; length: number; gain: number };

type Sound = { notes: Note[]; minGap: number };

const ATTACK = 0.004;
const MASTER_CEILING = 0.5;
const SILENCE = 0.0001;

const SOUNDS: Record<SoundId, Sound> = {
  click: { notes: [{ freq: 880, at: 0, length: 0.04, gain: 0.8 }], minGap: 30 },
  hover: { notes: [{ freq: 1320, at: 0, length: 0.02, gain: 0.25 }], minGap: 60 },
  open: {
    notes: [
      { freq: 523, at: 0, length: 0.06, gain: 0.8 },
      { freq: 784, at: 0.07, length: 0.09, gain: 0.8 },
    ],
    minGap: 100,
  },
  close: {
    notes: [
      { freq: 784, at: 0, length: 0.06, gain: 0.7 },
      { freq: 523, at: 0.07, length: 0.09, gain: 0.7 },
    ],
    minGap: 100,
  },
  toggle: { notes: [{ freq: 660, at: 0, length: 0.03, gain: 0.7 }], minGap: 25 },
  type: { notes: [{ freq: 1800, at: 0, length: 0.01, gain: 0.12 }], minGap: 45 },
};

let patch: Patch = {
  enabled: true,
  volume: 0.4,
  waveform: 'square',
  cutoff: 2400,
  resonance: 2,
  release: 0.12,
  detune: 0,
};

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
const lastPlayed: Partial<Record<SoundId, number>> = {};

/** The preferences provider pushes the current patch here; the next play uses it. */
export const setPatch = (next: Patch) => {
  patch = next;
  if (master && ctx) {
    master.gain.setTargetAtTime(patch.volume * MASTER_CEILING, ctx.currentTime, 0.01);
  }
};

const ensureContext = (): { audio: AudioContext; out: GainNode } | null => {
  if (!ctx || !master) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = patch.volume * MASTER_CEILING;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return { audio: ctx, out: master };
};

// iOS keeps the context suspended until a gesture, so wake it on the first ones.
if (typeof window !== 'undefined') {
  const wake = () => {
    if (ctx && ctx.state === 'suspended') void ctx.resume();
  };
  window.addEventListener('pointerdown', wake, { passive: true });
  window.addEventListener('keydown', wake);
}

const playNote = (audio: AudioContext, out: AudioNode, note: Note, start: number) => {
  const filter = audio.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = patch.cutoff;
  filter.Q.value = patch.resonance;

  const envelope = audio.createGain();
  const hold = start + ATTACK + note.length;
  const end = hold + patch.release;
  envelope.gain.setValueAtTime(SILENCE, start);
  envelope.gain.linearRampToValueAtTime(note.gain, start + ATTACK);
  envelope.gain.setValueAtTime(note.gain, hold);
  envelope.gain.exponentialRampToValueAtTime(SILENCE, end);

  filter.connect(envelope);
  envelope.connect(out);

  const voices = patch.detune > 0 ? [0, patch.detune] : [0];
  voices.forEach((cents) => {
    const osc = audio.createOscillator();
    osc.type = patch.waveform;
    osc.frequency.value = note.freq;
    osc.detune.value = cents;
    osc.connect(filter);
    osc.start(start);
    osc.stop(end + 0.02);
  });
};

/** Plays a named interaction sound through the shared patch. */
export const play = (id: SoundId) => {
  if (!patch.enabled || patch.volume <= 0 || document.hidden) return;

  const sound = SOUNDS[id];
  const now = performance.now();
  if (now - (lastPlayed[id] ?? -Infinity) < sound.minGap) return;
  lastPlayed[id] = now;

  const engine = ensureContext();
  if (!engine) return;
  const base = engine.audio.currentTime + 0.005;
  sound.notes.forEach((note) => playNote(engine.audio, engine.out, note, base + note.at));
};
