// Pure analysis of whatever the student types. No DOM, no three.js: everything here is unit tested.
import { math, normalize, fn, derivative, simplify, toTex, freeSymbols } from '../lib/expr.js';

// ---------- parsing the input ----------

// Split on a separator at parenthesis depth 0.
export function splitTop(s, sep = ',') {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const ch of s) {
    if ('([{'.includes(ch)) depth++;
    if (')]}'.includes(ch)) depth--;
    if (ch === sep && depth === 0) {
      out.push(cur.trim());
      cur = '';
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

const VEC_RE = /^\s*(?:<|⟨|\\langle)\s*([\s\S]*?)\s*(?:>|⟩|\\rangle)\s*$/;

function symbolsOf(expr) {
  try {
    const node = math.parse(normalize(expr));
    const s = new Set();
    node.traverse((n, path, parent) => {
      if (n.isSymbolNode && !(parent && parent.isFunctionNode && parent.fn === n)) s.add(n.name);
    });
    return s;
  } catch {
    return null;
  }
}

export function validate(expr, vars) {
  try {
    math.parse(normalize(expr));
  } catch (e) {
    return `Can't read "${expr}": ${String(e.message).replace(/\(char \d+\)/, '').trim()}`;
  }
  const f = fn(expr, vars);
  const probe = vars.map((_, i) => 0.37 + 0.21 * i);
  const v = f(...probe);
  if (typeof v !== 'number') return 'That expression does not give a number.';
  return null;
}

// Returns { type, ...fields, params } or { type: 'error', message }.
export function classify(raw) {
  let s = String(raw ?? '').trim();
  if (!s) return { type: 'empty' };
  s = s.replace(/\s+/g, ' ');

  // strip a name on the left: f(x,y) =, r(t) =, F(x,y,z) =, F =, r =
  let lhs = null;
  const named = s.match(/^([A-Za-z]\w*)\s*(\([^)]*\))?\s*=\s*([\s\S]+)$/);
  if (named && !/^[xyz]$/.test(named[1])) {
    lhs = named[1] + (named[2] ?? '');
    s = named[3].trim();
  }

  const vec = s.match(VEC_RE) || (s.startsWith('(') && s.endsWith(')') && splitTop(s.slice(1, -1)).length >= 2 ? [s, s.slice(1, -1)] : null);
  if (vec) {
    const comps = splitTop(vec[1]);
    if (comps.length < 2 || comps.length > 3) return { type: 'error', message: 'Vectors need 2 or 3 components, like <cos t, sin t, t>.' };
    const syms = new Set();
    for (const c of comps) {
      const cs = symbolsOf(c);
      if (!cs) return { type: 'error', message: `Can't read the component "${c}".` };
      cs.forEach((x) => syms.add(x));
    }
    const params = (vars) => [...new Set(comps.flatMap((c) => freeSymbols(c, vars)))];
    if (syms.has('u') || syms.has('v')) {
      if (comps.length !== 3) return { type: 'error', message: 'A parametric surface needs 3 components in u and v.' };
      return { type: 'paramSurface', x: comps[0], y: comps[1], z: comps[2], params: params(['u', 'v']) };
    }
    if (syms.has('t')) {
      return { type: 'curve', x: comps[0], y: comps[1], z: comps[2] ?? '0', dim: comps.length, params: params(['t']) };
    }
    if (syms.has('x') || syms.has('y') || syms.has('z')) {
      return { type: 'field', P: comps[0], Q: comps[1], R: comps[2] ?? '0', dim: comps.length, params: params(['x', 'y', 'z']) };
    }
    return { type: 'vector', comps: comps.map((c) => fn(c, [])()), raw: comps };
  }

  const eq = splitTop(s, '=');
  if (eq.length > 2) return { type: 'error', message: 'Use at most one equals sign.' };
  if (eq.length === 2) {
    const [L, Rr] = eq;
    if (/^y$/.test(L) && !symbolsOf(Rr)?.has('y') && !symbolsOf(Rr)?.has('z')) {
      return withParams({ type: 'graph2d', expr: Rr }, Rr, ['x']);
    }
    if (/^z$/.test(L) && !symbolsOf(Rr)?.has('z')) {
      return withParams({ type: 'surface', expr: Rr }, Rr, ['x', 'y']);
    }
    const F = `(${L}) - (${Rr})`;
    const syms = symbolsOf(F);
    if (!syms) return { type: 'error', message: `Can't read "${s}".` };
    return withParams({ type: 'implicit', F, lhs: L, rhs: Rr }, F, ['x', 'y', 'z']);
  }

  const syms = symbolsOf(s);
  if (!syms) return { type: 'error', message: validate(s, ['x', 'y']) ?? `Can't read "${s}".` };
  if (lhs && /^[A-Z]/.test(lhs) && false) return { type: 'error' };
  if (syms.has('z')) return withParams({ type: 'implicit', F: s, lhs: s, rhs: '0', levelSet: true }, s, ['x', 'y', 'z']);
  if (syms.has('y') || (lhs && /\(.*y.*\)/.test(lhs))) return withParams({ type: 'surface', expr: s }, s, ['x', 'y']);
  if (syms.has('t')) return withParams({ type: 'curve', x: 't', y: s, z: '0', dim: 2 }, s, ['t']);
  return withParams({ type: 'graph2d', expr: s }, s, ['x']);
}

function withParams(obj, expr, vars) {
  obj.params = freeSymbols(expr, vars);
  return obj;
}

// ---------- pieces of an expression ----------

// Top-level additive terms, with signs folded in: "x^2 - 3y + 2" -> ["x^2", "-3 y", "2"]
export function terms(expr) {
  let node;
  try {
    node = math.parse(normalize(expr));
  } catch {
    return [expr];
  }
  const out = [];
  const walk = (n, sign) => {
    if (n.isParenthesisNode) return walk(n.content, sign);
    if (n.isOperatorNode && n.fn === 'add' && n.args.length === 2) {
      walk(n.args[0], sign);
      walk(n.args[1], sign);
    } else if (n.isOperatorNode && n.fn === 'subtract' && n.args.length === 2) {
      walk(n.args[0], sign);
      walk(n.args[1], -sign);
    } else if (n.isOperatorNode && n.fn === 'unaryMinus') {
      walk(n.args[0], -sign);
    } else {
      const s = n.toString();
      out.push(sign < 0 ? `-(${s})` : s);
    }
  };
  walk(node, 1);
  return out.map((t) => t.replace(/^-\((\w+)\)$/, '-$1'));
}

// Plain-language reading of one term.
export function describeTerm(term, vars = ['x', 'y']) {
  let n;
  try {
    n = math.parse(normalize(term));
  } catch {
    return 'a piece of the formula';
  }
  const neg = n.isOperatorNode && n.fn === 'unaryMinus';
  const core = neg ? n.args[0] : n;
  const used = [...(symbolsOf(term) ?? [])].filter((s) => vars.includes(s));
  const sgn = neg ? 'flipped upside down (the minus sign)' : '';
  const c = core.isParenthesisNode ? core.content : core;
  if (!used.length) return `a constant: it lifts or lowers everything by ${simplify(term)}`;
  if (c.isOperatorNode && c.fn === 'pow' && c.args[0].isSymbolNode && c.args[1].isConstantNode) {
    const p = Number(c.args[1].value);
    const v = c.args[0].name;
    const shape = p === 2 ? 'a parabola: 0 at the middle, growing fast on both sides' : p % 2 === 0 ? `an even power: flat near 0, then very steep, same on both sides` : p === 3 ? 'a cubic: negative on one side, positive on the other' : `${v} to the ${p}`;
    const verb = p === 2 ? `squares ${v}` : `raises ${v} to the power ${p}`;
    return `${v}${toSup(p)} ${verb}: ${shape}${sgn ? `, ${sgn}` : ''}`;
  }
  if (c.isSymbolNode) return `just ${c.name}: a straight ramp that rises 1 for every 1 you move in ${c.name}${sgn ? `, ${sgn}` : ''}`;
  const constArg = c.isOperatorNode && c.fn === 'multiply' && !(symbolsOf(c.args[0].toString()) ?? new Set(['?'])).size;
  if (constArg) {
    const k = Number(c.args[0].evaluate()) * (neg ? -1 : 1);
    const rest = c.args.slice(1).map((a) => a.toString()).join(' ');
    return `${k} times ${rest}: the same shape as ${rest}, ${Math.abs(k) > 1 ? 'stretched taller' : 'squashed flatter'}${k < 0 ? ' and flipped' : ''}`;
  }
  if (c.isFunctionNode) {
    const name = c.fn.name ?? String(c.fn);
    const inner = c.args[0]?.toString();
    const map = {
      sin: `a wave: sin of ${inner} swings between -1 and 1`,
      cos: `a wave: cos of ${inner} swings between -1 and 1 and starts at its top`,
      exp: `exponential of ${inner}: always positive; it grows fast when ${inner} is big and nearly vanishes when it is very negative`,
      sqrt: `square root of ${inner}: only defined where ${inner} ≥ 0, which carves out the domain`,
      log: `natural log of ${inner}: only defined where ${inner} > 0, and dives to -∞ near 0`,
      abs: `absolute value of ${inner}: a V shape with a sharp crease`,
      atan: `arctangent: an S curve that levels off at ±π/2`,
    };
    return (map[name] ?? `${name} of ${inner}`) + (sgn ? `, ${sgn}` : '');
  }
  if (c.isOperatorNode && c.fn === 'multiply') {
    const parts = c.args.map((a) => a.toString());
    return `a product, ${parts.join(' times ')}: zero wherever any factor is zero${sgn ? `, ${sgn}` : ''}`;
  }
  if (c.isOperatorNode && c.fn === 'divide') return `a ratio: it blows up where ${c.args[1].toString()} = 0${sgn ? `, ${sgn}` : ''}`;
  return `${term}`;
}

const toSup = (p) => String(p).split('').map((d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)] ?? d).join('');

