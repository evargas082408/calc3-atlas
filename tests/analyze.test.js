import { describe, it, expect } from 'vitest';
import {
  classify, terms, describeTerm, symmetry1d, roots1d, criticalPoints1d, partials, criticalPoints2d, trace,
  divCurl, isZero, potentialAt, curveStats, classifyQuadric, eigSym3, splitTop,
} from '../src/teach/analyze.js';
import { fn, derivative, normalize, freeSymbols, simplify } from '../src/lib/expr.js';
import { zeroSet2d } from '../src/teach/beats.js';

const rand = (() => { let s = 12345; return () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648) * 2 - 1; })();

describe('classify', () => {
  const cases = [
    ['y = x^2', 'graph2d'], ['y = sin(x)', 'graph2d'], ['x^2', 'graph2d'], ['y=x^3-3x', 'graph2d'],
    ['z = x^2 - y^2', 'surface'], ['f(x,y) = x*y', 'surface'], ['x^2 + y^2', 'surface'], ['z = a*x^2 + y^2', 'surface'],
    ['<cos t, sin t, t/4>', 'curve'], ['r(t) = <t, t^2, t^3>', 'curve'], ['<cos(t), sin(t)>', 'curve'], ['(cos t, sin t, t)', 'curve'],
    ['F = <-y, x>', 'field'], ['<y*z, x*z, x*y>', 'field'], ['F(x,y,z) = <x, y, z>', 'field'],
    ['<u*cos(v), u*sin(v), u>', 'paramSurface'],
    ['x^2 + y^2 + z^2 = 4', 'implicit'], ['x^2 + y^2 = 4', 'implicit'], ['z^2 = x^2 + y^2', 'implicit'], ['x + y + z = 1', 'implicit'],
    ['x^2 + y^2 - z^2', 'implicit'],
    ['<1, 2, 3>', 'vector'], ['<3, 4>', 'vector'],
    ['', 'empty'], ['y = = 2', 'error'], ['<1>', 'error'], ['<1,2,3,4>', 'error'],
  ];
  for (const [input, type] of cases) {
    it(`${JSON.stringify(input)} is ${type}`, () => expect(classify(input).type).toBe(type));
  }
  it('finds free parameters but not constants or function names', () => {
    expect(classify('z = a*x^2 + b*y^2').params.sort()).toEqual(['a', 'b']);
    expect(classify('y = sin(x) + pi + e').params).toEqual([]);
    expect(classify('<cos(k*t), sin(t), t>').params).toEqual(['k']);
  });
  it('keeps component strings intact', () => {
    const c = classify('<cos(t), sin(t), t/4>');
    expect([c.x, c.y, c.z]).toEqual(['cos(t)', 'sin(t)', 't/4']);
    expect(c.dim).toBe(3);
    const v = classify('<3, 4>');
    expect(v.comps).toEqual([3, 4]);
  });
  it('splitTop respects nesting', () => {
    expect(splitTop('f(a,b), g(c), [1,2]')).toEqual(['f(a,b)', 'g(c)', '[1,2]']);
  });
});

describe('normalize and parsing', () => {
  it('accepts how people type math', () => {
    expect(fn('π', [])()).toBeCloseTo(Math.PI, 12);
    expect(fn('x²', ['x'])(3)).toBe(9);
    expect(fn('2x', ['x'])(4)).toBe(8);
    expect(fn('ln(x)', ['x'])(Math.E)).toBeCloseTo(1, 12);
    expect(fn('arctan(1)', [])()).toBeCloseTo(Math.PI / 4, 12);
    expect(fn('e^x', ['x'])(1)).toBeCloseTo(Math.E, 12);
    expect(fn('3−x', ['x'])(1)).toBe(2);
  });
  it('bad input evaluates to NaN instead of throwing', () => {
    expect(Number.isNaN(fn('x +* 2', ['x'])(1))).toBe(true);
    expect(Number.isNaN(fn('q', ['x'])(1))).toBe(true);
  });
  it('freeSymbols ignores the plotting variables', () => {
    expect(freeSymbols('a*x + b*y + sin(c)', ['x', 'y']).sort()).toEqual(['a', 'b', 'c']);
  });
});

