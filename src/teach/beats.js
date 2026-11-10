// Teach mode: turns one input into an animated lesson ("beats"), built on the Plot3D overlay.
// A beat = { title, text, duration, keep, enter(ctx) -> state, update(p, state, ctx), live?(p, state) }.
import { fn, fmt, toTex } from '../lib/expr.js';
import {
  terms, describeTerm, symmetry1d, roots1d, criticalPoints1d, partials, criticalPoints2d, trace,
  divCurl, curveStats, classifyQuadric, derivative,
} from './analyze.js';

const TERM_COLORS = ['revision', 'road', 'wood', 'contour', 'water'];
const T = (e) => toTex(e);

// Marching squares for g(x, y) = 0 on [-R, R]^2: returns [[x,y],[x,y]] segments.
export function zeroSet2d(g, R, n = 90) {
  const vals = new Float64Array((n + 1) * (n + 1));
  const at = (i) => -R + (2 * R * i) / n;
  for (let i = 0; i <= n; i++) for (let j = 0; j <= n; j++) vals[i * (n + 1) + j] = g(at(i), at(j));
  const segs = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const q = [vals[i * (n + 1) + j], vals[(i + 1) * (n + 1) + j], vals[(i + 1) * (n + 1) + j + 1], vals[i * (n + 1) + j + 1]];
    if (q.some((v) => !Number.isFinite(v))) continue;
    const P = [[at(i), at(j)], [at(i + 1), at(j)], [at(i + 1), at(j + 1)], [at(i), at(j + 1)]];
    const cuts = [];
    for (let e = 0; e < 4; e++) {
      const a = q[e]; const b = q[(e + 1) % 4];
      if ((a < 0) !== (b < 0)) {
        const t = a / (a - b);
        cuts.push([P[e][0] + (P[(e + 1) % 4][0] - P[e][0]) * t, P[e][1] + (P[(e + 1) % 4][1] - P[e][1]) * t]);
      }
    }
    if (cuts.length === 2) segs.push(cuts);
    else if (cuts.length === 4) segs.push([cuts[0], cuts[1]], [cuts[2], cuts[3]]);
  }
  return segs;
}

const lerp = (a, b, p) => a + (b - a) * p;
const ease = (p) => 1 - Math.pow(1 - Math.min(1, Math.max(0, p)), 3);
const scope = (params) => Object.fromEntries(Object.entries(params ?? {}));

// Bind slider parameters into an expression by substitution-free evaluation.
function f1(expr, params) {
  const names = ['x', ...Object.keys(params)];
  const g = fn(expr, names);
  const vals = Object.values(params);
  return (x) => g(x, ...vals);
}
function f2(expr, params) {
  const names = ['x', 'y', ...Object.keys(params)];
  const g = fn(expr, names);
  const vals = Object.values(params);
  return (x, y) => g(x, y, ...vals);
}
function f3(expr, params, v = ['x', 'y', 'z']) {
  const names = [...v, ...Object.keys(params)];
  const g = fn(expr, names);
  const vals = Object.values(params);
  return (a, b, c) => g(a, b, c, ...vals);
}
function ft(expr, params) {
  const names = ['t', ...Object.keys(params)];
  const g = fn(expr, names);
  const vals = Object.values(params);
  return (t) => g(t, ...vals);
}

// ---------------------------------------------------------------- y = f(x)

// The x-interval around `from` where f stays finite and inside the view box, so curves stop at the frame like Desmos.
export function visibleSpan(f, from, R, lim = R * 1.02) {
  const ok = (x) => Number.isFinite(f(x)) && Math.abs(f(x)) <= lim;
  if (!ok(from)) return [from, from];
  const step = R / 600;
  let hi = from;
  while (hi + step <= R + 1e-9 && ok(hi + step)) hi += step;
  let lo = from;
  while (lo - step >= -R - 1e-9 && ok(lo - step)) lo -= step;
  return [lo, hi];
}

