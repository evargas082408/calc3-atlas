export default {
  id: 22,
  title: 'Triple integrals in cylindrical coordinates',
  section: '16.5',
  exam: 2,
  blurb: 'Polar coordinates on the floor plus a plain z: the natural system for cylinders, cones and paraboloids around the z-axis.',
  boiler: ['Cylindrical Integration', 'Rectangular to Cylindrical Integration'],

  sections: [
    {
      id: 'idea',
      title: 'The idea',
      body: String.raw`Cylindrical coordinates are polar coordinates in the $xy$-plane with $z$ left alone:

$$x = r\cos\theta,\qquad y = r\sin\theta,\qquad z = z,\qquad r = \sqrt{x^2+y^2}.$$

Use them when the solid wraps around the $z$-axis: cylinders, cones, paraboloids, or anything whose shadow is a disk, ring or wedge. The shadow method from Lesson 21 still works. The only change is that the shadow is described in polar, so the floor piece is $r\,dr\,d\theta$:

$$dV = r\,dz\,dr\,d\theta.$$

Same reason as Lesson 20: a cylindrical box is a polar box of area $r\,\Delta r\,\Delta\theta$, stretched up by $\Delta z$.`,
    },
    {
      id: 'surfaces',
      title: 'Translating surfaces',
      body: String.raw`Replace $x^2 + y^2$ with $r^2$ and most equations collapse:

- $x^2 + y^2 = 4$ is $r = 2$: a **cylinder** of radius 2 ($z$ is free).
- $\theta = \tfrac{\pi}{4}$ is the half-plane through the $z$-axis above the ray $y = x$, $x > 0$.
- $z = \sqrt{x^2+y^2}$ is $z = r$: a **cone** opening up, at 45 degrees.
- $z = \sqrt{3(x^2+y^2)}$ is $z = \sqrt3\,r$: a narrower cone.
- $z = x^2 + y^2$ is $z = r^2$: a **paraboloid** opening up. $z = 6 - r^2$ opens down from height 6.
- $x^2 + y^2 + z^2 = 8$ is $r^2 + z^2 = 8$; its top half is $z = \sqrt{8 - r^2}$.

Once every surface is written as $z = (\text{something in } r)$, the $z$-limits are immediate.`,
    },
    {
      id: 'recipe',
      title: 'Recipe',
      body: String.raw`1. Write the bottom and top surfaces as $z = B(r)$ and $z = T(r)$.
2. Set $B = T$ and solve for $r$. That is the edge of the shadow.
3. Read the $\theta$ range from the shadow (full circle, half, quarter...).
4. Integrate $z$, then $r$, then $\theta$, and **multiply by $r$**:

$$\int_{\theta_1}^{\theta_2}\!\!\int_{r_1}^{r_2}\!\!\int_{B(r)}^{T(r)} f(r\cos\theta, r\sin\theta, z)\,r\,dz\,dr\,d\theta.$$

Quick example (Exam 2 review): a solid cylinder $x^2 + y^2 \le 1$, $0 \le z \le \pi$, with density $\sin z$. The mass is

$$\int_0^{2\pi}\!\!\int_0^1\!\!\int_0^\pi \sin z\;r\,dz\,dr\,d\theta = 2\cdot\tfrac12\cdot 2\pi = 2\pi.$$

All limits are constants and the integrand splits, so it is a product of three one-variable integrals.`,
    },
    {
      id: 'example',
      title: 'Worked example: cone under a paraboloid',
      body: String.raw`Lecture example: the volume between the cone $z = \sqrt{x^2+y^2}$ and the paraboloid $z = 6 - x^2 - y^2$.

1. In cylindrical: bottom $z = r$, top $z = 6 - r^2$.
2. Edge of the shadow: $r = 6 - r^2$, so $r^2 + r - 6 = (r+3)(r-2) = 0$ and $r = 2$.
3. Shadow: the full disk $r \le 2$, so $0 \le \theta \le 2\pi$.

$$V = \int_0^{2\pi}\!\!\int_0^2\!\!\int_r^{6 - r^2} r\,dz\,dr\,d\theta = 2\pi\int_0^2 (6r - r^3 - r^2)\,dr = 2\pi\left(12 - 4 - \tfrac83\right) = \frac{32\pi}{3}.$$

Check which surface is on top with a test value: at $r = 0$, the cone is at $0$ and the paraboloid at $6$.`,
    },
    {
      id: 'convert',
      title: 'Converting a rectangular integral (the exam trap)',
      body: String.raw`A favorite question: here is a $dz\,dy\,dx$ integral, pick the equal cylindrical one. The five choices differ only in the limits or the power of $r$.

Lecture example: $\displaystyle\int_0^{\sqrt2/2}\!\!\int_y^{\sqrt{1-y^2}}\!\!\int_0^{1-x^2-y^2} dz\,dx\,dy$.

1. The $z$-limits become $0 \le z \le 1 - r^2$.
2. The shadow: $x$ from the line $x = y$ to the circle $x = \sqrt{1-y^2}$, for $0 \le y \le \tfrac{\sqrt2}{2}$. Sketch it: the wedge between the $x$-axis and the line $y = x$, inside the unit circle.
3. Polar: $0 \le r \le 1$, $0 \le \theta \le \tfrac{\pi}{4}$.

$$\int_0^{\pi/4}\!\!\int_0^1\!\!\int_0^{1-r^2} r\,dz\,dr\,d\theta = \frac{\pi}{4}\cdot\frac14 = \frac{\pi}{16}.$$

**Count your r's.** If the integrand is $xy^2z$, it becomes $(r\cos\theta)(r\sin\theta)^2z = r^3\cos\theta\sin^2\theta\,z$, and $dV$ adds one more: $r^4$. Wrong choices use $r^3$ (forgot the Jacobian) or $r^5$ (counted it twice). Also check the radius: a bound like $\sqrt{2 - x^2}$ means radius $\sqrt2$, not 2.`,
    },
    {
      id: 'axes',
      title: 'Solids around another axis',
      body: String.raw`If the solid wraps around the $y$-axis instead, use polar in the $xz$-plane and keep $y$ plain. Lecture example: the region between the cones $y = \sqrt{x^2 + z^2}$ and $y = 2 - \sqrt{x^2+z^2}$.

With $r = \sqrt{x^2 + z^2}$: $r \le y \le 2 - r$. They meet at $r = 1$, so the shadow in the $xz$-plane is the unit disk:

$$V = \int_0^{2\pi}\!\!\int_0^1\!\!\int_r^{2-r} r\,dy\,dr\,d\theta = 2\pi\int_0^1 (2r - 2r^2)\,dr = \frac{2\pi}{3}.$$

The variable left alone in the equations ($y$ here) is the one you integrate first.`,
    },
  ],

  formulas: [
    { label: 'Coordinates', tex: String.raw`x = r\cos\theta,\ \ y = r\sin\theta,\ \ z = z,\ \ r^2 = x^2+y^2` },
    { label: 'Volume element', tex: String.raw`dV = r\,dz\,dr\,d\theta` },
    { label: 'Setup', tex: String.raw`\int_{\theta_1}^{\theta_2}\!\int_{r_1}^{r_2}\!\int_{B(r)}^{T(r)} f\,r\,dz\,dr\,d\theta` },
    { label: 'Common surfaces', tex: String.raw`r = a\ \text{(cylinder)},\quad z = r\ \text{(cone)},\quad z = r^2\ \text{(paraboloid)}` },
  ],

  mistakes: [
    {
      id: 'missing-r',
      title: 'Forgetting the r in dV',
      wrong: String.raw`$\int\!\int\!\int f\,dz\,dr\,d\theta$`,
      right: String.raw`$\int\!\int\!\int f\,r\,dz\,dr\,d\theta$`,
      why: 'The floor piece is a polar box of area r dr dθ. Missing r is the most common error on this exam.',
    },
    {
      id: 'r-power',
      title: 'Miscounting the powers of r',
      wrong: String.raw`$xy^2z\,dV \to r^3\cos\theta\sin^2\theta\,z\,dz\,dr\,d\theta$`,
      right: String.raw`$xy^2z\,dV \to r^4\cos\theta\sin^2\theta\,z\,dz\,dr\,d\theta$`,
      why: 'Count the r from each x and y in the integrand, then add exactly one more for dV.',
    },
    {
      id: 'theta-range',
      title: 'Full circle when the shadow is half a disk',
      wrong: String.raw`$x \ge 0$ shadow with $0 \le \theta \le 2\pi$`,
      right: String.raw`$x \ge 0$: $-\tfrac{\pi}{2} \le \theta \le \tfrac{\pi}{2}$; $y \ge 0$: $0 \le \theta \le \pi$`,
      why: 'Sketch the shadow from the dx dy limits and read the angles off it.',
    },
    {
      id: 'shadow-radius',
      title: 'Wrong radius for the shadow',
      wrong: String.raw`$y \le \sqrt{2 - x^2}$ read as radius 2`,
      right: String.raw`$y \le \sqrt{2 - x^2}$ means $x^2 + y^2 \le 2$: radius $\sqrt2$`,
      why: 'The number under the square root is r squared. For two surfaces, the radius comes from setting them equal, not from where one hits z = 0.',
    },
    {
      id: 'top-bottom',
      title: 'Top and bottom surfaces swapped',
      wrong: String.raw`Above the cone, below $z = 2$: $2 \le z \le r$`,
      right: String.raw`$r \le z \le 2$`,
      why: 'The stick enters through the bottom surface and leaves through the top. Test r = 0 to see which is higher.',
    },
  ],

  hook: 'Polar on the floor, z straight up, and one extra r: dV = r dz dr dθ.',

  scene: {
    view: { range: 2.5, z: [-0.2, 2.8] },
    camera: [5, -4.5, 3.5],
    layers: [
      { id: 'cone', kind: 'surface', z: 'sqrt(x^2 + y^2)', domain: { r: [0, 2] }, colormap: 'viridis', opacity: 0.7 },
      { id: 'lid', kind: 'surface', z: '2', domain: { r: [0, 2] }, colormap: 'water', opacity: 0.5 },
      { id: 'solid', kind: 'solid', bottom: 'sqrt(x^2 + y^2)', top: '2', region: { polar: { r: [0, 2], theta: [0, '2*pi'] } } },
      { id: 'disk', kind: 'region2d', polar: { r: [0, 2], theta: [0, '2*pi'] }, color: 'water' },
      { id: 'rim', kind: 'curve', x: '2*cos(t)', y: '2*sin(t)', z: '2', t: [0, '2*pi'], color: 'road' },
      { id: 'stick', kind: 'curve', x: '0.8', y: '0.6', z: 't', t: [1, 2], color: 'road' },
      { id: 'stickBot', kind: 'point', at: [0.8, 0.6, 1], label: 'z = r = 1' },
      { id: 'stickTop', kind: 'point', at: [0.8, 0.6, 2], label: 'z = 2' },
      { id: 'box', kind: 'polarBox', r: 1.2, theta: 0.8, dr: 0.3, dtheta: 0.35 },
    ],
    steps: [
      {
        label: 'Start',
        show: ['cone', 'lid'],
        caption: String.raw`The cone $z = \sqrt{x^2+y^2}$, which is $z = r$, and the plane $z = 2$.`,
      },
      {
        label: 'The solid',
        show: ['cone', 'solid', 'rim'],
        caption: String.raw`The solid above the cone and below the plane: an ice-cream cone with a flat top. The two surfaces meet on the red circle where $r = 2$.`,
      },
      {
        label: 'Shadow',
        show: ['solid', 'disk'],
        caption: String.raw`Set the surfaces equal: $r = 2$. The shadow is the disk $0 \le r \le 2$, $0 \le \theta \le 2\pi$.`,
      },
      {
        label: 'Stick',
        show: ['cone', 'lid', 'stick', 'stickBot', 'stickTop'],
        caption: String.raw`Above a shadow point at distance $r$, a vertical stick enters at the cone $z = r$ and leaves at $z = 2$. So $r \le z \le 2$.`,
      },
      {
        label: 'Volume element',
        show: ['disk', 'box'],
        caption: String.raw`Each floor piece is a polar box of area $r\,dr\,d\theta$, so $dV = r\,dz\,dr\,d\theta$ and $V = \int_0^{2\pi}\!\int_0^2\!\int_r^2 r\,dz\,dr\,d\theta = \tfrac{8\pi}{3}$.`,
      },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Evaluate $\iiint_E z\,dV$, where $E$ is the solid cylinder $x^2 + y^2 \le 4$, $0 \le z \le 3$.`,
      choices: [
        { tex: String.raw`$18\pi$`, correct: true },
        { tex: String.raw`$36\pi$`, mistake: 'arith', why: String.raw`$\int_0^3 z\,dz = \tfrac92$, not 9.` },
        { tex: String.raw`$9\pi$`, mistake: 'theta-range', why: 'θ from 0 to π covers half the cylinder.' },
        { tex: String.raw`$12\pi$`, mistake: 'concept', why: 'That is the volume of the cylinder, the integral of 1.' },
        { tex: String.raw`$6\pi$`, mistake: 'arith', why: String.raw`$\int_0^3 z\,dz = \tfrac{3^2}{2}$, not $\tfrac32$.` },
      ],
      steps: [
        String.raw`$0 \le z \le 3$, $0 \le r \le 2$, $0 \le \theta \le 2\pi$.`,
        String.raw`$\int_0^{2\pi}\!\int_0^2\!\int_0^3 z\,r\,dz\,dr\,d\theta = \left(\tfrac92\right)\left(2\right)\left(2\pi\right)$.`,
        String.raw`$= 18\pi$.`,
      ],
      source: 'Study plan bank #15',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Find the volume of the solid above the cone $z = \sqrt{x^2 + y^2}$ and below the plane $z = 2$.`,
      choices: [
        { tex: String.raw`$\tfrac{8\pi}{3}$`, correct: true },
        { tex: String.raw`$4\pi$`, mistake: 'missing-r', why: String.raw`That is $2\pi\int_0^2 (2 - r)\,dr$. It needs $(2 - r)\,r$.` },
        { tex: String.raw`$\tfrac{16\pi}{3}$`, mistake: 'top-bottom', why: 'That is the region below the cone (inside the cylinder r ≤ 2, above z = 0).' },
        { tex: String.raw`$-\tfrac{8\pi}{3}$`, mistake: 'top-bottom', why: 'The plane is on top. z runs from r up to 2, not from 2 down to r.' },
        { tex: String.raw`$8\pi$`, mistake: 'concept', why: 'That is the whole cylinder r ≤ 2, 0 ≤ z ≤ 2. The cone cuts out part of it.' },
      ],
      steps: [
        String.raw`Cylindrical: $r \le z \le 2$. They meet at $r = 2$: shadow $r \le 2$.`,
        String.raw`$V = \int_0^{2\pi}\!\int_0^2 (2 - r)\,r\,dr\,d\theta$.`,
        String.raw`$\int_0^2 (2r - r^2)\,dr = 4 - \tfrac83 = \tfrac43$. Times $2\pi$: $\tfrac{8\pi}{3}$.`,
      ],
      source: 'Study plan bank #16',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Which integral equals $\displaystyle\int_{-\sqrt2}^{\sqrt2}\!\!\int_0^{\sqrt{2-x^2}}\!\!\int_0^{2} x^2y\,dz\,dy\,dx$?`,
      choices: [
        { tex: String.raw`$\displaystyle\int_0^{\pi}\!\!\int_0^{\sqrt2}\!\!\int_0^2 r^4\cos^2\theta\sin\theta\,dz\,dr\,d\theta$`, correct: true },
        { tex: String.raw`$\displaystyle\int_0^{\pi}\!\!\int_0^{\sqrt2}\!\!\int_0^2 r^3\cos^2\theta\sin\theta\,dz\,dr\,d\theta$`, mistake: 'missing-r', why: String.raw`$x^2y = r^3\cos^2\theta\sin\theta$, and $dV$ adds one more $r$.` },
        { tex: String.raw`$\displaystyle\int_0^{\pi}\!\!\int_0^{2}\!\!\int_0^2 r^4\cos^2\theta\sin\theta\,dz\,dr\,d\theta$`, mistake: 'shadow-radius', why: String.raw`$y \le \sqrt{2 - x^2}$ means $r^2 \le 2$: radius $\sqrt2$.` },
        { tex: String.raw`$\displaystyle\int_0^{2\pi}\!\!\int_0^{\sqrt2}\!\!\int_0^2 r^4\cos^2\theta\sin\theta\,dz\,dr\,d\theta$`, mistake: 'theta-range', why: 'y runs from 0 up, so the shadow is the upper half disk: θ from 0 to π.' },
        { tex: String.raw`$\displaystyle\int_0^{\pi}\!\!\int_0^{\sqrt2}\!\!\int_0^2 r^5\cos^2\theta\sin\theta\,dz\,dr\,d\theta$`, mistake: 'r-power', why: 'Three r from x²y and one from dV make r⁴. The Jacobian r was counted twice.' },
      ],
      steps: [
        String.raw`Shadow: $-\sqrt2 \le x \le \sqrt2$, $0 \le y \le \sqrt{2 - x^2}$. Upper half of the disk of radius $\sqrt2$.`,
        String.raw`So $0 \le r \le \sqrt2$, $0 \le \theta \le \pi$, and $z$ stays $0$ to $2$.`,
        String.raw`$x^2y = r^3\cos^2\theta\sin\theta$; times $r$: $r^4\cos^2\theta\sin\theta$.`,
        String.raw`(Both integrals equal $\tfrac{16\sqrt2}{15}$.)`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Find the volume of the solid above the cone $z = 2\sqrt{x^2+y^2}$ and below the paraboloid $z = 8 - x^2 - y^2$.`,
      choices: [
        { tex: String.raw`$\tfrac{40\pi}{3}$`, correct: true },
        { tex: String.raw`$\tfrac{56\pi}{3}$`, mistake: 'missing-r', why: String.raw`That is $2\pi\int_0^2 (8 - r^2 - 2r)\,dr$, with no $r$ from $dV$.` },
        { tex: String.raw`$\tfrac{32\pi}{3}\left(3 - 2\sqrt2\right)$`, mistake: 'shadow-radius', why: String.raw`You used $r \le 2\sqrt2$, where the paraboloid hits $z = 0$. The shadow edge is where the cone meets the paraboloid: $2r = 8 - r^2$, $r = 2$.` },
        { tex: String.raw`$-\tfrac{40\pi}{3}$`, mistake: 'top-bottom', why: 'The paraboloid is on top (at r = 0 it is at 8, the cone at 0).' },
        { tex: String.raw`$\tfrac{20\pi}{3}$`, mistake: 'theta-range', why: 'The shadow is a full disk: θ from 0 to 2π.' },
      ],
      steps: [
        String.raw`Cylindrical: $2r \le z \le 8 - r^2$.`,
        String.raw`Edge: $2r = 8 - r^2 \Rightarrow r^2 + 2r - 8 = (r + 4)(r - 2) = 0$, so $r = 2$.`,
        String.raw`$V = 2\pi\int_0^2 (8 - r^2 - 2r)\,r\,dr = 2\pi\left(16 - 4 - \tfrac{16}{3}\right)$.`,
        String.raw`$= 2\pi\cdot\tfrac{20}{3} = \tfrac{40\pi}{3}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`A solid lies under $z = 4 - x^2 - y^2$ and above $z = 0$. Its density is $\delta(x,y,z) = z$. Find its mass.`,
      choices: [
        { tex: String.raw`$\tfrac{32\pi}{3}$`, correct: true },
        { tex: String.raw`$\tfrac{256\pi}{15}$`, mistake: 'missing-r', why: String.raw`That is $\pi\int_0^2(4 - r^2)^2\,dr$. With the $r$ from $dV$ the integral becomes a clean substitution.` },
        { tex: String.raw`$\tfrac{64\pi}{3}$`, mistake: 'arith', why: String.raw`$\int_0^{4-r^2} z\,dz = \tfrac{(4-r^2)^2}{2}$; the $\tfrac12$ was dropped.` },
        { tex: String.raw`$8\pi$`, mistake: 'concept', why: 'That is the volume. The density z was left out.' },
        { tex: String.raw`$\tfrac{16\pi}{3}$`, mistake: 'theta-range', why: 'θ runs all the way around: 0 to 2π.' },
      ],
      steps: [
        String.raw`$0 \le z \le 4 - r^2$, $0 \le r \le 2$, $0 \le \theta \le 2\pi$.`,
        String.raw`Inner: $\int_0^{4-r^2} z\,dz = \tfrac{(4 - r^2)^2}{2}$.`,
        String.raw`$m = 2\pi\int_0^2 \tfrac{(4-r^2)^2}{2}\,r\,dr$. With $u = 4 - r^2$, $r\,dr = -\tfrac12du$: $\pi\cdot\tfrac12\int_0^4 u^2\,du = \tfrac{\pi}{2}\cdot\tfrac{64}{3}$.`,
        String.raw`$m = \tfrac{32\pi}{3}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 3,
      prompt: String.raw`Convert to cylindrical coordinates and evaluate $\displaystyle\int_0^{\sqrt2}\!\!\int_y^{\sqrt{4-y^2}}\!\!\int_0^{x^2+y^2} dz\,dx\,dy$.`,
      choices: [
        { tex: String.raw`$\pi$`, correct: true },
        { tex: String.raw`$2\pi$`, mistake: 'theta-range', why: 'The shadow is the wedge between the x-axis and y = x: θ from 0 to π/4, not π/2.' },
        { tex: String.raw`$\tfrac{2\pi}{3}$`, mistake: 'missing-r', why: String.raw`The height is $r^2$, and $dV$ adds an $r$: integrate $r^3$, not $r^2$.` },
        { tex: String.raw`$\tfrac{\pi}{4}$`, mistake: 'shadow-radius', why: String.raw`$\sqrt2$ is where the line $y = x$ meets the circle, not the radius. The circle $x = \sqrt{4 - y^2}$ has radius 2.` },
        { tex: String.raw`$\tfrac{8\pi}{5}$`, mistake: 'r-power', why: String.raw`$r^2$ from the height times one $r$ from $dV$ is $r^3$, not $r^4$.` },
      ],
      steps: [
        String.raw`Shadow: $0 \le y \le \sqrt2$, from the line $x = y$ to the circle $x^2 + y^2 = 4$. They meet at $(\sqrt2, \sqrt2)$.`,
        String.raw`That is the wedge $0 \le \theta \le \tfrac{\pi}{4}$, $0 \le r \le 2$.`,
        String.raw`$\int_0^{\pi/4}\!\int_0^2\!\int_0^{r^2} r\,dz\,dr\,d\theta = \tfrac{\pi}{4}\int_0^2 r^3\,dr = \tfrac{\pi}{4}\cdot 4 = \pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 1,
      prompt: String.raw`In cylindrical coordinates, what is the $\theta$ range for $\displaystyle\int_0^{2}\!\!\int_{-\sqrt{4-x^2}}^{\sqrt{4-x^2}}\!\!\int_0^{3} f\,dz\,dy\,dx$?`,
      choices: [
        { tex: String.raw`$-\tfrac{\pi}{2} \le \theta \le \tfrac{\pi}{2}$`, correct: true },
        { tex: String.raw`$0 \le \theta \le \pi$`, mistake: 'theta-range', why: 'That is the upper half (y ≥ 0). Here y covers both signs and x ≥ 0.' },
        { tex: String.raw`$0 \le \theta \le 2\pi$`, mistake: 'theta-range', why: 'x only runs from 0 to 2, so only the right half of the disk is covered.' },
        { tex: String.raw`$0 \le \theta \le \tfrac{\pi}{2}$`, mistake: 'theta-range', why: 'That is only the first quadrant. y also goes negative.' },
        { tex: String.raw`$\tfrac{\pi}{2} \le \theta \le \tfrac{3\pi}{2}$`, mistake: 'theta-range', why: 'That is the left half (x ≤ 0).' },
      ],
      steps: [
        String.raw`For each $x$, $y$ runs over the full chord of the circle of radius 2. And $0 \le x \le 2$.`,
        String.raw`So the shadow is the right half disk ($x \ge 0$).`,
        String.raw`Angles from straight down to straight up through the positive $x$-axis: $-\tfrac{\pi}{2} \le \theta \le \tfrac{\pi}{2}$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: 'sqrt(x^2 + y^2)' },
    { kind: 'surface', expr: '2' },
  ],
};
