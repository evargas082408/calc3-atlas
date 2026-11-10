export default {
  id: 26,
  title: 'Line integrals of functions',
  section: '17.2',
  exam: 2,
  blurb: 'Add up a function along a curve: the area of a curtain, the length of a path, the mass of a wire.',
  boiler: ['Line Integral - ds'],

  sections: [
    {
      id: 'curtain',
      title: 'The idea: a curtain standing on a curve',
      body: String.raw`In Calc 1, $\int_a^b f(x)\,dx$ adds up heights $f(x_i)$ times widths $\Delta x$ along a straight piece of the $x$-axis.

Now let the base be a curve $C$ in the plane instead of a segment of an axis. Stand a vertical curtain on $C$ whose height at each point is $f(x,y)$. Cut it into thin vertical slices. Each slice has height $f(x_i,y_i)$ and width $\Delta s$, a small piece of **arc length** along $C$. Add them up:

$$\int_C f\,ds = \lim_{n\to\infty}\sum_{i=1}^{n} f(x_i,y_i)\,\Delta s$$

That limit is the **line integral of $f$ over $C$**, and for $f\ge 0$ it is the area of the curtain.`,
    },
    {
      id: 'ds',
      title: 'Turning ds into dt',
      body: String.raw`You cannot integrate "in $s$" directly. You know the curve through a parametrization $\vec r(t)$, $a\le t\le b$. From Lesson 8, arc length is

$$s(t) = \int_a^t |\vec r^{\,\prime}(u)|\,du \quad\Longrightarrow\quad \frac{ds}{dt} = |\vec r^{\,\prime}(t)| \quad\Longrightarrow\quad ds = |\vec r^{\,\prime}(t)|\,dt$$

Speed times time is distance. Substitute into the sum and it becomes an ordinary integral in $t$:

$$\int_C f\,ds = \int_a^b f(\vec r(t))\,|\vec r^{\,\prime}(t)|\,dt$$

The factor $|\vec r^{\,\prime}(t)|$ is not optional. It converts each step $dt$ in the parameter into the actual distance $ds$ traveled along the curve.`,
    },
    {
      id: 'recipe',
      title: 'Recipe',
      body: String.raw`1. Parametrize $C$ as $\vec r(t)$, $a\le t\le b$.
2. Compute $\vec r^{\,\prime}(t)$ and its length $|\vec r^{\,\prime}(t)|$.
3. Substitute $x(t)$, $y(t)$ (and $z(t)$) into $f$.
4. Integrate $f(\vec r(t))\,|\vec r^{\,\prime}(t)|$ from $a$ to $b$.

Parametrizations to know cold:
- Segment from $P$ to $Q$: $\vec r(t) = P + t(Q - P)$, $0\le t\le 1$. Then $|\vec r^{\,\prime}| = |Q - P|$, the length of the segment.
- Circle of radius $a$: $\langle a\cos t, a\sin t\rangle$, $0\le t\le 2\pi$. Then $|\vec r^{\,\prime}| = a$. A quarter circle in the first quadrant is $0\le t\le \pi/2$; the upper half is $0\le t\le\pi$.
- Graph $y = g(x)$: $\langle t, g(t)\rangle$. Then $|\vec r^{\,\prime}| = \sqrt{1 + g'(t)^2}$.
- Helix: $\langle a\cos t, a\sin t, ct\rangle$. Then $|\vec r^{\,\prime}| = \sqrt{a^2+c^2}$.`,
    },
    {
      id: 'examples',
      title: 'Worked examples from lecture',
      body: String.raw`**Parabola.** $\int_C x\,ds$ where $C$ is $y = x^2$ from $(0,0)$ to $(1,1)$.
1. $\vec r(t) = \langle t, t^2\rangle$, $0\le t\le 1$, $\vec r^{\,\prime} = \langle 1, 2t\rangle$, $|\vec r^{\,\prime}| = \sqrt{1+4t^2}$.
2. $\int_0^1 t\sqrt{1+4t^2}\,dt$. Let $u = 1+4t^2$, $du = 8t\,dt$: $\frac18\int_1^5 u^{1/2}\,du = \frac{1}{12}\left(5^{3/2} - 1\right)$.

**Segment.** $\int_C ye^{x^2}\,ds$ where $C$ is the segment from $(0,0)$ to $(1,3)$.
1. $\vec r(t) = t\langle 1,3\rangle = \langle t, 3t\rangle$, $|\vec r^{\,\prime}| = \sqrt{10}$.
2. $\int_0^1 3t\,e^{t^2}\sqrt{10}\,dt = \frac{3\sqrt{10}}{2}(e-1)$, using $u = t^2$.

**Mass of a helix.** $\vec r(t) = \langle 5\cos t, 5\sin t, t\rangle$, $0\le t\le 3\pi$, density $\rho = x + z$.
1. $|\vec r^{\,\prime}| = \sqrt{25\sin^2 t + 25\cos^2 t + 1} = \sqrt{26}$.
2. Mass $= \int_0^{3\pi}(5\cos t + t)\sqrt{26}\,dt = \sqrt{26}\left[5\sin t + \frac{t^2}{2}\right]_0^{3\pi} = \frac{9\pi^2}{2}\sqrt{26}$.`,
    },
    {
      id: 'meaning',
      title: 'What it measures, and what direction does not change',
      body: String.raw`- $f = 1$: $\int_C 1\,ds = \int_a^b |\vec r^{\,\prime}(t)|\,dt$ is the **arc length** of $C$.
- $f = \rho$, a density per unit length: $\int_C \rho\,ds$ is the **mass of a wire** shaped like $C$.
- $f\ge 0$ in general: the **area of the curtain** over $C$ with height $f$.

**Direction does not matter.** Walk the curve backward and every $\Delta s$ is still a positive length, so $\int_C f\,ds$ is unchanged. For example, $\int_C xy^2\,ds$ is the same on the segment from $(0,0)$ to $(1,2)$ as on the segment from $(1,2)$ to $(0,0)$.

This changes in Lesson 27. Line integrals of **vector fields** flip sign when you reverse the curve. Keep the two kinds apart: $ds$ means scalar, direction-free; $d\vec r$ means vector, direction matters.`,
    },
  ],

  formulas: [
    { label: 'Scalar line integral', tex: String.raw`\int_C f\,ds = \int_a^b f(\vec r(t))\,|\vec r^{\,\prime}(t)|\,dt` },
    { label: 'Arc element', tex: String.raw`ds = |\vec r^{\,\prime}(t)|\,dt = \sqrt{x'(t)^2 + y'(t)^2 + z'(t)^2}\,dt` },
    { label: 'Segment from P to Q', tex: String.raw`\vec r(t) = P + t(Q-P),\ \ 0\le t\le 1,\quad |\vec r^{\,\prime}| = |Q-P|` },
    { label: 'Circle of radius a', tex: String.raw`\vec r(t) = \langle a\cos t, a\sin t\rangle,\quad |\vec r^{\,\prime}| = a` },
    { label: 'Length and mass', tex: String.raw`L = \int_C 1\,ds,\qquad M = \int_C \rho\,ds` },
  ],

  mistakes: [
    {
      id: 'drop-speed',
      title: "Dropping |r'(t)|",
      wrong: String.raw`$\int_C xy\,ds = \int_0^{\pi/2} (2\cos t)(2\sin t)\,dt$`,
      right: String.raw`$\int_C xy\,ds = \int_0^{\pi/2} (2\cos t)(2\sin t)\cdot 2\,dt$`,
      why: 'ds is a length along the curve, and dt is a step in the parameter. They differ by the speed |r\'(t)|. On a circle of radius 2 every dt covers 2 dt of curve.',
    },
    {
      id: 'speed-no-sqrt',
      title: 'Using the speed squared',
      wrong: String.raw`$ds = \left(x'^2 + y'^2\right)dt$`,
      right: String.raw`$ds = \sqrt{x'^2 + y'^2}\,dt$`,
      why: 'Speed is the length of r\'(t), which needs the square root. For a segment of length 5, ds is 5 dt, not 25 dt.',
    },
    {
      id: 'dx-for-ds',
      title: 'Treating ds as dx',
      wrong: String.raw`$\int_C (x+y)\,ds = \int_0^3 \left(x + \tfrac43 x\right)dx$ for the segment from $(0,0)$ to $(3,4)$`,
      right: String.raw`$\int_0^1 (3t + 4t)\cdot 5\,dt$`,
      why: 'dx only measures horizontal progress. The curve also climbs, so its true length element is longer than dx.',
    },
    {
      id: 'param-range',
      title: 'Wrong parameter range',
      wrong: String.raw`Upper half of $x^2+y^2 = 9$: $0\le t\le 2\pi$`,
      right: String.raw`Upper half: $0\le t\le\pi$. First-quadrant quarter: $0\le t\le\pi/2$.`,
      why: 'The t-interval decides which piece of the curve you integrate over. Running a full circle often makes things cancel to 0, which is a common wrong choice.',
    },
    {
      id: 'orientation-scalar',
      title: 'Flipping the sign when the curve is reversed',
      wrong: String.raw`Reversing $C$ changes $\int_C f\,ds$ to $-\int_C f\,ds$.`,
      right: String.raw`$\int_{-C} f\,ds = \int_C f\,ds$. Only vector line integrals $\int_C \vec F\cdot d\vec r$ change sign.`,
      why: 'Each slice of the curtain has positive width no matter which way you walk. Direction only matters once a vector field is dotted with the direction of motion.',
    },
  ],

  hook: "ds = |r'(t)| dt: plug the curve into f, multiply by the speed, integrate in t.",

  scene: {
    view: { range: 2.4, z: [0, 4.5] },
    camera: [5.5, -3.5, 4.5],
    layers: [
      { id: 'C', kind: 'curve', x: '2*cos(t)', y: '2*sin(t)', z: '0', t: [0, 'pi/2'], color: 'road', arrow: true },
      { id: 'surf', kind: 'surface', z: 'x*y', domain: { x: [0, 2.2], y: [0, 2.2] }, colormap: 'viridis', opacity: 0.55 },
      { id: 'lift', kind: 'curveOnSurface', of: 'surf', x: '2*cos(t)', y: '2*sin(t)', t: [0, 'pi/2'] },
      { id: 'curtain', kind: 'paramSurface', x: '2*cos(u)', y: '2*sin(u)', z: 'v*4*cos(u)*sin(u)', u: [0, 'pi/2'], v: [0, 1], colormap: 'water', opacity: 0.8 },
      { id: 'slice', kind: 'paramSurface', x: '2*cos(u)', y: '2*sin(u)', z: 'v*4*cos(u)*sin(u)', u: [0.72, 0.85], v: [0, 1], colormap: 'inferno' },
      { id: 'top', kind: 'point', at: [1.414, 1.414, 2], label: 'height f(x, y)' },
    ],
    steps: [
      { label: 'Start', show: ['C'], caption: String.raw`The curve $C$: a quarter of the circle of radius 2, $\vec r(t) = \langle 2\cos t, 2\sin t\rangle$, $0\le t\le\pi/2$.` },
      { label: 'Surface', show: ['C', 'surf'], caption: String.raw`The function $f(x,y) = xy$ drawn as a surface over the first quadrant.` },
      { label: 'Lift', show: ['C', 'surf', 'lift'], caption: String.raw`Lift $C$ straight up onto the surface. The lifted curve records the height $f$ at every point of $C$.` },
      { label: 'Curtain', show: ['C', 'lift', 'curtain'], caption: String.raw`Fill in between $C$ and the lifted curve. The area of this curtain is $\int_C xy\,ds$.` },
      { label: 'One slice', show: ['C', 'lift', 'slice', 'top'], caption: String.raw`One slice has height $f(\vec r(t))$ and width $ds = |\vec r^{\,\prime}(t)|\,dt = 2\,dt$, since the circle has radius 2.` },
      { label: 'Total', show: ['C', 'surf', 'curtain'], caption: String.raw`Add the slices: $\int_0^{\pi/2} (2\cos t)(2\sin t)\cdot 2\,dt = 4$. Forget the factor 2 and you get half the curtain.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Evaluate $\int_C xy\,ds$ where $C$ is $\vec r(t) = \langle 2\cos t, 2\sin t\rangle$, $0\le t\le \pi/2$.`,
      choices: [
        { tex: String.raw`$4$`, correct: true },
        { tex: String.raw`$2$`, mistake: 'drop-speed', why: 'You left out |r\'(t)| = 2.' },
        { tex: String.raw`$8$`, mistake: 'speed-no-sqrt', why: 'You used |r\'(t)|^2 = 4 instead of |r\'(t)| = 2.' },
        { tex: String.raw`$0$`, mistake: 'param-range', why: 'That is the answer over the full circle, where positive and negative quadrants cancel. The curve stops at t = pi/2.' },
        { tex: String.raw`$-4$`, mistake: 'orientation-scalar', why: 'A scalar line integral of a positive function over this arc is positive.' },
      ],
      steps: [
        String.raw`$\vec r^{\,\prime}(t) = \langle -2\sin t, 2\cos t\rangle$, so $|\vec r^{\,\prime}(t)| = 2$.`,
        String.raw`$f(\vec r(t)) = (2\cos t)(2\sin t) = 4\sin t\cos t$.`,
        String.raw`$\int_0^{\pi/2} 4\sin t\cos t\cdot 2\,dt = 8\left[\frac{\sin^2 t}{2}\right]_0^{\pi/2} = 4$.`,
      ],
      source: 'Study plan bank #23',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Evaluate $\int_C (x+y)\,ds$ where $C$ is the line segment from $(0,0)$ to $(3,4)$.`,
      choices: [
        { tex: String.raw`$\dfrac{35}{2}$`, correct: true },
        { tex: String.raw`$\dfrac72$`, mistake: 'drop-speed', why: 'You integrated 7t dt and left out |r\'(t)| = 5.' },
        { tex: String.raw`$\dfrac{175}{2}$`, mistake: 'speed-no-sqrt', why: 'You multiplied by 25, the speed squared. The segment has length 5.' },
        { tex: String.raw`$\dfrac{21}{2}$`, mistake: 'dx-for-ds', why: 'You wrote y = 4x/3 and integrated in dx from 0 to 3. That ignores the climb; ds = (5/3) dx here.' },
        { tex: String.raw`$-\dfrac{35}{2}$`, mistake: 'orientation-scalar', why: 'Direction never makes a scalar line integral negative, and x + y is positive on this segment.' },
      ],
      steps: [
        String.raw`$\vec r(t) = t\langle 3,4\rangle = \langle 3t, 4t\rangle$, $0\le t\le 1$. $|\vec r^{\,\prime}| = |\langle 3,4\rangle| = 5$.`,
        String.raw`$f(\vec r(t)) = 3t + 4t = 7t$.`,
        String.raw`$\int_0^1 7t\cdot 5\,dt = \frac{35}{2}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Find the length of the helix $\vec r(t) = \langle 3\cos t, 3\sin t, 4t\rangle$, $0\le t\le 2\pi$.`,
      choices: [
        { tex: String.raw`$10\pi$`, correct: true },
        { tex: String.raw`$2\pi$`, mistake: 'drop-speed', why: 'You integrated 1 dt. Length is the integral of the speed, which is 5 here.' },
        { tex: String.raw`$50\pi$`, mistake: 'speed-no-sqrt', why: 'You integrated the speed squared, 25.' },
        { tex: String.raw`$6\pi$`, mistake: 'setup', why: 'You dropped the z-component. That is the circumference of the circle the helix sits over.' },
        { tex: String.raw`$14\pi$`, mistake: 'arith', why: 'Speed is sqrt(9 + 16) = 5, not 3 + 4 = 7.' },
      ],
      steps: [
        String.raw`$\vec r^{\,\prime}(t) = \langle -3\sin t, 3\cos t, 4\rangle$.`,
        String.raw`$|\vec r^{\,\prime}(t)| = \sqrt{9\sin^2 t + 9\cos^2 t + 16} = \sqrt{25} = 5$.`,
        String.raw`$L = \int_C 1\,ds = \int_0^{2\pi} 5\,dt = 10\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`A wire has the shape of the helix $\vec r(t) = \langle\cos t, \sin t, t\rangle$, $0\le t\le 2\pi$, and density $\rho(x,y,z) = z$. Find its mass.`,
      choices: [
        { tex: String.raw`$2\sqrt2\,\pi^2$`, correct: true },
        { tex: String.raw`$2\pi^2$`, mistake: 'drop-speed', why: 'You left out the speed sqrt(2).' },
        { tex: String.raw`$4\pi^2$`, mistake: 'speed-no-sqrt', why: 'You multiplied by 2, the speed squared, instead of sqrt(2).' },
        { tex: String.raw`$2\sqrt2\,\pi$`, mistake: 'concept', why: 'That is the length of the wire. The mass weights each piece by the density z = t.' },
        { tex: String.raw`$4\sqrt2\,\pi^2$`, mistake: 'arith', why: 'The integral of t from 0 to 2 pi is (2 pi)^2 / 2 = 2 pi^2. The 1/2 was lost.' },
      ],
      steps: [
        String.raw`$\vec r^{\,\prime} = \langle -\sin t, \cos t, 1\rangle$, $|\vec r^{\,\prime}| = \sqrt{1+1} = \sqrt2$.`,
        String.raw`$\rho(\vec r(t)) = z(t) = t$.`,
        String.raw`$M = \int_0^{2\pi} t\sqrt2\,dt = \sqrt2\cdot\frac{(2\pi)^2}{2} = 2\sqrt2\,\pi^2$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Evaluate $\int_C x\,ds$ where $C$ is the curve $y = \tfrac12 x^2$ from $(0,0)$ to $(2,2)$.`,
      choices: [
        { tex: String.raw`$\dfrac13\left(5\sqrt5 - 1\right)$`, correct: true },
        { tex: String.raw`$2$`, mistake: 'drop-speed', why: 'You integrated t dt and left out |r\'| = sqrt(1 + t^2).' },
        { tex: String.raw`$6$`, mistake: 'speed-no-sqrt', why: 'You used 1 + t^2 without the square root.' },
        { tex: String.raw`$\dfrac23\left(5\sqrt5 - 1\right)$`, mistake: 'arith', why: 'With u = 1 + t^2, du = 2t dt, so t dt = du/2. The 1/2 was dropped.' },
        { tex: String.raw`$\dfrac{5\sqrt5}{3}$`, mistake: 'arith', why: 'The lower limit u = 1 contributes 1^(3/2) = 1, which must be subtracted.' },
      ],
      steps: [
        String.raw`$\vec r(t) = \langle t, \tfrac12 t^2\rangle$, $0\le t\le 2$, $\vec r^{\,\prime} = \langle 1, t\rangle$, $|\vec r^{\,\prime}| = \sqrt{1+t^2}$.`,
        String.raw`$\int_0^2 t\sqrt{1+t^2}\,dt$. Let $u = 1+t^2$, $du = 2t\,dt$, $u$ from 1 to 5.`,
        String.raw`$\frac12\int_1^5 u^{1/2}\,du = \frac12\cdot\frac23\left(5^{3/2} - 1\right) = \frac13\left(5\sqrt5 - 1\right)$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`Evaluate $\int_C y\,ds$ where $C$ is the upper half of the circle $x^2+y^2 = 9$.`,
      choices: [
        { tex: String.raw`$18$`, correct: true },
        { tex: String.raw`$6$`, mistake: 'drop-speed', why: 'You left out |r\'(t)| = 3.' },
        { tex: String.raw`$54$`, mistake: 'speed-no-sqrt', why: 'You multiplied by 9, the speed squared.' },
        { tex: String.raw`$0$`, mistake: 'param-range', why: 'That is the full circle, where the bottom half cancels the top. The upper half is 0 to pi.' },
        { tex: String.raw`$9$`, mistake: 'param-range', why: 'That is only the first-quadrant quarter, 0 to pi/2.' },
      ],
      steps: [
        String.raw`Upper half: $\vec r(t) = \langle 3\cos t, 3\sin t\rangle$, $0\le t\le\pi$. $|\vec r^{\,\prime}| = 3$.`,
        String.raw`$f(\vec r(t)) = 3\sin t$.`,
        String.raw`$\int_0^\pi 3\sin t\cdot 3\,dt = 9[-\cos t]_0^\pi = 9\cdot 2 = 18$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Let $C$ be the line segment **from $(1,2)$ to $(0,0)$**. Evaluate $\int_C xy^2\,ds$.`,
      choices: [
        { tex: String.raw`$\sqrt5$`, correct: true },
        { tex: String.raw`$-\sqrt5$`, mistake: 'orientation-scalar', why: 'Reversing a curve does not change a scalar line integral. You get the same value from (0,0) to (1,2).' },
        { tex: String.raw`$1$`, mistake: 'drop-speed', why: 'You left out |r\'| = sqrt(5), the length of the segment.' },
        { tex: String.raw`$5$`, mistake: 'speed-no-sqrt', why: 'You multiplied by 5, the speed squared.' },
        { tex: String.raw`$4\sqrt5$`, mistake: 'arith', why: 'The integral of 4(1 - t)^3 from 0 to 1 is 1, not 4: the antiderivative brings a 1/4.' },
      ],
      steps: [
        String.raw`$\vec r(t) = \langle 1,2\rangle + t\langle -1,-2\rangle = \langle 1-t, 2-2t\rangle$, $0\le t\le 1$. $|\vec r^{\,\prime}| = \sqrt{1+4} = \sqrt5$.`,
        String.raw`$f(\vec r(t)) = (1-t)(2-2t)^2 = 4(1-t)^3$.`,
        String.raw`$\int_0^1 4(1-t)^3\sqrt5\,dt = \sqrt5\left[-(1-t)^4\right]_0^1 = \sqrt5$.`,
        String.raw`Shortcut: the same segment from $(0,0)$ to $(1,2)$ is $\langle t, 2t\rangle$ with $f = 4t^3$, and gives $\sqrt5$ too. Direction does not matter for $ds$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: 'x*y' },
    { kind: 'paramSurface', x: '2*cos(u)', y: '2*sin(u)', z: 'v*4*cos(u)*sin(u)', u: [0, 'pi/2'], v: [0, 1] },
  ],
};
