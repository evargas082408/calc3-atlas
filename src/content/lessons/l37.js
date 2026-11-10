export default {
  id: 37,
  title: 'Divergence theorem: lids, cavities, strategy',
  section: '17.8',
  exam: 3,
  blurb: 'Close an open surface with a lid, handle hollow solids, and pick the right theorem every time.',
  boiler: ['Divergence Theorem', 'Surface Integrals', 'Flux Integrals'],

  sections: [
    {
      id: 'solids',
      title: 'Harder solids: set up the triple integral',
      body: String.raw`Once you know $S$ is closed and outward, the divergence theorem leaves an ordinary triple integral. All the triple-integral skills come back: sketch the solid, find its shadow, pick coordinates.

**Lecture example.** $\vec F=\langle\sin z-3x^2,\ 3xy,\ \cos x+e^y+4xz\rangle$ and $S$ is the boundary of the solid between the cone $z=\sqrt{x^2+y^2}$ (below) and the paraboloid $z=6-x^2-y^2$ (above).

- $\operatorname{div}\vec F=-6x+3x+4x=x$. The messy terms $\sin z$, $\cos x+e^y$ disappear because each sits in a component that is not differentiated by its own variable.
- Shadow: the surfaces meet where $6-r^2=r$, so $r^2+r-6=(r+3)(r-2)=0$ and $r=2$.
- Cylindrical: $r\le z\le6-r^2$, $0\le r\le2$, $0\le\theta\le2\pi$, and $x=r\cos\theta$:
$$\int_0^{2\pi}\!\!\int_0^2\!\!\int_r^{6-r^2}r\cos\theta\cdot r\,dz\,dr\,d\theta=0,$$
because $\int_0^{2\pi}\cos\theta\,d\theta=0$. Six surface pieces would have been miserable; the answer came out in three lines.

**Constant divergence.** $\vec F=\langle x+xz,\ y+yz,\ -x^2-y^2-z^2\rangle$ through the sphere of radius 2: $\operatorname{div}\vec F=(1+z)+(1+z)-2z=2$, so the flux is $2\cdot\tfrac43\pi(2)^3=\tfrac{64\pi}{3}$.`,
    },
    {
      id: 'cavity',
      title: 'Solids with a hole',
      body: String.raw`Remove the ball of radius 1 from the ball of radius 2. The solid $D$ is the shell $1\le\rho\le2$, and its boundary has **two** pieces: the outer sphere $S_1$ and the inner sphere $S_2$.

"Outward from $D$" means away from the solid. On $S_1$ that is away from the origin. On $S_2$ it is **toward the origin**, into the hole. With that orientation,
$$\iiint_D\operatorname{div}\vec F\,dV=\iint_{S_1}\vec F\cdot d\vec S+\iint_{S_2,\ \text{toward center}}\vec F\cdot d\vec S.$$

If instead you compute the inner sphere's flux with the usual away-from-origin normal, that integral has the opposite sign, so
$$\iiint_D\operatorname{div}\vec F\,dV=\iint_{S_1,\ \text{out}}\vec F\cdot d\vec S-\iint_{S_2,\ \text{away from center}}\vec F\cdot d\vec S.$$
Use one form or the other, never both a flipped normal *and* a minus sign.

The triple integral itself is easy: in spherical coordinates just run $\rho$ from 1 to 2. Equivalently, (integral over the big ball) $-$ (integral over the small ball). For $\operatorname{div}\vec F=2$ that is $2\cdot\tfrac43\pi(8-1)=\tfrac{56\pi}{3}$.`,
    },
    {
      id: 'lid',
      title: 'Open surface? Add a lid, then subtract it',
      body: String.raw`Suppose $S$ is not closed, hard to parametrize, and $\vec F$ is not a curl field. Close it with a simple surface $S_1$, usually a flat disk, so that $S\cup S_1$ encloses a solid $D$. Then
$$\iint_S\vec F\cdot d\vec S+\iint_{S_1}\vec F\cdot d\vec S=\iiint_D\operatorname{div}\vec F\,dV,$$
so
$$\iint_S\vec F\cdot d\vec S=\iiint_D\operatorname{div}\vec F\,dV-\iint_{S_1}\vec F\cdot d\vec S.$$

The lid must be oriented **outward from $D$**. For a dome sitting on the $xy$-plane, the lid is the floor disk with $\vec n=-\vec k$.

**Example.** $S$: $z=4-x^2-y^2$, $z\ge0$, upward (no bottom). $\vec F=\langle x,y,1\rangle$.
1. $\operatorname{div}\vec F=2$. Volume of $D$ is $8\pi$, so $\iiint_D2\,dV=16\pi$.
2. Lid: disk $x^2+y^2\le4$, $z=0$, $\vec n=-\vec k$. $\vec F\cdot\vec n=-1$, so the lid flux is $-4\pi$.
3. $\iint_S\vec F\cdot d\vec S=16\pi-(-4\pi)=20\pi$.

Check by parametrizing: $\vec F\cdot\langle2u,2v,1\rangle=2(u^2+v^2)+1$ over $u^2+v^2\le4$ gives $20\pi$ too.`,
    },
    {
      id: 'strategy',
      title: 'The whole picture: which theorem?',
      body: String.raw`Every big theorem says the same thing: integrate a derivative over a region = evaluate on the boundary.

- **FTCLI**: $\int_C\nabla\phi\cdot d\vec r=\phi(\text{end})-\phi(\text{start})$. Curve, endpoints.
- **Green**: $\oint_C\vec F\cdot d\vec r=\iint_D(Q_x-P_y)\,dA$. Flat region, its edge.
- **Stokes**: $\oint_C\vec F\cdot d\vec r=\iint_S\operatorname{curl}\vec F\cdot d\vec S$. Surface, its edge.
- **Divergence**: $\iint_S\vec F\cdot d\vec S=\iiint_D\operatorname{div}\vec F\,dV$. Solid, its skin.

**For a line integral** $\int_C\vec F\cdot d\vec r$: conservative $\to$ FTCLI. Closed and flat in $xy$ $\to$ Green. Closed in 3D $\to$ Stokes. Else parametrize.

**For a flux integral** $\iint_S\vec F\cdot d\vec S$: closed $\to$ divergence theorem. A curl field $\to$ Stokes. Almost closed $\to$ add a lid and subtract. Else parametrize.

**For a curl flux** $\iint_S\operatorname{curl}\vec F\cdot d\vec S$: Stokes to the boundary, or to an easier surface with the same boundary. If $S$ is closed, it is 0.`,
    },
    {
      id: 'checklist',
      title: 'Exam checklist for flux problems',
      body: String.raw`1. **Closed?** If not, either parametrize, or add a lid and subtract its flux.
2. **Outward?** The theorem gives outward flux. Inward is the negative.
3. **Divergence.** $P_x+Q_y+R_z$. Look for cancellations; a constant divergence means constant $\times$ volume.
4. **Coordinates.** Box: rectangular. Cylinder, cone, or paraboloid around the $z$-axis: cylindrical with $r\,dz\,dr\,d\theta$. Ball or shell: spherical with $\rho^2\sin\phi$.
5. **Bounds.** Intersect the bounding surfaces to find the shadow radius.
6. **Symmetry.** An odd function like $x$ or $y$ over a symmetric solid integrates to 0.
7. **Holes.** The inner surface of a hollow solid is part of the boundary, oriented into the hole.`,
    },
  ],

  formulas: [
    { label: 'Divergence theorem', tex: String.raw`\iint_{\partial D}\vec F\cdot d\vec S=\iiint_D\operatorname{div}\vec F\,dV` },
    { label: 'Lid trick', tex: String.raw`\iint_S\vec F\cdot d\vec S=\iiint_D\operatorname{div}\vec F\,dV-\iint_{\text{lid, outward}}\vec F\cdot d\vec S` },
    { label: 'Hollow solid', tex: String.raw`\iiint_D\operatorname{div}\vec F\,dV=\iint_{S_{\text{out}}}\vec F\cdot d\vec S-\iint_{S_{\text{in}},\ \vec n\text{ away from center}}\vec F\cdot d\vec S` },
    { label: 'Cylindrical / spherical', tex: String.raw`dV=r\,dz\,dr\,d\theta,\qquad dV=\rho^2\sin\phi\,d\rho\,d\phi\,d\theta` },
  ],

  mistakes: [
    {
      id: 'not-closed',
      title: 'Applying the theorem to an open surface',
      wrong: String.raw`Flux through the paraboloid $z=4-x^2-y^2$, $z\ge0$, $=\iiint_D\operatorname{div}\vec F\,dV$`,
      right: String.raw`$\iiint_D\operatorname{div}\vec F\,dV$ is the flux through paraboloid $+$ floor. Subtract the floor's flux`,
      why: 'The triple integral always counts every piece of the boundary. If a piece is missing from S, its flux is hiding in your answer.',
    },
    {
      id: 'lid-sign',
      title: 'Adding the lid instead of subtracting it',
      wrong: String.raw`$\iint_S=\iiint_D\operatorname{div}\vec F\,dV+\iint_{\text{lid}}$`,
      right: String.raw`$\iint_S=\iiint_D\operatorname{div}\vec F\,dV-\iint_{\text{lid, outward}}$`,
      why: 'Total = S + lid, so S = total - lid. Also orient the lid outward from the solid (down for a floor).',
    },
    {
      id: 'cavity',
      title: 'Mishandling the inner surface',
      wrong: String.raw`Shell $1\le\rho\le2$: using the whole ball, or adding the inner ball's integral`,
      right: String.raw`$\iiint_{\text{shell}}=\iiint_{\rho\le2}-\iiint_{\rho\le1}$, or run $\rho$ from 1 to 2`,
      why: 'The hole is not part of D. Its boundary is, oriented into the hole.',
    },
    {
      id: 'volume-coords',
      title: 'Dropping r or ρ² sin φ',
      wrong: String.raw`$\int\!\!\int\!\!\int\operatorname{div}\vec F\,dz\,dr\,d\theta$`,
      right: String.raw`$\int\!\!\int\!\!\int\operatorname{div}\vec F\;r\,dz\,dr\,d\theta$`,
      why: 'The divergence theorem hands you a triple integral; the usual Jacobians still apply.',
    },
    {
      id: 'intersection',
      title: 'Wrong shadow radius',
      wrong: String.raw`Between $z=\sqrt{x^2+y^2}$ and $z=2-x^2-y^2$: $0\le r\le\sqrt2$`,
      right: String.raw`Solve $2-r^2=r$: $r=1$`,
      why: 'The shadow edge is where the top and bottom surfaces meet, not where the top surface hits z = 0.',
    },
  ],

  hook: 'Not closed? Put a lid on it, then take the lid back off.',

  scene: {
    view: { range: 3, z: [-2.5, 5] },
    camera: [6, -6, 4.5],
    layers: [
      { id: 'parab', kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: '4 - u^2', u: [0, 2], v: [0, '2*pi'], colormap: 'water', opacity: 0.6 },
      { id: 'np0', kind: 'vector', from: [0, 0, 4], to: [0, 0, 4.8], color: 'wood', label: 'n' },
      { id: 'np1', kind: 'vector', from: [1, 0, 3], to: [1.716, 0, 3.358], color: 'wood' },
      { id: 'np2', kind: 'vector', from: [-1.5, 0, 1.75], to: [-2.259, 0, 2.003], color: 'wood' },
      { id: 'lid', kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: '0', u: [0, 2], v: [0, '2*pi'], colormap: 'textbook', opacity: 0.75 },
      { id: 'nlid', kind: 'vector', from: [0.8, 0.8, 0], to: [0.8, 0.8, -0.8], color: 'road', label: 'lid: -k' },
      { id: 'F', kind: 'vectorField', P: 'x', Q: 'y', R: '1', density: 5 },
      { id: 'outer', kind: 'paramSurface', x: '2*sin(u)*cos(v)', y: '2*sin(u)*sin(v)', z: '2*cos(u)', u: [0, 'pi'], v: [0, '3*pi/2'], colormap: 'water', opacity: 0.3 },
      { id: 'inner', kind: 'paramSurface', x: 'sin(u)*cos(v)', y: 'sin(u)*sin(v)', z: 'cos(u)', u: [0, 'pi'], v: [0, '2*pi'], colormap: 'inferno', opacity: 0.4 },
      { id: 'no1', kind: 'vector', from: [0, 0, 2], to: [0, 0, 2.7], color: 'wood', label: 'outer: out' },
      { id: 'no2', kind: 'vector', from: [0, 2, 0], to: [0, 2.7, 0], color: 'wood' },
      { id: 'ni1', kind: 'vector', from: [0, 0, -1], to: [0, 0, -0.4], color: 'road', label: 'inner: toward center' },
      { id: 'ni2', kind: 'vector', from: [0, -1, 0], to: [0, -0.4, 0], color: 'road' },
    ],
    steps: [
      { label: 'Start', show: ['parab', 'np0', 'np1', 'np2'], caption: String.raw`The paraboloid $z=4-x^2-y^2$, $z\ge0$, oriented upward. It has no bottom, so it is not closed and the divergence theorem does not apply as is.` },
      { label: 'Lid', show: ['parab', 'np0', 'np1', 'np2', 'lid', 'nlid'], caption: String.raw`Add the floor disk $x^2+y^2\le4$ as a lid. To be outward from the solid, its normal points down: $-\vec k$.` },
      { label: 'Subtract', show: ['parab', 'lid', 'nlid', 'F'], caption: String.raw`For $\vec F=\langle x,y,1\rangle$: $\iiint_D2\,dV=16\pi$ and the lid flux is $\iint(-1)\,dA=-4\pi$. So the paraboloid alone carries $16\pi-(-4\pi)=20\pi$.` },
      { label: 'Hollow', show: ['outer', 'inner'], caption: String.raw`A shell $1\le\rho\le2$ (outer sphere cut open to see inside). Its boundary is two spheres, and the inner one belongs to $D$'s skin too.` },
      { label: 'Normals', show: ['outer', 'inner', 'no1', 'no2', 'ni1', 'ni2'], caption: String.raw`Outward from $D$: away from the origin on the outer sphere, toward the origin on the inner one. For $\vec F=\langle x,y,z\rangle$ the net flux is $3\cdot\tfrac43\pi(8-1)=28\pi$.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 2,
      prompt: String.raw`$D$ is the solid between the spheres $x^2+y^2+z^2=1$ and $x^2+y^2+z^2=4$. Find the outward flux of $\vec F=\langle x,y,z\rangle$ through the boundary of $D$ (both spheres).`,
      choices: [
        { tex: String.raw`$28\pi$`, correct: true },
        { tex: String.raw`$32\pi$`, mistake: 'cavity', why: 'You used the whole ball of radius 2 and forgot to remove the hole.' },
        { tex: String.raw`$36\pi$`, mistake: 'cavity', why: 'You added the inner ball instead of subtracting it.' },
        { tex: String.raw`$-28\pi$`, mistake: 'sign', why: 'div F = 3 > 0, so the net outward flux is positive.' },
        { tex: String.raw`$\dfrac{28\pi}{3}$`, mistake: 'arith', why: 'That is the volume of the shell. Multiply by div F = 3.' },
      ],
      steps: [
        String.raw`$\operatorname{div}\vec F=3$.`,
        String.raw`Volume of the shell: $\tfrac43\pi(2^3-1^3)=\tfrac{28\pi}{3}$.`,
        String.raw`Flux $=3\cdot\tfrac{28\pi}{3}=28\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 3,
      prompt: String.raw`$D$ is the solid above the cone $z=\sqrt{x^2+y^2}$ and below the paraboloid $z=2-x^2-y^2$. Find the outward flux of $\vec F=\left\langle0,\ 0,\ \tfrac{z^2}{2}\right\rangle$ through the boundary of $D$.`,
      choices: [
        { tex: String.raw`$\dfrac{11\pi}{12}$`, correct: true },
        { tex: String.raw`$\dfrac{\pi}{3}$`, mistake: 'intersection', why: 'The surfaces meet at r = 1 (from 2 - r² = r), not at r = √2.' },
        { tex: String.raw`$\dfrac{38\pi}{15}$`, mistake: 'volume-coords', why: 'You dropped the r in dV = r dz dr dθ.' },
        { tex: String.raw`$\dfrac{11\pi}{6}$`, mistake: 'arith', why: 'The antiderivative of z is z²/2. You lost the 1/2.' },
        { tex: String.raw`$-\dfrac{11\pi}{12}$`, mistake: 'sign', why: 'div F = z ≥ 0 throughout D, so the outward flux is positive.' },
      ],
      steps: [
        String.raw`$\operatorname{div}\vec F=z$. Intersection: $2-r^2=r$, so $(r+2)(r-1)=0$ and $r=1$.`,
        String.raw`$\int_0^{2\pi}\!\int_0^1\!\int_r^{2-r^2}z\,r\,dz\,dr\,d\theta=2\pi\int_0^1\tfrac{(2-r^2)^2-r^2}{2}\,r\,dr$.`,
        String.raw`$\int_0^1\tfrac{4r-5r^3+r^5}{2}\,dr=\tfrac12\left(2-\tfrac54+\tfrac16\right)=\tfrac{11}{24}$.`,
        String.raw`Flux $=2\pi\cdot\tfrac{11}{24}=\tfrac{11\pi}{12}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`$S$ is the paraboloid $z=4-x^2-y^2$, $z\ge0$, oriented upward (no bottom). Find $\iint_S\vec F\cdot d\vec S$ for $\vec F=\langle x,\ y,\ 1\rangle$.`,
      choices: [
        { tex: String.raw`$20\pi$`, correct: true },
        { tex: String.raw`$16\pi$`, mistake: 'not-closed', why: 'S has no bottom. 16π is the flux through the paraboloid plus the floor.' },
        { tex: String.raw`$12\pi$`, mistake: 'lid-sign', why: 'You added the floor flux (-4π) instead of subtracting it.' },
        { tex: String.raw`$\dfrac{76\pi}{3}$`, mistake: 'volume-coords', why: 'You dropped the r in dV, so the triple integral came out 64π/3.' },
        { tex: String.raw`$-20\pi$`, mistake: 'sign', why: 'Upward on this dome is outward from the solid, so no sign flip.' },
      ],
      steps: [
        String.raw`Close $S$ with the floor disk $x^2+y^2\le4$, $\vec n=-\vec k$.`,
        String.raw`$\operatorname{div}\vec F=2$, $\text{Vol}(D)=\int_0^{2\pi}\!\int_0^2(4-r^2)\,r\,dr\,d\theta=8\pi$, so $\iiint_D2\,dV=16\pi$.`,
        String.raw`Floor: $\vec F\cdot(-\vec k)=-1$, flux $=-4\pi$.`,
        String.raw`$\iint_S=16\pi-(-4\pi)=20\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 3,
      prompt: String.raw`$S$ is the upper hemisphere $x^2+y^2+z^2=4$, $z\ge0$, oriented outward, without its base. Find $\iint_S\vec F\cdot d\vec S$ for $\vec F=\langle y^2,\ x^2,\ z+2\rangle$.`,
      choices: [
        { tex: String.raw`$\dfrac{40\pi}{3}$`, correct: true },
        { tex: String.raw`$\dfrac{16\pi}{3}$`, mistake: 'not-closed', why: 'That is the flux through dome plus base. The base carries -8π and must be removed.' },
        { tex: String.raw`$-\dfrac{8\pi}{3}$`, mistake: 'lid-sign', why: 'You added the base flux -8π instead of subtracting it.' },
        { tex: String.raw`$8\pi$`, mistake: 'concept', why: 'That is only minus the base flux. You still need the triple integral 16π/3.' },
        { tex: String.raw`$-\dfrac{40\pi}{3}$`, mistake: 'sign', why: 'Outward is the orientation the divergence theorem uses, so no sign change.' },
      ],
      steps: [
        String.raw`Close with the base disk $x^2+y^2\le4$, $z=0$, outward normal $-\vec k$.`,
        String.raw`$\operatorname{div}\vec F=0+0+1=1$, so $\iiint_D1\,dV=\tfrac12\cdot\tfrac43\pi(8)=\tfrac{16\pi}{3}$.`,
        String.raw`Base: $\vec F\cdot(-\vec k)=-(0+2)=-2$, flux $=-2\cdot4\pi=-8\pi$.`,
        String.raw`$\iint_S=\tfrac{16\pi}{3}-(-8\pi)=\tfrac{40\pi}{3}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`$S$ consists of five faces of the unit cube $[0,1]^3$: every face except the top $z=1$. Find the flux of $\vec F=\langle x,y,z\rangle$ through $S$, with normals pointing out of the cube.`,
      choices: [
        { tex: String.raw`$2$`, correct: true },
        { tex: String.raw`$3$`, mistake: 'not-closed', why: '3 is the flux through all six faces. The top is missing from S.' },
        { tex: String.raw`$4$`, mistake: 'lid-sign', why: 'The top face carries flux 1. Subtract it, do not add it.' },
        { tex: String.raw`$-2$`, mistake: 'sign', why: 'The normals point out of the cube, the same orientation the theorem uses.' },
        { tex: String.raw`$1$`, mistake: 'concept', why: '1 is the flux through the missing top face, not through the five faces.' },
      ],
      steps: [
        String.raw`Close $S$ with the top face. $\operatorname{div}\vec F=3$, volume 1, total $=3$.`,
        String.raw`Top face $z=1$, $\vec n=\vec k$: $\vec F\cdot\vec k=z=1$, area 1, flux 1.`,
        String.raw`$\iint_S=3-1=2$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 1,
      prompt: String.raw`$S$ is the cone $z=\sqrt{x^2+y^2}$, $0\le z\le1$ (open at the top), and $\vec F$ is not a curl field. Which plan correctly computes $\iint_S\vec F\cdot d\vec S$ with the divergence theorem?`,
      choices: [
        { tex: String.raw`Add the disk $x^2+y^2\le1$ at $z=1$ with $\vec n=\vec k$; take $\iiint_D\operatorname{div}\vec F\,dV$ minus the disk's flux`, correct: true },
        { tex: String.raw`Take $\iiint_D\operatorname{div}\vec F\,dV$ over the solid cone, nothing else`, mistake: 'not-closed', why: 'That includes the flux through the top disk, which is not part of S.' },
        { tex: String.raw`Add the disk with $\vec n=-\vec k$ and subtract its flux`, mistake: 'lid-sign', why: 'The lid at the top must point out of the solid, which is up, +k.' },
        { tex: String.raw`Add the disk and add its flux to the triple integral`, mistake: 'lid-sign', why: 'Cone + lid = triple integral, so cone = triple integral - lid.' },
        { tex: String.raw`Use Stokes with the rim $x^2+y^2=1$, $z=1$`, mistake: 'concept', why: 'Stokes needs the integrand to be a curl. F is not a curl field here.' },
      ],
      steps: [
        String.raw`$S$ is open, so close it with the top disk. The solid $D$ is the inside of the cone.`,
        String.raw`Outward from $D$ at the top is $+\vec k$.`,
        String.raw`$\iint_S=\iiint_D\operatorname{div}\vec F\,dV-\iint_{\text{disk}}\vec F\cdot\vec k\,dA$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`$D$ is the shell $1\le x^2+y^2+z^2\le4$. Find the outward flux of $\vec F=\langle x^3,y^3,z^3\rangle$ through the boundary of $D$.`,
      choices: [
        { tex: String.raw`$\dfrac{372\pi}{5}$`, correct: true },
        { tex: String.raw`$\dfrac{384\pi}{5}$`, mistake: 'cavity', why: 'That is the full ball of radius 2. Remove the inner ball.' },
        { tex: String.raw`$\dfrac{396\pi}{5}$`, mistake: 'cavity', why: 'You added the inner ball instead of subtracting it.' },
        { tex: String.raw`$28\pi$`, mistake: 'volume-coords', why: 'You dropped the ρ² in dV and integrated 3ρ² sin φ.' },
        { tex: String.raw`$\dfrac{124\pi}{5}$`, mistake: 'arith', why: 'div F = 3x² + 3y² + 3z². You dropped the 3.' },
      ],
      steps: [
        String.raw`$\operatorname{div}\vec F=3\rho^2$. Spherical, with $1\le\rho\le2$.`,
        String.raw`$\int_0^{2\pi}\!\int_0^\pi\!\int_1^23\rho^2\cdot\rho^2\sin\phi\,d\rho\,d\phi\,d\theta=3\cdot\tfrac{32-1}{5}\cdot2\cdot2\pi$.`,
        String.raw`$=\tfrac{372\pi}{5}$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: '4 - x^2 - y^2' },
    { kind: 'vectorField', P: 'x', Q: 'y', R: '1', density: 5 },
    { kind: 'paramSurface', x: 'sin(u)*cos(v)', y: 'sin(u)*sin(v)', z: 'cos(u)', u: [0, 'pi'], v: [0, '2*pi'] },
  ],
};
