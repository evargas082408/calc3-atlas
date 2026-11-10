export default {
  id: 8,
  title: 'Arc length and curvature',
  section: '14.4, 14.5',
  exam: 1,
  blurb: 'Measure how far a curve goes, re-label it by distance traveled, and measure how sharply it bends.',
  boiler: ['Arc Length', 'Arc Length Parameterization', 'Curvature'],

  sections: [
    {
      id: 'length',
      title: 'Arc length: add up speed times time',
      body: String.raw`In Calc 2 the length of $y=f(x)$ on $[a,b]$ was $\int_a^b\sqrt{1+(f')^2}\,dx$. That is a special case of something simpler.

Write $y=x^2$, $0\le x\le1$ as $\vec r(t) = \langle t,t^2\rangle$. Then $\vec r'(t) = \langle 1,2t\rangle$ and $|\vec r'(t)| = \sqrt{1+4t^2}$, the same integrand as the Calc 2 formula.

Why it works: $|\vec r'(t)|$ is the **speed**. Over a tiny time $dt$ the bug covers distance (speed)$\times dt$. Add those up:
$$L = \int_a^b|\vec r'(t)|\,dt = \int_a^b\sqrt{x'(t)^2+y'(t)^2+z'(t)^2}\,dt.$$

**Example (class).** Helix $\vec r=\langle\cos t,\sin t,2t\rangle$, $0\le t\le2\pi$. $\vec r'=\langle-\sin t,\cos t,2\rangle$, so $|\vec r'| = \sqrt{\sin^2t+\cos^2t+4} = \sqrt5$. Constant speed, so the length is just speed times time: $L = 2\pi\sqrt5$.

Exam problems are almost always rigged so that $\sin^2+\cos^2$ collapses or the inside of the root is a perfect square. If your square root will not simplify, recheck the derivative.`,
    },
    {
      id: 'displacement',
      title: 'Length is not displacement',
      body: String.raw`Two different questions about the trip from $t=a$ to $t=b$:
- **Displacement** (a vector): $\displaystyle\int_a^b\vec r'(t)\,dt = \vec r(b)-\vec r(a)$. Where you ended up relative to where you started.
- **Arc length** (a number): $\displaystyle\int_a^b|\vec r'(t)|\,dt$. How far the odometer says you drove.

**Example (class).** $\vec r = \langle\cos t,\sin t\rangle$, $0\le t\le\frac\pi2$. Displacement: $\vec r(\frac\pi2)-\vec r(0) = \langle -1,1\rangle$, which is only $\sqrt2\approx1.41$ long: the straight chord. Arc length: $|\vec r'|=1$, so $L=\frac\pi2\approx1.57$, a quarter of the circumference.

The notes put the displacement under the heading "two ways to interpret the arc length formula". That is misleading: the displacement is a different integral (no absolute value) and is generally shorter than the length.`,
    },
    {
      id: 'arc-param',
      title: 'Re-labeling a curve by distance traveled',
      body: String.raw`The **arc length function** measures distance traveled since a starting time $a$:
$$s(t) = \int_a^t|\vec r'(u)|\,du,\qquad \frac{ds}{dt} = |\vec r'(t)|\ \text{(FTC)}.$$
If you solve for $t$ in terms of $s$ and substitute, the new parameter is distance. Then $\vec r(s)$ is "where you are after walking $s$ units," and the speed is exactly 1.

**Example (class).** $\vec r=\langle\cos t,\sin t,2t\rangle$ from $t=0$: $s=\sqrt5\,t$, so $t=\frac s{\sqrt5}$ and
$$\vec r(s) = \left\langle\cos\tfrac s{\sqrt5},\ \sin\tfrac s{\sqrt5},\ \tfrac{2s}{\sqrt5}\right\rangle.$$
Check: $|\vec r'(s)| = \sqrt{\tfrac15\sin^2+\tfrac15\cos^2+\tfrac45} = 1$.

**Starting somewhere else (class).** Measure from $(-1,0,2\pi)$, which is $t=\pi$. Then $s = \sqrt5(t-\pi)$, so $t = \frac s{\sqrt5}+\pi$. Substitute into **every** component:
$$\vec r(s) = \left\langle\cos\!\left(\tfrac s{\sqrt5}+\pi\right),\ \sin\!\left(\tfrac s{\sqrt5}+\pi\right),\ \tfrac{2s}{\sqrt5}+2\pi\right\rangle.$$
The notes end with $+\pi$ in the last slot. It should be $2\pi$: $2\left(\frac s{\sqrt5}+\pi\right) = \frac{2s}{\sqrt5}+2\pi$. Check at $s=0$: you must get back the starting point $(-1,0,2\pi)$.

**Example (review).** $\vec r=\langle 3\sin2t,\ 4,\ 3\cos2t\rangle$ has speed 6, so the length on $[0,\frac\pi3]$ is $2\pi$, and from $t=0$, $s=6t$ gives $\vec r(s) = \langle 3\sin\frac s3,\ 4,\ 3\cos\frac s3\rangle$.`,
    },
    {
      id: 'curvature-idea',
      title: 'Curvature: how fast the direction turns',
      body: String.raw`A straight line never changes direction. A circle turns at a steady rate. A parabola turns hard at the bottom and barely at all far out. **Curvature** $\kappa$ (kappa) puts a number on that.

The unit tangent $\vec T$ is pure direction. Curvature is how fast $\vec T$ changes **per unit of distance**, not per unit of time (otherwise driving faster would make a road look curvier):
$$\kappa = \left|\frac{d\vec T}{ds}\right|.$$
Benchmarks: a line has $\kappa=0$. A circle of radius $R$ has $\kappa = \frac1R$: small circles bend more. That gives a second way to read $\kappa$: the circle that best hugs the curve at a point (the **osculating circle**) has radius $\frac1\kappa$.`,
    },
    {
      id: 'curvature-formulas',
      title: 'Curvature formulas you can actually use',
      body: String.raw`You rarely have $s$ as the parameter, so convert with the chain rule. $\frac{d\vec T}{dt} = \frac{d\vec T}{ds}\cdot\frac{ds}{dt}$ and $\frac{ds}{dt} = |\vec r'(t)|$, so
$$\kappa(t) = \frac{|\vec T'(t)|}{|\vec r'(t)|}.$$
Differentiating $\vec T$ is messy (square roots on the bottom), so the go-to exam formula is
$$\kappa(t) = \frac{|\vec r'(t)\times\vec r''(t)|}{|\vec r'(t)|^3}.$$
(Proof in the textbook.) Only when the curve is already parametrized by arc length does it shrink to $\kappa = |\vec r''(s)|$.

**Example (class).** $\vec r=\langle 3,-4t,5t^2\rangle$ at $t=0$.
- $\vec r' = \langle 0,-4,10t\rangle$, so $\vec r'(0) = \langle 0,-4,0\rangle$ and $|\vec r'(0)|^3 = 64$.
- $\vec r'' = \langle 0,0,10\rangle$.
- $\vec r'(0)\times\vec r''(0) = \langle -40,0,0\rangle$, length 40.
- $\kappa = \frac{40}{64} = \frac58$. The osculating circle there has radius $\frac85$.

**Sanity check.** Circle $\langle R\cos t,R\sin t,0\rangle$: $\vec r'\times\vec r'' = \langle 0,0,R^2\rangle$ and $|\vec r'|^3 = R^3$, so $\kappa=\frac1R$. The formula agrees with the picture.`,
    },
  ],

  formulas: [
    { label: 'Arc length', tex: String.raw`L=\int_a^b|\vec r'(t)|\,dt` },
    { label: 'Arc length function', tex: String.raw`s(t)=\int_a^t|\vec r'(u)|\,du,\quad \dfrac{ds}{dt}=|\vec r'(t)|` },
    { label: 'Displacement (not length)', tex: String.raw`\int_a^b\vec r'(t)\,dt=\vec r(b)-\vec r(a)` },
    { label: 'Curvature (definition)', tex: String.raw`\kappa=\left|\dfrac{d\vec T}{ds}\right|=\dfrac{|\vec T'(t)|}{|\vec r'(t)|}` },
    { label: 'Curvature (cross product)', tex: String.raw`\kappa=\dfrac{|\vec r'\times\vec r''|}{|\vec r'|^3}` },
    { label: 'Circle', tex: String.raw`\kappa=\dfrac1R,\quad \text{osculating radius}=\dfrac1\kappa` },
  ],

  mistakes: [
    {
      id: 'displacement-not-length',
      title: 'Measuring the straight chord instead of the path',
      wrong: String.raw`$L = |\vec r(b)-\vec r(a)|$`,
      right: String.raw`$L = \int_a^b|\vec r'(t)|\,dt$`,
      why: 'The chord is the shortest distance between the endpoints. The curve wiggles, so its length is longer unless it is a straight line.',
    },
    {
      id: 'sqrt-outside',
      title: 'Losing the square root in the speed',
      wrong: String.raw`$L=\int_a^b\big(x'^2+y'^2+z'^2\big)\,dt$`,
      right: String.raw`$L=\int_a^b\sqrt{x'^2+y'^2+z'^2}\,dt$`,
      why: 'You need the speed |r\'|, not the speed squared.',
    },
    {
      id: 'cube-power',
      title: 'Wrong power in the curvature denominator',
      wrong: String.raw`$\kappa=\dfrac{|\vec r'\times\vec r''|}{|\vec r'|}$ or $\dfrac{|\vec r'\times\vec r''|}{|\vec r'|^2}$`,
      right: String.raw`$\kappa=\dfrac{|\vec r'\times\vec r''|}{|\vec r'|^3}$`,
      why: 'Cross over speed cubed. Check with a circle of radius R: the top is R^2 times the speed factor, and only the cube gives 1/R.',
    },
    {
      id: 'substitution',
      title: 'Botching the substitution t = t(s)',
      wrong: String.raw`From $t=\pi$: $t = \frac s{\sqrt5}$, or substituting in only some components`,
      right: String.raw`$t=\frac s{\sqrt5}+\pi$, substituted into every component`,
      why: 'The start point is where s = 0, so t(0) must equal the starting t. Plug s = 0 into your answer and you should land on the start point.',
    },
    {
      id: 'kappa-radius',
      title: 'Confusing curvature with the radius',
      wrong: String.raw`circle of radius 4 has $\kappa = 4$`,
      right: String.raw`$\kappa = \tfrac14$; the radius of curvature is $\tfrac1\kappa = 4$`,
      why: 'A bigger circle is flatter, so its curvature is smaller. Curvature and radius are reciprocals.',
    },
  ],

  hook: 'Length = integral of speed. Curvature = how much it turns per distance: cross over speed cubed. Big circle, small kappa.',

  scene: {
    view: { range: 3.5, z: [-0.5, 5.5] },
    camera: [12, -3, 3.5],
    layers: [
      { id: 'curve', kind: 'curve', x: '3', y: '-4*t', z: '5*t^2', t: [-0.6, 0.6], color: 'road', arrow: true },
      { id: 'P0', kind: 'point', at: [3, 0, 0], label: 't = 0' },
      { id: 'Tm', kind: 'vector', from: [3, 2, 1.25], to: [3, 1.3753, 0.4691], color: 'wood', label: 'T(-0.5)' },
      { id: 'T0', kind: 'vector', from: [3, 0, 0], to: [3, -1, 0], color: 'wood', label: 'T(0)' },
      { id: 'Tp', kind: 'vector', from: [3, -2, 1.25], to: [3, -2.6247, 2.0309], color: 'wood', label: 'T(0.5)' },
      { id: 'osc0', kind: 'curve', x: '3', y: '1.6*cos(t)', z: '1.6 + 1.6*sin(t)', t: [0, '2*pi'], color: 'water' },
      { id: 'c0', kind: 'point', at: [3, 0, 1.6], label: 'center (3, 0, 1.6)' },
      { id: 'R0', kind: 'vector', from: [3, 0, 1.6], to: [3, 0, 0], color: 'water', label: 'R = 8/5' },
      { id: 'binorm', kind: 'vector', from: [3, 0, 0], to: [2, 0, 0], color: 'revision', label: "r' x r'' direction" },
      { id: 'P1', kind: 'point', at: [3, -1, 0.3125], label: 't = 0.25' },
      { id: 'osc1', kind: 'curve', x: '3', y: '0.390625 + 2.6238*cos(t)', z: '2.5375 + 2.6238*sin(t)', t: [0, '2*pi'], color: 'revision' },
      { id: 'c1', kind: 'point', at: [3, 0.390625, 2.5375], label: 'R = 2.62' },
      { id: 'arc', kind: 'curve', x: '3', y: '-4*t', z: '5*t^2', t: [-0.5, 0.5], color: 'ink' },
      { id: 'chord', kind: 'vector', from: [3, 2, 1.25], to: [3, -2, 1.25], color: 'contour', label: 'displacement, length 4' },
    ],
    steps: [
      { label: 'Start', show: ['curve', 'P0'], caption: String.raw`The class example $\vec r(t)=\langle 3,-4t,5t^2\rangle$: a parabola standing in the plane $x=3$. The arrows show increasing $t$.` },
      { label: 'Tangents turn', show: ['curve', 'Tm', 'T0', 'Tp'], caption: String.raw`Unit tangents at $t=-0.5, 0, 0.5$. They all have length 1; only their direction changes. Curvature measures how fast that direction swings per unit of distance.` },
      { label: 'Vertex circle', show: ['curve', 'P0', 'osc0', 'c0', 'R0', 'binorm'], caption: String.raw`At $t=0$: $\vec r'\times\vec r'' = \langle -40,0,0\rangle$ (purple, perpendicular to the curve's plane) and $|\vec r'|^3 = 64$, so $\kappa=\frac58$. The circle that hugs the curve there has radius $\frac85$.` },
      { label: 'Flatter', show: ['curve', 'osc0', 'P1', 'osc1', 'c1'], caption: String.raw`At $t=0.25$, $\kappa\approx0.38$, so the hugging circle has radius about $2.62$. Farther from the vertex the parabola straightens out and the circles get bigger.` },
      { label: 'Length vs chord', show: ['curve', 'arc', 'chord'], caption: String.raw`From $t=-0.5$ to $0.5$ the displacement $\vec r(0.5)-\vec r(-0.5) = \langle 0,-4,0\rangle$ has length 4, but the arc length $\int_{-0.5}^{0.5}\sqrt{16+100t^2}\,dt\approx4.88$. Length is never shorter than the chord.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Find the length of $\vec r(t)=\langle 3\cos t,\ 3\sin t,\ 4t\rangle$ for $0\le t\le2\pi$.`,
      choices: [
        { tex: String.raw`$10\pi$`, correct: true },
        { tex: String.raw`$8\pi$`, mistake: 'displacement-not-length', why: 'That is |r(2pi) - r(0)| = |<0, 0, 8pi>|, the straight-line distance from start to finish.' },
        { tex: String.raw`$50\pi$`, mistake: 'sqrt-outside', why: 'You integrated the speed squared, 25, instead of the speed, 5.' },
        { tex: String.raw`$14\pi$`, mistake: 'arith', why: 'You added 3 + 4 instead of using sqrt(3^2 + 4^2) = 5.' },
        { tex: String.raw`$5$`, mistake: 'units', why: 'That is the speed. Multiply by the time interval 2 pi.' },
      ],
      steps: [
        String.raw`$\vec r'(t)=\langle -3\sin t,\ 3\cos t,\ 4\rangle$.`,
        String.raw`$|\vec r'| = \sqrt{9\sin^2t+9\cos^2t+16} = \sqrt{25} = 5$.`,
        String.raw`$L = \int_0^{2\pi}5\,dt = 10\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Reparametrize $\vec r(t)=\langle 3t,\ 4\cos t,\ 4\sin t\rangle$ by arc length measured from $t=0$ in the direction of increasing $t$.`,
      choices: [
        { tex: String.raw`$\left\langle \tfrac{3s}5,\ 4\cos\tfrac s5,\ 4\sin\tfrac s5\right\rangle$`, correct: true },
        { tex: String.raw`$\langle 15s,\ 4\cos5s,\ 4\sin5s\rangle$`, mistake: 'substitution', why: 's = 5t means t = s/5, not t = 5s.' },
        { tex: String.raw`$\left\langle \tfrac{3s}5,\ 4\cos s,\ 4\sin s\right\rangle$`, mistake: 'substitution', why: 'Substitute t = s/5 into every component, including inside cos and sin.' },
        { tex: String.raw`$\langle 3s,\ 4\cos s,\ 4\sin s\rangle$`, mistake: 'concept', why: 'Renaming t as s does not change the speed, which is still 5, not 1.' },
        { tex: String.raw`$\left\langle \tfrac{3s}{25},\ 4\cos\tfrac s{25},\ 4\sin\tfrac s{25}\right\rangle$`, mistake: 'sqrt-outside', why: 'The speed is sqrt(25) = 5, so s = 5t.' },
      ],
      steps: [
        String.raw`$\vec r'=\langle 3,\ -4\sin t,\ 4\cos t\rangle$, $|\vec r'| = \sqrt{9+16} = 5$.`,
        String.raw`$s(t) = \int_0^t5\,du = 5t$, so $t = \tfrac s5$.`,
        String.raw`$\vec r(s) = \left\langle \tfrac{3s}5,\ 4\cos\tfrac s5,\ 4\sin\tfrac s5\right\rangle$. Its speed is $\sqrt{\tfrac9{25}+\tfrac{16}{25}} = 1$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Find the curvature of $\vec r(t)=\left\langle 2t,\ t^2,\ -\tfrac{t^3}3\right\rangle$ at $t=1$.`,
      choices: [
        { tex: String.raw`$\tfrac29$`, correct: true },
        { tex: String.raw`$\tfrac23$`, mistake: 'cube-power', why: 'You divided |r\' x r\'\'| = 6 by |r\'|^2 = 9. The denominator is |r\'|^3 = 27.' },
        { tex: String.raw`$2$`, mistake: 'cube-power', why: 'You divided by |r\'| = 3 instead of |r\'|^3 = 27.' },
        { tex: String.raw`$\tfrac92$`, mistake: 'kappa-radius', why: 'That is the radius of curvature 1/kappa.' },
        { tex: String.raw`$\tfrac{2\sqrt2}9$`, mistake: 'concept', why: 'You used |r\'\'|/|r\'|^2. kappa = |r\'\'| only works when the parameter is arc length.' },
      ],
      steps: [
        String.raw`$\vec r' = \langle 2,\ 2t,\ -t^2\rangle$, $\vec r'' = \langle 0,\ 2,\ -2t\rangle$. At $t=1$: $\langle 2,2,-1\rangle$ and $\langle 0,2,-2\rangle$.`,
        String.raw`$\vec r'\times\vec r'' = \langle 2(-2)-(-1)(2),\ -(2(-2)-0),\ 4-0\rangle = \langle -2,4,4\rangle$, length 6.`,
        String.raw`$|\vec r'(1)| = \sqrt{4+4+1} = 3$, so $|\vec r'|^3 = 27$.`,
        String.raw`$\kappa = \tfrac6{27} = \tfrac29$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Find the curvature of $\vec r(t)=\langle 4\cos3t,\ 4\sin3t,\ 0\rangle$.`,
      choices: [
        { tex: String.raw`$\tfrac14$`, correct: true },
        { tex: String.raw`$4$`, mistake: 'kappa-radius', why: '4 is the radius. Curvature is its reciprocal.' },
        { tex: String.raw`$3$`, mistake: 'cube-power', why: 'You divided |r\' x r\'\'| = 432 by |r\'|^2 = 144 instead of |r\'|^3 = 1728.' },
        { tex: String.raw`$36$`, mistake: 'concept', why: 'That is |r\'\'|. kappa = |r\'\'| only works for an arc-length parametrization, and here the speed is 12.' },
        { tex: String.raw`$\tfrac1{12}$`, mistake: 'concept', why: 'That is 1/speed. Curvature depends on the shape, not on how fast you go around.' },
      ],
      steps: [
        String.raw`This is a circle of radius 4 traced at speed 12. Curvature should be $\tfrac14$ no matter the speed. Check with the formula.`,
        String.raw`$\vec r'=\langle -12\sin3t,\ 12\cos3t,\ 0\rangle$, $\vec r''=\langle -36\cos3t,\ -36\sin3t,\ 0\rangle$.`,
        String.raw`$\vec r'\times\vec r'' = \langle 0,0,\ 432\sin^23t+432\cos^23t\rangle = \langle 0,0,432\rangle$.`,
        String.raw`$\kappa = \dfrac{432}{12^3} = \dfrac{432}{1728} = \dfrac14$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 3,
      prompt: String.raw`Find the length of $\vec r(t)=\langle 2t,\ t^2,\ \ln t\rangle$ for $1\le t\le e$.`,
      choices: [
        { tex: String.raw`$e^2$`, correct: true },
        { tex: String.raw`$e^2-1$`, mistake: 'arith', why: 'You dropped the ln t term of the antiderivative t^2 + ln t.' },
        { tex: String.raw`$e^2+1$`, mistake: 'arith', why: 'You forgot to subtract the antiderivative at t = 1, which is 1.' },
        { tex: String.raw`$\sqrt{(2e-2)^2+(e^2-1)^2+1}$`, mistake: 'displacement-not-length', why: 'That is the length of r(e) - r(1), the chord, not the curve.' },
        { tex: String.raw`$\tfrac43e^3+4e-\tfrac1e-\tfrac{13}3$`, mistake: 'sqrt-outside', why: 'You integrated |r\'|^2 = 4 + 4t^2 + 1/t^2 without the square root.' },
      ],
      steps: [
        String.raw`$\vec r'=\langle 2,\ 2t,\ \tfrac1t\rangle$, so $|\vec r'|^2 = 4+4t^2+\tfrac1{t^2}$.`,
        String.raw`That is a perfect square: $\left(2t+\tfrac1t\right)^2 = 4t^2+4+\tfrac1{t^2}$. So $|\vec r'| = 2t+\tfrac1t$.`,
        String.raw`$L = \int_1^e\left(2t+\tfrac1t\right)dt = \big[t^2+\ln t\big]_1^e = (e^2+1)-(1+0) = e^2$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 3,
      prompt: String.raw`Find the curvature of the parabola $y=x^2$ at the point $(1,1)$.`,
      choices: [
        { tex: String.raw`$\dfrac{2}{5\sqrt5}$`, correct: true },
        { tex: String.raw`$\dfrac25$`, mistake: 'cube-power', why: 'You divided by |r\'|^2 = 5. The denominator is |r\'|^3 = 5 sqrt(5).' },
        { tex: String.raw`$\dfrac2{\sqrt5}$`, mistake: 'cube-power', why: 'You divided by |r\'| = sqrt(5) instead of its cube.' },
        { tex: String.raw`$2$`, mistake: 'setup', why: 'That is the curvature at the vertex (0, 0), where t = 0.' },
        { tex: String.raw`$\dfrac{5\sqrt5}{2}$`, mistake: 'kappa-radius', why: 'That is the radius of curvature, 1/kappa.' },
      ],
      steps: [
        String.raw`Parametrize: $\vec r(t)=\langle t,t^2,0\rangle$. The point $(1,1)$ is $t=1$.`,
        String.raw`$\vec r'=\langle 1,2t,0\rangle$, $\vec r''=\langle 0,2,0\rangle$, so $\vec r'\times\vec r''=\langle 0,0,2\rangle$.`,
        String.raw`$|\vec r'(1)| = \sqrt5$, so $\kappa = \dfrac{2}{(\sqrt5)^3} = \dfrac2{5\sqrt5}\approx0.18$. Much flatter than the vertex, where $\kappa=2$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Reparametrize the line $\vec r(t)=\langle 3t+1,\ 4t-2,\ 5\rangle$ by arc length measured from the point where $t=1$, in the direction of increasing $t$.`,
      choices: [
        { tex: String.raw`$\left\langle 4+\tfrac{3s}5,\ 2+\tfrac{4s}5,\ 5\right\rangle$`, correct: true },
        { tex: String.raw`$\left\langle 1+\tfrac{3s}5,\ -2+\tfrac{4s}5,\ 5\right\rangle$`, mistake: 'substitution', why: 'This measures from t = 0. At s = 0 it gives (1, -2, 5), not the starting point r(1) = (4, 2, 5).' },
        { tex: String.raw`$\langle 4+15s,\ 2+20s,\ 5\rangle$`, mistake: 'substitution', why: 's = 5(t - 1) means t = 1 + s/5, not t = 1 + 5s.' },
        { tex: String.raw`$\langle 4+3s,\ 2+4s,\ 5\rangle$`, mistake: 'concept', why: 'This has speed 5. An arc-length parametrization has speed 1.' },
        { tex: String.raw`$\left\langle 4+\tfrac{3s}{25},\ 2+\tfrac{4s}{25},\ 5\right\rangle$`, mistake: 'sqrt-outside', why: 'The speed is sqrt(9 + 16) = 5, not 25.' },
      ],
      steps: [
        String.raw`$|\vec r'| = |\langle 3,4,0\rangle| = 5$.`,
        String.raw`$s = \int_1^t5\,du = 5(t-1)$, so $t = 1+\tfrac s5$.`,
        String.raw`$\vec r(s) = \left\langle 3+\tfrac{3s}5+1,\ 4+\tfrac{4s}5-2,\ 5\right\rangle = \left\langle 4+\tfrac{3s}5,\ 2+\tfrac{4s}5,\ 5\right\rangle$.`,
        String.raw`Check: $s=0$ gives $(4,2,5) = \vec r(1)$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'curve', x: '3', y: '-4*t', z: '5*t^2', t: [-0.6, 0.6], color: 'road', arrow: true },
    { kind: 'curve', x: '3', y: '1.6*cos(t)', z: '1.6 + 1.6*sin(t)', t: [0, '2*pi'], color: 'water' },
  ],
};