function graph2dBeats(c, P) {
  const f = f1(c.expr, P);
  const y0 = [0, 1, -1, 0.5].map(f).find(Number.isFinite) ?? 0;
  const R = Math.max(4, Math.min(24, Math.ceil(Math.abs(y0) * 1.5)));
  const tex = T(c.expr);
  const parts = terms(c.expr);
  const d1 = derivative(c.expr, 'x');
  const fp = d1 ? f1(d1, P) : null;
  const sym = symmetry1d(c.expr);
  const zeros = roots1d(f, -R, R);
  const crit = d1 ? criticalPoints1d(c.expr, -R, R).filter((q) => !Object.keys(P).length) : [];
  const start = Number.isFinite(f(0)) ? 0 : 1;
  const [xl, xr] = visibleSpan(f, start, R);
  const inBox = (pts) => pts.filter((q) => Math.abs(q[1]) <= R * 1.02);
  const top = [0, -0.01, 11 * (R / 4)];
  const iso = [6.5 * (R / 4), -7.5 * (R / 4), 5];
  const beats = [];

  beats.push({
    title: 'The rule',
    duration: 4200,
    text: `$y = ${tex}$ is a machine: feed it an $x$, it hands back a $y$. Every input–output pair is a point $(x, y)$. Watch a few go in.`,
    enter(ctx) {
      ctx.plot.cameraTo(top, 1);
      const xs = [-2, -1, 0, 1, 2].filter((x) => Number.isFinite(f(x)) && Math.abs(f(x)) < 9);
      return { xs, made: 0 };
    },
    update(p, s, ctx) {
      const want = Math.min(s.xs.length, Math.floor(ease(p * 1.15) * s.xs.length + 0.001));
      while (s.made < want) {
        const x = s.xs[s.made++];
        const m = ctx.plot.mover(ctx.pal.road);
        m.move([x, f(x), 0], `(${fmt(x, 2)}, ${fmt(f(x), 2)})`);
        ctx.add(m.obj);
      }
    },
    live: (p, s) => (s.made ? `Last in: $x = ${fmt(s.xs[s.made - 1], 2)}$ gives $y = ${fmt(f(s.xs[s.made - 1]), 3)}$.` : ''),
  });

  beats.push({
    title: 'Trace it out from the origin',
    duration: 5600,
    keep: true,
    text: `Now let $x$ slide continuously, starting at ${start === 0 ? 'the origin' : '$x = 1$'} and moving out both ways. The dot is $(x, ${tex})$; the curve is every place it has been.`,
    enter(ctx) {
      const right = ctx.plot.drawableTube((x) => ctx.plot.w(x, f(x), 0), start, Math.max(xr, start + 1e-6), ctx.pal.water);
      const left = ctx.plot.drawableTube((x) => ctx.plot.w(x, f(x), 0), start, Math.min(xl, start - 1e-6), ctx.pal.water);
      const m = ctx.plot.mover(ctx.pal.road);
      ctx.add(right.obj); ctx.add(left.obj); ctx.add(m.obj, true);
      return { right, left, m, x: start };
    },
    update(p, s) {
      const a = ease(Math.min(1, p * 2));
      const b = ease(Math.max(0, p * 2 - 1));
      s.right.draw(a);
      s.left.draw(b);
      const x = p < 0.5 ? start + (xr - start) * a : start + (xl - start) * b;
      s.x = x;
      s.m.move([x, f(x), 0], `x = ${fmt(x, 2)}`);
    },
    live: (p, s) => `$x = ${fmt(s.x, 2)}$ → $y = ${fmt(f(s.x), 3)}$`,
  });

  if (parts.length > 1) {
    parts.forEach((term, i) => {
      const g = f1(term, P);
      beats.push({
        title: `Piece ${i + 1} of ${parts.length}: $${T(term)}$`,
        duration: 3600,
        text: `$${T(term)}$ is ${describeTerm(term, ['x'])}.`,
        enter(ctx) {
          const mid = Number.isFinite(g(0)) && Math.abs(g(0)) <= R ? 0 : 1;
          const [a, b] = visibleSpan(g, mid, R);
          const t = ctx.plot.drawableTube((x) => ctx.plot.w(x, g(x), 0), a, Math.max(b, a + 1e-6), ctx.pal[TERM_COLORS[i % TERM_COLORS.length]], ctx.plot.R * 0.009);
          ctx.add(t.obj);
          return { t };
        },
        update(p, s) { s.t.draw(ease(p * 1.3)); },
      });
    });
    beats.push({
      title: 'Add the pieces',
      duration: 3600,
      text: `At every $x$, stack the pieces' heights on top of each other: ${parts.map((t) => `$${T(t)}$`).join(' + ')}. That sum is the blue curve.`,
      enter(ctx) {
        const lines = parts.map((term, i) => {
          const g = f1(term, P);
          const L = ctx.plot.liveLine(ctx.pal[TERM_COLORS[i % TERM_COLORS.length]], 200, 0.8);
          const pts = [];
          for (let k = 0; k <= 160; k++) { const x = -R + (2 * R * k) / 160; pts.push([x, g(x), 0]); }
          L.set(inBox(pts));
          ctx.add(L.obj);
          return L;
        });
        const m = ctx.plot.mover(ctx.pal.road);
        ctx.add(m.obj);
        return { lines, m, x: 0 };
      },
      update(p, s) {
        s.x = lerp(xl + (xr - xl) * 0.1, xr - (xr - xl) * 0.1, ease(p));
        s.m.move([s.x, f(s.x), 0], 'sum');
      },
      live: (p, s) => `At $x = ${fmt(s.x, 2)}$: ${parts.map((t) => fmt(f1(t, P)(s.x), 2)).join(' + ').replace(/\+ -/g, '− ')} $= ${fmt(f(s.x), 3)}$`,
    });
  } else {
    beats.push({
      title: `What $${tex}$ does`,
      duration: 3800,
      text: `$${tex}$: ${describeTerm(c.expr, ['x'])}.`,
      enter: () => ({}),
      update() {},
    });
  }

  if (fp) {
    beats.push({
      title: 'How steep is it? The derivative',
      duration: 6200,
      text: `The slope of the curve at $x$ is $y' = ${T(d1)}$. The red line is the tangent line; watch the slope change sign where the curve turns.`,
      enter(ctx) {
        const L = ctx.plot.liveLine(ctx.pal.road, 2);
        const m = ctx.plot.mover(ctx.pal.road);
        ctx.add(L.obj); ctx.add(m.obj);
        return { L, m, x: 0 };
      },
      update(p, s) {
        const x = lerp(xl + (xr - xl) * 0.08, xr - (xr - xl) * 0.08, ease(p));
        s.x = x;
        const y = f(x);
        const k = fp(x);
        const h = 1.2 / Math.sqrt(1 + k * k);
        s.L.set([[x - h, y - k * h, 0], [x + h, y + k * h, 0]]);
        s.m.move([x, y, 0], `slope ${fmt(k, 2)}`);
      },
      live: (p, s) => `At $x = ${fmt(s.x, 2)}$ the slope is $${fmt(fp(s.x), 3)}$ — ${fp(s.x) > 1e-3 ? 'rising' : fp(s.x) < -1e-3 ? 'falling' : 'flat'}.`,
    });
  }

  const facts = [];
  if (zeros.length) facts.push(`It crosses the $x$-axis at $x = ${zeros.slice(0, 5).map((z) => fmt(z, 3)).join(',\\ ')}$.`);
  if (Number.isFinite(f(0))) facts.push(`It crosses the $y$-axis at $y = ${fmt(f(0), 3)}$.`);
  for (const q of crit.slice(0, 4)) facts.push(`A turning point at $(${fmt(q.x, 3)}, ${fmt(q.y, 3)})$: a local ${q.kind} (because $y'' ${q.kind === 'min' ? '> 0' : q.kind === 'max' ? '< 0' : '= 0'}$ there).`);
  if (sym === 'even') facts.push('It is **even**: $f(-x) = f(x)$, so the left half mirrors the right half across the $y$-axis.');
  if (sym === 'odd') facts.push('It is **odd**: $f(-x) = -f(x)$, so it has 180° rotational symmetry about the origin.');
  if (facts.length) {
    beats.push({
      title: 'Landmarks',
      duration: 4500,
      text: facts.join(' '),
      enter(ctx) {
        for (const z of zeros.slice(0, 6)) { const m = ctx.plot.mover(ctx.pal.ink); m.move([z, 0, 0], ''); ctx.add(m.obj); }
        for (const q of crit.filter((q) => Math.abs(q.y) <= R).slice(0, 4)) { const m = ctx.plot.mover(ctx.pal.revision); m.move([q.x, q.y, 0], q.kind); ctx.add(m.obj); }
        return {};
      },
      update() {},
    });
  }

  for (const name of Object.keys(P)) {
    beats.push(paramBeat(name, P, (ctx, vals) => {
      const g = f1(c.expr, vals);
      const pts = [];
      for (let k = 0; k <= 200; k++) { const x = -R + (2 * R * k) / 200; pts.push([x, g(x), 0]); }
      return inBox(pts);
    }, `$${tex}$`));
  }

  beats.push({
    title: 'In 3D, it becomes a cylinder',
    duration: 6400,
    keep: true,
    text: `In space, $y = ${tex}$ says nothing about $z$. So the same curve sits at **every** height $z$, and stacking them makes a ${sym === 'even' && /x\s*\^\s*2/.test(c.expr) ? 'parabolic ' : ''}**cylinder** (Lesson 3: a missing variable means the curve slides along that axis).`,
    enter(ctx) {
      const start = ctx.plot.camera.position.clone();
      const g = ctx.plot.gridSurface((s, t) => { const x = xl + (xr - xl) * s; return [x, f(x), ctx.plot.zMin + (ctx.plot.zMax - ctx.plot.zMin) * t]; }, { n: 80, m: 16, opacity: 0.72, colormap: 'water' });
      ctx.add(g);
      return { start, g };
    },
    update(p, s, ctx) {
      ctx.plot.cameraTo(iso, Math.min(1, p * 1.6), s.start);
      const z = lerp(ctx.plot.zMin, ctx.plot.zMax, ease(Math.max(0, (p - 0.25) / 0.75)));
      ctx.plot.clip(s.g, 'z', z, true);
    },
  });

  return { beats, view: { range: R, z: [-4, 4] }, camera: [0, -0.01, R * 2.75] };
}

