// A short written readout for one classified input: what it is and the numbers that matter. Pure, so tests can check it.
import { fmt, toTex, fn, num } from '../lib/expr.js';
import { symmetry1d, roots1d, criticalPoints1d, partials, criticalPoints2d, divCurl, curveStats, classifyQuadric, derivative } from './analyze.js';
import { quadricBlurb } from './beats.js';
import { substitute } from '../lib/labmodel.js';

const T = (e) => toTex(e);
const list = (xs) => xs.join(', ');

// Returns { kind, lines: [markdown], lessons: [ids] } or null.
export function insightFor(c, params = {}, opts = {}) {
  const s = (x) => substitute(x, params);
  switch (c.type) {
    case 'graph2d': {
      const e = s(c.expr);
      const sym = symmetry1d(e);
      const r = roots1d(e, -6, 6);
      const cps = criticalPoints1d(e, -6, 6);
      const d = derivative(e, 'x');
      return {
        kind: 'Curve in the plane, y = f(x)',
        lines: [
          `$y = ${T(e)}$${d ? `, slope $y' = ${T(d)}$` : ''}`,
          r.length ? `Crosses the x-axis at $x = ${list(r.slice(0, 6).map((x) => fmt(x, 3)))}$` : 'Never crosses the x-axis on $[-6, 6]$.',
          cps.length ? `Turning points: ${cps.slice(0, 5).map((p) => `${p.kind} at $(${fmt(p.x, 3)}, ${fmt(p.y, 3)})$`).join('; ')}` : 'No turning points on $[-6, 6]$.',
          sym === 'even' ? 'Even: mirror image across the y-axis.' : sym === 'odd' ? 'Odd: symmetric through the origin.' : '',
          'In 3D, with z free, this is a cylinder over the curve (Lesson 3).',
        ].filter(Boolean),
        lessons: [3],
      };
    }
    case 'surface': {
      const e = s(c.expr);
      const p = partials(e);
      const cps = criticalPoints2d(e, opts.R ?? 3);
      return {
        kind: 'Surface, z = f(x, y)',
        lines: [
          `$f_x = ${T(p.fx ?? '?')}$, $\\;f_y = ${T(p.fy ?? '?')}$`,
          `$\\nabla f = \\langle f_x, f_y\\rangle$ points uphill; level curves are perpendicular to it.`,
          cps.length
            ? `Critical points: ${cps.slice(0, 6).map((q) => `**${q.kind}** at $(${fmt(q.x, 3)}, ${fmt(q.y, 3)})$, $D = ${fmt(q.D, 3)}$`).join('; ')}`
            : 'No critical points in view.',
        ],
        lessons: [9, 11, 13, 15],
      };
    }
    case 'curve': {
      const x = s(c.x); const y = s(c.y); const z = s(c.z);
      const [t0, t1] = (opts.t ?? ['0', '2*pi']).map((v) => num(v));
      const st = curveStats({ x, y, z }, t0, t1);
      return {
        kind: c.dim === 2 ? 'Plane curve, r(t)' : 'Space curve, r(t)',
        lines: [
          `$\\vec r^{\\,\\prime}(t) = \\langle ${st.velocity.map(T).join(', ')}\\rangle$`,
          `$\\vec r^{\\,\\prime\\prime}(t) = \\langle ${st.acceleration.map(T).join(', ')}\\rangle$`,
          `Speed at $t = ${fmt(t0, 3)}$: $${fmt(st.speed(t0), 4)}$; curvature there $\\kappa = ${fmt(st.curvature(t0), 4)}$`,
          `Arc length over $[${fmt(t0, 3)}, ${fmt(t1, 3)}]$: $L \\approx ${fmt(st.length, 4)}$`,
        ],
        lessons: [5, 6, 7, 8],
      };
    }
    case 'field': {
      const P = s(c.P); const Q = s(c.Q); const R = s(c.R);
      const dc = divCurl(P, Q, R);
      return {
        kind: c.dim === 2 ? 'Vector field in the plane' : 'Vector field in space',
        lines: [
          `$\\operatorname{div}\\vec F = ${T(dc.div)}$`,
          c.dim === 2 ? `Scalar curl $Q_x - P_y = ${T(dc.curl[2])}$` : `$\\operatorname{curl}\\vec F = \\langle ${dc.curl.map(T).join(', ')}\\rangle$`,
          dc.conservative ? '**Conservative** (curl is 0 on a simply connected domain): line integrals depend only on the endpoints.' : '**Not conservative**: curl is not 0, so work depends on the path.',
        ],
        lessons: [25, 28, 30],
      };
    }
    case 'implicit': {
      const F = s(c.F);
      const q = classifyQuadric(fn(F, ['x', 'y', 'z']));
      return {
        kind: q ? `Quadric surface: ${q.name}` : 'Implicit surface, F(x, y, z) = 0',
        lines: q
          ? [quadricBlurb(q.name), q.axis ? `Axis along $${q.axis}$.` : ''].filter(Boolean)
          : ['Not a quadric (degree above 2). The Teach mode still slices it into traces.'],
        lessons: q ? [3, 4] : [14],
      };
    }
    case 'paramSurface': {
      const ru = ['x', 'y', 'z'].map((k) => derivative(s(c[k]), 'u') ?? '0');
      const rv = ['x', 'y', 'z'].map((k) => derivative(s(c[k]), 'v') ?? '0');
      return {
        kind: 'Parametric surface, r(u, v)',
        lines: [
          `$\\vec r_u = \\langle ${ru.map(T).join(', ')}\\rangle$`,
          `$\\vec r_v = \\langle ${rv.map(T).join(', ')}\\rangle$`,
          'Normal $\\vec r_u \\times \\vec r_v$; surface area element $dS = |\\vec r_u \\times \\vec r_v|\\,du\\,dv$.',
        ],
        lessons: [31, 32, 33],
      };
    }
    case 'vector': {
      const v = c.comps;
      return {
        kind: 'Vector',
        lines: [`$|\\vec v| = ${fmt(Math.hypot(...v), 4)}$`, `Unit vector $\\langle ${v.map((x) => fmt(x / Math.hypot(...v), 3)).join(', ')}\\rangle$`],
        lessons: [1],
      };
    }
    default:
      return null;
  }
}
