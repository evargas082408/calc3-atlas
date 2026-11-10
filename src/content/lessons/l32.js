export default {
  id: 32,
  title: 'Surface integrals of functions',
  section: '17.6',
  exam: 3,
  blurb: 'Add up a function over a curved surface: mass of a shell, average over a cap, and more.',
  boiler: ['Surface Integrals', 'Surface Area Integration'],

  sections: [
    {
      id: 'idea',
      title: 'The idea: weight each bit of area',
      body: String.raw`Surface area adds up the pieces $dS$. A **surface integral of a function** adds up $f\cdot dS$ instead, so each piece of surface counts according to the value of $f$ there.

$$\iint_S f\,dS=\iint_R f(\vec r(u,v))\,|\vec r_u\times\vec r_v|\,dA.$$

It is the surface version of the line integral $\int_C f\,ds=\int_a^b f(\vec r(t))\,|\vec r^{\,\prime}(t)|\,dt$. Same two moves: put the parametrization into $f$, and multiply by the stretch factor.

What it means depends on $f$:
- $f=1$: $\iint_S 1\,dS$ is the surface area (Lesson 31).
- $f$ = density of a thin shell (mass per area): $\iint_S f\,dS$ is the **mass** of the shell.

The answer is a number. There is no direction and no choice of normal here. That is the big difference from the flux integrals in Lesson 33.`,
    },
    {
      id: 'recipe',
      title: 'Recipe',
      body: String.raw`1. **Parametrize** $S$ as $\vec r(u,v)$ and write the ranges of $u,v$ (Lesson 31).
2. **Stretch factor**: compute $\vec r_u\times\vec r_v$ and its magnitude.
3. **Substitute**: replace every $x,y,z$ in $f$ by the components of $\vec r(u,v)$.
4. **Integrate** $f(\vec r(u,v))\,|\vec r_u\times\vec r_v|$ over the $u,v$ ranges. If $R$ is a disk, switch to polar.

Steps 2 and 3 are where points get lost. A student who forgets step 2 computes an integral over the flat region $R$, not over $S$. A student who forgets step 3 is integrating a function of $x,y,z$ with respect to $u,v$, which makes no sense.

**Simplify before you integrate.** On the sphere $x^2+y^2+z^2=a^2$ the sum is just $a^2$. On the cone $z=\sqrt{x^2+y^2}$, $x^2+y^2=z^2$. Use the surface's equation to shrink $f$.`,
    },
    {
      id: 'factors',
      title: 'Stretch factors to know by heart',
      body: String.raw`Most problems use one of these. Derive each once, then reuse it.

- **Graph** $z=f(x,y)$, $\vec r=\langle u,v,f\rangle$: $|\vec r_u\times\vec r_v|=\sqrt{1+f_x^2+f_y^2}$.
- **Plane**: a constant. For $x+y+z=1$ it is $|\langle1,1,1\rangle|=\sqrt3$.
- **Sphere** radius $a$, $\vec r(\phi,\theta)$: $|\vec r_\phi\times\vec r_\theta|=a^2\sin\phi$.
- **Cylinder** radius $a$: $a$.
- **Cone** $\langle u\cos v,u\sin v,u\rangle$: $\sqrt2\,u$.

**The sphere, worked once** (radius 2). $\vec r_\phi=\langle2\cos\phi\cos\theta,2\cos\phi\sin\theta,-2\sin\phi\rangle$ and $\vec r_\theta=\langle-2\sin\phi\sin\theta,2\sin\phi\cos\theta,0\rangle$. Their cross product is
$$4\sin\phi\,\langle\sin\phi\cos\theta,\ \sin\phi\sin\theta,\ \cos\phi\rangle,$$
and the vector in brackets has length 1. So the magnitude is $4\sin\phi=\rho^2\sin\phi$ with $\rho=2$. Notice it matches the $\rho^2\sin\phi$ in the spherical volume element with $\rho$ frozen.`,
    },
    {
      id: 'example-graph',
      title: 'Worked example: a graph surface',
      body: String.raw`Evaluate $\iint_S\sqrt{x^2+3z}\,dS$ where $S$ is $z=x^2$, $0\le x\le2$, $0\le y\le4$.

1. $\vec r=\langle u,v,u^2\rangle$, $0\le u\le2$, $0\le v\le4$.
2. $\vec r_u\times\vec r_v=\langle-2u,0,1\rangle$, magnitude $\sqrt{4u^2+1}$.
3. Substitute: $\sqrt{x^2+3z}=\sqrt{u^2+3u^2}=2u$ (since $u\ge0$).
4. Integrate:
$$\int_0^4\!\int_0^2 2u\sqrt{4u^2+1}\,du\,dv=4\cdot\frac16\left(4u^2+1\right)^{3/2}\Big|_0^2=\frac23\left(17\sqrt{17}-1\right).$$

Step 3 is what made the integral doable. The substitution $t=4u^2+1$ needs the factor $u$ that came out of $f$.`,
    },
    {
      id: 'example-sphere',
      title: 'Worked example: a spherical cap',
      body: String.raw`Evaluate $\iint_S xz\,dS$ where $S$ is the part of the sphere of radius 2 above $z=1$.

1. $\vec r(\phi,\theta)=\langle2\sin\phi\cos\theta,2\sin\phi\sin\theta,2\cos\phi\rangle$. Above $z=1$ means $2\cos\phi\ge1$, so $0\le\phi\le\pi/3$, and $0\le\theta\le2\pi$.
2. $|\vec r_\phi\times\vec r_\theta|=4\sin\phi$.
3. $xz=(2\sin\phi\cos\theta)(2\cos\phi)$.
4. $$\int_0^{2\pi}\!\int_0^{\pi/3}4\sin\phi\cos\phi\cos\theta\cdot4\sin\phi\,d\phi\,d\theta=0,$$
because $\int_0^{2\pi}\cos\theta\,d\theta=0$.

That zero has a reason. The cap is symmetric under $x\to-x$, and $xz$ flips sign there, so the positive and negative halves cancel. Spot symmetry like this before you grind.`,
    },
    {
      id: 'which',
      title: 'Scalar or flux? Read the integrand',
      body: String.raw`Two different integrals share the name "surface integral". Tell them apart from the notation.

- $\iint_S f\,dS$ with a **scalar** $f$: use $|\vec r_u\times\vec r_v|$ (a magnitude). No orientation. This lesson.
- $\iint_S\vec F\cdot d\vec S=\iint_S\vec F\cdot\vec n\,dS$ with a **vector field** $\vec F$: use $\pm\,\vec r_u\times\vec r_v$ (a vector, no magnitude). The sign depends on the normal. Lesson 33.

If the problem says *mass*, *area*, or gives a function like $x^2+y^2$, it is scalar. If it says *flux*, gives a vector field, or names a normal direction, it is a flux integral.`,
    },
  ],

  formulas: [
    { label: 'Scalar surface integral', tex: String.raw`\iint_S f\,dS=\iint_R f(\vec r(u,v))\,|\vec r_u\times\vec r_v|\,dA` },
    { label: 'Area and mass', tex: String.raw`\text{Area}=\iint_S1\,dS,\qquad \text{Mass}=\iint_S\sigma\,dS` },
    { label: 'Graph z = g(x, y)', tex: String.raw`dS=\sqrt{1+g_x^2+g_y^2}\,dA` },
    { label: 'Sphere of radius a', tex: String.raw`dS=a^2\sin\phi\,d\phi\,d\theta` },
    { label: 'Cone and cylinder', tex: String.raw`\text{cone }\langle u\cos v,u\sin v,u\rangle:\ dS=\sqrt2\,u\,du\,dv;\quad \text{cylinder radius }a:\ dS=a\,du\,dv` },
  ],

  mistakes: [
    {
      id: 'no-magnitude',
      title: 'Forgetting |r_u × r_v|',
      wrong: String.raw`$\iint_S z\,dS=\iint_R (1-u-v)\,dA$ on the plane $x+y+z=1$`,
      right: String.raw`$\iint_R (1-u-v)\sqrt3\,dA$`,
      why: 'dS is area on the surface, not on the flat uv-region. The magnitude converts one to the other.',
    },
    {
      id: 'not-substituted',
      title: 'Not putting r(u, v) into f',
      wrong: String.raw`$\iint_S z\,dS$ on the half cylinder $y^2+z^2=4$ treated as $2\cdot(\text{area})$`,
      right: String.raw`$z=2\sin v$ on the surface, so integrate $2\sin v\cdot2$`,
      why: 'f changes from point to point on S. Only quantities that are truly constant on S, like x² + y² + z² on a sphere, may be replaced by a number.',
    },
    {
      id: 'sphere-element',
      title: 'Wrong factor on a sphere',
      wrong: String.raw`$dS=\sin\phi\,d\phi\,d\theta$ on the sphere of radius 2`,
      right: String.raw`$dS=4\sin\phi\,d\phi\,d\theta$`,
      why: 'The factor is a² sin φ. Also do not use the volume element ρ² sin φ dρ dφ dθ: on a surface ρ is fixed and there is no dρ.',
    },
    {
      id: 'ranges',
      title: 'Ranges that cover the wrong piece',
      wrong: String.raw`Half cylinder $z\ge0$ with $0\le v\le2\pi$`,
      right: String.raw`$z=2\sin v\ge0$ means $0\le v\le\pi$`,
      why: 'Translate every restriction (z ≥ 0, above a plane, first octant) into the parameters before integrating.',
    },
    {
      id: 'flux-confusion',
      title: 'Treating a scalar integral like flux',
      wrong: String.raw`$\iint_S z^2\,dS=\iint_R u^2\,(\vec r_u\times\vec r_v)\cdot\vec k\,dA$`,
      right: String.raw`$\iint_R u^2\,|\vec r_u\times\vec r_v|\,dA$`,
      why: 'A scalar integral uses the length of the cross product. Dotting with a direction belongs to flux integrals.',
    },
  ],

  hook: 'Scalar surface integral: plug in, then multiply by the stretch factor.',

  scene: {
    view: { range: 2.5, z: [-0.5, 3.6] },
    camera: [5.5, -4.5, 4],
    layers: [
      { id: 'sphere', kind: 'paramSurface', x: '2*sin(u)*cos(v)', y: '2*sin(u)*sin(v)', z: '2*cos(u)', u: [0, 'pi'], v: [0, '2*pi'], colormap: 'water', opacity: 0.18, mesh: false },
      { id: 'cap', kind: 'paramSurface', x: '2*sin(u)*cos(v)', y: '2*sin(u)*sin(v)', z: '2*cos(u)', u: [0, 'pi/3'], v: [0, '2*pi'], colormap: 'inferno', opacity: 0.9 },
      { id: 'cut', kind: 'plane', normal: [0, 0, 1], point: [0, 0, 1], size: 2.5 },
      { id: 'rim', kind: 'curve', x: 'sqrt(3)*cos(t)', y: 'sqrt(3)*sin(t)', z: '1', t: [0, '2*pi'], color: 'road' },
      { id: 'P', kind: 'point', at: [1, 0, 1.7321], label: 'phi = pi/6' },
      { id: 'rphi', kind: 'vector', from: [1, 0, 1.7321], to: [1.866, 0, 1.2321], color: 'road', label: 'r_phi (half length)' },
      { id: 'rth', kind: 'vector', from: [1, 0, 1.7321], to: [1, 1, 1.7321], color: 'wood', label: 'r_theta' },
      { id: 'nrm', kind: 'vector', from: [1, 0, 1.7321], to: [2, 0, 3.4641], color: 'revision', label: 'length 4 sin(phi) = 2' },
      { id: 'cone', kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: 'u', u: [0, 1], v: [0, '2*pi'], colormap: 'inferno' },
    ],
    steps: [
      { label: 'Start', show: ['sphere', 'cap'], caption: String.raw`The cap of the radius-2 sphere above $z=1$. A scalar surface integral adds $f\,dS$ over every bit of it.` },
      { label: 'Bounds', show: ['sphere', 'cap', 'cut', 'rim'], caption: String.raw`The plane $z=1$ meets the sphere where $2\cos\phi=1$, so $\phi$ runs from 0 to $\pi/3$. The rim is the circle $x^2+y^2=3$ at height 1.` },
      { label: 'Stretch', show: ['cap', 'P', 'rphi', 'rth', 'nrm'], caption: String.raw`At $\phi=\pi/6$ the tangent vectors span a parallelogram of area $|\vec r_\phi\times\vec r_\theta|=4\sin\phi=2$ per unit $d\phi\,d\theta$. Near the top ($\phi\to0$) the factor shrinks, because the $\theta$-circles get tiny.` },
      { label: 'Symmetry', show: ['cap', 'rim'], caption: String.raw`For $f=xz$: the cap is symmetric across the $yz$-plane and $xz$ changes sign there. The two halves cancel, so $\iint_S xz\,dS=0$.` },
      { label: 'Mass', show: ['cone'], caption: String.raw`A cone shell $z=\sqrt{x^2+y^2}$, $0\le z\le1$, with density $\sigma=z$, so the color (height) is also the density. Mass $=\int_0^{2\pi}\!\int_0^1 u\cdot\sqrt2\,u\,du\,dv=\tfrac{2\sqrt2\,\pi}{3}$.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Evaluate $\iint_S z\,dS$, where $S$ is the part of the plane $x+y+z=1$ in the first octant.`,
      choices: [
        { tex: String.raw`$\dfrac{\sqrt3}{6}$`, correct: true },
        { tex: String.raw`$\dfrac16$`, mistake: 'no-magnitude', why: 'You left out the stretch factor √3.' },
        { tex: String.raw`$\dfrac{\sqrt3}{2}$`, mistake: 'not-substituted', why: 'That is the surface area. You integrated 1 instead of z = 1 - u - v.' },
        { tex: String.raw`$\dfrac{\sqrt3}{3}$`, mistake: 'arith', why: 'The integral of 1 - u - v over the triangle is 1/6, not 1/3.' },
        { tex: String.raw`$-\dfrac{\sqrt3}{6}$`, mistake: 'flux-confusion', why: 'A scalar surface integral has no orientation, so there is no sign to flip. z ≥ 0 here, so the answer is positive.' },
      ],
      steps: [
        String.raw`$\vec r=\langle u,v,1-u-v\rangle$ over the triangle $u,v\ge0$, $u+v\le1$.`,
        String.raw`$\vec r_u\times\vec r_v=\langle1,1,1\rangle$, magnitude $\sqrt3$.`,
        String.raw`$\int_0^1\!\int_0^{1-u}(1-u-v)\sqrt3\,dv\,du=\sqrt3\int_0^1\tfrac{(1-u)^2}{2}\,du=\sqrt3\cdot\tfrac16$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Evaluate $\iint_S(x^2+y^2)\,dS$, where $S$ is the sphere $x^2+y^2+z^2=4$.`,
      choices: [
        { tex: String.raw`$\dfrac{128\pi}{3}$`, correct: true },
        { tex: String.raw`$\dfrac{32\pi}{3}$`, mistake: 'sphere-element', why: 'You used sin φ instead of 4 sin φ for dS.' },
        { tex: String.raw`$4\pi^2$`, mistake: 'no-magnitude', why: 'You integrated 4 sin²φ with no stretch factor at all.' },
        { tex: String.raw`$\dfrac{64\pi}{3}$`, mistake: 'ranges', why: 'φ must run to π for the whole sphere; π/2 is only the top half.' },
        { tex: String.raw`$64\pi$`, mistake: 'not-substituted', why: 'x² + y² is not 4 on the sphere; x² + y² + z² is. On the sphere x² + y² = 4 sin²φ.' },
      ],
      steps: [
        String.raw`Sphere: $dS=4\sin\phi\,d\phi\,d\theta$, $0\le\phi\le\pi$, $0\le\theta\le2\pi$.`,
        String.raw`$x^2+y^2=4\sin^2\phi(\cos^2\theta+\sin^2\theta)=4\sin^2\phi$.`,
        String.raw`$\int_0^{2\pi}\!\int_0^\pi16\sin^3\phi\,d\phi\,d\theta=16\cdot\tfrac43\cdot2\pi=\tfrac{128\pi}{3}$.`,
        String.raw`Use $\int_0^\pi\sin^3\phi\,d\phi=\int_{-1}^1(1-w^2)\,dw=\tfrac43$ with $w=\cos\phi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Let $S$ be the half cylinder $y^2+z^2=4$, $z\ge0$, $0\le x\le3$. Evaluate $\iint_S z\,dS$.`,
      choices: [
        { tex: String.raw`$24$`, correct: true },
        { tex: String.raw`$12$`, mistake: 'no-magnitude', why: 'The cylinder has radius 2, so dS = 2 du dv. You dropped the 2.' },
        { tex: String.raw`$0$`, mistake: 'ranges', why: 'v from 0 to 2π covers the whole cylinder, where z takes both signs. z ≥ 0 means 0 ≤ v ≤ π.' },
        { tex: String.raw`$12\pi$`, mistake: 'not-substituted', why: 'You replaced z by the radius 2 and multiplied by the area 6π. z = 2 sin v varies.' },
        { tex: String.raw`$8$`, mistake: 'arith', why: 'You forgot the x integral from 0 to 3.' },
      ],
      steps: [
        String.raw`Cylinder around the $x$-axis: $\vec r=\langle u,2\cos v,2\sin v\rangle$, $0\le u\le3$, $0\le v\le\pi$.`,
        String.raw`$\vec r_u\times\vec r_v=\langle0,-2\cos v,-2\sin v\rangle$, magnitude 2.`,
        String.raw`$\int_0^\pi\!\int_0^3(2\sin v)(2)\,du\,dv=12\int_0^\pi\sin v\,dv=24$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`A thin shell has the shape of the cone $z=\sqrt{x^2+y^2}$, $0\le z\le1$, and density $\sigma(x,y,z)=z$. Find its mass.`,
      choices: [
        { tex: String.raw`$\dfrac{2\sqrt2\,\pi}{3}$`, correct: true },
        { tex: String.raw`$\pi$`, mistake: 'no-magnitude', why: 'You integrated u du dv and left out |r_u × r_v| = √2 u.' },
        { tex: String.raw`$\dfrac{2\pi}{3}$`, mistake: 'arith', why: 'The magnitude is √(u² + u²) = √2 u. You kept the u but dropped the √2.' },
        { tex: String.raw`$\dfrac{\sqrt2\,\pi}{3}$`, mistake: 'ranges', why: 'v must run from 0 to 2π, not π.' },
        { tex: String.raw`$\sqrt2\,\pi$`, mistake: 'arith', why: 'The antiderivative of u² is u³/3, not u²/2.' },
      ],
      steps: [
        String.raw`$\vec r=\langle u\cos v,u\sin v,u\rangle$, $0\le u\le1$, $0\le v\le2\pi$, $|\vec r_u\times\vec r_v|=\sqrt2\,u$.`,
        String.raw`Density on the surface: $\sigma=z=u$.`,
        String.raw`Mass $=\int_0^{2\pi}\!\int_0^1u\cdot\sqrt2\,u\,du\,dv=\sqrt2\cdot\tfrac13\cdot2\pi=\tfrac{2\sqrt2\,\pi}{3}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Evaluate $\iint_S y\,dS$, where $S$ is the surface $z=2x+y^2$ over the square $0\le x\le1$, $0\le y\le1$.`,
      choices: [
        { tex: String.raw`$\dfrac{27-5\sqrt5}{12}$`, correct: true },
        { tex: String.raw`$\dfrac12$`, mistake: 'no-magnitude', why: 'You integrated y over the square with no stretch factor.' },
        { tex: String.raw`$\dfrac{4\sqrt2-2}{3}$`, mistake: 'setup', why: 'You dropped the 1 under the square root: √(4 + 4y²) instead of √(1 + 4 + 4y²).' },
        { tex: String.raw`$\dfrac{27-5\sqrt5}{8}$`, mistake: 'arith', why: 'You forgot the 2/3 from integrating t^{1/2}.' },
        { tex: String.raw`$\dfrac{27-5\sqrt5}{6}$`, mistake: 'ranges', why: 'x runs from 0 to 1, so the x integral contributes 1, not 2.' },
      ],
      steps: [
        String.raw`$g=2x+y^2$, so $dS=\sqrt{1+g_x^2+g_y^2}\,dA=\sqrt{5+4y^2}\,dA$.`,
        String.raw`$\int_0^1\!\int_0^1y\sqrt{5+4y^2}\,dy\,dx$. Let $t=5+4y^2$, $dt=8y\,dy$, $t$ from 5 to 9.`,
        String.raw`$\tfrac18\cdot\tfrac23\left(9^{3/2}-5^{3/2}\right)=\tfrac{1}{12}\left(27-5\sqrt5\right)$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`Evaluate $\iint_S z\,dS$, where $S$ is the upper hemisphere $x^2+y^2+z^2=4$, $z\ge0$.`,
      choices: [
        { tex: String.raw`$8\pi$`, correct: true },
        { tex: String.raw`$2\pi$`, mistake: 'sphere-element', why: 'You used sin φ for dS instead of 4 sin φ.' },
        { tex: String.raw`$0$`, mistake: 'ranges', why: 'Over the whole sphere z cancels. The hemisphere stops at φ = π/2, where z ≥ 0 everywhere.' },
        { tex: String.raw`$16\pi$`, mistake: 'not-substituted', why: 'You set z = 2 everywhere. z = 2 cos φ varies over the hemisphere.' },
        { tex: String.raw`$4\pi$`, mistake: 'arith', why: 'The integral of sin φ cos φ from 0 to π/2 is 1/2, not 1/4.' },
      ],
      steps: [
        String.raw`$z=2\cos\phi$ and $dS=4\sin\phi\,d\phi\,d\theta$, with $0\le\phi\le\pi/2$.`,
        String.raw`$\int_0^{2\pi}\!\int_0^{\pi/2}8\sin\phi\cos\phi\,d\phi\,d\theta=8\cdot\tfrac12\cdot2\pi=8\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Using $\vec r(u,v)=\langle u\cos v,u\sin v,u\rangle$, which integral equals $\iint_S z^2\,dS$ for the part of the cone $z=\sqrt{x^2+y^2}$ with $1\le z\le3$?`,
      choices: [
        { tex: String.raw`$\displaystyle\int_0^{2\pi}\!\!\int_1^3\sqrt2\,u^3\,du\,dv$`, correct: true },
        { tex: String.raw`$\displaystyle\int_0^{2\pi}\!\!\int_1^3u^2\,du\,dv$`, mistake: 'no-magnitude', why: 'There is no stretch factor in this integral.' },
        { tex: String.raw`$\displaystyle\int_0^{2\pi}\!\!\int_0^3\sqrt2\,u^3\,du\,dv$`, mistake: 'ranges', why: 'z = u starts at 1, so u starts at 1.' },
        { tex: String.raw`$\displaystyle\int_0^{2\pi}\!\!\int_1^3\sqrt2\,u^2\,du\,dv$`, mistake: 'setup', why: 'The magnitude is √2 u, not √2. You lost a factor of u.' },
        { tex: String.raw`$\displaystyle\int_0^{2\pi}\!\!\int_1^3u^3\,du\,dv$`, mistake: 'flux-confusion', why: 'You used the z-component u of r_u × r_v, as if dotting with k, instead of its length √2 u.' },
      ],
      steps: [
        String.raw`$z=u$, so $1\le u\le3$, and $0\le v\le2\pi$.`,
        String.raw`$|\vec r_u\times\vec r_v|=|\langle-u\cos v,-u\sin v,u\rangle|=\sqrt2\,u$.`,
        String.raw`Integrand: $z^2\cdot\sqrt2\,u=\sqrt2\,u^3$. Its value is $\sqrt2\cdot2\pi\cdot\tfrac{81-1}{4}=40\sqrt2\,\pi$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'paramSurface', x: '2*sin(u)*cos(v)', y: '2*sin(u)*sin(v)', z: '2*cos(u)', u: [0, 'pi/3'], v: [0, '2*pi'] },
    { kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: 'u', u: [0, 1], v: [0, '2*pi'] },
  ],
};
