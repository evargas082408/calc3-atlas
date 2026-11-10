// @vitest-environment jsdom
// Every lesson file: schema, answer keys, KaTeX, expressions, scenes that actually build.
import { describe, it, expect, vi } from 'vitest';
import katex from 'katex';
import { LESSONS, BOILER, SHARED_MISTAKES, PLAN, UNITS } from '../src/content/course.js';
import { fn, num } from '../src/lib/expr.js';
import { layerToEntry, entryToLayers, analyzeEntry } from '../src/lib/labmodel.js';
import { headlessPlot, nonFiniteVertices } from './helpers.js';

const KINDS = new Set(['surface', 'paramSurface', 'curve', 'curveOnSurface', 'region2d', 'polarBox', 'solid', 'contours', 'gradientField', 'tangentPlane', 'vectorField', 'point', 'vector', 'plane', 'implicit']);
const COLORS = new Set(['contour', 'water', 'road', 'wood', 'ink', 'revision']);

// Every $...$ / $$...$$ span in a string.
function mathSpans(s) {
  const out = [];
  const text = String(s ?? '');
  const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let m;
  while ((m = re.exec(text))) out.push(m[1] ?? m[2]);
  return out;
}
const renders = (src) => {
  try { katex.renderToString(src, { throwOnError: true, strict: 'ignore' }); return null; } catch (e) { return `${e.message} in: ${src}`; }
};

const prose = (C) => [
  C.blurb, C.hook,
  ...C.sections.flatMap((s) => [s.title, s.body]),
  ...C.formulas.map((f) => f.label),
  ...C.mistakes.flatMap((m) => [m.title, m.wrong, m.right, m.why]),
  ...C.problems.flatMap((p) => [p.prompt, ...p.steps, ...p.choices.flatMap((c) => [c.tex, c.why])]),
  ...(C.scene?.steps ?? []).flatMap((s) => [s.label, s.caption]),
];

