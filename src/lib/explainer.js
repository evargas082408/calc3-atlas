// Builds the explanation shown when a student selects text, clicks a formula, or reads along with the 3D model.
// Kept free of the DOM so it can be tested; views/explain.js renders what this returns.
import { lookup } from './glossary.js';
import { tokens, search } from './search.js';
import { classify } from '../teach/analyze.js';

const TEACHABLE = new Set(['graph2d', 'surface', 'curve', 'field', 'implicit', 'paramSurface']);

// ---------- TeX -> math.js, for formulas that can be drawn ----------
function readGroup(s, i) {
  // s[i] === '{'; returns [content, indexAfter]
  let depth = 0;
  for (let j = i; j < s.length; j++) {
    if (s[j] === '{') depth++;
    else if (s[j] === '}' && --depth === 0) return [s.slice(i + 1, j), j + 1];
  }
  return [s.slice(i + 1), s.length];
}

function texBody(s) {
  let out = '';
  for (let i = 0; i < s.length;) {
    const frac = /^\\[dt]?frac\s*/.exec(s.slice(i));
    if (frac && s[i + frac[0].length] === '{') {
      const [a, j] = readGroup(s, i + frac[0].length);
      const [b, k] = s[j] === '{' ? readGroup(s, j) : [s[j] ?? '', j + 1];
      out += `((${texBody(a)})/(${texBody(b)}))`;
      i = k;
      continue;
    }
    const sq = /^\\sqrt\s*/.exec(s.slice(i));
    if (sq && s[i + sq[0].length] === '{') {
      const [a, j] = readGroup(s, i + sq[0].length);
      out += `sqrt(${texBody(a)})`;
      i = j;
      continue;
    }
    if (s[i] === '{') {
      const [a, j] = readGroup(s, i);
      out += `(${texBody(a)})`;
      i = j;
      continue;
    }
    out += s[i];
    i++;
  }
  return out;
}

export function texToExpr(src) {
  if (!src) return null;
  let s = String(src)
    .replace(/\\(?:left|right|displaystyle|textstyle|big|Big|bigg|Bigg)\b/g, '')
    .replace(/\\[,;:!> ]|\\quad|\\qquad|~/g, ' ')
    .replace(/\\langle/g, '<').replace(/\\rangle/g, '>')
    .replace(/\\cdot|\\times(?=\s*[\d(a-z])/g, '*')
    .replace(/\\(sin|cos|tan|sec|csc|cot|sinh|cosh|tanh|exp|arctan|arcsin|arccos)\b/g, (_, f) => ({ arctan: 'atan', arcsin: 'asin', arccos: 'acos' }[f] ?? f))
    .replace(/\\ln\b/g, 'log')
    .replace(/\\pi\b/g, 'pi')
    .replace(/\\vec\s*\{?\s*([A-Za-z])\s*\}?|\\mathbf\{([A-Za-z])\}/g, (_, a, b) => a ?? b)
    .trim();
  s = texBody(s).replace(/\s+/g, ' ').replace(/<\s+/g, '<').replace(/\s+>/g, '>').trim();
  // Anything else that is still a command is not something we can draw.
  if (/\\[A-Za-z]/.test(s) || /[∫∬∮]/.test(s)) return null;
  // Left-hand sides we understand: z =, f(x,y) =, r(t) =, F =, F(x,y) =.
  const m = /^([A-Za-z])\s*(\(([^)]*)\))?\s*=\s*([\s\S]+)$/.exec(s);
  if (m) {
    const [, name, , args, rhs] = m;
    if (rhs.includes('=')) return s; // an implicit equation like x^2 + y^2 = z^2
    if (/^<.*>$/.test(rhs.trim())) return name === 'F' ? `F = ${rhs.trim()}` : rhs.trim();
    if (name === 'y' && !args) return `y = ${rhs}`;
    if (name === 'z' || (args && /x\s*,\s*y/.test(args) && !/z/.test(args))) return `z = ${rhs}`;
    return s;
  }
  return s;
}

// A formula the Teach mode can draw, or null.
export function drawable(src) {
  const expr = texToExpr(src);
  if (!expr) return null;
  let c;
  try { c = classify(expr); } catch { return null; }
  // Formulas with free constants (a, k, ...) would need sliders; those go to the Lab instead.
  return c && TEACHABLE.has(c.type) && !(c.params?.length) ? { expr, c } : null;
}

// ---------- matching words to the 3D model ----------
// Words plus the names inside the math ($r\,dr\,d\theta$ -> r dr theta), so formulas count as evidence too.
const mathWords = (m) => ` ${m.replace(/\\([A-Za-z]+)/g, ' $1 ').replace(/[^A-Za-z0-9]+/g, ' ')} `;
const bag = (s) => new Set(tokens(String(s ?? '').replace(/\$\$([\s\S]*?)\$\$|\$([^$]*)\$/g, (_, a, b) => mathWords(a ?? b))));
function overlap(a, b) {
  let n = 0;
  for (const t of a) if (b.has(t)) n++;
  return n;
}

