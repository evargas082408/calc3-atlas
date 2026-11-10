import { store, removeHighlight } from '../lib/store.js';

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
