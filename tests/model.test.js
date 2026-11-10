// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { substitute, layerToEntry, entryToLayers, encodeEntries, decodeEntries, analyzeEntry, PRESETS } from '../src/lib/labmodel.js';
import { buildIndex, search, looksLikeMath, tokens } from '../src/lib/search.js';
import { allProblems, lessonsForExam, latestAttempts, missedKeys, weakLessons, rng, shuffle, stratified, scoreMock } from '../src/lib/pool.js';
import { insightFor } from '../src/teach/insight.js';
import { classify } from '../src/teach/analyze.js';
import { md, mdInline, tex } from '../src/lib/md.js';
import { fn } from '../src/lib/expr.js';
import { LESSONS } from '../src/content/course.js';
import { store, recordAttempt, toggleBookmark, isBookmarked, addHighlight, removeHighlight, masteryOf, mistakeTally } from '../src/lib/store.js';

describe('lab model', () => {
  it('substitutes whole symbols only', () => {
    expect(substitute('a*x^2 + atan(a)', { a: 2 })).toBe('(2)*x^2 + atan((2))');
    expect(fn(substitute('a*x + b', { a: 3, b: -1 }), ['x'])(2)).toBe(5);
    expect(substitute('cos(k*t)', { k: 0.5 })).toBe('cos((0.5)*t)');
    expect(substitute('sin(x)', { s: 9 })).toBe('sin(x)');
  });
  it('converts lesson layers into editable entries and back', () => {
    const e = layerToEntry({ kind: 'surface', expr: '4 - x^2 - y^2' });
    expect(e.src).toBe('z = 4 - x^2 - y^2');
    const [L] = entryToLayers(e);
    expect(L).toMatchObject({ kind: 'surface', z: '4 - x^2 - y^2' });
    const c = layerToEntry({ kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: 't', t: [0, '2*pi'] });
    expect(analyzeEntry(c).c.type).toBe('curve');
    expect(entryToLayers(c)[0].t).toEqual(['0', '2*pi']);
    const f = layerToEntry({ kind: 'vectorField', P: '-y', Q: 'x', R: '0' });
    expect(f.src).toBe('F = <-y, x>');
    const v = layerToEntry({ kind: 'vector', from: [0, 0, 0], to: [1, 2, 3] });
    expect(v.layer.kind).toBe('vector');
    expect(entryToLayers(v)[0].to).toEqual([1, 2, 3]);
  });
  it('y = f(x) becomes a curve in the floor plane with x as t', () => {
    const [L] = entryToLayers({ id: 'a', src: 'y = x^2 + 1', color: 'road' }, {}, 3);
    expect(L.kind).toBe('curve');
    expect(fn(L.y, ['t'])(2)).toBe(5);
  });
  it('hidden entries draw nothing; errors draw nothing', () => {
    expect(entryToLayers({ id: 'a', src: 'z = x', hidden: true })).toEqual([]);
    expect(entryToLayers({ id: 'a', src: 'z = = x' })).toEqual([]);
  });
  it('URL state round-trips, including unicode', () => {
    const entries = [{ id: 'x', src: 'z = x² − y²', color: 'road', hidden: false }, { id: 'y', layer: { kind: 'point', at: [1, 2, 3] }, color: 'water', hidden: true }];
    const back = decodeEntries(encodeEntries(entries));
    expect(back.map((e) => e.src ?? e.layer.kind)).toEqual(['z = x² − y²', 'point']);
    expect(back[1].hidden).toBe(true);
    expect(decodeEntries('not base64!!')).toBeNull();
  });
  it('every preset classifies to something drawable', () => {
    for (const p of PRESETS) for (const src of p.entries) {
      const e = { id: 'p', src, color: 'road', ...(p.range ?? {}) };
      expect(entryToLayers(e).length, src).toBe(1);
    }
  });
});

