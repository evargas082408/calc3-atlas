import { LESSONS, lessonById } from '../content/course.js';
import { store, masteryOf, mistakeTally } from '../lib/store.js';
import { icon, escapeHTML } from '../lib/ui.js';
import { allProblems, lessonsForExam, missedKeys, weakLessons, rng, stratified } from '../lib/pool.js';
import { problemCard } from './components.js';

const MODES = [
  ['exam2', 'Exam 2 mix'], ['weak', 'My weak lessons'], ['retry', 'Redo my misses'], ['lesson', 'One lesson'], ['exam1', 'Exam 1 mix'], ['final', 'Final (all)'],
];

export default function practice(host, { params }) {
  let mode = params.mode ?? (params.l ? 'lesson' : 'exam2');
  let lessonId = Number(params.l ?? 17);
  let seed = Date.now();

  const render = () => {
    const pool = allProblems(LESSONS);
    let items = [];
    let note = '';
    const s = store.get();
    if (mode === 'lesson') {
      items = pool.filter((x) => x.lesson.id === lessonId);
    } else if (mode === 'retry') {
      const keys = new Set(missedKeys(s.attempts));
      items = pool.filter((x) => keys.has(x.key));
      note = items.length ? `${items.length} problem${items.length === 1 ? '' : 's'} whose last answer was wrong. Get one right and it leaves this list.` : 'Nothing to redo: your latest answer on every problem you tried is right.';
    } else if (mode === 'weak') {
      const weak = weakLessons(LESSONS, masteryOf, mistakeTally()).slice(0, 4);
      if (weak.length) {
        const ids = new Set(weak.map((l) => l.id));
        items = stratified(pool.filter((x) => ids.has(x.lesson.id)), 10, rng(seed));
        note = `Drawing from ${weak.map((l) => `L${l.id}`).join(', ')}: the lessons where you're missing the most.`;
      } else {
        note = 'No weak lessons yet. Answer a few problems first; this mode then targets whatever you miss.';
      }
    } else {
      const exam = mode === 'exam1' ? 1 : mode === 'final' ? 3 : 2;
      const ids = new Set(lessonsForExam(LESSONS, exam).map((l) => l.id));
      items = stratified(pool.filter((x) => ids.has(x.lesson.id)), 10, rng(seed));
    }

    host.innerHTML = `
      <div class="page">
        <div class="page-head">
          <div><h1>Practice</h1><p>Pick an answer. If it is wrong, you see what probably went wrong, the right step, and the full solution. Misses are saved to your Mistakes page.</p></div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
            ${mode !== 'lesson' && mode !== 'retry' ? `<button class="btn" data-act="new">${icon('reset')}New set</button>` : ''}
          </div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:24px"><div class="seg" role="tablist" aria-label="Practice mode">
          ${MODES.map(([k, label]) => `<button class="step-btn" data-mode="${k}" aria-pressed="${k === mode}">${label}</button>`).join('')}</div>
          ${mode === 'lesson' ? `<select class="select" data-act="lesson" aria-label="Lesson">${LESSONS.filter((l) => l.content).map((l) => `<option value="${l.id}" ${l.id === lessonId ? 'selected' : ''}>L${l.id} ${escapeHTML(l.title)}</option>`).join('')}</select>` : ''}
        </div>
        ${note ? `<p class="empty" style="margin-bottom:20px">${escapeHTML(note)}</p>` : ''}
        <div class="practice-list"></div>
        <p class="session-score empty" style="margin-top:18px"></p>
      </div>`;
    const list = host.querySelector('.practice-list');
    let right = 0;
    let done = 0;
    const score = host.querySelector('.session-score');
    items.forEach((it, i) => list.appendChild(problemCard({
      lesson: it.lesson,
      problem: it.problem,
      number: `${i + 1}.`,
      mode: mode === 'retry' ? 'retry' : 'practice',
      onAnswer: (r) => {
        done += 1;
        if (r.correct) right += 1;
        score.textContent = `This set: ${right} of ${done} right${done === items.length ? '. Done.' : ''}`;
      },
    })));
    host.querySelectorAll('[data-mode]').forEach((b) => (b.onclick = () => { mode = b.dataset.mode; seed = Date.now(); history.replaceState(null, '', `#/practice?mode=${mode}${mode === 'lesson' ? `&l=${lessonId}` : ''}`); render(); }));
    host.querySelector('[data-act=new]')?.addEventListener('click', () => { seed = Date.now(); render(); });
    host.querySelector('[data-act=lesson]')?.addEventListener('change', (e) => { lessonId = Number(e.target.value); history.replaceState(null, '', `#/practice?mode=lesson&l=${lessonId}`); render(); });
    if (!lessonById(lessonId)?.content) lessonId = 17;
  };
  render();
}