// ---------------------------------------------------------------- z = f(x, y)

function surfaceBeats(c, P) {
  const R = 3;
  const f = f2(c.expr, P);
  const tex = T(c.expr);
  const parts = terms(c.expr);
  const pd = partials(c.expr);
  const fx = pd.fx ? f2(pd.fx, P) : null;
  const fy = pd.fy ? f2(pd.fy, P) : null;
  const crit = Object.keys(P).length ? [] : criticalPoints2d(c.expr, R);
  const tY = trace(c.expr, 'y', 0);
  const tX = trace(c.expr, 'x', 0);
  const P0 = pickPoint(f, fx, fy, R);
  const beats = [];

  beats.push({
    title: 'Inputs live on the floor',
    duration: 4200,
    text: `$z = ${tex}$ takes a point $(x, y)$ on the floor and returns a height $z$. Each pin rises to its height. Together, the pin tops are the surface.`,
    enter(ctx) {
      const pins = [];
      for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) {
        const x = (i * R) / 3.5; const y = (j * R) / 3.5;
        const L = ctx.plot.liveLine(ctx.pal.contour, 2, 0.9);
        const m = ctx.plot.mover(ctx.pal.road);
        m.obj.scale.setScalar(0.55);
        m.label.textContent = '';
        ctx.add(L.obj); ctx.add(m.obj);
        pins.push({ x, y, L, m, delay: (Math.abs(i) + Math.abs(j)) / 12 });
      }
      return { pins };
    },
    update(p, s, ctx) {
      for (const pin of s.pins) {
        const k = ease((p - pin.delay * 0.6) / 0.5);
        const z = f(pin.x, pin.y);
        const zz = lerp(ctx.plot.zMin, Math.min(ctx.plot.zMax, Math.max(ctx.plot.zMin, z)), Math.max(0, k));
        pin.L.set([[pin.x, pin.y, ctx.plot.zMin], [pin.x, pin.y, zz]]);
        pin.m.move([pin.x, pin.y, zz]);
      }
    },
  });

  const sliceBeat = (freeze, tr) => ({
    title: `Freeze ${freeze} = 0: a slice`,
    duration: 5200,
    keep: true,
    text: `Hold $${freeze} = 0$ and only $${tr.other}$ is left: $z = ${T(tr.expr || '0')}$. That is an ordinary Calc 1 curve, drawn on the wall $${freeze} = 0$, traced out from the origin.`,
    enter(ctx) {
      const at = (u) => (freeze === 'y' ? [u, 0, f(u, 0)] : [0, u, f(0, u)]);
      const a = ctx.plot.drawableTube((u) => ctx.plot.w(...at(u)), 0, R, ctx.pal[freeze === 'y' ? 'road' : 'revision']);
      const b = ctx.plot.drawableTube((u) => ctx.plot.w(...at(u)), 0, -R, ctx.pal[freeze === 'y' ? 'road' : 'revision']);
      const wall = ctx.plot.gridSurface((s, t) => { const u = -R + 2 * R * s; const z = lerp(ctx.plot.zMin, ctx.plot.zMax, t); return freeze === 'y' ? [u, 0, z] : [0, u, z]; }, { n: 4, color: ctx.pal.water, opacity: 0.12, mesh: false });
      const m = ctx.plot.mover(ctx.pal.road);
      ctx.add(a.obj); ctx.add(b.obj); ctx.add(m.obj, true); ctx.add(wall, true);
      return { a, b, m, at, u: 0 };
    },
    update(p, s) {
      const ea = ease(Math.min(1, p * 2));
      const eb = ease(Math.max(0, p * 2 - 1));
      s.a.draw(ea); s.b.draw(eb);
      s.u = p < 0.5 ? R * ea : -R * eb;
      s.m.move(s.at(s.u), `${tr.other} = ${fmt(s.u, 2)}`);
    },
    live: (p, s) => `$${tr.other} = ${fmt(s.u, 2)}$ → $z = ${fmt(freeze === 'y' ? f(s.u, 0) : f(0, s.u), 3)}$`,
  });
  beats.push(sliceBeat('y', tY));
  beats.push(sliceBeat('x', tX));

  beats.push({
    title: 'Sweep the slices: the surface',
    duration: 6500,
    keep: true,
    text: 'Now slide the wall $x = k$ from one side to the other. Each position gives one curve; the curves stack into the surface.',
    enter(ctx) {
      const surf = ctx.plot.gridSurface((s2, t2) => { const x = -R + 2 * R * s2; const y = -R + 2 * R * t2; return [x, y, f(x, y)]; }, { colormap: ctx.colormap });
      const live = ctx.plot.liveLine(ctx.pal.road, 200);
      ctx.add(surf); ctx.add(live.obj);
      return { surf, live, k: -R };
    },
    update(p, s, ctx) {
      s.k = lerp(-R, R, ease(p));
      ctx.plot.clip(s.surf, 'x', s.k, true);
      const pts = [];
      for (let j = 0; j <= 120; j++) { const y = -R + (2 * R * j) / 120; pts.push([s.k, y, f(s.k, y)]); }
      s.live.set(pts);
      if (p >= 1) { ctx.plot.unclip(s.surf); s.live.set([]); }
    },
    live: (p, s) => `$x = ${fmt(s.k, 2)}$: the slice is $z = ${T(trace(c.expr, 'x', Number(fmt(s.k, 2))).expr || '0')}$`,
  });

  if (parts.length > 1) {
    parts.forEach((term, i) => {
      beats.push({
        title: `Piece ${i + 1} of ${parts.length}: $${T(term)}$`,
        duration: 3800,
        text: `On its own, $${T(term)}$ is ${describeTerm(term, ['x', 'y'])}.`,
        enter(ctx) {
          const g = ctx.plot.gridSurface((s, t) => { const x = -R + 2 * R * s; const y = -R + 2 * R * t; return [x, y, f2(term, P)(x, y)]; }, { n: 40, color: ctx.pal[TERM_COLORS[i % TERM_COLORS.length]], opacity: 0.5 });
          ctx.add(g);
          return {};
        },
        update() {},
      });
    });
    beats.push({
      title: 'Add them up',
      duration: 3200,
      text: `The surface is the sum ${parts.map((t) => `$${T(t)}$`).join(' + ')}: at each $(x, y)$, add the pieces' heights.`,
      enter: () => ({}),
      update() {},
    });
  }

  beats.push({
    title: 'Level curves: the topographic map',
    duration: 7000,
    keep: true,
    text: `Slice horizontally at height $k$ instead: $${tex} = k$. Drop each slice to the floor and you get a contour map, like the one behind this page. Close lines mean steep.`,
    enter(ctx) {
      const plane = ctx.plot.gridSurface((s, t) => [-R + 2 * R * s, -R + 2 * R * t, 0], { n: 2, color: ctx.pal.water, opacity: 0.16, mesh: false });
      const onSurf = ctx.plot.liveSegments(ctx.pal.road, 3000);
      const floor = ctx.plot.liveSegments(ctx.pal.contour, 30000);
      ctx.add(plane); ctx.add(onSurf.obj); ctx.add(floor.obj);
      return { plane, onSurf, floor, acc: [], last: -1, k: ctx.plot.zMin, levels: 10 };
    },
    update(p, s, ctx) {
      const lo = ctx.plot.zMin; const hi = ctx.plot.zMax;
      s.k = lerp(lo, hi, p);
      s.plane.position.z = ctx.plot.w(0, 0, s.k).z;
      const segs = zeroSet2d((x, y) => f(x, y) - s.k, R, 70);
      s.onSurf.set(segs.map(([a, b]) => [[a[0], a[1], s.k], [b[0], b[1], s.k]]));
      const idx = Math.floor(p * s.levels);
      if (idx > s.last && idx < s.levels) {
        s.last = idx;
        for (const [a, b] of segs) s.acc.push([[a[0], a[1], lo], [b[0], b[1], lo]]);
        s.floor.set(s.acc);
      }
      if (p >= 1) { s.onSurf.set([]); s.plane.visible = false; }
    },
    live: (p, s) => `Height $k = ${fmt(s.k, 2)}$`,
  });

  if (fx && fy && P0) {
    const [x0, y0] = P0;
    const z0 = f(x0, y0);
    const a = fx(x0, y0);
    const b = fy(x0, y0);
    beats.push({
      title: 'Partial derivatives: slope in x, slope in y',
      duration: 5200,
      text: `At $P = (${fmt(x0, 2)}, ${fmt(y0, 2)})$: walking in the $x$ direction (red) the slope is $f_x = ${T(pd.fx)} = ${fmt(a, 3)}$. Walking in the $y$ direction (purple) it is $f_y = ${T(pd.fy)} = ${fmt(b, 3)}$. Freeze the other variable, differentiate.`,
      enter(ctx) {
        const L1 = ctx.plot.liveLine(ctx.pal.road, 2);
        const L2 = ctx.plot.liveLine(ctx.pal.revision, 2);
        const m = ctx.plot.mover(ctx.pal.ink);
        m.move([x0, y0, z0], 'P');
        ctx.add(L1.obj); ctx.add(L2.obj); ctx.add(m.obj);
        return { L1, L2 };
      },
      update(p, s) {
        const h = 1.1 * ease(p);
        s.L1.set([[x0 - h, y0, z0 - a * h], [x0 + h, y0, z0 + a * h]]);
        s.L2.set([[x0, y0 - h, z0 - b * h], [x0, y0 + h, z0 + b * h]]);
      },
    });
    beats.push({
      title: 'The gradient points uphill',
      duration: 5600,
      text: `Put the two slopes in a vector: $\\nabla f = \\langle ${T(pd.fx)},\\ ${T(pd.fy)} \\rangle$. At $P$ it is $\\langle ${fmt(a, 3)}, ${fmt(b, 3)} \\rangle$, length $${fmt(Math.hypot(a, b), 3)}$ = the steepest slope. It is perpendicular to the level curve through $P$ (dashed).`,
      enter(ctx) {
        const arrows = [];
        const d = 8;
        let max = 0;
        const vec = [];
        for (let i = 0; i < d; i++) for (let j = 0; j < d; j++) {
          const x = -R + ((i + 0.5) * 2 * R) / d; const y = -R + ((j + 0.5) * 2 * R) / d;
          const gx = fx(x, y); const gy = fy(x, y);
          if (!Number.isFinite(gx) || !Number.isFinite(gy)) continue;
          const m = Math.hypot(gx, gy); max = Math.max(max, m); vec.push([x, y, gx, gy, m]);
        }
        for (const [x, y, gx, gy, m] of vec) {
          if (m < 1e-9) continue;
          const len = (0.35 + 0.5 * (m / max)) * ((2 * R) / d) * 0.85;
          const A = ctx.plot.liveArrow(ctx.pal.water, ctx.plot.R * 0.008);
          A.set([x, y, ctx.plot.zMin], [x + (gx / m) * len, y + (gy / m) * len, ctx.plot.zMin]);
          arrows.push(A); ctx.add(A.obj);
        }
        const big = ctx.plot.liveArrow(ctx.pal.road, ctx.plot.R * 0.02);
        ctx.add(big.obj);
        const level = ctx.plot.liveSegments(ctx.pal.water, 3000);
        const segs = zeroSet2d((x, y) => f(x, y) - z0, R, 80);
        level.set(segs.map(([p1, p2]) => [[p1[0], p1[1], ctx.plot.zMin], [p2[0], p2[1], ctx.plot.zMin]]));
        ctx.add(level.obj);
        return { big };
      },
      update(p, s, ctx) {
        const m = Math.hypot(a, b) || 1;
        const len = 1.2 * ease(p);
        s.big.set([x0, y0, ctx.plot.zMin], [x0 + (a / m) * len, y0 + (b / m) * len, ctx.plot.zMin]);
      },
    });
  }

  if (crit.length) {
    beats.push({
      title: 'Critical points and the D test',
      duration: 5200,
      text: `Where $\\nabla f = \\vec 0$ the surface is flat. Classify with $D = f_{xx}f_{yy} - f_{xy}^2$:\n\n${crit.slice(0, 5).map((q) => `- $(${fmt(q.x, 3)}, ${fmt(q.y, 3)})$: $D = ${fmt(q.D, 3)}$, $f_{xx} = ${fmt(q.fxx, 3)}$ → **${q.kind}**, $z = ${fmt(q.z, 3)}$`).join('\n')}`,
      enter(ctx) {
        for (const q of crit.slice(0, 6)) {
          const m = ctx.plot.mover(q.kind.includes('min') ? ctx.pal.water : q.kind.includes('max') ? ctx.pal.road : ctx.pal.revision);
          m.move([q.x, q.y, q.z], q.kind.replace('local ', ''));
          ctx.add(m.obj);
        }
        return {};
      },
      update() {},
    });
  }

  for (const name of Object.keys(P)) {
    beats.push(paramSurfaceBeat(name, P, c.expr, R));
  }
  return { beats, view: { range: R }, ghost: c.expr };
}

