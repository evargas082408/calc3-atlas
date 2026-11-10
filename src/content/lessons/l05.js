export default {
  id: 5,
  title: 'Vector-valued functions and space curves',
  section: '14.1',
  exam: 1,
  blurb: 'Read a curve from r(t): find its domain, its direction of travel, the surface it lives on, and where it crosses other surfaces.',
  boiler: ['Vector-Valued Functions', 'Vector Curves', 'Intersection Parameterization'],

  sections: [
    {
      id: 'idea',
      title: 'Number in, arrow out',
      body: String.raw`In Calc 1, $f(x)=x^3+1$ takes a number and returns a number. A **vector-valued function** takes a number and returns a vector:
$$\vec r(t) = \langle f(t),\ g(t),\ h(t)\rangle.$$
Each of $f,g,h$ is an ordinary Calc 1 function. Think of $t$ as time and $\vec r(t)$ as the position of a bug at time $t$. The trail the bug leaves is a **curve** in space.

Everything you know from Calc 1 still works, one component at a time. That is the whole trick of this chapter.`,
    },
    {
      id: 'domain',
      title: 'Domain: where all three pieces make sense',
      body: String.raw`$\vec r(t)$ is defined only when *every* component is defined. So the domain is the **intersection** of the three domains.

**Example (class).** $\vec r(t) = \langle t^3+5,\ \ln(3-t),\ \sqrt t\rangle$.
- $t^3+5$: all real numbers
- $\ln(3-t)$: need $3-t>0$, so $t<3$
- $\sqrt t$: need $t\ge0$

Overlap: $[0,3)$. Closed at 0 because $\sqrt0=0$ is fine. Open at 3 because $\ln 0$ is undefined.`,
    },
    {
      id: 'lines',
      title: 'Lines and orientation',
      body: String.raw`When every component is linear in $t$, the curve is a line. $\vec r(t)=\langle 1+t,\ 2t,\ 2+3t\rangle$ splits as
$$\langle 1,0,2\rangle + t\langle 1,2,3\rangle:$$
the line through $(1,0,2)$ with direction $\langle 1,2,3\rangle$. Same as Lesson 2.

**Segment from $A$ to $B$.** $\vec r(t) = A + t(B-A)$, $0\le t\le1$. At $t=0$ you are at $A$; at $t=1$ you are at $B$.

**Orientation.** A curve on paper forgets which way you walked it. The parameter remembers. **Positive orientation** means the direction of increasing $t$. On the line above, $t=0$ is $(1,0,2)$ and $t=1$ is $(2,2,5)$, so you travel from the first toward the second.`,
    },
    {
      id: 'circles',
      title: 'Circles, ellipses, and the helix',
      body: String.raw`$\vec r(t) = \langle\cos t,\ \sin t\rangle$, $0\le t\le\frac\pi2$. Plug in values: $t=0$ gives $(1,0)$, $t=\frac\pi4$ gives $(\frac{\sqrt2}2,\frac{\sqrt2}2)$, $t=\frac\pi2$ gives $(0,1)$. Every point satisfies $x^2+y^2=\cos^2t+\sin^2t=1$. So it is a quarter of the unit circle, traced **counterclockwise** from $(1,0)$ to $(0,1)$.

Add a constant third component and the circle moves up. $\langle\cos t,\sin t,3\rangle$ is the same arc at height $z=3$.

Different numbers in front give an **ellipse**. $\langle 4\cos t, 2\sin t\rangle$ satisfies $\left(\frac x4\right)^2+\left(\frac y2\right)^2=1$: $x$-radius 4, $y$-radius 2.

Make the third component grow and the circle becomes a spiral staircase. $\vec r(t)=\langle\cos t,\ \sin t,\ 2t\rangle$ still has $x^2+y^2=1$, so it stays on the unit cylinder, but it climbs $2\pi\cdot2 = 4\pi$ every lap. That is a **helix**. On $-2\pi\le t\le2\pi$ it makes two full turns, from $z=-4\pi$ to $z=4\pi$.`,
    },
    {
      id: 'which-surface',
      title: 'Which surface is the curve on?',
      body: String.raw`To understand a 3D curve, find a relation between the components that does not involve $t$. That relation is a surface the curve lives on.

**Trick:** look for $\cos^2+\sin^2$. Whichever two components give it tell you the cylinder, and the leftover component tells you how the curve moves along that cylinder.
- $\langle\cos t,\sin t,2t\rangle$: $x^2+y^2=1$. Helix on a cylinder around the $z$-axis.
- $\langle 2\sin t,\ t,\ 2\cos t\rangle$: $x^2+z^2=4$. Helix around the **$y$-axis**. Check which slots hold the sine and cosine.
- $\langle\cos t,\sin t,\sin 2t\rangle$: on $x^2+y^2=1$, but $z$ goes up and down twice per lap: a roller coaster.

**Example.** $\vec r(t)=\langle t\cos t,\ t\sin t,\ t\rangle$. Now $x^2+y^2=t^2(\cos^2t+\sin^2t)=t^2$, and $t=z$. So $x^2+y^2=z^2$: the curve spirals up the double cone, widening as it climbs.`,
    },
    {
      id: 'intersect',
      title: 'Where a curve meets a surface',
      body: String.raw`The curve hands you $x$, $y$, $z$ in terms of $t$. Plug them into the surface's equation. You get one equation in $t$. Solve it, then plug each $t$ back into $\vec r$ to get the points.

**Example (class).** Does the helix $\langle\cos t,\sin t,2t\rangle$ hit the sphere $x^2+y^2+z^2=25$?
$$\cos^2t+\sin^2t+4t^2=25\ \Rightarrow\ 1+4t^2=25\ \Rightarrow\ t=\pm\sqrt6.$$
Two points: $\langle\cos\sqrt6,\ \sin\sqrt6,\ 2\sqrt6\rangle$ at the top and $\langle\cos\sqrt6,\ -\sin\sqrt6,\ -2\sqrt6\rangle$ at the bottom (cosine is even, sine is odd). The helix enters the sphere at $t=-\sqrt6$ and leaves at $t=\sqrt6$. Do not stop at the positive root.

**Going the other way: parametrize an intersection.** The curve where the cylinder $x^2+y^2=4$ meets the plane $z=1-x$: the cylinder says $x=2\cos t$, $y=2\sin t$, and the plane then forces $z = 1-2\cos t$. So $\vec r(t) = \langle 2\cos t,\ 2\sin t,\ 1-2\cos t\rangle$. Parametrize the round part first, then let the other equation decide the last component.`,
    },
    {
      id: 'limits',
      title: 'Limits and continuity, one component at a time',
      body: String.raw`$\lim_{t\to a}\vec r(t) = \left\langle \lim f,\ \lim g,\ \lim h\right\rangle$. The limit exists only if all three do. $\vec r$ is continuous wherever all three components are.

**Example.** $\vec r(t)=\langle\cos\pi t,\ \sin\pi t,\ e^{-t}\rangle$. As $t\to2$: $\langle 1,0,e^{-2}\rangle$. As $t\to\infty$: the first two components keep oscillating, so the limit does not exist, even though $e^{-t}\to0$.`,
    },
  ],

  formulas: [
    { label: 'Vector function', tex: String.raw`\vec r(t)=\langle f(t),g(t),h(t)\rangle,\ \ \text{domain} = \text{dom} f\cap\text{dom} g\cap\text{dom} h` },
    { label: 'Segment from A to B', tex: String.raw`\vec r(t)=A+t(B-A),\ \ 0\le t\le1` },
    { label: 'Ellipse / circle', tex: String.raw`\langle a\cos t,\ b\sin t\rangle:\ \left(\tfrac xa\right)^2+\left(\tfrac yb\right)^2=1` },
    { label: 'Helix', tex: String.raw`\langle\cos t,\ \sin t,\ ct\rangle \text{ lies on } x^2+y^2=1` },
    { label: 'Limit', tex: String.raw`\lim_{t\to a}\vec r(t)=\langle\lim f,\ \lim g,\ \lim h\rangle` },
  ],

  mistakes: [
    {
      id: 'domain-union',
      title: 'Taking the union of the domains',
      wrong: String.raw`$\langle\ln(3-t),\sqrt t\rangle$ is defined for all $t$ that work in either slot`,
      right: String.raw`Every slot must work: $[0,3)$`,
      why: 'If one component is undefined, there is no vector at that t. Intersect the domains.',
    },
    {
      id: 'orientation',
      title: 'Getting the direction of travel backwards',
      wrong: String.raw`$\langle\sin t,\cos t\rangle$ goes counterclockwise like $\langle\cos t,\sin t\rangle$`,
      right: String.raw`It starts at $(0,1)$ and goes clockwise`,
      why: 'Swapping or negating components changes the start point and the direction. Plug in t = 0 and a small t to see where you go.',
    },
    {
      id: 'missed-root',
      title: 'Missing intersection points',
      wrong: String.raw`$1+4t^2=25\ \Rightarrow\ t=\sqrt6$ only`,
      right: String.raw`$t=\pm\sqrt6$: two points`,
      why: 'A square root has two signs, and factored equations like t(cos t - sin t) = 0 have a solution from each factor. Count every root inside the t-interval.',
    },
    {
      id: 'wrong-cylinder',
      title: 'Putting the curve around the wrong axis',
      wrong: String.raw`$\langle 2\sin t,\ t,\ 2\cos t\rangle$ lies on $x^2+y^2=4$`,
      right: String.raw`The sine and cosine are in the $x$ and $z$ slots: $x^2+z^2=4$`,
      why: 'Read which slots hold the cos and sin. The other slot is the axis the curve winds around.',
    },
    {
      id: 'radius-read',
      title: 'Misreading the radius',
      wrong: String.raw`$x^2+y^2=9$ parametrized as $\langle 9\cos t,9\sin t\rangle$`,
      right: String.raw`$\langle 3\cos t,3\sin t\rangle$`,
      why: 'The coefficient in front of cos and sin is the radius, and the number in x^2 + y^2 = R^2 is its square.',
    },
  ],

  hook: 'r(t) is a bug\'s position at time t. Hunt for cos^2 + sin^2 to find the cylinder it lives on. To meet a surface, plug x(t), y(t), z(t) in and solve for t.',

  scene: {
    view: { range: 5.5, z: [-6.5, 6.5] },
    camera: [11, -10, 7],
    layers: [
      { id: 'line', kind: 'curve', x: '1 + t', y: '2*t', z: '2 + 3*t', t: [-2, 1], color: 'road', arrow: true },
      { id: 'lineP', kind: 'point', at: [1, 0, 2], label: 't = 0' },
      { id: 'lineQ', kind: 'point', at: [2, 2, 5], label: 't = 1' },
      { id: 'lineDir', kind: 'vector', from: [1, 0, 2], to: [2, 2, 5], color: 'ink', label: '<1,2,3>' },
      { id: 'arc0', kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: '0', t: [0, 'pi/2'], color: 'water', arrow: true },
      { id: 'arc3', kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: '3', t: [0, 'pi/2'], color: 'revision', arrow: true },
      { id: 'cyl', kind: 'paramSurface', x: 'cos(v)', y: 'sin(v)', z: 'u', u: [-6, 6], v: [0, '2*pi'], colormap: 'water', opacity: 0.25 },
      { id: 'helix', kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: '2*t', t: [-3, 3], color: 'road', arrow: true },
      { id: 'sphere', kind: 'paramSurface', x: '5*sin(u)*cos(v)', y: '5*sin(u)*sin(v)', z: '5*cos(u)', u: [0, 'pi'], v: [0, '2*pi'], colormap: 'viridis', opacity: 0.2 },
      { id: 'hitTop', kind: 'point', at: [-0.7699, 0.6382, 4.899], label: 'r(sqrt 6)' },
      { id: 'hitBot', kind: 'point', at: [-0.7699, -0.6382, -4.899], label: 'r(-sqrt 6)' },
      { id: 'cone', kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: 'u', u: [-5, 5], v: [0, '2*pi'], colormap: 'terrain', opacity: 0.25 },
      { id: 'coneCurve', kind: 'curve', x: 't*cos(t)', y: 't*sin(t)', z: 't', t: [0, 5], color: 'road', arrow: true },
    ],
    steps: [
      { label: 'Start', show: ['line', 'lineP', 'lineQ', 'lineDir'], caption: String.raw`$\vec r(t)=\langle 1+t,2t,2+3t\rangle = \langle1,0,2\rangle+t\langle1,2,3\rangle$ is a line. The arrows show positive orientation: from $t=0$ toward $t=1$.` },
      { label: 'Circles', show: ['arc0', 'arc3'], caption: String.raw`$\langle\cos t,\sin t,0\rangle$ and $\langle\cos t,\sin t,3\rangle$ for $0\le t\le\frac\pi2$: the same quarter circle at two heights, both traced counterclockwise from $(1,0)$.` },
      { label: 'Helix', show: ['cyl', 'helix'], caption: String.raw`$\langle\cos t,\sin t,2t\rangle$: the first two components keep $x^2+y^2=1$, the third climbs steadily. The curve is a helix wound on the unit cylinder.` },
      { label: 'Meets a sphere', show: ['helix', 'sphere', 'hitTop', 'hitBot'], caption: String.raw`Plug the helix into $x^2+y^2+z^2=25$: $1+4t^2=25$, so $t=\pm\sqrt6$. It pierces the sphere twice, once going in at the bottom and once coming out at the top.` },
      { label: 'On a cone', show: ['cone', 'coneCurve'], caption: String.raw`$\langle t\cos t,t\sin t,t\rangle$ has $x^2+y^2=t^2=z^2$, so it lives on the cone $x^2+y^2=z^2$, spiraling outward as it climbs.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Find the domain of $\vec r(t)=\left\langle \sqrt{t+2},\ \ln(5-t),\ \dfrac{1}{t-1}\right\rangle$.`,
      choices: [
        { tex: String.raw`$[-2,1)\cup(1,5)$`, correct: true },
        { tex: String.raw`$[-2,5)$`, mistake: 'setup', why: 'You forgot that 1/(t-1) is undefined at t = 1.' },
        { tex: String.raw`$(-2,1)\cup(1,5)$`, mistake: 'arith', why: 'sqrt(0) = 0 is fine, so t = -2 is allowed.' },
        { tex: String.raw`$(-\infty,1)\cup(1,\infty)$`, mistake: 'domain-union', why: 'Every component must be defined, not just one of them.' },
        { tex: String.raw`$[-2,1)\cup(1,5]$`, mistake: 'arith', why: 'ln(0) is undefined, so t = 5 is excluded.' },
      ],
      steps: [
        String.raw`$\sqrt{t+2}$ needs $t\ge-2$.`,
        String.raw`$\ln(5-t)$ needs $t<5$.`,
        String.raw`$\frac1{t-1}$ needs $t\ne1$.`,
        String.raw`Intersect: $[-2,1)\cup(1,5)$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Describe the curve $\vec r(t)=\langle 3\cos t,\ 2,\ 3\sin t\rangle$, $0\le t\le2\pi$.`,
      choices: [
        { tex: String.raw`A circle of radius 3 in the plane $y=2$, centered on the $y$-axis`, correct: true },
        { tex: String.raw`A circle of radius 3 in the plane $z=2$`, mistake: 'wrong-cylinder', why: 'The constant 2 is in the y slot, so the circle sits in the plane y = 2.' },
        { tex: String.raw`A helix around the $y$-axis`, mistake: 'concept', why: 'A helix needs a component that keeps growing. Here y stays at 2.' },
        { tex: String.raw`A circle of radius 9 in the plane $y=2$`, mistake: 'radius-read', why: 'x^2 + z^2 = 9 means the radius is 3.' },
        { tex: String.raw`An ellipse with semi-axes 3 and 2`, mistake: 'concept', why: 'The 2 is a fixed coordinate, not a semi-axis. Both moving parts have coefficient 3.' },
      ],
      steps: [
        String.raw`$y=2$ for all $t$: the curve stays in the plane $y=2$.`,
        String.raw`$x^2+z^2 = 9\cos^2t+9\sin^2t = 9$.`,
        String.raw`So it is a circle of radius 3, centered at $(0,2,0)$, in the plane $y=2$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 1,
      prompt: String.raw`Which $\vec r(t)$, $0\le t\le1$, traces the segment from $A(1,-1,2)$ to $B(4,1,0)$, starting at $A$ when $t = 0$?`,
      choices: [
        { tex: String.raw`$\langle 1+3t,\ -1+2t,\ 2-2t\rangle$`, correct: true },
        { tex: String.raw`$\langle 4-3t,\ 1-2t,\ 2t\rangle$`, mistake: 'orientation', why: 'This starts at B and ends at A: the same segment traveled backwards.' },
        { tex: String.raw`$\langle 1+4t,\ -1+t,\ 2\rangle$`, mistake: 'concept', why: 'You used B itself as the direction. The direction is B - A.' },
        { tex: String.raw`$\langle 3+t,\ 2-t,\ -2+2t\rangle$`, mistake: 'setup', why: 'Point and direction are swapped. At t = 0 this is (3, 2, -2), not A.' },
        { tex: String.raw`$\langle 1-3t,\ -1-2t,\ 2+2t\rangle$`, mistake: 'sign', why: 'This uses A - B, so it walks away from B.' },
      ],
      steps: [
        String.raw`Direction: $B-A = \langle 3,2,-2\rangle$.`,
        String.raw`$\vec r(t) = A + t(B-A) = \langle 1+3t,\ -1+2t,\ 2-2t\rangle$.`,
        String.raw`Check: $\vec r(0) = (1,-1,2) = A$ and $\vec r(1) = (4,1,0) = B$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`The curve $\vec r(t)=\langle 2\sin t,\ t,\ 2\cos t\rangle$ lies on which surface?`,
      choices: [
        { tex: String.raw`$x^2+z^2=4$`, correct: true },
        { tex: String.raw`$x^2+y^2=4$`, mistake: 'wrong-cylinder', why: 'The sine and cosine are in the x and z slots, not x and y.' },
        { tex: String.raw`$x^2+z^2=2$`, mistake: 'radius-read', why: '(2 sin t)^2 + (2 cos t)^2 = 4, not 2.' },
        { tex: String.raw`$x^2+y^2+z^2=4$`, mistake: 'concept', why: 'Adding y^2 = t^2 gives 4 + t^2, which is not constant.' },
        { tex: String.raw`$x^2+z^2=y^2$`, mistake: 'concept', why: 'A cone would need the radius to grow with t. Here the radius stays 2.' },
      ],
      steps: [
        String.raw`Look for $\sin^2+\cos^2$: it comes from the $x$ and $z$ components.`,
        String.raw`$x^2+z^2 = 4\sin^2t+4\cos^2t = 4$.`,
        String.raw`So the curve is on the cylinder $x^2+z^2=4$ around the $y$-axis; since $y=t$ grows, it is a helix along $y$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`The curve $\vec r(t)=\langle t\cos t,\ t\sin t,\ t^2\rangle$ lies on which surface?`,
      choices: [
        { tex: String.raw`$z=x^2+y^2$`, correct: true },
        { tex: String.raw`$z^2=x^2+y^2$`, mistake: 'concept', why: 'That would need z = t. Here z = t^2, which matches x^2 + y^2 itself.' },
        { tex: String.raw`$x^2+y^2=1$`, mistake: 'wrong-cylinder', why: 'The t in front of cos and sin makes x^2 + y^2 = t^2, not 1.' },
        { tex: String.raw`$z=x^2-y^2$`, mistake: 'sign', why: 'cos^2 + sin^2 = 1, not cos^2 - sin^2.' },
        { tex: String.raw`$x^2+y^2+z^2=t^2$`, mistake: 'units', why: 'A surface equation cannot contain the parameter t.' },
      ],
      steps: [
        String.raw`$x^2+y^2 = t^2\cos^2t+t^2\sin^2t = t^2$.`,
        String.raw`And $z=t^2$.`,
        String.raw`So $z=x^2+y^2$: the curve spirals up a paraboloid.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`At which points does the helix $\vec r(t)=\langle\cos t,\ \sin t,\ t\rangle$, $-\infty<t<\infty$, meet the sphere $x^2+y^2+z^2=10$?`,
      choices: [
        { tex: String.raw`$(\cos3,\ \sin3,\ 3)$ and $(\cos3,\ -\sin3,\ -3)$`, correct: true },
        { tex: String.raw`Only $(\cos3,\ \sin3,\ 3)$`, mistake: 'missed-root', why: 't^2 = 9 has two roots, t = 3 and t = -3.' },
        { tex: String.raw`$t=3$ and $t=-3$`, mistake: 'units', why: 'Those are parameter values. Plug them into r(t) to get points.' },
        { tex: String.raw`$(\cos3,\ \sin3,\ 3)$ and $(\cos3,\ \sin3,\ -3)$`, mistake: 'sign', why: 'sin(-3) = -sin(3). Only cosine is even.' },
        { tex: String.raw`$(\cos\sqrt{10},\ \sin\sqrt{10},\ \sqrt{10})$ and its mirror`, mistake: 'setup', why: 'You forgot the cos^2 t + sin^2 t = 1 in the sum, so you solved t^2 = 10.' },
      ],
      steps: [
        String.raw`Substitute: $\cos^2t+\sin^2t+t^2=10$.`,
        String.raw`$1+t^2=10$, so $t=\pm3$.`,
        String.raw`$\vec r(3)=\langle\cos3,\sin3,3\rangle$ and $\vec r(-3)=\langle\cos3,-\sin3,-3\rangle$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 2,
      prompt: String.raw`Describe the motion $\vec r(t)=\langle\sin t,\ \cos t\rangle$, $0\le t\le\frac\pi2$.`,
      choices: [
        { tex: String.raw`A quarter of the unit circle from $(0,1)$ to $(1,0)$, clockwise`, correct: true },
        { tex: String.raw`A quarter of the unit circle from $(1,0)$ to $(0,1)$, counterclockwise`, mistake: 'orientation', why: 'That is <cos t, sin t>. With the components swapped, t = 0 gives (0, 1).' },
        { tex: String.raw`A quarter of the unit circle from $(0,1)$ to $(-1,0)$, counterclockwise`, mistake: 'orientation', why: 'At t = pi/2 the point is (sin(pi/2), cos(pi/2)) = (1, 0).' },
        { tex: String.raw`The full unit circle, clockwise`, mistake: 'setup', why: 'A full circle needs t to run over an interval of length 2 pi.' },
        { tex: String.raw`The line segment from $(0,1)$ to $(1,0)$`, mistake: 'concept', why: 'x^2 + y^2 = 1 for every t, so the points are on a circle, not a line.' },
      ],
      steps: [
        String.raw`$x^2+y^2 = \sin^2t+\cos^2t = 1$: on the unit circle.`,
        String.raw`$t=0$: $(0,1)$. $t=\frac\pi4$: $(\frac{\sqrt2}2,\frac{\sqrt2}2)$. $t=\frac\pi2$: $(1,0)$.`,
        String.raw`From the top of the circle to the right side through the first quadrant: clockwise.`,
      ],
      source: 'original',
    },
    {
      id: 'p8',
      difficulty: 3,
      prompt: String.raw`Find a vector function for the curve where the cylinder $x^2+y^2=9$ meets the plane $x+z=2$.`,
      choices: [
        { tex: String.raw`$\langle 3\cos t,\ 3\sin t,\ 2-3\cos t\rangle$`, correct: true },
        { tex: String.raw`$\langle \cos t,\ \sin t,\ 2-\cos t\rangle$`, mistake: 'radius-read', why: 'The cylinder has radius 3, so x = 3 cos t.' },
        { tex: String.raw`$\langle 9\cos t,\ 9\sin t,\ 2-9\cos t\rangle$`, mistake: 'radius-read', why: '9 is the radius squared. Use 3.' },
        { tex: String.raw`$\langle 3\cos t,\ 3\sin t,\ 2\rangle$`, mistake: 'setup', why: 'z = 2 ignores the x in the plane equation. Solve the plane for z: z = 2 - x.' },
        { tex: String.raw`$\langle 3\cos t,\ 2-3\cos t,\ 3\sin t\rangle$`, mistake: 'wrong-cylinder', why: 'This puts sine in the z slot, so x^2 + y^2 is no longer 9.' },
      ],
      steps: [
        String.raw`Parametrize the round part: $x=3\cos t$, $y=3\sin t$ keeps $x^2+y^2=9$.`,
        String.raw`The plane gives $z = 2-x = 2-3\cos t$.`,
        String.raw`$\vec r(t)=\langle 3\cos t,\ 3\sin t,\ 2-3\cos t\rangle$, $0\le t\le2\pi$.`,
        String.raw`Check: $x^2+y^2=9$ and $x+z=2$ for every $t$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: '2*t', t: [-3, 3], color: 'road', arrow: true },
    { kind: 'paramSurface', x: '5*sin(u)*cos(v)', y: '5*sin(u)*sin(v)', z: '5*cos(u)', u: [0, 'pi'], v: [0, '2*pi'], opacity: 0.3 },
  ],
};
