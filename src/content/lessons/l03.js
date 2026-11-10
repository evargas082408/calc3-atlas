export default {
  id: 3,
  title: 'Cylinders and quadric surfaces, part 1',
  section: '13.6',
  exam: 1,
  blurb: 'Read a 3D surface off its equation by slicing it: cylinders, spheres, cones, and paraboloids.',
  boiler: ['Traces', 'Surface ID', 'Quadratic surfaces'],

  sections: [
    {
      id: 'free',
      title: 'The same equation means different things in different spaces',
      body: String.raw`What is $x=2$? On a number line it is a point. In the $xy$-plane it is a vertical line, because $y$ is free to be anything: stack the points $(2,y)$ for every $y$. In 3D both $y$ and $z$ are free, so you stack those lines in the $z$ direction and get a **plane** perpendicular to the $x$-axis.

The lesson: a variable that does not appear in the equation is **free**. The surface stretches forever in that direction. In this course, assume 3D unless told otherwise.`,
    },
    {
      id: 'cylinders',
      title: 'Cylinders: one variable missing',
      body: String.raw`$x^2+y^2=1$ in the $xy$-plane is a circle of radius 1. In 3D, $z$ is missing, so it is free. Stack that circle at every height and you get a **circular cylinder parallel to the $z$-axis**.

The rule: **the missing variable is the axis.**
- $x^2+z^2=1$: $y$ is missing, so the cylinder runs along the $y$-axis.
- $y^2+z^2=1$: $x$ is missing, so it runs along the $x$-axis.

"Cylinder" means any curve slid along a line, not just circles. $x = 7-z^2$ has no $y$, so take the parabola $x=7-z^2$ in the $xz$-plane (vertex at $(7,0)$, opening toward $-x$) and slide it along the $y$-axis. That is a **parabolic cylinder**.`,
    },
    {
      id: 'traces',
      title: 'Traces: slice it and look at the slices',
      body: String.raw`You cannot draw a 3D surface from its equation directly. You can draw 2D curves. So slice the surface with flat planes and look at the cut. Each cut is a **trace**.
- $z=k$: a horizontal slice, parallel to the $xy$-plane
- $x=k$: a slice parallel to the $yz$-plane
- $y=k$: a slice parallel to the $xz$-plane

The method:
1. Intercepts: where does it cross each axis? (Set the other two variables to 0.)
2. Traces: plug in $x=k$, $y=k$, $z=k$ and name the 2D curve you get. Watch how it changes as $k$ changes.
3. Stack the traces into a picture.

It is like a CT scan: a stack of flat slices tells you the whole 3D shape.`,
    },
    {
      id: 'sphere',
      title: 'Sphere: circles that grow, then shrink',
      body: String.raw`$x^2+y^2+z^2=25$ is a sphere of radius 5 centered at the origin. Rewrite it as $x^2+y^2=25-z^2$ to read the horizontal traces:
- $z=0$: $x^2+y^2=25$, radius 5
- $z=\pm4$: $x^2+y^2=9$, radius 3
- $z=\pm5$: $x^2+y^2=0$, just the points $(0,0,\pm5)$
- $|z|>5$: $25-z^2<0$, nothing at all

The radius is $\sqrt{25-z^2}$, not $25-z^2$. Take the square root before you call something a radius.

**Is it a sphere? Complete the square.** $x^2+y^2+z^2-2x=4$. Group the $x$ terms: $x^2-2x = (x-1)^2-1$. The $-1$ has to go somewhere, so add 1 to both sides:
$$(x-1)^2+y^2+z^2=5.$$
Center $(1,0,0)$, radius $\sqrt5$.`,
    },
    {
      id: 'cone',
      title: 'Cone: circles that grow in a straight line',
      body: String.raw`$x^2+y^2=z^2$. Horizontal traces: at $z=k$ you get $x^2+y^2=k^2$, a circle of radius $|k|$. Radius 1 at height 1, radius 2 at height 2, radius 3 at height 3. Same at negative heights. At $z=0$ it is just the origin.

Horizontal circles alone could also come from a paraboloid. To tell them apart, look at a vertical trace:
- $x=0$: $y^2=z^2$, so $y=z$ or $y=-z$: **two straight lines** through the origin.
- $y=0$: $x=\pm z$, two more lines.

Circles growing at a steady rate plus straight-line side views: that is a **double cone**, two ice cream cones meeting at the tip.`,
    },
    {
      id: 'paraboloid',
      title: 'Paraboloid: circles that grow like a square root',
      body: String.raw`$z=x^2+y^2$. Since $x^2+y^2\ge0$, there are no traces below $z=0$.
- $z=0$: the single point at the origin (the vertex)
- $z=1$: radius 1
- $z=2$: radius $\sqrt2$
- $z=4$: radius 2

The radius is $\sqrt z$, so the bowl widens fast at the bottom and slowly higher up. The vertical traces settle it: $x=0$ gives $z=y^2$ and $y=0$ gives $z=x^2$, upward **parabolas**.

**Cone vs paraboloid at a glance.** Both have circular horizontal traces. In the cone $z$ is squared ($x^2+y^2=z^2$, radius $|z|$, side view is lines). In the paraboloid $z$ is to the first power ($x^2+y^2=z$, radius $\sqrt z$, side view is parabolas).`,
    },
  ],

  formulas: [
    { label: 'Cylinder rule', tex: String.raw`\text{a missing variable is free: the surface runs along that axis}` },
    { label: 'Sphere', tex: String.raw`(x-a)^2+(y-b)^2+(z-c)^2=r^2` },
    { label: 'Double cone (axis z)', tex: String.raw`x^2+y^2=z^2\quad(\text{trace } z=k:\ \text{radius } |k|)` },
    { label: 'Paraboloid (axis z)', tex: String.raw`z=x^2+y^2\quad(\text{trace } z=k:\ \text{radius } \sqrt k)` },
    { label: 'Completing the square', tex: String.raw`x^2+bx = \left(x+\tfrac b2\right)^2-\tfrac{b^2}{4}` },
  ],

  mistakes: [
    {
      id: 'cylinder-axis',
      title: 'Putting the cylinder on the wrong axis',
      wrong: String.raw`$x^2+z^2=1$ is a cylinder along the $z$-axis`,
      right: String.raw`$y$ is missing, so it runs along the $y$-axis`,
      why: 'The axis of a cylinder is the variable that does not appear. The two variables that do appear describe the cross-section.',
    },
    {
      id: 'circle-not-cylinder',
      title: 'Calling a 3D cylinder a circle',
      wrong: String.raw`$x^2+y^2=1$ in $\mathbb R^3$ is a circle`,
      right: String.raw`It is a circular cylinder; the circle is only its $z=0$ trace`,
      why: 'In 3D the missing variable is free, so the circle is copied at every value of it.',
    },
    {
      id: 'cone-vs-paraboloid',
      title: 'Mixing up cones and paraboloids',
      wrong: String.raw`$x^2+y^2=z$ is a cone`,
      right: String.raw`$x^2+y^2=z$ is a paraboloid; $x^2+y^2=z^2$ is a cone`,
      why: 'Both have circular slices. Look at the power on the lone variable: squared gives a cone (straight sides), first power gives a paraboloid (curved sides).',
    },
    {
      id: 'radius-squared',
      title: 'Reading r squared as the radius',
      wrong: String.raw`$x^2+y^2+z^2=16$ at $z=2$: circle of radius 12`,
      right: String.raw`$x^2+y^2=12$, radius $\sqrt{12}=2\sqrt3$`,
      why: 'The number on the right side of a circle or sphere equation is the radius squared.',
    },
    {
      id: 'complete-square',
      title: 'Completing the square on one side only',
      wrong: String.raw`$x^2+4x+y^2=3\ \Rightarrow\ (x+2)^2+y^2=3$`,
      right: String.raw`$(x+2)^2-4+y^2=3\ \Rightarrow\ (x+2)^2+y^2=7$`,
      why: 'Writing (x+2)^2 secretly adds 4 to the left side. Add the same 4 to the right side.',
    },
  ],

  hook: 'Missing variable = the axis it slides along. Slice it like a CT scan: circles growing like |z| is a cone, like sqrt(z) is a paraboloid, growing then shrinking is a sphere.',

  scene: {
    view: { range: 3, z: [-2.5, 3] },
    camera: [6, -6, 4],
    layers: [
      { id: 'cyl', kind: 'paramSurface', x: 'cos(v)', y: 'sin(v)', z: 'u', u: [-2, 2], v: [0, '2*pi'], colormap: 'water', opacity: 0.55 },
      { id: 'cylTrace', kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: '0', t: [0, '2*pi'], color: 'ink' },
      { id: 'cylTrace2', kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: '1.5', t: [0, '2*pi'], color: 'ink' },
      { id: 'parCyl', kind: 'paramSurface', x: '2 - u^2', y: 'v', z: 'u', u: [-1.8, 1.8], v: [-2.5, 2.5], colormap: 'terrain', opacity: 0.7 },
      { id: 'parTrace', kind: 'curve', x: '2 - t^2', y: '0', z: 't', t: [-1.8, 1.8], color: 'road' },
      { id: 'sph', kind: 'paramSurface', x: '2*sin(u)*cos(v)', y: '2*sin(u)*sin(v)', z: '2*cos(u)', u: [0, 'pi'], v: [0, '2*pi'], colormap: 'viridis', opacity: 0.45 },
      { id: 'sph0', kind: 'curve', x: '2*cos(t)', y: '2*sin(t)', z: '0', t: [0, '2*pi'], color: 'ink' },
      { id: 'sph1', kind: 'curve', x: 'sqrt(3)*cos(t)', y: 'sqrt(3)*sin(t)', z: '1', t: [0, '2*pi'], color: 'ink' },
      { id: 'sph1m', kind: 'curve', x: 'sqrt(3)*cos(t)', y: 'sqrt(3)*sin(t)', z: '-1', t: [0, '2*pi'], color: 'ink' },
      { id: 'sph2', kind: 'curve', x: '0.6*cos(t)', y: '0.6*sin(t)', z: '1.908', t: [0, '2*pi'], color: 'ink' },
      { id: 'cone', kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: 'u', u: [-2.2, 2.2], v: [0, '2*pi'], colormap: 'inferno', opacity: 0.5 },
      { id: 'cone1', kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: '1', t: [0, '2*pi'], color: 'ink' },
      { id: 'cone2', kind: 'curve', x: '2*cos(t)', y: '2*sin(t)', z: '2', t: [0, '2*pi'], color: 'ink' },
      { id: 'cone2m', kind: 'curve', x: '2*cos(t)', y: '2*sin(t)', z: '-2', t: [0, '2*pi'], color: 'ink' },
      { id: 'coneL1', kind: 'curve', x: '0', y: 't', z: 't', t: [-2.2, 2.2], color: 'road' },
      { id: 'coneL2', kind: 'curve', x: '0', y: 't', z: '-t', t: [-2.2, 2.2], color: 'road' },
      { id: 'parab', kind: 'surface', z: 'x^2 + y^2', domain: { r: [0, 1.6] }, colormap: 'terrain', opacity: 0.6 },
      { id: 'parab1', kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: '1', t: [0, '2*pi'], color: 'ink' },
      { id: 'parab2', kind: 'curve', x: 'sqrt(2)*cos(t)', y: 'sqrt(2)*sin(t)', z: '2', t: [0, '2*pi'], color: 'ink' },
      { id: 'parabSide', kind: 'curve', x: '0', y: 't', z: 't^2', t: [-1.6, 1.6], color: 'road' },
    ],
    steps: [
      { label: 'Start', show: ['cylTrace', 'cylTrace2', 'cyl'], caption: String.raw`$x^2+y^2=1$ in 3D. There is no $z$ in the equation, so the circle is copied at every height: a cylinder along the $z$-axis.` },
      { label: 'Parabolic cylinder', show: ['parCyl', 'parTrace'], caption: String.raw`$x=2-z^2$ has no $y$. Take the parabola in the $xz$-plane (red) and slide it along the $y$-axis. Any curve slid along a line counts as a cylinder.` },
      { label: 'Sphere', show: ['sph', 'sph0', 'sph1', 'sph1m', 'sph2'], caption: String.raw`$x^2+y^2+z^2=4$ sliced at $z=k$ gives circles of radius $\sqrt{4-k^2}$. They grow, peak at the equator, and shrink to points at $z=\pm2$.` },
      { label: 'Cone', show: ['cone', 'cone1', 'cone2', 'cone2m', 'coneL1', 'coneL2'], caption: String.raw`$x^2+y^2=z^2$: the slice at height $k$ has radius $|k|$. The $x=0$ trace is the pair of lines $y=\pm z$ (red). Straight sides mean cone.` },
      { label: 'Paraboloid', show: ['parab', 'parab1', 'parab2', 'parabSide'], caption: String.raw`$z=x^2+y^2$: radius 1 at $z=1$, only $\sqrt2$ at $z=2$. The radius grows like $\sqrt z$ and the side view is the parabola $z=y^2$. Curved sides mean paraboloid.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`In $\mathbb R^3$, what is the surface $y^2+z^2=9$?`,
      choices: [
        { tex: String.raw`A circular cylinder of radius 3 along the $x$-axis`, correct: true },
        { tex: String.raw`A circular cylinder of radius 3 along the $z$-axis`, mistake: 'cylinder-axis', why: 'z appears in the equation. The missing variable, x, is the axis.' },
        { tex: String.raw`A circle of radius 3 in the $yz$-plane`, mistake: 'circle-not-cylinder', why: 'That is only the x = 0 trace. In 3D, x is free, so the circle repeats for every x.' },
        { tex: String.raw`A sphere of radius 3`, mistake: 'concept', why: 'A sphere needs all three variables squared.' },
        { tex: String.raw`A circular cylinder of radius 9 along the $x$-axis`, mistake: 'radius-squared', why: '9 is the radius squared. The radius is 3.' },
      ],
      steps: [
        String.raw`$x$ does not appear, so $x$ is free.`,
        String.raw`For each $x$, the trace is $y^2+z^2=9$: a circle of radius 3.`,
        String.raw`Stacked along the $x$-axis: a circular cylinder of radius 3 around the $x$-axis.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Describe the trace of the sphere $x^2+y^2+z^2=16$ in the plane $z=2$.`,
      choices: [
        { tex: String.raw`A circle of radius $2\sqrt3$`, correct: true },
        { tex: String.raw`A circle of radius 12`, mistake: 'radius-squared', why: 'x^2 + y^2 = 12 means the radius squared is 12.' },
        { tex: String.raw`A circle of radius $\sqrt{14}$`, mistake: 'arith', why: 'You subtracted z = 2 instead of z^2 = 4.' },
        { tex: String.raw`A circle of radius 4`, mistake: 'setup', why: 'That is the equator, the z = 0 trace.' },
        { tex: String.raw`A single point`, mistake: 'concept', why: 'Points only happen at the poles z = 4 and z = -4.' },
      ],
      steps: [
        String.raw`Set $z=2$: $x^2+y^2+4=16$.`,
        String.raw`$x^2+y^2=12$.`,
        String.raw`Radius $\sqrt{12}=2\sqrt3\approx3.46$, a circle at height 2.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 1,
      prompt: String.raw`What is the trace of the cone $x^2+y^2=z^2$ in the plane $x=0$?`,
      choices: [
        { tex: String.raw`The two lines $z=y$ and $z=-y$`, correct: true },
        { tex: String.raw`The single line $z=y$`, mistake: 'concept', why: 'y^2 = z^2 has two solutions, z = y and z = -y. Taking a square root gives plus or minus.' },
        { tex: String.raw`The single point $(0,0,0)$`, mistake: 'setup', why: 'That is the z = 0 trace.' },
        { tex: String.raw`The parabola $z=y^2$`, mistake: 'cone-vs-paraboloid', why: 'That is the side view of the paraboloid z = x^2 + y^2.' },
        { tex: String.raw`A circle of radius 1`, mistake: 'setup', why: 'Circles come from horizontal slices z = k, not from x = 0.' },
      ],
      steps: [
        String.raw`Set $x=0$: $y^2=z^2$.`,
        String.raw`So $z = y$ or $z=-y$.`,
        String.raw`Two lines crossing at the origin. Straight-line side views are the signature of a cone.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Find the center and radius of the sphere $x^2+y^2+z^2+4x-6z=3$.`,
      choices: [
        { tex: String.raw`Center $(-2,0,3)$, radius 4`, correct: true },
        { tex: String.raw`Center $(2,0,-3)$, radius 4`, mistake: 'sign', why: '(x+2)^2 is centered at x = -2, and (z-3)^2 at z = 3.' },
        { tex: String.raw`Center $(-2,0,3)$, radius $\sqrt3$`, mistake: 'complete-square', why: 'Completing the squares adds 4 and 9 to the left; add them to the right too: 3 + 4 + 9 = 16.' },
        { tex: String.raw`Center $(-2,0,3)$, radius 16`, mistake: 'radius-squared', why: '16 is the radius squared.' },
        { tex: String.raw`Center $(-4,0,6)$, radius 4`, mistake: 'arith', why: 'Halve the linear coefficient: x^2 + 4x = (x+2)^2 - 4.' },
      ],
      steps: [
        String.raw`Group: $(x^2+4x) + y^2 + (z^2-6z) = 3$.`,
        String.raw`Complete each square: $(x+2)^2-4 + y^2 + (z-3)^2-9 = 3$.`,
        String.raw`Move the constants: $(x+2)^2+y^2+(z-3)^2 = 16$.`,
        String.raw`Center $(-2,0,3)$, radius $\sqrt{16}=4$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Which equation is a double cone whose axis is the $y$-axis?`,
      choices: [
        { tex: String.raw`$x^2+z^2=y^2$`, correct: true },
        { tex: String.raw`$x^2+z^2=y$`, mistake: 'cone-vs-paraboloid', why: 'y to the first power gives a paraboloid opening along +y.' },
        { tex: String.raw`$x^2+y^2=z^2$`, mistake: 'setup', why: 'This cone opens along the z-axis, the variable that stands alone.' },
        { tex: String.raw`$x^2+z^2=4$`, mistake: 'concept', why: 'y is missing, so this is a cylinder along the y-axis, not a cone.' },
        { tex: String.raw`$y^2=x^2+z^2+1$`, mistake: 'concept', why: 'The +1 means the traces never shrink to a point; this is a hyperboloid of two sheets (next lesson).' },
      ],
      steps: [
        String.raw`For a cone along the $y$-axis, the slices $y=k$ should be circles whose radius grows like $|k|$.`,
        String.raw`$x^2+z^2=y^2$ at $y=k$ gives $x^2+z^2=k^2$, radius $|k|$.`,
        String.raw`The trace $z=0$ gives $x=\pm y$: straight lines. It is the cone.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`What is the trace of $z=2x^2+2y^2$ in the plane $z=8$?`,
      choices: [
        { tex: String.raw`A circle of radius 2`, correct: true },
        { tex: String.raw`A circle of radius 4`, mistake: 'radius-squared', why: 'x^2 + y^2 = 4 has radius 2, not 4.' },
        { tex: String.raw`A circle of radius $2\sqrt2$`, mistake: 'arith', why: 'You forgot to divide by the 2 first: 2(x^2 + y^2) = 8 gives x^2 + y^2 = 4.' },
        { tex: String.raw`A parabola`, mistake: 'setup', why: 'Parabolas come from vertical slices x = k or y = k.' },
        { tex: String.raw`Nothing; there is no trace at $z=8$`, mistake: 'concept', why: 'The bowl opens upward, so every height z > 0 has a trace.' },
      ],
      steps: [
        String.raw`Set $z=8$: $8 = 2x^2+2y^2$.`,
        String.raw`Divide by 2: $x^2+y^2=4$.`,
        String.raw`A circle of radius 2 at height 8.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Which description fits the surface $x=4-y^2$ in $\mathbb R^3$?`,
      choices: [
        { tex: String.raw`A parabolic cylinder parallel to the $z$-axis`, correct: true },
        { tex: String.raw`A parabolic cylinder parallel to the $x$-axis`, mistake: 'cylinder-axis', why: 'x appears in the equation. The missing variable is z, so that is the axis.' },
        { tex: String.raw`A parabolic cylinder parallel to the $y$-axis`, mistake: 'cylinder-axis', why: 'y is in the equation. The parabola lives in the xy-plane and slides along z.' },
        { tex: String.raw`A parabola in the $xy$-plane`, mistake: 'circle-not-cylinder', why: 'That is only the z = 0 trace. In 3D, z is free.' },
        { tex: String.raw`A paraboloid`, mistake: 'cone-vs-paraboloid', why: 'A paraboloid needs two squared variables, like x = 4 - y^2 - z^2.' },
      ],
      steps: [
        String.raw`$z$ is missing, so $z$ is free and the surface runs along the $z$-axis.`,
        String.raw`The cross-section is $x=4-y^2$: a parabola in the $xy$-plane with vertex $(4,0)$ opening toward $-x$.`,
        String.raw`Slide it along $z$: a parabolic cylinder parallel to the $z$-axis.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: 'x^2 + y^2' },
    { kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: 'u', u: [-2, 2], v: [0, '2*pi'] },
  ],
};
