import { md, mdInline } from '../lib/md.js';
import { h, icon, LETTERS, shuffleSeeded, toast, escapeHTML } from '../lib/ui.js';
import { recordAttempt, toggleBookmark, isBookmarked, store } from '../lib/store.js';
import { mistakeInfo, lessonById } from '../content/course.js';
import { Plot3D } from '../three/engine.js';
import { pointInfo } from '../teach/pointinfo.js';
import { runTeach } from '../teach/run.js';
import { layerToEntry, analyzeEntry } from '../lib/labmodel.js';

// ---------- a practice problem ----------
// opts: { lesson, problem, number, mode: 'learn'|'practice'|'mock'|'retry', onAnswer(result), reveal }
export function problemCard(opts) {
  const { lesson, problem: pr, number, mode = 'learn' } = opts;
  const lid = lesson.id;
  const order = shuffleSeeded(pr.choices.map((c, i) => ({ ...c, i })), `${lid}-${pr.id}`);
  const ref = `${pr.id}`;
  const card = h(`
    <article class="problem" id="p-${lid}-${pr.id}" data-lesson="${lid}" data-mode="${mode}">
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
// A lesson's 3D scene: step buttons, a guided tour that teaches each step on the model,
// "Build it" (the Teach animatic for the main surface or curve), and click-a-point explanations.
// opts: { labHref, onStep(i), tourLabel }
export function sceneViewer(host, scene, opts = {}) {
  const steps = scene.steps?.length ? scene.steps : [{ label: 'Scene', show: null, caption: '' }];
  const teachable = teachableLayer(scene);
  const wrap = h(`
    <div class="viewer-frame">
      <div class="viewer-canvas">
        <div class="viewer-tools">
          ${teachable ? `<button class="btn sm" data-act="build" title="Watch ${escapeHTML(teachable.src)} get built piece by piece">${icon('play')}Build it</button>` : ''}
          <button class="btn icon sm" data-act="reset" title="Reset view (or double-click)">${icon('reset')}</button>
          <button class="btn icon sm" data-act="full" title="Full screen (F)" aria-pressed="false">${icon('expand')}</button>
          ${opts.labHref ? `<a class="btn sm" href="${opts.labHref}" title="Open in the 3D Lab">${icon('lab')}Lab</a>` : ''}
        </div>
        <div class="probe-readout" hidden></div>
      </div>
      <div class="viewer-steps">
        <button class="btn sm primary tour-btn" data-act="tour">${icon('play')}<span>Teach me</span></button>
        <div class="steps-row">${steps.map((s, i) => `<button class="step-btn" data-i="${i}" aria-pressed="false">${mdInline(s.label)}</button>`).join('')}</div>
      </div>
      <div class="tour-bar" aria-hidden="true"><i></i></div>
      <div class="viewer-note" hidden></div>
      <div class="caption" aria-live="polite"></div>
      <div class="viewer-lesson" hidden></div>
      <p class="viewer-hint">Click the model to explain any point. Drag to turn it.<span class="full-keys"> Space pauses, ← and → change step, Esc leaves full screen.</span></p>
    </div>`);
  host.appendChild(wrap);
  const canvasHost = wrap.querySelector('.viewer-canvas');
  const readout = wrap.querySelector('.probe-readout');
  const note = wrap.querySelector('.viewer-note');
  const caption = wrap.querySelector('.caption');
  const row = wrap.querySelector('.steps-row');
  const bar = wrap.querySelector('.tour-bar i');
  const tourBtn = wrap.querySelector('[data-act=tour]');
  let current = 0;
  let builder = null;

  const plot = new Plot3D(canvasHost, {
    colormap: store.get().settings.colormap,
    onProbe: (p) => {
      if (!p) { readout.hidden = true; return; }
      readout.hidden = false;
      readout.textContent = `(${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)})`;
    },
    onPick: (p) => { if (!builder) explainPoint(p); },
  });
  const build = () => {
    try {
      plot.build(scene);
    } catch (err) {
      caption.innerHTML = `<p class="redpen">This scene failed to draw: ${escapeHTML(err.message)}</p>`;
    }
  };
  build();

  const go = (i, { fromTour = false } = {}) => {
    current = Math.max(0, Math.min(steps.length - 1, i));
    row.querySelectorAll('.step-btn').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.i) === current)));
    plot.clearOverlay();
    note.hidden = true;
    plot.show(steps[current].show ?? null);
    caption.innerHTML = md(steps[current].caption ?? '');
    if (steps[current].camera && !fromTour) {
      plot.camera.position.copy(plot.w(...steps[current].camera));
      plot.dirty = true;
    }
    paintLesson();
    opts.onStep?.(current);
  };

  // ---- the guided tour ----
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tour = { playing: false, p: 0, from: null, last: 0 };
  const dur = (s) => Math.min(13000, Math.max(5500, 4200 + 38 * String(s.caption ?? '').replace(/\$[^$]*\$/g, 'xxxx').length));
  const setTourBtn = (state) => {
    tourBtn.innerHTML = `${icon(state === 'pause' ? 'pause' : state === 'replay' ? 'reset' : 'play')}<span>${state === 'pause' ? 'Pause' : state === 'replay' ? 'Replay' : state === 'resume' ? 'Resume' : 'Teach me'}</span>`;
    tourBtn.setAttribute('aria-pressed', String(state === 'pause'));
  };
  const beginStep = (i) => {
    go(i, { fromTour: true });
    tour.p = 0;
    tour.from = plot.camera.position.clone();
  };
  const hook = (now) => {
    const dt = Math.min(64, now - tour.last);
    tour.last = now;
    if (!tour.playing) return;
    const st = steps[current];
    tour.p = Math.min(1, tour.p + dt / dur(st));
    if (st.camera) plot.cameraTo(st.camera, Math.min(1, tour.p / 0.45), tour.from);
    else if (!reduced) {
      // drift slowly around the vertical axis so the shape reads as 3D
      const t = plot.controls.target;
      const a = (dt / 1000) * 0.1;
      const dx = plot.camera.position.x - t.x;
      const dy = plot.camera.position.y - t.y;
      plot.camera.position.x = t.x + dx * Math.cos(a) - dy * Math.sin(a);
      plot.camera.position.y = t.y + dx * Math.sin(a) + dy * Math.cos(a);
    }
    bar.style.width = `${((current + tour.p) / steps.length) * 100}%`;
    if (tour.p >= 1) {
      if (current >= steps.length - 1) { stopTour('replay'); return; }
      beginStep(current + 1);
    }
  };
  const playTour = (fromStart) => {
    if (builder) endBuild();
    if (fromStart) beginStep(0);
    tour.playing = true;
    tour.last = performance.now();
    wrap.classList.add('touring');
    setTourBtn('pause');
    plot.frameHooks.add(hook);
    plot.loop();
  };
  const stopTour = (state = 'resume') => {
    tour.playing = false;
    plot.frameHooks.delete(hook);
    if (state === 'replay') bar.style.width = '100%';
    setTourBtn(state);
  };
  tourBtn.onclick = () => {
    if (tour.playing) stopTour('resume');
    else playTour(tourBtn.textContent.includes('Teach') || tourBtn.textContent.includes('Replay'));
  };
  canvasHost.addEventListener('pointerdown', () => { if (tour.playing) stopTour('resume'); });

  row.addEventListener('click', (e) => {
    const b = e.target.closest('.step-btn');
    if (!b) return;
    if (builder) endBuild();
    if (tour.playing) beginStep(Number(b.dataset.i));
    else {
      go(Number(b.dataset.i));
      bar.style.width = '0';
      wrap.classList.remove('touring');
      setTourBtn('play');
    }
  });

  // ---- click a point ----
  const specOf = (id) => scene.layers.find((l) => l.id === id);
  const visible = (id) => plot.layers.get(id)?.visible;
  function explainPoint(p) {
    if (!p) return;
    if (tour.playing) stopTour('resume');
    let layer = p.layer ? specOf(p.layer) : null;
    if (!layer || p.floor) {
      const field = scene.layers.find((l) => l.kind === 'vectorField' && visible(l.id));
      const grad = scene.layers.find((l) => l.kind === 'gradientField' && visible(l.id));
      if (field) layer = field;
      else if (grad) layer = specOf(grad.of);
    }
    const info = pointInfo(layer, p, plot.R);
    if (!info) return;
    drawPointOverlay(plot, info.overlay);
    note.hidden = false;
    note.innerHTML = `<div class="viewer-note-head"><strong>${mdInline(info.title)}</strong><button class="btn icon sm quiet" data-act="close-note" title="Close">${icon('x')}</button></div>
      ${info.lines.map((l) => `<p>${mdInline(l)}</p>`).join('')}
      <p class="viewer-note-links">${info.lessons.filter((id) => lessonById(id)).map((id) => `<a class="chip" href="#/lesson/${id}">L${id} ${escapeHTML(lessonById(id).title)}</a>`).join('')}</p>`;
    note.querySelector('[data-act=close-note]').onclick = () => { note.hidden = true; plot.clearOverlay(); };
  }

  // ---- Build it: the step-by-step Teach animatic for the main surface or curve ----
  const endBuild = () => {
    if (!builder) return;
    builder.dispose();
    builder = null;
    wrap.classList.remove('building');
    build();
    go(current);
  };
  const startBuild = (c, label) => {
    if (tour.playing) stopTour('resume');
    if (builder) endBuild();
    note.hidden = true;
    builder = runTeach(plot, canvasHost, c, {}, { colormap: store.get().settings.colormap, onClose: endBuild });
    if (!builder) { build(); go(current); toast("This one can't be built step by step yet."); return; }
    wrap.classList.add('building');
    caption.innerHTML = `<p>Building <strong>${escapeHTML(label)}</strong> piece by piece. Close the panel on the model to go back to the lesson's steps.</p>`;
  };
  wrap.querySelector('[data-act=build]')?.addEventListener('click', () => startBuild(teachable.c, teachable.src));
  wrap.querySelector('[data-act=reset]').onclick = () => plot.resetCamera();

  // ---- full screen: the model fills the screen, with the step, its caption and the lesson text beside it ----
  const fullBtn = wrap.querySelector('[data-act=full]');
  const lessonPane = wrap.querySelector('.viewer-lesson');
  const isFull = () => wrap.classList.contains('full');
  function paintLesson() {
    const html = isFull() ? opts.sectionFor?.(current) : null;
    lessonPane.hidden = !html;
    if (html) {
      lessonPane.innerHTML = html;
      lessonPane.scrollTop = 0;
    }
  }
  const setFull = (on) => {
    wrap.classList.toggle('full', on);
    document.documentElement.classList.toggle('viewer-full', on);
    fullBtn.innerHTML = icon(on ? 'shrink' : 'expand');
    fullBtn.title = on ? 'Exit full screen (Esc)' : 'Full screen (F)';
    fullBtn.setAttribute('aria-pressed', String(on));
    paintLesson();
  };
  const enterFull = () => {
    if (isFull()) return;
    setFull(true);
    // Where the Fullscreen API is missing (iPhone), the CSS alone still fills the window.
    wrap.requestFullscreen?.()?.catch?.(() => {});
  };
  const exitFull = () => {
    if (!isFull()) return;
    if (document.fullscreenElement === wrap) document.exitFullscreen().catch(() => {});
    setFull(false);
  };
  fullBtn.onclick = () => (isFull() ? exitFull() : enterFull());
  const onFullChange = () => { if (!document.fullscreenElement && isFull()) setFull(false); };
  const onKey = (e) => {
    if (!wrap.isConnected || e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.target.closest?.('input, textarea, select, [contenteditable], .xp, .palette')) return;
    if (e.key === 'f' || e.key === 'F') { e.preventDefault(); isFull() ? exitFull() : enterFull(); return; }
    if (!isFull()) return;
    if (e.key === 'Escape') exitFull();
    else if (e.key === ' ' && !e.target.closest?.('button')) { e.preventDefault(); tourBtn.click(); }
    else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const i = current + (e.key === 'ArrowRight' ? 1 : -1);
      if (i >= 0 && i < steps.length) row.querySelector(`[data-i="${i}"]`).click();
    } else return;
  };
  document.addEventListener('fullscreenchange', onFullChange);
  document.addEventListener('keydown', onKey);

  go(0);
  if (import.meta.env?.DEV) window.__viewer = { plot, explainPoint };
  const onTheme = () => { if (builder) endBuild(); build(); go(current); };
  window.addEventListener('themechange', onTheme);
  return {
    plot,
    steps,
    go(i) { if (builder) endBuild(); if (tour.playing) beginStep(i); else go(i); },
    playTour,
    stopTour,
    enterFull,
    exitFull,
    get full() { return isFull(); },
    // Draw any typed expression on this model with the Teach animatic (used by the explain panel).
    teach: startBuild,
    get current() { return current; },
    el: wrap,
    dispose() {
      window.removeEventListener('themechange', onTheme);
      document.removeEventListener('fullscreenchange', onFullChange);
      document.removeEventListener('keydown', onKey);
      exitFull();
      plot.frameHooks.delete(hook);
      builder?.dispose();
      plot.dispose();
    },
  };
}