function pickPoint(f, fx, fy, R) {
  for (const [x, y] of [[1, 0.5], [0.8, -0.6], [-1, 1], [1.5, 1], [0.5, 0.5]]) {
    if ([f(x, y), fx?.(x, y), fy?.(x, y)].every(Number.isFinite) && Math.abs(x) < R && Math.abs(y) < R) return [x, y];
  }
  return null;
}

function paramBeat(name, P, pointsFor, label) {
  const base = P[name];
  return {
    title: `What does ${name} do?`,
    duration: 6500,
    text: `Watch ${label} as $${name}$ changes. Compare the red curve with the blue one (your current $${name} = ${fmt(base, 2)}$).`,
    enter(ctx) {
      const L = ctx.plot.liveLine(ctx.pal.road, 260);
      ctx.add(L.obj);
      return { L, v: base };
    },
    update(p, s, ctx) {
      const v = base + 1.5 * Math.sin(p * Math.PI * 2);
      s.v = v;
      s.L.set(pointsFor(ctx, { ...P, [name]: v }));
    },
    live: (p, s) => `$${name} = ${fmt(s.v, 2)}$`,
  };
}

function paramSurfaceBeat(name, P, expr, R) {
  const base = P[name];
  return {
    title: `What does ${name} do?`,
    duration: 6500,
    text: `The red mesh is the surface with $${name}$ sweeping around your value $${fmt(base, 2)}$. Watch what stretches, flips or shifts.`,
    enter(ctx) {
      const lines = Array.from({ length: 13 }, () => ctx.plot.liveLine(ctx.pal.road, 100, 0.85));
      lines.forEach((l) => ctx.add(l.obj));
      return { lines, v: base };
    },
    update(p, s) {
      s.v = base + 1.5 * Math.sin(p * Math.PI * 2);
      const g = f2(expr, { ...P, [name]: s.v });
      s.lines.forEach((L, i) => {
        const k = -R + (2 * R * i) / 12;
        const pts = [];
        for (let j = 0; j <= 80; j++) { const y = -R + (2 * R * j) / 80; pts.push([k, y, g(k, y)]); }
        L.set(pts);
      });
    },
    live: (p, s) => `$${name} = ${fmt(s.v, 2)}$`,
  };
}

