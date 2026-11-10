import { LESSONS } from '../content/course.js';
import { mdInline, tex } from '../lib/md.js';
import { escapeHTML, icon } from '../lib/ui.js';
import { lessonsForExam } from '../lib/pool.js';

export default function sheet(host, { params }) {
  let exam = Number(params.exam ?? 2);
  const render = () => {
    const list = lessonsForExam(LESSONS, exam).filter((l) => l.content?.formulas?.length);
    host.innerHTML = `
      <div class="page">
        <div class="page-head">
          <div><h1>Formulas</h1><p>Every lesson's formula card on one page. Print it, or hide the right side and quiz yourself.</p></div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <div class="seg">${[[2, 'Exam 2'], [1, 'Exam 1'], [3, 'Final']].map(([k, l]) => `<button class="step-btn" data-exam="${k}" aria-pressed="${k === exam}">${l}</button>`).join('')}</div>
            <button class="btn" data-act="quiz" aria-pressed="false">${icon('eyeOff')}Hide right sides</button>
            <button class="btn" data-act="print">${icon('download')}Print</button>
          </div>
        </div>
        <div class="sheet">
          ${list.map((L) => `<div class="formula-card"><h4><a href="#/lesson/${L.id}">L${L.id} · ${escapeHTML(L.title)}</a></h4><dl>${L.content.formulas.map((f) => `<dt>${mdInline(f.label)}</dt><dd>${tex(f.tex, false)}</dd>`).join('')}</dl></div>`).join('')}
        </div>
      </div>`;
    host.querySelectorAll('[data-exam]').forEach((b) => (b.onclick = () => { exam = Number(b.dataset.exam); history.replaceState(null, '', `#/sheet?exam=${exam}`); render(); }));
    host.querySelector('[data-act=print]').onclick = () => window.print();
    const quiz = host.querySelector('[data-act=quiz]');
    quiz.onclick = () => {
      const on = quiz.getAttribute('aria-pressed') !== 'true';
      quiz.setAttribute('aria-pressed', String(on));
      host.querySelector('.sheet').classList.toggle('quiz', on);
    };
  };
  render();
}
