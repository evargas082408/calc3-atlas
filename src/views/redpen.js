import { LESSONS, lessonById, mistakeInfo, boilerFor } from '../content/course.js';
import { store, masteryOf, mistakeTally } from '../lib/store.js';
import { dots, escapeHTML, icon, relDays } from '../lib/ui.js';
import { md, mdInline } from '../lib/md.js';
import { missedKeys } from '../lib/pool.js';

export default function redpen(host) {
  const s = store.get();
  const tally = mistakeTally();
  const missed = missedKeys(s.attempts);
  const practiced = LESSONS.filter((l) => masteryOf(l.id).tries);
  const wrongLog = s.attempts.filter((a) => !a.correct).slice(-25).reverse();
  const total = s.attempts.length;
  const right = s.attempts.filter((a) => a.correct).length;

  if (!total) {
    host.innerHTML = `<div class="page"><div class="page-head"><div><h1>Mistakes</h1><p>Every wrong answer is sorted by the mistake behind it: what went wrong, how often, and in which lessons. It's empty because you haven't answered anything yet.</p></div></div>
      <p><a class="btn primary" href="#/practice">${icon('practice')}Start practicing</a> <a class="btn" href="#/mock">${icon('mock')}Take a mock</a></p></div>`;
    return;
  }

  host.innerHTML = `
    <div class="page">
      <div class="page-head">
        <div><h1>Mistakes</h1><p>${right} of ${total} answers right (${Math.round((right / total) * 100)}%). These are the mistakes you make most, worst first.</p></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${missed.length ? `<a class="btn primary" href="#/practice?mode=retry">${icon('redpen')}Redo ${missed.length} miss${missed.length === 1 ? '' : 'es'}</a>` : ''}
          <a class="btn" href="#/practice?mode=weak">${icon('practice')}Drill weak lessons</a>
        </div>
      </div>
      <div class="home-grid">
        <section class="panel">
          <h2>What keeps going wrong</h2>
          ${tally.length ? tally.slice(0, 12).map((t) => {
            const L = lessonById(t.lesson);
            const info = mistakeInfo(L, t.mistake);
            return `<div class="mistake" style="margin-bottom:10px">
              <h4>${icon('flag')}<span>${mdInline(info.title)}</span> <span style="margin-left:auto;color:var(--road);font-weight:600">${t.count}×</span></h4>
              <div class="why">${mdInline(info.why ?? '')}</div>
              ${info.wrong && info.right ? `<div><div class="lbl">Wrong</div><div class="wrong">${mdInline(info.wrong)}</div></div><div><div class="lbl">Right</div><div class="right">${mdInline(info.right)}</div></div>` : ''}
              <p class="src muted" style="font-size:0.82rem;margin:6px 0 0"><a href="#/lesson/${L.id}?tab=mistakes">Lesson ${L.id}: ${escapeHTML(L.title)}</a> · last ${relDays(new Date(t.last))} · ${t.problems.size} problem${t.problems.size === 1 ? '' : 's'}</p>
            </div>`;
          }).join('') : '<p class="greenpen">No mistakes logged.</p>'}
        </section>
        <aside>
          <section class="panel">
            <h2>You vs. the class</h2>
            <p class="empty" style="margin-bottom:10px">Your accuracy per lesson against past Purdue students on the matching BoilerExams topic.</p>
            <table class="table"><thead><tr><th>Lesson</th><th>You</th><th>Class</th></tr></thead><tbody>
              ${practiced.map((L) => { const m = masteryOf(L.id); const b = boilerFor(L); const cls = b.length ? b.reduce((a, x) => a + x.acc * x.q, 0) / b.reduce((a, x) => a + x.q, 0) : null; const you = m.correct / m.tries; return `<tr><td><a href="#/lesson/${L.id}">L${L.id}</a> ${dots(m.level)}</td><td style="color:${cls != null && you < cls ? 'var(--road)' : 'inherit'};font-weight:700">${Math.round(you * 100)}%</td><td>${cls != null ? `${Math.round(cls * 100)}%` : '—'}</td></tr>`; }).join('')}
            </tbody></table>
          </section>
          <section class="panel" style="margin-top:18px">
            <h2>Recent misses</h2>
            <ul class="mark-list">${wrongLog.map((a) => { const L = lessonById(a.lesson); const pr = L?.content?.problems.find((p) => p.id === a.problem); if (!pr) return ''; const info = mistakeInfo(L, a.mistake); return `<li><div class="src"><a href="#/lesson/${L.id}?tab=practice&p=${encodeURIComponent(pr.id)}">L${L.id}</a> · ${escapeHTML(a.mode ?? '')} · ${relDays(new Date(a.at))}</div><div>${md(pr.prompt.length > 200 ? `${pr.prompt.slice(0, 200)}…` : pr.prompt)}</div><div style="color:var(--road);font-size:0.86rem">${escapeHTML(info.title)}</div></li>`; }).join('')}</ul>
          </section>
        </aside>
      </div>
    </div>`;
}
