# Active Project — READ FIRST

Before designing or building ANY component, read **`REBUILD_PLAN.md`** (repo root). It defines the active full-redesign project: the Nexvyn design language ("fluid precision, editorial restraint" — one signature motion moment per component, accent only on focus/selection/signature), the merged component inventory and batch order, the source-library paths (inspiration only, never import from them), and the brief → build → review workflow. Site/docs fixes are tracked separately in **`SITE_HARDENING_PLAN.md`**. Rules in those files build ON TOP of everything below — this file remains the authority on how components are built and shipped.

# Role

You are an expert React UI library engineer. Your objective is to build production-ready, highly accessible, and fully typed UI components. You adhere strictly to the hybrid architecture pattern: combining headless logic (Radix UI / Base UI patterns) with composable, token-driven styling (shadcn/ui pattern).

# Core Architecture & File Organization

- **Colocation**: Group all component files (logic, styling, tests, stories) into a single directory named after the component (e.g., `src/components/Dialog/`).
- **Separation of Concerns**: Decouple behavior from styling. Use headless hooks or unstyled primitives for state/focus management. Pass state to styled presentation components.
- **Barrel Exports**: Use `index.ts` files in component folders to export public APIs. Hide internal sub-components.
- **Naming Conventions**: Components are PascalCase (`DatePicker.tsx`). Hooks are camelCase starting with `use` (`useToggle.ts`). Props interfaces are prefixed with the component name (`ButtonProps`). Event handlers use `on[Event]` (e.g., `onValueChange`).
- **Tree-Shaking**: Ensure `package.json` has `"sideEffects": false`. Use ESM exports and allow deep imports.

# API Design & Developer Experience

- **Composition (`asChild` pattern)**: Implement the `Slot` pattern (like Radix) instead of polymorphic `as` props. This prevents nested interactive elements (e.g., button inside a button) and preserves TypeScript inference and ref forwarding.
- **State Management**: Components MUST support both controlled (`value` / `onValueChange`) and uncontrolled (`defaultValue`) states. Use a `useControlledState` hook internally.
- **Type-Safe Variants**: Use `class-variance-authority` (CVA) for visual variants. Do not use boolean props (`isLarge`); use enum variants (`size="lg"`). Export CVA types using `VariantProps<typeof componentVariants>`.
- **Refs**: Always forward refs using `React.forwardRef` for all interactive or structural components.
- **Extensibility**: Always accept a `className` prop. Use a `cn()` utility (clsx + tailwind-merge) to merge external classes with internal classes, allowing external classes to override internal ones.
- **Error Handling**: Provide meaningful `console.warn` (in dev mode only) for missing required props or conflicting variants.

# Accessibility (a11y) & Core Behaviors

- **WCAG & Semantic HTML**: Never use `<div onClick>`. Use proper semantic tags (`<button>`, `<nav>`, `<ul>`). Hide visual-only content with an `.sr-only` utility class.
- **Focus Management**: When unmounting overlays (modals, dropdowns), restore focus to the trigger element. Use `FocusScope` or equivalent to trap focus inside modals.
- **Roving Focus**: For composite widgets (Tabs, RadioGroups, Menus), implement roving focus. The container has `tabIndex={-1}`; the active item has `tabIndex={0}`. Arrow keys navigate, not Tab.
- **Screen Readers**: Attach `aria-hidden="true"` to decorative icons. Provide `aria-label` for icon-only buttons.

# Styling, Theming, and Consistency

- **Semantic Design Tokens**: NEVER hardcode hex colors (e.g., `#3b82f6`) or raw spacing in components. Use CSS variables mapped to semantic aliases (e.g., `bg-primary`, `text-foreground`).
- **Restricted Palette**: The only colors allowed anywhere in a component are black, white, gray (via the neutral tokens — `--foreground`, `--background`, `--muted`, `--card`, `--border`, etc.) and the single accent color (`--color-accent` / `--accent`). Never introduce a new hue (no blues, greens, reds, etc.) unless it's a semantic state color already defined as a token (e.g. `--destructive`). Always reference these through their CSS variable (`var(--color-accent)`, `bg-muted`, etc.) — never write a literal hex/rgb/oklch value inline, even one that matches an existing token's current value, since tokens can be retuned per-theme and a literal won't follow.
- **Dark Mode**: Support dark mode via CSS variables scoped to a `.dark` parent class. Do not write component-level dark mode conditionals.
- **Typography**: Use semantic typography tokens (e.g., `text-foreground`, `font-heading`, `text-sm`). Do not use raw font sizes or families directly in components.
- **Responsive Behavior**: Always write mobile-first CSS. Use breakpoint modifiers (e.g., `md:`, `lg:`) to scale up. Components must be fluid and tested on mobile widths.
- **Internationalization (RTL)**: ALWAYS use CSS logical properties for layout. Use `ms-` (margin-inline-start) instead of `ml-`, and `start-0` instead of `left-0`.
- **Spacing & Sizing**: Adhere strictly to a 4px/8px grid system via design tokens.
- **Squircle Corners**: When a squircle corner treatment is wanted, add the `squircle-corners` utility class (defined in `app/globals.css`) alongside whatever `rounded-*` class controls the radius. Never write `style={{ cornerShape: 'squircle' } as CSSProperties}` inline — that duplicates the same object across files and forces an unnecessary `CSSProperties` cast/import. Reserve the separate `.squircle` class (full pill + squircle corners) for elements that are meant to be fully round.
- **Icons**: Accept icons as React nodes (children or props) rather than hardcoding SVG paths, ensuring consumers can swap icon libraries.

