import { LESSONS, UNITS, PLAN, BOILER, lessonById, mistakeInfo, EXAM_DEFAULT } from '../content/course.js';
import { store, masteryOf, mistakeTally, examDate } from '../lib/store.js';
import { dots, escapeHTML, icon } from '../lib/ui.js';

const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// BoilerExams topic -> lesson it belongs to (for the "where the class loses points" list).
const TOPIC_LESSON = {
  'Lagrange Multipliers': 17, 'Double integral on a rectangle': 18, 'Reverse Order of Integration': 19, 'Double Integrals': 19,
  'Polar Double Integration': 20, 'Triple Integrals': 21, 'Cylindrical Integration': 22, 'Spherical Integration': 23,
  'Integration for Mass': 24, 'Vector Field ID': 25, 'Line Integral - ds': 26, 'Line Integral - work done': 27,
  'Conservative Fields': 28, 'Fundamental Theorem of Line Integrals': 28, 'Greens Theorem': 29, 'Divergence  and Curl': 30,
  'Surface Area Integration': 31, 'Parametric Surfaces': 31, 'Surface Integrals': 32, 'Flux Integrals': 33,
  'Stokes Theorem': 34, 'Divergence Theorem': 36, 'Min Max': 15, 'Tangent Planes': 14, 'Chain Rule': 12,
  'Gradient Vector': 13, 'Directional Derivative': 13, 'Partial Derivatives': 11, '3D Limits': 10, 'Level Curves': 9,
  'Arc Length': 8, 'Curvature': 8, 'Particle Motion': 7, 'Planes': 2, 'Line Parameterization': 2, 'Surface ID': 4,
};

const TRY = ['y = x^2', 'z = x^2 - y^2', '<cos t, sin t, t/4>', 'F = <-y, x>', 'x^2 + y^2 - z^2 = 1', 'why the extra r in polar?', 'when do I use Green’s theorem?'];

