import { LESSONS, lessonById, mistakeInfo } from '../content/course.js';
import { store, recordAttempt } from '../lib/store.js';
import { icon, escapeHTML } from '../lib/ui.js';
import { allProblems, lessonsForExam, latestAttempts, rng, stratified, scoreMock } from '../lib/pool.js';
import { problemCard } from './components.js';

const EXAMS = { 2: { name: 'Exam 2', n: 12, minutes: 60 }, 1: { name: 'Exam 1', n: 12, minutes: 60 }, 3: { name: 'Final', n: 20, minutes: 120 } };

export default function mock(host, { params }) {
  let timer = 0;
  const start = (exam) => {
    const cfg = EXAMS[exam];
    const ids = new Set(lessonsForExam(LESSONS, exam).map((l) => l.id));
    const seen = new Set(latestAttempts(store.get().attempts).keys());
    const items = stratified(allProblems(LESSONS).filter((x) => ids.has(x.lesson.id)), cfg.n, rng(Date.now()), { preferUnseen: seen });
    const picks = items.map(() => null);
    const ends = Date.now() + cfg.minutes * 60000;
    host.innerHTML = `
      <div class="page">
        <p class="muted" style="margin:0 0 4px">No notes, no calculator. You can change answers until you hand it in.</p>
        <div class="mock-bar">
          <h1>${cfg.name} mock · ${items.length} questions</h1>
          <div class="right"><span class="answered muted">0/${items.length} answered</span><span class="timer" aria-live="off"></span><button class="btn primary" data-act="submit">${icon('check')}Hand it in</button></div>
        </div>
        <div class="practice-list"></div>
        <p style="margin-top:20px"><button class="btn primary" data-act="submit2">${icon('check')}Hand it in</button></p>
      </div>`;
    const list = host.querySelector('.practice-list');
    const cards = items.map((it, i) => {
      const card = problemCard({
        lesson: it.lesson, problem: it.problem, number: `${i + 1}.`, mode: 'mock',
        onAnswer: (r) => { picks[i] = r.choice; host.querySelector('.answered').textContent = `${picks.filter((p) => p != null).length}/${items.length} answered`; },
      });
      list.appendChild(card);
      return card;
    });
    const timerEl = host.querySelector('.timer');
    const tick = () => {
      const left = Math.max(0, ends - Date.now());
      const m = Math.floor(left / 60000);
      const s = Math.floor((left % 60000) / 1000);
      timerEl.textContent = `${m}:${String(s).padStart(2, '0')}`;
      timerEl.classList.toggle('low', left < 5 * 60000);
      if (left <= 0) submit(true);
    };
    tick();
    timer = setInterval(tick, 1000);
    const submit = (auto = false) => {
      if (!auto && picks.some((p) => p == null) && !confirm(`${picks.filter((p) => p == null).length} question(s) are blank. Hand it in anyway?`)) return;
      clearInterval(timer);
      items.forEach((it, i) => {
        if (picks[i] == null) return;
        const ch = it.problem.choices[picks[i]];
        recordAttempt({ lesson: it.lesson.id, problem: it.problem.id, choice: picks[i], correct: !!ch.correct, mistake: ch.correct ? null : ch.mistake ?? 'setup', mode: 'mock' });
      });
      cards.forEach((c) => c.reveal());
      const r = scoreMock(items, picks);
      const usedMin = Math.round((Date.now() - (ends - cfg.minutes * 60000)) / 60000);
      store.update((s) => { (s.mocks ??= []).push({ exam, at: Date.now(), correct: r.correct, total: r.total, minutes: usedMin }); });
      host.querySelector('.mock-bar').previousElementSibling?.remove();
      host.querySelector('.mock-bar').outerHTML = `
        <div class="panel" style="margin-bottom:28px;display:grid;grid-template-columns:auto 1fr;gap:32px;align-items:center">
          <div><div class="score">${r.correct}/${r.total}</div><p style="text-align:center">${Math.round(r.pct * 100)}% · ${usedMin} min${auto ? ' · time ran out' : ''}</p></div>
          <div>
            <h2>By lesson</h2>
            <div class="class-bars">${r.byLesson.map((b) => `<a href="#/lesson/${b.id}?tab=practice"><span class="name">L${b.id} ${escapeHTML(lessonById(b.id).title)}</span><span class="bar"><i style="width:${(b.right / b.total) * 100}%"></i></span><span class="pct">${b.right}/${b.total}</span></a>`).join('')}</div>
            ${r.byMistake.length ? `<h2 style="margin-top:20px">What went wrong</h2><ul class="weak-list">${r.byMistake.slice(0, 6).map((m) => `<li><span class="count">${m.count}×</span><span>${m.mistake === 'blank' ? 'Left blank' : escapeHTML(mistakeInfo(lessonById(m.lesson), m.mistake).title)}<small>Lesson ${m.lesson}</small></span></li>`).join('')}</ul>` : '<p class="greenpen">Clean sheet.</p>'}
            <p style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap"><a class="btn" href="#/practice?mode=retry">${icon('redpen')}Redo the misses</a><button class="btn quiet" data-act="again">${icon('reset')}Another mock</button></p>
          </div>
        </div>`;
      host.querySelectorAll('[data-act=submit2]').forEach((b) => b.remove());
      host.querySelector('[data-act=again]').onclick = () => intro();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    host.querySelector('[data-act=submit]').onclick = () => submit();
    host.querySelector('[data-act=submit2]').onclick = () => submit();
  };

  const intro = () => {
    clearInterval(timer);
    const past = (store.get().mocks ?? []).slice(-6).reverse();
    host.innerHTML = `
      <div class="page">
        <div class="page-head"><div><h1>Mock exam</h1><p>A timed, multiple-choice exam drawn evenly from the exam's lessons, using problems you haven't seen first. Results count toward your progress.</p></div></div>
        <div class="home-grid">
          <section class="panel">
            <h2>Start one</h2>
            ${['2', '1', '3'].map((k) => [k, EXAMS[k]]).map(([k, c]) => `<p><button class="btn ${k === '2' ? 'primary' : ''}" data-exam="${k}">${icon('mock')}${c.name}: ${c.n} questions, ${c.minutes} min</button></p>`).join('')}
          </section>
          <section class="panel">
            <h2>Past mocks</h2>
            ${past.length ? `<table class="table"><tbody>${past.map((m) => `<tr><td>${new Date(m.at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</td><td>${EXAMS[m.exam]?.name ?? ''}</td><td><b>${m.correct}/${m.total}</b></td><td>${m.minutes} min</td></tr>`).join('')}</tbody></table>` : '<p class="empty">None yet.</p>'}
          </section>
        </div>
      </div>`;
    host.querySelectorAll('[data-exam]').forEach((b) => (b.onclick = () => start(Number(b.dataset.exam))));
  };

  if (params.start) start(Number(params.start) || 2);
  else intro();
  return { dispose: () => clearInterval(timer) };
}
