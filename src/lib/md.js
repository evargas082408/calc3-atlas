import katex from 'katex';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function tex(src, display = false) {
  try {
    return katex.renderToString(src, { displayMode: display, throwOnError: false, strict: 'ignore', trust: false });
  } catch {
    return `<code>${esc(src)}</code>`;
  }
}

// Pull math out first so markdown never touches it, then put it back rendered.
function inline(text) {
  const slots = [];
  const hold = (html) => `\u0000${slots.push(html) - 1}\u0000`;
  let s = text
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => hold(tex(m, true)))
    .replace(/\$([^$\n]+?)\$/g, (_, m) => hold(tex(m)))
    .replace(/`([^`]+)`/g, (_, m) => hold(`<code>${esc(m)}</code>`));
  s = esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => slots[Number(i)]);
}

export function md(src = '') {
  const text = String(src).replace(/\r/g, '');
  // Display math blocks that stand on their own lines become their own paragraph.
  const blocks = text.split(/\n\s*\n/);
  const out = [];
  for (const block of blocks) {
    const lines = block.split('\n');
    if (lines.every((l) => /^\s*[-•]\s+/.test(l))) {
      out.push(`<ul>${lines.map((l) => `<li>${inline(l.replace(/^\s*[-•]\s+/, ''))}</li>`).join('')}</ul>`);
    } else if (lines.every((l) => /^\s*\d+[.)]\s+/.test(l))) {
      out.push(`<ol>${lines.map((l) => `<li>${inline(l.replace(/^\s*\d+[.)]\s+/, ''))}</li>`).join('')}</ol>`);
    } else if (/^\s*\$\$[\s\S]*\$\$\s*$/.test(block)) {
      out.push(`<div class="display-math">${inline(block.trim())}</div>`);
    } else {
      // Mixed blocks: lists that start mid-paragraph still render as lists.
      let para = [];
      let list = null;
      const flush = () => {
        if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`);
        para = [];
      };
      for (const l of lines) {
        const ul = l.match(/^\s*[-•]\s+(.*)/);
        const ol = l.match(/^\s*\d+[.)]\s+(.*)/);
        if (ul || ol) {
          flush();
          const tag = ul ? 'ul' : 'ol';
          if (!list || list.tag !== tag) {
            if (list) out.push(`</${list.tag}>`);
            list = { tag };
            out.push(`<${tag}>`);
          }
          out.push(`<li>${inline((ul || ol)[1])}</li>`);
        } else {
          if (list) {
            out.push(`</${list.tag}>`);
            list = null;
          }
          para.push(l);
        }
      }
      if (list) out.push(`</${list.tag}>`);
      flush();
    }
  }
  return out.join('');
}

export const mdInline = (s = '') => inline(String(s));
