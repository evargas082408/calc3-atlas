import './styles/main.css';
import { store, mistakeTally } from './lib/store.js';
import { icon, $, $$, escapeHTML } from './lib/ui.js';
import { LESSONS } from './content/course.js';
import { looksLikeMath } from './lib/search.js';
import { mountHighlighter } from './views/highlight.js';

const ROUTES = {
  home: () => import('./views/home.js'),
  lessons: () => import('./views/lessons.js'),
  lesson: () => import('./views/lesson.js'),
  lab: () => import('./views/lab.js'),
  practice: () => import('./views/practice.js'),
  mock: () => import('./views/mock.js'),
  redpen: () => import('./views/redpen.js'),
  marks: () => import('./views/marks.js'),
  sheet: () => import('./views/sheet.js'),
  ask: () => import('./views/ask.js'),
  settings: () => import('./views/settings.js'),
};

const NAV = [
  ['lessons', 'Lessons', 'lessons'],
  ['lab', '3D Lab', 'lab'],
  ['practice', 'Practice', 'practice'],
  ['mock', 'Mock exam', 'mock'],
  ['redpen', 'Mistakes', 'redpen'],
  ['marks', 'Saved', 'bookmark'],
  ['sheet', 'Formulas', 'sheet'],
];

function shell() {
  const app = $('#app');
  const link = (withIcon) => NAV.map(([r, label, ic]) => `<a href="#/${r}" data-route="${r}">${withIcon ? icon(ic) : ''}<span>${label}</span><span class="count" data-count="${r}"></span></a>`).join('');
  app.innerHTML = `
    <header class="nav">
      <a class="brand" href="#/" aria-label="Home"><span class="mark">261</span><span class="name">Calc 3 Atlas<small>Purdue MA 261</small></span></a>
      <nav class="nav-links" aria-label="Main">${link(false)}</nav>
      <div class="nav-tools">
        <button class="search-btn" data-open-palette aria-label="Search or ask">${icon('search')}<span>Search, ask, or type math</span><span class="kbd">Ctrl K</span></button>
        <button class="btn icon quiet" data-theme-toggle aria-label="Toggle dark mode"></button>
        <a class="btn icon quiet" href="#/settings" aria-label="Settings">${icon('settings')}</a>
        <button class="btn icon quiet menu-btn" aria-label="Menu" aria-expanded="false">${icon('menu')}</button>
      </div>
    </header>
    <nav class="nav-drawer" aria-label="Main">${link(true)}</nav>
    <main class="page-host" id="main"></main>
    <div class="palette" hidden><div class="palette-box" role="dialog" aria-label="Search">
      <input placeholder="Search lessons and formulas, ask a question, or type math like z = x^2 - y^2" />
      <ul class="palette-list"></ul>
      <div class="palette-hint"><span>↑↓ to move</span><span>Enter to open</span><span>Esc to close</span></div>
    </div></div>`;

  const menu = $('.menu-btn');
  menu.onclick = () => menu.setAttribute('aria-expanded', String(document.body.classList.toggle('nav-open')));
  $('.nav-drawer').addEventListener('click', () => { document.body.classList.remove('nav-open'); menu.setAttribute('aria-expanded', 'false'); });
  $('[data-theme-toggle]').onclick = toggleTheme;
  setupPalette();
}

function toggleTheme() {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const next = dark ? 'light' : 'dark';
  root.dataset.theme = next;
  store.update((s) => (s.settings.theme = next));
  themeIcon();
  window.dispatchEvent(new CustomEvent('themechange'));
}

function themeIcon() {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  $('[data-theme-toggle]').innerHTML = icon(dark ? 'sun' : 'moon');
}

function counts() {
  const weak = mistakeTally().length;
  const st = store.get();
  const saved = st.bookmarks.length + st.highlights.length;
  $$('[data-count="redpen"]').forEach((c) => (c.textContent = weak ? String(weak) : ''));
  $$('[data-count="marks"]').forEach((c) => (c.textContent = saved ? String(saved) : ''));
}

