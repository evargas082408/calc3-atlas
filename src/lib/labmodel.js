// The 3D Lab's data model, kept free of the DOM so it can be tested.
// An entry is { id, src, color, hidden, t?, u?, v? } (typed math) or { id, layer, color, hidden } (a lesson's raw layer).
import { classify } from '../teach/analyze.js';

export const COLORS = ['road', 'water', 'wood', 'revision', 'contour', 'ink'];
let n = 0;
export const newId = () => `e${Date.now().toString(36)}${(n++).toString(36)}`;

// Substitute slider values for free symbols as whole words (so `a` never touches `atan`).
export function substitute(expr, params) {
  let out = String(expr);
  for (const [k, v] of Object.entries(params ?? {})) {
    out = out.replace(new RegExp(`(?<![A-Za-z0-9_.])${k}(?![A-Za-z0-9_(])`, 'g'), `(${v})`);
  }
  return out;
}

const hasTrig = (...xs) => xs.some((x) => /sin|cos|tan/.test(String(x)));

// Lessons hand the lab scene layers. Turn the typeable ones back into text so they can be edited and taught.
export function layerToEntry(L, i = 0) {
  const color = L.color && COLORS.includes(L.color) ? L.color : COLORS[i % COLORS.length];
  const base = { id: newId(), color, hidden: false };
  switch (L.kind) {
    case 'surface': return { ...base, src: `z = ${L.expr ?? L.z}` };
    case 'curve': return { ...base, src: `<${L.x}, ${L.y}, ${L.z ?? 0}>`, t: L.t ? L.t.map(String) : undefined };
    case 'paramSurface': return { ...base, src: `<${L.x}, ${L.y}, ${L.z}>`, u: L.u.map(String), v: L.v.map(String) };
    case 'vectorField': return { ...base, src: `F = <${L.P}, ${L.Q}${L.R !== undefined && String(L.R) !== '0' ? `, ${L.R}` : ''}>` };
    case 'implicit': return { ...base, src: String(L.F) };
    default: return { ...base, layer: { ...L, id: undefined } };
  }
}

export function defaultRange(c, which) {
  if (which === 't') return hasTrig(c.x, c.y, c.z) ? ['0', '2*pi'] : ['-2', '2'];
  if (which === 'u') return hasTrig(c.x, c.y, c.z) ? ['0', 'pi'] : ['-2', '2'];
  return hasTrig(c.x, c.y, c.z) ? ['0', '2*pi'] : ['-2', '2'];
}

// Classify an entry and collect the free parameters it needs sliders for.
export function analyzeEntry(e) {
  if (e.layer) return { c: { type: 'layer' }, params: [] };
  const c = classify(e.src);
  return { c, params: c.params ?? [] };
}

// One entry -> engine layers. `params` are slider values by name; R is the view half-width.
export function entryToLayers(e, params = {}, R = 3) {
  if (e.hidden) return [];
  if (e.layer) {
    const L = { ...e.layer, id: e.id, color: e.layer.color ?? e.color };
    if (L.kind === 'surface' && !L.z) L.z = L.expr;
    return [L];
  }
  const c = classify(e.src);
  const s = (x) => substitute(x, params);
  const color = e.color;
  switch (c.type) {
    case 'graph2d':
      return [{ id: e.id, kind: 'curve', x: 't', y: s(c.expr.replace(/\bx\b/g, 't')), z: '0', t: [-R, R], color, radius: R * 0.014 }];
    case 'surface':
      return [{ id: e.id, kind: 'surface', z: s(c.expr), mesh: true }];
    case 'curve':
      return [{ id: e.id, kind: 'curve', x: s(c.x), y: s(c.y), z: s(c.z), t: e.t ?? defaultRange(c, 't'), color, arrow: true }];
    case 'paramSurface':
      return [{ id: e.id, kind: 'paramSurface', x: s(c.x), y: s(c.y), z: s(c.z), u: e.u ?? defaultRange(c, 'u'), v: e.v ?? defaultRange(c, 'v'), mesh: true }];
    case 'field':
      return [{ id: e.id, kind: 'vectorField', P: s(c.P), Q: s(c.Q), R: s(c.R), density: c.dim === 3 ? 5 : 9 }];
    case 'implicit':
      return [{ id: e.id, kind: 'implicit', F: s(c.F) }];
    case 'vector': {
      const [a, b, z = 0] = c.comps;
      return [{ id: e.id, kind: 'vector', from: [0, 0, 0], to: [a, b, z], color, label: `⟨${c.raw.join(', ')}⟩` }];
    }
    default:
      return [];
  }
}

// URL state: the list as base64 JSON, small enough to share.
export const encodeEntries = (entries) => btoa(unescape(encodeURIComponent(JSON.stringify(entries.map(({ id, ...rest }) => rest)))));
export function decodeEntries(s) {
  try {
    const raw = JSON.parse(decodeURIComponent(escape(atob(s))));
    if (!Array.isArray(raw)) return null;
    return raw.map((x, i) => (x.kind ? layerToEntry(x, i) : { id: newId(), color: x.color ?? COLORS[i % COLORS.length], hidden: !!x.hidden, ...x }));
  } catch {
    return null;
  }
}

export const PRESETS = [
  { label: 'Paraboloid', entries: ['z = 4 - x^2 - y^2'] },
  { label: 'Saddle', entries: ['z = x^2 - y^2'] },
  { label: 'Monkey saddle', entries: ['z = (x^3 - 3*x*y^2)/4'] },
  { label: 'Ripple', entries: ['z = sin(sqrt(x^2 + y^2) * 2) / 2'] },
  { label: 'Two mins, a saddle', entries: ['z = (x^4 + y^4 - 4*x*y + 1)/4'] },
  { label: 'Slider: a·x² + y²', entries: ['z = a*x^2 + y^2'] },
  { label: 'Helix', entries: ['<cos(t), sin(t), t/4>'] },
  { label: 'Twisted cubic', entries: ['<t, t^2, t^3>'] },
  { label: 'Rotation field', entries: ['F = <-y, x>'] },
  { label: 'Source field', entries: ['F = <x, y>'] },
  { label: 'Gradient field', entries: ['F = <2*x*y, x^2>'] },
  { label: 'Sphere', entries: ['x^2 + y^2 + z^2 = 4'] },
  { label: 'Hyperboloid, 1 sheet', entries: ['x^2 + y^2 - z^2 = 1'] },
  { label: 'Hyperboloid, 2 sheets', entries: ['z^2 - x^2 - y^2 = 1'] },
  { label: 'Cone', entries: ['z^2 = x^2 + y^2'] },
  { label: 'Cylinder', entries: ['x^2 + y^2 = 4'] },
  { label: 'Torus', entries: ['<(2 + cos(v))*cos(u), (2 + cos(v))*sin(u), sin(v)>'], range: { u: ['0', '2*pi'], v: ['0', '2*pi'] } },
  { label: 'Cone ∩ sphere', entries: ['z = sqrt(x^2 + y^2)', 'x^2 + y^2 + z^2 = 8'] },
  { label: 'y = x²', entries: ['y = x^2'] },
];
