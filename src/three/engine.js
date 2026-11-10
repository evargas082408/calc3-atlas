import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { fn, num, fmt } from '../lib/expr.js';
import { sample as cmap } from './colormaps.js';

const SRGB = THREE.SRGBColorSpace;

// Read the map palette from CSS so scenes follow light and dark themes.
function palette(el) {
  const cs = getComputedStyle(el);
  const v = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
  return {
    ink: v('--ink', '#1e1e1a'),
    contour: v('--contour', '#a0703c'),
    index: v('--contour-index', '#7a4e22'),
    water: v('--water', '#2f6db5'),
    road: v('--road', '#c8321e'),
    wood: v('--wood-ink', '#3f7d4e'),
    revision: v('--revision', '#8e44ad'),
    grid: v('--grid', '#d9d4c4'),
    floor: v('--floor', '#eef3e6'),
  };
}

// CSS2DRenderer owns the element's transform, so offset labels sit inside a zero-size anchor at the point.
function pointLabel(cls, text) {
  const t = document.createElement('div');
  t.className = `map-label ${cls}`;
  t.textContent = text;
  if (!/point/.test(cls)) return { anchor: t, text: t };
  const anchor = document.createElement('div');
  anchor.className = 'map-anchor';
  anchor.appendChild(t);
  return { anchor, text: t };
}

const colorOf = (pal, name, fallback = 'water') => pal[name] ?? (name && name.startsWith('#') ? name : pal[fallback]);

// ---------- domain helpers ----------

// Returns a map (s,t) in [0,1]^2 -> [x,y], plus a description of the boundary.
function domainMap(domain, R) {
  if (!domain) return { map: (s, t) => [-R + 2 * R * s, -R + 2 * R * t], polar: false };
  if (domain.r || domain.theta) {
    const th = domain.theta ?? [0, '2*pi'];
    const t0 = num(th[0]);
    const t1 = num(th[1]);
    const r = domain.r ?? [0, R];
    const rA = typeof r[0] === 'number' ? () => r[0] : fn(r[0], ['theta']);
    const rB = typeof r[1] === 'number' ? () => r[1] : fn(r[1], ['theta']);
    return {
      polar: true,
      map: (s, t) => {
        const theta = t0 + (t1 - t0) * t;
        const rr = rA(theta) + (rB(theta) - rA(theta)) * s;
        return [rr * Math.cos(theta), rr * Math.sin(theta)];
      },
    };
  }
  const xb = domain.x ?? [-R, R];
  const yb = domain.y ?? [-R, R];
  const isConst = (b) => b.every((e) => typeof e === 'number' || !/[xy]/.test(String(e).replace(/exp|max|min|sqrt|pi/g, '')));
  if (isConst(xb)) {
    const x0 = num(xb[0]);
    const x1 = num(xb[1]);
    const g1 = fn(String(yb[0]), ['x']);
    const g2 = fn(String(yb[1]), ['x']);
    return { map: (s, t) => { const x = x0 + (x1 - x0) * s; const a = g1(x); const b = g2(x); return [x, a + (b - a) * t]; } };
  }
  const y0 = num(yb[0]);
  const y1 = num(yb[1]);
  const h1 = fn(String(xb[0]), ['y']);
  const h2 = fn(String(xb[1]), ['y']);
  return { map: (s, t) => { const y = y0 + (y1 - y0) * t; const a = h1(y); const b = h2(y); return [a + (b - a) * s, y]; } };
}

function regionSpec(layer) {
  if (layer.polar) return { r: layer.polar.r, theta: layer.polar.theta };
  if (layer.region) return regionSpec(layer.region);
  const out = {};
  if (layer.x) out.x = layer.x;
  if (layer.y) out.y = layer.y;
  if (layer.r) out.r = layer.r;
  if (layer.theta) out.theta = layer.theta;
  return out;
}

// ---------- the plot ----------

export class Plot3D {
  constructor(container, opts = {}) {
    this.el = container;
    this.opts = opts;
    this.el.classList.add('plot3d');
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    this.renderer.outputColorSpace = SRGB;
    this.renderer.localClippingEnabled = true;
    this.frameHooks = new Set();
    this.el.appendChild(this.renderer.domElement);
    this.labels = new CSS2DRenderer();
    this.labels.domElement.className = 'plot3d-labels';
    this.el.appendChild(this.labels.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(34, 1, 0.01, 500);
    this.camera.up.set(0, 0, 1);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.12;
    this.controls.addEventListener('change', () => (this.dirty = true));

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x8a7a60, 1.55));
    const sun = new THREE.DirectionalLight(0xffffff, 1.25);
    sun.position.set(-4, -6, 10);
    this.scene.add(sun);
    const fill = new THREE.DirectionalLight(0xffffff, 0.35);
    fill.position.set(6, 4, -3);
    this.scene.add(fill);

