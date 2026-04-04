## Implementation Plan: Pomodoro Timer Homepage

### Assumptions
- The timer will be built with vanilla HTML, CSS, and TypeScript — no framework is installed and the PRD does not request one
- The 25-minute countdown displays as `MM:SS` format (e.g., `25:00`)
- "Pause" pauses at the current time; "Start" resumes from where it was paused; "Reset" returns the timer to `25:00` and stops it
- No audio notification or visual alert when the timer reaches `00:00` — the timer simply stops at zero (if desired, this can be added as a follow-up)
- The existing "Hello World" homepage content will be fully replaced by the Pomodoro timer

---

### 1. Tech Stack & Architecture Notes

**Detected stack:**
- Static HTML/CSS/TypeScript served by `serve` (v14) on port 3000
- No frontend framework (no React, Next.js, or Vite)
- TypeScript compiled via SWC (for tests); `src/` is served as static files
- Jest (unit tests in `tests/unit/`), Playwright (E2E tests in `tests/e2e/`)
- Biome for linting/formatting

**Relevant existing patterns:**
- Single-page app structure: `src/index.html` is the entry point, `src/style.css` for styles, `src/index.ts` for logic
- `serve -s src -l 3000` serves the `src/` directory as a static site
- E2E tests navigate to `http://localhost:3000/` and assert on visible content

**Recommendations:**
- Keep the timer logic in a separate TypeScript module (`src/timer.ts`) so it can be unit-tested independently via Jest — the pure logic (countdown math, state transitions) should be importable without a DOM
- Compile `src/timer.ts` to `src/timer.js` so it can be loaded by the HTML page via a `<script>` tag, or inline the compiled JS. Since `serve` serves static files, the simplest approach is to write the browser-facing code in a plain `.js` file (`src/app.js`) that imports from the timer module, keeping `src/timer.ts` as the testable logic layer
- No new dependencies are needed

---

### 2. File & Code Structure

**New files:**
- `src/timer.ts` — pure timer logic (no DOM)
- `src/app.js` — browser script that wires DOM to timer logic

**Modified files:**
- `src/index.html` — replace "Hello World" with Pomodoro timer UI
- `src/style.css` — add styles for timer display and buttons

**Conflicting test files to remove:**
- `tests/e2e/homepage.spec.ts` — asserts "Hello World" text which will no longer exist on the homepage

---

### 3. Tickets

Tickets are workstreams. No two tickets touch the same file. A ticket is workable once
all tickets in its `depends_on` list are complete. Siblings under the same parent run in parallel.

---

#### Ticket 1: Timer Logic Module

> Pure TypeScript module implementing the Pomodoro countdown state machine, testable without a browser.

**Constraints:**
- Must be a pure module with no DOM or browser API references — use dependency injection for the clock (`Date.now` or a callback) so tests can control time
- Export all public functions and types so Jest can import them directly

**Files owned:**
- `src/timer.ts` (create)

**Tasks:**
1. [logic] Create `src/timer.ts` exporting a `PomodoroTimer` class (or equivalent factory) with the following interface:
   - Constructor accepts `durationSeconds: number` (default `1500` for 25 minutes) and an `onTick` callback `(remainingSeconds: number) => void`
   - `start()` — begins or resumes the countdown, calling `onTick` every second with the remaining seconds. If already running, no-op
   - `pause()` — pauses the countdown, preserving the remaining time. If not running, no-op
   - `reset()` — stops the countdown and resets remaining time to the initial `durationSeconds`, calling `onTick` once with the reset value
   - `getRemaining(): number` — returns current remaining seconds
   - `isRunning(): boolean` — returns whether the timer is actively counting down
   - When remaining seconds reaches `0`, the timer stops automatically and calls `onTick(0)`
   - Use `setInterval` / `clearInterval` internally (1-second interval). Accept an optional `intervalFn` parameter for testability (defaults to `setInterval`/`clearInterval`)

---

#### Ticket 2: UI & Styling
**depends_on:** [Ticket 1]

> Replace the Hello World homepage with the Pomodoro timer interface, wiring the DOM to the PomodoroTimer class from Ticket 1.

**Constraints:**
- Use `data-testid` attributes on all interactive and display elements
- The page must remain a single static HTML file served by `serve`
- Follow existing Biome formatting rules (double quotes, trailing commas, semicolons, 2-space indent)
- Imports from Ticket 1 files are read-only — do not modify files owned by Ticket 1

**Files owned:**
- `src/index.html` (modify)
- `src/style.css` (modify)
- `src/app.js` (create)
- `tests/e2e/homepage.spec.ts` (delete)

**Tasks:**
1. [infra] Delete `tests/e2e/homepage.spec.ts` — this E2E test asserts "Hello World" text which will no longer exist after the homepage is replaced by the Pomodoro timer. Verify the file no longer exists on disk and that no other source files import or reference it
2. [ui] Modify `src/index.html` — replace the `<body>` content with the Pomodoro timer layout:
   - Page title: `<h1 data-testid="page-title">Pomodoro Timer</h1>`
   - Timer display: `<div data-testid="timer-display">25:00</div>` — large, centered text showing `MM:SS`
   - Three buttons in a row:
     - `<button data-testid="start-button">Start</button>`
     - `<button data-testid="pause-button">Pause</button>`
     - `<button data-testid="reset-button">Reset</button>`
   - Add a `<script src="app.js"></script>` tag before `</body>`
   - Keep the existing `<link rel="stylesheet" href="style.css" />` in the head
   - Keep the `<title>` as "Pomodoro Timer"
3. [ui] Modify `src/style.css` — add styles for the timer UI:
   - Center the content vertically and horizontally on the page
   - `[data-testid="timer-display"]`: large font size (at least 4rem), monospace font, centered
   - Buttons: visually distinct, at least 44px tall for accessibility, spaced evenly, with hover/active states
   - Responsive: readable on mobile viewports (min-width 320px)
4. [logic] Create `src/app.js` — browser script that:
   - On `DOMContentLoaded`, selects elements by `data-testid` attributes
   - Instantiates `PomodoroTimer` from `src/timer.ts` (Ticket 1) with an `onTick` callback that formats remaining seconds as `MM:SS` using `Math.floor(remaining / 60)` and `remaining % 60`, zero-padded, and updates `[data-testid="timer-display"]` text content
   - **Start button click**: calls `timer.start()`
   - **Pause button click**: calls `timer.pause()`
   - **Reset button click**: calls `timer.reset()`

---

> **Note:** A ticket is workable once all tickets in its `depends_on` list are complete — siblings under the same parent run in parallel. Tasks within each ticket are sequential. No ticket includes test creation — testing is handled separately.
