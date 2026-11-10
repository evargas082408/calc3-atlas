export default {
  id: 18,
  title: 'Double integrals over rectangles',
  section: '16.1',
  exam: 2,
  blurb: 'Add up f(x,y) over a rectangle: volume under a surface, computed one variable at a time.',
  boiler: ['Double integral on a rectangle', 'Riemann Sum on a Rectangle', 'Average  Value'],

  sections: [
    {
      id: 'idea',
      title: 'The idea: volume under a surface',
      body: String.raw`In Calc 1, $\int_a^b f(x)\,dx$ is the area under a curve: chop $[a,b]$ into strips, build a rectangle on each, add, and let the strips shrink.

Do the same one dimension up. Take a surface $z = f(x,y)$ over a rectangle $R = [a,b]\times[c,d]$ in the $xy$-plane. Chop $R$ into small rectangles of area $\Delta A = \Delta x\,\Delta y$. Over each one, build a box whose height is $f$ at a sample point. Add the boxes:

$$\iint_R f(x,y)\,dA = \lim_{m,n\to\infty}\sum_{i=1}^{m}\sum_{j=1}^{n} f(x_i,y_j)\,\Delta x\,\Delta y.$$

If $f \ge 0$ this is the **volume** of the solid between $R$ and the surface. If $f$ dips below the plane, those parts count as negative, just like area below the axis in Calc 1.`,
    },
    {
      id: 'riemann',
      title: 'Riemann sums by hand',
      body: String.raw`The exam asks for an estimate with a few boxes. Three things to get right: the box size, the sample points, and multiplying by $\Delta A$.

Lecture example: estimate the volume under $f = 16 - x^2 - y^2$ over $R = [0,2]\times[0,3]$ with 6 squares, sampling at the **lower-left** corner of each.

1. Split $[0,2]$ into 2 pieces and $[0,3]$ into 3: $\Delta x = 1$, $\Delta y = 1$, $\Delta A = 1$.
2. Lower-left corners: $(0,0), (1,0), (0,1), (1,1), (0,2), (1,2)$.
3. Heights: $16, 15, 15, 14, 12, 11$.
4. Sum times $\Delta A$: $83 \cdot 1 = 83$.

The exact value is $70$. The estimate is high because this $f$ decreases as you move away from the origin, so the lower-left corner is the tallest point of each square. A different sample point (upper-right, midpoint) gives a different estimate.

If $\Delta A \ne 1$, do not forget to multiply by it. That is the classic slip.`,
    },
    {
      id: 'fubini',
      title: 'Computing it: iterated integrals',
      body: String.raw`Nobody evaluates the limit. **Fubini's theorem** says that on a rectangle you can integrate one variable at a time, in either order:

$$\iint_R f\,dA = \int_a^b\!\!\int_c^d f(x,y)\,dy\,dx = \int_c^d\!\!\int_a^b f(x,y)\,dx\,dy.$$

The inner integral treats the other variable as a **constant**. Lecture example, $f = 16 - x^2 - y^2$ on $[0,2]\times[0,3]$:

$$\int_0^3 (16 - x^2 - y^2)\,dy = 48 - 3x^2 - 9 = 39 - 3x^2,\qquad \int_0^2 (39 - 3x^2)\,dx = 78 - 8 = 70.$$

Doing $dx$ first instead gives $\int_0^3\left(32 - \tfrac83 - 2y^2\right)dy = 96 - 8 - 18 = 70$. Same answer, as promised.

Why it works: the inner integral is the area of one slice of the solid. Integrating slice areas gives volume, exactly like the Calc 1 method of slicing.`,
    },
    {
      id: 'order',
      title: 'Pick the order that makes the inner integral easy',
      body: String.raw`Both orders give the same number, but one can be much less work. Lecture example: $\iint_R y\sin(xy)\,dA$ on $R = [1,2]\times[0,\pi]$.

- $dy$ first needs integration by parts.
- $dx$ first is instant: with $y$ constant, $\int y\sin(xy)\,dx = -\cos(xy)$.

$$\int_0^\pi\left[-\cos(xy)\right]_{x=1}^{x=2}dy = \int_0^\pi(\cos y - \cos 2y)\,dy = 0.$$

The cue: if the integrand has the form (something) times a function of $xy$, integrate first in the variable whose derivative of $xy$ produces that something.

**Separable shortcut.** If $f(x,y) = g(x)\,h(y)$ and $R$ is a rectangle, the integral is a product of two Calc 1 integrals:

$$\int_0^1\!\!\int_0^4 \sqrt{xy}\,dx\,dy = \left(\int_0^4 x^{1/2}dx\right)\left(\int_0^1 y^{1/2}dy\right) = \tfrac{16}{3}\cdot\tfrac23 = \tfrac{32}{9}.$$

This only works for a **product**. A sum like $x + y$ does not split into a product.`,
    },
    {
      id: 'average',
      title: 'Average value',
      body: String.raw`Calc 1 average: total divided by length. Here: total divided by **area**.

$$f_{\text{ave}} = \frac{1}{\text{Area}(R)}\iint_R f\,dA,\qquad \text{Area}([a,b]\times[c,d]) = (b-a)(d-c).$$

Lecture example: $f = x - 3y^2$ on $R = [0,2]\times[1,2]$. Area $= 2\cdot 1 = 2$.

$$\int_1^2\!\!\int_0^2 (x - 3y^2)\,dx\,dy = \int_1^2 (2 - 6y^2)\,dy = 2 - 14 = -12,\qquad f_{\text{ave}} = \frac{-12}{2} = -6.$$

A negative average is fine: $f$ is mostly negative on that rectangle. Volume questions must come out positive; average value questions need not.`,
    },
  ],

  formulas: [
    { label: 'Riemann sum', tex: String.raw`\iint_R f\,dA \approx \sum_{i}\sum_{j} f(x_i,y_j)\,\Delta x\,\Delta y` },
    { label: 'Fubini on a rectangle', tex: String.raw`\iint_R f\,dA = \int_a^b\!\!\int_c^d f\,dy\,dx = \int_c^d\!\!\int_a^b f\,dx\,dy` },
    { label: 'Separable integrand', tex: String.raw`\iint_R g(x)h(y)\,dA = \left(\int_a^b g\,dx\right)\left(\int_c^d h\,dy\right)` },
    { label: 'Average value', tex: String.raw`f_{\text{ave}} = \frac{1}{(b-a)(d-c)}\iint_R f\,dA` },
  ],

  mistakes: [
    {
      id: 'riemann-dA',
      title: 'Adding heights but forgetting ΔA',
      wrong: String.raw`$\sum f(x_i,y_j)$`,
      right: String.raw`$\sum f(x_i,y_j)\,\Delta x\,\Delta y$`,
      why: 'Each box has volume height times base area. If the base is not 1 by 1, the sum of heights alone is wrong.',
    },
    {
      id: 'riemann-sample',
      title: 'Using the wrong corner',
      wrong: 'Lower-left corners when the problem says upper-right',
      right: 'Read which corner (or midpoint) the problem names, and list those points before plugging in',
      why: 'Each choice of sample point gives a different estimate, and the exam lists all of them.',
    },
    {
      id: 'not-constant',
      title: 'Not treating the other variable as a constant',
      wrong: String.raw`$\int x\cos(xy)\,dy = x\sin(xy)$`,
      right: String.raw`$\int x\cos(xy)\,dy = \sin(xy)$`,
      why: 'With x held constant, the chain rule on sin(xy) produces a factor x. Forgetting that leaves an extra x (or a missing 1/x).',
    },
    {
      id: 'avg-area',
      title: 'Average value: wrong divisor or none',
      wrong: String.raw`$f_{\text{ave}} = \iint_R f\,dA$`,
      right: String.raw`$f_{\text{ave}} = \dfrac{1}{\text{Area}}\iint_R f\,dA$`,
      why: 'The double integral is a total. Divide by the area of R, which is (b-a)(d-c), not one side length.',
    },
    {
      id: 'product-split',
      title: 'Splitting a sum into a product',
      wrong: String.raw`$\iint_R (x+y)\,dA = \left(\int x\,dx\right)\left(\int y\,dy\right)$`,
      right: String.raw`$\iint_R (x+y)\,dA = \iint_R x\,dA + \iint_R y\,dA$`,
      why: 'The product shortcut needs f = g(x)h(y). A sum splits into a sum of integrals, each still over the whole rectangle.',
    },
  ],

  hook: 'Inner integral first, other variable frozen. Pick the order that makes the inside easy.',

  scene: {
    view: { range: 3.5, z: [-0.5, 5.5] },
    camera: [6, -5, 5],
    layers: [
      { id: 'surf', kind: 'surface', z: '5 - x^2/2 - y^2/3', domain: { x: [0, 2], y: [0, 3] }, colormap: 'terrain' },
      { id: 'rect', kind: 'region2d', x: [0, 2], y: [0, 3], color: 'water' },
      { id: 'solid', kind: 'solid', bottom: '0', top: '5 - x^2/2 - y^2/3', region: { x: [0, 2], y: [0, 3] } },
      { id: 'b1', kind: 'solid', bottom: '0', top: '5', region: { x: [0, 1], y: [0, 1] } },
      { id: 'b2', kind: 'solid', bottom: '0', top: '4.5', region: { x: [1, 2], y: [0, 1] } },
      { id: 'b3', kind: 'solid', bottom: '0', top: '14/3', region: { x: [0, 1], y: [1, 2] } },
      { id: 'b4', kind: 'solid', bottom: '0', top: '25/6', region: { x: [1, 2], y: [1, 2] } },
      { id: 'b5', kind: 'solid', bottom: '0', top: '11/3', region: { x: [0, 1], y: [2, 3] } },
      { id: 'b6', kind: 'solid', bottom: '0', top: '19/6', region: { x: [1, 2], y: [2, 3] } },
      { id: 'pts', kind: 'point', at: [0, 0, 5], label: 'f(0,0) = 5' },
      { id: 'strips', kind: 'region2d', x: [0, 2], y: [0, 3], strips: 'vertical', color: 'water' },
      { id: 'slice', kind: 'curve', x: '1.2', y: 't', z: '5 - 1.2^2/2 - t^2/3', t: [0, 3], color: 'road' },
    ],
    steps: [
      {
        label: 'Start',
        show: ['surf'],
        caption: String.raw`The surface $z = 5 - \tfrac{x^2}{2} - \tfrac{y^2}{3}$ above the rectangle $[0,2]\times[0,3]$. It touches the floor at the far corner $(2,3)$.`,
      },
      {
        label: 'The solid',
        show: ['surf', 'rect', 'solid'],
        caption: String.raw`$\iint_R f\,dA$ is the volume of this solid. Its exact value is $20$.`,
      },
      {
        label: 'Riemann boxes',
        show: ['surf', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'pts'],
        caption: String.raw`Six $1\times1$ boxes, each as tall as $f$ at its lower-left corner. Their volumes add to $\tfrac{151}{6}\approx 25.2$, an overestimate because $f$ shrinks away from the origin.`,
      },
      {
        label: 'Slices',
        show: ['surf', 'strips', 'slice'],
        caption: String.raw`Fubini: freeze $x$ and integrate in $y$ to get the area of one slice (red curve is its top edge). Then integrate those slice areas from $x = 0$ to $2$.`,
      },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Estimate $\iint_R (x + 3y)\,dA$ over $R = [0,4]\times[0,2]$ with a Riemann sum using $m = 2$ subintervals in $x$, $n = 2$ in $y$, and the **upper-right** corner of each subrectangle.`,
      choices: [
        { tex: String.raw`$60$`, correct: true },
        { tex: String.raw`$30$`, mistake: 'riemann-dA', why: 'That is the sum of the four heights. Each subrectangle has area 2, so multiply by 2.' },
        { tex: String.raw`$20$`, mistake: 'riemann-sample', why: 'That uses the lower-left corners (0,0), (2,0), (0,1), (2,1).' },
        { tex: String.raw`$40$`, mistake: 'concept', why: 'That is the exact integral (and the midpoint estimate, since f is linear), not the upper-right estimate.' },
        { tex: String.raw`$120$`, mistake: 'arith', why: String.raw`$\Delta y = 2/2 = 1$, not 2, so $\Delta A = 2$, not 4.` },
      ],
      steps: [
        String.raw`$\Delta x = 4/2 = 2$, $\Delta y = 2/2 = 1$, so $\Delta A = 2$.`,
        String.raw`Upper-right corners: $(2,1), (4,1), (2,2), (4,2)$.`,
        String.raw`Heights $x + 3y$: $5, 7, 8, 10$. Sum $= 30$.`,
        String.raw`Estimate $= 30\cdot 2 = 60$.`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 1,
      prompt: String.raw`Evaluate $\iint_R \sin(x + y)\,dA$ where $R = [0,\tfrac{\pi}{2}]\times[0,\tfrac{\pi}{2}]$.`,
      choices: [
        { tex: String.raw`$2$`, correct: true },
        { tex: String.raw`$1$`, mistake: 'product-split', why: String.raw`$\sin(x+y)$ is not $\sin x\sin y$, so the integral does not split into $(\int\sin x)(\int\sin y)$.` },
        { tex: String.raw`$-2$`, mistake: 'sign', why: String.raw`The antiderivative of $\sin$ is $-\cos$; keep that minus sign through both evaluations.` },
        { tex: String.raw`$0$`, mistake: 'arith', why: String.raw`At $x = \pi/2$, $-\cos(y + \pi/2) = \sin y$, not $-\sin y$.` },
        { tex: String.raw`$\tfrac{\pi^2}{4}$`, mistake: 'concept', why: 'That is the area of R. It would be the answer for f = 1.' },
      ],
      steps: [
        String.raw`Inner in $x$: $\left[-\cos(x+y)\right]_{0}^{\pi/2} = -\cos\!\left(y + \tfrac{\pi}{2}\right) + \cos y = \sin y + \cos y$.`,
        String.raw`Outer: $\int_0^{\pi/2}(\sin y + \cos y)\,dy = 1 + 1 = 2$.`,
        String.raw`Sanity check: $\sin(x+y) \ge 0$ on this square (since $0 \le x + y \le \pi$), so the answer must be positive.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`Evaluate $\iint_R x\cos(xy)\,dA$ where $R = [0,\pi]\times[0,1]$ (so $0\le x\le\pi$, $0 \le y \le 1$).`,
      choices: [
        { tex: String.raw`$2$`, correct: true },
        { tex: String.raw`$\pi$`, mistake: 'not-constant', why: String.raw`You wrote $\int x\cos(xy)\,dy = x\sin(xy)$. With $x$ constant the chain rule already supplies the $x$, so it is $\sin(xy)$.` },
        { tex: String.raw`$-2$`, mistake: 'sign', why: String.raw`$\int_0^\pi \sin x\,dx = [-\cos x]_0^\pi = 1 + 1 = 2$, which is positive.` },
        { tex: String.raw`$0$`, mistake: 'arith', why: String.raw`The inner integral is $\sin x$, and $\int_0^\pi\sin x\,dx = 2$. Integrating $\cos x$ instead gives 0.` },
        { tex: 'Not elementary (needs a special function)', mistake: 'concept', why: 'Doing dx first needs integration by parts, but dy first is a one-line substitution. Switch the order.' },
      ],
      steps: [
        String.raw`Integrate in $y$ first: with $x$ constant, $\dfrac{\partial}{\partial y}\sin(xy) = x\cos(xy)$.`,
        String.raw`$\int_0^1 x\cos(xy)\,dy = \left[\sin(xy)\right]_{y=0}^{y=1} = \sin x$.`,
        String.raw`$\int_0^\pi \sin x\,dx = 2$.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`Evaluate $\displaystyle\int_0^1\!\!\int_0^2 x\,e^{xy}\,dy\,dx$.`,
      choices: [
        { tex: String.raw`$\dfrac{e^2 - 3}{2}$`, correct: true },
        { tex: String.raw`$\dfrac{e^2 - 1}{2}$`, mistake: 'arith', why: String.raw`The inner integral is $e^{2x} - e^{0} = e^{2x} - 1$. Dropping the $-1$ gives this.` },
        { tex: String.raw`$\dfrac{e^2 - 1}{4}$`, mistake: 'not-constant', why: String.raw`You integrated $x e^{xy}$ in $y$ as $x e^{xy}$. With $x$ constant, the antiderivative is $e^{xy}$.` },
        { tex: String.raw`$e^2 - 3$`, mistake: 'arith', why: String.raw`$\int_0^1 e^{2x}dx = \tfrac{e^2-1}{2}$; the $\tfrac12$ from the chain rule was lost.` },
        { tex: String.raw`$\dfrac{3 - e^2}{2}$`, mistake: 'sign', why: 'Subtract the lower limit from the upper one: the answer is positive because the integrand is positive.' },
      ],
      steps: [
        String.raw`Inner in $y$, $x$ constant: $\int_0^2 x e^{xy}\,dy = \left[e^{xy}\right]_0^2 = e^{2x} - 1$.`,
        String.raw`Outer: $\int_0^1 (e^{2x} - 1)\,dx = \tfrac{e^2 - 1}{2} - 1$.`,
        String.raw`$= \dfrac{e^2 - 3}{2}$.`,
      ],
      source: 'Study plan bank #5',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Find the average value of $f(x,y) = xy$ over the rectangle $0 \le x \le 2$, $0 \le y \le 3$.`,
      choices: [
        { tex: String.raw`$\tfrac32$`, correct: true },
        { tex: String.raw`$9$`, mistake: 'avg-area', why: 'That is the double integral. Divide by the area, 6.' },
        { tex: String.raw`$3$`, mistake: 'avg-area', why: 'You divided by one side length (3). Divide by the area 2 × 3.' },
        { tex: String.raw`$\tfrac92$`, mistake: 'avg-area', why: 'You divided by 2, one side length. The area is 6.' },
        { tex: String.raw`$54$`, mistake: 'avg-area', why: 'You multiplied by the area instead of dividing.' },
      ],
      steps: [
        String.raw`$xy$ is separable: $\iint_R xy\,dA = \left(\int_0^2 x\,dx\right)\left(\int_0^3 y\,dy\right) = 2\cdot\tfrac92 = 9$.`,
        String.raw`Area $= 2\cdot 3 = 6$.`,
        String.raw`$f_{\text{ave}} = 9/6 = \tfrac32$.`,
      ],
      source: 'Study plan bank #6',
    },
    {
      id: 'p6',
      difficulty: 2,
      prompt: String.raw`Evaluate $\iint_R e^{x + 2y}\,dA$ where $R = [0,\ln 3]\times[0,\ln 2]$.`,
      choices: [
        { tex: String.raw`$3$`, correct: true },
        { tex: String.raw`$6$`, mistake: 'arith', why: String.raw`$\int_0^{\ln 2} e^{2y}\,dy = \tfrac12(e^{2\ln2} - 1) = \tfrac32$. The $\tfrac12$ from the chain rule was dropped.` },
        { tex: String.raw`$\tfrac92$`, mistake: 'arith', why: String.raw`In $x$, $e^{\ln 3} - e^0 = 3 - 1 = 2$. Using 3 forgets the lower limit.` },
        { tex: String.raw`$\tfrac72$`, mistake: 'product-split', why: String.raw`$e^{x+2y} = e^x e^{2y}$ is a product, so the integrals multiply: $2\cdot\tfrac32$. Adding them gives $\tfrac72$.` },
        { tex: String.raw`$1$`, mistake: 'arith', why: String.raw`$e^{2\ln 2} = (e^{\ln 2})^2 = 4$, not 2.` },
      ],
      steps: [
        String.raw`$e^{x+2y} = e^x\,e^{2y}$, a product on a rectangle: split it.`,
        String.raw`$\int_0^{\ln 3} e^x\,dx = 3 - 1 = 2$.`,
        String.raw`$\int_0^{\ln 2} e^{2y}\,dy = \tfrac12(4 - 1) = \tfrac32$.`,
        String.raw`Product: $2\cdot\tfrac32 = 3$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 2,
      prompt: String.raw`Evaluate $\iint_R (x + y)\,dA$ where $R = [0,2]\times[0,3]$.`,
      choices: [
        { tex: String.raw`$15$`, correct: true },
        { tex: String.raw`$9$`, mistake: 'product-split', why: String.raw`That is $\left(\int_0^2 x\,dx\right)\left(\int_0^3 y\,dy\right) = 2\cdot\tfrac92$. A sum does not split into a product.` },
        { tex: String.raw`$\tfrac52$`, mistake: 'avg-area', why: 'That is the average value (15 divided by the area 6). The question asks for the integral.' },
        { tex: String.raw`$\tfrac{13}{2}$`, mistake: 'arith', why: String.raw`$\iint_R x\,dA = 2\cdot 3 = 6$ and $\iint_R y\,dA = \tfrac92\cdot 2 = 9$. Forgetting to multiply each piece by the other side length gives $2 + \tfrac92$.` },
        { tex: String.raw`$24$`, mistake: 'arith', why: String.raw`$\int_0^3 y\,dy = \tfrac92$, not 9. Dropping the $\tfrac12$ in $y^2/2$ makes the inner integral $3x + 9$.` },
      ],
      steps: [
        String.raw`Inner in $y$: $\int_0^3 (x + y)\,dy = 3x + \tfrac92$.`,
        String.raw`Outer: $\int_0^2\left(3x + \tfrac92\right)dx = 6 + 9 = 15$.`,
        String.raw`Check: average of $x$ is 1, average of $y$ is $\tfrac32$, area 6: $6\left(1+\tfrac32\right) = 15$.`,
      ],
      source: 'original',
    },
  ],

  lab: [{ kind: 'surface', expr: '5 - x^2/2 - y^2/3' }],
};
