export default {
  id: 13,
  title: 'Directional derivatives and the gradient',
  section: '15.5',
  exam: 1,
  blurb: 'Find the slope of f in any direction, the direction of steepest climb, and the tangent line to a level curve.',
  boiler: ['Directional Derivative', 'Gradient Vector', 'Gradient Algebra'],

  sections: [
    {
      id: 'idea',
      title: 'Slope in any direction',
      body: String.raw`$f_x$ tells you how steep the hill is walking due east, $f_y$ walking due north. But you can walk northeast, or in any direction at all. The slope in the direction of a **unit** vector $\vec u = \langle u_1, u_2\rangle$ is the **directional derivative**:

$$D_{\vec u}f(x,y) = \lim_{h\to0}\frac{f(x + hu_1,\ y + hu_2) - f(x, y)}{h}.$$

Take a step of length $h$ in direction $\vec u$, see how much $f$ changed, divide by the step length. With $\vec u = \langle1,0\rangle$ this is just $f_x$; with $\langle0,1\rangle$ it is $f_y$.

The limit is never computed directly. The chain rule turns it into

$$D_{\vec u}f = f_x u_1 + f_y u_2.$$

Why: moving along $\big(x + hu_1, y + hu_2\big)$, $x$ changes at rate $u_1$ and $y$ at rate $u_2$, so by Lesson 12 the height changes at rate $f_xu_1 + f_yu_2$.

Three variables work the same way: $D_{\vec u}f = f_xu_1 + f_yu_2 + f_zu_3$.`,
    },
    {
      id: 'gradient',
      title: 'The gradient packages the partials',
      body: String.raw`That sum is a dot product. Collect the partials into one vector, the **gradient**:

$$\nabla f = \langle f_x, f_y\rangle \quad\text{or}\quad \nabla f = \langle f_x, f_y, f_z\rangle.$$

(Read $\nabla f$ as "grad $f$" or "del $f$.") Then

$$D_{\vec u}f = \nabla f\cdot\vec u.$$

**The unit vector matters.** The directional derivative is a rate *per unit of distance*. If you are given a direction like $\langle 2, 5\rangle$, divide by its length first: $\vec u = \langle 2, 5\rangle/\sqrt{29}$. If the problem says "toward the point $Q$" from $P$, the direction is $\overrightarrow{PQ} = Q - P$, then normalize.

**Example.** $f = \sin(x^3 + 7y)$ at $\left(0, \frac\pi4\right)$ in the direction $\langle 2, 5\rangle$.

- $\nabla f = \langle 3x^2\cos(x^3 + 7y),\ 7\cos(x^3+7y)\rangle$. At the point, $x^3 + 7y = \frac{7\pi}{4}$ and $\cos\frac{7\pi}4 = \frac{\sqrt2}{2}$, so $\nabla f = \left\langle 0, \frac{7\sqrt2}{2}\right\rangle$.
- $D_{\vec u}f = \frac{7\sqrt2}{2}\cdot\frac{5}{\sqrt{29}} = \frac{35}{\sqrt{58}} \approx 4.60$.

(The lecture notes give $-\frac{35}{\sqrt{29}}$ here, but $\cos\frac{7\pi}{4}$ is $+\frac{\sqrt2}2$, not $-1$. The value is $\frac{35}{\sqrt{58}}$.)`,
    },
    {
      id: 'steepest',
      title: 'Why the gradient points straight uphill',
      body: String.raw`Write the dot product with the angle $\theta$ between $\vec u$ and $\nabla f$. Since $|\vec u| = 1$:

$$D_{\vec u}f = |\nabla f|\,|\vec u|\cos\theta = |\nabla f|\cos\theta.$$

Only $\theta$ is up to you, and $\cos\theta$ runs from $-1$ to $1$. So:

- **Fastest increase:** $\theta = 0$, walk in the direction of $\nabla f$. The rate is $|\nabla f|$.
- **Fastest decrease:** $\theta = \pi$, walk in the direction of $-\nabla f$. The rate is $-|\nabla f|$.
- **No change:** $\theta = \frac\pi2$, walk perpendicular to $\nabla f$.

Exam questions ask for one of two different things. "In what **direction**" wants a vector ($\nabla f$, or $\nabla f/|\nabla f|$ if they say unit). "What is the maximum **rate**" wants a number ($|\nabla f|$).

**Example.** $f = x^2y + xy^2$ at $(1, 2)$. $\nabla f = \langle 2xy + y^2,\ x^2 + 2xy\rangle = \langle 8, 5\rangle$.

- Steepest increase: direction $\langle 8, 5\rangle$, rate $\sqrt{89}$.
- Steepest decrease: direction $\langle -8, -5\rangle$, rate $-\sqrt{89}$.
- In direction $\langle -1, -1\rangle$: $\vec u = \langle-1,-1\rangle/\sqrt2$, so $D_{\vec u}f = \frac{-8-5}{\sqrt2} = -\frac{13}{\sqrt2}$.

(The notes compute $f_x(1,2) = 10$ in this example, but $2(1)(2) + 2^2 = 8$. Use $\langle8,5\rangle$.)`,
    },
    {
      id: 'level',
      title: 'The gradient is perpendicular to level curves',
      body: String.raw`Walk along a level curve $f(x, y) = k$ and your height never changes. So the directional derivative along the curve is 0, which means the tangent direction is perpendicular to $\nabla f$.

**Proof in one line.** Let $\vec r(t) = \langle x(t), y(t)\rangle$ trace the level curve. Then $f(x(t), y(t)) = k$. Differentiate with the chain rule: $f_xx' + f_yy' = 0$, which is $\nabla f\cdot\vec r'(t) = 0$.

On a contour map, $\nabla f$ crosses each contour at a right angle, pointing toward higher values, and it is longer where contours are packed tightly.

**Tangent line to a level curve.** At $(a, b)$, $\nabla f(a,b)$ is a normal vector to the curve, so the tangent line is

$$f_x(a,b)(x - a) + f_y(a,b)(y - b) = 0.$$

**Example.** $f = x^2y^3$ at $(-1, 1)$. $\nabla f = \langle 2xy^3, 3x^2y^2\rangle = \langle -2, 3\rangle$. A vector perpendicular to it is $\langle 3, 2\rangle$, so the tangent line has slope $\frac23$: $-2(x+1) + 3(y - 1) = 0$.

**Same in 3D.** $\nabla f$ is perpendicular to the level surface $f(x,y,z) = k$. Lesson 14 uses this to build tangent planes.`,
    },
  ],

  formulas: [
    { label: 'Gradient', tex: String.raw`\nabla f = \langle f_x, f_y, f_z\rangle` },
    { label: 'Directional derivative (u unit)', tex: String.raw`D_{\vec u}f = \nabla f\cdot\vec u = |\nabla f|\cos\theta` },
    { label: 'Steepest climb', tex: String.raw`\text{direction } \nabla f,\quad \text{rate } |\nabla f|` },
    { label: 'Steepest descent', tex: String.raw`\text{direction } -\nabla f,\quad \text{rate } -|\nabla f|` },
    { label: 'Tangent line to f = k at (a, b)', tex: String.raw`f_x(a,b)(x-a) + f_y(a,b)(y-b) = 0` },
  ],

  mistakes: [
    {
      id: 'not-unit',
      title: 'Forgetting to normalize the direction',
      wrong: String.raw`$D_{\vec u}f = \langle 4,4\rangle\cdot\langle 3,4\rangle = 28$`,
      right: String.raw`$\vec u = \langle 3,4\rangle/5$, so $D_{\vec u}f = \frac{28}{5}$`,
      why: 'The formula ∇f · u only gives a slope when |u| = 1. A longer vector inflates the answer by its length.',
    },
    {
      id: 'point-as-direction',
      title: 'Using the target point as the direction',
      wrong: String.raw`From $P(2,0)$ toward $Q(5,4)$: direction $\langle 5, 4\rangle$`,
      right: String.raw`Direction $\overrightarrow{PQ} = \langle 3, 4\rangle$, then $\vec u = \langle3,4\rangle/5$`,
      why: '"Toward Q" means the arrow from P to Q, which is Q minus P.',
    },
    {
      id: 'rate-vs-direction',
      title: 'Giving the vector when asked for the rate (or the reverse)',
      wrong: String.raw`Max rate of increase is $\langle -2, 5, -4\rangle$`,
      right: String.raw`Max rate is $|\nabla f| = 3\sqrt5$; the direction is $\langle-2,5,-4\rangle$`,
      why: 'A rate is a number. A direction is a vector. Read the question for which one it wants.',
    },
    {
      id: 'tangent-vs-normal',
      title: 'Using the gradient as the tangent direction of a level curve',
      wrong: String.raw`Tangent line to the level curve runs along $\nabla f = \langle 7, 4\rangle$`,
      right: String.raw`$\nabla f$ is perpendicular to the level curve. The tangent runs along $\langle 4, -7\rangle$.`,
      why: 'Along a level curve f does not change, so the tangent direction has D_u f = 0, which means it is perpendicular to ∇f.',
    },
  ],

  hook: 'The gradient is the uphill arrow: its direction is the steepest way up, its length is how steep.',

  scene: {
    view: { range: 2.5, z: [0, 5] },
    camera: [5, -6, 6],
    layers: [
      { id: 'surf', kind: 'surface', z: '0.5*x^2 + y^2', domain: { x: [-2.2, 2.2], y: [-1.8, 1.8] }, colormap: 'terrain', opacity: 0.8 },
      { id: 'lvl', kind: 'contours', of: 'surf', levels: 8 },
      { id: 'grad', kind: 'gradientField', of: 'surf', density: 9 },
      { id: 'P', kind: 'point', at: [1, 1, 0], label: 'P(1, 1)' },
      { id: 'Pup', kind: 'point', at: [1, 1, 1.5], label: 'f = 1.5' },
      { id: 'g', kind: 'vector', from: [1, 1, 0], to: [1.5, 2, 0], color: 'road', label: '∇f = ⟨1, 2⟩' },
      { id: 'tan', kind: 'vector', from: [1, 1, 0], to: [1.8, 0.6, 0], color: 'water', label: 'tangent ⟨2, -1⟩' },
      { id: 'climb', kind: 'curveOnSurface', of: 'surf', x: '1 + 0.5*t', y: '1 + t', t: [-0.6, 0.6], color: 'road' },
    ],
    steps: [
      { label: 'Start', show: ['surf', 'lvl'], caption: String.raw`The bowl $f(x,y) = \tfrac12x^2 + y^2$ with its level curves (ellipses) drawn on it and on the floor.` },
      { label: 'Field', show: ['lvl', 'grad'], caption: String.raw`At every point of the map, draw $\nabla f = \langle x, 2y\rangle$. Every arrow crosses the contours at a right angle and points to higher values.` },
      { label: 'At P', show: ['lvl', 'P', 'g'], caption: String.raw`At $P(1,1)$, $\nabla f = \langle 1, 2\rangle$. Walking that way, $f$ rises fastest, at rate $|\nabla f| = \sqrt5$.` },
      { label: 'Climb', show: ['surf', 'Pup', 'climb', 'P', 'g'], caption: String.raw`Lifted onto the surface, the gradient direction is the steepest path up the bowl from that spot.` },
      { label: 'Level', show: ['lvl', 'P', 'g', 'tan'], caption: String.raw`The contour through $P$ runs along $\langle 2, -1\rangle$, and $\langle1,2\rangle\cdot\langle2,-1\rangle = 0$. Along a contour the height does not change, so $D_{\vec u}f = 0$ there.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Find the directional derivative of $f(x, y) = x^2y + 3y$ at $(1, 2)$ in the direction of $\vec v = \langle 3, 4\rangle$.`,
      choices: [
        { tex: String.raw`$\tfrac{28}{5}$`, correct: true },
        { tex: String.raw`$28$`, mistake: 'not-unit', why: '⟨3,4⟩ has length 5. Divide by it first.' },
        { tex: String.raw`$\tfrac{16}{5}$`, mistake: 'arith', why: 'f_y = x^2 + 3, which is 4 at (1,2). You dropped the 3.' },
        { tex: String.raw`$4\sqrt2$`, mistake: 'rate-vs-direction', why: 'That is |∇f|, the steepest rate. The question asks for the rate in one given direction.' },
        { tex: String.raw`$\left\langle \tfrac{12}{5}, \tfrac{16}{5}\right\rangle$`, mistake: 'units', why: 'A directional derivative is a number. Add the products.' },
      ],
      steps: [
        String.raw`$\nabla f = \langle 2xy,\ x^2 + 3\rangle = \langle 4, 4\rangle$ at $(1,2)$.`,
        String.raw`$|\vec v| = 5$, so $\vec u = \left\langle\tfrac35, \tfrac45\right\rangle$.`,
        String.raw`$D_{\vec u}f = 4\cdot\tfrac35 + 4\cdot\tfrac45 = \tfrac{28}{5}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Find the rate of change of $f(x, y) = x\,e^{y}$ at $P(2, 0)$ in the direction toward $Q(5, 4)$.`,
      choices: [
        { tex: String.raw`$\tfrac{11}{5}$`, correct: true },
        { tex: String.raw`$\tfrac{13}{\sqrt{41}}$`, mistake: 'point-as-direction', why: 'The direction is Q - P = ⟨3, 4⟩, not Q itself.' },
        { tex: String.raw`$11$`, mistake: 'not-unit', why: 'Divide ⟨3,4⟩ by its length 5.' },
        { tex: String.raw`$\sqrt5$`, mistake: 'rate-vs-direction', why: 'That is |∇f|, the largest possible rate, which happens only in the direction of ∇f.' },
        { tex: String.raw`$-\tfrac{11}{5}$`, mistake: 'sign', why: 'That is the rate from Q toward P. Toward Q means Q - P.' },
      ],
      steps: [
        String.raw`$\nabla f = \langle e^y,\ x e^y\rangle = \langle 1, 2\rangle$ at $(2, 0)$.`,
        String.raw`Direction $\overrightarrow{PQ} = \langle 5-2, 4-0\rangle = \langle 3, 4\rangle$, so $\vec u = \langle 3, 4\rangle/5$.`,
        String.raw`$D_{\vec u}f = \frac{1\cdot3 + 2\cdot4}{5} = \frac{11}{5}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`What is the maximum rate of change of $f(x, y, z) = x^2y + yz^2$ at $(1, -1, 2)$?`,
      choices: [
        { tex: String.raw`$3\sqrt5$`, correct: true },
        { tex: String.raw`$\langle -2, 5, -4\rangle$`, mistake: 'rate-vs-direction', why: 'That is the direction of steepest increase. The rate is its length.' },
        { tex: String.raw`$45$`, mistake: 'arith', why: 'That is |∇f|^2. Take the square root.' },
        { tex: String.raw`$-3\sqrt5$`, mistake: 'sign', why: 'That is the most negative rate (steepest descent). The maximum is positive.' },
        { tex: String.raw`$\sqrt{21}$`, mistake: 'arith', why: 'f_y = x^2 + z^2 = 5, not just x^2 = 1.' },
      ],
      steps: [
        String.raw`$\nabla f = \langle 2xy,\ x^2 + z^2,\ 2yz\rangle$.`,
        String.raw`At $(1,-1,2)$: $\nabla f = \langle -2, 5, -4\rangle$.`,
        String.raw`Max rate $= |\nabla f| = \sqrt{4 + 25 + 16} = \sqrt{45} = 3\sqrt5$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 1,
      prompt: String.raw`Find the unit vector in the direction in which $f(x, y) = 4 + x^2 + 3y^2$ decreases most rapidly at $(1, 1)$.`,
      choices: [
        { tex: String.raw`$\dfrac{1}{\sqrt{10}}\langle -1, -3\rangle$`, correct: true },
        { tex: String.raw`$\dfrac{1}{\sqrt{10}}\langle 1, 3\rangle$`, mistake: 'sign', why: 'That is the direction of fastest increase. Decrease is -∇f.' },
        { tex: String.raw`$\langle -2, -6\rangle$`, mistake: 'not-unit', why: 'Right direction, but the question asks for a unit vector.' },
        { tex: String.raw`$\dfrac{1}{\sqrt{10}}\langle 3, -1\rangle$`, mistake: 'tangent-vs-normal', why: 'That is perpendicular to ∇f: the direction of zero change.' },
        { tex: String.raw`$-\sqrt{40}$`, mistake: 'rate-vs-direction', why: 'That is the rate of fastest decrease, a number. The question asks for a direction.' },
      ],
      steps: [
        String.raw`$\nabla f = \langle 2x, 6y\rangle = \langle 2, 6\rangle$ at $(1,1)$.`,
        String.raw`Fastest decrease is along $-\nabla f = \langle -2, -6\rangle$, the same direction as $\langle -1, -3\rangle$.`,
        String.raw`Normalize: $|\langle -1,-3\rangle| = \sqrt{10}$, so $\vec u = \frac{1}{\sqrt{10}}\langle -1, -3\rangle$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Find the tangent line at $(1, 2)$ to the level curve of $f(x, y) = xy^2 + x^3$ that passes through that point.`,
      choices: [
        { tex: String.raw`$7x + 4y = 15$`, correct: true },
        { tex: String.raw`$4x - 7y = -10$`, mistake: 'tangent-vs-normal', why: 'That line runs along ∇f = ⟨7, 4⟩, so it crosses the level curve at a right angle. It is the normal line.' },
        { tex: String.raw`$7x + 4y = 0$`, mistake: 'setup', why: 'The line has to pass through (1, 2): 7(x - 1) + 4(y - 2) = 0.' },
        { tex: String.raw`$7x + 4y = 11$`, mistake: 'arith', why: 'Plug in (1, 2): 7(1) + 4(2) = 15.' },
        { tex: String.raw`$4x + 7y = 18$`, mistake: 'concept', why: 'You swapped the gradient components. The normal is ⟨f_x, f_y⟩ = ⟨7, 4⟩.' },
      ],
      steps: [
        String.raw`$\nabla f = \langle y^2 + 3x^2,\ 2xy\rangle = \langle 7, 4\rangle$ at $(1, 2)$.`,
        String.raw`$\nabla f$ is perpendicular to the level curve, so it is the normal vector of the tangent line.`,
        String.raw`$7(x - 1) + 4(y - 2) = 0$, so $7x + 4y = 15$ (slope $-\tfrac74$).`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`Suppose $\nabla f(P) = \langle 3, -4\rangle$. For which unit vectors $\vec u$ is $D_{\vec u}f(P) = 0$?`,
      choices: [
        { tex: String.raw`$\vec u = \pm\tfrac15\langle 4, 3\rangle$`, correct: true },
        { tex: String.raw`$\vec u = \pm\tfrac15\langle 3, -4\rangle$`, mistake: 'tangent-vs-normal', why: 'Those are along ∇f, where the rate is ±5, the largest possible size.' },
        { tex: String.raw`$\vec u = \pm\langle 4, 3\rangle$`, mistake: 'not-unit', why: 'Right directions, but these have length 5, not 1.' },
        { tex: String.raw`$\vec u = \pm\tfrac15\langle 4, -3\rangle$`, mistake: 'sign', why: '⟨3,-4⟩ · ⟨4,-3⟩ = 12 + 12 = 24, not 0.' },
        { tex: String.raw`No unit vector; only $\vec 0$ works`, mistake: 'concept', why: 'Any direction perpendicular to ∇f gives cos θ = 0, so D_u f = 0.' },
      ],
      steps: [
        String.raw`$D_{\vec u}f = |\nabla f|\cos\theta$ is 0 exactly when $\vec u \perp \nabla f$.`,
        String.raw`Swap the components and change one sign: $\langle 4, 3\rangle$. Check: $3\cdot4 + (-4)\cdot3 = 0$.`,
        String.raw`Normalize ($|\langle4,3\rangle| = 5$), and both directions along the line work: $\pm\frac15\langle4,3\rangle$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Find the directional derivative of $f(x, y, z) = x\,e^{yz}$ at $P(2, 0, 1)$ in the direction toward $Q(4, 1, 3)$.`,
      choices: [
        { tex: String.raw`$\tfrac43$`, correct: true },
        { tex: String.raw`$4$`, mistake: 'not-unit', why: '⟨2, 1, 2⟩ has length 3. Divide by it.' },
        { tex: String.raw`$\tfrac{6}{\sqrt{26}}$`, mistake: 'point-as-direction', why: 'The direction is Q - P = ⟨2, 1, 2⟩, not ⟨4, 1, 3⟩.' },
        { tex: String.raw`$\sqrt5$`, mistake: 'rate-vs-direction', why: 'That is |∇f|, the maximum rate. This direction is not along ∇f.' },
        { tex: String.raw`$1$`, mistake: 'arith', why: 'f_y = xz e^{yz}. You lost the factor x = 2.' },
      ],
      steps: [
        String.raw`$\nabla f = \langle e^{yz},\ xz\,e^{yz},\ xy\,e^{yz}\rangle$. At $(2,0,1)$: $\langle 1, 2, 0\rangle$.`,
        String.raw`$\overrightarrow{PQ} = \langle 2, 1, 2\rangle$, length $\sqrt{4+1+4} = 3$, so $\vec u = \tfrac13\langle 2,1,2\rangle$.`,
        String.raw`$D_{\vec u}f = \tfrac13(2 + 2 + 0) = \tfrac43$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: '0.5*x^2 + y^2', z: '0.5*x^2 + y^2' },
    { kind: 'surface', expr: 'x^2*y + x*y^2', z: 'x^2*y + x*y^2' },
  ],
};