describe('symbolic derivatives agree with finite differences', () => {
  const fns1 = ['x^2', 'x^3 - 3*x', 'sin(x)', 'cos(2*x)', 'exp(x)', 'log(x)', 'sqrt(x)', 'x*exp(-x^2)', 'atan(x)', '1/(1+x^2)', 'sin(x)^2', 'x^x'];
  for (const e of fns1) {
    it(`d/dx ${e}`, () => {
      const f = fn(e, ['x']);
      const d = fn(derivative(e, 'x'), ['x']);
      for (const x of [0.3, 0.7, 1.4, 2.1]) {
        const h = 1e-5;
        const num = (f(x + h) - f(x - h)) / (2 * h);
        expect(d(x)).toBeCloseTo(num, 5);
      }
    });
  }
  const fns2 = ['x^2*y + 3*x*y^4', 'sin(x*y)', 'exp(x)*cos(y)', 'x^4 + y^4 - 4*x*y + 1', 'sqrt(x^2 + y^2 + 1)', 'log(x^2 + y^2 + 1)', 'x*y/(1 + x^2)'];
  for (const e of fns2) {
    it(`partials of ${e}`, () => {
      const p = partials(e);
      const f = fn(e, ['x', 'y']);
      const [fx, fy, fxx, fyy, fxy] = [p.fx, p.fy, p.fxx, p.fyy, p.fxy].map((s) => fn(s, ['x', 'y']));
      for (let k = 0; k < 6; k++) {
        const x = rand() * 1.5; const y = rand() * 1.5; const h = 1e-4;
        expect(fx(x, y)).toBeCloseTo((f(x + h, y) - f(x - h, y)) / (2 * h), 5);
        expect(fy(x, y)).toBeCloseTo((f(x, y + h) - f(x, y - h)) / (2 * h), 5);
        expect(fxx(x, y)).toBeCloseTo((f(x + h, y) - 2 * f(x, y) + f(x - h, y)) / (h * h), 2);
        expect(fyy(x, y)).toBeCloseTo((f(x, y + h) - 2 * f(x, y) + f(x, y - h)) / (h * h), 2);
        expect(fxy(x, y)).toBeCloseTo((f(x + h, y + h) - f(x + h, y - h) - f(x - h, y + h) + f(x - h, y - h)) / (4 * h * h), 2);
      }
    });
  }
});

describe('one-variable analysis', () => {
  it('roots', () => {
    expect(roots1d('x^2 - 2')).toEqual([expect.closeTo(-Math.SQRT2, 8), expect.closeTo(Math.SQRT2, 8)]);
    const r = roots1d('sin(x)', -5, 5);
    expect(r).toHaveLength(3);
    [-Math.PI, 0, Math.PI].forEach((v, i) => expect(r[i]).toBeCloseTo(v, 8));
    expect(roots1d('1/x')).toEqual([]);
    expect(roots1d('x^2 + 1')).toEqual([]);
    expect(roots1d('tan(x)', -2, 2)).toEqual([expect.closeTo(0, 8)]);
  });
  it('critical points with second-derivative test', () => {
    const cp = criticalPoints1d('x^3 - 3*x');
    expect(cp.map((q) => [Math.round(q.x * 1e6) / 1e6, q.kind])).toEqual([[-1, 'max'], [1, 'min']]);
    expect(cp[0].y).toBeCloseTo(2, 10);
    expect(criticalPoints1d('x^2')[0]).toMatchObject({ x: 0, y: 0, kind: 'min' });
    // the Lesson 15 warm-up the notes got wrong: x^2(x-1)(x-2) has critical points 0 and (9 ± sqrt 17)/8
    const xs = criticalPoints1d('x^2*(x-1)*(x-2)').map((q) => q.x);
    expect(xs).toHaveLength(3);
    [0, (9 - Math.sqrt(17)) / 8, (9 + Math.sqrt(17)) / 8].forEach((v, i) => expect(xs[i]).toBeCloseTo(v, 7));
  });
  it('symmetry', () => {
    expect(symmetry1d('x^2')).toBe('even');
    expect(symmetry1d('cos(x)')).toBe('even');
    expect(symmetry1d('x^3')).toBe('odd');
    expect(symmetry1d('sin(x)')).toBe('odd');
    expect(symmetry1d('x^2 + x')).toBe('none');
    expect(symmetry1d('exp(x)')).toBe('none');
  });
  it('terms split at top-level + and - and sum back to the whole', () => {
    for (const e of ['x^2 - 3*y + 2', 'sin(x - y) + x', '-x^2 - y^2 + 4', 'x*(y+1) - 2', '3']) {
      const parts = terms(e);
      const whole = fn(e, ['x', 'y']);
      const sum = parts.map((t) => fn(t, ['x', 'y']));
      for (const [x, y] of [[0.4, 1.3], [-1.1, 0.2]]) expect(sum.reduce((s, g) => s + g(x, y), 0)).toBeCloseTo(whole(x, y), 10);
    }
    expect(terms('x^2 - 3*y + 2')).toHaveLength(3);
    expect(terms('sin(x - y) + x')).toHaveLength(2);
  });
  it('describes terms in plain language', () => {
    expect(describeTerm('x^2', ['x'])).toMatch(/parabola|square/i);
    expect(describeTerm('-3*y', ['x', 'y'])).toMatch(/flip/i);
    expect(describeTerm('5', ['x'])).toMatch(/constant|lift|shift/i);
  });
});

