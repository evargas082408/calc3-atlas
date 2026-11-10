// @vitest-environment jsdom
// Select-to-explain, the lesson tour's section mapping, and click-a-point explanations on the model.
import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { LESSONS } from '../src/content/course.js';
import { GLOSSARY, lookup } from '../src/lib/glossary.js';
import { texToExpr, drawable, mapStepsToSections, matchStep, explain } from '../src/lib/explainer.js';
import { buildIndex } from '../src/lib/search.js';
import { fn } from '../src/lib/expr.js';
import { surfaceAt, fieldAt, pointInfo } from '../src/teach/pointinfo.js';
import { teachableLayer } from '../src/views/components.js';
import { buildTeach } from '../src/teach/beats.js';

const ids = (r) => r.map((g) => g.id);
const mathSpans = (s) => [...String(s).matchAll(/\$([^$]+)\$/g)].map((m) => m[1]);
const index = buildIndex(LESSONS);
const env = (extra = {}) => ({ lessons: LESSONS, index, tally: [], mastery: () => ({ tries: 0, correct: 0 }), highlights: [], ...extra });

describe('glossary', () => {
  it('every meaning renders in KaTeX and points at real lessons', () => {
    for (const g of GLOSSARY) {
      for (const m of mathSpans(g.meaning)) expect(() => katex.renderToString(m, { throwOnError: true, strict: 'ignore' }), `${g.id}: ${m}`).not.toThrow();
      expect(g.lessons.length).toBeGreaterThan(0);
      for (const id of g.lessons) expect(LESSONS.some((l) => l.id === id), `${g.id} -> L${id}`).toBe(true);
    }
  });

  it('ids are unique', () => {
    expect(new Set(GLOSSARY.map((g) => g.id)).size).toBe(GLOSSARY.length);
  });

  it('reads symbols out of formulas, most specific first', () => {
    expect(ids(lookup({ tex: String.raw`\nabla f = \lambda \nabla g` }))).toEqual(['gradient', 'lagrange']);
    expect(ids(lookup({ tex: String.raw`\nabla \times \vec F` }))).toEqual(['curl']);
    expect(ids(lookup({ tex: String.raw`\nabla\cdot\vec F = P_x + Q_y + R_z` }))).toContain('div');
    expect(ids(lookup({ tex: String.raw`\nabla\cdot\vec F` }))).not.toContain('gradient');
    expect(ids(lookup({ tex: String.raw`\iint_D f\,dA` }))).toEqual(['double', 'dA']);
    const polar = ids(lookup({ tex: String.raw`\int_0^{2\pi}\!\!\int_0^1 e^{-r^2}\,r\,dr\,d\theta` }));
    expect(polar).toContain('double');
    expect(polar).toContain('polar-element');
    expect(polar).not.toContain('dA');
    const sph = ids(lookup({ tex: String.raw`\iiint_E f\,\rho^2\sin\phi\,d\rho\,d\phi\,d\theta` }));
    expect(sph).toContain('triple');
    expect(sph).toContain('spherical-element');
    expect(sph).not.toContain('rho');
    expect(ids(lookup({ tex: String.raw`\oint_C \vec F\cdot d\vec r` }))).toContain('closed');
    expect(ids(lookup({ tex: String.raw`\oint_C \vec F\cdot d\vec r` }))).not.toContain('double');
    expect(ids(lookup({ tex: String.raw`D = f_{xx}f_{yy} - f_{xy}^2` }))).toEqual(['discriminant', 'second-partials']);
  });

  it('reads terms out of sentences', () => {
    expect(ids(lookup({ text: 'The gradient is perpendicular to the level curves.' }))).toEqual(['gradient', 'level-curve']);
    expect(ids(lookup({ text: "Use Green's theorem on the counterclockwise boundary" }))).toEqual(expect.arrayContaining(['green', 'orientation', 'boundary']));
    expect(ids(lookup({ text: 'The divergence theorem turns flux into a triple integral' }))).toEqual(expect.arrayContaining(['divergence-theorem', 'flux', 'triple']));
    expect(ids(lookup({ text: 'The divergence theorem turns flux into a triple integral' }))).not.toContain('div');
    expect(lookup({ text: 'nothing mathy at all here' })).toEqual([]);
  });

  it('finds something to say about every formula on every formula card', () => {
    const silent = [];
    for (const L of LESSONS) for (const f of L.content.formulas) {
      const ex = explain({ tex: f.tex, text: f.label, lessonId: L.id }, env());
      if (!ex.terms.length && !ex.where.length) silent.push(`L${L.id} ${f.label}`);
    }
    expect(silent).toEqual([]);
  });
});