// ---------- one variable ----------

export function symmetry1d(expr) {
  const f = fn(expr, ['x']);
  let even = true;
  let odd = true;
  for (const x of [0.3, 0.7, 1.1, 1.9, 2.6]) {
    const a = f(x);
    const b = f(-x);
    if (!Number.isFinite(a) || !Number.isFinite(b)) { even = odd = false; break; }
    if (Math.abs(a - b) > 1e-7 * (1 + Math.abs(a))) even = false;
    if (Math.abs(a + b) > 1e-7 * (1 + Math.abs(a))) odd = false;
  }
  return even ? 'even' : odd ? 'odd' : 'none';
}

// Roots of a 1-variable function on [a, b] by sign changes + bisection.
export function roots1d(expr, a = -5, b = 5, n = 800) {
  const f = typeof expr === 'function' ? expr : fn(expr, ['x']);
  const out = [];
  let x0 = a;
  let f0 = f(x0);
  for (let i = 1; i <= n; i++) {
    const x1 = a + ((b - a) * i) / n;
    const f1 = f(x1);
    if (Number.isFinite(f0) && Number.isFinite(f1)) {
      if (f0 === 0) out.push(x0);
      else if (f0 * f1 < 0) {
        let lo = x0;
        let hi = x1;
        let flo = f0;
        for (let k = 0; k < 60; k++) {
          const mid = (lo + hi) / 2;
          const fm = f(mid);
          if (flo * fm <= 0) hi = mid;
          else { lo = mid; flo = fm; }
        }
        const r = (lo + hi) / 2;
        // reject poles masquerading as roots
        if (Math.abs(f(r)) < 1e-6) out.push(r);
      }
    }
    x0 = x1;
    f0 = f1;
  }
  return dedupe(out);
}

