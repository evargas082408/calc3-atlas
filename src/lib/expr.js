import { create, all } from 'mathjs';

export const math = create(all, {});

// Accept the way people type math: 2x, x y, sin x, ln, ^, π, θ, ρ, φ.
export function normalize(src) {
  return String(src)
    .trim()
    .replace(/π/g, 'pi')
    .replace(/θ/g, 'theta')
    .replace(/ρ/g, 'rho')
    .replace(/φ|ϕ/g, 'phi')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/·|×/g, '*')
    .replace(/−/g, '-')
    .replace(/\bln\b/g, 'log')
    .replace(/\barctan\b/g, 'atan')
    .replace(/\barcsin\b/g, 'asin')
    .replace(/\barccos\b/g, 'acos')
    .replace(/\be\^/g, 'exp(1)^')
    // "sin x", "cos 2t", "ln x^2" -> function calls on the next token
    .replace(/\b(sin|cos|tan|sec|csc|cot|sinh|cosh|tanh|asin|acos|atan|exp|log|sqrt)\s+([A-Za-z0-9_.]+(?:\^[A-Za-z0-9_.]+)?)/g, '$1($2)');
}

const cache = new Map();

export function compile(src) {
  const key = String(src);
  if (cache.has(key)) return cache.get(key);
  const node = math.parse(normalize(key));
  const code = node.compile();
  const out = { node, eval: (scope) => code.evaluate(scope) };
  cache.set(key, out);
  return out;
}

// A safe evaluator: returns NaN instead of throwing, and real part only.
export function fn(src, vars) {
  if (typeof src === 'number') return () => src;
  let c;
  try {
    c = compile(src);
  } catch {
    return () => NaN;
  }
  return (...args) => {
    const scope = {};
    vars.forEach((v, i) => (scope[v] = args[i]));
    try {
      const v = c.eval(scope);
      if (typeof v === 'number') return v;
      if (v && typeof v.re === 'number') return Math.abs(v.im) < 1e-9 ? v.re : NaN;
      return Number(v);
    } catch {
      return NaN;
    }
  };
}

export const num = (src) => (typeof src === 'number' ? src : fn(src, [])());

export function derivative(src, v) {
  try {
    return math.derivative(normalize(src), v).toString();
  } catch {
    return null;
  }
}

export function simplify(src) {
  try {
    return math.simplify(normalize(src)).toString();
  } catch {
    return String(src);
  }
}

export function toTex(src) {
  try {
    // mathjs writes -(2 * y) for a negated product; textbooks write -2y
    const s = normalize(src).replace(/-\(\s*([\d.]+)\s*\*\s*([A-Za-z]\w*)\s*\)/g, '-$1 * $2');
    return math.parse(s).toTex({ parenthesis: 'auto', implicit: 'hide' })
      .replace(/\\mathrm\{([A-Za-z])\}/g, '$1') // single letters that mathjs also knows as units (t, m, g...)
      .replace(/(\d)\s*\\cdot\s*(?=[A-Za-z{(]|\\left)/g, '$1') // 2\cdot x -> 2x
      .replace(/([A-Za-z}])\s*\\cdot\s*(?=[A-Za-z])/g, '$1 '); // x\cdot y -> x y
  } catch {
    return String(src);
  }
}

// Free symbols in an expression that are not the plotting variables or known constants.
const KNOWN = new Set(['pi', 'e', 'i', 'Infinity', 'NaN', 'true', 'false', 'phi']);
export function freeSymbols(src, vars) {
  try {
    const node = math.parse(normalize(src));
    const out = new Set();
    node.traverse((n, path, parent) => {
      if (n.isSymbolNode && !(parent && parent.isFunctionNode && parent.fn === n)) {
        if (!vars.includes(n.name) && !KNOWN.has(n.name) && !(n.name in math)) out.add(n.name);
      }
    });
    return [...out];
  } catch {
    return [];
  }
}

export const fmt = (x, d = 3) => {
  if (!Number.isFinite(x)) return '—';
  const r = Math.round(x * 10 ** d) / 10 ** d;
  return Object.is(r, -0) ? '0' : String(r);
};