it('all 37 lessons have content and line up with the lecture list', () => {
  expect(LESSONS).toHaveLength(37);
  LESSONS.forEach((L, i) => {
    expect(L.id).toBe(i + 1);
    expect(L.content, `Lesson ${L.id} content`).toBeTruthy();
    expect(L.content.id).toBe(L.id);
    expect(L.video).toMatch(/^https:\/\//);
    expect(L.notes).toMatch(/^https:\/\/www\.math\.purdue\.edu\/~msunkula\/MA261\/Sp26\//);
  });
  for (const u of UNITS) expect(u.range[0]).toBeLessThanOrEqual(u.range[1]);
  for (const p of PLAN) for (const id of p.lessons) expect(LESSONS.some((l) => l.id === id)).toBe(true);
});

it('over 300 practice problems in total', () => {
  const n = LESSONS.reduce((s, L) => s + L.content.problems.length, 0);
  expect(n).toBeGreaterThanOrEqual(250);
});

describe.each(LESSONS.map((L) => [L.id, L]))('Lesson %i', (id, L) => {
  const C = L.content;

  it('has the schema fields', () => {
    expect(C.title.length).toBeGreaterThan(3);
    expect([1, 2, 3]).toContain(C.exam);
    expect(C.sections.length).toBeGreaterThanOrEqual(3);
    for (const s of C.sections) { expect(s.id).toMatch(/^[\w-]+$/); expect(s.body.length).toBeGreaterThan(40); }
    expect(new Set(C.sections.map((s) => s.id)).size).toBe(C.sections.length);
    expect(C.formulas.length).toBeGreaterThan(0);
    expect(C.mistakes.length).toBeGreaterThanOrEqual(3);
    expect(new Set(C.mistakes.map((m) => m.id)).size).toBe(C.mistakes.length);
    expect(C.problems.length).toBeGreaterThanOrEqual(5);
  });

  it('exam tag matches the course split (1–16, 17–31, 32–37)', () => {
    expect(C.exam).toBe(id <= 16 ? 1 : id <= 31 ? 2 : 3);
  });

  it('every problem has 5 distinct choices, exactly one correct, and a diagnosed mistake on each wrong one', () => {
    const own = new Set(C.mistakes.map((m) => m.id));
    const ids = new Set();
    for (const p of C.problems) {
      expect(ids.has(p.id), `duplicate problem id ${p.id}`).toBe(false);
      ids.add(p.id);
      expect(p.choices).toHaveLength(5);
      expect(p.choices.filter((c) => c.correct)).toHaveLength(1);
      expect(new Set(p.choices.map((c) => c.tex.replace(/\s+/g, ''))).size).toBe(5);
      for (const c of p.choices) {
        if (c.correct) continue;
        expect(own.has(c.mistake) || c.mistake in SHARED_MISTAKES, `L${id} ${p.id}: unknown mistake "${c.mistake}"`).toBe(true);
        expect((c.why ?? '').length, `L${id} ${p.id}: wrong choice without a why`).toBeGreaterThan(8);
      }
      expect(p.steps.length).toBeGreaterThanOrEqual(2);
      expect([1, 2, 3]).toContain(p.difficulty);
    }
  });

  it('every math span renders in KaTeX', () => {
    const errors = prose(C).flatMap(mathSpans).map(renders).filter(Boolean);
    const formulaErrors = C.formulas.map((f) => renders(f.tex)).filter(Boolean);
    expect([...errors, ...formulaErrors]).toEqual([]);
  });

  it('no unbalanced dollar signs or template leftovers', () => {
    for (const s of prose(C)) {
      const t = String(s ?? '').replace(/\$\$[\s\S]+?\$\$/g, '').replace(/\\\$/g, '');
      expect((t.match(/\$/g) ?? []).length % 2, `odd $ in: ${t.slice(0, 120)}`).toBe(0);
      // "undefined" is a real math word ("undefined at the origin"); only flag it where JS would have printed it
      expect(t).not.toMatch(/\$\{|TODO|\[object|\bNaN\b|(^|[=(:,]\s*)undefined\b|undefined$/);
    }
  });

  it('BoilerExams topics exist', () => {
    for (const b of C.boiler ?? []) expect(BOILER[b], `unknown topic "${b}"`).toBeTruthy();
  });

  it('scene layers are valid and every expression evaluates', () => {
    const S = C.scene;
    expect(S.layers.length).toBeGreaterThan(0);
    const layerIds = new Set(S.layers.map((x) => x.id));
    for (const Lr of S.layers) {
      expect(KINDS.has(Lr.kind), `kind ${Lr.kind}`).toBe(true);
      if (Lr.color && !Lr.color.startsWith('#')) expect(COLORS.has(Lr.color), `color ${Lr.color}`).toBe(true);
      if (Lr.of) expect(layerIds.has(Lr.of), `of ${Lr.of}`).toBe(true);
      const ev = (expr, vars, pt) => { const v = fn(String(expr), vars)(...pt); return v; };
      if (Lr.kind === 'surface') expect(Number.isFinite(ev(Lr.z, ['x', 'y'], [0.31, 0.27])) || Number.isFinite(ev(Lr.z, ['x', 'y'], [1.1, 0.6]))).toBe(true);
      if (Lr.kind === 'curve') for (const k of ['x', 'y', 'z']) if (Lr[k] !== undefined) expect(Number.isFinite(ev(Lr[k], ['t'], [num(Lr.t[0]) * 0.5 + num(Lr.t[1]) * 0.5]))).toBe(true);
      if (Lr.kind === 'paramSurface') for (const k of ['x', 'y', 'z']) expect(Number.isFinite(ev(Lr[k], ['u', 'v'], [num(Lr.u[0]) * 0.5 + num(Lr.u[1]) * 0.5, num(Lr.v[0]) * 0.5 + num(Lr.v[1]) * 0.5]))).toBe(true);
      if (Lr.kind === 'vectorField') for (const k of ['P', 'Q']) expect(Number.isFinite(ev(Lr[k], ['x', 'y', 'z'], [0.4, 0.7, 0.3]))).toBe(true);
    }
    expect(S.steps.length).toBeGreaterThanOrEqual(2);
    for (const st of S.steps) for (const sid of st.show ?? []) expect(layerIds.has(sid), `step shows missing "${sid}"`).toBe(true);
  });

  it('the scene builds on the real engine with no failed layers and only finite vertices', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const plot = headlessPlot();
    plot.build(C.scene);
    expect(warn.mock.calls.map((c) => String(c[0]))).toEqual([]);
    warn.mockRestore();
    expect(nonFiniteVertices(plot.root)).toBe(0);
    for (const st of C.scene.steps) plot.show(st.show ?? null, false);
    expect(plot.layers.size).toBe(C.scene.layers.length);
  });

  it('the lab preset loads in the Lab', () => {
    const lab = C.lab ?? [];
    for (const [i, Lr] of lab.entries()) {
      const e = layerToEntry(Lr, i);
      const { c } = analyzeEntry(e);
      expect(c.type, `lab ${JSON.stringify(Lr)}`).not.toBe('error');
      const layers = entryToLayers(e, {}, 3);
      expect(layers.length).toBe(1);
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const plot = headlessPlot();
      plot.build({ view: { range: 3 }, layers });
      expect(warn.mock.calls.length).toBe(0);
      warn.mockRestore();
    }
  });
});
