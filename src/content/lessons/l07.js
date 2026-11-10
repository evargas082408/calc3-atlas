export default {
  id: 7,
  title: 'Motion in space (part 2): circular and projectile motion',
  section: '14.3',
  exam: 1,
  blurb: 'Use velocity and acceleration to test for circular motion, read true/false statements about a path, and solve projectile problems from gravity alone.',
  boiler: ['Particle Motion', 'Velocity and Position', 'Vector-Valued Functions'],

  sections: [
    {
      id: 'tangent',
      title: 'Warm-up: a tangent line at a given point',
      body: String.raw`$\vec r'(a)$ plays the role that $f'(a)$ played in Calc 1, but it is a direction, not a slope.

**Example (class).** Tangent line to $\vec r(t)=\langle t\sin t,\ t\cos t,\ t\rangle$ at the point $\left(\frac\pi2,0,\frac\pi2\right)$.
1. You are given a point, not a $t$. Find the $t$ first. The $z$-component is $t$, so $t=\frac\pi2$. Check: $\vec r(\frac\pi2) = \langle\frac\pi2\cdot1,\ \frac\pi2\cdot0,\ \frac\pi2\rangle$. Good.
2. Product rule on each piece: $\vec r'(t) = \langle \sin t+t\cos t,\ \cos t-t\sin t,\ 1\rangle$, so $\vec r'(\frac\pi2) = \langle 1,-\frac\pi2,1\rangle$.
3. Line: $\langle x,y,z\rangle = \left\langle\frac\pi2,0,\frac\pi2\right\rangle + s\left\langle 1,-\frac\pi2,1\right\rangle$.`,
    },
    {
      id: 'vas',
      title: 'Velocity, acceleration, and speed',
      body: String.raw`$$\vec v(t)=\vec r'(t),\qquad \vec a(t)=\vec r''(t),\qquad \text{speed}=|\vec v(t)|.$$
Velocity is a vector: how fast **and** which way. Speed is a number: just how fast.

**Example (class).** $\vec r(t)=\langle e^{2t},\ t^2,\ \sin\pi t\rangle$.
- $\vec v(t)=\langle 2e^{2t},\ 2t,\ \pi\cos\pi t\rangle$. So $\vec v(0) = \langle 2,0,\pi\rangle$ and $\vec v(\frac12) = \langle 2e,1,0\rangle$.
- $\vec a(t) = \langle 4e^{2t},\ 2,\ -\pi^2\sin\pi t\rangle$. So $\vec a(0) = \langle 4,2,0\rangle$ and $\vec a(\frac12) = \langle 4e,2,-\pi^2\rangle$.
- Speed at $t=0$: $\sqrt{4+\pi^2}$.

Two facts that come from differentiating a dot product:
- $\frac{d}{dt}|\vec v|^2 = \frac{d}{dt}(\vec v\cdot\vec v) = 2\,\vec v\cdot\vec a$. So **speed is constant exactly when $\vec v\cdot\vec a = 0$** for all $t$.
- $\frac{d}{dt}|\vec r|^2 = 2\,\vec r\cdot\vec v$. So **distance from the origin is constant exactly when $\vec r\cdot\vec v=0$** for all $t$.`,
    },
    {
      id: 'circular',
      title: 'Circular motion: position perpendicular to velocity',
      body: String.raw`On $\vec r=\langle\cos t,\sin t\rangle$, the velocity $\langle-\sin t,\cos t\rangle$ is always tangent to the circle, so it is perpendicular to the radius. Check at $t=0$: $\vec r=\langle1,0\rangle$, $\vec v=\langle0,1\rangle$. At $t=\frac\pi2$: $\vec r=\langle0,1\rangle$, $\vec v=\langle-1,0\rangle$.

The test works in both directions, because of the second fact above: **$|\vec r(t)|$ is constant if and only if $\vec r\cdot\vec v=0$ for every $t$.** So to check for motion on a circle (or sphere) centered at the origin, either eliminate $t$ and get $x^2+y^2=R^2$, or show $\vec r\cdot\vec v = 0$.
- $\langle\cos t^2,\sin t^2\rangle$: $\vec v = \langle -2t\sin t^2,\ 2t\cos t^2\rangle$, and $\vec r\cdot\vec v = 0$. Circular, just speeding up.
- $\langle R\cos f(t),\ R\sin f(t)\rangle$ for any $f$: always circular, radius $R$.
- **Not circular (class):** $\langle 5\cos t,\ \sin t\rangle$. $\vec r\cdot\vec v = -25\sin t\cos t+\sin t\cos t = -24\sin t\cos t\ne0$. Eliminating $t$: $\frac{x^2}{25}+y^2=1$, an ellipse.

In 3D the same test finds spheres. $\vec r = \langle 3\cos t,\ 5\sin t,\ 4\cos t\rangle$ has $|\vec r|^2 = 9\cos^2t+25\sin^2t+16\cos^2t = 25$, so it stays on the sphere of radius 5, even though the coefficients look mismatched.`,
    },
    {
      id: 'statements',
      title: 'Reading true/false statements about a path',
      body: String.raw`Exams like to give one $\vec r(t)$ and five claims. Each claim has a quick test.
- **"The speed is constant."** Compute $|\vec v|$ and see if $t$ survives, or check $\vec v\cdot\vec a=0$.
- **"The acceleration is zero."** Only for straight-line motion at constant speed (every component linear in $t$).
- **"The motion lies in a plane."** Look for a linear relation among $x$, $y$, $z$ that holds for all $t$, like $y=2x$ or $x+z=3$.
- **"$\vec v$ and $\vec a$ are orthogonal at $t=t_0$."** Plug in and dot.

**Example.** $\vec r=\langle\cos t,\sin t,t\rangle$. $\vec v=\langle-\sin t,\cos t,1\rangle$, speed $\sqrt2$: constant. $\vec a = \langle-\cos t,-\sin t,0\rangle\ne\vec0$. $\vec v\cdot\vec a = \sin t\cos t-\sin t\cos t=0$, consistent with constant speed. It does not lie in a plane, since the helix keeps climbing around a cylinder.`,
    },
    {
      id: 'projectile',
      title: 'Projectiles: integrate gravity twice',
      body: String.raw`Ignore air. The only force is gravity, so $\vec a = \langle 0,0,-g\rangle$ with $g = 9.8$ m/s$^2$ (or 32 ft/s$^2$). Then it is the Lesson 6 recipe.

**Example (class).** A ball 49 m up is launched with $\vec v(0) = \langle 2,4,14.7\rangle$ m/s.
1. $\vec v(t) = \langle 0,0,-9.8t\rangle + \vec C$, and $\vec v(0)$ gives $\vec C=\langle 2,4,14.7\rangle$. So $\vec v = \langle 2,4,14.7-9.8t\rangle$.
2. $\vec r(t) = \langle 2t,4t,14.7t-4.9t^2\rangle+\vec D$, and $\vec r(0)=\langle0,0,49\rangle$ gives $\vec D$. So $\vec r = \langle 2t,\ 4t,\ -4.9t^2+14.7t+49\rangle$.

Now each question is one equation:
- **When does it land?** Height is 0: $-4.9(t^2-3t-10) = -4.9(t-5)(t+2) = 0$. Time is positive, so $t=5$ s, at $\vec r(5) = \langle 10,20,0\rangle$.
- **When is it highest?** The *vertical velocity* is 0 (not the whole velocity; it is still moving sideways): $14.7-9.8t=0$, so $t=1.5$ s.
- **How high?** Plug that time into the *position*: $z(1.5) = -11.025+22.05+49 = 60.025$ m.
- Horizontal distance from the launch spot: $|\langle10,20\rangle| = 10\sqrt5\approx22.4$ m. Speed at impact: $|\vec v(5)| = |\langle 2,4,-34.3\rangle|\approx34.6$ m/s.

Gravity only changes the vertical part. The horizontal velocity $\langle 2,4\rangle$ never changes, so the shadow on the ground moves in a straight line at constant speed.`,
    },
    {
      id: 'angle',
      title: 'Launch at an angle (the formulas you can re-derive)',
      body: String.raw`Launch from the ground at speed $v_0$ and angle $\alpha$: $\vec v(0) = \langle v_0\cos\alpha,\ v_0\sin\alpha\rangle$ in the $xy$-plane with $y$ up. Integrating $\langle 0,-g\rangle$ twice:
$$\vec r(t) = \left\langle v_0\cos\alpha\, t,\ v_0\sin\alpha\, t - \tfrac12gt^2\right\rangle.$$
Setting the height to 0 gives flight time $\frac{2v_0\sin\alpha}{g}$, range $\frac{v_0^2\sin2\alpha}{g}$, and max height $\frac{(v_0\sin\alpha)^2}{2g}$. The $\sin2\alpha$ is why $45^\circ$ goes farthest.

Do not memorize these blindly. If the launch is from a height, the formulas break, but "set height = 0" and "set vertical velocity = 0" always work.

**Example (study guide).** Hit from 3 ft up with $\vec v(0) = \langle 80,80\rangle$ ft/s, $g=32$: $\vec r(t) = \langle 80t,\ 3+80t-16t^2\rangle$. Peak at $t=2.5$, height $103$ ft. At a fence 380 ft away, $t=4.75$ and the height is $3+380-361 = 22$ ft.`,
    },
  ],

  formulas: [
    { label: 'Motion', tex: String.raw`\vec v=\vec r',\quad \vec a=\vec r'',\quad \text{speed}=|\vec v|` },
    { label: 'Constant speed', tex: String.raw`|\vec v| \text{ constant} \iff \vec v\cdot\vec a=0` },
    { label: 'Constant distance from origin', tex: String.raw`|\vec r| \text{ constant} \iff \vec r\cdot\vec v=0` },
    { label: 'Projectile', tex: String.raw`\vec a=\langle0,0,-g\rangle,\quad z(t) = z_0+v_{z0}t-\tfrac12gt^2` },
    { label: 'Peak and landing', tex: String.raw`\text{peak: } v_z(t)=0,\qquad \text{landing: } z(t)=0` },
  ],

  mistakes: [
    {
      id: 'speed-vector',
      title: 'Answering with velocity when speed is asked',
      wrong: String.raw`speed at $t=1$ is $\langle 2,3,3\rangle$`,
      right: String.raw`speed is $|\langle 2,3,3\rangle| = \sqrt{22}$`,
      why: 'Speed is the length of the velocity vector. It is a number, never a vector.',
    },
    {
      id: 'gravity-half',
      title: 'Dropping the 1/2 (or the sign) on gravity',
      wrong: String.raw`$z(t) = z_0 + v_{z0}t - gt^2$`,
      right: String.raw`$z(t) = z_0 + v_{z0}t - \tfrac12gt^2$`,
      why: 'Integrating -g twice gives -g t^2 / 2. Gravity pulls down, so the sign is negative when z points up.',
    },
    {
      id: 'initial-height',
      title: 'Forgetting the launch height',
      wrong: String.raw`ball from 49 m: $z(t) = 14.7t-4.9t^2$`,
      right: String.raw`$z(t) = 49+14.7t-4.9t^2$`,
      why: 'The second constant of integration is the starting position. Leaving it out launches the ball from the ground.',
    },
    {
      id: 'peak-condition',
      title: 'Using the wrong condition for the peak',
      wrong: String.raw`max height when $\vec v=\vec 0$, or plug the peak time into $\vec v$`,
      right: String.raw`Peak when $v_z=0$; then plug that $t$ into $z(t)$`,
      why: 'At the top the ball is still moving sideways, so only the vertical component of velocity is zero. Height comes from the position function.',
    },
    {
      id: 'circle-test',
      title: 'Judging circular motion by looks',
      wrong: String.raw`$\langle 5\cos t,\sin t\rangle$ is circular because it has cos and sin; $\langle 3\cos t,5\sin t,4\cos t\rangle$ is not because the numbers differ`,
      right: String.raw`Check $|\vec r|^2$ or $\vec r\cdot\vec v$ for all $t$`,
      why: 'Unequal coefficients can still give constant |r| in 3D, and equal-looking formulas can be ellipses. The test is the computation, not the shape of the formula.',
    },
  ],

  hook: 'Speed is |v|, a number. Top of the arc: vertical velocity = 0. Landing: height = 0. Constant |r| means r is perpendicular to v; constant speed means v is perpendicular to a.',

  scene: {
    view: { range: 22, z: [0, 66] },
    camera: [45, -30, 55],
    layers: [
      { id: 'tower', kind: 'curve', x: '0', y: '0', z: 't', t: [0, 49], color: 'contour' },
      { id: 'path', kind: 'curve', x: '2*t', y: '4*t', z: '-4.9*t^2 + 14.7*t + 49', t: [0, 5], color: 'road', arrow: true },
      { id: 'launch', kind: 'point', at: [0, 0, 49], label: 'r(0) = (0, 0, 49)' },
      { id: 'v0', kind: 'vector', from: [0, 0, 49], to: [2, 4, 63.7], color: 'water', label: 'v(0) = <2, 4, 14.7>' },
      { id: 'a0', kind: 'vector', from: [0, 0, 49], to: [0, 0, 39.2], color: 'revision', label: 'a' },
      { id: 'peak', kind: 'point', at: [3, 6, 60.025], label: 'peak, t = 1.5' },
      { id: 'vPeak', kind: 'vector', from: [3, 6, 60.025], to: [5, 10, 60.025], color: 'water', label: 'v(1.5) = <2, 4, 0>' },
      { id: 'aPeak', kind: 'vector', from: [3, 6, 60.025], to: [3, 6, 50.225], color: 'revision', label: 'a = <0, 0, -9.8>' },
      { id: 'land', kind: 'point', at: [10, 20, 0], label: 'r(5) = (10, 20, 0)' },
      { id: 'vLand', kind: 'vector', from: [8, 16, 34.3], to: [10, 20, 0], color: 'water', label: 'v(5) = <2, 4, -34.3>' },
      { id: 'shadow', kind: 'curve', x: '2*t', y: '4*t', z: '0', t: [0, 5], color: 'ink', arrow: true },
    ],
    steps: [
      { label: 'Start', show: ['tower', 'path', 'launch'], caption: String.raw`The class example: launched from 49 m up, $\vec r(t)=\langle 2t,4t,-4.9t^2+14.7t+49\rangle$. The path is a parabola tilted into the direction $\langle 2,4\rangle$.` },
      { label: 'Launch', show: ['tower', 'path', 'launch', 'v0', 'a0'], caption: String.raw`At launch $\vec v(0) = \langle 2,4,14.7\rangle$ points up and out. The acceleration is $\langle 0,0,-9.8\rangle$ here and everywhere else: gravity only pulls down.` },
      { label: 'Peak', show: ['path', 'peak', 'vPeak', 'aPeak'], caption: String.raw`At the top, $v_z = 14.7-9.8t = 0$ gives $t=1.5$. The velocity is $\langle 2,4,0\rangle$: still moving sideways, so $\vec v\ne\vec 0$. Height $z(1.5) = 60.025$ m.` },
      { label: 'Landing', show: ['path', 'land', 'vLand'], caption: String.raw`$z(t) = -4.9(t-5)(t+2) = 0$ at $t=5$, landing at $(10,20,0)$. Impact speed is $|\langle 2,4,-34.3\rangle|\approx34.6$ m/s.` },
      { label: 'Shadow', show: ['path', 'shadow', 'launch', 'land'], caption: String.raw`The shadow $\langle 2t,4t,0\rangle$ moves in a straight line at constant speed. Horizontal motion has no acceleration; only the vertical part bends.` },
    ],
  },

  problems: [
    {
      id: 'p1',
      difficulty: 1,
      prompt: String.raw`Find the speed at $t=1$ of a particle with position $\vec r(t)=\langle t^2,\ 3t,\ t^3\rangle$.`,
      choices: [
        { tex: String.raw`$\sqrt{22}$`, correct: true },
        { tex: String.raw`$\langle 2,3,3\rangle$`, mistake: 'speed-vector', why: 'That is the velocity. Speed is its length.' },
        { tex: String.raw`$22$`, mistake: 'arith', why: 'You forgot the square root.' },
        { tex: String.raw`$8$`, mistake: 'arith', why: 'You added the components instead of taking the length.' },
        { tex: String.raw`$\sqrt{11}$`, mistake: 'concept', why: 'That is |r(1)|, the distance from the origin, not the speed.' },
      ],
      steps: [
        String.raw`$\vec v(t) = \langle 2t,\ 3,\ 3t^2\rangle$, so $\vec v(1)=\langle 2,3,3\rangle$.`,
        String.raw`Speed $= |\vec v(1)| = \sqrt{4+9+9} = \sqrt{22}$.`,
        String.raw`The answer is a number. If you wrote a vector, you answered "velocity," not "speed."`,
      ],
      source: 'original',
    },
    {
      id: 'p2',
      difficulty: 2,
      prompt: String.raw`Find the acceleration at $t=\frac\pi4$ for $\vec r(t)=\langle\cos2t,\ \sin2t,\ t^2\rangle$.`,
      choices: [
        { tex: String.raw`$\langle 0,-4,2\rangle$`, correct: true },
        { tex: String.raw`$\langle -2,0,\tfrac\pi2\rangle$`, mistake: 'concept', why: 'That is the velocity v(pi/4). Differentiate once more.' },
        { tex: String.raw`$\langle 0,-1,2\rangle$`, mistake: 'arith', why: 'Each derivative of cos(2t) or sin(2t) brings out a factor of 2, so two derivatives bring out 4.' },
        { tex: String.raw`$\langle 0,-2,2\rangle$`, mistake: 'arith', why: 'You applied the chain-rule factor 2 only once.' },
        { tex: String.raw`$\langle 0,4,2\rangle$`, mistake: 'sign', why: 'The second derivative of sin(2t) is -4 sin(2t), which is -4 at t = pi/4.' },
      ],
      steps: [
        String.raw`$\vec v = \langle -2\sin2t,\ 2\cos2t,\ 2t\rangle$.`,
        String.raw`$\vec a = \langle -4\cos2t,\ -4\sin2t,\ 2\rangle$.`,
        String.raw`At $t=\frac\pi4$: $2t = \frac\pi2$, so $\vec a = \langle 0,-4,2\rangle$.`,
      ],
      source: 'original',
    },
    {
      id: 'p3',
      difficulty: 2,
      prompt: String.raw`A ball is thrown from 2 m above the ground with $\vec v(0) = \langle 3,0,9.8\rangle$ m/s. Using $g=9.8$ m/s$^2$, what is its maximum height?`,
      choices: [
        { tex: String.raw`$6.9$ m`, correct: true },
        { tex: String.raw`$4.9$ m`, mistake: 'initial-height', why: 'That is how far it rises. Add the 2 m it started at.' },
        { tex: String.raw`$4.45$ m`, mistake: 'gravity-half', why: 'With z = 2 + 9.8t - 9.8t^2 (no 1/2), the peak moves to t = 0.5. Integrating -9.8 twice gives -4.9 t^2.' },
        { tex: String.raw`$1$ m`, mistake: 'units', why: 't = 1 is the time of the peak, in seconds, not the height.' },
        { tex: String.raw`$3$ m`, mistake: 'peak-condition', why: 'That is the speed at the peak, |<3, 0, 0>|. Plug t = 1 into z(t), not into v(t).' },
      ],
      steps: [
        String.raw`$v_z(t) = 9.8-9.8t$ and $z(t) = 2+9.8t-4.9t^2$.`,
        String.raw`Peak: $v_z=0$, so $t=1$.`,
        String.raw`$z(1) = 2+9.8-4.9 = 6.9$ m.`,
      ],
      source: 'original',
    },
    {
      id: 'p4',
      difficulty: 2,
      prompt: String.raw`A ball leaves a 24.5 m roof with $\vec v(0) = \langle 3,4,19.6\rangle$ m/s ($g = 9.8$). How far from the point directly below the launch does it land?`,
      choices: [
        { tex: String.raw`$25$ m`, correct: true },
        { tex: String.raw`$20$ m`, mistake: 'initial-height', why: 'Without the 24.5 m you solve 19.6t - 4.9t^2 = 0 and get t = 4 instead of 5.' },
        { tex: String.raw`$35$ m`, mistake: 'arith', why: 'You added 15 + 20. The distance is the length of <15, 20>.' },
        { tex: String.raw`$5$ m`, mistake: 'units', why: 'That is the landing time in seconds.' },
        { tex: String.raw`about $14.4$ m`, mistake: 'gravity-half', why: 'Using -9.8 t^2 instead of -4.9 t^2 makes the ball land too early.' },
      ],
      steps: [
        String.raw`$z(t) = 24.5+19.6t-4.9t^2 = -4.9(t^2-4t-5) = -4.9(t-5)(t+1)$.`,
        String.raw`Lands at $t=5$ s.`,
        String.raw`Horizontal position: $\langle 3t,4t\rangle = \langle 15,20\rangle$.`,
        String.raw`Distance: $\sqrt{15^2+20^2} = 25$ m.`,
      ],
      source: 'original',
    },
    {
      id: 'p5',
      difficulty: 2,
      prompt: String.raw`Which position function satisfies $\vec r(t)\cdot\vec v(t)=0$ for every $t$?`,
      choices: [
        { tex: String.raw`$\langle 3\cos(t^2),\ 3\sin(t^2)\rangle$`, correct: true },
        { tex: String.raw`$\langle 3\cos t,\ 2\sin t\rangle$`, mistake: 'circle-test', why: 'This is an ellipse; r·v = -5 sin t cos t is not always 0.' },
        { tex: String.raw`$\langle t\cos t,\ t\sin t\rangle$`, mistake: 'concept', why: 'This spirals outward, so |r| = t grows; r·v = t.' },
        { tex: String.raw`$\langle \cos t,\ \sin 2t\rangle$`, mistake: 'concept', why: 'Different frequencies: |r|^2 = cos^2 t + sin^2 2t is not constant.' },
        { tex: String.raw`$\langle 3\cos t,\ 3\sin t+1\rangle$`, mistake: 'circle-test', why: 'A circle, but centered at (0, 1). The test r·v = 0 only detects circles centered at the origin; here r·v = 3 cos t.' },
      ],
      steps: [
        String.raw`$\vec r\cdot\vec v=0$ for all $t$ exactly when $|\vec r|$ is constant.`,
        String.raw`$|\langle 3\cos t^2,3\sin t^2\rangle|^2 = 9$, constant.`,
        String.raw`Directly: $\vec v = \langle -6t\sin t^2,\ 6t\cos t^2\rangle$, and $\vec r\cdot\vec v = -18t\sin t^2\cos t^2+18t\sin t^2\cos t^2 = 0$.`,
      ],
      source: 'original',
    },
    {
      id: 'p6',
      difficulty: 3,
      prompt: String.raw`Let $\vec r(t)=\langle t,\ 2t,\ e^t\rangle$. Which statement is true?`,
      choices: [
        { tex: String.raw`The motion lies in a plane.`, correct: true },
        { tex: String.raw`The speed is constant.`, mistake: 'concept', why: '|v|^2 = 5 + e^{2t} depends on t.' },
        { tex: String.raw`The acceleration is zero.`, mistake: 'concept', why: 'a = <0, 0, e^t>, which is never zero.' },
        { tex: String.raw`$\vec v$ and $\vec a$ are orthogonal at $t=0$.`, mistake: 'arith', why: 'v(0)·a(0) = <1, 2, 1>·<0, 0, 1> = 1, not 0.' },
        { tex: String.raw`None of the other statements is true.`, mistake: 'concept', why: 'y = 2x for every t, so the path stays in the plane y = 2x.' },
      ],
      steps: [
        String.raw`$\vec v = \langle 1,2,e^t\rangle$, $|\vec v| = \sqrt{5+e^{2t}}$: not constant.`,
        String.raw`$\vec a = \langle 0,0,e^t\rangle\ne\vec 0$, and $\vec v(0)\cdot\vec a(0) = 1\ne0$.`,
        String.raw`$x=t$ and $y=2t$, so $y=2x$ for every $t$. The whole path lies in the vertical plane $y=2x$.`,
      ],
      source: 'original',
    },
    {
      id: 'p7',
      difficulty: 3,
      prompt: String.raw`Which statement about $\vec r(t)=\langle 3\cos t,\ 5\sin t,\ 4\cos t\rangle$ is true?`,
      choices: [
        { tex: String.raw`$|\vec r(t)|=5$ for all $t$, so $\vec r(t)\cdot\vec v(t)=0$ for all $t$.`, correct: true },
        { tex: String.raw`The path is not a circle, because the coefficients 3, 5, 4 are different.`, mistake: 'circle-test', why: '|r| = 5 always, and the path lies in the plane 4x = 3z through the origin: a circle of radius 5.' },
        { tex: String.raw`The particle stays on a sphere of radius $\sqrt{50}$.`, mistake: 'arith', why: 'You added 9 + 25 + 16. Use the identity: 25 cos^2 t + 25 sin^2 t = 25.' },
        { tex: String.raw`The speed is not constant.`, mistake: 'concept', why: '|v|^2 = 9 sin^2 + 25 cos^2 + 16 sin^2 = 25, so the speed is 5.' },
        { tex: String.raw`$\vec r\cdot\vec v=0$ only when $t$ is a multiple of $\tfrac\pi2$.`, mistake: 'circle-test', why: 'r·v = -9 sin t cos t + 25 sin t cos t - 16 sin t cos t = 0 for every t.' },
      ],
      steps: [
        String.raw`$|\vec r|^2 = 9\cos^2t+25\sin^2t+16\cos^2t = 25\cos^2t+25\sin^2t = 25$.`,
        String.raw`Constant $|\vec r|$ means $\vec r\cdot\vec v = \tfrac12\tfrac{d}{dt}|\vec r|^2 = 0$.`,
        String.raw`Directly: $\vec v=\langle-3\sin t,5\cos t,-4\sin t\rangle$, $\vec r\cdot\vec v = (-9+25-16)\sin t\cos t = 0$.`,
      ],
      source: 'original',
    },
  ],

  lab: [
    { kind: 'curve', x: '2*t', y: '4*t', z: '-4.9*t^2 + 14.7*t + 49', t: [0, 5], color: 'road', arrow: true },
    { kind: 'curve', x: '3*cos(t)', y: '5*sin(t)', z: '4*cos(t)', t: [0, '2*pi'], color: 'water', arrow: true },
  ],
};
