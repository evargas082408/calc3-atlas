export default {
  id: 1,
  title: 'Review of vectors: dot and cross products',
  section: '13.1-13.4',
  exam: 1,
  blurb: 'Build vectors from points, measure them, and multiply them two ways: the dot product for angles, the cross product for perpendiculars and area.',
  boiler: ['Cross Product', 'Geometric Dot Product', 'Orthogonality', 'Projection', 'Cross Product For Area'],

  sections: [
    {
      id: 'arrows',
      title: 'Vectors are arrows you can slide around',
      body: String.raw`A vector has a length and a direction, and nothing else. It has no fixed starting spot, so you can slide it anywhere without changing it. We record a vector by how far it goes in each direction: $\langle a, b, c\rangle$.

Keep points and vectors apart. $(1,2,3)$ with round brackets is a location. $\langle 1,2,3\rangle$ with angle brackets is a trip: 1 over, 2 across, 3 up. The arrow from the origin to the point $P$ has the same numbers as $P$.

**Head minus tail.** To get the vector from $P$ to $Q$, subtract the start from the end, one component at a time:
$$\overrightarrow{PQ} = Q - P.$$
Example from class: $P(2,-1)$, $Q(3,5)$. Then $\overrightarrow{PQ} = \langle 3-2,\ 5-(-1)\rangle = \langle 1, 6\rangle$. Going back the other way flips every sign: $\overrightarrow{QP} = \langle -1,-6\rangle = -\overrightarrow{PQ}$.

Keep the components in x, y, z order. A typo in some copies of the notes writes the 2D version as $\langle y_2-y_1,\ x_2-x_1\rangle$. It is $\langle x_2-x_1,\ y_2-y_1\rangle$.`,
    },
    {
      id: 'length',
      title: 'Length and unit vectors',
      body: String.raw`The length (magnitude) is the Pythagorean theorem, once per extra dimension:
$$|\vec u| = \sqrt{u_1^2+u_2^2+u_3^2}.$$
For $\overrightarrow{PQ}=\langle 1,6\rangle$ that is $\sqrt{37}$, and $\overrightarrow{QP}$ has the same length. Distance between two points is just the length of the vector between them.

A **unit vector** has length 1. It is a pure direction with the size stripped out. To make one, divide a vector by its own length:
$$\hat u = \frac{\vec u}{|\vec u|}.$$

**Example (class).** $\vec u = \langle 1,2,-1\rangle$ has $|\vec u| = \sqrt{1+4+1}=\sqrt6$. So $\hat u = \tfrac{1}{\sqrt6}\langle 1,2,-1\rangle$.

A vector of length 7 pointing the *opposite* way: take the unit vector, flip it, stretch it by 7.
$$-7\hat u = \tfrac{7}{\sqrt6}\langle -1,-2,1\rangle.$$
The recipe "unit vector, then multiply by the length you want" works for any length and any direction.`,
    },
    {
      id: 'add',
      title: 'Adding and subtracting',
      body: String.raw`Algebra: add or subtract matching components. With $\vec u=\langle 1,2,-1\rangle$ and $\vec v=\langle 2,3,4\rangle$:
$$\vec u+\vec v=\langle 3,5,3\rangle,\qquad \vec u-\vec v=\langle -1,-1,-5\rangle.$$

Picture: put the tail of $\vec v$ on the head of $\vec u$. The sum runs from the very first tail to the very last head. If you draw $\vec u$ and $\vec v$ from the same corner, they make a parallelogram, and $\vec u+\vec v$ is its long diagonal.

The other diagonal is the difference. $\vec u-\vec v$ runs from the head of $\vec v$ to the head of $\vec u$. Check it with head minus tail: (head of $u$) minus (head of $v$) is $\vec u-\vec v$.`,
    },
    {
      id: 'dot',
      title: 'The dot product detects angles',
      body: String.raw`The dot product multiplies two vectors and gives a **number**. There are two formulas for the same number:
$$\vec u\cdot\vec v = u_1v_1+u_2v_2+u_3v_3 = |\vec u|\,|\vec v|\cos\theta.$$
The first one is how you compute it. The second one is what it means: $\theta$ is the angle between the arrows, $0\le\theta\le\pi$.

Why it matters: setting the two equal gives you the angle.
$$\cos\theta = \frac{\vec u\cdot\vec v}{|\vec u|\,|\vec v|}.$$

Read the sign before you do anything else:
- positive: angle less than $90^\circ$, the arrows roughly agree
- zero: exactly $90^\circ$. The vectors are **orthogonal**. This is the most-tested use.
- negative: angle more than $90^\circ$

**Example (class).** $\langle 1,2,-1\rangle\cdot\langle 2,3,4\rangle = 2+6-4 = 4$. Positive, so the angle is acute. Lengths are $\sqrt6$ and $\sqrt{29}$, so $\cos\theta = 4/\sqrt{174}$.

One more fact you will use later: $\vec v\cdot\vec v = |\vec v|^2$.`,
    },
    {
      id: 'projection',
      title: 'Projection: the shadow of one vector on another',
      body: String.raw`Shine a light straight down onto the line of $\vec v$. The shadow that $\vec u$ casts is its projection onto $\vec v$. It answers "how much of $\vec u$ goes in the $\vec v$ direction?"

Build it from the geometry so you never forget it. The shadow has signed length $|\vec u|\cos\theta = \dfrac{\vec u\cdot\vec v}{|\vec v|}$. That is the **scalar component**. To turn it into a vector, multiply by the unit vector $\vec v/|\vec v|$. The two $|\vec v|$'s multiply:
$$\operatorname{proj}_{\vec v}\vec u = \frac{\vec u\cdot\vec v}{\vec v\cdot\vec v}\,\vec v.$$
So the bottom is $\vec v\cdot\vec v = |\vec v|^2$, not $|\vec v|$.

**Example.** $\vec u=\langle 4,1\rangle$, $\vec v=\langle 3,4\rangle$. $\vec u\cdot\vec v = 16$, $\vec v\cdot\vec v = 25$. The projection is $\tfrac{16}{25}\langle 3,4\rangle = \langle \tfrac{48}{25},\tfrac{64}{25}\rangle$. The scalar component is $16/5$.

The leftover piece $\vec u - \operatorname{proj}_{\vec v}\vec u$ is perpendicular to $\vec v$. Dot it with $\vec v$ and you get 0.`,
    },
    {
      id: 'cross',
      title: 'The cross product builds a perpendicular',
      body: String.raw`The cross product of two 3D vectors gives a **vector** perpendicular to both. It only exists in 3D.

Compute it as a determinant:
$$\vec u\times\vec v=\begin{vmatrix}\vec i&\vec j&\vec k\\ u_1&u_2&u_3\\ v_1&v_2&v_3\end{vmatrix} = \langle u_2v_3-u_3v_2,\ -(u_1v_3-u_3v_1),\ u_1v_2-u_2v_1\rangle.$$
For each component, cover that column and cross-multiply what is left (down-right minus down-left). The middle one gets an extra minus sign. That minus is the one everyone forgets.

**Example (class).** $\vec u=\langle 1,2,-1\rangle$, $\vec v=\langle 2,3,4\rangle$.
- $\vec i$: $2\cdot4-(-1)\cdot3 = 11$
- $\vec j$: $-(1\cdot4-(-1)\cdot2) = -6$
- $\vec k$: $1\cdot3-2\cdot2 = -1$

So $\vec u\times\vec v=\langle 11,-6,-1\rangle$. **Check it**: dot with $\vec u$ gives $11-12+1=0$, dot with $\vec v$ gives $22-18-4=0$. Ten seconds, and it catches every sign slip.

What it means:
- Direction: right-hand rule. Fingers along $\vec u$, curl toward $\vec v$, thumb is $\vec u\times\vec v$. Order matters: $\vec v\times\vec u = -(\vec u\times\vec v)$.
- Length: $|\vec u\times\vec v| = |\vec u||\vec v|\sin\theta$ = **area of the parallelogram** the two vectors span. A triangle is half of that. Here the area is $\sqrt{121+36+1}=\sqrt{158}$.
- $\vec u\times\vec v=\vec 0$ exactly when the vectors are parallel.`,
    },
  ],

  formulas: [
    { label: 'Vector from P to Q', tex: String.raw`\overrightarrow{PQ} = Q - P` },
    { label: 'Unit vector', tex: String.raw`\hat u = \dfrac{\vec u}{|\vec u|},\quad |\vec u|=\sqrt{u_1^2+u_2^2+u_3^2}` },
    { label: 'Dot product', tex: String.raw`\vec u\cdot\vec v = u_1v_1+u_2v_2+u_3v_3 = |\vec u||\vec v|\cos\theta` },
    { label: 'Projection', tex: String.raw`\operatorname{proj}_{\vec v}\vec u = \dfrac{\vec u\cdot\vec v}{\vec v\cdot\vec v}\,\vec v,\quad \operatorname{comp}_{\vec v}\vec u = \dfrac{\vec u\cdot\vec v}{|\vec v|}` },
    { label: 'Cross product', tex: String.raw`\vec u\times\vec v = \langle u_2v_3-u_3v_2,\ -(u_1v_3-u_3v_1),\ u_1v_2-u_2v_1\rangle` },
    { label: 'Area', tex: String.raw`\text{parallelogram} = |\vec u\times\vec v| = |\vec u||\vec v|\sin\theta,\quad \text{triangle} = \tfrac12|\vec u\times\vec v|` },
  ],

  mistakes: [
    {
      id: 'tail-minus-head',
      title: 'Subtracting in the wrong order',
      wrong: String.raw`$\overrightarrow{PQ} = P - Q$`,
      right: String.raw`$\overrightarrow{PQ} = Q - P$ (head minus tail)`,
      why: 'P - Q points from Q back to P. Same length, opposite direction, so every sign is flipped.',
    },
    {
      id: 'cross-middle-sign',
      title: 'Forgetting the minus on the j component',
      wrong: String.raw`$\langle 1,2,-1\rangle\times\langle 2,3,4\rangle = \langle 11, 6, -1\rangle$`,
      right: String.raw`$\langle 11, -6, -1\rangle$`,
      why: 'The determinant expansion is +i, -j, +k. Dot your answer with both vectors; if you do not get 0 twice, a sign is wrong.',
    },
    {
      id: 'no-normalize',
      title: 'Calling a vector a unit vector without dividing',
      wrong: String.raw`unit vector along $\langle 1,2,-1\rangle$ is $\langle 1,2,-1\rangle$`,
      right: String.raw`$\tfrac{1}{\sqrt6}\langle 1,2,-1\rangle$`,
      why: 'Unit means length 1. Divide by the length, and divide by the length itself, not its square.',
    },
    {
      id: 'proj-denominator',
      title: 'Dividing by |v| instead of v·v in the projection',
      wrong: String.raw`$\operatorname{proj}_{\vec v}\vec u = \dfrac{\vec u\cdot\vec v}{|\vec v|}\vec v$`,
      right: String.raw`$\operatorname{proj}_{\vec v}\vec u = \dfrac{\vec u\cdot\vec v}{|\vec v|^2}\vec v$`,
      why: 'One |v| comes from the shadow length, the other from turning v into a unit vector. Dividing by |v| once is the scalar component, not the vector.',
    },
    {
      id: 'triangle-half',
      title: 'Forgetting the 1/2 for a triangle',
      wrong: String.raw`area of triangle $ABC = |\overrightarrow{AB}\times\overrightarrow{AC}|$`,
      right: String.raw`area $=\tfrac12|\overrightarrow{AB}\times\overrightarrow{AC}|$`,
      why: 'The cross product gives the parallelogram. The triangle is half of it.',
    },
  ],

  hook: 'Dot Detects angles (a number, uses cos). Cross Creates a perpendicular (a vector, uses sin). Always head minus tail.',

  scene: {
    view: { range: 4, z: [-1, 6] },
    camera: [6, -7, 5],
    layers: [
      { id: 'u', kind: 'vector', from: [0, 0, 0], to: [3, 1, 0], color: 'water', label: 'u' },
      { id: 'v', kind: 'vector', from: [0, 0, 0], to: [1, 2, 0], color: 'road', label: 'v' },
      { id: 'vShift', kind: 'vector', from: [3, 1, 0], to: [4, 3, 0], color: 'road', label: 'v' },
      { id: 'uShift', kind: 'vector', from: [1, 2, 0], to: [4, 3, 0], color: 'water', label: 'u' },
      { id: 'sum', kind: 'vector', from: [0, 0, 0], to: [4, 3, 0], color: 'ink', label: 'u + v' },
      { id: 'diff', kind: 'vector', from: [1, 2, 0], to: [3, 1, 0], color: 'revision', label: 'u - v' },
      { id: 'proj', kind: 'vector', from: [0, 0, 0], to: [1.5, 0.5, 0], color: 'wood', label: 'proj_u v' },
      { id: 'perp', kind: 'vector', from: [1.5, 0.5, 0], to: [1, 2, 0], color: 'contour', label: 'v - proj' },
      { id: 'cross', kind: 'vector', from: [0, 0, 0], to: [0, 0, 5], color: 'revision', label: 'u x v' },
      { id: 'floor', kind: 'plane', normal: [0, 0, 1], point: [2, 1.5, 0], size: 4 },
    ],
    steps: [
      { label: 'Start', show: ['u', 'v'], caption: String.raw`Two arrows from the origin: $\vec u=\langle 3,1,0\rangle$ and $\vec v=\langle 1,2,0\rangle$. Rotate the view: they both lie flat in the $xy$-plane.` },
      { label: 'Add', show: ['u', 'v', 'vShift', 'uShift', 'sum'], caption: String.raw`Slide $\vec v$ so its tail sits on the head of $\vec u$ (or the other way round). Both routes end at the same corner, so $\vec u+\vec v=\langle 4,3,0\rangle$ is the diagonal of the parallelogram.` },
      { label: 'Subtract', show: ['u', 'v', 'diff'], caption: String.raw`The other diagonal is $\vec u-\vec v=\langle 2,-1,0\rangle$. It runs from the head of $\vec v$ to the head of $\vec u$: head minus tail.` },
      { label: 'Project', show: ['u', 'v', 'proj', 'perp'], caption: String.raw`The shadow of $\vec v$ on $\vec u$: $\vec v\cdot\vec u = 5$, $\vec u\cdot\vec u=10$, so $\operatorname{proj}_{\vec u}\vec v = \tfrac{5}{10}\vec u = \langle 1.5, 0.5, 0\rangle$. The leftover piece is perpendicular to $\vec u$.` },
      { label: 'Cross', show: ['u', 'v', 'floor', 'cross'], caption: String.raw`$\vec u\times\vec v = \langle 0,0,5\rangle$ sticks straight out of the plane of $\vec u$ and $\vec v$. Its length 5 is the area of their parallelogram. Swap the order and it points down.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Let $P(3,-1,2)$ and $Q(1,4,0)$. Find the unit vector in the direction of $\overrightarrow{PQ}$.`,
      choices: [
        { tex: String.raw`$\tfrac{1}{\sqrt{33}}\langle -2,5,-2\rangle$`, correct: true },
        { tex: String.raw`$\tfrac{1}{\sqrt{33}}\langle 2,-5,2\rangle$`, mistake: 'tail-minus-head', why: 'This is P - Q, the unit vector from Q to P.' },
        { tex: String.raw`$\langle -2,5,-2\rangle$`, mistake: 'no-normalize', why: 'This is the right direction but its length is sqrt(33), not 1.' },
        { tex: String.raw`$\tfrac{1}{33}\langle -2,5,-2\rangle$`, mistake: 'no-normalize', why: 'You divided by the length squared. Divide by sqrt(33).' },
        { tex: String.raw`$\tfrac{1}{\sqrt{29}}\langle 4,3,2\rangle$`, mistake: 'concept', why: 'You added the points instead of subtracting them.' },
      ],
      steps: [
        String.raw`Head minus tail: $\overrightarrow{PQ} = Q-P = \langle 1-3,\ 4-(-1),\ 0-2\rangle = \langle -2,5,-2\rangle$.`,
        String.raw`Length: $\sqrt{4+25+4}=\sqrt{33}$.`,
        String.raw`Divide: $\hat u = \tfrac{1}{\sqrt{33}}\langle -2,5,-2\rangle$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Compute $\vec u\times\vec v$ for $\vec u=\langle 2,-1,3\rangle$ and $\vec v=\langle 1,4,-2\rangle$.`,
      choices: [
        { tex: String.raw`$\langle -10,7,9\rangle$`, correct: true },
        { tex: String.raw`$\langle -10,-7,9\rangle$`, mistake: 'cross-middle-sign', why: 'The j component needs the extra minus: -(2(-2) - 3(1)) = 7.' },
        { tex: String.raw`$\langle 10,-7,-9\rangle$`, mistake: 'sign', why: 'This is v x u. Order matters; swapping flips every sign.' },
        { tex: String.raw`$-8$`, mistake: 'units', why: 'That is the dot product, a number. The cross product is a vector.' },
        { tex: String.raw`$\langle 2,-4,-6\rangle$`, mistake: 'concept', why: 'You multiplied matching components. That is the first step of a dot product, not a cross product.' },
      ],
      steps: [
        String.raw`$\vec i$: $(-1)(-2) - (3)(4) = 2-12 = -10$.`,
        String.raw`$\vec j$: $-\big[(2)(-2) - (3)(1)\big] = -(-7) = 7$.`,
        String.raw`$\vec k$: $(2)(4) - (-1)(1) = 9$.`,
        String.raw`Check: $\langle -10,7,9\rangle\cdot\vec u = -20-7+27=0$ and $\cdot\,\vec v = -10+28-18 = 0$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Find the angle between $\vec u=\langle 1,1,0\rangle$ and $\vec v=\langle -1,0,1\rangle$.`,
      choices: [
        { tex: String.raw`$\dfrac{2\pi}{3}$`, correct: true },
        { tex: String.raw`$\dfrac{\pi}{3}$`, mistake: 'sign', why: 'The dot product is -1, so cos(theta) = -1/2 and the angle is obtuse.' },
        { tex: String.raw`$\dfrac{3\pi}{4}$`, mistake: 'arith', why: 'You divided by only one of the lengths, getting cos(theta) = -1/sqrt(2).' },
        { tex: String.raw`$\arccos\!\left(-\tfrac14\right)$`, mistake: 'arith', why: 'You divided by the squared lengths (2 times 2) instead of the lengths.' },
        { tex: String.raw`$-1$`, mistake: 'units', why: 'That is the dot product, not the angle.' },
      ],
      steps: [
        String.raw`$\vec u\cdot\vec v = -1+0+0 = -1$.`,
        String.raw`$|\vec u| = \sqrt2$, $|\vec v| = \sqrt2$.`,
        String.raw`$\cos\theta = \dfrac{-1}{\sqrt2\sqrt2} = -\tfrac12$.`,
        String.raw`$\theta = \dfrac{2\pi}{3}$ ($120^\circ$). Negative dot product, obtuse angle: consistent.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Find the vector projection of $\vec u=\langle 4,-1,5\rangle$ onto $\vec v=\langle 2,1,-2\rangle$.`,
      choices: [
        { tex: String.raw`$\left\langle -\tfrac23,-\tfrac13,\tfrac23\right\rangle$`, correct: true },
        { tex: String.raw`$\langle -2,-1,2\rangle$`, mistake: 'proj-denominator', why: 'You divided u·v = -3 by |v| = 3 instead of by v·v = 9.' },
        { tex: String.raw`$-1$`, mistake: 'units', why: 'That is the scalar component (u·v)/|v|, a number. The question asks for the vector.' },
        { tex: String.raw`$\left\langle \tfrac23,\tfrac13,-\tfrac23\right\rangle$`, mistake: 'sign', why: 'u·v is negative (8 - 1 - 10 = -3), so the shadow points against v.' },
        { tex: String.raw`$\left\langle -\tfrac27,\tfrac1{14},-\tfrac5{14}\right\rangle$`, mistake: 'concept', why: 'This projects v onto u. The vector you project onto goes in the denominator and at the end.' },
      ],
      steps: [
        String.raw`$\vec u\cdot\vec v = 8-1-10 = -3$.`,
        String.raw`$\vec v\cdot\vec v = 4+1+4 = 9$.`,
        String.raw`$\operatorname{proj}_{\vec v}\vec u = \tfrac{-3}{9}\langle 2,1,-2\rangle = \left\langle -\tfrac23,-\tfrac13,\tfrac23\right\rangle$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Find the area of the triangle with vertices $A(1,0,0)$, $B(0,2,0)$, $C(0,0,3)$.`,
      choices: [
        { tex: String.raw`$\tfrac72$`, correct: true },
        { tex: String.raw`$7$`, mistake: 'triangle-half', why: 'That is the parallelogram. The triangle is half.' },
        { tex: String.raw`$\tfrac{49}{2}$`, mistake: 'arith', why: 'You used the squared length 36 + 9 + 4 = 49 and forgot the square root.' },
        { tex: String.raw`$3$`, mistake: 'setup', why: 'You crossed the position vectors of B and C. Use edge vectors that start at the same vertex, like AB and AC.' },
        { tex: String.raw`$\tfrac12$`, mistake: 'concept', why: 'You used the dot product AB·AC = 1. Area comes from the cross product.' },
      ],
      steps: [
        String.raw`Edges from $A$: $\overrightarrow{AB}=\langle -1,2,0\rangle$, $\overrightarrow{AC}=\langle -1,0,3\rangle$.`,
        String.raw`$\overrightarrow{AB}\times\overrightarrow{AC} = \langle 2\cdot3-0,\ -(-3-0),\ 0-(-2)\rangle = \langle 6,3,2\rangle$.`,
        String.raw`Length $\sqrt{36+9+4} = 7$. That is the parallelogram.`,
        String.raw`Triangle area $=\tfrac72$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`For what value of $c$ are $\langle c, 2, -1\rangle$ and $\langle 3, c, 4\rangle$ orthogonal?`,
      choices: [
        { tex: String.raw`$c=\tfrac45$`, correct: true },
        { tex: String.raw`$c=-\tfrac45$`, mistake: 'sign', why: 'From 5c - 4 = 0 you get c = +4/5. The sign flipped when moving the 4.' },
        { tex: String.raw`$c=2$`, mistake: 'arith', why: 'You dropped the 3c term and solved 2c - 4 = 0.' },
        { tex: String.raw`$c=\tfrac43$`, mistake: 'arith', why: 'You dropped the 2c term and solved 3c - 4 = 0.' },
        { tex: String.raw`No such $c$`, mistake: 'concept', why: 'Orthogonal means the dot product is 0, which is one linear equation in c. You were thinking of the cross product being zero (parallel).' },
      ],
      steps: [
        String.raw`Orthogonal means the dot product is zero.`,
        String.raw`$3c + 2c - 4 = 0$.`,
        String.raw`$5c = 4$, so $c=\tfrac45$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Find a unit vector perpendicular to both $\vec u=\langle 1,0,2\rangle$ and $\vec v=\langle 0,1,-1\rangle$.`,
      choices: [
        { tex: String.raw`$\tfrac{1}{\sqrt6}\langle -2,1,1\rangle$`, correct: true },
        { tex: String.raw`$\tfrac{1}{\sqrt6}\langle -2,-1,1\rangle$`, mistake: 'cross-middle-sign', why: 'Check by dotting with u: -2 + 0 + 2 = 0 works, but with v: 0 - 1 - 1 = -2. The j sign is off.' },
        { tex: String.raw`$\langle -2,1,1\rangle$`, mistake: 'no-normalize', why: 'Perpendicular, yes, but its length is sqrt(6).' },
        { tex: String.raw`$\tfrac16\langle -2,1,1\rangle$`, mistake: 'no-normalize', why: 'You divided by |n|^2 = 6 instead of |n| = sqrt(6).' },
        { tex: String.raw`$\tfrac{1}{\sqrt3}\langle 1,1,1\rangle$`, mistake: 'concept', why: 'That is the normalized sum u + v. A sum lies between the vectors, not perpendicular to them.' },
      ],
      steps: [
        String.raw`A vector perpendicular to both is $\vec u\times\vec v$.`,
        String.raw`$\vec u\times\vec v = \langle 0\cdot(-1) - 2\cdot1,\ -(1\cdot(-1) - 2\cdot0),\ 1\cdot1 - 0\rangle = \langle -2,1,1\rangle$.`,
        String.raw`Check: $\cdot\,\vec u = -2+0+2 = 0$, $\cdot\,\vec v = 0+1-1 = 0$.`,
        String.raw`Length $\sqrt6$, so the unit vector is $\tfrac{1}{\sqrt6}\langle -2,1,1\rangle$ (its negative also works).`,
      ],
      source: 'original',
    },
    {
      id: 'p8',
      difficulty: 3,
      prompt: String.raw`Suppose $|\vec u| = 3$, $|\vec v| = 4$, $|\vec u\times\vec v| = 6$, and the angle between $\vec u$ and $\vec v$ is acute. Find $\vec u\cdot\vec v$.`,
      choices: [
        { tex: String.raw`$6\sqrt3$`, correct: true },
        { tex: String.raw`$-6\sqrt3$`, mistake: 'sign', why: 'An acute angle has cos(theta) > 0, so the dot product is positive.' },
        { tex: String.raw`$6$`, mistake: 'concept', why: 'The dot and cross products are different numbers: one uses cos, the other uses sin.' },
        { tex: String.raw`$12$`, mistake: 'arith', why: 'That is |u||v|. You still need the factor cos(theta).' },
        { tex: String.raw`$6\sqrt2$`, mistake: 'arith', why: 'sin(theta) = 1/2 gives theta = pi/6, not pi/4.' },
      ],
      steps: [
        String.raw`$|\vec u\times\vec v| = |\vec u||\vec v|\sin\theta$, so $6 = 12\sin\theta$ and $\sin\theta = \tfrac12$.`,
        String.raw`Acute angle: $\theta = \tfrac{\pi}{6}$.`,
        String.raw`$\vec u\cdot\vec v = |\vec u||\vec v|\cos\theta = 12\cdot\tfrac{\sqrt3}{2} = 6\sqrt3$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'vector', from: [0, 0, 0], to: [3, 1, 0], color: 'water', label: 'u' },
    { kind: 'vector', from: [0, 0, 0], to: [1, 2, 0], color: 'road', label: 'v' },
    { kind: 'vector', from: [0, 0, 0], to: [0, 0, 5], color: 'revision', label: 'u x v' },
  ],
};
