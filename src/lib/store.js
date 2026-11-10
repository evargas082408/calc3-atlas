// Everything the site remembers lives in one localStorage record, so it can be exported and imported whole.
const KEY = 'ma261-atlas-v1';

const blank = () => ({
  attempts: [],      // { lesson, problem, choice, correct, mistake, at, mode }
  bookmarks: [],     // { id, kind: 'section'|'problem'|'lab'|'lesson', lesson, ref, title, note, at }
  highlights: [],    // { id, lesson, section, text, color: 'work'|'key', note, at }
  notes: {},         // lessonId -> markdown string
  visited: {},       // lessonId -> { at, steps: number }
  confidence: {},    // lessonId -> 1..4 self rating
  settings: { examISO: null, examName: null, apiKey: '', model: 'claude-opus-5-5', theme: 'auto', colormap: 'terrain', lectureSource: 'sunkula', tourFullscreen: false },
});

let state = load();
const listeners = new Set();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blank();
    const parsed = JSON.parse(raw);
    const base = blank();
    return { ...base, ...parsed, settings: { ...base.settings, ...(parsed.settings ?? {}) } };
  } catch {
    return blank();
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Private mode or full storage: keep working in memory.
  }
  listeners.forEach((fn) => fn(state));
}

export const store = {
  get: () => state,
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  update(mutator) {
    mutator(state);
    save();
  },
  exportJSON: () => JSON.stringify(state, null, 2),
  importJSON(text) {
    const parsed = JSON.parse(text);
    state = { ...blank(), ...parsed, settings: { ...blank().settings, ...(parsed.settings ?? {}) } };
    save();
  },
  reset() {
    state = blank();
    save();
  },
};

const uid = () => Math.random().toString(36).slice(2, 10);

export function recordAttempt(a) {
  store.update((s) => s.attempts.push({ ...a, at: Date.now() }));
}

export function toggleBookmark(b) {
  let added = false;
  store.update((s) => {
    const i = s.bookmarks.findIndex((x) => x.kind === b.kind && x.lesson === b.lesson && x.ref === b.ref);
    if (i >= 0) s.bookmarks.splice(i, 1);
    else {
      s.bookmarks.unshift({ id: uid(), note: '', at: Date.now(), ...b });
      added = true;
    }
  });
  return added;
}

export const isBookmarked = (kind, lesson, ref) =>
  state.bookmarks.some((x) => x.kind === kind && x.lesson === lesson && x.ref === ref);

export function addHighlight(h) {
  const id = uid();
  store.update((s) => s.highlights.push({ id, note: '', at: Date.now(), ...h }));
  return id;
}

export function removeHighlight(id) {
  store.update((s) => {
    s.highlights = s.highlights.filter((h) => h.id !== id);
  });
}

// Mastery per lesson from practice history: recent attempts weigh more; first tries count most.
export function masteryOf(lessonId) {
  const tries = state.attempts.filter((a) => a.lesson === lessonId && a.mode !== 'retry');
  if (!tries.length) return { level: 0, tries: 0, correct: 0, rate: null };
  const recent = tries.slice(-10);
  let w = 0;
  let sum = 0;
  recent.forEach((a, i) => {
    const weight = 1 + i / recent.length;
    w += weight;
    sum += a.correct ? weight : 0;
  });
  const rate = sum / w;
  const correct = tries.filter((a) => a.correct).length;
  const level = tries.length < 2 ? (rate > 0.5 ? 1 : 0) : rate >= 0.85 ? 4 : rate >= 0.65 ? 3 : rate >= 0.4 ? 2 : 1;
  return { level, tries: tries.length, correct, rate };
}

// Mistake tally across all attempts: [{ lesson, mistake, count, last }]
export function mistakeTally() {
  const map = new Map();
  for (const a of state.attempts) {
    if (a.correct || !a.mistake) continue;
    const key = `${a.lesson}:${a.mistake}`;
    const cur = map.get(key) ?? { lesson: a.lesson, mistake: a.mistake, count: 0, last: 0, problems: new Set() };
    cur.count += 1;
    cur.last = Math.max(cur.last, a.at);
    cur.problems.add(a.problem);
    map.set(key, cur);
  }
  return [...map.values()].sort((a, b) => b.count - a.count || b.last - a.last);
}

export function examDate(defaultISO) {
  return new Date(state.settings.examISO || defaultISO);
}
