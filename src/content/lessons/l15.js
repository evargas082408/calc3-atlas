export default {
  id: 15,
  title: 'Local max, min and saddle points',
  section: '15.7',
  exam: 1,
  blurb: 'Find every critical point of f(x, y) and classify it with the second derivative test.',
  boiler: ['Second Derivative Test', 'Min Max'],

  sections: [
    {
      id: 'idea',
      title: 'Hilltops have flat tangent planes',
      body: String.raw`$f$ has a **local max** at $(a,b)$ if $f(a,b) \ge f(x,y)$ for all $(x,y)$ near $(a,b)$: the top of a hill, even if a taller hill exists elsewhere. A **local min** is the bottom of a valley.

At a smooth hilltop, the tangent plane is horizontal. Walking east or north you neither climb nor descend at that instant, so $f_x = 0$ and $f_y = 0$. That is the 2-variable version of "$f'(a) = 0$ at a peak."

**Critical point:** an interior point where $\nabla f = \vec 0$ (both $f_x = 0$ and $f_y = 0$), or where a partial does not exist.

**Theorem.** If $f$ has a local max or min at $(a,b)$ and the partials exist there, then $\nabla f(a,b) = \vec 0$. So every local extremum is a critical point, but the reverse fails, as the next section shows.`,
    },
    {
      id: 'saddle',
      title: 'Saddle points',
      body: String.raw`Take $f = x^2 - y^2$. At the origin $f_x = 2x = 0$ and $f_y = -2y = 0$, so $(0,0)$ is critical. But:

- along the $x$-axis, $f = x^2$ curves **up**: the origin looks like a min;
- along the $y$-axis, $f = -y^2$ curves **down**: it looks like a max.

Some nearby points are higher and some lower, so it is neither. This is a **saddle point**: a Pringles chip, or a mountain pass, where the trail is the lowest point going over the ridge but the highest point going along it.

Compare the three model surfaces, all with a critical point at the origin:

- $z = x^2 + y^2$: bowl, local min.
- $z = -(x^2 + y^2)$: hill, local max.
- $z = x^2 - y^2$: saddle.`,
    },
    {
      id: 'finding',
      title: 'Finding critical points: solve the system carefully',
      body: String.raw`Set $f_x = 0$ and $f_y = 0$ and solve them **together**. Two habits prevent lost points:

1. **Factor instead of dividing.** If $x(x^8 - 1) = 0$, keep $x = 0$. Dividing by $x$ throws it away.
2. **Split into cases** and pair every case of one equation with the other equation.

**Example.** $f = x^4 + y^4 - 4xy + 1$.

- $f_x = 4x^3 - 4y = 0 \Rightarrow y = x^3$.
- $f_y = 4y^3 - 4x = 0 \Rightarrow x = y^3$.
- Substitute: $x = (x^3)^3 = x^9$, so $x(x^8 - 1) = 0$: $x = 0, 1, -1$.
- Then $y = x^3$: critical points $(0,0)$, $(1,1)$, $(-1,-1)$.

**Example (cases).** $f = \tfrac13y^3 + x^2 + 4xy - 2x - 13y + 7$. $f_x = 2x + 4y - 2 = 0$ gives $x = 1 - 2y$. Then $f_y = y^2 + 4x - 13 = y^2 - 8y - 9 = (y - 9)(y + 1) = 0$. Critical points $(-17, 9)$ and $(3, -1)$.

**Example (products).** $f = xy\,e^{-(2x^2 + 8y^2)}$. The exponential is never 0, so $f_x = 0$ means $y(1 - 4x^2) = 0$ and $f_y = 0$ means $x(1 - 16y^2) = 0$. Case $y = 0$: then $x = 0$. Case $x = \pm\tfrac12$: then $y = \pm\tfrac14$. Five points: $(0,0)$ and $\left(\pm\tfrac12, \pm\tfrac14\right)$.`,
    },
    {
      id: 'test',
      title: 'The second derivative test',
      body: String.raw`At a critical point, compute the **discriminant**

$$D = f_{xx}f_{yy} - (f_{xy})^2,$$

the determinant of $\begin{bmatrix} f_{xx} & f_{xy}\\ f_{xy} & f_{yy}\end{bmatrix}$. Then:

- $D > 0$ and $f_{xx} > 0$: **local min** (smile).
- $D > 0$ and $f_{xx} < 0$: **local max** (frown).
- $D < 0$: **saddle**, whatever $f_{xx}$ is.
- $D = 0$: **no conclusion**. The test is silent.

**Why it works.** $f_{xx}$ and $f_{yy}$ measure how the surface bends in the $x$ and $y$ directions; $f_{xy}$ measures twist. $D > 0$ means both bends have the same sign and beat the twist, so the surface curves the same way in every direction. $D < 0$ means some direction curves up and another curves down. (If $f_{xx}f_{yy} < 0$, then $D < 0$ automatically: saddle.)

**Example.** $f = x^4 + y^4 - 4xy + 1$: $f_{xx} = 12x^2$, $f_{yy} = 12y^2$, $f_{xy} = -4$, so $D = 144x^2y^2 - 16$.

- $(0,0)$: $D = -16 < 0$, saddle, $f = 1$.
- $(1,1)$ and $(-1,-1)$: $D = 128 > 0$, $f_{xx} = 12 > 0$, local min, $f = -1$.

**Example.** $f = \tfrac13y^3 + x^2 + 4xy - 2x - 13y + 7$: $f_{xx} = 2$, $f_{yy} = 2y$, $f_{xy} = 4$. At $(-17, 9)$: $D = 36 - 16 = 20 > 0$, local min. At $(3,-1)$: $D = -4 - 16 = -20$, saddle.`,
    },
    {
      id: 'dzero',
      title: 'When D = 0, look at f itself',
      body: String.raw`$D = 0$ means the second derivatives are too flat to decide. You have to reason from the function.

**Example.** $f = 2x^4 + y^4$. Only critical point $(0,0)$, where every second partial is 0, so $D = 0$. But $f(0,0) = 0$ and $f > 0$ everywhere else, so it is a local (in fact absolute) min.

**Example.** $f = x^3 + y^2$. At $(0,0)$, $D = (6x)(2) - 0 = 0$. Along the $x$-axis, $f = x^3$ is negative on one side and positive on the other, so $(0,0)$ is neither a max nor a min.

**Example (whole line of critical points).** $f = 2 - xy^2$. $f_x = -y^2$, $f_y = -2xy$, so every point $(a, 0)$ is critical and $D = 0$ along the whole line. Near $(a,0)$ with $a > 0$, $f = 2 - ay^2 \le 2$: local max. With $a < 0$, $f \ge 2$: local min.

From the Exam 1 review: $f = xy^4 - x - \tfrac12x^2$ has saddles at $(0, \pm1)$ ($D = -16$) and $D = 0$ at $(-1, 0)$, where the test says nothing.

**Answer what is asked.** "Find the local minimum **value**" wants $f(a,b)$, a number. "Where" wants the point.`,
    },
  ],

  formulas: [
    { label: 'Critical point', tex: String.raw`\nabla f(a,b) = \vec 0 \ \text{ or a partial does not exist}` },
    { label: 'Discriminant', tex: String.raw`D = f_{xx}f_{yy} - (f_{xy})^2` },
    { label: 'Local min / max', tex: String.raw`D > 0:\ f_{xx} > 0 \Rightarrow \text{min},\ \ f_{xx} < 0 \Rightarrow \text{max}` },
    { label: 'Saddle / no info', tex: String.raw`D < 0 \Rightarrow \text{saddle},\qquad D = 0 \Rightarrow \text{test fails}` },
  ],

  mistakes: [
    {
      id: 'missed-case',
      title: 'Losing critical points while solving',
      wrong: String.raw`$x^9 = x$, so $x^8 = 1$, so $x = \pm1$`,
      right: String.raw`$x(x^8 - 1) = 0$, so $x = 0, \pm1$`,
      why: 'Dividing by a variable throws away the case where it is 0. Factor, then handle every factor as its own case.',
    },
    {
      id: 'd-cases',
      title: 'Mixing up D < 0 and D = 0, or using f_xx when D < 0',
      wrong: String.raw`$D = 0$, so saddle; or $D < 0$ but $f_{xx} < 0$, so max`,
      right: String.raw`$D < 0$ is always a saddle. $D = 0$ means the test gives no answer; examine $f$ directly.`,
      why: 'f_xx only matters once you know D > 0. A saddle can curve down in x and still curve up in another direction.',
    },
    {
      id: 'fxx-sign',
      title: 'Swapping max and min',
      wrong: String.raw`$D > 0$, $f_{xx} > 0$, so local max`,
      right: String.raw`$f_{xx} > 0$ means concave up (a smile): local **min**.`,
      why: 'Same as Calc I: f″ > 0 is a cup, and the bottom of a cup is a minimum.',
    },
    {
      id: 'd-formula',
      title: 'Forgetting to square f_xy',
      wrong: String.raw`$D = f_{xx}f_{yy} - f_{xy}$`,
      right: String.raw`$D = f_{xx}f_{yy} - (f_{xy})^2$`,
      why: 'D is the determinant of the 2×2 matrix of second partials, and f_xy appears twice in it.',
    },
  ],

  hook: 'D positive: a dome or a dip, so check f_xx (frown = max, smile = min). D negative: downright saddle. D zero: does not tell.',

  scene: {
    view: { range: 2, z: [-2.5, 4] },
    camera: [5, -5, 4],
    layers: [
      { id: 'bowl', kind: 'surface', z: 'x^2 + y^2', domain: { r: [0, 1.7], theta: [0, '2*pi'] }, colormap: 'viridis', opacity: 0.9 },
      { id: 'bowlPt', kind: 'point', at: [0, 0, 0], label: 'local min' },
      { id: 'hill', kind: 'surface', z: '2 - x^2 - y^2', domain: { r: [0, 1.7], theta: [0, '2*pi'] }, colormap: 'terrain', opacity: 0.9 },
      { id: 'hillPt', kind: 'point', at: [0, 0, 2], label: 'local max' },
      { id: 'saddle', kind: 'surface', z: 'x^2 - y^2', domain: { x: [-1.4, 1.4], y: [-1.4, 1.4] }, colormap: 'textbook', opacity: 0.85 },
      { id: 'upX', kind: 'curveOnSurface', of: 'saddle', x: 't', y: '0', t: [-1.4, 1.4], color: 'road' },
      { id: 'downY', kind: 'curveOnSurface', of: 'saddle', x: '0', y: 't', t: [-1.4, 1.4], color: 'water' },
      { id: 'saddlePt', kind: 'point', at: [0, 0, 0], label: 'saddle' },
      { id: 'quart', kind: 'surface', z: 'x^4 + y^4 - 4*x*y + 1', domain: { x: [-1.7, 1.7], y: [-1.7, 1.7] }, colormap: 'terrain', opacity: 0.85 },
      { id: 'quartLvl', kind: 'contours', of: 'quart', levels: 10 },
      { id: 'qMin1', kind: 'point', at: [1, 1, -1], label: 'min (1, 1)' },
      { id: 'qMin2', kind: 'point', at: [-1, -1, -1], label: 'min (-1, -1)' },
      { id: 'qSad', kind: 'point', at: [0, 0, 1], label: 'saddle (0, 0)' },
    ],
    steps: [
      { label: 'Start', show: ['bowl', 'bowlPt'], caption: String.raw`$z = x^2 + y^2$. At the bottom the tangent plane is flat: $\nabla f = \vec0$. $D = 4 > 0$, $f_{xx} = 2 > 0$: local min.` },
      { label: 'Hill', show: ['hill', 'hillPt'], caption: String.raw`$z = 2 - x^2 - y^2$. Flat at the top too. $D = 4 > 0$, but $f_{xx} = -2 < 0$: local max.` },
      { label: 'Saddle', show: ['saddle', 'upX', 'downY', 'saddlePt'], caption: String.raw`$z = x^2 - y^2$ is also flat at the origin, but it curves up along $x$ (red) and down along $y$ (blue). $D = -4 < 0$: saddle.` },
      { label: 'Example', show: ['quart', 'qMin1', 'qMin2', 'qSad'], caption: String.raw`$f = x^4 + y^4 - 4xy + 1$ has three critical points. $D = 144x^2y^2 - 16$: negative at $(0,0)$, positive at $(\pm1, \pm1)$.` },
      { label: 'Contours', show: ['quartLvl', 'qMin1', 'qMin2', 'qSad'], caption: String.raw`On the contour map, minima sit inside nested rings. The saddle sits where contour lines cross, between the two valleys.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Classify the critical point of $f(x, y) = x^2 + 3xy + y^2 - 5x - 5y$.`,
      choices: [
        { tex: String.raw`Saddle point at $(1, 1)$`, correct: true },
        { tex: String.raw`Local min at $(1, 1)$`, mistake: 'd-formula', why: 'D = 2·2 - 3^2 = -5. Without squaring f_xy you get 4 - 3 = 1 > 0, which looks like a min.' },
        { tex: String.raw`Local max at $(1, 1)$`, mistake: 'fxx-sign', why: 'Even if D were positive, f_xx = 2 > 0 would mean a min. In fact D < 0.' },
        { tex: String.raw`The test is inconclusive at $(1, 1)$`, mistake: 'd-cases', why: 'Inconclusive is D = 0. Here D = -5.' },
        { tex: String.raw`Saddle point at $(-1, -1)$`, mistake: 'sign', why: '2x + 3y = 5 and 3x + 2y = 5 give x = y = 1.' },
      ],
      steps: [
        String.raw`$f_x = 2x + 3y - 5 = 0$, $f_y = 3x + 2y - 5 = 0$. Subtracting: $x = y$, then $5x = 5$: $(1,1)$.`,
        String.raw`$f_{xx} = 2$, $f_{yy} = 2$, $f_{xy} = 3$.`,
        String.raw`$D = 4 - 9 = -5 < 0$: saddle.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Find and classify the critical points of $f(x, y) = x^3 - 3x + y^2 - 4y$.`,
      choices: [
        { tex: String.raw`Local min at $(1, 2)$, saddle at $(-1, 2)$`, correct: true },
        { tex: String.raw`Local min at $(1, 2)$ only`, mistake: 'missed-case', why: '3x^2 - 3 = 0 has two roots, x = 1 and x = -1.' },
        { tex: String.raw`Local min at $(1, 2)$, local max at $(-1, 2)$`, mistake: 'd-cases', why: 'At (-1, 2), D = (-6)(2) - 0 = -12 < 0. A negative D is a saddle no matter what f_xx is.' },
        { tex: String.raw`Local max at $(1, 2)$, saddle at $(-1, 2)$`, mistake: 'fxx-sign', why: 'f_xx = 6 > 0 at (1, 2): concave up, a min.' },
        { tex: String.raw`Saddles at $(1, 2)$ and $(-1, 2)$`, mistake: 'arith', why: 'At (1,2), D = 6·2 = 12 > 0.' },
      ],
      steps: [
        String.raw`$f_x = 3x^2 - 3 = 0 \Rightarrow x = \pm1$. $f_y = 2y - 4 = 0 \Rightarrow y = 2$.`,
        String.raw`$f_{xx} = 6x$, $f_{yy} = 2$, $f_{xy} = 0$, so $D = 12x$.`,
        String.raw`$(1,2)$: $D = 12 > 0$, $f_{xx} = 6 > 0$: local min.`,
        String.raw`$(-1,2)$: $D = -12 < 0$: saddle.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Find the local minimum value of $f(x, y) = x^3 + y^3 - 3xy$.`,
      choices: [
        { tex: String.raw`$-1$`, correct: true },
        { tex: String.raw`$(1, 1)$`, mistake: 'units', why: 'That is where the min is. The question asks for the value f(1, 1).' },
        { tex: String.raw`$0$`, mistake: 'd-cases', why: 'That is f(0, 0), but (0, 0) has D = -9 < 0: a saddle, not a min.' },
        { tex: String.raw`$5$`, mistake: 'sign', why: 'f(1,1) = 1 + 1 - 3 = -1. The xy term is subtracted.' },
        { tex: String.raw`$-3$`, mistake: 'arith', why: 'You dropped x^3 + y^3 = 2.' },
      ],
      steps: [
        String.raw`$f_x = 3x^2 - 3y = 0 \Rightarrow y = x^2$. $f_y = 3y^2 - 3x = 0 \Rightarrow x = y^2$.`,
        String.raw`So $x = x^4$, $x(x^3 - 1) = 0$: $x = 0$ or $x = 1$. Points $(0,0)$ and $(1,1)$.`,
        String.raw`$f_{xx} = 6x$, $f_{yy} = 6y$, $f_{xy} = -3$, $D = 36xy - 9$.`,
        String.raw`$(0,0)$: $D = -9$, saddle. $(1,1)$: $D = 27 > 0$, $f_{xx} = 6 > 0$, local min with value $f(1,1) = -1$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`What can you conclude about $f(x, y) = 3 + x^4 + y^4$ at its critical point $(0,0)$?`,
      choices: [
        { tex: String.raw`$D = 0$, so the test fails; but $f(x,y) \ge 3 = f(0,0)$ everywhere, so it is a local min`, correct: true },
        { tex: String.raw`$D = 0$, so $(0,0)$ is a saddle point`, mistake: 'd-cases', why: 'D = 0 gives no conclusion. It does not mean saddle.' },
        { tex: String.raw`$D = 0$, so $(0,0)$ is not a critical point`, mistake: 'concept', why: 'Critical means ∇f = 0, and f_x = 4x^3, f_y = 4y^3 are both 0 there. D only classifies.' },
        { tex: String.raw`$D > 0$ and $f_{xx} > 0$, so it is a local min`, mistake: 'd-formula', why: 'Right conclusion, wrong reason: f_xx = 12x^2 and f_yy = 12y^2 are both 0 at the origin, so D = 0.' },
        { tex: String.raw`It is a local max, since $f(0,0) = 3 > 0$`, mistake: 'fxx-sign', why: 'f grows in every direction from the origin, so 3 is the lowest value nearby.' },
      ],
      steps: [
        String.raw`$f_x = 4x^3$, $f_y = 4y^3$: only critical point $(0,0)$.`,
        String.raw`$f_{xx} = 12x^2$, $f_{yy} = 12y^2$, $f_{xy} = 0$, all 0 at the origin: $D = 0$, no conclusion.`,
        String.raw`Look at $f$: $x^4 + y^4 \ge 0$, so $f \ge 3 = f(0,0)$. Local (and absolute) min.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Find all critical points of $f(x, y) = xy(x + y - 3)$.`,
      choices: [
        { tex: String.raw`$(0,0)$, $(3,0)$, $(0,3)$, $(1,1)$`, correct: true },
        { tex: String.raw`$(1, 1)$ only`, mistake: 'missed-case', why: 'Dividing f_x = y(2x + y - 3) by y and f_y = x(x + 2y - 3) by x throws away the cases y = 0 and x = 0.' },
        { tex: String.raw`$(0,0)$, $(3,0)$, $(0,3)$`, mistake: 'missed-case', why: 'You missed the case where both second factors vanish: 2x + y = 3 and x + 2y = 3 give (1, 1).' },
        { tex: String.raw`$(0,0)$, $(3,0)$, $(0,3)$, $(1,1)$, $(3,3)$`, mistake: 'setup', why: 'At (3,3), f_x = 3(6 + 3 - 3) = 18 ≠ 0. Each case of one equation must be paired with the other equation.' },
        { tex: String.raw`$(0,0)$ and $(1,1)$`, mistake: 'missed-case', why: 'With y = 0, f_y = x(x - 3) = 0 gives x = 0 and x = 3. Similarly x = 0 gives y = 0 and y = 3.' },
      ],
      steps: [
        String.raw`$f = x^2y + xy^2 - 3xy$. $f_x = y(2x + y - 3)$, $f_y = x(x + 2y - 3)$.`,
        String.raw`Case $y = 0$: $f_y = x(x - 3) = 0$, so $(0,0)$ and $(3,0)$.`,
        String.raw`Case $2x + y = 3$ with $x = 0$: $y = 3$, giving $(0,3)$.`,
        String.raw`Case $2x + y = 3$ with $x + 2y = 3$: $x = y = 1$, giving $(1,1)$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 3,
      prompt: String.raw`Find the local maximum value of $f(x, y) = x\,e^{-x^2 - y^2}$.`,
      choices: [
        { tex: String.raw`$\dfrac{1}{\sqrt{2e}}$`, correct: true },
        { tex: String.raw`$\left(\tfrac{1}{\sqrt2}, 0\right)$`, mistake: 'units', why: 'That is where the max is. The value is f at that point.' },
        { tex: String.raw`$-\dfrac{1}{\sqrt{2e}}$`, mistake: 'fxx-sign', why: 'That is the local min value, at (-1/√2, 0), where f_xx > 0.' },
        { tex: String.raw`$\dfrac{1}{\sqrt2}$`, mistake: 'arith', why: 'You dropped the exponential: e^{-1/2} multiplies 1/√2.' },
        { tex: String.raw`There is no local max: both critical points are saddles`, mistake: 'd-cases', why: 'At both points f_xy = 0 and f_xx, f_yy have the same sign, so D > 0.' },
      ],
      steps: [
        String.raw`$f_x = (1 - 2x^2)e^{-x^2-y^2}$, $f_y = -2xy\,e^{-x^2-y^2}$. The exponential is never 0.`,
        String.raw`$f_y = 0$ needs $x = 0$ or $y = 0$. $x = 0$ makes $f_x = e^{-y^2} \ne 0$, so $y = 0$ and $x = \pm\tfrac{1}{\sqrt2}$.`,
        String.raw`At $\left(\tfrac{1}{\sqrt2}, 0\right)$: $f_{xx} = -2\sqrt2\,e^{-1/2} < 0$, $f_{yy} = -\sqrt2\,e^{-1/2}$, $f_{xy} = 0$, so $D = 4e^{-1} > 0$: local max.`,
        String.raw`Value: $\tfrac{1}{\sqrt2}e^{-1/2} = \dfrac{1}{\sqrt{2e}}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`At a critical point $(a, b)$ of $f$, you know $f_{xx}(a,b)\,f_{yy}(a,b) < 0$, but not $f_{xy}(a,b)$. What is $(a, b)$?`,
      choices: [
        { tex: String.raw`A saddle point`, correct: true },
        { tex: String.raw`It cannot be determined without $f_{xy}$`, mistake: 'd-cases', why: 'D = f_xx f_yy - (f_xy)^2 is a negative number minus something ≥ 0, so D < 0 whatever f_xy is.' },
        { tex: String.raw`A local max if $f_{xx} < 0$`, mistake: 'd-cases', why: 'f_xx only decides between max and min once D > 0. Here D < 0.' },
        { tex: String.raw`A local min if $f_{xx} > 0$`, mistake: 'd-cases', why: 'f_yy has the opposite sign, so the surface curves the other way in y. D < 0: saddle.' },
        { tex: String.raw`The test is inconclusive`, mistake: 'd-cases', why: 'Inconclusive is D = 0. Here D is strictly negative.' },
      ],
      steps: [
        String.raw`$D = f_{xx}f_{yy} - (f_{xy})^2$.`,
        String.raw`$f_{xx}f_{yy} < 0$ and $(f_{xy})^2 \ge 0$, so $D < 0$.`,
        String.raw`$D < 0$ means saddle. (Same idea as the review question with $f_{xx} + f_{yy} = 0$: then $D = -(f_{xx})^2 - (f_{xy})^2 < 0$.)`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: 'x^4 + y^4 - 4*x*y + 1', z: 'x^4 + y^4 - 4*x*y + 1' },
    { kind: 'surface', expr: 'x^2 - y^2', z: 'x^2 - y^2' },
  ],
};
