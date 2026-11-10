// Choosing problems: by lesson, by exam, by weakness, or the ones you last got wrong. Pure apart from the inputs.

export const allProblems = (lessons) =>
  lessons.flatMap((L) => (L.content?.problems ?? []).map((p) => ({ lesson: L, problem: p, key: `${L.id}:${p.id}` })));

export function lessonsForExam(lessons, exam) {
  if (exam === 2) return lessons.filter((l) => l.id >= 17 && l.id <= 31);
  if (exam === 1) return lessons.filter((l) => l.id <= 16);
  if (exam === 3) return lessons;
  return lessons;
}

// Latest attempt per problem.
export function latestAttempts(attempts) {
  const m = new Map();
  for (const a of attempts) m.set(`${a.lesson}:${a.problem}`, a);
  return m;
}

export function missedKeys(attempts) {
  return [...latestAttempts(attempts).entries()].filter(([, a]) => !a.correct).map(([k]) => k);
}

// Weak lessons: low recent accuracy, or repeated mistakes. Ordered worst first.
export function weakLessons(lessons, mastery, tally) {
  const scored = lessons.map((L) => {
    const m = mastery(L.id);
    const mistakes = tally.filter((t) => t.lesson === L.id).reduce((s, t) => s + t.count, 0);
    const weak = (m.tries >= 2 && m.rate < 0.65) || mistakes >= 2;
    return { L, weak, score: (m.tries ? 1 - m.rate : 0) + mistakes * 0.15 };
  });
  return scored.filter((x) => x.weak).sort((a, b) => b.score - a.score).map((x) => x.L);
}

export function rng(seed) {
  let s = 0;
  for (const c of String(seed)) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle(arr, rand) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Spread n picks across lessons as evenly as possible, preferring unseen and harder problems for mocks.
export function stratified(items, n, rand, { preferUnseen = null } = {}) {
  const byLesson = new Map();
  for (const it of shuffle(items, rand)) {
    const k = it.lesson.id;
    if (!byLesson.has(k)) byLesson.set(k, []);
    byLesson.get(k).push(it);
  }
  for (const list of byLesson.values()) {
    if (preferUnseen) list.sort((a, b) => Number(preferUnseen.has(a.key)) - Number(preferUnseen.has(b.key)));
  }
  const lessonOrder = shuffle([...byLesson.keys()], rand);
  const out = [];
  let round = 0;
  while (out.length < n) {
    let added = false;
    for (const k of lessonOrder) {
      const list = byLesson.get(k);
      if (list[round]) { out.push(list[round]); added = true; if (out.length >= n) break; }
    }
    if (!added) break;
    round += 1;
  }
  return out.sort((a, b) => a.lesson.id - b.lesson.id);
}

// Mock exam scoring: { correct, total, pct, byLesson: [{id, right, total}], byMistake: [{mistake, lesson, count}] }
export function scoreMock(items, picks) {
  let correct = 0;
  const byLesson = new Map();
  const byMistake = new Map();
  items.forEach((it, i) => {
    const pick = picks[i];
    const choice = pick == null ? null : it.problem.choices[pick];
    const ok = !!choice?.correct;
    if (ok) correct += 1;
    const b = byLesson.get(it.lesson.id) ?? { id: it.lesson.id, right: 0, total: 0 };
    b.total += 1;
    if (ok) b.right += 1;
    byLesson.set(it.lesson.id, b);
    if (!ok) {
      const mk = choice ? choice.mistake ?? 'setup' : 'blank';
      const key = `${it.lesson.id}:${mk}`;
      const m = byMistake.get(key) ?? { lesson: it.lesson.id, mistake: mk, count: 0 };
      m.count += 1;
      byMistake.set(key, m);
    }
  });
  return {
    correct,
    total: items.length,
    pct: items.length ? correct / items.length : 0,
    byLesson: [...byLesson.values()],
    byMistake: [...byMistake.values()].sort((a, b) => b.count - a.count),
  };
}
