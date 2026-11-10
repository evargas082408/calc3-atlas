import { store, addHighlight, removeHighlight } from '../lib/store.js';
import { h, toast } from '../lib/ui.js';

let pop;

function hidePop() {
  pop?.remove();
  pop = null;
}

// Selecting text inside any [data-hl-section] offers to mark it.
export function mountHighlighter() {
  document.addEventListener('mouseup', (e) => {
    if (e.target.closest('.hl-pop')) return;
    setTimeout(() => {
      const sel = window.getSelection();
      const text = sel?.toString().trim();
      if (!text || text.length < 3 || text.length > 600) return hidePop();
      const anchor = sel.anchorNode?.parentElement?.closest('[data-hl-section]');
      if (!anchor) return hidePop();
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      hidePop();
      pop = h(`<div class="hl-pop" role="toolbar" aria-label="Mark selection">
        <button data-c="explain">Explain this</button><button data-c="work">Needs work</button><button data-c="key">Key idea</button></div>`);
      pop.style.left = `${rect.left + window.scrollX + rect.width / 2 - 130}px`;
      pop.style.top = `${rect.top + window.scrollY - 44}px`;
      document.body.appendChild(pop);
      pop.addEventListener('click', (ev) => {
        const c = ev.target.dataset.c;
        if (!c) return;
        const lesson = Number(anchor.dataset.lesson);
        if (c === 'explain') {
          hidePop();
          location.hash = `#/ask?q=${encodeURIComponent(text)}&from=${lesson}`;
          return;
        }
        addHighlight({ lesson, section: anchor.dataset.hlSection, title: anchor.dataset.title ?? '', text, color: c });
        sel.removeAllRanges();
        hidePop();
        applyHighlights(anchor.closest('[data-hl-root]') ?? document);
        toast(c === 'work' ? 'Marked as needs work' : 'Marked as a key idea');
      });
    }, 10);
  });
  document.addEventListener('mousedown', (e) => {
    if (!e.target.closest('.hl-pop')) hidePop();
  });
}

// Wrap saved highlights in <mark>. Only text nodes are touched, so KaTeX output stays intact.
export function applyHighlights(root) {
  const sections = root.querySelectorAll('[data-hl-section]');
  const hl = store.get().highlights;
  sections.forEach((sec) => {
    sec.querySelectorAll('mark[data-hl]').forEach((m) => m.replaceWith(...m.childNodes));
    sec.normalize();
    const lesson = Number(sec.dataset.lesson);
    for (const item of hl.filter((x) => x.lesson === lesson && x.section === sec.dataset.hlSection)) {
      wrapFirst(sec, item);
    }
  });
}

function wrapFirst(sec, item) {
  const walker = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement.closest('.katex, mark, button') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  const needle = item.text.replace(/\s+/g, ' ');
  let node;
  while ((node = walker.nextNode())) {
    const hay = node.nodeValue.replace(/\s+/g, ' ');
    let i = hay.indexOf(needle);
    let len = needle.length;
    if (i < 0) {
      // selections that crossed math only match on their longest plain-text run
      const run = needle.slice(0, 40);
      if (run.length >= 12) { i = hay.indexOf(run); len = run.length; }
    }
    if (i >= 0) {
      const range = document.createRange();
      range.setStart(node, i);
      range.setEnd(node, Math.min(node.length, i + len));
      const mark = document.createElement('mark');
      mark.dataset.hl = item.id;
      if (item.color === 'key') mark.className = 'key';
      mark.title = item.color === 'key' ? 'Key idea (click to remove)' : 'Needs work (click to remove)';
      range.surroundContents(mark);
      mark.addEventListener('click', () => {
        if (confirm('Remove this highlight?')) {
          removeHighlight(item.id);
          mark.replaceWith(...mark.childNodes);
        }
      });
      return;
    }
  }
}