describe('question routing', () => {
  const idx = buildIndex(LESSONS);
  const top = (q) => search(idx, q).lessons[0]?.id;
  const cases = [
    ['why the extra r in polar?', 20], ['when do I use Green’s theorem?', 29], ['how do I reverse the order of integration?', 19],
    ['what does the gradient mean?', 13], ['how do I know if a field is conservative?', 28], ['lagrange multipliers with two constraints', 17],
    ['spherical coordinates rho phi theta', 23], ['curvature of a space curve', 8], ['cross product of two vectors', 1],
    ['tangent plane to a surface', 14], ['center of mass of a lamina', 24], ['flux through a closed surface', 36],
    ['stokes theorem boundary orientation', 34], ['chain rule tree diagram', 12], ['limit along different paths', 10],
    ['second derivative test saddle point', 15], ['surface area of a parametric surface', 31], ['line integral with respect to arc length', 26],
  ];
  for (const [q, want] of cases) {
    it(`"${q}" → Lesson ${want}`, () => {
      const got = search(idx, q).lessons.slice(0, 3).map((l) => l.id);
      expect(got).toContain(want);
    });
  }
  it('nonsense finds nothing, stopwords alone find nothing', () => {
    expect(search(idx, 'the of and').hits).toEqual([]);
    expect(search(idx, 'xqzzv').lessons).toEqual([]);
  });
  it('tells math from questions', () => {
    for (const s of ['y = x^2', 'z = sin(x)*cos(y)', '<cos t, sin t, t>', 'F = <-y, x>', 'x^2 + y^2 = 4', 'f(x,y) = x*y', 'sqrt(x^2 + y^2)']) expect(looksLikeMath(s), s).toBe(true);
    for (const s of ['why the extra r in polar?', 'what is a gradient', 'explain stokes theorem', 'how do I find the curl']) expect(looksLikeMath(s), s).toBe(false);
    expect(tokens("Green's theorem")).toContain('green');
  });
  void top;
});

