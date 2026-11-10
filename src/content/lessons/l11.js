export default {
  id: 11,
  title: 'Partial derivatives',
  section: '15.3',
  exam: 1,
  blurb: 'Differentiate in one variable at a time, read the result as a slope on the surface, and stack partials with Clairaut.',
  boiler: ['Partial Derivatives'],

  sections: [
    {
      id: 'idea',
      title: 'Freeze everything else',
      body: String.raw`For $y = f(x)$ the derivative $f'(a)$ is the slope of the tangent line, the rate $y$ changes as $x$ changes. With $z = f(x, y)$ there are two inputs, so ask one question at a time: **how fast does $f$ change if I move only in $x$?**

Hold $y$ fixed at $b$. Then $f(x, b)$ is an ordinary one-variable function of $x$, and its derivative is the **partial derivative with respect to $x$**:

$$f_x(a, b) = \frac{\partial f}{\partial x}(a,b) = \lim_{h\to0}\frac{f(a + h, b) - f(a, b)}{h}.$$

Likewise $f_y$ holds $x$ fixed and moves $y$:

$$f_y(a,b) = \lim_{h\to0}\frac{f(a, b + h) - f(a, b)}{h}.$$

**How to compute:** to find $f_x$, pretend $y$ is a number (say 7) and use every Calc I rule. To find $f_y$, pretend $x$ is a number.

Warm-up that shows the whole idea: $\frac{d}{dx}\big(\sin(8)\,x^3\big) = \sin(8)\cdot 3x^2$. The $\sin 8$ is a constant along for the ride. In $\frac{\partial}{\partial x}(x^3\sin y) = 3x^2\sin y$, the $\sin y$ plays exactly the same role.`,
    },
    {
      id: 'geometry',
      title: 'What the number means on the surface',
      body: String.raw`Slice the surface $z = f(x, y)$ with the vertical plane $y = b$. The cut is a curve, $z = f(x, b)$, sitting above the line $y = b$. The slope of that curve at $x = a$ is $f_x(a, b)$.

So:

- $f_x(a,b)$ = slope of the surface walking in the **$+x$ direction** from $(a, b)$.
- $f_y(a,b)$ = slope walking in the **$+y$ direction**.

On a hill, $f_x > 0$ means walking east takes you uphill. $f_x = 0$ means the east-west direction is flat at that spot.

Units help: if $f$ is temperature in degrees and $x$ is in meters, $f_x$ is degrees per meter in the $x$ direction.`,
    },
    {
      id: 'examples',
      title: 'Computing them: the usual rules, one variable at a time',
      body: String.raw`**Product of separate pieces.** $f = x^3\sin y$: $f_x = 3x^2\sin y$, $f_y = x^3\cos y$.

**Chain rule.** $f = y^2x^3 + \sin(xy)$. The inner function $xy$ has $x$-derivative $y$ and $y$-derivative $x$:

$$f_x = 3x^2y^2 + y\cos(xy), \qquad f_y = 2yx^3 + x\cos(xy).$$

**At a point (from lecture).** $f = \sin\!\left(\frac{x}{1+y}\right)$ at $\left(\frac\pi2, 1\right)$.

- $f_x = \cos\!\left(\frac{x}{1+y}\right)\cdot\frac{1}{1+y}$. At the point: $\cos\frac\pi4\cdot\frac12 = \frac{\sqrt2}{4}$.
- $f_y = \cos\!\left(\frac{x}{1+y}\right)\cdot\frac{-x}{(1+y)^2}$ (quotient rule with the top constant). At the point: $\frac{\sqrt2}{2}\cdot\frac{-\pi/2}{4} = -\frac{\sqrt2\,\pi}{16}$.

Differentiate first, plug in last.

**Partial of an integral (tested on Exam 1).** If $f(x,y) = \int_{a(x,y)}^{b(x,y)} g(t)\,dt$, the Fundamental Theorem plus the chain rule give

$$f_y = g(b)\,\frac{\partial b}{\partial y} - g(a)\,\frac{\partial a}{\partial y}.$$

For $\int_{x+y}^{x-y} g(t)\,dt$: $f_y = g(x-y)(-1) - g(x+y)(1) = -g(x-y) - g(x+y)$.`,
    },
    {
      id: 'higher',
      title: 'Second partials and Clairaut',
      body: String.raw`Partials are functions too, so differentiate again. There are four second partials:

$$f_{xx} = (f_x)_x,\quad f_{xy} = (f_x)_y,\quad f_{yx} = (f_y)_x,\quad f_{yy} = (f_y)_y.$$

**Order in the notation.** Subscripts read **left to right**: $f_{xy}$ means $x$ first, then $y$. The fraction form reads **right to left**: $\frac{\partial^2 f}{\partial y\,\partial x}$ also means $x$ first.

**Example.** $f = y^2x^3 + \sin(xy)$, with $f_x = 3x^2y^2 + y\cos(xy)$ and $f_y = 2yx^3 + x\cos(xy)$.

- $f_{xx} = 6xy^2 - y^2\sin(xy)$
- $f_{xy} = 6x^2y + \cos(xy) - xy\sin(xy)$ (product rule on $y\cos(xy)$)
- $f_{yx} = 6x^2y + \cos(xy) - xy\sin(xy)$
- $f_{yy} = 2x^3 - x^2\sin(xy)$

The mixed ones match. That is not luck.

**Clairaut's Theorem.** If $f_{xy}$ and $f_{yx}$ are continuous, then $f_{xy} = f_{yx}$. The same holds for any number of variables and any order: for $f = xy^2z^3$, $f_{xyz} = f_{yzx} = f_{zyx} = 6yz^2$. So pick whichever order makes the work shortest.`,
    },
    {
      id: 'differentiable',
      title: 'Partials existing is not enough',
      body: String.raw`In Calc I, having a derivative meant the function was smooth there, and so continuous. In two variables, $f_x$ and $f_y$ only look along **two** directions. The function can misbehave along every other one.

**Classic example.** $f = \frac{3xy}{x^2+y^2}$ with $f(0,0) = 0$.

- On the $x$-axis, $f(x, 0) = 0$, so $f_x(0,0) = 0$. Same for $f_y(0,0) = 0$. Both partials exist.
- Along $y = mx$: $f = \frac{3m}{1+m^2}$, which depends on $m$. So the limit at the origin does not exist and $f$ is **not even continuous** there.

The fix is a stronger condition. **Theorem:** if $f_x$ and $f_y$ exist near $(a, b)$ and are continuous at $(a, b)$, then $f$ is **differentiable** at $(a, b)$, and differentiable implies continuous.

$$\text{continuous partials} \implies \text{differentiable} \implies \text{continuous}.$$

Partials merely existing gives none of these.`,
    },
  ],

  formulas: [
    { label: 'Partial in x', tex: String.raw`f_x(a,b) = \lim_{h\to0}\frac{f(a+h,b)-f(a,b)}{h}` },
    { label: 'Partial in y', tex: String.raw`f_y(a,b) = \lim_{h\to0}\frac{f(a,b+h)-f(a,b)}{h}` },
    { label: 'Notation order', tex: String.raw`f_{xy} = (f_x)_y = \frac{\partial^2 f}{\partial y\,\partial x}` },
    { label: 'Clairaut', tex: String.raw`f_{xy} = f_{yx} \ \text{ when both are continuous}` },
    { label: 'Partial of an integral', tex: String.raw`\frac{\partial}{\partial y}\int_{a}^{b} g(t)\,dt = g(b)\,b_y - g(a)\,a_y` },
  ],

  mistakes: [
    {
      id: 'not-constant',
      title: 'Not treating the other variable as a constant',
      wrong: String.raw`$\frac{\partial}{\partial x}(y^3) = 3y^2$`,
      right: String.raw`$\frac{\partial}{\partial x}(y^3) = 0$: with $y$ frozen, $y^3$ is a constant.`,
      why: 'When you take f_x, every y is a number. A term with no x in it differentiates to 0.',
    },
    {
      id: 'missing-inner',
      title: 'Forgetting the inner derivative',
      wrong: String.raw`$\frac{\partial}{\partial x}\sin(xy) = \cos(xy)$`,
      right: String.raw`$\frac{\partial}{\partial x}\sin(xy) = y\cos(xy)$`,
      why: 'The chain rule still applies. The inner function xy has x-derivative y.',
    },
    {
      id: 'wrong-partial',
      title: 'Computing the wrong partial or the wrong order',
      wrong: String.raw`Asked for $f_x$, computing $f_y$; or reading $\frac{\partial^2 f}{\partial y\,\partial x}$ as "$y$ first"`,
      right: String.raw`Subscripts go left to right, fractions go right to left. Both $f_{xy}$ and $\frac{\partial^2 f}{\partial y\,\partial x}$ mean $x$ first.`,
      why: 'Exam answer lists always include the other partial. Circle the variable before you start.',
    },
    {
      id: 'partials-imply-diff',
      title: 'Thinking partials existing means differentiable',
      wrong: String.raw`$f_x(0,0)$ and $f_y(0,0)$ exist, so $f$ is differentiable (and continuous) at the origin`,
      right: 'You need the partials to be continuous near the point. Otherwise f can even be discontinuous.',
      why: 'Partials only check two directions. A limit along y = mx can still fail.',
    },
    {
      id: 'ftc-chain',
      title: 'Dropping the chain factor when differentiating an integral',
      wrong: String.raw`$\frac{\partial}{\partial x}\int_x^{xy^2} g(t)\,dt = g(xy^2) - g(x)$`,
      right: String.raw`$= y^2 g(xy^2) - g(x)$`,
      why: 'Each limit gets multiplied by its own partial derivative: the upper limit xy^2 has x-derivative y^2.',
    },
  ],

  hook: 'Partial means "freeze everything else": f_x is the slope you feel walking due east.',

  scene: {
    view: { range: 2.5, z: [0, 4.5] },
    camera: [6, -5, 4],
    layers: [
      { id: 'surf', kind: 'surface', z: '4 - 0.5*x^2 - 0.25*y^2', colormap: 'terrain', opacity: 0.85 },
      { id: 'planeY', kind: 'plane', normal: [0, 1, 0], point: [0, 1, 2], size: 2.5 },
      { id: 'traceX', kind: 'curveOnSurface', of: 'surf', x: 't', y: '1', t: [-2.5, 2.5], color: 'road' },
      { id: 'tanX', kind: 'curve', x: '1 + t', y: '1', z: '3.25 - t', t: [-1, 1], color: 'ink' },
      { id: 'planeX', kind: 'plane', normal: [1, 0, 0], point: [1, 0, 2], size: 2.5 },
      { id: 'traceY', kind: 'curveOnSurface', of: 'surf', x: '1', y: 't', t: [-2.5, 2.5], color: 'water' },
      { id: 'tanY', kind: 'curve', x: '1', y: '1 + t', z: '3.25 - 0.5*t', t: [-1, 1], color: 'ink' },
      { id: 'P', kind: 'point', at: [1, 1, 3.25], label: 'P(1, 1, 3.25)' },
    ],
    steps: [
      { label: 'Start', show: ['surf', 'P'], caption: String.raw`The surface $z = 4 - \tfrac12x^2 - \tfrac14y^2$ and the point $P$ above $(1, 1)$.` },
      { label: 'Freeze y', show: ['surf', 'planeY', 'traceX', 'P'], caption: String.raw`Freeze $y = 1$: the plane $y = 1$ cuts the surface in a curve, $z = 3.75 - \tfrac12x^2$. Now there is only one variable.` },
      { label: 'Slope f_x', show: ['surf', 'traceX', 'tanX', 'P'], caption: String.raw`The slope of that curve at $x = 1$ is $f_x(1,1) = -x = -1$. Walking in $+x$ from $P$, you go down 1 unit per unit.` },
      { label: 'Freeze x', show: ['surf', 'planeX', 'traceY', 'P'], caption: String.raw`Freeze $x = 1$ instead: the plane $x = 1$ gives a different curve, this time running in the $y$ direction.` },
      { label: 'Slope f_y', show: ['surf', 'traceY', 'tanY', 'P'], caption: String.raw`Its slope is $f_y(1,1) = -\tfrac12y = -\tfrac12$: gentler, since this hill is wider in $y$.` },
      { label: 'Both', show: ['surf', 'traceX', 'traceY', 'tanX', 'tanY', 'P'], caption: String.raw`Two partials, two slopes, one in each axis direction. Lesson 13 gets the slope in every other direction from just these two numbers.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Let $f(x, y) = x^3y^2 - 4xy + y^3$. Find $f_x(1, 2)$.`,
      choices: [
        { tex: String.raw`$4$`, correct: true },
        { tex: String.raw`$16$`, mistake: 'not-constant', why: 'You differentiated y^3 as 3y^2. With y frozen, y^3 is a constant and its x-derivative is 0.' },
        { tex: String.raw`$12$`, mistake: 'wrong-partial', why: 'That is f_y(1,2) = 2x^3y - 4x + 3y^2.' },
        { tex: String.raw`$20$`, mistake: 'sign', why: 'The -4xy term gives -4y, not +4y.' },
        { tex: String.raw`$-2$`, mistake: 'arith', why: 'y^2 stays y^2: 3x^2y^2 = 3(1)(4) = 12, not 6.' },
      ],
      steps: [
        String.raw`Treat $y$ as a constant: $f_x = 3x^2y^2 - 4y + 0$.`,
        String.raw`At $(1, 2)$: $3(1)(4) - 4(2) = 12 - 8 = 4$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Let $f(x, y) = e^{xy^2}$. Find $f_y$.`,
      choices: [
        { tex: String.raw`$2xy\,e^{xy^2}$`, correct: true },
        { tex: String.raw`$e^{xy^2}$`, mistake: 'missing-inner', why: 'The chain rule multiplies by the y-derivative of the exponent xy^2, which is 2xy.' },
        { tex: String.raw`$y^2e^{xy^2}$`, mistake: 'wrong-partial', why: 'That is f_x. The y-derivative of xy^2 is 2xy.' },
        { tex: String.raw`$2y\,e^{xy^2}$`, mistake: 'not-constant', why: 'x is a constant multiplier in xy^2 and must stay: the inner derivative is 2xy.' },
        { tex: String.raw`$xy^2e^{xy^2 - 1}$`, mistake: 'concept', why: 'The power rule is for x^n, not e^u. The derivative of e^u is e^u·u.' },
      ],
      steps: [
        String.raw`Outer function $e^u$, inner $u = xy^2$.`,
        String.raw`With $x$ frozen, $u_y = 2xy$.`,
        String.raw`$f_y = e^{xy^2}\cdot 2xy$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Let $f(x, y) = \cos\!\left(\dfrac{y}{1+x}\right)$. Find $f_x(1, \pi)$.`,
      choices: [
        { tex: String.raw`$\dfrac{\pi}{4}$`, correct: true },
        { tex: String.raw`$-\dfrac{\pi}{4}$`, mistake: 'sign', why: 'Two minus signs cancel: -sin(u) times u_x = -y/(1+x)^2.' },
        { tex: String.raw`$-\dfrac{1}{2}$`, mistake: 'wrong-partial', why: 'That is f_y(1, π) = -sin(π/2)·1/2.' },
        { tex: String.raw`$-1$`, mistake: 'missing-inner', why: 'You stopped at -sin(y/(1+x)) and forgot to multiply by the inner x-derivative.' },
        { tex: String.raw`$\dfrac{\pi}{2}$`, mistake: 'arith', why: 'The inner derivative is -y/(1+x)^2. At x = 1 the bottom is 4, not 2.' },
      ],
      steps: [
        String.raw`Inner function $u = \frac{y}{1+x} = y(1+x)^{-1}$, so $u_x = -\frac{y}{(1+x)^2}$.`,
        String.raw`$f_x = -\sin(u)\cdot u_x = \sin\!\left(\frac{y}{1+x}\right)\frac{y}{(1+x)^2}$.`,
        String.raw`At $(1,\pi)$: $u = \frac\pi2$, so $f_x = \sin\frac\pi2\cdot\frac{\pi}{4} = \frac\pi4$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Let $f(x, y) = x^3y^2 + y\,e^x$. Find $f_{xy}$.`,
      choices: [
        { tex: String.raw`$6x^2y + e^x$`, correct: true },
        { tex: String.raw`$6xy^2 + y\,e^x$`, mistake: 'wrong-partial', why: 'That is f_xx: you differentiated in x twice.' },
        { tex: String.raw`$6x^2y$`, mistake: 'not-constant', why: 'f_x = 3x^2y^2 + ye^x. The second term has a y in it, so its y-derivative is e^x, not 0.' },
        { tex: String.raw`$2x^3$`, mistake: 'wrong-partial', why: 'That is f_yy.' },
        { tex: String.raw`$6x^2y + y\,e^x$`, mistake: 'arith', why: 'The y-derivative of y e^x is e^x: the y goes away.' },
      ],
      steps: [
        String.raw`$f_x = 3x^2y^2 + y\,e^x$.`,
        String.raw`Now differentiate that in $y$: $f_{xy} = 6x^2y + e^x$.`,
        String.raw`Check with Clairaut: $f_y = 2x^3y + e^x$, and $f_{yx} = 6x^2y + e^x$. Same.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Let $f(x, y, z) = x^2yz^3 + y\,e^{xz}$. Find $f_{xyz}(1, 1, 1)$.`,
      choices: [
        { tex: String.raw`$6 + 2e$`, correct: true },
        { tex: String.raw`$6 + e$`, mistake: 'missing-inner', why: 'z e^{xz} needs the product rule in z: e^{xz} + xz e^{xz}. You kept only one piece.' },
        { tex: String.raw`$6$`, mistake: 'not-constant', why: 'The y e^{xz} term has x, y and z in it, so it survives all three derivatives.' },
        { tex: String.raw`$2e$`, mistake: 'arith', why: 'You lost 6xz^2, which comes from the x^2yz^3 term.' },
        { tex: String.raw`$12 + 2e$`, mistake: 'arith', why: 'x^2 gives 2x, and z^3 gives 3z^2: 2·3 = 6, not 12.' },
      ],
      steps: [
        String.raw`Order does not matter (Clairaut), so start with $y$, which just strips off the $y$ factors: $f_y = x^2z^3 + e^{xz}$.`,
        String.raw`Then $x$: $f_{yx} = 2xz^3 + z\,e^{xz}$.`,
        String.raw`Then $z$ (product rule on $z\,e^{xz}$): $f_{yxz} = 6xz^2 + e^{xz} + xz\,e^{xz}$.`,
        String.raw`At $(1,1,1)$: $6 + e + e = 6 + 2e$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 3,
      prompt: String.raw`Let $f(x,y) = \dfrac{2xy}{x^2+y^2}$ for $(x,y)\ne(0,0)$ and $f(0,0) = 0$. Which statement is true?`,
      choices: [
        { tex: String.raw`$f_x(0,0) = f_y(0,0) = 0$, but $f$ is not continuous at the origin, so it is not differentiable there`, correct: true },
        { tex: String.raw`$f$ is differentiable at the origin because both partials exist there`, mistake: 'partials-imply-diff', why: 'Existing partials are not enough. Along y = x, f = 1, so f is not even continuous at the origin.' },
        { tex: String.raw`$f_x(0,0)$ does not exist because $f$ is not continuous at the origin`, mistake: 'concept', why: 'On the x-axis f is identically 0, so the limit defining f_x(0,0) is 0/h = 0. Partials can exist at a discontinuity.' },
        { tex: String.raw`$f$ is continuous at the origin because $f(0,0) = 0$ is defined`, mistake: 'concept', why: 'Being defined is only the first condition. The limit at the origin does not exist.' },
        { tex: String.raw`$f_x(0,0) = 1$`, mistake: 'arith', why: 'Use the definition with y = 0: f(h, 0) = 0 for every h, so the difference quotient is 0.' },
      ],
      steps: [
        String.raw`$f_x(0,0) = \lim_{h\to0}\frac{f(h,0) - f(0,0)}{h} = \lim_{h\to0}\frac{0 - 0}{h} = 0$. By symmetry $f_y(0,0) = 0$.`,
        String.raw`Along $y = mx$: $f = \frac{2m}{1+m^2}$. That depends on $m$, so the limit at the origin does not exist.`,
        String.raw`No limit means not continuous, and differentiable functions are continuous. So $f$ is not differentiable at the origin.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Let $g$ be continuous and $f(x, y) = \displaystyle\int_{x}^{xy^2} g(t)\,dt$. Find $f_x$.`,
      choices: [
        { tex: String.raw`$y^2\,g(xy^2) - g(x)$`, correct: true },
        { tex: String.raw`$g(xy^2) - g(x)$`, mistake: 'ftc-chain', why: 'The upper limit xy^2 has x-derivative y^2. That factor multiplies g(xy^2).' },
        { tex: String.raw`$y^2\,g(xy^2) + g(x)$`, mistake: 'sign', why: 'The lower limit is subtracted: F(b) - F(a).' },
        { tex: String.raw`$2xy\,g(xy^2)$`, mistake: 'wrong-partial', why: 'That is f_y. The lower limit x has no y in it, so it drops out only for f_y.' },
        { tex: String.raw`$y^2\,g(xy^2)$`, mistake: 'ftc-chain', why: 'The lower limit also depends on x. It contributes -g(x)·1.' },
      ],
      steps: [
        String.raw`If $G' = g$, then $f = G(xy^2) - G(x)$.`,
        String.raw`Differentiate in $x$ with $y$ frozen: $f_x = g(xy^2)\cdot y^2 - g(x)\cdot 1$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: '4 - 0.5*x^2 - 0.25*y^2', z: '4 - 0.5*x^2 - 0.25*y^2' },
    { kind: 'surface', expr: 'y^2*x^3/8 + sin(x*y)', z: 'y^2*x^3/8 + sin(x*y)' },
  ],
};
