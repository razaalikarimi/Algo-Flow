# AlgoFlow ⚡

A browser-based tool for visualizing data structures and algorithms in real time. Built this because I was tired of reading algorithm explanations that made zero sense without seeing what's actually happening step by step.

Still a work in progress but the core stuff works — you write (or pick) code, hit play, and watch it animate.

---

## What it does

- **Monaco editor** (same one VS Code uses) for writing code
- Pick from JavaScript or Python
- Step through algorithms one frame at a time or let it play automatically
- Speed control so you can slow it down when things get confusing
- Variable watch panel on the right so you can see exactly what's changing
- Sidebar with a bunch of built-in algorithms to load instantly

## Algorithms included so far

**Sorting**
- Bubble Sort
- Selection Sort  
- Insertion Sort
- Merge Sort
- Quick Sort

**Searching**
- Binary Search

**Dynamic Programming**
- Fibonacci (memoized)

**Graph**
- BFS
- DFS

**Data Structures**
- Stack

More coming. Planning to add Dijkstra, Linked List, BST insert/delete, and maybe a heap visualizer.

---

## Tech stack

- React 19 + TypeScript
- Vite (build tool)
- Monaco Editor (via CDN loader)
- Framer Motion (page animations)
- Lucide React (icons)
- Vanilla CSS — no Tailwind, no component library, everything custom

---

## Running locally

```bash
git clone https://github.com/razaalikarimi/Algo-Flow.git
cd Algo-Flow
npm install
npm run dev
```

Opens at `http://localhost:5173`

---

## Project structure

```
src/
├── components/
│   ├── Navbar.tsx          # top nav
│   ├── LandingPage.tsx     # home/hero section
│   ├── EditorPage.tsx      # main editor layout (sidebar + editor + vis)
│   ├── MonacoEditor.tsx    # monaco wrapper with custom dark theme
│   ├── BarsVis.tsx         # bar chart vis for sorting
│   ├── ArrayVis.tsx        # array element vis (binary search etc)
│   └── ExamplesModal.tsx   # modal to browse/load examples
├── data/
│   └── algorithms.ts       # all algorithm definitions + code snippets
├── engine/
│   └── visualizer.ts       # frame generator — turns algorithm into steps
├── App.tsx
└── index.css               # all styles, no external CSS framework
```

---

## How the visualization works

The `engine/visualizer.ts` file runs the algorithm ahead of time and records every meaningful state change as a "frame" — what the array looks like, which indices are being compared, which are being swapped, which are done, and what the current variables are.

Then the player just steps through those frames. Simple approach but it works well and makes it easy to add new algorithms.

---

## Known issues / TODO

- Monaco loads from CDN so first load is slow if your internet is bad
- Graph algorithms (BFS/DFS) currently show array view, need a proper graph canvas
- Mobile layout is rough, designed primarily for desktop
- No backend — everything runs in the browser, so Python code is displayed but not actually executed
- Want to eventually add actual code execution via a sandboxed API

---

## Contributing

If you want to add an algorithm, the easiest way is to:

1. Add the definition in `src/data/algorithms.ts` (name, code, steps, complexity)
2. Add a frame generator in `src/engine/visualizer.ts`
3. Wire it up in the `generateFrames` switch statement

That's basically it. The UI picks it up automatically.

---

Built by [@razaalikarimi](https://github.com/razaalikarimi)
