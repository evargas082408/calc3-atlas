export default {
  id: 6,
  title: 'Calculus of vector functions, and motion (part 1)',
  section: '14.2, 14.3',
  exam: 1,
  blurb: 'Differentiate and integrate r(t) one component at a time to get tangent lines, unit tangents, and position from acceleration.',
  boiler: ['Vector-Valued Functions', 'Vector Integrals', 'Velocity and Position', 'Particle Motion'],

  sections: [
    {
      id: 'meet-plane',
      title: 'Warm-up: where a curve crosses a plane',
      body: String.raw`Same move as last lesson: substitute the curve into the surface.

**Example (class).** Where does $\vec r(t)=\langle t\cos t,\ t\sin t,\ t\rangle$, $0\le t\le 2\pi$, cross the plane $x-y=0$?
$$t\cos t - t\sin t = 0\ \Rightarrow\ t(\cos t-\sin t)=0.$$
A product is zero when either factor is. $t=0$, or $\cos t=\sin t$, which on $[0,2\pi]$ means $t=\frac\pi4$ or $\frac{5\pi}4$. Three points:
$$(0,0,0),\quad \left(\tfrac{\sqrt2\pi}{8},\tfrac{\sqrt2\pi}{8},\tfrac\pi4\right),\quad \left(-\tfrac{5\sqrt2\pi}{8},-\tfrac{5\sqrt2\pi}{8},\tfrac{5\pi}4\right).$$

Count roots against the interval. The notes state the interval as $0\le t\le 8\pi$, but then list only three points. On $[0,8\pi]$, $\cos t=\sin t$ happens 8 times ($\frac\pi4+k\pi$ for $k=0,\dots,7$), so there would be 9 crossings. Three is the answer for $[0,2\pi]$.`,
    },
    {
      id: 'derivative',
      title: 'The derivative is the velocity arrow',
      body: String.raw`Differentiate each component:
$$\vec r'(t) = \langle f'(t),\ g'(t),\ h'(t)\rangle.$$
For $\vec r=\langle\cos t,\sin t,2t\rangle$, $\vec r'=\langle-\sin t,\cos t,2\rangle$.

What it means. In Calc 1, $f'(a)$ is the slope of the tangent line. A curve in space has no single slope, so instead $\vec r'(t_0)$ is the **direction of the tangent line** at $\vec r(t_0)$. Why: $\frac{\vec r(t_0+h)-\vec r(t_0)}{h}$ is a short arrow from one point on the curve to a nearby one, scaled up. As $h\to0$ it lines up with the curve.

The chain rule still bites. $\frac{d}{dt}\sin(\pi t) = \pi\cos(\pi t)$, and $\frac{d}{dt}e^{2t} = 2e^{2t}$.

A curve is **smooth** where $\vec r'(t)\ne\vec 0$: the bug never stops, so there are no sharp corners.`,
    },
    {
      id: 'tangent',
      title: 'Tangent lines and the unit tangent',
      body: String.raw`A tangent line is a line, so it needs a point and a direction (Lesson 2). The point is $\vec r(t_0)$. The direction is $\vec r'(t_0)$.

**Example (class).** $\vec r=\langle\cos t,\sin t,2t\rangle$ at $t=\frac\pi2$.
1. Point: $\vec r(\frac\pi2) = \langle 0,1,\pi\rangle$.
2. Direction: $\vec r'(\frac\pi2) = \langle -\sin\frac\pi2,\cos\frac\pi2,2\rangle = \langle -1,0,2\rangle$.
3. Line: $\langle x,y,z\rangle = \langle 0,1,\pi\rangle + s\langle -1,0,2\rangle$.

Use a fresh letter like $s$ for the line's parameter; the $t$ has already been used up as $\frac\pi2$.

**Unit tangent vector.** Strip off the speed and keep only the direction:
$$\vec T(t) = \frac{\vec r'(t)}{|\vec r'(t)|}.$$
At $t=\frac\pi2$ above: $\vec T = \frac{1}{\sqrt5}\langle -1,0,2\rangle$.

**Example.** $\vec r = \langle t^2,4t,4\ln t\rangle$, $t>0$. $\vec r'=\langle 2t,4,\frac4t\rangle$ and $|\vec r'| = \sqrt{4t^2+16+\frac{16}{t^2}} = 2\left(t+\frac2t\right)$ (the inside is a perfect square). After simplifying, $\vec T = \dfrac{\langle t^2,2t,2\rangle}{t^2+2}$.`,
    },
    {
      id: 'rules',
      title: 'Derivative rules',
      body: String.raw`All the Calc 1 rules carry over. The product rule now comes in three flavors, one for each way to multiply:
- scalar times vector: $(f\vec u)' = f'\vec u + f\vec u'$
- dot: $(\vec u\cdot\vec v)' = \vec u'\cdot\vec v + \vec u\cdot\vec v'$
- cross: $(\vec u\times\vec v)' = \vec u'\times\vec v + \vec u\times\vec v'$
- chain: $\frac{d}{dt}\vec r(f(t)) = f'(t)\,\vec r'(f(t))$

Same song every time: derivative of the first times the second, plus the first times the derivative of the second. For the cross product **keep each factor in its original slot**. Writing $\vec v\times\vec u'$ instead of $\vec u\times\vec v'$ flips the sign of that term.`,
    },
    {
      id: 'integrals',
      title: 'Integrals: also component by component',
      body: String.raw`$$\int\vec r(t)\,dt = \left\langle \int f\,dt,\ \int g\,dt,\ \int h\,dt\right\rangle + \vec C.$$
Each component gets its own constant, and together they form a **constant vector** $\vec C = \langle c_1,c_2,c_3\rangle$.

**Example (class).** $\int\langle\cos t,\sin t,2t\rangle\,dt = \langle\sin t,-\cos t,t^2\rangle+\vec C$.

**Definite integral (class).** $\int_0^1\langle e^t, t^2, t^{1/2}\rangle\,dt = \left\langle e^t,\tfrac{t^3}3,\tfrac23t^{3/2}\right\rangle\Big|_0^1 = \langle e,\tfrac13,\tfrac23\rangle - \langle 1,0,0\rangle = \left\langle e-1,\tfrac13,\tfrac23\right\rangle.$

Notice the $e^0=1$ at the bottom. Lower limits do not always give zero.`,
    },
    {
      id: 'motion',
      title: 'Position, velocity, acceleration',
      body: String.raw`If $\vec r(t)$ is position, then $\vec v(t) = \vec r'(t)$ is velocity and $\vec a(t) = \vec v'(t) = \vec r''(t)$ is acceleration. Going down the chain is differentiation. Going back up is integration, and each integration costs you one constant vector, paid for with one initial condition.

**Example (class).** $\vec a(t)=\langle e^t,\sin t,t\rangle$, $\vec v(0)=\langle 1,2,3\rangle$, $\vec r(0)=\langle -1,3,-4\rangle$.
1. Integrate: $\vec v = \langle e^t,-\cos t,\tfrac{t^2}2\rangle+\vec C$.
2. At $t=0$: $\langle 1,-1,0\rangle + \vec C = \langle 1,2,3\rangle$, so $\vec C = \langle 0,3,3\rangle$. Note $\vec C \ne \vec v(0)$, because $e^0$ and $-\cos0$ are not zero.
3. Integrate again: $\vec r = \langle e^t,\ -\sin t+3t,\ \tfrac{t^3}6+3t\rangle + \vec D$.
4. At $t=0$: $\langle 1,0,0\rangle+\vec D = \langle -1,3,-4\rangle$, so $\vec D = \langle -2,3,-4\rangle$.

$$\vec r(t) = \left\langle e^t-2,\ -\sin t+3t+3,\ \tfrac{t^3}6+3t-4\right\rangle.$$
Check: $\vec r(0) = \langle -1,3,-4\rangle$.`,
    },
  ],

  formulas: [
    { label: 'Derivative', tex: String.raw`\vec r'(t)=\langle f'(t),g'(t),h'(t)\rangle` },
    { label: 'Tangent line at t0', tex: String.raw`\vec L(s) = \vec r(t_0) + s\,\vec r'(t_0)` },
    { label: 'Unit tangent', tex: String.raw`\vec T(t)=\dfrac{\vec r'(t)}{|\vec r'(t)|}` },
    { label: 'Product rules', tex: String.raw`(\vec u\cdot\vec v)'=\vec u'\cdot\vec v+\vec u\cdot\vec v',\quad (\vec u\times\vec v)'=\vec u'\times\vec v+\vec u\times\vec v'` },
    { label: 'Integral', tex: String.raw`\int\vec r\,dt=\left\langle\int f,\int g,\int h\right\rangle+\vec C` },
    { label: 'Motion', tex: String.raw`\vec v=\vec r',\quad \vec a=\vec v'=\vec r''` },
  ],

  mistakes: [
    {
      id: 'constants',
      title: 'Mishandling the constants of integration',
      wrong: String.raw`$\vec v=\langle e^t,-\cos t,\tfrac{t^2}2\rangle+\vec v(0)$, or skipping one of the two constants`,
      right: String.raw`Solve $\vec v(0) = (\text{antiderivative at } 0) + \vec C$ for $\vec C$, then do the same with $\vec r(0)$ for $\vec D$`,
      why: 'C equals the initial value only when the antiderivative is 0 at t = 0 (e^0 = 1 and -cos 0 = -1 are not). Going from a to r takes two integrations, so two constants.',
    },
    {
      id: 'tangent-point',
      title: 'Swapping the point and the direction in a tangent line',
      wrong: String.raw`$\vec r'(t_0) + s\,\vec r(t_0)$`,
      right: String.raw`$\vec r(t_0) + s\,\vec r'(t_0)$`,
      why: 'The line must pass through the curve at r(t0) and point along the velocity r\'(t0).',
    },
    {
      id: 'no-normalize',
      title: 'Forgetting to divide by the length for T',
      wrong: String.raw`$\vec T = \vec r'(t)$`,
      right: String.raw`$\vec T = \vec r'(t)/|\vec r'(t)|$`,
      why: 'T is a unit vector. r\'(t) has length equal to the speed, which is usually not 1.',
    },
    {
      id: 'cross-order',
      title: 'Reordering factors in the cross product rule',
      wrong: String.raw`$(\vec u\times\vec v)' = \vec u'\times\vec v + \vec v'\times\vec u$`,
      right: String.raw`$(\vec u\times\vec v)' = \vec u'\times\vec v + \vec u\times\vec v'$`,
      why: 'Cross products anticommute, so swapping the order of one term flips its sign.',
    },
    {
      id: 'chain-inside',
      title: 'Dropping the inside derivative',
      wrong: String.raw`$\dfrac{d}{dt}\cos(3t) = -\sin(3t)$`,
      right: String.raw`$-3\sin(3t)$`,
      why: 'Componentwise differentiation is still Calc 1. Every inside function needs its chain-rule factor.',
    },
  ],

  hook: 'Calculus on r(t) is three Calc 1 problems side by side. Tangent line = point r(t0) plus s times direction r\'(t0). Every integral costs a constant vector, and every initial condition pays for one.',

  scene: {
    view: { range: 3, z: [-0.5, 7] },
    camera: [6, -6, 6],
    layers: [
      { id: 'helix', kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: '2*t', t: [0, 3.3], color: 'road', arrow: true },
      { id: 'cyl', kind: 'paramSurface', x: 'cos(v)', y: 'sin(v)', z: 'u', u: [0, 6.6], v: [0, '2*pi'], colormap: 'water', opacity: 0.2 },
      { id: 'P', kind: 'point', at: [0, 1, 3.1416], label: 'r(pi/2) = (0, 1, pi)' },
      { id: 'pos', kind: 'vector', from: [0, 0, 0], to: [0, 1, 3.1416], color: 'ink', label: 'r' },
      { id: 'vel', kind: 'vector', from: [0, 1, 3.1416], to: [-1, 1, 5.1416], color: 'water', label: "r'(pi/2)" },
      { id: 'tline', kind: 'curve', x: '-t', y: '1', z: 'pi + 2*t', t: [-1.5, 1.5], color: 'water' },
      { id: 'unitT', kind: 'vector', from: [0, 1, 3.1416], to: [-0.4472, 1, 4.036], color: 'wood', label: 'T' },
      { id: 'acc', kind: 'vector', from: [0, 1, 3.1416], to: [0, 0, 3.1416], color: 'revision', label: "r''(pi/2)" },
      { id: 'axis', kind: 'curve', x: '0', y: '0', z: 't', t: [0, 6.6], color: 'contour' },
    ],
    steps: [
      { label: 'Start', show: ['helix', 'cyl', 'P', 'pos'], caption: String.raw`The helix $\vec r(t)=\langle\cos t,\sin t,2t\rangle$. At $t=\frac\pi2$ the bug is at $(0,1,\pi)$; the black arrow is its position vector.` },
      { label: 'Velocity', show: ['helix', 'P', 'vel'], caption: String.raw`$\vec r'(t)=\langle-\sin t,\cos t,2\rangle$, so $\vec r'(\frac\pi2)=\langle-1,0,2\rangle$. It is tangent to the curve and points the way the bug is moving.` },
      { label: 'Tangent line', show: ['helix', 'P', 'vel', 'tline'], caption: String.raw`Point plus direction: $\langle 0,1,\pi\rangle+s\langle-1,0,2\rangle$. The line just grazes the helix at $t=\frac\pi2$.` },
      { label: 'Unit tangent', show: ['helix', 'P', 'vel', 'unitT'], caption: String.raw`$|\vec r'| = \sqrt5$ everywhere, so $\vec T = \frac1{\sqrt5}\langle-1,0,2\rangle$: same direction as the velocity, but length 1.` },
      { label: 'Acceleration', show: ['helix', 'P', 'vel', 'acc', 'axis'], caption: String.raw`$\vec r''(t)=\langle-\cos t,-\sin t,0\rangle$, so $\vec r''(\frac\pi2)=\langle 0,-1,0\rangle$. It points straight at the $z$-axis and is perpendicular to the velocity: the speed stays the same, only the direction turns.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Find $\vec r'(t)$ for $\vec r(t)=\langle t^3,\ e^{2t},\ \cos 3t\rangle$.`,
      choices: [
        { tex: String.raw`$\langle 3t^2,\ 2e^{2t},\ -3\sin 3t\rangle$`, correct: true },
        { tex: String.raw`$\langle 3t^2,\ e^{2t},\ -\sin 3t\rangle$`, mistake: 'chain-inside', why: 'Both e^{2t} and cos(3t) need their inside derivatives, 2 and 3.' },
        { tex: String.raw`$\langle 3t^2,\ 2e^{2t},\ 3\sin 3t\rangle$`, mistake: 'sign', why: 'The derivative of cos is -sin.' },
        { tex: String.raw`$\left\langle \tfrac{t^4}4,\ \tfrac{e^{2t}}2,\ \tfrac{\sin 3t}3\right\rangle$`, mistake: 'concept', why: 'That is an antiderivative, not a derivative.' },
        { tex: String.raw`$3t^2+2e^{2t}-3\sin3t$`, mistake: 'units', why: 'The derivative of a vector function is a vector. Do not add the components.' },
      ],
      steps: [
        String.raw`$\frac{d}{dt}t^3 = 3t^2$.`,
        String.raw`$\frac{d}{dt}e^{2t} = 2e^{2t}$ (chain rule).`,
        String.raw`$\frac{d}{dt}\cos3t = -3\sin3t$ (chain rule).`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Find the tangent line to $\vec r(t)=\langle t^2,\ 2t-1,\ \ln t\rangle$ at $t=1$.`,
      choices: [
        { tex: String.raw`$\langle 1,1,0\rangle + s\langle 2,2,1\rangle$`, correct: true },
        { tex: String.raw`$\langle 2,2,1\rangle + s\langle 1,1,0\rangle$`, mistake: 'tangent-point', why: 'Point and direction are swapped. The line must pass through r(1) = (1, 1, 0).' },
        { tex: String.raw`$\langle 1,1,0\rangle + s\langle 1,2,1\rangle$`, mistake: 'arith', why: 'The derivative of t^2 is 2t, which is 2 at t = 1.' },
        { tex: String.raw`$\langle 1,1,1\rangle + s\langle 2,2,1\rangle$`, mistake: 'arith', why: 'ln 1 = 0, not 1.' },
        { tex: String.raw`$\langle 0,0,0\rangle + s\langle 2,2,1\rangle$`, mistake: 'setup', why: 'Right direction, but the line has to touch the curve at r(1), not the origin.' },
      ],
      steps: [
        String.raw`Point: $\vec r(1) = \langle 1,\ 1,\ \ln1\rangle = \langle 1,1,0\rangle$.`,
        String.raw`$\vec r'(t) = \langle 2t,\ 2,\ \tfrac1t\rangle$, so $\vec r'(1)=\langle 2,2,1\rangle$.`,
        String.raw`Line: $\langle 1,1,0\rangle + s\langle 2,2,1\rangle$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Find the unit tangent vector $\vec T(2)$ for $\vec r(t)=\langle 2t,\ t^2,\ 3\rangle$.`,
      choices: [
        { tex: String.raw`$\tfrac{1}{\sqrt5}\langle 1,2,0\rangle$`, correct: true },
        { tex: String.raw`$\langle 2,4,0\rangle$`, mistake: 'no-normalize', why: 'That is r\'(2). Its length is 2 sqrt(5), not 1.' },
        { tex: String.raw`$\tfrac{1}{20}\langle 2,4,0\rangle$`, mistake: 'no-normalize', why: 'You divided by |r\'|^2 = 20 instead of |r\'| = 2 sqrt(5).' },
        { tex: String.raw`$\tfrac{1}{\sqrt{41}}\langle 4,4,3\rangle$`, mistake: 'concept', why: 'That normalizes the position r(2). T comes from the derivative.' },
        { tex: String.raw`$\tfrac15\langle 1,2,0\rangle$`, mistake: 'arith', why: 'The length of <1, 2, 0> is sqrt(5), not 5.' },
      ],
      steps: [
        String.raw`$\vec r'(t) = \langle 2,\ 2t,\ 0\rangle$, so $\vec r'(2) = \langle 2,4,0\rangle$.`,
        String.raw`$|\vec r'(2)| = \sqrt{4+16} = 2\sqrt5$.`,
        String.raw`$\vec T(2) = \dfrac{\langle 2,4,0\rangle}{2\sqrt5} = \dfrac{1}{\sqrt5}\langle 1,2,0\rangle$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Evaluate $\displaystyle\int_0^{\pi}\left\langle \sin t,\ 2t,\ \cos\tfrac t2\right\rangle dt$.`,
      choices: [
        { tex: String.raw`$\langle 2,\ \pi^2,\ 2\rangle$`, correct: true },
        { tex: String.raw`$\langle -2,\ \pi^2,\ 2\rangle$`, mistake: 'sign', why: 'The antiderivative of sin t is -cos t: -cos(pi) + cos(0) = 2.' },
        { tex: String.raw`$\langle 2,\ \pi^2,\ \tfrac12\rangle$`, mistake: 'chain-inside', why: 'The antiderivative of cos(t/2) is 2 sin(t/2). You divided by 2 instead of multiplying.' },
        { tex: String.raw`$\langle 2,\ 2\pi,\ 2\rangle$`, mistake: 'arith', why: 'The antiderivative of 2t is t^2, which gives pi^2.' },
        { tex: String.raw`$4+\pi^2$`, mistake: 'units', why: 'The integral of a vector function is a vector. Keep the components separate.' },
      ],
      steps: [
        String.raw`$\int_0^\pi\sin t\,dt = [-\cos t]_0^\pi = 1+1 = 2$.`,
        String.raw`$\int_0^\pi 2t\,dt = [t^2]_0^\pi = \pi^2$.`,
        String.raw`$\int_0^\pi\cos\tfrac t2\,dt = \left[2\sin\tfrac t2\right]_0^\pi = 2$.`,
        String.raw`Result: $\langle 2,\pi^2,2\rangle$. No $+\vec C$ on a definite integral.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`A particle has velocity $\vec v(t)=\langle 3t^2,\ \cos t,\ e^{-t}\rangle$ and starts at $\vec r(0)=\langle 1,2,0\rangle$. Find $\vec r(t)$.`,
      choices: [
        { tex: String.raw`$\langle t^3+1,\ \sin t+2,\ 1-e^{-t}\rangle$`, correct: true },
        { tex: String.raw`$\langle t^3+1,\ \sin t+2,\ -e^{-t}\rangle$`, mistake: 'constants', why: 'At t = 0 this gives z = -1, not 0. The antiderivative -e^{-t} is -1 at t = 0, so its constant is 1.' },
        { tex: String.raw`$\langle t^3+1,\ \sin t+2,\ e^{-t}-1\rangle$`, mistake: 'sign', why: 'The antiderivative of e^{-t} is -e^{-t}.' },
        { tex: String.raw`$\langle 6t+1,\ -\sin t+2,\ -e^{-t}+1\rangle$`, mistake: 'concept', why: 'You differentiated. Position comes from integrating velocity.' },
        { tex: String.raw`$\langle t^3,\ \sin t,\ -e^{-t}\rangle+\vec C$`, mistake: 'setup', why: 'You still need to use r(0) to find C.' },
      ],
      steps: [
        String.raw`Integrate: $\vec r = \langle t^3,\ \sin t,\ -e^{-t}\rangle + \vec C$.`,
        String.raw`At $t=0$: $\langle 0,0,-1\rangle+\vec C = \langle 1,2,0\rangle$, so $\vec C = \langle 1,2,1\rangle$.`,
        String.raw`$\vec r(t) = \langle t^3+1,\ \sin t+2,\ 1-e^{-t}\rangle$. Check: $\vec r(0) = \langle 1,2,0\rangle$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 3,
      prompt: String.raw`A particle has $\vec a(t)=\langle 0,\ 6t,\ -2\rangle$, $\vec v(0)=\langle 1,0,4\rangle$, $\vec r(0)=\langle 0,1,0\rangle$. Find $\vec r(1)$.`,
      choices: [
        { tex: String.raw`$\langle 1,2,3\rangle$`, correct: true },
        { tex: String.raw`$\langle 1,1,3\rangle$`, mistake: 'constants', why: 'You used v(0) but never added r(0), so the y-coordinate is missing its starting value 1.' },
        { tex: String.raw`$\langle 0,2,-1\rangle$`, mistake: 'constants', why: 'You skipped v(0): the first integration also needs a constant.' },
        { tex: String.raw`$\langle 1,3,2\rangle$`, mistake: 'units', why: 'That is v(1), the velocity, not the position.' },
        { tex: String.raw`$\langle 1,4,3\rangle$`, mistake: 'arith', why: 'The antiderivative of 3t^2 is t^3, not 3t^3.' },
      ],
      steps: [
        String.raw`$\vec v = \langle 0,\ 3t^2,\ -2t\rangle + \vec v(0) = \langle 1,\ 3t^2,\ 4-2t\rangle$. (Here the antiderivative is $\vec 0$ at $t=0$, so $\vec C = \vec v(0)$.)`,
        String.raw`$\vec r = \langle t,\ t^3,\ 4t-t^2\rangle + \vec r(0) = \langle t,\ t^3+1,\ 4t-t^2\rangle$.`,
        String.raw`$\vec r(1) = \langle 1,\ 2,\ 3\rangle$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Suppose $\vec u(0)=\langle 1,2,0\rangle$, $\vec u'(0)=\langle 0,1,3\rangle$, $\vec v(0)=\langle 2,-1,1\rangle$, $\vec v'(0)=\langle 1,1,1\rangle$. Find $\dfrac{d}{dt}\big[\vec u(t)\cdot\vec v(t)\big]$ at $t=0$.`,
      choices: [
        { tex: String.raw`$5$`, correct: true },
        { tex: String.raw`$4$`, mistake: 'concept', why: 'That is u\'(0)·v\'(0). The derivative of a product is not the product of the derivatives.' },
        { tex: String.raw`$2$`, mistake: 'setup', why: 'That is only u\'·v. Add the second term u·v\' = 3.' },
        { tex: String.raw`$0$`, mistake: 'concept', why: 'That is u(0)·v(0), the value of the product, not its derivative.' },
        { tex: String.raw`$1$`, mistake: 'sign', why: 'The product rule adds the two terms (2 + 3); it does not subtract like the quotient rule.' },
      ],
      steps: [
        String.raw`Product rule: $(\vec u\cdot\vec v)' = \vec u'\cdot\vec v + \vec u\cdot\vec v'$.`,
        String.raw`$\vec u'(0)\cdot\vec v(0) = 0-1+3 = 2$.`,
        String.raw`$\vec u(0)\cdot\vec v'(0) = 1+2+0 = 3$.`,
        String.raw`Total: $5$.`,
      ],
      source: 'original',
    },
    {
      id: 'p8',
      difficulty: 3,
      prompt: String.raw`Let $\vec u(t)=\langle t,1,0\rangle$ and $\vec v(t)=\langle 0,t,1\rangle$. Use the product rule to find $\dfrac{d}{dt}\big[\vec u\times\vec v\big]$ at $t=1$.`,
      choices: [
        { tex: String.raw`$\langle 0,-1,2\rangle$`, correct: true },
        { tex: String.raw`$\langle 0,-1,0\rangle$`, mistake: 'cross-order', why: 'You wrote the second term as v\' x u instead of u x v\', which flips its sign.' },
        { tex: String.raw`$\langle 0,1,-2\rangle$`, mistake: 'cross-order', why: 'Both terms reversed: this is the derivative of v x u.' },
        { tex: String.raw`$\langle 0,0,1\rangle$`, mistake: 'concept', why: 'That is u\' x v\'. The product rule has two terms, each with one derivative.' },
        { tex: String.raw`$\langle 0,-1,1\rangle$`, mistake: 'setup', why: 'Only the first term u\' x v. Add u x v\' = <0, 0, 1>.' },
      ],
      steps: [
        String.raw`At $t=1$: $\vec u=\langle 1,1,0\rangle$, $\vec u'=\langle 1,0,0\rangle$, $\vec v=\langle 0,1,1\rangle$, $\vec v'=\langle 0,1,0\rangle$.`,
        String.raw`$\vec u'\times\vec v = \langle 1,0,0\rangle\times\langle 0,1,1\rangle = \langle 0,-1,1\rangle$.`,
        String.raw`$\vec u\times\vec v' = \langle 1,1,0\rangle\times\langle 0,1,0\rangle = \langle 0,0,1\rangle$.`,
        String.raw`Sum: $\langle 0,-1,2\rangle$. Check directly: $\vec u\times\vec v = \langle 1,-t,t^2\rangle$, derivative $\langle 0,-1,2t\rangle$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: '2*t', t: [0, 3.3], color: 'road', arrow: true },
    { kind: 'vector', from: [0, 1, 3.1416], to: [-1, 1, 5.1416], color: 'water', label: "r'(pi/2)" },
  ],
};