    this.root = new THREE.Group();
    this.scene.add(this.root);
    this.layers = new Map();
    this.probes = [];
    this.fades = [];
    this.dirty = true;

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(this.el);
    this.visible = true;
    this.io = new IntersectionObserver(([e]) => {
      this.visible = e.isIntersecting;
      if (this.visible) this.loop();
    });
    this.io.observe(this.el);

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.renderer.domElement.addEventListener('pointermove', (e) => this.onPointer(e));
    this.renderer.domElement.addEventListener('pointerleave', () => this.opts.onProbe?.(null));
    this.renderer.domElement.addEventListener('dblclick', () => this.resetCamera());
    this.resize();
    this.loop();
  }

  // ---- lifecycle ----
  resize() {
    const w = this.el.clientWidth || 300;
    const h = this.el.clientHeight || 300;
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = `${w}px`;
    this.renderer.domElement.style.height = `${h}px`;
    this.labels.setSize(w, h);
    this.camera.aspect = w / h;
    // an overlay (the Teach panel) covers the bottom: shift the picture up so it centers in what is left
    if (this.inset) this.camera.setViewOffset(w, h, 0, Math.min(this.inset, h * 0.6) / 2, w, h);
    else this.camera.clearViewOffset();
    this.camera.updateProjectionMatrix();
    this.dirty = true;
  }

  setInset(px) {
    if (px === this.inset) return;
    this.inset = px;
    if (this.renderer) this.resize();
  }

  loop() {
    if (this.looping || this.disposed) return;
    this.looping = true;
    const tick = (now) => {
      if (this.disposed || !this.visible) {
        this.looping = false;
        return;
      }
      this.controls.update();
      if (this.fades.length) this.stepFades(now);
      if (this.frameHooks.size) {
        for (const hook of this.frameHooks) hook(now);
        this.dirty = true;
      }
      if (this.dirty) {
        this.renderer.render(this.scene, this.camera);
        this.labels.render(this.scene, this.camera);
        this.dirty = false;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  dispose() {
    this.disposed = true;
    this.ro.disconnect();
    this.io.disconnect();
    this.clear();
    this.controls.dispose();
    this.renderer.dispose();
    this.el.innerHTML = '';
  }

  clear() {
    this.root.traverse((o) => {
      if (o.geometry && !o.geometry.userData.shared) o.geometry.dispose();
      if (o.material) [].concat(o.material).forEach((m) => m.dispose());
      if (o.isCSS2DObject) o.element.remove();
    });
    this.root.clear();
    this.layers.clear();
    this.probes = [];
  }

  snapshot() {
    this.renderer.render(this.scene, this.camera);
    return this.renderer.domElement.toDataURL('image/png');
  }

  // ---- coordinates ----
  w(x, y, z) {
    return new THREE.Vector3(x, y, (z - this.zMid) * this.zs + this.zMid);
  }

  // ---- building ----
  build(spec) {
    this.clear();
    this.spec = spec;
    this.pal = palette(this.el);
    const view = spec.view ?? {};
    const R = view.range ?? 3;
    this.R = R;

    // Find the z extent from everything that has a z, unless the scene pins it.
    let lo = Infinity;
    let hi = -Infinity;
    const zs = [];
    const consider = (z) => {
      if (Number.isFinite(z)) zs.push(z);
    };
    for (const L of spec.layers ?? []) {
      if (L.kind === 'surface') {
        const f = fn(L.z, ['x', 'y']);
        const { map } = domainMap(L.domain, R);
        for (let i = 0; i <= 24; i++) for (let j = 0; j <= 24; j++) { const [x, y] = map(i / 24, j / 24); consider(f(x, y)); }
      } else if (L.kind === 'paramSurface') {
        const fz = fn(L.z, ['u', 'v']);
        const u0 = num(L.u[0]); const u1 = num(L.u[1]); const v0 = num(L.v[0]); const v1 = num(L.v[1]);
        for (let i = 0; i <= 16; i++) for (let j = 0; j <= 16; j++) consider(fz(u0 + (u1 - u0) * i / 16, v0 + (v1 - v0) * j / 16));
      } else if (L.kind === 'curve') {
        const fz = fn(L.z ?? '0', ['t']);
        const t0 = num(L.t[0]); const t1 = num(L.t[1]);
        for (let i = 0; i <= 40; i++) consider(fz(t0 + (t1 - t0) * i / 40));
      } else if (L.kind === 'solid') {
        const fb = fn(L.bottom, ['x', 'y']); const ft = fn(L.top, ['x', 'y']);
        const { map } = domainMap(regionSpec(L), R);
        for (let i = 0; i <= 12; i++) for (let j = 0; j <= 12; j++) { const [x, y] = map(i / 12, j / 12); consider(fb(x, y)); consider(ft(x, y)); }
      } else if (L.kind === 'implicit') { consider(-R); consider(R); }
      else if (L.kind === 'point') consider(L.at[2]);
      else if (L.kind === 'vector') { consider(L.from?.[2] ?? 0); consider(L.to[2]); }
    }
    zs.sort((a, b) => a - b);
    if (zs.length) {
      lo = zs[Math.floor(zs.length * 0.01)];
      hi = zs[Math.ceil(zs.length * 0.99) - 1];
    }
    if (!Number.isFinite(lo)) { lo = -1; hi = 1; }
    lo = Math.min(lo, 0);
    hi = Math.max(hi, 0);
    if (hi - lo < 1e-6) { lo -= 1; hi += 1; }
    const pad = (hi - lo) * 0.06;
    this.zMin = view.z ? num(view.z[0]) : lo - pad;
    this.zMax = view.z ? num(view.z[1]) : hi + pad;
    this.zMid = 0;
    const span = this.zMax - this.zMin;
    this.zs = view.zScale ?? Math.min(1.6, Math.max(0.2, (2 * R * 1.05) / span));
    if (span <= 2 * R * 1.6 && !view.zScale) this.zs = 1;

    this.buildFrame();
    for (const L of spec.layers ?? []) {
      let group;
      try {
        group = this.buildLayer(L);
      } catch (err) {
        console.warn('layer failed', L, err);
        group = new THREE.Group();
      }
      group.userData.layerId = L.id;
      this.root.add(group);
      this.layers.set(L.id ?? `L${this.layers.size}`, group);
    }
    this.resetCamera();
    this.dirty = true;
  }

  resetCamera() {
    const R = this.R;
    const c = this.spec?.camera;
    const mid = this.w(0, 0, (this.zMin + this.zMax) / 2);
    if (c) this.camera.position.copy(this.w(c[0], c[1], c[2]));
    else this.camera.position.set(R * 2.6, -R * 2.9, mid.z + R * 2.1);
    // portrait or narrow stages: back off so the box fits across, since the field of view is vertical
    const fit = Math.max(1, 1.3 / (this.camera.aspect || 1));
    if (fit > 1) this.camera.position.sub(mid).multiplyScalar(fit).add(mid);
    this.controls.target.copy(mid);
    this.controls.update();
    this.dirty = true;
  }

  buildFrame() {
    const R = this.R;
    const pal = this.pal;
    const frame = new THREE.Group();
    const zf = this.zMin;
    const floorZ = this.w(0, 0, zf).z;

    // floor tint
    const floorGeo = new THREE.PlaneGeometry(2 * R, 2 * R);
    const floor = new THREE.Mesh(floorGeo, new THREE.MeshBasicMaterial({ color: new THREE.Color().setStyle(pal.floor, SRGB), transparent: true, opacity: 0.55, depthWrite: false, side: THREE.DoubleSide }));
    floor.position.z = floorZ - 0.002;
    floor.renderOrder = -2;
    frame.add(floor);

    // floor grid (map graticule)
    const pts = [];
    const n = 8;
    for (let i = 0; i <= n; i++) {
      const a = -R + (2 * R * i) / n;
      pts.push(a, -R, floorZ, a, R, floorZ, -R, a, floorZ, R, a, floorZ);
    }
    frame.add(this.segments(pts, pal.grid, 0.9));

    // box edges
    const zt = this.w(0, 0, this.zMax).z;
    const b = [];
    const corners = [[-R, -R], [R, -R], [R, R], [-R, R]];
    corners.forEach(([x, y], i) => {
      const [x2, y2] = corners[(i + 1) % 4];
      b.push(x, y, zt, x2, y2, zt);
      b.push(x, y, floorZ, x, y, zt);
    });
    frame.add(this.segments(b, pal.grid, 0.55));

    // axes through the origin
    const ax = [];
    const z0 = this.w(0, 0, Math.min(Math.max(0, this.zMin), this.zMax)).z;
    ax.push(-R, 0, z0, R * 1.08, 0, z0, 0, -R, z0, 0, R * 1.08, z0, 0, 0, floorZ, 0, 0, zt + 0.08 * R);
    frame.add(this.segments(ax, pal.ink, 0.55));
    frame.add(this.label('x', [R * 1.14, 0, z0], 'axis'));
    frame.add(this.label('y', [0, R * 1.14, z0], 'axis'));
    frame.add(this.label('z', [0, 0, zt + 0.16 * R], 'axis', true));

    // ticks on the near edges, Plotly-style
    for (const t of [-R, 0, R]) {
      frame.add(this.label(fmt(t, 1), [t, -R * 1.12, floorZ], 'tick', true));
      frame.add(this.label(fmt(t, 1), [R * 1.12, t, floorZ], 'tick', true));
    }
    for (const t of [this.zMin, (this.zMin + this.zMax) / 2, this.zMax]) {
      frame.add(this.label(fmt(t, 1), [-R * 1.08, R * 1.08, this.w(0, 0, t).z], 'tick', true));
    }
    this.frame = frame;
    this.root.add(frame);
  }

  // ---- primitives ----
  segments(arr, color, opacity = 1) {
    // drop any segment with a non-finite end so the buffer never holds NaN
    const clean = [];
    for (let i = 0; i + 5 < arr.length; i += 6) {
      let ok = true;
      for (let k = 0; k < 6; k++) if (!Number.isFinite(arr[i + k])) { ok = false; break; }
      if (ok) for (let k = 0; k < 6; k++) clean.push(arr[i + k]);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(clean, 3));
    const m = new THREE.LineBasicMaterial({ color: new THREE.Color().setStyle(color, SRGB), transparent: opacity < 1, opacity });
    return new THREE.LineSegments(g, m);
  }

  label(text, at, cls = '', worldAlready = false) {
    const { anchor: div } = pointLabel(cls, text);
    const o = new CSS2DObject(div);
    if (worldAlready) o.position.set(at[0], at[1], at[2]);
    else o.position.copy(this.w(at[0], at[1], at[2]));
    return o;
  }

  arrow(from, to, color, radius) {
    const a = this.w(...from);
    const b = this.w(...to);
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const g = new THREE.Group();
    if (!(len >= 1e-6)) return g;
    const r = radius ?? this.R * 0.012;
    const headLen = Math.min(len * 0.35, r * 7);
    const mat = new THREE.MeshLambertMaterial({ color: new THREE.Color().setStyle(color, SRGB) });
    const shaft = new THREE.Mesh(SHARED.cyl, mat);
    shaft.scale.set(r, len - headLen, r);
    shaft.position.y = (len - headLen) / 2;
    const head = new THREE.Mesh(SHARED.cone, mat);
    head.scale.set(r * 2.6, headLen, r * 2.6);
    head.position.y = len - headLen / 2;
    const holder = new THREE.Group();
    holder.add(shaft, head);
    holder.position.copy(a);
    holder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    g.add(holder);
    return g;
  }

  tube(pointFn, t0, t1, color, radius, segments = 220) {
    const curve = new THREE.Curve();
    // where the function is undefined, hold the last defined point so the tube stays finite
    let last = null;
    curve.getPoint = (u, target = new THREE.Vector3()) => {
      const p = pointFn(t0 + (t1 - t0) * u);
      if (Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.z)) last = p.clone();
      else if (last) return target.copy(last);
      else {
        for (let k = 1; k <= 64; k++) {
          const q = pointFn(t0 + (t1 - t0) * Math.min(1, u + k / 64));
          if (Number.isFinite(q.x) && Number.isFinite(q.y) && Number.isFinite(q.z)) return target.copy(q);
        }
        return target.set(0, 0, 0);
      }
      return target.copy(p);
    };
    const geo = new THREE.TubeGeometry(curve, segments, radius ?? this.R * 0.014, 8, false);
    return new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: new THREE.Color().setStyle(color, SRGB) }));
  }

  // Grid surface from a param map. f(s,t) -> [x,y,z] in math coordinates.
  gridSurface(f, opts = {}) {
    const N = opts.n ?? 72;
    const M = opts.m ?? N;
    const pos = new Float32Array((N + 1) * (M + 1) * 3);
    const col = new Float32Array((N + 1) * (M + 1) * 3);
    const ok = new Uint8Array((N + 1) * (M + 1));
    const zsArr = [];
    const raw = [];
    for (let i = 0; i <= N; i++) {
      for (let j = 0; j <= M; j++) {
        const p = f(i / N, j / M);
        raw.push(p);
        if (p.every(Number.isFinite)) zsArr.push(p[2]);
      }
    }
    const zLo = opts.cLo ?? Math.max(this.zMin, Math.min(...zsArr));
    const zHi = opts.cHi ?? Math.min(this.zMax, Math.max(...zsArr));
    const c = new THREE.Color();
    raw.forEach((p, k) => {
      const good = p.every(Number.isFinite) && p[2] >= this.zMin - 1e-9 && p[2] <= this.zMax + 1e-9;
      ok[k] = good ? 1 : 0;
      const v = good ? this.w(p[0], p[1], p[2]) : new THREE.Vector3();
      pos.set([v.x, v.y, v.z], k * 3);
      if (opts.color) {
        c.setStyle(opts.color, SRGB);
      } else {
        const [r, g, b] = cmap(opts.colormap ?? 'terrain', (p[2] - zLo) / (zHi - zLo || 1));
        c.setRGB(r, g, b, SRGB);
      }
      col.set([c.r, c.g, c.b], k * 3);
    });
    const idx = [];
    const id = (i, j) => i * (M + 1) + j;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        const a = id(i, j); const b = id(i + 1, j); const cc = id(i + 1, j + 1); const d = id(i, j + 1);
        if (ok[a] && ok[b] && ok[cc]) idx.push(a, b, cc);
        if (ok[a] && ok[cc] && ok[d]) idx.push(a, cc, d);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const opacity = opts.opacity ?? 1;
    const mat = new THREE.MeshPhongMaterial({
      vertexColors: true, side: THREE.DoubleSide, shininess: 18, specular: 0x222222,
      transparent: opacity < 1, opacity, depthWrite: opacity >= 0.99,
      polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1,
    });
    const mesh = new THREE.Mesh(geo, mat);
    const g = new THREE.Group();
    g.add(mesh);

    // textbook mesh lines
    if (opts.mesh !== false) {
      const every = opts.meshEvery ?? Math.max(1, Math.round(N / 24));
      const lines = [];
      for (let i = 0; i <= N; i += every) for (let j = 0; j < M; j++) {
        const a = id(i, j); const b = id(i, j + 1);
        if (ok[a] && ok[b]) lines.push(...pos.slice(a * 3, a * 3 + 3), ...pos.slice(b * 3, b * 3 + 3));
      }
      for (let j = 0; j <= M; j += every) for (let i = 0; i < N; i++) {
        const a = id(i, j); const b = id(i + 1, j);
        if (ok[a] && ok[b]) lines.push(...pos.slice(a * 3, a * 3 + 3), ...pos.slice(b * 3, b * 3 + 3));
      }
      g.add(this.segments(lines, this.pal.ink, opacity < 1 ? 0.12 : 0.28));
    }
    mesh.userData.probe = true;
    this.probes.push(mesh);
    g.userData.raw = { raw, N, M };
    return g;
  }

  // Marching squares over a sampled param grid; returns segments in (s,t) parameter space.
  contourSegments(vals, N, M, level) {
    const out = [];
    const v = (i, j) => vals[i * (M + 1) + j];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        const q = [v(i, j), v(i + 1, j), v(i + 1, j + 1), v(i, j + 1)];
        if (q.some((x) => !Number.isFinite(x))) continue;
        const P = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]];
        const cuts = [];
        for (let e = 0; e < 4; e++) {
          const a = q[e]; const b = q[(e + 1) % 4];
          if ((a < level) !== (b < level)) {
            const t = (level - a) / (b - a);
            const pa = P[e]; const pb = P[(e + 1) % 4];
            cuts.push([(pa[0] + (pb[0] - pa[0]) * t) / N, (pa[1] + (pb[1] - pa[1]) * t) / M]);
          }
        }
        if (cuts.length === 2) out.push(cuts);
        else if (cuts.length === 4) out.push([cuts[0], cuts[1]], [cuts[2], cuts[3]]);
      }
    }
    return out;
  }

  // ---- layers ----
  buildLayer(L) {
    const pal = this.pal;
    const R = this.R;
    const g = new THREE.Group();
    switch (L.kind) {
      case 'surface': {
        const f = fn(L.z, ['x', 'y']);
        const { map } = domainMap(L.domain, R);
        const surf = this.gridSurface((s, t) => { const [x, y] = map(s, t); return [x, y, f(x, y)]; }, { colormap: L.colormap ?? this.opts.colormap, opacity: L.opacity, mesh: L.mesh, color: L.color ? colorOf(pal, L.color) : null });
        surf.userData.fn = f;
        surf.userData.map = map;
        g.add(surf);
        g.userData.surface = { f, map, expr: L.z };
        break;
      }
      case 'paramSurface': {
        const fx = fn(L.x, ['u', 'v']); const fy = fn(L.y, ['u', 'v']); const fz = fn(L.z, ['u', 'v']);
        const u0 = num(L.u[0]); const u1 = num(L.u[1]); const v0 = num(L.v[0]); const v1 = num(L.v[1]);
        g.add(this.gridSurface((s, t) => { const u = u0 + (u1 - u0) * s; const v = v0 + (v1 - v0) * t; return [fx(u, v), fy(u, v), fz(u, v)]; }, { n: 64, colormap: L.colormap ?? this.opts.colormap, opacity: L.opacity ?? 0.92, mesh: L.mesh, color: L.color ? colorOf(pal, L.color) : null }));
        break;
      }
      case 'curve': {
        const fx = fn(L.x, ['t']); const fy = fn(L.y, ['t']); const fz = fn(L.z ?? '0', ['t']);
        const t0 = num(L.t[0]); const t1 = num(L.t[1]);
        const color = colorOf(pal, L.color ?? 'road');
        g.add(this.tube((t) => this.w(fx(t), fy(t), fz(t)), t0, t1, color, L.radius));
        if (L.arrow) {
          for (const u of [0.3, 0.65, 0.97]) {
            const t = t0 + (t1 - t0) * u;
            const h = (t1 - t0) * 0.02;
            const a = [fx(t - h), fy(t - h), fz(t - h)];
            const b = [fx(t), fy(t), fz(t)];
            const d = b.map((x, i) => x - a[i]);
            const n = Math.hypot(...d) || 1;
            g.add(this.arrow(a, b.map((x, i) => x + (d[i] / n) * R * 0.05), color, R * 0.02));
          }
        }
        if (L.label) g.add(this.label(L.label, [fx(t1), fy(t1), fz(t1)], 'curve'));
        break;
      }
      case 'curveOnSurface': {
        const host = this.layers.get(L.of)?.userData.surface;
        const fz = host?.f ?? (() => 0);
        const fx = fn(L.x, ['t']); const fy = fn(L.y, ['t']);
        const t0 = num(L.t[0]); const t1 = num(L.t[1]);
        const lift = R * 0.012;
        const color = colorOf(pal, L.color ?? 'road');
        g.add(this.tube((t) => { const x = fx(t); const y = fy(t); return this.w(x, y, fz(x, y)).add(new THREE.Vector3(0, 0, lift)); }, t0, t1, color, L.radius ?? R * 0.016));
        const shadow = [];
        const n = 160;
        for (let i = 0; i < n; i++) {
          const ta = t0 + ((t1 - t0) * i) / n; const tb = t0 + ((t1 - t0) * (i + 1)) / n;
          const pa = this.w(fx(ta), fy(ta), this.zMin); const pb = this.w(fx(tb), fy(tb), this.zMin);
          shadow.push(pa.x, pa.y, pa.z + 0.003, pb.x, pb.y, pb.z + 0.003);
        }
        g.add(this.segments(shadow, color, 0.7));
        if (L.label) g.add(this.label(L.label, [fx(t1), fy(t1), fz(fx(t1), fy(t1))], 'curve'));
        break;
      }
      case 'contours': {
        const host = this.layers.get(L.of);
        const raw = host?.children[0]?.userData.raw;
        if (!raw) break;
        const vals = raw.raw.map((p) => p[2]);
        const finite = vals.filter((x) => Number.isFinite(x) && x >= this.zMin && x <= this.zMax);
        const lo = Math.min(...finite); const hi = Math.max(...finite);
        const n = L.levels ?? 10;
        const onSurf = [];
        const onSurfIndex = [];
        const floor = [];
        const fz = this.w(0, 0, this.zMin).z + 0.004;
        for (let k = 1; k <= n; k++) {
          const level = L.values?.[k - 1] ?? lo + ((hi - lo) * k) / (n + 1);
          const segs = this.contourSegments(vals, raw.N, raw.M, level);
          const target = k % 5 === 0 ? onSurfIndex : onSurf;
          const map = host.userData.surface?.map;
          for (const [a, b] of segs) {
            const pa = map ? map(a[0], a[1]) : [0, 0];
            const pb = map ? map(b[0], b[1]) : [0, 0];
            const A = this.w(pa[0], pa[1], level); const B = this.w(pb[0], pb[1], level);
            const lift = 0.006;
            target.push(A.x, A.y, A.z + lift, B.x, B.y, B.z + lift);
            floor.push(A.x, A.y, fz, B.x, B.y, fz);
          }
        }
        if (L.surface !== false) {
          g.add(this.segments(onSurf, pal.contour, 0.95));
          g.add(this.segments(onSurfIndex, pal.index, 1));
        }
        if (L.floor !== false) g.add(this.segments(floor, pal.contour, 0.9));
        break;
      }
      case 'gradientField': {
        const host = this.layers.get(L.of)?.userData.surface;
        if (!host) break;
        const d = L.density ?? 9;
        const h = 1e-4;
        const vecs = [];
        let max = 0;
        for (let i = 0; i < d; i++) for (let j = 0; j < d; j++) {
          const x = -R + ((i + 0.5) * 2 * R) / d; const y = -R + ((j + 0.5) * 2 * R) / d;
          const gx = (host.f(x + h, y) - host.f(x - h, y)) / (2 * h);
          const gy = (host.f(x, y + h) - host.f(x, y - h)) / (2 * h);
          if (!Number.isFinite(gx) || !Number.isFinite(gy)) continue;
          const m = Math.hypot(gx, gy);
          max = Math.max(max, m);
          vecs.push([x, y, gx, gy, m]);
        }
        const cell = (2 * R) / d;
        for (const [x, y, gx, gy, m] of vecs) {
          if (m < 1e-9) continue;
          const len = (0.42 + 0.48 * (m / max)) * cell * 0.85;
          g.add(this.arrow([x, y, this.zMin], [x + (gx / m) * len, y + (gy / m) * len, this.zMin], colorOf(pal, L.color ?? 'water'), R * 0.008));
        }
        break;
      }
      case 'tangentPlane': {
        const host = this.layers.get(L.of)?.userData.surface;
        if (!host) break;
        const [x0, y0] = L.at;
        const h = 1e-4;
        const z0 = host.f(x0, y0);
        const fx = (host.f(x0 + h, y0) - host.f(x0 - h, y0)) / (2 * h);
        const fy = (host.f(x0, y0 + h) - host.f(x0, y0 - h)) / (2 * h);
        const s = L.size ?? R * 0.45;
        const plane = this.gridSurface((a, b) => { const x = x0 - s + 2 * s * a; const y = y0 - s + 2 * s * b; return [x, y, z0 + fx * (x - x0) + fy * (y - y0)]; }, { n: 6, color: colorOf(pal, 'water'), opacity: 0.45, mesh: true, meshEvery: 1 });
        g.add(plane);
        g.add(this.point([x0, y0, z0], pal.road));
        if (L.label !== false) g.add(this.label(L.label ?? `z = ${fmt(z0, 2)} + ${fmt(fx, 2)}(x − ${fmt(x0, 2)}) + ${fmt(fy, 2)}(y − ${fmt(y0, 2)})`, [x0 + s, y0 + s, z0 + fx * s + fy * s], 'note'));
        break;
      }
      case 'vectorField': {
        const P = fn(L.P, ['x', 'y', 'z']); const Q = fn(L.Q, ['x', 'y', 'z']);
        const three = L.R !== undefined && String(L.R).trim() !== '0' || L.threeD;
        const Rf = fn(L.R ?? '0', ['x', 'y', 'z']);
        const d = L.density ?? (three ? 5 : 9);
        const box = L.box ?? R;
        const zLevels = three ? Array.from({ length: d }, (_, k) => this.zMin + ((k + 0.5) * (this.zMax - this.zMin)) / d) : [Math.min(Math.max(0, this.zMin), this.zMax)];
        const items = [];
        let max = 0;
        for (const z of zLevels) for (let i = 0; i < d; i++) for (let j = 0; j < d; j++) {
          const x = -box + ((i + 0.5) * 2 * box) / d; const y = -box + ((j + 0.5) * 2 * box) / d;
          const v = [P(x, y, z), Q(x, y, z), three ? Rf(x, y, z) : 0];
          if (!v.every(Number.isFinite)) continue;
          const m = Math.hypot(...v);
          max = Math.max(max, m);
          items.push([x, y, z, v, m]);
        }
        const cell = (2 * box) / d;
        for (const [x, y, z, v, m] of items) {
          if (m < 1e-9) continue;
          const len = (0.35 + 0.55 * (m / max)) * cell * 0.85;
          const [r, gg, b] = cmap('water', 0.25 + 0.6 * (m / max));
          const col = `#${[r, gg, b].map((c) => Math.round(c * 255).toString(16).padStart(2, '0')).join('')}`;
          g.add(this.arrow([x, y, z], [x + (v[0] / m) * len, y + (v[1] / m) * len, z + ((v[2] / m) * len) / this.zs], L.color ? colorOf(pal, L.color) : col, R * 0.009));
        }
        break;
      }
      case 'region2d': {
        const spec = regionSpec(L);
        const { map, polar } = domainMap(spec, R);
        const z = this.zMin;
        g.add(this.gridSurface((s, t) => { const [x, y] = map(s, t); return [x, y, z]; }, { n: 40, color: colorOf(pal, L.color ?? 'water'), opacity: L.opacity ?? 0.42, mesh: false }));
        const edge = [];
        const n = 120;
        const loop = [];
        for (let i = 0; i <= n; i++) loop.push(map(i / n, 0));
        for (let i = 0; i <= n; i++) loop.push(map(1, i / n));
        for (let i = n; i >= 0; i--) loop.push(map(i / n, 1));
        for (let i = n; i >= 0; i--) loop.push(map(0, i / n));
        for (let i = 0; i < loop.length - 1; i++) {
          const a = this.w(loop[i][0], loop[i][1], z); const b = this.w(loop[i + 1][0], loop[i + 1][1], z);
          edge.push(a.x, a.y, a.z + 0.004, b.x, b.y, b.z + 0.004);
        }
        g.add(this.segments(edge, colorOf(pal, L.color ?? 'water'), 1));
        if (L.strips) {
          const strips = [];
          const k = L.count ?? 12;
          for (let i = 1; i < k; i++) {
            const u = i / k;
            for (let j = 0; j < 40; j++) {
              const along = (s0, s1) => {
                const a = this.w(...s0, z); const b = this.w(...s1, z);
                strips.push(a.x, a.y, a.z + 0.006, b.x, b.y, b.z + 0.006);
              };
              const vertical = L.strips === 'vertical' || L.strips === 'radial';
              if (polar ? L.strips === 'radial' : vertical) along(map(u, j / 40), map(u, (j + 1) / 40));
              else along(map(j / 40, u), map((j + 1) / 40, u));
            }
          }
          g.add(this.segments(strips, pal.road, 0.85));
        }
        if (L.label) { const c = map(0.5, 0.5); g.add(this.label(L.label, [c[0], c[1], z], 'region')); }
        break;
      }
      case 'polarBox': {
        const { r, theta, dr = 0.3, dtheta = 0.3 } = L;
        const z = this.zMin;
        g.add(this.gridSurface((s, t) => { const rr = r + dr * s; const th = theta + dtheta * t; return [rr * Math.cos(th), rr * Math.sin(th), z]; }, { n: 8, color: pal.road, opacity: 0.55, mesh: false }));
        const e = [];
        const add = (a, b) => { const A = this.w(...a, z); const B = this.w(...b, z); e.push(A.x, A.y, A.z + 0.006, B.x, B.y, B.z + 0.006); };
        for (let i = 0; i < 20; i++) {
          const t0 = theta + (dtheta * i) / 20; const t1 = theta + (dtheta * (i + 1)) / 20;
          add([r * Math.cos(t0), r * Math.sin(t0)], [r * Math.cos(t1), r * Math.sin(t1)]);
          add([(r + dr) * Math.cos(t0), (r + dr) * Math.sin(t0)], [(r + dr) * Math.cos(t1), (r + dr) * Math.sin(t1)]);
        }
        add([r * Math.cos(theta), r * Math.sin(theta)], [(r + dr) * Math.cos(theta), (r + dr) * Math.sin(theta)]);
        add([r * Math.cos(theta + dtheta), r * Math.sin(theta + dtheta)], [(r + dr) * Math.cos(theta + dtheta), (r + dr) * Math.sin(theta + dtheta)]);
        add([0, 0], [r * Math.cos(theta), r * Math.sin(theta)]);
        add([0, 0], [r * Math.cos(theta + dtheta), r * Math.sin(theta + dtheta)]);
        g.add(this.segments(e, pal.road, 1));
        const mid = theta + dtheta / 2;
        g.add(this.label('Δr', [(r + dr / 2) * Math.cos(theta) + 0.15 * Math.sin(theta), (r + dr / 2) * Math.sin(theta) - 0.15 * Math.cos(theta), z], 'note'));
        g.add(this.label('r Δθ', [(r + dr + 0.25) * Math.cos(mid), (r + dr + 0.25) * Math.sin(mid), z], 'note'));
        break;
      }
      case 'solid': {
        const spec = regionSpec(L);
        const { map } = domainMap(spec, R);
        const fb = fn(L.bottom, ['x', 'y']); const ft = fn(L.top, ['x', 'y']);
        const color = L.color ? colorOf(pal, L.color) : null;
        const op = L.opacity ?? 0.62;
        g.add(this.gridSurface((s, t) => { const [x, y] = map(s, t); return [x, y, ft(x, y)]; }, { n: 40, colormap: L.colormap ?? 'terrain', color, opacity: op }));
        g.add(this.gridSurface((s, t) => { const [x, y] = map(s, t); return [x, y, fb(x, y)]; }, { n: 30, color: color ?? pal.contour, opacity: op * 0.7, mesh: false }));
        // side walls along the four edges of the parameter square
        const wall = (edge) => this.gridSurface((s, t) => {
          const [x, y] = map(...edge(s));
          const lo = fb(x, y); const hi = ft(x, y);
          return [x, y, lo + (hi - lo) * t];
        }, { n: 40, m: 6, color: color ?? pal.contour, opacity: op * 0.55, mesh: false });
        g.add(wall((s) => [s, 0]), wall((s) => [s, 1]), wall((s) => [0, s]), wall((s) => [1, s]));
        break;
      }
      case 'point': {
        g.add(this.point(L.at, colorOf(pal, L.color ?? 'road')));
        if (L.label) g.add(this.label(L.label, [L.at[0], L.at[1], L.at[2]], 'point'));
        if (L.drop) {
          const a = this.w(L.at[0], L.at[1], L.at[2]); const b = this.w(L.at[0], L.at[1], this.zMin);
          g.add(this.segments([a.x, a.y, a.z, b.x, b.y, b.z], pal.ink, 0.4));
        }
        break;
      }
      case 'vector': {
        const from = L.from ?? [0, 0, 0];
        const color = colorOf(pal, L.color ?? 'water');
        g.add(this.arrow(from, L.to, color, L.radius ?? R * 0.016));
        if (L.label) g.add(this.label(L.label, [(from[0] + L.to[0]) / 2, (from[1] + L.to[1]) / 2, (from[2] + L.to[2]) / 2], 'vec'));
        break;
      }
      case 'plane': {
        const n = new THREE.Vector3(...L.normal).normalize();
        const helper = Math.abs(n.z) < 0.9 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0);
        const u = new THREE.Vector3().crossVectors(n, helper).normalize();
        const v = new THREE.Vector3().crossVectors(n, u).normalize();
        const p = L.point ?? [0, 0, 0];
        const s = L.size ?? R;
        g.add(this.gridSurface((a, b) => {
          const A = -s + 2 * s * a; const B = -s + 2 * s * b;
          return [p[0] + A * u.x + B * v.x, p[1] + A * u.y + B * v.y, p[2] + A * u.z + B * v.z];
        }, { n: 8, color: colorOf(pal, L.color ?? 'wood'), opacity: L.opacity ?? 0.38, mesh: true, meshEvery: 2 }));
        if (L.showNormal !== false) g.add(this.arrow(p, [p[0] + n.x * R * 0.5, p[1] + n.y * R * 0.5, p[2] + n.z * R * 0.5], pal.road, R * 0.013));
        if (L.label) g.add(this.label(L.label, [p[0] + u.x * s, p[1] + u.y * s, p[2] + u.z * s], 'note'));
        break;
      }
      case 'implicit': {
        const [lhs, rhs = '0'] = String(L.F).split('=');
        const F = fn(`(${lhs}) - (${rhs})`, ['x', 'y', 'z']);
        g.add(this.implicitSurface(F, { colormap: L.colormap ?? this.opts.colormap, opacity: L.opacity }));
        break;
      }
      default:
        console.warn('unknown layer kind', L.kind);
    }
    return g;
  }

  // ---- animation primitives (used by Teach mode) ----

  // A tube that can be drawn on progressively: returns { obj, draw(frac) }.
  drawableTube(pointFn, t0, t1, color, radius) {
    const segs = 260;
    const mesh = this.tube(pointFn, t0, t1, color, radius, segs);
    const total = mesh.geometry.index.count;
    const draw = (frac) => {
      mesh.geometry.setDrawRange(0, Math.max(0, Math.floor(Math.min(1, frac) * segs) * 8 * 6));
      this.dirty = true;
    };
    draw(0);
    return { obj: mesh, draw, total };
  }

  // A polyline whose points can be replaced every frame.
  liveLine(color, max = 400, opacity = 1) {
    const pos = new Float32Array(max * 3);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setDrawRange(0, 0);
    const line = new THREE.Line(g, new THREE.LineBasicMaterial({ color: new THREE.Color().setStyle(color, SRGB), transparent: opacity < 1, opacity }));
    line.frustumCulled = false;
    const set = (pts) => {
      let n = 0;
      for (const p of pts) {
        if (n >= max) break;
        if (!p || !p.every(Number.isFinite)) continue;
        const v = this.w(p[0], p[1], p[2]);
        pos[n * 3] = v.x; pos[n * 3 + 1] = v.y; pos[n * 3 + 2] = v.z;
        n++;
      }
      g.attributes.position.needsUpdate = true;
      g.setDrawRange(0, n);
      this.dirty = true;
    };
    return { obj: line, set };
  }

  // Line segments (pairs) that can be replaced every frame, for contour slices.
  liveSegments(color, max = 4000, opacity = 1) {
    const pos = new Float32Array(max * 6);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setDrawRange(0, 0);
    const obj = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: new THREE.Color().setStyle(color, SRGB), transparent: opacity < 1, opacity }));
    obj.frustumCulled = false;
    const set = (segs) => {
      let n = 0;
      for (const [a, b] of segs) {
        if (n >= max) break;
        if (!a.every(Number.isFinite) || !b.every(Number.isFinite)) continue;
        const A = this.w(...a); const B = this.w(...b);
        pos.set([A.x, A.y, A.z, B.x, B.y, B.z], n * 6);
        n++;
      }
      g.attributes.position.needsUpdate = true;
      g.setDrawRange(0, n * 2);
      this.dirty = true;
    };
    return { obj, set };
  }

  // A marker that can move, with a label that can change.
  mover(color, labelCls = 'point') {
    const g = new THREE.Group();
    const dot = this.point([0, 0, 0], color);
    dot.position.set(0, 0, 0);
    g.add(dot);
    const { anchor, text: div } = pointLabel(labelCls, '');
    const lab = new CSS2DObject(anchor);
    g.add(lab);
    const move = (p, text) => {
      if (!p.every(Number.isFinite)) { g.visible = false; return; }
      g.visible = true;
      g.position.copy(this.w(p[0], p[1], p[2]));
      if (text !== undefined) div.textContent = text;
      this.dirty = true;
    };
    return { obj: g, move, label: div };
  }

  // An arrow whose ends can move every frame (no geometry churn).
  liveArrow(color, radius) {
    const r = radius ?? this.R * 0.016;
    const mat = new THREE.MeshLambertMaterial({ color: new THREE.Color().setStyle(color, SRGB) });
    const shaft = new THREE.Mesh(SHARED.cyl, mat);
    const head = new THREE.Mesh(SHARED.cone, mat);
    const holder = new THREE.Group();
    holder.add(shaft, head);
    const up = new THREE.Vector3(0, 1, 0);
    const set = (from, to) => {
      const a = this.w(...from);
      const b = this.w(...to);
      const dir = new THREE.Vector3().subVectors(b, a);
      const len = dir.length();
      if (!Number.isFinite(len) || len < 1e-6) { holder.visible = false; return; }
      holder.visible = true;
      const headLen = Math.min(len * 0.35, r * 7);
      shaft.scale.set(r, len - headLen, r);
      shaft.position.set(0, (len - headLen) / 2, 0);
      head.scale.set(r * 2.6, headLen, r * 2.6);
      head.position.set(0, len - headLen / 2, 0);
      holder.position.copy(a);
      holder.quaternion.setFromUnitVectors(up, dir.normalize());
      this.dirty = true;
    };
    return { obj: holder, set };
  }

  // Animate the camera between two math-space positions.
  cameraTo(pos, p, from) {
    const start = from ?? this.camera.position.clone();
    const end = this.w(...pos);
    const e = 1 - Math.pow(1 - Math.min(1, p), 3);
    this.camera.position.lerpVectors(start, end, e);
    this.dirty = true;
    return start;
  }

  // Keep only the part of a group on one side of an axis-aligned plane.
  clip(group, axis, value, keepBelow = true) {
    const n = new THREE.Vector3(axis === 'x' ? 1 : 0, axis === 'y' ? 1 : 0, axis === 'z' ? 1 : 0);
    const wv = axis === 'z' ? this.w(0, 0, value).z : value;
    const plane = keepBelow ? new THREE.Plane(n.clone().negate(), wv) : new THREE.Plane(n, -wv);
    group.traverse((o) => { if (o.material) [].concat(o.material).forEach((m) => { m.clippingPlanes = [plane]; m.needsUpdate = true; }); });
    this.dirty = true;
    return plane;
  }

  unclip(group) {
    group.traverse((o) => { if (o.material) [].concat(o.material).forEach((m) => { m.clippingPlanes = null; m.needsUpdate = true; }); });
    this.dirty = true;
  }

  // Implicit surface F(x,y,z) = 0 by marching tetrahedra over the view box.
  implicitSurface(F, opts = {}) {
    const R = this.R;
    const N = opts.n ?? 38;
    const zLo = this.zMin; const zHi = this.zMax;
    const xs = (i) => -R + (2 * R * i) / N;
    const zsf = (k) => zLo + ((zHi - zLo) * k) / N;
    const vals = new Float32Array((N + 1) ** 3);
    const id = (i, j, k) => (i * (N + 1) + j) * (N + 1) + k;
    for (let i = 0; i <= N; i++) for (let j = 0; j <= N; j++) for (let k = 0; k <= N; k++) vals[id(i, j, k)] = F(xs(i), xs(j), zsf(k));
    const TETS = [[0, 5, 1, 6], [0, 1, 2, 6], [0, 2, 3, 6], [0, 3, 7, 6], [0, 7, 4, 6], [0, 4, 5, 6]];
    const C = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
    const pos = [];
    const interp = (pa, pb, va, vb) => { const t = va / (va - vb); return [pa[0] + (pb[0] - pa[0]) * t, pa[1] + (pb[1] - pa[1]) * t, pa[2] + (pb[2] - pa[2]) * t]; };
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) for (let k = 0; k < N; k++) {
      const P = C.map(([a, b, c]) => [xs(i + a), xs(j + b), zsf(k + c)]);
      const V = C.map(([a, b, c]) => vals[id(i + a, j + b, k + c)]);
      if (V.some((v) => !Number.isFinite(v))) continue;
      for (const t of TETS) {
        const inside = t.filter((q) => V[q] < 0);
        const outside = t.filter((q) => V[q] >= 0);
        if (inside.length === 0 || inside.length === 4) continue;
        const e = (a, b) => interp(P[a], P[b], V[a], V[b]);
        if (inside.length === 1 || inside.length === 3) {
          const [lone, others] = inside.length === 1 ? [inside[0], outside] : [outside[0], inside];
          pos.push(...e(lone, others[0]), ...e(lone, others[1]), ...e(lone, others[2]));
        } else {
          const [a, b] = inside; const [c, d] = outside;
          const p1 = e(a, c); const p2 = e(a, d); const p3 = e(b, d); const p4 = e(b, c);
          pos.push(...p1, ...p2, ...p3, ...p1, ...p3, ...p4);
        }
      }
    }
    const arr = new Float32Array(pos.length);
    const col = new Float32Array(pos.length);
    const c = new THREE.Color();
    for (let q = 0; q < pos.length; q += 3) {
      const v = this.w(pos[q], pos[q + 1], pos[q + 2]);
      arr.set([v.x, v.y, v.z], q);
      const [r, g, b] = cmap(opts.colormap ?? 'terrain', (pos[q + 2] - zLo) / (zHi - zLo || 1));
      c.setRGB(r, g, b, SRGB);
      col.set([c.r, c.g, c.b], q);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geo.computeVertexNormals();
    const op = opts.opacity ?? 0.9;
    const mesh = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({ vertexColors: true, side: THREE.DoubleSide, shininess: 14, transparent: op < 1, opacity: op, depthWrite: op >= 0.99 }));
    mesh.userData.probe = true;
    this.probes.push(mesh);
    const g = new THREE.Group();
    g.add(mesh);
    return g;
  }

  // Adds an object into a named overlay group (cleared by clearOverlay).
  overlay(obj) {
    if (!this.overlayGroup) {
      this.overlayGroup = new THREE.Group();
      this.root.add(this.overlayGroup);
    }
    if (!this.overlayGroup.parent) this.root.add(this.overlayGroup);
    this.overlayGroup.add(obj);
    this.dirty = true;
    return obj;
  }

  clearOverlay() {
    if (!this.overlayGroup) return;
    this.overlayGroup.traverse((o) => {
      if (o.geometry && !o.geometry.userData.shared) o.geometry.dispose();
      if (o.material) [].concat(o.material).forEach((m) => m.dispose());
      if (o.isCSS2DObject) o.element.remove();
    });
    this.overlayGroup.clear();
    this.dirty = true;
  }

  point(at, color) {
    const m = new THREE.Mesh(SHARED.sphere, new THREE.MeshLambertMaterial({ color: new THREE.Color().setStyle(color, SRGB) }));
    m.scale.setScalar(this.R * 0.034);
    if (at.every(Number.isFinite)) m.position.copy(this.w(at[0], at[1], at[2]));
    else m.visible = false;
    return m;
  }

  // ---- steps ----
  show(ids, animate = true) {
    const set = ids ? new Set(ids) : null;
    const now = performance.now();
    for (const [id, group] of this.layers) {
      const on = !set || set.has(id);
      if (on && !group.visible && animate) this.fadeIn(group, now);
      group.visible = on;
    }
    this.dirty = true;
  }

  fadeIn(group, now) {
    group.traverse((o) => {
      if (!o.material) return;
      for (const m of [].concat(o.material)) {
        if (m.userData.base === undefined) m.userData.base = { opacity: m.opacity, transparent: m.transparent };
        m.transparent = true;
        m.opacity = 0;
        this.fades.push({ m, start: now });
      }
    });
    group.traverse((o) => { if (o.isCSS2DObject) { o.element.style.opacity = '0'; this.fades.push({ el: o.element, start: now }); } });
  }

  stepFades(now) {
    const dur = 420;
    this.fades = this.fades.filter((f) => {
      const k = Math.min(1, (now - f.start) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      if (f.m) {
        f.m.opacity = f.m.userData.base.opacity * e;
        if (k >= 1) { f.m.transparent = f.m.userData.base.transparent; f.m.opacity = f.m.userData.base.opacity; }
      } else f.el.style.opacity = String(e);
      return k < 1;
    });
    this.dirty = true;
  }

  // ---- probing ----
  onPointer(e) {
    if (!this.opts.onProbe) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.probes.filter((m) => m.parent?.parent?.visible !== false && m.visible), false);
    if (!hits.length) return this.opts.onProbe(null);
    const p = hits[0].point;
    this.opts.onProbe({ x: p.x, y: p.y, z: (p.z - this.zMid) / this.zs + this.zMid, layer: hits[0].object.parent?.parent?.userData.layerId });
  }
}

const SHARED = (() => {
  const cyl = new THREE.CylinderGeometry(1, 1, 1, 10);
  const cone = new THREE.ConeGeometry(1, 1, 14);
  const sphere = new THREE.SphereGeometry(1, 18, 12);
  [cyl, cone, sphere].forEach((g) => (g.userData.shared = true));
  return { cyl, cone, sphere };
})();