describe('critical points in two variables', () => {
  const kinds = (e, R = 3) => criticalPoints2d(e, R).map((q) => `${q.kind}@${q.x.toFixed(4)},${q.y.toFixed(4)}`).sort();
  it('bowl, dome, saddle', () => {
    expect(kinds('x^2 + y^2')).toEqual(['local min@0.0000,0.0000']);
    expect(kinds('4 - x^2 - y^2')).toEqual(['local max@0.0000,0.0000']);
    expect(kinds('x^2 - y^2')).toEqual(['saddle@0.0000,0.0000']);
    expect(kinds('x*y')).toEqual(['saddle@0.0000,0.0000']);
  });
  it('x^4 + y^4 - 4xy + 1: two minima and a saddle', () => {
    const cps = criticalPoints2d('x^4 + y^4 - 4*x*y + 1');
    expect(kinds('x^4 + y^4 - 4*x*y + 1')).toEqual(['local min@-1.0000,-1.0000', 'local min@1.0000,1.0000', 'saddle@0.0000,0.0000']);
    const m = cps.find((q) => q.x === 1);
    expect(m.D).toBeCloseTo(128, 6);
    expect(m.z).toBeCloseTo(-1, 10);
  });
  it('x^3 - 3x + y^2: min at (1,0), saddle at (-1,0)', () => {
    expect(kinds('x^3 - 3*x + y^2')).toEqual(['local min@1.0000,0.0000', 'saddle@-1.0000,0.0000']);
  });
  it('the D = 0 case is reported as inconclusive', () => {
    expect(kinds('x^4 + y^4')[0]).toMatch(/^inconclusive/);
  });
  it('a classic exam function: x^3 + y^3 - 3xy', () => {
    expect(kinds('x^3 + y^3 - 3*x*y')).toEqual(['local min@1.0000,1.0000', 'saddle@0.0000,0.0000']);
  });
  it('every reported point really has zero gradient', () => {
    for (const e of ['sin(x)*cos(y)', 'x*exp(-x^2 - y^2)', '(x^2 - 1)*(y^2 - 1)']) {
      const p = partials(e);
      const fx = fn(p.fx, ['x', 'y']); const fy = fn(p.fy, ['x', 'y']);
      for (const q of criticalPoints2d(e)) expect(Math.hypot(fx(q.x, q.y), fy(q.x, q.y))).toBeLessThan(1e-7);
    }
  });
  it('traces freeze a variable', () => {
    const t = trace('x^2 - y^2', 'y', 0);
    expect(t.other).toBe('x');
    expect(fn(t.expr, ['x'])(3)).toBeCloseTo(9, 12);
    const t2 = trace('x^2 - y^2', 'x', 0);
    expect(fn(t2.expr, ['y'])(2)).toBeCloseTo(-4, 12);
  });
});