const dedupe = (xs, tol = 1e-6) => xs.filter((x, i) => xs.findIndex((y) => Math.abs(y - x) < tol) === i).map((x) => (Math.abs(x) < 1e-10 ? 0 : x));

export function criticalPoints1d(expr, a = -5, b = 5) {
  const d1 = derivative(expr, 'x');
  if (!d1) return [];
  const d2 = derivative(d1, 'x');
  const f = fn(expr, ['x']);
  const f2 = d2 ? fn(d2, ['x']) : () => NaN;
  return roots1d(d1, a, b).map((x) => {
    const s = f2(x);
    return { x, y: f(x), kind: s > 1e-9 ? 'min' : s < -1e-9 ? 'max' : 'flat' };
  });
}

// ---------- two variables ----------

export function partials(expr) {
  const fx = derivative(expr, 'x');
  const fy = derivative(expr, 'y');
  const fxx = fx && derivative(fx, 'x');
  const fyy = fy && derivative(fy, 'y');
  const fxy = fx && derivative(fx, 'y');
  return { fx, fy, fxx, fyy, fxy };
}

// Critical points in [-R, R]^2: seeded Newton on grad f = 0, classified by the second derivative test.
export function criticalPoints2d(expr, R = 3) {
  const p = partials(expr);
  if (!p.fx || !p.fy) return [];
  const f = fn(expr, ['x', 'y']);
  const fx = fn(p.fx, ['x', 'y']);
  const fy = fn(p.fy, ['x', 'y']);
  const fxx = fn(p.fxx, ['x', 'y']);
  const fyy = fn(p.fyy, ['x', 'y']);
  const fxy = fn(p.fxy, ['x', 'y']);
  const found = [];
  const seeds = 9;
  for (let i = 0; i < seeds; i++) {
    for (let j = 0; j < seeds; j++) {
      let x = -R + ((i + 0.5) * 2 * R) / seeds;
      let y = -R + ((j + 0.5) * 2 * R) / seeds;
      for (let k = 0; k < 60; k++) {
        const gx = fx(x, y);
        const gy = fy(x, y);
        const a = fxx(x, y);
        const b = fxy(x, y);
        const d = fyy(x, y);
        const det = a * d - b * b;
        if (![gx, gy, a, b, d].every(Number.isFinite)) break;
        let dx;
        let dy;
        if (Math.abs(det) < 1e-12) {
          // gradient step when the Hessian is singular
          dx = -0.1 * gx;
          dy = -0.1 * gy;
        } else {
          dx = -(d * gx - b * gy) / det;
          dy = -(-b * gx + a * gy) / det;
        }
        x += dx;
        y += dy;
        if (Math.hypot(dx, dy) < 1e-12) break;
      }
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      if (Math.abs(x) > R + 1e-9 || Math.abs(y) > R + 1e-9) continue;
      if (Math.hypot(fx(x, y), fy(x, y)) > 1e-7) continue;
      if (found.some((q) => Math.hypot(q.x - x, q.y - y) < 1e-5)) continue;
      found.push({ x: clean(x), y: clean(y) });
    }
  }
  return found.map(({ x, y }) => {
    const a = fxx(x, y);
    const b = fxy(x, y);
    const d = fyy(x, y);
    const D = a * d - b * b;
    const kind = D > 1e-9 ? (a > 0 ? 'local min' : 'local max') : D < -1e-9 ? 'saddle' : 'inconclusive (D = 0)';
    return { x, y, z: f(x, y), D, fxx: a, kind };
  });
}

