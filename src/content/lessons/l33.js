export default {
  id: 33,
  title: 'Flux integrals',
  section: '17.6',
  exam: 3,
  blurb: 'Measure how much of a vector field flows through a surface, with the normal pointing the right way.',
  boiler: ['Flux Integrals', 'Surface Integrals', 'Normal Vector'],

  sections: [
    {
      id: 'idea',
      title: 'The idea: flow through a surface',
      body: String.raw`Think of $\vec F$ as the velocity of a fluid and $S$ as a net held in the stream. The **flux** is how much fluid passes through the net per unit time.

Only the part of $\vec F$ that crosses the surface counts. Flow sliding along the net passes nothing. If $\vec n$ is the unit normal, the crossing part is the scalar $\vec F\cdot\vec n$. Add it up over the surface:

$$\iint_S\vec F\cdot d\vec S=\iint_S(\vec F\cdot\vec n)\,dS.$$

The sign matters. Flow in the direction of $\vec n$ counts as positive, flow against it as negative. So before you compute a flux you must decide which way $\vec n$ points. That choice is called the **orientation** of $S$.

Quick check from lecture: $\vec F=\langle0,0,4\rangle$ through a $3\times2$ rectangle in the $xy$-plane with $\vec n=\langle0,0,1\rangle$ gives $\vec F\cdot\vec n=4$, so the flux is $4\cdot6=24$. The field $\langle0,7,0\rangle$ is parallel to that rectangle, so its flux is 0.`,
    },
    {
      id: 'formula',
      title: 'The working formula: no magnitude',
      body: String.raw`On a parametrized surface the unit normal is
$$\vec n=\pm\frac{\vec r_u\times\vec r_v}{|\vec r_u\times\vec r_v|},\qquad dS=|\vec r_u\times\vec r_v|\,dA.$$
Multiply them and the magnitudes cancel:

$$\iint_S\vec F\cdot d\vec S=\iint_R\vec F(\vec r(u,v))\cdot\left(\pm\,\vec r_u\times\vec r_v\right)dA.$$

This is the formula you actually use. Two things to notice:
- There is **no** $|\vec r_u\times\vec r_v|$ anywhere. You dot with the cross product vector itself. No square roots.
- There **is** a $\pm$. You choose it to match the required orientation.

**Recipe.**
1. Parametrize $S$, write the $u,v$ ranges.
2. Compute $\vec r_u\times\vec r_v$.
3. Check its direction at one sample point. Keep it or flip it.
4. Substitute $\vec r(u,v)$ into $\vec F$.
5. Dot, then integrate over $R$.`,
    },
    {
      id: 'orientation',
      title: 'Which way does the normal point?',
      body: String.raw`The problem will either name a direction or rely on the convention:
- **Closed surface** (sphere, closed cylinder, box): **outward**.
- **Open surface** like a graph or a cap: **upward** (positive $z$-component), unless told otherwise.
- Otherwise the problem says it: "toward the positive $x$-axis", "downward", "away from the $z$-axis".

**How to check.** Plug one easy point into $\vec r_u\times\vec r_v$ and look at the relevant component.
- Graph $z=f(x,y)$: $\vec r_u\times\vec r_v=\langle -f_x,-f_y,1\rangle$. The $z$-component is $+1$, so this is always **upward**. Downward is $\langle f_x,f_y,-1\rangle$.
- Sphere $\vec r(\phi,\theta)$: $\vec r_\phi\times\vec r_\theta=a\sin\phi\,\vec r$, a positive multiple of the position vector, so it points **outward**.
- Cylinder $\langle u,2\cos v,2\sin v\rangle$ around the $x$-axis: $\vec r_u\times\vec r_v=\langle0,-2\cos v,-2\sin v\rangle$. At $v=0$ that is $\langle0,-2,0\rangle$, pointing from $(u,2,0)$ toward the axis. That is **inward**, so outward needs the minus sign.

For $z=x^2$, $0\le x\le2$, $0\le y\le4$: upward is $\langle-2u,0,1\rangle$, downward is $\langle2u,0,-1\rangle$. "Toward the positive $x$-axis" means a positive $x$-component, which is also $\langle2u,0,-1\rangle$.`,
    },
    {
      id: 'example-graph',
      title: 'Worked example: z = x², normal downward',
      body: String.raw`Find the flux of $\vec F=\langle1,z,-x\rangle$ through $z=x^2$, $0\le x\le2$, $0\le y\le4$, with the normal pointing downward.

1. $\vec r=\langle u,v,u^2\rangle$, $0\le u\le2$, $0\le v\le4$.
2. $\vec r_u\times\vec r_v=\langle-2u,0,1\rangle$. Its $z$-component is positive, so it points up.
3. Downward: use $-(\vec r_u\times\vec r_v)=\langle2u,0,-1\rangle$.
4. On the surface $\vec F=\langle1,u^2,-u\rangle$.
5. $\langle1,u^2,-u\rangle\cdot\langle2u,0,-1\rangle=2u+u=3u$, so
$$\int_0^4\!\int_0^2 3u\,du\,dv=6\cdot4=24.$$

Had you kept the upward normal you would get $-24$. Same work, opposite sign: that is what orientation controls.`,
    },
    {
      id: 'example-more',
      title: 'Worked examples: a plane and a cylinder',
      body: String.raw`**Plane, normal toward $+x$.** $\vec F=\langle x,y,z\rangle$ through $4x+3y+z=12$ in the first octant. With $\vec r=\langle u,v,12-4u-3v\rangle$, $\vec r_u\times\vec r_v=\langle4,3,1\rangle$, which already has a positive $x$-component. Then
$$\vec F\cdot\langle4,3,1\rangle=4u+3v+(12-4u-3v)=12,$$
so the flux is $12\times(\text{area of the triangle } 4u+3v\le12)=12\cdot6=72$.

**Cylinder, outward.** $\vec F=\langle x^7,z^3,y^3\rangle$ through $y^2+z^2=4$, $0\le x\le7$. Use $\vec r=\langle u,2\cos v,2\sin v\rangle$ and the outward normal $\langle0,2\cos v,2\sin v\rangle$. On the surface $\vec F=\langle u^7,8\sin^3v,8\cos^3v\rangle$, so
$$\vec F\cdot\vec N=16\sin^3v\cos v+16\cos^3v\sin v=16\sin v\cos v,$$
and $\int_0^{2\pi}\!\int_0^7 16\sin v\cos v\,du\,dv=0$. The $x^7$ term never mattered because the normal has no $x$-component.

**Paraboloid sideways** (from the final review): $x=y^2+z^2$, $x\le3$, normal toward $+x$, $\vec F=\langle4x,y,z\rangle$. $\vec r=\langle u^2+v^2,u,v\rangle$, $\vec r_u\times\vec r_v=\langle1,-2u,-2v\rangle$, $\vec F\cdot\vec N=2(u^2+v^2)$. Over the disk $u^2+v^2\le3$ in polar, the flux is $9\pi$.`,
    },
    {
      id: 'decide',
      title: 'Before you parametrize: the decision tree',
      body: String.raw`Parametrizing works on every flux integral, but the next lessons give shortcuts. From the final review, to compute $\iint_S\vec F\cdot\vec n\,dS$:

1. Is $\vec F$ a **curl field**, $\vec F=\nabla\times\vec G$? Use **Stokes' theorem** (Lessons 34-35): move to the boundary curve.
2. Is $S$ a **closed surface**? Use the **divergence theorem** (Lessons 36-37): move to the solid inside.
3. Neither? **Parametrize** and use the formula above. If $S$ is almost closed, you can also add a lid and subtract it (Lesson 37).

Also keep the two kinds of surface integral apart. $\iint f\,dS$ uses $|\vec r_u\times\vec r_v|$ and has no orientation. $\iint\vec F\cdot d\vec S$ uses $\pm\vec r_u\times\vec r_v$ and needs one.`,
    },
  ],

  formulas: [
    { label: 'Flux', tex: String.raw`\iint_S\vec F\cdot d\vec S=\iint_S\vec F\cdot\vec n\,dS=\iint_R\vec F(\vec r(u,v))\cdot(\pm\,\vec r_u\times\vec r_v)\,dA` },
    { label: 'Unit normal', tex: String.raw`\vec n=\pm\frac{\vec r_u\times\vec r_v}{|\vec r_u\times\vec r_v|}` },
    { label: 'Graph, upward', tex: String.raw`z=f(x,y):\ \vec r_u\times\vec r_v=\langle -f_x,-f_y,1\rangle` },
    { label: 'Sphere, outward', tex: String.raw`\vec r_\phi\times\vec r_\theta=a^2\sin\phi\,\langle\sin\phi\cos\theta,\sin\phi\sin\theta,\cos\phi\rangle` },
    { label: 'Convention', tex: String.raw`\text{closed: outward;}\quad\text{open graph: upward;}\quad\text{or as stated}` },
  ],

  mistakes: [
    {
      id: 'orientation',
      title: 'Normal pointing the wrong way',
      wrong: String.raw`Outward flux through $y^2+z^2=4$ using $\vec r_u\times\vec r_v=\langle0,-2\cos v,-2\sin v\rangle$`,
      right: String.raw`That vector points toward the axis. Outward is $\langle0,2\cos v,2\sin v\rangle$`,
      why: 'r_u × r_v points whichever way the parametrization makes it point. Test one point, then keep it or flip it. A wrong choice flips the sign of the answer.',
    },
    {
      id: 'extra-magnitude',
      title: 'Multiplying by |r_u × r_v| in a flux integral',
      wrong: String.raw`$\iint_R\vec F\cdot(\vec r_u\times\vec r_v)\,|\vec r_u\times\vec r_v|\,dA$`,
      right: String.raw`$\iint_R\vec F\cdot(\vec r_u\times\vec r_v)\,dA$`,
      why: 'The magnitude in dS cancels the magnitude in the unit normal. Flux uses F · (r_u × r_v) dA with no square root.',
    },
    {
      id: 'not-substituted',
      title: 'Not evaluating F on the surface',
      wrong: String.raw`On $z=1-x^2$, treating $\vec F=\langle x,0,z\rangle$ as $\langle u,0,1\rangle$`,
      right: String.raw`$\vec F(\vec r(u,v))=\langle u,0,1-u^2\rangle$`,
      why: 'Every x, y, z in F must be replaced by the components of r(u, v) before you dot.',
    },
    {
      id: 'ranges',
      title: 'Wrong parameter ranges',
      wrong: String.raw`$x=y^2+z^2$, $x\le4$ integrated over $u^2+v^2\le16$`,
      right: String.raw`$x=u^2+v^2\le4$, so the disk has radius 2`,
      why: 'Translate the restriction on x, y or z into u and v. The radius of the disk is the square root of 4.',
    },
    {
      id: 'cross-error',
      title: 'A slip inside the cross product',
      wrong: String.raw`For $z=1-x^2$: $\vec r_u\times\vec r_v=\langle-2u,0,1\rangle$`,
      right: String.raw`$\langle-f_x,-f_y,1\rangle=\langle2u,0,1\rangle$ since $f_x=-2u$`,
      why: 'One sign slip in a single component changes the integrand, not just the overall sign. Use the graph shortcut or check that the normal is perpendicular to r_u.',
    },
  ],

  hook: 'Flux: dot with the cross product, never its length, and check which way it points.',

  scene: {
    view: { range: 4.5, z: [-3.2, 5] },
    camera: [7, -6, 5],
    layers: [
      { id: 'surf', kind: 'paramSurface', x: 'u', y: 'v', z: 'u^2', u: [0, 2], v: [0, 4], colormap: 'water', opacity: 0.85 },
      { id: 'up1', kind: 'vector', from: [0.5, 1, 0.25], to: [-0.207, 1, 0.957], color: 'wood' },
      { id: 'up2', kind: 'vector', from: [1, 2, 1], to: [0.106, 2, 1.447], color: 'wood', label: 'up' },
      { id: 'up3', kind: 'vector', from: [1.5, 3, 2.25], to: [0.551, 3, 2.566], color: 'wood' },
      { id: 'dn1', kind: 'vector', from: [0.5, 1, 0.25], to: [1.207, 1, -0.457], color: 'road' },
      { id: 'dn2', kind: 'vector', from: [1, 2, 1], to: [1.894, 2, 0.553], color: 'road', label: 'down' },
      { id: 'dn3', kind: 'vector', from: [1.5, 3, 2.25], to: [2.449, 3, 1.934], color: 'road' },
      { id: 'F', kind: 'vectorField', P: '1', Q: 'z', R: '-x', density: 5 },
      { id: 'cyl', kind: 'paramSurface', x: 'u', y: '2*cos(v)', z: '2*sin(v)', u: [0, 3], v: [0, '2*pi'], colormap: 'viridis', opacity: 0.55 },
      { id: 'in1', kind: 'vector', from: [1.5, 2, 0], to: [1.5, 1, 0], color: 'road', label: 'r_u x r_v' },
      { id: 'in2', kind: 'vector', from: [1.5, 0, 2], to: [1.5, 0, 1], color: 'road' },
      { id: 'out1', kind: 'vector', from: [1.5, 2, 0], to: [1.5, 3, 0], color: 'wood', label: 'outward' },
      { id: 'out2', kind: 'vector', from: [1.5, 0, 2], to: [1.5, 0, 3], color: 'wood' },
      { id: 'out3', kind: 'vector', from: [1.5, -2, 0], to: [1.5, -3, 0], color: 'wood' },
      { id: 'out4', kind: 'vector', from: [1.5, 0, -2], to: [1.5, 0, -3], color: 'wood' },
    ],
    steps: [
      { label: 'Start', show: ['surf'], caption: String.raw`The sheet $z=x^2$, $0\le x\le2$, $0\le y\le4$, parametrized as $\langle u,v,u^2\rangle$. Every surface has two sides, and flux needs you to pick one.` },
      { label: 'Upward', show: ['surf', 'up1', 'up2', 'up3'], caption: String.raw`$\vec r_u\times\vec r_v=\langle-2u,0,1\rangle$ has a positive $z$-component, so it points up (green). For any graph, $\langle-f_x,-f_y,1\rangle$ is the upward normal.` },
      { label: 'Downward', show: ['surf', 'dn1', 'dn2', 'dn3'], caption: String.raw`The problem asks for downward, so flip it: $\langle2u,0,-1\rangle$ (red). This is the only change, and it flips the sign of the answer.` },
      { label: 'Field', show: ['surf', 'dn1', 'dn2', 'dn3', 'F'], caption: String.raw`$\vec F=\langle1,z,-x\rangle$ on the sheet is $\langle1,u^2,-u\rangle$. Dot with $\langle2u,0,-1\rangle$: $3u$. The flux is $\int_0^4\!\int_0^2 3u\,du\,dv=24$.` },
      { label: 'Test a point', show: ['cyl', 'in1', 'in2'], caption: String.raw`For the cylinder $\langle u,2\cos v,2\sin v\rangle$, $\vec r_u\times\vec r_v=\langle0,-2\cos v,-2\sin v\rangle$. At $v=0$ and $v=\pi/2$ it points toward the axis: inward.` },
      { label: 'Outward', show: ['cyl', 'out1', 'out2', 'out3', 'out4'], caption: String.raw`So the outward normal is $\langle0,2\cos v,2\sin v\rangle$. Always test one easy point instead of trusting the order of the cross product.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Find the flux of $\vec F=\langle0,0,3\rangle$ through the disk $x^2+y^2\le4$ in the plane $z=0$, oriented upward.`,
      choices: [
        { tex: String.raw`$12\pi$`, correct: true },
        { tex: String.raw`$-12\pi$`, mistake: 'orientation', why: 'Upward means n = ⟨0, 0, 1⟩, and F points the same way, so the flux is positive.' },
        { tex: String.raw`$4\pi$`, mistake: 'arith', why: 'That is only the area. F · n = 3, so multiply by 3.' },
        { tex: String.raw`$0$`, mistake: 'concept', why: 'A constant field still has flux. It is zero only when F is parallel to the surface.' },
        { tex: String.raw`$48\pi$`, mistake: 'ranges', why: 'x² + y² ≤ 4 has radius 2, not 4.' },
      ],
      steps: [
        String.raw`Flat disk, upward: $\vec n=\langle0,0,1\rangle$, so $\vec F\cdot\vec n=3$ everywhere.`,
        String.raw`Flux $=\iint_S3\,dS=3\cdot\text{Area}=3\cdot4\pi=12\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Find the flux of $\vec F=\langle x,y,z\rangle$ through the part of the plane $2x+y+z=4$ in the first octant, with the normal pointing upward.`,
      choices: [
        { tex: String.raw`$16$`, correct: true },
        { tex: String.raw`$-16$`, mistake: 'orientation', why: '⟨2, 1, 1⟩ already has a positive z-component, so no sign flip is needed.' },
        { tex: String.raw`$16\sqrt6$`, mistake: 'extra-magnitude', why: 'You multiplied by |r_u × r_v| = √6. Flux uses the cross product vector only.' },
        { tex: String.raw`$8$`, mistake: 'ranges', why: 'The shadow triangle reaches x = 2 and y = 4, so its area is 4, not 2.' },
        { tex: String.raw`$32$`, mistake: 'arith', why: 'The triangle area is (1/2)(2)(4) = 4. You forgot the 1/2.' },
      ],
      steps: [
        String.raw`$\vec r=\langle u,v,4-2u-v\rangle$, $\vec r_u\times\vec r_v=\langle2,1,1\rangle$ (upward).`,
        String.raw`$\vec F\cdot\langle2,1,1\rangle=2u+v+(4-2u-v)=4$.`,
        String.raw`Region: $u,v\ge0$, $2u+v\le4$, a triangle of area 4. Flux $=4\cdot4=16$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Let $S$ be the surface $z=1-x^2$, $0\le x\le1$, $0\le y\le2$, oriented upward. Find $\iint_S\vec F\cdot d\vec S$ for $\vec F=\langle x,0,z\rangle$.`,
      choices: [
        { tex: String.raw`$\dfrac83$`, correct: true },
        { tex: String.raw`$-\dfrac83$`, mistake: 'orientation', why: 'You used the downward normal ⟨-2u, 0, -1⟩.' },
        { tex: String.raw`$0$`, mistake: 'cross-error', why: 'With f = 1 - x², -f_x = +2u. Using ⟨-2u, 0, 1⟩ gives 1 - 3u², which integrates to 0.' },
        { tex: String.raw`$\dfrac{10}{3}$`, mistake: 'not-substituted', why: 'You set z = 1 instead of z = 1 - u² on the surface.' },
        { tex: String.raw`$\dfrac43$`, mistake: 'ranges', why: 'y runs from 0 to 2, so the v integral contributes 2.' },
      ],
      steps: [
        String.raw`$\vec r=\langle u,v,1-u^2\rangle$, $\vec r_u\times\vec r_v=\langle-f_x,-f_y,1\rangle=\langle2u,0,1\rangle$, upward.`,
        String.raw`$\vec F(\vec r)=\langle u,0,1-u^2\rangle$, so $\vec F\cdot\vec N=2u^2+1-u^2=1+u^2$.`,
        String.raw`$\int_0^2\!\int_0^1(1+u^2)\,du\,dv=2\cdot\tfrac43=\tfrac83$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Find the outward flux of $\vec F=\langle x,y,z\rangle$ through the side of the cylinder $x^2+y^2=4$, $0\le z\le3$ (no top or bottom).`,
      choices: [
        { tex: String.raw`$24\pi$`, correct: true },
        { tex: String.raw`$-24\pi$`, mistake: 'orientation', why: 'You used an inward normal. ⟨2cos u, 2sin u, 0⟩ points away from the axis.' },
        { tex: String.raw`$36\pi$`, mistake: 'concept', why: 'That includes the top disk (flux 12π). The problem asks for the side only.' },
        { tex: String.raw`$48\pi$`, mistake: 'extra-magnitude', why: 'You multiplied by |r_u × r_v| = 2 on top of the dot product.' },
        { tex: String.raw`$12\pi$`, mistake: 'ranges', why: 'The angle u runs from 0 to 2π, not π.' },
      ],
      steps: [
        String.raw`$\vec r=\langle2\cos u,2\sin u,v\rangle$, $0\le u\le2\pi$, $0\le v\le3$.`,
        String.raw`$\vec r_u\times\vec r_v=\langle2\cos u,2\sin u,0\rangle$. At $u=0$ it is $\langle2,0,0\rangle$ at the point $(2,0,v)$: outward.`,
        String.raw`$\vec F\cdot\vec N=4\cos^2u+4\sin^2u=4$. Flux $=4\cdot2\pi\cdot3=24\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Find the flux of $\vec F=\langle0,0,z\rangle$ through the upper hemisphere $x^2+y^2+z^2=4$, $z\ge0$, oriented upward.`,
      choices: [
        { tex: String.raw`$\dfrac{16\pi}{3}$`, correct: true },
        { tex: String.raw`$-\dfrac{16\pi}{3}$`, mistake: 'orientation', why: 'r_φ × r_θ points outward, which is upward on the top half. No flip needed.' },
        { tex: String.raw`$\dfrac{32\pi}{3}$`, mistake: 'ranges', why: 'φ to π is the whole sphere. The hemisphere stops at φ = π/2.' },
        { tex: String.raw`$\dfrac{4\pi}{3}$`, mistake: 'setup', why: 'You used the unit-sphere normal with dφ dθ and lost the factor 4 from a².' },
        { tex: String.raw`$8\pi$`, mistake: 'cross-error', why: 'The z-component of r_φ × r_θ is 4 sin φ cos φ, not 4 sin φ.' },
      ],
      steps: [
        String.raw`$\vec r_\phi\times\vec r_\theta=\langle4\sin^2\phi\cos\theta,4\sin^2\phi\sin\theta,4\sin\phi\cos\phi\rangle$, outward.`,
        String.raw`$\vec F=\langle0,0,2\cos\phi\rangle$, so $\vec F\cdot\vec N=8\sin\phi\cos^2\phi$.`,
        String.raw`$\int_0^{2\pi}\!\int_0^{\pi/2}8\sin\phi\cos^2\phi\,d\phi\,d\theta=2\pi\cdot\tfrac83=\tfrac{16\pi}{3}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 3,
      prompt: String.raw`Let $S$ be the part of the paraboloid $x=y^2+z^2$ with $x\le4$, with normal vectors that have a positive $x$-component. Find the flux of $\vec F=\langle3x,y,z\rangle$ through $S$.`,
      choices: [
        { tex: String.raw`$8\pi$`, correct: true },
        { tex: String.raw`$-8\pi$`, mistake: 'orientation', why: 'You used ⟨-1, 2u, 2v⟩, which has a negative x-component.' },
        { tex: String.raw`$40\pi$`, mistake: 'cross-error', why: 'r_u × r_v = ⟨1, -2u, -2v⟩. With +2u and +2v you get 5r² instead of r².' },
        { tex: String.raw`$128\pi$`, mistake: 'ranges', why: 'u² + v² ≤ 4 is a disk of radius 2, not 4.' },
        { tex: String.raw`$\dfrac{16\pi}{3}$`, mistake: 'setup', why: 'In polar dA = r dr dθ. You dropped the r.' },
      ],
      steps: [
        String.raw`$\vec r=\langle u^2+v^2,u,v\rangle$ with $u^2+v^2\le4$.`,
        String.raw`$\vec r_u=\langle2u,1,0\rangle$, $\vec r_v=\langle2v,0,1\rangle$, $\vec r_u\times\vec r_v=\langle1,-2u,-2v\rangle$: positive $x$-component, keep it.`,
        String.raw`$\vec F\cdot\vec N=3(u^2+v^2)-2u^2-2v^2=u^2+v^2$.`,
        String.raw`Polar: $\int_0^{2\pi}\!\int_0^2r^2\cdot r\,dr\,d\theta=2\pi\cdot4=8\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Find the flux of $\vec F=\langle x,y,0\rangle$ through the cone $z=\sqrt{x^2+y^2}$, $0\le z\le3$, with the normal pointing downward (away from the $z$-axis).`,
      choices: [
        { tex: String.raw`$18\pi$`, correct: true },
        { tex: String.raw`$-18\pi$`, mistake: 'orientation', why: 'r_u × r_v = ⟨-u cos v, -u sin v, u⟩ points up and in. Downward needs the minus sign.' },
        { tex: String.raw`$\dfrac{81\sqrt2\,\pi}{2}$`, mistake: 'extra-magnitude', why: 'You also multiplied by |r_u × r_v| = √2 u.' },
        { tex: String.raw`$9\pi$`, mistake: 'ranges', why: 'v must go from 0 to 2π.' },
        { tex: String.raw`$54\pi$`, mistake: 'arith', why: 'The integral of u² from 0 to 3 is 9, not 27.' },
      ],
      steps: [
        String.raw`$\vec r=\langle u\cos v,u\sin v,u\rangle$, $0\le u\le3$, $0\le v\le2\pi$.`,
        String.raw`$\vec r_u\times\vec r_v=\langle-u\cos v,-u\sin v,u\rangle$ has $z$-component $u>0$: upward. Downward is $\langle u\cos v,u\sin v,-u\rangle$.`,
        String.raw`$\vec F=\langle u\cos v,u\sin v,0\rangle$, so $\vec F\cdot\vec N=u^2$.`,
        String.raw`$\int_0^{2\pi}\!\int_0^3u^2\,du\,dv=2\pi\cdot9=18\pi$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: 'x^2' },
    { kind: 'vectorField', P: '1', Q: 'z', R: '-x', density: 5 },
    { kind: 'paramSurface', x: 'u', y: '2*cos(v)', z: '2*sin(v)', u: [0, 3], v: [0, '2*pi'] },
  ],
};
