# Lesson content format

Each lesson is one file, `src/content/lessons/lNN.js` (two-digit number, e.g. `l07.js`, `l20.js`),
with a single default export. Plain JS object, no imports.

Text fields are Markdown-lite:
- `$...$` inline math and `$$...$$` display math, written in KaTeX LaTeX. Escape backslashes in JS strings
  (write `'\\iint_D'` in a normal string, or use String.raw`...` template literals; template literals are preferred).
- `**bold**`, `*italic*`, `` `code` ``, blank line = new paragraph, lines starting `- ` = bullet list,
  lines starting `1. ` = numbered list.
- Write for a student who has only taken Calc BC. Short sentences. No filler, no "let's dive in", no emoji.

```js
export default {
  id: 20,                      // lesson number
  title: 'Double integrals in polar coordinates',
  section: '16.3',             // textbook section
  exam: 2,                     // 1 = Lessons 1-17, 2 = Lessons 17-31, 3 = final-only (32-37)
  blurb: 'One line: what this lesson lets you do.',
  boiler: ['Polar Double Integration'],   // BoilerExams topic names (exact strings from the stats list)

  // The concept, in order. 4-7 sections. Ids are short slugs, unique within the lesson.
  sections: [
    { id: 'idea', title: 'The idea', body: String.raw`...` },
    { id: 'why-r', title: 'Why the extra r', body: String.raw`...` },
    { id: 'recipe', title: 'Recipe', body: String.raw`1. Sketch...\n2. ...` },
    { id: 'example', title: 'Worked example', body: String.raw`...` },
  ],

  // The formula card: what goes on a formula sheet. 2-6 items.
  formulas: [
    { label: 'Area element', tex: String.raw`dA = r\,dr\,d\theta` },
  ],

  // Common mistakes. 3-5 items. These ids are what wrong answer choices point to.
  mistakes: [
    { id: 'missing-r', title: 'Dropping the r in dA',
      wrong: String.raw`$\int_0^{2\pi}\int_0^1 e^{-r^2}\,dr\,d\theta$`,
      right: String.raw`$\int_0^{2\pi}\int_0^1 e^{-r^2}\,r\,dr\,d\theta$`,
      why: 'The polar box is r dr by dθ wide, not dr by dθ. Without r you cannot even do the u-substitution.' },
  ],

  hook: 'One-sentence memory hook.',

  // The 3D scene shown beside the lesson, stepped through with buttons (see Scenes below).
  scene: { ... },

  // 4-8 practice problems, easiest first, exam style (Purdue MA 261 is 5-choice multiple choice).
  problems: [
    {
      id: 'p1',
      difficulty: 1,                       // 1 warm-up, 2 exam-typical, 3 hard
      prompt: String.raw`Evaluate $\iint_D e^{-(x^2+y^2)}\,dA$ where $D$ is the disk $x^2+y^2\le 1$.`,
      choices: [                          // exactly 5; one has correct: true
        { tex: String.raw`$\pi(1-e^{-1})$`, correct: true },
        { tex: String.raw`$2\pi(1-e^{-1})$`, mistake: 'missing-half', why: 'You integrated r e^{-r^2} as e^{-r^2}... the substitution gives a 1/2.' },
        { tex: String.raw`$\int_0^{2\pi}\int_0^1 e^{-r^2}dr\,d\theta$ (no closed form)`, mistake: 'missing-r' },
        { tex: String.raw`$\pi e^{-1}$`, mistake: 'arith', why: 'Evaluate at both limits: e^0 - e^{-1}.' },
        { tex: String.raw`$\pi/2\,(1-e^{-1})$`, mistake: 'theta-range' },
      ],
      steps: [                            // full worked solution, 3-6 steps, each a short markdown string
        String.raw`The region is a disk, and the integrand has $x^2+y^2$: switch to polar.`,
        String.raw`$\int_0^{2\pi}\int_0^1 e^{-r^2}\,r\,dr\,d\theta$`,
        String.raw`Let $u=r^2$: inner integral is $\tfrac12(1-e^{-1})$.`,
        String.raw`Times $2\pi$: $\pi(1-e^{-1})$.`,
      ],
      source: 'original',                 // or 'Study plan bank #10' etc. Never copy exam questions verbatim.
    },
  ],

  // Optional: a ready-made 3D Lab setup the "Open in 3D Lab" button loads.
  lab: [ { kind: 'surface', expr: '4 - x^2 - y^2' } ],
};
```

Every wrong choice's `mistake` must be one of this lesson's `mistakes[].id`, or one of the shared ids:
`arith` (arithmetic slip), `sign` (sign error), `setup` (wrong setup/limits), `concept` (wrong method entirely),
`units` (gave a point instead of a value, a vector instead of a number, etc.).
`why` on a wrong choice is optional but strongly preferred: one sentence naming exactly what produces that answer.
Make wrong answers the ones real students get, built from the listed mistakes, not random numbers.
Verify every correct answer by actually computing it (use python/sympy if available).