// ---------------------------------------------------------------- r(t)

function curveBeats(c, P) {
  const trig = /sin|cos|tan/.test(`${c.x}${c.y}${c.z}`);
  const t0 = 0;
  const t1 = trig ? (/\bt\b/.test(c.z) && c.z !== '0' ? 4 * Math.PI : 2 * Math.PI) : 2;
  const X = ft(c.x, P); const Y = ft(c.y, P); const Z = ft(c.z, P);
  const st = curveStats(c, t0, t1);
  const pos = (t) => [X(t), Y(t), Z(t)];
  let R = 0;
  for (let i = 0; i <= 60; i++) { const q = pos(t0 + ((t1 - t0) * i) / 60); R = Math.max(R, Math.abs(q[0]), Math.abs(q[1])); }
  R = Math.max(1.5, Math.ceil(R * 1.15 * 2) / 2);
  const beats = [];
  const vtex = `\\langle ${T(c.x)},\\ ${T(c.y)}${c.dim === 3 ? `,\\ ${T(c.z)}` : ''} \\rangle`;

  beats.push({
    title: 'Three clocks running at once',
    duration: 5200,
    keep: true,
    text: `$\\vec r(t) = ${vtex}$. Think of $t$ as time. Each component is its own Calc 1 function of $t$; together they are a position. First, ignore $z$ and look at the floor: $x(t)$ and $y(t)$ trace the shadow.`,
    enter(ctx) {
      const shadow = ctx.plot.drawableTube((t) => ctx.plot.w(X(t), Y(t), ctx.plot.zMin), t0, t1, ctx.pal.contour, ctx.plot.R * 0.008);
      ctx.add(shadow.obj);
      return { shadow };
    },
    update(p, s) { s.shadow.draw(ease(p)); },
  });

  beats.push({
    title: 'Now let z climb: the path in space',
    duration: 6500,
    keep: true,
    text: `Add $z(t) = ${T(c.z)}$ and the dot leaves the floor. The red tube is every place the dot has been from $t = ${fmt(t0, 2)}$ to $t = ${fmt(t1, 2)}$.`,
    enter(ctx) {
      const tube = ctx.plot.drawableTube((t) => ctx.plot.w(...pos(t)), t0, t1, ctx.pal.road);
      const m = ctx.plot.mover(ctx.pal.ink);
      const drop = ctx.plot.liveLine(ctx.pal.ink, 2, 0.4);
      ctx.add(tube.obj); ctx.add(m.obj, true); ctx.add(drop.obj, true);
      return { tube, m, drop, t: t0 };
    },
    update(p, s, ctx) {
      const e = ease(p);
      s.t = lerp(t0, t1, e);
      s.tube.draw(e);
      const q = pos(s.t);
      s.m.move(q, `t = ${fmt(s.t, 2)}`);
      s.drop.set([q, [q[0], q[1], ctx.plot.zMin]]);
    },
    live: (p, s) => `$\\vec r(${fmt(s.t, 2)}) = \\langle ${pos(s.t).map((v) => fmt(v, 2)).join(', ')} \\rangle$`,
  });

  beats.push({
    title: 'Velocity and acceleration ride along',
    duration: 8000,
    text: `Differentiate each component: $\\vec v = \\vec r^{\\,\\prime} =\\langle ${st.velocity.map(T).join(',\\ ')} \\rangle$ (blue, tangent to the path) and $\\vec a = \\langle ${st.acceleration.map(T).join(',\\ ')} \\rangle$ (purple, pointing where the path bends).`,
    enter(ctx) {
      const m = ctx.plot.mover(ctx.pal.ink);
      const v = ctx.plot.liveArrow(ctx.pal.water);
      const a = ctx.plot.liveArrow(ctx.pal.revision);
      ctx.add(m.obj); ctx.add(v.obj); ctx.add(a.obj);
      return { m, v, a, t: t0 };
    },
    update(p, s) {
      s.t = lerp(t0, t1, p);
      const q = pos(s.t);
      const v = st.vel(s.t);
      const a = st.acc(s.t);
      const k = 0.6;
      s.m.move(q, '');
      s.v.set(q, q.map((x, i) => x + v[i] * k));
      s.a.set(q, q.map((x, i) => x + a[i] * k * 0.6));
    },
    live: (p, s) => `$t = ${fmt(s.t, 2)}$: speed $|\\vec v| = ${fmt(st.speed(s.t), 3)}$, curvature $\\kappa = ${fmt(st.curvature(s.t), 3)}$`,
  });

  beats.push({
    title: 'How far did it go?',
    duration: 4200,
    text: `Arc length adds up speed over time: $L = \\int_{${fmt(t0, 2)}}^{${fmt(t1, 3)}} |\\vec r^{\\,\\prime}(t)|\\,dt \\approx ${fmt(st.length, 4)}$. Curvature $\\kappa = \\dfrac{|\\vec v \\times \\vec a|}{|\\vec v|^3}$ measures how sharply it turns (a circle of radius $\\rho$ has $\\kappa = 1/\\rho$).`,
    enter: () => ({}),
    update() {},
  });
  return { beats, view: { range: R }, layers: [{ kind: 'curve', x: c.x, y: c.y, z: c.z, t: [t0, t1] }] };
}

