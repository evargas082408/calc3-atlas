export default {
  id: 27,
  title: 'Line integrals of vector fields: work, circulation, flux',
  section: '17.2',
  exam: 2,
  blurb: 'Add up how much a field pushes along a curve (work, circulation) or across it (flux).',
  boiler: ['Line Integral - work done', 'Line Integral - dx dy', 'Work Done'],

  sections: [
    {
      id: 'idea',
      title: 'Keep only the part of F along the curve',
      body: String.raw`Push a cart along a track. Only the part of your force that points along the track does work; the sideways part is wasted.

At each point of a curve $C$ there is a unit tangent $\vec T$ and the field vector $\vec F$. The part of $\vec F$ in the direction of $\vec T$ is the scalar projection

$$\text{scal}_{\vec T}\vec F = \frac{\vec F\cdot\vec T}{|\vec T|} = \vec F\cdot\vec T$$

which is just a number at each point. Now add those numbers up along the curve with the Lesson 26 integral:

$$\int_C \vec F\cdot\vec T\,ds$$

If $\vec F$ is a force, this is the **work** done moving along $C$. If $\vec F$ is a fluid velocity, it is the **flow** along $C$.`,
    },
    {
      id: 'formula',
      title: "Computing it: the |r'| cancels",
      body: String.raw`With $\vec r(t)$, $a\le t\le b$: $\vec T = \dfrac{\vec r^{\,\prime}(t)}{|\vec r^{\,\prime}(t)|}$ and $ds = |\vec r^{\,\prime}(t)|\,dt$. Substitute:

$$\int_C \vec F\cdot\vec T\,ds = \int_a^b \vec F(\vec r(t))\cdot\frac{\vec r^{\,\prime}(t)}{|\vec r^{\,\prime}(t)|}\,|\vec r^{\,\prime}(t)|\,dt = \int_a^b \vec F(\vec r(t))\cdot\vec r^{\,\prime}(t)\,dt$$

The two speeds cancel. **No square roots** in a vector line integral. This is also written $\int_C \vec F\cdot d\vec r$.

Lecture example: work done by $\vec F = \langle x, -y\rangle$ along $\vec r(t) = \langle 2t, t^2\rangle$, $0\le t\le 1$.
1. $\vec r^{\,\prime} = \langle 2, 2t\rangle$ and $\vec F(\vec r(t)) = \langle 2t, -t^2\rangle$.
2. $\vec F\cdot\vec r^{\,\prime} = 4t - 2t^3$.
3. Work $= \int_0^1 (4t - 2t^3)\,dt = 2 - \tfrac12 = \tfrac32$.`,
    },
    {
      id: 'dxdy',
      title: 'The dx dy form',
      body: String.raw`Write $\vec F = \langle f, g, h\rangle$ and $\vec r = \langle x(t), y(t), z(t)\rangle$. Then $\vec F\cdot\vec r^{\,\prime} = f x' + g y' + h z'$, and since $dx = x'(t)\,dt$ and so on,

$$\int_C \vec F\cdot d\vec r = \int_C f\,dx + g\,dy + h\,dz$$

So "find $\int_C x\,dx - y\,dy$" is the same problem as "find the work done by $\langle x, -y\rangle$." When you see this form:
1. Parametrize $C$.
2. Replace $x, y$ by $x(t), y(t)$ **and** replace $dx$ by $x'(t)\,dt$, $dy$ by $y'(t)\,dt$.
3. Integrate in $t$.

Forgetting to convert $dx$ and $dy$ is the most common slip on these questions.`,
    },
    {
      id: 'orientation',
      title: 'Direction matters now',
      body: String.raw`Walk the curve backward and $\vec T$ flips, so every $\vec F\cdot\vec T$ flips sign:

$$\int_{-C}\vec F\cdot d\vec r = -\int_C \vec F\cdot d\vec r$$

Contrast with Lesson 26, where $\int_C f\,ds$ ignores direction. A segment "from $A$ to $B$" must be parametrized as $\vec r(t) = A + t(B - A)$, starting at $A$.

**Circulation** is the name for $\oint_C \vec F\cdot d\vec r$ when $C$ is closed (it ends where it starts). The default direction is counterclockwise. For a closed curve made of pieces, add the pieces. Lecture example: $\vec F = \langle x,-y\rangle$ around the triangle $(0,0)\to(2,0)\to(0,2)\to(0,0)$ gives $2 + (-4) + 2 = 0$.`,
    },
    {
      id: 'flux',
      title: 'Flux: the part of F across the curve',
      body: String.raw`Instead of the tangential part of $\vec F$, keep the **normal** part, how much $\vec F$ pushes straight across $C$:

$$\text{Flux} = \int_C \vec F\cdot\vec N\,ds$$

For $\vec r(t) = \langle x(t), y(t)\rangle$ the standard choice is $\vec N = \dfrac{\langle y', -x'\rangle}{|\vec r^{\,\prime}|}$, the tangent turned $90^\circ$ **clockwise**. For a counterclockwise closed curve this points **outward**. Again $|\vec r^{\,\prime}|$ cancels:

$$\text{Flux} = \int_a^b \left(f\,y' - g\,x'\right)dt = \int_C f\,dy - g\,dx$$

Memory tip: work is $f\,dx + g\,dy$. Flux swaps $dx$ and $dy$ and puts the minus on the second term.

Read the problem's normal carefully. If it says "the normal $90^\circ$ counterclockwise from $\vec T$," that is $\langle -y', x'\rangle$, the opposite sign.

Example (from the notes): $\vec F = \langle 2x, 2y\rangle$ across the unit circle. $f y' - g x' = 2\cos^2 t + 2\sin^2 t = 2$, so the flux is $4\pi$.`,
    },
    {
      id: 'compare',
      title: 'Circulation vs flux on the unit circle',
      body: String.raw`The two standard fields trade roles:

- $\langle -y, x\rangle$ runs along the circle. Circulation $= \int_0^{2\pi}(\sin^2 t + \cos^2 t)\,dt = 2\pi$. Flux $= 0$.
- $\langle x, y\rangle$ points straight out. Circulation $= 0$. Flux $= 2\pi$.

**Circulation** asks "how much does the field push me around the loop?" **Flux** asks "how much of the field pours out through the loop?" On the exam, decide which one is being asked before computing anything.`,
    },
  ],

  formulas: [
    { label: 'Work / circulation', tex: String.raw`\int_C \vec F\cdot\vec T\,ds = \int_a^b \vec F(\vec r(t))\cdot\vec r^{\,\prime}(t)\,dt` },
    { label: 'Differential form', tex: String.raw`\int_C \vec F\cdot d\vec r = \int_C f\,dx + g\,dy + h\,dz` },
    { label: 'Reversing the curve', tex: String.raw`\int_{-C}\vec F\cdot d\vec r = -\int_C\vec F\cdot d\vec r` },
    { label: 'Outward normal (CCW curve)', tex: String.raw`\vec N = \frac{\langle y', -x'\rangle}{|\vec r^{\,\prime}|}` },
    { label: 'Flux across a plane curve', tex: String.raw`\int_C \vec F\cdot\vec N\,ds = \int_a^b (f\,y' - g\,x')\,dt = \int_C f\,dy - g\,dx` },
  ],

  mistakes: [
    {
      id: 'scalar-vs-vector',
      title: "Multiplying by |r'| in a vector line integral",
      wrong: String.raw`$\int_C \vec F\cdot d\vec r = \int_a^b \vec F(\vec r(t))\cdot\vec r^{\,\prime}(t)\,|\vec r^{\,\prime}(t)|\,dt$`,
      right: String.raw`$\int_C \vec F\cdot d\vec r = \int_a^b \vec F(\vec r(t))\cdot\vec r^{\,\prime}(t)\,dt$`,
      why: "The |r'| from ds cancels the one hidden in T. Scalar integrals (ds) get |r'|; vector integrals (dr) do not.",
    },
    {
      id: 'orientation',
      title: 'Going the wrong way along the curve',
      wrong: String.raw`Segment from $(1,0)$ to $(3,2)$: $\vec r(t) = \langle 3-2t, 2-2t\rangle$`,
      right: String.raw`$\vec r(t) = \langle 1+2t, 2t\rangle$, starting at $(1,0)$`,
      why: 'Reversing the direction flips the sign of every vector line integral. Clockwise loops are the negative of counterclockwise ones.',
    },
    {
      id: 'circ-flux-swap',
      title: 'Computing circulation when flux was asked (or the reverse)',
      wrong: String.raw`Flux $= \int_C f\,dx + g\,dy$`,
      right: String.raw`Flux $= \int_C f\,dy - g\,dx$; circulation $= \int_C f\,dx + g\,dy$`,
      why: 'Circulation measures flow along the curve and uses T. Flux measures flow across it and uses N. The integrands are different.',
    },
    {
      id: 'normal-sign',
      title: 'Using the inward normal',
      wrong: String.raw`$\vec N = \langle -y', x'\rangle/|\vec r^{\,\prime}|$ for outward flux of a counterclockwise curve`,
      right: String.raw`$\vec N = \langle y', -x'\rangle/|\vec r^{\,\prime}|$ points outward for a counterclockwise curve`,
      why: 'Rotating T clockwise points out of a counterclockwise loop; rotating it counterclockwise points in. If the problem names a specific normal, use that one.',
    },
    {
      id: 'dx-dy-sub',
      title: 'Not converting dx and dy',
      wrong: String.raw`$\int_C y^2\,dx + x\,dy = \int_0^1 \left((2t)^2 + (1+2t)\right)dt$`,
      right: String.raw`$\int_0^1 \left((2t)^2\cdot 2 + (1+2t)\cdot 2\right)dt$ with $dx = 2\,dt$, $dy = 2\,dt$`,
      why: 'dx means x\'(t) dt, not dt. Each differential carries its own derivative factor.',
    },
  ],

  hook: "Plug the curve into F, dot with r', integrate. No square roots. Flux: f dy - g dx.",

  scene: {
    view: { range: 2.5, z: [-0.5, 1] },
    camera: [0.5, -3.5, 7],
    layers: [
      { id: 'F', kind: 'vectorField', P: 'x', Q: '-y', density: 9 },
      { id: 'C', kind: 'curve', x: '2*t', y: 't^2', z: '0', t: [0, 1], color: 'road', arrow: true },
      { id: 'P', kind: 'point', at: [1, 0.25, 0], label: 'r(1/2)' },
      { id: 'T', kind: 'vector', from: [1, 0.25, 0], to: [1.894, 0.697, 0], color: 'water', label: 'T' },
      { id: 'Fv', kind: 'vector', from: [1, 0.25, 0], to: [2, 0, 0], color: 'revision', label: 'F' },
      { id: 'N', kind: 'vector', from: [1, 0.25, 0], to: [1.447, -0.644, 0], color: 'wood', label: 'N' },
      { id: 'circle', kind: 'curve', x: '1.5*cos(t)', y: '1.5*sin(t)', z: '0', t: [0, '2*pi'], color: 'road', arrow: true },
      { id: 'rot', kind: 'vectorField', P: '-y', Q: 'x', density: 9 },
      { id: 'rad', kind: 'vectorField', P: 'x', Q: 'y', density: 9 },
    ],
    steps: [
      { label: 'Start', show: ['F', 'C'], caption: String.raw`The field $\vec F = \langle x, -y\rangle$ and the path $\vec r(t) = \langle 2t, t^2\rangle$ from $(0,0)$ to $(2,1)$.` },
      { label: 'Tangent', show: ['F', 'C', 'P', 'T', 'Fv'], caption: String.raw`At each point compare $\vec F$ with the unit tangent $\vec T$. Here $\vec F\cdot\vec T > 0$: the field helps you along.` },
      { label: 'Work', show: ['F', 'C', 'T', 'Fv'], caption: String.raw`Work adds up $\vec F\cdot\vec T$ along the path. With $\vec F\cdot\vec r^{\,\prime} = 4t - 2t^3$ the total is $\tfrac32$.` },
      { label: 'Normal', show: ['F', 'C', 'P', 'N', 'Fv'], caption: String.raw`Flux uses $\vec N = \langle y', -x'\rangle/|\vec r^{\,\prime}|$ instead, the tangent turned clockwise. It measures how much $\vec F$ crosses the path.` },
      { label: 'Circulation', show: ['rot', 'circle'], caption: String.raw`$\langle -y, x\rangle$ runs along the circle everywhere: big circulation, zero flux.` },
      { label: 'Flux', show: ['rad', 'circle'], caption: String.raw`$\langle x, y\rangle$ points straight through the circle: zero circulation, big flux.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Find the work done by $\vec F = \langle y, x^2\rangle$ along $\vec r(t) = \langle t, t^2\rangle$, $0\le t\le 1$.`,
      choices: [
        { tex: String.raw`$\dfrac56$`, correct: true },
        { tex: String.raw`$-\dfrac56$`, mistake: 'orientation', why: 'The curve runs from t = 0 to t = 1, so the work is the positive value.' },
        { tex: String.raw`$\dfrac23$`, mistake: 'dx-dy-sub', why: 'You dotted with <1, 1> instead of r\' = <1, 2t>: the dy = 2t dt factor is missing.' },
        { tex: String.raw`$\dfrac16$`, mistake: 'circ-flux-swap', why: 'That is the flux, from f y\' - g x\'. Work uses f x\' + g y\'.' },
        { tex: String.raw`$\dfrac12$`, mistake: 'arith', why: 'You kept only the g y\' term, 2t^3. Add the f x\' term, t^2.' },
      ],
      steps: [
        String.raw`$\vec r^{\,\prime} = \langle 1, 2t\rangle$, $\vec F(\vec r(t)) = \langle t^2, t^2\rangle$.`,
        String.raw`$\vec F\cdot\vec r^{\,\prime} = t^2 + 2t^3$.`,
        String.raw`$\int_0^1 (t^2 + 2t^3)\,dt = \frac13 + \frac12 = \frac56$.`,
      ],
      source: 'Study plan bank #26',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Evaluate $\int_C y^2\,dx + x\,dy$ where $C$ is the line segment from $(1,0)$ to $(3,2)$.`,
      choices: [
        { tex: String.raw`$\dfrac{20}{3}$`, correct: true },
        { tex: String.raw`$-\dfrac{20}{3}$`, mistake: 'orientation', why: 'You parametrized from (3, 2) back to (1, 0).' },
        { tex: String.raw`$\dfrac{10}{3}$`, mistake: 'dx-dy-sub', why: 'You replaced dx and dy by dt. Both are 2 dt here.' },
        { tex: String.raw`$\dfrac{20\sqrt2}{3}$`, mistake: 'scalar-vs-vector', why: 'You treated it like a ds integral and multiplied by |r\'| = 2 sqrt(2).' },
        { tex: String.raw`$-\dfrac43$`, mistake: 'circ-flux-swap', why: 'That is f dy - g dx, the flux form.' },
      ],
      steps: [
        String.raw`$\vec r(t) = \langle 1,0\rangle + t\langle 2,2\rangle = \langle 1+2t, 2t\rangle$, $0\le t\le 1$. So $dx = 2\,dt$, $dy = 2\,dt$.`,
        String.raw`$y^2\,dx = 4t^2\cdot 2\,dt = 8t^2\,dt$ and $x\,dy = (1+2t)\cdot 2\,dt$.`,
        String.raw`$\int_0^1 (8t^2 + 2 + 4t)\,dt = \frac83 + 2 + 2 = \frac{20}{3}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Find the circulation of $\vec F = \langle -y, x\rangle$ around the circle of radius 3 centered at the origin, counterclockwise.`,
      choices: [
        { tex: String.raw`$18\pi$`, correct: true },
        { tex: String.raw`$-18\pi$`, mistake: 'orientation', why: 'That is the clockwise circulation.' },
        { tex: String.raw`$0$`, mistake: 'circ-flux-swap', why: 'That is the flux. This field runs along the circle, so its flux is 0 but its circulation is not.' },
        { tex: String.raw`$2\pi$`, mistake: 'setup', why: 'You used the unit circle. With radius 3, F dot r\' = 9.' },
        { tex: String.raw`$54\pi$`, mistake: 'scalar-vs-vector', why: 'You multiplied by an extra |r\'| = 3.' },
      ],
      steps: [
        String.raw`$\vec r(t) = \langle 3\cos t, 3\sin t\rangle$, $\vec r^{\,\prime} = \langle -3\sin t, 3\cos t\rangle$.`,
        String.raw`$\vec F(\vec r(t)) = \langle -3\sin t, 3\cos t\rangle$, so $\vec F\cdot\vec r^{\,\prime} = 9\sin^2 t + 9\cos^2 t = 9$.`,
        String.raw`$\oint_C \vec F\cdot d\vec r = \int_0^{2\pi} 9\,dt = 18\pi$.`,
      ],
      source: 'Study plan bank #24',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Find the outward flux of $\vec F = \langle x, 3y\rangle$ across the circle $x^2+y^2 = 4$.`,
      choices: [
        { tex: String.raw`$16\pi$`, correct: true },
        { tex: String.raw`$-16\pi$`, mistake: 'normal-sign', why: 'You used the inward normal <-y\', x\'>.' },
        { tex: String.raw`$0$`, mistake: 'circ-flux-swap', why: 'That is the circulation, from f x\' + g y\'.' },
        { tex: String.raw`$4\pi$`, mistake: 'setup', why: 'You used the unit circle instead of radius 2.' },
        { tex: String.raw`$32\pi$`, mistake: 'scalar-vs-vector', why: 'You multiplied by an extra |r\'| = 2.' },
      ],
      steps: [
        String.raw`$\vec r(t) = \langle 2\cos t, 2\sin t\rangle$: $x' = -2\sin t$, $y' = 2\cos t$.`,
        String.raw`$f\,y' - g\,x' = (2\cos t)(2\cos t) - (6\sin t)(-2\sin t) = 4\cos^2 t + 12\sin^2 t$.`,
        String.raw`$\int_0^{2\pi} (4\cos^2 t + 12\sin^2 t)\,dt = 4\pi + 12\pi = 16\pi$.`,
        String.raw`Check with Lesson 29: $\operatorname{div}\vec F = 1 + 3 = 4$ times the area $4\pi$ is $16\pi$.`,
      ],
      source: 'Study plan bank #25',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Find the work done by $\vec F = \langle y^2, x\rangle$ along the path that goes in straight lines from $(0,0)$ to $(1,0)$ and then from $(1,0)$ to $(1,1)$.`,
      choices: [
        { tex: String.raw`$1$`, correct: true },
        { tex: String.raw`$-1$`, mistake: 'orientation', why: 'Both segments were traversed in the stated directions; the work is positive.' },
        { tex: String.raw`$\dfrac56$`, mistake: 'concept', why: 'That is the work along the straight diagonal from (0,0) to (1,1). This field is not conservative, so the path matters.' },
        { tex: String.raw`$\dfrac13$`, mistake: 'setup', why: 'On the vertical segment x does not change (dx = 0), so only the x dy term counts. You used the y^2 term instead.' },
        { tex: String.raw`$-\dfrac16$`, mistake: 'circ-flux-swap', why: 'That is the flux across the two segments.' },
      ],
      steps: [
        String.raw`Segment 1: $\vec r = \langle t, 0\rangle$, $0\le t\le 1$, $\vec r^{\,\prime} = \langle 1,0\rangle$. $\vec F\cdot\vec r^{\,\prime} = y^2 = 0$. Contributes 0.`,
        String.raw`Segment 2: $\vec r = \langle 1, t\rangle$, $0\le t\le 1$, $\vec r^{\,\prime} = \langle 0,1\rangle$. $\vec F\cdot\vec r^{\,\prime} = x = 1$. Contributes 1.`,
        String.raw`Total work: $0 + 1 = 1$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 3,
      prompt: String.raw`Find the flux of $\vec F = \langle x^2, y\rangle$ across the curve $y = x^2$ from $(0,0)$ to $(1,1)$, using the normal $\vec N = \langle y', -x'\rangle/|\vec r^{\,\prime}|$ (the tangent rotated $90^\circ$ clockwise).`,
      choices: [
        { tex: String.raw`$\dfrac16$`, correct: true },
        { tex: String.raw`$-\dfrac16$`, mistake: 'normal-sign', why: 'You used the counterclockwise normal <-y\', x\'>.' },
        { tex: String.raw`$\dfrac56$`, mistake: 'circ-flux-swap', why: 'That is the work f x\' + g y\', not the flux.' },
        { tex: String.raw`$0$`, mistake: 'dx-dy-sub', why: 'You replaced dy by dt in f dy, so f dy and g dx canceled. With dy = 2t dt they do not.' },
        { tex: String.raw`$\dfrac12$`, mistake: 'arith', why: 'You kept only the f y\' term. Subtract g x\' = t^2.' },
      ],
      steps: [
        String.raw`$\vec r(t) = \langle t, t^2\rangle$, $0\le t\le 1$: $x' = 1$, $y' = 2t$.`,
        String.raw`$\vec F(\vec r(t)) = \langle t^2, t^2\rangle$.`,
        String.raw`$f\,y' - g\,x' = t^2(2t) - t^2(1) = 2t^3 - t^2$.`,
        String.raw`$\int_0^1 (2t^3 - t^2)\,dt = \frac12 - \frac13 = \frac16$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 1,
      prompt: String.raw`For $\vec F = \langle x, y\rangle$ and $C$ the unit circle traversed counterclockwise, which pair (circulation, outward flux) is correct?`,
      choices: [
        { tex: String.raw`circulation $0$, flux $2\pi$`, correct: true },
        { tex: String.raw`circulation $2\pi$, flux $0$`, mistake: 'circ-flux-swap', why: 'Those are the values for <-y, x>. A radial field points across the circle, not along it.' },
        { tex: String.raw`circulation $2\pi$, flux $2\pi$`, mistake: 'concept', why: 'F dot T = 0 at every point of the circle, so the circulation is 0.' },
        { tex: String.raw`circulation $0$, flux $-2\pi$`, mistake: 'normal-sign', why: 'The field points outward, so the outward flux is positive.' },
        { tex: String.raw`circulation $0$, flux $0$`, mistake: 'concept', why: 'F dot N = cos^2 t + sin^2 t = 1, which integrates to 2 pi.' },
      ],
      steps: [
        String.raw`$\vec r = \langle\cos t, \sin t\rangle$, $\vec r^{\,\prime} = \langle -\sin t, \cos t\rangle$, $\vec F = \langle\cos t, \sin t\rangle$.`,
        String.raw`Circulation: $f x' + g y' = -\cos t\sin t + \sin t\cos t = 0$. Total $0$.`,
        String.raw`Flux: $f y' - g x' = \cos^2 t + \sin^2 t = 1$. Total $2\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p8',
      difficulty: 2,
      prompt: String.raw`Find the work done by $\vec F = \langle y, z, x\rangle$ along the line segment from $(0,0,0)$ to $(1,2,3)$.`,
      choices: [
        { tex: String.raw`$\dfrac{11}{2}$`, correct: true },
        { tex: String.raw`$-\dfrac{11}{2}$`, mistake: 'orientation', why: 'The segment starts at the origin. Parametrize it from (0,0,0).' },
        { tex: String.raw`$\dfrac{11\sqrt{14}}{2}$`, mistake: 'scalar-vs-vector', why: 'You multiplied by |r\'| = sqrt(14). Work has no speed factor.' },
        { tex: String.raw`$3$`, mistake: 'dx-dy-sub', why: 'You used dt for dx, dy, dz. The derivative factors 1, 2, 3 are missing.' },
        { tex: String.raw`$11$`, mistake: 'arith', why: 'The integral of 11t from 0 to 1 is 11/2.' },
      ],
      steps: [
        String.raw`$\vec r(t) = \langle t, 2t, 3t\rangle$, $\vec r^{\,\prime} = \langle 1,2,3\rangle$.`,
        String.raw`$\vec F(\vec r(t)) = \langle 2t, 3t, t\rangle$, so $\vec F\cdot\vec r^{\,\prime} = 2t + 6t + 3t = 11t$.`,
        String.raw`$\int_0^1 11t\,dt = \frac{11}{2}$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'vectorField', P: 'x', Q: '-y', density: 9 },
    { kind: 'curve', x: '2*t', y: 't^2', z: '0', t: [0, 1], arrow: true },
  ],
};
