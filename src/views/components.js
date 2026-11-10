import { md, mdInline } from '../lib/md.js';
import { h, icon, LETTERS, shuffleSeeded, toast, escapeHTML } from '../lib/ui.js';
import { recordAttempt, toggleBookmark, isBookmarked, store } from '../lib/store.js';
import { mistakeInfo, lessonById } from '../content/course.js';
import { Plot3D } from '../three/engine.js';

// ---------- a practice problem ----------
// opts: { lesson, problem, number, mode: 'learn'|'practice'|'mock'|'retry', onAnswer(result), reveal }
export function problemCard(opts) {
  const { lesson, problem: pr, number, mode = 'learn' } = opts;
  const lid = lesson.id;
  const order = shuffleSeeded(pr.choices.map((c, i) => ({ ...c, i })), `${lid}-${pr.id}`);
  const ref = `${pr.id}`;
  const card = h(`
    <article class="problem" id="p-${lid}-${pr.id}">
      <div class="problem-head">
        <span class="pn">${number ?? ''}</span>
        <span>Lesson ${lid} · ${['', 'Easier', 'Medium', 'Harder'][pr.difficulty ?? 1]}</span>
        ${pr.source && pr.source !== 'original' ? `<span class="chip">${escapeHTML(pr.source)}</span>` : ''}
        <span class="right-tools">
          <button class="btn icon sm quiet" data-act="mark" aria-pressed="${isBookmarked('problem', lid, ref)}" title="Bookmark this problem">${icon(isBookmarked('problem', lid, ref) ? 'bookmarkOn' : 'bookmark')}</button>
        </span>
      </div>
      <div class="prompt">${md(pr.prompt)}</div>
      <div class="choices" role="group" aria-label="Answer choices">
        ${order.map((c, k) => `<button class="choice" data-i="${c.i}"><span class="bubble">${LETTERS[k]}</span><span class="body">${mdInline(c.tex)}</span></button>`).join('')}
      </div>
      <div class="feedback" hidden></div>
    </article>`);

  const markBtn = card.querySelector('[data-act=mark]');
  markBtn.onclick = () => {
    const on = toggleBookmark({ kind: 'problem', lesson: lid, ref, title: `L${lid} problem ${pr.id}: ${pr.prompt.slice(0, 90)}` });
    markBtn.setAttribute('aria-pressed', String(on));
    markBtn.innerHTML = icon(on ? 'bookmarkOn' : 'bookmark');
    toast(on ? 'Bookmarked' : 'Bookmark removed');
  };

  let answered = false;
  const fb = card.querySelector('.feedback');
  const showSolution = () => {
    fb.hidden = false;
    fb.insertAdjacentHTML('beforeend', `<details ${mode === 'mock' ? '' : 'open'}><summary><strong>Full solution</strong></summary><ol class="steps-list">${pr.steps.map((s) => `<li><div>${md(s)}</div></li>`).join('')}</ol></details>`);
  };

  card.querySelectorAll('.choice').forEach((btn) => {
    btn.onclick = () => {
      if (answered && mode !== 'mock') return;
      const i = Number(btn.dataset.i);
      const choice = pr.choices[i];
      if (mode === 'mock') {
        card.querySelectorAll('.choice').forEach((b) => b.classList.toggle('picked', b === btn));
        opts.onAnswer?.({ correct: !!choice.correct, mistake: choice.mistake, choice: i });
        return;
      }
      answered = true;
      recordAttempt({ lesson: lid, problem: pr.id, choice: i, correct: !!choice.correct, mistake: choice.correct ? null : choice.mistake ?? 'setup', mode });
      card.querySelectorAll('.choice').forEach((b) => {
        const c = pr.choices[Number(b.dataset.i)];
        b.disabled = true;
        if (c.correct) b.classList.add('correct');
        if (b === btn && !c.correct) b.classList.add('wrong');
      });
      fb.hidden = false;
      if (choice.correct) {
        fb.innerHTML = `<p class="greenpen">Correct. ${pr.steps.length ? 'Compare your steps with the solution below.' : ''}</p>`;
      } else {
        const m = mistakeInfo(lesson, choice.mistake ?? 'setup');
        fb.innerHTML = `<p class="redpen"><strong>What probably went wrong: ${escapeHTML(m.title)}.</strong> ${mdInline(choice.why || m.why || '')}</p>
          ${m.wrong && m.right ? `<div class="mistake" style="margin-top:8px"><div><div class="lbl">Wrong</div><div class="wrong">${mdInline(m.wrong)}</div></div><div><div class="lbl">Right</div><div class="right">${mdInline(m.right)}</div></div></div>` : ''}
          <p class="empty">Saved to your <a href="#/redpen">Mistakes</a> page.</p>`;
      }
      showSolution();
      opts.onAnswer?.({ correct: !!choice.correct, mistake: choice.mistake, choice: i });
    };
  });

  card.reveal = () => {
    card.querySelectorAll('.choice').forEach((b) => {
      const c = pr.choices[Number(b.dataset.i)];
      b.disabled = true;
      if (c.correct) b.classList.add('correct');
      if (b.classList.contains('picked') && !c.correct) b.classList.add('wrong');
    });
    showSolution();
  };
  return card;
}

