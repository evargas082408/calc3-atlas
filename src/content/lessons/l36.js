export default {
  id: 36,
  title: 'The divergence theorem',
  section: '17.8',
  exam: 3,
  blurb: 'Turn the outward flux through a closed surface into a triple integral of div F.',
  boiler: ['Divergence Theorem', 'Flux Integrals'],

  sections: [
    {
      id: 'idea',
      title: 'The idea: count the sources inside',
      body: String.raw`$\operatorname{div}\vec F=P_x+Q_y+R_z$ measures how much $\vec F$ spreads out from a point, per unit volume. Positive divergence is a source (fluid being pumped in), negative is a sink.

If you add up all the sources inside a solid $D$, everything they produce has to leave through the boundary. That is the **divergence theorem**:

$$\iint_S\vec F\cdot d\vec S=\iiint_D\operatorname{div}\vec F\,dV,$$

where $S$ is the **closed** surface that encloses $D$, oriented with the **outward** normal.

Same theme as Green and Stokes: the integral of a derivative ($\operatorname{div}$) over a region equals something computed on the boundary. Here the region is a solid and the boundary is its skin.`,
    },
    {
      id: 'when',
      title: 'When you may use it',
      body: String.raw`Check two things every time.

1. **Is $S$ closed?** It must enclose a solid with no holes in the skin. Closed: a sphere, the six faces of a box, a cylinder *with* its top and bottom disks, a hemisphere *together with* its flat base. Not closed: a hemisphere alone, the side of a cylinder alone, a paraboloid with no lid.
2. **Is the normal outward?** The theorem gives the outward flux. If the problem asks for the inward flux, take the negative.

If $S$ is not closed, you can still use the theorem by adding a lid and subtracting the lid's flux. That is Lesson 37.

**Why bother?** A closed surface usually has several pieces (a closed cylinder has three), each needing its own parametrization and normal. The triple integral is one computation, and the divergence is often simple, even constant.`,
    },
    {
      id: 'example-hemisphere',
      title: 'Worked example: hemisphere with its base',
      body: String.raw`$\vec F=\langle x,y,z\rangle$, $S$ = the upper hemisphere of radius 2 together with the disk $z=0$, outward.

**Divergence theorem.** $\operatorname{div}\vec F=1+1+1=3$. So the flux is $3\times\text{Vol}(D)=3\cdot\tfrac12\cdot\tfrac43\pi(2)^3=16\pi$.

If you do not remember the volume, use spherical coordinates: $0\le\rho\le2$, $0\le\phi\le\pi/2$, $0\le\theta\le2\pi$, and
$$\iiint_D1\,dV=\int_0^{2\pi}\!\!\int_0^{\pi/2}\!\!\int_0^2\rho^2\sin\phi\,d\rho\,d\phi\,d\theta=\frac83\cdot1\cdot2\pi=\frac{16\pi}{3}.$$

**Direct check.** The dome, as a graph $z=\sqrt{4-u^2-v^2}$ with upward normal, gives $\iint_R\frac{4}{\sqrt{4-r^2}}\,dA=16\pi$. The base has outward normal $\langle0,0,-1\rangle$, and $\vec F\cdot\vec n=-z=0$ there, so it adds 0. Total $16\pi$. Two surfaces and a tricky integral, versus one line.`,
    },
    {
      id: 'example-cylinder',
      title: 'Worked example: a closed cylinder',
      body: String.raw`$\vec F=\left\langle\tfrac{xy^2}{2},\ \tfrac{y^3}{6},\ zx^2\right\rangle$, $S$ = the cylinder $x^2+y^2=1$ with caps at $z=\pm1$, outward.

Directly, this is three flux integrals: the side and two disks. Instead:
$$\operatorname{div}\vec F=\frac{y^2}{2}+\frac{y^2}{2}+x^2=x^2+y^2.$$
The solid is a cylinder, so use cylindrical coordinates: $x^2+y^2=r^2$, $dV=r\,dz\,dr\,d\theta$, with $-1\le z\le1$, $0\le r\le1$, $0\le\theta\le2\pi$:
$$\int_0^{2\pi}\!\!\int_0^1\!\!\int_{-1}^1r^2\cdot r\,dz\,dr\,d\theta=\int_0^{2\pi}\!\!\int_0^12r^3\,dr\,d\theta=2\pi\cdot\frac12=\pi.$$

**Pick coordinates for the solid**, not for the field: a box uses $dx\,dy\,dz$, a cylinder or paraboloid uses $r\,dz\,dr\,d\theta$, a ball or cone-in-a-sphere uses $\rho^2\sin\phi\,d\rho\,d\phi\,d\theta$. If $\operatorname{div}\vec F$ is a constant $c$, the answer is $c\times$ volume.`,
    },
    {
      id: 'div-curl',
      title: 'Divergence of a curl is zero',
      body: String.raw`For any $\vec G=\langle f,g,h\rangle$, $\operatorname{curl}\vec G=\langle h_y-g_z,\ f_z-h_x,\ g_x-f_y\rangle$, and
$$\operatorname{div}(\operatorname{curl}\vec G)=h_{yx}-g_{zx}+f_{zy}-h_{xy}+g_{xz}-f_{yz}=0$$
by Clairaut's theorem (mixed partials match).

So for any **closed** surface, $\iint_S\operatorname{curl}\vec G\cdot d\vec S=\iiint_D0\,dV=0$. Lesson 35 got the same result from Stokes: a closed surface has no boundary curve.

**Surface integral decision tree** (final review). For $\iint_S\vec F\cdot\vec n\,dS$:
1. $\vec F=\operatorname{curl}\vec G$? Stokes (and if $S$ is closed, the answer is 0).
2. $S$ closed? Divergence theorem.
3. Otherwise parametrize, or close $S$ with a lid (Lesson 37).`,
    },
  ],

  formulas: [
    { label: 'Divergence theorem', tex: String.raw`\iint_S\vec F\cdot d\vec S=\iiint_D\operatorname{div}\vec F\,dV\quad(S=\partial D\text{ closed, outward})` },
    { label: 'Divergence', tex: String.raw`\operatorname{div}\langle P,Q,R\rangle=P_x+Q_y+R_z` },
    { label: 'Volume elements', tex: String.raw`dV=r\,dz\,dr\,d\theta\ \text{(cylindrical)},\qquad dV=\rho^2\sin\phi\,d\rho\,d\phi\,d\theta\ \text{(spherical)}` },
    { label: 'Div of curl', tex: String.raw`\nabla\cdot(\nabla\times\vec G)=0` },
  ],

  mistakes: [
    {
      id: 'not-closed',
      title: 'Using it on a surface that is not closed',
      wrong: String.raw`Flux through the side of $x^2+y^2=4$, $0\le z\le3$ (no caps) $=\iiint_D\operatorname{div}\vec F\,dV$`,
      right: String.raw`That triple integral is the flux through side + top + bottom. Subtract the caps, or parametrize the side`,
      why: 'The theorem needs a skin with no holes. The triple integral counts flux through every piece of the boundary.',
    },
    {
      id: 'div-error',
      title: 'Computing the divergence wrong',
      wrong: String.raw`$\operatorname{div}\langle3x,-y,z\rangle=3+1+1$`,
      right: String.raw`$3-1+1=3$`,
      why: 'div F = P_x + Q_y + R_z: each component differentiated in its own variable, signs kept.',
    },
    {
      id: 'volume-coords',
      title: 'Dropping the Jacobian in the triple integral',
      wrong: String.raw`$\int_0^{2\pi}\!\int_0^1\!\int_0^2(3r^2+1)\,dz\,dr\,d\theta$`,
      right: String.raw`$\int_0^{2\pi}\!\int_0^1\!\int_0^2(3r^2+1)\,r\,dz\,dr\,d\theta$`,
      why: 'Cylindrical needs the extra r and spherical needs ρ² sin φ, exactly as in any cylindrical or spherical triple integral.',
    },
    {
      id: 'inward',
      title: 'Sign of the orientation',
      wrong: String.raw`Inward flux $=\iiint_D\operatorname{div}\vec F\,dV$`,
      right: String.raw`Inward flux $=-\iiint_D\operatorname{div}\vec F\,dV$`,
      why: 'The theorem is stated for the outward normal. Reversing the normal reverses the sign.',
    },
    {
      id: 'area-not-volume',
      title: 'Multiplying by surface area instead of volume',
      wrong: String.raw`$\operatorname{div}\vec F=3$ on the radius-2 ball, flux $=3\cdot16\pi$`,
      right: String.raw`flux $=3\cdot\text{Vol}=3\cdot\tfrac{32\pi}{3}=32\pi$`,
      why: 'The divergence is integrated over the solid, so a constant divergence multiplies the volume, not the area of S.',
    },
  ],

  hook: 'Closed and outward? Then flux out = sources in.',

  scene: {
    view: { range: 2.5, z: [-2, 3] },
    camera: [5, -5, 3.5],
    layers: [
      { id: 'side', kind: 'paramSurface', x: 'cos(u)', y: 'sin(u)', z: 'v', u: [0, '2*pi'], v: [-1, 1], colormap: 'water', opacity: 0.45 },
      { id: 'top', kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: '1', u: [0, 1], v: [0, '2*pi'], colormap: 'water', opacity: 0.45 },
      { id: 'bot', kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: '-1', u: [0, 1], v: [0, '2*pi'], colormap: 'water', opacity: 0.45 },
      { id: 'D', kind: 'solid', bottom: '-1', top: '1', region: { polar: { r: [0, 1], theta: [0, '2*pi'] } } },
      { id: 'ns1', kind: 'vector', from: [1, 0, 0], to: [1.7, 0, 0], color: 'wood' },
      { id: 'ns2', kind: 'vector', from: [0, 1, 0.5], to: [0, 1.7, 0.5], color: 'wood' },
      { id: 'ns3', kind: 'vector', from: [-1, 0, -0.5], to: [-1.7, 0, -0.5], color: 'wood' },
      { id: 'ns4', kind: 'vector', from: [0, -1, 0], to: [0, -1.7, 0], color: 'wood' },
      { id: 'nt', kind: 'vector', from: [0, 0, 1], to: [0, 0, 1.7], color: 'wood', label: 'out' },
      { id: 'nb', kind: 'vector', from: [0, 0, -1], to: [0, 0, -1.7], color: 'wood', label: 'out' },
      { id: 'F', kind: 'vectorField', P: 'x*y^2/2', Q: 'y^3/6', R: 'z*x^2', density: 5 },
      { id: 'dome', kind: 'paramSurface', x: '2*sin(u)*cos(v)', y: '2*sin(u)*sin(v)', z: '2*cos(u)', u: [0, 'pi/2'], v: [0, '2*pi'], colormap: 'inferno', opacity: 0.5 },
      { id: 'base', kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: '0', u: [0, 2], v: [0, '2*pi'], colormap: 'textbook', opacity: 0.6 },
      { id: 'nd', kind: 'vector', from: [0, 0, 2], to: [0, 0, 2.8], color: 'wood', label: 'out' },
      { id: 'nd2', kind: 'vector', from: [1.414, 0, 1.414], to: [1.98, 0, 1.98], color: 'wood' },
      { id: 'nbase', kind: 'vector', from: [0.8, 0.8, 0], to: [0.8, 0.8, -0.8], color: 'wood', label: 'out = -k' },
      { id: 'G', kind: 'vectorField', P: 'x', Q: 'y', R: 'z', density: 5 },
    ],
    steps: [
      { label: 'Start', show: ['side', 'top', 'bot'], caption: String.raw`A closed cylinder: the side $x^2+y^2=1$ plus caps at $z=\pm1$. Three pieces, so a direct flux computation means three parametrizations.` },
      { label: 'Solid', show: ['side', 'top', 'bot', 'D'], caption: String.raw`The skin encloses the solid $D$. The divergence theorem trades the three surface integrals for one triple integral over $D$.` },
      { label: 'Outward', show: ['side', 'top', 'bot', 'ns1', 'ns2', 'ns3', 'ns4', 'nt', 'nb'], caption: String.raw`The theorem uses the outward normal on every piece: away from the axis on the side, up on the top, down on the bottom.` },
      { label: 'Sources', show: ['side', 'top', 'bot', 'F'], caption: String.raw`For $\vec F=\langle xy^2/2,\ y^3/6,\ zx^2\rangle$, $\operatorname{div}\vec F=x^2+y^2=r^2\ge0$. Every point inside is a source, so the net flow is out: $\int_0^{2\pi}\!\int_0^1\!\int_{-1}^1r^2\cdot r\,dz\,dr\,d\theta=\pi$.` },
      { label: 'Hemisphere', show: ['dome', 'base', 'nd', 'nd2', 'nbase', 'G'], caption: String.raw`Closing a hemisphere needs its base disk, with outward normal $-\vec k$. For $\vec F=\langle x,y,z\rangle$, $\operatorname{div}\vec F=3$, so the flux is $3\cdot\tfrac{16\pi}{3}=16\pi$. All of it leaves through the dome; the base gets $\vec F\cdot(-\vec k)=-z=0$.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Find the outward flux of $\vec F=\langle3x,\ -y,\ z\rangle$ through the sphere $x^2+y^2+z^2=4$.`,
      choices: [
        { tex: String.raw`$32\pi$`, correct: true },
        { tex: String.raw`$-32\pi$`, mistake: 'inward', why: 'The divergence theorem already gives the outward flux. No sign change.' },
        { tex: String.raw`$\dfrac{160\pi}{3}$`, mistake: 'div-error', why: 'Q_y = -1, so div F = 3 - 1 + 1 = 3, not 5.' },
        { tex: String.raw`$48\pi$`, mistake: 'area-not-volume', why: 'You multiplied 3 by the surface area 16π instead of the volume 32π/3.' },
        { tex: String.raw`$16\pi$`, mistake: 'arith', why: 'The ball of radius 2 has volume (4/3)π(8) = 32π/3.' },
      ],
      steps: [
        String.raw`The sphere is closed, so use the divergence theorem.`,
        String.raw`$\operatorname{div}\vec F=3-1+1=3$, a constant.`,
        String.raw`Flux $=3\cdot\tfrac43\pi(2)^3=3\cdot\tfrac{32\pi}{3}=32\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Find the outward flux of $\vec F=\langle x^2,y^2,z^2\rangle$ through the boundary of the cube $0\le x\le1$, $0\le y\le1$, $0\le z\le1$.`,
      choices: [
        { tex: String.raw`$3$`, correct: true },
        { tex: String.raw`$-3$`, mistake: 'inward', why: 'Outward flux is the triple integral itself, with a plus sign.' },
        { tex: String.raw`$1$`, mistake: 'div-error', why: 'div F = 2x + 2y + 2z, not just 2x.' },
        { tex: String.raw`$6$`, mistake: 'arith', why: 'The integral of 2x over [0, 1] is 1, not 2.' },
        { tex: String.raw`$0$`, mistake: 'concept', why: 'Flux through a closed surface is 0 only when the divergence integrates to 0.' },
      ],
      steps: [
        String.raw`$\operatorname{div}\vec F=2x+2y+2z$.`,
        String.raw`$\iiint_{[0,1]^3}(2x+2y+2z)\,dV$: each term gives $\int_0^12x\,dx=1$.`,
        String.raw`Total $1+1+1=3$. Directly, that would have been six face integrals.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`$S$ is the closed cylinder $x^2+y^2=1$, $0\le z\le2$, including its top and bottom disks, oriented outward. Find $\iint_S\vec F\cdot d\vec S$ for $\vec F=\langle x^3,\ y^3,\ z\rangle$.`,
      choices: [
        { tex: String.raw`$5\pi$`, correct: true },
        { tex: String.raw`$8\pi$`, mistake: 'volume-coords', why: 'You dropped the r in dV = r dz dr dθ.' },
        { tex: String.raw`$3\pi$`, mistake: 'div-error', why: 'The z-component contributes ∂z/∂z = 1. div F = 3x² + 3y² + 1.' },
        { tex: String.raw`$-5\pi$`, mistake: 'inward', why: 'The divergence theorem gives the outward flux directly.' },
        { tex: String.raw`$\dfrac{5\pi}{2}$`, mistake: 'arith', why: 'z runs from 0 to 2, so the z integral contributes 2, not 1.' },
      ],
      steps: [
        String.raw`$\operatorname{div}\vec F=3x^2+3y^2+1=3r^2+1$.`,
        String.raw`Cylindrical: $\int_0^{2\pi}\!\int_0^1\!\int_0^2(3r^2+1)\,r\,dz\,dr\,d\theta$.`,
        String.raw`$=2\pi\cdot2\cdot\left(\tfrac34+\tfrac12\right)=4\pi\cdot\tfrac54=5\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Find the outward flux of $\vec F=\langle x^3,y^3,z^3\rangle$ through the unit sphere $x^2+y^2+z^2=1$.`,
      choices: [
        { tex: String.raw`$\dfrac{12\pi}{5}$`, correct: true },
        { tex: String.raw`$-\dfrac{12\pi}{5}$`, mistake: 'inward', why: 'Outward is the default for the divergence theorem.' },
        { tex: String.raw`$\dfrac{4\pi}{5}$`, mistake: 'div-error', why: 'div F = 3x² + 3y² + 3z² = 3ρ². You dropped the 3.' },
        { tex: String.raw`$4\pi$`, mistake: 'volume-coords', why: 'You integrated 3ρ² sin φ and left out the ρ² in dV.' },
        { tex: String.raw`$\dfrac{6\pi}{5}$`, mistake: 'setup', why: 'φ runs from 0 to π for the whole ball; π/2 is only the top half.' },
      ],
      steps: [
        String.raw`$\operatorname{div}\vec F=3(x^2+y^2+z^2)=3\rho^2$.`,
        String.raw`$\int_0^{2\pi}\!\int_0^\pi\!\int_0^1 3\rho^2\cdot\rho^2\sin\phi\,d\rho\,d\phi\,d\theta$.`,
        String.raw`$=3\cdot\tfrac15\cdot2\cdot2\pi=\tfrac{12\pi}{5}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 1,
      prompt: String.raw`$S$ is the sphere $x^2+y^2+z^2=9$, oriented outward, and $\vec G=\langle z^3,\ xy,\ e^z\rangle$. What is $\iint_S\operatorname{curl}\vec G\cdot d\vec S$?`,
      choices: [
        { tex: String.raw`$0$`, correct: true },
        { tex: String.raw`$\displaystyle\iiint_D(y+e^z)\,dV$, which is not zero`, mistake: 'concept', why: 'That is the divergence of G. The integrand must be div(curl G), which is 0.' },
        { tex: String.raw`$36\pi$`, mistake: 'concept', why: 'That is the volume of the ball, as if div(curl G) were 1.' },
        { tex: String.raw`$\oint\vec G\cdot d\vec r$ around the equator`, mistake: 'concept', why: 'The equator is not the boundary of S. A closed surface has no boundary curve.' },
        { tex: String.raw`It cannot be found with either theorem`, mistake: 'not-closed', why: 'S is closed, so the divergence theorem applies, and Stokes also applies with an empty boundary.' },
      ],
      steps: [
        String.raw`$S$ is closed, so $\iint_S\operatorname{curl}\vec G\cdot d\vec S=\iiint_D\operatorname{div}(\operatorname{curl}\vec G)\,dV$.`,
        String.raw`$\operatorname{div}(\operatorname{curl}\vec G)=0$ for every smooth $\vec G$, so the answer is 0.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`$D$ is the solid between the paraboloid $z=4-x^2-y^2$ and the plane $z=0$. Find the outward flux of $\vec F=\langle x,y,z\rangle$ through the boundary of $D$.`,
      choices: [
        { tex: String.raw`$24\pi$`, correct: true },
        { tex: String.raw`$32\pi$`, mistake: 'volume-coords', why: 'You dropped the r in dV = r dz dr dθ.' },
        { tex: String.raw`$-192\pi$`, mistake: 'setup', why: 'The paraboloid meets z = 0 at r = 2, not r = 4. A negative flux for a positive divergence is a red flag.' },
        { tex: String.raw`$8\pi$`, mistake: 'div-error', why: 'div⟨x, y, z⟩ = 3, not 1. 8π is the volume.' },
        { tex: String.raw`$-24\pi$`, mistake: 'inward', why: 'Outward flux needs no sign change.' },
      ],
      steps: [
        String.raw`$\operatorname{div}\vec F=3$, so the flux is $3\times\text{Vol}(D)$.`,
        String.raw`Shadow: $4-r^2=0$ gives $r=2$. Vol $=\int_0^{2\pi}\!\int_0^2(4-r^2)\,r\,dr\,d\theta=2\pi(8-4)=8\pi$.`,
        String.raw`Flux $=3\cdot8\pi=24\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 1,
      prompt: String.raw`For which surface can you compute the outward flux $\iint_S\vec F\cdot d\vec S$ by applying the divergence theorem directly, with no extra surfaces?`,
      choices: [
        { tex: String.raw`The six faces of the box $[0,1]\times[0,2]\times[0,3]$`, correct: true },
        { tex: String.raw`The upper hemisphere $x^2+y^2+z^2=1$, $z\ge0$, without its base`, mistake: 'not-closed', why: 'Without the base disk the surface has a hole. You must add the disk and subtract its flux.' },
        { tex: String.raw`The side of the cylinder $x^2+y^2=1$, $0\le z\le2$`, mistake: 'not-closed', why: 'The top and bottom are open, so the surface does not enclose a solid.' },
        { tex: String.raw`The cone $z=\sqrt{x^2+y^2}$, $0\le z\le1$`, mistake: 'not-closed', why: 'The cone is open at the top. It needs the disk z = 1 as a lid.' },
        { tex: String.raw`The disk $x^2+y^2\le1$ in the plane $z=0$`, mistake: 'not-closed', why: 'A flat disk encloses no volume at all.' },
      ],
      steps: [
        String.raw`The theorem needs a closed surface that is the full boundary of a solid.`,
        String.raw`Only the box qualifies. The others need a lid first (Lesson 37).`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'paramSurface', x: 'cos(u)', y: 'sin(u)', z: 'v', u: [0, '2*pi'], v: [-1, 1] },
    { kind: 'vectorField', P: 'x*y^2/2', Q: 'y^3/6', R: 'z*x^2', density: 5 },
    { kind: 'vectorField', P: 'x', Q: 'y', R: 'z', density: 5 },
  ],
};
