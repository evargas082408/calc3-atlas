export default {
  id: 12,
  title: 'The chain rule',
  section: '15.4',
  exam: 1,
  blurb: 'Differentiate through a chain of dependencies with a tree diagram, and get implicit derivatives from -F_x/F_z.',
  boiler: ['Chain Rule', 'Implicit partial diff'],

  sections: [
    {
      id: 'why',
      title: 'Why there is more than one term',
      body: String.raw`In Calc I, if $h(t) = f(g(t))$ then $h'(t) = f'(g(t))\,g'(t)$: one chain, one product. With $h = e^{3t^2}$, that is $e^{3t^2}\cdot 6t$.

Now let $z = f(x, y)$, where $x$ and $y$ both depend on $t$. Think of walking along a path $\big(x(t), y(t)\big)$ on the map while your elevation is $z$. Your height changes for **two reasons at once**: you are moving in $x$, and you are moving in $y$. Each reason contributes (slope in that direction) times (how fast you move that way), and the contributions add:

$$\frac{dz}{dt} = \frac{\partial z}{\partial x}\frac{dx}{dt} + \frac{\partial z}{\partial y}\frac{dy}{dt}.$$

Notice the symbols: $\partial$ for $z$, which has two inputs, and plain $d$ for $x$ and $y$, which only depend on $t$.`,
    },
    {
      id: 'tree',
      title: 'The tree diagram',
      body: String.raw`Draw the dependent variable at the top, the middle variables below it, and the final variables at the bottom. Label each branch with its derivative.

**Rule: multiply down each path, add across paths.** One term for every path from the top to the variable you are differentiating with respect to.

**Example.** $z = x^2y + 3xy^4$, $x = \sin t$, $y = \cos t$. Find $\frac{dz}{dt}$ at $t = 0$.

Tree: $z \to x \to t$ and $z \to y \to t$. Two paths, two terms:

$$\frac{dz}{dt} = (2xy + 3y^4)\cos t + (x^2 + 12xy^3)(-\sin t).$$

At $t = 0$, first find where you are: $x = \sin 0 = 0$, $y = \cos 0 = 1$. Then plug everything in: $(0 + 3)(1) + (0)(0) = 3$.

**Two final variables.** If $z = f(x, y)$ with $x = x(s,t)$ and $y = y(s,t)$, every middle variable has two branches down. For $\partial z/\partial s$, follow only the paths that end at $s$:

$$\frac{\partial z}{\partial s} = z_x x_s + z_y y_s, \qquad \frac{\partial z}{\partial t} = z_x x_t + z_y y_t.$$

Example: $z = e^x\sin y$, $x = st^2$, $y = s^2t$. Then $z_s = (e^x\sin y)(t^2) + (e^x\cos y)(2st)$ and $z_t = (e^x\sin y)(2st) + (e^x\cos y)(s^2)$.`,
    },
    {
      id: 'bigger',
      title: 'Bigger trees, missing branches',
      body: String.raw`The rule does not change for longer chains or more variables. Count paths.

**Three middle variables.** $f = xy^2 + z^3$ with $x = \cos u + t^3$, $y = \sin t + u^3$, $z = t^2$:

$$\frac{\partial f}{\partial u} = y^2(-\sin u) + 2xy(3u^2) + 3z^2\cdot 0, \qquad \frac{\partial f}{\partial t} = y^2(3t^2) + 2xy\cos t + 3z^2(2t).$$

$z$ does not depend on $u$, so its branch contributes 0 to $\partial f/\partial u$. Draw the tree anyway; it stops you from forgetting the branches that do count.

**Uneven trees.** If $w = f(x, y, z, t)$ with $x, y$ depending on $(u, v)$ and $z, t$ depending on $(u, v, p)$, then $\partial w/\partial p$ has only two terms, $w_z z_p + w_t t_p$, because only $z$ and $t$ reach $p$.

**Two levels deep.** If $z = f(x, y)$, $x, y$ depend on $(s, t)$, and $s, t$ depend on $(u, v)$, there are four paths from $z$ down to $u$, each a product of three derivatives:

$$z_u = z_x x_s s_u + z_x x_t t_u + z_y y_s s_u + z_y y_t t_u.$$`,
    },
    {
      id: 'implicit',
      title: 'Implicit differentiation for free',
      body: String.raw`Suppose $F(x, y) = 0$ defines $y$ as a function of $x$. Then $F(x, y(x)) = 0$ for every $x$. Differentiate with the tree ($F \to x$ directly, and $F \to y \to x$):

$$F_x + F_y\frac{dy}{dx} = 0 \quad\Longrightarrow\quad \frac{dy}{dx} = -\frac{F_x}{F_y}.$$

**Example.** $x^3 + y^3 - 6xy = 0$. $F_x = 3x^2 - 6y$, $F_y = 3y^2 - 6x$, so $\frac{dy}{dx} = -\frac{3x^2 - 6y}{3y^2 - 6x} = \frac{2y - x^2}{y^2 - 2x}$. Same answer as the Calc I method, with no solving for $y'$.

**Three variables.** If $F(x, y, z) = 0$ defines $z$ as a function of $x$ and $y$:

$$\frac{\partial z}{\partial x} = -\frac{F_x}{F_z}, \qquad \frac{\partial z}{\partial y} = -\frac{F_y}{F_z}.$$

The bottom is always $F$ differentiated in the variable you are solving **for** ($z$). The top is the variable you are differentiating **by**. Move everything to one side first so the equation reads $F = 0$.

**Example.** $xyz = x^2y^2 + y^2z$. Write $F = xyz - x^2y^2 - y^2z$. Then $F_x = yz - 2xy^2$, $F_z = xy - 2y^2z$, and

$$\frac{\partial z}{\partial x} = -\frac{yz - 2xy^2}{xy - 2y^2z}.$$`,
    },
    {
      id: 'example',
      title: 'Worked example at a point',
      body: String.raw`Find $\frac{\partial z}{\partial x}$ at $(2, 0, 1)$ if $x^2z + 3\cos(y)\,z^2 + 2xyz = 7$.

1. Check the point is on the surface: $4(1) + 3(1)(1) + 0 = 7$. Yes.
2. $F = x^2z + 3\cos(y)z^2 + 2xyz - 7$.
3. $F_x = 2xz + 2yz$, $F_z = x^2 + 6\cos(y)z + 2xy$.
4. At $(2, 0, 1)$: $F_x = 4$, $F_z = 4 + 6 + 0 = 10$.
5. $\frac{\partial z}{\partial x} = -\frac{4}{10} = -\frac25$.

A note on the lecture notes: this example appears there with right-hand side 11 and a last line of $-\tfrac{12}{14}$. The point $(2, 0, 1)$ only lies on the surface when the right side is 7, and the computation in the notes gives $-\tfrac{4}{10} = -\tfrac25$. Trust $-\tfrac25$.

**Exam habit:** when a problem gives you only $(x, y)$, plug into the original equation first to find $z$. (Exam 1 review: $\cos(xyz) = x + 3y + 2z$ at $(0,1)$ gives $1 = 3 + 2z$, so $z = -1$.)`,
    },
  ],

  formulas: [
    { label: 'One parameter', tex: String.raw`\frac{dz}{dt} = \frac{\partial z}{\partial x}\frac{dx}{dt} + \frac{\partial z}{\partial y}\frac{dy}{dt}` },
    { label: 'Two parameters', tex: String.raw`\frac{\partial z}{\partial s} = \frac{\partial z}{\partial x}\frac{\partial x}{\partial s} + \frac{\partial z}{\partial y}\frac{\partial y}{\partial s}` },
    { label: 'Implicit, two variables', tex: String.raw`\frac{dy}{dx} = -\frac{F_x}{F_y}` },
    { label: 'Implicit, three variables', tex: String.raw`\frac{\partial z}{\partial x} = -\frac{F_x}{F_z},\qquad \frac{\partial z}{\partial y} = -\frac{F_y}{F_z}` },
  ],

  mistakes: [
    {
      id: 'missing-branch',
      title: 'Missing a branch of the tree',
      wrong: String.raw`$f = f(x,y,z)$, all depending on $u$: writing $f_u = f_x x_u + f_y y_u$`,
      right: String.raw`$f_u = f_x x_u + f_y y_u + f_z z_u$`,
      why: 'Every path from the top to the bottom variable is one term. Draw the tree and count the paths before writing anything.',
    },
    {
      id: 'eval-point',
      title: 'Plugging the parameter value into x and y',
      wrong: String.raw`At $t = 1$, evaluating $z_x$ at $(x, y) = (1, 1)$`,
      right: String.raw`First compute $x(1)$ and $y(1)$, then evaluate $z_x$ and $z_y$ there.`,
      why: 't = 1 tells you when, not where. The partials of z need the actual point (x(t), y(t)).',
    },
    {
      id: 'implicit-sign',
      title: 'Dropping the minus sign',
      wrong: String.raw`$\frac{\partial z}{\partial x} = \frac{F_x}{F_z}$`,
      right: String.raw`$\frac{\partial z}{\partial x} = -\frac{F_x}{F_z}$`,
      why: 'It comes from F_x + F_z z_x = 0: solving moves F_x to the other side.',
    },
    {
      id: 'implicit-flip',
      title: 'Putting the wrong partial on the bottom',
      wrong: String.raw`$\frac{\partial z}{\partial y} = -\frac{F_z}{F_y}$ or $-\frac{F_y}{F_x}$`,
      right: String.raw`$\frac{\partial z}{\partial y} = -\frac{F_y}{F_z}$`,
      why: 'The bottom is always the variable being solved for (z). The top is the variable you differentiate by.',
    },
  ],

  hook: 'Multiply down each branch, add across the branches.',

  scene: {
    view: { range: 2.5, z: [-3.5, 4] },
    camera: [6, -6, 5],
    layers: [
      { id: 'surf', kind: 'surface', z: '0.4*(x^2 - 3*y^2) + 2', domain: { r: [0, 2.4], theta: [0, '2*pi'] }, colormap: 'textbook', opacity: 0.8 },
      { id: 'floorPath', kind: 'curve', x: '2*cos(t)', y: '2*sin(t)', z: '0', t: [0, '2*pi'], color: 'ink', arrow: true },
      { id: 'lifted', kind: 'curveOnSurface', of: 'surf', x: '2*cos(t)', y: '2*sin(t)', t: [0, '2*pi'], color: 'road' },
      { id: 'here', kind: 'point', at: [1.414, 1.414, 0.4], label: 't = π/4' },
      { id: 'herefloor', kind: 'point', at: [1.414, 1.414, 0], label: '(x(t), y(t))' },
      { id: 'vel', kind: 'vector', from: [1.414, 1.414, 0], to: [0.564, 2.264, 0], color: 'ink', label: 'r′(t)' },
      { id: 'vx', kind: 'vector', from: [1.414, 1.414, 0], to: [0.564, 1.414, 0], color: 'road', label: 'dx/dt' },
      { id: 'vy', kind: 'vector', from: [1.414, 1.414, 0], to: [1.414, 2.264, 0], color: 'water', label: 'dy/dt' },
    ],
    steps: [
      { label: 'Start', show: ['surf'], caption: String.raw`The surface $z = 0.4(x^2 - 3y^2) + 2$: a saddle. Height depends on both $x$ and $y$.` },
      { label: 'Path', show: ['surf', 'floorPath'], caption: String.raw`On the floor, walk around the circle $x = 2\cos t$, $y = 2\sin t$. Now $x$ and $y$ both depend on time $t$.` },
      { label: 'Lifted', show: ['surf', 'floorPath', 'lifted'], caption: String.raw`Your height $z(t)$ rides up and down the saddle as you walk. The chain rule finds how fast it changes.` },
      { label: 'Two pushes', show: ['surf', 'lifted', 'here', 'herefloor', 'vx', 'vy'], caption: String.raw`At $t = \pi/4$ you move in $x$ (red) and in $y$ (blue) at once. Each motion changes $z$ by (slope in that direction) times (speed in that direction).` },
      { label: 'Add', show: ['surf', 'lifted', 'here', 'herefloor', 'vel', 'vx', 'vy'], caption: String.raw`Add them: $z_x x' + z_y y' = (-1.6) + (-4.8) = -6.4$. Check: $z(t) = 2 + 1.6\cos^2 t - 4.8\sin^2 t$ gives $z'(\pi/4) = -6.4$ too.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Let $z = x^2y + 3y^2$ with $x = t^2 + 1$ and $y = t^3$. Find $\dfrac{dz}{dt}$ at $t = 1$.`,
      choices: [
        { tex: String.raw`$38$`, correct: true },
        { tex: String.raw`$8$`, mistake: 'missing-branch', why: 'That is only the z → x → t path. y also depends on t.' },
        { tex: String.raw`$30$`, mistake: 'missing-branch', why: 'That is only the z → y → t path. x also depends on t.' },
        { tex: String.raw`$25$`, mistake: 'eval-point', why: 'You evaluated z_x and z_y at (1, 1). At t = 1 the point is (x, y) = (2, 1).' },
        { tex: String.raw`$14$`, mistake: 'concept', why: 'You added z_x + z_y = 4 + 10 without multiplying by dx/dt and dy/dt.' },
      ],
      steps: [
        String.raw`At $t = 1$: $x = 2$, $y = 1$.`,
        String.raw`$z_x = 2xy = 4$, $z_y = x^2 + 6y = 10$.`,
        String.raw`$\frac{dx}{dt} = 2t = 2$, $\frac{dy}{dt} = 3t^2 = 3$.`,
        String.raw`$\frac{dz}{dt} = 4(2) + 10(3) = 38$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Let $z = x^2y$ with $x = s + t$ and $y = st$. Find $\dfrac{\partial z}{\partial t}$ at $(s, t) = (1, 2)$.`,
      choices: [
        { tex: String.raw`$21$`, correct: true },
        { tex: String.raw`$30$`, mistake: 'concept', why: 'That is ∂z/∂s, which uses x_s = 1 and y_s = t = 2.' },
        { tex: String.raw`$12$`, mistake: 'missing-branch', why: 'You kept only the path through x. y = st also depends on t.' },
        { tex: String.raw`$5$`, mistake: 'eval-point', why: 'You evaluated z_x, z_y at (x, y) = (1, 2). The point is x = s + t = 3, y = st = 2.' },
        { tex: String.raw`$3$`, mistake: 'sign', why: 'Both branches add. Nothing here has a minus sign.' },
      ],
      steps: [
        String.raw`At $(s,t) = (1,2)$: $x = 3$, $y = 2$.`,
        String.raw`$z_x = 2xy = 12$, $z_y = x^2 = 9$.`,
        String.raw`$x_t = 1$, $y_t = s = 1$.`,
        String.raw`$\frac{\partial z}{\partial t} = 12(1) + 9(1) = 21$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Let $w = f(x, y, z)$ where $x = x(s, t)$, $y = y(s)$ and $z = z(s, t)$. Which formula gives $\dfrac{\partial w}{\partial t}$?`,
      choices: [
        { tex: String.raw`$\dfrac{\partial w}{\partial x}\dfrac{\partial x}{\partial t} + \dfrac{\partial w}{\partial z}\dfrac{\partial z}{\partial t}$`, correct: true },
        { tex: String.raw`$\dfrac{\partial w}{\partial x}\dfrac{\partial x}{\partial t} + \dfrac{\partial w}{\partial y}\dfrac{d y}{d s} + \dfrac{\partial w}{\partial z}\dfrac{\partial z}{\partial t}$`, mistake: 'concept', why: 'y depends only on s, so there is no path from y down to t. The y term belongs in the formula for the s-derivative.' },
        { tex: String.raw`$\dfrac{\partial w}{\partial x}\dfrac{\partial x}{\partial t}$`, mistake: 'missing-branch', why: 'z also depends on t, so the path w → z → t counts.' },
        { tex: String.raw`$\dfrac{\partial w}{\partial x}\dfrac{\partial x}{\partial s} + \dfrac{\partial w}{\partial z}\dfrac{\partial z}{\partial s}$`, mistake: 'concept', why: 'Those paths end at s, not t.' },
        { tex: String.raw`$\dfrac{\partial w}{\partial x}\dfrac{\partial x}{\partial t}\cdot\dfrac{\partial w}{\partial z}\dfrac{\partial z}{\partial t}$`, mistake: 'concept', why: 'Multiply along a path, but add different paths.' },
      ],
      steps: [
        String.raw`Tree: $w$ branches to $x, y, z$. $x$ and $z$ branch to $s$ and $t$; $y$ branches only to $s$.`,
        String.raw`Paths from $w$ to $t$: $w\to x\to t$ and $w\to z\to t$.`,
        String.raw`Two paths, two terms: $w_x x_t + w_z z_t$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 1,
      prompt: String.raw`The curve $x^3 + xy^2 + y^3 = 3$ passes through $(1, 1)$. Find $\dfrac{dy}{dx}$ there.`,
      choices: [
        { tex: String.raw`$-\tfrac45$`, correct: true },
        { tex: String.raw`$\tfrac45$`, mistake: 'implicit-sign', why: 'dy/dx = -F_x/F_y. You dropped the minus.' },
        { tex: String.raw`$-\tfrac54$`, mistake: 'implicit-flip', why: 'F_y goes on the bottom, since you are solving for y.' },
        { tex: String.raw`$\tfrac54$`, mistake: 'implicit-flip', why: 'Upside down and missing the minus.' },
        { tex: String.raw`$-1$`, mistake: 'arith', why: 'F_x = 3x^2 + y^2 = 4 and F_y = 2xy + 3y^2 = 5 at (1,1). They are not equal.' },
      ],
      steps: [
        String.raw`$F = x^3 + xy^2 + y^3 - 3$.`,
        String.raw`$F_x = 3x^2 + y^2 = 4$ and $F_y = 2xy + 3y^2 = 5$ at $(1,1)$.`,
        String.raw`$\frac{dy}{dx} = -\frac{F_x}{F_y} = -\frac45$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`The equation $x^2y + y^2z + e^{xz} = 3$ defines $z$ as a function of $x$ and $y$ near $(0, 1, 2)$. Find $\dfrac{\partial z}{\partial y}$ at that point.`,
      choices: [
        { tex: String.raw`$-4$`, correct: true },
        { tex: String.raw`$4$`, mistake: 'implicit-sign', why: 'The formula is -F_y/F_z.' },
        { tex: String.raw`$-\tfrac14$`, mistake: 'implicit-flip', why: 'F_z goes on the bottom, not F_y.' },
        { tex: String.raw`$-2$`, mistake: 'implicit-flip', why: 'That is -F_y/F_x. The bottom should be F_z, the variable being solved for. (It is also the value of ∂z/∂x, a different question.)' },
        { tex: String.raw`$\tfrac14$`, mistake: 'implicit-sign', why: 'Upside down and missing the minus.' },
      ],
      steps: [
        String.raw`Check the point: $0 + 1\cdot2 + e^0 = 3$. Good.`,
        String.raw`$F = x^2y + y^2z + e^{xz} - 3$: $F_y = x^2 + 2yz$, $F_z = y^2 + x\,e^{xz}$.`,
        String.raw`At $(0,1,2)$: $F_y = 0 + 4 = 4$, $F_z = 1 + 0 = 1$.`,
        String.raw`$\frac{\partial z}{\partial y} = -\frac{4}{1} = -4$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`Let $f = xy + z^2$ with $x = u + v$, $y = uv$, $z = u^2 - v$. Find $\dfrac{\partial f}{\partial u}$ at $(u, v) = (1, 2)$.`,
      choices: [
        { tex: String.raw`$4$`, correct: true },
        { tex: String.raw`$8$`, mistake: 'missing-branch', why: 'You dropped the z branch: f_z z_u = (2z)(2u) = -4.' },
        { tex: String.raw`$2$`, mistake: 'missing-branch', why: 'You dropped the x branch: f_x x_u = y·1 = 2.' },
        { tex: String.raw`$12$`, mistake: 'sign', why: 'At (1, 2), z = 1 - 2 = -1, so f_z = 2z = -2, not +2.' },
        { tex: String.raw`$7$`, mistake: 'concept', why: 'That is ∂f/∂v, which uses x_v = 1, y_v = u, z_v = -1.' },
      ],
      steps: [
        String.raw`At $(1,2)$: $x = 3$, $y = 2$, $z = -1$.`,
        String.raw`$f_x = y = 2$, $f_y = x = 3$, $f_z = 2z = -2$.`,
        String.raw`$x_u = 1$, $y_u = v = 2$, $z_u = 2u = 2$.`,
        String.raw`$f_u = 2(1) + 3(2) + (-2)(2) = 4$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`The radius of a cylinder grows at $0.1$ cm/s while its height shrinks at $0.2$ cm/s. How fast is the volume $V = \pi r^2h$ changing when $r = 3$ and $h = 5$?`,
      choices: [
        { tex: String.raw`$1.2\pi$ cm$^3$/s`, correct: true },
        { tex: String.raw`$3\pi$ cm$^3$/s`, mistake: 'missing-branch', why: 'That is only the r branch. The height is changing too.' },
        { tex: String.raw`$-1.8\pi$ cm$^3$/s`, mistake: 'missing-branch', why: 'That is only the h branch. The radius is changing too.' },
        { tex: String.raw`$4.8\pi$ cm$^3$/s`, mistake: 'sign', why: 'The height is shrinking, so dh/dt = -0.2.' },
        { tex: String.raw`$-0.3\pi$ cm$^3$/s`, mistake: 'arith', why: 'V_r = 2πrh. You dropped the 2.' },
      ],
      steps: [
        String.raw`Tree: $V \to r \to t$ and $V \to h \to t$.`,
        String.raw`$\frac{dV}{dt} = V_r\frac{dr}{dt} + V_h\frac{dh}{dt} = 2\pi rh\,\frac{dr}{dt} + \pi r^2\frac{dh}{dt}$.`,
        String.raw`$= 2\pi(3)(5)(0.1) + \pi(9)(-0.2) = 3\pi - 1.8\pi = 1.2\pi$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: '0.4*(x^2 - 3*y^2) + 2', z: '0.4*(x^2 - 3*y^2) + 2' },
    { kind: 'surface', expr: 'x^2*y + 3*x*y^4', z: 'x^2*y + 3*x*y^4' },
  ],
};
