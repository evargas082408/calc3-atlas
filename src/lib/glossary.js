// What each symbol and term in MA 261 means, in one or two sentences.
// `tex` matches against KaTeX source, `text` against plain lowercase prose. `lessons` are where it is taught.
const ints = (s) => (s.match(/\\i{1,3}nt|\\oint/g) ?? []).reduce((n, m) => n + (m === '\\iiint' ? 3 : m === '\\iint' ? 2 : 1), 0);

export const GLOSSARY = [
  { id: 'curl', title: 'Curl', tex: /\\nabla\s*\\times|\\(?:operatorname|text|mathrm)\{curl/, text: /\bcurl\b/, lessons: [30, 34],
    meaning: String.raw`$\nabla\times\vec F$ measures how much the field spins around each point. Its direction is the spin axis (right-hand rule) and its length is the spin rate. If $\operatorname{curl}\vec F = \vec 0$ on all of $\mathbb R^3$, then $\vec F$ is conservative.` },
  { id: 'div', title: 'Divergence', tex: /\\nabla\s*\\cdot|\\(?:operatorname|text|mathrm)\{div/, text: /\bdivergence\b(?! theorem)/, lessons: [30, 36],
    meaning: String.raw`$\nabla\cdot\vec F = P_x + Q_y + R_z$ is a number at each point: the net outflow per unit volume. Positive means a source, negative a sink.` },
  { id: 'gradient', title: 'Gradient', tex: /\\nabla(?!\s*(?:\\times|\\cdot))|\\(?:operatorname|text|mathrm)\{grad/, text: /\bgradients?\b|\bgrad\b/, lessons: [13, 14],
    meaning: String.raw`$\nabla f = \langle f_x, f_y\rangle$ points uphill, in the direction where $f$ grows fastest. Its length is that fastest rate, and it is perpendicular to the level curve through the point.` },
  { id: 'boundary', title: 'Boundary', tex: /\\partial\s*[DSE](?![a-zA-Z])/, text: /\bboundary\b/, lessons: [29, 34, 36],
    meaning: String.raw`$\partial D$ is the edge of $D$: the boundary curve of a flat region or surface, or the closed skin of a solid.` },
  { id: 'second-partials', title: 'Second partial derivatives', tex: /[fgz]_\{?(?:xx|yy|xy|yx)\}?/, text: /second partials?|mixed partials?|clairaut/, lessons: [11, 15],
    meaning: String.raw`$f_{xx}$ is how the $x$-slope changes as you move in $x$ (concavity in $x$). $f_{xy}$ is how the $x$-slope changes as you move in $y$. For smooth functions $f_{xy} = f_{yx}$.` },
  { id: 'partial', title: 'Partial derivative', tex: /\\partial\s*[a-z]|\\frac\{\\partial|\b[fgFz]_\{?[xyzst]\}?(?![a-z])/, text: /partial derivatives?/, lessons: [11],
    meaning: String.raw`$f_x = \partial f/\partial x$ is the slope of $f$ when you move in the $x$ direction only, with $y$ held fixed. Picture slicing the surface with a plane $y = \text{const}$ and taking the slope of that curve.` },
  { id: 'discriminant', title: 'Second derivative test', tex: /D\s*=\s*f_\{?xx|f_\{?xx\}?\s*f_\{?yy/, text: /second derivative test|discriminant/, lessons: [15],
    meaning: String.raw`At a critical point, $D = f_{xx}f_{yy} - f_{xy}^2$. $D>0$ and $f_{xx}>0$: local min. $D>0$ and $f_{xx}<0$: local max. $D<0$: saddle. $D=0$: the test tells you nothing.` },
  { id: 'critical', title: 'Critical point', text: /critical points?/, lessons: [15, 16],
    meaning: String.raw`A point where $\nabla f = \vec 0$ (or a partial does not exist). The tangent plane is flat there. It can be a max, a min, or a saddle.` },
  { id: 'saddle', title: 'Saddle point', text: /\bsaddle/, lessons: [15, 4],
    meaning: String.raw`A critical point that is a max along one direction and a min along another, like $z = x^2 - y^2$ at the origin.` },
  { id: 'lagrange', title: 'Lagrange multiplier', tex: /\\lambda/, text: /lagrange|multipliers?\b/, lessons: [17],
    meaning: String.raw`$\nabla f = \lambda\nabla g$: at the best point on the constraint $g = k$, the level curve of $f$ just touches the constraint curve, so their normals (the gradients) are parallel. $\lambda$ is the scale factor between them.` },
  { id: 'directional', title: 'Directional derivative', tex: /D_\{?\\?(?:vec\s*)?\{?(?:u|\\mathbf\{u\})/, text: /directional derivatives?/, lessons: [13],
    meaning: String.raw`$D_{\vec u}f = \nabla f\cdot\vec u$, with $\vec u$ a unit vector, is the slope of the surface in the direction $\vec u$. It is largest, equal to $|\nabla f|$, when $\vec u$ points along $\nabla f$.` },
  { id: 'chain', title: 'Chain rule', text: /chain rule|tree diagram/, lessons: [12],
    meaning: String.raw`Draw the tree from the top variable down to the one you differentiate by. Multiply the derivatives along each path, then add the paths.` },
  { id: 'tangent-plane', title: 'Tangent plane', tex: /z\s*-\s*z_0/, text: /tangent planes?|linear approximation|lineari[sz]ation/, lessons: [14],
    meaning: String.raw`$z - z_0 = f_x(x_0,y_0)(x-x_0) + f_y(x_0,y_0)(y-y_0)$ is the flat plane that touches the surface at the point. Near the point, $f$ is almost equal to it.` },
  { id: 'level-surface', title: 'Level surface', text: /level surfaces?/, lessons: [9, 14],
    meaning: String.raw`$F(x,y,z) = k$ is the 3D version of a level curve. $\nabla F$ is normal to it, which is how you get tangent planes to surfaces like spheres.` },
  { id: 'level-curve', title: 'Level curve', text: /level curves?|contours?\b|contour map/, lessons: [9, 13],
    meaning: String.raw`$f(x,y) = k$ is the set of points where the surface has height $k$, drawn on the floor. Curves packed close together mean the surface is steep there.` },
  { id: 'limit', title: 'Limit in 2D', tex: /\\lim/, text: /\blimits?\b|does not exist/, lessons: [10],
    meaning: String.raw`$(x,y)$ can approach the point along any path. The limit exists only if every path gives the same value, so two paths with different values prove it does not exist.` },
  { id: 'triple', title: 'Triple integral', tex: (s) => ints(s) >= 3 && !/\\oint/.test(s), text: /triple integrals?/, lessons: [21, 22, 23],
    meaning: String.raw`$\iiint_E f\,dV$ adds up $f$ times tiny volumes over the solid $E$. With $f = 1$ it is the volume of $E$; with $f$ a density it is the mass.` },
  { id: 'double', title: 'Double integral', tex: (s) => ints(s) === 2 && !/\\oint/.test(s), text: /double integrals?|iterated integrals?/, lessons: [18, 19, 20],
    meaning: String.raw`$\iint_D f\,dA$ adds up $f$ times tiny areas over the region $D$. If $f \ge 0$ it is the volume under the surface and above $D$; with $f = 1$ it is the area of $D$.` },
  { id: 'polar-element', title: 'Polar area element', tex: /r\s*(?:\\[,;!]\s*)*dr\s*(?:\\[,;!]\s*)*d\\theta/, lessons: [20],
    meaning: String.raw`A polar box is $\Delta r$ thick and $r\,\Delta\theta$ long, so its area is $r\,\Delta r\,\Delta\theta$. That is why $dA = r\,dr\,d\theta$. Forgetting this $r$ is the most common polar mistake.` },
  { id: 'spherical-element', title: 'Spherical volume element', tex: /\\rho\s*\^\s*\{?2\}?\s*(?:\\[,;!]\s*)*\\sin\s*\\phi/, lessons: [23],
    meaning: String.raw`A spherical box is $\Delta\rho$ deep, $\rho\,\Delta\phi$ tall, and $\rho\sin\phi\,\Delta\theta$ wide, so $dV = \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$.` },
  { id: 'dA', title: 'Area element', tex: /d\s?A(?![a-zA-Z])/, text: /\bda\b/, lessons: [18, 20],
    meaning: String.raw`$dA$ is a tiny piece of area: $dx\,dy$ in rectangular coordinates, $r\,dr\,d\theta$ in polar.` },
  { id: 'dV', title: 'Volume element', tex: /d\s?V(?![a-zA-Z])/, text: /\bdv\b/, lessons: [21, 22, 23],
    meaning: String.raw`$dV$ is a tiny piece of volume: $dx\,dy\,dz$ in rectangular, $r\,dz\,dr\,d\theta$ in cylindrical, $\rho^2\sin\phi\,d\rho\,d\phi\,d\theta$ in spherical.` },
  { id: 'jacobian', title: 'Jacobian', text: /jacobians?/, lessons: [20, 22, 23],
    meaning: String.raw`The factor that turns $du\,dv$ into true area (or volume) when you change coordinates. Polar and cylindrical: $r$. Spherical: $\rho^2\sin\phi$.` },
  { id: 'rho', title: 'ρ (rho)', tex: /\\rho/, lessons: [23, 24],
    meaning: String.raw`In spherical coordinates $\rho$ is the distance from the origin: $\rho = \sqrt{x^2+y^2+z^2}$. In mass problems $\rho$ or $\delta$ can also mean density.` },
  { id: 'phi', title: 'φ (phi)', tex: /\\(?:var)?phi/, lessons: [23, 28],
    meaning: String.raw`In spherical coordinates $\phi$ is the angle down from the positive $z$-axis: $0$ is straight up, $\pi/2$ is the $xy$-plane, $\pi$ is straight down. In potential problems $\phi$ often names the potential, with $\nabla\phi = \vec F$.` },
  { id: 'theta', title: 'θ (theta)', tex: /\\theta/, lessons: [20, 22],
    meaning: String.raw`$\theta$ is the angle in the $xy$-plane from the positive $x$-axis, the same in polar, cylindrical and spherical coordinates: $x = r\cos\theta$, $y = r\sin\theta$.` },
  { id: 'order', title: 'Order of integration', text: /order of integration|reverse the order|reversing the order|fubini|type i\b|type ii\b/, lessons: [18, 19],
    meaning: String.raw`An iterated integral can be done in either order, but both sets of limits must describe the same region. To reverse the order, sketch the region and read the new bounds off the sketch.` },
  { id: 'cross', title: 'Cross product', tex: /(?<!\\nabla\s{0,3})\\times/, text: /cross products?/, lessons: [1, 31],
    meaning: String.raw`$\vec a\times\vec b$ is a vector perpendicular to both, with length $|\vec a||\vec b|\sin\theta$, the area of the parallelogram they span. Order matters: $\vec b\times\vec a = -\vec a\times\vec b$.` },
  { id: 'dot', title: 'Dot product', tex: /\\vec\s*\{?\w\}?\s*\\cdot|\\cdot\s*\\vec|\\mathbf\{\w\}\s*\\cdot/, text: /dot products?/, lessons: [1],
    meaning: String.raw`$\vec a\cdot\vec b = a_1b_1 + a_2b_2 + a_3b_3 = |\vec a||\vec b|\cos\theta$. The result is a number, and zero means the vectors are perpendicular.` },
  { id: 'magnitude', title: 'Length of a vector', tex: /\|\s*\\vec|\\left\|\s*\\vec/, text: /magnitude|\bspeed\b/, lessons: [1, 6],
    meaning: String.raw`$|\vec v| = \sqrt{v_1^2+v_2^2+v_3^2}$ is the length of $\vec v$. For a velocity vector, its length is the speed.` },
  { id: 'projection', title: 'Projection', tex: /\\(?:operatorname|text|mathrm)\{(?:proj|comp)\}|proj_/, text: /projections?/, lessons: [1],
    meaning: String.raw`$\operatorname{proj}_{\vec a}\vec b = \dfrac{\vec a\cdot\vec b}{|\vec a|^2}\,\vec a$ is the shadow of $\vec b$ on the line of $\vec a$. The number $\dfrac{\vec a\cdot\vec b}{|\vec a|}$ is its signed length.` },
  { id: 'normal', title: 'Normal vector', tex: /\\vec\s*\{?n\}?\s*\\cdot|\\mathbf\{n\}\s*\\cdot/, text: /normal vectors?|\bnormals?\b/, lessons: [2, 14, 31],
    meaning: String.raw`A vector perpendicular to a plane or surface. For a plane $ax+by+cz=d$ it is $\langle a,b,c\rangle$; for a level surface $F = k$ it is $\nabla F$; for a parametrized surface it is $\vec r_u\times\vec r_v$.` },
  { id: 'line', title: 'Equation of a line', text: /symmetric equations|parametric equations? (?:of|for) (?:the|a) line|direction vector/, lessons: [2],
    meaning: String.raw`A line is a point plus a direction: $\vec r(t) = \vec r_0 + t\vec v$. Solving each coordinate for $t$ and setting them equal gives the symmetric equations.` },
  { id: 'surface-param', title: 'Parametrized surface', tex: /\\vec\s*\{?r\}?\s*\(\s*u\s*,\s*v\s*\)|\\mathbf\{r\}\(u,\s*v\)/, text: /parametri[sz](?:ed|ation) surface|surface parametri/, lessons: [31],
    meaning: String.raw`$\vec r(u,v)$ sends each point of a flat $uv$ region onto the surface. Holding $u$ or $v$ fixed traces the grid curves on it.` },
  { id: 'ru-rv', title: 'Surface normal from a parametrization', tex: /r_u\s*\\times|r_\{?u\}?\s*\\times/, lessons: [31, 33],
    meaning: String.raw`$\vec r_u\times\vec r_v$ crosses the tangent vectors of the two grid curves. It is normal to the surface, and its length is the area stretch factor.` },
  { id: 'dS', title: 'Surface element', tex: /d\s?S(?![a-zA-Z])|d\\vec\s*\{?S\}?/, text: /surface area|surface integrals?/, lessons: [31, 32, 33],
    meaning: String.raw`$dS = |\vec r_u\times\vec r_v|\,du\,dv$ is a tiny piece of surface area. For a graph $z = g(x,y)$ it is $\sqrt{1+g_x^2+g_y^2}\,dA$.` },
  { id: 'vector-function', title: 'Vector function', tex: /\\vec\s*\{?r\}?\s*\(\s*t\s*\)|\\mathbf\{r\}\(t\)/, text: /vector functions?|vector-valued/, lessons: [5],
    meaning: String.raw`$\vec r(t) = \langle x(t), y(t), z(t)\rangle$ is a point that moves as $t$ changes. Its tip traces a curve.` },
  { id: 'velocity', title: 'Velocity', tex: /\\vec\s*\{?r\}?\s*(?:\^\s*\{?\s*(?:\\,)?\s*\\prime|')|\\vec\s*\{?v\}?(?![a-z])/, text: /\bvelocity\b/, lessons: [6, 7],
    meaning: String.raw`$\vec r^{\,\prime}(t)$ is the velocity. It is tangent to the curve and points the way the point moves, and its length $|\vec r^{\,\prime}(t)|$ is the speed.` },
  { id: 'acceleration', title: 'Acceleration', tex: /\\vec\s*\{?a\}?(?![a-z])/, text: /acceleration|projectile/, lessons: [7],
    meaning: String.raw`$\vec a = \vec r^{\,\prime\prime}(t)$ is the acceleration, the rate the velocity changes. A projectile with no air resistance has $\vec a = \langle 0, 0, -g\rangle$; integrate twice, using the starting velocity and position, to get $\vec r(t)$.` },
  { id: 'unit-tangent', title: 'Unit tangent vector', tex: /\\vec\s*\{?T\}?|\\mathbf\{T\}/, text: /unit tangent/, lessons: [6, 8],
    meaning: String.raw`$\vec T = \vec r^{\,\prime}/|\vec r^{\,\prime}|$ is the direction of motion, scaled to length 1.` },
  { id: 'curvature', title: 'Curvature', tex: /\\kappa/, text: /curvature/, lessons: [8],
    meaning: String.raw`$\kappa = |d\vec T/ds|$ is how fast the direction turns per unit of distance. A circle of radius $a$ has $\kappa = 1/a$. A formula you can compute: $\kappa = |\vec r^{\,\prime}\times\vec r^{\,\prime\prime}|/|\vec r^{\,\prime}|^3$.` },
  { id: 'ds', title: 'Arc length element', tex: /(?<![a-zA-Z\\])d\s?s(?![a-zA-Z])/, text: /arc length/, lessons: [8, 26],
    meaning: String.raw`$ds = |\vec r^{\,\prime}(t)|\,dt$ is a tiny piece of length along the curve, so $\int_a^b |\vec r^{\,\prime}(t)|\,dt$ is the arc length.` },
  { id: 'scalar-line', title: 'Line integral of a function', tex: /\\int_\{?C\}?[^$]*?(?<![a-zA-Z\\])ds/, text: /line integrals? of (?:a )?(?:scalar )?function/, lessons: [26],
    meaning: String.raw`$\int_C f\,ds$ adds up $f$ along the curve: the area of a curtain of height $f$ standing on $C$. To compute it, parametrize: $\int_a^b f(\vec r(t))\,|\vec r^{\,\prime}(t)|\,dt$.` },
  { id: 'work', title: 'Line integral of a field (work)', tex: /d\s?\\vec\s*\{?r\}?|d\\mathbf\{r\}/, text: /\bwork\b|circulation|line integrals?/, lessons: [27, 28],
    meaning: String.raw`$\int_C\vec F\cdot d\vec r$ adds up the part of $\vec F$ along the path: work, if $\vec F$ is a force, and circulation around a closed loop. To compute it: $\int_a^b \vec F(\vec r(t))\cdot\vec r^{\,\prime}(t)\,dt$.` },
  { id: 'closed', title: 'Closed curve', tex: /\\oint/, text: /closed curves?|closed loops?|simple closed/, lessons: [27, 29],
    meaning: String.raw`$\oint_C$ means $C$ is a closed curve. In the plane, counterclockwise is the positive direction.` },
  { id: 'conservative', title: 'Conservative field', text: /conservative|path[- ]independen/, lessons: [28],
    meaning: String.raw`$\vec F$ is conservative if $\vec F = \nabla f$ for some potential $f$. Then $\int_C\vec F\cdot d\vec r = f(\text{end}) - f(\text{start})$, the path does not matter, and closed loops give 0. In 2D, test $Q_x = P_y$ on a simply connected domain.` },
  { id: 'potential', title: 'Potential function', text: /potential functions?|\bpotential\b/, lessons: [28],
    meaning: String.raw`A function $f$ with $\nabla f = \vec F$. Find it by integrating $P$ with respect to $x$, then pin down the leftover function of $y$ (and $z$) using the other components.` },
  { id: 'green', title: "Green's theorem", text: /green(?:'|’)?s/, lessons: [29],
    meaning: String.raw`$\oint_C P\,dx + Q\,dy = \iint_D (Q_x - P_y)\,dA$ when $C$ is the counterclockwise boundary of $D$. Circulation around the edge equals the total spin inside.` },
  { id: 'flux', title: 'Flux', tex: /\\vec\s*\{?n\}?\s*(?:\\[,;!]\s*)*d\s?[sS]|\\mathbf\{n\}\s*(?:\\,)?\s*d[sS]/, text: /\bflux\b/, lessons: [27, 33],
    meaning: String.raw`Flux measures flow through a curve or surface, not along it. Across a curve: $\int_C \vec F\cdot\vec n\,ds$. Through a surface: $\iint_S \vec F\cdot\vec n\,dS$.` },
  { id: 'orientation', title: 'Orientation', text: /orient|outward|upward|counterclockwise|clockwise|right[- ]hand/, lessons: [27, 33, 34],
    meaning: String.raw`The direction you choose for travel along a curve or for a surface's normal. Reversing it flips the sign of a line integral or a flux. Closed surfaces use the outward normal; Stokes pairs an upward normal with a counterclockwise boundary (right-hand rule).` },
  { id: 'stokes', title: "Stokes' theorem", text: /stokes/, lessons: [34, 35],
    meaning: String.raw`$\oint_{\partial S}\vec F\cdot d\vec r = \iint_S(\nabla\times\vec F)\cdot\vec n\,dS$. Every surface with the same boundary gives the same answer, so pick the easiest one.` },
  { id: 'divergence-theorem', title: 'Divergence theorem', text: /divergence theorem|gauss/, lessons: [36, 37],
    meaning: String.raw`$\iint_{\partial E}\vec F\cdot\vec n\,dS = \iiint_E\nabla\cdot\vec F\,dV$ for a closed surface with outward normal. The flux out equals the total source inside.` },
  { id: 'center-of-mass', title: 'Center of mass', tex: /\\bar\s*\{?[xyz]\}?|\\overline\{[xyz]\}/, text: /center of mass|centroid|moments?\b/, lessons: [24],
    meaning: String.raw`$\bar x = \dfrac{1}{m}\iint_D x\,\delta\,dA$, and the same for $\bar y$: the balance point. With constant density it is the centroid, and symmetry often gives a coordinate for free.` },
  { id: 'quadric', title: 'Quadric surface', text: /paraboloid|hyperboloid|ellipsoid|\bcones?\b|quadric/, lessons: [3, 4],
    meaning: String.raw`A quadric surface is the graph of a second-degree equation in $x$, $y$, $z$. Identify it by its traces: slice with $x$, $y$ or $z$ equal to a constant and look for ellipses, parabolas or hyperbolas.` },
  { id: 'cylinder', title: 'Cylinder', text: /cylinders?\b|cylindrical/, lessons: [3, 22],
    meaning: String.raw`In 3D, an equation missing a variable is a cylinder: the 2D curve slid along the missing axis. $x^2+y^2=1$ is a tube around the $z$-axis. Cylindrical coordinates are polar coordinates plus $z$.` },
  { id: 'trace', title: 'Trace', text: /\btraces?\b/, lessons: [3, 4],
    meaning: String.raw`A trace is the curve you get by slicing a surface with a plane such as $z = k$. Traces are how you recognize a surface.` },
];

const plain = (s) => String(s ?? '').toLowerCase();

// Terms and symbols in a passage, in the order they first appear. `tex` is KaTeX source, `text` plain words.
export function lookup({ text = '', tex = '' } = {}, limit = 6) {
  const t = plain(text);
  const found = [];
  for (const g of GLOSSARY) {
    let at = Infinity;
    if (tex && g.tex) {
      // the function entries are the integrals; they sit where the first integral sign is
      if (typeof g.tex === 'function') { if (g.tex(tex)) at = Math.max(0, tex.search(/\\i{1,3}nt/)) - 1e6; } else {
        const m = g.tex.exec(tex);
        if (m) at = m.index - 1e6;
      }
    }
    if (t && g.text) {
      const m = g.text.exec(t);
      if (m) at = Math.min(at, m.index);
    }
    if (at < Infinity) found.push({ g, at });
  }
  // The more specific of two overlapping entries wins.
  const ids = new Set(found.map((f) => f.g.id));
  const drop = new Set();
  if (ids.has('second-partials') || ids.has('discriminant')) drop.add('partial');
  if (ids.has('boundary')) drop.add('partial');
  if (ids.has('polar-element')) drop.add('dA');
  if (ids.has('spherical-element')) { drop.add('dV'); drop.add('rho'); drop.add('phi'); }
  if (ids.has('scalar-line')) drop.add('ds');
  if (ids.has('divergence-theorem')) drop.add('div');
  if (ids.has('ru-rv')) drop.add('cross');
  if (ids.has('flux')) { drop.add('ds'); drop.add('dS'); }
  if (ids.has('level-surface')) drop.add('level-curve');
  return found.filter((f) => !drop.has(f.g.id)).sort((a, b) => a.at - b.at).slice(0, limit).map((f) => f.g);
}
