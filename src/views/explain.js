// Select any text, or click any formula, and an explanation opens right under it:
// what each term means, where it is taught, the traps, what we know about you, and a link to the 3D model.
import { LESSONS, lessonById } from '../content/course.js';
import { md, mdInline, tex } from '../lib/md.js';
import { store, masteryOf, mistakeTally, addHighlight } from '../lib/store.js';
import { h, icon, escapeHTML, toast } from '../lib/ui.js';
import { buildIndex } from '../lib/search.js';
import { explain, matchStep } from '../lib/explainer.js';
import { askClaude, describeError } from '../lib/claude.js';
import { applyHighlights } from './highlight.js';

let INDEX = null;
const index = () => (INDEX ??= buildIndex(LESSONS));
let ctx = null; // set by the lesson page: { lessonId, viewer, stepSections }
let pop = null;
let alive = 0;

export function setExplainContext(c) { ctx = c; }
export function clearExplainContext(c) { if (ctx === c) ctx = null; }

export function closeExplain() {
  alive++;
  pop?.remove();
  pop = null;
}

// Where selections and formula clicks count. Answer buttons, form fields and live mock exams are left alone.
const BLOCK = 'input, textarea, select, button, a, .choice, .xp-quote, .nav, .nav-drawer, .palette, .hl-pop, .teach-bar, [contenteditable]';
function allowed(node) {
  const el = node?.nodeType === 1 ? node : node?.parentElement;
  if (!el || !el.closest('#main, .xp')) return false;
  if (el.closest(BLOCK)) return false;
  if (document.querySelector('#main .mock-bar')) return false;
  return true;
}

function contextOf(el) {
  const sec = el?.closest('[data-hl-section]');
  const holder = el?.closest('[data-lesson]');
  const lessonId = Number(sec?.dataset.lesson ?? holder?.dataset.lesson ?? ctx?.lessonId ?? 0) || null;
  return { lessonId, sectionId: sec?.dataset.hlSection ?? null, sectionEl: sec ?? null };
}

export function mountExplain() {
  const onSelect = () => setTimeout(() => {
    const sel = window.getSelection();
    const text = sel?.toString().replace(/\s+/g, ' ').trim();
    if (!text || text.length < 2 || text.length > 600 || sel.rangeCount === 0) return;
    if (!allowed(sel.anchorNode) || !allowed(sel.focusNode)) return;
    const anchor = sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement;
    if (pop?.contains(anchor) && pop.dataset.text === text) return;
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    openExplain({ text, ...contextOf(anchor) }, rect, anchor);
  }, 10);
  document.addEventListener('mouseup', (e) => { if (!e.target.closest?.('.xp-head, .xp-actions, .xp-foot, .xp-ai button')) onSelect(); });
  document.addEventListener('touchend', onSelect);
  document.addEventListener('keyup', (e) => { if (e.shiftKey) onSelect(); if (e.key === 'Escape') closeExplain(); });

  // Click a formula to have it explained.
  document.addEventListener('click', (e) => {
    const k = e.target.closest?.('.katex');
    if (!k || !allowed(k) || window.getSelection()?.toString().trim()) return;
    const src = k.querySelector('annotation[encoding="application/x-tex"]')?.textContent;
    if (!src) return;
    openExplain({ tex: src.trim(), text: '', ...contextOf(k) }, k.getBoundingClientRect(), k);
  });

  document.addEventListener('mousedown', (e) => {
    if (!pop || pop.contains(e.target)) return;
    if (e.target.closest?.('.viewer, .lab-stage, .katex')) return; // keep it open while using the model
    if (window.getSelection()?.toString()) return;
    closeExplain();
  });
}

// Plain text of a section body, cut after whole sentences, with math kept intact.
function lead(body, max = 300) {
  const para = String(body).split(/\n\s*\n/).find((p) => !/^\s*(?:\$\$|\d+\.|- )/.test(p)) ?? String(body).split(/\n\s*\n/)[0];
  if (para.length <= max) return para;
  let inMath = false;
  let cut = -1;
  for (let i = 0; i < para.length && i < max; i++) {
    if (para[i] === '$') inMath = !inMath;
    if (!inMath && para[i] === '.' && /\s/.test(para[i + 1] ?? ' ')) cut = i + 1;
  }
  return cut > 40 ? para.slice(0, cut) : `${para.slice(0, max).replace(/\$[^$]*$/, '')}…`;
}

