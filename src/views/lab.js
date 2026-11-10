import { Plot3D } from '../three/engine.js';
import { COLORMAPS, gradientCSS } from '../three/colormaps.js';
import { md, mdInline, tex } from '../lib/md.js';
import { toTex, fmt } from '../lib/expr.js';
import { store, toggleBookmark } from '../lib/store.js';
import { icon, escapeHTML, toast } from '../lib/ui.js';
import { COLORS, PRESETS, newId, analyzeEntry, entryToLayers, encodeEntries, decodeEntries } from '../lib/labmodel.js';
import { insightFor } from '../teach/insight.js';
import { runTeach } from '../teach/run.js';
import { lessonById } from '../content/course.js';
import { pointInfo } from '../teach/pointinfo.js';
import { drawPointOverlay } from './components.js';

const TYPE_LABEL = {
  graph2d: 'y = f(x)', surface: 'surface', curve: 'curve r(t)', field: 'vector field', implicit: 'implicit surface',
  paramSurface: 'param surface', vector: 'vector', layer: 'from lesson', error: 'error', empty: 'empty',
};
const TEACHABLE = new Set(['graph2d', 'surface', 'curve', 'field', 'implicit', 'paramSurface']);

const fresh = (src, i) => ({ id: newId(), src, color: COLORS[i % COLORS.length], hidden: false });