// ---------- command palette ----------
function setupPalette() {
  const pal = $('.palette');
  const input = $('input', pal);
  const list = $('.palette-list', pal);
  let items = [];
  let active = 0;
  const all = () => [
    { label: 'Home', k: 'page', href: '#/' },
    ...NAV.map(([r, label]) => ({ label, k: 'page', href: `#/${r}` })),
    ...LESSONS.map((l) => ({ label: `${l.id}. ${l.title}`, k: `§${l.section}`, href: `#/lesson/${l.id}` })),
    ...LESSONS.flatMap((l) => (l.content?.formulas ?? []).map((f) => ({ label: `${f.label} (L${l.id})`, k: 'formula', href: `#/lesson/${l.id}` }))),
    { label: 'Settings', k: 'page', href: '#/settings' },
  ];
  const render = () => {
    const q = input.value.toLowerCase().trim();
    items = all().filter((it) => !q || it.label.toLowerCase().includes(q) || it.k.toLowerCase().includes(q)).slice(0, 40);
    if (q) {
      const raw = input.value.trim();
      const math = looksLikeMath(raw);
      const ask = { label: math ? `Draw and explain ${raw}` : `Ask: “${raw}”`, k: math ? 'math' : 'ask', href: `#/ask?q=${encodeURIComponent(raw)}` };
      if (math || !items.length) items.unshift(ask);
      else items.push(ask);
    }
    active = Math.min(active, items.length - 1);
    list.innerHTML = items.map((it, i) => `<li><a href="${it.href}" class="${i === active ? 'active' : ''}"><span>${escapeHTML(it.label)}</span><span class="k">${escapeHTML(it.k)}</span></a></li>`).join('');
  };
  const open = () => { pal.hidden = false; input.value = ''; active = 0; render(); input.focus(); };
  const close = () => (pal.hidden = true);
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? open() : close(); }
    if (e.key === 'Escape' && !pal.hidden) close();
    if (e.key === '/' && !e.target.closest('input, textarea, select') && pal.hidden) { e.preventDefault(); open(); }
  });
  $$('[data-open-palette]').forEach((b) => (b.onclick = open));
  window.openPalette = (text = '') => { open(); input.value = text; active = 0; render(); };
  input.addEventListener('input', () => { active = 0; render(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { active = Math.min(items.length - 1, active + 1); render(); e.preventDefault(); }
    if (e.key === 'ArrowUp') { active = Math.max(0, active - 1); render(); e.preventDefault(); }
    if (e.key === 'Enter' && items[active]) { location.hash = items[active].href; close(); }
  });
  pal.addEventListener('click', (e) => { if (e.target === pal || e.target.closest('a')) close(); });
}

// ---------- routing ----------
let current = null;
async function route() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [path, query = ''] = raw.split('?');
  const parts = path.split('/').filter(Boolean);
  const name = parts[0] || 'home';
  const params = Object.fromEntries(new URLSearchParams(query));
  const loader = ROUTES[name] ?? ROUTES.home;
  document.body.dataset.route = ROUTES[name] ? name : 'home';
  const active = name === 'lesson' ? 'lessons' : name;
  $$('.nav-links a, .nav-drawer a').forEach((a) => (a.dataset.route === active ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
  const host = $('#main');
  current?.dispose?.();
  host.innerHTML = '<div class="page"><div class="skeleton"></div></div>';
  try {
    const mod = await loader();
    host.innerHTML = '';
    current = await mod.default(host, { parts, params });
  } catch (err) {
    console.error(err);
    host.innerHTML = `<div class="page"><h1>That page broke</h1><p class="redpen">${escapeHTML(err.message)}</p><p><a href="#/">Back home</a></p></div>`;
  }
  if (!params.keepScroll) window.scrollTo(0, 0);
  const h1 = document.querySelector('#main h1')?.textContent?.trim();
  document.title = name === 'home' || !h1 ? 'Calc 3 Atlas · MA 261' : `${h1} · Calc 3 Atlas`;
}

shell();
themeIcon();
counts();
store.subscribe(counts);
window.addEventListener('hashchange', route);
route();
mountHighlighter();
