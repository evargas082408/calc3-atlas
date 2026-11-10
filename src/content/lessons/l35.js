export default {
  id: 35,
  title: "Stokes' theorem in practice",
  section: '17.7',
  exam: 3,
  blurb: 'Swap a hard surface for an easy one, and use Stokes to do 3D loop integrals.',
  boiler: ['Stokes Theorem', 'Conservative Fields'],

  sections: [
    {
      id: 'independence',
      title: 'Surface independence',
      body: String.raw`Stokes' theorem says $\iint_S\operatorname{curl}\vec F\cdot d\vec S=\oint_C\vec F\cdot d\vec r$. The right side only knows about the curve $C$. So:

**Any two surfaces with the same boundary curve, oriented compatibly with it, have the same flux of $\operatorname{curl}\vec F$.**

This mirrors path independence. For a conservative field $\vec F=\nabla\phi$, $\int_C\nabla\phi\cdot d\vec r=\phi(\text{end})-\phi(\text{start})$ no matter which path joins the two points. For a curl field $\operatorname{curl}\vec F$, the flux depends only on the boundary loop, not on the surface stretched across it.

That gives you three ways to compute $\iint_S\operatorname{curl}\vec F\cdot d\vec S$:
1. **Direct**: parametrize $S$, find the normal, integrate. Usually the slowest.
2. **Line integral**: parametrize $C$ and compute $\oint_C\vec F\cdot d\vec r$.
3. **Easy surface**: replace $S$ by a flat surface $S_2$ with the same boundary, often a disk with $\vec n=\pm\vec k$, and compute $\iint_{S_2}\operatorname{curl}\vec F\cdot\vec n\,dS$.`,
    },
    {
      id: 'easy-surface',
      title: 'Worked example: the flat disk shortcut',
      body: String.raw`$\vec F=\langle xz,yz,xy\rangle$, $S$ = the part of $x^2+y^2+z^2=4$ above $z=\sqrt3$, outward. Find $\iint_S\operatorname{curl}\vec F\cdot d\vec S$.

The rim: $x^2+y^2=4-3=1$ at $z=\sqrt3$.

**Path A, line integral.** $\vec r=\langle\cos t,\sin t,\sqrt3\rangle$. Then $\vec F=\langle\sqrt3\cos t,\sqrt3\sin t,\sin t\cos t\rangle$ and $\vec F\cdot\vec r^{\,\prime}=-\sqrt3\cos t\sin t+\sqrt3\sin t\cos t=0$. The integral is 0.

**Path B, easy surface.** $S_2$ = the disk of radius 1 at height $\sqrt3$, $\vec n=\langle0,0,1\rangle$ (up matches outward on the cap). $\operatorname{curl}\vec F=\langle x-y,\ x-y,\ 0\rangle$, so $\operatorname{curl}\vec F\cdot\vec n=0$ and the flux is 0.

**The height does not matter.** For the half-ellipsoid $x^2+y^2+z^2/a^2=1$, $z\ge0$, and $\vec F=\langle y,z,x\rangle$, every value of $a$ gives the same boundary, the unit circle at $z=0$. With $\operatorname{curl}\vec F=\langle-1,-1,-1\rangle$ and the disk's $\vec n=\vec k$, the flux is $-1\cdot\pi=-\pi$ for every $a$. The line integral agrees: $\int_0^{2\pi}(-\sin^2t)\,dt=-\pi$. A question asking which $a$ maximizes it has no best $a$: the value is constant.`,
    },
    {
      id: 'loops',
      title: 'Stokes for 3D loop integrals',
      body: String.raw`Going the other way: to compute $\oint_C\vec F\cdot d\vec r$ around a closed curve in space, pick any surface $S$ with boundary $C$ and compute $\iint_S\operatorname{curl}\vec F\cdot d\vec S$. A triangle or polygon in a plane is perfect, because the normal is constant.

**Lecture example.** $C$ is the triangle $(0,0,0)\to(0,1,0)\to(0,0,1)\to(0,0,0)$, and $\vec F=\langle-3y,4z,6x\rangle$. Green's theorem does not apply (not in the $xy$-plane) and $\vec F$ is not conservative. Doing it directly needs three segments. With Stokes, take $S$ = the flat triangle in the $yz$-plane. The curve runs counterclockwise seen from the $+x$ side, so $\vec n=\langle1,0,0\rangle$ by the right-hand rule. Only the first curl component matters: $R_y-Q_z=0-4=-4$. So
$$\oint_C\vec F\cdot d\vec r=\iint_S(-4)\,dS=-4\cdot\tfrac12=-2.$$

**Tilted plane.** $C$ is the boundary of $z=6-3x-y$ in the first octant (counterclockwise from above) and $\vec F=\langle y+2z,-x,-2x\rangle$. $\operatorname{curl}\vec F=\langle0,4,-2\rangle$. Parametrize $\vec r=\langle u,v,6-3u-v\rangle$, so $\vec r_u\times\vec r_v=\langle3,1,1\rangle$, upward. Then $\langle0,4,-2\rangle\cdot\langle3,1,1\rangle=2$, and the shadow triangle has area $\tfrac12(2)(6)=6$. Answer: 12.

Use $\vec r_u\times\vec r_v$ with $dA$ over the shadow. If you use a unit normal, you must use $dS$ (area on the plane), not $dA$.`,
    },
    {
      id: 'gradient',
      title: 'When the answer is zero for free',
      body: String.raw`Two identities save time.

- $\operatorname{curl}(\nabla\phi)=\vec0$. So if $\vec F=\nabla\phi$, then $\iint_S\operatorname{curl}\vec F\cdot d\vec S=0$ for every surface. Equivalently, by Stokes, it equals $\oint_C\nabla\phi\cdot d\vec r=0$ by the Fundamental Theorem for Line Integrals. Lecture example: $\phi=xyz\sin(x^2yz)$ over a paraboloid gives 0 without any work.
- If $S$ is a **closed** surface (a sphere, the boundary of a cube), it has no boundary curve at all. So $\iint_S\operatorname{curl}\vec F\cdot d\vec S=0$ for every $\vec F$. Lesson 36 shows the same fact with $\operatorname{div}(\operatorname{curl}\vec G)=0$.

Before computing a curl flux, ask: is $\vec F$ a gradient? Is $S$ closed?`,
    },
    {
      id: 'decide',
      title: 'Decision trees from the review',
      body: String.raw`**Line integral** $\int_C\vec F\cdot d\vec r$:
1. $\vec F$ conservative? FTCLI: $\phi(\text{end})-\phi(\text{start})$, and 0 on a closed loop.
2. $C$ closed and flat in the $xy$-plane? Green's theorem.
3. $C$ closed in 3D? Stokes: pick a surface with boundary $C$, usually flat.
4. Otherwise: parametrize $C$.

**Surface integral** $\iint_S\vec F\cdot\vec n\,dS$:
1. $\vec F$ a curl field ($\vec F=\operatorname{curl}\vec G$)? Stokes: go to the boundary, or to an easier surface with the same boundary.
2. $S$ closed? Divergence theorem (Lesson 36).
3. Otherwise: parametrize $S$.

**Orientation check for the easy surface.** The replacement surface must have the *same* boundary and induce the *same* direction on it. For a dome over the $xy$-plane oriented up, the flat disk must also be oriented up. If you orient the disk down, its flux is the negative.`,
    },
  ],

  formulas: [
    { label: 'Surface independence', tex: String.raw`\partial S_1=\partial S_2=C\ \Rightarrow\ \iint_{S_1}\operatorname{curl}\vec F\cdot d\vec S=\iint_{S_2}\operatorname{curl}\vec F\cdot d\vec S=\oint_C\vec F\cdot d\vec r` },
    { label: 'Flat surface', tex: String.raw`\iint_S\operatorname{curl}\vec F\cdot d\vec S=\iint_D\operatorname{curl}\vec F\cdot(\vec r_u\times\vec r_v)\,dA` },
    { label: 'Curl of a gradient', tex: String.raw`\nabla\times(\nabla\phi)=\vec 0` },
    { label: 'Closed surface', tex: String.raw`S\text{ closed}\ \Rightarrow\ \iint_S\operatorname{curl}\vec F\cdot d\vec S=0` },
  ],

  mistakes: [
    {
      id: 'rhr',
      title: 'Orientation of the curve or the replacement surface',
      wrong: String.raw`Dome oriented up, replaced by the disk with $\vec n=-\vec k$`,
      right: String.raw`The disk must be oriented up too, so both induce counterclockwise $C$`,
      why: 'Surface independence needs compatible orientations. Flipping the normal or the direction of C flips the sign.',
    },
    {
      id: 'wrong-surface',
      title: 'An easy surface with a different boundary',
      wrong: String.raw`Cap above $z=\sqrt3$ replaced by the disk $x^2+y^2\le4$, $z=0$`,
      right: String.raw`Use the disk $x^2+y^2\le1$ at $z=\sqrt3$: same rim as the cap`,
      why: 'The swap only works if the new surface has exactly the same boundary curve.',
    },
    {
      id: 'curl-error',
      title: 'Wrong curl component',
      wrong: String.raw`$(\operatorname{curl}\vec F)_x=R_y+Q_z$`,
      right: String.raw`$(\operatorname{curl}\vec F)_x=R_y-Q_z$, and $(\operatorname{curl}\vec F)_y=P_z-R_x$`,
      why: 'With a flat surface, only one or two curl components survive the dot product, so a single sign error ruins the answer.',
    },
    {
      id: 'normal-of-plane',
      title: 'Mixing the unit normal with dA',
      wrong: String.raw`$\iint_D\operatorname{curl}\vec F\cdot\langle3,1,1\rangle\sqrt{11}\,dA$`,
      right: String.raw`$\iint_D\operatorname{curl}\vec F\cdot\langle3,1,1\rangle\,dA$`,
      why: 'Either use r_u × r_v with dA over the shadow, or the unit normal with dS on the plane. The magnitudes cancel; do not multiply them in again.',
    },
    {
      id: 'green-in-3d',
      title: "Using Green's theorem on a curve that is not in the xy-plane",
      wrong: String.raw`Triangle in the $yz$-plane: $\iint(Q_x-P_y)\,dA$`,
      right: String.raw`Its normal is $\vec i$, so use $(\operatorname{curl}\vec F)\cdot\vec i=R_y-Q_z$`,
      why: "Green's theorem is the special case n = k. For any other plane, dot the curl with that plane's normal.",
    },
  ],

  hook: 'Only the rim matters: swap the dome for a lid.',

  scene: {
    view: { range: 1.5, z: [-0.5, 2.2] },
    camera: [4.5, -3.5, 3],
    layers: [
      { id: 'tri', kind: 'paramSurface', x: '0', y: 'u*(1-v)', z: 'u*v', u: [0, 1], v: [0, 1], colormap: 'water', opacity: 0.8 },
      { id: 'c1', kind: 'curve', x: '0', y: 't', z: '0', t: [0, 1], color: 'road', arrow: true },
      { id: 'c2', kind: 'curve', x: '0', y: '1-t', z: 't', t: [0, 1], color: 'road', arrow: true },
      { id: 'c3', kind: 'curve', x: '0', y: '0', z: '1-t', t: [0, 1], color: 'road', arrow: true },
      { id: 'ni', kind: 'vector', from: [0, 0.33, 0.33], to: [1.2, 0.33, 0.33], color: 'wood', label: 'n = i' },
      { id: 'domeA', kind: 'paramSurface', x: 'sin(u)*cos(v)', y: 'sin(u)*sin(v)', z: '0.5*cos(u)', u: [0, 'pi/2'], v: [0, '2*pi'], colormap: 'viridis', opacity: 0.45 },
      { id: 'domeB', kind: 'paramSurface', x: 'sin(u)*cos(v)', y: 'sin(u)*sin(v)', z: 'cos(u)', u: [0, 'pi/2'], v: [0, '2*pi'], colormap: 'viridis', opacity: 0.35 },
      { id: 'domeC', kind: 'paramSurface', x: 'sin(u)*cos(v)', y: 'sin(u)*sin(v)', z: '2*cos(u)', u: [0, 'pi/2'], v: [0, '2*pi'], colormap: 'viridis', opacity: 0.25 },
      { id: 'rim', kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: '0', t: [0, '2*pi'], color: 'road', arrow: true },
      { id: 'disk', kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: '0', u: [0, 1], v: [0, '2*pi'], colormap: 'textbook', opacity: 0.85 },
      { id: 'nk', kind: 'vector', from: [0, 0, 0], to: [0, 0, 0.9], color: 'wood', label: 'n = k' },
    ],
    steps: [
      { label: 'Start', show: ['tri', 'c1', 'c2', 'c3'], caption: String.raw`A triangle in the $yz$-plane traversed $(0,0,0)\to(0,1,0)\to(0,0,1)$. It is closed and in 3D, so Green does not apply, but Stokes does.` },
      { label: 'Normal', show: ['tri', 'c1', 'c2', 'c3', 'ni'], caption: String.raw`Seen from the $+x$ side the loop is counterclockwise, so the right-hand rule gives $\vec n=\vec i$. Only $(\operatorname{curl}\vec F)_x=R_y-Q_z$ matters. For $\langle-3y,4z,6x\rangle$ that is $-4$, times area $\tfrac12$: $-2$.` },
      { label: 'Many domes', show: ['domeA', 'domeB', 'domeC', 'rim'], caption: String.raw`Half-ellipsoids $x^2+y^2+z^2/a^2=1$ for $a=\tfrac12,1,2$. Different surfaces, one rim. The flux of $\operatorname{curl}\vec F$ is the same through all of them.` },
      { label: 'The lid', show: ['disk', 'nk', 'rim'], caption: String.raw`So use the easiest one: the unit disk with $\vec n=\vec k$. For $\vec F=\langle y,z,x\rangle$, $\operatorname{curl}\vec F\cdot\vec k=-1$, and the flux is $-\pi$ for every $a$.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 2,
      prompt: String.raw`$C$ is the triangle $(0,0,0)\to(0,2,0)\to(0,0,2)\to(0,0,0)$. For $\vec F=\langle z^2,\ 5z,\ 2y\rangle$, find $\oint_C\vec F\cdot d\vec r$.`,
      choices: [
        { tex: String.raw`$-6$`, correct: true },
        { tex: String.raw`$6$`, mistake: 'rhr', why: 'This direction is counterclockwise seen from +x, so n = +i, not -i.' },
        { tex: String.raw`$-3$`, mistake: 'arith', why: 'The triangle with legs 2 and 2 has area 2, not 1.' },
        { tex: String.raw`$14$`, mistake: 'curl-error', why: 'The x-component of the curl is R_y - Q_z = 2 - 5 = -3. With a plus sign you get 7.' },
        { tex: String.raw`$0$`, mistake: 'green-in-3d', why: 'You used the k-component Q_x - P_y = 0. The triangle lies in the yz-plane, so its normal is i.' },
      ],
      steps: [
        String.raw`Stokes with $S$ = the flat triangle in the $yz$-plane. Counterclockwise from $+x$, so $\vec n=\vec i$.`,
        String.raw`$(\operatorname{curl}\vec F)_x=R_y-Q_z=2-5=-3$.`,
        String.raw`$\iint_S(-3)\,dS=-3\cdot\tfrac12(2)(2)=-6$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`$C$ is the boundary of the part of the plane $z=4-2x-y$ in the first octant, oriented counterclockwise as seen from above. For $\vec F=\langle y+z,\ -x,\ -3x\rangle$, find $\oint_C\vec F\cdot d\vec r$.`,
      choices: [
        { tex: String.raw`$8$`, correct: true },
        { tex: String.raw`$-8$`, mistake: 'rhr', why: 'Counterclockwise from above pairs with the upward normal ⟨2, 1, 1⟩.' },
        { tex: String.raw`$8\sqrt6$`, mistake: 'normal-of-plane', why: 'You multiplied by |⟨2, 1, 1⟩| = √6 while also integrating over the shadow with dA.' },
        { tex: String.raw`$-16$`, mistake: 'curl-error', why: 'The middle component is P_z - R_x = 1 - (-3) = 4. Using 1 - 3 = -2 gives -16.' },
        { tex: String.raw`$16$`, mistake: 'arith', why: 'The shadow triangle (0,0), (2,0), (0,4) has area 4, not 8.' },
      ],
      steps: [
        String.raw`$\operatorname{curl}\vec F=\langle R_y-Q_z,\ P_z-R_x,\ Q_x-P_y\rangle=\langle0,\ 4,\ -2\rangle$.`,
        String.raw`$\vec r=\langle u,v,4-2u-v\rangle$, $\vec r_u\times\vec r_v=\langle2,1,1\rangle$: upward.`,
        String.raw`$\langle0,4,-2\rangle\cdot\langle2,1,1\rangle=2$. Shadow: $2u+v\le4$, area 4.`,
        String.raw`$\oint_C\vec F\cdot d\vec r=2\cdot4=8$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 1,
      prompt: String.raw`$S_1$ is the upper unit hemisphere oriented upward, and $\iint_{S_1}\operatorname{curl}\vec F\cdot d\vec S=5$. $S_2$ is the unit disk in the $xy$-plane oriented **downward**. What is $\iint_{S_2}\operatorname{curl}\vec F\cdot d\vec S$?`,
      choices: [
        { tex: String.raw`$-5$`, correct: true },
        { tex: String.raw`$5$`, mistake: 'rhr', why: 'That would be the disk oriented upward. Downward induces the clockwise direction on the circle.' },
        { tex: String.raw`$0$`, mistake: 'concept', why: '0 is the total over the closed surface S₁ ∪ S₂ (5 + (-5)), not the flux through S₂ alone.' },
        { tex: String.raw`$-5\pi$`, mistake: 'units', why: '5 is already the whole flux. Do not multiply by the area of the disk.' },
        { tex: String.raw`It cannot be found without knowing $\vec F$`, mistake: 'concept', why: 'Both surfaces share the unit circle as boundary, so Stokes ties their fluxes together.' },
      ],
      steps: [
        String.raw`Both surfaces have boundary the unit circle in the $xy$-plane.`,
        String.raw`$S_1$ up induces counterclockwise $C$, so $\oint_C\vec F\cdot d\vec r=5$.`,
        String.raw`$S_2$ down induces clockwise $C$, which reverses the line integral: $-5$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Let $S$ be the part of $z=5(1-x^2-y^2)$ with $z\ge0$, oriented upward, and $\vec F=\langle-2y,\ x,\ z\rangle$. Find $\iint_S\operatorname{curl}\vec F\cdot d\vec S$.`,
      choices: [
        { tex: String.raw`$3\pi$`, correct: true },
        { tex: String.raw`$15\pi$`, mistake: 'concept', why: 'The factor 5 only changes the height. The boundary, the unit circle, is the same for every height.' },
        { tex: String.raw`$-3\pi$`, mistake: 'rhr', why: 'An upward dome pairs with the disk oriented up (n = k).' },
        { tex: String.raw`$-\pi$`, mistake: 'curl-error', why: 'Q_x - P_y = 1 - (-2) = 3. Adding instead of subtracting gives -1.' },
        { tex: String.raw`$3$`, mistake: 'arith', why: 'The unit disk has area π.' },
      ],
      steps: [
        String.raw`Boundary: $z=0$ gives $x^2+y^2=1$, the unit circle, whatever the height factor.`,
        String.raw`Replace $S$ by the unit disk with $\vec n=\vec k$.`,
        String.raw`$\operatorname{curl}\vec F=\langle0,0,1-(-2)\rangle=\langle0,0,3\rangle$, so the flux is $3\cdot\pi=3\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 1,
      prompt: String.raw`Let $\phi(x,y,z)=x^2yz+\sin(xz)$ and $\vec F=\nabla\phi$. $S$ is the part of $z=9-x^2-y^2$ above the $xy$-plane, oriented upward. Which statement about $\iint_S\operatorname{curl}\vec F\cdot d\vec S$ is true?`,
      choices: [
        { tex: String.raw`It equals 0, because $\operatorname{curl}(\nabla\phi)=\vec0$`, correct: true },
        { tex: String.raw`It equals $\oint_C\phi\,ds$ around the circle of radius 3`, mistake: 'concept', why: 'Stokes gives the line integral of F = ∇φ dotted with dr, not of φ with ds.' },
        { tex: String.raw`It can only be found by parametrizing the paraboloid`, mistake: 'concept', why: 'Both Stokes and the identity curl(∇φ) = 0 avoid any parametrization.' },
        { tex: String.raw`It equals the surface area of the paraboloid`, mistake: 'concept', why: 'That would need curl F · n = 1 everywhere. In fact curl F is the zero vector.' },
        { tex: String.raw`It is 0 only because the paraboloid is symmetric`, mistake: 'concept', why: 'Symmetry is irrelevant. It is 0 for every surface because the curl of a gradient vanishes.' },
      ],
      steps: [
        String.raw`$\operatorname{curl}(\nabla\phi)$ has components like $\phi_{zy}-\phi_{yz}$, which are 0 by Clairaut's theorem.`,
        String.raw`Or by Stokes: $\oint_C\nabla\phi\cdot d\vec r=0$ on a closed loop by the Fundamental Theorem for Line Integrals.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`$C$ is the circle $x^2+y^2=4$ in the plane $z=3$, counterclockwise as seen from above. For $\vec F=\langle x^2z,\ xy+2x,\ e^z\rangle$, find $\oint_C\vec F\cdot d\vec r$.`,
      choices: [
        { tex: String.raw`$8\pi$`, correct: true },
        { tex: String.raw`$-8\pi$`, mistake: 'rhr', why: 'Counterclockwise from above goes with n = +k on the disk.' },
        { tex: String.raw`$0$`, mistake: 'curl-error', why: 'Q_x = y + 2, not y. The 2 from 2x is what survives.' },
        { tex: String.raw`$2\pi$`, mistake: 'wrong-surface', why: 'The disk bounded by C has radius 2, not 1.' },
        { tex: String.raw`$16\pi$`, mistake: 'arith', why: 'The disk of radius 2 has area 4π, so ∬2 dA = 8π.' },
      ],
      steps: [
        String.raw`Use the disk $x^2+y^2\le4$ at $z=3$ with $\vec n=\vec k$.`,
        String.raw`$(\operatorname{curl}\vec F)_z=Q_x-P_y=(y+2)-0=y+2$.`,
        String.raw`$\iint_D(y+2)\,dA$: the $y$ part is 0 by symmetry, the 2 part is $2\cdot4\pi=8\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 2,
      prompt: String.raw`$C$ is the closed curve where the cylinder $x^2+y^2=1$ meets the plane $y+z=2$, and $\vec F$ is not conservative. What is the best way to compute $\oint_C\vec F\cdot d\vec r$?`,
      choices: [
        { tex: String.raw`Stokes, using the flat piece of the plane $y+z=2$ inside the cylinder`, correct: true },
        { tex: String.raw`Green's theorem on the unit disk, ignoring $z$`, mistake: 'green-in-3d', why: 'C is tilted, not in the xy-plane. Green would drop the z parts of F and dr.' },
        { tex: String.raw`It is 0 by the Fundamental Theorem for Line Integrals`, mistake: 'concept', why: 'That needs a conservative field, and this one is not.' },
        { tex: String.raw`Stokes, using the unit disk in the plane $z=0$`, mistake: 'wrong-surface', why: 'That disk has a different boundary (a circle at z = 0), so it does not give the same value.' },
        { tex: String.raw`The divergence theorem`, mistake: 'concept', why: 'The divergence theorem turns a closed-surface flux into a volume integral. It says nothing about loop integrals.' },
      ],
      steps: [
        String.raw`$C$ is closed and in 3D, and $\vec F$ is not conservative: Stokes.`,
        String.raw`The simplest surface bounded by $C$ is the ellipse-shaped piece of $y+z=2$ over the unit disk, with $\vec r=\langle u,v,2-v\rangle$ and $\vec r_u\times\vec r_v=\langle0,1,1\rangle$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'paramSurface', x: 'sin(u)*cos(v)', y: 'sin(u)*sin(v)', z: '2*cos(u)', u: [0, 'pi/2'], v: [0, '2*pi'] },
    { kind: 'paramSurface', x: '0', y: 'u*(1-v)', z: 'u*v', u: [0, 1], v: [0, 1] },
    { kind: 'vectorField', P: 'y', Q: 'z', R: 'x', density: 5 },
  ],
};
