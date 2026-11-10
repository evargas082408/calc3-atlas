import { LECTURES, BOILER, REVIEWS } from './meta-data.js';

const modules = import.meta.glob('./lessons/l*.js', { eager: true });

const byId = new Map();
for (const mod of Object.values(modules)) {
  const lesson = mod.default;
  if (lesson && lesson.id) byId.set(lesson.id, lesson);
}

export const UNITS = [
  { id: 'space', name: 'Vectors and space', range: [1, 8], sheet: 'Ch. 13 to 14' },
  { id: 'partials', name: 'Functions of several variables', range: [9, 17], sheet: 'Ch. 15' },
  { id: 'integrals', name: 'Multiple integrals', range: [18, 24], sheet: 'Ch. 16' },
  { id: 'fields', name: 'Vector calculus', range: [25, 37], sheet: 'Ch. 17' },
];

export function examOf(id) {
  if (id <= 16) return 1;
  if (id <= 31) return 2;
  return 3;
}

export const LESSONS = LECTURES.map((lec) => {
  const content = byId.get(lec.id);
  const sectionMatch = lec.lectureTitle.match(/\(([\d.\s,-]+)\)/);
  return {
    id: lec.id,
    title: content?.title ?? lec.lectureTitle.replace(/\s*\(.*\)\s*$/, '').replace(/\s+-\s+SNOW DAY.*/i, ''),
    section: content?.section ?? (sectionMatch ? sectionMatch[1].trim() : ''),
    exam: content?.exam ?? examOf(lec.id),
    blurb: content?.blurb ?? '',
    video: lec.video,
    notes: lec.notes,
    date: lec.date,
    unit: UNITS.find((u) => lec.id >= u.range[0] && lec.id <= u.range[1]).id,
    content: content ?? null,
  };
});

export const lessonById = (id) => LESSONS.find((l) => l.id === Number(id));

export { BOILER, REVIEWS };

// The two plans disagree on the date (Oct 20 plan: Wed Nov 18 8pm; Nov 8 guide: Thu Nov 19).
// Default to the newer guide; the student can change it in Settings.
export const EXAM_DEFAULT = { name: 'Exam 2', iso: '2026-11-19T20:00:00-05:00', lessons: [17, 31] };

// From the Nov 8 study guide's 11-day plan.
export const PLAN = [
  { date: '2026-11-08', lessons: [17, 18], task: 'Lagrange and rectangle problems.' },
  { date: '2026-11-09', lessons: [19], task: 'Redo every reverse-order example by hand, with sketches.' },
  { date: '2026-11-10', lessons: [20], task: 'Read r and θ ranges off sketches until it is automatic.' },
  { date: '2026-11-11', lessons: [21, 22], task: 'Triple integral setups, then cylindrical conversions.' },
  { date: '2026-11-12', lessons: [23], task: 'Spherical setups, especially sphere plus cone.' },
  { date: '2026-11-13', lessons: [24], task: 'Center of mass, then a mixed review of 18 to 23.' },
  { date: '2026-11-14', lessons: [25, 26], task: 'Curl, div, gradients, scalar line integrals.' },
  { date: '2026-11-15', lessons: [27, 28], task: 'Work, flux, potentials, the Fundamental Theorem.' },
  { date: '2026-11-16', lessons: [29], task: "Green's theorem both forms, then a timed mock." },
  { date: '2026-11-17', lessons: [], task: 'Grade the mock. One line per miss. Redo those topics.' },
  { date: '2026-11-18', lessons: [], task: 'Timed mock, then write your one-page sheet from memory. Sleep.' },
  { date: '2026-11-19', lessons: [], task: 'Light review only: formula sheet, unit circle, Jacobians. Exam.' },
];

// Shared mistake ids every lesson can point at.
export const SHARED_MISTAKES = {
  arith: { title: 'Arithmetic slip', why: 'The setup was right; a calculation went wrong. Redo it slowly and check signs and fractions.' },
  sign: { title: 'Sign error', why: 'A minus sign was dropped or flipped somewhere. Check orientation and every subtraction.' },
  setup: { title: 'Wrong setup', why: 'The integral or equation you wrote does not describe the problem. Sketch first, then write limits.' },
  concept: { title: 'Wrong method', why: 'This calls for a different tool. See the lesson’s “which tool” guidance.' },
  units: { title: 'Answered the wrong thing', why: 'You gave a point instead of a value, a vector instead of a number, or similar. Reread what is asked.' },
};

export function mistakeInfo(lesson, id) {
  const own = lesson?.content?.mistakes?.find((m) => m.id === id);
  if (own) return own;
  const shared = SHARED_MISTAKES[id];
  return shared ? { id, ...shared } : { id, title: id, why: '' };
}

export function boilerFor(lesson) {
  const names = lesson?.content?.boiler ?? [];
  return names.map((n) => ({ name: n, ...(BOILER[n] ?? {}) })).filter((b) => b.q);
}