describe('formulas the model can draw', () => {
  const close = (a, b) => Math.abs(a - b) < 1e-9 * (1 + Math.abs(b));
  it('turns TeX into expressions the Teach mode reads', () => {
    expect(texToExpr('z = 4 - x^2 - y^2')).toBe('z = 4 - x^2 - y^2');
    expect(texToExpr(String.raw`\vec r(t) = \langle \cos t, \sin t, t \rangle`)).toBe('<cos t, sin t, t>');
    expect(texToExpr(String.raw`\vec F = \langle -y,\ x \rangle`)).toBe('F = <-y, x>');
    expect(texToExpr(String.raw`dA = r\,dr\,d\theta`)).toBeNull();
    expect(texToExpr(String.raw`\iint_D f\,dA`)).toBeNull();
  });

  it('keeps the function the same', () => {
    const cases = [
      [String.raw`f(x,y) = \frac{1}{1 + x^2 + y^2}`, (x, y) => 1 / (1 + x * x + y * y)],
      [String.raw`z = \sqrt{9 - x^2 - y^2}`, (x, y) => Math.sqrt(9 - x * x - y * y)],
      [String.raw`z = e^{-(x^2+y^2)}`, (x, y) => Math.exp(-(x * x + y * y))],
      [String.raw`z = x^2 \cdot y - \tfrac{1}{2}y^3`, (x, y) => x * x * y - 0.5 * y ** 3],
    ];
    for (const [src, f] of cases) {
      const d = drawable(src);
      expect(d?.c.type, src).toBe('surface');
      const g = fn(d.c.expr, ['x', 'y']);
      for (const [x, y] of [[0.3, -0.7], [1.1, 0.4], [-1.5, 1.2]]) expect(close(g(x, y), f(x, y)), `${src} at ${x},${y}`).toBe(true);
    }
  });

  it('classifies curves, fields and implicit surfaces', () => {
    expect(drawable(String.raw`\vec r(t) = \langle \cos t, \sin t, t/4 \rangle`)?.c.type).toBe('curve');
    expect(drawable(String.raw`\vec F = \langle -y, x \rangle`)?.c.type).toBe('field');
    expect(drawable('x^2 + y^2 = z^2')?.c.type).toBe('implicit');
    expect(drawable(String.raw`z = a x^2`)).toBeNull(); // free constant: needs a slider, so not here
  });
});

