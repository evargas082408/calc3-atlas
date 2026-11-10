export default {
  id: 21,
  title: 'Triple integrals',
  section: '16.4',
  exam: 2,
  blurb: 'Integrate over a solid: z from the bottom surface to the top, then a double integral over the shadow.',
  boiler: ['Triple Integrals', 'Rewrite to Reorder dx dy dz'],

  sections: [
    {
      id: 'idea',
      title: 'The idea',
      body: String.raw`A triple integral adds up $f(x,y,z)$ times tiny volumes $\Delta V = \Delta x\,\Delta y\,\Delta z$ over a solid $E$:

$$\iiint_E f\,dV = \lim \sum f(x_i,y_j,z_k)\,\Delta x\,\Delta y\,\Delta z.$$

You cannot picture it as a volume under anything (that would need four dimensions). Read it by what $f$ means instead:

- $f = 1$: $\iiint_E 1\,dV$ is the **volume** of $E$.
- $f$ = density: $\iiint_E f\,dV$ is the **mass** of $E$.
- Divided by the volume: $\tfrac{1}{V}\iiint_E f\,dV$ is the **average value** of $f$ on $E$.

Lecture warm-up: the area between $y = x^2$ and $y = 4$ is $\int_{-2}^2 (4 - x^2)\,dx$, and $4 - x^2 = \int_{x^2}^4 1\,dy$. So an area is a double integral of 1. One dimension up, a volume is a triple integral of 1.`,
    },
    {
      id: 'box',
      title: 'Boxes: any order works',
      body: String.raw`On a box $[a,b]\times[c,d]\times[e,f]$ every limit is a constant and all six orders give the same answer.

Lecture example: $\iiint_B xyz^2\,dV$ on $B = [0,2]\times[0,1]\times[0,3]$.

1. Fix $(x,y)$ and integrate in $z$: $\int_0^3 xyz^2\,dz = 9xy$.
2. What is left is a double integral over the **shadow** of $B$ in the $xy$-plane, the rectangle $[0,2]\times[0,1]$:

$$\int_0^2\!\!\int_0^1 9xy\,dy\,dx = \int_0^2 \tfrac{9x}{2}\,dx = 9.$$

You could just as well integrate $y$ first and use the shadow in the $xz$-plane, or $x$ first and use the shadow in the $yz$-plane. On a box it does not matter. On a curved solid, choose the order that makes the limits simplest.`,
    },
    {
      id: 'recipe',
      title: 'Recipe: the shadow method',
      body: String.raw`1. **Sketch the solid.** Identify the bottom surface $z = B(x,y)$ and the top surface $z = T(x,y)$.
2. **Find the shadow** $D$: drop the solid onto the $xy$-plane. If the two surfaces meet, set $B = T$ to get the edge of $D$. If the solid sits on $z = 0$, set the top equal to $0$. Do not guess: solve.
3. **Inner limits:** $B(x,y) \le z \le T(x,y)$. Picture a vertical stick: it enters the solid through the bottom and leaves through the top.
4. **Outer limits:** describe $D$ as a Lesson 19 region (or a polar one).

$$\iiint_E f\,dV = \iint_D\left[\int_{B(x,y)}^{T(x,y)} f\,dz\right]dA.$$

Each limit may depend only on variables that are integrated **later** (further out). The outermost limits are numbers.`,
    },
    {
      id: 'tetra',
      title: 'Worked example: the tetrahedron',
      body: String.raw`Lecture example: the volume of the solid in the first octant under $x + y + z = 1$.

1. Bottom $z = 0$, top $z = 1 - x - y$.
2. Shadow: set $z = 0$ to get $x + y = 1$. The shadow is the triangle with corners $(0,0)$, $(1,0)$, $(0,1)$.
3. Vertical strips in the shadow: $0 \le x \le 1$, $0 \le y \le 1 - x$.

$$V = \int_0^1\!\!\int_0^{1-x}\!\!\int_0^{1-x-y} dz\,dy\,dx = \int_0^1\!\!\int_0^{1-x}(1 - x - y)\,dy\,dx = \int_0^1 \frac{(1-x)^2}{2}\,dx = \frac16.$$

**Another way: cross-sections.** Slice horizontally at height $z$. Each slice is a triangle $x + y \le 1 - z$ with legs $1 - z$, so its area is $A(z) = \tfrac{(1-z)^2}{2}$. Then $V = \int_0^1 A(z)\,dz = \tfrac16$. Same answer, different order: here $z$ is the outer variable.`,
    },
    {
      id: 'octant',
      title: 'First octant under a plane (shows up constantly)',
      body: String.raw`For a plane $ax + by + cz = d$ with positive coefficients, the first-octant solid is a tetrahedron. Find the **intercepts** by setting two variables to zero: $x = d/a$, $y = d/b$, $z = d/c$.

Exam review example: $x + 2y + 3z = 12$, order $dz\,dx\,dy$.

- $z$: from $0$ to the plane, $z = \tfrac{12 - x - 2y}{3}$.
- Shadow: set $z = 0$: $x + 2y = 12$. Intercepts $x = 12$, $y = 6$.
- The order says $x$ is the middle variable, so fix $y$ first: $0 \le x \le 12 - 2y$, then $0 \le y \le 6$.

$$\int_0^6\!\!\int_0^{12 - 2y}\!\!\int_0^{(12-x-2y)/3} dz\,dx\,dy.$$

Read the order of the differentials, innermost first, before you write any limits.`,
    },
    {
      id: 'sideways',
      title: 'Solids that open sideways, and reordering',
      body: String.raw`Not every solid has a clean top and bottom. Look for the variable that appears **alone** in both surface equations and integrate that one first.

Example: the solid between $y = x^2 + 3z^2 + 1$ and $y = 5 - 3x^2 - z^2$. Here $y$ is alone, so integrate $y$ first and project onto the **$xz$-plane**. Set them equal: $4x^2 + 4z^2 = 4$, a unit disk in the $xz$-plane. Then

$$V = \iint_{x^2+z^2\le1}\left(4 - 4x^2 - 4z^2\right)dA = 4\int_0^{2\pi}\!\!\int_0^1 (1 - r^2)\,r\,dr\,d\theta = 2\pi,$$

using polar coordinates in the $xz$-plane.

**Reordering** (from a plane). Rewrite $\int_0^2\!\int_0^{4-2x}\!\int_0^{4-2x-y} f\,dz\,dy\,dx$ as $dx\,dy\,dz$:

- Outer $z$: set $x = y = 0$ in $z = 4 - 2x - y$: $0 \le z \le 4$.
- Middle $y$: set the inner variable $x = 0$: $0 \le y \le 4 - z$.
- Inner $x$: solve the plane for $x$: $0 \le x \le \tfrac{4 - y - z}{2}$.

For curved solids, sketch the shadow on the plane of the two outer variables instead.`,
    },
  ],

  formulas: [
    { label: 'Volume and mass', tex: String.raw`V = \iiint_E 1\,dV,\qquad m = \iiint_E \delta\,dV` },
    { label: 'Shadow method', tex: String.raw`\iiint_E f\,dV = \iint_D\int_{B(x,y)}^{T(x,y)} f\,dz\,dA` },
    { label: 'Average value', tex: String.raw`f_{\text{ave}} = \frac{1}{V}\iiint_E f\,dV` },
    { label: 'Plane intercepts', tex: String.raw`ax + by + cz = d:\ \ \left(\tfrac da,0,0\right),\ \left(0,\tfrac db,0\right),\ \left(0,0,\tfrac dc\right)` },
  ],

  mistakes: [
    {
      id: 'guess-shadow',
      title: 'Guessing the shadow instead of solving for it',
      wrong: String.raw`Under $2x + y + z = 4$: shadow $[0,2]\times[0,4]$`,
      right: String.raw`Set $z = 0$: shadow is the triangle $2x + y \le 4$, so $0 \le y \le 4 - 2x$`,
      why: 'The shadow is where the top surface meets the bottom one. A rectangle includes points where the plane is below the floor, which subtracts volume.',
    },
    {
      id: 'outer-not-constant',
      title: 'A variable in an outer limit',
      wrong: String.raw`$\int_0^{1-y-z}\!\int_0^{1-z}\!\int_0^1 f\,dx\,dy\,dz$`,
      right: String.raw`$\int_0^1\!\int_0^{1-z}\!\int_0^{1-y-z} f\,dx\,dy\,dz$`,
      why: 'Limits may only use variables integrated later. The innermost limits use the most variables; the outermost are numbers.',
    },
    {
      id: 'intercepts',
      title: 'Wrong intercepts of the plane',
      wrong: String.raw`$x + 2y + 3z = 12$ has $y$-intercept $12$`,
      right: String.raw`$y$-intercept $12/2 = 6$`,
      why: 'Set the other two variables to 0 and solve. Forgetting to divide by the coefficient stretches the shadow.',
    },
    {
      id: 'wrong-plane',
      title: 'Projecting onto the wrong plane',
      wrong: String.raw`Using an $xy$-shadow for a solid bounded by $y = x^2 + z^2$ and $y = 8 - x^2 - z^2$`,
      right: String.raw`Integrate $y$ first and project onto the $xz$-plane`,
      why: 'Integrate first in the variable that is alone in the surface equations. The shadow lives in the plane of the other two variables.',
    },
    {
      id: 'order-mismatch',
      title: 'Limits that do not match the differentials',
      wrong: String.raw`$\int_0^1\!\int_0^{1-x}\!\int_0^{1-x-y} f\,dx\,dy\,dz$ (only the $d$'s changed)`,
      right: 'Rebuild every limit for the new order, innermost first',
      why: 'The innermost limits belong to the innermost differential. Relabeling the differentials without redoing the limits integrates over nonsense.',
    },
  ],

  hook: 'Stick from bottom surface to top, then the shadow. Solve for the shadow, never guess it.',

  scene: {
    view: { range: 1.3, z: [-0.2, 1.4] },
    camera: [3, -2.4, 2.2],
    layers: [
      { id: 'tet', kind: 'solid', bottom: '0', top: '1 - x - y', region: { x: [0, 1], y: [0, '1 - x'] } },
      { id: 'lid', kind: 'plane', normal: [1, 1, 1], point: [0, 0, 1], size: 1.6 },
      { id: 'shadow', kind: 'region2d', x: [0, 1], y: [0, '1 - x'], color: 'water' },
      { id: 'strips', kind: 'region2d', x: [0, 1], y: [0, '1 - x'], strips: 'vertical', color: 'water' },
      { id: 'edge', kind: 'curve', x: 't', y: '1 - t', z: '0', t: [0, 1], color: 'road' },
      { id: 'stick', kind: 'curve', x: '0.3', y: '0.3', z: 't', t: [0, 0.4], color: 'road' },
      { id: 'foot', kind: 'point', at: [0.3, 0.3, 0], label: '(x, y)' },
      { id: 'top', kind: 'point', at: [0.3, 0.3, 0.4], label: 'z = 1 - x - y' },
      { id: 'px', kind: 'point', at: [1, 0, 0], label: '(1,0,0)' },
      { id: 'py', kind: 'point', at: [0, 1, 0], label: '(0,1,0)' },
      { id: 'pz', kind: 'point', at: [0, 0, 1], label: '(0,0,1)' },
    ],
    steps: [
      {
        label: 'Start',
        show: ['tet', 'px', 'py', 'pz'],
        caption: String.raw`The tetrahedron under $x + y + z = 1$ in the first octant. The plane's intercepts are its three corners off the origin.`,
      },
      {
        label: 'The lid',
        show: ['tet', 'lid'],
        caption: String.raw`The bottom is $z = 0$ and the top is the plane, $z = 1 - x - y$.`,
      },
      {
        label: 'Shadow',
        show: ['tet', 'shadow', 'edge'],
        caption: String.raw`Drop the solid onto the floor. Its edge is where the lid hits $z = 0$: the line $x + y = 1$. The shadow is a triangle, not a square.`,
      },
      {
        label: 'Stick',
        show: ['tet', 'shadow', 'stick', 'foot', 'top'],
        caption: String.raw`Above each shadow point $(x,y)$, a vertical stick runs from $z = 0$ to $z = 1 - x - y$. That stick is the inner integral.`,
      },
      {
        label: 'Strips',
        show: ['strips', 'edge'],
        caption: String.raw`The shadow is a Lesson 19 region: $0 \le x \le 1$, $0 \le y \le 1 - x$. Altogether $V = \int_0^1\!\int_0^{1-x}\!\int_0^{1-x-y}dz\,dy\,dx = \tfrac16$.`,
      },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Find the volume of the tetrahedron bounded by the coordinate planes and the plane $x + y + z = 1$.`,
      choices: [
        { tex: String.raw`$\tfrac16$`, correct: true },
        { tex: String.raw`$\tfrac12$`, mistake: 'concept', why: 'That is the area of the shadow triangle, not the volume.' },
        { tex: String.raw`$1$`, mistake: 'guess-shadow', why: 'That is the unit cube. The plane cuts it down to a sixth.' },
        { tex: String.raw`$\tfrac13$`, mistake: 'arith', why: String.raw`Pyramid volume is $\tfrac13$(base)(height) with base area $\tfrac12$, not 1.` },
        { tex: String.raw`$\tfrac{1}{24}$`, mistake: 'concept', why: 'That is the integral of z over the tetrahedron, not of 1.' },
      ],
      steps: [
        String.raw`Bottom $z = 0$, top $z = 1 - x - y$.`,
        String.raw`Shadow: set $z = 0$, so $x + y \le 1$: $0 \le y \le 1 - x$, $0 \le x \le 1$.`,
        String.raw`$\int_0^1\!\int_0^{1-x}(1 - x - y)\,dy\,dx = \int_0^1\tfrac{(1-x)^2}{2}\,dx = \tfrac16$.`,
      ],
      source: 'Study plan bank #13',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Evaluate $\iiint_E z\,dV$, where $E$ is the tetrahedron bounded by the coordinate planes and $x + y + z = 1$.`,
      choices: [
        { tex: String.raw`$\tfrac{1}{24}$`, correct: true },
        { tex: String.raw`$\tfrac16$`, mistake: 'concept', why: 'That is the volume. The integrand z was dropped.' },
        { tex: String.raw`$\tfrac{1}{12}$`, mistake: 'arith', why: String.raw`$\int_0^{1-x-y} z\,dz = \tfrac{(1-x-y)^2}{2}$; the $\tfrac12$ was dropped.` },
        { tex: String.raw`$\tfrac14$`, mistake: 'units', why: 'That is the average value of z (the integral divided by the volume), not the integral.' },
        { tex: String.raw`$\tfrac{1}{48}$`, mistake: 'arith', why: String.raw`$\int_0^{1-x}\tfrac{(1-x-y)^2}{2}dy = \tfrac{(1-x)^3}{6}$, and $\int_0^1\tfrac{(1-x)^3}{6}dx = \tfrac{1}{24}$. An extra $\tfrac12$ slipped in.` },
      ],
      steps: [
        String.raw`Inner: $\int_0^{1-x-y} z\,dz = \tfrac{(1-x-y)^2}{2}$.`,
        String.raw`Middle: $\int_0^{1-x}\tfrac{(1-x-y)^2}{2}\,dy = \tfrac{(1-x)^3}{6}$.`,
        String.raw`Outer: $\int_0^1\tfrac{(1-x)^3}{6}\,dx = \tfrac{1}{24}$.`,
      ],
      source: 'Study plan bank #14',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Let $E$ be the solid in the first octant under the plane $2x + y + z = 4$. Evaluate $\iiint_E 6x\,dV$.`,
      choices: [
        { tex: String.raw`$16$`, correct: true },
        { tex: String.raw`$-32$`, mistake: 'guess-shadow', why: 'You used the rectangle 0 ≤ x ≤ 2, 0 ≤ y ≤ 4. Over most of it the plane is below the floor. A negative answer for a positive integrand is the warning.' },
        { tex: String.raw`$\tfrac{16}{3}$`, mistake: 'concept', why: 'That is the volume of E. The integrand 6x was dropped.' },
        { tex: String.raw`$\tfrac83$`, mistake: 'arith', why: 'That is the integral of x. The 6 was lost.' },
        { tex: String.raw`$4$`, mistake: 'intercepts', why: String.raw`The shadow edge is $y = 4 - 2x$, not $y = 4 - x$. Set $z = 0$ and solve for $y$.` },
      ],
      steps: [
        String.raw`$0 \le z \le 4 - 2x - y$. Shadow: $2x + y \le 4$, so $0 \le y \le 4 - 2x$, $0 \le x \le 2$.`,
        String.raw`Inner two: $\int_0^{4-2x} 6x(4 - 2x - y)\,dy = 3x(4 - 2x)^2$.`,
        String.raw`Outer: $3\int_0^2 x(16 - 16x + 4x^2)\,dx = 3\left(32 - \tfrac{128}{3} + 16\right) = 16$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`The volume of the first-octant solid under $2x + 3y + z = 6$ is $\displaystyle\int_0^{A}\!\!\int_0^{B}\!\!\int_0^{6-2x-3y} dz\,dy\,dx$. Find $A$ and $B$.`,
      choices: [
        { tex: String.raw`$A = 3,\ B = 2 - \tfrac{2x}{3}$`, correct: true },
        { tex: String.raw`$A = 3,\ B = 6 - 2x$`, mistake: 'intercepts', why: String.raw`From $2x + 3y = 6$, $y = \tfrac{6 - 2x}{3}$. The division by 3 was forgotten.` },
        { tex: String.raw`$A = 2,\ B = 3 - \tfrac{3y}{2}$`, mistake: 'order-mismatch', why: 'Those limits are for x as the middle variable. The order dz dy dx makes y the middle variable and x the outer one.' },
        { tex: String.raw`$A = 6,\ B = 2 - \tfrac{2x}{3}$`, mistake: 'intercepts', why: 'The x-intercept is 6/2 = 3. 6 is the z-intercept.' },
        { tex: String.raw`$A = 3,\ B = 2$`, mistake: 'guess-shadow', why: 'That is a rectangle. The shadow is the triangle under the line 2x + 3y = 6.' },
      ],
      steps: [
        String.raw`Order $dz\,dy\,dx$: $z$ innermost, then $y$, then $x$ outermost.`,
        String.raw`Shadow: set $z = 0$: $2x + 3y = 6$, with intercepts $x = 3$, $y = 2$.`,
        String.raw`Fix $x$: $y$ runs from 0 to $\tfrac{6 - 2x}{3} = 2 - \tfrac{2x}{3}$. Then $0 \le x \le 3$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Which integral equals $\displaystyle\int_0^1\!\!\int_0^{1-x}\!\!\int_0^{1-x-y} f\,dz\,dy\,dx$ in the order $dx\,dy\,dz$?`,
      choices: [
        { tex: String.raw`$\displaystyle\int_0^1\!\!\int_0^{1-z}\!\!\int_0^{1-y-z} f\,dx\,dy\,dz$`, correct: true },
        { tex: String.raw`$\displaystyle\int_0^1\!\!\int_0^{1}\!\!\int_0^{1-y-z} f\,dx\,dy\,dz$`, mistake: 'guess-shadow', why: String.raw`The shadow in the $yz$-plane is the triangle $y + z \le 1$, so $y$ stops at $1 - z$.` },
        { tex: String.raw`$\displaystyle\int_0^{1-y-z}\!\!\int_0^{1-z}\!\!\int_0^{1} f\,dx\,dy\,dz$`, mistake: 'outer-not-constant', why: 'The limits are stacked in the wrong order: the outer integral would depend on y and z.' },
        { tex: String.raw`$\displaystyle\int_0^1\!\!\int_0^{1-x}\!\!\int_0^{1-x-y} f\,dx\,dy\,dz$`, mistake: 'order-mismatch', why: 'Only the differentials changed. The limits still describe z first, so x appears in its own limits.' },
        { tex: String.raw`$\displaystyle\int_0^1\!\!\int_0^{1-y}\!\!\int_0^{1-y-z} f\,dx\,dy\,dz$`, mistake: 'outer-not-constant', why: 'The y limit cannot depend on y itself. It may depend only on z, the outer variable.' },
      ],
      steps: [
        String.raw`The solid is the tetrahedron $x, y, z \ge 0$, $x + y + z \le 1$.`,
        String.raw`Inner $x$: from $0$ to the plane, $x = 1 - y - z$.`,
        String.raw`Shadow on the $yz$-plane (set $x = 0$): $y + z \le 1$. So $0 \le y \le 1 - z$, $0 \le z \le 1$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 3,
      prompt: String.raw`Find the volume of the solid between $y = 2x^2 + 2z^2$ and $y = 12 - x^2 - z^2$.`,
      choices: [
        { tex: String.raw`$24\pi$`, correct: true },
        { tex: String.raw`$18\pi$`, mistake: 'guess-shadow', why: String.raw`The shadow edge comes from setting the two surfaces equal: $3(x^2+z^2) = 12$, radius 2. Using $2r^2 = 12$ (radius $\sqrt6$) mixes up the surfaces.` },
        { tex: String.raw`$32\pi$`, mistake: 'setup', why: 'In polar coordinates on the xz-plane, dA = r dr dθ. The r was dropped.' },
        { tex: String.raw`$12\pi$`, mistake: 'arith', why: 'The θ integral gives 2π, not π.' },
        { tex: String.raw`$48\pi$`, mistake: 'arith', why: String.raw`The height is $12 - 3r^2$; the $-3r^2$ term was dropped, giving $2\pi\int_0^2 12r\,dr$.` },
      ],
      steps: [
        String.raw`$y$ is alone in both equations: integrate $y$ first, project onto the $xz$-plane.`,
        String.raw`Set equal: $2x^2 + 2z^2 = 12 - x^2 - z^2$, so $x^2 + z^2 = 4$. Shadow: disk of radius 2.`,
        String.raw`Height of the solid: $(12 - r^2) - 2r^2 = 12 - 3r^2$, with $r^2 = x^2 + z^2$.`,
        String.raw`$V = \int_0^{2\pi}\!\int_0^2 (12 - 3r^2)\,r\,dr\,d\theta = 2\pi(24 - 12) = 24\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 2,
      prompt: String.raw`Find the average value of $f(x,y,z) = z$ on the tetrahedron $x, y, z \ge 0$, $x + y + z \le 1$.`,
      choices: [
        { tex: String.raw`$\tfrac14$`, correct: true },
        { tex: String.raw`$\tfrac{1}{24}$`, mistake: 'concept', why: 'That is the integral of z. Average value divides by the volume, 1/6.' },
        { tex: String.raw`$\tfrac{1}{144}$`, mistake: 'arith', why: 'You multiplied the integral by the volume instead of dividing.' },
        { tex: String.raw`$\tfrac12$`, mistake: 'concept', why: 'Halfway up is the average for a box. A tetrahedron has most of its volume near the bottom.' },
        { tex: String.raw`$\tfrac16$`, mistake: 'units', why: 'That is the volume of the tetrahedron, not the average of z.' },
      ],
      steps: [
        String.raw`$\iiint_E z\,dV = \tfrac{1}{24}$ (previous problem) and $V = \tfrac16$.`,
        String.raw`$f_{\text{ave}} = \dfrac{1/24}{1/6} = \tfrac14$.`,
        String.raw`Sanity check: the slice at height $z$ has area $\tfrac{(1-z)^2}{2}$, largest at the bottom, so the average height is well below $\tfrac12$.`,
      ],
      source: 'original',
    },
  ],

  lab: [{ kind: 'surface', expr: '1 - x - y' }],
};
