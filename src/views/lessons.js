import { LESSONS, UNITS, REVIEWS } from '../content/course.js';
import { masteryOf, store } from '../lib/store.js';
import { dots, escapeHTML, icon } from '../lib/ui.js';
import { CHEN_REVIEWS, CHENFLIX, chenFor, openPlayer } from './media.js';

export default function lessons(host, { params }) {
  let filter = params.f ?? 'all';
  const render = () => {
    const list = LESSONS.filter((l) => filter === 'all' || (filter === 'e1' && l.exam === 1) || (filter === 'e2' && l.id >= 17 && l.id <= 31) || (filter === 'final' && l.id >= 32) || (filter === 'weak' && masteryOf(l.id).tries && masteryOf(l.id).rate < 0.6) || (filter === 'new' && !masteryOf(l.id).tries));
    host.innerHTML = `
      <div class="page">
        <div class="page-head">
          <div><h1>Lessons</h1><p>All 37 lessons of MA 261 (Spring 2026, Sunkula). Each one has the ideas, a 3D picture, a formula card, common mistakes, and exam-style problems.</p></div>
          <div class="seg" role="tablist" aria-label="Filter">
            ${[['all', 'All'], ['e2', 'Exam 2 (17–31)'], ['e1', 'Exam 1 (1–16)'], ['final', 'Final only'], ['weak', 'Weak'], ['new', 'Not started']].map(([k, label]) => `<button class="step-btn" data-f="${k}" aria-pressed="${filter === k}">${label}</button>`).join('')}
          </div>
        </div>
        <div class="table-wrap"><table class="table">
          <thead><tr><th>#</th><th>Lesson</th><th class="hide-sm">Section</th><th>Progress</th><th class="hide-sm">Problems</th><th class="hide-sm">Lecture</th></tr></thead>
          <tbody>
          ${list.map((l) => { const m = masteryOf(l.id); return `<tr>
            <td class="num">${l.id}</td>
            <td><a class="lesson-name" href="#/lesson/${l.id}">${escapeHTML(l.title)}</a><small>${escapeHTML(l.blurb || '')}</small></td>
            <td class="hide-sm muted">${escapeHTML(l.section)}</td>
            <td>${dots(m.level)} ${m.tries ? `<small class="muted">${m.correct}/${m.tries}</small>` : ''}</td>
            <td class="hide-sm muted">${l.content?.problems?.length ?? 0}</td>
            <td class="hide-sm"><a class="btn icon sm quiet" href="#/lesson/${l.id}?tab=lecture" title="Watch the lecture (Sunkula or Chen)">${icon('play')}</a><a class="btn icon sm quiet" href="${l.notes}" target="_blank" rel="noopener" title="Sunkula's notes (new tab)">${icon('notes')}</a>${chenFor(l.id) ? `<a class="btn icon sm quiet chen" href="${chenFor(l.id).notes}" target="_blank" rel="noopener" title="Chen's notes (new tab)">${icon('notes')}</a>` : ''}</td>
          </tr>`; }).join('')}
          ${list.length ? '' : '<tr><td colspan="6" class="empty">Nothing matches this filter yet.</td></tr>'}
          </tbody>
        </table></div>
        <section class="section"><h2>Review sessions</h2>
          <h3 class="eyebrow" style="margin:16px 0 8px">Prof. Chen's review videos (Chenflix, Spring 2023)</h3>
          <p class="review-row">${CHEN_REVIEWS.map((r, i) => `<button class="btn sm" data-review="${i}">${icon('play')}${escapeHTML(r.title)}</button>`).join('')}<a class="btn sm quiet" href="${CHENFLIX}" target="_blank" rel="noopener">Chenflix${icon('external', 'trail')}</a></p>
          <h3 class="eyebrow" style="margin:20px 0 8px">Prof. Sunkula's review notes (new tab)</h3>
          <p class="review-row">${REVIEWS.map((r) => `<a class="btn sm" href="${r.notes}" target="_blank" rel="noopener">${icon('notes')}${escapeHTML(r.title)}</a>`).join('')}</p></section>
      </div>`;
    host.querySelectorAll('[data-review]').forEach((b) => (b.onclick = () => { const r = CHEN_REVIEWS[Number(b.dataset.review)]; openPlayer({ title: `Prof. Chen: ${r.title}`, entry: r.entry, notes: r.notes }); }));
    host.querySelectorAll('[data-f]').forEach((b) => (b.onclick = () => { filter = b.dataset.f; render(); }));
  };
  render();
}
