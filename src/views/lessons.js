import { LESSONS, UNITS, REVIEWS } from '../content/course.js';
import { masteryOf, store } from '../lib/store.js';
import { dots, escapeHTML, icon } from '../lib/ui.js';

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
            <td class="hide-sm"><a class="btn icon sm quiet" href="${l.video}" target="_blank" rel="noopener" title="Lecture recording">${icon('play')}</a><a class="btn icon sm quiet" href="${l.notes}" target="_blank" rel="noopener" title="Instructor notes">${icon('notes')}</a></td>
          </tr>`; }).join('')}
          ${list.length ? '' : '<tr><td colspan="6" class="empty">Nothing matches this filter yet.</td></tr>'}
          </tbody>
        </table></div>
        <section class="section"><h2>Review sessions</h2>
        <p style="display:flex;gap:8px;flex-wrap:wrap">${REVIEWS.map((r) => `<a class="btn sm" href="${r.notes}" target="_blank" rel="noopener">${icon('notes')}${escapeHTML(r.title)}</a>`).join('')}</p></section>
      </div>`;
    host.querySelectorAll('[data-f]').forEach((b) => (b.onclick = () => { filter = b.dataset.f; render(); }));
  };
  render();
}
