# TabTab Go

TabTab Go is a Chrome extension that enables **keyboard-only navigation in Gmail** by replacing continuous pointer movement with **sequential focus transitions**. It is designed for research and evaluation of keyboard-based interaction, and includes optional session/task logging and JSON export.


---

## Key features

- **Region-based navigation** in Gmail (cycle through interface regions first, then drill down to individual elements)
- **Keyboard shortcuts** for forward/backward navigation, activation, and exiting navigation.
- **Two modes for experiments**:
    - **Trackpad** (normal interaction; used for baseline logging)
    - **TabTabGo** (keyboard navigation enabled)
- **Session UI (popup)** to start a session, see elapsed time, and mark tasks as complete/skip.
- **Permissions used**: `storage`, `downloads`, `tabs` (needed for state + exporting JSON + tab messaging).

---

## Keyboard controls

These shortcuts are also shown inside the extension popup (“How to” → Keyboard Shortcuts).

### Navigation
- **Move forward:** `Tab` **or** `D`
- **Move backward:** `Shift + Tab` **or** `S`

### Actions
- **Activate / Select:** `Enter` **or** `Space` **or** `W`
- **Close navigation:** `Esc` **or** `A`

> Tip: TabTab Go intentionally **does not intercept Tab inside text inputs** (e.g., when typing in Gmail search, composing, etc.).

---

## Installation (load unpacked)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right)
3. Click **Load unpacked** → select the **`dist/`** folder
4. Close and restart the browser
5. Open Gmail and use **Tab** / **Enter** to navigate and select items (see shortcuts above)

---

## Build / rebuild (when code changes)

If you modify any source files, rebuild the extension so the latest version is placed into `dist/`:

```bash
npm install
npm run build
