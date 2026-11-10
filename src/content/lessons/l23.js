export default {
  id: 23,
  title: 'Triple integrals in spherical coordinates',
  section: '16.5',
  exam: 2,
  blurb: 'Describe points by distance from the origin and two angles: the natural system for balls, hemispheres and ice-cream cones.',
  boiler: ['Spherical Integration'],

  sections: [
    {
      id: 'idea',
      title: 'The three coordinates',
      body: String.raw`Use spherical coordinates for balls, hemispheres, shells, a sphere capped onto a cone, or an integrand with $x^2 + y^2 + z^2$ in it. A point is described by:

- $\rho$ (rho): its **distance from the origin**, $\rho \ge 0$.
- $\phi$ (phi): the **angle down from the positive $z$-axis**, $0 \le \phi \le \pi$. $\phi = 0$ points straight up, $\phi = \tfrac{\pi}{2}$ is the $xy$-plane, $\phi = \pi$ points straight down.
- $\theta$: the same angle as in polar, measured in the $xy$-plane from the positive $x$-axis, $0 \le \theta \le 2\pi$.

In this course $\phi$ is the angle from the $z$-axis, and its range is only $0$ to $\pi$. $\theta$ is the one that goes all the way around. Swapping them is a standard way to lose a question.`,
    },
    {
      id: 'convert',
      title: 'Converting: one triangle does it',
      body: String.raw`Draw the vertical right triangle with hypotenuse $\rho$ from the origin to the point, and angle $\phi$ at the origin, between the hypotenuse and the $z$-axis. Its vertical leg is $z$ and its horizontal leg is $r$ (the cylindrical radius):

$$z = \rho\cos\phi,\qquad r = \rho\sin\phi.$$

Then polar finishes it: $x = r\cos\theta$, $y = r\sin\theta$.

$$x = \rho\sin\phi\cos\theta,\quad y = \rho\sin\phi\sin\theta,\quad z = \rho\cos\phi,\quad \rho^2 = x^2+y^2+z^2.$$

Lecture example: $(\rho,\phi,\theta) = \left(4, \tfrac{3\pi}{4}, \tfrac{\pi}{3}\right)$. Since $\phi > \tfrac{\pi}{2}$ the point is below the $xy$-plane.

$x = 4\cdot\tfrac{\sqrt2}{2}\cdot\tfrac12 = \sqrt2$, $\;y = 4\cdot\tfrac{\sqrt2}{2}\cdot\tfrac{\sqrt3}{2} = \sqrt6$, $\;z = 4\cos\tfrac{3\pi}{4} = -2\sqrt2$.`,
    },
    {
      id: 'surfaces',
      title: 'Surfaces to recognize',
      body: String.raw`- $\rho = a$: sphere of radius $a$ centered at the origin. (So $x^2+y^2+z^2 = 9$ is $\rho = 3$, not $9$.)
- $\phi = \phi_0$: a single cone around the $z$-axis, opening up if $\phi_0 < \tfrac{\pi}{2}$, down if $\phi_0 > \tfrac{\pi}{2}$.
- $\phi = \tfrac{\pi}{2}$: the $xy$-plane.
- $\theta = \theta_0$: a vertical half-plane.
- $\rho = 2a\cos\phi$: the sphere of radius $a$ centered at $(0,0,a)$. Multiply by $\rho$: $\rho^2 = 2a\rho\cos\phi$ is $x^2 + y^2 + z^2 = 2az$.
- $\rho = c\sec\phi$: the plane $z = c$ (since $\rho\cos\phi = c$).

**Cone angle.** For the cone $z = c\,r$, use the triangle: $\tan\phi = \dfrac{r}{z} = \dfrac1c$.

- $z = r$ ($z = \sqrt{x^2+y^2}$): $\tan\phi = 1$, $\phi = \tfrac{\pi}{4}$.
- $z = \sqrt3\,r$ ($z = \sqrt{3x^2+3y^2}$): $\tan\phi = \tfrac{1}{\sqrt3}$, $\phi = \tfrac{\pi}{6}$. A steeper cone has a **smaller** $\phi$.
- $z = \tfrac{r}{\sqrt3}$: $\tan\phi = \sqrt3$, $\phi = \tfrac{\pi}{3}$.`,
    },
    {
      id: 'jacobian',
      title: 'Why dV = ρ² sin φ dρ dφ dθ',
      body: String.raw`A spherical box has three edges:

- $\Delta\rho$ in the radial direction.
- $\rho\,\Delta\phi$ along a line of longitude (a circle of radius $\rho$).
- $\rho\sin\phi\,\Delta\theta$ along a line of latitude, a circle of radius $r = \rho\sin\phi$.

Multiply them:

$$dV = \rho^2\sin\phi\,d\rho\,d\phi\,d\theta.$$

Boxes far from the origin are bigger (the $\rho^2$), and boxes near the poles are thinner (the $\sin\phi$, which is $0$ on the $z$-axis).

Check: the ball of radius $R$ is $0 \le \rho \le R$, $0 \le \phi \le \pi$, $0 \le \theta \le 2\pi$:

$$\int_0^{2\pi}\!\!\int_0^\pi\!\!\int_0^R \rho^2\sin\phi\,d\rho\,d\phi\,d\theta = \frac{R^3}{3}\cdot 2\cdot 2\pi = \frac43\pi R^3.$$

When all the limits are constants, the integral is a product of three one-variable integrals. That happens on most exam problems.`,
    },
    {
      id: 'cone',
      title: 'Worked example: the ice-cream cone',
      body: String.raw`Lecture example: the volume inside the sphere $\rho = 6$ and inside the cone $\phi = \tfrac{\pi}{6}$.

- $\rho$: from the origin out to the sphere, $0 \le \rho \le 6$.
- $\phi$: from the $z$-axis out to the cone, $0 \le \phi \le \tfrac{\pi}{6}$.
- $\theta$: all the way around, $0 \le \theta \le 2\pi$.

$$V = \int_0^{2\pi}\!\!\int_0^{\pi/6}\!\!\int_0^6 \rho^2\sin\phi\,d\rho\,d\phi\,d\theta = 2\pi\cdot\frac{6^3}{3}\left(1 - \frac{\sqrt3}{2}\right).$$

The Exam 2 review did the same shape in all three systems: inside $x^2+y^2+z^2 = 4$ and inside $z = \sqrt{3x^2+3y^2}$.

- Cylindrical: $\sqrt3\,r \le z \le \sqrt{4 - r^2}$ over $r \le 1$ (set the surfaces equal: $3r^2 = 4 - r^2$).
- Spherical: $\cos\phi = \sqrt3\sin\phi$ gives $\phi = \tfrac{\pi}{6}$, so $\int_0^{2\pi}\!\int_0^{\pi/6}\!\int_0^2 \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$.

Spherical has constant limits; cylindrical does not. That is the sign you picked the right system.`,
    },
    {
      id: 'shifted',
      title: 'Worked example: limits that depend on φ, and half-spaces',
      body: String.raw`Lecture example: inside $\rho = 4\cos\phi$ (the sphere of radius 2 centered at $(0,0,2)$) and outside $\rho = 2$.

1. For a fixed direction, $\rho$ runs from the inner sphere to the outer one: $2 \le \rho \le 4\cos\phi$.
2. The spheres meet where $4\cos\phi = 2$: $\phi = \tfrac{\pi}{3}$. Past that angle there is nothing between them.

$$V = \int_0^{2\pi}\!\!\int_0^{\pi/3}\!\!\int_2^{4\cos\phi}\rho^2\sin\phi\,d\rho\,d\phi\,d\theta = \frac{22\pi}{3}.$$

**Half-spaces.** Each sign condition cuts one angle:

- $z \ge 0$: $0 \le \phi \le \tfrac{\pi}{2}$. $\;z \le 0$: $\tfrac{\pi}{2} \le \phi \le \pi$.
- $y \ge 0$: $0 \le \theta \le \pi$. $\;x \ge 0$: $-\tfrac{\pi}{2} \le \theta \le \tfrac{\pi}{2}$.

So the shell $2 \le \rho \le 5$ with $y \ge 0$ and $z \le 0$ has $\tfrac{\pi}{2} \le \phi \le \pi$ and $0 \le \theta \le \pi$.`,
    },
  ],

  formulas: [
    { label: 'Coordinates', tex: String.raw`x = \rho\sin\phi\cos\theta,\ \ y = \rho\sin\phi\sin\theta,\ \ z = \rho\cos\phi` },
    { label: 'Volume element', tex: String.raw`dV = \rho^2\sin\phi\,d\rho\,d\phi\,d\theta` },
    { label: 'Ranges', tex: String.raw`\rho \ge 0,\quad 0 \le \phi \le \pi,\quad 0 \le \theta \le 2\pi` },
    { label: 'Cone z = c r', tex: String.raw`\tan\phi = \frac{1}{c}\quad(z = r \Rightarrow \phi = \tfrac{\pi}{4},\ \ z = \sqrt3\,r \Rightarrow \phi = \tfrac{\pi}{6})` },
    { label: 'Shifted sphere', tex: String.raw`\rho = 2a\cos\phi \iff x^2 + y^2 + (z - a)^2 = a^2` },
  ],

  mistakes: [
    {
      id: 'missing-jacobian',
      title: 'Missing the ρ² or the sin φ',
      wrong: String.raw`$dV = d\rho\,d\phi\,d\theta$, or $\rho\sin\phi\,d\rho\,d\phi\,d\theta$`,
      right: String.raw`$dV = \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$`,
      why: 'The spherical box has edges dρ, ρ dφ and ρ sin φ dθ. Drop either factor and even the volume of a ball comes out wrong.',
    },
    {
      id: 'phi-theta-swap',
      title: 'Swapping φ and θ',
      wrong: String.raw`$0 \le \phi \le 2\pi$, $0 \le \theta \le \pi$`,
      right: String.raw`$0 \le \phi \le \pi$, $0 \le \theta \le 2\pi$`,
      why: 'φ is measured down from the +z axis and stops at π. θ goes around the z-axis. With φ running to 2π, sin φ goes negative and the integral cancels to 0.',
    },
    {
      id: 'cone-angle',
      title: 'Wrong angle for the cone z = c r',
      wrong: String.raw`$z = \sqrt3\,r \Rightarrow \tan\phi = \sqrt3,\ \phi = \tfrac{\pi}{3}$`,
      right: String.raw`$z = \sqrt3\,r \Rightarrow \tan\phi = \tfrac{r}{z} = \tfrac{1}{\sqrt3},\ \phi = \tfrac{\pi}{6}$`,
      why: 'φ is measured from the z-axis, so tan φ = r / z = 1/c. A steeper cone (bigger c) hugs the axis and has a smaller φ.',
    },
    {
      id: 'phi-range',
      title: 'Wrong φ range for half a ball',
      wrong: String.raw`Upper hemisphere with $0 \le \phi \le \pi$`,
      right: String.raw`$z \ge 0$: $0 \le \phi \le \tfrac{\pi}{2}$; $\;z \le 0$: $\tfrac{\pi}{2} \le \phi \le \pi$`,
      why: 'φ = π/2 is the xy-plane. Above it is 0 to π/2, below it is π/2 to π.',
    },
    {
      id: 'rho-bound',
      title: 'Using R² as the radius',
      wrong: String.raw`$x^2+y^2+z^2 = 9 \Rightarrow 0 \le \rho \le 9$`,
      right: String.raw`$x^2+y^2+z^2 = 9 \Rightarrow 0 \le \rho \le 3$`,
      why: 'ρ² = x² + y² + z², so the sphere is ρ = 3. Using 9 multiplies the answer by a huge power.',
    },
  ],

  hook: 'φ from the z-axis (0 to π), θ around it (0 to 2π), and dV = ρ² sin φ dρ dφ dθ.',

  scene: {
    view: { range: 2.3, z: [-0.3, 2.6] },
    camera: [4.5, -4, 3],
    layers: [
      { id: 'ghost', kind: 'paramSurface', x: '2*sin(u)*cos(v)', y: '2*sin(u)*sin(v)', z: '2*cos(u)', u: [0, 'pi/2'], v: [0, '2*pi'], colormap: 'water', opacity: 0.15, mesh: false },
      { id: 'cone', kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: 'u', u: [0, 'sqrt(2)'], v: [0, '2*pi'], colormap: 'viridis', opacity: 0.6 },
      { id: 'cap', kind: 'paramSurface', x: '2*sin(u)*cos(v)', y: '2*sin(u)*sin(v)', z: '2*cos(u)', u: [0, 'pi/4'], v: [0, '2*pi'], colormap: 'inferno', opacity: 0.85 },
      { id: 'zaxis', kind: 'vector', from: [0, 0, 0], to: [0, 0, 2.4], color: 'ink', label: 'z' },
      { id: 'rho', kind: 'vector', from: [0, 0, 0], to: [0.7914, 0.5414, 1.7552], color: 'road', label: 'ρ' },
      { id: 'phiArc', kind: 'curve', x: '0.8*sin(t)*cos(0.6)', y: '0.8*sin(t)*sin(0.6)', z: '0.8*cos(t)', t: [0, 0.5], color: 'wood' },
      { id: 'shadowLine', kind: 'curve', x: '0.7914*t', y: '0.5414*t', z: '0', t: [0, 1], color: 'revision' },
      { id: 'drop', kind: 'curve', x: '0.7914', y: '0.5414', z: '1.7552*t', t: [0, 1], color: 'revision' },
      { id: 'thetaArc', kind: 'curve', x: '0.5*cos(t)', y: '0.5*sin(t)', z: '0', t: [0, 0.6], color: 'water' },
      { id: 'pt', kind: 'point', at: [0.7914, 0.5414, 1.7552], label: '(ρ, φ, θ)' },
      { id: 'patch', kind: 'paramSurface', x: '1.4*sin(u)*cos(v)', y: '1.4*sin(u)*sin(v)', z: '1.4*cos(u)', u: [0.45, 0.62], v: [0.45, 0.75], colormap: 'textbook' },
      { id: 'shadow', kind: 'region2d', polar: { r: [0, 'sqrt(2)'], theta: [0, '2*pi'] }, color: 'water' },
    ],
    steps: [
      {
        label: 'Start',
        show: ['ghost', 'cone'],
        caption: String.raw`The cone $z = \sqrt{x^2+y^2}$ inside the sphere $x^2 + y^2 + z^2 = 4$. In spherical these are $\phi = \tfrac{\pi}{4}$ and $\rho = 2$.`,
      },
      {
        label: 'The cone is an angle',
        show: ['cone', 'zaxis', 'rho', 'phiArc', 'pt'],
        caption: String.raw`$\phi$ is the angle down from the $z$-axis. On the cone $z = r$, $\tan\phi = r/z = 1$, so the whole cone is the single equation $\phi = \tfrac{\pi}{4}$.`,
      },
      {
        label: 'Ice-cream cone',
        show: ['cone', 'cap', 'zaxis'],
        caption: String.raw`The solid is the cone with the spherical cap on top: $0 \le \rho \le 2$, $0 \le \phi \le \tfrac{\pi}{4}$, $0 \le \theta \le 2\pi$. Every limit is a constant.`,
      },
      {
        label: 'ρ, φ, θ',
        show: ['ghost', 'zaxis', 'rho', 'phiArc', 'shadowLine', 'drop', 'thetaArc', 'pt'],
        caption: String.raw`$\rho$ is the length of the red segment. Its shadow on the floor has length $r = \rho\sin\phi$ and makes angle $\theta$ with the $x$-axis. The height is $z = \rho\cos\phi$.`,
      },
      {
        label: 'Volume element',
        show: ['cone', 'cap', 'patch'],
        caption: String.raw`One face of a spherical box at distance $\rho$: it is $\rho\,d\phi$ tall and $\rho\sin\phi\,d\theta$ wide. Times $d\rho$: $dV = \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$. The volume is $\tfrac{8\pi}{3}(2 - \sqrt2)$.`,
      },
      {
        label: 'Not cylindrical',
        show: ['cone', 'cap', 'shadow'],
        caption: String.raw`In cylindrical the same solid needs $r \le z \le \sqrt{4 - r^2}$ over the shadow $r \le \sqrt2$. It works, but the spherical limits are all constants.`,
      },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 2,
      prompt: String.raw`Find the volume of the solid inside the sphere $x^2 + y^2 + z^2 = 4$ and above the cone $z = \sqrt{x^2 + y^2}$.`,
      choices: [
        { tex: String.raw`$\tfrac{8\pi}{3}\left(2 - \sqrt2\right)$`, correct: true },
        { tex: String.raw`$\tfrac{4\pi^2}{3}$`, mistake: 'missing-jacobian', why: String.raw`Without $\sin\phi$, the $\phi$-integral is just $\tfrac{\pi}{4}$ instead of $1 - \tfrac{\sqrt2}{2}$.` },
        { tex: String.raw`$2\pi\left(2 - \sqrt2\right)$`, mistake: 'missing-jacobian', why: String.raw`That uses $\rho\sin\phi$ instead of $\rho^2\sin\phi$, so the $\rho$-integral is 2 instead of $\tfrac83$.` },
        { tex: String.raw`$\tfrac{64\pi}{3}\left(2 - \sqrt2\right)$`, mistake: 'rho-bound', why: 'The sphere has radius 2. Using ρ up to 4 multiplies the volume by 8.' },
        { tex: String.raw`$\tfrac{8\pi}{3}\left(2 + \sqrt2\right)$`, mistake: 'phi-range', why: 'That is φ from π/4 to π: the part of the ball outside the cone.' },
      ],
      steps: [
        String.raw`Sphere: $\rho = 2$. Cone $z = r$: $\tan\phi = 1$, $\phi = \tfrac{\pi}{4}$. Above the cone means $0 \le \phi \le \tfrac{\pi}{4}$.`,
        String.raw`$V = \int_0^{2\pi}\!\int_0^{\pi/4}\!\int_0^2 \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$.`,
        String.raw`$= 2\pi\cdot\left(1 - \tfrac{\sqrt2}{2}\right)\cdot\tfrac83 = \tfrac{16\pi}{3}\left(1 - \tfrac{\sqrt2}{2}\right) = \tfrac{8\pi}{3}(2 - \sqrt2)$.`,
      ],
      source: 'Study plan bank #17',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Evaluate $\iiint_B (x^2 + y^2 + z^2)\,dV$, where $B$ is the unit ball $x^2 + y^2 + z^2 \le 1$.`,
      choices: [
        { tex: String.raw`$\tfrac{4\pi}{5}$`, correct: true },
        { tex: String.raw`$\tfrac{4\pi}{3}$`, mistake: 'missing-jacobian', why: String.raw`You converted the integrand to $\rho^2$ but used $\sin\phi\,d\rho\,d\phi\,d\theta$ without the $\rho^2$ from $dV$. (It is also the volume of the ball.)` },
        { tex: String.raw`$\tfrac{2\pi}{5}$`, mistake: 'phi-range', why: 'φ from 0 to π/2 is only the top half of the ball.' },
        { tex: '$0$', mistake: 'phi-theta-swap', why: 'With φ from 0 to 2π, the sin φ integral cancels to 0. φ stops at π.' },
        { tex: String.raw`$\tfrac{4\pi}{7}$`, mistake: 'arith', why: String.raw`$x^2 + y^2 + z^2 = \rho^2$, not $\rho^4$.` },
      ],
      steps: [
        String.raw`Integrand $\rho^2$, times $dV = \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$: $\rho^4\sin\phi$.`,
        String.raw`$\int_0^1\rho^4d\rho = \tfrac15$, $\int_0^\pi\sin\phi\,d\phi = 2$, $\int_0^{2\pi}d\theta = 2\pi$.`,
        String.raw`Product: $\tfrac{4\pi}{5}$.`,
      ],
      source: 'Study plan bank #18',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Which integral gives the volume of the solid inside $x^2+y^2+z^2 = 9$ and above the cone $z = \sqrt{3x^2 + 3y^2}$?`,
      choices: [
        { tex: String.raw`$\displaystyle\int_0^{2\pi}\!\!\int_0^{\pi/6}\!\!\int_0^3 \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$`, correct: true },
        { tex: String.raw`$\displaystyle\int_0^{2\pi}\!\!\int_0^{\pi/3}\!\!\int_0^3 \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$`, mistake: 'cone-angle', why: String.raw`For $z = \sqrt3\,r$, $\tan\phi = r/z = 1/\sqrt3$, so $\phi = \tfrac{\pi}{6}$. Using $\tan\phi = \sqrt3$ gives the wider cone.` },
        { tex: String.raw`$\displaystyle\int_0^{2\pi}\!\!\int_0^{\pi/6}\!\!\int_0^9 \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$`, mistake: 'rho-bound', why: 'The sphere has radius 3, not 9.' },
        { tex: String.raw`$\displaystyle\int_0^{2\pi}\!\!\int_0^{\pi/6}\!\!\int_0^3 \rho\sin\phi\,d\rho\,d\phi\,d\theta$`, mistake: 'missing-jacobian', why: 'dV has ρ squared.' },
        { tex: String.raw`$\displaystyle\int_0^{\pi/6}\!\!\int_0^{2\pi}\!\!\int_0^3 \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$`, mistake: 'phi-theta-swap', why: 'Here φ runs from 0 to 2π and θ only to π/6. The cone limits φ; θ goes all the way around.' },
      ],
      steps: [
        String.raw`Sphere: $\rho = 3$.`,
        String.raw`Cone: $\rho\cos\phi = \sqrt3\,\rho\sin\phi$, so $\tan\phi = \tfrac{1}{\sqrt3}$ and $\phi = \tfrac{\pi}{6}$.`,
        String.raw`Above the cone (closer to the $z$-axis): $0 \le \phi \le \tfrac{\pi}{6}$. Full turn: $0 \le \theta \le 2\pi$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`The solid between the spheres $\rho = 1$ and $\rho = 3$ with $x \ge 0$ and $z \ge 0$ has volume $\displaystyle\int_{C}^{D}\!\!\int_{A}^{B}\!\!\int_1^3 \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$. Which limits $A, B, C, D$ describe exactly this solid?`,
      choices: [
        { tex: String.raw`$A = 0,\ B = \tfrac{\pi}{2};\ C = -\tfrac{\pi}{2},\ D = \tfrac{\pi}{2}$`, correct: true },
        { tex: String.raw`$A = 0,\ B = \tfrac{\pi}{2};\ C = 0,\ D = \pi$`, mistake: 'setup', why: 'θ from 0 to π is y ≥ 0. The condition x ≥ 0 is θ from -π/2 to π/2.' },
        { tex: String.raw`$A = \tfrac{\pi}{2},\ B = \pi;\ C = -\tfrac{\pi}{2},\ D = \tfrac{\pi}{2}$`, mistake: 'phi-range', why: 'φ from π/2 to π is below the xy-plane (z ≤ 0).' },
        { tex: String.raw`$A = -\tfrac{\pi}{2},\ B = \tfrac{\pi}{2};\ C = 0,\ D = \tfrac{\pi}{2}$`, mistake: 'phi-theta-swap', why: 'φ is never negative; the x ≥ 0 range belongs to θ, the z ≥ 0 range to φ.' },
        { tex: String.raw`$A = 0,\ B = \tfrac{\pi}{2};\ C = 0,\ D = 2\pi$`, mistake: 'setup', why: 'That ignores x ≥ 0 and describes the whole upper shell.' },
      ],
      steps: [
        String.raw`$z \ge 0$ cuts $\phi$: $0 \le \phi \le \tfrac{\pi}{2}$, so $A = 0$, $B = \tfrac{\pi}{2}$.`,
        String.raw`$x \ge 0$ cuts $\theta$: the right half, $-\tfrac{\pi}{2} \le \theta \le \tfrac{\pi}{2}$.`,
        String.raw`(The volume is a quarter of the shell: $\tfrac14\cdot\tfrac43\pi(27 - 1) = \tfrac{26\pi}{3}$.)`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 3,
      prompt: String.raw`Find the volume of the region inside $\rho = 2\cos\phi$ and outside $\rho = 1$.`,
      choices: [
        { tex: String.raw`$\tfrac{11\pi}{12}$`, correct: true },
        { tex: String.raw`$\tfrac{2\pi}{3}$`, mistake: 'phi-range', why: String.raw`The spheres meet at $\phi = \tfrac{\pi}{3}$. Running $\phi$ to $\tfrac{\pi}{2}$ adds a piece where $2\cos\phi < 1$, which subtracts volume.` },
        { tex: String.raw`$\tfrac{\pi(4\sqrt3 - 1)}{12}$`, mistake: 'cone-angle', why: String.raw`$2\cos\phi = 1$ gives $\cos\phi = \tfrac12$, so $\phi = \tfrac{\pi}{3}$, not $\tfrac{\pi}{6}$.` },
        { tex: String.raw`$\tfrac{4\pi}{3}$`, mistake: 'setup', why: String.raw`That is the whole sphere $\rho = 2\cos\phi$ (radius 1). The part inside $\rho = 1$ must be removed.` },
        { tex: String.raw`$\tfrac{5\pi}{12}$`, mistake: 'setup', why: 'That is the other piece: the part inside both spheres.' },
      ],
      steps: [
        String.raw`$\rho = 2\cos\phi$ is the sphere of radius 1 centered at $(0,0,1)$.`,
        String.raw`Meet: $2\cos\phi = 1$, $\phi = \tfrac{\pi}{3}$. Limits: $1 \le \rho \le 2\cos\phi$, $0 \le \phi \le \tfrac{\pi}{3}$, $0 \le \theta \le 2\pi$.`,
        String.raw`Inner: $\tfrac{8\cos^3\phi - 1}{3}$. Then $\int_0^{\pi/3}\tfrac{8\cos^3\phi - 1}{3}\sin\phi\,d\phi = \tfrac13\left(2\cdot\tfrac{15}{16} - \tfrac12\right) = \tfrac{11}{24}$.`,
        String.raw`Times $2\pi$: $\tfrac{11\pi}{12}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 1,
      prompt: String.raw`Which spherical equation describes the cone $z = \sqrt{3(x^2+y^2)}$?`,
      choices: [
        { tex: String.raw`$\phi = \tfrac{\pi}{6}$`, correct: true },
        { tex: String.raw`$\phi = \tfrac{\pi}{3}$`, mistake: 'cone-angle', why: String.raw`$\tan\phi = r/z = \tfrac{1}{\sqrt3}$. $\tfrac{\pi}{3}$ comes from using $z/r$.` },
        { tex: String.raw`$\theta = \tfrac{\pi}{6}$`, mistake: 'phi-theta-swap', why: 'θ = constant is a vertical half-plane, not a cone.' },
        { tex: String.raw`$\phi = \tfrac{\pi}{4}$`, mistake: 'cone-angle', why: String.raw`$\phi = \tfrac{\pi}{4}$ is the cone $z = r$. The factor $\sqrt3$ makes this cone steeper.` },
        { tex: String.raw`$\rho = \sqrt3$`, mistake: 'concept', why: 'ρ = constant is a sphere.' },
      ],
      steps: [
        String.raw`Substitute $z = \rho\cos\phi$ and $\sqrt{x^2+y^2} = \rho\sin\phi$: $\rho\cos\phi = \sqrt3\,\rho\sin\phi$.`,
        String.raw`Divide by $\rho\cos\phi$: $\tan\phi = \tfrac{1}{\sqrt3}$.`,
        String.raw`So $\phi = \tfrac{\pi}{6}$. Shortcut: $z = c\,r$ means $\tan\phi = 1/c$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 2,
      prompt: String.raw`Convert to spherical coordinates and evaluate $\displaystyle\int_{-3}^{3}\!\!\int_{-\sqrt{9-x^2}}^{\sqrt{9-x^2}}\!\!\int_0^{\sqrt{9-x^2-y^2}} \sqrt{x^2+y^2+z^2}\,dz\,dy\,dx$.`,
      choices: [
        { tex: String.raw`$\tfrac{81\pi}{2}$`, correct: true },
        { tex: String.raw`$81\pi$`, mistake: 'phi-range', why: 'z runs from 0 up: only the upper hemisphere, φ from 0 to π/2.' },
        { tex: String.raw`$18\pi$`, mistake: 'concept', why: String.raw`That is the volume of the hemisphere. The integrand $\sqrt{x^2+y^2+z^2} = \rho$ was dropped.` },
        { tex: String.raw`$\tfrac{6561\pi}{2}$`, mistake: 'rho-bound', why: 'The radius is 3, not 9.' },
        { tex: String.raw`$\tfrac{9\pi^2}{2}$`, mistake: 'missing-jacobian', why: String.raw`That uses $dV = d\rho\,d\phi\,d\theta$. It needs $\rho^2\sin\phi$.` },
      ],
      steps: [
        String.raw`Limits: the $xy$-shadow is the full disk of radius 3, and $0 \le z \le \sqrt{9 - x^2 - y^2}$. That is the upper half of the ball $\rho \le 3$.`,
        String.raw`$0 \le \rho \le 3$, $0 \le \phi \le \tfrac{\pi}{2}$, $0 \le \theta \le 2\pi$. Integrand $\rho$, times $\rho^2\sin\phi$: $\rho^3\sin\phi$.`,
        String.raw`$\tfrac{3^4}{4}\cdot 1\cdot 2\pi = \tfrac{81\pi}{2}$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: 'sqrt(x^2 + y^2)' },
    { kind: 'surface', expr: 'sqrt(4 - x^2 - y^2)' },
  ],
};
