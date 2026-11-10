import { lessonById } from '../content/course.js';
import { store, removeHighlight } from '../lib/store.js';
import { escapeHTML, icon, relDays, toast } from '../lib/ui.js';
import { md, mdInline } from '../lib/md.js';

const KIND = { lesson: 'Lessons', section: 'Sections', problem: 'Problems', lab: '3D Lab setups' };

const hrefFor = (b) => {
  if (b.kind === 'lesson') return `#/lesson/${b.lesson}`;
  if (b.kind === 'section') return `#/lesson/${b.lesson}?sec=${encodeURIComponent(b.ref)}`;
  if (b.kind === 'problem') return `#/lesson/${b.lesson}?tab=practice&p=${encodeURIComponent(b.ref)}`;
  return `#/lab?s=${b.ref}`;
};

export default function marks(host) {
  const render = () => {
    const s = store.get();
    const groups = Object.keys(KIND).map((k) => [k, s.bookmarks.filter((b) => b.kind === k)]).filter(([, l]) => l.length);
    const work = s.highlights.filter((h) => h.color !== 'key');
    const key = s.highlights.filter((h) => h.color === 'key');
    const notes = Object.entries(s.notes).filter(([, v]) => v?.trim());
    const hl = (h) => { const L = lessonById(h.lesson); return `<li><div class="src"><a href="#/lesson/${h.lesson}?sec=${encodeURIComponent(h.section)}">L${h.lesson} · ${mdInline(h.title || L?.title || '')}</a> · ${relDays(new Date(h.at))}<span style="flex:1"></span><a href="#/ask?q=${encodeURIComponent(h.text)}&from=${h.lesson}">Explain this</a><button class="btn icon sm quiet" data-hl="${h.id}" title="Remove">${icon('x')}</button></div><blockquote>${escapeHTML(h.text)}</blockquote></li>`; };
    host.innerHTML = `
      <div class="page">
        <div class="page-head"><div><h1>Saved</h1><p>Your bookmarks, the passages you highlighted while reading, and your notes.</p></div></div>
        <div class="home-grid">
          <div>
            <section class="panel"><h2>Needs work <small class="muted" style="font-weight:400">${work.length}</small></h2>
              ${work.length ? `<ul class="mark-list">${work.map(hl).join('')}</ul>` : '<p class="empty">Select text in any lesson and choose <em>Needs work</em> to collect it here.</p>'}</section>
            <section class="panel"><h2>Key ideas <small class="muted" style="font-weight:400">${key.length}</small></h2>
              ${key.length ? `<ul class="mark-list">${key.map(hl).join('')}</ul>` : '<p class="empty">Nothing marked as a key idea yet.</p>'}</section>
            ${notes.length ? `<section class="panel"><h2>Your notes</h2><ul class="mark-list">${notes.map(([id, v]) => `<li><div class="src"><a href="#/lesson/${id}?tab=notes">Lesson ${id}: ${escapeHTML(lessonById(id)?.title ?? '')}</a></div><div class="prose">${md(v.length > 500 ? `${v.slice(0, 500)}…` : v)}</div></li>`).join('')}</ul></section>` : ''}
          </div>
          <aside>
            <section class="panel"><h2>Bookmarks</h2>
              ${groups.length ? groups.map(([k, list]) => `<h3 class="eyebrow" style="margin:16px 0 8px">${KIND[k]}</h3><ul class="mark-list">${list.map((b) => `<li><div class="src"><a href="${hrefFor(b)}">${mdInline(b.title || '')}</a><span style="flex:1"></span><button class="btn icon sm quiet" data-bm="${b.id}" title="Remove">${icon('x')}</button></div></li>`).join('')}</ul>`).join('') : '<p class="empty">Use the bookmark icon on lessons, sections, problems and Lab setups.</p>'}
            </section>
          </aside>
        </div>
      </div>`;
    host.querySelectorAll('[data-hl]').forEach((b) => (b.onclick = () => { removeHighlight(b.dataset.hl); toast('Removed'); render(); }));
    host.querySelectorAll('[data-bm]').forEach((b) => (b.onclick = () => { store.update((st) => { st.bookmarks = st.bookmarks.filter((x) => x.id !== b.dataset.bm); }); toast('Removed'); render(); }));
  };
  render();
}
