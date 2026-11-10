// Colormaps as sRGB stops. `terrain` is the hypsometric tint of a topographic map:
// lowland green, upland tan, ridge brown, summit near-white.
const STOPS = {
  terrain: ['#3f7d4e', '#7fae6a', '#cfd98f', '#e8cf8a', '#c99a5b', '#8f6136', '#efe9df'],
  inferno: ['#1b0c41', '#4a0c6b', '#781c6d', '#a52c60', '#cf4446', '#ed6925', '#fb9b06', '#f7d13d'],
  viridis: ['#440154', '#414487', '#2a788e', '#22a884', '#7ad151', '#fde725'],
  textbook: ['#5e3c99', '#2b83ba', '#4dbf9a', '#c7e66b', '#fdae61', '#e7568f'],
  water: ['#163f6b', '#2f6db5', '#6fa4d8', '#bcd8ef'],
};

const parse = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
const CACHE = Object.fromEntries(Object.entries(STOPS).map(([k, v]) => [k, v.map(parse)]));

export const COLORMAPS = Object.keys(STOPS);

export function sample(name, t) {
  const stops = CACHE[name] ?? CACHE.terrain;
  const x = Math.min(1, Math.max(0, Number.isFinite(t) ? t : 0)) * (stops.length - 1);
  const i = Math.min(stops.length - 2, Math.floor(x));
  const f = x - i;
  const a = stops[i];
  const b = stops[i + 1];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}

export const gradientCSS = (name) => `linear-gradient(90deg, ${(STOPS[name] ?? STOPS.terrain).join(', ')})`;
