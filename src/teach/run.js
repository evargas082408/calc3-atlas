// Start Teach mode on a plot: build the stage the lesson asks for, then hand the beats to a player.
import { buildTeach } from './beats.js';
import { TeachPlayer } from './player.js';
import { substitute } from '../lib/labmodel.js';

const STRING_KEYS = ['x', 'y', 'z', 'P', 'Q', 'R', 'F', 'expr'];

export function runTeach(plot, host, c, params = {}, opts = {}) {
  const plan = buildTeach(c, params);
  if (!plan) return null;
  const layers = (plan.layers ?? []).map((L, i) => {
    const out = { ...L, id: L.id ?? `teach${i}` };
    for (const k of STRING_KEYS) if (typeof out[k] === 'string') out[k] = substitute(out[k], params);
    return out;
  });
  // The ghost sets the vertical extent of the box without being drawn.
  if (plan.ghost) layers.push({ id: '__ghost', kind: 'surface', z: substitute(plan.ghost, params), mesh: false });
  plot.build({ view: plan.view, camera: plan.camera ?? undefined, layers });
  const ghost = plot.layers.get('__ghost');
  if (ghost) ghost.visible = false;
  // The stage starts empty except for the frame; beats draw everything else.
  for (const [id, g] of plot.layers) if (id !== '__ghost' && plan.hideLayers !== false) g.visible = false;
  const player = new TeachPlayer(plot, host, { onClose: opts.onClose });
  player.load(c, params, { colormap: opts.colormap });
  return player;
}
