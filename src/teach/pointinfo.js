// What the 3D model can say about one point a student clicks on. Numbers only, no DOM, so it can be tested.
import { fn, fmt } from '../lib/expr.js';

const H = 1e-4;
const f2 = (x) => fmt(Math.abs(x) < 5e-4 ? 0 : x, 2);
// "+ 2.40(x - 1.20)" with the signs folded in
function term(coef, v, at) {
  const c = Math.abs(coef) < 5e-4 ? 0 : coef;
  const shift = Math.abs(at) < 5e-4 ? v : `(${v} ${at < 0 ? '+' : '-'} ${f2(Math.abs(at))})`;
  return `${c < 0 ? '-' : '+'} ${f2(Math.abs(c))}${shift}`;
}

export function surfaceAt(expr, x, y) {
  const f = fn(expr, ['x', 'y']);
  const z = f(x, y);
  const fx = (f(x + H, y) - f(x - H, y)) / (2 * H);
  const fy = (f(x, y + H) - f(x, y - H)) / (2 * H);
  const K = 1e-3;
  const fxx = (f(x + K, y) - 2 * z + f(x - K, y)) / (K * K);
  const fyy = (f(x, y + K) - 2 * z + f(x, y - K)) / (K * K);
  const fxy = (f(x + K, y + K) - f(x + K, y - K) - f(x - K, y + K) + f(x - K, y - K)) / (4 * K * K);
  return { z, fx, fy, fxx, fyy, fxy, grad: Math.hypot(fx, fy) };
}

export function fieldAt(L, x, y, z = 0) {
  const vars = ['x', 'y', 'z'];
  const P = fn(L.P, vars); const Q = fn(L.Q, vars); const R = fn(L.R ?? '0', vars);
  const d = (g, i) => {
    const a = [x, y, z]; const b = [x, y, z];
    a[i] += H; b[i] -= H;
    return (g(...a) - g(...b)) / (2 * H);
  };
  const F = [P(x, y, z), Q(x, y, z), R(x, y, z)];
  const div = d(P, 0) + d(Q, 1) + d(R, 2);
  const curl = [d(R, 1) - d(Q, 2), d(P, 2) - d(R, 0), d(Q, 0) - d(P, 1)];
  const is3d = L.R !== undefined && String(L.R).trim() !== '0';
  return { F, div, curl, is3d, mag: Math.hypot(...F) };
}

function coords(x, y, z) {
  const r = Math.hypot(x, y);
  const rho = Math.hypot(x, y, z);
  const th = Math.atan2(y, x);
  const phi = rho > 1e-9 ? Math.acos(Math.max(-1, Math.min(1, z / rho))) : 0;
  const deg = (a) => `${Math.round((a * 180) / Math.PI)}°`;
  return [
    `Cylindrical: $r = ${f2(r)}$, $\\theta = ${f2(th)}$ (${deg(th)}), $z = ${f2(z)}$.`,
    `Spherical: $\\rho = ${f2(rho)}$, $\\phi = ${f2(phi)}$ (${deg(phi)} down from the $z$-axis), $\\theta = ${f2(th)}$.`,
  ];
}

