export default {
  id: 4,
  title: 'Quadric surfaces, part 2',
  section: '13.6',
  exam: 1,
  blurb: 'Identify all six quadric surfaces from their equations, which way they open, and what their traces look like.',
  boiler: ['Surface ID', 'Quadratic surfaces', 'Traces'],

  sections: [
    {
      id: 'direction',
      title: 'Which way does it open?',
      body: String.raw`Last lesson's shapes can point in any direction. The equation tells you which.

**The lone variable is the axis.** In a paraboloid, one variable appears to the first power. The surface opens along that axis, toward whichever sign makes the squares positive.
- $x^2+y^2=-z$: the left side is never negative, so $z\le0$. A bowl opening **down**, vertex at the origin.
- $x^2+z^2=-y$: same idea with $y$ alone, so it opens toward **negative $y$**. The slices $y=-1,-2,-5$ are circles of radius $1,\sqrt2,\sqrt5$, and $y>0$ has no trace.

The notes say this second one "can be rewritten as $x^2+y^2=-z$". It can't. It is the same *shape* turned on its side, but a different surface. Do not swap letters in an equation.

**Cylinders stay cylinders.** $y=-z^2$ has no $x$. It is a parabola in the $yz$-plane, opening toward $-y$, slid along the $x$-axis.`,
    },
    {
      id: 'hyperbolas',
      title: 'Warm-up: the family $x^2-y^2=k$',
      body: String.raw`You need this 2D picture to read the 3D saddle.
- $k>0$: a hyperbola opening **left and right** (it crosses the $x$-axis at $\pm\sqrt k$).
- $k<0$: a hyperbola opening **up and down** (now $y^2-x^2=|k|$, so it crosses the $y$-axis).
- $k=0$: $(x-y)(x+y)=0$, the two lines $y=\pm x$.

All of them hug the same two lines $y=\pm x$ as asymptotes. A quick test for which way a hyperbola opens: set one variable to 0 and see which one gives a real answer. That is the axis it crosses.`,
    },
    {
      id: 'saddle',
      title: 'Hyperbolic paraboloid: the saddle',
      body: String.raw`$z=x^2-y^2$. Slice it three ways.
- $z=k$: $x^2-y^2=k$, exactly the family above. Hyperbolas opening along $x$ above the floor, along $y$ below it, and an X of two lines at $z=0$.
- $y=c$: $z=x^2-c^2$, a parabola opening **up**.
- $x=c$: $z=c^2-y^2$, a parabola opening **down**.

Walk along the $x$ direction and you climb. Walk along $y$ and you descend. The origin is up in one direction and down in the other: a horse saddle, or a Pringles chip. This is the same picture you will see later as a **saddle point**.`,
    },
    {
      id: 'one-sheet',
      title: 'Hyperboloid of one sheet: the cooling tower',
      body: String.raw`**Example (class).** $4x^2+y^2-z^2=36$.
- $z=k$: $4x^2+y^2=36+k^2$. The right side is always positive, so every height has an **ellipse**, and they grow as $|k|$ grows. The narrowest one, the waist, is at $z=0$: $\frac{x^2}{9}+\frac{y^2}{36}=1$.
- $x=k$: $y^2-z^2=36-4k^2$. Hyperbolas. For $|k|<3$ the right side is positive and they open along $y$. At $|k|=3$ they collapse to two lines. For $|k|>3$ they open along $z$. (The notes only describe the first case.)
- $y=k$: $4x^2-z^2=36-k^2$, also hyperbolas.

Ellipses at every height, hyperbolas from the side, and all in one connected piece. Intercepts: $x=\pm3$, $y=\pm6$, and no $z$-intercept (set $x=y=0$: $-z^2=36$ is impossible).`,
    },
    {
      id: 'two-sheets',
      title: 'Hyperboloid of two sheets: a gap in the middle',
      body: String.raw`**Example (class).** $-x^2-y^2+4z^2=36$, or $\frac{z^2}{9}-\frac{x^2}{36}-\frac{y^2}{36}=1$.
- $z=k$: $x^2+y^2=4k^2-36$. This needs $4k^2\ge36$, so $|k|\ge3$. **Nothing** lives between $z=-3$ and $z=3$. At $z=\pm3$ you get the single points $(0,0,\pm3)$. At $z=\pm4$, radius $2\sqrt7$; at $z=\pm5$, radius 8.
- $x=k$ or $y=k$: hyperbolas opening along $z$ for every $k$.

Two separate bowls facing away from each other. The shortest distance between the sheets is the gap between the two tips: $3-(-3)=6$. In standard form that gap is $2c$, twice the square root of the number under the positive term.`,
    },
    {
      id: 'identify',
      title: 'Identifying any quadric in three moves',
      body: String.raw`1. **Complete the square** if there are linear terms like $64x$. This only moves the center.
2. **Get it into standard form**: squares on one side, and 1 (or 0) on the other. Divide through if needed.
3. **Read the signs.**
- No variable to the first power, right side 1: count the minus signs. **0** is an ellipsoid. **1** is a hyperboloid of **one** sheet. **2** is a hyperboloid of **two** sheets. The odd-signed variable is the axis.
- Right side 0, squares only: a **cone**. The variable on its own side is the axis.
- One variable to the first power: a **paraboloid**. Same signs on the squares: elliptic (bowl). Opposite signs: hyperbolic (saddle).

**Example.** $-16x^2-4y^2+z^2+64x-80=0$. Complete the square: $-16(x^2-4x) = -16(x-2)^2+64$. So $-16(x-2)^2-4y^2+z^2=16$, and dividing by 16:
$$\frac{z^2}{16}-(x-2)^2-\frac{y^2}{4}=1.$$
Two minus signs: two sheets. The positive term is $z$, so it opens along $z$. Center $(2,0,0)$, tips at $(2,0,\pm4)$, gap 8.

**Watch the starting form.** For $-x^2+\frac{y^2}{25}-\frac{z^2}{9}-1=0$, move the $-1$ first: $\frac{y^2}{25}-x^2-\frac{z^2}{9}=1$. Two minus signs, two sheets along $y$, tips at $y=\pm5$, gap 10.`,
    },
  ],

  formulas: [
    { label: 'Ellipsoid', tex: String.raw`\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}+\dfrac{z^2}{c^2}=1` },
    { label: 'Hyperboloid of one sheet', tex: String.raw`\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}-\dfrac{z^2}{c^2}=1` },
    { label: 'Hyperboloid of two sheets', tex: String.raw`\dfrac{z^2}{c^2}-\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1\quad(\text{gap } 2c)` },
    { label: 'Elliptic cone', tex: String.raw`\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=\dfrac{z^2}{c^2}` },
    { label: 'Elliptic paraboloid', tex: String.raw`z=\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}` },
    { label: 'Hyperbolic paraboloid', tex: String.raw`z=\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}` },
  ],

  mistakes: [
    {
      id: 'sign-count',
      title: 'Swapping one sheet and two sheets',
      wrong: String.raw`$\dfrac{x^2}{9}+\dfrac{y^2}{4}-z^2=1$ is two sheets "because there is a minus"`,
      right: String.raw`One minus sign, one sheet. Two minus signs, two sheets.`,
      why: 'With one minus, z = k always gives an ellipse, so the surface never breaks. With two minuses, the middle slices have no solutions, which splits it in two.',
    },
    {
      id: 'axis-of-symmetry',
      title: 'Picking the wrong axis',
      wrong: String.raw`$\dfrac{y^2}{4}-x^2-\dfrac{z^2}{4}=1$ opens along $z$`,
      right: String.raw`It opens along $y$, the variable with the odd sign`,
      why: 'For hyperboloids the axis is the variable whose sign differs from the other two. For paraboloids it is the variable to the first power.',
    },
    {
      id: 'not-standard-form',
      title: 'Reading signs before reaching standard form',
      wrong: String.raw`Dropping the constants from completing the square, or reading $-x^2+\tfrac{y^2}{25}-\tfrac{z^2}{9}-1=0$ as is`,
      right: String.raw`Complete every square, move the constant over, and make the right side $+1$ (or 0) before counting`,
      why: 'The sign count only works on the form (squares) = 1. A constant left behind can turn a cone into a hyperboloid.',
    },
    {
      id: 'vertex-distance',
      title: 'Getting the gap between sheets wrong',
      wrong: String.raw`$\dfrac{x^2}{16}-y^2-\dfrac{z^2}{9}=1$: gap is 4 (or 16)`,
      right: String.raw`Tips at $x=\pm4$, gap $=8$`,
      why: 'The tips are at plus and minus the square root of the denominator, so the gap is twice that square root.',
    },
    {
      id: 'saddle-vs-cone',
      title: 'Mixing up the saddle, the cone, and the one-sheet',
      wrong: String.raw`$x^2+\tfrac{y^2}{4}=\tfrac{z^2}{9}$ has an ellipse at every height`,
      right: String.raw`The cone pinches to a point at $z=0$; only the one-sheet hyperboloid has an ellipse at every height`,
      why: 'Cone (= 0), one sheet (= 1) and saddle (one variable linear) all involve a minus sign somewhere. Check the right side and the powers.',
    },
  ],

  hook: 'Put it in (squares) = 1 and count the minus signs: zero is an egg, one is a tower (one piece), two is two bowls. Equals zero is a cone. A first-power variable is a paraboloid along that axis.',

  scene: {
    view: { range: 3, z: [-2.5, 2.5] },
    camera: [6, -6, 4],
    layers: [
      { id: 'saddle', kind: 'surface', z: 'x^2 - y^2', domain: { x: [-1.5, 1.5], y: [-1.5, 1.5] }, colormap: 'terrain', opacity: 0.7 },
      { id: 'sUp', kind: 'curve', x: 't', y: '0', z: 't^2', t: [-1.5, 1.5], color: 'road' },
      { id: 'sDown', kind: 'curve', x: '0', y: 't', z: '-t^2', t: [-1.5, 1.5], color: 'water' },
      { id: 'sX1', kind: 'curve', x: 't', y: 't', z: '0', t: [-1.5, 1.5], color: 'ink' },
      { id: 'sX2', kind: 'curve', x: 't', y: '-t', z: '0', t: [-1.5, 1.5], color: 'ink' },
      { id: 'sH1', kind: 'curve', x: 'cosh(t)', y: 'sinh(t)', z: '1', t: [-0.96, 0.96], color: 'revision' },
      { id: 'sH2', kind: 'curve', x: '-cosh(t)', y: 'sinh(t)', z: '1', t: [-0.96, 0.96], color: 'revision' },
      { id: 'sH3', kind: 'curve', x: 'sinh(t)', y: 'cosh(t)', z: '-1', t: [-0.96, 0.96], color: 'wood' },
      { id: 'sH4', kind: 'curve', x: 'sinh(t)', y: '-cosh(t)', z: '-1', t: [-0.96, 0.96], color: 'wood' },

      { id: 'h1', kind: 'paramSurface', x: 'cosh(u)*cos(v)', y: '2*cosh(u)*sin(v)', z: '2*sinh(u)', u: [-0.7, 0.7], v: [0, '2*pi'], colormap: 'water', opacity: 0.5 },
      { id: 'h1waist', kind: 'curve', x: 'cos(t)', y: '2*sin(t)', z: '0', t: [0, '2*pi'], color: 'ink' },
      { id: 'h1top', kind: 'curve', x: '1.25*cos(t)', y: '2.5*sin(t)', z: '1.5', t: [0, '2*pi'], color: 'ink' },
      { id: 'h1sideA', kind: 'curve', x: '0', y: '2*cosh(t)', z: '2*sinh(t)', t: [-0.7, 0.7], color: 'road' },
      { id: 'h1sideB', kind: 'curve', x: '0', y: '-2*cosh(t)', z: '2*sinh(t)', t: [-0.7, 0.7], color: 'road' },

      { id: 'h2up', kind: 'paramSurface', x: '2*sinh(u)*cos(v)', y: '2*sinh(u)*sin(v)', z: 'cosh(u)', u: [0, 1.1], v: [0, '2*pi'], colormap: 'inferno', opacity: 0.6 },
      { id: 'h2down', kind: 'paramSurface', x: '2*sinh(u)*cos(v)', y: '2*sinh(u)*sin(v)', z: '-cosh(u)', u: [0, 1.1], v: [0, '2*pi'], colormap: 'inferno', opacity: 0.6 },
      { id: 'h2tipUp', kind: 'point', at: [0, 0, 1], label: '(0,0,1)' },
      { id: 'h2tipDown', kind: 'point', at: [0, 0, -1], label: '(0,0,-1)' },
      { id: 'h2ring', kind: 'curve', x: 'sqrt(5)*cos(t)', y: 'sqrt(5)*sin(t)', z: '1.5', t: [0, '2*pi'], color: 'ink' },
      { id: 'h2sideA', kind: 'curve', x: '0', y: '2*sinh(t)', z: 'cosh(t)', t: [-1.1, 1.1], color: 'road' },
      { id: 'h2sideB', kind: 'curve', x: '0', y: '2*sinh(t)', z: '-cosh(t)', t: [-1.1, 1.1], color: 'road' },

      { id: 'ell', kind: 'paramSurface', x: '2*sin(u)*cos(v)', y: '2.5*sin(u)*sin(v)', z: '1.5*cos(u)', u: [0, 'pi'], v: [0, '2*pi'], colormap: 'viridis', opacity: 0.55 },
      { id: 'ellZ', kind: 'curve', x: '2*cos(t)', y: '2.5*sin(t)', z: '0', t: [0, '2*pi'], color: 'ink' },
      { id: 'ellX', kind: 'curve', x: '0', y: '2.5*cos(t)', z: '1.5*sin(t)', t: [0, '2*pi'], color: 'road' },

      { id: 'fam1', kind: 'paramSurface', x: 'cosh(u)*cos(v)', y: 'cosh(u)*sin(v)', z: 'sinh(u)', u: [-1.2, 1.2], v: [0, '2*pi'], colormap: 'water', opacity: 0.35 },
      { id: 'famCone', kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: 'u', u: [-1.8, 1.8], v: [0, '2*pi'], colormap: 'terrain', opacity: 0.5 },
      { id: 'fam2up', kind: 'paramSurface', x: 'sinh(u)*cos(v)', y: 'sinh(u)*sin(v)', z: 'cosh(u)', u: [0, 1.2], v: [0, '2*pi'], colormap: 'inferno', opacity: 0.6 },
      { id: 'fam2down', kind: 'paramSurface', x: 'sinh(u)*cos(v)', y: 'sinh(u)*sin(v)', z: '-cosh(u)', u: [0, 1.2], v: [0, '2*pi'], colormap: 'inferno', opacity: 0.6 },
    ],
    steps: [
      { label: 'Start', show: ['saddle', 'sUp', 'sDown'], caption: String.raw`The saddle $z=x^2-y^2$. Slicing at $y=0$ gives $z=x^2$, opening up (red). Slicing at $x=0$ gives $z=-y^2$, opening down (blue).` },
      { label: 'Saddle levels', show: ['saddle', 'sX1', 'sX2', 'sH1', 'sH2', 'sH3', 'sH4'], caption: String.raw`Horizontal slices are the family $x^2-y^2=k$: an X of lines at $z=0$, hyperbolas opening along $x$ at $z=1$ (purple), and along $y$ at $z=-1$ (green).` },
      { label: 'One sheet', show: ['h1', 'h1waist', 'h1top', 'h1sideA', 'h1sideB'], caption: String.raw`The class example $4x^2+y^2-z^2=36$, shrunk by a factor of 3 so it fits: $x^2+\tfrac{y^2}{4}-\tfrac{z^2}{4}=1$. Every height has an ellipse, narrowest at the waist. The side view $x=0$ is a hyperbola. One minus sign, one connected piece.` },
      { label: 'Two sheets', show: ['h2up', 'h2down', 'h2tipUp', 'h2tipDown', 'h2ring', 'h2sideA', 'h2sideB'], caption: String.raw`The class example $-x^2-y^2+4z^2=36$, shrunk by 3: $z^2-\tfrac{x^2}{4}-\tfrac{y^2}{4}=1$. Slices with $|z|<1$ are empty, so the surface splits into two bowls with tips at $z=\pm1$. Two minus signs, two sheets.` },
      { label: 'Ellipsoid', show: ['ell', 'ellZ', 'ellX'], caption: String.raw`$\tfrac{x^2}{4}+\tfrac{y^2}{6.25}+\tfrac{z^2}{2.25}=1$: no minus signs. Every trace is an ellipse and the surface is closed, with intercepts $\pm2$, $\pm2.5$, $\pm1.5$.` },
      { label: 'Family', show: ['fam1', 'famCone', 'fam2up', 'fam2down'], caption: String.raw`Same left side $x^2+y^2-z^2$, three right sides. $=1$ is the one-sheet tower (outside), $=0$ is the cone, $=-1$ is the two-sheet bowls (inside). The cone is the border between them.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Identify the surface $\dfrac{x^2}{9}+\dfrac{y^2}{4}-z^2=1$.`,
      choices: [
        { tex: String.raw`Hyperboloid of one sheet`, correct: true },
        { tex: String.raw`Hyperboloid of two sheets`, mistake: 'sign-count', why: 'Two sheets needs two minus signs. Here only z^2 is negative.' },
        { tex: String.raw`Ellipsoid`, mistake: 'sign-count', why: 'An ellipsoid has no minus signs.' },
        { tex: String.raw`Elliptic cone`, mistake: 'saddle-vs-cone', why: 'A cone has 0 on the right side, not 1.' },
        { tex: String.raw`Elliptic paraboloid`, mistake: 'concept', why: 'A paraboloid has one variable to the first power. All three are squared here.' },
      ],
      steps: [
        String.raw`It is already in standard form: squares on the left, 1 on the right.`,
        String.raw`One minus sign. That means one sheet, along the $z$-axis.`,
        String.raw`Check: $z=k$ gives $\frac{x^2}{9}+\frac{y^2}{4}=1+k^2$, an ellipse for every $k$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Identify the surface $-4x^2+y^2-z^2=4$.`,
      choices: [
        { tex: String.raw`Hyperboloid of two sheets along the $y$-axis`, correct: true },
        { tex: String.raw`Hyperboloid of one sheet along the $y$-axis`, mistake: 'sign-count', why: 'After dividing by 4 there are two minus signs, so two sheets.' },
        { tex: String.raw`Hyperboloid of two sheets along the $x$-axis`, mistake: 'axis-of-symmetry', why: 'The axis is the variable with the odd sign, which is y (the only positive one).' },
        { tex: String.raw`Hyperboloid of two sheets along the $z$-axis`, mistake: 'axis-of-symmetry', why: 'z has a minus sign like x. The odd one out is y.' },
        { tex: String.raw`Cone along the $y$-axis`, mistake: 'saddle-vs-cone', why: 'A cone would have 0 on the right side. Here it is 4.' },
      ],
      steps: [
        String.raw`Divide by 4: $\dfrac{y^2}{4}-x^2-\dfrac{z^2}{4}=1$.`,
        String.raw`Two minus signs: two sheets.`,
        String.raw`The positive term is $y$, so it opens along the $y$-axis. Slices $y=k$ are empty for $|k|<2$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`What is the shortest distance between the two sheets of $\dfrac{x^2}{16}-y^2-\dfrac{z^2}{9}=1$?`,
      choices: [
        { tex: String.raw`$8$`, correct: true },
        { tex: String.raw`$4$`, mistake: 'vertex-distance', why: 'That is the distance from the center to one tip. The gap goes from x = -4 to x = 4.' },
        { tex: String.raw`$16$`, mistake: 'vertex-distance', why: '16 is a^2. The tips are at x = plus or minus sqrt(16) = 4.' },
        { tex: String.raw`$32$`, mistake: 'vertex-distance', why: 'You doubled a^2 instead of doubling a.' },
        { tex: String.raw`$6$`, mistake: 'axis-of-symmetry', why: 'You used the z denominator. The sheets open along x, the positive term.' },
      ],
      steps: [
        String.raw`Two minus signs, positive term $x$: two sheets opening along the $x$-axis.`,
        String.raw`Set $y=z=0$: $x^2=16$, so the tips are at $(\pm4,0,0)$.`,
        String.raw`Between $x=-4$ and $x=4$ there is no surface. The gap is $8$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Describe the trace of $z=x^2-4y^2$ in the plane $z=-4$.`,
      choices: [
        { tex: String.raw`A hyperbola that opens along the $y$-axis`, correct: true },
        { tex: String.raw`A hyperbola that opens along the $x$-axis`, mistake: 'sign', why: 'x^2 - 4y^2 = -4 rearranges to y^2 - x^2/4 = 1, so y is the positive term.' },
        { tex: String.raw`Two intersecting lines`, mistake: 'concept', why: 'Lines only happen at z = 0.' },
        { tex: String.raw`An ellipse`, mistake: 'sign-count', why: 'The squares have opposite signs, so it cannot be an ellipse.' },
        { tex: String.raw`A parabola`, mistake: 'setup', why: 'Parabolas come from the vertical slices x = c or y = c.' },
      ],
      steps: [
        String.raw`Set $z=-4$: $x^2-4y^2=-4$.`,
        String.raw`Divide by $-4$: $y^2-\dfrac{x^2}{4}=1$.`,
        String.raw`Setting $x=0$ gives $y=\pm1$; setting $y=0$ gives nothing. It crosses the $y$-axis, so it opens along $y$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`A surface has these traces: every horizontal slice $z=k$ is an ellipse, and the slices $x=k$ and $y=k$ are hyperbolas. Which equation could it be?`,
      choices: [
        { tex: String.raw`$x^2+\dfrac{y^2}{4}-\dfrac{z^2}{9}=1$`, correct: true },
        { tex: String.raw`$-x^2-\dfrac{y^2}{4}+\dfrac{z^2}{9}=1$`, mistake: 'sign-count', why: 'Two sheets: slices with |z| < 3 are empty, not ellipses.' },
        { tex: String.raw`$x^2+\dfrac{y^2}{4}=\dfrac{z^2}{9}$`, mistake: 'saddle-vs-cone', why: 'The cone slice at z = 0 is a single point, not an ellipse.' },
        { tex: String.raw`$x^2+\dfrac{y^2}{4}+\dfrac{z^2}{9}=1$`, mistake: 'sign-count', why: 'Ellipsoid: its vertical traces are ellipses too, and |z| > 3 has no trace.' },
        { tex: String.raw`$z=x^2+\dfrac{y^2}{4}$`, mistake: 'concept', why: 'Paraboloid: vertical traces are parabolas, and z < 0 is empty.' },
      ],
      steps: [
        String.raw`An ellipse at every height means the $z$ slices never run out. That rules out two sheets, the ellipsoid, and the paraboloid. The cone fails at $z=0$.`,
        String.raw`For $x^2+\frac{y^2}{4}-\frac{z^2}{9}=1$: $z=k$ gives $x^2+\frac{y^2}{4}=1+\frac{k^2}{9}>0$, always an ellipse.`,
        String.raw`$x=k$ gives $\frac{y^2}{4}-\frac{z^2}{9}=1-k^2$, a hyperbola (lines at $k=\pm1$). One sheet.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`Identify $x^2+4z^2-y=0$.`,
      choices: [
        { tex: String.raw`An elliptic paraboloid opening toward $+y$`, correct: true },
        { tex: String.raw`An elliptic paraboloid opening toward $-y$`, mistake: 'sign', why: 'y = x^2 + 4z^2 is never negative, so the bowl opens toward +y.' },
        { tex: String.raw`A hyperbolic paraboloid`, mistake: 'saddle-vs-cone', why: 'x^2 and 4z^2 have the same sign, so it is a bowl, not a saddle.' },
        { tex: String.raw`An elliptic cone along the $y$-axis`, mistake: 'saddle-vs-cone', why: 'A cone needs y^2. Here y is to the first power.' },
        { tex: String.raw`An elliptic cylinder along the $y$-axis`, mistake: 'concept', why: 'A cylinder along y would have no y at all.' },
      ],
      steps: [
        String.raw`Solve for the first-power variable: $y=x^2+4z^2$.`,
        String.raw`Both squares positive: an elliptic paraboloid. The lone variable $y$ is the axis.`,
        String.raw`$y\ge0$ always, so it opens toward $+y$. Slices $y=k>0$ are ellipses $x^2+4z^2=k$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Identify the surface $x^2-y^2+z^2-4x+2y+3=0$.`,
      choices: [
        { tex: String.raw`A cone with vertex $(2,1,0)$ and axis parallel to the $y$-axis`, correct: true },
        { tex: String.raw`A hyperboloid of two sheets along the $y$-direction`, mistake: 'not-standard-form', why: 'You dropped the -4 and +1 from completing the squares. With them, the constants cancel to 0.' },
        { tex: String.raw`A hyperboloid of one sheet`, mistake: 'sign-count', why: 'The right side is 0 after completing the square, which means a cone.' },
        { tex: String.raw`A cone with vertex $(2,1,0)$ and axis parallel to the $z$-axis`, mistake: 'axis-of-symmetry', why: 'In (x-2)^2 + z^2 = (y-1)^2, the variable on its own side is y.' },
        { tex: String.raw`A cone with vertex $(-2,-1,0)$ and axis parallel to the $y$-axis`, mistake: 'sign', why: '(x-2)^2 is centered at x = +2 and (y-1)^2 at y = +1.' },
      ],
      steps: [
        String.raw`$x^2-4x = (x-2)^2-4$ and $-(y^2-2y) = -(y-1)^2+1$.`,
        String.raw`So $(x-2)^2-4-(y-1)^2+1+z^2+3=0$. The constants add to 0.`,
        String.raw`$(x-2)^2+z^2=(y-1)^2$: squares only, right side 0. A cone.`,
        String.raw`The lone variable is $y$, so the axis is parallel to the $y$-axis, through the vertex $(2,1,0)$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: 'x^2 - y^2' },
    { kind: 'paramSurface', x: 'cosh(u)*cos(v)', y: 'cosh(u)*sin(v)', z: 'sinh(u)', u: [-1.2, 1.2], v: [0, '2*pi'] },
  ],
};
