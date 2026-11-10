export default {
  id: 9,
  title: 'Functions of several variables',
  section: '15.1',
  exam: 1,
  blurb: 'Find the domain of f(x, y) or f(x, y, z), picture its graph as a landscape, and read it from a contour map.',
  boiler: ['Function Domain', 'Level Curves'],

  sections: [
    {
      id: 'idea',
      title: 'Two numbers in, one number out',
      body: String.raw`In Calc BC a function took one number and gave back one number. Now the input can be a pair $(x, y)$ or a triple $(x, y, z)$, and the output is still **one number**.

- $f(x) = x^2$: number in, number out. Graph is a curve.
- $\vec r(t)$: number in, vector out. Graph is a path in space (Lessons 5 to 8).
- $f(x, y) = x^2 + y^2$: two numbers in, one number out. Graph is a **surface**.
- $f(x, y, z)$: three numbers in, one number out. No graph you can draw (it would need 4 dimensions).

Evaluating is just plugging in: for $f(x,y) = x^2 + y^2$, $f(1, 3) = 1 + 9 = 10$.

The best mental picture for $z = f(x, y)$ is a **landscape**. The point $(x, y)$ is where you stand on a map, and $f(x, y)$ is the elevation there.`,
    },
    {
      id: 'domain',
      title: 'Domain: where the formula makes sense',
      body: String.raw`The domain is every input you are allowed to plug in. The rules are the same three from Calc I, now applied to a region instead of an interval:

1. Even roots: the inside must be $\ge 0$.
2. Denominators: must be $\ne 0$.
3. Logs: the inside must be $> 0$ (strictly).

Write the condition as an inequality, draw its boundary curve, then test one point to see which side is shaded. Draw the boundary **solid** if it is included ($\ge$) and **dashed** if it is not ($>$).

**Example.** $f(x, y) = \sqrt{x + y + 1}$ needs $x + y + 1 \ge 0$, so $y \ge -x - 1$. That is the half-plane on and above the line $x + y = -1$. Test $(0,0)$: $1 \ge 0$, so the origin's side is shaded, line drawn solid.

**Example.** $f(x, y) = y\ln(y^2 - x)$ needs $y^2 - x > 0$, so $x < y^2$: everything to the left of the sideways parabola $x = y^2$, parabola dashed. Test $(-2, 0)$: $0 + 2 > 0$, inside. Test $(2,0)$: $-2$, outside.

**Example.** $f(x, y) = \dfrac{1}{x^2 + y^2}$: all of $\mathbb{R}^2$ except the origin.

Watch for absolute values. $\ln|x^2 - y^2|$ only fails where $x^2 - y^2 = 0$, so its domain is everything except the two lines $|x| = |y|$. Without the absolute value it would be the much smaller region $|x| > |y|$.`,
    },
    {
      id: 'domain-3d',
      title: 'Domains in three variables',
      body: String.raw`For $f(x, y, z)$ the domain is a region in **space**, not in the plane. Same rules, but now each condition is a solid.

**Example (from lecture).** $f(x,y,z) = \dfrac{\sqrt{9 - x^2 - y^2}}{\sqrt{25 - z^2}}$.

- Top root: $9 - x^2 - y^2 \ge 0$, so $x^2 + y^2 \le 9$. In space, with $z$ free, that is a **solid cylinder** of radius 3 around the $z$-axis (not a disk: $z$ can be anything).
- Bottom root: it is in a denominator, so it must be strictly positive: $25 - z^2 > 0$, so $-5 < z < 5$.

Domain: the solid cylinder $x^2 + y^2 \le 9$ cut off between the planes $z = -5$ and $z = 5$, with those two caps not included.

A quick check: $f(0, 1, 5)$ is undefined, because the bottom becomes $\sqrt{0} = 0$.`,
    },
    {
      id: 'level-curves',
      title: 'Level curves: the topographic map',
      body: String.raw`Drawing surfaces by hand is hard, so we flatten them. Pick a height $k$ and ask: where on the map is the elevation exactly $k$? The answer,

$$\{(x, y) : f(x, y) = k\},$$

is the **level curve** (contour) at height $k$. Geometrically, slice the surface with the horizontal plane $z = k$ and look straight down at the cut. Draw several of these for evenly spaced $k$ and you have a **contour map**, exactly like a hiking map.

**Example.** $f(x, y) = \sqrt{9 - x^2 - y^2}$ (the top half of the sphere of radius 3).

- $k = 0$: $x^2 + y^2 = 9$, circle of radius 3.
- $k = 1$: $9 - x^2 - y^2 = 1$, so $x^2 + y^2 = 8$, radius $2\sqrt2$.
- $k = 2$: $x^2 + y^2 = 5$, radius $\sqrt5$.
- $k = 3$: $x^2 + y^2 = 0$, just the origin (the top of the dome).

**Reading a contour map.**

- Curves **close together** mean the height changes a lot over a short walk: **steep**.
- Curves far apart: gentle.
- Circles: a bowl or a hill. Which one? Check whether $k$ grows or shrinks as the circles get bigger.
- Parallel, evenly spaced lines: a plane. For $f = 6 - 3x - 2y$, every level curve $3x + 2y = 6 - k$ is a line of slope $-3/2$.

For the bowl $z = x^2 + y^2$, levels $k = 1, 2, 3, 4$ give radii $1, \sqrt2, \sqrt3, 2$. The gaps shrink as you go out, because the bowl gets steeper.`,
    },
    {
      id: 'level-surfaces',
      title: 'Level surfaces for f(x, y, z)',
      body: String.raw`You cannot graph $w = f(x, y, z)$, but you can still slice it. Setting $f(x, y, z) = k$ gives a **level surface** in space: the set of points where $f$ has the value $k$. Think of temperature in a room: a level surface is all the points that are exactly 70 degrees.

**Example.** $f(x, y, z) = x^2 + y^2 + z^2$. The level surface $f = 4$ is the sphere of radius 2. All the level surfaces are nested spheres.

Level surfaces are where the quadric surfaces from Lessons 3 and 4 come back. For $f = x^2 + y^2 - z^2$: $k = 0$ gives a cone, $k > 0$ a hyperboloid of one sheet, $k < 0$ a hyperboloid of two sheets.

Level surfaces matter later: in Lesson 14 the gradient of $F$ will be the normal vector to the level surface $F = k$.`,
    },
  ],

  formulas: [
    { label: 'Level curve at height k', tex: String.raw`\{(x,y) : f(x,y) = k\}` },
    { label: 'Level surface', tex: String.raw`\{(x,y,z) : f(x,y,z) = k\}` },
    { label: 'Domain rules', tex: String.raw`\sqrt{\,g\,}: g \ge 0 \qquad \tfrac{1}{g}: g \ne 0 \qquad \ln g: g > 0` },
    { label: 'Graph of f(x, y)', tex: String.raw`\{(x, y, f(x,y)) : (x,y) \in D\}` },
  ],

  mistakes: [
    {
      id: 'strict-vs-nonstrict',
      title: 'Mixing up strict and non-strict inequalities',
      wrong: String.raw`$\ln(9 - x^2 - 9y^2)$ is defined for $x^2 + 9y^2 \le 9$`,
      right: String.raw`It needs $x^2 + 9y^2 < 9$: logs need strictly positive input, so the boundary ellipse is dashed.`,
      why: 'Square roots allow 0, logs do not, and a root in a denominator does not either. Decide for each piece separately.',
    },
    {
      id: 'wrong-space',
      title: 'Drawing a 3-variable domain in the plane',
      wrong: String.raw`Domain of $\sqrt{1 - x^2 - y^2}$ as a function of $x, y, z$ is a disk`,
      right: String.raw`It is a solid cylinder: $z$ is unrestricted, so the disk extends up and down forever.`,
      why: 'A function of three variables has a domain in space. Any variable that does not appear in a condition is free.',
    },
    {
      id: 'abs-dropped',
      title: 'Ignoring an absolute value inside a log',
      wrong: String.raw`Domain of $\ln|y - x^2|$ is $y > x^2$`,
      right: String.raw`$|y - x^2| > 0$ only fails on the parabola $y = x^2$, so the domain is everything except that curve.`,
      why: 'The absolute value already makes the input non-negative. Only the zero set has to go.',
    },
    {
      id: 'spacing',
      title: 'Reading contour spacing backwards',
      wrong: 'Contours bunched together mean the surface is flat there.',
      right: 'Bunched contours mean steep: you climb a full level in a short distance.',
      why: 'Equal height steps over a shorter walk means a bigger slope. Think of a hiking map where a cliff is a dark band of lines.',
    },
    {
      id: 'level-vs-trace',
      title: 'Confusing a level curve with a trace',
      wrong: String.raw`Level curve of $z = x^2 - y^2$ at $k=1$: set $x = 1$ and get $z = 1 - y^2$`,
      right: String.raw`Set the **output** equal to $k$: $x^2 - y^2 = 1$, a hyperbola in the $xy$-plane.`,
      why: 'A level curve fixes z (the height). Fixing x or y gives a trace, which is a side view, not a map view.',
    },
  ],

  hook: 'A level curve is a contour line on a hiking map: walk along it and your height never changes.',

  scene: {
    view: { range: 3, z: [-0.5, 4] },
    camera: [6, -6, 5],
    layers: [
      { id: 'hill', kind: 'surface', z: '3*exp(-((x-1)^2 + (y-0.5)^2)) + 2*exp(-((x+1.2)^2 + (y+0.8)^2)/0.8)', colormap: 'terrain' },
      { id: 'slice', kind: 'plane', normal: [0, 0, 1], point: [0, 0, 1.5], size: 3 },
      { id: 'lvl', kind: 'contours', of: 'hill', levels: 8 },
      { id: 'peak', kind: 'point', at: [1, 0.5, 3.0], label: 'summit' },
      { id: 'ramp', kind: 'surface', z: '3 - 1.5*x - y', domain: { x: [-1, 2], y: [-1.5, 2] }, colormap: 'viridis', opacity: 0.9 },
      { id: 'rampLvl', kind: 'contours', of: 'ramp', levels: 7 },
    ],
    steps: [
      { label: 'Start', show: ['hill'], caption: String.raw`The graph of $z = f(x, y)$ is a landscape: stand at $(x, y)$ on the map and $f(x, y)$ is your elevation.` },
      { label: 'Slice', show: ['hill', 'slice'], caption: String.raw`Cut the landscape with the flat plane $z = 1.5$. The cut is the set of points where $f(x, y) = 1.5$: one level curve.` },
      { label: 'Contours', show: ['hill', 'lvl', 'peak'], caption: String.raw`Repeat for evenly spaced heights. Each ring is drawn on the surface and dropped onto the floor. Rings shrink to a point at each summit.` },
      { label: 'Map', show: ['lvl'], caption: String.raw`The floor alone is the contour map. Where rings crowd together the hill is steep; where they spread out it is gentle.` },
      { label: 'Plane', show: ['ramp', 'rampLvl'], caption: String.raw`A plane like $z = 3 - 1.5x - y$ has straight, parallel, evenly spaced level lines: the slope is the same everywhere.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Find the domain of $f(x, y) = \ln(9 - x^2 - 9y^2)$.`,
      choices: [
        { tex: String.raw`The inside of the ellipse $\tfrac{x^2}{9} + y^2 = 1$, boundary not included`, correct: true },
        { tex: String.raw`The ellipse $\tfrac{x^2}{9} + y^2 \le 1$, boundary included`, mistake: 'strict-vs-nonstrict', why: 'At the boundary the log input is 0, and ln 0 is undefined.' },
        { tex: String.raw`The outside of the ellipse $\tfrac{x^2}{9} + y^2 = 1$`, mistake: 'sign', why: 'You flipped the inequality: 9 - x^2 - 9y^2 > 0 means x^2 + 9y^2 < 9, the inside.' },
        { tex: String.raw`The open disk $x^2 + y^2 < 9$`, mistake: 'arith', why: 'You dropped the 9 in front of y^2. Dividing by 9 gives x^2/9 + y^2 < 1, an ellipse.' },
        { tex: String.raw`All of $\mathbb{R}^2$ except the ellipse $x^2 + 9y^2 = 9$`, mistake: 'abs-dropped', why: 'That would be the domain of ln|9 - x^2 - 9y^2|. Without the absolute value, negative inputs are not allowed either.' },
      ],
      steps: [
        String.raw`A log needs a strictly positive input: $9 - x^2 - 9y^2 > 0$.`,
        String.raw`Rearrange: $x^2 + 9y^2 < 9$, then divide by 9: $\tfrac{x^2}{9} + y^2 < 1$.`,
        String.raw`That is the inside of an ellipse with $x$-intercepts $\pm 3$ and $y$-intercepts $\pm 1$.`,
        String.raw`The inequality is strict, so the boundary ellipse is dashed (not included).`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Which equation describes the level curve of $f(x, y) = \sqrt{x^2 + 4y^2}$ that passes through the point $(2, 1)$?`,
      choices: [
        { tex: String.raw`$x^2 + 4y^2 = 8$`, correct: true },
        { tex: String.raw`$x^2 + 4y^2 = 2\sqrt2$`, mistake: 'arith', why: 'The level value is k = 2√2, but you must square both sides to clear the root: x^2 + 4y^2 = 8.' },
        { tex: String.raw`$x^2 + y^2 = 5$`, mistake: 'concept', why: 'That is the circle through (2,1), not the set where f keeps the same value.' },
        { tex: String.raw`$z = \sqrt{4 + 4y^2}$`, mistake: 'level-vs-trace', why: 'Setting x = 2 gives a trace (a side view). A level curve sets the output f equal to a constant.' },
        { tex: String.raw`$x + 2y = 4$`, mistake: 'concept', why: 'You cannot take the square root term by term: the root of x^2 + 4y^2 is not x + 2y.' },
      ],
      steps: [
        String.raw`Find the height at the point: $f(2, 1) = \sqrt{4 + 4} = \sqrt 8 = 2\sqrt2$.`,
        String.raw`The level curve is $\sqrt{x^2 + 4y^2} = \sqrt8$.`,
        String.raw`Square both sides: $x^2 + 4y^2 = 8$, an ellipse.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Describe the domain of $f(x, y, z) = \sqrt{1 - x^2 - y^2} + \sqrt{z}$.`,
      choices: [
        { tex: String.raw`The part of the solid cylinder $x^2 + y^2 \le 1$ with $z \ge 0$`, correct: true },
        { tex: String.raw`The disk $x^2 + y^2 \le 1$ in the $xy$-plane`, mistake: 'wrong-space', why: 'f has three inputs, so its domain lives in space. z is not stuck at 0.' },
        { tex: String.raw`The upper half of the solid ball $x^2 + y^2 + z^2 \le 1$`, mistake: 'concept', why: 'z never appears in the first root, so z is not limited by it. The region is a cylinder, not a ball.' },
        { tex: String.raw`The whole solid cylinder $x^2 + y^2 \le 1$`, mistake: 'setup', why: 'You forgot the second root: √z needs z ≥ 0.' },
        { tex: String.raw`The open cylinder $x^2 + y^2 < 1$ with $z > 0$`, mistake: 'strict-vs-nonstrict', why: 'Square roots of 0 are fine, so the boundary is included.' },
      ],
      steps: [
        String.raw`First root: $1 - x^2 - y^2 \ge 0$, so $x^2 + y^2 \le 1$. Since $z$ is free, this is a solid cylinder of radius 1 around the $z$-axis.`,
        String.raw`Second root: $z \ge 0$.`,
        String.raw`Both must hold: the half of the solid cylinder on or above the $xy$-plane.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 1,
      prompt: String.raw`The contour map of $f(x, y) = x^2 + y^2$ is drawn for $k = 1, 2, 3, 4$. Which statement is true?`,
      choices: [
        { tex: String.raw`The circles have radii $1, \sqrt2, \sqrt3, 2$, so they get closer together going outward: the surface gets steeper away from the origin.`, correct: true },
        { tex: String.raw`The circles have radii $1, 2, 3, 4$, evenly spaced, so the slope is constant.`, mistake: 'arith', why: 'x^2 + y^2 = k has radius √k, not k.' },
        { tex: String.raw`The circles get closer together going outward, so the surface flattens out far from the origin.`, mistake: 'spacing', why: 'Close contours mean steep, not flat.' },
        { tex: String.raw`The level curves are parabolas $z = x^2 + k$.`, mistake: 'level-vs-trace', why: 'Parabolas are the side traces. Level curves fix the height and live in the xy-plane.' },
        { tex: String.raw`The circles get bigger as $k$ grows, so the surface is a hill with its top at the origin.`, mistake: 'concept', why: 'Bigger circles at bigger heights means the surface rises as you move out: a bowl, with its bottom at the origin.' },
      ],
      steps: [
        String.raw`$x^2 + y^2 = k$ is a circle of radius $\sqrt k$.`,
        String.raw`Radii: $1, 1.41, 1.73, 2$. The gaps are $0.41, 0.32, 0.27$: shrinking.`,
        String.raw`Same height step over a shorter distance means steeper. The bowl steepens as you move out.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Find the domain of $f(x, y) = \ln|y - x^2|$.`,
      choices: [
        { tex: String.raw`All of $\mathbb{R}^2$ except the parabola $y = x^2$`, correct: true },
        { tex: String.raw`The region above the parabola, $y > x^2$`, mistake: 'abs-dropped', why: 'That is the domain of ln(y - x^2). The absolute value lets the region below the parabola in too.' },
        { tex: String.raw`The region on or above the parabola, $y \ge x^2$`, mistake: 'strict-vs-nonstrict', why: 'On the parabola the input is 0, which ln cannot take. And the absolute value lets the region below in as well.' },
        { tex: String.raw`All of $\mathbb{R}^2$ except the origin`, mistake: 'concept', why: 'The log fails everywhere y = x^2, a whole curve, not just one point.' },
        { tex: String.raw`All of $\mathbb{R}^2$`, mistake: 'concept', why: 'ln 0 is undefined, so the points where y = x^2 must be removed.' },
      ],
      steps: [
        String.raw`A log needs input $> 0$: $|y - x^2| > 0$.`,
        String.raw`An absolute value is always $\ge 0$, and it equals 0 only when $y - x^2 = 0$.`,
        String.raw`Remove the parabola $y = x^2$ and keep everything else (drawn dashed).`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`Which function has level curves that are all parallel straight lines?`,
      choices: [
        { tex: String.raw`$f(x, y) = 2 + \sin(x - y)$`, correct: true },
        { tex: String.raw`$f(x, y) = x^2 - y^2$`, mistake: 'concept', why: 'x^2 - y^2 = k is a hyperbola (or the two lines y = ±x when k = 0, which are not parallel).' },
        { tex: String.raw`$f(x, y) = e^{-(x^2 + y^2)}$`, mistake: 'concept', why: 'Setting it equal to k gives x^2 + y^2 = -ln k: circles.' },
        { tex: String.raw`$f(x, y) = y - x^2$`, mistake: 'concept', why: 'y - x^2 = k gives y = x^2 + k: parabolas stacked vertically.' },
        { tex: String.raw`$f(x, y) = xy$`, mistake: 'concept', why: 'xy = k gives hyperbolas y = k/x.' },
      ],
      steps: [
        String.raw`Set $2 + \sin(x - y) = k$. This only depends on the combination $x - y$.`,
        String.raw`So each level curve is made of lines $x - y = c$ for the values of $c$ that solve $\sin c = k - 2$.`,
        String.raw`All of these lines have slope 1: parallel. The surface is a wavy sheet with ridges running along $y = x + c$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Let $f(x, y, z) = x^2 + y^2 - z^2$. Identify the level surface $f(x, y, z) = -4$.`,
      choices: [
        { tex: String.raw`A hyperboloid of two sheets along the $z$-axis, with vertices $(0, 0, \pm2)$`, correct: true },
        { tex: String.raw`A hyperboloid of one sheet around the $z$-axis`, mistake: 'sign', why: 'One sheet is k > 0. With k = -4 the equation is z^2 - x^2 - y^2 = 4, which has two minus signs on the left.' },
        { tex: String.raw`A cone with vertex at the origin`, mistake: 'arith', why: 'The cone is the level surface k = 0.' },
        { tex: String.raw`A sphere of radius 2`, mistake: 'sign', why: 'A sphere needs all three squares with the same sign.' },
        { tex: String.raw`The circle $x^2 + y^2 = -4$ in the $xy$-plane, which is empty`, mistake: 'wrong-space', why: 'For a function of three variables, f = k is a surface in space. You set z = 0 and lost the z^2 term.' },
      ],
      steps: [
        String.raw`$x^2 + y^2 - z^2 = -4$ becomes $z^2 - x^2 - y^2 = 4$, or $\tfrac{z^2}{4} - \tfrac{x^2}{4} - \tfrac{y^2}{4} = 1$.`,
        String.raw`One plus sign and two minus signs (equal to $+1$): hyperboloid of two sheets, along the axis with the plus sign, the $z$-axis.`,
        String.raw`Set $x = y = 0$: $z^2 = 4$, so the vertices are $(0, 0, \pm 2)$. Between $z = -2$ and $z = 2$ there are no points.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: 'x^2 + y^2', z: 'x^2 + y^2' },
    { kind: 'surface', expr: '3*exp(-((x-1)^2 + (y-0.5)^2)) + 2*exp(-((x+1.2)^2 + (y+0.8)^2)/0.8)', z: '3*exp(-((x-1)^2 + (y-0.5)^2)) + 2*exp(-((x+1.2)^2 + (y+0.8)^2)/0.8)' },
  ],
};