// For each scene step, the lesson section it belongs to. Scenes are not always in text order,
// so each step picks its best section, with a mild pull toward the matching position.
export function mapStepsToSections(steps = [], sections = []) {
  if (!steps.length || !sections.length) return [];
  const S = sections.map((s) => bag(`${s.title} ${s.title} ${s.body}`));
  const N = steps.length;
  const M = sections.length;
  // Words found in every section say nothing; long sections should not win just by being long.
  const df = new Map();
  for (const sb of S) for (const t of sb) df.set(t, (df.get(t) ?? 0) + 1);
  const avg = S.reduce((n, sb) => n + sb.size, 0) / M;
  const score = steps.map((st, i) => {
    const b = bag(`${st.label} ${st.label} ${st.caption}`);
    return S.map((sb, j) => {
      let w = 0;
      for (const t of b) if (sb.has(t)) w += Math.log(1 + M / df.get(t));
      const expected = N === 1 ? 0 : (i * (M - 1)) / (N - 1);
      // the opening step introduces the lesson, so it leans hard toward the first section
      return w / Math.sqrt(sb.size / avg) - (i === 0 ? 1.5 : 0.35) * Math.abs(j - expected);
    });
  });
  return score.map((row) => sections[row.indexOf(Math.max(...row))].id);
}

// The scene step that best shows a passage, preferring steps that belong to its section.
export function matchStep(text, steps = [], { sectionId = null, stepSections = [] } = {}) {
  if (!steps.length) return -1;
  const q = bag(text);
  let best = -1;
  let bestScore = 0;
  steps.forEach((st, i) => {
    let s = overlap(q, bag(`${st.label} ${st.caption}`));
    if (sectionId && stepSections[i] === sectionId) s += 1.5;
    if (s > bestScore || (s === bestScore && best < 0 && s > 0)) { best = i; bestScore = s; }
  });
  return best;
}

// ---------- the explanation itself ----------
// req: { text, tex, lessonId, sectionId }
// env: { lessons, index, tally, mastery(id), highlights }
export function explain(req, env) {
  const { lessons, index, tally = [], mastery = () => ({ tries: 0 }), highlights = [] } = env;
  const text = (req.text ?? '').trim();
  const L = req.lessonId ? lessons.find((l) => l.id === req.lessonId) : null;
  const C = L?.content;
  const terms = lookup({ text, tex: req.tex ?? '' });

  // Where it is taught: the section it came from first, then the closest other sections.
  const where = [];
  const pushSection = (lesson, sec) => {
    if (!sec || where.some((w) => w.lesson === lesson.id && w.section === sec.id)) return;
    where.push({ lesson: lesson.id, lessonTitle: lesson.title, section: sec.id, title: sec.title, body: sec.body });
  };
  const query = [text, ...terms.map((t) => t.title)].join(' ');
  // Sections of the lesson the student is reading come before other lessons'.
  const hits = (query.trim() ? search(index, query, { limit: 12 }).hits : [])
    .map((h, i) => ({ h, i }))
    .sort((a, b) => (b.h.lesson === req.lessonId) - (a.h.lesson === req.lessonId) || a.i - b.i)
    .map((x) => x.h);
  if (C && req.sectionId) pushSection(L, C.sections.find((s) => s.id === req.sectionId));
  for (const h of hits) {
    if (where.length >= 2) break;
    if (h.kind !== 'section') continue;
    const HL = lessons.find((l) => l.id === h.lesson);
    if (h.lesson === req.lessonId && h.ref === req.sectionId) continue;
    pushSection(HL, HL?.content?.sections.find((s) => s.id === h.ref));
  }
  if (!where.length && terms[0]) {
    const TL = lessons.find((l) => l.id === terms[0].lessons[0]);
    pushSection(TL, TL?.content?.sections?.[0]);
  }

  // Common mistakes: this lesson's that share words with the passage, then search hits.
  const q = bag(`${text} ${terms.map((t) => t.title).join(' ')}`);
  const traps = [];
  if (C?.mistakes) {
    const ranked = C.mistakes
      .map((mk) => ({ mk, s: overlap(q, bag(`${mk.title} ${mk.why ?? ''}`)) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s);
    for (const { mk } of ranked.slice(0, 2)) traps.push({ lesson: L.id, ...mk });
  }
  for (const h of hits) {
    if (traps.length >= 2) break;
    if (h.kind !== 'mistake') continue;
    const HL = lessons.find((l) => l.id === h.lesson);
    const mk = HL?.content?.mistakes.find((m) => m.id === h.ref);
    if (mk && !traps.some((t) => t.lesson === HL.id && t.id === mk.id)) traps.push({ lesson: HL.id, ...mk });
  }
  for (const t of traps) t.yours = tally.find((x) => x.lesson === t.lesson && x.mistake === t.id)?.count ?? 0;

  // Personal notes.
  const you = [];
  if (L) {
    const m = mastery(L.id);
    const mine = tally.filter((t) => t.lesson === L.id).sort((a, b) => b.count - a.count);
    if (mine.length) {
      const top = mine[0];
      const info = C?.mistakes?.find((x) => x.id === top.mistake);
      you.push(`On Lesson ${L.id} your most common mistake is **${info?.title ?? top.mistake}** (${top.count}×).`);
    }
    if (m.tries) you.push(`You've gotten ${m.correct} of ${m.tries} Lesson ${L.id} problems right.`);
    else you.push(`You haven't tried Lesson ${L.id}'s practice problems yet.`);
  }
  const marked = highlights.find((hl) => text && (hl.text.includes(text.slice(0, 40)) || text.includes(hl.text.slice(0, 40))));
  if (marked) you.push(marked.color === 'key' ? 'You marked this as a key idea.' : 'You marked this as needing work.');
  for (const t of traps) if (t.yours) you.push(`You've made the mistake **${t.title}** ${t.yours}× before.`);

  return {
    quote: text,
    tex: req.tex ?? null,
    terms,
    where,
    traps,
    you,
    draw: req.tex ? drawable(req.tex) : null,
    lesson: L ? { id: L.id, title: L.title } : null,
  };
}