# Complex Patterns (Overlays & Portals)

- **Portals**: Always render overlays (Modals, Tooltips, Popovers, Dropdowns) via `createPortal` to `document.body`. This avoids `z-index` wars and `overflow: hidden` clipping.
- **Scroll Locking**: Modal overlays lock body scroll while open and restore it — together with focus — on close. Non-modal overlays (tooltips, hover cards) never lock scroll.
- **Virtualization**: For dropdowns or selects with >100 items, integrate virtualization (e.g., `@tanstack/react-virtual`) to prevent DOM node bloating.
- **Mobile & Touch**: Ensure interactive elements have a minimum touch target of 44x44 pixels. Handle `onTouchStart` / `onClick` dual-firing properly to avoid double-triggering. Implement swipe gestures for mobile-first overlays (Drawers, Carousels).

# Performance, Motion, & SSR

- **SSR Safety**: Never access `window` or `document` during the render phase. Gate browser-only logic inside `useEffect`. Use `React.useId()` for stable SSR IDs to prevent hydration mismatches.
- **Render Optimization**: Wrap highly static sub-components in `React.memo`. Use `useCallback` for event handlers passed to deeply nested children to prevent unnecessary re-renders.
- **Lazy Loading**: For heavy components (e.g., RichTextEditor, DatePicker with calendar logic), use `React.lazy` and dynamic imports.
- **Hardware-Accelerated Motion**: Only animate `transform` and `opacity`. Never animate `width`, `height`, `top`, or `left`.
- **Reduced Motion**: Always respect `@media (prefers-reduced-motion: reduce)` by disabling transitions and animations.
- **Bundle Size**: Avoid heavy dependencies. Prefer micro-utilities. Ensure components are tree-shakeable.

# Motion & Animation Craft

- **Easing by context**: `ease-out` for anything entering/exiting the screen; `ease-in-out` for elements already on screen that move or morph; plain `ease` for hover color/opacity changes; `linear` only for genuinely constant motion (marquees, time-progress). Never `ease-in` for UI — it reads as sluggish.
- **Use the motion tokens** defined in `app/globals.css` (`--motion-dur-instant/fast/base/slow/showcase/ambient`, `--motion-ease-out`, `--motion-ease-in-out`) via `duration-(--motion-dur-base)` / `ease-(--motion-ease-out)`. Don't invent one-off durations inline.
- **Durations**: UI animations under 300ms; hovers 100–150ms; exits shorter than entrances. Anything used dozens of times a day (keyboard-driven changes, frequent hovers) is better with no animation at all.
- **Never `transition-all`** — list properties explicitly (`transition-colors`, `transition-[opacity,transform]`). `transition-all` silently animates properties you change later and makes the declared intent unreadable.
- **Only animate `transform` / `opacity` / `clip-path` / `filter`.** Never animate `top`/`left`/`width`/`height` — if a position depends on layout math, move it with `transform: translateY(calc(...))` instead of animating `top`.
- **No `scale(0)` entrances** — enter from 0.9–0.97 with an opacity fade; press feedback is `scale(0.97)`.
- **State swaps morph, never cut**: keep both layers mounted and crossfade (opacity + a slight counter-scale); a subtle ~2px blur bridge makes two states read as one object transforming. Unmounting the old layer at swap time causes a blank-gap flash whenever timing slips.
- **Reduced motion, both layers of it**: every transition pairs with `motion-reduce:transition-none` (plus `motion-reduce:transform-none` / `filter-none` when animating those), and JS-driven motion branches on `useReducedMotion()` from `motion/react`.

# Lifecycle & Memory Safety

