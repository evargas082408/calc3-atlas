export default {
  id: 24,
  title: 'Mass and center of mass',
  section: '16.6',
  exam: 2,
  blurb: 'Find the mass of a plate or solid whose density varies, and the point where it balances.',
  boiler: ['Integration for Mass'],

  sections: [
    {
      id: 'balance',
      title: 'The balance point',
      body: String.raw`Put a 10 lb weight on each end of a board. It balances in the middle. Swap the right weight for 20 lb and the pivot has to slide toward the heavy side.

The rule behind both: **moment = distance from the pivot × mass**. The board balances when the moments on the two sides match. With 10 lb at distance $x_1$ and 20 lb at distance $x_2$, that means $10x_1 = 20x_2$, so $x_1 = 2x_2$.

Another way to say it: the balance point is a **weighted average of positions**, weighted by mass.

$$\bar x = \frac{\sum x_i m_i}{\sum m_i}$$

A plate is the same idea with infinitely many tiny pieces. The sums become double integrals.`,
    },
    {
      id: 'mass',
      title: 'Mass of a plate',
      body: String.raw`A thin plate fills a region $D$ and has **density** $\rho(x,y)$, mass per unit area. A tiny piece of area $\Delta A$ at $(x,y)$ has mass about $\rho(x,y)\,\Delta A$. Add up all the pieces:

$$M = \iint_D \rho(x,y)\,dA$$

If the density is a constant $k$, then $M = k\cdot\text{Area}(D)$. Otherwise you have to integrate.

A picture that helps: think of $\rho$ as the height of a roof over $D$. The mass is the volume under that roof. Where the roof is tall, the plate is heavy.`,
    },
    {
      id: 'moments',
      title: 'Moments, and the naming trap',
      body: String.raw`The tiny piece sits at distance $x$ from the $y$-axis and distance $y$ from the $x$-axis. Its moments are distance times mass, so

$$M_y = \iint_D x\,\rho\,dA \qquad M_x = \iint_D y\,\rho\,dA$$

$M_y$ is the moment **about the $y$-axis**, measured with $x$-distances. That is why $M_y$ gives you $\bar x$. The names look backwards. Ignore them and use this rule:

**The variable you multiply by is the coordinate you get.** Put an $x$ in front of $\rho$ to get $\bar x$, put a $y$ in front to get $\bar y$.`,
    },
    {
      id: 'center',
      title: 'Center of mass: moment divided by mass',
      body: String.raw`The center of mass $(\bar x,\bar y)$ is the point where you could squeeze the whole plate into one point mass and get the same moments: $M_y = \bar x\,M$ and $M_x = \bar y\,M$. Solve for the coordinates:

$$\bar x = \frac{M_y}{M} = \frac{\iint_D x\rho\,dA}{\iint_D \rho\,dA} \qquad \bar y = \frac{M_x}{M} = \frac{\iint_D y\rho\,dA}{\iint_D \rho\,dA}$$

Why you must divide: a moment has units of mass × length. Dividing by mass leaves a length, which is a location.

Quick sanity check: the center of mass has to land inside the smallest box around the plate. If you get 14 for a plate that lives in $0\le x\le 3$, you forgot to divide.

Exam pattern: the problem often **gives you the mass**. Then you compute one moment and divide.`,
    },
    {
      id: 'symmetry',
      title: 'Use symmetry first',
      body: String.raw`If the region **and** the density are both symmetric across a line, the center of mass is on that line. That saves a whole integral.

Lecture example: $D$ is the rectangle $1\le x\le 2$, $0\le y\le \pi$ with $\rho = x\sin y$.

- $\sin y$ is symmetric about $y=\pi/2$, and so is the rectangle, so $\bar y = \pi/2$ with no work.
- In $x$ the density $x$ grows to the right, so there is no symmetry. Compute: $M = \int_0^\pi\int_1^2 x\sin y\,dx\,dy = \tfrac32\cdot 2 = 3$ and $M_y = \int_0^\pi\int_1^2 x^2\sin y\,dx\,dy = \tfrac73\cdot 2 = \tfrac{14}{3}$.
- $\bar x = \frac{14/3}{3} = \frac{14}{9}\approx 1.56$, a bit right of the middle $1.5$. The heavy side pulls the balance point toward it.

A symmetric region alone is not enough. The density has to be symmetric too.`,
    },
    {
      id: 'example',
      title: 'Worked example: between y = x² and y = x',
      body: String.raw`From lecture: $D$ is the region between $y = x^2$ (below) and $y = x$ (above), and the density is proportional to the distance from the $y$-axis, $\rho = kx$.

1. Mass: $M = \int_0^1\int_{x^2}^{x} kx\,dy\,dx = k\int_0^1 (x^2 - x^3)\,dx = \frac{k}{12}$.
2. $M_y = \int_0^1\int_{x^2}^{x} x\cdot kx\,dy\,dx = k\int_0^1 (x^3 - x^4)\,dx = \frac{k}{20}$.
3. $M_x = \int_0^1\int_{x^2}^{x} y\cdot kx\,dy\,dx = \frac{k}{2}\int_0^1 (x^3 - x^5)\,dx = \frac{k}{24}$.
4. $(\bar x,\bar y) = \left(\frac{k/20}{k/12}, \frac{k/24}{k/12}\right) = \left(\frac35, \frac12\right)$.

The $k$ cancels. Scaling the density by a constant never moves the center of mass.

Compare with the uniform plate (the **centroid**): $(\tfrac12, \tfrac25)$. Making the right side heavier pushed the balance point right.`,
    },
    {
      id: 'solids',
      title: 'Solids, and the moment of inertia',
      body: String.raw`For a solid $E$ with density $\rho(x,y,z)$, swap $dA$ for $dV$ and add a third coordinate:

$$M = \iiint_E \rho\,dV \qquad \bar z = \frac{1}{M}\iiint_E z\,\rho\,dV$$

and the same for $\bar x$, $\bar y$. ($\iiint z\rho\,dV$ is called $M_{xy}$, the moment about the $xy$-plane.) Worth memorizing: a uniform solid hemisphere of radius $R$ sitting on the $xy$-plane has $\bar z = \frac{3R}{8}$, lower than halfway because the wide base holds most of the volume.

The **second moment** (moment of inertia) about an axis uses distance **squared**: $I = \iiint_E d^2\rho\,dV$. For the $z$-axis, $d^2 = x^2 + y^2$, so $I_z = \iiint_E (x^2+y^2)\rho\,dV$. You do not divide it by $M$.`,
    },
  ],

  formulas: [
    { label: 'Mass of a plate', tex: String.raw`M = \iint_D \rho(x,y)\,dA` },
    { label: 'First moments', tex: String.raw`M_y = \iint_D x\,\rho\,dA,\qquad M_x = \iint_D y\,\rho\,dA` },
    { label: 'Center of mass', tex: String.raw`(\bar x,\bar y) = \left(\frac{M_y}{M},\ \frac{M_x}{M}\right)` },
    { label: 'Solid', tex: String.raw`M = \iiint_E \rho\,dV,\qquad \bar z = \frac{1}{M}\iiint_E z\,\rho\,dV` },
    { label: 'Moment of inertia about the z-axis', tex: String.raw`I_z = \iiint_E (x^2+y^2)\,\rho\,dV` },
  ],

  mistakes: [
    {
      id: 'no-divide',
      title: 'Forgetting to divide by M',
      wrong: String.raw`$\bar y = \iint_D y\,\rho\,dA$`,
      right: String.raw`$\bar y = \dfrac{1}{M}\iint_D y\,\rho\,dA$`,
      why: 'A moment is mass times distance, not a position. Only after dividing by the mass do you get a coordinate. If your answer lands outside the plate, this is usually why.',
    },
    {
      id: 'mass-no-density',
      title: 'Density in the moment but not in the mass',
      wrong: String.raw`$\bar x = \dfrac{\iint_D x\rho\,dA}{\text{Area}(D)}$`,
      right: String.raw`$\bar x = \dfrac{\iint_D x\rho\,dA}{\iint_D \rho\,dA}$`,
      why: 'The area equals the mass only when the density is 1. With a variable density the denominator is its own integral.',
    },
    {
      id: 'moment-no-density',
      title: 'Dropping the density from the moment',
      wrong: String.raw`$\bar x = \dfrac{1}{M}\iint_D x\,dA$`,
      right: String.raw`$\bar x = \dfrac{1}{M}\iint_D x\,\rho\,dA$`,
      why: 'Without the density you are computing the centroid, the balance point of a uniform plate. It is a real number, which is why it shows up as a wrong choice.',
    },
    {
      id: 'swap-moments',
      title: 'Pairing the wrong moment with the coordinate',
      wrong: String.raw`$\bar x = \dfrac{M_x}{M} = \dfrac{1}{M}\iint_D y\,\rho\,dA$`,
      right: String.raw`$\bar x = \dfrac{M_y}{M} = \dfrac{1}{M}\iint_D x\,\rho\,dA$`,
      why: 'M_x is the moment about the x-axis, measured with y-distances, so it gives the y-coordinate. Multiply by the variable you want.',
    },
    {
      id: 'inertia-distance',
      title: 'Wrong distance in a moment of inertia',
      wrong: String.raw`$I_z = \iiint_E \sqrt{x^2+y^2}\,\rho\,dV$ or $\iiint_E (x^2+y^2+z^2)\rho\,dV$`,
      right: String.raw`$I_z = \iiint_E (x^2+y^2)\,\rho\,dV$`,
      why: 'The second moment uses the distance squared, and the distance is to the axis, not to the origin. A point (x, y, z) is sqrt(x^2 + y^2) from the z-axis.',
    },
  ],

  hook: 'Put the coordinate you want in front of the density, integrate, then divide by the mass.',

  scene: {
    view: { range: 1.3, z: [0, 1.4] },
    camera: [2.2, -2.4, 2.2],
    layers: [
      { id: 'D', kind: 'region2d', x: [0, 1], y: ['x^2', 'x'], color: 'water' },
      { id: 'Dstrips', kind: 'region2d', x: [0, 1], y: ['x^2', 'x'], color: 'water', strips: 'vertical' },
      { id: 'roof', kind: 'surface', z: 'x', domain: { x: [0, 1], y: ['x^2', 'x'] }, colormap: 'inferno', opacity: 0.85 },
      { id: 'mass', kind: 'solid', bottom: '0', top: 'x', region: { x: [0, 1], y: ['x^2', 'x'] } },
      { id: 'yx', kind: 'curve', x: 't', y: 't', z: '0', t: [0, 1], color: 'ink' },
      { id: 'yx2', kind: 'curve', x: 't', y: 't^2', z: '0', t: [0, 1], color: 'ink' },
      { id: 'cen', kind: 'point', at: [0.5, 0.4, 0], label: 'centroid (1/2, 2/5)' },
      { id: 'com', kind: 'point', at: [0.6, 0.5, 0], label: 'center of mass (3/5, 1/2)' },
    ],
    steps: [
      { label: 'Start', show: ['D', 'yx', 'yx2'], caption: String.raw`The plate $D$ lies between $y = x^2$ and $y = x$ for $0\le x\le 1$.` },
      { label: 'Density', show: ['D', 'roof', 'yx', 'yx2'], caption: String.raw`Draw the density $\rho = x$ as a roof over the plate. The plate is heavier on the right, where the roof is taller.` },
      { label: 'Mass', show: ['mass', 'yx', 'yx2'], caption: String.raw`The mass $M = \iint_D \rho\,dA$ is the volume of this solid: $M = \tfrac{1}{12}$ here.` },
      { label: 'Strips', show: ['Dstrips', 'roof', 'yx', 'yx2'], caption: String.raw`Each vertical strip at position $x$ contributes $x\cdot\rho\,\Delta A$ to $M_y$. Strips far to the right count more twice: more mass and a longer lever arm.` },
      { label: 'Centroid', show: ['D', 'yx', 'yx2', 'cen'], caption: String.raw`With uniform density the plate balances at its centroid $(\tfrac12, \tfrac25)$.` },
      { label: 'Balance', show: ['D', 'roof', 'yx', 'yx2', 'cen', 'com'], caption: String.raw`With $\rho = x$ the balance point moves to $\left(\frac{M_y}{M}, \frac{M_x}{M}\right) = (\tfrac35, \tfrac12)$, toward the heavy side.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`A plate fills the rectangle $0\le x\le 3$, $0\le y\le 2$ and has density $\rho(x,y) = y + 1$. Find $\bar y$.`,
      choices: [
        { tex: String.raw`$\dfrac76$`, correct: true },
        { tex: String.raw`$14$`, mistake: 'no-divide', why: 'That is the moment M_x. Divide it by the mass M = 12.' },
        { tex: String.raw`$\dfrac73$`, mistake: 'mass-no-density', why: 'You divided M_x = 14 by the area 6 instead of the mass 12.' },
        { tex: String.raw`$1$`, mistake: 'moment-no-density', why: 'That is the centroid height of a uniform rectangle. The density makes the top heavier.' },
        { tex: String.raw`$\dfrac32$`, mistake: 'swap-moments', why: 'That is x-bar, from M_y / M. The density does not depend on x, so x-bar sits at the middle 3/2.' },
      ],
      steps: [
        String.raw`Mass: $M = \int_0^3\int_0^2 (y+1)\,dy\,dx = 3\cdot(2+2) = 12$.`,
        String.raw`$M_x = \int_0^3\int_0^2 y(y+1)\,dy\,dx = 3\left(\tfrac83 + 2\right) = 14$.`,
        String.raw`$\bar y = \frac{M_x}{M} = \frac{14}{12} = \frac76$.`,
        String.raw`Check: $\frac76$ is above the middle $y = 1$, which makes sense because the density grows with $y$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`A thin plate occupies the region bounded by $y = x^2$, $y = 1$ and $x = 0$ (with $x \ge 0$). Its density is $\rho(x,y) = xy$ and its mass is $\tfrac16$. Find the $y$-coordinate of its center of mass.`,
      choices: [
        { tex: String.raw`$\dfrac34$`, correct: true },
        { tex: String.raw`$\dfrac18$`, mistake: 'no-divide', why: 'That is the moment M_x. You were handed M = 1/6 so you could divide by it.' },
        { tex: String.raw`$\dfrac47$`, mistake: 'swap-moments', why: 'That is x-bar: you integrated x times the density instead of y times the density.' },
        { tex: String.raw`$\dfrac35$`, mistake: 'moment-no-density', why: 'That is the centroid height of the region with density ignored.' },
        { tex: String.raw`$\dfrac{3}{16}$`, mistake: 'mass-no-density', why: 'You divided M_x = 1/8 by the area 2/3 instead of the mass 1/6.' },
      ],
      steps: [
        String.raw`Sketch: for $0\le x\le 1$ the region runs from the parabola $y = x^2$ up to $y = 1$.`,
        String.raw`You are given $M = \tfrac16$, so only compute $M_x = \iint_D y\cdot xy\,dA = \int_0^1 x\int_{x^2}^1 y^2\,dy\,dx$.`,
        String.raw`Inner: $\int_{x^2}^1 y^2\,dy = \frac{1 - x^6}{3}$. Outer: $\frac13\int_0^1 (x - x^7)\,dx = \frac13\left(\frac12 - \frac18\right) = \frac18$.`,
        String.raw`$\bar y = \frac{1/8}{1/6} = \frac34$.`,
      ],
      source: 'original (recycled exam pattern: density xy, mass 1/6)',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`A thin plate fills the triangle $0\le y\le x\le 2$ and has density $\rho = x$. Find its center of mass.`,
      choices: [
        { tex: String.raw`$\left(\dfrac32, \dfrac34\right)$`, correct: true },
        { tex: String.raw`$\left(\dfrac43, \dfrac23\right)$`, mistake: 'moment-no-density', why: 'That is the centroid of the triangle (average of the vertices). The density pulls the center to the right.' },
        { tex: String.raw`$(4, 2)$`, mistake: 'no-divide', why: 'Those are the moments M_y = 4 and M_x = 2. Divide each by M = 8/3. Note (4, 2) is not even in the triangle.' },
        { tex: String.raw`$\left(\dfrac34, \dfrac32\right)$`, mistake: 'swap-moments', why: 'The coordinates are swapped: M_y goes with x-bar and M_x goes with y-bar.' },
        { tex: String.raw`$(2, 1)$`, mistake: 'mass-no-density', why: 'You divided the moments by the area 2 instead of the mass 8/3.' },
      ],
      steps: [
        String.raw`Vertical slices: $0\le x\le 2$, $0\le y\le x$.`,
        String.raw`$M = \int_0^2\int_0^x x\,dy\,dx = \int_0^2 x^2\,dx = \frac83$.`,
        String.raw`$M_y = \int_0^2\int_0^x x^2\,dy\,dx = \int_0^2 x^3\,dx = 4$ and $M_x = \int_0^2\int_0^x xy\,dy\,dx = \int_0^2 \frac{x^3}{2}\,dx = 2$.`,
        String.raw`$\bar x = \frac{4}{8/3} = \frac32$, $\bar y = \frac{2}{8/3} = \frac34$.`,
      ],
      source: 'Study plan bank #19',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`A plate fills $0\le x\le \pi$, $0\le y\le 2$ with density $\rho(x,y) = y\sin x$. Which point is its center of mass?`,
      choices: [
        { tex: String.raw`$\left(\dfrac{\pi}{2}, \dfrac43\right)$`, correct: true },
        { tex: String.raw`$\left(\dfrac{\pi}{2}, 1\right)$`, mistake: 'moment-no-density', why: 'y = 1 is the middle of the rectangle. The density y makes the top heavier, so y-bar is above 1.' },
        { tex: String.raw`$\left(\dfrac{\pi}{2}, \dfrac{16}{3}\right)$`, mistake: 'no-divide', why: 'M_x = 16/3 is a moment. Divide by M = 4. A y-value of 16/3 is off the plate.' },
        { tex: String.raw`$\left(\dfrac43, \dfrac{\pi}{2}\right)$`, mistake: 'swap-moments', why: 'The coordinates are swapped.' },
        { tex: String.raw`$\left(\dfrac{\pi}{2}, \dfrac{8}{3\pi}\right)$`, mistake: 'mass-no-density', why: 'You divided M_x by the area 2 pi instead of the mass 4.' },
      ],
      steps: [
        String.raw`Symmetry: the rectangle and $\sin x$ are both symmetric about $x = \pi/2$, so $\bar x = \pi/2$ with no integral.`,
        String.raw`$M = \int_0^\pi\int_0^2 y\sin x\,dy\,dx = 2\cdot 2 = 4$.`,
        String.raw`$M_x = \int_0^\pi\int_0^2 y^2\sin x\,dy\,dx = \frac83\cdot 2 = \frac{16}{3}$.`,
        String.raw`$\bar y = \frac{16/3}{4} = \frac43$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`A uniform solid hemisphere $x^2+y^2+z^2\le R^2$, $z\ge 0$ sits on the $xy$-plane. Find the $z$-coordinate of its center of mass.`,
      choices: [
        { tex: String.raw`$\dfrac{3R}{8}$`, correct: true },
        { tex: String.raw`$\dfrac{R}{2}$`, mistake: 'concept', why: 'Halfway up is a guess. Most of the volume is near the wide base, so the center is lower than R/2.' },
        { tex: String.raw`$\dfrac{\pi R^4}{4}$`, mistake: 'no-divide', why: 'That is the moment of z, not a height. It even has the wrong units (R^4). Divide by the volume 2 pi R^3 / 3.' },
        { tex: String.raw`$\dfrac{3R}{16}$`, mistake: 'setup', why: 'You divided by the volume of the whole ball, 4 pi R^3 / 3, instead of the hemisphere.' },
        { tex: String.raw`$\dfrac{3R}{4}$`, mistake: 'arith', why: 'The phi integral of sin(phi) cos(phi) from 0 to pi/2 is 1/2, not 1.' },
      ],
      steps: [
        String.raw`By symmetry $\bar x = \bar y = 0$. Use spherical coordinates with $0\le\rho\le R$, $0\le\varphi\le\pi/2$, $0\le\theta\le 2\pi$.`,
        String.raw`Volume (the mass, with density 1): $V = \frac12\cdot\frac43\pi R^3 = \frac23\pi R^3$.`,
        String.raw`$\iiint z\,dV = \int_0^{2\pi}\int_0^{\pi/2}\int_0^R (\rho\cos\varphi)\,\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta = 2\pi\cdot\frac12\cdot\frac{R^4}{4} = \frac{\pi R^4}{4}$.`,
        String.raw`$\bar z = \frac{\pi R^4/4}{2\pi R^3/3} = \frac{3R}{8}$.`,
      ],
      source: 'Study plan bank #20',
    },
    {
      id: 'p6',
      difficulty: 3,
      prompt: String.raw`A plate occupies the region between $y = x^2$ and $y = x$ and has density $\rho(x,y) = y$. Find $\bar x$.`,
      choices: [
        { tex: String.raw`$\dfrac58$`, correct: true },
        { tex: String.raw`$\dfrac12$`, mistake: 'moment-no-density', why: 'That is the x-coordinate of the centroid. The density was left out of both integrals.' },
        { tex: String.raw`$\dfrac{1}{24}$`, mistake: 'no-divide', why: 'That is M_y. Divide by the mass 1/15.' },
        { tex: String.raw`$\dfrac14$`, mistake: 'mass-no-density', why: 'You divided M_y = 1/24 by the area 1/6 instead of the mass 1/15.' },
        { tex: String.raw`$\dfrac{15}{28}$`, mistake: 'swap-moments', why: 'That is y-bar = M_x / M.' },
      ],
      steps: [
        String.raw`The curves meet at $x = 0$ and $x = 1$. On $[0,1]$, $x^2\le y\le x$.`,
        String.raw`$M = \int_0^1\int_{x^2}^{x} y\,dy\,dx = \int_0^1 \frac{x^2 - x^4}{2}\,dx = \frac12\left(\frac13 - \frac15\right) = \frac{1}{15}$.`,
        String.raw`$M_y = \int_0^1\int_{x^2}^{x} xy\,dy\,dx = \int_0^1 \frac{x^3 - x^5}{2}\,dx = \frac12\left(\frac14 - \frac16\right) = \frac{1}{24}$.`,
        String.raw`$\bar x = \frac{1/24}{1/15} = \frac{15}{24} = \frac58$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 2,
      prompt: String.raw`A solid cylinder $x^2+y^2\le 1$, $0\le z\le 2$ has density 1. Find its moment of inertia about the $z$-axis, $I_z$.`,
      choices: [
        { tex: String.raw`$\pi$`, correct: true },
        { tex: String.raw`$\dfrac{4\pi}{3}$`, mistake: 'inertia-distance', why: 'You used the distance r instead of r^2 (or dropped the Jacobian r). Either way the integrand ends up as r^2 instead of r^3.' },
        { tex: String.raw`$\dfrac{11\pi}{3}$`, mistake: 'inertia-distance', why: 'You used x^2 + y^2 + z^2, the distance squared to the origin, not to the z-axis.' },
        { tex: String.raw`$\dfrac12$`, mistake: 'concept', why: 'You divided by the mass 2 pi. A moment of inertia is not divided by the mass.' },
        { tex: String.raw`$\dfrac{8\pi}{3}$`, mistake: 'setup', why: 'z^2 is the squared distance to the xy-plane, which would be a different second moment.' },
      ],
      steps: [
        String.raw`Distance squared to the $z$-axis is $x^2+y^2 = r^2$. In cylindrical coordinates $dV = r\,dz\,dr\,d\theta$.`,
        String.raw`$I_z = \int_0^{2\pi}\int_0^1\int_0^2 r^2\cdot r\,dz\,dr\,d\theta$.`,
        String.raw`$= 2\pi\cdot\frac14\cdot 2 = \pi$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: 'x*y' },
    { kind: 'surface', expr: 'x' },
  ],
};