export default function lab(host, { params: q }) {
  let entries = (q.s && decodeEntries(q.s)) || (q.e ? [fresh(q.e, 0)] : null) || [fresh('z = x^2 - y^2', 0)];
  const sliders = {}; // name -> { value, min, max, step }
  let selected = entries[0]?.id;
  let player = null;
  let rebuildTimer = 0;

  host.innerHTML = `
    <div class="lab">
      <aside class="lab-side" aria-label="Expressions">
        <div class="lab-side-head"><h1>3D Lab</h1><span class="muted" style="font-size:0.82rem">Type an expression, press play to learn it</span></div>
        <details class="presets-wrap" ${entries.length === 1 && !q.s && !q.e ? 'open' : ''}>
          <summary>Examples</summary>
          <div class="presets">${PRESETS.map((p, i) => `<button class="chip" data-preset="${i}">${escapeHTML(p.label)}</button>`).join('')}</div>
        </details>
        <div class="lab-exprs"></div>
        <div class="lab-sliders"></div>
        <div class="lab-add">
          <button class="btn sm" data-act="add">${icon('plus')}Expression</button>
          <button class="btn sm quiet" data-act="clear">${icon('trash')}Clear</button>
          <small>Letters like <code>a</code> get sliders</small>
        </div>
      </aside>
      <section class="lab-stage">
        <div class="lab-toolbar">
          <select class="select" data-act="cmap" aria-label="Colormap">${COLORMAPS.map((c) => `<option ${c === store.get().settings.colormap ? 'selected' : ''}>${c}</option>`).join('')}</select>
          <button class="btn icon sm" data-act="reset" title="Reset view">${icon('reset')}</button>
          <button class="btn icon sm" data-act="snap" title="Save a PNG">${icon('camera')}</button>
          <button class="btn icon sm" data-act="share" title="Copy a link to this setup">${icon('share')}</button>
          <button class="btn icon sm" data-act="bm" title="Bookmark this setup">${icon('bookmark')}</button>
        </div>
        <div class="plot-host" style="position:absolute;inset:0"></div>
        <div class="probe-readout lab-probe" hidden></div>
        <div class="lab-insight" aria-live="polite"></div>
      </section>
    </div>`;

  const exprsEl = host.querySelector('.lab-exprs');
  const slidersEl = host.querySelector('.lab-sliders');
  const insightEl = host.querySelector('.lab-insight');
  const stage = host.querySelector('.lab-stage');
  const probe = host.querySelector('.lab-probe');
  const plot = new Plot3D(host.querySelector('.plot-host'), {
    colormap: store.get().settings.colormap,
    onProbe: (p) => {
      if (!p || player) { probe.hidden = true; return; }
      probe.hidden = false;
      probe.textContent = `(${fmt(p.x, 2)}, ${fmt(p.y, 2)}, ${fmt(p.z, 2)})`;
    },
    onPick: (p) => { if (!player) explainPoint(p); },
  });

  // Click the model: explain that point in the insight panel.
  const explainPoint = (p) => {
    if (!p) return;
    const specs = plot.spec?.layers ?? [];
    let layer = p.layer ? specs.find((l) => l.id === p.layer) : null;
    if (!layer || p.floor) layer = specs.find((l) => l.kind === 'vectorField' && plot.layers.get(l.id)?.visible) ?? layer;
    const info = pointInfo(layer, p, plot.R);
    if (!info) return;
    drawPointOverlay(plot, info.overlay);
    insightEl.hidden = false;
    insightEl.innerHTML = `<h4>${mdInline(info.title)}</h4>${info.lines.map((l) => `<p>${mdInline(l)}</p>`).join('')}
      <p class="actions"><button class="btn sm" data-act="back">${icon('x')}Clear point</button>${info.lessons.map((id) => { const l = lessonById(id); return l ? `<a class="chip" href="#/lesson/${id}">L${id} ${escapeHTML(l.title)}</a>` : ''; }).join('')}</p>`;
    insightEl.querySelector('[data-act=back]').onclick = () => { plot.clearOverlay(); renderInsight(); };
  };

  // ---- parameters ----
  const syncSliders = () => {
    const need = new Set();
    for (const e of entries) analyzeEntry(e).params.forEach((p) => need.add(p));
    for (const k of Object.keys(sliders)) if (!need.has(k)) delete sliders[k];
    for (const k of need) sliders[k] ??= { value: 1, min: -5, max: 5, step: 0.1 };
    slidersEl.innerHTML = [...need].map((k) => `
      <div class="slider-row" data-k="${k}">
        <b>${escapeHTML(k)}</b>
        <input type="range" min="${sliders[k].min}" max="${sliders[k].max}" step="${sliders[k].step}" value="${sliders[k].value}" aria-label="${escapeHTML(k)}">
        <input type="number" step="${sliders[k].step}" value="${sliders[k].value}" aria-label="${escapeHTML(k)} value">
      </div>`).join('');
    slidersEl.querySelectorAll('.slider-row').forEach((row) => {
      const k = row.dataset.k;
      const [range, box] = row.querySelectorAll('input');
      const set = (v) => {
        if (!Number.isFinite(v)) return;
        sliders[k].value = v;
        range.value = v;
        box.value = v;
        scheduleRebuild(40);
      };
      range.oninput = () => set(Number(range.value));
      box.onchange = () => set(Number(box.value));
    });
  };
  const paramValues = () => Object.fromEntries(Object.entries(sliders).map(([k, v]) => [k, v.value]));

  // ---- expression list ----
  const renderList = () => {
    exprsEl.innerHTML = entries.map((e, i) => {
      const { c } = analyzeEntry(e);
      const typed = !e.layer;
      const rangeKeys = c.type === 'curve' ? ['t'] : c.type === 'paramSurface' ? ['u', 'v'] : [];
      return `
        <div class="expr-row ${e.id === selected ? 'sel' : ''}" data-id="${e.id}" style="--c: var(--${e.color})">
          <button class="tab ${e.hidden ? 'off' : ''}" data-act="toggle" title="${e.hidden ? 'Show' : 'Hide'}" aria-pressed="${!e.hidden}" style="border:0;padding:0;cursor:pointer"></button>
          <div class="expr-main">
            <div class="kind"><span class="chip">${i + 1}</span><span>${TYPE_LABEL[c.type] ?? c.type}</span></div>
            ${typed
              ? `<input value="${escapeHTML(e.src)}" spellcheck="false" autocomplete="off" aria-label="Expression ${i + 1}">`
              : `<div class="tex">${escapeHTML(describeLayer(e.layer))}</div>`}
            ${c.type === 'error' ? `<div class="err">${escapeHTML(c.message ?? "Can't read this yet.")}</div>` : typed && c.type !== 'empty' ? `<div class="tex">${previewTex(c)}</div>` : ''}
            ${rangeKeys.map((k) => { const r = e[k] ?? defaults(c, k); return `<div class="sub"><span>${k} from</span><span><input data-range="${k}" data-end="0" value="${escapeHTML(r[0])}" aria-label="${k} start"> to <input data-range="${k}" data-end="1" value="${escapeHTML(r[1])}" aria-label="${k} end"></span></div>`; }).join('')}
          </div>
          <div class="expr-side">
            ${TEACHABLE.has(c.type) ? `<button class="btn icon sm" data-act="teach" title="Teach me this, step by step">${icon('play')}</button>` : ''}
            <button class="btn icon sm quiet" data-act="color" title="Change color">${'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="currentColor"/></svg>'}</button>
            <button class="btn icon sm quiet" data-act="del" title="Remove">${icon('x')}</button>
          </div>
        </div>`;
    }).join('') || '<p class="empty" style="padding:14px">No expressions. Add one below or pick an example.</p>';

    exprsEl.querySelectorAll('.expr-row').forEach((row) => {
      const e = entries.find((x) => x.id === row.dataset.id);
      row.addEventListener('focusin', () => { selected = e.id; markSelected(); renderInsight(); });
      row.addEventListener('click', () => { selected = e.id; markSelected(); renderInsight(); });
      const input = row.querySelector('.expr-main > input');
      if (input) {
        input.oninput = () => {
          e.src = input.value;
          delete e.t; delete e.u; delete e.v;
          const { c } = analyzeEntry(e);
          const sub = row.querySelector('.expr-main .tex, .expr-main .err');
          const html = c.type === 'error' ? `<div class="err">${escapeHTML(c.message ?? '')}</div>` : c.type === 'empty' ? '' : `<div class="tex">${previewTex(c)}</div>`;
          if (sub) sub.outerHTML = html || '<div class="tex"></div>';
          else input.insertAdjacentHTML('afterend', html);
          row.querySelector('.kind span:last-child').textContent = TYPE_LABEL[c.type] ?? c.type;
          syncSliders();
          scheduleRebuild(260);
        };
        input.onkeydown = (ev) => {
          if (ev.key === 'Enter') { ev.preventDefault(); addEntry(''); }
        };
        input.onblur = () => renderListSoon();
      }
      row.querySelectorAll('[data-range]').forEach((inp) => {
        inp.onchange = () => {
          const k = inp.dataset.range;
          const { c } = analyzeEntry(e);
          const r = [...(e[k] ?? defaults(c, k))];
          r[Number(inp.dataset.end)] = inp.value;
          e[k] = r;
          scheduleRebuild(60);
        };
      });
      row.querySelector('[data-act=toggle]').onclick = (ev) => { ev.stopPropagation(); e.hidden = !e.hidden; renderList(); scheduleRebuild(0); };
      row.querySelector('[data-act=color]').onclick = (ev) => { ev.stopPropagation(); e.color = COLORS[(COLORS.indexOf(e.color) + 1) % COLORS.length]; renderList(); scheduleRebuild(0); };
      row.querySelector('[data-act=del]').onclick = (ev) => { ev.stopPropagation(); entries = entries.filter((x) => x !== e); if (selected === e.id) selected = entries[0]?.id; syncSliders(); renderList(); scheduleRebuild(0); };
      row.querySelector('[data-act=teach]')?.addEventListener('click', (ev) => { ev.stopPropagation(); teach(e); });
    });
  };
  let listTimer = 0;
  const renderListSoon = () => { clearTimeout(listTimer); listTimer = setTimeout(() => { if (!exprsEl.contains(document.activeElement)) renderList(); }, 150); };
  const markSelected = () => exprsEl.querySelectorAll('.expr-row').forEach((r) => r.classList.toggle('sel', r.dataset.id === selected));

  const addEntry = (src) => {
    const e = fresh(src, entries.length);
    entries.push(e);
    selected = e.id;
    renderList();
    exprsEl.querySelector(`[data-id="${e.id}"] input`)?.focus();
  };

  // ---- the scene ----
  const buildScene = () => {
    if (player) return;
    const R = 3;
    const pv = paramValues();
    const layers = entries.flatMap((e) => {
      try { return entryToLayers(e, pv, R); } catch { return []; }
    });
    plot.opts.colormap = store.get().settings.colormap;
    try {
      plot.build({ view: { range: R }, layers });
    } catch (err) {
      console.warn(err);
    }
    history.replaceState(null, '', `#/lab?s=${encodeEntries(entries)}`);
    renderInsight();
  };
  const scheduleRebuild = (ms) => { clearTimeout(rebuildTimer); rebuildTimer = setTimeout(buildScene, ms); };

  const renderInsight = () => {
    if (player) { insightEl.hidden = true; return; }
    const e = entries.find((x) => x.id === selected);
    if (!e || e.hidden) { insightEl.hidden = true; return; }
    const { c } = analyzeEntry(e);
    let info = null;
    try { info = insightFor(c, paramValues(), { t: e.t, R: 3 }); } catch { info = null; }
    if (!info) { insightEl.hidden = true; return; }
    insightEl.hidden = false;
    insightEl.innerHTML = `<h4>${escapeHTML(info.kind)}</h4>${md(info.lines.join('\n\n'))}
      <p class="actions">
        ${TEACHABLE.has(c.type) ? `<button class="btn sm primary" data-act="teach-sel">${icon('play')}Teach me this</button>` : ''}
        ${info.lessons.map((id) => { const l = lessonById(id); return l ? `<a class="chip" href="#/lesson/${id}">L${id} ${escapeHTML(l.title)}</a>` : ''; }).join('')}
      </p>`;
    insightEl.querySelector('[data-act=teach-sel]')?.addEventListener('click', () => teach(e));
  };

  // ---- teach mode ----
  const teach = (e) => {
    const { c } = analyzeEntry(e);
    if (!TEACHABLE.has(c.type)) return;
    endTeach(false);
    insightEl.hidden = true;
    stage.querySelector('.lab-toolbar').style.visibility = 'hidden';
    player = runTeach(plot, stage, c, paramValues(), { colormap: store.get().settings.colormap, onClose: () => endTeach(true) });
    if (!player) { stage.querySelector('.lab-toolbar').style.visibility = ''; toast("Teach mode can't explain this one yet."); }
  };
  const endTeach = (rebuild) => {
    if (!player) return;
    player.dispose();
    player = null;
    stage.querySelector('.lab-toolbar').style.visibility = '';
    if (rebuild) buildScene();
  };

  // ---- toolbar and side actions ----
  host.querySelector('[data-act=add]').onclick = () => addEntry('');
  host.querySelector('[data-act=clear]').onclick = () => { endTeach(false); entries = []; syncSliders(); renderList(); buildScene(); };
  host.querySelectorAll('[data-preset]').forEach((b) => (b.onclick = () => {
    const p = PRESETS[Number(b.dataset.preset)];
    endTeach(false);
    entries = p.entries.map((src, i) => ({ ...fresh(src, i), ...(p.range ?? {}) }));
    selected = entries[0].id;
    syncSliders();
    renderList();
    buildScene();
  }));
  host.querySelector('[data-act=cmap]').onchange = (ev) => {
    store.update((s) => (s.settings.colormap = ev.target.value));
    buildScene();
  };
  host.querySelector('[data-act=reset]').onclick = () => plot.resetCamera();
  host.querySelector('[data-act=snap]').onclick = () => {
    const a = document.createElement('a');
    a.href = plot.snapshot();
    a.download = 'ma261-lab.png';
    a.click();
  };
  host.querySelector('[data-act=share]').onclick = async () => {
    try { await navigator.clipboard.writeText(location.href); toast('Link copied'); } catch { toast('Copy the address bar to share'); }
  };
  host.querySelector('[data-act=bm]').onclick = () => {
    const ref = encodeEntries(entries);
    const on = toggleBookmark({ kind: 'lab', lesson: 0, ref, title: entries.map((e) => e.src ?? describeLayer(e.layer)).join('  ·  ').slice(0, 120) || 'Empty lab' });
    toast(on ? 'Lab setup bookmarked' : 'Bookmark removed');
  };
  const onTheme = () => (player ? null : buildScene());
  window.addEventListener('themechange', onTheme);

  syncSliders();
  renderList();
  buildScene();
  if (q.teach !== undefined) {
    const e = entries.find((x) => TEACHABLE.has(analyzeEntry(x).c.type));
    if (e) teach(e);
  }

  return {
    dispose() {
      clearTimeout(rebuildTimer);
      clearTimeout(listTimer);
      window.removeEventListener('themechange', onTheme);
      endTeach(false);
      plot.dispose();
    },
  };
}

