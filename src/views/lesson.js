import { lessonById, boilerFor, mistakeInfo, LESSONS } from '../content/course.js';
import { md, mdInline, tex } from '../lib/md.js';
import { store, masteryOf, mistakeTally, toggleBookmark, isBookmarked } from '../lib/store.js';
import { icon, dots, escapeHTML, toast } from '../lib/ui.js';
import { problemCard, sceneViewer } from './components.js';
import { applyHighlights } from './highlight.js';

export const labHref = (layers) => `#/lab?s=${encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(layers)))))}`;

export default function lesson(host, { parts, params }) {
  const id = Number(parts[1]);
  const L = lessonById(id);
  if (!L) {
    host.innerHTML = '<div class="page"><h1>No such lesson</h1><p><a href="#/lessons">All lessons</a></p></div>';
    return;
  }
  const C = L.content;
  store.update((s) => (s.visited[id] = { at: Date.now() }));
  const prev = LESSONS.find((x) => x.id === id - 1);
  const next = LESSONS.find((x) => x.id === id + 1);
  const yours = mistakeTally().filter((t) => t.lesson === id);
  const m = masteryOf(id);
  const boiler = boilerFor(L);
  let tab = params.tab ?? 'learn';
  let viewer = null;

  const labLayers = C?.lab ?? (C?.scene?.layers?.filter((x) => ['surface', 'curve', 'vectorField', 'paramSurface', 'implicit'].includes(x.kind)).slice(0, 3).map((x) => ({ ...x, id: undefined })) ?? []);

  host.innerHTML = `
    <div class="page">
      <div class="lesson-head">
        <div class="crumbs">
          <a href="#/lessons" class="chip">← All lessons</a>
          <span class="chip">§${escapeHTML(L.section)}</span>
          <span class="chip ${L.exam === 2 ? 'exam2' : ''}">${L.exam === 3 ? 'Final exam' : `Exam ${L.exam}`}</span>
          ${dots(m.level)}<small class="muted">${m.tries ? `${m.correct} of ${m.tries} right` : 'Not practiced yet'}</small>
        </div>
        <div class="title-row"><span class="n">${id}</span><h1>${escapeHTML(L.title)}</h1></div>
        ${L.blurb ? `<p class="blurb">${mdInline(L.blurb)}</p>` : ''}
        <div class="lesson-actions">
          <a class="btn" href="${L.video}" target="_blank" rel="noopener">${icon('play')}Lecture recording</a>
          <a class="btn" href="${L.notes}" target="_blank" rel="noopener">${icon('notes')}Lecture notes</a>
          ${labLayers.length ? `<a class="btn" href="${labHref(labLayers)}">${icon('lab')}Open in 3D Lab</a>` : ''}
          <button class="btn" data-act="bm" aria-pressed="${isBookmarked('lesson', id, 'lesson')}">${icon(isBookmarked('lesson', id, 'lesson') ? 'bookmarkOn' : 'bookmark')}Bookmark</button>
          ${boiler.map((b) => `<a class="btn quiet sm" href="https://www.boilerexams.com/courses/MA26100/topics/${encodeURIComponent(b.name)}" target="_blank" rel="noopener" title="${b.q} past exam questions; class accuracy ${Math.round(b.acc * 100)}%">${icon('external')}${escapeHTML(b.name)} · ${Math.round(b.acc * 100)}%</a>`).join('')}
        </div>
      </div>
      ${C ? `
      <div class="tabs" role="tablist">
        <button role="tab" data-tab="learn">Learn</button>
        <button role="tab" data-tab="mistakes">Common mistakes${yours.length ? `<span class="count">${yours.reduce((a, b) => a + b.count, 0)}</span>` : ''}</button>
        <button role="tab" data-tab="practice">Practice <span class="muted">${C.problems?.length ?? 0}</span></button>
        <button role="tab" data-tab="notes">My notes</button>
      </div>
      <div class="lesson-wrap">
        <div class="tab-body" data-hl-root></div>
        <div class="viewer"></div>
      </div>
      <div class="pager">
        ${prev ? `<a href="#/lesson/${prev.id}"><small>Previous</small>← ${prev.id}. ${escapeHTML(prev.title)}</a>` : '<span></span>'}
        ${next ? `<a class="next" href="#/lesson/${next.id}"><small>Next</small>${next.id}. ${escapeHTML(next.title)} →</a>` : ''}
      </div>` : `<div class="panel"><p>This lesson's interactive content is still being written. Use the lecture recording and notes above in the meantime.</p></div>`}
    </div>`;

  const bm = host.querySelector('[data-act=bm]');
  bm.onclick = () => {
    const on = toggleBookmark({ kind: 'lesson', lesson: id, ref: 'lesson', title: `L${id}: ${L.title}` });
    bm.setAttribute('aria-pressed', String(on));
    bm.innerHTML = `${icon(on ? 'bookmarkOn' : 'bookmark')}Bookmark`;
    toast(on ? 'Lesson bookmarked' : 'Bookmark removed');
  };
  if (!C) return;

  if (C.scene) {
    viewer = sceneViewer(host.querySelector('.viewer'), C.scene, { labHref: labLayers.length ? labHref(labLayers) : null });
  }

  const body = host.querySelector('.tab-body');
  const renderTab = () => {
    host.querySelectorAll('[data-tab]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === tab)));
    if (tab === 'learn') {
      body.innerHTML = `<div class="prose">
        ${C.sections.map((s) => `<section id="s-${s.id}" data-hl-section="${s.id}" data-lesson="${id}" data-title="${escapeHTML(s.title)}">
          <h3>${mdInline(s.title)} <button class="btn icon sm quiet mark" data-sec="${s.id}" aria-pressed="${isBookmarked('section', id, s.id)}" title="Bookmark this section">${icon(isBookmarked('section', id, s.id) ? 'bookmarkOn' : 'bookmark')}</button></h3>
          ${md(s.body)}
        </section>`).join('')}
        ${C.formulas?.length ? `<div class="formula-card"><h4>Formula card</h4><dl>${C.formulas.map((f) => `<dt>${mdInline(f.label)}</dt><dd>${tex(f.tex, false)}</dd>`).join('')}</dl></div>` : ''}
        ${C.hook ? `<p class="hook">${mdInline(C.hook)}</p>` : ''}
        <p class="empty hint">Tip: select any sentence to get an explanation of it, or to mark it as needing work. Marks appear under Saved.</p>
      </div>`;
      body.querySelectorAll('.mark').forEach((b) => (b.onclick = () => {
        const sec = C.sections.find((s) => s.id === b.dataset.sec);
        const on = toggleBookmark({ kind: 'section', lesson: id, ref: sec.id, title: `L${id} · ${sec.title.replace(/\$/g, '')}` });
        b.setAttribute('aria-pressed', String(on));
        b.innerHTML = icon(on ? 'bookmarkOn' : 'bookmark');
        toast(on ? 'Section bookmarked' : 'Bookmark removed');
      }));
      applyHighlights(body);
      if (params.sec) body.querySelector(`#s-${CSS.escape(params.sec)}`)?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'mistakes') {
      body.innerHTML = `<div class="prose">
        <p class="muted">The mistakes that cost the most points on this lesson. If you have made one yourself, it says how many times.</p>
        ${C.mistakes.map((mk) => { const mine = yours.find((t) => t.mistake === mk.id); return `
          <div class="mistake">
            <h4>${icon('flag')}${mdInline(mk.title)}</h4>
            <div><div class="lbl">Wrong</div><div class="wrong">${mdInline(mk.wrong ?? '')}</div></div>
            <div><div class="lbl">Right</div><div class="right">${mdInline(mk.right ?? '')}</div></div>
            <div class="why">${mdInline(mk.why ?? '')}</div>
            ${mine ? `<div class="yours">You've made this mistake ${mine.count} time${mine.count === 1 ? '' : 's'}.</div>` : ''}
          </div>`; }).join('')}
        ${yours.filter((t) => !C.mistakes.some((mk) => mk.id === t.mistake)).map((t) => { const info = mistakeInfo(L, t.mistake); return `<div class="mistake"><h4>${icon('flag')}${escapeHTML(info.title)}</h4><div class="why">${escapeHTML(info.why)}</div><div class="yours">${t.count}× on this lesson</div></div>`; }).join('')}
      </div>`;
    } else if (tab === 'practice') {
      body.innerHTML = '<div class="practice-list"></div>';
      const list = body.querySelector('.practice-list');
      (C.problems ?? []).forEach((pr, i) => list.appendChild(problemCard({ lesson: L, problem: pr, number: `${i + 1}.`, mode: 'learn' })));
      if (params.p) body.querySelector(`#p-${id}-${CSS.escape(params.p)}`)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const note = store.get().notes[id] ?? '';
      body.innerHTML = `<div class="prose"><div class="field"><label for="note">Your notes for Lesson ${id} (saved as you type; Markdown and $math$ work)</label><textarea id="note" rows="12">${escapeHTML(note)}</textarea></div><div class="note-preview" style="margin-top:16px"></div></div>`;
      const ta = body.querySelector('#note');
      const prevEl = body.querySelector('.note-preview');
      const paint = () => (prevEl.innerHTML = md(ta.value));
      paint();
      ta.oninput = () => { store.update((s) => (s.notes[id] = ta.value)); paint(); };
    }
  };
  host.querySelectorAll('[data-tab]').forEach((b) => (b.onclick = () => {
    tab = b.dataset.tab;
    history.replaceState(null, '', `#/lesson/${id}?tab=${tab}`);
    renderTab();
  }));
  renderTab();

  return { dispose: () => viewer?.dispose() };
}