describe('lesson text and the 3D model', () => {
  it('every scene step maps to a real section', () => {
    for (const L of LESSONS) {
      const { scene, sections } = L.content;
      const map = mapStepsToSections(scene.steps, sections);
      expect(map.length).toBe(scene.steps.length);
      expect(map.every((sid) => sections.some((s) => s.id === sid)), `L${L.id}`).toBe(true);
    }
  });

  it('sends the obvious steps to the obvious sections', () => {
    const at = (id, label) => {
      const C = LESSONS.find((l) => l.id === id).content;
      return mapStepsToSections(C.scene.steps, C.sections)[C.scene.steps.findIndex((s) => s.label === label)];
    };
    expect(at(1, 'Cross')).toBe('cross');
    expect(at(1, 'Project')).toBe('projection');
    expect(at(3, 'Sphere')).toBe('sphere');
    expect(at(3, 'Paraboloid')).toBe('paraboloid');
    expect(at(15, 'Saddle')).toBe('saddle');
    expect(at(23, 'Volume element')).toBe('jacobian');
    expect(at(36, 'Hemisphere')).toBe('example-hemisphere');
  });

  it('puts the polar box beside the section that explains the extra r', () => {
    const L = LESSONS.find((l) => l.id === 20).content;
    const map = mapStepsToSections(L.scene.steps, L.sections);
    expect(map[L.scene.steps.findIndex((s) => s.label === 'Polar box')]).toBe('why-r');
  });

  it('matches a selected passage to the step that shows it', () => {
    const L = LESSONS.find((l) => l.id === 20).content;
    const map = mapStepsToSections(L.scene.steps, L.sections);
    const k = matchStep('one polar box has area r times dr dtheta', L.scene.steps, { sectionId: 'why-r', stepSections: map });
    expect(L.scene.steps[k].label).toBe('Polar box');
    expect(matchStep('anything', [], {})).toBe(-1);
  });

  it('the Build it button only appears for layers Teach mode can really build', () => {
    let n = 0;
    for (const L of LESSONS) {
      const t = teachableLayer(L.content.scene);
      if (!t) continue;
      n++;
      expect(buildTeach(t.c, {}), `L${L.id} ${t.src}`).toBeTruthy();
    }
    expect(n).toBeGreaterThan(10);
  });
});

describe('explaining a selection', () => {
  it('starts from the section it came from and flags your own mistakes', () => {
    const tally = [{ lesson: 20, mistake: 'missing-r', count: 3, problems: new Set(['p1']), last: Date.now() }];
    const ex = explain({ text: 'why we need the extra r in dA when we switch to polar', lessonId: 20, sectionId: 'why-r' }, env({ tally, mastery: () => ({ tries: 5, correct: 2 }) }));
    expect(ex.where[0]).toMatchObject({ lesson: 20, section: 'why-r' });
    expect(ex.terms.map((t) => t.id)).toContain('dA');
    const trap = ex.traps.find((t) => t.id === 'missing-r');
    expect(trap?.yours).toBe(3);
    expect(ex.you.join(' ')).toMatch(/2 of 5/);
    expect(ex.you.join(' ')).toMatch(/3×/);
  });

  it('works with no lesson and remembers what you marked', () => {
    const ex = explain({ text: 'the curl of a gradient field is zero' }, env({ highlights: [{ text: 'the curl of a gradient field is zero', color: 'work' }] }));
    expect(ex.terms.map((t) => t.id)).toEqual(expect.arrayContaining(['curl', 'gradient']));
    expect(ex.where.length).toBeGreaterThan(0);
    expect(ex.you).toContain('You marked this as needing work.');
  });
});