function defaults(c, k) {
  const trig = /sin|cos|tan/.test(`${c.x}${c.y}${c.z}`);
  if (k === 't') return trig ? ['0', '2*pi'] : ['-2', '2'];
  if (k === 'u') return trig ? ['0', 'pi'] : ['-2', '2'];
  return trig ? ['0', '2*pi'] : ['-2', '2'];
}

function previewTex(c) {
  const T = (e) => toTex(e);
  switch (c.type) {
    case 'graph2d': return tex(`y = ${T(c.expr)}`);
    case 'surface': return tex(`z = ${T(c.expr)}`);
    case 'curve': return tex(`\\vec r(t) = \\langle ${[c.x, c.y, ...(c.dim === 3 ? [c.z] : [])].map(T).join(', ')} \\rangle`);
    case 'paramSurface': return tex(`\\vec r(u,v) = \\langle ${[c.x, c.y, c.z].map(T).join(', ')} \\rangle`);
    case 'field': return tex(`\\vec F = \\langle ${[c.P, c.Q, ...(c.dim === 3 ? [c.R] : [])].map(T).join(', ')} \\rangle`);
    case 'implicit': return tex(`${T(c.lhs)} = ${T(c.rhs)}`);
    case 'vector': return tex(`\\langle ${c.raw.map(T).join(', ')} \\rangle`);
    default: return '';
  }
}

function describeLayer(L) {
  switch (L.kind) {
    case 'vector': return `vector ${L.label ?? ''} to (${L.to.join(', ')})`;
    case 'plane': return `plane with normal ⟨${L.normal.join(', ')}⟩ through (${(L.point ?? [0, 0, 0]).join(', ')})`;
    case 'point': return `point ${L.label ?? ''} (${L.at.join(', ')})`;
    case 'solid': return `solid from z = ${L.bottom} to z = ${L.top}`;
    default: return L.kind;
  }
}