const clean = (v) => {
  const r = Math.round(v * 1e8) / 1e8;
  return Math.abs(r) < 1e-10 ? 0 : r;
};

// Slice a surface: freeze one variable, get a one-variable formula.
export function trace(expr, freeze, value) {
  const other = freeze === 'x' ? 'y' : 'x';
  try {
    const node = math.parse(normalize(expr));
    const sub = node.transform((n) => (n.isSymbolNode && n.name === freeze ? new math.ConstantNode(value) : n));
    return { other, expr: math.simplify(sub, {}, { exactFractions: false }).toString().replace(/\d+\.\d{7,}/g, (m) => String(Number(Number(m).toPrecision(10)))) };
  } catch {
    return { other, expr: '' };
  }
}

// ---------- three variables ----------

export function divCurl(P, Q, R = '0') {
  const d = (e, v) => derivative(e, v) ?? '0';
  const div = simplify(`(${d(P, 'x')}) + (${d(Q, 'y')}) + (${d(R, 'z')})`);
  const curl = [
    simplify(`(${d(R, 'y')}) - (${d(Q, 'z')})`),
    simplify(`(${d(P, 'z')}) - (${d(R, 'x')})`),
    simplify(`(${d(Q, 'x')}) - (${d(P, 'y')})`),
  ];
  return { div, curl, conservative: curl.every((c) => isZero(c, ['x', 'y', 'z'])) };
}