export function openExplain(req, rect, anchorEl) {
  closeExplain();
  const token = alive;
  const s = store.get();
  const ex = explain(req, { lessons: LESSONS, index: index(), tally: mistakeTally(), mastery: masteryOf, highlights: s.highlights });
  const L = ex.lesson ? lessonById(ex.lesson.id) : null;

  // Which step of the model on this page shows it.
  const viewer = ctx?.viewer && ctx.lessonId === req.lessonId ? ctx.viewer : null;
  const stepIdx = viewer ? matchStep(`${req.text ?? ''} ${ex.terms.map((t) => t.title).join(' ')}`, viewer.steps, { sectionId: req.sectionId, stepSections: ctx.stepSections }) : -1;

  const quote = req.tex ? `<div class="xp-quote math">${tex(req.tex, true)}</div>` : `<blockquote class="xp-quote">${escapeHTML(ex.quote.length > 220 ? `${ex.quote.slice(0, 218)}…` : ex.quote)}</blockquote>`;
  const actions = [];
  if (stepIdx >= 0) actions.push(`<button class="btn sm primary" data-act="show">${icon('lab')}Show it on the 3D model<span class="muted-inline">· ${mdInline(viewer.steps[stepIdx].label)}</span></button>`);
  if (ex.draw) actions.push(`<button class="btn sm ${stepIdx >= 0 ? '' : 'primary'}" data-act="draw">${icon('play')}Draw it step by step</button>`);

  const hasKey = !!s.settings.apiKey;
  const nothing = !ex.terms.length && !ex.where.length && !ex.traps.length;
  pop = h(`
    <div class="xp" role="dialog" aria-label="Explanation">
      <div class="xp-head">
        <span class="xp-eyebrow">${icon('explain')}Explanation${L ? ` · Lesson ${L.id}` : ''}</span>
        <button class="btn icon sm quiet" data-act="close" title="Close (Esc)">${icon('x')}</button>
      </div>
      <div class="xp-body">
        ${quote}
        ${actions.length ? `<div class="xp-actions">${actions.join('')}</div>` : ''}
        ${ex.terms.length ? `<section class="xp-sec"><h4>What it means</h4><dl class="xp-terms">${ex.terms.map((t) => `<dt>${escapeHTML(t.title)}${t.lessons[0] && lessonById(t.lessons[0]) ? ` <a class="xp-ref" href="#/lesson/${t.lessons[0]}">L${t.lessons[0]}</a>` : ''}</dt><dd>${mdInline(t.meaning)}</dd>`).join('')}</dl></section>` : ''}
        ${ex.where.length ? `<section class="xp-sec"><h4>${req.sectionId ? 'In this lesson' : 'Where it is taught'}</h4>${ex.where.map((w, i) => `<div class="xp-where"><a href="#/lesson/${w.lesson}?sec=${encodeURIComponent(w.section)}">L${w.lesson} · ${mdInline(w.title)}</a>${i === 0 || !req.sectionId ? `<div class="prose">${md(lead(w.body))}</div>` : ''}</div>`).join('')}</section>` : ''}
        ${ex.traps.length ? `<section class="xp-sec"><h4>Watch out</h4>${ex.traps.map((t) => `<div class="xp-trap"><strong>${mdInline(t.title)}</strong>${t.yours ? `<span class="xp-yours">You: ${t.yours}×</span>` : ''}<p>${mdInline(t.why ?? '')}</p>${t.wrong && t.right ? `<p class="xp-wr"><span class="wrong">${mdInline(t.wrong)}</span><span class="right">${mdInline(t.right)}</span></p>` : ''}</div>`).join('')}</section>` : ''}
        ${ex.you.length ? `<section class="xp-sec xp-you"><h4>For you</h4><ul>${ex.you.map((y) => `<li>${mdInline(y)}</li>`).join('')}</ul></section>` : ''}
        ${nothing ? '<p class="empty">Nothing in the lessons matches this closely. Try selecting a whole sentence or a formula.</p>' : ''}
        <section class="xp-ai">${hasKey
          ? `<button class="btn sm" data-act="ai">${icon('ask')}Explain it in more depth</button><div class="ai-text prose"></div>`
          : `<p class="muted">For a written explanation of exactly this, add a Claude API key in <a href="#/settings">Settings</a>.</p>`}</section>
      </div>
      ${req.sectionId ? `<div class="xp-foot"><span class="muted">Save it:</span><button class="btn sm" data-c="work">${icon('flag')}Needs work</button><button class="btn sm" data-c="key">${icon('bookmark')}Key idea</button></div>` : ''}
    </div>`);
  pop.dataset.text = req.text ?? '';
  document.body.appendChild(pop);
  place(pop, rect, anchorEl);

  pop.querySelector('[data-act=close]').onclick = closeExplain;
  pop.querySelector('[data-act=show]')?.addEventListener('click', () => {
    viewer.go(stepIdx);
    reveal(viewer.el);
  });
  pop.querySelector('[data-act=draw]')?.addEventListener('click', () => {
    if (viewer) {
      viewer.teach(ex.draw.c, ex.draw.expr);
      reveal(viewer.el);
    } else {
      closeExplain();
      location.hash = `#/ask?q=${encodeURIComponent(ex.draw.expr)}`;
    }
  });
  pop.querySelectorAll('[data-c]').forEach((b) => (b.onclick = () => {
    addHighlight({ lesson: req.lessonId, section: req.sectionId, title: req.sectionEl?.dataset.title ?? '', text: req.text, color: b.dataset.c });
    window.getSelection()?.removeAllRanges();
    applyHighlights(req.sectionEl?.closest('[data-hl-root]') ?? document);
    toast(b.dataset.c === 'work' ? 'Marked as needs work' : 'Marked as a key idea');
    closeExplain();
  }));
  pop.querySelector('[data-act=ai]')?.addEventListener('click', (e) => {
    e.currentTarget.remove();
    const out = pop.querySelector('.ai-text');
    out.innerHTML = '<p class="skeleton" style="height:1em;width:60%"></p>';
    const sec = L?.content?.sections.find((x) => x.id === req.sectionId);
    const context = [
      L ? `The student is studying MA 261, Lesson ${L.id}: ${L.title}.` : 'The student is studying MA 261.',
      sec ? `They are reading the section "${sec.title}":\n${sec.body.slice(0, 1400)}` : '',
      ex.you.length ? `What we know about them: ${ex.you.join(' ').replace(/\*\*/g, '')}` : '',
    ].filter(Boolean).join('\n\n');
    let text = '';
    let frame = 0;
    askClaude({
      apiKey: s.settings.apiKey,
      model: s.settings.model,
      question: req.tex ? `Explain this formula, symbol by symbol, and what it looks like in 3D: $${req.tex}$` : `Explain this part of my notes in plain words: "${req.text}"`,
      context,
      onText: (d) => {
        text += d;
        if (!frame) frame = requestAnimationFrame(() => { frame = 0; if (token === alive) out.innerHTML = md(text); });
      },
    }).then(() => { if (token === alive) out.innerHTML = md(text); })
      .catch(async (err) => { if (token === alive) out.innerHTML = `<p class="redpen">${escapeHTML(await describeError(err))}</p>`; });
  });
}

