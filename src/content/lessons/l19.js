export default {
  id: 19,
  title: 'Double integrals over general regions and reversing the order',
  section: '16.2',
  exam: 2,
  blurb: 'Integrate over any region by slicing it into strips, and flip the slicing when the inner integral is impossible.',
  boiler: ['Double Integrals', 'Reverse Order of Integration'],

  sections: [
    {
      id: 'idea',
      title: 'The one rule',
      body: String.raw`On a rectangle every limit is a number. On a curved region the **inner** limits become functions, and the **outer** limits stay numbers. That is the whole rule.

Think of it as sweeping a strip across the region. The inner integral runs along one strip, from where it enters the region to where it leaves. Those entry and exit points depend on where the strip is, so they are functions of the outer variable. The outer integral then sweeps the strip from the first position to the last one, and those are fixed numbers.

**Step 1 every time: draw the picture.** Then find where the boundary curves cross. The crossing points become the outer limits.`,
    },
    {
      id: 'type1',
      title: 'Vertical strips (Type I): dy dx',
      body: String.raw`Use vertical strips when the region has a clear **bottom** curve and **top** curve:

$$D = \{a \le x \le b,\ g_1(x) \le y \le g_2(x)\},\qquad \iint_D f\,dA = \int_a^b\!\!\int_{g_1(x)}^{g_2(x)} f\,dy\,dx.$$

Lecture example: $\iint_D (x + 2y)\,dA$, with $D$ between $y = 2x^2$ and $y = 1 + x^2$.

1. Crossing points: $2x^2 = 1 + x^2$ gives $x = \pm1$. Outer limits $-1 \le x \le 1$.
2. Which is on top? Test $x = 0$: $2x^2 = 0$ and $1 + x^2 = 1$. So $2x^2 \le y \le 1 + x^2$.
3. Inner: $\left[xy + y^2\right]_{2x^2}^{1+x^2} = -3x^4 - x^3 + 2x^2 + x + 1$.
4. The odd terms $-x^3$ and $x$ vanish on $[-1,1]$: $2\int_0^1(-3x^4 + 2x^2 + 1)\,dx = 2\cdot\tfrac{16}{15} = \tfrac{32}{15}$.

Plug in a test point to decide top and bottom. Guessing from memory is how you get a negative area.`,
    },
    {
      id: 'type2',
      title: 'Horizontal strips (Type II): dx dy',
      body: String.raw`Use horizontal strips when the region has a clear **left** curve and **right** curve, such as a parabola opening sideways:

$$D = \{c \le y \le d,\ h_1(y) \le x \le h_2(y)\},\qquad \iint_D f\,dA = \int_c^d\!\!\int_{h_1(y)}^{h_2(y)} f\,dx\,dy.$$

Lecture example: $\iint_D xy\,dA$, with $D$ between the line $y = x - 1$ and the parabola $y^2 = 2x + 6$.

1. Solve both for $x$: the line is $x = y + 1$, the parabola is $x = \tfrac{y^2 - 6}{2}$.
2. Crossing: $y + 1 = \tfrac{y^2-6}{2}$ gives $y^2 - 2y - 8 = 0$, so $y = -2$ and $y = 4$.
3. Each horizontal strip enters at the parabola and leaves at the line:

$$\int_{-2}^{4}\!\!\int_{(y^2-6)/2}^{y+1} xy\,dx\,dy = 36.$$

With vertical strips this region needs two integrals, because the bottom boundary changes from the lower half of the parabola to the line at $x = -1$.`,
    },
    {
      id: 'split',
      title: 'When one order needs a split',
      body: String.raw`If the top (or bottom) boundary changes partway across, vertical strips need two integrals. Lecture example: $D$ bounded by $y = \ln x$, $y = -\ln x$, and $y = 3$.

With vertical strips the bottom curve switches at $x = 1$:

$$\int_{e^{-3}}^{1}\!\!\int_{-\ln x}^{3} f\,dy\,dx + \int_{1}^{e^3}\!\!\int_{\ln x}^{3} f\,dy\,dx.$$

With horizontal strips, every strip at height $y$ runs from $x = e^{-y}$ to $x = e^{y}$:

$$\int_0^3\!\!\int_{e^{-y}}^{e^{y}} f\,dx\,dy.$$

One integral instead of two. If one order needs splitting, try the other.`,
    },
    {
      id: 'reverse',
      title: 'Reversing the order',
      body: String.raw`Some inner integrals have no antiderivative: $e^{x^2}$, $\sin(y^2)$, $\cos(y^2)$, $e^{y^3}$. When you see one, the question is about **reversing the order**. The answer always comes out clean.

Lecture example: $\displaystyle\int_0^1\!\!\int_x^1 \sin(y^2)\,dy\,dx$.

1. Read the limits as inequalities: $0 \le x \le 1$ and $x \le y \le 1$.
2. Sketch: the triangle above $y = x$, below $y = 1$, right of $x = 0$. Corners $(0,0), (0,1), (1,1)$.
3. Slice the other way. A horizontal strip at height $y$ runs from $x = 0$ to $x = y$, for $0 \le y \le 1$.
4. Integrate:

$$\int_0^1\!\!\int_0^{y}\sin(y^2)\,dx\,dy = \int_0^1 y\sin(y^2)\,dy = \frac{1 - \cos 1}{2}.$$

Notice the $y$ that the inner integral produced. It is exactly what $u = y^2$ needs. Reverse-order problems are built that way, so if no such factor appears, recheck your sketch.

Never flip limits by shuffling symbols. Always go through the sketch.`,
    },
    {
      id: 'uses',
      title: 'Area and volume between surfaces',
      body: String.raw`- **Area** of $D$: $\iint_D 1\,dA$.
- **Volume** under $z = f(x,y)$ over $D$: $\iint_D f\,dA$.
- **Volume between** a top surface $z = T(x,y)$ and a bottom surface $z = B(x,y)$: $\iint_D (T - B)\,dA$. If the problem does not give $D$, set $T = B$ to find its edge.`,
    },
  ],

  formulas: [
    { label: 'Type I (vertical strips)', tex: String.raw`\int_a^b\!\!\int_{g_1(x)}^{g_2(x)} f\,dy\,dx` },
    { label: 'Type II (horizontal strips)', tex: String.raw`\int_c^d\!\!\int_{h_1(y)}^{h_2(y)} f\,dx\,dy` },
    { label: 'Area of D', tex: String.raw`A = \iint_D 1\,dA` },
    { label: 'Volume between surfaces', tex: String.raw`V = \iint_D (T - B)\,dA` },
  ],

  mistakes: [
    {
      id: 'outer-not-constant',
      title: 'A variable in the outer limits',
      wrong: String.raw`$\int_0^{x^2}\!\int_0^2 f\,dy\,dx$`,
      right: String.raw`$\int_0^2\!\int_0^{x^2} f\,dy\,dx$`,
      why: 'Once every integral is done the answer must be a number. Outer limits are constants; inner limits may depend only on variables further out.',
    },
    {
      id: 'flip-no-sketch',
      title: 'Flipping limits without a sketch',
      wrong: String.raw`$\int_0^1\!\int_x^1 f\,dy\,dx \to \int_0^1\!\int_y^1 f\,dx\,dy$`,
      right: String.raw`$\int_0^1\!\int_x^1 f\,dy\,dx = \int_0^1\!\int_0^y f\,dx\,dy$`,
      why: 'Swapping the symbols describes a different region. Read the old limits as inequalities, draw the region, then slice it the other way.',
    },
    {
      id: 'wrong-top',
      title: 'Top and bottom curves swapped',
      wrong: String.raw`$\int_0^1\!\int_x^{x^2} f\,dy\,dx$ for the region between $y = x^2$ and $y = x$`,
      right: String.raw`$\int_0^1\!\int_{x^2}^{x} f\,dy\,dx$ (test $x = \tfrac12$: $x^2 = \tfrac14 < \tfrac12$)`,
      why: 'Swapped limits flip the sign. Plug a test point in to see which curve is on top.',
    },
    {
      id: 'no-split',
      title: 'Not splitting when a boundary changes',
      wrong: 'Using one curve as the top across the whole region',
      right: 'Split where the boundary switches, or slice the other direction',
      why: 'If a strip exits through a different curve in different places, one pair of limits cannot describe the region.',
    },
    {
      id: 'no-reverse',
      title: 'Attacking an impossible inner integral head-on',
      wrong: String.raw`Trying to find $\int e^{x^2}\,dx$`,
      right: 'Reverse the order so the other variable is integrated first',
      why: 'e^(x²), sin(y²), cos(y²), e^(y³) have no elementary antiderivative. On the exam they are the signal to reverse.',
    },
  ],

  hook: 'Sketch first. Inner limits are curves, outer limits are numbers. Impossible inside means reverse.',

  scene: {
    view: { range: 2.5, z: [-0.2, 3] },
    camera: [4, -4, 3.5],
    layers: [
      { id: 'horiz', kind: 'region2d', y: [0, 2], x: ['y/2', 1], strips: 'horizontal', color: 'water' },
      { id: 'vert', kind: 'region2d', x: [0, 1], y: [0, '2*x'], strips: 'vertical', color: 'wood' },
      { id: 'line', kind: 'curve', x: 't', y: '2*t', z: '0', t: [0, 1], color: 'road' },
      { id: 'edge', kind: 'curve', x: '1', y: 't', z: '0', t: [0, 2], color: 'ink' },
      { id: 'corner', kind: 'point', at: [1, 2, 0], label: '(1, 2)' },
      { id: 'surf', kind: 'surface', z: 'exp(x^2)', domain: { x: [0, 1], y: [0, '2*x'] }, colormap: 'inferno', opacity: 0.8 },
      { id: 'solid', kind: 'solid', bottom: '0', top: 'exp(x^2)', region: { x: [0, 1], y: [0, '2*x'] } },
    ],
    steps: [
      {
        label: 'Start',
        show: ['horiz'],
        caption: String.raw`The given order $\int_0^2\!\int_{y/2}^{1} e^{x^2}\,dx\,dy$ uses horizontal strips from $x = y/2$ to $x = 1$. The inner integral $\int e^{x^2}dx$ is impossible.`,
      },
      {
        label: 'Sketch',
        show: ['horiz', 'line', 'edge', 'corner'],
        caption: String.raw`Read the limits as boundaries: the line $x = y/2$ (that is, $y = 2x$), the line $x = 1$, and $y = 0$. The region is a triangle with corner $(1,2)$.`,
      },
      {
        label: 'Vertical strips',
        show: ['vert', 'line', 'edge', 'corner'],
        caption: String.raw`Same triangle, sliced the other way. Each vertical strip runs from $y = 0$ up to $y = 2x$, for $0 \le x \le 1$.`,
      },
      {
        label: 'The volume',
        show: ['vert', 'surf', 'solid'],
        caption: String.raw`Now the inner integral is easy: $\int_0^{2x} e^{x^2}dy = 2x\,e^{x^2}$. The volume under $e^{x^2}$ over the triangle is $\int_0^1 2xe^{x^2}dx = e - 1$.`,
      },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Evaluate $\iint_D xy\,dA$, where $D$ is the region between $y = x^2$ and $y = x$.`,
      choices: [
        { tex: String.raw`$\tfrac{1}{24}$`, correct: true },
        { tex: String.raw`$-\tfrac{1}{24}$`, mistake: 'wrong-top', why: String.raw`On $0<x<1$, $x^2 < x$, so $y$ runs from $x^2$ up to $x$. Reversing them flips the sign.` },
        { tex: String.raw`$\tfrac18$`, mistake: 'setup', why: String.raw`You used $0 \le y \le x$, the whole triangle under $y = x$, instead of stopping at the parabola.` },
        { tex: String.raw`$\tfrac{1}{12}$`, mistake: 'arith', why: String.raw`$\int y\,dy = \tfrac{y^2}{2}$; the $\tfrac12$ was dropped.` },
        { tex: String.raw`$\tfrac16$`, mistake: 'concept', why: 'That is the area of D, the integral of 1, not of xy.' },
      ],
      steps: [
        String.raw`Crossings: $x^2 = x$ at $x = 0, 1$. Test $x = \tfrac12$: $x^2 = \tfrac14 < \tfrac12 = x$, so $y = x$ is on top.`,
        String.raw`$\int_0^1\!\int_{x^2}^{x} xy\,dy\,dx = \int_0^1 \tfrac{x}{2}(x^2 - x^4)\,dx$.`,
        String.raw`$= \tfrac12\left(\tfrac14 - \tfrac16\right) = \tfrac{1}{24}$.`,
      ],
      source: 'Study plan bank #7',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Evaluate $\displaystyle\int_0^2\!\!\int_{y/2}^{1} e^{x^2}\,dx\,dy$.`,
      choices: [
        { tex: String.raw`$e - 1$`, correct: true },
        { tex: String.raw`$\dfrac{e - 1}{2}$`, mistake: 'flip-no-sketch', why: String.raw`The upper boundary is $y = 2x$, not $y = x$. Without the sketch it is easy to write $0 \le y \le x$.` },
        { tex: String.raw`$e^4 - 1$`, mistake: 'flip-no-sketch', why: String.raw`You let $x$ run to 2 (the old $y$ limit). After reversing, $x$ runs from 0 to 1.` },
        { tex: String.raw`$e$`, mistake: 'arith', why: String.raw`$\left[e^{x^2}\right]_0^1 = e - e^0 = e - 1$.` },
        { tex: 'It has no elementary value', mistake: 'no-reverse', why: 'Only the inner integral in this order is impossible. Reverse the order and it becomes a substitution.' },
      ],
      steps: [
        String.raw`Limits as inequalities: $0 \le y \le 2$ and $\tfrac{y}{2} \le x \le 1$. The left edge is $y = 2x$.`,
        String.raw`Sketch: triangle with corners $(0,0)$, $(1,0)$, $(1,2)$.`,
        String.raw`Vertical strips: $0 \le x \le 1$, $0 \le y \le 2x$.`,
        String.raw`$\int_0^1\!\int_0^{2x} e^{x^2}\,dy\,dx = \int_0^1 2x\,e^{x^2}\,dx = e - 1$.`,
      ],
      source: 'Study plan bank #8',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Evaluate $\displaystyle\int_0^2\!\!\int_{x}^{2}\cos(y^2)\,dy\,dx$.`,
      choices: [
        { tex: String.raw`$\dfrac{\sin 4}{2}$`, correct: true },
        { tex: String.raw`$\sin 4$`, mistake: 'arith', why: String.raw`With $u = y^2$, $y\,dy = \tfrac12 du$. The $\tfrac12$ was dropped.` },
        { tex: String.raw`$\dfrac{\sin 2}{2}$`, mistake: 'arith', why: String.raw`The $u$-limits are $u = 0$ to $u = 2^2 = 4$, not 2.` },
        { tex: String.raw`$\dfrac{1 - \cos 4}{2}$`, mistake: 'arith', why: String.raw`That is $\int_0^2 y\sin(y^2)\,dy$. The antiderivative of $\cos u$ is $\sin u$.` },
        { tex: String.raw`$-\dfrac{\sin 4}{2}$`, mistake: 'sign', why: String.raw`$\int\cos u\,du = +\sin u$, and $\sin 0 = 0$.` },
      ],
      steps: [
        String.raw`$\cos(y^2)$ has no antiderivative in $y$: reverse.`,
        String.raw`Region: $0 \le x \le 2$, $x \le y \le 2$. Triangle above $y = x$, below $y = 2$.`,
        String.raw`Horizontal strips: $0 \le y \le 2$, $0 \le x \le y$.`,
        String.raw`$\int_0^2\!\int_0^y \cos(y^2)\,dx\,dy = \int_0^2 y\cos(y^2)\,dy = \tfrac12\sin(y^2)\Big|_0^2 = \tfrac{\sin 4}{2}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Which integral equals $\displaystyle\int_0^4\!\!\int_{\sqrt y}^{2} f(x,y)\,dx\,dy$ with the order reversed?`,
      choices: [
        { tex: String.raw`$\displaystyle\int_0^2\!\!\int_0^{x^2} f\,dy\,dx$`, correct: true },
        { tex: String.raw`$\displaystyle\int_0^2\!\!\int_{x^2}^{4} f\,dy\,dx$`, mistake: 'flip-no-sketch', why: String.raw`$x \ge \sqrt y$ means $y \le x^2$: the region is **under** the parabola, not above it.` },
        { tex: String.raw`$\displaystyle\int_0^{x^2}\!\!\int_0^{2} f\,dy\,dx$`, mistake: 'outer-not-constant', why: 'The outer integral has a variable limit, so the result would not be a number.' },
        { tex: String.raw`$\displaystyle\int_0^4\!\!\int_0^{x^2} f\,dy\,dx$`, mistake: 'setup', why: 'x only runs from 0 to 2 (the right edge). 4 is the old y limit.' },
        { tex: String.raw`$\displaystyle\int_0^2\!\!\int_{\sqrt x}^{4} f\,dy\,dx$`, mistake: 'flip-no-sketch', why: 'That just swaps the letters x and y in the old limits, which describes a different region.' },
      ],
      steps: [
        String.raw`Inequalities: $0 \le y \le 4$ and $\sqrt y \le x \le 2$.`,
        String.raw`$x \ge \sqrt y$ is the same as $y \le x^2$ (for $x \ge 0$). So the region is under $y = x^2$, between $x = 0$ and $x = 2$.`,
        String.raw`Vertical strips: $0 \le x \le 2$, $0 \le y \le x^2$.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Find the volume under the plane $z = x + y$ over the triangle with vertices $(0,0)$, $(1,0)$, $(0,1)$.`,
      choices: [
        { tex: String.raw`$\tfrac13$`, correct: true },
        { tex: String.raw`$1$`, mistake: 'setup', why: 'That integrates over the whole unit square. The triangle stops at the line y = 1 - x.' },
        { tex: String.raw`$\tfrac12$`, mistake: 'arith', why: String.raw`Dropping the $\tfrac12$ in $\int y\,dy = \tfrac{y^2}{2}$ gives $\tfrac16 + \tfrac13$. (It also equals the triangle's area, a second warning sign.)` },
        { tex: String.raw`$\tfrac16$`, mistake: 'concept', why: String.raw`That is only $\iint_D x\,dA$, which is also the volume of the tetrahedron under $z = 1 - x - y$. The height here is $x + y$.` },
        { tex: String.raw`$-\tfrac13$`, mistake: 'wrong-top', why: String.raw`$y$ runs from $0$ up to $1 - x$. Writing the limits the other way flips the sign.` },
      ],
      steps: [
        String.raw`Hypotenuse: $y = 1 - x$. Vertical strips: $0 \le x \le 1$, $0 \le y \le 1 - x$.`,
        String.raw`Inner: $\int_0^{1-x}(x+y)\,dy = x(1-x) + \tfrac{(1-x)^2}{2}$.`,
        String.raw`Outer: $\int_0^1 \left[x(1-x) + \tfrac{(1-x)^2}{2}\right]dx = \tfrac16 + \tfrac16 = \tfrac13$.`,
      ],
      source: 'Study plan bank #9',
    },
    {
      id: 'p6',
      difficulty: 3,
      prompt: String.raw`Let $D$ be the region bounded by $y = \sqrt{x}$, $y = 2 - x$, and the $x$-axis. Evaluate $\iint_D y\,dA$.`,
      choices: [
        { tex: String.raw`$\tfrac{5}{12}$`, correct: true },
        { tex: String.raw`$1$`, mistake: 'no-split', why: String.raw`You used $y = \sqrt x$ as the top all the way to $x = 2$. Past $x = 1$ the top is the line $y = 2 - x$.` },
        { tex: String.raw`$\tfrac43$`, mistake: 'no-split', why: String.raw`You used $y = 2 - x$ as the top all the way from $x = 0$. Before $x = 1$ the top is $y = \sqrt x$.` },
        { tex: String.raw`$\tfrac13$`, mistake: 'flip-no-sketch', why: String.raw`Solving $y = \sqrt x$ for $x$ gives $x = y^2$, not $x = y$.` },
        { tex: String.raw`$-\tfrac{5}{12}$`, mistake: 'wrong-top', why: String.raw`For horizontal strips the left edge is $x = y^2$ and the right edge is $x = 2 - y$; reversing them flips the sign.` },
      ],
      steps: [
        String.raw`Crossing: $\sqrt x = 2 - x$ at $x = 1$, $y = 1$. With vertical strips the top switches at $x = 1$, so slice horizontally instead.`,
        String.raw`Horizontal strips: $0 \le y \le 1$, from $x = y^2$ (left) to $x = 2 - y$ (right).`,
        String.raw`$\int_0^1 y\,(2 - y - y^2)\,dy = 1 - \tfrac13 - \tfrac14 = \tfrac{5}{12}$.`,
        String.raw`Check with the split: $\int_0^1\!\int_0^{\sqrt x} y\,dy\,dx + \int_1^2\!\int_0^{2-x} y\,dy\,dx = \tfrac14 + \tfrac16 = \tfrac{5}{12}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Evaluate $\displaystyle\int_0^8\!\!\int_{\sqrt[3]{y}}^{2} e^{x^4}\,dx\,dy$.`,
      choices: [
        { tex: String.raw`$\dfrac{e^{16} - 1}{4}$`, correct: true },
        { tex: String.raw`$e^{16} - 1$`, mistake: 'arith', why: String.raw`With $u = x^4$, $x^3\,dx = \tfrac14 du$. The $\tfrac14$ was dropped.` },
        { tex: String.raw`$\dfrac{e^{8} - 1}{4}$`, mistake: 'arith', why: String.raw`The upper $u$-limit is $2^4 = 16$, not 8.` },
        { tex: String.raw`$\dfrac{1 - e^{16}}{4}$`, mistake: 'sign', why: String.raw`Evaluate top minus bottom: $e^{16} - e^0$. The integrand is positive, so the answer must be too.` },
        { tex: 'It has no elementary value', mistake: 'no-reverse', why: 'Reverse the order: the inner integral then produces x³, exactly what u = x⁴ needs.' },
      ],
      steps: [
        String.raw`Inequalities: $0 \le y \le 8$, $\sqrt[3]{y} \le x \le 2$. Since $x \ge \sqrt[3]y$ means $y \le x^3$, the region is under $y = x^3$ for $0 \le x \le 2$.`,
        String.raw`Reversed: $\int_0^2\!\int_0^{x^3} e^{x^4}\,dy\,dx = \int_0^2 x^3e^{x^4}\,dx$.`,
        String.raw`$u = x^4$: $\tfrac14\int_0^{16} e^u\,du = \tfrac{e^{16} - 1}{4}$.`,
      ],
      source: 'original',
    },
  ],

  lab: [{ kind: 'surface', expr: 'exp(x^2)' }],
};
