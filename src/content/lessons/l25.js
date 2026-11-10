export default {
  id: 25,
  title: 'Vector fields',
  section: '17.1',
  exam: 2,
  blurb: 'Read and sketch vector fields, tell when a field is tangent or normal to a curve, and recognize gradient fields.',
  boiler: ['Vector Field ID', 'Gradient Vector Fields'],

  sections: [
    {
      id: 'idea',
      title: 'An arrow at every point',
      body: String.raw`Line up the kinds of functions you have seen so far:

- Calc 1 and 2: a number in, a number out, like $f(x) = \sin x$.
- Chapter 14: a number in, a vector out, like $\vec r(t) = \langle \cos t, \sin t, t\rangle$. That traces a curve.
- Chapters 15 and 16: a point in, a number out, like $f(x,y) = x^2+y^2$. That is a surface or a temperature map.
- Chapter 17: **a point in, a vector out.** That is a **vector field**, $\vec F(x,y) = \langle f(x,y), g(x,y)\rangle$ in 2D or $\langle f, g, h\rangle$ in 3D.

A vector field puts an arrow at every point. Gravity near the ground is $\langle 0,0,-9.8\rangle$, the same arrow everywhere. A wind map has arrows of different lengths pointing different ways. Temperature and pressure are *not* vector fields: each point gets a number, not a direction.`,
    },
    {
      id: 'sketch',
      title: 'Sketching: plug in a few points',
      body: String.raw`To see a field, evaluate it at a handful of points and draw each arrow starting at its point.

Lecture example, $\vec F = \langle -y, x\rangle$:
- $\vec F(1,0) = \langle 0,1\rangle$ (up), $\vec F(0,1) = \langle -1,0\rangle$ (left), $\vec F(-1,0) = \langle 0,-1\rangle$ (down), $\vec F(0,-1) = \langle 1,0\rangle$ (right).
- $\vec F(3,0) = \langle 0,3\rangle$: same direction as at $(1,0)$, three times as long.

So $\langle -y,x\rangle$ spins **counterclockwise** around the origin and gets stronger farther out. Its mirror image $\langle y,-x\rangle$ spins clockwise.

Three pictures to know cold:
- $\langle x, y\rangle$ points straight out from the origin (radial). Any $f(x,y)\,\langle x,y\rangle$ is radial too.
- $\langle -y, x\rangle$ circles the origin counterclockwise.
- $\dfrac{\langle x,y\rangle}{\sqrt{x^2+y^2}}$ points straight out with every arrow of length 1.

The last two lines hold the classic trap: $\langle x,y\rangle$ and $\langle x,y\rangle/\sqrt{x^2+y^2}$ point the same way everywhere. Only the lengths differ. Read the question: if it asks about direction, length does not matter.`,
    },
    {
      id: 'tangent',
      title: 'Tangent or normal to a curve',
      body: String.raw`Write the curve as a level curve $g(x,y) = c$. From Chapter 15, $\nabla g$ is perpendicular to the level curve. So:

- $\vec F$ is **tangent** to the curve where $\vec F\perp\nabla g$, that is, $\vec F\cdot\nabla g = 0$.
- $\vec F$ is **normal** to the curve where $\vec F\parallel\nabla g$, that is, $\vec F = k\,\nabla g$ for some $k$.

Lecture example: $\vec F = \langle y, x\rangle$ on the unit circle $g = x^2+y^2 = 1$, so $\nabla g = \langle 2x, 2y\rangle$.

1. Tangent: $\langle y,x\rangle\cdot\langle 2x,2y\rangle = 4xy = 0$, so $x = 0$ or $y = 0$. On the circle: $(0,\pm1)$ and $(\pm1, 0)$.
2. Normal: $y = 2kx$ and $x = 2ky$ give $x = 4k^2x$. Either $x = 0$ (then $y = 0$, not on the circle) or $k = \pm\tfrac12$, which gives $y = \pm x$. On the circle: $\left(\pm\tfrac{1}{\sqrt2}, \pm\tfrac{1}{\sqrt2}\right)$, all four sign choices.

Always finish by putting the points back on the curve.`,
    },
    {
      id: 'gradient',
      title: 'Gradient fields',
      body: String.raw`Any scalar function $\varphi(x,y,z)$ gives a vector field, its gradient:

$$\vec F = \nabla\varphi = \langle \varphi_x, \varphi_y, \varphi_z\rangle$$

If a field can be written this way, it is a **gradient field** (also called conservative), and $\varphi$ is a **potential function**.

Two facts carry over from Chapter 15:
- $\nabla\varphi$ is perpendicular to the level curves of $\varphi$.
- $\nabla\varphi$ points uphill, toward larger $\varphi$. For the hill $\varphi = 9 - x^2 - y^2$, $\nabla\varphi = \langle -2x, -2y\rangle$ points inward, toward the peak.

So the arrows of a gradient field always cross the contour lines at right angles. A field whose arrows run *along* closed contours, like $\langle -y,x\rangle$ around circles, cannot be a gradient field.`,
    },
    {
      id: 'potential',
      title: 'Is it a gradient field? Try to build the potential',
      body: String.raw`To test $\vec F = \langle f, g\rangle$, try to solve $\varphi_x = f$ and $\varphi_y = g$.

**Yes example (lecture):** $\vec F = \langle y, x\rangle$.
1. $\varphi_x = y$. Integrate in $x$, holding $y$ fixed: $\varphi = xy + K(y)$. The "constant" can depend on $y$.
2. Differentiate in $y$: $\varphi_y = x + K'(y)$. This must equal $x$, so $K'(y) = 0$ and $K = C$.
3. $\varphi = xy + C$ works.

**No example (lecture):** $\vec F = \langle y, -x\rangle$.
1. $\varphi = xy + K(y)$ as before.
2. $\varphi_y = x + K'(y)$ must equal $-x$, so $K'(y) = -2x$.
3. $K'(y)$ is supposed to depend on $y$ only, and $-2x$ does not. No potential exists.

The moment $K'(y)$ comes out with an $x$ in it, stop: the field is not a gradient field. Lesson 28 gives a faster test ($f_y = g_x$) and uses potentials to evaluate line integrals.`,
    },
  ],

  formulas: [
    { label: '2D and 3D vector fields', tex: String.raw`\vec F(x,y) = \langle f, g\rangle,\qquad \vec F(x,y,z) = \langle f, g, h\rangle` },
    { label: 'Gradient field', tex: String.raw`\vec F = \nabla\varphi = \langle \varphi_x, \varphi_y, \varphi_z\rangle` },
    { label: 'Tangent to the curve g = c', tex: String.raw`\vec F\cdot\nabla g = 0` },
    { label: 'Normal to the curve g = c', tex: String.raw`\vec F = k\,\nabla g` },
    { label: 'Radial and rotation fields', tex: String.raw`\langle x,y\rangle \text{ (out)},\qquad \langle -y,x\rangle \text{ (counterclockwise)}` },
  ],

  mistakes: [
    {
      id: 'length-vs-direction',
      title: 'Judging a field by arrow length when only direction matters',
      wrong: String.raw`"The arrows all have length 1, so it can't be a multiple of $\langle x, y\rangle$."`,
      right: String.raw`$\dfrac{\langle x,y\rangle}{\sqrt{x^2+y^2}}$ points exactly like $\langle x,y\rangle$; it just has length 1.`,
      why: 'Multiplying a field by a positive function changes the lengths and keeps every direction. Match directions first, then check lengths only if the question asks.',
    },
    {
      id: 'tangent-normal-swap',
      title: 'Mixing up tangent and normal',
      wrong: String.raw`$\vec F\cdot\nabla g = 0$ means $\vec F$ is normal to the curve.`,
      right: String.raw`$\vec F\cdot\nabla g = 0$ means $\vec F$ is **tangent** to the curve. $\vec F\parallel\nabla g$ means normal.`,
      why: 'The gradient is already the normal direction. Being perpendicular to the normal means lying along the curve.',
    },
    {
      id: 'gradient-not-perp',
      title: 'Thinking the gradient runs along the level curve',
      wrong: String.raw`$\nabla\varphi$ is tangent to the level curves of $\varphi$.`,
      right: String.raw`$\nabla\varphi$ is perpendicular to the level curves and points toward larger $\varphi$.`,
      why: 'Along a level curve the function does not change, so the direction of fastest increase has to cut straight across it.',
    },
    {
      id: 'forgot-k',
      title: 'Dropping K(y), or keeping one that depends on x',
      wrong: String.raw`$\varphi_x = y \Rightarrow \varphi = xy + C$, done.`,
      right: String.raw`$\varphi = xy + K(y)$, then use $\varphi_y = g$ to find $K'(y)$. If $K'(y)$ contains $x$, there is no potential.`,
      why: 'Integrating in x treats y as a constant, so the constant of integration can be any function of y. Skipping it loses terms like y^3, and ignoring an x in K\'(y) hides a field that is not a gradient.',
    },
    {
      id: 'rotation-direction',
      title: 'Clockwise vs counterclockwise rotation',
      wrong: String.raw`$\langle y, -x\rangle$ spins counterclockwise.`,
      right: String.raw`$\langle -y, x\rangle$ spins counterclockwise; $\langle y,-x\rangle$ spins clockwise.`,
      why: 'Check one point. At (1, 0), the vector <-y, x> is <0, 1>, pointing up, which is counterclockwise.',
    },
  ],

  hook: 'Plug in four points to see a field; dot with the gradient to test tangent; try to build a potential to test gradient.',

  scene: {
    view: { range: 2, z: [-4, 4] },
    camera: [4.5, -5, 5],
    layers: [
      { id: 'radial', kind: 'vectorField', P: 'x', Q: 'y', density: 9 },
      { id: 'rot', kind: 'vectorField', P: '-y', Q: 'x', density: 9 },
      { id: 'circle', kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: '0', t: [0, '2*pi'], color: 'road', arrow: true },
      { id: 'phi', kind: 'surface', z: 'x*y', colormap: 'terrain', opacity: 0.8 },
      { id: 'lvl', kind: 'contours', of: 'phi', levels: 9 },
      { id: 'grad', kind: 'gradientField', of: 'phi', density: 9 },
      { id: 'yx', kind: 'vectorField', P: 'y', Q: 'x', density: 9 },
      { id: 'tan1', kind: 'point', at: [1, 0, 0], label: 'tangent' },
      { id: 'tan2', kind: 'point', at: [0, 1, 0], label: 'tangent' },
      { id: 'nor1', kind: 'point', at: [0.7071, 0.7071, 0], label: 'normal' },
      { id: 'nor2', kind: 'point', at: [-0.7071, 0.7071, 0], label: 'normal' },
    ],
    steps: [
      { label: 'Start', show: ['radial'], caption: String.raw`$\langle x, y\rangle$: every arrow points straight away from the origin, and arrows grow with distance.` },
      { label: 'Rotation', show: ['rot', 'circle'], caption: String.raw`$\langle -y, x\rangle$ circles the origin counterclockwise. It is tangent to every circle centered at the origin: $\langle -y,x\rangle\cdot\langle x,y\rangle = 0$.` },
      { label: 'Potential', show: ['phi', 'lvl'], caption: String.raw`The surface $\varphi = xy$ and its level curves, the hyperbolas $xy = c$.` },
      { label: 'Gradient', show: ['lvl', 'grad'], caption: String.raw`$\nabla\varphi = \langle y, x\rangle$. Every arrow crosses a level curve at a right angle and points uphill. That is what a gradient field looks like.` },
      { label: 'Tangent or normal', show: ['yx', 'circle', 'tan1', 'tan2', 'nor1', 'nor2'], caption: String.raw`On the unit circle, $\langle y,x\rangle$ is tangent where $4xy = 0$ (the axis points) and normal where $y = \pm x$.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Which vector field has arrows that circle the origin **clockwise**?`,
      choices: [
        { tex: String.raw`$\langle y, -x\rangle$`, correct: true },
        { tex: String.raw`$\langle -y, x\rangle$`, mistake: 'rotation-direction', why: 'At (1, 0) this gives <0, 1>, pointing up, which is counterclockwise.' },
        { tex: String.raw`$\langle x, y\rangle$`, mistake: 'concept', why: 'This points straight out from the origin. It does not circle at all.' },
        { tex: String.raw`$\langle -x, -y\rangle$`, mistake: 'concept', why: 'This points straight in toward the origin.' },
        { tex: String.raw`$\langle y, x\rangle$`, mistake: 'concept', why: 'At (1, 0) it points up (counterclockwise) but at (0, 1) it points right (clockwise), so it does not circle at all. It is the gradient of xy.' },
      ],
      steps: [
        String.raw`Test one point. At $(1,0)$, clockwise motion points down, so you want a vector like $\langle 0,-1\rangle$.`,
        String.raw`$\langle y,-x\rangle$ at $(1,0)$ is $\langle 0,-1\rangle$. At $(0,1)$ it is $\langle 1,0\rangle$, pointing right, again clockwise.`,
        String.raw`It is also perpendicular to $\langle x,y\rangle$ everywhere, so it runs along circles.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Find the gradient field of $\varphi(x,y,z) = x^2y + \sin z$.`,
      choices: [
        { tex: String.raw`$\langle 2xy,\ x^2,\ \cos z\rangle$`, correct: true },
        { tex: String.raw`$\langle 2xy,\ x^2,\ -\cos z\rangle$`, mistake: 'sign', why: 'The derivative of sin z is cos z, with no minus sign.' },
        { tex: String.raw`$2xy + x^2 + \cos z$`, mistake: 'units', why: 'A gradient is a vector. You added the three partials into one number.' },
        { tex: String.raw`$\langle x^2,\ 2xy,\ \cos z\rangle$`, mistake: 'setup', why: 'The components are in the wrong order: the first slot is the x-partial, which is 2xy.' },
        { tex: String.raw`$\langle 2x,\ x^2,\ \cos z\rangle$`, mistake: 'arith', why: 'When you differentiate x^2 y in x, the y stays: 2xy.' },
      ],
      steps: [
        String.raw`$\varphi_x = 2xy$ (hold $y$, $z$ fixed).`,
        String.raw`$\varphi_y = x^2$.`,
        String.raw`$\varphi_z = \cos z$.`,
        String.raw`$\nabla\varphi = \langle 2xy, x^2, \cos z\rangle$.`,
      ],
      source: 'Study plan bank #21',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Which vector field is perpendicular to the curve $x^2y = c$ at every point of the curve (for every $c$)?`,
      choices: [
        { tex: String.raw`$\langle 2xy,\ x^2\rangle$`, correct: true },
        { tex: String.raw`$\langle x^2,\ -2xy\rangle$`, mistake: 'tangent-normal-swap', why: 'Its dot product with the gradient <2xy, x^2> is 0, so this one is tangent to the curves, not perpendicular.' },
        { tex: String.raw`$\langle x^2,\ 2xy\rangle$`, mistake: 'setup', why: 'The partials are in the wrong slots. The x-component of the gradient of x^2 y is 2xy.' },
        { tex: String.raw`$\langle x,\ y\rangle$`, mistake: 'concept', why: 'A radial field is perpendicular to circles centered at the origin, not to these curves.' },
        { tex: String.raw`$\langle y,\ x\rangle$`, mistake: 'gradient-not-perp', why: 'This is the gradient of xy, so it is perpendicular to the curves xy = c, a different family.' },
      ],
      steps: [
        String.raw`The curves are level curves of $g(x,y) = x^2y$.`,
        String.raw`$\nabla g = \langle 2xy, x^2\rangle$ is perpendicular to every level curve of $g$.`,
        String.raw`So $\langle 2xy, x^2\rangle$ (or any nonzero multiple of it) is the answer.`,
      ],
      source: 'Study plan bank #22',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`At which points of the circle $x^2+y^2 = 4$ is the field $\vec F = \langle x, -y\rangle$ **tangent** to the circle?`,
      choices: [
        { tex: String.raw`$(\sqrt2,\sqrt2),\ (\sqrt2,-\sqrt2),\ (-\sqrt2,\sqrt2),\ (-\sqrt2,-\sqrt2)$`, correct: true },
        { tex: String.raw`$(\pm2, 0)$ and $(0,\pm2)$`, mistake: 'tangent-normal-swap', why: 'At these points F is parallel to the gradient <2x, 2y>, so F is normal there.' },
        { tex: String.raw`$(\sqrt2,\sqrt2)$ and $(-\sqrt2,-\sqrt2)$ only`, mistake: 'setup', why: 'x^2 = y^2 has two cases, y = x and y = -x. You kept only one.' },
        { tex: String.raw`$(\pm1, \pm1)$`, mistake: 'setup', why: 'These satisfy y = plus or minus x but are not on the circle of radius 2. Put the points back on the curve.' },
        { tex: String.raw`Nowhere`, mistake: 'concept', why: 'Solve F dot grad g = 0 on the circle. It has solutions.' },
      ],
      steps: [
        String.raw`The circle is $g = x^2+y^2 = 4$, with $\nabla g = \langle 2x, 2y\rangle$.`,
        String.raw`Tangent means $\vec F\cdot\nabla g = 0$: $\langle x,-y\rangle\cdot\langle 2x,2y\rangle = 2x^2 - 2y^2 = 0$, so $y = \pm x$.`,
        String.raw`On the circle: $2x^2 = 4$, so $x = \pm\sqrt2$, with $y = \pm x$. That gives all four points $(\pm\sqrt2, \pm\sqrt2)$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Exactly one of these fields is **not** a gradient field. Which one?`,
      choices: [
        { tex: String.raw`$\langle y,\ -x\rangle$`, correct: true },
        { tex: String.raw`$\langle 2x,\ -1\rangle$`, mistake: 'concept', why: 'This is the gradient of x^2 - y.' },
        { tex: String.raw`$\langle y,\ x\rangle$`, mistake: 'rotation-direction', why: 'It looks a lot like the rotation field, but it is the gradient of xy.' },
        { tex: String.raw`$\langle ye^x,\ e^x\rangle$`, mistake: 'concept', why: 'This is the gradient of y e^x.' },
        { tex: String.raw`$\langle 2xy,\ x^2\rangle$`, mistake: 'concept', why: 'This is the gradient of x^2 y.' },
      ],
      steps: [
        String.raw`Try to build a potential for $\langle y,-x\rangle$. From $\varphi_x = y$: $\varphi = xy + K(y)$.`,
        String.raw`Then $\varphi_y = x + K'(y)$, which must equal $-x$. So $K'(y) = -2x$.`,
        String.raw`$K'(y)$ cannot depend on $x$. No potential exists.`,
        String.raw`The others have potentials $x^2 - y$, $xy$, $ye^x$, $x^2y$. (Picture check: $\langle y,-x\rangle$ runs along closed circles, which a gradient field never does.)`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`Find a potential function for $\vec F = \langle 2xy + 1,\ x^2 + 3y^2\rangle$.`,
      choices: [
        { tex: String.raw`$\varphi = x^2y + x + y^3 + C$`, correct: true },
        { tex: String.raw`$\varphi = x^2y + x + C$`, mistake: 'forgot-k', why: 'You stopped after integrating in x. Matching phi_y to x^2 + 3y^2 gives K\'(y) = 3y^2, so K = y^3.' },
        { tex: String.raw`$\varphi = 2x^2y + x + y^3 + C$`, mistake: 'arith', why: 'You added the x^2 y term from both components. Each distinct term appears once.' },
        { tex: String.raw`$\varphi = x^2y + y^3 + C$`, mistake: 'arith', why: 'The +1 in the first component integrates to x. Check: phi_x must be 2xy + 1.' },
        { tex: String.raw`No potential exists`, mistake: 'concept', why: 'K\'(y) = 3y^2 depends on y only, so a potential exists.' },
      ],
      steps: [
        String.raw`$\varphi_x = 2xy + 1$. Integrate in $x$: $\varphi = x^2y + x + K(y)$.`,
        String.raw`$\varphi_y = x^2 + K'(y)$. Set it equal to $x^2 + 3y^2$: $K'(y) = 3y^2$.`,
        String.raw`$K(y) = y^3 + C$, so $\varphi = x^2y + x + y^3 + C$.`,
        String.raw`Check: $\nabla\varphi = \langle 2xy + 1, x^2 + 3y^2\rangle$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 2,
      prompt: String.raw`Let $\vec F = \nabla\varphi$ with $\varphi(x,y) = 9 - x^2 - y^2$. Which describes $\vec F(1,2)$?`,
      choices: [
        { tex: String.raw`$\langle -2,-4\rangle$, perpendicular to the level curve of $\varphi$ through $(1,2)$, pointing toward the peak`, correct: true },
        { tex: String.raw`$\langle 2,4\rangle$, perpendicular to the level curve, pointing away from the peak`, mistake: 'sign', why: 'The partials of 9 - x^2 - y^2 are -2x and -2y. The gradient points uphill, toward the peak at the origin.' },
        { tex: String.raw`$\langle -4, 2\rangle$, tangent to the level curve`, mistake: 'tangent-normal-swap', why: 'That vector is perpendicular to the gradient, so it runs along the level curve. The gradient itself crosses it.' },
        { tex: String.raw`$\langle -2,-4\rangle$, tangent to the level curve`, mistake: 'gradient-not-perp', why: 'Right vector, wrong geometry: a gradient is perpendicular to level curves.' },
        { tex: String.raw`$4$`, mistake: 'units', why: 'That is phi(1, 2), a number. A vector field outputs a vector.' },
      ],
      steps: [
        String.raw`$\nabla\varphi = \langle -2x, -2y\rangle$, so $\vec F(1,2) = \langle -2, -4\rangle$.`,
        String.raw`The level curves are circles $x^2+y^2 = c$. The vector $\langle -2,-4\rangle$ points from $(1,2)$ straight toward the origin, which is perpendicular to the circle.`,
        String.raw`The origin is where $\varphi$ is largest, so the gradient points uphill toward the peak.`,
      ],
      source: 'original',
    },
    {
      id: 'p8',
      difficulty: 2,
      prompt: String.raw`A plot shows a 2D field whose arrows all point directly away from the origin and all have the **same length**. Which field could it be?`,
      choices: [
        { tex: String.raw`$\dfrac{\langle x, y\rangle}{\sqrt{x^2+y^2}}$`, correct: true },
        { tex: String.raw`$\langle x, y\rangle$`, mistake: 'length-vs-direction', why: 'Right direction, but its length is sqrt(x^2 + y^2), which grows with distance.' },
        { tex: String.raw`$\dfrac{\langle x, y\rangle}{x^2+y^2}$`, mistake: 'length-vs-direction', why: 'Right direction, but its length is 1/sqrt(x^2 + y^2), which shrinks with distance.' },
        { tex: String.raw`$\dfrac{\langle -x, -y\rangle}{\sqrt{x^2+y^2}}$`, mistake: 'sign', why: 'Unit length, but every arrow points toward the origin.' },
        { tex: String.raw`$\dfrac{\langle -y, x\rangle}{\sqrt{x^2+y^2}}$`, mistake: 'concept', why: 'Unit length, but it circles the origin instead of pointing away.' },
      ],
      steps: [
        String.raw`Pointing directly away from the origin means a positive multiple of $\langle x,y\rangle$.`,
        String.raw`The length of $f\,\langle x,y\rangle$ is $|f|\sqrt{x^2+y^2}$. For it to be constant, take $f = 1/\sqrt{x^2+y^2}$.`,
        String.raw`So the field is the unit radial field $\langle x,y\rangle/\sqrt{x^2+y^2}$, length 1 everywhere except the origin, where it is undefined.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'vectorField', P: '-y', Q: 'x', density: 9 },
    { kind: 'vectorField', P: 'x', Q: 'y', density: 9 },
    { kind: 'surface', expr: 'x*y' },
  ],
};
