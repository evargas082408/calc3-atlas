export default {
  id: 20,
  title: 'Double integrals in polar coordinates',
  section: '16.3',
  exam: 2,
  blurb: 'Integrate over disks, rings and wedges by switching to r and θ, with dA = r dr dθ.',
  boiler: ['Polar Double Integration'],

  sections: [
    {
      id: 'idea',
      title: 'When to switch',
      body: String.raw`Switch to polar when the **region is round** (disk, half disk, quarter disk, ring, wedge) or the **integrand contains $x^2 + y^2$**. In $x$ and $y$ a disk needs limits like $-\sqrt{4-x^2} \le y \le \sqrt{4-x^2}$ and the integrals get ugly. In polar the same disk is just $0 \le r \le 2$, $0 \le \theta \le 2\pi$.

The substitutions:

$$x = r\cos\theta,\qquad y = r\sin\theta,\qquad x^2 + y^2 = r^2,\qquad dA = r\,dr\,d\theta.$$

The last one is the one people forget.`,
    },
    {
      id: 'why-r',
      title: 'Why the extra r',
      body: String.raw`Chop the region with circles ($r$ = constant) and rays ($\theta$ = constant). The pieces are **polar boxes**, not squares.

One polar box is $\Delta r$ thick in the radial direction. Along the arc, its length is radius times angle: $r\,\Delta\theta$. So its area is

$$\Delta A \approx (\Delta r)(r\,\Delta\theta) = r\,\Delta r\,\Delta\theta.$$

Boxes far from the origin are wider than boxes near it, even with the same $\Delta r$ and $\Delta\theta$. The factor $r$ accounts for that. Without it you are pretending every box is the same size, and the answer is wrong.

Bonus: the $r$ is often exactly what makes a substitution work. $\int e^{-r^2}\,dr$ is impossible, but $\int e^{-r^2}\,r\,dr = -\tfrac12 e^{-r^2}$.`,
    },
    {
      id: 'recipe',
      title: 'Recipe and the regions to know',
      body: String.raw`1. Sketch the region.
2. Read off $\theta$ first: which slice of the pie does it cover? Then $r$: from the origin (or inner curve) out to the outer curve.
3. Replace $x$, $y$, $x^2+y^2$, and put in the extra $r$.
4. If the $r$ limits depend on $\theta$, $r$ is the inner integral.

- Full disk of radius $a$: $0 \le r \le a$, $0 \le \theta \le 2\pi$.
- Upper half ($y \ge 0$): $0 \le \theta \le \pi$. Right half ($x \ge 0$): $-\tfrac{\pi}{2} \le \theta \le \tfrac{\pi}{2}$.
- Quadrants: first $[0, \tfrac{\pi}{2}]$, second $[\tfrac{\pi}{2}, \pi]$, third $[\pi, \tfrac{3\pi}{2}]$, fourth $[-\tfrac{\pi}{2}, 0]$.
- Ring $a \le r \le b$: same $\theta$ range, $r$ from $a$ to $b$.
- Circle $x^2 + y^2 = 2ax$ (center $(a,0)$, through the origin): $r = 2a\cos\theta$, $-\tfrac{\pi}{2} \le \theta \le \tfrac{\pi}{2}$.
- Circle $x^2 + y^2 = 2ay$ (center $(0,a)$): $r = 2a\sin\theta$, $0 \le \theta \le \pi$.

**Half disk trap:** a half disk has a $\theta$ interval of length $\pi$, a quarter disk has length $\tfrac{\pi}{2}$. Look at the sketch and ask which angles it touches.`,
    },
    {
      id: 'example',
      title: 'Worked example: a quarter disk',
      body: String.raw`Lecture example: $\iint_D \sin(x^2 + y^2)\,dA$, where $D$ is the part of the disk $x^2 + y^2 \le 4$ in the third quadrant.

- $r$: from $0$ to $2$. $\theta$: third quadrant, $\pi \le \theta \le \tfrac{3\pi}{2}$.
- $\sin(x^2+y^2) = \sin(r^2)$.

$$\int_{\pi}^{3\pi/2}\!\!\int_0^2 \sin(r^2)\,r\,dr\,d\theta.$$

Inner, with $u = r^2$ and $r\,dr = \tfrac12du$: $\left[-\tfrac12\cos(r^2)\right]_0^2 = \tfrac{1 - \cos 4}{2}$.

Outer: the integrand no longer depends on $\theta$, so multiply by the angle width $\tfrac{\pi}{2}$:

$$\frac{(1-\cos 4)\,\pi}{4}.$$

The same pattern gives the result to know cold: over a disk of radius $a$,

$$\iint e^{-(x^2+y^2)}\,dA = 2\pi\cdot\tfrac12\left(1 - e^{-a^2}\right) = \pi\left(1 - e^{-a^2}\right).$$`,
    },
    {
      id: 'symmetry',
      title: 'Worked example: let symmetry help',
      body: String.raw`Lecture example: $\iint_D (4x + 3y)\,dA$, with $D$ the upper half of the ring $1 \le r \le 2$.

$$\int_0^{\pi}\!\!\int_1^2 (4r\cos\theta + 3r\sin\theta)\,r\,dr\,d\theta = \left(\int_1^2 r^2\,dr\right)\left(\int_0^\pi (4\cos\theta + 3\sin\theta)\,d\theta\right).$$

The limits are all constants and the integrand is (function of $r$) times (function of $\theta$), so it splits. $\int_1^2 r^2dr = \tfrac73$. On $[0,\pi]$, $\cos\theta$ integrates to $0$ and $\sin\theta$ integrates to $2$. Result: $\tfrac73\cdot 6 = 14$.

The $4x$ term vanished because the half ring is symmetric across the $y$-axis and $x$ is odd there. Over a **full** ring both terms would vanish and the answer would be $0$. A wrong $\theta$ range changes the answer completely.`,
    },
    {
      id: 'curves',
      title: 'Regions with two curves',
      body: String.raw`When the region sits between two curves, find where they meet by setting the two $r$ expressions equal.

Example: the part of the first quadrant inside $r = 2$ and outside the circle $x^2 + y^2 = 4y$.

1. Convert: $r^2 = 4r\sin\theta$, so the second circle is $r = 4\sin\theta$.
2. Meet: $4\sin\theta = 2$, so $\theta = \tfrac{\pi}{6}$.
3. For $0 \le \theta \le \tfrac{\pi}{6}$ a ray leaves the small circle first and then hits $r = 2$. Past $\tfrac{\pi}{6}$ the ray is inside the second circle all the way out to $r = 2$, so it never enters the region.

$$\iint_D f\,dA = \int_0^{\pi/6}\!\!\int_{4\sin\theta}^{2} f\,r\,dr\,d\theta.$$

Going all the way to $\theta = \tfrac{\pi}{2}$ would make $4\sin\theta > 2$, so the inner integral would run backwards and come out negative. If an area or a positive integral comes out negative, the $\theta$ range is the first thing to check.

**Converting a dy dx integral.** $\int_0^1\!\int_{-\sqrt{1-y^2}}^{0}\sqrt{x^2+y^2}\,dx\,dy$: here $x$ runs from the left half of the unit circle to $0$, and $y \ge 0$. That is the second quadrant, so $\tfrac{\pi}{2} \le \theta \le \pi$, $0 \le r \le 1$, and the integral is $\int_{\pi/2}^{\pi}\!\int_0^1 r\cdot r\,dr\,d\theta = \tfrac{\pi}{6}$.`,
    },
  ],

  formulas: [
    { label: 'Area element', tex: String.raw`dA = r\,dr\,d\theta` },
    { label: 'Conversion', tex: String.raw`\iint_D f\,dA = \int_\alpha^\beta\!\!\int_{g_1(\theta)}^{g_2(\theta)} f(r\cos\theta, r\sin\theta)\,r\,dr\,d\theta` },
    { label: 'Substitutions', tex: String.raw`x = r\cos\theta,\ \ y = r\sin\theta,\ \ x^2 + y^2 = r^2` },
    { label: 'Gaussian over a disk of radius a', tex: String.raw`\iint e^{-(x^2+y^2)}\,dA = \pi\left(1 - e^{-a^2}\right)` },
    { label: 'Circles through the origin', tex: String.raw`x^2+y^2 = 2ax \iff r = 2a\cos\theta,\quad x^2+y^2 = 2ay \iff r = 2a\sin\theta` },
  ],

  mistakes: [
    {
      id: 'missing-r',
      title: 'Dropping the r in dA',
      wrong: String.raw`$\int_0^{2\pi}\!\int_0^1 e^{-r^2}\,dr\,d\theta$`,
      right: String.raw`$\int_0^{2\pi}\!\int_0^1 e^{-r^2}\,r\,dr\,d\theta$`,
      why: 'The polar box is r dr by dθ, not dr by dθ. Without r the answer is wrong, and often you cannot even do the substitution.',
    },
    {
      id: 'theta-range',
      title: 'Wrong θ range for a half or quarter disk',
      wrong: String.raw`Upper half disk with $0 \le \theta \le 2\pi$ (or $\tfrac{\pi}{2}$)`,
      right: String.raw`Upper half disk: $0 \le \theta \le \pi$`,
      why: 'Read the angles off the sketch. A half disk spans π, a quarter spans π/2, and which π depends on which half.',
    },
    {
      id: 'missing-half',
      title: 'Losing the 1/2 in the u-substitution',
      wrong: String.raw`$\int_0^1 e^{-r^2}r\,dr = 1 - e^{-1}$`,
      right: String.raw`$\int_0^1 e^{-r^2}r\,dr = \tfrac12\left(1 - e^{-1}\right)$`,
      why: 'With u = r², du = 2r dr, so r dr = du/2.',
    },
    {
      id: 'offset-circle',
      title: 'Treating an off-center circle like one centered at the origin',
      wrong: String.raw`$x^2+y^2 = 4x$: $0 \le r \le 2$, $0 \le \theta \le 2\pi$`,
      right: String.raw`$x^2+y^2 = 4x$: $0 \le r \le 4\cos\theta$, $-\tfrac{\pi}{2} \le \theta \le \tfrac{\pi}{2}$`,
      why: 'A circle through the origin is r = 2a cos θ (or sin θ). It only covers a π-wide range of angles, since r must stay nonnegative.',
    },
    {
      id: 'square-r',
      title: 'Writing x² + y² as r',
      wrong: String.raw`$x^2 + y^2 = r$`,
      right: String.raw`$x^2 + y^2 = r^2$, and $\sqrt{x^2+y^2} = r$`,
      why: 'r is the distance, so x² + y² is r squared. Mixing these up changes every power of r in the answer.',
    },
  ],

  hook: 'Round region or x² + y² inside: go polar, and never forget the r.',

  scene: {
    view: { range: 3, z: [-0.5, 4.5] },
    camera: [6, -6, 5],
    layers: [
      { id: 'surf', kind: 'surface', z: '4 - x^2 - y^2', domain: { r: [0, 2] }, colormap: 'terrain', opacity: 0.85 },
      { id: 'disk', kind: 'region2d', polar: { r: [0, 2], theta: [0, '2*pi'] }, color: 'water' },
      { id: 'rays', kind: 'region2d', polar: { r: [0, 2], theta: [0, '2*pi'] }, strips: 'radial', color: 'water' },
      { id: 'wedge', kind: 'polarBox', r: 1.2, theta: 0.8, dr: 0.3, dtheta: 0.35 },
      { id: 'wedge2', kind: 'polarBox', r: 0.4, theta: 0.8, dr: 0.3, dtheta: 0.35 },
      { id: 'solid', kind: 'solid', bottom: '0', top: '4 - x^2 - y^2', region: { polar: { r: [0, 2], theta: [0, '2*pi'] } } },
    ],
    steps: [
      {
        label: 'Start',
        show: ['surf'],
        caption: String.raw`The paraboloid $z = 4 - x^2 - y^2$. In polar it is just $z = 4 - r^2$.`,
      },
      {
        label: 'Shadow',
        show: ['surf', 'disk'],
        caption: String.raw`It meets the floor where $r = 2$, so its shadow is the disk $0 \le r \le 2$, $0 \le \theta \le 2\pi$.`,
      },
      {
        label: 'Polar box',
        show: ['disk', 'wedge', 'wedge2'],
        caption: String.raw`Two polar boxes with the same $\Delta r$ and $\Delta\theta$. The outer one is wider, because its arc length is $r\,\Delta\theta$. Area: $r\,\Delta r\,\Delta\theta$.`,
      },
      {
        label: 'Radial strips',
        show: ['rays', 'surf'],
        caption: String.raw`Fix $\theta$, let $r$ run from $0$ to $2$ along a ray, then sweep $\theta$ around. Each ray sees the same profile $4 - r^2$.`,
      },
      {
        label: 'Volume',
        show: ['solid', 'disk'],
        caption: String.raw`$V = \int_0^{2\pi}\!\int_0^2 (4 - r^2)\,r\,dr\,d\theta = 2\pi(8 - 4) = 8\pi$.`,
      },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Evaluate $\iint_D e^{-(x^2+y^2)}\,dA$, where $D$ is the disk $x^2 + y^2 \le 1$.`,
      choices: [
        { tex: String.raw`$\pi(1 - e^{-1})$`, correct: true },
        { tex: String.raw`$2\pi(1 - e^{-1})$`, mistake: 'missing-half', why: String.raw`$\int_0^1 e^{-r^2}r\,dr = \tfrac12(1 - e^{-1})$; the $\tfrac12$ from $du = 2r\,dr$ was dropped.` },
        { tex: String.raw`$\int_0^{2\pi}\!\int_0^1 e^{-r^2}\,dr\,d\theta$ (no closed form)`, mistake: 'missing-r', why: 'With the r in dA the integral is a simple substitution.' },
        { tex: String.raw`$\pi e^{-1}$`, mistake: 'arith', why: String.raw`Evaluate at both limits: $-\tfrac12 e^{-1} - \left(-\tfrac12 e^{0}\right) = \tfrac12(1 - e^{-1})$.` },
        { tex: String.raw`$\tfrac{\pi}{2}(1 - e^{-1})$`, mistake: 'theta-range', why: 'That uses θ from 0 to π, a half disk. The full disk needs 0 to 2π.' },
      ],
      steps: [
        String.raw`Disk and $x^2+y^2$ in the integrand: polar. $0 \le r \le 1$, $0 \le \theta \le 2\pi$.`,
        String.raw`$\int_0^{2\pi}\!\int_0^1 e^{-r^2}\,r\,dr\,d\theta$.`,
        String.raw`$u = r^2$: inner integral is $\tfrac12(1 - e^{-1})$.`,
        String.raw`Times $2\pi$: $\pi(1 - e^{-1})$.`,
      ],
      source: 'Study plan bank #10',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Find the volume of the solid under $z = 4 - x^2 - y^2$ and above the $xy$-plane.`,
      choices: [
        { tex: String.raw`$8\pi$`, correct: true },
        { tex: String.raw`$\tfrac{32\pi}{3}$`, mistake: 'missing-r', why: String.raw`That is $2\pi\int_0^2(4 - r^2)\,dr$. The integrand needs the extra $r$: $(4 - r^2)\,r$.` },
        { tex: String.raw`$4\pi$`, mistake: 'theta-range', why: 'θ from 0 to π covers only half the disk.' },
        { tex: String.raw`$16\pi$`, mistake: 'arith', why: String.raw`$\int_0^2 (4r - r^3)\,dr = 8 - 4 = 4$. Forgetting the $r^4/4$ term gives 8.` },
        { tex: String.raw`$8$`, mistake: 'arith', why: String.raw`The $\theta$ integral contributes a factor $2\pi$; it was dropped.` },
      ],
      steps: [
        String.raw`The paraboloid hits $z = 0$ when $x^2 + y^2 = 4$: the shadow is the disk $r \le 2$.`,
        String.raw`$V = \int_0^{2\pi}\!\int_0^2 (4 - r^2)\,r\,dr\,d\theta$.`,
        String.raw`$\int_0^2 (4r - r^3)\,dr = 8 - 4 = 4$. Times $2\pi$: $8\pi$.`,
      ],
      source: 'Study plan bank #11',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Evaluate $\iint_D y\,dA$, where $D$ is the part of the disk $x^2 + y^2 \le 4$ in the first quadrant.`,
      choices: [
        { tex: String.raw`$\tfrac83$`, correct: true },
        { tex: String.raw`$2$`, mistake: 'missing-r', why: String.raw`$y = r\sin\theta$, and $dA$ adds another $r$, so the $r$-integral is $\int_0^2 r^2dr = \tfrac83$, not $\int_0^2 r\,dr$.` },
        { tex: String.raw`$\tfrac{16}{3}$`, mistake: 'theta-range', why: 'θ from 0 to π is the upper half disk. The first quadrant is 0 to π/2.' },
        { tex: String.raw`$0$`, mistake: 'theta-range', why: 'Over the full disk the positive and negative y cancel. The first quadrant has only y ≥ 0.' },
        { tex: String.raw`$\tfrac43$`, mistake: 'arith', why: String.raw`$\int_0^{\pi/2}\sin\theta\,d\theta = 1$, not $\tfrac12$.` },
      ],
      steps: [
        String.raw`$0 \le r \le 2$, $0 \le \theta \le \tfrac{\pi}{2}$, $y = r\sin\theta$.`,
        String.raw`$\int_0^{\pi/2}\!\int_0^2 (r\sin\theta)\,r\,dr\,d\theta = \left(\int_0^2 r^2dr\right)\left(\int_0^{\pi/2}\sin\theta\,d\theta\right)$.`,
        String.raw`$= \tfrac83\cdot 1 = \tfrac83$.`,
      ],
      source: 'Study plan bank #12',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Which polar integral has the same region and the same integrand as $\displaystyle\int_0^{2}\!\!\int_{-\sqrt{4-x^2}}^{0} (x^2+y^2)^{3/2}\,dy\,dx$?`,
      choices: [
        { tex: String.raw`$\displaystyle\int_{-\pi/2}^{0}\!\!\int_0^2 r^4\,dr\,d\theta$`, correct: true },
        { tex: String.raw`$\displaystyle\int_{-\pi/2}^{0}\!\!\int_0^2 r^3\,dr\,d\theta$`, mistake: 'missing-r', why: String.raw`$(r^2)^{3/2} = r^3$ is the integrand. $dA$ supplies one more $r$.` },
        { tex: String.raw`$\displaystyle\int_{\pi/2}^{\pi}\!\!\int_0^2 r^4\,dr\,d\theta$`, mistake: 'theta-range', why: 'x ≥ 0 and y ≤ 0 is the fourth quadrant, not the second.' },
        { tex: String.raw`$\displaystyle\int_{0}^{\pi}\!\!\int_0^2 r^4\,dr\,d\theta$`, mistake: 'theta-range', why: 'The region is a quarter disk, so the θ interval has length π/2.' },
        { tex: String.raw`$\displaystyle\int_{-\pi/2}^{0}\!\!\int_0^4 r^4\,dr\,d\theta$`, mistake: 'square-r', why: String.raw`The boundary is $x^2 + y^2 = 4$, so $r^2 = 4$ and the radius is 2. Reading the 4 as $r$ is the slip.` },
      ],
      steps: [
        String.raw`Inequalities: $0 \le x \le 2$ and $-\sqrt{4-x^2} \le y \le 0$. That is the bottom half of the circle of radius 2, with $x \ge 0$.`,
        String.raw`Fourth quadrant: $-\tfrac{\pi}{2} \le \theta \le 0$ (or $\tfrac{3\pi}{2}$ to $2\pi$), $0 \le r \le 2$.`,
        String.raw`$(x^2+y^2)^{3/2} = r^3$, times $r$ from $dA$: $r^4$.`,
        String.raw`(Its value is $\tfrac{\pi}{2}\cdot\tfrac{32}{5} = \tfrac{16\pi}{5}$.)`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Evaluate $\iint_D (2x + 5y)\,dA$, where $D$ is the part of the ring $1 \le x^2 + y^2 \le 9$ with $y \ge 0$.`,
      choices: [
        { tex: String.raw`$\tfrac{260}{3}$`, correct: true },
        { tex: String.raw`$40$`, mistake: 'missing-r', why: String.raw`The $r$-integral is $\int_1^3 r\cdot r\,dr = \tfrac{26}{3}$, not $\int_1^3 r\,dr = 4$.` },
        { tex: String.raw`$0$`, mistake: 'theta-range', why: 'θ from 0 to 2π is the full ring, where both terms cancel. y ≥ 0 means 0 to π.' },
        { tex: String.raw`$-\tfrac{260}{3}$`, mistake: 'sign', why: String.raw`$\int_0^\pi 5\sin\theta\,d\theta = [-5\cos\theta]_0^\pi = 5 + 5 = 10$.` },
        { tex: String.raw`$\tfrac{130}{3}$`, mistake: 'arith', why: String.raw`$\int_0^\pi \sin\theta\,d\theta = 2$, not 1.` },
      ],
      steps: [
        String.raw`$1 \le r \le 3$, $0 \le \theta \le \pi$.`,
        String.raw`$(2r\cos\theta + 5r\sin\theta)\,r = r^2(2\cos\theta + 5\sin\theta)$.`,
        String.raw`$\int_1^3 r^2\,dr = \tfrac{26}{3}$. $\int_0^\pi (2\cos\theta + 5\sin\theta)\,d\theta = 0 + 10$.`,
        String.raw`Product: $\tfrac{260}{3}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 3,
      prompt: String.raw`Let $D$ be the disk $(x - 2)^2 + y^2 \le 4$. Evaluate $\iint_D \sqrt{x^2 + y^2}\,dA$.`,
      choices: [
        { tex: String.raw`$\tfrac{256}{9}$`, correct: true },
        { tex: String.raw`$0$`, mistake: 'offset-circle', why: String.raw`With $\theta$ from 0 to $2\pi$, $\int\cos^3\theta\,d\theta = 0$. The circle $r = 4\cos\theta$ only uses $-\tfrac{\pi}{2} \le \theta \le \tfrac{\pi}{2}$.` },
        { tex: String.raw`$\tfrac{128}{9}$`, mistake: 'theta-range', why: 'θ from 0 to π/2 covers only the top half of the disk.' },
        { tex: String.raw`$4\pi$`, mistake: 'missing-r', why: String.raw`The integrand $\sqrt{x^2+y^2} = r$ times the $r$ in $dA$ is $r^2$, not $r$.` },
        { tex: String.raw`$\tfrac{16\pi}{3}$`, mistake: 'offset-circle', why: 'That integrates over a radius-2 disk centered at the origin. This disk is centered at (2, 0).' },
      ],
      steps: [
        String.raw`Expand: $x^2 + y^2 = 4x$, so $r^2 = 4r\cos\theta$, i.e. $r = 4\cos\theta$, with $-\tfrac{\pi}{2} \le \theta \le \tfrac{\pi}{2}$.`,
        String.raw`$\int_{-\pi/2}^{\pi/2}\!\int_0^{4\cos\theta} r\cdot r\,dr\,d\theta = \int_{-\pi/2}^{\pi/2}\tfrac{64}{3}\cos^3\theta\,d\theta$.`,
        String.raw`$\int_{-\pi/2}^{\pi/2}\cos^3\theta\,d\theta = \tfrac43$ (write $\cos^3 = (1-\sin^2)\cos$).`,
        String.raw`$\tfrac{64}{3}\cdot\tfrac43 = \tfrac{256}{9}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 2,
      prompt: String.raw`Evaluate $\displaystyle\iint_D \frac{1}{1 + x^2 + y^2}\,dA$, where $D$ is the ring $1 \le x^2 + y^2 \le 4$.`,
      choices: [
        { tex: String.raw`$\pi\ln\tfrac52$`, correct: true },
        { tex: String.raw`$2\pi\ln\tfrac52$`, mistake: 'missing-half', why: String.raw`$\int \tfrac{r}{1+r^2}dr = \tfrac12\ln(1+r^2)$. The $\tfrac12$ was dropped.` },
        { tex: String.raw`$2\pi\left(\arctan 2 - \tfrac{\pi}{4}\right)$`, mistake: 'missing-r', why: String.raw`That is $2\pi\int_1^2 \tfrac{dr}{1+r^2}$. With the $r$ from $dA$ the integrand is $\tfrac{r}{1+r^2}$.` },
        { tex: String.raw`$\tfrac{\pi}{2}\ln\tfrac52$`, mistake: 'theta-range', why: 'That is half the ring (θ from 0 to π).' },
        { tex: String.raw`$\pi\ln 5$`, mistake: 'setup', why: 'r starts at 1, not 0. That answer is for the whole disk of radius 2.' },
      ],
      steps: [
        String.raw`$1 \le r \le 2$, $0 \le \theta \le 2\pi$: $\int_0^{2\pi}\!\int_1^2 \frac{r}{1 + r^2}\,dr\,d\theta$.`,
        String.raw`$u = 1 + r^2$: $\int_1^2\frac{r}{1+r^2}dr = \tfrac12(\ln 5 - \ln 2) = \tfrac12\ln\tfrac52$.`,
        String.raw`Times $2\pi$: $\pi\ln\tfrac52$.`,
      ],
      source: 'original',
    },
  ],

  lab: [{ kind: 'surface', expr: '4 - x^2 - y^2' }],
};