// ---------- a stepped 3D scene ----------
export function sceneViewer(host, scene, opts = {}) {
  const wrap = h(`
    <div class="viewer-frame">
      <div class="viewer-canvas">
        <div class="viewer-tools">
          <button class="btn icon sm" data-act="reset" title="Reset view (or double-click)">${icon('reset')}</button>
          ${opts.labHref ? `<a class="btn sm" href="${opts.labHref}" title="Open in the 3D Lab">${icon('lab')}Lab</a>` : ''}
        </div>
        <div class="probe-readout" hidden></div>
      </div>
      <div class="viewer-steps"><div class="steps-row"></div></div>
      <div class="caption" aria-live="polite"></div>
    </div>`);
  host.appendChild(wrap);
  const canvasHost = wrap.querySelector('.viewer-canvas');
  const readout = wrap.querySelector('.probe-readout');
  const plot = new Plot3D(canvasHost, {
    colormap: store.get().settings.colormap,
    onProbe: (p) => {
      if (!p) { readout.hidden = true; return; }
      readout.hidden = false;
      readout.textContent = `(${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)})`;
    },
  });
  const steps = scene.steps?.length ? scene.steps : [{ label: 'Scene', show: null, caption: '' }];
  const row = wrap.querySelector('.steps-row');
  const caption = wrap.querySelector('.caption');
  row.innerHTML = steps.map((s, i) => `<button class="step-btn" data-i="${i}" aria-pressed="false">${mdInline(s.label)}</button>`).join('');
  try {
    plot.build(scene);
  } catch (err) {
    caption.innerHTML = `<p class="redpen">This scene failed to draw: ${escapeHTML(err.message)}</p>`;
  }
  const go = (i) => {
    row.querySelectorAll('.step-btn').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.i) === i)));
    plot.show(steps[i].show ?? null);
    caption.innerHTML = md(steps[i].caption ?? '');
    if (steps[i].camera) {
      plot.camera.position.copy(plot.w(...steps[i].camera));
      plot.dirty = true;
    }
  };
  row.addEventListener('click', (e) => {
    const b = e.target.closest('.step-btn');
    if (b) go(Number(b.dataset.i));
  });
  wrap.querySelector('[data-act=reset]').onclick = () => plot.resetCamera();
  go(0);
  const onTheme = () => { plot.build(scene); go(Number(row.querySelector('[aria-pressed=true]')?.dataset.i ?? 0)); };
  window.addEventListener('themechange', onTheme);
  return {
    plot,
    go,
    dispose() {
      window.removeEventListener('themechange', onTheme);
      plot.dispose();
    },
  };
}

export function lessonLink(id) {
  const l = lessonById(id);
  return l ? `<a href="#/lesson/${id}">L${id} ${escapeHTML(l.title)}</a>` : `L${id}`;
}
