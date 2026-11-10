export default {
  id: 14,
  title: 'Tangent planes and linear approximation',
  section: '15.6',
  exam: 1,
  blurb: 'Write the tangent plane to z = f(x, y) or F(x, y, z) = 0, and use it to estimate values and changes.',
  boiler: ['Tangent Planes', 'Normal Vector', 'Differentials'],

  sections: [
    {
      id: 'idea',
      title: 'Zoom in until the surface looks flat',
      body: String.raw`In Calc I, zooming in on a smooth curve made it look like a line: the tangent line $y = f(a) + f'(a)(x - a)$. Near $a$ you could use that line instead of the curve. Example: $\sqrt{4.01} \approx 2 + \tfrac14(0.01) = 2.0025$ (true value $2.002498$).

Zoom in on a smooth surface and it looks like a **plane**. Every curve on the surface through the point has a tangent line, and all of those tangent lines lie in one plane: the **tangent plane**.

To write a plane you need a point and a normal vector (Lesson 2). The point is easy. This lesson is about the normal.`,
    },
    {
      id: 'graph',
      title: 'Tangent plane to z = f(x, y)',
      body: String.raw`The tangent plane at $(a, b, f(a,b))$ must have slope $f_x(a,b)$ in the $x$ direction and slope $f_y(a,b)$ in the $y$ direction. The plane that does that is

$$z = f(a,b) + f_x(a,b)(x - a) + f_y(a,b)(y - b).$$

Same pattern as the tangent line, with one more slope term.

Move everything to one side: $f_x(x - a) + f_y(y - b) - (z - f(a,b)) = 0$. Read off the coefficients for the **normal vector**:

$$\vec n = \langle f_x(a,b),\ f_y(a,b),\ -1\rangle.$$

**Example.** $f = 25 - x^2 - y^2$ at $(2, 3, 12)$. $f_x = -2x = -4$, $f_y = -2y = -6$.

$$z = 12 - 4(x - 2) - 6(y - 3), \qquad \vec n = \langle -4, -6, -1\rangle.$$

**Example.** $z = x^3 + y^4$ at $(2, 1, 9)$: $\vec n = \langle 12, 4, -1\rangle$, so $12(x-2) + 4(y-1) - (z - 9) = 0$, or $12x + 4y - z = 19$.`,
    },
    {
      id: 'implicit',
      title: 'Tangent plane to F(x, y, z) = 0',
      body: String.raw`Many surfaces are not written as $z = \dots$ (spheres, ellipsoids, $2xy^2 + yz + 3xz = 6$). Treat the surface as a **level surface** of $F$.

**Why $\nabla F$ is normal.** Let $\vec r(t)$ be any curve on the surface through $P$. Then $F(\vec r(t)) = 0$ for all $t$. Chain rule: $F_xx' + F_yy' + F_zz' = 0$, so $\nabla F\cdot\vec r'(t) = 0$. The gradient is perpendicular to the tangent vector of **every** curve on the surface, so it is perpendicular to the tangent plane.

$$F_x(P)(x - a) + F_y(P)(y - b) + F_z(P)(z - c) = 0.$$

This also covers the first case: $z = f(x,y)$ is $F = f(x,y) - z = 0$, and $\nabla F = \langle f_x, f_y, -1\rangle$.

**Example.** $2xy^2 + yz + 3xz = 6$ at $(1, 1, 1)$. Check: $2 + 1 + 3 = 6$.

- $F_x = 2y^2 + 3z = 5$
- $F_y = 4xy + z = 5$
- $F_z = y + 3x = 4$

Plane: $5(x - 1) + 5(y - 1) + 4(z - 1) = 0$, so $5x + 5y + 4z = 14$.

(The lecture notes compute $\langle 5, 5, 4\rangle$ and then switch to $\langle 8, 5, 5\rangle$ and $8x + 5y + 5z = 18$. The partials above are right; the plane is $5x + 5y + 4z = 14$. Quick check: $(1,1,1)$ gives $5 + 5 + 4 = 14$.)`,
    },
    {
      id: 'parallel',
      title: 'Special tangent planes',
      body: String.raw`"Find the point where the tangent plane is ..." questions are about the normal vector.

- **Horizontal** (parallel to the $xy$-plane): normal parallel to $\langle 0,0,1\rangle$, so $F_x = F_y = 0$. For $z = f(x,y)$ that is $f_x = f_y = 0$.
- **Parallel to the $xz$-plane** ($y = 0$, normal $\langle 0, 1, 0\rangle$): $F_x = F_z = 0$.
- **Parallel to a given plane** $ax + by + cz = d$: $\nabla F = \lambda\langle a, b, c\rangle$.

After solving those conditions, plug back into the surface equation to finish the point.

**Exam 1 example.** $4x^3 - 12x + 6y + z^3 + 2 = 0$, tangent plane parallel to the $xz$-plane. $\nabla F = \langle 12x^2 - 12,\ 6,\ 3z^2\rangle$. Need $12x^2 - 12 = 0$ and $3z^2 = 0$: $x = \pm1$, $z = 0$. On the surface, $x = 1$ gives $y = 1$: the point $(1, 1, 0)$.

**Point on the tangent plane.** Find $a$ so $(8, a, 1)$ lies on the tangent plane to $z^2 = e^{xy} - 4x^2y + 3y^2$ at $(0,1,2)$: $\nabla F = \langle 1, 6, -4\rangle$, plane $x + 6(y-1) - 4(z-2) = 0$; plug in: $8 + 6a - 6 - 4 + 8 = 0$, so $a = -1$.`,
    },
    {
      id: 'approx',
      title: 'Linear approximation and differentials',
      body: String.raw`The tangent plane is the **linearization** of $f$ at $(a, b)$:

$$L(x, y) = f(a,b) + f_x(a,b)(x - a) + f_y(a,b)(y - b), \qquad f(x,y)\approx L(x,y) \text{ near } (a,b).$$

**Example.** Estimate $f(2.01, 2.98)$ for $f = 25 - x^2 - y^2$. Base point $(2, 3)$, so $x - a = 0.01$, $y - b = -0.02$:

$$L = 12 - 4(0.01) - 6(-0.02) = 12 - 0.04 + 0.12 = 12.08.$$

(True value: $12.0795$.)

**Differentials** estimate the **change** instead of the value. Write $dx = x - a$, $dy = y - b$:

$$\Delta z \approx dz = f_x\,dx + f_y\,dy, \qquad dw = f_x\,dx + f_y\,dy + f_z\,dz \text{ for three variables}.$$

**Example.** $z = x^3y$ from $(1, 3)$ to $(0.98, 3.04)$. $dx = -0.02$, $dy = 0.04$, $f_x = 3x^2y = 9$, $f_y = x^3 = 1$:

$$dz = 9(-0.02) + 1(0.04) = -0.14, \qquad f(0.98, 3.04)\approx 3 - 0.14 = 2.86.$$

Always take $dx$ as **new minus old**. A decrease gives a negative $dx$.`,
    },
  ],

  formulas: [
    { label: 'Tangent plane to z = f(x, y)', tex: String.raw`z = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b)` },
    { label: 'Normal to z = f(x, y)', tex: String.raw`\vec n = \langle f_x, f_y, -1\rangle` },
    { label: 'Tangent plane to F = 0 at P', tex: String.raw`\nabla F(P)\cdot\langle x-a,\ y-b,\ z-c\rangle = 0` },
    { label: 'Linearization', tex: String.raw`L(x,y) = f(a,b) + f_x\,(x-a) + f_y\,(y-b)` },
    { label: 'Differential', tex: String.raw`dz = f_x\,dx + f_y\,dy` },
  ],

  mistakes: [
    {
      id: 'forgot-fab',
      title: 'Leaving out the base value or the point',
      wrong: String.raw`$z = 4(x - 1) + 4(y - 2)$ for $z = 2x^2 + y^2$ at $(1,2)$`,
      right: String.raw`$z = 6 + 4(x - 1) + 4(y - 2)$`,
      why: 'Without f(a, b) the plane passes through the wrong height. Check: plugging (a, b) in should give f(a, b).',
    },
    {
      id: 'normal-sign',
      title: 'Using ⟨f_x, f_y, +1⟩ as the normal',
      wrong: String.raw`$4(x-1) + 4(y-2) + (z - 6) = 0$`,
      right: String.raw`$4(x-1) + 4(y-2) - (z - 6) = 0$`,
      why: 'The normal comes from F = f(x, y) - z, so the z-component is -1. A +1 tilts the plane the wrong way.',
    },
    {
      id: 'dx-wrong',
      title: 'Using x instead of x - a (or old minus new)',
      wrong: String.raw`$L = f(a,b) + f_x\cdot x + f_y\cdot y$, or $dx = a - x$`,
      right: String.raw`$L = f(a,b) + f_x(x - a) + f_y(y - b)$ with $dx = x - a$, new minus old`,
      why: 'The slopes multiply how far you moved from the base point, with the sign of the move.',
    },
    {
      id: 'parallel-condition',
      title: 'Setting the wrong gradient components to zero',
      wrong: String.raw`Tangent plane parallel to the $xz$-plane: only set $F_x = 0$`,
      right: String.raw`Normal must be parallel to $\langle 0,1,0\rangle$: $F_x = 0$ **and** $F_z = 0$`,
      why: 'Parallel planes have parallel normals. Every component except the one along the normal must vanish.',
    },
  ],

  hook: 'Tangent plane = point + normal, and the normal is ∇F. For z = f(x, y), that is ⟨f_x, f_y, -1⟩.',

  scene: {
    view: { range: 2.5, z: [0, 5] },
    camera: [6, -5, 4],
    layers: [
      { id: 'surf', kind: 'surface', z: '4 - (x^2 + y^2)/4', domain: { r: [0, 2.5], theta: [0, '2*pi'] }, colormap: 'terrain', opacity: 0.85 },
      { id: 'P', kind: 'point', at: [1, 1.5, 3.1875], label: 'P' },
      { id: 'tp', kind: 'tangentPlane', of: 'surf', at: [1, 1.5] },
      { id: 'cx', kind: 'curveOnSurface', of: 'surf', x: 't', y: '1.5', t: [-2, 2], color: 'road' },
      { id: 'cy', kind: 'curveOnSurface', of: 'surf', x: '1', y: 't', t: [-2.2, 2.2], color: 'water' },
      { id: 'n', kind: 'vector', from: [1, 1.5, 3.1875], to: [1.5, 2.25, 4.1875], color: 'revision', label: 'n = ⟨1/2, 3/4, 1⟩' },
      { id: 'onSurf', kind: 'point', at: [1.4, 1.2, 3.15], label: 'f = 3.150' },
      { id: 'onPlane', kind: 'point', at: [1.4, 1.2, 3.2125], label: 'L = 3.2125' },
    ],
    steps: [
      { label: 'Start', show: ['surf', 'P'], caption: String.raw`The dome $z = 4 - \tfrac14(x^2 + y^2)$ and the point $P$ above $(1, 1.5)$, where $f = 3.1875$.` },
      { label: 'Two slopes', show: ['surf', 'P', 'cx', 'cy'], caption: String.raw`Through $P$ run two curves: one in the $x$ direction with slope $f_x = -\tfrac12$, one in the $y$ direction with slope $f_y = -\tfrac34$.` },
      { label: 'Plane', show: ['surf', 'P', 'cx', 'cy', 'tp'], caption: String.raw`The tangent plane is the one plane containing both tangent lines: $z = 3.1875 - \tfrac12(x - 1) - \tfrac34(y - 1.5)$.` },
      { label: 'Normal', show: ['surf', 'P', 'tp', 'n'], caption: String.raw`Its normal is $\langle f_x, f_y, -1\rangle = \langle -\tfrac12, -\tfrac34, -1\rangle$, drawn here flipped to point up. It is perpendicular to every curve on the surface through $P$.` },
      { label: 'Estimate', show: ['surf', 'tp', 'P', 'onSurf', 'onPlane'], caption: String.raw`Near $P$, plane and surface almost agree. At $(1.4, 1.2)$: $L = 3.2125$, true value $3.15$. Linear approximation reads the plane instead of the surface.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Find the tangent plane to $z = 2x^2 + y^2$ at the point $(1, 2, 6)$.`,
      choices: [
        { tex: String.raw`$z = 4x + 4y - 6$`, correct: true },
        { tex: String.raw`$z = 4x + 4y - 12$`, mistake: 'forgot-fab', why: 'You left out f(1,2) = 6. Plug in (1, 2): this plane gives z = -4, not 6.' },
        { tex: String.raw`$z = -4x - 4y + 18$`, mistake: 'normal-sign', why: 'That plane uses the normal ⟨4, 4, 1⟩. For z = f(x,y) the normal is ⟨f_x, f_y, -1⟩.' },
        { tex: String.raw`$z = 6 + 4x(x - 1) + 2y(y - 2)$`, mistake: 'concept', why: 'Evaluate the partials at (1, 2) first. A tangent plane is linear.' },
        { tex: String.raw`$z = 4x + 4y + 6$`, mistake: 'sign', why: '6 + 4(x - 1) + 4(y - 2) = 4x + 4y - 6.' },
      ],
      steps: [
        String.raw`$f_x = 4x = 4$, $f_y = 2y = 4$ at $(1, 2)$, and $f(1,2) = 6$.`,
        String.raw`$z = 6 + 4(x - 1) + 4(y - 2)$.`,
        String.raw`Simplify: $z = 4x + 4y - 6$. Check: at $(1,2)$, $4 + 8 - 6 = 6$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Find the tangent plane to the surface $xyz + x^2 + z^2 = 7$ at $(1, 1, 2)$.`,
      choices: [
        { tex: String.raw`$4x + 2y + 5z = 16$`, correct: true },
        { tex: String.raw`$4x + 2y - z = 4$`, mistake: 'normal-sign', why: 'The ⟨f_x, f_y, -1⟩ shortcut is only for z = f(x, y). Here use the whole gradient ⟨F_x, F_y, F_z⟩.' },
        { tex: String.raw`$4x + 2y + 5z = 0$`, mistake: 'forgot-fab', why: 'The plane must pass through (1, 1, 2): 4 + 2 + 10 = 16.' },
        { tex: String.raw`$4x + 2y + 5z = 11$`, mistake: 'arith', why: 'You plugged in (1, 1, 1). The point has z = 2, so the right side is 4 + 2 + 10.' },
        { tex: String.raw`$\langle 4, 2, 5\rangle$`, mistake: 'units', why: 'That is the normal vector. The question asks for the plane.' },
      ],
      steps: [
        String.raw`Check the point: $2 + 1 + 4 = 7$. Let $F = xyz + x^2 + z^2 - 7$.`,
        String.raw`$\nabla F = \langle yz + 2x,\ xz,\ xy + 2z\rangle = \langle 4, 2, 5\rangle$ at $(1,1,2)$.`,
        String.raw`$4(x - 1) + 2(y - 1) + 5(z - 2) = 0$, so $4x + 2y + 5z = 16$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Use the linear approximation of $f(x, y) = \ln(x - 3y)$ at $(7, 2)$ to estimate $f(6.9, 2.06)$.`,
      choices: [
        { tex: String.raw`$-0.28$`, correct: true },
        { tex: String.raw`$0.08$`, mistake: 'sign', why: 'f_y = -3/(x - 3y) = -3, so the y term is -3(0.06) = -0.18.' },
        { tex: String.raw`$0.28$`, mistake: 'dx-wrong', why: 'You used old minus new. dx = 6.9 - 7 = -0.1 and dy = 2.06 - 2 = 0.06.' },
        { tex: String.raw`$-0.1$`, mistake: 'arith', why: 'You forgot the y term, -3(0.06).' },
        { tex: String.raw`$0.72$`, mistake: 'dx-wrong', why: 'You multiplied the slopes by x and y instead of by x - 7 and y - 2.' },
      ],
      steps: [
        String.raw`$f(7, 2) = \ln 1 = 0$.`,
        String.raw`$f_x = \frac{1}{x - 3y} = 1$, $f_y = \frac{-3}{x - 3y} = -3$ at $(7,2)$.`,
        String.raw`$dx = -0.1$, $dy = 0.06$: $L = 0 + 1(-0.1) - 3(0.06) = -0.28$.`,
        String.raw`(True value $\ln 0.72 \approx -0.33$: close, because the step is small.)`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`A cylinder's radius changes from 3 to 3.02 and its height from 10 to 9.95. Use differentials to estimate the change in its volume $V = \pi r^2h$.`,
      choices: [
        { tex: String.raw`$0.75\pi$`, correct: true },
        { tex: String.raw`$1.65\pi$`, mistake: 'sign', why: 'The height went down, so dh = -0.05 and that term is negative.' },
        { tex: String.raw`$1.2\pi$`, mistake: 'arith', why: 'That is only the dr term. The height changed too.' },
        { tex: String.raw`$0.15\pi$`, mistake: 'arith', why: 'V_r = 2πrh. You used πrh.' },
        { tex: String.raw`$-0.75\pi$`, mistake: 'dx-wrong', why: 'dr and dh are new minus old: dr = +0.02, dh = -0.05.' },
      ],
      steps: [
        String.raw`$V_r = 2\pi rh = 60\pi$, $V_h = \pi r^2 = 9\pi$ at $(3, 10)$.`,
        String.raw`$dr = 0.02$, $dh = -0.05$.`,
        String.raw`$dV = 60\pi(0.02) + 9\pi(-0.05) = 1.2\pi - 0.45\pi = 0.75\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`At which points on the surface $x^2 + 2y^2 + z^2 - 2x + 4z = 4$ is the tangent plane parallel to the $xy$-plane?`,
      choices: [
        { tex: String.raw`$(1, 0, 1)$ and $(1, 0, -5)$`, correct: true },
        { tex: String.raw`$(1, 0, -2)$`, mistake: 'parallel-condition', why: 'You set F_z = 0. A horizontal plane needs F_x = F_y = 0, with F_z free.' },
        { tex: String.raw`$(1, 0, 1)$ only`, mistake: 'arith', why: 'z^2 + 4z - 5 = 0 has two roots, z = 1 and z = -5.' },
        { tex: String.raw`$(1, 0, -1)$ and $(1, 0, 5)$`, mistake: 'sign', why: 'z^2 + 4z - 5 factors as (z + 5)(z - 1).' },
        { tex: String.raw`$(1, 0, 0)$`, mistake: 'setup', why: 'x = 1, y = 0 is only part of the answer. Plug into the surface to find z: (1, 0, 0) is not on it.' },
      ],
      steps: [
        String.raw`$\nabla F = \langle 2x - 2,\ 4y,\ 2z + 4\rangle$. Parallel to the $xy$-plane means $\nabla F \parallel \langle 0,0,1\rangle$: $F_x = F_y = 0$.`,
        String.raw`$x = 1$, $y = 0$.`,
        String.raw`On the surface: $1 + 0 + z^2 - 2 + 4z = 4$, so $z^2 + 4z - 5 = 0$, $(z + 5)(z - 1) = 0$.`,
        String.raw`Points $(1, 0, 1)$ and $(1, 0, -5)$. At both, $F_z = 6$ or $-6$, not 0, so the plane really exists.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`The point $(3, a, 4)$ lies on the tangent plane to $z = e^{x - y} + xy^2$ at $(1, 1, 2)$. Find $a$.`,
      choices: [
        { tex: String.raw`$a = -1$`, correct: true },
        { tex: String.raw`$a = 1$`, mistake: 'forgot-fab', why: 'The plane is z = 2 + 2(x - 1) + (y - 1). You dropped the 2.' },
        { tex: String.raw`$a = -5$`, mistake: 'normal-sign', why: 'You used the normal ⟨2, 1, +1⟩. It should be ⟨f_x, f_y, -1⟩.' },
        { tex: String.raw`$a = \tfrac13$`, mistake: 'sign', why: 'The y-derivative of e^{x-y} is -e^{x-y}, so f_y = -1 + 2 = 1, not 3.' },
        { tex: String.raw`$a = -4$`, mistake: 'dx-wrong', why: 'You wrote z = 2 + 2x + y. The slopes multiply x - 1 and y - 1.' },
      ],
      steps: [
        String.raw`$f(1,1) = e^0 + 1 = 2$. $f_x = e^{x-y} + y^2 = 2$, $f_y = -e^{x-y} + 2xy = 1$.`,
        String.raw`Plane: $z = 2 + 2(x - 1) + (y - 1) = 2x + y - 1$.`,
        String.raw`Plug in $(3, a, 4)$: $4 = 6 + a - 1$, so $a = -1$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Find a point on the surface $x^2 - 4x + y + z^3 - 3z = 0$ at which the tangent plane is parallel to the $xz$-plane.`,
      choices: [
        { tex: String.raw`$(2, 2, -1)$`, correct: true },
        { tex: String.raw`$(2, 4, 0)$`, mistake: 'parallel-condition', why: 'This is on the surface and has F_x = 0, but F_z = -3 there. The normal ⟨0, 1, -3⟩ is not parallel to ⟨0, 1, 0⟩.' },
        { tex: String.raw`$(2, 0, 1)$`, mistake: 'setup', why: 'The gradient condition holds, but you did not solve for y: (2, 0, 1) is not on the surface.' },
        { tex: String.raw`$(-2, -10, 1)$`, mistake: 'sign', why: 'F_x = 2x - 4 = 0 gives x = 2, not -2.' },
        { tex: String.raw`$(2, 6, -1)$`, mistake: 'arith', why: 'With z = -1, y = 4 - z^3 + 3z = 4 + 1 - 3 = 2. (y = 6 goes with z = 1.)' },
      ],
      steps: [
        String.raw`$\nabla F = \langle 2x - 4,\ 1,\ 3z^2 - 3\rangle$. Parallel to the $xz$-plane means $\nabla F\parallel\langle 0,1,0\rangle$: $F_x = 0$ and $F_z = 0$.`,
        String.raw`$x = 2$ and $z = \pm1$.`,
        String.raw`On the surface, $y = 4x - x^2 - z^3 + 3z$. With $x = 2$: $y = 4 - z^3 + 3z$.`,
        String.raw`$z = -1$: $y = 4 + 1 - 3 = 2$, giving $(2, 2, -1)$. ($z = 1$ gives $(2, 6, 1)$, which is not listed.)`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: '4 - (x^2 + y^2)/4', z: '4 - (x^2 + y^2)/4' },
    { kind: 'surface', expr: '2*x^2 + y^2', z: '2*x^2 + y^2' },
  ],
};