describe('vector fields', () => {
  it('known div and curl', () => {
    const a = divCurl('x', 'y', 'z');
    expect(fn(a.div, ['x', 'y', 'z'])(1, 2, 3)).toBe(3);
    const b = divCurl('-y', 'x', '0');
    expect(b.curl.map((c) => fn(c, ['x', 'y', 'z'])(0.3, 0.4, 0.5))).toEqual([0, 0, 2]);
    expect(b.conservative).toBe(false);
    const c = divCurl('2*x*y + z', 'x^2 + z^2', 'x + 2*y*z');
    expect(fn(c.div, ['x', 'y', 'z'])(0.7, 1.3, -0.2)).toBeCloseTo(4 * 1.3, 10);
    expect(c.conservative).toBe(true);
    // the FTLI field from Lesson 28
    expect(divCurl('2*x*y - y*z', 'x^2 - x*z', '-x*y').conservative).toBe(true);
  });
  it('curl(grad f) = 0 and div(curl F) = 0 for random fields', () => {
    const phis = ['x^2*y*z', 'sin(x*y) + z^3', 'exp(x)*cos(y)*z'];
    for (const phi of phis) {
      const g = ['x', 'y', 'z'].map((v) => derivative(phi, v));
      const r = divCurl(...g);
      expect(r.conservative).toBe(true);
    }
    const fields = [['y*z^2', 'x^3', 'sin(x*y)'], ['exp(z)', 'x*y*z', 'y^2']];
    for (const F of fields) {
      const { curl } = divCurl(...F);
      expect(isZero(divCurl(...curl).div, ['x', 'y', 'z'])).toBe(true);
    }
  });
  it('potentialAt recovers a potential for a conservative field', () => {
    const phi = potentialAt('2*x*y', 'x^2', '0');
    // phi = x^2 y, so phi(2,3,0) - phi(0,0,0) = 12
    expect(phi(2, 3, 0)).toBeCloseTo(12, 6);
  });
});

describe('curves', () => {
  it('helix arc length and constant speed', () => {
    const st = curveStats({ x: 'cos(t)', y: 'sin(t)', z: 't/4' }, 0, 4 * Math.PI);
    expect(st.length).toBeCloseTo(Math.PI * Math.sqrt(17), 6);
    expect(st.speed(1.1)).toBeCloseTo(Math.sqrt(17) / 4, 10);
  });
  it('curvature of a circle is 1/r, of a line is 0', () => {
    const c = curveStats({ x: '3*cos(t)', y: '3*sin(t)', z: '0' }, 0, 2 * Math.PI);
    expect(c.curvature(0.7)).toBeCloseTo(1 / 3, 10);
    expect(c.length).toBeCloseTo(6 * Math.PI, 8);
    expect(curveStats({ x: 't', y: '2*t', z: '1-t' }, 0, 1).curvature(0.4)).toBeCloseTo(0, 10);
  });
  it('twisted cubic curvature at t = 0 is 2; Lesson 8 curve <3, -4t, 5t^2> has kappa(0) = 5/8', () => {
    expect(curveStats({ x: 't', y: 't^2', z: 't^3' }, 0, 1).curvature(0)).toBeCloseTo(2, 10);
    expect(curveStats({ x: '3', y: '-4*t', z: '5*t^2' }, 0, 1).curvature(0)).toBeCloseTo(10 / 16, 10);
  });
  it('symbolic velocity and acceleration', () => {
    const st = curveStats({ x: 't^2', y: 'sin(t)', z: 'exp(2*t)' }, 0, 1);
    const v = st.velocity.map((s) => fn(s, ['t'])(0.5));
    expect(v[0]).toBeCloseTo(1, 12);
    expect(v[1]).toBeCloseTo(Math.cos(0.5), 12);
    expect(v[2]).toBeCloseTo(2 * Math.exp(1), 12);
    const a = st.acceleration.map((s) => fn(s, ['t'])(0.5));
    expect(a[2]).toBeCloseTo(4 * Math.exp(1), 10);
  });
});