export function isZero(expr, vars) {
  const f = fn(expr, vars);
  for (const pt of [[0.3, -0.7, 1.1], [1.7, 0.4, -0.9], [-1.2, 2.2, 0.5], [0.9, 0.9, 0.9]]) {
    const v = f(...pt.slice(0, vars.length));
    if (!Number.isFinite(v) || Math.abs(v) > 1e-9) return false;
  }
  return true;
}

// Try to recover a potential phi with grad phi = F by integrating numerically along straight rays.
export function potentialAt(P, Q, R = '0') {
  const fP = fn(P, ['x', 'y', 'z']);
  const fQ = fn(Q, ['x', 'y', 'z']);
  const fR = fn(R, ['x', 'y', 'z']);
  // Simpson's rule on t in [0, 1] along the ray from the origin.
  return (x, y, z) => {
    const n = 200;
    const g = (t) => fP(t * x, t * y, t * z) * x + fQ(t * x, t * y, t * z) * y + fR(t * x, t * y, t * z) * z;
    let s = g(0) + g(1);
    for (let i = 1; i < n; i++) s += g(i / n) * (i % 2 ? 4 : 2);
    return s / (3 * n);
  };
}

// ---------- curves ----------

export function curveStats(c, t0, t1) {
  const X = fn(c.x, ['t']);
  const Y = fn(c.y, ['t']);
  const Z = fn(c.z ?? '0', ['t']);
  const dx = derivative(c.x, 't') ?? '0';
  const dy = derivative(c.y, 't') ?? '0';
  const dz = derivative(c.z ?? '0', 't') ?? '0';
  const ddx = derivative(dx, 't') ?? '0';
  const ddy = derivative(dy, 't') ?? '0';
  const ddz = derivative(dz, 't') ?? '0';
  const V = [fn(dx, ['t']), fn(dy, ['t']), fn(dz, ['t'])];
  const A = [fn(ddx, ['t']), fn(ddy, ['t']), fn(ddz, ['t'])];
  const pos = (t) => [X(t), Y(t), Z(t)];
  const vel = (t) => V.map((f) => f(t));
  const acc = (t) => A.map((f) => f(t));
  const speed = (t) => Math.hypot(...vel(t));
  const curvature = (t) => {
    const v = vel(t);
    const a = acc(t);
    const cr = [v[1] * a[2] - v[2] * a[1], v[2] * a[0] - v[0] * a[2], v[0] * a[1] - v[1] * a[0]];
    const s = Math.hypot(...v);
    return Math.hypot(...cr) / (s * s * s);
  };
  // Simpson's rule for arc length
  const n = 400;
  const h = (t1 - t0) / n;
  let L = speed(t0) + speed(t1);
  for (let i = 1; i < n; i++) L += speed(t0 + i * h) * (i % 2 ? 4 : 2);
  L *= h / 3;
  return { pos, vel, acc, speed, curvature, length: L, velocity: [simplify(dx), simplify(dy), simplify(dz)], acceleration: [simplify(ddx), simplify(ddy), simplify(ddz)] };
}

