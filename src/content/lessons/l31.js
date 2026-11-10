export default {
  id: 31,
  title: 'Parametrized surfaces and surface area',
  section: '17.6',
  exam: 2,
  blurb: 'Describe a surface with two parameters, then measure its area with |r_u × r_v|.',
  boiler: ['Parametric Surfaces', 'Surface Area Integration', 'Surface ID'],

  sections: [
    {
      id: 'idea',
      title: 'A surface needs two parameters',
      body: String.raw`A curve is a 1D object, so one parameter does the job: $\vec r(t)$, $a\le t\le b$. A surface is 2D, so it takes two:

$$\vec r(u,v)=\langle x(u,v),\,y(u,v),\,z(u,v)\rangle,\qquad (u,v)\text{ in a region } R.$$

Each point $(u,v)$ of the flat region $R$ lands on one point of the surface $S$. A good way to see the surface: freeze one parameter and let the other run. Every frozen $v$ gives a curve, and the surface is the stack of those curves.

**Example from lecture.** $\vec r(u,v)=\langle \cos u,\sin u,2v\rangle$, $0\le u\le \tfrac{3\pi}{2}$, $0\le v\le 1$. Freeze $v$: you get $\langle\cos u,\sin u, 2v\rangle$, three quarters of a unit circle at height $2v$. As $v$ runs from 0 to 1 the height runs from 0 to 2. Stack them and you get $\tfrac34$ of a cylinder of radius 1 and height 2.`,
    },
    {
      id: 'catalog',
      title: 'The parametrizations you will use',
      body: String.raw`Almost every exam surface is one of these. Learn them cold.

- **Graph** $z=f(x,y)$: $\vec r(u,v)=\langle u,\,v,\,f(u,v)\rangle$. So $u$ is $x$ and $v$ is $y$.
- **Plane** $ax+by+cz=d$: solve for $z$, then treat it as a graph. $4x+3y+z=12$ becomes $\langle u,\,v,\,12-4u-3v\rangle$.
- **Sphere** of radius $a$: spherical coordinates with $\rho=a$ fixed, $\vec r(\phi,\theta)=\langle a\sin\phi\cos\theta,\ a\sin\phi\sin\theta,\ a\cos\phi\rangle$, $0\le\phi\le\pi$, $0\le\theta\le 2\pi$.
- **Cylinder** $x^2+y^2=a^2$: $\langle a\cos v,\ a\sin v,\ u\rangle$, where $u$ is the height. A cylinder around the $x$-axis, $y^2+z^2=a^2$, is $\langle u,\ a\cos v,\ a\sin v\rangle$.
- **Cone** $z=\sqrt{x^2+y^2}$: $\langle u\cos v,\ u\sin v,\ u\rangle$. Here $u$ is both the height and the radius of the circle at that height. The cone $z=k\sqrt{x^2+y^2}$ is $\langle u\cos v,\ u\sin v,\ ku\rangle$.

**Reading one backwards.** To identify $\langle u\cos v,\,u\sin v,\,3u\rangle$, eliminate the parameters: $x^2+y^2=u^2$ and $u=z/3$, so $x^2+y^2=z^2/9$. That is a cone. If the third slot were $u^2$ instead, you would get $z=x^2+y^2$, a paraboloid.`,
    },
    {
      id: 'ranges',
      title: 'Getting the parameter ranges right',
      body: String.raw`The formula for $\vec r$ only names the *kind* of surface. The ranges for $u$ and $v$ decide *which piece*. Translate every restriction in the problem into a statement about $u$ and $v$.

- Paraboloid $z=x^2+y^2$ with $1\le z\le 9$: substitute $z=u^2+v^2$, so $1\le u^2+v^2\le 9$, a ring in the $uv$-plane.
- Plane $4x+3y+z=12$ in the first octant: $x\ge0,\ y\ge0,\ z\ge0$ become $u\ge0,\ v\ge0,\ 4u+3v\le12$, a triangle with corners $(0,0),(3,0),(0,4)$.
- Sphere of radius 2 above $z=1$: $z=2\cos\phi\ge 1$ means $\cos\phi\ge\tfrac12$, so $0\le\phi\le\tfrac{\pi}{3}$, and $\theta$ still goes all the way around.
- Cone $z=\sqrt{x^2+y^2}$ for $0\le z\le 2$: $z=u$, so $0\le u\le 2$ and $0\le v\le 2\pi$.

Check: does the angle go all the way around? Does the height stop where the problem says? Most wrong answers on this topic are a range that covers too much or too little.`,
    },
    {
      id: 'why-cross',
      title: 'Why |r_u × r_v| measures area',
      body: String.raw`Take a tiny rectangle in $R$ with sides $du$ and $dv$. On the surface it becomes a tiny, nearly flat parallelogram.

- $\vec r_u=\langle x_u,y_u,z_u\rangle$ is the velocity along the curve where $v$ is frozen. Moving $du$ covers $\vec r_u\,du$.
- $\vec r_v$ is the velocity along the curve where $u$ is frozen. Moving $dv$ covers $\vec r_v\,dv$.

The parallelogram spanned by $\vec r_u\,du$ and $\vec r_v\,dv$ has area $|\vec r_u\times\vec r_v|\,du\,dv$. So

$$dS=|\vec r_u\times\vec r_v|\,dA,\qquad \text{Area}(S)=\iint_R|\vec r_u\times\vec r_v|\,dA.$$

This is the surface version of $ds=|\vec r^{\,\prime}(t)|\,dt$ for arc length. The magnitude is a stretch factor: how much area on $S$ one unit of area in $R$ turns into.

**Recipe.**
1. Parametrize $S$ and write the $u,v$ ranges.
2. Compute $\vec r_u$ and $\vec r_v$.
3. Cross them, then take the magnitude. Simplify with $\cos^2+\sin^2=1$.
4. Integrate the magnitude over $R$. Use polar on $R$ if it is a disk.

Bonus: $\vec r_u\times\vec r_v$ is perpendicular to both tangent vectors, so it is a **normal vector** to the surface. Lesson 33 uses that.`,
    },
    {
      id: 'graph',
      title: 'The shortcut for graphs and planes',
      body: String.raw`For $\vec r=\langle u,v,f(u,v)\rangle$: $\vec r_u=\langle1,0,f_u\rangle$ and $\vec r_v=\langle0,1,f_v\rangle$, so

$$\vec r_u\times\vec r_v=\langle -f_x,\,-f_y,\,1\rangle,\qquad |\vec r_u\times\vec r_v|=\sqrt{1+f_x^2+f_y^2}.$$

Do not drop the 1. It is what makes a flat floor ($f_x=f_y=0$) have stretch factor 1.

**Planes are the easy case.** The stretch factor is a constant, so area = (constant) $\times$ (area of the shadow). For $4x+3y+z=12$ in the first octant, $\vec r_u\times\vec r_v=\langle4,3,1\rangle$, magnitude $\sqrt{26}$, and the shadow is a triangle of area $\tfrac12(3)(4)=6$. Area $=6\sqrt{26}$.

**A curved graph.** The part of $z=2-x^2-y^2$ above $z=1$: the stretch factor is $\sqrt{1+4x^2+4y^2}$ and the shadow is $x^2+y^2\le1$. In polar,
$$\int_0^{2\pi}\!\!\int_0^1\sqrt{1+4r^2}\;r\,dr\,d\theta=\frac{\pi}{6}\left(5\sqrt5-1\right).$$`,
    },
    {
      id: 'examples',
      title: 'Worked examples: cone, cylinder, sphere',
      body: String.raw`**Cone** $z=\sqrt{x^2+y^2}$, $0\le z\le 2$. Use $\vec r=\langle u\cos v,u\sin v,u\rangle$, $0\le u\le2$, $0\le v\le2\pi$.
$$\vec r_u=\langle\cos v,\sin v,1\rangle,\quad \vec r_v=\langle -u\sin v,u\cos v,0\rangle,\quad \vec r_u\times\vec r_v=\langle -u\cos v,-u\sin v,u\rangle.$$
The magnitude is $\sqrt{u^2+u^2}=\sqrt2\,u$. Area $=\int_0^{2\pi}\!\int_0^2\sqrt2\,u\,du\,dv=4\sqrt2\,\pi$.

The lecture cone $\langle u\cos v,u\sin v,3u\rangle$, $0\le u\le4$, has $|\vec r_u\times\vec r_v|=\sqrt{10}\,u$ and area $16\sqrt{10}\,\pi$.

**Cylinder** $\langle R\cos u,R\sin u,v\rangle$, $0\le u\le2\pi$, $0\le v\le H$: $\vec r_u\times\vec r_v=\langle R\cos u,R\sin u,0\rangle$, magnitude $R$, area $2\pi RH$. That matches the label on a soup can. The $\tfrac34$ cylinder $\langle\cos u,\sin u,2v\rangle$ has magnitude 2 and area $2\cdot\tfrac{3\pi}{2}\cdot1=3\pi$.

**Sphere** of radius $a$: $|\vec r_\phi\times\vec r_\theta|=a^2\sin\phi$. The cap of the radius-2 sphere above $z=1$ has area $\int_0^{2\pi}\!\int_0^{\pi/3}4\sin\phi\,d\phi\,d\theta=4\pi$.`,
    },
  ],

  formulas: [
    { label: 'Area element', tex: String.raw`dS=|\vec r_u\times\vec r_v|\,dA,\qquad \text{Area}=\iint_R|\vec r_u\times\vec r_v|\,dA` },
    { label: 'Graph z = f(x, y)', tex: String.raw`\vec r_u\times\vec r_v=\langle -f_x,-f_y,1\rangle,\quad dS=\sqrt{1+f_x^2+f_y^2}\,dA` },
    { label: 'Sphere of radius a', tex: String.raw`|\vec r_\phi\times\vec r_\theta|=a^2\sin\phi` },
    { label: 'Cylinder of radius a', tex: String.raw`\langle a\cos v,a\sin v,u\rangle:\ |\vec r_u\times\vec r_v|=a` },
    { label: 'Cone z = sqrt(x^2+y^2)', tex: String.raw`\langle u\cos v,u\sin v,u\rangle:\ |\vec r_u\times\vec r_v|=\sqrt2\,u` },
  ],

  mistakes: [
    {
      id: 'ranges',
      title: 'Ranges that cover the wrong piece',
      wrong: String.raw`Cone $0\le z\le2$ with $0\le u\le2,\ 0\le v\le\pi$`,
      right: String.raw`$0\le u\le2,\ 0\le v\le2\pi$: the angle must go all the way around`,
      why: 'The parametrization only says what kind of surface it is. The ranges decide how much of it you integrate over.',
    },
    {
      id: 'no-magnitude',
      title: 'Forgetting the stretch factor |r_u × r_v|',
      wrong: String.raw`$\text{Area}=\iint_R 1\,dA$ (the area of the shadow or of the $uv$-region)`,
      right: String.raw`$\text{Area}=\iint_R|\vec r_u\times\vec r_v|\,dA$`,
      why: 'A tilted or curved surface has more area than its shadow. The magnitude of the cross product is exactly how much more.',
    },
    {
      id: 'graph-formula',
      title: 'Dropping the 1 under the square root',
      wrong: String.raw`$dS=\sqrt{f_x^2+f_y^2}\,dA$`,
      right: String.raw`$dS=\sqrt{1+f_x^2+f_y^2}\,dA$`,
      why: 'The 1 is the z-component of ⟨-f_x, -f_y, 1⟩. Without it a flat floor would have zero area.',
    },
    {
      id: 'sphere-element',
      title: 'Wrong stretch factor on a sphere',
      wrong: String.raw`$dS=\sin\phi\,d\phi\,d\theta$ on a sphere of radius 2`,
      right: String.raw`$dS=a^2\sin\phi\,d\phi\,d\theta=4\sin\phi\,d\phi\,d\theta$`,
      why: 'The factor is a squared radius times sin φ. Only the unit sphere has plain sin φ.',
    },
    {
      id: 'identify',
      title: 'Misreading which surface a formula draws',
      wrong: String.raw`$\langle u\cos v,u\sin v,u^2\rangle$ is a cone`,
      right: String.raw`$x^2+y^2=u^2=z$, so it is the paraboloid $z=x^2+y^2$`,
      why: 'Eliminate the parameters before you decide. A cone has z proportional to the radius u; a paraboloid has z proportional to u squared.',
    },
  ],

  hook: 'dS is a parallelogram: two tangent vectors, one cross product, one magnitude.',

  scene: {
    view: { range: 2.5, z: [-0.5, 3] },
    camera: [5, -5, 4],
    layers: [
      { id: 'cone', kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: 'u', u: [0, 2], v: [0, '2*pi'], colormap: 'water', opacity: 0.7 },
      { id: 'vline', kind: 'curve', x: 't*cos(pi/4)', y: 't*sin(pi/4)', z: 't', t: [0, 2], color: 'road', arrow: true },
      { id: 'ucirc', kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: '1', t: [0, '2*pi'], color: 'wood', arrow: true },
      { id: 'P', kind: 'point', at: [0.7071, 0.7071, 1], label: 'r(1, pi/4)' },
      { id: 'ru', kind: 'vector', from: [0.7071, 0.7071, 1], to: [1.4142, 1.4142, 2], color: 'road', label: 'r_u' },
      { id: 'rv', kind: 'vector', from: [0.7071, 0.7071, 1], to: [0, 1.4142, 1], color: 'wood', label: 'r_v' },
      { id: 'n', kind: 'vector', from: [0.7071, 0.7071, 1], to: [0, 0, 2], color: 'revision', label: 'r_u x r_v' },
      { id: 'dome', kind: 'surface', z: '2 - x^2 - y^2', domain: { r: [0, 1], theta: [0, '2*pi'] }, colormap: 'terrain' },
      { id: 'shadow', kind: 'region2d', polar: { r: [0, 1], theta: [0, '2*pi'] }, color: 'water' },
      { id: 'cyl34', kind: 'paramSurface', x: 'cos(u)', y: 'sin(u)', z: '2*v', u: [0, '3*pi/2'], v: [0, 1], colormap: 'viridis', opacity: 0.85 },
    ],
    steps: [
      { label: 'Start', show: ['cone'], caption: String.raw`The cone $\vec r(u,v)=\langle u\cos v,u\sin v,u\rangle$, $0\le u\le2$, $0\le v\le2\pi$. Every pair $(u,v)$ lands on one point.` },
      { label: 'Grid curves', show: ['cone', 'vline', 'ucirc'], caption: String.raw`Freeze $v=\pi/4$ and let $u$ run: a straight line up the side (red). Freeze $u=1$ and let $v$ run: the circle at height 1 (green). The surface is woven from these two families.` },
      { label: 'Tangent vectors', show: ['cone', 'vline', 'ucirc', 'P', 'ru', 'rv'], caption: String.raw`$\vec r_u=\langle\cos v,\sin v,1\rangle$ points along the red line and $\vec r_v=\langle -u\sin v,u\cos v,0\rangle$ points along the green circle. A $du$ by $dv$ box becomes the parallelogram they span.` },
      { label: 'Normal', show: ['cone', 'P', 'ru', 'rv', 'n'], caption: String.raw`$\vec r_u\times\vec r_v=\langle -u\cos v,-u\sin v,u\rangle$ is perpendicular to the surface. Its length $\sqrt2\,u$ is the area of that parallelogram per unit $du\,dv$, so the cone's area is $\int_0^{2\pi}\!\int_0^2\sqrt2\,u\,du\,dv=4\sqrt2\,\pi$.` },
      { label: 'Graph', show: ['dome', 'shadow'], caption: String.raw`For a graph $z=f(x,y)$ the stretch factor is $\sqrt{1+f_x^2+f_y^2}$ and you integrate over the shadow. Here $z=2-x^2-y^2$ above $z=1$ sits over the unit disk.` },
      { label: 'Ranges', show: ['cyl34'], caption: String.raw`$\langle\cos u,\sin u,2v\rangle$ with $0\le u\le\tfrac{3\pi}{2}$ stops three quarters of the way around. Change the range and you change the surface: area $3\pi$ here, $4\pi$ for the full cylinder.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Find the area of the part of the plane $z=2x+3y$ that lies over the square $0\le x\le1$, $0\le y\le1$.`,
      choices: [
        { tex: String.raw`$\sqrt{14}$`, correct: true },
        { tex: String.raw`$1$`, mistake: 'no-magnitude', why: 'That is the area of the square underneath, not of the tilted plane.' },
        { tex: String.raw`$\sqrt{13}$`, mistake: 'graph-formula', why: 'You used the square root of f_x^2 + f_y^2 and dropped the 1.' },
        { tex: String.raw`$\sqrt6$`, mistake: 'arith', why: 'You added the components 2 + 3 + 1 instead of their squares.' },
        { tex: String.raw`$14$`, mistake: 'arith', why: 'You forgot the square root in the magnitude.' },
      ],
      steps: [
        String.raw`Graph surface: $\vec r=\langle u,v,2u+3v\rangle$ with $0\le u\le1$, $0\le v\le1$.`,
        String.raw`$\vec r_u\times\vec r_v=\langle -f_x,-f_y,1\rangle=\langle -2,-3,1\rangle$, magnitude $\sqrt{4+9+1}=\sqrt{14}$.`,
        String.raw`The stretch factor is constant, so area $=\sqrt{14}\times(\text{area of the square})=\sqrt{14}$.`,
      ],
      source: 'Study plan bank #36',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Using $\vec r(u,v)=\langle u\cos v,u\sin v,u\rangle$, find the surface area of the cone $z=\sqrt{x^2+y^2}$ for $0\le z\le 2$.`,
      choices: [
        { tex: String.raw`$4\sqrt2\,\pi$`, correct: true },
        { tex: String.raw`$4\pi$`, mistake: 'no-magnitude', why: 'You integrated 1 over the uv-rectangle and left out |r_u × r_v| = √2 u.' },
        { tex: String.raw`$2\sqrt2\,\pi$`, mistake: 'ranges', why: 'Letting v run only to π covers half the cone.' },
        { tex: String.raw`$8\sqrt2\,\pi$`, mistake: 'arith', why: 'The integral of u from 0 to 2 is 2, not 4.' },
        { tex: String.raw`$4\sqrt2$`, mistake: 'setup', why: 'You forgot the outer v integral, which contributes the factor 2π.' },
      ],
      steps: [
        String.raw`Ranges: $z=u$, so $0\le u\le2$, and the angle goes around: $0\le v\le2\pi$.`,
        String.raw`$\vec r_u=\langle\cos v,\sin v,1\rangle$, $\vec r_v=\langle -u\sin v,u\cos v,0\rangle$.`,
        String.raw`$\vec r_u\times\vec r_v=\langle -u\cos v,-u\sin v,u\rangle$, magnitude $\sqrt{u^2+u^2}=\sqrt2\,u$.`,
        String.raw`$\int_0^{2\pi}\!\int_0^2\sqrt2\,u\,du\,dv=\sqrt2\cdot2\cdot2\pi=4\sqrt2\,\pi$.`,
      ],
      source: 'Study plan bank #35',
    },
    {
      id: 'p3',
      difficulty: 1,
      prompt: String.raw`Which surface does $\vec r(u,v)=\langle u\cos v,\,u\sin v,\,u^2\rangle$, $0\le u\le2$, $0\le v\le2\pi$ describe?`,
      choices: [
        { tex: String.raw`The part of the paraboloid $z=x^2+y^2$ with $0\le z\le4$`, correct: true },
        { tex: String.raw`The part of the cone $z=\sqrt{x^2+y^2}$ with $0\le z\le2$`, mistake: 'identify', why: 'A cone would have u in the third slot, not u squared.' },
        { tex: String.raw`The part of the paraboloid $z=x^2+y^2$ with $0\le z\le2$`, mistake: 'ranges', why: 'The height is z = u^2, so u = 2 gives z = 4, not 2.' },
        { tex: String.raw`The cylinder $x^2+y^2=4$ for $0\le z\le4$`, mistake: 'identify', why: 'On a cylinder the radius is fixed; here the radius u changes with height.' },
        { tex: String.raw`The half of $z=x^2+y^2$ with $y\ge0$, $0\le z\le4$`, mistake: 'ranges', why: 'v runs from 0 to 2π, the full way around, so no half is cut off.' },
      ],
      steps: [
        String.raw`Eliminate the parameters: $x^2+y^2=u^2(\cos^2v+\sin^2v)=u^2$.`,
        String.raw`The third component says $z=u^2$, so $z=x^2+y^2$: a paraboloid.`,
        String.raw`$0\le u\le2$ gives $0\le z\le4$, and $0\le v\le2\pi$ goes all the way around.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Find the area of the surface $\vec r(u,v)=\langle 3\cos u,\,3\sin u,\,v\rangle$, $0\le u\le\pi$, $0\le v\le4$.`,
      choices: [
        { tex: String.raw`$12\pi$`, correct: true },
        { tex: String.raw`$4\pi$`, mistake: 'no-magnitude', why: 'That is the area of the uv-rectangle. The stretch factor here is 3.' },
        { tex: String.raw`$24\pi$`, mistake: 'ranges', why: 'u stops at π, so this is half of the cylinder, not all of it.' },
        { tex: String.raw`$36\pi$`, mistake: 'arith', why: 'You used |r_u × r_v|^2 = 9 instead of |r_u × r_v| = 3.' },
        { tex: String.raw`$12$`, mistake: 'arith', why: 'The u integral from 0 to π contributes a factor π.' },
      ],
      steps: [
        String.raw`This is half of the cylinder $x^2+y^2=9$ (the part with $y\ge0$), height 4.`,
        String.raw`$\vec r_u=\langle -3\sin u,3\cos u,0\rangle$, $\vec r_v=\langle0,0,1\rangle$.`,
        String.raw`$\vec r_u\times\vec r_v=\langle 3\cos u,3\sin u,0\rangle$, magnitude 3.`,
        String.raw`$\int_0^4\!\int_0^\pi 3\,du\,dv=3\cdot\pi\cdot4=12\pi$. Check: half of $2\pi RH=24\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Find the area of the part of the paraboloid $z=x^2+y^2$ that lies below the plane $z=2$.`,
      choices: [
        { tex: String.raw`$\dfrac{13\pi}{3}$`, correct: true },
        { tex: String.raw`$\dfrac{8\sqrt2\,\pi}{3}$`, mistake: 'graph-formula', why: 'You used √(4r²) = 2r and dropped the 1 under the square root.' },
        { tex: String.raw`$\dfrac{\pi}{6}\left(17\sqrt{17}-1\right)$`, mistake: 'ranges', why: 'The shadow edge is x² + y² = 2, so r goes to √2, not 2.' },
        { tex: String.raw`$2\pi$`, mistake: 'no-magnitude', why: 'That is the area of the shadow disk of radius √2.' },
        { tex: String.raw`$\dfrac{26\pi}{3}$`, mistake: 'arith', why: 'With t = 1 + 4r², dt = 8r dr, so the factor is 1/8, giving 1/12 after the 2/3.' },
      ],
      steps: [
        String.raw`Graph: $f=x^2+y^2$, so $dS=\sqrt{1+4x^2+4y^2}\,dA$.`,
        String.raw`Shadow: $x^2+y^2\le2$, a disk of radius $\sqrt2$. Switch to polar.`,
        String.raw`$\int_0^{2\pi}\!\int_0^{\sqrt2}\sqrt{1+4r^2}\;r\,dr\,d\theta$. Let $t=1+4r^2$, $dt=8r\,dr$, $t$ from 1 to 9.`,
        String.raw`$2\pi\cdot\tfrac18\cdot\tfrac23\left(9^{3/2}-1\right)=2\pi\cdot\tfrac{26}{12}=\tfrac{13\pi}{3}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`Find the area of the part of the sphere $x^2+y^2+z^2=4$ that lies above the plane $z=1$.`,
      choices: [
        { tex: String.raw`$4\pi$`, correct: true },
        { tex: String.raw`$8\pi$`, mistake: 'ranges', why: 'φ to π/2 is the whole upper hemisphere. The plane z = 1 stops it at φ = π/3.' },
        { tex: String.raw`$12\pi$`, mistake: 'ranges', why: 'φ from π/3 to π is the part below z = 1.' },
        { tex: String.raw`$\pi$`, mistake: 'sphere-element', why: 'You used sin φ, the unit-sphere factor, instead of 4 sin φ.' },
        { tex: String.raw`$2\pi$`, mistake: 'sphere-element', why: 'The factor is a² sin φ with a = 2, not a sin φ.' },
      ],
      steps: [
        String.raw`$\vec r(\phi,\theta)=\langle2\sin\phi\cos\theta,2\sin\phi\sin\theta,2\cos\phi\rangle$, $|\vec r_\phi\times\vec r_\theta|=4\sin\phi$.`,
        String.raw`Above $z=1$: $2\cos\phi\ge1$, so $0\le\phi\le\pi/3$. And $0\le\theta\le2\pi$.`,
        String.raw`$\int_0^{2\pi}\!\int_0^{\pi/3}4\sin\phi\,d\phi\,d\theta=2\pi\cdot4\left(1-\tfrac12\right)=4\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 2,
      prompt: String.raw`Find the area of the part of the plane $x+2y+z=4$ in the first octant.`,
      choices: [
        { tex: String.raw`$4\sqrt6$`, correct: true },
        { tex: String.raw`$4$`, mistake: 'no-magnitude', why: 'That is only the area of the triangular shadow.' },
        { tex: String.raw`$8\sqrt6$`, mistake: 'arith', why: 'The shadow triangle has legs 4 and 2, so its area is 4, not 8.' },
        { tex: String.raw`$4\sqrt5$`, mistake: 'graph-formula', why: 'You dropped the 1: √(1 + 4) instead of √(1 + 1 + 4).' },
        { tex: String.raw`$2\sqrt6$`, mistake: 'ranges', why: 'The shadow meets the y-axis at y = 2 (set x = 0, z = 0), not y = 1.' },
      ],
      steps: [
        String.raw`$z=4-x-2y$, so $\vec r=\langle u,v,4-u-2v\rangle$ and $\vec r_u\times\vec r_v=\langle1,2,1\rangle$, magnitude $\sqrt6$.`,
        String.raw`Shadow: $u\ge0$, $v\ge0$, $u+2v\le4$. A triangle with corners $(0,0),(4,0),(0,2)$, area 4.`,
        String.raw`Area $=\sqrt6\cdot4=4\sqrt6$.`,
      ],
      source: 'original',
    },
    {
      id: 'p8',
      difficulty: 3,
      prompt: String.raw`Find the area of the part of the plane $z=1+2x+2y$ that lies inside the cylinder $x^2+y^2=4$.`,
      choices: [
        { tex: String.raw`$12\pi$`, correct: true },
        { tex: String.raw`$4\pi$`, mistake: 'no-magnitude', why: 'That is the area of the disk under the plane.' },
        { tex: String.raw`$48\pi$`, mistake: 'ranges', why: 'The cylinder has radius 2, not 4.' },
        { tex: String.raw`$8\sqrt2\,\pi$`, mistake: 'graph-formula', why: 'You used √(4 + 4) and dropped the 1.' },
        { tex: String.raw`$6\pi$`, mistake: 'arith', why: 'The disk of radius 2 has area 4π, not 2π.' },
      ],
      steps: [
        String.raw`Graph surface with $f_x=2$, $f_y=2$: stretch factor $\sqrt{1+4+4}=3$.`,
        String.raw`The cylinder cuts out the shadow $x^2+y^2\le4$, a disk of area $4\pi$.`,
        String.raw`Area $=3\cdot4\pi=12\pi$. The cylinder only sets the shadow; you never integrate over the cylinder itself.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: 'u', u: [0, 2], v: [0, '2*pi'] },
    { kind: 'paramSurface', x: 'cos(u)', y: 'sin(u)', z: '2*v', u: [0, '3*pi/2'], v: [0, 1] },
    { kind: 'surface', expr: '2 - x^2 - y^2' },
  ],
};
