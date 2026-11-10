# Calc 3 Atlas

A study site for Purdue's MA 261 (Multivariate Calculus), Spring 2026, built around Prof. Sunkula's 37 lectures.

**Live site:** https://evargas082408.github.io/calc3-atlas/

## What's in it

- **Lessons 1–37.** Each lesson has the main ideas, a 3D picture you can rotate, a formula card, the common mistakes, and exam-style problems. Links go to the lecture recording and the instructor's notes.
- **3D Lab.** Type an expression like `z = x^2 - y^2`, `<cos t, sin t, t/4>`, or `F = <-y, x>`. Surfaces, curves, vector fields, parametric and implicit surfaces all work. Letters other than x, y, z, t, u, v become sliders. Press **Teach me this** to watch the graph get built step by step, with an explanation for each piece.
- **Ask.** Type math to get it drawn and explained, or a question like "why is the Jacobian r?" to jump to the right lesson sections, formulas and common mistakes. You can also add your own Claude API key in Settings to get a written answer.
- **Practice.** 267 multiple-choice problems. A wrong answer tells you what probably went wrong, shows the right step, and gives the full solution. Modes: Exam 2 mix, weak lessons, redo misses, one lesson, Exam 1 mix, final.
- **Mock exams.** Timed Exam 1, Exam 2 and Final mocks drawn evenly from each exam's lessons, with a score breakdown by lesson and by mistake.
- **Mistakes.** Every wrong answer sorted by the mistake behind it, plus your accuracy next to past Purdue students' accuracy on the same BoilerExams topic.
- **Saved.** Bookmarks, plus any passages you highlight while reading (select text in a lesson to mark it or have it explained).
- **Formulas.** Every formula card on one page, filtered by exam. Print it, or blur the right side and quiz yourself.
- **Home.** A countdown to the exam, today's study plan, and your weakest lessons.

Search everything with <kbd>Ctrl</kbd> <kbd>K</kbd> or <kbd>/</kbd>. Light and dark mode follow your system, or switch them in the top bar.

## Your data

Everything (progress, bookmarks, notes, settings, and the API key if you add one) is saved in your browser's local storage. Nothing is sent anywhere except to the Claude API when you ask for a written answer. Settings has export and import buttons for moving your progress between devices.

The exam date defaults to Exam 2, Wednesday Nov 18, 2026, 8–9 pm. Change it in Settings.

## Run it locally

Needs Node 20 or newer.

```bash
npm install
npm run dev      # http://localhost:5261
npm test         # 563 tests: math engine, Teach animations, lesson content
npm run build    # static site in dist/
```

Pushing to `main` builds the site and deploys it to GitHub Pages (`.github/workflows/pages.yml`).

## How it's built

Plain JavaScript modules with a hash router, bundled by Vite. 3D uses three.js, math rendering uses KaTeX, and expression parsing uses math.js.

| Folder | What's there |
| --- | --- |
| `src/content/` | Course outline, lessons (`lessons/l01.js` to `l37.js`), study plan, BoilerExams stats |
| `src/views/` | One file per page |
| `src/three/` | The 3D plot engine |
| `src/teach/` | The step-by-step Teach animations and the explanations shown beside the plot |
| `src/lib/` | Expression parsing, search, the practice pool, storage, Claude client |
| `tests/` | Vitest suites |

The tests check the math, not just the code: points the Teach animation draws are checked against the function, tangent slopes against the derivative, and gradient arrows against ∇f. Every problem must have five distinct choices with exactly one marked correct, and every formula has to render. The answer keys were also checked by hand with a computer algebra system.

## Credits

Lecture structure, recordings and notes are from Prof. Sunkula's MA 261 Spring 2026 course page. Topic accuracy numbers come from BoilerExams. This is an unofficial study tool, not affiliated with Purdue.