describe('problem pools and mock scoring', () => {
  const pool = allProblems(LESSONS);
  it('exam pools', () => {
    expect(lessonsForExam(LESSONS, 2).map((l) => l.id)).toEqual(Array.from({ length: 15 }, (_, i) => 17 + i));
    expect(lessonsForExam(LESSONS, 1)).toHaveLength(16);
  });
  it('stratified draws spread across lessons and are reproducible', () => {
    const items = pool.filter((x) => x.lesson.id >= 17 && x.lesson.id <= 31);
    const a = stratified(items, 12, rng('seed'));
    const b = stratified(items, 12, rng('seed'));
    expect(a.map((x) => x.key)).toEqual(b.map((x) => x.key));
    expect(a).toHaveLength(12);
    expect(new Set(a.map((x) => x.lesson.id)).size).toBe(12);
    expect(new Set(a.map((x) => x.key)).size).toBe(12);
    const unseenFirst = stratified(items, 15, rng(1), { preferUnseen: new Set(items.filter((x) => x.problem === x.lesson.content.problems[0]).map((x) => x.key)) });
    expect(unseenFirst.every((x) => x.problem !== x.lesson.content.problems[0])).toBe(true);
  });
  it('shuffle is a permutation', () => {
    const s = shuffle([1, 2, 3, 4, 5, 6], rng(3));
    expect([...s].sort()).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it('scores a mock and breaks it down', () => {
    const items = pool.slice(0, 4);
    const correctIdx = (it) => it.problem.choices.findIndex((c) => c.correct);
    const wrongIdx = (it) => it.problem.choices.findIndex((c) => !c.correct);
    const r = scoreMock(items, [correctIdx(items[0]), wrongIdx(items[1]), null, correctIdx(items[3])]);
    expect(r.correct).toBe(2);
    expect(r.total).toBe(4);
    expect(r.pct).toBe(0.5);
    expect(r.byMistake.some((m) => m.mistake === 'blank')).toBe(true);
    expect(r.byMistake.some((m) => m.mistake === items[1].problem.choices[wrongIdx(items[1])].mistake)).toBe(true);
  });
  it('misses are the latest attempt only', () => {
    const at = [{ lesson: 1, problem: 'a', correct: false }, { lesson: 1, problem: 'a', correct: true }, { lesson: 2, problem: 'b', correct: false }];
    expect(missedKeys(at)).toEqual(['2:b']);
    expect(latestAttempts(at).get('1:a').correct).toBe(true);
  });
  it('weak lessons come from accuracy and repeated mistakes', () => {
    const mastery = (id) => (id === 3 ? { tries: 4, rate: 0.25 } : { tries: 0, rate: null });
    const w = weakLessons(LESSONS, mastery, [{ lesson: 9, mistake: 'sign', count: 3 }]);
    expect(w.map((l) => l.id).sort()).toEqual([3, 9]);
  });
});

describe('insight readouts', () => {
  it('surface: partials and critical points', () => {
    const i = insightFor(classify('z = x^2 - y^2'));
    expect(i.kind).toMatch(/Surface/);
    expect(i.lines.join(' ')).toMatch(/saddle/);
  });
  it('field: conservative verdict', () => {
    expect(insightFor(classify('F = <2*x*y, x^2>')).lines.join(' ')).toMatch(/\*\*Conservative\*\*/);
    expect(insightFor(classify('F = <-y, x>')).lines.join(' ')).toMatch(/Not conservative/);
  });
  it('implicit: names the quadric', () => {
    expect(insightFor(classify('x^2 + y^2 - z^2 = 1')).kind).toMatch(/one sheet/);
    expect(insightFor(classify('x^2 + y^2 = 4')).kind).toMatch(/cylinder/);
  });
  it('curve: arc length', () => {
    const i = insightFor(classify('<cos t, sin t, t/4>'), {}, { t: ['0', '4*pi'] });
    expect(i.lines.join(' ')).toMatch(/12\.95/);
  });
  it('params flow through', () => {
    expect(insightFor(classify('y = a*x^2 - 4'), { a: 1 }).lines.join(' ')).toMatch(/x = -2, 2/);
  });
  it('every readout renders without KaTeX errors', () => {
    for (const s of ['y = x^2', 'z = x*y', '<t, t^2, t^3>', 'F = <y*z, x*z, x*y>', 'x^2 + y^2 + z^2 = 1', '<u, v, u*v>', '<3, 4, 12>']) {
      const html = md(insightFor(classify(s), {}, { t: ['0', '1'] }).lines.join('\n\n'));
      expect(html, s).not.toMatch(/katex-error/);
    }
  });
});

describe('markdown and math rendering', () => {
  it('math survives markdown', () => {
    const h = md('**Bold** and $a_1 * b_2 * c$ and *it*');
    expect(h).toMatch(/<strong>Bold<\/strong>/);
    expect(h).toMatch(/<em>it<\/em>/);
    expect(h).toMatch(/katex/);
    expect(h).not.toMatch(/<em>.*b_2/);
  });
  it('lists and display math', () => {
    expect(md('- one\n- two')).toBe('<ul><li>one</li><li>two</li></ul>');
    expect(md('1. a\n2. b')).toMatch(/^<ol>/);
    expect(md('$$x^2$$')).toMatch(/display-math/);
    expect(md('Intro:\n- a\n- b\nAfter')).toMatch(/<p>Intro:<\/p><ul>/);
  });
  it('escapes HTML outside math', () => {
    expect(mdInline('<script>x</script>')).not.toMatch(/<script>/);
  });
  it('bad TeX does not throw', () => expect(() => tex('\\frac{')).not.toThrow());
});

describe('store', () => {
  beforeEach(() => store.reset());
  it('records attempts and computes mastery', () => {
    for (const correct of [true, true, false, true, true]) recordAttempt({ lesson: 5, problem: 'p', correct, mistake: correct ? null : 'sign' });
    const m = masteryOf(5);
    expect(m.tries).toBe(5);
    expect(m.correct).toBe(4);
    expect(m.level).toBeGreaterThanOrEqual(3);
    expect(masteryOf(6)).toEqual({ level: 0, tries: 0, correct: 0, rate: null });
  });
  it('tallies mistakes worst first', () => {
    recordAttempt({ lesson: 1, problem: 'a', correct: false, mistake: 'sign' });
    recordAttempt({ lesson: 1, problem: 'b', correct: false, mistake: 'sign' });
    recordAttempt({ lesson: 2, problem: 'a', correct: false, mistake: 'setup' });
    const t = mistakeTally();
    expect(t[0]).toMatchObject({ lesson: 1, mistake: 'sign', count: 2 });
    expect(t[0].problems.size).toBe(2);
  });
  it('bookmarks toggle', () => {
    expect(toggleBookmark({ kind: 'problem', lesson: 3, ref: 'x', title: 't' })).toBe(true);
    expect(isBookmarked('problem', 3, 'x')).toBe(true);
    expect(toggleBookmark({ kind: 'problem', lesson: 3, ref: 'x', title: 't' })).toBe(false);
    expect(isBookmarked('problem', 3, 'x')).toBe(false);
  });
  it('highlights add and remove', () => {
    const id = addHighlight({ lesson: 2, section: 's', text: 'abc', color: 'work' });
    expect(store.get().highlights).toHaveLength(1);
    removeHighlight(id);
    expect(store.get().highlights).toHaveLength(0);
  });
  it('export and import round-trip and persist to localStorage', () => {
    recordAttempt({ lesson: 4, problem: 'q', correct: true });
    store.update((s) => (s.settings.colormap = 'inferno'));
    const json = store.exportJSON();
    store.reset();
    expect(store.get().attempts).toHaveLength(0);
    store.importJSON(json);
    expect(store.get().attempts).toHaveLength(1);
    expect(store.get().settings.colormap).toBe('inferno');
    expect(JSON.parse(localStorage.getItem('ma261-atlas-v1')).settings.colormap).toBe('inferno');
    expect(store.get().settings.model).toBe('claude-opus-5-5');
    expect(store.get().settings.tourFullscreen).toBe(false);
  });
});
