import { EXAM_DEFAULT } from '../content/course.js';
import { store } from '../lib/store.js';
import { COLORMAPS, gradientCSS } from '../three/colormaps.js';
import { escapeHTML, icon, toast } from '../lib/ui.js';

// ISO with offset -> value for <input type="datetime-local"> in local time.
const toLocalInput = (iso) => {
  const d = new Date(iso);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
};

export default function settings(host) {
  const s = store.get().settings;
  host.innerHTML = `
    <div class="page" style="max-width:760px">
      <div class="page-head"><div><h1>Settings</h1><p>Everything is stored in this browser only. Export a backup before clearing site data.</p></div></div>
      <form class="settings-form" style="display:grid;gap:18px">
        <section class="panel">
          <h2>Exam</h2>
          <div class="field"><label for="ename">Name</label><input id="ename" name="examName" value="${escapeHTML(s.examName ?? EXAM_DEFAULT.name)}"></div>
          <div class="field"><label for="edate">Date and time</label><input id="edate" name="examISO" type="datetime-local" value="${toLocalInput(s.examISO ?? EXAM_DEFAULT.iso)}"></div>
          <p class="empty">Exam 2 is Wednesday, November 18, 8 to 9 pm. Change it here if that moves.</p>
        </section>
        <section class="panel">
          <h2>Look</h2>
          <div class="field"><label for="theme">Theme</label><select id="theme" name="theme">${[['auto', 'Follow the system'], ['light', 'Day map'], ['dark', 'Night map']].map(([v, l]) => `<option value="${v}" ${s.theme === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
          <div class="field"><label>Surface colormap</label><div style="display:grid;gap:6px">${COLORMAPS.map((c) => `<label style="display:flex;gap:10px;align-items:center;font-weight:500"><input type="radio" name="colormap" value="${c}" ${s.colormap === c ? 'checked' : ''}><span style="width:120px;height:12px;border-radius:2px;background:${gradientCSS(c)}"></span>${c}</label>`).join('')}</div></div>
        </section>
        <section class="panel">
          <h2>Claude (optional)</h2>
          <p>With your own Anthropic API key, the Ask page also writes an answer to your exact question. The key is saved in this browser and sent only to api.anthropic.com. Usage is billed to your account.</p>
          <div class="field"><label for="key">API key</label><input id="key" name="apiKey" type="password" autocomplete="off" value="${escapeHTML(s.apiKey ?? '')}" placeholder="sk-ant-…"></div>
          <div class="field"><label for="model">Model</label><select id="model" name="model">${[['claude-opus-5-5', 'Claude Opus 5.5 (best explanations)'], ['claude-sonnet-5-5', 'Claude Sonnet 5.5 (cheaper)'], ['claude-haiku-5-5', 'Claude Haiku 5.5 (cheapest)']].map(([v, l]) => `<option value="${v}" ${s.model === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
        </section>
        <p><button class="btn primary">${icon('check')}Save</button></p>
      </form>
      <section class="panel" style="margin-top:18px">
        <h2>Your data</h2>
        <p style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn" data-act="export">${icon('download')}Export backup</button>
          <label class="btn" style="cursor:pointer">${icon('upload')}Import backup<input type="file" accept="application/json" hidden data-act="import"></label>
          <button class="btn quiet" data-act="reset" style="color:var(--road)">${icon('trash')}Erase everything</button>
        </p>
      </section>
    </div>`;

  host.querySelector('.settings-form').onsubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const date = f.get('examISO');
    store.update((st) => {
      st.settings.examName = f.get('examName').trim() || null;
      st.settings.examISO = date ? new Date(date).toISOString() : null;
      st.settings.theme = f.get('theme');
      st.settings.colormap = f.get('colormap') ?? st.settings.colormap;
      st.settings.apiKey = f.get('apiKey').trim();
      st.settings.model = f.get('model');
    });
    const root = document.documentElement;
    const theme = store.get().settings.theme;
    if (theme === 'auto') delete root.dataset.theme;
    else root.dataset.theme = theme;
    window.dispatchEvent(new CustomEvent('themechange'));
    window.dispatchEvent(new CustomEvent('settingschange'));
    toast('Saved');
  };
  host.querySelector('[data-act=export]').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([store.exportJSON()], { type: 'application/json' }));
    a.download = `ma261-atlas-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };
  host.querySelector('[data-act=import]').onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      store.importJSON(await file.text());
      toast('Backup restored');
      location.reload();
    } catch {
      toast("That file isn't a valid backup");
    }
  };
  host.querySelector('[data-act=reset]').onclick = () => {
    if (!confirm('Erase all attempts, bookmarks, highlights, notes and settings? This cannot be undone.')) return;
    store.reset();
    location.reload();
  };
}
