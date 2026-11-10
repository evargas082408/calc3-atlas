export default {
  id: 16,
  title: 'Absolute max and min on a closed region',
  section: '15.7',
  exam: 1,
  blurb: 'Find the highest and lowest values of f on a disk, rectangle or triangle: inside, then each edge, then compare.',
  boiler: ['Min Max', 'Optimization'],

  sections: [
    {
      id: 'idea',
      title: 'From local to absolute',
      body: String.raw`A local max is the top of some hill. The **absolute max** of $f$ on a region $R$ is the single highest value $f$ reaches anywhere in $R$; the **absolute min** is the lowest.

**Calc I version.** On a closed interval $[a, b]$, a continuous $f$ always has an absolute max and min (Extreme Value Theorem), and they occur at critical points inside or at the endpoints. Example: $g(x) = 2x^2 - 1$ on $[-1, 1]$. $g'(x) = 4x = 0$ at $x = 0$, $g(0) = -1$. Endpoints: $g(\pm1) = 1$. Absolute min $-1$, absolute max $1$.

**Calc III version.** If $f$ is continuous on a **closed and bounded** region $R$ (it includes its boundary, and does not run off to infinity), then $f$ has an absolute max and min on $R$. They happen either at a critical point inside $R$ or somewhere on the **boundary**. The endpoints of the interval have become a whole fence around the region.

Picture a fenced field with hills in it. The highest point is either a hilltop inside the fence or a spot right against the fence.`,
    },
    {
      id: 'recipe',
      title: 'The recipe',
      body: String.raw`1. **Inside.** Solve $f_x = f_y = 0$. Keep only points strictly inside $R$. Evaluate $f$ at each.
2. **Boundary.** Split the boundary into pieces (edges of a rectangle or triangle, or a circle). On each piece, substitute the edge's equation to get a one-variable function, then do Calc I on it: its critical points **and** its endpoints. The endpoints are the corners of $R$.
3. **Compare.** Make a table of every candidate value. Largest is the absolute max, smallest is the absolute min.

No second derivative test is needed: you are comparing numbers, not classifying shapes. A saddle point inside is still a candidate (it just will not win).

On a disk $x^2 + y^2 \le r^2$, substitute $y^2 = r^2 - x^2$. That gives a function of $x$ alone, valid only for $-r \le x \le r$. A critical point of that function outside $[-r, r]$ is not on the circle and must be thrown away.`,
    },
    {
      id: 'disk',
      title: 'Worked example: a disk',
      body: String.raw`$f(x,y) = x^2 - y^2$ on the closed disk $x^2 + y^2 \le 1$.

**Inside.** $f_x = 2x = 0$, $f_y = -2y = 0$: only $(0,0)$, with $f = 0$. (It is a saddle, but it is still on the list.)

**Boundary.** On the circle, $y^2 = 1 - x^2$, so

$$g(x) = x^2 - (1 - x^2) = 2x^2 - 1, \qquad -1 \le x \le 1.$$

$g'(x) = 4x = 0$ at $x = 0$, which on the circle means $y = \pm1$: points $(0, \pm1)$. The endpoints $x = \pm1$ mean $y = 0$: points $(\pm1, 0)$.

**Compare.**

- $f(0,0) = 0$
- $f(\pm1, 0) = 1$
- $f(0, \pm1) = -1$

Absolute max $1$ at $(\pm1, 0)$. Absolute min $-1$ at $(0, \pm1)$. Both happen on the boundary.

**Exam 1 version.** $f = x^2 + y^2 - 6x + 3$ on $x^2 + y^2 \le 16$. Inside: $(3,0)$, $f = -6$. Boundary: $f = 16 - 6x + 3 = 19 - 6x$ on $[-4, 4]$, linear, so check $x = \pm4$: $f(4,0) = -5$, $f(-4,0) = 43$. $M = 43$, $m = -6$, $M + m = 37$.`,
    },
    {
      id: 'rectangle',
      title: 'Worked example: a rectangle (four edges, four corners)',
      body: String.raw`$f(x,y) = 4x + 6y - x^2 - y^2 + 9$ on $0 \le x \le 4$, $0 \le y \le 5$.

**Inside.** $f_x = 4 - 2x = 0$, $f_y = 6 - 2y = 0$: $(2, 3)$, inside. $f(2,3) = 22$.

**Edges.** Substitute each edge, then find the critical point of the one-variable function:

- $L_1$: $y = 0$: $g_1 = 4x - x^2 + 9$, critical at $x = 2$: point $(2, 0)$.
- $L_2$: $x = 4$: $g_2 = 6y - y^2 + 9$, critical at $y = 3$: point $(4, 3)$.
- $L_3$: $y = 5$: $g_3 = 4x - x^2 + 14$, critical at $x = 2$: point $(2, 5)$.
- $L_4$: $x = 0$: $g_4 = 6y - y^2 + 9$, critical at $y = 3$: point $(0, 3)$.

**Corners** (endpoints of the edges): $(0,0)$, $(4,0)$, $(0,5)$, $(4,5)$.

**Compare.**

- $(0,0)$: 9, $(4,0)$: 9, $(0,5)$: 14, $(4,5)$: 14
- $(2,0)$: 13, $(4,3)$: 18, $(2,5)$: 18, $(0,3)$: 18
- $(2,3)$: 22

Absolute max $22$ at $(2,3)$. Absolute min $9$ at $(0,0)$ and $(4,0)$, two corners. Skip the corners and you miss the minimum.

**Triangles** work the same way, with a slanted edge like $y = 15 - x$: substitute it, and use $x$ from 0 to 15 as the interval.`,
    },
    {
      id: 'applied',
      title: 'Word problems and open regions',
      body: String.raw`**Closest point on a plane (from lecture).** Find the point on $x + 2y + z = 10$ closest to the origin.

- Distance is $\sqrt{x^2 + y^2 + z^2}$. Minimizing the square gives the same point and avoids the root.
- Use the constraint to remove $z$: $z = 10 - x - 2y$. Minimize $f = x^2 + y^2 + (10 - x - 2y)^2$ over all $(x, y)$.
- $f_x = 4x + 4y - 20 = 0$, $f_y = 4x + 10y - 40 = 0$. Subtract: $6y = 20$, $y = \tfrac{10}{3}$, then $x = \tfrac53$.
- $D = 4\cdot10 - 4^2 = 24 > 0$, $f_{xx} > 0$: the minimum. $z = 10 - \tfrac53 - \tfrac{20}{3} = \tfrac53$.

Closest point $\left(\tfrac53, \tfrac{10}{3}, \tfrac53\right)$. (It is a multiple of the normal $\langle 1, 2, 1\rangle$, as it should be.)

**Box with fixed sum.** Maximize $V = xyz$ with $x + y + z = 96$: $V = xy(96 - x - y)$ on the triangle $x, y \ge 0$, $x + y \le 96$. The interior critical point is $x = y = 32$, $V = 32^3 = 32768$; on every edge $V = 0$. The best box is a cube.

**Open regions can fail.** $f = 4 - x^2 - y^2$ on the **open** disk $x^2 + y^2 < 1$ has absolute max 4 at the origin, but no absolute min: $f$ gets close to 3 near the edge, and the edge is not in the region. The recipe is only guaranteed on closed, bounded regions.`,
    },
  ],

  formulas: [
    { label: 'Extreme Value Theorem', tex: String.raw`f \text{ continuous on closed, bounded } R \implies \text{abs. max and min exist}` },
    { label: 'Candidates', tex: String.raw`\nabla f = \vec 0 \text{ inside} \ \cup\ \text{edge critical points} \ \cup\ \text{corners}` },
    { label: 'Circle boundary', tex: String.raw`y^2 = r^2 - x^2,\quad -r \le x \le r` },
    { label: 'Distance trick', tex: String.raw`\text{minimize } d^2 = x^2 + y^2 + z^2 \text{ instead of } d` },
  ],

  mistakes: [
    {
      id: 'one-part',
      title: 'Checking only the inside (or only the edge)',
      wrong: 'Found the critical point inside and called it the max.',
      right: 'Check the critical points inside, then every boundary piece, then compare all of them.',
      why: 'On a closed region the extremes are very often on the boundary, where ∇f is usually not 0.',
    },
    {
      id: 'edge-candidates',
      title: 'Missing candidates on an edge',
      wrong: String.raw`On $y = 0$, $g = x^2 - 6x$ has $g' = 0$ at $x = 3$, so only $(3, 0)$`,
      right: String.raw`Also check the edge's endpoints, $(0,0)$ and $(4,0)$, which are the corners.`,
      why: 'Each edge is a Calc I problem on a closed interval: critical points AND endpoints. Corners are where most rectangle answers hide.',
    },
    {
      id: 'outside-point',
      title: 'Keeping a point that is not in the region',
      wrong: String.raw`$\nabla f = \vec0$ at $(4, -2)$, so include $f(4,-2)$ for the rectangle $[0,4]\times[0,3]$`,
      right: 'Throw it away: y = -2 is outside the rectangle.',
      why: 'The question only asks about values of f inside R. A lower value outside R does not count.',
    },
    {
      id: 'x-range',
      title: 'Ignoring the range of x on a circle',
      wrong: String.raw`On $x^2 + y^2 = 4$: $g = 4 - x^2 + 6x$, $g'(3) = 0$, so $g(3) = 13$ is a candidate`,
      right: String.raw`On the circle $-2 \le x \le 2$. $x = 3$ is not on it; check the endpoints $x = \pm2$ instead.`,
      why: 'After substituting y^2 = r^2 - x^2, the one-variable function only lives on [-r, r].',
    },
    {
      id: 'open-region',
      title: 'Using boundary values on an open region',
      wrong: String.raw`On $x^2 + y^2 < 1$, the min of $4 - x^2 - y^2$ is 3, on the circle`,
      right: 'The circle is not in the region. There is no absolute min.',
      why: 'The guarantee needs a closed, bounded region. Without the boundary, values can get close to a number without reaching it.',
    },
  ],

  hook: 'Inside, then edges, then corners, then compare. The fence counts.',

  scene: {
    view: { range: 1.5, z: [-1.5, 1.5] },
    camera: [3.5, -3.5, 3],
    layers: [
      { id: 'surf', kind: 'surface', z: 'x^2 - y^2', domain: { r: [0, 1], theta: [0, '2*pi'] }, colormap: 'textbook', opacity: 0.85 },
      { id: 'disk', kind: 'region2d', polar: { r: [0, 1], theta: [0, '2*pi'] }, color: 'water' },
      { id: 'inside', kind: 'point', at: [0, 0, 0], label: 'inside: f = 0' },
      { id: 'fenceFloor', kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: '0', t: [0, '2*pi'], color: 'ink' },
      { id: 'fence', kind: 'curveOnSurface', of: 'surf', x: 'cos(t)', y: 'sin(t)', t: [0, '2*pi'], color: 'road' },
      { id: 'maxR', kind: 'point', at: [1, 0, 1], label: 'max 1' },
      { id: 'maxL', kind: 'point', at: [-1, 0, 1], label: 'max 1' },
      { id: 'minT', kind: 'point', at: [0, 1, -1], label: 'min -1' },
      { id: 'minB', kind: 'point', at: [0, -1, -1], label: 'min -1' },
    ],
    steps: [
      { label: 'Start', show: ['surf', 'disk'], caption: String.raw`$f = x^2 - y^2$ over the closed unit disk. We want the highest and lowest points of this piece of surface.` },
      { label: 'Inside', show: ['surf', 'disk', 'inside'], caption: String.raw`Inside, $\nabla f = \vec0$ only at the origin, where $f = 0$. It is a saddle, but it still goes on the candidate list.` },
      { label: 'Fence', show: ['surf', 'fenceFloor', 'fence'], caption: String.raw`The boundary circle, lifted onto the surface, is a closed curve. On it $f = 2x^2 - 1$ for $-1 \le x \le 1$: a Calc I problem.` },
      { label: 'Edge points', show: ['surf', 'fence', 'maxR', 'maxL', 'minT', 'minB'], caption: String.raw`$g'(x) = 4x = 0$ gives $(0, \pm1)$ with $f = -1$; the endpoints $x = \pm1$ give $(\pm1, 0)$ with $f = 1$.` },
      { label: 'Compare', show: ['surf', 'fence', 'inside', 'maxR', 'maxL', 'minT', 'minB'], caption: String.raw`Candidates: $0, 1, -1$. Absolute max $1$ at $(\pm1, 0)$, absolute min $-1$ at $(0, \pm1)$. Both are on the fence, not inside.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Let $M$ and $m$ be the absolute max and min of $f(x, y) = x^2 + y^2 - 4x + 1$ on the disk $x^2 + y^2 \le 9$. Find $M + m$.`,
      choices: [
        { tex: String.raw`$19$`, correct: true },
        { tex: String.raw`$20$`, mistake: 'one-part', why: 'You used only the boundary (22 and -2). The interior point (2, 0) gives f = -3, lower than -2.' },
        { tex: String.raw`$-6$`, mistake: 'one-part', why: 'You used only the interior critical point, as both M and m. The max is on the boundary.' },
        { tex: String.raw`$25$`, mistake: 'sign', why: 'm = -3, so M + m = 22 - 3.' },
        { tex: String.raw`$7$`, mistake: 'edge-candidates', why: 'You checked (0, ±3) on the circle. The boundary function 10 - 4x is linear, so its extremes are at the endpoints x = ±3.' },
      ],
      steps: [
        String.raw`Inside: $f_x = 2x - 4 = 0$, $f_y = 2y = 0$: $(2, 0)$, inside the disk. $f(2,0) = 4 - 8 + 1 = -3$.`,
        String.raw`Boundary: $x^2 + y^2 = 9$, so $f = 9 - 4x + 1 = 10 - 4x$ for $-3 \le x \le 3$.`,
        String.raw`Linear, so check the ends: $f(3, 0) = -2$, $f(-3, 0) = 22$.`,
        String.raw`Candidates $-3, -2, 22$: $M = 22$, $m = -3$, $M + m = 19$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Find the absolute maximum value of $f(x, y) = x^2 + y^2 - 2x - 4y + 1$ on the rectangle $0 \le x \le 2$, $0 \le y \le 3$.`,
      choices: [
        { tex: String.raw`$1$`, correct: true },
        { tex: String.raw`$-4$`, mistake: 'one-part', why: 'That is the interior critical point (1, 2), and it is the absolute min. The max is on the boundary.' },
        { tex: String.raw`$0$`, mistake: 'edge-candidates', why: 'That is the best edge critical point, (1, 0). You skipped the corners (0, 0) and (2, 0), where f = 1.' },
        { tex: String.raw`$(0,0)$ and $(2,0)$`, mistake: 'units', why: 'Those are where the max happens. The question asks for the value.' },
        { tex: String.raw`$-2$`, mistake: 'edge-candidates', why: 'That is the value at the top corners (0, 3) and (2, 3). The bottom corners are higher.' },
      ],
      steps: [
        String.raw`Inside: $f_x = 2x - 2$, $f_y = 2y - 4$: $(1, 2)$, $f = -4$.`,
        String.raw`Edges: $y = 0$ gives $x^2 - 2x + 1$, critical at $(1,0)$ with $f = 0$. $y = 3$ gives critical $(1,3)$ with $f = -3$. $x = 0$ and $x = 2$ give critical points $(0,2)$ and $(2,2)$ with $f = -3$.`,
        String.raw`Corners: $f(0,0) = 1$, $f(2,0) = 1$, $f(0,3) = -2$, $f(2,3) = -2$.`,
        String.raw`Largest value: $1$, at $(0,0)$ and $(2,0)$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Find the absolute maximum of $f(x, y) = x^2 + y^2 - 2x - 2y$ on the closed triangle with vertices $(0,0)$, $(4,0)$, $(0,4)$.`,
      choices: [
        { tex: String.raw`$8$`, correct: true },
        { tex: String.raw`$0$`, mistake: 'edge-candidates', why: 'You found the critical points along the edges (values -1, -1, 0) but skipped the corners (4, 0) and (0, 4).' },
        { tex: String.raw`$-2$`, mistake: 'one-part', why: 'That is the interior critical point (1, 1), which is the absolute min.' },
        { tex: String.raw`$(4, 0)$ and $(0, 4)$`, mistake: 'units', why: 'Those are the locations. The maximum value is f there.' },
        { tex: String.raw`$16$`, mistake: 'outside-point', why: 'That is f(4, 4), but (4, 4) is not in the triangle: 4 + 4 > 4.' },
      ],
      steps: [
        String.raw`Inside: $f_x = 2x - 2$, $f_y = 2y - 2$: $(1, 1)$, $f = -2$.`,
        String.raw`Edge $y = 0$, $0\le x\le4$: $x^2 - 2x$, critical $x = 1$ ($f = -1$), ends $f(0,0) = 0$, $f(4,0) = 8$. Edge $x = 0$ is the same by symmetry.`,
        String.raw`Edge $y = 4 - x$: $f = 2x^2 - 8x + 8 = 2(x-2)^2$, critical $(2,2)$ with $f = 0$, ends $8$.`,
        String.raw`Candidates $-2, -1, 0, 8$: absolute max $8$ at $(4,0)$ and $(0,4)$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Find the absolute maximum value of $f(x, y) = y^2 + 6x$ on the disk $x^2 + y^2 \le 4$.`,
      choices: [
        { tex: String.raw`$12$`, correct: true },
        { tex: String.raw`$13$`, mistake: 'x-range', why: 'g(x) = 4 - x^2 + 6x has g′ = 0 at x = 3, but on the circle -2 ≤ x ≤ 2. Use the endpoint x = 2.' },
        { tex: String.raw`$16$`, mistake: 'outside-point', why: 'You used x = 2 and y^2 = 4 together. The point (2, ±2) is outside the disk.' },
        { tex: String.raw`There is no maximum, since $\nabla f$ is never $\vec0$`, mistake: 'one-part', why: 'No interior critical points just means the max is on the boundary. It still exists on a closed disk.' },
        { tex: String.raw`$(2, 0)$`, mistake: 'units', why: 'That is where the max is. The value is f(2, 0) = 12.' },
      ],
      steps: [
        String.raw`Inside: $f_x = 6 \ne 0$, so no critical points.`,
        String.raw`Boundary: $y^2 = 4 - x^2$, so $g(x) = 4 - x^2 + 6x$ for $-2 \le x \le 2$.`,
        String.raw`$g'(x) = 6 - 2x = 0$ at $x = 3$, outside $[-2, 2]$: discard.`,
        String.raw`Endpoints: $g(2) = 12$ at $(2,0)$, $g(-2) = -12$ at $(-2, 0)$. Absolute max $12$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Find the point on the plane $2x - y + z = 12$ closest to the origin.`,
      choices: [
        { tex: String.raw`$(4, -2, 2)$`, correct: true },
        { tex: String.raw`$2\sqrt6$`, mistake: 'units', why: 'That is the distance. The question asks for the point.' },
        { tex: String.raw`$(2, -1, 1)$`, mistake: 'arith', why: 'This is along the normal, but 2(2) - (-1) + 1 = 6, so it is not on the plane.' },
        { tex: String.raw`$(4, 2, 2)$`, mistake: 'sign', why: 'Check: 8 - 2 + 2 = 8, not on the plane. The y-coordinate should be negative.' },
        { tex: String.raw`$(6, 0, 0)$`, mistake: 'concept', why: 'That is the x-intercept. It is on the plane, but at distance 6, more than 2√6 ≈ 4.9.' },
      ],
      steps: [
        String.raw`Minimize $d^2 = x^2 + y^2 + z^2$ with $z = 12 - 2x + y$: $f = x^2 + y^2 + (12 - 2x + y)^2$.`,
        String.raw`$f_x = 2x - 4(12 - 2x + y) = 10x - 4y - 48 = 0$; $f_y = 2y + 2(12 - 2x + y) = -4x + 4y + 24 = 0$.`,
        String.raw`From the second, $y = x - 6$. Then $10x - 4x + 24 - 48 = 0$, so $x = 4$, $y = -2$.`,
        String.raw`$z = 12 - 8 - 2 = 2$. The point is $(4, -2, 2)$, distance $\sqrt{24} = 2\sqrt6$. ($D = 10\cdot4 - 16 > 0$ confirms a min.)`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`Let $f(x, y) = x^2 + y^2$ on the **open** disk $x^2 + y^2 < 1$. Which statement is true?`,
      choices: [
        { tex: String.raw`The absolute min is 0 at the origin, and there is no absolute max`, correct: true },
        { tex: String.raw`The absolute min is 0 and the absolute max is 1, on the circle`, mistake: 'open-region', why: 'The circle is not part of an open disk. f gets close to 1 but never reaches it.' },
        { tex: String.raw`There is no absolute min and no absolute max`, mistake: 'concept', why: 'The origin is in the region and f(0,0) = 0 ≤ f everywhere, so the min exists.' },
        { tex: String.raw`The absolute max is 0 at the origin`, mistake: 'concept', why: 'f = x^2 + y^2 is a bowl. The origin is its lowest point.' },
        { tex: String.raw`Both exist, by the Extreme Value Theorem`, mistake: 'open-region', why: 'The theorem needs a closed, bounded region. This one is not closed.' },
      ],
      steps: [
        String.raw`$f \ge 0$ and $f(0,0) = 0$, with the origin in the region: absolute min 0.`,
        String.raw`For any point inside, $f < 1$, and there are points with $f$ as close to 1 as you like.`,
        String.raw`But no point of the region gives $f = 1$ or more, so no value is the largest. No absolute max.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Find the absolute minimum value of $f(x, y) = x^2 + xy + y^2 - 6x$ on the rectangle $0 \le x \le 4$, $0 \le y \le 3$.`,
      choices: [
        { tex: String.raw`$-9$`, correct: true },
        { tex: String.raw`$-12$`, mistake: 'outside-point', why: 'That is f(4, -2), the only critical point, which is outside the rectangle (y = -2 < 0).' },
        { tex: String.raw`$-8$`, mistake: 'edge-candidates', why: 'That is the lowest corner, (4, 0). The edge y = 0 has a critical point at x = 3 with f = -9.' },
        { tex: String.raw`$(3, 0)$`, mistake: 'units', why: 'That is where the min is. The value is f(3, 0).' },
        { tex: String.raw`There is no minimum, because the only critical point is outside the rectangle`, mistake: 'one-part', why: 'The min still exists on a closed rectangle. It is on the boundary.' },
      ],
      steps: [
        String.raw`Inside: $f_x = 2x + y - 6 = 0$ and $f_y = x + 2y = 0$ give $(4, -2)$: outside $R$, discard.`,
        String.raw`$y = 0$: $x^2 - 6x$ on $[0,4]$, critical $x = 3$: $f(3,0) = -9$. $x = 4$: $y^2 + 4y - 8$, critical at $y = -2$, outside.`,
        String.raw`$y = 3$: $x^2 - 3x + 9$, critical $(1.5, 3)$ with $f = 6.75$. $x = 0$: $y^2$, smallest at $(0,0)$.`,
        String.raw`Corners: $f(0,0) = 0$, $f(4,0) = -8$, $f(0,3) = 9$, $f(4,3) = 13$.`,
        String.raw`Smallest candidate: $-9$ at $(3, 0)$. (Largest: $13$ at $(4,3)$.)`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: 'x^2 - y^2', z: 'x^2 - y^2' },
    { kind: 'surface', expr: '4*x + 6*y - x^2 - y^2 + 9', z: '4*x + 6*y - x^2 - y^2 + 9' },
  ],
};