// ---------------------------------------------------------------- vector fields

function fieldBeats(c, P) {
  const three = c.dim === 3;
  const R = 2.5;
  const Pf = f3(c.P, P); const Qf = f3(c.Q, P); const Rf = f3(c.R ?? '0', P);
  const F = (x, y, z) => [Pf(x, y, z), Qf(x, y, z), three ? Rf(x, y, z) : 0];
  const dc = divCurl(c.P, c.Q, c.R ?? '0');
  const vtex = `\\langle ${T(c.P)},\\ ${T(c.Q)}${three ? `,\\ ${T(c.R)}` : ''} \\rangle`;
  const beats = [];
  const z0 = 0;

  beats.push({
    title: 'An arrow at every point',
    duration: 5200,
    text: `$\\vec F = ${vtex}$ assigns an arrow to each point. Plug in a point, get a vector. A few, one at a time:`,
    enter(ctx) {
      const pts = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1.5, 0.5]];
      return { pts, made: 0, last: null };
    },
    update(p, s, ctx) {
      const want = Math.min(s.pts.length, Math.floor(p * 1.2 * s.pts.length));
      while (s.made < want) {
        const [x, y] = s.pts[s.made++];
        const v = F(x, y, z0);
        const A = ctx.plot.liveArrow(ctx.pal.road);
        const m = Math.hypot(...v) || 1;
        const len = Math.min(1, m) / m;
        A.set([x, y, z0], [x + v[0] * len * 0.9, y + v[1] * len * 0.9, z0 + v[2] * len * 0.9]);
        ctx.add(A.obj);
        const lab = ctx.plot.mover(ctx.pal.road);
        lab.move([x, y, z0], `⟨${v.slice(0, three ? 3 : 2).map((q) => fmt(q, 1)).join(', ')}⟩`);
        lab.obj.children[0].visible = false;
        ctx.add(lab.obj);
        s.last = [x, y, v];
      }
    },
    live: (p, s) => (s.last ? `$\\vec F(${s.last[0]}, ${s.last[1]}) = \\langle ${s.last[2].slice(0, three ? 3 : 2).map((q) => fmt(q, 2)).join(', ')} \\rangle$` : ''),
  });

  beats.push({
    title: 'The whole field',
    duration: 3800,
    keep: true,
    text: 'Fill in every grid point. Arrow length shows strength (scaled down so they do not overlap); darker blue is stronger.',
    enter(ctx) {
      const d = three ? 5 : 11;
      const zs = three ? [-1.5, -0.5, 0.5, 1.5] : [z0];
      const items = [];
      let max = 0;
      for (const z of zs) for (let i = 0; i < d; i++) for (let j = 0; j < d; j++) {
        const x = -R + ((i + 0.5) * 2 * R) / d; const y = -R + ((j + 0.5) * 2 * R) / d;
        const v = F(x, y, z);
        if (!v.every(Number.isFinite)) continue;
        const m = Math.hypot(...v); max = Math.max(max, m); items.push([x, y, z, v, m]);
      }
      const cell = (2 * R) / d;
      for (const [x, y, z, v, m] of items) {
        if (m < 1e-9) continue;
        const len = (0.35 + 0.55 * (m / max)) * cell * 0.85;
        const A = ctx.plot.liveArrow(m / max > 0.6 ? ctx.pal.water : ctx.pal.contour, ctx.plot.R * 0.009);
        A.set([x, y, z], [x + (v[0] / m) * len, y + (v[1] / m) * len, z + (v[2] / m) * len]);
        ctx.add(A.obj);
      }
      return {};
    },
    update() {},
  });

  beats.push({
    title: 'Drop in some dust: flow lines',
    duration: 8000,
    text: 'Release particles and let the field push them: at each instant a particle moves in the direction of the arrow under it. Their trails are flow lines.',
    enter(ctx) {
      const parts = [];
      for (let i = 0; i < 14; i++) {
        const a = (i / 14) * Math.PI * 2;
        const r0 = 0.6 + (i % 3) * 0.6;
        const p0 = [r0 * Math.cos(a), r0 * Math.sin(a), three ? ((i % 5) - 2) * 0.4 : z0];
        const L = ctx.plot.liveLine(ctx.pal.road, 400, 0.9);
        const m = ctx.plot.mover(ctx.pal.road);
        m.obj.scale.setScalar(0.6);
        ctx.add(L.obj); ctx.add(m.obj);
        parts.push({ p: p0, trail: [p0], L, m });
      }
      return { parts, lastP: 0 };
    },
    update(p, s) {
      const steps = Math.max(0, Math.floor((p - s.lastP) * 300));
      s.lastP += steps / 300;
      for (const q of s.parts) {
        for (let k = 0; k < steps; k++) {
          const v1 = F(...q.p);
          const mid = q.p.map((x, i) => x + v1[i] * 0.01);
          const v2 = F(...mid);
          const n = q.p.map((x, i) => x + v2[i] * 0.02);
          if (!n.every(Number.isFinite) || Math.abs(n[0]) > R * 1.3 || Math.abs(n[1]) > R * 1.3) break;
          q.p = n;
          if (q.trail.length < 399) q.trail.push(n);
        }
        q.L.set(q.trail);
        q.m.move(q.p, '');
      }
    },
  });

  const divAt = fn(dc.div, ['x', 'y', 'z']);
  beats.push({
    title: 'Divergence: is stuff spreading out?',
    duration: 5000,
    text: `$\\operatorname{div}\\vec F = P_x + Q_y${three ? ' + R_z' : ''} = ${T(dc.div)}$. Positive means more flows out of a tiny box than in (a source); negative means a sink; zero means what goes in comes out.${dc.div === '0' ? ' Here it is **0 everywhere**: no sources, no sinks.' : ''}`,
    enter(ctx) {
      for (const [x, y] of [[1, 1], [-1, -1], [1.5, -0.5]]) {
        const v = divAt(x, y, z0);
        const m = ctx.plot.mover(v > 0 ? ctx.pal.road : v < 0 ? ctx.pal.water : ctx.pal.ink);
        m.move([x, y, z0], `div = ${fmt(v, 2)}`);
        ctx.add(m.obj);
      }
      return {};
    },
    update() {},
  });

  const curlZ = fn(dc.curl[2], ['x', 'y', 'z']);
  beats.push({
    title: 'Curl: does it spin a paddle wheel?',
    duration: 6500,
    text: `$\\operatorname{curl}\\vec F = \\langle ${dc.curl.map(T).join(',\\ ')} \\rangle$. Drop a tiny paddle wheel in the flow: it spins counterclockwise at a rate set by the $z$-part, $Q_x - P_y = ${T(dc.curl[2])}$.${dc.conservative ? ' The curl is **zero**, so the field is **conservative**: it is the gradient of some potential $\\varphi$, and line integrals only depend on the endpoints.' : ' The curl is not zero, so the field is **not conservative**.'}`,
    enter(ctx) {
      const wheels = [[1, 0.6], [-1, -0.8], [0.2, 1.4]].map(([x, y]) => {
        const L = ctx.plot.liveSegments(ctx.pal.revision, 4);
        ctx.add(L.obj);
        return { x, y, L, a: 0 };
      });
      return { wheels, last: 0 };
    },
    update(p, s) {
      const dt = p - s.last;
      s.last = p;
      for (const w of s.wheels) {
        w.a += curlZ(w.x, w.y, z0) * 0.5 * dt * 12;
        const r = 0.32;
        const segs = [0, Math.PI / 2].map((b) => [[w.x + r * Math.cos(w.a + b), w.y + r * Math.sin(w.a + b), z0], [w.x - r * Math.cos(w.a + b), w.y - r * Math.sin(w.a + b), z0]]);
        w.L.set(segs);
      }
    },
  });
  return { beats, view: { range: R, z: three ? [-R, R] : [-1, 1] }, camera: three ? null : [0.01, -4.5, 7] };
}

