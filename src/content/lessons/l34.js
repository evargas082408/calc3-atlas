export default {
  id: 34,
  title: "Stokes' theorem",
  section: '17.7',
  exam: 3,
  blurb: 'Trade the flux of a curl through a surface for a line integral around its edge, and back.',
  boiler: ['Stokes Theorem'],

  sections: [
    {
      id: 'idea',
      title: "The idea: Green's theorem, tilted and bent",
      body: String.raw`Green's theorem says that for a flat region $S$ in the $xy$-plane with boundary $C$ (counterclockwise) and $\vec F=\langle f,g\rangle$,
$$\oint_C\vec F\cdot d\vec r=\iint_S(g_x-f_y)\,dA.$$

Write the same thing in 3D. Let $\vec F=\langle f,g,0\rangle$. Then $\operatorname{curl}\vec F=\langle0,0,g_x-f_y\rangle$, and the flat region has normal $\vec n=\langle0,0,1\rangle$. So $g_x-f_y=\operatorname{curl}\vec F\cdot\vec n$, and Green's theorem reads
$$\oint_C\vec F\cdot d\vec r=\iint_S\operatorname{curl}\vec F\cdot\vec n\,dS.$$

**Stokes' theorem** says this stays true when $S$ is any oriented surface in space, tilted or curved, with boundary curve $C$:

$$\oint_C\vec F\cdot d\vec r=\iint_S\operatorname{curl}\vec F\cdot d\vec S.$$

The left side is the circulation of $\vec F$ around the edge. The right side is the flux of $\operatorname{curl}\vec F$ through the surface. Same theme as the Fundamental Theorem of Calculus: integrating a derivative ($\operatorname{curl}$) over a region equals evaluating the original thing on the boundary.`,
    },
    {
      id: 'orientation',
      title: 'Orientation: the right-hand rule',
      body: String.raw`Both sides have a direction. The surface has a normal $\vec n$, and the curve has a direction of travel. They must be **compatible**:

**Curl the fingers of your right hand in the direction you travel along $C$. Your thumb must point along $\vec n$.**

Equivalent version: walk along $C$ with your head pointing along $\vec n$. The surface should be on your left.

Practical cases:
- Normal **upward** (or outward on a cap that sits on top of something): $C$ runs **counterclockwise seen from above**. Use $\langle R\cos t,R\sin t,z_0\rangle$, $0\le t\le2\pi$.
- Normal **downward**: $C$ runs **clockwise seen from above**. Flip the sign of the counterclockwise answer.
- Normal toward $+x$ for a curve in the $yz$-plane: counterclockwise seen from the $+x$ side, with $y$ to the right and $z$ up.

Get this wrong and the answer comes out with the opposite sign. It is the most common Stokes error on exams.`,
    },
    {
      id: 'curl',
      title: 'Computing the curl',
      body: String.raw`For $\vec F=\langle P,Q,R\rangle$,
$$\operatorname{curl}\vec F=\nabla\times\vec F=\begin{vmatrix}\vec i&\vec j&\vec k\\ \partial_x&\partial_y&\partial_z\\ P&Q&R\end{vmatrix}=\langle R_y-Q_z,\ P_z-R_x,\ Q_x-P_y\rangle.$$

Watch the middle component: it is $P_z-R_x$, the determinant's minus sign already applied. Examples from lecture:
- $\langle y,-x,0\rangle$ has curl $\langle0,0,-2\rangle$.
- $\langle xz,yz,xy\rangle$ has curl $\langle x-y,\ x-y,\ 0\rangle$.
- $\langle y,z,x\rangle$ has curl $\langle-1,-1,-1\rangle$.

When the curl is a constant vector, the surface side of Stokes is easy: on a flat surface it is (curl $\cdot\,\vec n$) $\times$ area.`,
    },
    {
      id: 'example',
      title: 'Worked example, both ways',
      body: String.raw`$\vec F=\langle y,-x,0\rangle$, $S$ = the part of the sphere of radius 2 with $z\ge1$, normal outward. Find $\iint_S\operatorname{curl}\vec F\cdot d\vec S$.

**Direct.** $\operatorname{curl}\vec F=\langle0,0,-2\rangle$. Parametrize the cap with $\phi\in[0,\pi/3]$ (since $2\cos\phi=1$ at the rim) and $\theta\in[0,2\pi]$. The $z$-component of $\vec r_\phi\times\vec r_\theta$ is $4\sin\phi\cos\phi>0$, so that cross product is the outward choice. Then
$$\int_0^{2\pi}\!\!\int_0^{\pi/3}(-2)(4\sin\phi\cos\phi)\,d\phi\,d\theta=-8\cdot2\pi\cdot\frac{\sin^2\phi}{2}\Big|_0^{\pi/3}=-6\pi.$$

**Stokes.** The boundary is where $z=1$ meets $x^2+y^2+z^2=4$: the circle $x^2+y^2=3$ at height 1. Outward on this cap is up, so go counterclockwise: $\vec r(t)=\langle\sqrt3\cos t,\sqrt3\sin t,1\rangle$. Then $\vec F(\vec r(t))=\langle\sqrt3\sin t,-\sqrt3\cos t,0\rangle$, $\vec r^{\,\prime}(t)=\langle-\sqrt3\sin t,\sqrt3\cos t,0\rangle$, the dot product is $-3$, and
$$\oint_C\vec F\cdot d\vec r=\int_0^{2\pi}(-3)\,dt=-6\pi.$$
Same answer, much less work.`,
    },
    {
      id: 'boundary',
      title: 'Finding and parametrizing the boundary',
      body: String.raw`The boundary $C$ is where the surface stops. Find it by intersecting the surface with whatever cuts it off.

- Paraboloid $z=1-x^2-y^2$ above the $xy$-plane: set $z=0$, so $C$ is the unit circle at $z=0$.
- Sphere $x^2+y^2+z^2=4$ above $z=1$: substitute $z=1$, so $x^2+y^2=3$. The radius is $\sqrt3$, **not** 2.
- Hemisphere $z=\sqrt{4-x^2-y^2}$ inside the cylinder $x^2+y^2=1$: the cylinder fixes the radius 1, and the height is $z=\sqrt{4-1}=\sqrt3$.

**Lecture example.** $\vec F=\langle xz-y,\ x-yz,\ x^2\rangle$, $S$: $z=1-x^2-y^2$, $z\ge0$, upward. $C$: $\langle\cos t,\sin t,0\rangle$. On $C$, $z=0$, so $\vec F=\langle-\sin t,\cos t,\cos^2t\rangle$ and $\vec F\cdot\vec r^{\,\prime}=\sin^2t+\cos^2t=1$. Answer: $2\pi$. You never had to compute the curl.

A side effect: any other surface with the same boundary and compatible orientation gives the same answer. For instance the flat disk $x^2+y^2\le1$, $z=0$, normal up. Lesson 35 uses this a lot.`,
    },
    {
      id: 'decide',
      title: 'Which theorem for a line integral?',
      body: String.raw`From the final review, to compute $\int_C\vec F\cdot d\vec r$:

1. Is $\vec F$ **conservative** ($\operatorname{curl}\vec F=\vec0$)? Use the **Fundamental Theorem for Line Integrals**: $\phi(\text{end})-\phi(\text{start})$. On a closed curve that is 0.
2. If not, is $C$ **closed**?
   - Closed and **flat in the $xy$-plane**: **Green's theorem**.
   - Closed in **3D**: **Stokes' theorem**. Pick a surface whose boundary is $C$.
3. Not closed: **parametrize** $C$ and integrate $\vec F(\vec r(t))\cdot\vec r^{\,\prime}(t)$.

And to compute $\iint_S\operatorname{curl}\vec F\cdot d\vec S$: Stokes lets you replace it by $\oint_C\vec F\cdot d\vec r$, or by the same flux through an easier surface with the same edge.`,
    },
  ],

  formulas: [
    { label: "Stokes' theorem", tex: String.raw`\oint_C\vec F\cdot d\vec r=\iint_S\operatorname{curl}\vec F\cdot d\vec S=\iint_S(\nabla\times\vec F)\cdot\vec n\,dS` },
    { label: 'Curl', tex: String.raw`\nabla\times\langle P,Q,R\rangle=\langle R_y-Q_z,\ P_z-R_x,\ Q_x-P_y\rangle` },
    { label: 'Orientation', tex: String.raw`\text{fingers along }C\ \Rightarrow\ \text{thumb along }\vec n;\quad \vec n\text{ up}\Leftrightarrow C\text{ counterclockwise from above}` },
    { label: 'Line integral', tex: String.raw`\oint_C\vec F\cdot d\vec r=\int_a^b\vec F(\vec r(t))\cdot\vec r^{\,\prime}(t)\,dt` },
  ],

  mistakes: [
    {
      id: 'rhr',
      title: 'Boundary traversed the wrong way',
      wrong: String.raw`Downward normal, but $C$ taken counterclockwise from above`,
      right: String.raw`Downward normal $\Rightarrow$ $C$ clockwise from above (thumb down, fingers clockwise)`,
      why: 'The two sides of Stokes are equal only with compatible orientations. Reversing C flips the sign.',
    },
    {
      id: 'curl-error',
      title: 'Wrong curl',
      wrong: String.raw`$\operatorname{curl}\langle P,Q,R\rangle=\langle R_y-Q_z,\ R_x-P_z,\ Q_x-P_y\rangle$`,
      right: String.raw`Middle component is $P_z-R_x$`,
      why: 'Expanding the determinant puts a minus sign on the j term. Write the formula down every time.',
    },
    {
      id: 'boundary-param',
      title: 'Wrong boundary circle',
      wrong: String.raw`Cap of $x^2+y^2+z^2=4$ above $z=1$: $C=\langle2\cos t,2\sin t,1\rangle$`,
      right: String.raw`$x^2+y^2=4-1=3$, so $C=\langle\sqrt3\cos t,\sqrt3\sin t,1\rangle$`,
      why: 'The rim radius comes from intersecting the surface with the cutting plane, not from the radius of the sphere.',
    },
    {
      id: 'not-curl',
      title: 'Computing the flux of F instead of curl F',
      wrong: String.raw`$\iint_S\vec F\cdot d\vec S$ when the problem asks for $\iint_S\operatorname{curl}\vec F\cdot d\vec S$`,
      right: String.raw`Stokes turns $\iint_S\operatorname{curl}\vec F\cdot d\vec S$ into $\oint_C\vec F\cdot d\vec r$; the flux of $\vec F$ itself is a different number`,
      why: 'Stokes pairs the line integral of F with the flux of its curl. Mixing them gives a meaningless answer.',
    },
    {
      id: 'normal-sign',
      title: 'Wrong normal in the direct method',
      wrong: String.raw`Outward cap, using $-(\vec r_\phi\times\vec r_\theta)$`,
      right: String.raw`$\vec r_\phi\times\vec r_\theta$ has $z$-component $4\sin\phi\cos\phi>0$: already outward`,
      why: 'If you compute the surface side directly, the normal must match the stated orientation, exactly as in a flux integral.',
    },
  ],

  hook: 'Right hand: fingers go around C, thumb goes through S.',

  scene: {
    view: { range: 2.5, z: [-1.2, 3] },
    camera: [5, -5, 3.5],
    layers: [
      { id: 'cap', kind: 'paramSurface', x: '2*sin(u)*cos(v)', y: '2*sin(u)*sin(v)', z: '2*cos(u)', u: [0, 'pi/3'], v: [0, '2*pi'], colormap: 'water', opacity: 0.75 },
      { id: 'n0', kind: 'vector', from: [0, 0, 2], to: [0, 0, 2.8], color: 'wood', label: 'n' },
      { id: 'n1', kind: 'vector', from: [1, 0, 1.732], to: [1.4, 0, 2.425], color: 'wood' },
      { id: 'n2', kind: 'vector', from: [-0.5, 0.866, 1.732], to: [-0.7, 1.212, 2.425], color: 'wood' },
      { id: 'n3', kind: 'vector', from: [-0.5, -0.866, 1.732], to: [-0.7, -1.212, 2.425], color: 'wood' },
      { id: 'C', kind: 'curve', x: 'sqrt(3)*cos(t)', y: 'sqrt(3)*sin(t)', z: '1', t: [0, '2*pi'], color: 'road', arrow: true },
      { id: 'F', kind: 'vectorField', P: 'y', Q: '-x', R: '0', density: 6 },
      { id: 'disk', kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: '1', u: [0, 'sqrt(3)'], v: [0, '2*pi'], colormap: 'textbook', opacity: 0.8 },
      { id: 'kn', kind: 'vector', from: [0, 0, 1], to: [0, 0, 2], color: 'wood', label: 'n = k' },
      { id: 'cv', kind: 'vector', from: [0.6, 0.6, 1], to: [0.6, 0.6, -1], color: 'revision', label: 'curl F = <0,0,-2>' },
    ],
    steps: [
      { label: 'Start', show: ['cap'], caption: String.raw`The cap of the radius-2 sphere above $z=1$. Stokes' theorem connects a flux through this surface to a line integral around its rim.` },
      { label: 'Normals', show: ['cap', 'n0', 'n1', 'n2', 'n3'], caption: String.raw`Orient the cap outward. On this cap outward also means upward.` },
      { label: 'Right hand', show: ['cap', 'n0', 'n1', 'n2', 'n3', 'C'], caption: String.raw`Thumb along the green normals, fingers curl counterclockwise seen from above. So $C$ is $\langle\sqrt3\cos t,\sqrt3\sin t,1\rangle$, $0\le t\le2\pi$. Radius $\sqrt3$, from $x^2+y^2=4-1$.` },
      { label: 'Circulation', show: ['C', 'F'], caption: String.raw`$\vec F=\langle y,-x,0\rangle$ swirls clockwise, against the direction of $C$. So the circulation is negative: $\vec F\cdot\vec r^{\,\prime}=-3$ and $\oint_C\vec F\cdot d\vec r=-6\pi$.` },
      { label: 'Easy surface', show: ['disk', 'kn', 'cv', 'C'], caption: String.raw`Same rim, flatter surface: the disk $x^2+y^2\le3$ at $z=1$ with $\vec n=\vec k$. $\operatorname{curl}\vec F\cdot\vec k=-2$, times area $3\pi$, gives $-6\pi$ again.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Let $\vec F=\langle-y,x,0\rangle$ and let $S$ be the upper hemisphere $x^2+y^2+z^2=9$, $z\ge0$, oriented outward. Find $\iint_S\operatorname{curl}\vec F\cdot d\vec S$.`,
      choices: [
        { tex: String.raw`$18\pi$`, correct: true },
        { tex: String.raw`$-18\pi$`, mistake: 'rhr', why: 'Outward on the upper hemisphere is up, so C goes counterclockwise from above.' },
        { tex: String.raw`$36\pi$`, mistake: 'concept', why: 'curl F · n is not 2 on the curved surface. 2 times the hemisphere area 18π is not the flux.' },
        { tex: String.raw`$2\pi$`, mistake: 'boundary-param', why: 'The rim is the circle of radius 3 in the xy-plane, not radius 1.' },
        { tex: String.raw`$9\pi$`, mistake: 'curl-error', why: 'curl F = ⟨0, 0, 1 - (-1)⟩ = ⟨0, 0, 2⟩, not ⟨0, 0, 1⟩.' },
      ],
      steps: [
        String.raw`Boundary: $z=0$, $x^2+y^2=9$. Outward is up, so $\vec r(t)=\langle3\cos t,3\sin t,0\rangle$.`,
        String.raw`$\vec F(\vec r)=\langle-3\sin t,3\cos t,0\rangle$, $\vec r^{\,\prime}=\langle-3\sin t,3\cos t,0\rangle$, dot product 9.`,
        String.raw`$\oint_C\vec F\cdot d\vec r=\int_0^{2\pi}9\,dt=18\pi$. Check with the disk: $\operatorname{curl}\vec F\cdot\vec k=2$ times area $9\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Use Stokes' theorem to find $\iint_S\operatorname{curl}\vec F\cdot d\vec S$, where $\vec F=\langle z-y,\ x+z,\ xy\rangle$ and $S$ is the part of $z=4-x^2-y^2$ above the $xy$-plane, oriented upward.`,
      choices: [
        { tex: String.raw`$8\pi$`, correct: true },
        { tex: String.raw`$-8\pi$`, mistake: 'rhr', why: 'Upward normal means counterclockwise from above.' },
        { tex: String.raw`$32\pi$`, mistake: 'boundary-param', why: 'Setting z = 0 gives x² + y² = 4, a circle of radius 2, not 4.' },
        { tex: String.raw`$0$`, mistake: 'not-curl', why: 'That is the flux of F itself through the paraboloid, not the flux of curl F.' },
        { tex: String.raw`$4\pi$`, mistake: 'curl-error', why: 'The k-component of the curl is Q_x - P_y = 1 - (-1) = 2. Dropping the P_y term gives 1.' },
      ],
      steps: [
        String.raw`Boundary: $z=0$, so $x^2+y^2=4$. Counterclockwise: $\vec r=\langle2\cos t,2\sin t,0\rangle$.`,
        String.raw`On $C$, $z=0$: $\vec F=\langle-2\sin t,\ 2\cos t,\ 4\cos t\sin t\rangle$.`,
        String.raw`$\vec r^{\,\prime}=\langle-2\sin t,2\cos t,0\rangle$, so $\vec F\cdot\vec r^{\,\prime}=4\sin^2t+4\cos^2t=4$.`,
        String.raw`$\int_0^{2\pi}4\,dt=8\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Let $S$ be the part of the sphere $x^2+y^2+z^2=25$ with $z\ge3$, oriented outward, and $\vec F=\langle y,-x,z\rangle$. Find $\iint_S\operatorname{curl}\vec F\cdot d\vec S$.`,
      choices: [
        { tex: String.raw`$-32\pi$`, correct: true },
        { tex: String.raw`$32\pi$`, mistake: 'rhr', why: 'You went clockwise. Outward on this cap is up, which pairs with counterclockwise from above, and then F · r′ = -16.' },
        { tex: String.raw`$-50\pi$`, mistake: 'boundary-param', why: 'The rim radius is √(25 - 9) = 4, not the sphere radius 5.' },
        { tex: String.raw`$-18\pi$`, mistake: 'boundary-param', why: 'You used the height 3 as the radius. The radius is √(25 - 9) = 4.' },
        { tex: String.raw`$-16\pi$`, mistake: 'curl-error', why: 'curl F = ⟨0, 0, -1 - 1⟩ = ⟨0, 0, -2⟩. With -1 you get half the answer.' },
      ],
      steps: [
        String.raw`Rim: $z=3$, $x^2+y^2=25-9=16$, radius 4. Outward is up here, so counterclockwise: $\vec r=\langle4\cos t,4\sin t,3\rangle$.`,
        String.raw`$\vec F(\vec r)=\langle4\sin t,-4\cos t,3\rangle$, $\vec r^{\,\prime}=\langle-4\sin t,4\cos t,0\rangle$.`,
        String.raw`Dot product: $-16\sin^2t-16\cos^2t=-16$. Integral: $-32\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`$C$ is the triangle with vertices $(1,0,0)$, $(0,1,0)$, $(0,0,1)$, traversed counterclockwise as seen from above. For $\vec F=\langle2z,3x,y\rangle$, find $\oint_C\vec F\cdot d\vec r$.`,
      choices: [
        { tex: String.raw`$3$`, correct: true },
        { tex: String.raw`$-3$`, mistake: 'rhr', why: 'Counterclockwise from above goes with the upward normal ⟨1, 1, 1⟩, not ⟨-1, -1, -1⟩.' },
        { tex: String.raw`$3\sqrt3$`, mistake: 'setup', why: 'You multiplied by |⟨1, 1, 1⟩| = √3. In the flux formula you dot with r_u × r_v and use dA, with no magnitude.' },
        { tex: String.raw`$6$`, mistake: 'arith', why: 'The shadow triangle has area 1/2, not 1.' },
        { tex: String.raw`$1$`, mistake: 'curl-error', why: 'The middle component of the curl is P_z - R_x = 2 - 0 = 2, not -2.' },
      ],
      steps: [
        String.raw`$C$ is closed in 3D and $\vec F$ is not conservative, so use Stokes with the flat triangle $S$: $x+y+z=1$.`,
        String.raw`$\operatorname{curl}\vec F=\langle R_y-Q_z,\ P_z-R_x,\ Q_x-P_y\rangle=\langle1,2,3\rangle$.`,
        String.raw`$\vec r=\langle u,v,1-u-v\rangle$, $\vec r_u\times\vec r_v=\langle1,1,1\rangle$ (upward, matches counterclockwise).`,
        String.raw`$\iint_R\langle1,2,3\rangle\cdot\langle1,1,1\rangle\,dA=6\cdot\tfrac12=3$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Let $S$ be the upper half of the ellipsoid $x^2+y^2+\dfrac{z^2}{16}=1$, $z\ge0$, oriented upward, and $\vec F=\langle2z,3x,5y\rangle$. Find $\iint_S\operatorname{curl}\vec F\cdot d\vec S$.`,
      choices: [
        { tex: String.raw`$3\pi$`, correct: true },
        { tex: String.raw`$-3\pi$`, mistake: 'rhr', why: 'Upward on the dome pairs with the unit circle counterclockwise from above.' },
        { tex: String.raw`$12\pi$`, mistake: 'concept', why: 'The height of the dome does not matter; only the boundary circle does.' },
        { tex: String.raw`$5\pi$`, mistake: 'curl-error', why: 'The flat disk has n = k, so you need the k-component Q_x - P_y = 3, not the i-component 5.' },
        { tex: String.raw`$10\pi$`, mistake: 'setup', why: 'You added all three curl components. Only the component along n = k counts on the disk.' },
      ],
      steps: [
        String.raw`The boundary is the unit circle in the $xy$-plane for every height of the dome.`,
        String.raw`Use the easy surface: the disk $x^2+y^2\le1$, $z=0$, $\vec n=\vec k$.`,
        String.raw`$\operatorname{curl}\vec F=\langle5-0,\ 2-0,\ 3-0\rangle=\langle5,2,3\rangle$, so $\operatorname{curl}\vec F\cdot\vec k=3$.`,
        String.raw`Flux $=3\cdot\pi(1)^2=3\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`For $\vec F=\langle y,-x,0\rangle$ and the outward-oriented cap of $x^2+y^2+z^2=4$ above $z=1$, which integral equals $\iint_S\operatorname{curl}\vec F\cdot d\vec S$ computed directly with $\vec r(\phi,\theta)=\langle2\sin\phi\cos\theta,2\sin\phi\sin\theta,2\cos\phi\rangle$?`,
      choices: [
        { tex: String.raw`$\displaystyle\int_0^{2\pi}\!\!\int_0^{\pi/3}(-2)(4\sin\phi\cos\phi)\,d\phi\,d\theta$`, correct: true },
        { tex: String.raw`$\displaystyle\int_0^{2\pi}\!\!\int_0^{\pi/3}8\sin\phi\cos\phi\,d\phi\,d\theta$`, mistake: 'normal-sign', why: 'You used -(r_φ × r_θ), the inward normal. r_φ × r_θ itself already points outward.' },
        { tex: String.raw`$\displaystyle\int_0^{2\pi}\!\!\int_0^{\pi/2}(-2)(4\sin\phi\cos\phi)\,d\phi\,d\theta$`, mistake: 'setup', why: 'φ = π/2 is the equator. The cap stops where 2 cos φ = 1, at φ = π/3.' },
        { tex: String.raw`$\displaystyle\int_0^{2\pi}\!\!\int_0^{\pi/3}(-2)(4\sin\phi)\,d\phi\,d\theta$`, mistake: 'concept', why: 'That multiplies by |r_φ × r_θ|. Flux needs the dot product with the cross product, here its z-component 4 sin φ cos φ.' },
        { tex: String.raw`$\displaystyle\int_0^{2\pi}\!\!\int_0^{\pi/3}(-1)(4\sin\phi\cos\phi)\,d\phi\,d\theta$`, mistake: 'curl-error', why: 'curl F has k-component Q_x - P_y = -1 - 1 = -2.' },
      ],
      steps: [
        String.raw`$\operatorname{curl}\vec F=\langle0,0,-2\rangle$, so only the $z$-component of the normal matters.`,
        String.raw`$\vec r_\phi\times\vec r_\theta$ has $z$-component $4\sin\phi\cos\phi>0$ on the cap: outward, keep it.`,
        String.raw`Rim at $2\cos\phi=1$, $\phi=\pi/3$. The integral evaluates to $-6\pi$, matching the line integral.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Let $S$ be the part of $z=\sqrt{4-x^2-y^2}$ that lies inside the cylinder $x^2+y^2=1$, oriented upward, and $\vec F=\langle yz,-xz,xy\rangle$. Find $\iint_S\operatorname{curl}\vec F\cdot d\vec S$.`,
      choices: [
        { tex: String.raw`$-2\sqrt3\,\pi$`, correct: true },
        { tex: String.raw`$2\sqrt3\,\pi$`, mistake: 'rhr', why: 'Upward normal means counterclockwise from above, and then F · r′ = -√3.' },
        { tex: String.raw`$-4\pi$`, mistake: 'boundary-param', why: 'You put the rim at z = 2. The cylinder meets the sphere at z = √(4 - 1) = √3.' },
        { tex: String.raw`$-2\pi$`, mistake: 'boundary-param', why: 'You put the rim at z = 1. The height is √3.' },
        { tex: String.raw`$0$`, mistake: 'concept', why: 'A closed-loop integral is 0 only for a conservative field. Here curl F = ⟨2x, 0, -2z⟩ is not zero.' },
      ],
      steps: [
        String.raw`Rim: $x^2+y^2=1$ and $z=\sqrt{4-1}=\sqrt3$. Counterclockwise: $\vec r=\langle\cos t,\sin t,\sqrt3\rangle$.`,
        String.raw`$\vec F(\vec r)=\langle\sqrt3\sin t,\ -\sqrt3\cos t,\ \cos t\sin t\rangle$, $\vec r^{\,\prime}=\langle-\sin t,\cos t,0\rangle$.`,
        String.raw`$\vec F\cdot\vec r^{\,\prime}=-\sqrt3\sin^2t-\sqrt3\cos^2t=-\sqrt3$.`,
        String.raw`$\int_0^{2\pi}(-\sqrt3)\,dt=-2\sqrt3\,\pi$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'paramSurface', x: '2*sin(u)*cos(v)', y: '2*sin(u)*sin(v)', z: '2*cos(u)', u: [0, 'pi/3'], v: [0, '2*pi'] },
    { kind: 'curve', x: 'sqrt(3)*cos(t)', y: 'sqrt(3)*sin(t)', z: '1', t: [0, '2*pi'] },
    { kind: 'vectorField', P: 'y', Q: '-x', R: '0', density: 6 },
  ],
};