- **Every timer is cleared on unmount** — including timers scheduled _inside another timer's callback_. The classic leak here: a recursive "schedule blink" loop whose outer handle is cleared but whose nested `setTimeout(() => setState(false), 150)` fires after unmount. Track every handle.
- **Every `addEventListener` has a matching `removeEventListener`** in the effect cleanup; every `requestAnimationFrame` loop has `cancelAnimationFrame` plus a cancelled flag so the loop stops recursing.
- **Imperative class widgets** (canvas/WebGL renderers, standalone pickers) must clear pending `setTimeout`s and listeners inside `destroy()` _before_ tearing down DOM/renderer references — a timer firing post-destroy touches dead objects.
- **Release everything else on unmount**: `AudioContext.close()`, `MutationObserver`/`ResizeObserver`/`IntersectionObserver.disconnect()`, media pause, pointer-capture release.

# Repo-Specific Pitfalls (Learned the Hard Way)

- **`asChild`/Slot class merging**: `Button asChild` concatenates the Button's classes with the child `Link`'s — if both set the same property (`inline-flex` vs `flex`), the winner depends on Tailwind's stylesheet order, not your JSX order. Never set the same CSS property from both sides; when layout correctness matters (e.g. centering button content), set it once — an inline `style` on the child wins deterministically.
- **Tailwind v4 variable syntax**: use the paren form `bg-(--color-fg)`, `text-(--color-muted)`, `duration-(--motion-dur-fast)` — never `bg-[var(--color-fg)]`. Prefer canonical utilities (`backface-hidden`, `z-1`) over arbitrary-value spellings.
- **Custom pointer widgets** (`div[role="slider"]` etc.): call `e.preventDefault()` in `onPointerDown` so mouse clicks don't move focus and flash the `focus-visible` ring; keyboard Tab focus is unaffected. Browsers only apply their "no ring on click" heuristic to native controls.
- **Previews never guess asset URLs**: a card preview is a blueprint (wireframe → live reveal) or a registered live preview. If neither exists for a component, render nothing — do not fall back to speculative `/thumbnails/${id}.png` paths that 404 into broken-media icons.
- **Text over dynamic surfaces**: a label colored for contrast against a bar/fill must switch color when a compact/overflow state repositions it onto the page background. Verify contrast in the state it actually renders.
- **Verify in BOTH themes**: every color decision gets checked in light and dark mode before shipping. Tokens differ per theme; a value that looks right in one theme routinely vanishes in the other.
- **Never read the theme during render**: the `.dark` class is applied pre-hydration by the `beforeInteractive` script in `app/layout.tsx`. Components that need the current theme subscribe to it (`useSyncExternalStore` + a MutationObserver on `documentElement`, as `theme-toggle.tsx` does). Reading `document.documentElement.classList` in the render phase breaks SSR and causes hydration mismatches.

# Forms, Testing, and Documentation

- **Native Form Integration**: Custom selects/inputs MUST expose a hidden native `<input>` or properly forward refs so libraries like `react-hook-form` can register them.
- **Validation Support**: Inputs must accept `aria-invalid` and `aria-describedby` to link error messages. If `aria-invalid` is true, apply visual error states (e.g., `border-destructive`).
- **Behavioral Testing**: Write tests using `@testing-library/react` and `jest-axe`. Test user behavior (clicks, keyboard nav), NOT implementation details (state variables).
- **Visual Regression**: Include Storybook stories covering all variants, sizes, and states (hover, disabled, focused, error).
- **Documentation**: Every component MUST have MDX/Storybook documentation containing: a live usage example, an auto-generated Props table, and accessibility guidelines.

# Code Quality & Maintainability

- **TypeScript**: No `any` types allowed. Use strict typing for all props, refs, and event handlers. Ensure autocomplete works flawlessly in VSCode.
- **Browser Compatibility**: Target modern evergreen browsers (Chrome, Firefox, Safari, Edge). Use standard DOM APIs.

# Shipping a New Component in This Repo

The sections above describe how a component should be _built_. Building it is not enough to make it appear anywhere — this repo wires each component through 10 separate files. Verified against existing shipped components (`ratio-slider`, `password-input`, `table-of-contents`, `goo-dropdown`); follow this order:

