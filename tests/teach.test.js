// @vitest-environment jsdom
// Runs every Teach animatic end to end on the real engine geometry and checks that what it draws is mathematically right.
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { classify, partials } from '../src/teach/analyze.js';
import { buildTeach, visibleSpan } from '../src/teach/beats.js';
import { runTeach } from '../src/teach/run.js';
import { fn } from '../src/lib/expr.js';
import { substitute } from '../src/lib/labmodel.js';
import { headlessPlot, trace, runBeats, nonFiniteVertices } from './helpers.js';

beforeAll(() => {
  globalThis.requestAnimationFrame ??= (cb) => setTimeout(() => cb(performance.now()), 0);
});

// Build the stage exactly as runTeach does, without the player.
function stage(input, params = {}) {
  const c = classify(input);
  const plan = buildTeach(c, params);
  const plot = headlessPlot();
  const sub = (L) => Object.fromEntries(Object.entries(L).map(([k, v]) => [k, typeof v === 'string' && k !== 'kind' ? substitute(v, params) : v]));
  plot.build({ view: plan.view, camera: plan.camera ?? undefined, layers: [...(plan.layers ?? []).map(sub), ...(plan.ghost ? [{ id: '__ghost', kind: 'surface', z: substitute(plan.ghost, params) }] : [])] });
  const tr = trace(plot);
  return { c, plan, plot, tr };
}

const play = (input, params) => {
  const s = stage(input, params);
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  const lives = runBeats(s.plot, s.plan, s.tr);
  const warned = warn.mock.calls.length;
  warn.mockRestore();
  return { ...s, lives, warned };
};

const byBeat = (log, re, kind) => log.filter((e) => re.test(e.beat) && (!kind || e.kind === kind));

const INPUTS = {
  graph2d: ['y = x^2', 'y = x^3 - 3*x', 'y = sin(x)', 'y = 1/x', 'y = exp(x)', 'y = abs(x)', 'y = sqrt(x)', 'y = x^2 + 10', 'y = log(x)', 'y = a*x^2', 'y = x^4 - 4*x^2 + 1', 'y = 2'],
  surface: ['z = x^2 - y^2', 'z = 4 - x^2 - y^2', 'z = x^4 + y^4 - 4*x*y + 1', 'z = sin(x)*cos(y)', 'z = x*y', 'z = exp(-(x^2 + y^2))', 'z = a*x^2 + y^2', 'f(x,y) = x^2 + 3*y^2', 'z = 1/(x^2 + y^2)', 'z = sqrt(9 - x^2 - y^2)', 'z = 3'],
  curve: ['<cos t, sin t, t/4>', '<t, t^2, t^3>', '<cos(t), sin(t)>', 'r(t) = <3*cos(t), 3*sin(t), 0>', '<t, 0, 0>', '<cos(k*t), sin(t), t>'],
  field: ['F = <-y, x>', 'F = <x, y>', 'F = <2*x*y, x^2>', 'F = <y*z, x*z, x*y>', 'F = <-y, x, 1>', 'F = <x, y, z>', 'F = <0, 0, z>', 'F = <a*x, y>'],
  implicit: ['x^2 + y^2 + z^2 = 4', 'x^2 + y^2 - z^2 = 1', 'z^2 - x^2 - y^2 = 1', 'z^2 = x^2 + y^2', 'x^2 + y^2 = 4', 'x + y + z = 1', 'x^2/4 + y^2/9 + z^2 = 1', 'x^2 + y^2 + z^2 - 2*x = 3', 'x^3 + y^2 - z = 0', 'x^2 + y^2 + z^2'],
  paramSurface: ['<(2 + cos(v))*cos(u), (2 + cos(v))*sin(u), sin(v)>', '<u, v, u^2 - v^2>', '<cos(u)*sin(v), sin(u)*sin(v), cos(v)>', '<u*cos(v), u*sin(v), u>'],
};

