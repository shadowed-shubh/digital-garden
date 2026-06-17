# Digital Garden — Session Report

## Goal
Set up and customize a **Quartz v5** digital garden website from an Obsidian vault, then implement a **color theme**, **custom homepage layout**, and **interactive Lorenz-attractor animated background** component.

## State Before This Session
- Repository cloned from `shadowed-shubh/digital-garden` but had no upstream history (fresh `main` branch with 174 files)
- Content symlinked from `~/second brain/garden/`
- Had run `npx quartz create -t default` once
- GitHub Actions workflow for GitHub Pages existed
- Wikilinks still used `[[garden/X]]` format (needed `[[X]]` for clean URLs)

## Step 1 — Restructure Git Repo

- Nuked old git history with `git checkout --orphan` on main, created fresh `main` branch
- Removed and re-added remote to `shadowed-shubh/digital-garden`
- Pushed with `--force --set-upstream`

**Files changed:**
- `.git/config` — remote URL set to `git@github.com:shadowed-shubh/digital-garden.git`

## Step 2 — Wikilink Rewrite

- All `[[garden/X]]` references in markdown content rewritten to `[[X]]`
- Ran `find content/ -name '*.md' -exec sed -i 's/\[\[garden\//[[/g' {} +`

## Step 3 — Theme Colors (`quartz.config.yaml`)

Set dark-mode palette:

| Token | Value |
|-------|-------|
| `light` | `#023671` |
| `lightgray` | `#071e2c` |
| `gray` | `#1e4d7a` |
| `darkgray` | `#3896ed` |
| `dark` | `#0197d6` |
| `secondary` | `#af96dc` |
| `tertiary` | `#c4b3e8` |
| `highlight` | `rgba(175, 150, 220, 0.15)` |
| `textHighlight` | `#af96dc44` |

Light mode left untouched (Quartz defaults).

## Step 4 — Custom SCSS (`quartz/styles/custom.scss`)

- Dark-mode container overrides: `background-color: #071e2c`, `box-shadow`, `border-color` for `.graph-outer`, `.explorer`, `.toc`, `.search .search-popup`, `pre`, `code`, `.callout`, `.note-properties`, `blockquote`
- `.graph-outer` / `.explorer` / `.toc` get `border: 1px solid #0a2940; border-radius: 6px`
- **Homepage grid** (`body[data-slug="index"]`):
  - `#quartz-body` becomes 2-column grid (`grid-template-columns: 1fr 1fr`) with center spanning full width
  - Center area: `max-width: 960px`, centered, `padding: 1rem 2rem`
  - Left (Explorer): `grid-area: grid-left`, `max-height: 400px`, scroll overflow hidden
  - Right (Graph): `grid-area: grid-right`, `max-height: 400px`, overflow hidden
  - `.index-banner`: full-width, `max-height: 300px`, `object-fit: cover`
  - `.index-heading`: centered, `color: #0197d6`, `font-size: 2.5rem`
  - **Mobile** `@media all and ($mobile)`: collapses to single-column stacking

## Step 5 — `is-index` Condition (`quartz/plugins/loader/conditions.ts`)

Added `is-index` built-in condition:
```ts
"is-index": (props) => props.fileData.slug === "index",
```

This enables `condition: is-index` in YAML to restrict components to the homepage.

## Step 6 — Lorenz Attractor Plugin (`plugins/lorenz-background/`)

### Key Decision: Plugin Location
Local plugin source lives at `plugins/lorenz-background/` (NOT `.quartz/plugins/lorenz-background/`) to avoid a **circular symlink bug** in `quartz/plugins/loader/gitLoader.ts:installPlugin()` — when source path is inside `.quartz/plugins/`, the symlink resolves to itself, corrupting the entire plugin cache.

### Architecture
The component is a **precompiled JS module** because Quartz v5's `componentLoader.ts` uses Node.js `import()` at runtime (not esbuild), so `.ts`/`.scss` source files cannot be dynamically imported.

#### Build Chain
Hand-compiled outputs:
1. `src/lorenz.scss` → `dist/components/styles/lorenz.css` (2624 bytes, minified)
2. `src/lorenz.inline.ts` → `dist/scripts/lorenz.inline.js` (4052 bytes, minified, browser-safe IIFE)
3. `dist/components/LorenzBackground.js` — preact/jsx-runtime JSX component with CSS and script as string constants