1. **`components/ui/<name>.tsx`** — the component itself (single file, not a folder in this repo). Export the component, its `<Name>Props` interface, and by convention a `<Name>Preview` function at the bottom for fallback preview use.
2. **`components/ui/previews/<name>-preview.tsx`** — standalone client preview wrapper (imports the component, centers it in a `div`), re-exported from **`components/ui/previews/index.ts`**. Used by the detail page.
3. **`components/ui/Doc/<name>-metadata.ts`** — a `ComponentItem` object: `id`, `name`, `collection`, `previewType`, `description`, `registry`, `dependencies`, `interaction`, `props[]`, `usage` (code string shown in docs).
4. **`lib/components-registry.ts`** — import the metadata object and add it to the central registry array. This is the single source of truth every other file below reads from.
5. **`components/blueprints/<name>-blueprint.tsx`** — wireframe/skeleton version for the blueprint gallery, registered by key in **`components/blueprints/preview-map.tsx`**.
6. **`components/blueprints/blueprint-reveal.tsx`** — add a `dynamic()` import of the real component plus a `LIVE` map entry keyed `'<name>-blueprint'` so the blueprint reveals into the live component on hover/focus.
7. **`components/showcase/component-preview.tsx`** — add to `LIVE_PREVIEW_IDS`, add a `dynamic()` import, add a `case '<name>':` in the `LivePreview` switch (grid/showcase card rendering).
8. **`app/components/[component]/page.tsx`** — add a `case '<name>':` rendering `<DemoFrame><NamePreview /></DemoFrame>` (the component detail page).
9. **`app/api/source/route.ts`** — add `'<name>': ['components', 'ui', '<name>.tsx']` to `SOURCE_MAP` (powers "view source").
10. **`registry.json`** (root, hand-maintained) — add an item entry (`name`, `type`, `title`, `description`, `dependencies`, `files[].path`). Run `npm run build:registry` (also a `prebuild` hook) to auto-generate **`public/r/<name>.json`** and update **`public/r/registry.json`** — do not hand-write these two.

Optional, not required:

- **`app/sitemap.ts`** — add a `/components/<name>` entry (SEO only).
- **`lib/component-media.ts`** — thumbnail/video path override; most shipped components don't have one (falls back to `/thumbnails/<id>.png` / `/videos/<id>.mp4`, which render as an empty box if the files don't exist — see `MediaPreview` in `component-preview.tsx`).

**Reality check on the Forms/Testing/Documentation section above:** this repo has zero test files, zero Storybook stories, and zero MDX docs (`*.test.*`, `*.stories.*`, `*.mdx` all absent outside `node_modules`). That guidance is aspirational, not current practice — don't assume test/story files exist for a component just because AGENTS.md says they should. Ship-readiness here is enforced entirely through the registry/metadata/preview wiring above.

# Definition of Done (Before Any Component Ships)

Run, in order — all must pass:

1. `npm run format` (Prettier) and `npm run lint` (ESLint) — clean.
2. `npm run build` — the `prebuild` hook regenerates `public/r/*.json` from `registry.json`; never hand-edit those generated outputs.
3. Manual pass in the dev server: light **and** dark theme, a keyboard-only walkthrough (Tab / Shift+Tab / arrows / Escape), `prefers-reduced-motion` enabled, a ~375px viewport, and hover behavior under touch emulation.

Last-mile details that separate "works" from production:

- User-facing strings (labels, placeholders, `aria-label`s) are props with sensible defaults — never hardcoded deep in markup where consumers can't localize them.
- External links always carry `target="_blank" rel="noopener noreferrer"`; never use `dangerouslySetInnerHTML` with dynamic content.
- Update `CHANGELOG.md` when a component ships or its public API changes.

# PR / Code Review Checklist (Self-Review Before Outputting Code)

1. [ ] Does it use semantic HTML and correct ARIA attributes?
2. [ ] Is focus managed correctly (trapped in modals, restored on close)?
3. [ ] Are keyboard interactions implemented (Enter, Space, Arrows, Escape)?
4. [ ] Does it support both controlled and uncontrolled state?
5. [ ] Are styles using semantic CSS variables (no hardcoded values)?
6. [ ] Are layouts using RTL-safe logical properties (`ms-`, `ps-`, `start-`)?
7. [ ] Is it SSR safe (no window/document in render phase)?
8. [ ] Are variants strictly typed using CVA?
9. [ ] Does it use `asChild` / `Slot` instead of polymorphic `as`?
10. [ ] Are all refs properly forwarded?
11. [ ] Is `className` merged properly using the `cn()` utility?
12. [ ] Are forms supporting validation states (`aria-invalid`, `aria-describedby`)?
13. [ ] Is it wrapped in `React.memo` if appropriate to prevent re-renders?
14. [ ] Are touch targets at least 44x44px?
15. [ ] No `transition-all` — explicit properties, tokenized durations/easings?
16. [ ] Correct easing per context (ease-out enter/exit, ease-in-out on-screen morph, ease for hovers)?
17. [ ] Every timer/listener/rAF — including nested timers — cleaned up on unmount/destroy?
18. [ ] Reduced motion handled in both CSS (`motion-reduce:`) and JS (`useReducedMotion`)?
19. [ ] Checked in both light AND dark themes?
20. [ ] Colors restricted to neutral tokens + accent, referenced via CSS variables (paren syntax `bg-(--token)`)?
21. [ ] No CSS property set from both sides of an `asChild`/Slot merge?
22. [ ] Focus ring appears only for keyboard focus (pointerdown `preventDefault()` on custom widgets)?
23. [ ] All 10 registry/preview wiring files updated (see "Shipping a New Component in This Repo")?