// ---------- quadric surfaces ----------

const MONOS = [
  ['x^2', (x) => x[0] * x[0]], ['y^2', (x) => x[1] * x[1]], ['z^2', (x) => x[2] * x[2]],
  ['xy', (x) => x[0] * x[1]], ['xz', (x) => x[0] * x[2]], ['yz', (x) => x[1] * x[2]],
  ['x', (x) => x[0]], ['y', (x) => x[1]], ['z', (x) => x[2]], ['1', () => 1],
];

// Least squares fit of F to the 10 quadratic monomials. Returns null if F is not degree <= 2.
export function quadricCoeffs(F) {
  const f = typeof F === 'function' ? F : fn(F, ['x', 'y', 'z']);
  const pts = [];
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 4 - 2;
  for (let i = 0; i < 40; i++) pts.push([rnd(), rnd(), rnd()]);
  const A = pts.map((p) => MONOS.map(([, m]) => m(p)));
  const b = pts.map((p) => f(...p));
  if (b.some((v) => !Number.isFinite(v))) return null;
  // normal equations
  const n = MONOS.length;
  const M = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => A.reduce((s, row) => s + row[i] * row[j], 0)));
  const v = Array.from({ length: n }, (_, i) => A.reduce((s, row, k) => s + row[i] * b[k], 0));
  const c = solve(M, v);
  if (!c) return null;
  const resid = Math.max(...A.map((row, k) => Math.abs(row.reduce((s, a, i) => s + a * c[i], 0) - b[k])));
  if (resid > 1e-6 * (1 + Math.max(...b.map(Math.abs)))) return null;
  return Object.fromEntries(MONOS.map(([k], i) => [k, Math.abs(c[i]) < 1e-9 ? 0 : c[i]]));
}

function solve(M, v) {
  const n = v.length;
  const a = M.map((row, i) => [...row, v[i]]);
  for (let col = 0; col < n; col++) {
    let piv = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(a[r][col]) > Math.abs(a[piv][col])) piv = r;
    if (Math.abs(a[piv][col]) < 1e-12) return null;
    [a[col], a[piv]] = [a[piv], a[col]];
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = a[r][col] / a[col][col];
      for (let k = col; k <= n; k++) a[r][k] -= f * a[col][k];
    }
  }
  return a.map((row, i) => row[n] / row[i]);
}

// Eigenvalues/vectors of a symmetric 3x3 by Jacobi rotation.
export function eigSym3(S) {
  const a = S.map((r) => r.slice());
  const V = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  for (let sweep = 0; sweep < 50; sweep++) {
    let off = 0;
    for (let p = 0; p < 3; p++) for (let q = p + 1; q < 3; q++) off += a[p][q] ** 2;
    if (off < 1e-20) break;
    for (let p = 0; p < 3; p++) for (let q = p + 1; q < 3; q++) {
      if (Math.abs(a[p][q]) < 1e-15) continue;
      const theta = (a[q][q] - a[p][p]) / (2 * a[p][q]);
      const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
      const c = 1 / Math.sqrt(t * t + 1);
      const s = t * c;
      for (let k = 0; k < 3; k++) {
        const akp = a[k][p];
        const akq = a[k][q];
        a[k][p] = c * akp - s * akq;
        a[k][q] = s * akp + c * akq;
      }
      for (let k = 0; k < 3; k++) {
        const apk = a[p][k];
        const aqk = a[q][k];
        a[p][k] = c * apk - s * aqk;
        a[q][k] = s * apk + c * aqk;
      }
      for (let k = 0; k < 3; k++) {
        const vkp = V[k][p];
        const vkq = V[k][q];
        V[k][p] = c * vkp - s * vkq;
        V[k][q] = s * vkp + c * vkq;
      }
    }
  }
  return { values: [a[0][0], a[1][1], a[2][2]], vectors: [0, 1, 2].map((i) => [V[0][i], V[1][i], V[2][i]]) };
}

