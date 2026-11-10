// A Plot3D without WebGL: every geometry method is the real one, only the renderer and controls are stubbed.
import * as THREE from 'three';
import { Plot3D } from '../src/three/engine.js';

export function headlessPlot(opts = {}) {
  const p = Object.create(Plot3D.prototype);
  Object.assign(p, {
    el: document.createElement('div'),
    opts: { colormap: 'terrain', ...opts },
    root: new THREE.Group(),
    scene: new THREE.Scene(),
    layers: new Map(),
    probes: [],
    fades: [],
    frameHooks: new Set(),
    dirty: false,
    camera: new THREE.PerspectiveCamera(34, 1, 0.01, 500),
    controls: { target: new THREE.Vector3(), update() {} },
  });
  p.scene.add(p.root);
  p.camera.up.set(0, 0, 1);
  p.loop = () => {};
  return p;
}

// Wrap the live-drawing primitives so a test can see every point a beat draws, tagged with the beat title.
export function trace(plot) {
  const log = [];
  let beat = '';
  const tag = (kind, data) => log.push({ beat, kind, data });
  const wrap = (name, patch) => {
    const orig = plot[name].bind(plot);
    plot[name] = (...args) => patch(orig(...args), args);
  };
  wrap('mover', (m) => { const mv = m.move; m.move = (pt, text) => { tag('mover', pt); mv(pt, text); }; return m; });
  wrap('liveLine', (L) => { const set = L.set; L.set = (pts) => { tag('line', pts); set(pts); }; return L; });
  wrap('liveSegments', (L) => { const set = L.set; L.set = (segs) => { tag('segments', segs); set(segs); }; return L; });
  wrap('liveArrow', (A) => { const set = A.set; A.set = (a, b) => { tag('arrow', [a, b]); set(a, b); }; return A; });
  wrap('drawableTube', (t, args) => { tag('tube', { fn: args[0], t0: args[1], t1: args[2] }); return t; });
  return { log, setBeat: (b) => { beat = b; } };
}

// Run one lesson plan's beats the way the player does, sampling progress 0..1.
export function runBeats(plot, plan, tracer, steps = 24) {
  const ctx = { plot, pal: plot.pal, colormap: 'terrain', add: (o) => plot.overlay(o) };
  const lives = [];
  for (const b of plan.beats) {
    tracer?.setBeat(b.title);
    const st = b.enter(ctx);
    for (let i = 0; i <= steps; i++) {
      const p = i / steps;
      b.update(p, st, ctx);
      if (b.live) lives.push(b.live(p, st));
    }
  }
  return lives;
}

// Every vertex in the overlay and layers must be finite.
export function nonFiniteVertices(group) {
  let bad = 0;
  group.traverse((o) => {
    const pos = o.geometry?.attributes?.position;
    if (!pos) return;
    const n = o.geometry.drawRange?.count === Infinity ? pos.count : Math.min(pos.count, (o.geometry.drawRange?.start ?? 0) + (o.geometry.drawRange?.count ?? pos.count));
    for (let i = 0; i < n * 3; i++) if (!Number.isFinite(pos.array[i])) bad++;
  });
  return bad;
}

export const close = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * (1 + Math.abs(a) + Math.abs(b));
