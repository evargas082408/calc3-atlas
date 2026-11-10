// Lecture videos play right on the site through Purdue's Kaltura player.
// The notes are copies served by this site (scripts/copy-notes.py): Purdue's math server won't let other sites frame the originals.
import { CHEN_LESSONS, CHEN_REVIEWS, CHENFLIX } from '../content/chenflix.js';
import { LOCAL_NOTES } from '../content/notes-local.js';
import { store } from '../lib/store.js';
import { h, icon, escapeHTML } from '../lib/ui.js';

const PARTNER = 983291; // Purdue's Kaltura account (the same one MediaSpace uses)
const UICONF = 56090002;

export const entryOf = (url) => /(\d_[a-z0-9]{8})(?:[/?#]|$)/.exec(String(url ?? ''))?.[1] ?? null;
export const kalturaSrc = (entry) => `https://cdnapisec.kaltura.com/p/${PARTNER}/embedPlaykitJs/uiconf_id/${UICONF}?iframeembed=true&entry_id=${encodeURIComponent(entry)}`;
// The copy of a notes page this site serves, or null if it was never copied.
export const localNotes = (url) => LOCAL_NOTES[url] ?? null;

const frame = (entry, title) => `<div class="player"><iframe src="${kalturaSrc(entry)}" title="${escapeHTML(title)}" allow="autoplay *; fullscreen *; encrypted-media *; picture-in-picture *" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;
// The notes run their own scripts (MathJax, Tailwind), so they get an isolated origin with no access to the site's storage.
const notesFrame = (src, title) => `<iframe class="notes-frame" src="${src}" title="${escapeHTML(title)}" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox" loading="lazy"></iframe>`;

export const chenFor = (id) => CHEN_LESSONS.find((c) => c.id === id) ?? null;
export { CHEN_REVIEWS, CHENFLIX };

// Every lecture this lesson has, as { key, who, term, entry, notes }.
export function lecturesFor(L) {
  const out = [];
  const own = entryOf(L.video);
  if (own) out.push({ key: 'sunkula', who: 'Prof. Sunkula', term: 'Spring 2026, this course', entry: own, notes: L.notes, page: L.video });
  const c = chenFor(L.id);
  if (c) out.push({ key: 'chen', who: 'Prof. Chen', term: 'Spring 2023, Chenflix', entry: c.entry, notes: c.notes, page: CHENFLIX, extras: c.extras ?? [] });
  return out;
}

// Every set of notes this lesson has, as { key, label, url, local }.
export function notesFor(L) {
  const out = [];
  if (L.notes) out.push({ key: 'sunkula', label: "Sunkula's notes", url: L.notes });
  const c = chenFor(L.id);
  if (c?.notes) out.push({ key: 'chen', label: "Chen's notes", url: c.notes });
  for (const e of c?.extras ?? []) if (e.url) out.push({ key: `extra-${out.length}`, label: e.label, url: e.url });
  return out.map((n) => ({ ...n, local: localNotes(n.url) }));
}

// The Lecture tab on a lesson page: the video, then the notes underneath.
export function lecturePanel(host, L) {
  const list = lecturesFor(L);
  const notes = notesFor(L);
  const shown = notes.filter((n) => n.local);
  if (!list.length && !notes.length) {
    host.innerHTML = '<p class="empty">No recording or notes for this lesson.</p>';
    return;
  }
  let key = store.get().settings.lectureSource;
  if (!list.some((x) => x.key === key)) key = list[0]?.key;
  // The notes follow the lecturer you're watching until you pick a set yourself.
  let noteKey = null;
  const render = () => {
    const cur = list.find((x) => x.key === key);
    const nk = noteKey ?? (shown.some((n) => n.key === key) ? key : shown[0]?.key);
    const nc = shown.find((n) => n.key === nk);
    host.innerHTML = `
      <div class="lecture">
        ${cur ? `<div class="lecture-head">
          <div class="seg" role="tablist" aria-label="Lecturer">${list.map((x) => `<button class="step-btn" role="tab" data-src="${x.key}" aria-pressed="${x.key === key}">${x.who} <span class="muted">· ${x.term}</span></button>`).join('')}</div>
        </div>
        ${frame(cur.entry, `${cur.who}, Lesson ${L.id}: ${L.title}`)}` : ''}
        <div class="lecture-links">
          ${(cur?.extras ?? []).filter((e) => e.entry).map((e) => `<button class="btn sm" data-extra="${e.entry}">${icon('play')}${escapeHTML(e.label)}</button>`).join('')}
          ${notes.filter((n) => !n.local).map((n) => `<a class="btn sm" href="${n.url}" target="_blank" rel="noopener">${icon('notes')}${escapeHTML(n.label)}${icon('external', 'trail')}</a>`).join('')}
          <a class="btn sm quiet" href="${CHENFLIX}" target="_blank" rel="noopener">All Chenflix lectures${icon('external', 'trail')}</a>
        </div>
        ${nc ? `<section class="notes-reader" aria-label="Lecture notes">
          <div class="notes-head">
            <div class="seg" role="tablist" aria-label="Notes">${shown.map((n) => `<button class="step-btn" role="tab" data-notes="${n.key}" aria-pressed="${n.key === nk}">${escapeHTML(n.label)}</button>`).join('')}</div>
            <a class="btn sm quiet" href="${nc.local}" target="_blank" rel="noopener" title="Open these notes on their own page">Full page${icon('external', 'trail')}</a>
            <a class="btn sm quiet" href="${nc.url}" target="_blank" rel="noopener" title="The professor's original page">Original${icon('external', 'trail')}</a>
          </div>
          ${notesFrame(nc.local, `${nc.label}, Lesson ${L.id}`)}
        </section>` : ''}
      </div>`;
    host.querySelectorAll('[data-src]').forEach((b) => (b.onclick = () => {
      key = b.dataset.src;
      store.update((s) => { s.settings.lectureSource = key; });
      render();
    }));
    host.querySelectorAll('[data-notes]').forEach((b) => (b.onclick = () => { noteKey = b.dataset.notes; render(); }));
    host.querySelectorAll('[data-extra]').forEach((b) => (b.onclick = () => openPlayer({ title: b.textContent.trim(), entry: b.dataset.extra })));
  };
  render();
}

function modal(title, inner, extra = '') {
  const dlg = h(`
    <div class="player-modal" role="dialog" aria-modal="true" aria-label="${escapeHTML(title)}">
      <div class="player-box">
        <div class="player-bar"><strong>${escapeHTML(title)}</strong>${extra}
          <button class="btn icon sm quiet" data-act="close" title="Close (Esc)">${icon('x')}</button></div>
        ${inner}
      </div>
    </div>`);
  const close = () => { dlg.remove(); document.removeEventListener('keydown', onKey); window.removeEventListener('hashchange', close); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.closest('[data-act=close]')) close(); });
  document.addEventListener('keydown', onKey);
  window.addEventListener('hashchange', close);
  document.body.appendChild(dlg);
  dlg.querySelector('[data-act=close]').focus();
  return dlg;
}

// A video in a dialog, for review sessions and extras.
export function openPlayer({ title, entry, notes }) {
  const link = notes ? `<a class="btn sm quiet" href="${localNotes(notes) ?? notes}" target="_blank" rel="noopener">${icon('notes')}Notes${icon('external', 'trail')}</a>` : '';
  return modal(title, frame(entry, title), link);
}

// Notes in a dialog. Without a copy, the original opens in a new tab instead.
export function openNotes({ title, url }) {
  const local = localNotes(url);
  if (!local) {
    window.open(url, '_blank', 'noopener');
    return null;
  }
  const dlg = modal(title, notesFrame(local, title), `<a class="btn sm quiet" href="${url}" target="_blank" rel="noopener">Original${icon('external', 'trail')}</a>`);
  dlg.classList.add('notes-modal');
  return dlg;
}
