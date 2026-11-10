export default {
  id: 2,
  title: 'Lines and planes',
  section: '13.5',
  exam: 1,
  blurb: 'Write any line as a point plus a direction and any plane as a point plus a normal, then test how lines and planes meet.',
  boiler: ['Line Parameterization', 'Symmetric Equations', 'Planes', 'Normal Vector', 'Point on Plane', 'Intersection of planes', 'Cross Product Planes', 'Perpendicular Planes'],

  sections: [
    {
      id: 'line',
      title: 'A line is a starting point plus a direction',
      body: String.raw`In 2D a line is pinned down by a slope. In 3D there is no single slope, so we use a **direction vector** instead. You need two things: a point $P(x_0,y_0,z_0)$ on the line and a direction $\vec v=\langle a,b,c\rangle$.

Why it works: a point $Q(x,y,z)$ is on the line exactly when the arrow $\overrightarrow{PQ}$ is parallel to $\vec v$, which means $\overrightarrow{PQ} = t\vec v$ for some number $t$. Solve for $Q$:
$$\langle x,y,z\rangle = \langle x_0,y_0,z_0\rangle + t\langle a,b,c\rangle.$$
Think of $t$ as a time dial. At $t=0$ you are at $P$. Turning the dial walks you along $\vec v$, forward or backward.

Split it into components for the **parametric form**: $x = x_0+at$, $y=y_0+bt$, $z=z_0+ct$.

**Example (class).** Line through $P(1,0,2)$ and $Q(-2,4,-3)$. Direction $\overrightarrow{PQ} = \langle -3,4,-5\rangle$. So
$$\langle x,y,z\rangle = \langle 1,0,2\rangle + t\langle -3,4,-5\rangle.$$
You could start at $Q$ instead, or use $\overrightarrow{QP} = \langle 3,-4,5\rangle$. The equations look different but draw the same line. On a multiple-choice exam, check a choice by asking: does its direction match mine up to a multiple, and is its point on my line?`,
    },
    {
      id: 'symmetric',
      title: 'Symmetric form, and what to do with a zero',
      body: String.raw`Solve each parametric equation for $t$ and set them equal:
$$\frac{x-x_0}{a} = \frac{y-y_0}{b} = \frac{z-z_0}{c}.$$
For the class example: $\dfrac{x-1}{-3} = \dfrac{y}{4} = \dfrac{z-2}{-5}$.

**Zero components.** You cannot divide by 0. If a direction component is 0, that coordinate never changes, so you write it as its own equation. Line through $(2,0,-1)$ with direction $\langle 3,0,4\rangle$:
$$\frac{x-2}{3} = \frac{z+1}{4},\qquad y = 0.$$
Do not drop the $y = 0$. Without it, the single equation $\frac{x-2}{3} = \frac{z+1}{4}$ describes a whole plane, not a line.`,
    },
    {
      id: 'two-lines',
      title: 'Two lines: parallel, crossing, or skew',
      body: String.raw`In 3D two lines can relate in three ways:
- **Parallel**: directions are multiples of each other (and the lines are not the same).
- **Intersecting**: exactly one shared point.
- **Skew**: not parallel and never meet. This only happens in 3D: think of one road on a bridge and another passing underneath at an angle.

Class example of skew lines: $t\langle 0,1,1\rangle$ and $\langle 1,0,0\rangle + t\langle 0,1,0\rangle$. Directions are not multiples, and the first line always has $x=0$ while the second always has $x=1$.

**Recipe to test for an intersection.**
1. Check the directions first. Multiples? Then parallel (or the same line).
2. Give the lines *different* parameters, $t$ and $s$. Each line walks at its own pace.
3. Set $x=x$, $y=y$, $z=z$. That is three equations, two unknowns.
4. Solve two of them. Plug into the **third**. If it works, they meet; if not, they are skew.

**Example (class).** $\langle 2t+3,\ 4t+2,\ 3t+5\rangle$ and $\langle s+2,\ 3s-1,\ -5s+10\rangle$. From $x$: $s = 2t+1$. Into $y$: $4t+2 = 6t+2$, so $t=0$, $s=1$. Check $z$: $3(0)+5 = 5$ and $-5(1)+10 = 5$. They match, so the lines meet at $(3,2,5)$.`,
    },
    {
      id: 'plane',
      title: 'A plane is a point plus a normal vector',
      body: String.raw`A plane does not have one direction. It has a whole flat sheet of them. What it does have is one direction it *never* goes: straight out. That arrow is the **normal vector** $\vec n=\langle a,b,c\rangle$.

Why the equation looks the way it does: a point $Q(x,y,z)$ is on the plane through $P(x_0,y_0,z_0)$ exactly when $\overrightarrow{PQ}$ lies flat in the plane, which means it is perpendicular to $\vec n$. Perpendicular means the dot product is 0:
$$\vec n\cdot\overrightarrow{PQ}=0 \quad\Longrightarrow\quad a(x-x_0)+b(y-y_0)+c(z-z_0)=0.$$
Multiplying out gives $ax+by+cz=d$ with $d = ax_0+by_0+cz_0$.

Read it backward too: in $ax+by+cz=d$, **the normal is the coefficients**. $2x-3y-z=6$ has $\vec n=\langle 2,-3,-1\rangle$.

**Example (class).** Through $(1,-1,1)$ with $\vec n=\langle 2,3,-1\rangle$:
$$2(x-1)+3(y+1)-(z-1)=0\ \Longrightarrow\ 2x+3y-z=-2.$$
Check: plug the point in. $2-3-1 = -2$. Good.

**Is a point on the plane?** Plug it in and see if the equation holds. That is all "Point on Plane" questions need.`,
    },
    {
      id: 'three-points',
      title: 'Plane through three points: cross two edges',
      body: String.raw`Three points give you two arrows that lie in the plane. The cross product of two in-plane arrows sticks straight out, so it is a normal.

**Example (class).** $P(2,3,-1)$, $Q(3,5,-1)$, $R(6,2,0)$.
- $\overrightarrow{PQ} = \langle 1,2,0\rangle$, $\overrightarrow{PR} = \langle 4,-1,1\rangle$
- $\vec n = \overrightarrow{PQ}\times\overrightarrow{PR} = \langle 2\cdot1-0,\ -(1\cdot1-0),\ 1\cdot(-1)-2\cdot4\rangle = \langle 2,-1,-9\rangle$
- Plane through $P$: $2(x-2)-(y-3)-9(z+1)=0$, so $2x-y-9z=10$.

Check with the other two points: $Q$ gives $6-5+9 = 10$, $R$ gives $12-2-0=10$. Using $Q$ or $R$ as the base point gives the same plane.

Same trick, different wording: "plane perpendicular to two given planes" means its normal is perpendicular to both of their normals, so $\vec n = \vec n_1\times\vec n_2$.`,
    },
    {
      id: 'relations',
      title: 'Parallel planes, perpendicular planes, and where planes meet',
      body: String.raw`Everything about how planes sit is decided by their normals.
- **Parallel planes**: $\vec n_1 = k\,\vec n_2$.
- **Orthogonal planes**: $\vec n_1\cdot\vec n_2 = 0$.
- **Two non-parallel planes meet in a line.** That line lies in both planes, so it is perpendicular to both normals. Its direction is $\vec n_1\times\vec n_2$.

**Example (class).** $x+3y-2z=1$ and $x+y+z=0$. Subtract: $2y-3z=1$, so $y=\frac{1+3z}{2}$. Then $x = -z-y = \frac{-1-5z}{2}$. Let $z=t$:
$$\langle x,y,z\rangle = \left\langle -\tfrac12,\tfrac12,0\right\rangle + t\left\langle -\tfrac52,\tfrac32,1\right\rangle.$$
Check: $\vec n_1\times\vec n_2 = \langle 1,3,-2\rangle\times\langle 1,1,1\rangle = \langle 5,-3,-2\rangle$, a multiple of $\langle -5,3,2\rangle$.

Faster route on exams: get the direction from the cross product, then find one point by setting one variable to 0 and solving the two equations for the other two.

**Where a line hits a plane.** Plug the parametric $x,y,z$ into the plane's equation, solve for $t$, then plug $t$ back into the line. If the $t$'s cancel and you get something false, the line is parallel to the plane and never hits it.`,
    },
  ],

  formulas: [
    { label: 'Line (vector form)', tex: String.raw`\langle x,y,z\rangle = \langle x_0,y_0,z_0\rangle + t\langle a,b,c\rangle` },
    { label: 'Line (symmetric form)', tex: String.raw`\dfrac{x-x_0}{a}=\dfrac{y-y_0}{b}=\dfrac{z-z_0}{c}` },
    { label: 'Plane', tex: String.raw`a(x-x_0)+b(y-y_0)+c(z-z_0)=0,\quad \vec n=\langle a,b,c\rangle` },
    { label: 'Normal from three points', tex: String.raw`\vec n = \overrightarrow{PQ}\times\overrightarrow{PR}` },
    { label: 'Plane relations', tex: String.raw`\text{parallel: } \vec n_1 = k\vec n_2,\quad \text{orthogonal: } \vec n_1\cdot\vec n_2 = 0` },
    { label: 'Line of intersection', tex: String.raw`\vec v = \vec n_1\times\vec n_2` },
  ],

  mistakes: [
    {
      id: 'normal-vs-direction',
      title: 'Mixing up a normal and a direction',
      wrong: String.raw`"Line parallel to the plane $x-3y+4z=7$" $\Rightarrow$ direction $\langle 1,-3,4\rangle$`,
      right: String.raw`Parallel to the plane means the direction is perpendicular to $\vec n$: $\vec v\cdot\langle 1,-3,4\rangle = 0$`,
      why: 'The normal points out of the plane. A line parallel to the plane runs along it, perpendicular to the normal. A line perpendicular to the plane runs along the normal.',
    },
    {
      id: 'same-parameter',
      title: 'Using the same t for both lines',
      wrong: String.raw`$\langle 2t+3, \dots\rangle = \langle t+2, \dots\rangle$`,
      right: String.raw`$\langle 2t+3, \dots\rangle = \langle s+2, \dots\rangle$`,
      why: 'Two lines can pass through the same point at different parameter values. One shared t forces them to arrive at the same "time" and misses real intersections.',
    },
    {
      id: 'skip-third',
      title: 'Not checking the third equation',
      wrong: String.raw`Solve the $x$ and $y$ equations, report the point`,
      right: String.raw`Plug $t$ and $s$ into the $z$ equation too`,
      why: 'Any two non-parallel lines in the xy shadow cross. Only the third equation tells you whether they actually meet in space or are skew.',
    },
    {
      id: 'skew-vs-parallel',
      title: 'Calling non-parallel lines that do not meet "parallel"',
      wrong: String.raw`"They never meet, so they are parallel"`,
      right: String.raw`Not parallel directions and no common point means **skew**`,
      why: 'Parallel is a fact about directions (multiples). In 3D, lines can miss each other without being parallel.',
    },
    {
      id: 'plane-d',
      title: 'Getting the constant d wrong',
      wrong: String.raw`$\vec n = \langle 3,2,-1\rangle$ through $(2,-1,1)$: $3x+2y-z = 6-2+1 = 5$`,
      right: String.raw`$d = 3(2)+2(-1)+(-1)(1) = 3$`,
      why: 'd is n dotted with the point, signs included. Plug the point back into your final equation to check it.',
    },
  ],

  hook: 'Line = start + t times direction. Plane = normal dotted with (Q - P) equals 0. The coefficients are the normal, and the cross product is the plane-builder.',

  scene: {
    view: { range: 3, z: [-2, 4] },
    camera: [6, -6, 4],
    layers: [
      { id: 'P0', kind: 'point', at: [1, 0, 1], label: 'P' },
      { id: 'dir', kind: 'vector', from: [1, 0, 1], to: [2, 1, 1.5], color: 'road', label: 'v' },
      { id: 'line', kind: 'curve', x: '1 + t', y: 't', z: '1 + 0.5*t', t: [-3, 2], color: 'road', arrow: true },
      { id: 'pl1', kind: 'plane', normal: [1, 1, 1], point: [1, 1, 1], size: 3 },
      { id: 'n1', kind: 'vector', from: [1, 1, 1], to: [2, 2, 2], color: 'revision', label: 'n1' },
      { id: 'inPlane', kind: 'vector', from: [1, 1, 1], to: [2, 0, 1], color: 'wood', label: 'PQ' },
      { id: 'Q', kind: 'point', at: [1, 1, 1], label: 'P0' },
      { id: 'pl2', kind: 'plane', normal: [1, -1, 0], point: [1, 1, 1], size: 3 },
      { id: 'n2', kind: 'vector', from: [1, 1, 1], to: [2, 0, 1], color: 'water', label: 'n2' },
      { id: 'meet', kind: 'curve', x: 't', y: 't', z: '3 - 2*t', t: [-0.5, 2.5], color: 'ink' },
      { id: 'meetDir', kind: 'vector', from: [1, 1, 1], to: [2, 2, -1], color: 'ink', label: 'n1 x n2' },
      { id: 'skew1', kind: 'curve', x: '0', y: 't', z: 't', t: [-2, 2.5], color: 'road' },
      { id: 'skew2', kind: 'curve', x: '1', y: 't', z: '0', t: [-2.5, 2.5], color: 'water' },
    ],
    steps: [
      { label: 'Start', show: ['P0', 'dir', 'line'], caption: String.raw`A line needs a point $P(1,0,1)$ and a direction $\vec v=\langle 1,1,\tfrac12\rangle$. Every point on it is $P + t\vec v$; the arrow shows increasing $t$.` },
      { label: 'Plane', show: ['pl1', 'Q', 'n1', 'inPlane'], caption: String.raw`The plane $x+y+z=3$ with normal $\vec n_1=\langle 1,1,1\rangle$. The green arrow lies in the plane, so its dot product with $\vec n_1$ is 0. That is the whole plane equation.` },
      { label: 'Second plane', show: ['pl1', 'pl2', 'Q', 'n1', 'n2'], caption: String.raw`Add the plane $x-y=0$ with normal $\vec n_2=\langle 1,-1,0\rangle$. Here $\vec n_1\cdot\vec n_2=0$, so the planes are perpendicular. Notice $\vec n_2$ lies flat inside the first plane.` },
      { label: 'Intersection', show: ['pl1', 'pl2', 'meet', 'meetDir'], caption: String.raw`The planes meet in a line that lies in both, so it is perpendicular to both normals. Its direction is $\vec n_1\times\vec n_2 = \langle 1,1,-2\rangle$, and it passes through $(1,1,1)$.` },
      { label: 'Skew', show: ['skew1', 'skew2'], caption: String.raw`The class example $t\langle 0,1,1\rangle$ and $\langle 1,0,0\rangle+t\langle 0,1,0\rangle$. Rotate the view: they are not parallel, but one lives in $x=0$ and the other in $x=1$, so they never touch. Skew.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Find the plane through $P(2,-1,1)$ that is perpendicular to the line through $A(1,0,3)$ and $B(4,2,2)$.`,
      choices: [
        { tex: String.raw`$3x+2y-z=3$`, correct: true },
        { tex: String.raw`$3x+2y-z=5$`, mistake: 'plane-d', why: 'd = 3(2) + 2(-1) - (1) = 3. You added the z term instead of subtracting it.' },
        { tex: String.raw`$3x+2y-z=0$`, mistake: 'setup', why: 'You used point A. The plane must pass through P.' },
        { tex: String.raw`$3x+2y-z=-3$`, mistake: 'sign', why: 'Moving the constant across the equals sign flipped its sign.' },
        { tex: String.raw`$\langle x,y,z\rangle = \langle 2,-1,1\rangle + t\langle 3,2,-1\rangle$`, mistake: 'units', why: 'That is the line through P along AB, not a plane.' },
      ],
      steps: [
        String.raw`A plane perpendicular to a line uses the line's direction as its normal: $\vec n = \overrightarrow{AB} = \langle 3,2,-1\rangle$.`,
        String.raw`$3(x-2)+2(y+1)-(z-1)=0$.`,
        String.raw`Expand: $3x-6+2y+2-z+1=0$, so $3x+2y-z=3$.`,
        String.raw`Check: $P$ gives $6-2-1 = 3$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Give symmetric equations for the line through $(2,0,-1)$ and $(5,0,3)$.`,
      choices: [
        { tex: String.raw`$\dfrac{x-2}{3}=\dfrac{z+1}{4},\ \ y=0$`, correct: true },
        { tex: String.raw`$\dfrac{x-2}{3}=\dfrac{y}{0}=\dfrac{z+1}{4}$`, mistake: 'concept', why: 'You cannot divide by 0. A zero direction component becomes its own equation, y = 0.' },
        { tex: String.raw`$\dfrac{x-2}{3}=\dfrac{z+1}{4}$`, mistake: 'concept', why: 'Without y = 0 this single equation is a plane, not a line.' },
        { tex: String.raw`$\dfrac{x+2}{3}=\dfrac{z-1}{4},\ \ y=0$`, mistake: 'sign', why: 'The point is (2, 0, -1), so it is x - 2 and z - (-1) = z + 1.' },
        { tex: String.raw`$\dfrac{x-3}{2}=\dfrac{z-4}{-1},\ \ y=0$`, mistake: 'setup', why: 'You swapped the roles: the point goes in the numerator, the direction in the denominator.' },
      ],
      steps: [
        String.raw`Direction: $\langle 5-2,\ 0-0,\ 3-(-1)\rangle = \langle 3,0,4\rangle$.`,
        String.raw`$x = 2+3t$, $y = 0$, $z = -1+4t$.`,
        String.raw`Solve the $x$ and $z$ equations for $t$ and set equal. The $y$ equation stays separate: $\dfrac{x-2}{3}=\dfrac{z+1}{4}$, $y=0$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Classify the lines $L_1:\ \langle 1+t,\ 2-t,\ 2t\rangle$ and $L_2:\ \langle 3+s,\ 1+2s,\ 1-s\rangle$.`,
      choices: [
        { tex: String.raw`Skew`, correct: true },
        { tex: String.raw`Parallel`, mistake: 'skew-vs-parallel', why: 'The directions <1,-1,2> and <1,2,-1> are not multiples, so the lines are not parallel.' },
        { tex: String.raw`They intersect at $\left(\tfrac83,\tfrac13,\tfrac{10}{3}\right)$`, mistake: 'skip-third', why: 'That point comes from solving only the x and y equations. The z values (10/3 vs 4/3) do not match.' },
        { tex: String.raw`They intersect at $\left(\tfrac83,\tfrac13,\tfrac43\right)$`, mistake: 'skip-third', why: 'This is the point on L2 at s = -1/3. The z equation fails, so L1 does not pass through it.' },
        { tex: String.raw`They are the same line`, mistake: 'concept', why: 'The same line would need parallel directions.' },
      ],
      steps: [
        String.raw`Directions $\langle 1,-1,2\rangle$ and $\langle 1,2,-1\rangle$ are not multiples: not parallel.`,
        String.raw`$x$: $1+t = 3+s$, so $t = 2+s$.`,
        String.raw`$y$: $2-t = 1+2s$ becomes $-s = 1+2s$, so $s=-\tfrac13$, $t = \tfrac53$.`,
        String.raw`$z$: $2t = \tfrac{10}{3}$ but $1-s = \tfrac43$. No match, so no intersection. Not parallel and not meeting: skew.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Find the line of intersection of the planes $x+y-z=2$ and $2x-y+3z=1$.`,
      choices: [
        { tex: String.raw`$\langle 1,1,0\rangle + t\langle 2,-5,-3\rangle$`, correct: true },
        { tex: String.raw`$\langle 1,1,0\rangle + t\langle 2,5,-3\rangle$`, mistake: 'sign', why: 'The j component of the cross product needs the extra minus: -(3 + 2) = -5.' },
        { tex: String.raw`$\langle 1,1,-1\rangle + t\langle 2,-1,3\rangle$`, mistake: 'normal-vs-direction', why: 'You used the two normals as a point and a direction. The line runs perpendicular to both normals.' },
        { tex: String.raw`$\langle 0,0,0\rangle + t\langle 2,-5,-3\rangle$`, mistake: 'setup', why: 'Right direction, but the origin is on neither plane (0 is not 2).' },
        { tex: String.raw`$\langle 2,-5,-3\rangle + t\langle 1,1,0\rangle$`, mistake: 'setup', why: 'Point and direction swapped. (2, -5, -3) is not on either plane.' },
      ],
      steps: [
        String.raw`Direction: $\vec n_1\times\vec n_2 = \langle 1,1,-1\rangle\times\langle 2,-1,3\rangle = \langle 3-1,\ -(3+2),\ -1-2\rangle = \langle 2,-5,-3\rangle$.`,
        String.raw`A point: set $z=0$. Then $x+y=2$ and $2x-y=1$. Add: $3x=3$, so $x=1$, $y=1$.`,
        String.raw`Line: $\langle 1,1,0\rangle + t\langle 2,-5,-3\rangle$.`,
        String.raw`Check $(1,1,0)$: $1+1-0=2$ and $2-1+0=1$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Find the plane through $(0,2,-1)$ that is perpendicular to both planes $x+2y-z=4$ and $3x-y+2z=0$.`,
      choices: [
        { tex: String.raw`$3x-5y-7z=-3$`, correct: true },
        { tex: String.raw`$3x+5y-7z=17$`, mistake: 'sign', why: 'Lost the minus on the j component of n1 x n2, which should be -(2 + 3) = -5.' },
        { tex: String.raw`$x+2y-z=5$`, mistake: 'normal-vs-direction', why: 'Using n1 as the normal makes your plane parallel to the first plane, not perpendicular.' },
        { tex: String.raw`$4x+y+z=1$`, mistake: 'normal-vs-direction', why: 'n1 + n2 is not perpendicular to n1 or n2. You need the cross product.' },
        { tex: String.raw`$3x-5y-7z=3$`, mistake: 'plane-d', why: 'd = 3(0) - 5(2) - 7(-1) = -3. Watch the signs.' },
      ],
      steps: [
        String.raw`Perpendicular to a plane means our normal is perpendicular to that plane's normal. Perpendicular to both: $\vec n = \vec n_1\times\vec n_2$.`,
        String.raw`$\langle 1,2,-1\rangle\times\langle 3,-1,2\rangle = \langle 4-1,\ -(2+3),\ -1-6\rangle = \langle 3,-5,-7\rangle$.`,
        String.raw`$3(x-0)-5(y-2)-7(z+1)=0$, so $3x-5y-7z=-3$.`,
        String.raw`Check: $\vec n\cdot\vec n_1 = 3-10+7=0$ and $\vec n\cdot\vec n_2 = 9+5-14=0$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`Where does the line $x=1+2t$, $y=-t$, $z=3+t$ meet the plane $2x+y-z=6$?`,
      choices: [
        { tex: String.raw`$\left(8,-\tfrac72,\tfrac{13}{2}\right)$`, correct: true },
        { tex: String.raw`$t=\tfrac72$`, mistake: 'units', why: 'That is the parameter value. Plug it into the line to get the point.' },
        { tex: String.raw`$\left(6,-\tfrac52,\tfrac{11}{2}\right)$`, mistake: 'arith', why: 'The constants combine to 2 - 3 = -1, so the equation is 2t - 1 = 6, not 2t + 1 = 6.' },
        { tex: String.raw`$\left(8,\tfrac72,\tfrac{13}{2}\right)$`, mistake: 'sign', why: 'y = -t, so at t = 7/2 the y-coordinate is negative.' },
        { tex: String.raw`They never meet; the line is parallel to the plane`, mistake: 'normal-vs-direction', why: 'Parallel would need direction dot normal = 0, but <2,-1,1>·<2,1,-1> = 2.' },
      ],
      steps: [
        String.raw`Substitute: $2(1+2t) + (-t) - (3+t) = 6$.`,
        String.raw`$2+4t-t-3-t = 6$, so $2t-1=6$ and $t=\tfrac72$.`,
        String.raw`Point: $\left(1+7,\ -\tfrac72,\ 3+\tfrac72\right) = \left(8,-\tfrac72,\tfrac{13}{2}\right)$.`,
        String.raw`Check: $16-\tfrac72-\tfrac{13}{2} = 16-10 = 6$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`For what value of $k$ is the line $\langle 1,0,2\rangle + t\langle 2,k,1\rangle$ parallel to the plane $x-3y+4z=7$?`,
      choices: [
        { tex: String.raw`$k=2$`, correct: true },
        { tex: String.raw`$k=-2$`, mistake: 'sign', why: '2 - 3k + 4 = 0 gives 3k = 6, so k = +2.' },
        { tex: String.raw`$k=\tfrac23$`, mistake: 'arith', why: 'You dropped the z part, 1 times 4, from the dot product.' },
        { tex: String.raw`$k=-6$`, mistake: 'normal-vs-direction', why: 'You tried to make the direction a multiple of the normal (scale 2 from the x-components). That would make the line perpendicular to the plane.' },
        { tex: String.raw`No such $k$`, mistake: 'concept', why: 'Parallel to a plane only needs one condition: direction dot normal = 0.' },
      ],
      steps: [
        String.raw`Parallel to the plane means the direction runs along the plane, so it is perpendicular to $\vec n = \langle 1,-3,4\rangle$.`,
        String.raw`$\langle 2,k,1\rangle\cdot\langle 1,-3,4\rangle = 2-3k+4 = 0$, so $k=2$.`,
        String.raw`Bonus check: the point $(1,0,2)$ gives $1+8=9\ne7$, so the line is off the plane (parallel, not lying in it).`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'plane', normal: [1, 1, 1], point: [1, 1, 1], size: 3 },
    { kind: 'plane', normal: [1, -1, 0], point: [1, 1, 1], size: 3 },
    { kind: 'curve', x: 't', y: 't', z: '3 - 2*t', t: [-0.5, 2.5], color: 'ink' },
  ],
};