export default function home(host) {
  const s = store.get();
  const now = new Date();
  const today = ymd(now);
  const idx = PLAN.findIndex((p) => p.date === today);
  const plan = idx >= 0 ? PLAN[idx] : PLAN.find((p) => p.date > today) ?? null;
  const tally = mistakeTally();
  const exam = examDate(EXAM_DEFAULT.iso);
  const examName = s.settings.examName || EXAM_DEFAULT.name;
  const ms = exam - Date.now();
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const progress = Math.max(0, Math.min(1, 1 - days / 30));
  const practiced = LESSONS.filter((l) => masteryOf(l.id).tries).length;

  const headline = ms <= 0 ? 'Calc 3, one lesson at a time' : days >= 1 ? `${days} day${days === 1 ? '' : 's'} until ${escapeHTML(examName)}` : `${escapeHTML(examName)} is in ${hours} hour${hours === 1 ? '' : 's'}`;

  const planHTML = plan
    ? `<p class="day">${new Date(`${plan.date}T12:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}${plan.date === today ? ' · today' : ' · next'}</p>
       <p class="task">${escapeHTML(plan.task)}</p>
       <ol>${plan.lessons.map((id) => { const l = lessonById(id); const m = masteryOf(id); return `<li><a href="#/lesson/${id}"><span class="num">${id}</span><span style="flex:1"><strong>${escapeHTML(l.title)}</strong><br><small>${m.tries ? `${m.correct} of ${m.tries} right so far` : 'Not practiced yet'} · §${l.section}</small></span>${dots(m.level)}</a></li>`; }).join('')}
       ${!plan.lessons.length ? `<li><a href="#/mock"><span class="num">${icon('mock')}</span><span><strong>Timed mock exam</strong><br><small>12 questions, 60 minutes</small></span></a></li><li><a href="#/redpen"><span class="num">${icon('redpen')}</span><span><strong>Redo your misses</strong><br><small>${tally.length} mistake pattern${tally.length === 1 ? '' : 's'} logged</small></span></a></li>` : ''}</ol>
       <div class="week" aria-label="Study plan">${PLAN.slice(Math.max(0, (idx >= 0 ? idx : 0) - 1), Math.max(0, (idx >= 0 ? idx : 0) - 1) + 6).map((p) => `<div class="${p.date < today ? 'past' : p.date === today ? 'now' : ''}" title="${escapeHTML(p.task)}">${new Date(`${p.date}T12:00`).toLocaleDateString(undefined, { weekday: 'short' })}<br>${p.lessons.length ? `L${p.lessons.join(', ')}` : 'Mock'}</div>`).join('')}</div>`
    : '<p class="empty">The study plan is finished. Use Practice to keep weak lessons fresh.</p>';

  const weakHTML = tally.length
    ? `<ul class="weak-list">${tally.slice(0, 5).map((t) => { const l = lessonById(t.lesson); const m = mistakeInfo(l, t.mistake); return `<li><span class="count">${t.count}×</span><span><a href="#/lesson/${t.lesson}?tab=mistakes">${escapeHTML(m.title)}</a><small>Lesson ${t.lesson} · ${escapeHTML(l.title)}</small></span></li>`; }).join('')}</ul>
       <p style="margin:18px 0 0"><a class="btn sm" href="#/practice?mode=weak">${icon('practice')}Practice these</a></p>`
    : '<p class="empty">No mistakes yet. When you miss a practice problem, the site works out what went wrong and lists it here.</p>';

  const boiler = Object.entries(BOILER)
    .filter(([name]) => TOPIC_LESSON[name] >= 17 && TOPIC_LESSON[name] <= 31)
    .sort((a, b) => a[1].acc - b[1].acc)
    .slice(0, 8);

  host.innerHTML = `
    <div class="page">
      <section class="hero">
        <div>
          <h1>${headline}</h1>
          <p>Lessons with 3D pictures you can rotate, practice problems that explain your mistakes, and a lab that animates any function you type.</p>
          <div class="hero-actions" style="margin-top:22px">
            ${plan?.lessons.length ? `<a class="btn primary" href="#/lesson/${plan.lessons[0]}">${icon('lessons')}Continue with Lesson ${plan.lessons[0]}</a>` : `<a class="btn primary" href="#/mock">${icon('mock')}Take a mock exam</a>`}
            <a class="btn" href="#/lab">${icon('lab')}Open the 3D Lab</a>
            <button class="btn" data-open-palette>${icon('search')}Ask a question</button>
          </div>
        </div>
        ${ms > 0 ? `<div class="countdown-card">
          <div><div class="big">${days}<span style="font-size:1rem;color:var(--ink-3);font-weight:500"> d ${hours} h</span></div><div class="lbl">until ${escapeHTML(examName)}</div></div>
          <div style="min-width:160px"><div class="lbl">${exam.toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</div><div class="progress"><i style="width:${Math.round(progress * 100)}%"></i></div><div class="lbl" style="margin-top:6px">${practiced} of 37 lessons practiced</div></div>
        </div>` : ''}
      </section>

      <div class="home-grid">
        <section class="panel today"><h2>Today’s plan</h2>${planHTML}</section>
        <section class="panel"><h2>Your mistakes</h2>${weakHTML}</section>
      </div>

      <section class="section">
        <div class="section-head"><h2>All lessons</h2><p>Blue numbers are on ${escapeHTML(examName)}. A red outline means you keep missing it.</p></div>
        ${UNITS.map((u) => `
          <div class="unit">
            <div class="unit-head"><h3>${u.name}</h3><span>Lessons ${u.range[0]}–${u.range[1]} · ${u.sheet}</span></div>
            <div class="tiles">
              ${LESSONS.filter((l) => l.id >= u.range[0] && l.id <= u.range[1]).map((l) => {
                const m = masteryOf(l.id);
                const weak = tally.some((t) => t.lesson === l.id && t.count >= 2) || (m.tries >= 3 && m.rate < 0.5);
                return `<a class="tile ${l.exam === 2 ? 'exam2' : ''} ${weak ? 'weak' : ''} ${l.content ? '' : 'missing'}" href="#/lesson/${l.id}">
                  <span class="n">${l.id}</span>
                  <span class="t">${escapeHTML(l.title)}</span>
                  <span class="meta">${dots(m.level)}<span>§${escapeHTML(l.section)}</span>${weak ? '<span class="chip weak">needs work</span>' : ''}</span>
                </a>`;
              }).join('')}
            </div>
          </div>`).join('')}
      </section>

      <div class="home-grid section">
        <section class="panel">
          <h2>Where past students lose points</h2>
          <p class="empty" style="margin-bottom:16px">Class accuracy on ${escapeHTML(examName)} topics from BoilerExams, lowest first.</p>
          <div class="class-bars">${boiler.map(([name, b]) => `<a href="#/lesson/${TOPIC_LESSON[name]}"><span class="name">${escapeHTML(name.replace(/\s+/g, ' '))} <small class="muted">L${TOPIC_LESSON[name]}</small></span><span class="bar"><i style="width:${Math.round(b.acc * 100)}%"></i></span><span class="pct">${Math.round(b.acc * 100)}%</span></a>`).join('')}</div>
        </section>
        <section class="panel">
          <h2>Try asking</h2>
          <p class="empty">Type math to watch it drawn step by step, or ask in your own words.</p>
          <div class="suggest">${TRY.map((q) => `<button data-q="${escapeHTML(q)}">${escapeHTML(q)}</button>`).join('')}</div>
        </section>
      </div>
    </div>`;
  host.querySelectorAll('[data-q]').forEach((b) => (b.onclick = () => (location.hash = `#/ask?q=${encodeURIComponent(b.dataset.q)}`)));
  host.querySelectorAll('[data-open-palette]').forEach((b) => (b.onclick = () => window.openPalette?.()));
}
