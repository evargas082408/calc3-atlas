// Lecture videos play right on the site through Purdue's Kaltura player.
// Notes live on www.math.purdue.edu, which only lets Purdue pages frame them, so those open in a new tab.
import { CHEN_LESSONS, CHEN_REVIEWS, CHENFLIX } from '../content/chenflix.js';
import { store } from '../lib/store.js';
import { h, icon, escapeHTML } from '../lib/ui.js';

const PARTNER = 983291; // Purdue's Kaltura account (the same one MediaSpace uses)
const UICONF = 56090002;

export const entryOf = (url) => /(\d_[a-z0-9]{8})(?:[/?#]|$)/.exec(String(url ?? ''))?.[1] ?? null;
export const kalturaSrc = (entry) => `https://cdnapisec.kaltura.com/p/${PARTNER}/embedPlaykitJs/uiconf_id/${UICONF}?iframeembed=true&entry_id=${encodeURIComponent(entry)}`;

const frame = (entry, title) => `<div class="player"><iframe src="${kalturaSrc(entry)}" title="${escapeHTML(title)}" allow="autoplay *; fullscreen *; encrypted-media *; picture-in-picture *" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

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

// The Lecture tab on a lesson page.
export function lecturePanel(host, L) {
  const list = lecturesFor(L);
  if (!list.length) {
    host.innerHTML = '<p class="empty">No recording for this lesson.</p>';
    return;
  }
  let key = store.get().settings.lectureSource;
  if (!list.some((x) => x.key === key)) key = list[0].key;
  const render = () => {
    const cur = list.find((x) => x.key === key);
    host.innerHTML = `
      <div class="lecture">
        <div class="lecture-head">
          <div class="seg" role="tablist" aria-label="Lecturer">${list.map((x) => `<button class="step-btn" role="tab" data-src="${x.key}" aria-pressed="${x.key === key}">${x.who} <span class="muted">· ${x.term}</span></button>`).join('')}</div>
        </div>
        ${frame(cur.entry, `${cur.who}, Lesson ${L.id}: ${L.title}`)}
        <div class="lecture-links">
          ${list.map((x) => `<a class="btn sm" href="${x.notes}" target="_blank" rel="noopener">${icon('notes')}${x.who.replace('Prof. ', '')}'s notes${icon('external', 'trail')}</a>`).join('')}
          ${(cur.extras ?? []).map((e) => e.entry ? `<button class="btn sm" data-extra="${e.entry}">${icon('play')}${escapeHTML(e.label)}</button>` : `<a class="btn sm" href="${e.url}" target="_blank" rel="noopener">${icon('notes')}${escapeHTML(e.label)}${icon('external', 'trail')}</a>`).join('')}
          <a class="btn sm quiet" href="${CHENFLIX}" target="_blank" rel="noopener">All Chenflix lectures${icon('external', 'trail')}</a>
        </div>
        <p class="muted lecture-note">The notes open in a new tab: Purdue's math server only lets Purdue's own pages show them inside a page.</p>
      </div>`;
    host.querySelectorAll('[data-src]').forEach((b) => (b.onclick = () => {
      key = b.dataset.src;
      store.update((s) => { s.settings.lectureSource = key; });
      render();
    }));
    host.querySelectorAll('[data-extra]').forEach((b) => (b.onclick = () => openPlayer({ title: b.textContent.trim(), entry: b.dataset.extra })));
  };
  render();
}

// A video in a dialog, for review sessions and extras.
export function openPlayer({ title, entry, notes }) {
  const dlg = h(`
    <div class="player-modal" role="dialog" aria-modal="true" aria-label="${escapeHTML(title)}">
      <div class="player-box">
        <div class="player-bar"><strong>${escapeHTML(title)}</strong>
          ${notes ? `<a class="btn sm quiet" href="${notes}" target="_blank" rel="noopener">${icon('notes')}Notes${icon('external', 'trail')}</a>` : ''}
          <button class="btn icon sm quiet" data-act="close" title="Close (Esc)">${icon('x')}</button></div>
        ${frame(entry, title)}
      </div>
    </div>`);
  const close = () => { dlg.remove(); document.removeEventListener('keydown', onKey); window.removeEventListener('hashchange', close); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.closest('[data-act=close]')) close(); });
  document.addEventListener('keydown', onKey);
  window.addEventListener('hashchange', close);
  document.body.appendChild(dlg);
  dlg.querySelector('[data-act=close]').focus();
}
