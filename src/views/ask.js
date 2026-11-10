import { LESSONS, lessonById, mistakeInfo } from '../content/course.js';
import { md, mdInline, tex } from '../lib/md.js';
import { store, masteryOf, mistakeTally } from '../lib/store.js';
import { icon, escapeHTML, dots } from '../lib/ui.js';
import { buildIndex, search, looksLikeMath } from '../lib/search.js';
import { classify } from '../teach/analyze.js';
import { insightFor } from '../teach/insight.js';
import { runTeach } from '../teach/run.js';
import { Plot3D } from '../three/engine.js';
import { encodeEntries, layerToEntry } from '../lib/labmodel.js';
import { sceneViewer } from './components.js';
import { askClaude, describeError } from '../lib/claude.js';

let INDEX = null;
const index = () => (INDEX ??= buildIndex(LESSONS));

const EXAMPLES = ['y = x^2', 'z = x^2 - y^2', 'z = x^4 + y^4 - 4*x*y + 1', '<cos t, sin t, t/4>', 'F = <-y, x>', 'F = <2*x*y, x^2, 0>', 'x^2 + y^2 - z^2 = 1', 'why the extra r in polar?', 'when do I use Green’s theorem?', 'how do I reverse the order of integration?', 'what does the gradient mean?', 'how do I know if a field is conservative?'];

export default function ask(host, { params }) {
  const q = (params.q ?? '').trim();
  const from = params.from ? Number(params.from) : null;
  const cleanups = [];

  const head = `
    <div class="page-head">
      <div>
        <h1>${q ? escapeHTML(q.length > 90 ? `${q.slice(0, 88)}…` : q) : 'Ask a question'}</h1>
        <p>${q ? (looksLikeMath(q) ? 'Read as math. Press play to watch it built piece by piece.' : 'Matched against all 37 lessons, plus what you’ve gotten wrong so far.') : 'Type an expression to see it drawn and taught step by step, or ask a question in your own words.'}</p>
      </div>
    </div>
    <form class="ask-again ask-form">
      <input name="q" value="${escapeHTML(q)}" placeholder="z = x^2 - y^2, or “why is the Jacobian r?”" aria-label="Question or expression">
      <button class="btn primary">${icon('ask')}Ask</button>
    </form>`;

  host.innerHTML = `<div class="page">${head}<div class="ask-body"></div></div>`;
  host.querySelector('.ask-again').onsubmit = (e) => {
    e.preventDefault();
    const v = new FormData(e.target).get('q').trim();
    if (v) location.hash = `#/ask?q=${encodeURIComponent(v)}`;
  };
  const body = host.querySelector('.ask-body');

  if (!q) {
    body.innerHTML = `<div class="suggest">${EXAMPLES.map((x) => `<button data-q="${escapeHTML(x)}">${escapeHTML(x)}</button>`).join('')}</div>`;
    body.querySelectorAll('[data-q]').forEach((b) => (b.onclick = () => (location.hash = `#/ask?q=${encodeURIComponent(b.dataset.q)}`)));
    return;
  }

  if (looksLikeMath(q)) {
    const c = classify(q);
    if (c.type !== 'error' && c.type !== 'empty') {
      mathAnswer(body, q, c, cleanups);
      return { dispose: () => cleanups.forEach((f) => f()) };
    }
  }
  wordAnswer(body, q, from, cleanups);
  return { dispose: () => cleanups.forEach((f) => f()) };
}