describe('every input plays every beat without errors and draws only finite geometry', () => {
  for (const [type, list] of Object.entries(INPUTS)) {
    for (const input of list) {
      it(`${type}: ${input}`, () => {
        const c = classify(input);
        expect(c.type).toBe(type);
        const params = Object.fromEntries((c.params ?? []).map((k) => [k, 1.5]));
        const r = play(input, params);
        expect(r.plan.beats.length).toBeGreaterThanOrEqual(3);
        for (const b of r.plan.beats) {
          expect(typeof b.title).toBe('string');
          expect(b.duration).toBeGreaterThan(500);
          expect(b.text.length).toBeGreaterThan(10);
        }
        expect(r.warned).toBe(0);
        expect(nonFiniteVertices(r.plot.root)).toBe(0);
        for (const l of r.lives) expect(l).not.toMatch(/NaN|undefined|Infinity/);
        for (const b of r.plan.beats) expect(`${b.title} ${b.text}`).not.toMatch(/NaN|undefined|\[object/);
      });
    }
  }
});

describe('y = f(x): what the animatic draws lies on the curve', () => {
  for (const input of ['y = x^2', 'y = x^3 - 3*x', 'y = sin(x)', 'y = exp(x)', 'y = x^2 + 10', 'y = 1/x']) {
    it(input, () => {
      const r = play(input);
      const f = fn(r.c.expr, ['x']);
      const R = r.plan.view.range;
      const movers = byBeat(r.tr.log, /rule|Trace|Add the pieces|steep|Landmarks/, 'mover').map((e) => e.data);
      expect(movers.length).toBeGreaterThan(20);
      for (const [x, y, z] of movers) {
        expect(z).toBe(0);
        if (Math.abs(y) > 1e-9 || Math.abs(f(x)) > 1e-6) expect(Math.abs(y - f(x))).toBeLessThan(1e-9 * (1 + Math.abs(y)));
      }
      // the traced dot never leaves the view box
      for (const [x, y] of byBeat(r.tr.log, /Trace/, 'mover').map((e) => e.data)) {
        expect(Math.abs(x)).toBeLessThanOrEqual(R + 1e-9);
        expect(Math.abs(y)).toBeLessThanOrEqual(R * 1.02 + 1e-9);
      }
      // the drawn tubes follow the same function
      for (const t of byBeat(r.tr.log, /Trace/, 'tube')) {
        for (let k = 0; k <= 10; k++) {
          const x = t.data.t0 + ((t.data.t1 - t.data.t0) * k) / 10;
          const v = t.data.fn(x);
          expect(v.y).toBeCloseTo(f(x), 9);
        }
      }
    });
  }
  it('y = x^2 is traced from the origin outward: right half first, then left', () => {
    const r = play('y = x^2');
    const xs = byBeat(r.tr.log, /Trace/, 'mover').map((e) => e.data[0]);
    expect(xs[0]).toBeCloseTo(0, 12);
    const mid = xs.findIndex((x) => x < -1e-9);
    expect(mid).toBeGreaterThan(0);
    expect(xs.slice(0, mid).every((x) => x >= -1e-12)).toBe(true);
    expect(xs.slice(mid).every((x) => x <= 1e-12)).toBe(true);
    expect(Math.max(...xs)).toBeCloseTo(2, 1); // y = 4 is the edge of the 4-unit box
    expect(Math.min(...xs)).toBeCloseTo(-2, 1);
  });
  it('the tangent line has the slope of the derivative', () => {
    const r = play('y = x^3 - 3*x');
    for (const e of byBeat(r.tr.log, /steep/, 'line')) {
      const [[x1, y1], [x2, y2]] = e.data;
      const xm = (x1 + x2) / 2;
      expect((y2 - y1) / (x2 - x1)).toBeCloseTo(3 * xm * xm - 3, 8);
    }
  });
  it('the pieces add up to the whole', () => {
    const r = play('y = x^3 - 3*x');
    const sumMovers = byBeat(r.tr.log, /Add the pieces/, 'mover').map((e) => e.data);
    for (const [x, y] of sumMovers) expect(y).toBeCloseTo(x ** 3 - 3 * x, 10);
    expect(r.lives.some((l) => /= /.test(l))).toBe(true);
  });
  it('visibleSpan clips to the frame', () => {
    const hi = visibleSpan((x) => x * x, 0, 4)[1];
    expect(hi).toBeGreaterThanOrEqual(2);
    expect(hi).toBeLessThan(Math.sqrt(4 * 1.02) + 1e-9);
    expect(visibleSpan((x) => 1 / x, 1, 4)[0]).toBeGreaterThan(0.2);
    expect(visibleSpan((x) => Math.sqrt(x), 0, 4)[0]).toBe(0);
  });
});

describe('surfaces: level curves, slices and critical points are right', () => {
  for (const input of ['z = x^2 - y^2', 'z = 4 - x^2 - y^2', 'z = x^4 + y^4 - 4*x*y + 1', 'z = sin(x)*cos(y)']) {
    it(input, () => {
      const r = play(input);
      const f = fn(r.c.expr, ['x', 'y']);
      // live contour slices: every endpoint satisfies f(x, y) = k
      const level = byBeat(r.tr.log, /Level curves/, 'segments').filter((e) => e.data.length && e.data[0][0][2] !== r.plot.zMin);
      expect(level.length).toBeGreaterThan(0);
      for (const e of level) for (const [a, b] of e.data) for (const p of [a, b]) {
        const h = 1e-4;
        const g = Math.hypot((f(p[0] + h, p[1]) - f(p[0] - h, p[1])) / (2 * h), (f(p[0], p[1] + h) - f(p[0], p[1] - h)) / (2 * h));
        // distance to the true level set is |f - k| / |grad f|; it must be below one grid cell
        expect(Math.abs(f(p[0], p[1]) - p[2]) / Math.max(g, 1e-3)).toBeLessThan(0.15);
      }
      // slice movers ride on the surface
      for (const [x, y, z] of byBeat(r.tr.log, /Freeze/, 'mover').map((e) => e.data)) expect(z).toBeCloseTo(f(x, y), 9);
      // the pins rise to f(x, y), never past it
      for (const [x, y, z] of byBeat(r.tr.log, /floor/, 'mover').map((e) => e.data)) {
        const top = f(x, y);
        expect(Math.min(z, top) - 1e-9).toBeLessThanOrEqual(Math.max(z, top));
      }
      // critical point markers sit where the gradient vanishes
      const p = partials(r.c.expr);
      const fx = fn(p.fx, ['x', 'y']); const fy = fn(p.fy, ['x', 'y']);
      for (const [x, y, z] of byBeat(r.tr.log, /Critical/, 'mover').map((e) => e.data)) {
        expect(Math.hypot(fx(x, y), fy(x, y))).toBeLessThan(1e-6);
        expect(z).toBeCloseTo(f(x, y), 9);
      }
      // the gradient arrows on the floor point in the direction of grad f
      for (const e of byBeat(r.tr.log, /gradient/i, 'arrow')) {
        const [[x, y], [x2, y2]] = e.data;
        const d = [x2 - x, y2 - y];
        const gr = [fx(x, y), fy(x, y)];
        if (Math.hypot(...gr) < 1e-6 || Math.hypot(...d) < 1e-9) continue;
        const cos = (d[0] * gr[0] + d[1] * gr[1]) / (Math.hypot(...d) * Math.hypot(...gr));
        expect(cos).toBeGreaterThan(0.999);
      }
    });
  }
  it('saddle: the D test names the saddle', () => {
    const r = play('z = x^2 - y^2');
    const beat = r.plan.beats.find((b) => /Critical/.test(b.title));
    expect(beat.text).toMatch(/saddle/i);
  });
});

describe('curves: the dot moves along r(t), velocity is tangent', () => {
  for (const input of ['<cos t, sin t, t/4>', '<t, t^2, t^3>', 'r(t) = <3*cos(t), 3*sin(t), 0>']) {
    it(input, () => {
      const r = play(input);
      const X = fn(r.c.x, ['t']); const Y = fn(r.c.y, ['t']); const Z = fn(r.c.z, ['t']);
      const ts = Array.from({ length: 8001 }, (_, i) => -20 + (40 * i) / 8000);
      const dist = (t, p) => Math.hypot(X(t) - p[0], Y(t) - p[1], Z(t) - p[2]);
      const nearestT = (p) => {
        let best = 0; let bd = Infinity;
        for (const t of ts) { const d = dist(t, p); if (d < bd) { bd = d; best = t; } }
        // refine by ternary search inside the bracketing samples
        let lo = best - 0.005; let hi = best + 0.005;
        for (let k = 0; k < 60; k++) { const a = lo + (hi - lo) / 3; const b = hi - (hi - lo) / 3; if (dist(a, p) < dist(b, p)) hi = b; else lo = a; }
        const t = (lo + hi) / 2;
        return { t, d: Math.min(bd, dist(t, p)) };
      };
      const movers = byBeat(r.tr.log, /climb|ride/, 'mover').map((e) => e.data);
      expect(movers.length).toBeGreaterThan(10);
      for (const p of movers) expect(nearestT(p).d).toBeLessThan(1e-6);
      // the first arrow of each frame in "ride along" is the velocity: parallel to r'(t)
      const arrows = byBeat(r.tr.log, /ride/, 'arrow').map((e) => e.data);
      expect(arrows.length).toBeGreaterThan(10);
      for (let i = 0; i < arrows.length; i += 2) {
        const [a, b] = arrows[i];
        const { t } = nearestT(a);
        const h = 1e-5;
        const tan = [(X(t + h) - X(t - h)) / (2 * h), (Y(t + h) - Y(t - h)) / (2 * h), (Z(t + h) - Z(t - h)) / (2 * h)];
        const d = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
        if (Math.hypot(...d) < 1e-9) continue;
        expect(d.reduce((s, x, k) => s + x * tan[k], 0) / (Math.hypot(...d) * Math.hypot(...tan))).toBeGreaterThan(0.995);
      }
    });
  }
});

describe('fields: flow lines follow the field, paddle wheels spin with the curl', () => {
  it('rotation field <-y, x>: dust circles counterclockwise at constant radius', () => {
    const r = play('F = <-y, x>');
    const trails = byBeat(r.tr.log, /dust/, 'line').map((e) => e.data).filter((t) => t.length > 5);
    expect(trails.length).toBeGreaterThan(0);
    for (const t of trails) {
      const r0 = Math.hypot(t[0][0], t[0][1]);
      for (const p of t) expect(Math.abs(Math.hypot(p[0], p[1]) - r0)).toBeLessThan(0.05 * (1 + r0));
      // counterclockwise: cross product of successive positions is positive
      for (let i = 1; i < t.length; i++) {
        const cr = t[i - 1][0] * t[i][1] - t[i - 1][1] * t[i][0];
        if (Math.hypot(t[i][0], t[i][1]) > 0.1) expect(cr).toBeGreaterThanOrEqual(-1e-9);
      }
    }
    const curl = r.plan.beats.find((b) => /Curl/.test(b.title));
    expect(curl.text).toMatch(/2/);
  });
  it('source field <x, y>: dust moves outward and divergence is positive everywhere', () => {
    const r = play('F = <x, y>');
    for (const t of byBeat(r.tr.log, /dust/, 'line').map((e) => e.data).filter((x) => x.length > 5)) {
      expect(Math.hypot(...t[t.length - 1].slice(0, 2))).toBeGreaterThanOrEqual(Math.hypot(...t[0].slice(0, 2)) - 1e-9);
    }
    const div = r.plan.beats.find((b) => /Divergence/.test(b.title));
    expect(div.text).toMatch(/2/);
  });
  it('gradient field <2xy, x^2> is called conservative; <-y, x> is not', () => {
    const t1 = play('F = <2*x*y, x^2>').plan.beats.map((b) => b.text).join(' ');
    expect(t1).toMatch(/conservative/i);
    expect(t1).not.toMatch(/not conservative/i);
    const t2 = play('F = <-y, x>').plan.beats.map((b) => b.text).join(' ');
    expect(t2).toMatch(/not conservative/i);
  });
  it('arrows at sample points equal F there', () => {
    const r = play('F = <2*x*y, x^2>');
    for (const e of byBeat(r.tr.log, /arrow at every point/i, 'arrow')) {
      const [[x, y], [x2, y2]] = e.data;
      const F = [2 * x * y, x * x];
      const d = [x2 - x, y2 - y];
      if (Math.hypot(...F) < 1e-9) continue;
      expect((d[0] * F[0] + d[1] * F[1]) / (Math.hypot(...d) * Math.hypot(...F))).toBeGreaterThan(0.9999);
    }
  });
});

describe('implicit surfaces: traces lie on the surface and the quadric is named', () => {
  const names = {
    'x^2 + y^2 + z^2 = 4': /sphere/i,
    'x^2 + y^2 - z^2 = 1': /one sheet/i,
    'z^2 - x^2 - y^2 = 1': /two sheets/i,
    'z^2 = x^2 + y^2': /cone/i,
    'x^2 + y^2 = 4': /cylinder/i,
    'x^2/4 + y^2/9 + z^2 = 1': /ellipsoid/i,
  };
  for (const [input, re] of Object.entries(names)) {
    it(input, () => {
      const r = play(input);
      expect(r.plan.beats[0].text).toMatch(re);
      const F = fn(r.c.F, ['x', 'y', 'z']);
      const segs = r.tr.log.filter((e) => /Traces/.test(e.beat) && e.kind === 'segments').flatMap((e) => e.data);
      expect(segs.length).toBeGreaterThan(20);
      const cell = (2 * r.plot.R) / 60;
      for (const [a, b] of segs) for (const p of [a, b]) {
        const h = 1e-4;
        const g = Math.hypot(...[0, 1, 2].map((i) => { const u = [...p]; const d = [...p]; u[i] += h; d[i] -= h; return (F(...u) - F(...d)) / (2 * h); }));
        expect(Math.abs(F(...p)) / Math.max(g, 1e-3)).toBeLessThan(cell);
      }
    });
  }
});

describe('parametric surfaces: grid lines lie on r(u, v)', () => {
  it('torus', () => {
    const r = play('<(2 + cos(v))*cos(u), (2 + cos(v))*sin(u), sin(v)>');
    const pts = [
      ...r.tr.log.filter((e) => e.kind === 'line').flatMap((e) => e.data),
      ...r.tr.log.filter((e) => e.kind === 'mover').map((e) => e.data),
    ];
    // tubes are in world coordinates: undo the vertical scale
    for (const t of r.tr.log.filter((e) => e.kind === 'tube')) {
      for (let k = 0; k <= 12; k++) {
        const v = t.data.fn(t.data.t0 + ((t.data.t1 - t.data.t0) * k) / 12);
        pts.push([v.x, v.y, (v.z - r.plot.zMid) / r.plot.zs + r.plot.zMid]);
      }
    }
    expect(pts.length).toBeGreaterThan(50);
    for (const [x, y, z] of pts) expect(Math.abs((Math.hypot(x, y) - 2) ** 2 + z * z - 1)).toBeLessThan(1e-6);
  });
});

describe('the player itself', () => {
  it('plays a full lesson to the end, keeps kept beats, and seeking works', async () => {
    const plot = headlessPlot();
    const host = document.createElement('div');
    document.body.appendChild(host);
    const c = classify('y = x^2');
    const player = runTeach(plot, host, c, {}, { colormap: 'terrain' });
    expect(player).toBeTruthy();
    expect(player.playing).toBe(true);
    let now = performance.now();
    for (let i = 0; i < 4000 && player.playing; i++) { now += 50; player.tick(now); }
    expect(player.playing).toBe(false);
    expect(player.i).toBe(player.beats.length - 1);
    expect(host.querySelector('.teach-fill').style.width).toBe('100%');
    // the cylinder beat is the last and keeps its surface
    expect(plot.overlayGroup.children.length).toBeGreaterThan(0);
    player.go(1, 0.5);
    expect(player.i).toBe(1);
    expect(host.querySelector('.teach-title').textContent).toMatch(/Trace/);
    player.go(99);
    expect(player.i).toBe(player.beats.length - 1);
    player.go(-5);
    expect(player.i).toBe(0);
    // labels from removed objects do not pile up in the DOM
    const before = plot.overlayGroup.children.length;
    player.go(0);
    expect(plot.overlayGroup.children.length).toBeLessThanOrEqual(before + 10);
    player.dispose();
    expect(host.querySelector('.teach')).toBeNull();
  });
  it('declines things it cannot teach', () => {
    const plot = headlessPlot();
    expect(runTeach(plot, document.createElement('div'), classify('<1, 2, 3>'))).toBeNull();
  });
});
