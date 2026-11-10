import { md, mdInline } from '../lib/md.js';
import { h, icon } from '../lib/ui.js';
import { buildTeach } from './beats.js';

const drop = (o) => {
  o.traverse((c) => c.isCSS2DObject && c.element.remove());
  o.removeFromParent();
};

// Plays a list of beats on a Plot3D. Seeking replays earlier kept beats instantly, so any beat can be jumped to.
export class TeachPlayer {
  constructor(plot, host, opts = {}) {
    this.plot = plot;
    this.host = host;
    this.opts = opts;
    this.speed = 1;
    this.playing = false;
    this.el = h(`
      <section class="teach" aria-label="Teach mode">
        <div class="teach-head">
          <div class="teach-title"></div>
          <button class="btn icon quiet sm teach-close" title="Close teach mode">${icon('x')}</button>
        </div>
        <div class="teach-text"></div>
        <div class="teach-live" aria-live="polite"></div>
        <div class="teach-bar">
          <button class="btn icon sm" data-act="prev" title="Previous beat">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>'}</button>
          <button class="btn icon sm primary" data-act="play" title="Play or pause (space)"></button>
          <button class="btn icon sm" data-act="next" title="Next beat">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>'}</button>
          <div class="teach-track" role="slider" aria-label="Timeline" tabindex="0"><div class="teach-ticks"></div><div class="teach-fill"></div></div>
          <select class="teach-speed" aria-label="Speed"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="1.5">1.5×</option><option value="2">2×</option></select>
        </div>
      </section>`);
    host.appendChild(this.el);
    this.el.querySelector('[data-act=prev]').onclick = () => this.go(this.i - 1);
    this.el.querySelector('[data-act=next]').onclick = () => this.go(this.i + 1);
    this.el.querySelector('[data-act=play]').onclick = () => (this.playing ? this.pause() : this.play());
    this.el.querySelector('.teach-close').onclick = () => this.opts.onClose?.();
    this.el.querySelector('.teach-speed').onchange = (e) => (this.speed = Number(e.target.value));
    this.el.querySelector('.teach-track').onclick = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const total = this.total();
      let acc = 0;
      for (let k = 0; k < this.beats.length; k++) {
        const d = this.beats[k].duration / total;
        if (x <= acc + d) return this.go(k, (x - acc) / d);
        acc += d;
      }
    };
    this.el.querySelector('.teach-track').onkeydown = (e) => {
      if (e.key === 'ArrowRight') this.go(this.i + 1);
      if (e.key === 'ArrowLeft') this.go(this.i - 1);
    };
    this.keyHandler = (e) => {
      if (e.target.closest('input, textarea, select')) return;
      if (e.code === 'Space') { e.preventDefault(); this.playing ? this.pause() : this.play(); }
    };
    document.addEventListener('keydown', this.keyHandler);
    this.updatePlayIcon();
  }

  load(classified, params, ctxExtra = {}) {
    const lesson = buildTeach(classified, params);
    if (!lesson) return false;
    this.lesson = lesson;
    this.beats = lesson.beats;
    this.ctxExtra = ctxExtra;
    this.el.querySelector('.teach-ticks').innerHTML = this.beats.map((b) => `<i style="flex:${b.duration}" title="${b.title.replace(/\$/g, '').replace(/"/g, '')}"></i>`).join('');
    this.go(0, 0);
    this.play();
    return true;
  }

  total() {
    return this.beats.reduce((s, b) => s + b.duration, 0);
  }

  ctx() {
    const plot = this.plot;
    const pal = plot.pal;
    const self = this;
    return {
      plot,
      pal,
      colormap: this.ctxExtra.colormap ?? 'terrain',
      add(obj, transient = false) {
        plot.overlay(obj);
        (transient ? self.transient : self.current).push(obj);
        return obj;
      },
    };
  }

  // Jump to beat k at progress p (0..1).
  go(k, p = 0) {
    if (!this.beats) return;
    k = Math.max(0, Math.min(this.beats.length - 1, k));
    this.plot.clearOverlay();
    this.plot.frameHooks.delete(this.hook);
    // replay earlier kept beats to their end state
    for (let j = 0; j < k; j++) {
      const b = this.beats[j];
      if (!b.keep) continue;
      this.current = [];
      this.transient = [];
      const st = b.enter(this.ctx());
      b.update(1, st, this.ctx());
      this.dropTransient();
    }
    this.i = k;
    this.enterBeat(p);
    this.render();
  }

  enterBeat(p = 0) {
    const b = this.beats[this.i];
    this.current = [];
    this.transient = [];
    this.state = b.enter(this.ctx());
    this.p = p;
    b.update(p, this.state, this.ctx());
    this.last = performance.now();
    this.hook = (now) => this.tick(now);
    this.plot.frameHooks.add(this.hook);
    this.plot.loop();
  }

  dropTransient() {
    for (const o of this.transient) drop(o);
    this.transient = [];
  }

  tick(now) {
    const dt = Math.min(64, now - this.last);
    this.last = now;
    if (!this.playing) return;
    const b = this.beats[this.i];
    this.p = Math.min(1, this.p + (dt * this.speed) / b.duration);
    b.update(this.p, this.state, this.ctx());
    this.renderLive(false, now);
    if (this.p >= 1) {
      if (this.i >= this.beats.length - 1) {
        this.renderLive(true);
        this.pause();
        return;
      }
      // finish this beat: kept beats keep their non-transient objects
      this.dropTransient();
      if (!b.keep) for (const o of this.current) drop(o);
      this.plot.frameHooks.delete(this.hook);
      this.i += 1;
      this.enterBeat(0);
      this.render();
    }
  }

  play() {
    if (!this.beats) return;
    if (this.i === this.beats.length - 1 && this.p >= 1) this.go(0);
    this.playing = true;
    this.last = performance.now();
    this.updatePlayIcon();
  }

  pause() {
    this.playing = false;
    this.updatePlayIcon();
  }

  updatePlayIcon() {
    this.el.querySelector('[data-act=play]').innerHTML = this.playing
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="5.5" width="3.5" height="13" rx="0.5"/><rect x="13.5" y="5.5" width="3.5" height="13" rx="0.5"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l10.5-6.5z"/></svg>';
  }

  render() {
    const b = this.beats[this.i];
    this.el.querySelector('.teach-title').innerHTML = `<span class="teach-count">${this.i + 1}/${this.beats.length}</span> ${mdInline(b.title)}`;
    this.el.querySelector('.teach-text').innerHTML = md(b.text);
    this.renderLive(true);
    this.plot.setInset?.(Math.round(this.el.offsetHeight + 12));
  }

  renderLive(force = false, now = performance.now()) {
    const b = this.beats[this.i];
    if (!force && now - (this.liveAt ?? 0) < 90) return;
    this.liveAt = now;
    const live = b.live ? b.live(this.p, this.state) : '';
    const el = this.el.querySelector('.teach-live');
    if (el.dataset.src !== live) {
      el.dataset.src = live;
      el.innerHTML = live ? mdInline(live) : '';
    }
    const total = this.total();
    const before = this.beats.slice(0, this.i).reduce((s, x) => s + x.duration, 0);
    this.el.querySelector('.teach-fill').style.width = `${((before + this.p * b.duration) / total) * 100}%`;
  }

  dispose() {
    this.plot.setInset?.(0);
    this.plot.frameHooks.delete(this.hook);
    this.plot.clearOverlay();
    document.removeEventListener('keydown', this.keyHandler);
    this.el.remove();
  }
}