// ---------- math: draw it and teach it ----------
function mathAnswer(body, q, c, cleanups) {
  const params = Object.fromEntries((c.params ?? []).map((k) => [k, 1]));
  let info = null;
  try { info = insightFor(c, params, { R: 3 }); } catch { info = null; }
  const labLink = `#/lab?s=${encodeEntries([{ src: q, color: 'road', hidden: false }])}`;
  body.innerHTML = `
    <div class="ask-stage"></div>
    <div class="home-grid" style="margin-top:24px">
      <section class="panel">
        <h2>${escapeHTML(info?.kind ?? 'What this is')}</h2>
        ${info ? md(info.lines.join('\n\n')) : '<p>Drawn above.</p>'}
        ${c.params?.length ? `<p class="empty">Free letters ${c.params.map((p) => `<b>${escapeHTML(p)}</b>`).join(', ')} are set to 1 here. Open it in the Lab to get sliders for them.</p>` : ''}
      </section>
      <section class="panel">
        <h2>Go further</h2>
        <p><a class="btn" href="${labLink}">${icon('lab')}Open in the 3D Lab</a></p>
        <p style="margin-top:10px">${(info?.lessons ?? []).map((id) => { const l = lessonById(id); return l ? `<a class="chip" href="#/lesson/${id}">L${id} ${escapeHTML(l.title)}</a> ` : ''; }).join('')}</p>
      </section>
    </div>`;
  const stage = body.querySelector('.ask-stage');
  const plotHost = document.createElement('div');
  plotHost.style.cssText = 'position:absolute;inset:0';
  stage.appendChild(plotHost);
  const plot = new Plot3D(plotHost, { colormap: store.get().settings.colormap });
  let player = runTeach(plot, stage, c, params, {
    colormap: store.get().settings.colormap,
    onClose: () => { player?.dispose(); player = null; },
  });
  if (!player) stage.innerHTML = '<p class="empty" style="padding:20px">This one can be drawn in the Lab, but Teach mode has no walkthrough for it yet.</p>';
  cleanups.push(() => { player?.dispose(); plot.dispose(); });
}

