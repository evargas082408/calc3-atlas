// Offline question routing: score every section, formula, mistake and problem of every lesson against the question.

const STOP = new Set('a an and are as at be by can do does for from how i if in into is it its me my of on or so that the this to use used using what when where which why will with you your should would there their them then than vs versus get got'.split(' '));

// Words students use mapped to the words the lessons use.
const SYN = {
  greens: 'green', green: 'green', stokes: 'stokes', gauss: 'divergence', divergence: 'divergence', div: 'divergence',
  curl: 'curl', polar: 'polar', cylindrical: 'cylindrical', spherical: 'spherical', rho: 'spherical', phi: 'spherical',
  lagrange: 'lagrange', multiplier: 'lagrange', multipliers: 'lagrange', constraint: 'lagrange',
  jacobian: 'jacobian', extra: 'jacobian', gradient: 'gradient', grad: 'gradient', nabla: 'gradient', uphill: 'gradient',
  directional: 'directional', tangent: 'tangent', plane: 'plane', planes: 'plane', normal: 'normal',
  saddle: 'saddle', critical: 'critical', max: 'extrema', min: 'extrema', maximum: 'extrema', minimum: 'extrema', extrema: 'extrema', optimize: 'extrema',
  chain: 'chain', implicit: 'implicit', partial: 'partial', partials: 'partial', derivative: 'derivative', derivatives: 'derivative',
  limit: 'limit', limits: 'limit', continuity: 'continuity', continuous: 'continuity',
  quadric: 'quadric', hyperboloid: 'quadric', paraboloid: 'quadric', ellipsoid: 'quadric', cone: 'cone', cylinder: 'cylinder',
  cross: 'cross', dot: 'dot', projection: 'projection', angle: 'angle',
  curvature: 'curvature', arc: 'arc', length: 'length', velocity: 'velocity', acceleration: 'acceleration', speed: 'speed',
  double: 'double', triple: 'triple', integral: 'integral', integrals: 'integral', integrate: 'integral', order: 'order', reverse: 'order', switch: 'order', swap: 'order',
  mass: 'mass', center: 'center', centroid: 'center', density: 'density',
  field: 'field', fields: 'field', conservative: 'conservative', potential: 'potential', fundamental: 'fundamental', ftli: 'fundamental',
  line: 'line', work: 'work', circulation: 'circulation', flux: 'flux', surface: 'surface', surfaces: 'surface', parametric: 'parametric', parametrize: 'parametric', parameterize: 'parametric',
  area: 'area', orientation: 'orientation', outward: 'orientation', boundary: 'boundary',
};

export function tokens(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(/\$[^$]*\$/g, ' ')
    .replace(/['’]s\b/g, 's')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map((w) => SYN[w] ?? SYN[w.replace(/s$/, '')] ?? w.replace(/(ing|ed|es|s)$/, ''));
}

// docs: [{ lesson, kind, ref, title, text }]
export function buildIndex(lessons) {
  const docs = [];
  for (const L of lessons) {
    const C = L.content;
    docs.push({ lesson: L.id, kind: 'lesson', ref: 'lesson', title: L.title, text: `${L.title} ${L.title} ${L.blurb ?? ''}` });
    if (!C) continue;
    for (const s of C.sections ?? []) docs.push({ lesson: L.id, kind: 'section', ref: s.id, title: s.title, text: `${s.title} ${s.title} ${s.body}` });
    for (const f of C.formulas ?? []) docs.push({ lesson: L.id, kind: 'formula', ref: f.label, title: f.label, text: f.label });
    for (const m of C.mistakes ?? []) docs.push({ lesson: L.id, kind: 'mistake', ref: m.id, title: m.title, text: `${m.title} ${m.why ?? ''}` });
  }
  const df = new Map();
  for (const d of docs) {
    d.tok = tokens(d.text);
    d.tf = new Map();
    for (const t of d.tok) d.tf.set(t, (d.tf.get(t) ?? 0) + 1);
    for (const t of d.tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
  }
  return { docs, df, N: docs.length };
}

// BM25-ish scoring. Returns docs sorted by score, plus the top lessons.
export function search(index, query, { limit = 8 } = {}) {
  const q = [...new Set(tokens(query))];
  if (!q.length) return { hits: [], lessons: [] };
  const avg = index.docs.reduce((s, d) => s + d.tok.length, 0) / Math.max(1, index.N);
  const k1 = 1.2;
  const b = 0.6;
  const hits = [];
  for (const d of index.docs) {
    let s = 0;
    for (const t of q) {
      const f = d.tf.get(t);
      if (!f) continue;
      const idf = Math.log(1 + (index.N - (index.df.get(t) ?? 0) + 0.5) / ((index.df.get(t) ?? 0) + 0.5));
      s += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.tok.length) / avg)));
    }
    if (s > 0) hits.push({ ...d, score: s * (d.kind === 'lesson' ? 1.3 : 1) });
  }
  hits.sort((a, b2) => b2.score - a.score);
  const byLesson = new Map();
  for (const h of hits) byLesson.set(h.lesson, (byLesson.get(h.lesson) ?? 0) + h.score);
  const lessons = [...byLesson.entries()].sort((a, b2) => b2[1] - a[1]).map(([id, score]) => ({ id, score }));
  return { hits: hits.slice(0, limit), lessons: lessons.slice(0, 4) };
}

// Is this text math to plot, or a question to answer?
const FN_WORDS = new Set(['sin', 'cos', 'tan', 'sec', 'csc', 'cot', 'exp', 'log', 'ln', 'sqrt', 'abs', 'pi', 'atan', 'asin', 'acos', 'arctan', 'arcsin', 'arccos', 'sinh', 'cosh', 'tanh', 'atan2', 'max', 'min', 'theta', 'rho', 'phi']);
export function looksLikeMath(s) {
  const text = String(s ?? '').trim();
  if (!text) return false;
  if (/\?$/.test(text)) return false;
  const words = text.replace(/^[A-Za-z]\w*\s*(\([^)]*\))?\s*=/, '').match(/[A-Za-z]{2,}/g) ?? [];
  return words.every((w) => FN_WORDS.has(w.toLowerCase()));
}