// Under the selection, kept inside the column it came from so the 3D model beside it stays visible.
function place(el, rect, anchorEl) {
  if (matchMedia('(max-width: 760px)').matches) {
    el.classList.add('sheet');
    return;
  }
  const col = anchorEl?.closest('.tab-body, .viewer, .lab-side, .lab-stage, .page, .xp')?.getBoundingClientRect() ?? document.body.getBoundingClientRect();
  const width = Math.min(460, Math.max(320, col.width));
  el.style.width = `${width}px`;
  let left = rect.left;
  left = Math.min(left, Math.max(col.left, col.right - width), window.innerWidth - width - 16);
  left = Math.max(16, left);
  el.style.left = `${left + window.scrollX}px`;
  el.style.top = `${rect.bottom + window.scrollY + 10}px`;
  requestAnimationFrame(() => {
    const r = el.getBoundingClientRect();
    if (r.bottom > window.innerHeight) window.scrollBy({ top: Math.min(r.bottom - window.innerHeight + 16, r.top - 80), behavior: 'smooth' });
  });
}

function reveal(viewerEl) {
  if (!viewerEl) return;
  const r = viewerEl.getBoundingClientRect();
  if (r.top < 60 || r.bottom > window.innerHeight) viewerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  viewerEl.classList.remove('pulse');
  void viewerEl.offsetWidth;
  viewerEl.classList.add('pulse');
}
