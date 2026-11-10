export default {
  id: 30,
  title: 'Curl and divergence',
  section: '17.5',
  exam: 2,
  blurb: 'Two derivatives of a vector field: curl measures spin, divergence measures spreading out.',
  boiler: ['Divergence  and Curl'],

  sections: [
    {
      id: 'del',
      title: 'One operator, three derivatives',
      body: String.raw`Treat "del" as a vector of derivative instructions:

$$\nabla = \left\langle \frac{\partial}{\partial x}, \frac{\partial}{\partial y}, \frac{\partial}{\partial z}\right\rangle$$

Multiply it three ways, the same three ways you can multiply with a vector:

- **Gradient**, $\nabla\varphi$: del times a scalar. Scalar in, **vector** out.
- **Curl**, $\nabla\times\vec F$: del cross a field. Vector in, **vector** out.
- **Divergence**, $\nabla\cdot\vec F$: del dot a field. Vector in, **scalar** out.

Keeping track of what goes in and what comes out tells you which expressions make sense. $\operatorname{div}(\operatorname{curl}\vec F)$ is fine: the curl is a vector, and div takes a vector. $\operatorname{curl}(\operatorname{div}\vec F)$ is nonsense: div gives a scalar, and curl needs a vector. Same for $\operatorname{div}\varphi$, $\operatorname{curl}\varphi$ and $\operatorname{grad}\vec F$.`,
    },
    {
      id: 'curl',
      title: 'Curl: the cross product with del',
      body: String.raw`For $\vec F = \langle f, g, h\rangle$, expand the determinant along the top row:

$$\operatorname{curl}\vec F = \begin{vmatrix} \mathbf i & \mathbf j & \mathbf k \\ \partial_x & \partial_y & \partial_z \\ f & g & h\end{vmatrix} = \left\langle h_y - g_z,\ -(h_x - f_z),\ g_x - f_y\right\rangle$$

The middle component carries the cofactor minus sign, just like a cross product. Written out, it is $f_z - h_x$. Getting this one backwards is the most common curl error.

Memory tip: the $\mathbf i$ component never uses $x$ (only $y$ and $z$), the $\mathbf j$ component never uses $y$, the $\mathbf k$ component never uses $z$.

The $\mathbf k$ component, $g_x - f_y$, is the 2D curl from Green's theorem.

Lecture example: $\vec F = \langle x^2y,\ ze^x,\ xyz\rangle$.
1. $\mathbf i$: $\partial_y(xyz) - \partial_z(ze^x) = xz - e^x$.
2. $\mathbf j$: $-\left(\partial_x(xyz) - \partial_z(x^2y)\right) = -(yz - 0) = -yz$.
3. $\mathbf k$: $\partial_x(ze^x) - \partial_y(x^2y) = ze^x - x^2$.

So $\operatorname{curl}\vec F = \langle xz - e^x,\ -yz,\ ze^x - x^2\rangle$.`,
    },
    {
      id: 'div',
      title: 'Divergence: the dot product with del',
      body: String.raw`$$\operatorname{div}\vec F = \nabla\cdot\vec F = f_x + g_y + h_z$$

Each component is differentiated by its **own** variable, and the results are added into one number.

Same example: $\operatorname{div}\langle x^2y, ze^x, xyz\rangle = 2xy + 0 + xy = 3xy$. Because div gives a scalar, you can take its gradient: $\nabla(3xy) = \langle 3y, 3x, 0\rangle$.

Divergence is a **scalar**. An answer like $\langle 2xy, 0, xy\rangle$ is not a divergence; it is the three pieces you forgot to add.`,
    },
    {
      id: 'meaning',
      title: 'What they measure: the log in the river',
      body: String.raw`Drop a small log into a flow $\vec F$.

**Rotation field** $\vec F = \langle -y, x, 0\rangle$:
- $\operatorname{curl}\vec F = \langle 0, 0, 1-(-1)\rangle = \langle 0,0,2\rangle$. The log **spins**, counterclockwise as seen from above. The curl vector points along the spin axis by the right-hand rule.
- $\operatorname{div}\vec F = 0 + 0 + 0 = 0$. The log does not drift outward. The field is **source-free** (incompressible).

**Source field** $\vec F = \langle x, y, 0\rangle$:
- $\operatorname{curl}\vec F = \vec 0$. The log does not spin. The field is **irrotational**.
- $\operatorname{div}\vec F = 1 + 1 + 0 = 2$. The log **drifts** away from the origin, as if fluid were being pumped in everywhere.

So curl is **circulation density** (spin per unit area, the integrand in Green's circulation form) and divergence is **flux density** (spreading per unit area, the integrand in Green's flux form).`,
    },
    {
      id: 'identities',
      title: 'Two identities that answer questions for free',
      body: String.raw`For any $\varphi$ and $\vec F$ with continuous second partials:

$$\operatorname{curl}(\nabla\varphi) = \vec 0 \qquad\qquad \operatorname{div}(\operatorname{curl}\vec F) = 0$$

Why the first: the curl of $\langle\varphi_x, \varphi_y, \varphi_z\rangle$ has components like $\varphi_{zy} - \varphi_{yz}$, and mixed partials are equal (Clairaut). Why the second: $\partial_x(h_y - g_z) + \partial_y(f_z - h_x) + \partial_z(g_x - f_y)$ cancels in pairs for the same reason.

Consequences:
- A gradient (conservative) field always has zero curl. On a region with no holes, the converse holds too, which is the 3D test from Lesson 28: conservative $\iff$ $\operatorname{curl}\vec F = \vec 0$.
- If a problem asks for $\operatorname{div}(\operatorname{curl}\vec F)$ at some point, the answer is 0 without computing anything.

One more combination appears often: $\operatorname{div}(\nabla\varphi) = \varphi_{xx} + \varphi_{yy} + \varphi_{zz}$, the **Laplacian**, written $\nabla^2\varphi$ or $\Delta\varphi$. For $\varphi = x^2 + yz^3$, $\nabla\varphi = \langle 2x, z^3, 3yz^2\rangle$ and $\nabla^2\varphi = 2 + 0 + 6yz$.`,
    },
  ],

  formulas: [
    { label: 'Curl', tex: String.raw`\operatorname{curl}\vec F = \nabla\times\vec F = \langle h_y - g_z,\ f_z - h_x,\ g_x - f_y\rangle` },
    { label: 'Divergence', tex: String.raw`\operatorname{div}\vec F = \nabla\cdot\vec F = f_x + g_y + h_z` },
    { label: 'Identities', tex: String.raw`\nabla\times(\nabla\varphi) = \vec 0,\qquad \nabla\cdot(\nabla\times\vec F) = 0` },
    { label: 'Laplacian', tex: String.raw`\nabla\cdot\nabla\varphi = \varphi_{xx} + \varphi_{yy} + \varphi_{zz}` },
    { label: 'Types', tex: String.raw`\text{grad: scalar}\to\text{vector},\quad \text{curl: vector}\to\text{vector},\quad \text{div: vector}\to\text{scalar}` },
  ],

  mistakes: [
    {
      id: 'curl-middle-sign',
      title: 'Sign of the middle component of the curl',
      wrong: String.raw`$\mathbf j$ component $= h_x - f_z$`,
      right: String.raw`$\mathbf j$ component $= -(h_x - f_z) = f_z - h_x$`,
      why: 'The determinant expansion puts a minus sign on the j cofactor, exactly as in a cross product. Write the minus first, then the bracket.',
    },
    {
      id: 'curl-order',
      title: 'Subtracting in the wrong order',
      wrong: String.raw`$\operatorname{curl}\vec F = \langle g_z - h_y,\ h_x - f_z,\ f_y - g_x\rangle$`,
      right: String.raw`$\operatorname{curl}\vec F = \langle h_y - g_z,\ f_z - h_x,\ g_x - f_y\rangle$`,
      why: 'Reversing every subtraction gives the negative of the curl, which is always one of the answer choices.',
    },
    {
      id: 'div-is-vector',
      title: 'Leaving the divergence as a vector',
      wrong: String.raw`$\operatorname{div}\langle x^2y, yz^2, z^3x\rangle = \langle 2xy,\ z^2,\ 3xz^2\rangle$`,
      right: String.raw`$\operatorname{div} = 2xy + z^2 + 3xz^2$`,
      why: 'Divergence is a dot product, so it is a single number at each point. Add the three partials.',
    },
    {
      id: 'wrong-partial',
      title: 'Differentiating by the wrong variable in div',
      wrong: String.raw`$\operatorname{div}\vec F = f_y + g_z + h_x$`,
      right: String.raw`$\operatorname{div}\vec F = f_x + g_y + h_z$`,
      why: 'Each component goes with its own variable: first with x, second with y, third with z.',
    },
    {
      id: 'undefined-op',
      title: 'Applying an operation to the wrong type',
      wrong: String.raw`$\operatorname{curl}(\operatorname{div}\vec F)$, $\operatorname{div}\varphi$, $\operatorname{grad}\vec F$`,
      right: String.raw`grad needs a scalar; curl and div need a vector field.`,
      why: 'Track the type at each step. div F is a scalar, so curl(div F) has nothing to act on.',
    },
  ],

  hook: 'Curl spins, divergence spreads. Curl of a gradient is 0; div of a curl is 0. Middle curl term: f_z - h_x.',

  scene: {
    view: { range: 2.5, z: [-0.5, 3] },
    camera: [4.5, -5.5, 4.5],
    layers: [
      { id: 'rot', kind: 'vectorField', P: '-y', Q: 'x', density: 9 },
      { id: 'curlv', kind: 'vector', from: [0, 0, 0], to: [0, 0, 2], color: 'road', label: 'curl F = <0,0,2>' },
      { id: 'spin', kind: 'curve', x: '0.4*cos(t)', y: '0.4*sin(t)', z: '0.05', t: [0, '2*pi'], color: 'road', arrow: true },
      { id: 'spin2', kind: 'curve', x: '1.5 + 0.35*cos(t)', y: '0.35*sin(t)', z: '0.05', t: [0, '2*pi'], color: 'road', arrow: true },
      { id: 'curlv2', kind: 'vector', from: [1.5, 0, 0], to: [1.5, 0, 2], color: 'road', label: 'same curl here' },
      { id: 'src', kind: 'vectorField', P: 'x', Q: 'y', density: 9 },
      { id: 'out', kind: 'curve', x: '1.5 + 0.35*cos(t)', y: '0.35*sin(t)', z: '0.05', t: [0, '2*pi'], color: 'water' },
      { id: 'div', kind: 'point', at: [1.5, 0, 0], label: 'div F = 2' },
      { id: 'zero', kind: 'point', at: [0, 0, 0], label: 'curl F = 0' },
    ],
    steps: [
      { label: 'Start', show: ['rot'], caption: String.raw`The rotation field $\langle -y, x, 0\rangle$. A log dropped in this flow spins but does not drift.` },
      { label: 'Curl', show: ['rot', 'spin', 'curlv'], caption: String.raw`$\operatorname{curl}\vec F = \langle 0, 0, 2\rangle$: the right-hand rule turns counterclockwise spin into an arrow pointing up.` },
      { label: 'Everywhere', show: ['rot', 'spin2', 'curlv2'], caption: String.raw`The curl is $\langle 0,0,2\rangle$ at every point, not just the center. A tiny paddle wheel at $(1.5, 0)$ spins too, because the outer side is pushed harder than the inner side.` },
      { label: 'Source', show: ['src', 'out', 'div'], caption: String.raw`The source field $\langle x, y, 0\rangle$ has $\operatorname{div}\vec F = 2$: more flow leaves any small circle than enters it. The log drifts outward.` },
      { label: 'Swap', show: ['src', 'zero'], caption: String.raw`But $\operatorname{curl}\langle x,y,0\rangle = \vec 0$ (no spin), while $\operatorname{div}\langle -y,x,0\rangle = 0$ (no spreading). Each field has exactly one of the two.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Find $\operatorname{div}\vec F$ for $\vec F = \langle x^2y,\ yz^2,\ z^3x\rangle$.`,
      choices: [
        { tex: String.raw`$2xy + z^2 + 3xz^2$`, correct: true },
        { tex: String.raw`$\langle 2xy,\ z^2,\ 3xz^2\rangle$`, mistake: 'div-is-vector', why: 'Right partials, but divergence is their sum, a scalar.' },
        { tex: String.raw`$x^2 + 2yz + z^3$`, mistake: 'wrong-partial', why: 'You computed f_y + g_z + h_x. Each component goes with its own variable.' },
        { tex: String.raw`$\langle -2yz,\ -z^3,\ -x^2\rangle$`, mistake: 'concept', why: 'That is the curl, not the divergence.' },
        { tex: String.raw`$2xy + 2yz + 3xz^2$`, mistake: 'arith', why: 'The y-partial of y z^2 is z^2, not 2yz.' },
      ],
      steps: [
        String.raw`$f_x = \partial_x(x^2y) = 2xy$.`,
        String.raw`$g_y = \partial_y(yz^2) = z^2$.`,
        String.raw`$h_z = \partial_z(z^3x) = 3xz^2$.`,
        String.raw`$\operatorname{div}\vec F = 2xy + z^2 + 3xz^2$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Find $\operatorname{curl}\vec F$ for $\vec F = \langle x^2y,\ yz^2,\ zx\rangle$.`,
      choices: [
        { tex: String.raw`$\langle -2yz,\ -z,\ -x^2\rangle$`, correct: true },
        { tex: String.raw`$\langle -2yz,\ z,\ -x^2\rangle$`, mistake: 'curl-middle-sign', why: 'You used h_x - f_z = z for the middle component. It is f_z - h_x = 0 - z.' },
        { tex: String.raw`$\langle 2yz,\ z,\ x^2\rangle$`, mistake: 'curl-order', why: 'Every subtraction is reversed, giving the negative of the curl.' },
        { tex: String.raw`$2xy + z^2 + x$`, mistake: 'concept', why: 'That is the divergence. Curl is a vector.' },
        { tex: String.raw`$\langle 0,0,0\rangle$`, mistake: 'concept', why: 'Only gradient fields are guaranteed zero curl. Compute it.' },
      ],
      steps: [
        String.raw`$f = x^2y$, $g = yz^2$, $h = zx$.`,
        String.raw`$\mathbf i$: $h_y - g_z = 0 - 2yz = -2yz$.`,
        String.raw`$\mathbf j$: $f_z - h_x = 0 - z = -z$.`,
        String.raw`$\mathbf k$: $g_x - f_y = 0 - x^2 = -x^2$.`,
      ],
      source: 'Study plan bank #33',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`For $\vec F = \langle x^3,\ xy^2,\ yz\rangle$, find $\nabla(\operatorname{div}\vec F)$.`,
      choices: [
        { tex: String.raw`$\langle 6x + 2y,\ 2x + 1,\ 0\rangle$`, correct: true },
        { tex: String.raw`$3x^2 + 2xy + y$`, mistake: 'units', why: 'That is div F. You still need its gradient.' },
        { tex: String.raw`Undefined: you cannot take the gradient of a divergence`, mistake: 'undefined-op', why: 'div F is a scalar, and the gradient of a scalar is perfectly fine. It is curl(div F) that is undefined.' },
        { tex: String.raw`$\langle 6x + 2y,\ 2x + 1,\ y\rangle$`, mistake: 'arith', why: 'div F = 3x^2 + 2xy + y has no z, so its z-partial is 0.' },
        { tex: String.raw`$\langle 6x,\ 2x + 1,\ 0\rangle$`, mistake: 'arith', why: 'The x-partial of 2xy is 2y; it was dropped.' },
      ],
      steps: [
        String.raw`$\operatorname{div}\vec F = \partial_x(x^3) + \partial_y(xy^2) + \partial_z(yz) = 3x^2 + 2xy + y$.`,
        String.raw`Gradient: $\partial_x = 6x + 2y$, $\partial_y = 2x + 1$, $\partial_z = 0$.`,
        String.raw`$\nabla(\operatorname{div}\vec F) = \langle 6x + 2y,\ 2x + 1,\ 0\rangle$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 1,
      prompt: String.raw`Let $\vec F$ be a vector field and $\varphi$ a scalar function, both smooth. Which expression is **undefined**?`,
      choices: [
        { tex: String.raw`$\operatorname{curl}(\operatorname{div}\vec F)$`, correct: true },
        { tex: String.raw`$\operatorname{div}(\operatorname{curl}\vec F)$`, mistake: 'undefined-op', why: 'curl F is a vector field, so its divergence makes sense (and equals 0).' },
        { tex: String.raw`$\nabla(\operatorname{div}\vec F)$`, mistake: 'undefined-op', why: 'div F is a scalar, so its gradient makes sense.' },
        { tex: String.raw`$\operatorname{curl}(\nabla\varphi)$`, mistake: 'undefined-op', why: 'The gradient is a vector field, so its curl makes sense (and equals the zero vector).' },
        { tex: String.raw`$\operatorname{div}(\nabla\varphi)$`, mistake: 'undefined-op', why: 'That is the Laplacian of phi, a scalar.' },
      ],
      steps: [
        String.raw`Track types: div takes a vector and returns a scalar.`,
        String.raw`curl needs a vector field as input. $\operatorname{div}\vec F$ is a scalar, so $\operatorname{curl}(\operatorname{div}\vec F)$ has nothing to act on.`,
        String.raw`Every other option feeds each operator the right type.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`For every smooth scalar function $\varphi$ and every smooth vector field $\vec F$, what are $\operatorname{curl}(\nabla\varphi)$ and $\operatorname{div}(\operatorname{curl}\vec F)$?`,
      choices: [
        { tex: String.raw`$\operatorname{curl}(\nabla\varphi) = \langle 0,0,0\rangle$ and $\operatorname{div}(\operatorname{curl}\vec F) = 0$`, correct: true },
        { tex: String.raw`$\operatorname{curl}(\nabla\varphi) = 0$ (a number) and $\operatorname{div}(\operatorname{curl}\vec F) = \langle 0,0,0\rangle$`, mistake: 'div-is-vector', why: 'The types are swapped. Curl gives a vector; divergence gives a scalar.' },
        { tex: String.raw`$\operatorname{curl}(\nabla\varphi) = \langle 0,0,0\rangle$; $\operatorname{div}(\operatorname{curl}\vec F)$ depends on $\vec F$`, mistake: 'concept', why: 'div of a curl is always 0: the six mixed partials cancel in pairs.' },
        { tex: String.raw`$\operatorname{curl}(\nabla\varphi)$ depends on $\varphi$; $\operatorname{div}(\operatorname{curl}\vec F) = 0$`, mistake: 'concept', why: 'curl of a gradient is always zero by equality of mixed partials. Gradient fields never spin.' },
        { tex: String.raw`$\operatorname{curl}(\nabla\varphi)$ is undefined; $\operatorname{div}(\operatorname{curl}\vec F) = 0$`, mistake: 'undefined-op', why: 'The gradient is a vector field, so its curl is defined.' },
      ],
      steps: [
        String.raw`$\operatorname{curl}\langle\varphi_x,\varphi_y,\varphi_z\rangle = \langle\varphi_{zy} - \varphi_{yz},\ \varphi_{xz} - \varphi_{zx},\ \varphi_{yx} - \varphi_{xy}\rangle = \vec 0$ by Clairaut.`,
        String.raw`$\operatorname{div}(\operatorname{curl}\vec F) = (h_{yx} - g_{zx}) + (f_{zy} - h_{xy}) + (g_{xz} - f_{yz}) = 0$.`,
        String.raw`The first is a vector, the second a scalar.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`Which statement about $\vec F = \langle yz,\ xz,\ xy\rangle$ is true?`,
      choices: [
        { tex: String.raw`$\operatorname{curl}\vec F = \vec 0$ and $\operatorname{div}\vec F = 0$: irrotational and source-free`, correct: true },
        { tex: String.raw`$\operatorname{curl}\vec F = \vec 0$ and $\operatorname{div}\vec F = x + y + z$`, mistake: 'wrong-partial', why: 'You differentiated each component by the wrong variable. The x-partial of yz is 0.' },
        { tex: String.raw`$\operatorname{curl}\vec F = \langle 2x, 2y, 2z\rangle$ and $\operatorname{div}\vec F = 0$`, mistake: 'curl-order', why: 'You added the two terms in each component instead of subtracting: h_y + g_z = 2x.' },
        { tex: String.raw`$\operatorname{curl}\vec F = \vec 0$, so $\vec F$ is not conservative`, mistake: 'concept', why: 'Backwards: zero curl on all of space means F is conservative. In fact F = grad(xyz).' },
        { tex: String.raw`$\operatorname{div}\vec F = \langle 0,0,0\rangle$`, mistake: 'div-is-vector', why: 'Divergence is a scalar, 0, not a vector.' },
      ],
      steps: [
        String.raw`$\mathbf i$: $h_y - g_z = x - x = 0$. $\mathbf j$: $f_z - h_x = y - y = 0$. $\mathbf k$: $g_x - f_y = z - z = 0$.`,
        String.raw`$\operatorname{div}\vec F = \partial_x(yz) + \partial_y(xz) + \partial_z(xy) = 0$.`,
        String.raw`Both vanish. In fact $\vec F = \nabla(xyz)$, which explains the zero curl.`,
      ],
      source: 'Study plan bank #34',
    },
    {
      id: 'p7',
      difficulty: 2,
      prompt: String.raw`For $\vec F = \langle x - y,\ x + y,\ 0\rangle$, find $\operatorname{curl}\vec F$ and $\operatorname{div}\vec F$.`,
      choices: [
        { tex: String.raw`$\operatorname{curl}\vec F = \langle 0,0,2\rangle$, $\operatorname{div}\vec F = 2$`, correct: true },
        { tex: String.raw`$\operatorname{curl}\vec F = \langle 0,0,-2\rangle$, $\operatorname{div}\vec F = 2$`, mistake: 'curl-order', why: 'You computed f_y - g_x = -1 - 1. The k component is g_x - f_y.' },
        { tex: String.raw`$\operatorname{curl}\vec F = \langle 0,0,2\rangle$, $\operatorname{div}\vec F = \langle 1,1,0\rangle$`, mistake: 'div-is-vector', why: 'Add the partials: the divergence is 1 + 1 + 0 = 2.' },
        { tex: String.raw`$\operatorname{curl}\vec F = \langle 0,0,2\rangle$, $\operatorname{div}\vec F = 0$`, mistake: 'arith', why: 'f_x = 1 and g_y = 1, so the divergence is 2, not 0.' },
        { tex: String.raw`$\operatorname{curl}\vec F = \vec 0$, $\operatorname{div}\vec F = 2$`, mistake: 'concept', why: 'A field being linear does not make its curl zero. The -y and +x parts spin.' },
      ],
      steps: [
        String.raw`$f = x - y$, $g = x + y$, $h = 0$. Only the $\mathbf k$ component of the curl can be nonzero.`,
        String.raw`$g_x - f_y = 1 - (-1) = 2$, so $\operatorname{curl}\vec F = \langle 0,0,2\rangle$.`,
        String.raw`$\operatorname{div}\vec F = 1 + 1 + 0 = 2$.`,
        String.raw`This field is the rotation $\langle -y,x\rangle$ plus the source $\langle x,y\rangle$: it spins and spreads at once.`,
      ],
      source: 'original',
    },
    {
      id: 'p8',
      difficulty: 3,
      prompt: String.raw`Let $\varphi = xy^2 + yz^3$. Find $\operatorname{div}(\nabla\varphi)$ at the point $(1,2,1)$.`,
      choices: [
        { tex: String.raw`$14$`, correct: true },
        { tex: String.raw`$\langle 4, 5, 6\rangle$`, mistake: 'units', why: 'That is the gradient at the point. You still need its divergence.' },
        { tex: String.raw`$15$`, mistake: 'concept', why: 'You added the first partials 4 + 5 + 6. The Laplacian adds second partials.' },
        { tex: String.raw`$0$`, mistake: 'concept', why: 'Zero is the identity for curl(grad phi) and div(curl F). div(grad phi) is the Laplacian, which is usually not 0.' },
        { tex: String.raw`$8$`, mistake: 'arith', why: 'phi_zz = 6yz = 12 at the point, not 6.' },
      ],
      steps: [
        String.raw`$\nabla\varphi = \langle y^2,\ 2xy + z^3,\ 3yz^2\rangle$.`,
        String.raw`$\operatorname{div}(\nabla\varphi) = \partial_x(y^2) + \partial_y(2xy + z^3) + \partial_z(3yz^2) = 0 + 2x + 6yz$.`,
        String.raw`At $(1,2,1)$: $2 + 12 = 14$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'vectorField', P: '-y', Q: 'x', R: '0', density: 7 },
    { kind: 'vectorField', P: 'x', Q: 'y', R: '0', density: 7 },
    { kind: 'vectorField', P: 'x - y', Q: 'x + y', R: '0', density: 7 },
  ],
};