const TEACHABLE = new Set(['surface', 'curve', 'field', 'paramSurface', 'implicit']);
// The scene's main object that Teach mode can build. Surfaces and fields are what a lesson is about;
// curves are often helpers (a path, a slice), so they come last.
const RANK = ['surface', 'paramSurface', 'vectorField', 'implicit', 'curve'];
export function teachableLayer(scene) {
  const layers = (scene.layers ?? []).filter((L) => RANK.includes(L.kind)).sort((a, b) => RANK.indexOf(a.kind) - RANK.indexOf(b.kind));
  for (const L of layers) {
    const e = layerToEntry(L);
    if (!e.src) continue;
    const { c } = analyzeEntry(e);
    if (TEACHABLE.has(c.type) && !(c.params?.length)) return { c, src: e.src };
  }
  return null;
}

export function drawPointOverlay(plot, o) {
  plot.clearOverlay();
  if (!o) return;
  const pal = plot.pal;
  if (o.plane) {
    const { x0, y0, z0, fx, fy } = o.plane;
    const s = plot.R * 0.28;
    const P = (dx, dy) => { const v = plot.w(x0 + dx, y0 + dy, z0 + fx * dx + fy * dy); return [v.x, v.y, v.z]; };
    const corners = [P(-s, -s), P(s, -s), P(s, s), P(-s, s)];
    const segs = [];
    for (let k = 0; k < 4; k++) segs.push(...corners[k], ...corners[(k + 1) % 4]);
    for (const t of [-0.5, 0, 0.5]) segs.push(...P(-s, t * 2 * s), ...P(s, t * 2 * s), ...P(t * 2 * s, -s), ...P(t * 2 * s, s));
    plot.overlay(plot.segments(segs, pal.ink, 0.55));
  }
  if (o.point) plot.overlay(plot.point(o.point, pal.road));
  for (const a of o.arrows ?? []) plot.overlay(plot.arrow(a.from, a.to, pal[a.color] ?? pal.road));
}

export function lessonLink(id) {
  const l = lessonById(id);
  return l ? `<a href="#/lesson/${id}">L${id} ${escapeHTML(l.title)}</a>` : `L${id}`;
}