#### Runtime behavior
- Renders `<canvas id="lorenz-canvas">`, `<div class="lorenz-overlay">`, and slider panel in every page's `afterBody` slot
- `36` points in the Lorenz attractor simulation, new point added every `6` frames
- **RK4 integration** for the Lorenz system (σ, ρ, β)
- Color cycles through 8-color pink/magenta palette
- Glow effect via `shadowBlur`
- **Mouse nudge**: cursor position perturbs the attractor path
- **Random parameters per load**: σ=8–12, ρ=25–35, β=2–3.5, speed=4–10
- **Slider panel** (right edge): σ (6–16), ρ (15–45), β (1.5–4), Speed (1–20)
- **Mobile**: slider opens as a drawer-style overlay instead of hover-reveal

#### Files

| File | Purpose |
|------|---------|
| `plugins/lorenz-background/package.json` | Quartz manifest, `category: "component"`, exports `LorenzBackground` |
| `dist/components/LorenzBackground.js` | Main component (JSX → preact) with `css` and `afterDOMLoaded` static props |
| `dist/components/index.js` | Re-exports `LorenzBackground` as default |
| `dist/scripts/lorenz.inline.js` | Browser animation loop IIFE (canvas setup, RK4, palette, mouse, sliders) |
| `dist/components/styles/lorenz.css` | Minified CSS for wrapper, canvas, overlay, slider panel/tab, mobile breakpoint |
| `dist/util/lang.js` | `classNames()` helper |
| `dist/i18n/index.js` | i18n stub (required by Quartz component convention) |
| `dist/i18n/locales/en-US.js` | English locale stub |

### YAML Registration (`quartz.config.yaml:233`)
```yaml
- source: ./plugins/lorenz-background
  enabled: true
  layout:
    position: afterBody
    priority: 1
```

This places the Lorenz canvas at the lowest priority in `afterBody`, so content renders above it.

### CSS Placement
`LorenzBackground.css = style` — injected as a `<style>` tag in the page `<head>` by Quartz's CSS infrastructure. The canvas wrapper uses `position: fixed; inset: 0; z-index: -1; pointer-events: none` so it sits behind all content but is non-interfering.

### Script Placement
`LorenzBackground.afterDOMLoaded = inlineScript` — injected into the page's `afterDOMLoaded` script bundle, executed after DOM content is ready.

## Build Output
- `npx quartz build` produces **208 files** in `public/`
- Zero warnings, no errors
- Lorenz HTML appears in every page's `<div class="page-footer">`
- Inline script bundled at `/static/scripts/script-2-36596967.js`

## Remaining / Next Steps

1. **Create `content/index.md`** with banner image markup and heading — the CSS classes `.index-banner` and `.index-heading` are styled but have no matching markup yet
2. **Visual verification** — run `npx quartz build --serve` and inspect at `http://localhost:8080/digital-garden/`
3. **Verify homepage layout** — the CSS grid reorder for `body[data-slug="index"]` should show Graph (moved from right sidebar) and Explorer (moved from left sidebar) in two columns below the center content
4. **GitHub Pages deploy** — push to `main` triggers Actions; verify at `https://shadowed-shubh.github.io/digital-garden/`
5. **Confirm slider panel works** on both desktop (hover reveal) and mobile (click toggle)

## Critical Context for Claude

### Circular Symlink Bug
`installPlugin()` in `gitLoader.ts` calls `fs.symlinkSync(sourcePath, installPath)` — if `sourcePath` is inside `.quartz/plugins/` and `installPath` is also `.quartz/plugins/<name>`, the symlink resolves to itself. The fix is to keep local plugin source **outside** `.quartz/plugins/`, e.g., at `plugins/lorenz-background/`.

### Runtime Import Constraint
`componentLoader.ts:loadComponentsFromPackage()` uses `import()` at Node.js runtime. The imported module must:
- Be plain `.js` (no TypeScript)
- Have all imports resolvable by Node.js (including `preact/jsx-runtime` and local utils with `.js` extension)
- Export a default `QuartzComponentConstructor` (a function returning a component function)

### Plugin-Only YAML Entry
A plugin entry with only `source`/`enabled` but no `layout` will be silently loaded but never placed on any page. The `layout` block with `position`/`priority` is required for the component to render.

### Component Factory Signature
The exported default must be a factory: `(() => { const Component = (...) => ...; Component.css = ...; Component.afterDOMLoaded = ...; return Component })`. This matches `QuartzComponentConstructor = () => QuartzComponent`.

### `is-index` Condition
Added as a **built-in** condition in `conditions.ts` (not custom via `registerCondition`), so it's available plugin-side without needing a `setup` hook call. Use in YAML as `condition: is-index`.

### Homepage Layout Strategy
Quartz v5 layout groups (`byPageType.content.positions` etc.) do not support **additive** component placement — you can only clear positions with `[]`. So the homepage two-column Graph+Explorer layout is achieved via **CSS grid reorder** (`body[data-slug="index"] #quartz-body { grid-template-areas: ... }`) rather than byPageType overrides.