describe('quadric surfaces', () => {
  const name = (F) => classifyQuadric(F)?.name;
  const cases = [
    ['x^2 + y^2 + z^2 - 4', 'sphere'],
    ['(x-1)^2 + (y+2)^2 + z^2 - 9', 'sphere'],
    ['x^2 + y^2 + z^2 - 2*x - 3', 'sphere'],
    ['x^2/4 + y^2/9 + z^2 - 1', 'ellipsoid'],
    ['x^2 + y^2 - z^2 - 1', 'hyperboloid of one sheet'],
    ['z^2 - x^2 - y^2 - 1', 'hyperboloid of two sheets'],
    ['-x^2 + y^2 + z^2 - 1', 'hyperboloid of one sheet'],
    ['x^2 - y^2 - z^2 - 1', 'hyperboloid of two sheets'],
    ['z^2 - x^2 - y^2', 'cone'],
    ['x^2 + y^2 - 4*z^2', 'cone'],
    ['z - x^2 - y^2', 'elliptic paraboloid'],
    ['z - x^2 - 4*y^2', 'elliptic paraboloid'],
    ['x - y^2 - z^2', 'elliptic paraboloid'],
    ['z - x^2 + y^2', 'hyperbolic paraboloid (saddle)'],
    ['z - x*y', 'hyperbolic paraboloid (saddle)'],
    ['x^2 + y^2 - 4', 'circular cylinder'],
    ['x^2 + 4*y^2 - 4', 'elliptic cylinder'],
    ['x^2 - y^2 - 1', 'hyperbolic cylinder'],
    ['x*y - 1', 'hyperbolic cylinder'],
    ['y - x^2', 'parabolic cylinder'],
    ['x + y + z - 1', 'plane'],
    ['x^2 + y^2 + z^2 + 1', 'empty (no real points)'],
  ];
  for (const [F, n] of cases) it(`${F} = 0 is a ${n}`, () => expect(name(F)).toBe(n));
  it('axes', () => {
    expect(classifyQuadric('z^2 - x^2 - y^2').axis).toBe('z');
    expect(classifyQuadric('x^2 - y^2 - z^2').axis).toBe('x');
    expect(classifyQuadric('y^2 - x^2 - z^2 - 1').axis).toBe('y');
    expect(classifyQuadric('x^2 + z^2 - y^2 - 1').axis).toBe('y');
    expect(classifyQuadric('x^2 + y^2 - 4').axis).toBe('z');
  });
  it('a cubic is not a quadric', () => expect(classifyQuadric('x^3 + y^2 - z')).toBeNull());
  it('Jacobi eigenvalues of a symmetric matrix', () => {
    const { values, vectors } = eigSym3([[2, 1, 0], [1, 2, 0], [0, 0, 5]]);
    expect([...values].sort((a, b) => a - b)).toEqual([expect.closeTo(1, 10), expect.closeTo(3, 10), expect.closeTo(5, 10)]);
    for (const v of vectors) expect(Math.hypot(...v)).toBeCloseTo(1, 10);
  });
});

describe('marching squares zero set', () => {
  it('unit circle segments lie on the circle', () => {
    const segs = zeroSet2d((x, y) => x * x + y * y - 1, 2, 90);
    expect(segs.length).toBeGreaterThan(100);
    for (const [a, b] of segs) for (const p of [a, b]) expect(Math.abs(Math.hypot(p[0], p[1]) - 1)).toBeLessThan(0.01);
  });
  it('a hyperbola has two branches and no false segments', () => {
    const segs = zeroSet2d((x, y) => x * x - y * y - 1, 3, 90);
    for (const [a] of segs) expect(Math.abs(a[0] * a[0] - a[1] * a[1] - 1)).toBeLessThan(0.08);
    expect(segs.some(([a]) => a[0] > 0)).toBe(true);
    expect(segs.some(([a]) => a[0] < 0)).toBe(true);
  });
  it('simplify keeps meaning', () => {
    expect(fn(simplify('x + x + 0*y'), ['x', 'y'])(2, 7)).toBe(4);
    expect(normalize(' ln(x) ')).toBe('log(x)');
  });
});
