export default {
  id: 17,
  title: 'Lagrange multipliers',
  section: '15.8',
  exam: 2,
  blurb: 'Find the max and min of f when you are only allowed to move along a constraint curve or surface.',
  boiler: ['Lagrange Multipliers', 'Optimization'],

  sections: [
    {
      id: 'idea',
      title: 'The problem: optimize on a curve',
      body: String.raw`Lesson 16 found the highest point of a surface anywhere in the plane. Now you are only allowed to walk along a path, the **constraint** $g(x,y)=k$, and you want the highest and lowest values of $f$ along that path.

Setting $\nabla f = \vec 0$ does not help. The best point on the path is usually not a flat spot of the surface. It is just the place where the path stops climbing.

Warm-up from lecture: minimize $x^2+y^2$ on the hyperbola $xy=1$. Substitute $y = 1/x$ to get $h(x) = x^2 + 1/x^2$. Then $h'(x) = 2x - 2/x^3 = 0$ gives $x^4=1$, so $x=\pm1$. The minimum value is $2$, at $(1,1)$ and $(-1,-1)$. There is no maximum, because $h$ grows without bound.

Substitution works when you can solve the constraint for one variable. Lagrange multipliers work even when you cannot.`,
    },
    {
      id: 'why-parallel',
      title: 'Why the gradients line up',
      body: String.raw`Draw the level curves of $f$ and the constraint curve on the same picture. As you walk along the constraint you cross level curves, so $f$ keeps changing. At a max or a min you stop crossing them: the constraint curve just **touches** a level curve of $f$.

Two curves that touch share a tangent line. The gradient is always perpendicular to its level curve. So at the touching point, $\nabla f$ and $\nabla g$ are both perpendicular to the same tangent line. They must be parallel:

$$\nabla f = \lambda\,\nabla g$$

The number $\lambda$ is the **Lagrange multiplier**. It only says how much longer one gradient is than the other. You almost never need its value.

Another way to see it: $\nabla f$ points uphill. If $\nabla f$ had any component along the constraint curve, you could step along the curve in that direction and climb higher. At the top, all of $\nabla f$ points straight off the curve, the same way $\nabla g$ does.`,
    },
    {
      id: 'recipe',
      title: 'Recipe',
      body: String.raw`To find the max and min of $f(x,y,z)$ subject to $g(x,y,z) = k$:

1. Write one equation per variable: $f_x = \lambda g_x$, $f_y = \lambda g_y$, $f_z = \lambda g_z$. Add the constraint $g = k$.
2. Eliminate $\lambda$. Either solve each equation for $\lambda$ and set them equal, or divide one equation by another. You want a relation like $y = x$ or $y^2 = x^2$.
3. Plug that relation into the constraint to get the actual points. Keep both signs of every square root.
4. Evaluate $f$ at **every** point you found. The biggest value is the max, the smallest is the min.

The answer to "find the max" is a **number**, the value of $f$. The point is where it happens. Exam choices list both, so read the question.

If the constraint is a closed curve or surface (circle, ellipse, sphere), a max and a min always exist. If it runs off to infinity (a line, a hyperbola), one of them may not exist.`,
    },
    {
      id: 'cases',
      title: 'Do not divide by zero: the case split',
      body: String.raw`The usual way to lose points is dividing by a variable that might be zero. Lecture example: max and min of $f = x^2 - y^2$ on $x^2+y^2 = 1$.

$$2x = \lambda(2x),\qquad -2y = \lambda(2y),\qquad x^2+y^2=1$$

It is tempting to cancel $2x$ in the first equation and write $\lambda = 1$. That silently assumes $x \ne 0$. Instead, factor: $2x(1-\lambda) = 0$, so **$x = 0$ or $\lambda = 1$**.

- Case $\lambda = 1$: the second equation gives $-2y = 2y$, so $y = 0$ and $x = \pm 1$. Then $f = 1$.
- Case $x = 0$: the constraint gives $y = \pm 1$. Then $f = -1$.

Max $1$, min $-1$. If you had divided by $x$, you would have found only the max and missed the min completely.

Rule: before you divide by $x$, write "if $x = 0$..." and finish that case too.`,
    },
    {
      id: 'example',
      title: 'Worked example: a tilted ellipse',
      body: String.raw`From lecture: max and min of $f = xy$ on $x^2 + xy + y^2 = 1$.

$\nabla f = \langle y, x\rangle$ and $\nabla g = \langle 2x+y,\; x+2y\rangle$, so

$$y = \lambda(2x+y),\qquad x = \lambda(x+2y).$$

Solve the first for $\lambda = \dfrac{y}{2x+y}$ and substitute: $x(2x+y) = y(x+2y)$, which simplifies to $x^2 = y^2$. (Check the skipped case $2x + y = 0$: it forces $x=y=0$, which is not on the constraint.)

- $y = x$: $3x^2 = 1$, so $x = \pm 1/\sqrt3$ and $f = 1/3$.
- $y = -x$: $x^2 = 1$, so $x = \pm 1$ and $f = -1$.

**Max $1/3$, min $-1$.**

The Exam 2 review did the same thing with $f = 2x + 3y + 2$ on $2x^2 + 5xy + 4y^2 = 28$. Dividing the two equations gave $y = 2x$, then $x = \pm 1$, and the minimum was $f(-1,-2) = -6$. Linear $f$, curved constraint: divide the equations to kill $\lambda$.`,
    },
    {
      id: 'shortcut',
      title: 'Shortcut: linear f on a sphere',
      body: String.raw`This shows up on almost every Exam 2. For $f = ax + by + cz$ on the sphere $x^2+y^2+z^2 = R^2$:

$$\max f = R\,\|\langle a,b,c\rangle\|,\qquad \min f = -R\,\|\langle a,b,c\rangle\|.$$

Why: $f = \langle a,b,c\rangle \cdot \langle x,y,z\rangle$, and $\langle x,y,z\rangle$ has length $R$. A dot product is biggest when the two vectors point the same way, giving $R\,\|\langle a,b,c\rangle\|$. The max point is the radius aimed along $\langle a,b,c\rangle$: $\dfrac{R}{\|\langle a,b,c\rangle\|}\langle a,b,c\rangle$.

Lecture check: $f = x + 5y + 3z$ on the unit sphere. $\|\langle 1,5,3\rangle\| = \sqrt{35}$ and $R = 1$, so the max is $\sqrt{35}$ and the min is $-\sqrt{35}$. The full Lagrange solution gives the same thing.

Careful: $R$ is the **radius**. For $x^2+y^2+z^2 = 14$, $R = \sqrt{14}$, not $14$. The shortcut only works when the constraint is a sphere (or circle) centered at the origin.`,
    },
  ],

  formulas: [
    { label: 'Lagrange condition', tex: String.raw`\nabla f = \lambda\,\nabla g,\qquad g(x,y,z) = k` },
    { label: 'The system (3 variables)', tex: String.raw`f_x=\lambda g_x,\ \ f_y=\lambda g_y,\ \ f_z=\lambda g_z,\ \ g=k` },
    { label: 'Linear f on a sphere of radius R', tex: String.raw`\max(ax+by+cz) = R\sqrt{a^2+b^2+c^2}` },
    { label: 'Where the max happens', tex: String.raw`(x,y,z) = \frac{R}{\sqrt{a^2+b^2+c^2}}\,\langle a,b,c\rangle` },
  ],

  mistakes: [
    {
      id: 'divide-by-zero',
      title: 'Dividing by x without the x = 0 case',
      wrong: String.raw`$2x = 2\lambda x \Rightarrow \lambda = 1$ (only)`,
      right: String.raw`$2x(1-\lambda) = 0 \Rightarrow x = 0$ or $\lambda = 1$; solve both cases`,
      why: 'Canceling a variable assumes it is not zero. The x = 0 case often holds the other extreme, so dividing throws away the max or the min.',
    },
    {
      id: 'points-not-values',
      title: 'Giving the point instead of the value',
      wrong: String.raw`"The max is $(2,2)$."`,
      right: String.raw`"The max is $f(2,2) = 4$."`,
      why: 'The max and min are values of f. Exam choices include the points on purpose.',
    },
    {
      id: 'radius-squared',
      title: 'Reading the right side of the sphere as the radius',
      wrong: String.raw`$x^2+y^2+z^2 = 14$ has radius $14$`,
      right: String.raw`$x^2+y^2+z^2 = 14$ has radius $\sqrt{14}$`,
      why: 'The constant on the right is R squared. Using it as R makes the shortcut answer far too big.',
    },
    {
      id: 'drop-plusminus',
      title: 'Keeping only the positive square root',
      wrong: String.raw`$x^2 = 4 \Rightarrow x = 2$`,
      right: String.raw`$x^2 = 4 \Rightarrow x = \pm 2$`,
      why: 'The negative root is usually where the min lives. Every square root gives two candidates.',
    },
    {
      id: 'ignore-constraint',
      title: 'Solving the unconstrained problem',
      wrong: String.raw`Set $\nabla f = \vec 0$ and report that value`,
      right: String.raw`Solve $\nabla f = \lambda\nabla g$ together with $g = k$`,
      why: 'A critical point of f is usually not on the constraint at all. The constrained extremes are where the gradients line up, not where grad f vanishes.',
    },
  ],

  hook: 'Gradients line up: grad f = λ grad g. Then plug every point back into f and answer with a number.',

  scene: {
    view: { range: 3, z: [-3, 3.5] },
    camera: [5, -5, 4],
    layers: [
      { id: 'surf', kind: 'surface', z: 'x*y', domain: { r: [0, 2.2] }, colormap: 'terrain', opacity: 0.85 },
      { id: 'gradf', kind: 'gradientField', of: 'surf', density: 9 },
      { id: 'gradg', kind: 'vectorField', P: 'x', Q: 'y', density: 7 },
      { id: 'lvl', kind: 'contours', of: 'surf', levels: 9 },
      { id: 'circle', kind: 'curve', x: 'sqrt(2)*cos(t)', y: 'sqrt(2)*sin(t)', z: '0', t: [0, '2*pi'], color: 'road' },
      { id: 'lifted', kind: 'curveOnSurface', of: 'surf', x: 'sqrt(2)*cos(t)', y: 'sqrt(2)*sin(t)', t: [0, '2*pi'], color: 'road' },
      { id: 'top1', kind: 'point', at: [1, 1, 1], label: 'max f = 1' },
      { id: 'top2', kind: 'point', at: [-1, -1, 1], label: 'max f = 1' },
      { id: 'bot', kind: 'point', at: [1, -1, -1], label: 'min f = -1' },
      { id: 'foot', kind: 'point', at: [1, 1, 0], label: '(1, 1)' },
      { id: 'vf', kind: 'vector', from: [1, 1, 0], to: [2, 2, 0], color: 'water', label: '∇f = ⟨1,1⟩' },
      { id: 'vg', kind: 'vector', from: [1, 1, 0], to: [3, 3, 0], color: 'road', label: '∇g = ⟨2,2⟩' },
    ],
    steps: [
      {
        label: 'Start',
        show: ['surf'],
        caption: String.raw`The saddle $z = xy$. With no constraint it has no max: it climbs forever along the line $y = x$.`,
      },
      {
        label: 'Ascent vectors',
        show: ['surf', 'gradf'],
        caption: String.raw`The floor arrows are $\nabla f = \langle y, x\rangle$, the uphill direction at each point. They vanish only at the saddle point, which is not a max.`,
      },
      {
        label: 'Constraint on the surface',
        show: ['surf', 'circle', 'lifted', 'top1', 'top2', 'bot'],
        caption: String.raw`Now you may only walk on the circle $x^2+y^2 = 2$. Lifted onto the surface, that path rises and falls. Its highest value is $f = 1$ at $(1,1)$ and $(-1,-1)$, its lowest is $f=-1$.`,
      },
      {
        label: 'Constraint and ascent vectors',
        show: ['circle', 'gradf', 'gradg'],
        caption: String.raw`The second field is $\nabla g$ (drawn at half length), pointing straight out of the circle. Where $\nabla f$ tilts along the circle you can still climb. At the max it stops tilting.`,
      },
      {
        label: 'Tangency',
        show: ['lvl', 'circle', 'foot', 'vf', 'vg'],
        caption: String.raw`At $(1,1)$ the level curve $xy = 1$ just touches the circle. There $\nabla f = \langle 1,1\rangle$ and $\nabla g = \langle 2,2\rangle$ are parallel: $\nabla f = \tfrac12\nabla g$, so $\lambda = \tfrac12$.`,
      },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Find the maximum value of $f(x,y) = xy$ on the circle $x^2 + y^2 = 8$.`,
      choices: [
        { tex: String.raw`$4$`, correct: true },
        { tex: String.raw`$(2,2)$`, mistake: 'points-not-values', why: 'That is where the max happens. The question asks for the value f(2,2).' },
        { tex: String.raw`$8$`, mistake: 'arith', why: String.raw`From $y = \pm x$ you get $2x^2 = 8$, not $x^2 = 8$. Using $x^2 = 8$ gives $f = x^2 = 8$.` },
        { tex: String.raw`$0$`, mistake: 'ignore-constraint', why: 'f = 0 at the critical point (0,0), which is not even on the circle.' },
        { tex: String.raw`$-4$`, mistake: 'sign', why: 'That is the minimum, at (2,-2) and (-2,2).' },
      ],
      steps: [
        String.raw`$\nabla f = \langle y, x\rangle$, $\nabla g = \langle 2x, 2y\rangle$: $\;y = 2\lambda x$ and $x = 2\lambda y$.`,
        String.raw`Divide the equations (neither $x$ nor $y$ can be $0$, or both would be and the point would miss the circle): $y/x = x/y$, so $y^2 = x^2$.`,
        String.raw`Constraint: $2x^2 = 8$, so $x = \pm 2$ and $y = \pm 2$.`,
        String.raw`$f(2,2) = f(-2,-2) = 4$ and $f(2,-2) = f(-2,2) = -4$. **Max $4$.**`,
      ],
      source: 'Study plan bank #1',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Find the maximum value of $f(x,y,z) = 4x - 4y + 2z$ on the sphere $x^2+y^2+z^2 = 4$.`,
      choices: [
        { tex: String.raw`$12$`, correct: true },
        { tex: String.raw`$24$`, mistake: 'radius-squared', why: 'The radius is 2, not 4. Using 4 doubles the answer.' },
        { tex: String.raw`$6$`, mistake: 'arith', why: 'That is the length of grad f alone. You still multiply by the radius 2.' },
        { tex: String.raw`$\left(\tfrac43, -\tfrac43, \tfrac23\right)$`, mistake: 'points-not-values', why: 'That is the max point. The max value is f there, which is 12.' },
        { tex: String.raw`$36$`, mistake: 'arith', why: 'That is the length of grad f squared. The shortcut uses the length itself, times R.' },
      ],
      steps: [
        String.raw`$f$ is linear and the constraint is a sphere centered at the origin with $R = 2$. Use the shortcut.`,
        String.raw`$\|\langle 4,-4,2\rangle\| = \sqrt{16+16+4} = 6$.`,
        String.raw`Max $= R\cdot 6 = 12$, at $\tfrac{2}{6}\langle 4,-4,2\rangle = \left(\tfrac43,-\tfrac43,\tfrac23\right)$. Check: $\tfrac{16}{3}+\tfrac{16}{3}+\tfrac43 = 12$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Find the minimum value of $f(x,y,z) = x + 2y + 3z$ subject to $x^2 + y^2 + z^2 = 14$.`,
      choices: [
        { tex: String.raw`$-14$`, correct: true },
        { tex: String.raw`$-14\sqrt{14}$`, mistake: 'radius-squared', why: 'You used R = 14. The radius is the square root of 14.' },
        { tex: String.raw`$-\sqrt{14}$`, mistake: 'arith', why: 'That is minus the length of grad f. You forgot to multiply by the radius.' },
        { tex: String.raw`$(-1,-2,-3)$`, mistake: 'points-not-values', why: 'That is where the min happens, not the min value.' },
        { tex: String.raw`$14$`, mistake: 'sign', why: 'That is the maximum, at (1,2,3).' },
      ],
      steps: [
        String.raw`Lagrange: $1 = 2\lambda x$, $2 = 2\lambda y$, $3 = 2\lambda z$, so $(x,y,z) = \tfrac{1}{2\lambda}\langle 1,2,3\rangle$.`,
        String.raw`Constraint: $\tfrac{14}{4\lambda^2} = 14$, so $\lambda = \pm\tfrac12$ and the points are $\pm(1,2,3)$.`,
        String.raw`$f(1,2,3) = 14$ and $f(-1,-2,-3) = -14$. **Min $-14$.**`,
        String.raw`Shortcut check: $R = \sqrt{14}$, $\|\nabla f\| = \sqrt{14}$, so the extremes are $\pm 14$.`,
      ],
      source: 'Study plan bank #2',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Find the minimum value of $f(x,y) = 3x^2 + y$ on the circle $x^2 + y^2 = 1$.`,
      choices: [
        { tex: String.raw`$-1$`, correct: true },
        { tex: String.raw`$\tfrac{37}{12}$`, mistake: 'divide-by-zero', why: String.raw`Canceling $x$ in $6x = 2\lambda x$ leaves only $\lambda = 3$, which gives the max $37/12$. The min sits in the $x = 0$ case.` },
        { tex: String.raw`$1$`, mistake: 'drop-plusminus', why: String.raw`In the $x=0$ case, $y^2 = 1$ gives $y = 1$ and $y = -1$. You kept only $y = 1$.` },
        { tex: String.raw`$(0,-1)$`, mistake: 'points-not-values', why: 'That is the min point. The value there is -1.' },
        { tex: String.raw`$-\tfrac{37}{12}$`, mistake: 'sign', why: 'f = 37/12 is the max. Flipping its sign is not the min; the min comes from a different candidate.' },
      ],
      steps: [
        String.raw`$\nabla f = \langle 6x, 1\rangle$, $\nabla g = \langle 2x, 2y\rangle$: $\;6x = 2\lambda x$ and $1 = 2\lambda y$.`,
        String.raw`First equation: $2x(3-\lambda) = 0$, so $x = 0$ or $\lambda = 3$.`,
        String.raw`$\lambda = 3$: $y = \tfrac16$, $x^2 = \tfrac{35}{36}$, $f = \tfrac{35}{12}+\tfrac16 = \tfrac{37}{12}$.`,
        String.raw`$x = 0$: $y = \pm 1$, $f = \pm 1$.`,
        String.raw`Candidates: $\tfrac{37}{12}, 1, -1$. **Min $-1$** at $(0,-1)$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Find the maximum value of $f(x,y) = x^2y$ on the ellipse $x^2 + 2y^2 = 6$.`,
      choices: [
        { tex: String.raw`$4$`, correct: true },
        { tex: String.raw`$(2,1)$`, mistake: 'points-not-values', why: 'That is one max point (so is (-2,1)). The value there is 4.' },
        { tex: String.raw`$\tfrac{3\sqrt6}{2}$`, mistake: 'arith', why: String.raw`From $2xy = 2\lambda x$ you get $\lambda = y$, then $x^2 = 4\lambda y = 4y^2$. Writing $x^2 = 2y^2$ instead gives this.` },
        { tex: String.raw`$2$`, mistake: 'arith', why: String.raw`You evaluated $xy$ instead of $x^2y$ at $(2,1)$.` },
        { tex: String.raw`$-4$`, mistake: 'sign', why: 'That is the min, at (2,-1) and (-2,-1).' },
      ],
      steps: [
        String.raw`$\nabla f = \langle 2xy, x^2\rangle$, $\nabla g = \langle 2x, 4y\rangle$: $\;2xy = 2\lambda x$ and $x^2 = 4\lambda y$.`,
        String.raw`First equation: $2x(y - \lambda) = 0$, so $x = 0$ or $\lambda = y$.`,
        String.raw`$x = 0$: $y = \pm\sqrt3$, $f = 0$. Neither max nor min, but you must check it.`,
        String.raw`$\lambda = y$: $x^2 = 4y^2$, so $6y^2 = 6$, $y = \pm 1$, $x = \pm 2$. $f = 4y$: $4$ or $-4$.`,
        String.raw`**Max $4$** at $(\pm 2, 1)$; min $-4$ at $(\pm2,-1)$.`,
      ],
      source: 'Study plan bank #4',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`Find the minimum value of $f(x,y) = 2x + 2y + 3$ subject to $x^2 + xy + y^2 = 3$.`,
      choices: [
        { tex: String.raw`$-1$`, correct: true },
        { tex: String.raw`$7$`, mistake: 'sign', why: 'That is the max, at (1,1).' },
        { tex: String.raw`$3 - 2\sqrt6$`, mistake: 'concept', why: String.raw`You used the sphere shortcut as if the constraint were $x^2+y^2 = 3$. The $xy$ term makes it a tilted ellipse, so the shortcut does not apply.` },
        { tex: String.raw`$-4$`, mistake: 'arith', why: 'You dropped the constant +3. f(-1,-1) = -2 - 2 + 3.' },
        { tex: String.raw`$(-1,-1)$`, mistake: 'points-not-values', why: 'That is the min point. The min value is f(-1,-1) = -1.' },
      ],
      steps: [
        String.raw`$\nabla f = \langle 2,2\rangle$, $\nabla g = \langle 2x+y,\; x+2y\rangle$: $\;2 = \lambda(2x+y)$, $2 = \lambda(x+2y)$.`,
        String.raw`$\lambda \neq 0$, so divide: $2x + y = x + 2y$, which gives $y = x$.`,
        String.raw`Constraint: $3x^2 = 3$, so $x = \pm 1$. Points $(1,1)$ and $(-1,-1)$.`,
        String.raw`$f(1,1) = 7$, $f(-1,-1) = -1$. **Min $-1$.**`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Find the minimum value of $x^2 + y^2 + z^2$ subject to $x + 2y + 3z = 14$.`,
      choices: [
        { tex: String.raw`$14$`, correct: true },
        { tex: String.raw`$\sqrt{14}$`, mistake: 'arith', why: 'That is the distance from the origin to the plane. The function is the distance squared.' },
        { tex: String.raw`$(1,2,3)$`, mistake: 'points-not-values', why: 'That is the closest point. The min value is 1 + 4 + 9.' },
        { tex: String.raw`$0$`, mistake: 'ignore-constraint', why: 'The origin minimizes x² + y² + z² with no constraint, but it is not on the plane.' },
        { tex: String.raw`$2$`, mistake: 'units', why: 'That is the multiplier λ, not the value of the function.' },
      ],
      steps: [
        String.raw`$\nabla f = \langle 2x,2y,2z\rangle$, $\nabla g = \langle 1,2,3\rangle$: $\;x = \tfrac{\lambda}{2},\ y = \lambda,\ z = \tfrac{3\lambda}{2}$.`,
        String.raw`Constraint: $\tfrac{\lambda}{2} + 2\lambda + \tfrac{9\lambda}{2} = 7\lambda = 14$, so $\lambda = 2$.`,
        String.raw`Point $(1,2,3)$, value $1 + 4 + 9 = 14$.`,
        String.raw`A plane has a closest point but no farthest point, so this one candidate is the min. **$14$.**`,
      ],
      source: 'Study plan bank #3',
    },
  ],

  lab: [{ kind: 'surface', expr: 'x*y' }],
};