describe('clicking a point on the model', () => {
  it('reads height, slopes and the tangent plane off a surface', () => {
    const s = surfaceAt('x^2 - y^2', 1, 0.5);
    expect(s.z).toBeCloseTo(0.75, 9);
    expect(s.fx).toBeCloseTo(2, 6);
    expect(s.fy).toBeCloseTo(-1, 6);
    const info = pointInfo({ kind: 'surface', z: 'x^2 - y^2' }, { x: 1, y: 0.5 });
    expect(info.lines.join(' ')).toContain('\\langle 2, -1\\rangle');
    expect(info.lines.at(-1)).toContain('z = 0.75 + 2(x - 1) - 1(y - 0.5)');
    // the uphill arrow climbs at |grad f| along the tangent plane
    const [a] = info.overlay.arrows;
    const run = Math.hypot(a.to[0] - a.from[0], a.to[1] - a.from[1]);
    expect((a.to[2] - a.from[2]) / run).toBeCloseTo(Math.hypot(2, 1), 6);
    expect((a.to[0] - a.from[0]) / (a.to[1] - a.from[1])).toBeCloseTo(-2, 6);
  });

  it('classifies critical points with the second derivative test', () => {
    const at0 = (z) => pointInfo({ kind: 'surface', z }, { x: 0, y: 0 }).lines.join(' ');
    expect(at0('x^2 - y^2')).toMatch(/saddle/);
    expect(at0('x^2 + y^2')).toMatch(/local min/);
    expect(at0('4 - x^2 - y^2')).toMatch(/local max/);
    expect(at0('x^4 + y^4')).toMatch(/can't decide/);
  });

  it('reads divergence and spin off a field', () => {
    const rot = fieldAt({ P: '-y', Q: 'x', R: '0' }, 1, 2);
    expect(rot.div).toBeCloseTo(0, 6);
    expect(rot.curl[2]).toBeCloseTo(2, 6);
    expect(pointInfo({ kind: 'vectorField', P: '-y', Q: 'x', R: '0' }, { x: 1, y: 2 }).lines.join(' ')).toMatch(/counterclockwise/);
    expect(pointInfo({ kind: 'vectorField', P: 'x', Q: 'y', R: '0' }, { x: 1, y: 1 }).lines.join(' ')).toMatch(/source/);
    const grad = fieldAt({ P: 'y*z', Q: 'x*z', R: 'x*y' }, 0.5, -1, 2);
    expect(grad.is3d).toBe(true);
    expect(Math.hypot(...grad.curl)).toBeLessThan(1e-6);
    expect(grad.F).toEqual([-2, 1, -0.5]);
  });

  it('gives cylindrical and spherical coordinates anywhere else', () => {
    const info = pointInfo({ kind: 'paramSurface' }, { x: 0, y: 2, z: 2 });
    expect(info.lines[0]).toContain('r = 2');
    expect(info.lines[1]).toContain('\\rho = 2.83');
    expect(info.lines[1]).toContain('45°');
    for (const l of info.lines) for (const m of mathSpans(l)) expect(() => katex.renderToString(m, { throwOnError: true })).not.toThrow();
  });
});

describe('lecture videos', async () => {
  const { CHEN_LESSONS, CHEN_REVIEWS } = await import('../src/content/chenflix.js');
  const { entryOf, kalturaSrc, lecturesFor } = await import('../src/views/media.js');

  it('every lesson has both lectures, with Kaltura entry ids the player can load', () => {
    expect(CHEN_LESSONS.map((c) => c.id)).toEqual(LESSONS.map((l) => l.id));
    for (const L of LESSONS) {
      const list = lecturesFor(L);
      expect(list.map((x) => x.key), `L${L.id}`).toEqual(['sunkula', 'chen']);
      for (const x of list) {
        expect(x.entry).toMatch(/^\d_[a-z0-9]{8}$/);
        expect(x.notes).toMatch(/^https:\/\/www\.math\.purdue\.edu\/~(msunkula|chenjk)\//);
      }
    }
  });

  it("Chen's lesson N covers the same textbook sections as lesson N here", () => {
    for (const c of CHEN_LESSONS) {
      const L = LESSONS.find((l) => l.id === c.id);
      const chenSec = decodeURIComponent(c.notes).match(/\(([\d.,\s-]+)\)/)?.[1] ?? '';
      const first = (s) => s.match(/\d+\.\d+/)?.[0];
      expect(first(chenSec), `L${c.id}`).toBe(first(L.section));
    }
  });

  it('builds the embed URL from a MediaSpace link', () => {
    expect(entryOf('https://mediaspace.itap.purdue.edu/media/Spring+2026+-+MA261+-+Sunkula+%288%3A28%29/1_5uhnp5ow')).toBe('1_5uhnp5ow');
    expect(entryOf('https://mediaspace.itap.purdue.edu/id/1_s6k4uvm7')).toBe('1_s6k4uvm7');
    expect(kalturaSrc('1_5uhnp5ow')).toBe('https://cdnapisec.kaltura.com/p/983291/embedPlaykitJs/uiconf_id/56090002?iframeembed=true&entry_id=1_5uhnp5ow');
    expect(CHEN_REVIEWS.length).toBe(5);
  });
});
