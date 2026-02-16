# TabTab Go

TabTab Go is a Chrome extension that enables **keyboard-only navigation in Gmail** by replacing continuous pointer movement with **sequential focus transitions**. It is designed for research and evaluation of keyboard-based interaction, and includes optional session/task logging and JSON export.

> Manifest description: “Region-based keyboard navigation for Gmail. Press Tab to navigate by regions, then drill down to specific elements.” fileciteturn4file5L3-L6

---

## Key features

- **Region-based navigation** in Gmail (cycle through interface regions first, then drill down to individual elements). fileciteturn4file5L3-L6
- **Keyboard shortcuts** for forward/backward navigation, activation, and exiting navigation. fileciteturn3file2L25-L66
- **Two modes for experiments**:
  - **Trackpad** (normal interaction; used for baseline logging)
  - **TabTabGo** (keyboard navigation enabled) fileciteturn4file0L2-L6
- **Session UI (popup)** to start a session, see elapsed time, and mark tasks as complete/skip. fileciteturn3file1L15-L43
- **Permissions used**: `storage`, `downloads`, `tabs` (needed for state + exporting JSON + tab messaging). fileciteturn4file5L11-L19

---

## Keyboard controls

These shortcuts are also shown inside the extension popup (“How to” → Keyboard Shortcuts). fileciteturn3file2L17-L69

### Navigation
- **Move forward:** `Tab` **or** `D` fileciteturn3file2L25-L34  
- **Move backward:** `Shift + Tab` **or** `S` fileciteturn3file2L35-L44  

### Actions
- **Activate / Select:** `Enter` **or** `Space` **or** `W` fileciteturn3file2L47-L58  
- **Close navigation:** `Esc` **or** `A` fileciteturn3file2L59-L66  

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
```

Then re-load (or refresh) the unpacked extension in `chrome://extensions/`.

---

## Using the session UI (for experiments)

1. Click the TabTab Go extension icon to open the popup.
2. Enter:
   - **Participant ID**
   - **Session ID**
   - **Mode**: Trackpad or TabTabGo fileciteturn1file2L33-L56
3. Click **Start Session**. fileciteturn1file2L53-L56
4. During the session you can:
   - See **elapsed time**, **mode**, and **interaction count** fileciteturn3file1L17-L26
   - Mark the current task as **Complete** or **Skip** fileciteturn3file1L30-L41

When a session ends, the extension exports a JSON file via the browser download flow.

---

## Project structure (high level)

- `manifest.json` – extension metadata, permissions, and entry points. fileciteturn4file5L1-L31
- `background.js` – service worker that coordinates sessions/tasks and messaging.
- `content.js` – injected into pages; handles keyboard navigation in Gmail.
- `UI/popup.html` + `popup.js` – the popup UI for session setup and controls. fileciteturn1file2L33-L56

---

## Citation

The popup includes a suggested citation format: fileciteturn3file2L27-L30

> Guirao C., Berengueres J. & Kuanysheva B. (2026). TabTab Go (v1.2.0) [Computer software]. Nazarbayev University.

---

## Troubleshooting

- **Tab doesn’t do anything:** make sure the session **Mode** is set to **TabTabGo**, not Trackpad. fileciteturn4file0L2-L6  
- **Tab is still typing / moving focus normally:** you are probably focused inside a text input (search box, compose fields, etc.). Click outside the input and try again.
- **Changes not appearing:** run `npm run build`, then refresh/reload the extension and restart the browser.