// ---------- words: route to lessons, personalize, optionally ask Claude ----------
function wordAnswer(body, q, from, cleanups) {
  const res = search(index(), q, { limit: 10 });
  if (from && !res.lessons.some((l) => l.id === from)) res.lessons.unshift({ id: from, score: Infinity });
  const top = res.lessons[0] ? lessonById(res.lessons[0].id) : null;
  const tally = mistakeTally();
  const s = store.get();

  const sections = res.hits.filter((h) => h.kind === 'section').slice(0, 3);
  if (top?.content && !sections.some((h) => h.lesson === top.id) && top.content.sections?.[0]) {
    const s0 = top.content.sections[0];
    sections.unshift({ lesson: top.id, kind: 'section', ref: s0.id, title: s0.title });
  }
  const mistakes = res.hits.filter((h) => h.kind === 'mistake').slice(0, 3);
  const formulas = top?.content?.formulas ?? [];

  const personal = [];
  for (const { id } of res.lessons.slice(0, 3)) {
    const L = lessonById(id);
    const m = masteryOf(id);
    const mine = tally.filter((t) => t.lesson === id);
    const work = s.highlights.filter((h) => h.lesson === id && h.color === 'work');
    if (mine.length) {
      const worst = mine[0];
      const info = mistakeInfo(L, worst.mistake);
      personal.push(`On **Lesson ${id}** you've fallen for *${info.title}* ${worst.count}× — ${info.why ?? ''}`);
    } else if (m.tries) {
      personal.push(`You're ${Math.round((m.rate ?? 0) * 100)}% on recent **Lesson ${id}** problems (${m.correct}/${m.tries} total).`);
    } else {
      personal.push(`You haven't practiced **Lesson ${id}** yet. [Try its problems](#/lesson/${id}?tab=practice).`);
    }
    if (work.length) personal.push(`You marked “${work[0].text.slice(0, 80)}” in Lesson ${id} as needing work.`);
  }

  const hasKey = !!s.settings.apiKey;
  body.innerHTML = `
    <div class="explain-wrap">
      <div>
        ${top ? `<p style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px">${res.lessons.map(({ id }) => { const L = lessonById(id); return `<a class="chip ${id === top.id ? 'exam2' : ''}" href="#/lesson/${id}">L${id} ${escapeHTML(L.title)} ${dots(masteryOf(id).level)}</a>`; }).join('')}</p>` : '<p>Nothing in the lessons matches that closely. Try different words, or type the expression itself.</p>'}
        <div class="ai-slot"></div>
        ${personal.length ? `<div class="panel" style="margin-bottom:20px"><h2>For you</h2>${md(personal.map((p) => `- ${p}`).join('\n'))}</div>` : ''}
        <div class="explain-steps">
          ${sections.map((h) => {
            const L = lessonById(h.lesson);
            const sec = L.content?.sections.find((x) => x.id === h.ref);
            if (!sec) return '';
            return `<div class="st"><div><h3>${mdInline(sec.title)} <small class="muted" style="font-weight:400">· <a href="#/lesson/${L.id}?sec=${encodeURIComponent(sec.id)}">Lesson ${L.id}</a></small></h3><div class="prose">${md(sec.body)}</div></div></div>`;
          }).join('')}
        </div>
        ${mistakes.length ? `<h2 style="margin:36px 0 14px">Common mistakes here</h2>${mistakes.map((h) => { const L = lessonById(h.lesson); const mk = L.content.mistakes.find((x) => x.id === h.ref); return `<div class="mistake"><h4>${icon('flag')}${mdInline(mk.title)} <small class="muted" style="font-weight:400">L${L.id}</small></h4>${mk.wrong ? `<div><div class="lbl">Wrong</div><div class="wrong">${mdInline(mk.wrong)}</div></div>` : ''}${mk.right ? `<div><div class="lbl">Right</div><div class="right">${mdInline(mk.right)}</div></div>` : ''}<div class="why">${mdInline(mk.why ?? '')}</div></div>`; }).join('')}` : ''}
      </div>
      <aside>
        <div class="viewer"></div>
        ${formulas.length ? `<div class="formula-card" style="margin-top:20px"><h4>Lesson ${top.id} formula card</h4><dl>${formulas.map((f) => `<dt>${mdInline(f.label)}</dt><dd>${tex(f.tex, false)}</dd>`).join('')}</dl></div>` : ''}
      </aside>
    </div>`;

  if (top?.content?.scene) {
    const v = sceneViewer(body.querySelector('.viewer'), top.content.scene, { labHref: top.content.lab ? `#/lab?s=${encodeEntries(top.content.lab.map(layerToEntry))}` : null });
    cleanups.push(() => v.dispose());
  }

  const slot = body.querySelector('.ai-slot');
  if (!hasKey) {
    slot.innerHTML = `<p class="empty" style="margin-bottom:20px">Want a written answer to exactly this question? Add a Claude API key in <a href="#/settings">Settings</a>. Everything else on this page works offline.</p>`;
    return;
  }
  const context = [
    top ? `The student is on MA 261. The closest lesson is Lesson ${top.id}: ${top.title}.` : '',
    from ? `They selected this text while reading Lesson ${from}.` : '',
    personal.length ? `What we know about them: ${personal.join(' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')}` : '',
  ].filter(Boolean).join('\n');
  slot.innerHTML = `<div class="ai-answer" style="margin-bottom:20px"><div class="who">Claude · written for you</div><div class="ai-text prose"><p class="skeleton" style="height:1em;width:60%"></p></div></div>`;
  const out = slot.querySelector('.ai-text');
  let text = '';
  let frame = 0;
  let alive = true;
  cleanups.push(() => { alive = false; });
  askClaude({
    apiKey: store.get().settings.apiKey,
    model: store.get().settings.model,
    question: q,
    context,
    onText: (d) => {
      text += d;
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; if (alive) out.innerHTML = md(text); });
    },
  }).then(() => { if (alive) out.innerHTML = md(text); })
    .catch(async (err) => { if (alive) out.innerHTML = `<p class="redpen">${escapeHTML(await describeError(err))}</p>`; });
}
