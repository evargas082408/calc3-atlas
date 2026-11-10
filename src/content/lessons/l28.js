export default {
  id: 28,
  title: 'Conservative fields and the Fundamental Theorem of Line Integrals',
  section: '17.3',
  exam: 2,
  blurb: 'Test whether a field is a gradient, find its potential, and evaluate work by plugging in the endpoints.',
  boiler: ['Conservative Fields', 'Fundamental Theorem of Line Integrals', 'Potential Function ID'],

  sections: [
    {
      id: 'question',
      title: 'Same endpoints, same answer?',
      body: String.raw`In Lesson 27, $\vec F = \langle x,-y\rangle$ did $\tfrac32$ of work along the parabola $\langle 2t, t^2\rangle$ from $(0,0)$ to $(2,1)$. Try the straight line $\langle t, t/2\rangle$, $0\le t\le 2$, between the same points:

$$\int_0^2 \langle t, -\tfrac t2\rangle\cdot\langle 1, \tfrac12\rangle\,dt = \int_0^2 \frac{3t}{4}\,dt = \frac32$$

Same answer. That is not luck. Some fields only care where you start and where you stop. Today: which ones, and how to use that.

It is not always true. For $\vec F = \langle x^2, -xy\rangle$ from $(0,1)$ to $(1,0)$, the quarter circle gives $\tfrac23$ and the straight segment gives $\tfrac12$.`,
    },
    {
      id: 'ftli',
      title: 'The Fundamental Theorem for line integrals',
      body: String.raw`Recall Calc 1: $\int_a^b f'(t)\,dt = f(b) - f(a)$. Integrating a derivative only needs the endpoints.

The line-integral version: if $\vec F = \nabla\varphi$ (a **conservative** or gradient field with **potential** $\varphi$), then for any curve $C$ from $A$ to $B$,

$$\int_C \vec F\cdot d\vec r = \int_C \nabla\varphi\cdot d\vec r = \varphi(B) - \varphi(A)$$

Why: along $\vec r(t)$, the chain rule says $\frac{d}{dt}\varphi(\vec r(t)) = \nabla\varphi\cdot\vec r^{\,\prime}(t)$. So the integrand is a derivative, and Calc 1 finishes the job.

Two consequences:
- **Path independence**: every path from $A$ to $B$ gives the same work.
- **Closed loops give 0**: if $A = B$, then $\varphi(B) - \varphi(A) = 0$.

For $\vec F = \langle x,-y\rangle$, the potential is $\varphi = \tfrac12(x^2 - y^2)$, and $\varphi(2,1) - \varphi(0,0) = \tfrac32$, matching both paths.`,
    },
    {
      id: 'test',
      title: 'Test before you use it',
      body: String.raw`If $\langle f, g\rangle = \nabla\varphi$, then $f = \varphi_x$ and $g = \varphi_y$. Mixed partials are equal, $\varphi_{xy} = \varphi_{yx}$, so

$$\textbf{2D:}\quad f_y = g_x$$

Lecture examples:
- $\langle x, y\rangle$: $f_y = 0 = g_x$. Conservative.
- $\langle x^2, -xy\rangle$: $f_y = 0$, $g_x = -y$. **Not** conservative, which is why the two paths above disagreed.
- $\langle ye^x + 1, e^x + 2y\rangle$: $f_y = e^x = g_x$. Conservative.

In 3D, $\vec F = \langle f, g, h\rangle$ needs **all three** pairs:

$$f_y = g_x,\qquad f_z = h_x,\qquad g_z = h_y$$

which is the same as $\operatorname{curl}\vec F = \vec 0$ (Lesson 30). These tests work when the domain has no holes. The field $\langle -y, x\rangle/(x^2+y^2)$ passes $f_y = g_x$ but circulates $2\pi$ around the origin, where it is undefined.`,
    },
    {
      id: 'potential2d',
      title: 'Finding a potential (2D)',
      body: String.raw`Lecture example: $\vec F = \langle ye^x + 1,\ e^x + 2y\rangle$.

1. Integrate $f$ in $x$, holding $y$ fixed: $\varphi = ye^x + x + K(y)$. The constant is a function of $y$.
2. Differentiate in $y$ and match $g$: $e^x + K'(y) = e^x + 2y$, so $K'(y) = 2y$.
3. $K = y^2 + C$, so $\varphi = ye^x + x + y^2 + C$.
4. Check: $\nabla\varphi = \langle ye^x + 1, e^x + 2y\rangle$. Done.

Now any line integral of this $\vec F$ is endpoint arithmetic. From $(1,0)$ to $(0,1)$ along any wild curve: $\varphi(0,1) - \varphi(1,0) = (1 + 0 + 1) - (0 + 1 + 0) = 1$.

The constant $C$ always cancels in $\varphi(B) - \varphi(A)$, so you can drop it.`,
    },
    {
      id: 'potential3d',
      title: 'Finding a potential (3D)',
      body: String.raw`Lecture example: $\vec F = \langle x^2 + e^z,\ 2z,\ xe^z + 2y + z^2\rangle$. The tests pass: $f_y = 0 = g_x$, $g_z = 2 = h_y$, $f_z = e^z = h_x$.

1. Integrate $f$ in $x$: $\varphi = \frac{x^3}{3} + xe^z + k_1(y,z)$. The leftover can depend on **both** $y$ and $z$.
2. Match $\varphi_y = g$: $\frac{\partial k_1}{\partial y} = 2z$, so $k_1 = 2yz + k_2(z)$.
3. Match $\varphi_z = h$: $xe^z + 2y + k_2'(z) = xe^z + 2y + z^2$, so $k_2' = z^2$ and $k_2 = \frac{z^3}{3}$.
4. $\varphi = \frac{x^3}{3} + xe^z + 2yz + \frac{z^3}{3} + C$.

Shortcut that usually works on multiple choice: integrate each component in its own variable, then combine, writing each distinct term **once**. Then check by taking $\nabla\varphi$.

Exam staple: $\langle 2xy - yz,\ x^2 - xz,\ -xy\rangle$ has $\varphi = x^2y - xyz$.`,
    },
    {
      id: 'flow',
      title: 'The decision every line integral starts with',
      body: String.raw`Given $\int_C \vec F\cdot d\vec r$:

1. **Is $\vec F$ conservative?** Run the partials test.
2. **Yes:** find $\varphi$ and compute $\varphi(\text{end}) - \varphi(\text{start})$. If the curve is ugly, that is a hint that this is the intended route. Ignore the curve; read off its endpoints by plugging in the first and last $t$.
3. **No:** parametrize and use $\int_a^b \vec F(\vec r(t))\cdot\vec r^{\,\prime}(t)\,dt$ (or Green's theorem if $C$ is closed, Lesson 29).

Never jump to step 2 without step 1. Plugging endpoints into a "potential" of a non-conservative field gives a number, and it is wrong.`,
    },
  ],

  formulas: [
    { label: 'Fundamental Theorem of Line Integrals', tex: String.raw`\int_C \nabla\varphi\cdot d\vec r = \varphi(B) - \varphi(A)` },
    { label: 'Conservative test, 2D', tex: String.raw`\langle f,g\rangle:\ \ f_y = g_x` },
    { label: 'Conservative test, 3D', tex: String.raw`f_y = g_x,\quad f_z = h_x,\quad g_z = h_y\ \ (\operatorname{curl}\vec F = \vec 0)` },
    { label: 'Closed loop', tex: String.raw`\oint_C \nabla\varphi\cdot d\vec r = 0` },
    { label: 'Potential, first step', tex: String.raw`\varphi = \int f\,dx + k(y,z)` },
  ],

  mistakes: [
    {
      id: 'ftli-not-conservative',
      title: 'Using the endpoint shortcut before testing',
      wrong: String.raw`$\langle x^2, -xy\rangle$: "potential" $\tfrac{x^3}{3} - \tfrac{xy^2}{2}$, plug in endpoints.`,
      right: String.raw`Test first: $f_y = 0 \ne g_x = -y$, so no potential exists. Parametrize instead.`,
      why: 'The endpoint rule only holds for gradient fields. A fake potential still produces a number, which is exactly what the wrong answer choices are.',
    },
    {
      id: 'forgot-g',
      title: 'Forgetting the unknown function when integrating',
      wrong: String.raw`$\varphi_x = 2xy + z \Rightarrow \varphi = x^2y + xz + C$, done.`,
      right: String.raw`$\varphi = x^2y + xz + k(y,z)$, then match $\varphi_y$ and $\varphi_z$ to find $k = yz^2$.`,
      why: 'Integrating in x treats y and z as constants, so the constant of integration can be any function of y and z. Skipping it loses every term with no x in it.',
    },
    {
      id: 'end-minus-start',
      title: 'Subtracting in the wrong order',
      wrong: String.raw`$\int_C\nabla\varphi\cdot d\vec r = \varphi(\text{start}) - \varphi(\text{end})$`,
      right: String.raw`$\int_C\nabla\varphi\cdot d\vec r = \varphi(\text{end}) - \varphi(\text{start})$`,
      why: 'Same order as Calc 1, F(b) - F(a). Read the start and end from t = a and t = b, not from the order the points are listed in.',
    },
    {
      id: 'one-pair-only',
      title: 'Checking only one pair in 3D',
      wrong: String.raw`$\langle yz, xz, x^2\rangle$: $f_y = z = g_x$, so conservative.`,
      right: String.raw`Also need $f_z = h_x$: $y \ne 2x$. Not conservative.`,
      why: 'In 3D there are three mixed-partial pairs, one for each component of the curl. All three must match.',
    },
    {
      id: 'wrong-test',
      title: 'Comparing the wrong partials',
      wrong: String.raw`$\langle f,g\rangle$ is conservative when $f_x = g_y$.`,
      right: String.raw`$\langle f,g\rangle$ is conservative when $f_y = g_x$.`,
      why: 'The test comes from phi_xy = phi_yx: differentiate the first component in y and the second in x. f_x + g_y is the divergence, which has nothing to do with being conservative.',
    },
  ],

  hook: 'Test the cross partials, build the potential, then end minus start. The path never matters.',

  scene: {
    view: { range: 2.5, z: [-3.2, 3.2] },
    camera: [5, -6, 5],
    layers: [
      { id: 'F', kind: 'vectorField', P: 'x', Q: '-y', density: 9 },
      { id: 'phi', kind: 'surface', z: '(x^2 - y^2)/2', colormap: 'terrain', opacity: 0.7 },
      { id: 'grad', kind: 'gradientField', of: 'phi', density: 9 },
      { id: 'lvl', kind: 'contours', of: 'phi', levels: 10 },
      { id: 'C1', kind: 'curve', x: '2*t', y: 't^2', z: '0', t: [0, 1], color: 'road', arrow: true },
      { id: 'C2', kind: 'curve', x: '2*t', y: 't + 0.6*sin(3*pi*t)', z: '0', t: [0, 1], color: 'revision', arrow: true },
      { id: 'L1', kind: 'curveOnSurface', of: 'phi', x: '2*t', y: 't^2', t: [0, 1] },
      { id: 'L2', kind: 'curveOnSurface', of: 'phi', x: '2*t', y: 't + 0.6*sin(3*pi*t)', t: [0, 1] },
      { id: 'A', kind: 'point', at: [0, 0, 0], label: 'start, phi = 0' },
      { id: 'B', kind: 'point', at: [2, 1, 1.5], label: 'end, phi = 3/2' },
      { id: 'B0', kind: 'point', at: [2, 1, 0], label: '(2, 1)' },
    ],
    steps: [
      { label: 'Start', show: ['F'], caption: String.raw`The field $\vec F = \langle x, -y\rangle$. Test: $f_y = 0 = g_x$, so it is conservative.` },
      { label: 'Potential', show: ['phi', 'grad'], caption: String.raw`Its potential is the saddle $\varphi = \tfrac12(x^2 - y^2)$. The arrows of $\vec F = \nabla\varphi$ point uphill on this surface.` },
      { label: 'Two paths', show: ['F', 'C1', 'C2', 'A', 'B0'], caption: String.raw`Two very different paths from $(0,0)$ to $(2,1)$: the parabola and a wiggly curve.` },
      { label: 'Lift', show: ['phi', 'L1', 'L2', 'A', 'B'], caption: String.raw`Lift both onto the potential surface. Work is the total climb in height, and both climb from $\varphi = 0$ to $\varphi = \tfrac32$.` },
      { label: 'Same work', show: ['phi', 'lvl', 'L1', 'L2', 'A', 'B'], caption: String.raw`So $\int_C \vec F\cdot d\vec r = \varphi(2,1) - \varphi(0,0) = \tfrac32$ for every path. A closed loop climbs and descends the same amount: 0.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Which of these vector fields is conservative?`,
      choices: [
        { tex: String.raw`$\langle 3x^2y,\ x^3 + 2y\rangle$`, correct: true },
        { tex: String.raw`$\langle y^2 + x,\ x^2 + y\rangle$`, mistake: 'wrong-test', why: 'Here f_x = g_y = 1, but that is the wrong test. f_y = 2y and g_x = 2x differ.' },
        { tex: String.raw`$\langle y,\ -x\rangle$`, mistake: 'concept', why: 'f_y = 1 and g_x = -1. This is the clockwise rotation field.' },
        { tex: String.raw`$\langle x^2,\ -xy\rangle$`, mistake: 'concept', why: 'f_y = 0 but g_x = -y. In lecture this field gave 2/3 and 1/2 on two paths with the same endpoints.' },
        { tex: String.raw`$\langle xy,\ x^2\rangle$`, mistake: 'arith', why: 'f_y = x but g_x = 2x. Close is not equal.' },
      ],
      steps: [
        String.raw`Test $f_y = g_x$ for each field.`,
        String.raw`$\langle 3x^2y, x^3 + 2y\rangle$: $f_y = 3x^2$ and $g_x = 3x^2$. Equal.`,
        String.raw`Its potential is $\varphi = x^3y + y^2$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Let $\vec F = \langle 2xy - yz,\ x^2 - xz,\ -xy\rangle$ and let $C$ be the curve $\vec r(t) = \langle 2 - t,\ 1 + 2t^2,\ 1 + t^3\rangle$, $0\le t\le 1$. Evaluate $\int_C \vec F\cdot d\vec r$.`,
      choices: [
        { tex: String.raw`$-5$`, correct: true },
        { tex: String.raw`$5$`, mistake: 'end-minus-start', why: 'You computed phi(start) - phi(end).' },
        { tex: String.raw`$-3$`, mistake: 'arith', why: 'That is phi(end) alone. The start point (2, 1, 1) has phi = 2, which must be subtracted.' },
        { tex: String.raw`$-14$`, mistake: 'arith', why: 'You added the integral of each component, so x^2 y and xyz were counted more than once. Write each distinct term once.' },
        { tex: String.raw`$0$`, mistake: 'concept', why: 'Zero is the rule for closed curves. This curve starts at (2,1,1) and ends at (1,3,2).' },
      ],
      steps: [
        String.raw`Test: $f_y = 2x - z = g_x$, $f_z = -y = h_x$, $g_z = -x = h_y$. Conservative.`,
        String.raw`Potential: $\varphi = x^2y - xyz$. Check: $\nabla\varphi = \langle 2xy - yz, x^2 - xz, -xy\rangle$.`,
        String.raw`Endpoints: $\vec r(0) = (2,1,1)$, $\vec r(1) = (1,3,2)$.`,
        String.raw`$\varphi(1,3,2) - \varphi(2,1,1) = (3 - 6) - (4 - 2) = -5$.`,
      ],
      source: 'original (recycled exam field)',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`$\vec F = \langle 2xy + z,\ x^2 + z^2,\ x + 2yz\rangle$ is conservative. Find the work it does along any path from $(0,0,0)$ to $(1,2,1)$.`,
      choices: [
        { tex: String.raw`$5$`, correct: true },
        { tex: String.raw`$3$`, mistake: 'forgot-g', why: 'You stopped at x^2 y + xz after integrating the first component. Matching phi_y gives the missing yz^2.' },
        { tex: String.raw`$-5$`, mistake: 'end-minus-start', why: 'Subtract the start from the end.' },
        { tex: String.raw`$10$`, mistake: 'arith', why: 'You integrated every component and added all the results, counting each term twice.' },
        { tex: String.raw`$0$`, mistake: 'concept', why: 'Conservative fields give 0 around closed loops, not along every path.' },
      ],
      steps: [
        String.raw`Integrate $f$ in $x$: $\varphi = x^2y + xz + k(y,z)$.`,
        String.raw`$\varphi_y = x^2 + k_y = x^2 + z^2$, so $k = yz^2 + m(z)$.`,
        String.raw`$\varphi_z = x + 2yz + m'(z) = x + 2yz$, so $m' = 0$. Thus $\varphi = x^2y + yz^2 + xz$.`,
        String.raw`Work $= \varphi(1,2,1) - \varphi(0,0,0) = (2 + 2 + 1) - 0 = 5$.`,
      ],
      source: 'Study plan bank #27',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Is $\vec F = \langle yz,\ xz,\ x^2\rangle$ conservative?`,
      choices: [
        { tex: String.raw`No: $\operatorname{curl}\vec F = \langle -x,\ y - 2x,\ 0\rangle \ne \vec 0$`, correct: true },
        { tex: String.raw`Yes: $f_y = z = g_x$`, mistake: 'one-pair-only', why: 'That pair matches, but f_z = y while h_x = 2x. All three pairs must match.' },
        { tex: String.raw`Yes: $f_x + g_y + h_z = 0$`, mistake: 'wrong-test', why: 'That is the divergence. A zero divergence says nothing about being conservative.' },
        { tex: String.raw`Yes: $\varphi = xyz$`, mistake: 'concept', why: 'Check it: the z-partial of xyz is xy, not x^2. Always verify a potential.' },
        { tex: String.raw`No: $f_y \ne g_x$`, mistake: 'arith', why: 'f_y = z and g_x = z are equal. The failure is in the other two pairs.' },
      ],
      steps: [
        String.raw`$f_y = z$, $g_x = z$: match.`,
        String.raw`$f_z = y$, $h_x = 2x$: do not match.`,
        String.raw`$g_z = x$, $h_y = 0$: do not match.`,
        String.raw`So $\operatorname{curl}\vec F = \langle h_y - g_z,\ f_z - h_x,\ g_x - f_y\rangle = \langle -x,\ y - 2x,\ 0\rangle$. Not conservative.`,
      ],
      source: 'Study plan bank #28',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Evaluate $\int_C (ye^x + 1)\,dx + (e^x + 2y)\,dy$ where $C$ is $\vec r(t) = \langle t^3,\ 2\sin(\pi t/2)\rangle$, $0\le t\le 1$.`,
      choices: [
        { tex: String.raw`$2e + 5$`, correct: true },
        { tex: String.raw`$2e + 1$`, mistake: 'forgot-g', why: 'You used phi = y e^x + x and forgot K(y) = y^2.' },
        { tex: String.raw`$-(2e + 5)$`, mistake: 'end-minus-start', why: 'Subtract phi(start) from phi(end).' },
        { tex: String.raw`$4e + 5$`, mistake: 'arith', why: 'y e^x came from both components; it belongs in phi once.' },
        { tex: String.raw`$0$`, mistake: 'concept', why: 'The curve is not closed: it runs from (0, 0) to (1, 2).' },
      ],
      steps: [
        String.raw`This is $\int_C\vec F\cdot d\vec r$ with $\vec F = \langle ye^x + 1, e^x + 2y\rangle$. Test: $f_y = e^x = g_x$. Conservative.`,
        String.raw`$\varphi = ye^x + x + K(y)$; matching $\varphi_y = e^x + 2y$ gives $K = y^2$.`,
        String.raw`Endpoints: $\vec r(0) = (0,0)$, $\vec r(1) = (1, 2)$.`,
        String.raw`$\varphi(1,2) - \varphi(0,0) = (2e + 1 + 4) - 0 = 2e + 5$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 3,
      prompt: String.raw`$\vec F = \langle x^2 + e^z,\ 2z,\ xe^z + 2y + z^2\rangle$ is conservative. Find $\int_C\vec F\cdot d\vec r$ for any curve from $(0,0,0)$ to $(1,1,1)$.`,
      choices: [
        { tex: String.raw`$e + \dfrac83$`, correct: true },
        { tex: String.raw`$e + \dfrac73$`, mistake: 'forgot-g', why: 'You lost the z^3/3 term: after matching phi_y you still have to match phi_z.' },
        { tex: String.raw`$e + \dfrac23$`, mistake: 'forgot-g', why: 'You lost the 2yz term from k_1(y, z).' },
        { tex: String.raw`$e + \dfrac53$`, mistake: 'arith', why: 'At the origin x e^z = 0 times 1 = 0, not 1.' },
        { tex: String.raw`$-e - \dfrac83$`, mistake: 'end-minus-start', why: 'Subtract the start from the end.' },
      ],
      steps: [
        String.raw`From lecture: $\varphi = \frac{x^3}{3} + xe^z + 2yz + \frac{z^3}{3}$.`,
        String.raw`$\varphi(1,1,1) = \frac13 + e + 2 + \frac13 = e + \frac83$.`,
        String.raw`$\varphi(0,0,0) = 0$, so the answer is $e + \frac83$.`,
      ],
      source: 'original (lecture field)',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Let $\vec F = \dfrac{\langle -y,\ x\rangle}{x^2+y^2}$. It satisfies $f_y = g_x$ wherever it is defined. Evaluate $\oint_C\vec F\cdot d\vec r$ for $C$ the unit circle, counterclockwise.`,
      choices: [
        { tex: String.raw`$2\pi$`, correct: true },
        { tex: String.raw`$0$`, mistake: 'ftli-not-conservative', why: 'The test only guarantees a potential on a region with no holes. F is undefined at the origin, which is inside the circle.' },
        { tex: String.raw`$-2\pi$`, mistake: 'sign', why: 'Counterclockwise, F points along the motion, so the integral is positive.' },
        { tex: String.raw`$\pi$`, mistake: 'arith', why: 'On the unit circle F dot r\' = sin^2 t + cos^2 t = 1, integrated over a full 2 pi.' },
        { tex: String.raw`It cannot be computed`, mistake: 'concept', why: 'F is defined everywhere on the circle itself. Just parametrize.' },
      ],
      steps: [
        String.raw`$\vec r = \langle\cos t, \sin t\rangle$, so $x^2+y^2 = 1$ and $\vec F = \langle -\sin t, \cos t\rangle$.`,
        String.raw`$\vec F\cdot\vec r^{\,\prime} = \sin^2 t + \cos^2 t = 1$.`,
        String.raw`$\oint_C\vec F\cdot d\vec r = 2\pi \ne 0$. So $\vec F$ is not conservative on any region that surrounds the origin, even though $f_y = g_x$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: '(x^2 - y^2)/2' },
    { kind: 'vectorField', P: 'x', Q: '-y', density: 9 },
  ],
};