// ---------------------------------------------------------------- implicit F(x,y,z) = c

function implicitBeats(c, P) {
  const R = 3;
  const F = f3(c.F, P);
  const q = Object.keys(P).length ? null : classifyQuadric(c.F);
  const beats = [];
  const name = q?.name;
  const eqTex = c.levelSet ? `${T(c.F)} = 0` : `${T(c.lhs)} = ${T(c.rhs)}`;
  beats.push({
    title: 'Which points satisfy it?',
    duration: 3800,
    text: `$${eqTex}$ is a test a point $(x, y, z)$ passes or fails. The surface is every point that passes.${name ? ` This one is a **${name}**${q.axis ? ` (along the $${q.axis}$-axis)` : ''}.` : ''} We will find its shape with **traces**: slice it with planes and look at the curves.`,
    enter: () => ({}),
    update() {},
  });

  const traceBeat = (axis) => ({
    title: `Traces ${axis} = k`,
    duration: 6500,
    keep: true,
    text: `Slide the plane $${axis} = k$ through the surface. Each slice is a 2D curve: ${axis === 'z' ? 'these are what you would see looking straight down' : 'these are side views'}. A few slices are kept as you go.`,
    enter(ctx) {
      const plane = ctx.plot.gridSurface((s, t) => {
        const a = -R + 2 * R * s; const b = -R + 2 * R * t;
        return axis === 'z' ? [a, b, 0] : axis === 'x' ? [0, a, lerp(ctx.plot.zMin, ctx.plot.zMax, t)] : [a, 0, lerp(ctx.plot.zMin, ctx.plot.zMax, t)];
      }, { n: 2, color: ctx.pal.water, opacity: 0.15, mesh: false });
      const live = ctx.plot.liveSegments(ctx.pal.road, 4000);
      const kept = ctx.plot.liveSegments(ctx.pal[axis === 'z' ? 'contour' : axis === 'x' ? 'revision' : 'wood'], 20000);
      ctx.add(plane); ctx.add(live.obj); ctx.add(kept.obj);
      return { plane, live, kept, acc: [], last: -1, k: 0 };
    },
    update(p, s, ctx) {
      const lo = axis === 'z' ? ctx.plot.zMin : -R;
      const hi = axis === 'z' ? ctx.plot.zMax : R;
      s.k = lerp(lo, hi, p);
      let segs;
      if (axis === 'z') {
        s.plane.position.z = ctx.plot.w(0, 0, s.k).z;
        segs = zeroSet2d((x, y) => F(x, y, s.k), R, 70).map(([a, b]) => [[a[0], a[1], s.k], [b[0], b[1], s.k]]);
      } else {
        const zl = ctx.plot.zMin; const zh = ctx.plot.zMax;
        const map = (u, v) => [u, lerp(zl, zh, (v + R) / (2 * R))];
        s.plane.position[axis] = s.k;
        segs = zeroSet2d((u, v) => { const [a, z] = map(u, v); return axis === 'x' ? F(s.k, a, z) : F(a, s.k, z); }, R, 70)
          .map(([a, b]) => [map(...a), map(...b)])
          .map(([[ua, za], [ub, zb]]) => (axis === 'x' ? [[s.k, ua, za], [s.k, ub, zb]] : [[ua, s.k, za], [ub, s.k, zb]]));
      }
      s.live.set(segs);
      const idx = Math.floor(p * 7);
      if (idx > s.last && idx < 7) { s.last = idx; s.acc.push(...segs); s.kept.set(s.acc); }
      if (p >= 1) { s.live.set([]); s.plane.visible = false; }
    },
    live: (p, s) => `$${axis} = ${fmt(s.k, 2)}$`,
  });
  beats.push(traceBeat('z'));
  beats.push(traceBeat('x'));
  beats.push(traceBeat('y'));

  beats.push({
    title: 'Stitch the traces together',
    duration: 4200,
    keep: true,
    text: name ? quadricBlurb(name) : 'Fill in between the traces and the surface appears.',
    enter(ctx) {
      const g = ctx.plot.implicitSurface(F, { colormap: ctx.colormap, opacity: 0.82 });
      ctx.add(g);
      ctx.plot.fadeIn(g, performance.now());
      return {};
    },
    update() {},
  });
  return { beats, view: { range: R, z: [-R, R] } };
}