// Name a quadric surface F(x,y,z) = 0.
export function classifyQuadric(F) {
  const c = quadricCoeffs(F);
  if (!c) return null;
  const S = [
    [c['x^2'], c.xy / 2, c.xz / 2],
    [c.xy / 2, c['y^2'], c.yz / 2],
    [c.xz / 2, c.yz / 2, c['z^2']],
  ];
  const lin = [c.x, c.y, c.z];
  const k0 = c['1'];
  const { values, vectors } = eigSym3(S);
  const scale = Math.max(1e-12, ...values.map(Math.abs));
  const zero = values.map((v) => Math.abs(v) < 1e-7 * scale);
  const nz = zero.filter((z) => !z).length;
  // linear part in the eigen basis
  const linE = vectors.map((vec) => vec[0] * lin[0] + vec[1] * lin[1] + vec[2] * lin[2]);
  const sign = (x) => (x > 0 ? 1 : -1);
  if (nz === 0) {
    if (lin.every((x) => Math.abs(x) < 1e-9)) return { name: 'plane', degree: 1 };
    return { name: 'plane', degree: 1 };
  }
  // constant after completing the square in the nonzero directions
  let k = k0;
  values.forEach((lam, i) => { if (!zero[i]) k -= (linE[i] * linE[i]) / (4 * lam); });
  const leftover = linE.filter((_, i) => zero[i]).some((x) => Math.abs(x) > 1e-7);
  const nzVals = values.filter((_, i) => !zero[i]);
  if (nz === 3) {
    if (Math.abs(k) < 1e-9) {
      const pos = nzVals.filter((v) => v > 0).length;
      if (pos === 3 || pos === 0) return { name: 'point (degenerate)' };
      const minority = pos === 1 ? 1 : -1;
      return { name: 'cone', axis: axisName(vectors[values.findIndex((v) => sign(v) === minority)]) };
    }
    // sum lam_i u_i^2 = -k: count terms whose sign matches -k
    const pos = nzVals.filter((v) => sign(v) === sign(-k)).length;
    if (pos === 3) {
      const same = nzVals.every((v) => Math.abs(v - nzVals[0]) < 1e-7 * scale);
      return { name: same ? 'sphere' : 'ellipsoid' };
    }
    if (pos === 2) return { name: 'hyperboloid of one sheet', axis: axisName(vectors[values.findIndex((v) => sign(v) === sign(k))]) };
    if (pos === 1) return { name: 'hyperboloid of two sheets', axis: axisName(vectors[values.findIndex((v) => sign(v) === sign(-k))]) };
    return { name: 'empty (no real points)' };
  }
  if (nz === 2) {
    const sameSign = sign(nzVals[0]) === sign(nzVals[1]);
    const freeAxis = axisName(vectors[zero.findIndex((z) => z)]);
    if (leftover) return { name: sameSign ? 'elliptic paraboloid' : 'hyperbolic paraboloid (saddle)', axis: freeAxis };
    if (Math.abs(k) < 1e-9) return { name: sameSign ? 'line (degenerate)' : 'pair of crossing planes' };
    if (sameSign) return sign(nzVals[0]) === sign(-k) ? { name: Math.abs(nzVals[0] - nzVals[1]) < 1e-7 * scale ? 'circular cylinder' : 'elliptic cylinder', axis: freeAxis } : { name: 'empty (no real points)' };
    return { name: 'hyperbolic cylinder', axis: freeAxis };
  }
  // nz === 1
  if (leftover) return { name: 'parabolic cylinder' };
  if (Math.abs(k) < 1e-9) return { name: 'plane (counted twice)' };
  return sign(nzVals[0]) === sign(-k) ? { name: 'pair of parallel planes' } : { name: 'empty (no real points)' };
}

function axisName(vec) {
  if (!vec) return null;
  const a = vec.map(Math.abs);
  const i = a.indexOf(Math.max(...a));
  return a[i] > 0.99 ? ['x', 'y', 'z'][i] : null;
}

export { toTex, derivative, simplify, fn };