// layer: the scene layer that was clicked (or the field drawn on the floor). Returns
// { title, lines: [markdown], lessons, overlay: { point, arrows: [{from, to, color}], plane? } }.
export function pointInfo(layer, p, R = 3) {
  const { x, y } = p;
  if (layer?.kind === 'surface' || layer?.kind === 'gradientField') {
    const expr = layer.z;
    const s = surfaceAt(expr, x, y);
    if (!Number.isFinite(s.z)) return null;
    const P = `(${f2(x)}, ${f2(y)})`;
    const lines = [`Height: $f${P} = ${f2(s.z)}$.`,
      `Slopes: $f_x = ${f2(s.fx)}$ walking in the $+x$ direction, $f_y = ${f2(s.fy)}$ walking in the $+y$ direction.`];
    const overlay = { point: [x, y, s.z], arrows: [], plane: { x0: x, y0: y, z0: s.z, fx: s.fx, fy: s.fy } };
    let lessons = [11, 13, 14];
    if (s.grad > 2e-3) {
      lines.push(`Uphill is $\\nabla f = \\langle ${f2(s.fx)}, ${f2(s.fy)}\\rangle$ (the red arrow). That way the surface climbs at $${f2(s.grad)}$ per unit, the steepest it gets here. Walking at a right angle to it keeps you level, on the contour $f = ${f2(s.z)}$.`);
      const L = R * 0.32;
      const ux = s.fx / s.grad; const uy = s.fy / s.grad;
      overlay.arrows.push({ from: [x, y, s.z], to: [x + ux * L, y + uy * L, s.z + s.grad * L], color: 'road' });
    } else {
      const D = s.fxx * s.fyy - s.fxy * s.fxy;
      const kind = Math.abs(D) < 1e-3 ? 'the second derivative test can\'t decide ($D \\approx 0$)'
        : D < 0 ? 'a **saddle** ($D < 0$)'
          : s.fxx > 0 ? 'a **local min** ($D > 0$, $f_{xx} > 0$)' : 'a **local max** ($D > 0$, $f_{xx} < 0$)';
      lines.push(`This is a critical point: $\\nabla f \\approx \\vec 0$, so the tangent plane is flat. $D = f_{xx}f_{yy} - f_{xy}^2 = ${f2(D)}$, so it is ${kind}.`);
      lessons = [15, 14];
    }
    lines.push(`Tangent plane (the gray square): $z = ${f2(s.z)} ${term(s.fx, 'x', x)} ${term(s.fy, 'y', y)}$.`);
    return { title: `The point ${P} on $z = f(x, y)$`, lines, lessons, overlay };
  }
  if (layer?.kind === 'vectorField') {
    const z = layer.R !== undefined && String(layer.R).trim() !== '0' ? p.z ?? 0 : 0;
    const v = fieldAt(layer, x, y, z);
    if (!v.F.every(Number.isFinite)) return null;
    const at = v.is3d ? `(${f2(x)}, ${f2(y)}, ${f2(z)})` : `(${f2(x)}, ${f2(y)})`;
    const comps = (v.is3d ? v.F : v.F.slice(0, 2)).map(f2).join(', ');
    const lines = [`$\\vec F${at} = \\langle ${comps}\\rangle$, length $${f2(v.mag)}$ (the red arrow).`];
    const divWord = Math.abs(v.div) < 1e-3 ? 'no net outflow here' : v.div > 0 ? 'more flows out than in: a source' : 'more flows in than out: a sink';
    lines.push(`Divergence: $\\nabla\\cdot\\vec F = ${f2(v.div)}$, ${divWord}.`);
    if (v.is3d) {
      lines.push(`Curl: $\\nabla\\times\\vec F = \\langle ${v.curl.map(f2).join(', ')}\\rangle$${Math.hypot(...v.curl) < 1e-3 ? ', no spin here' : ': the field spins around that axis (right-hand rule)'}.`);
    } else {
      const c = v.curl[2];
      lines.push(`Spin: $Q_x - P_y = ${f2(c)}$, ${Math.abs(c) < 1e-3 ? 'no rotation here' : c > 0 ? 'a tiny paddle wheel here turns counterclockwise' : 'a tiny paddle wheel here turns clockwise'}.`);
    }
    const scale = v.mag > 1e-9 ? (R * 0.3) / Math.max(v.mag, 1) : 0;
    return {
      title: `The field at ${at}`,
      lines,
      lessons: [25, 30],
      overlay: { point: [x, y, z], arrows: scale ? [{ from: [x, y, z], to: [x + v.F[0] * scale, y + v.F[1] * scale, z + (v.is3d ? v.F[2] * scale : 0)], color: 'road' }] : [] },
    };
  }
  const z = p.z ?? 0;
  return {
    title: `The point (${f2(x)}, ${f2(y)}, ${f2(z)})`,
    lines: coords(x, y, z),
    lessons: [22, 23],
    overlay: { point: [x, y, z], arrows: [] },
  };
}