## Scenes

A scene is a list of layers plus a list of steps. The 3D engine draws the layers; each step shows a subset
of them with a caption, like a slideshow you can rotate. Expressions are math.js syntax
(`x^2`, `sin(x)`, `sqrt(x)`, `exp(x)`, `pi`, `e`, `abs`, `atan2(y,x)`, multiplication must be explicit: `2*x`).

```js
scene: {
  view: { range: 3, z: [-1, 5] },            // optional: half-width of the x/y box, and z clip range
  camera: [6, -6, 5],                        // optional camera position
  layers: [
    { id: 'surf',  kind: 'surface', z: '4 - x^2 - y^2', domain: { r: [0, 2] }, colormap: 'terrain' },
    { id: 'disk',  kind: 'region2d', polar: { r: [0, 2], theta: [0, '2*pi'] }, color: 'water' },
    { id: 'wedge', kind: 'polarBox', r: 1.2, theta: 0.8, dr: 0.3, dtheta: 0.35 },
    { id: 'grad',  kind: 'gradientField', of: 'surf', density: 9 },
    { id: 'lvl',   kind: 'contours', of: 'surf', levels: 8 },
    { id: 'pt',    kind: 'point', at: [1, 1, 2], label: 'P' },
    { id: 'v',     kind: 'vector', from: [0,0,0], to: [1,2,2], color: 'water', label: 'v' },
    { id: 'pl',    kind: 'plane', normal: [1,1,1], point: [0,0,1], size: 3 },
    { id: 'tp',    kind: 'tangentPlane', of: 'surf', at: [1, 0.5] },
    { id: 'c',     kind: 'curve', x: 'cos(t)', y: 'sin(t)', z: 't/4', t: [0, '4*pi'] },
    { id: 'ps',    kind: 'paramSurface', x: 'u*cos(v)', y: 'u*sin(v)', z: 'u', u: [0, 2], v: [0, '2*pi'] },
    { id: 'F',     kind: 'vectorField', P: '-y', Q: 'x', R: '0', density: 7 },        // R optional; 2D field drawn at z=0
    { id: 'solid', kind: 'solid', bottom: '0', top: '1 - x - y', region: { x: [0,1], y: [0, '1 - x'] } },
    { id: 'onSurf',kind: 'curveOnSurface', of: 'surf', x: 'sqrt(2)*cos(t)', y: 'sqrt(2)*sin(t)', t: [0, '2*pi'] },
  ],
  steps: [
    { label: 'Start', show: ['surf'], caption: String.raw`The paraboloid $z = 4 - x^2 - y^2$.` },
    { label: 'Shadow', show: ['surf', 'disk'], caption: String.raw`Its shadow on the floor is the disk $r \le 2$.` },
    { label: 'Polar box', show: ['disk', 'wedge'], caption: String.raw`One polar box has area $r\,\Delta r\,\Delta\theta$.` },
  ],
}
```

Layer reference:
- `surface`: `z` expr in x,y. `domain`: `{x:[a,b], y:[c,d]}` (y bounds may be exprs in x) or `{r:[a,b], theta:[a,b]}`.
  Defaults to the view box. `colormap`: `terrain` (default), `inferno`, `viridis`, `textbook` (rainbow), `water`. `opacity` 0-1. `mesh: false` hides grid lines.
- `paramSurface`: `x,y,z` exprs in u,v with `u`,`v` ranges. Same colormap/opacity options.
- `curve`: `x,y,z` exprs in t, `t` range. `color`. `arrow: true` adds direction arrows.
- `curveOnSurface`: a curve in the xy-plane (`x`,`y` in t) lifted onto surface `of`.
- `region2d`: a flat shaded floor region. Either `{ x:[a,b], y:[g1(x), g2(x)] }`, `{ y:[c,d], x:[h1(y), h2(y)] }`, or `polar: {r:[a, b(theta)], theta:[a,b]}`. `strips: 'vertical'|'horizontal'|'radial'` draws slicing strips.
- `polarBox`: one polar rectangle at (r, theta) of size dr by dtheta, labeled.
- `solid`: the volume between `bottom` and `top` surfaces over `region` (same shapes as region2d). Translucent.
- `contours`: level curves of surface `of`, drawn both on the surface and projected on the floor. `levels` count.
- `gradientField`: arrows of grad f on the floor for surface `of`.
- `tangentPlane`: tangent plane to surface `of` at `at: [x0, y0]`.
- `vectorField`: 2D (`P`,`Q`) or 3D (`P`,`Q`,`R`). `density` per axis.
- `point`, `vector`, `plane`: as shown. `label` optional.
- Colors are names from the map palette: `contour` (brown), `water` (blue), `road` (red), `wood` (green), `ink` (black), `revision` (purple).

Steps: 3-6 per scene, first label usually 'Start'. Each caption 1-3 sentences that teach, not describe.