export function quadricBlurb(name) {
  const rules = {
    sphere: 'All three squares have the same sign and coefficient: every trace is a circle. A **sphere**.',
    ellipsoid: 'All three squared terms positive (written as squares = 1): every trace is an ellipse. An **ellipsoid**.',
    'hyperboloid of one sheet': 'Written as squares = 1, there is **one** minus sign: one sheet, a connected cooling-tower shape. Horizontal traces are ellipses that never vanish.',
    'hyperboloid of two sheets': 'Written as squares = 1, there are **two** minus signs: two separate bowls. Near the middle the traces are empty.',
    cone: 'Squares only, and the right side is 0: a **cone**. Every trace through the apex is a pair of lines.',
    'elliptic paraboloid': 'One variable is not squared and the two squares have the same sign: a bowl, an **elliptic paraboloid**.',
    'hyperbolic paraboloid (saddle)': 'One variable is not squared and the squares have opposite signs: a **saddle** (hyperbolic paraboloid). Traces are parabolas one way, opening the other way, and hyperbolas across.',
    'circular cylinder': 'One variable is missing entirely, so the circle slides along that axis: a **cylinder**.',
    'elliptic cylinder': 'One variable is missing entirely, so the ellipse slides along that axis: an **elliptic cylinder**.',
    'hyperbolic cylinder': 'One variable is missing, so the hyperbola slides along that axis: a **hyperbolic cylinder**.',
    'parabolic cylinder': 'One variable is missing, so the parabola slides along that axis: a **parabolic cylinder**.',
  };
  return rules[name] ?? `This is a **${name}**.`;
}

// ---------------------------------------------------------------- parametric surface

function paramSurfaceBeats(c, P) {
  const X = fn(c.x, ['u', 'v', ...Object.keys(P)]);
  const Y = fn(c.y, ['u', 'v', ...Object.keys(P)]);
  const Z = fn(c.z, ['u', 'v', ...Object.keys(P)]);
  const vals = Object.values(P);
  const pos = (u, v) => [X(u, v, ...vals), Y(u, v, ...vals), Z(u, v, ...vals)];
  const trig = (s) => /sin|cos/.test(s);
  const vr = trig(`${c.x}${c.y}${c.z}`) ? [0, 2 * Math.PI] : [-2, 2];
  const ur = [0, 2];
  const beats = [];
  const gridBeat = (which) => ({
    title: which === 'u' ? 'Hold v fixed, vary u' : 'Hold u fixed, vary v',
    duration: 5200,
    keep: true,
    text: which === 'u'
      ? '$\\vec r(u, v)$ needs two dials. Freeze $v$ and turn $u$: you get a curve on the surface (red). Do it for several $v$ values.'
      : 'Now freeze $u$ and turn $v$ (purple). The two families of curves make a grid drawn on the surface.',
    enter(ctx) {
      const tubes = [];
      for (let i = 0; i <= 8; i++) {
        const k = i / 8;
        const T1 = which === 'u'
          ? ctx.plot.drawableTube((u) => ctx.plot.w(...pos(u, lerp(vr[0], vr[1], k))), ur[0], ur[1], ctx.pal.road, ctx.plot.R * 0.008)
          : ctx.plot.drawableTube((v) => ctx.plot.w(...pos(lerp(ur[0], ur[1], k), v)), vr[0], vr[1], ctx.pal.revision, ctx.plot.R * 0.008);
        ctx.add(T1.obj);
        tubes.push({ T1, d: i / 12 });
      }
      return { tubes };
    },
    update(p, s) { for (const t of s.tubes) t.T1.draw(ease((p - t.d) / 0.5)); },
  });
  beats.push(gridBeat('u'));
  beats.push(gridBeat('v'));
  beats.push({
    title: 'Fill it in, and find a normal',
    duration: 5000,
    keep: true,
    text: 'Fill in the grid and you have the surface. At any point, $\\vec r_u$ and $\\vec r_v$ are tangent to the grid lines; their cross product $\\vec r_u \\times \\vec r_v$ is normal to the surface, and its length is the area scale $dS = |\\vec r_u \\times \\vec r_v|\\,du\\,dv$.',
    enter(ctx) {
      const g = ctx.plot.buildLayer({ kind: 'paramSurface', x: c.x, y: c.y, z: c.z, u: ur, v: vr, colormap: ctx.colormap, opacity: 0.85 });
      ctx.add(g);
      ctx.plot.fadeIn(g, performance.now());
      const u0 = lerp(ur[0], ur[1], 0.6); const v0 = lerp(vr[0], vr[1], 0.3);
      const h = 1e-4;
      const p0 = pos(u0, v0);
      const ru = pos(u0 + h, v0).map((x, i) => (x - pos(u0 - h, v0)[i]) / (2 * h));
      const rv = pos(u0, v0 + h).map((x, i) => (x - pos(u0, v0 - h)[i]) / (2 * h));
      const n = [ru[1] * rv[2] - ru[2] * rv[1], ru[2] * rv[0] - ru[0] * rv[2], ru[0] * rv[1] - ru[1] * rv[0]];
      const nl = Math.hypot(...n) || 1;
      const A1 = ctx.plot.liveArrow(ctx.pal.road); A1.set(p0, p0.map((x, i) => x + ru[i] * 0.4));
      const A2 = ctx.plot.liveArrow(ctx.pal.revision); A2.set(p0, p0.map((x, i) => x + rv[i] * 0.4));
      const A3 = ctx.plot.liveArrow(ctx.pal.water); A3.set(p0, p0.map((x, i) => x + (n[i] / nl) * 0.9));
      ctx.add(A1.obj); ctx.add(A2.obj); ctx.add(A3.obj);
      return {};
    },
    update() {},
  });
  return { beats, view: { range: 2.5 } };
}

// ---------------------------------------------------------------- entry

export function buildTeach(c, params = {}) {
  const P = scope(params);
  switch (c.type) {
    case 'graph2d': return graph2dBeats(c, P);
    case 'surface': return surfaceBeats(c, P);
    case 'curve': return curveBeats(c, P);
    case 'field': return fieldBeats(c, P);
    case 'implicit': return implicitBeats(c, P);
    case 'paramSurface': return paramSurfaceBeats(c, P);
    default: return null;
  }
}
