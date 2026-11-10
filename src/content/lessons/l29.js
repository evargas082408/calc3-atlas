export default {
  id: 29,
  title: "Green's theorem",
  section: '17.4',
  exam: 2,
  blurb: 'Trade a line integral around a closed curve for a double integral over the region inside.',
  boiler: ['Greens Theorem'],

  sections: [
    {
      id: 'where',
      title: 'Where Green fits',
      body: String.raw`You now have three ways to evaluate $\int_C \vec F\cdot d\vec r$:

1. **Is $C$ a simple closed curve in the plane?** Use Green's theorem (today).
2. **Not closed, but $\vec F$ conservative?** Use the endpoints, $\varphi(\text{end}) - \varphi(\text{start})$ (Lesson 28).
3. **Neither?** Parametrize: $\int_a^b \vec F(\vec r(t))\cdot\vec r^{\,\prime}(t)\,dt$ (Lesson 27).

"Simple" means the curve does not cross itself. "Closed" means it ends where it starts. Green's theorem is the move when going around the curve would take three or four separate parametrizations, or when the field has pieces like $e^{\sin x}$ or $\sqrt{y^4+1}$ that are impossible to integrate along a path.`,
    },
    {
      id: 'circulation',
      title: 'Circulation form',
      body: String.raw`Let $\vec F = \langle f(x,y), g(x,y)\rangle$, let $C$ be a simple closed curve traversed **counterclockwise**, and let $R$ be the region it encloses. Then

$$\oint_C f\,dx + g\,dy = \iint_R \left(g_x - f_y\right)dA$$

The integrand $g_x - f_y$ is the **2D curl** of $\vec F$: think of it as the amount of spin per unit area. Order matters: the second component differentiated by $x$, **minus** the first differentiated by $y$.

"Counterclockwise" is the same as "the region stays on your left as you walk."

If $\vec F$ is conservative, $g_x = f_y$, the integrand is 0, and the circulation is 0. That matches Lesson 28.`,
    },
    {
      id: 'why',
      title: 'Why it works: integrals cancel derivatives',
      body: String.raw`Every big theorem in this chapter has the same shape. Integrating a derivative over a region gives the original thing on the **boundary**:

- FTC: $\int_a^b f'(t)\,dt = f(b) - f(a)$. The boundary of $[a,b]$ is two points.
- FTLI: $\int_C \nabla\varphi\cdot d\vec r = \varphi(B) - \varphi(A)$. The boundary of a curve is its two endpoints.
- Green: $\iint_R (g_x - f_y)\,dA = \oint_C \vec F\cdot d\vec r$. The boundary of a region is its edge curve.

A picture for Green: chop $R$ into tiny squares and add up the circulation around each one. Each interior edge is walked once in each direction, so it cancels. Only the outer edge survives. The circulation around one tiny square is about $(g_x - f_y)\,\Delta A$, so the total is the double integral.`,
    },
    {
      id: 'example',
      title: 'Worked examples from lecture',
      body: String.raw`**Triangle.** $\oint_C xy^2\,dx + (3x + x^2y)\,dy$, $C$ the counterclockwise triangle with vertices $(0,0)$, $(1,0)$, $(0,1)$.
1. $f = xy^2$, $g = 3x + x^2y$. $g_x - f_y = (3 + 2xy) - 2xy = 3$.
2. $\iint_R 3\,dA = 3\cdot\text{Area} = 3\cdot\tfrac12 = \tfrac32$.

Doing it directly would mean three segments and three integrals. Green turned it into an area.

**Region under $y = x^3$.** Work done by $\vec F = \langle 2xy^3, 4x^2y^2\rangle$ around $(0,0)\to(1,0)\to(1,1)$ and back along $y = x^3$ (counterclockwise).
1. $g_x - f_y = 8xy^2 - 6xy^2 = 2xy^2$.
2. $\int_0^1\int_0^{x^3} 2xy^2\,dy\,dx = \int_0^1 \frac{2x^{10}}{3}\,dx = \frac{2}{33}$.

**Disk.** $\vec F = \langle -y^3 + 9,\ x^3 + 3y^2 + 1\rangle$ around the unit circle. $g_x - f_y = 3x^2 + 3y^2 = 3r^2$, and in polar $\int_0^{2\pi}\int_0^1 3r^2\cdot r\,dr\,d\theta = \frac{3\pi}{2}$. Remember the extra $r$.`,
    },
    {
      id: 'flux',
      title: 'Flux form',
      body: String.raw`The same idea works for flux across $C$ with the outward normal (Lesson 27):

$$\oint_C \vec F\cdot\vec N\,ds = \oint_C f\,dy - g\,dx = \iint_R \left(f_x + g_y\right)dA$$

The integrand $f_x + g_y$ is the **divergence**: how much the field spreads out per unit area. Circulation pairs with curl (spin), flux pairs with divergence (spread).

Example (lecture): $\vec F = \langle 2xy^3, 4x^2y^2\rangle$ across the same boundary under $y = x^3$. $f_x + g_y = 2y^3 + 8x^2y$, and

$$\int_0^1\int_0^{x^3}(2y^3 + 8x^2y)\,dy\,dx = \int_0^1\left(\frac{x^{12}}{2} + 4x^8\right)dx = \frac{1}{26} + \frac49$$

Sign check on the line-integral side: with $\vec N = \langle y', -x'\rangle/|\vec r^{\,\prime}|$, $\vec F\cdot\vec N\,ds = f\,dy - g\,dx$. Some copies of the notes write $g\,dx - f\,dy$; that is the negative. The double-integral side $\iint (f_x + g_y)\,dA$ is the one to trust.`,
    },
    {
      id: 'conditions',
      title: 'Conditions, signs, and the area trick',
      body: String.raw`Check these before you use Green:

- **Closed and simple.** If the curve is not closed, close it with a segment, use Green, then subtract the segment's integral.
- **Counterclockwise.** For a clockwise curve, put a minus sign in front: $\oint_{\text{cw}} = -\iint_R (g_x - f_y)\,dA$.
- **No bad points inside.** $f$ and $g$ need continuous partials on all of $R$. The field $\dfrac{\langle -y, x\rangle}{x^2+y^2}$ has $g_x - f_y = 0$ wherever it is defined, yet circulates $2\pi$ around any loop that encloses the origin. Green would wrongly say 0. If the origin is outside the loop, Green applies and the answer is 0.

**Area trick.** Pick any field with $g_x - f_y = 1$, for example $\langle -\tfrac y2, \tfrac x2\rangle$:

$$\text{Area}(R) = \frac12\oint_C x\,dy - y\,dx$$

For the ellipse $\langle a\cos t, b\sin t\rangle$ this gives $\frac12\int_0^{2\pi} ab\,dt = \pi ab$.`,
    },
  ],

  formulas: [
    { label: "Green's theorem, circulation form (CCW)", tex: String.raw`\oint_C f\,dx + g\,dy = \iint_R (g_x - f_y)\,dA` },
    { label: "Green's theorem, flux form (outward)", tex: String.raw`\oint_C f\,dy - g\,dx = \iint_R (f_x + g_y)\,dA` },
    { label: 'Clockwise curve', tex: String.raw`\oint_{C,\ \text{cw}} \vec F\cdot d\vec r = -\iint_R (g_x - f_y)\,dA` },
    { label: 'Area', tex: String.raw`\text{Area}(R) = \tfrac12\oint_C x\,dy - y\,dx` },
  ],

  mistakes: [
    {
      id: 'clockwise-sign',
      title: 'Clockwise curve, no minus sign',
      wrong: String.raw`Clockwise $C$: $\oint_C \vec F\cdot d\vec r = \iint_R (g_x - f_y)\,dA$`,
      right: String.raw`Clockwise $C$: $\oint_C \vec F\cdot d\vec r = -\iint_R (g_x - f_y)\,dA$`,
      why: 'Green is stated for counterclockwise boundaries. Walking the other way flips the sign of every vector line integral.',
    },
    {
      id: 'curl-order',
      title: 'Wrong order in the 2D curl',
      wrong: String.raw`$\iint_R (f_y - g_x)\,dA$`,
      right: String.raw`$\iint_R (g_x - f_y)\,dA$`,
      why: 'The second component goes with x, the first with y, and the y-term is subtracted. Getting it backwards gives the negative of the answer.',
    },
    {
      id: 'flux-curl-swap',
      title: 'Using the divergence for circulation (or the curl for flux)',
      wrong: String.raw`$\oint_C f\,dx + g\,dy = \iint_R (f_x + g_y)\,dA$`,
      right: String.raw`Circulation uses $g_x - f_y$; flux $\oint f\,dy - g\,dx$ uses $f_x + g_y$.`,
      why: 'Spin goes with circulation along the curve, spread goes with flux across it. Look at which line integral you were given before picking the integrand.',
    },
    {
      id: 'singularity-inside',
      title: 'A hole or singularity inside the curve',
      wrong: String.raw`$\oint_{x^2+y^2=1}\dfrac{-y\,dx + x\,dy}{x^2+y^2} = \iint_R 0\,dA = 0$`,
      right: String.raw`The field is undefined at the origin, inside $C$. Parametrize instead: the answer is $2\pi$.`,
      why: 'Green needs the field and its partials to be continuous on the whole region. One bad point inside is enough to break it.',
    },
    {
      id: 'region-bounds',
      title: 'Wrong limits for the region',
      wrong: String.raw`Triangle $(0,0),(2,0),(0,2)$: $\int_0^2\int_0^2 \dots\,dy\,dx$`,
      right: String.raw`$\int_0^2\int_0^{2-x}\dots\,dy\,dx$`,
      why: 'After Green, you have an ordinary Lesson 19 double integral. Sketch R and read the slanted side as y = 2 - x.',
    },
  ],

  hook: 'Closed curve, counterclockwise, nothing bad inside: circulation = double integral of g_x - f_y.',

  scene: {
    view: { range: 1.5, z: [-0.2, 3.4] },
    camera: [3.2, -3.6, 3.6],
    layers: [
      { id: 'R', kind: 'region2d', x: [0, 1], y: [0, '1 - x'], color: 'water' },
      { id: 'F', kind: 'vectorField', P: 'x*y^2', Q: '3*x + x^2*y', density: 8 },
      { id: 'c1', kind: 'curve', x: 't', y: '0', z: '0', t: [0, 1], color: 'road', arrow: true },
      { id: 'c2', kind: 'curve', x: '1 - t', y: 't', z: '0', t: [0, 1], color: 'road', arrow: true },
      { id: 'c3', kind: 'curve', x: '0', y: '1 - t', z: '0', t: [0, 1], color: 'road', arrow: true },
      { id: 'curl', kind: 'solid', bottom: '0', top: '3', region: { x: [0, 1], y: [0, '1 - x'] } },
      { id: 'disk', kind: 'region2d', polar: { r: [0, 1], theta: [0, '2*pi'] }, color: 'water' },
      { id: 'circle', kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: '0', t: [0, '2*pi'], color: 'road', arrow: true },
      { id: 'rot', kind: 'vectorField', P: '-y', Q: 'x', density: 8 },
    ],
    steps: [
      { label: 'Start', show: ['R', 'F'], caption: String.raw`The region $R$, a triangle, under the field $\vec F = \langle xy^2,\ 3x + x^2y\rangle$.` },
      { label: 'Boundary', show: ['R', 'c1', 'c2', 'c3'], caption: String.raw`Its boundary $C$ traversed counterclockwise: walking along the arrows, the region stays on your left.` },
      { label: 'Circulation', show: ['F', 'c1', 'c2', 'c3'], caption: String.raw`Directly, $\oint_C \vec F\cdot d\vec r$ needs three segments. Green replaces it with one double integral.` },
      { label: 'Curl', show: ['R', 'curl', 'c1', 'c2', 'c3'], caption: String.raw`The 2D curl is $g_x - f_y = (3 + 2xy) - 2xy = 3$. The solid of height 3 over $R$ has volume $3\cdot\tfrac12 = \tfrac32$, and that is the circulation.` },
      { label: 'Disk', show: ['disk', 'rot', 'circle'], caption: String.raw`Same story for $\langle -y, x\rangle$ on the unit disk: curl $= 1 - (-1) = 2$, area $\pi$, circulation $2\pi$.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Evaluate $\oint_C -y\,dx + x\,dy$ where $C$ is the ellipse $\dfrac{x^2}{9} + \dfrac{y^2}{4} = 1$, counterclockwise.`,
      choices: [
        { tex: String.raw`$12\pi$`, correct: true },
        { tex: String.raw`$6\pi$`, mistake: 'arith', why: 'That is the area of the ellipse. The integrand g_x - f_y is 1 - (-1) = 2, so you get twice the area.' },
        { tex: String.raw`$0$`, mistake: 'flux-curl-swap', why: 'You used f_x + g_y, which is 0 here. This line integral is a circulation, so use g_x - f_y.' },
        { tex: String.raw`$-12\pi$`, mistake: 'clockwise-sign', why: 'The curve is counterclockwise, so no minus sign.' },
        { tex: String.raw`$2\pi$`, mistake: 'setup', why: 'You used the area of the unit circle. The ellipse has semi-axes 3 and 2, so its area is 6 pi.' },
      ],
      steps: [
        String.raw`$f = -y$, $g = x$, so $g_x - f_y = 1 - (-1) = 2$.`,
        String.raw`$\oint_C = \iint_R 2\,dA = 2\cdot\text{Area}$.`,
        String.raw`The ellipse has $a = 3$, $b = 2$, so the area is $\pi ab = 6\pi$. Answer: $12\pi$.`,
      ],
      source: 'Study plan bank #30',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Evaluate $\oint_C y\,dx + x^2\,dy$ where $C$ is the triangle with vertices $(0,0)$, $(1,0)$, $(1,1)$, counterclockwise.`,
      choices: [
        { tex: String.raw`$\dfrac16$`, correct: true },
        { tex: String.raw`$-\dfrac16$`, mistake: 'curl-order', why: 'You computed f_y - g_x = 1 - 2x.' },
        { tex: String.raw`$0$`, mistake: 'flux-curl-swap', why: 'f_x + g_y = 0 here, but that is the divergence. This is a circulation.' },
        { tex: String.raw`$\dfrac23$`, mistake: 'arith', why: 'You integrated 2x and forgot to subtract f_y = 1.' },
        { tex: String.raw`$\dfrac76$`, mistake: 'sign', why: 'You added f_y instead of subtracting it: 2x + 1.' },
      ],
      steps: [
        String.raw`$f = y$, $g = x^2$: $g_x - f_y = 2x - 1$.`,
        String.raw`The triangle is $0\le x\le 1$, $0\le y\le x$.`,
        String.raw`$\int_0^1\int_0^x (2x - 1)\,dy\,dx = \int_0^1 (2x^2 - x)\,dx = \frac23 - \frac12 = \frac16$.`,
      ],
      source: 'Study plan bank #31',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Let $C$ be the triangle with vertices $(0,0)$, $(2,0)$, $(0,2)$, oriented counterclockwise. Evaluate
$$\oint_C \left(xy + e^{x^3}\right)dx + \left(2x^2 + \sqrt{1+y^4}\right)dy.$$`,
      choices: [
        { tex: String.raw`$4$`, correct: true },
        { tex: String.raw`$-4$`, mistake: 'curl-order', why: 'You used f_y - g_x.' },
        { tex: String.raw`$\dfrac{16}{3}$`, mistake: 'arith', why: 'You integrated g_x = 4x and forgot to subtract f_y = x.' },
        { tex: String.raw`$\dfrac{20}{3}$`, mistake: 'sign', why: 'You added f_y: 4x + x = 5x.' },
        { tex: String.raw`$12$`, mistake: 'region-bounds', why: 'You integrated 3x over the square [0,2] x [0,2]. The slanted side is y = 2 - x.' },
      ],
      steps: [
        String.raw`$f = xy + e^{x^3}$, $g = 2x^2 + \sqrt{1+y^4}$. The ugly pieces depend on one variable each and die: $g_x = 4x$, $f_y = x$.`,
        String.raw`$g_x - f_y = 3x$.`,
        String.raw`$\int_0^2\int_0^{2-x} 3x\,dy\,dx = \int_0^2 3x(2-x)\,dx = 3\left(4 - \frac83\right) = 4$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Let $C$ be the boundary of the rectangle $0\le x\le 1$, $0\le y\le 2$, traversed **clockwise**. Find $\oint_C ye^x\,dx + (x^2 + e^x)\,dy$.`,
      choices: [
        { tex: String.raw`$-2$`, correct: true },
        { tex: String.raw`$2$`, mistake: 'clockwise-sign', why: 'That is the counterclockwise value. Clockwise needs a minus sign.' },
        { tex: String.raw`$-2e$`, mistake: 'arith', why: 'f_y = e^x cancels the e^x in g_x = 2x + e^x. The integrand is just 2x.' },
        { tex: String.raw`$2 - 2e$`, mistake: 'flux-curl-swap', why: 'You integrated the divergence f_x + g_y = y e^x.' },
        { tex: String.raw`$-8$`, mistake: 'region-bounds', why: 'You let x run from 0 to 2. The rectangle is 1 wide.' },
      ],
      steps: [
        String.raw`$f = ye^x$, $g = x^2 + e^x$: $g_x - f_y = (2x + e^x) - e^x = 2x$.`,
        String.raw`Counterclockwise value: $\int_0^2\int_0^1 2x\,dx\,dy = 2\cdot 1 = 2$.`,
        String.raw`The curve is clockwise, so the answer is $-2$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Find the outward flux of $\vec F = \langle 2x + y^2,\ 3y + x^2\rangle$ across the ellipse $\dfrac{x^2}{4} + \dfrac{y^2}{9} = 1$.`,
      choices: [
        { tex: String.raw`$30\pi$`, correct: true },
        { tex: String.raw`$0$`, mistake: 'flux-curl-swap', why: 'That is the circulation: g_x - f_y = 2x - 2y integrates to 0 by symmetry. Flux uses the divergence.' },
        { tex: String.raw`$-30\pi$`, mistake: 'sign', why: 'Outward flux of a field with positive divergence is positive.' },
        { tex: String.raw`$6\pi$`, mistake: 'arith', why: 'That is the area. Multiply by the divergence 5.' },
        { tex: String.raw`$180\pi$`, mistake: 'setup', why: 'The ellipse area is pi a b = 6 pi, not pi a^2 b^2.' },
      ],
      steps: [
        String.raw`Flux form of Green: $\oint_C \vec F\cdot\vec N\,ds = \iint_R (f_x + g_y)\,dA$.`,
        String.raw`$f_x + g_y = 2 + 3 = 5$.`,
        String.raw`Area of the ellipse with $a = 2$, $b = 3$: $6\pi$. Flux $= 5\cdot 6\pi = 30\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`Evaluate $\oint_C -y^3\,dx + (x^3 + e^y)\,dy$ where $C$ is the circle $x^2+y^2 = 4$, counterclockwise.`,
      choices: [
        { tex: String.raw`$24\pi$`, correct: true },
        { tex: String.raw`$16\pi$`, mistake: 'setup', why: 'In polar you need dA = r dr d theta. Without the r you integrate 3r^2 instead of 3r^3.' },
        { tex: String.raw`$-24\pi$`, mistake: 'curl-order', why: 'You used f_y - g_x.' },
        { tex: String.raw`$0$`, mistake: 'sign', why: 'You computed g_x + f_y = 3x^2 - 3y^2, which integrates to 0 over the disk. Subtract f_y = -3y^2.' },
        { tex: String.raw`$\dfrac{3\pi}{2}$`, mistake: 'region-bounds', why: 'You used radius 1. The circle x^2 + y^2 = 4 has radius 2.' },
      ],
      steps: [
        String.raw`$f = -y^3$, $g = x^3 + e^y$: $g_x - f_y = 3x^2 + 3y^2 = 3r^2$.`,
        String.raw`$\iint_R 3r^2\,dA = \int_0^{2\pi}\int_0^2 3r^2\cdot r\,dr\,d\theta$.`,
        String.raw`$= 2\pi\cdot\frac34\cdot 2^4 = 24\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Let $\vec F = \dfrac{\langle -y,\ x\rangle}{x^2+y^2}$. $C_1$ is the circle of radius 1 centered at $(3,0)$ and $C_2$ is the circle of radius 1 centered at the origin, both counterclockwise. Find $\oint_{C_1}\vec F\cdot d\vec r$ and $\oint_{C_2}\vec F\cdot d\vec r$.`,
      choices: [
        { tex: String.raw`$0$ and $2\pi$`, correct: true },
        { tex: String.raw`$0$ and $0$`, mistake: 'singularity-inside', why: 'Green gives 0 for C1 because the origin is outside it. For C2 the origin is inside, so Green does not apply.' },
        { tex: String.raw`$2\pi$ and $2\pi$`, mistake: 'concept', why: 'C1 does not wind around the origin, and F is smooth on its whole disk, so Green gives 0.' },
        { tex: String.raw`$2\pi$ and $0$`, mistake: 'concept', why: 'Backwards: the loop that surrounds the singularity is the one that picks up 2 pi.' },
        { tex: String.raw`$0$ and $-2\pi$`, mistake: 'sign', why: 'On the unit circle F dot r\' = 1, so the counterclockwise integral is +2 pi.' },
      ],
      steps: [
        String.raw`Wherever $\vec F$ is defined, $g_x - f_y = 0$.`,
        String.raw`$C_1$: its disk does not contain the origin, so $\vec F$ is smooth there and Green gives $\iint 0\,dA = 0$.`,
        String.raw`$C_2$: the origin is inside, so Green does not apply. Parametrize: $\vec r = \langle\cos t,\sin t\rangle$, $\vec F\cdot\vec r^{\,\prime} = 1$, total $2\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p8',
      difficulty: 2,
      prompt: String.raw`Find the outward flux of $\vec F = \langle x^2, y^2\rangle$ across the boundary of the unit square $0\le x\le 1$, $0\le y\le 1$.`,
      choices: [
        { tex: String.raw`$2$`, correct: true },
        { tex: String.raw`$0$`, mistake: 'flux-curl-swap', why: 'g_x - f_y = 0 is the curl. Flux uses the divergence 2x + 2y.' },
        { tex: String.raw`$-2$`, mistake: 'sign', why: 'Outward flux here is positive: the field points out through the top and right sides.' },
        { tex: String.raw`$1$`, mistake: 'arith', why: 'You integrated only 2x. The divergence is 2x + 2y.' },
        { tex: String.raw`$4$`, mistake: 'concept', why: 'You evaluated the divergence at the corner (1, 1) and multiplied by the area. It has to be integrated.' },
      ],
      steps: [
        String.raw`Flux form: $\iint_R (f_x + g_y)\,dA$ with $f_x + g_y = 2x + 2y$.`,
        String.raw`$\int_0^1\int_0^1 (2x + 2y)\,dx\,dy = 1 + 1 = 2$.`,
      ],
      source: 'Study plan bank #32',
    },
  ],

  lab: [
    { kind: 'vectorField', P: 'x*y^2', Q: '3*x + x^2*y', density: 8 },
    { kind: 'region2d', x: [0, 1], y: [0, '1 - x'], color: 'water' },
  ],
};
