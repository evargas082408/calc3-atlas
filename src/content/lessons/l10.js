export default {
  id: 10,
  title: 'Limits and continuity',
  section: '15.2',
  exam: 1,
  blurb: 'Decide whether a two-variable limit exists: plug in, simplify, or break it with two paths.',
  boiler: ['3D Limits', 'Limits', 'Continuity'],

  sections: [
    {
      id: 'idea',
      title: 'Infinitely many ways to arrive',
      body: String.raw`In Calc I, $\lim_{x\to a} f(x) = L$ meant: approach $a$ from the left and from the right, and both sides head to $L$. There were only two directions.

In the plane, you can walk toward $(a, b)$ along the $x$-axis, along a diagonal, along a parabola, spiraling in. The statement

$$\lim_{(x,y)\to(a,b)} f(x, y) = L$$

means $f$ gets close to $L$ **no matter which path you take**, as long as you get close enough to $(a, b)$. (Formally: for every $\varepsilon > 0$ there is a $\delta > 0$ so that $|f(x,y) - L| < \varepsilon$ whenever $0 < \sqrt{(x-a)^2 + (y-b)^2} < \delta$.)

That one change has two consequences:

- **Showing a limit does not exist is easy.** Find two paths that give different answers.
- **Showing a limit exists is harder.** Agreeing on a few paths proves nothing, because there are infinitely many others.`,
    },
    {
      id: 'plug-simplify',
      title: 'Step 1 and 2: plug in, then simplify',
      body: String.raw`Polynomials, $\sin$, $\cos$, $e^u$, and logs and roots inside their domains are all continuous, and so are sums, products, quotients (nonzero bottom) and compositions of them. For a continuous function the limit is just the value, so **always try plugging in first.**

**Example.** $\displaystyle\lim_{(x,y)\to(0,0)} \frac{\cos(7x^3 y)}{8 + e^{3xy^2}} = \frac{\cos 0}{8 + e^0} = \frac19.$ The bottom is always bigger than 8, so nothing breaks.

If plugging in gives $\tfrac00$, that is **not** an answer yet. It means "do more work." Try to factor and cancel, or multiply by a conjugate.

**Example.** $\dfrac{x^3 - y^3}{x - y}$ at $(0,0)$ gives $\tfrac00$. Factor the top: $x^3 - y^3 = (x - y)(x^2 + xy + y^2)$. Cancel (allowed, since in a limit we never sit on the line $x = y$):

$$\lim_{(x,y)\to(0,0)} (x^2 + xy + y^2) = 0.$$

**Substitution trick.** When $x^2 + y^2$ appears as one block, call it $\theta$. As $(x,y)\to(0,0)$, $\theta \to 0^+$, and a one-variable limit is left:

$$\lim_{(x,y)\to(0,0)}\frac{\sin(5(x^2+y^2))}{x^2+y^2} = \lim_{\theta\to0}\frac{\sin 5\theta}{\theta} = 5.$$

(Not 1. The standard limit is $\frac{\sin u}{u}\to 1$ only when the top and bottom match.)`,
    },
    {
      id: 'two-path',
      title: 'Step 3: the two-path test',
      body: String.raw`If simplifying does not work, suspect the limit does not exist (DNE). Approach along specific curves, which turns the problem into a one-variable limit.

**Two-path test.** If $f \to L_1$ along one path and $f \to L_2$ along another, with $L_1 \ne L_2$, the limit does not exist.

**Example.** $\displaystyle\lim_{(x,y)\to(0,0)}\frac{x^2 - y^2}{x^2 + y^2}$.

- Along $y = 0$: $\frac{x^2}{x^2} = 1$.
- Along $x = 0$: $\frac{-y^2}{y^2} = -1$.

$1 \ne -1$, so DNE.

**Use $y = mx$ to test all lines at once.** For $\frac{xy}{x^2 + y^2}$: substitute $y = mx$ to get $\frac{m x^2}{(1 + m^2) x^2} = \frac{m}{1+m^2}$. The answer depends on $m$ ($m = 0$ gives 0, $m = 1$ gives $\tfrac12$), so DNE.

**Good paths to try, in order:** the axes $x = 0$ and $y = 0$, lines $y = mx$, then curves that make the top and bottom the same degree. If you see $y^2$ next to $x$, try $x = my^2$. If you see $x^2$ next to $y$, try $y = mx^2$.`,
    },
    {
      id: 'curves',
      title: 'When every line agrees and the limit still fails',
      body: String.raw`This is the classic trap. Take

$$\lim_{(x,y)\to(0,0)} \frac{3xy^2}{x^2 + y^4}.$$

Along $y = mx$: $\dfrac{3m^2x^3}{x^2 + m^4x^4} = \dfrac{3m^2 x}{1 + m^4x^2} \to 0$ for **every** slope $m$. Along both axes, also 0. It looks like the answer is 0.

Now try the parabola $x = my^2$, chosen so that $x^2$ and $y^4$ have the same size:

$$\frac{3(my^2)y^2}{m^2y^4 + y^4} = \frac{3m}{m^2 + 1}.$$

That depends on $m$: $m = 1$ gives $\tfrac32$, not 0. **DNE.**

The surface has a ridge that curves into the origin along $x = y^2$. Every straight line slips past it; the parabola rides along the top of it.

**The lesson:** paths can prove a limit does **not** exist. They can never prove a limit **does** exist. If all paths agree, you still need algebra (cancel, substitute) or a squeeze. A quick squeeze: $\left|\frac{x^2 y}{x^2+y^2}\right| \le |y|$ because $\frac{x^2}{x^2+y^2}\le 1$, and $|y|\to 0$, so that limit is 0.`,
    },
    {
      id: 'continuity',
      title: 'Continuity',
      body: String.raw`$f$ is **continuous** at $(a, b)$ when three things all hold:

1. $f(a, b)$ is defined.
2. $\lim_{(x,y)\to(a,b)} f(x, y)$ exists.
3. They are equal.

To find where a formula is continuous, find where it is defined: building blocks are continuous on their domains.

- $\ln(x^2 + y^2 + 4)$: the inside is at least 4, so continuous everywhere.
- $e^{x/y}$: continuous wherever $y \ne 0$.
- $\sqrt{x^2 + y^2 + z^2 - 1}$: continuous where $x^2 + y^2 + z^2 \ge 1$.

**Piecewise functions** are where exam questions live. Let $f = \frac{3xy^2}{x^2 + y^4}$ away from the origin and $f(0,0) = 0$. Condition 1 holds, but the limit does not exist (previous section), so $f$ is not continuous at the origin. Defining a value does not fix a missing limit.

**Open and closed sets (vocabulary).** A point is *interior* to $D$ if some small disk around it stays in $D$. A *boundary* point has points of $D$ and points not in $D$ in every disk around it. $D$ is *open* if it contains none of its boundary ($x^2 + y^2 < 4$) and *closed* if it contains all of it ($x^2 + y^2 \le 4$). You need this in Lesson 16.`,
    },
  ],

  formulas: [
    { label: 'Continuity at (a, b)', tex: String.raw`\lim_{(x,y)\to(a,b)} f(x,y) = f(a,b)` },
    { label: 'Two-path test', tex: String.raw`L_1 \ne L_2 \text{ on two paths} \implies \text{DNE}` },
    { label: 'Lines through the origin', tex: String.raw`y = mx: \ \text{answer depends on } m \implies \text{DNE}` },
    { label: 'Scaled sine limit', tex: String.raw`\lim_{\theta\to0}\frac{\sin(k\theta)}{\theta} = k` },
  ],

  mistakes: [
    {
      id: 'lines-only',
      title: 'Testing only straight lines',
      wrong: String.raw`$\frac{3xy^2}{x^2+y^4} \to 0$ along every $y = mx$, so the limit is 0`,
      right: String.raw`Along $x = y^2$ it is $\tfrac32$. DNE.`,
      why: 'Lines y = mx are only some of the paths. When the powers are mismatched (x next to y^2), try a parabola that balances them.',
    },
    {
      id: 'paths-prove',
      title: 'Thinking agreeing paths prove the limit',
      wrong: 'Three paths gave 0, so the limit is 0.',
      right: 'Agreeing paths only fail to disprove. Prove existence by simplifying, substituting, or squeezing.',
      why: 'There are infinitely many paths. You cannot check them all one at a time.',
    },
    {
      id: 'zero-over-zero',
      title: 'Calling 0/0 a final answer',
      wrong: String.raw`$\frac{x^3 - y^3}{x - y}$ gives $\frac00$ at the origin, so DNE`,
      right: String.raw`Factor and cancel: $x^2 + xy + y^2 \to 0$.`,
      why: '0/0 is an indeterminate form. It tells you to keep working, not that the limit is missing.',
    },
    {
      id: 'sin-scale',
      title: 'Dropping the scale factor in sin(ku)/u',
      wrong: String.raw`$\frac{\sin(5(x^2+y^2))}{x^2+y^2} \to 1$`,
      right: String.raw`$\to 5$, since $\frac{\sin 5\theta}{\theta} = 5\cdot\frac{\sin5\theta}{5\theta}$.`,
      why: 'sin(u)/u → 1 needs the same u on top and bottom.',
    },
    {
      id: 'define-fixes',
      title: 'Assuming a defined value makes f continuous',
      wrong: String.raw`$f(0,0) = 0$ is given, so $f$ is continuous at the origin`,
      right: 'Check that the limit exists and equals that value.',
      why: 'Continuity needs all three: defined, limit exists, and they match.',
    },
  ],

  hook: 'Paths can kill a limit but never prove one. Two different answers: DNE.',

  scene: {
    view: { range: 2, z: [-2, 2] },
    camera: [5, -5, 4],
    layers: [
      { id: 'surf', kind: 'surface', z: '3*x*y^2/(x^2 + y^4 + 0.000001)', domain: { x: [-1.6, 1.6], y: [-1.6, 1.6] }, colormap: 'textbook', opacity: 0.85 },
      { id: 'lineA', kind: 'curveOnSurface', of: 'surf', x: 't', y: 't', t: [-1.5, 1.5], color: 'road' },
      { id: 'lineB', kind: 'curveOnSurface', of: 'surf', x: 't', y: '0.4*t', t: [-1.5, 1.5], color: 'road' },
      { id: 'parab', kind: 'curveOnSurface', of: 'surf', x: 't^2', y: 't', t: [-1.25, 1.25], color: 'water' },
      { id: 'floorParab', kind: 'curve', x: 't^2', y: 't', z: '0', t: [-1.25, 1.25], color: 'water' },
      { id: 'floorLines', kind: 'curve', x: 't', y: 't', z: '0', t: [-1.5, 1.5], color: 'road' },
      { id: 'zero', kind: 'point', at: [0, 0, 0], label: 'lines give 0' },
      { id: 'high', kind: 'point', at: [0, 0, 1.5], label: 'parabola gives 3/2' },
    ],
    steps: [
      { label: 'Start', show: ['surf'], caption: String.raw`The surface $z = \frac{3xy^2}{x^2 + y^4}$. It is not defined at the origin, and the question is what height it is heading toward there.` },
      { label: 'Lines', show: ['surf', 'lineA', 'lineB', 'floorLines', 'zero'], caption: String.raw`Walk in along straight lines $y = mx$. Every line sinks to height 0 at the origin, whatever the slope.` },
      { label: 'Parabola', show: ['surf', 'parab', 'floorParab', 'high'], caption: String.raw`Now walk in along the parabola $x = y^2$. The height stays at exactly $\tfrac32$ the whole way in.` },
      { label: 'Compare', show: ['surf', 'lineA', 'parab', 'zero', 'high'], caption: String.raw`Two paths, two different heights: 0 and $\tfrac32$. The limit does not exist, even though every straight line agreed.` },
      { label: 'Floor', show: ['floorParab', 'floorLines'], caption: String.raw`On the map, the parabola hugs the $x$-axis as it arrives. That is why lines miss the ridge: you need a path whose $x$ shrinks like $y^2$.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Evaluate $\displaystyle\lim_{(x,y)\to(1,0)} \frac{x^2 + e^{xy}}{3 + \ln x}$.`,
      choices: [
        { tex: String.raw`$\tfrac23$`, correct: true },
        { tex: String.raw`$\tfrac13$`, mistake: 'arith', why: 'e^{xy} at (1,0) is e^0 = 1, not 0. The top is 1 + 1 = 2.' },
        { tex: String.raw`$\tfrac12$`, mistake: 'arith', why: 'ln 1 = 0, not 1. The bottom is 3.' },
        { tex: String.raw`The limit does not exist`, mistake: 'concept', why: 'Everything here is continuous at (1,0) and the bottom is 3, not 0. Just plug in.' },
        { tex: String.raw`$\tfrac{1+e}{3}$`, mistake: 'arith', why: 'xy = 0 at (1,0), so e^{xy} = 1, not e.' },
      ],
      steps: [
        String.raw`Top and bottom are built from continuous pieces, and the bottom at $(1,0)$ is $3 + \ln 1 = 3 \ne 0$.`,
        String.raw`So the limit is the value: $\frac{1 + e^0}{3} = \frac{2}{3}$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Evaluate $\displaystyle\lim_{(x,y)\to(4,4)} \frac{x - y}{\sqrt x - \sqrt y}$.`,
      choices: [
        { tex: String.raw`$4$`, correct: true },
        { tex: String.raw`The limit does not exist, since it is $\tfrac00$`, mistake: 'zero-over-zero', why: '0/0 means keep working. The top factors and the bad piece cancels.' },
        { tex: String.raw`$0$`, mistake: 'arith', why: 'After cancelling, you are left with √x + √y, which is 2 + 2 at (4,4).' },
        { tex: String.raw`$\tfrac14$`, mistake: 'arith', why: 'You flipped the fraction. The quotient simplifies to √x + √y, not 1/(√x + √y).' },
        { tex: String.raw`$2$`, mistake: 'arith', why: 'You kept only √x. The sum √x + √y is 4.' },
      ],
      steps: [
        String.raw`Plugging in gives $\tfrac00$: simplify.`,
        String.raw`Treat $x - y$ as a difference of squares: $x - y = (\sqrt x - \sqrt y)(\sqrt x + \sqrt y)$.`,
        String.raw`Cancel: the expression is $\sqrt x + \sqrt y$ away from the line $x = y$.`,
        String.raw`That is continuous, so the limit is $\sqrt4 + \sqrt4 = 4$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 1,
      prompt: String.raw`Evaluate $\displaystyle\lim_{(x,y)\to(0,0)} \frac{2x^2 - y^2}{x^2 + 3y^2}$, if it exists.`,
      choices: [
        { tex: String.raw`The limit does not exist`, correct: true },
        { tex: String.raw`$2$`, mistake: 'paths-prove', why: 'That is the value along y = 0 only. Along x = 0 you get -1/3.' },
        { tex: String.raw`$-\tfrac13$`, mistake: 'paths-prove', why: 'That is the value along x = 0 only. Along y = 0 you get 2.' },
        { tex: String.raw`$0$`, mistake: 'zero-over-zero', why: 'Top and bottom both go to 0, but their ratio does not have to.' },
        { tex: String.raw`$\tfrac14$`, mistake: 'paths-prove', why: 'That is the value along y = x. One path cannot give the limit.' },
      ],
      steps: [
        String.raw`Along $y = 0$: $\frac{2x^2}{x^2} = 2$.`,
        String.raw`Along $x = 0$: $\frac{-y^2}{3y^2} = -\tfrac13$.`,
        String.raw`$2 \ne -\tfrac13$, so by the two-path test the limit does not exist.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Evaluate $\displaystyle\lim_{(x,y)\to(0,0)} \frac{x^2 y}{x^4 + y^2}$, if it exists.`,
      choices: [
        { tex: String.raw`The limit does not exist`, correct: true },
        { tex: String.raw`$0$`, mistake: 'lines-only', why: 'Every line y = mx gives 0, but the parabola y = x^2 gives 1/2.' },
        { tex: String.raw`$\tfrac12$`, mistake: 'paths-prove', why: 'That is the value along y = x^2 only. Lines give 0.' },
        { tex: String.raw`$-\tfrac12$`, mistake: 'paths-prove', why: 'That is the value along y = -x^2. It disagrees with other paths.' },
        { tex: String.raw`$1$`, mistake: 'arith', why: 'Along y = x^2 the bottom is x^4 + x^4 = 2x^4, so the ratio is 1/2, not 1.' },
      ],
      steps: [
        String.raw`Along $y = mx$: $\frac{m x^3}{x^4 + m^2 x^2} = \frac{m x}{x^2 + m^2} \to 0$ for every $m$ (and the axes give 0 too).`,
        String.raw`The top has $x^2$ next to $y$, so balance with $y = kx^2$: $\frac{k x^4}{x^4 + k^2 x^4} = \frac{k}{1 + k^2}$.`,
        String.raw`This depends on $k$: $k = 1$ gives $\tfrac12$, while lines gave 0.`,
        String.raw`Two different answers, so the limit does not exist.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Evaluate $\displaystyle\lim_{(x,y)\to(0,0)} \frac{\sin\!\big(3(x^2+y^2)\big)}{2(x^2+y^2)}$.`,
      choices: [
        { tex: String.raw`$\tfrac32$`, correct: true },
        { tex: String.raw`$\tfrac12$`, mistake: 'sin-scale', why: 'sin(3θ)/θ → 3, not 1. You dropped the 3.' },
        { tex: String.raw`$3$`, mistake: 'arith', why: 'You dropped the 2 in the bottom.' },
        { tex: String.raw`$\tfrac23$`, mistake: 'arith', why: 'You flipped the factors: sin(3θ)/(2θ) = (3/2)·sin(3θ)/(3θ).' },
        { tex: String.raw`The limit does not exist, since it is $\tfrac00$`, mistake: 'zero-over-zero', why: 'The block x^2 + y^2 turns this into a one-variable limit you know.' },
      ],
      steps: [
        String.raw`Let $\theta = x^2 + y^2$. As $(x,y)\to(0,0)$, $\theta\to0^+$.`,
        String.raw`The limit becomes $\displaystyle\lim_{\theta\to0}\frac{\sin 3\theta}{2\theta} = \frac32\lim_{\theta\to0}\frac{\sin3\theta}{3\theta}$.`,
        String.raw`The last limit is 1, so the answer is $\tfrac32$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`On which set is $f(x, y) = \dfrac{\ln(9 - x^2 - y^2)}{y - x}$ continuous?`,
      choices: [
        { tex: String.raw`All $(x,y)$ with $x^2 + y^2 < 9$ and $y \ne x$`, correct: true },
        { tex: String.raw`All $(x,y)$ with $x^2 + y^2 \le 9$ and $y \ne x$`, mistake: 'concept', why: 'On the circle the log input is 0, and ln 0 is undefined.' },
        { tex: String.raw`All $(x,y)$ with $x^2 + y^2 < 9$`, mistake: 'setup', why: 'You forgot the denominator: it is 0 on the whole line y = x.' },
        { tex: String.raw`All $(x,y)$ with $y \ne x$`, mistake: 'setup', why: 'You forgot the log: it needs 9 - x^2 - y^2 > 0.' },
        { tex: String.raw`All $(x,y)$ with $x^2 + y^2 < 9$, except the origin`, mistake: 'concept', why: 'The bottom is 0 on the entire line y = x, not just at the origin.' },
      ],
      steps: [
        String.raw`Logs, polynomials and quotients are continuous wherever they are defined.`,
        String.raw`Log: $9 - x^2 - y^2 > 0$, the open disk of radius 3.`,
        String.raw`Denominator: $y - x \ne 0$, so remove the line $y = x$.`,
        String.raw`Continuous on the open disk minus that diagonal line.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Let $g(x, y) = \dfrac{x^2 y}{x^2 + y^2}$ for $(x,y)\ne(0,0)$ and $g(0,0) = c$. For which $c$ is $g$ continuous at the origin?`,
      choices: [
        { tex: String.raw`$c = 0$`, correct: true },
        { tex: String.raw`No value of $c$ works, because the limit does not exist`, mistake: 'zero-over-zero', why: 'A 0/0 form is not proof of DNE. Here the squeeze |g| ≤ |y| shows the limit is 0.' },
        { tex: String.raw`$c = \tfrac12$`, mistake: 'arith', why: 'Along y = x, g = x^3/(2x^2) = x/2, which goes to 0, not 1/2.' },
        { tex: String.raw`$c = 1$`, mistake: 'arith', why: 'x^2/(x^2 + y^2) is at most 1, but it is multiplied by y, which goes to 0.' },
        { tex: String.raw`Any value of $c$, since $g(0,0)$ is defined`, mistake: 'define-fixes', why: 'Continuity also needs the value to equal the limit.' },
      ],
      steps: [
        String.raw`Paths: along both axes $g = 0$; along $y = mx$, $g = \frac{m x}{1 + m^2}\to0$. Everything points to 0, but paths cannot prove it.`,
        String.raw`Squeeze: $\frac{x^2}{x^2+y^2}\le1$, so $|g(x,y)| \le |y|$.`,
        String.raw`$|y|\to0$, so $g \to 0$. (In polar: $g = r\cos^2\theta\sin\theta$, which is at most $r$ in size.)`,
        String.raw`Continuity needs $g(0,0)$ equal to the limit: $c = 0$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'surface', expr: '3*x*y^2/(x^2 + y^4 + 0.000001)', z: '3*x*y^2/(x^2 + y^4 + 0.000001)' },
    { kind: 'surface', expr: '(x^2 - y^2)/(x^2 + y^2 + 0.000001)', z: '(x^2 - y^2)/(x^2 + y^2 + 0.000001)' },
  ],
};
