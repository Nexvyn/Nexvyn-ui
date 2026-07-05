# Contributing to Nexvyn/UI

Thanks for your interest in contributing. This guide covers everything you need to add a new component to the library.

---

## Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

---

## Step-by-Step Guide

### 1. Create the component file

Add your component in `components/ui/`:

```
components/ui/my-component.tsx
```

### 2. Add metadata

Create a metadata file in `components/ui/Doc/`:

```
components/ui/Doc/my-component-metadata.ts
```

Export a `ComponentItem` object with id, name, collection, description, props, usage, and optional credits.

### 3. Add a preview (optional)

If your component needs a live demo preview, add it in `components/ui/previews/`:

```
components/ui/previews/my-component-preview.tsx
```

Export it from `components/ui/previews/index.ts`.

### 4. Register the component

Import and add your metadata to `lib/components-registry.ts`:

```ts
import { myComponentMetadata } from '@/components/ui/Doc/my-component-metadata'

export const COMPONENTS: ComponentItem[] = [myComponentMetadata]
```

### 5. Add a demo

Add a demo case in `app/components/[component]/page.tsx` inside the `ComponentDemo` switch statement.

### 6. Add to the registry

Add an entry to `registry.json` for shadcn CLI installation:

```json
{
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "...",
  "dependencies": ["motion"],
  "files": [
    {
      "path": "components/ui/my-component.tsx",
      "type": "registry:ui"
    }
  ]
}
```

Then run `npm run build:registry` to generate the `public/r/my-component.json` file automatically.

### 7. Add to source map

Add to `app/api/source/route.ts` in the `SOURCE_MAP` object so the code drawer can serve the source:

```ts
const SOURCE_MAP: Record<string, string[]> = {
  'my-component': ['components', 'ui', 'my-component.tsx'],
}
```

### 8. Set collection category

Set the `collection` field in metadata to one of: `'navigation'`, `'inputs'`, `'effects'`, `'preloaders'`, `'scroll'`. Empty categories are automatically hidden from the sidebar.

### 9. Test locally

Run `npm run dev` and navigate to `/components/my-component` to verify it works.

### 10. Format and lint

```bash
npm run format       # Format code with Prettier
npm run lint         # Run ESLint
npm run build        # Verify production build
```

---

## Code Standards

- Use TypeScript exclusively
- Use `motion/react` for animations (not `framer-motion`)
- Use `cn()` from `@/lib/utils` for class merging
- Use design tokens (`var(--color-*)`) instead of hardcoded colors
- No comments in component files
- Add `"use client"` directive for client components
- Run `npm run format` before committing
- Respect `prefers-reduced-motion` for accessibility

---

## Component Architecture

### API Design

- **Controlled + Uncontrolled**: Every component must support both `value`/`onValueChange` (controlled) and `defaultValue` (uncontrolled) patterns.
- **`asChild` Pattern**: Use the Slot pattern (like Radix) instead of polymorphic `as` props. This prevents nested interactive elements and preserves TypeScript inference.
- **Forward Refs**: Always use `React.forwardRef` for all interactive or structural components.
- **Type-Safe Variants**: Use `class-variance-authority` (CVA) for visual variants. Use enum variants (`size="lg"`) over boolean props (`isLarge`).
- **Extensibility**: Always accept a `className` prop. Use `cn()` to merge external classes with internal ones, allowing overrides.
- **Error Handling**: Provide meaningful `console.warn` (dev mode only) for missing required props or conflicting variants.

### Accessibility (a11y)

- **Semantic HTML**: Never use `<div onClick>`. Use proper tags (`<button>`, `<nav>`, `<ul>`).
- **Focus Management**: Restore focus to the trigger when closing overlays. Trap focus inside modals.
- **Roving Focus**: For composite widgets (Tabs, Menus), container has `tabIndex={-1}`, active item has `tabIndex={0}`. Arrow keys navigate.
- **Screen Readers**: Add `aria-hidden="true"` to decorative icons. Provide `aria-label` for icon-only buttons.
- **Keyboard Support**: All interactive elements must respond to Enter, Space, Arrows, and Escape.

### Styling & Theming

- **No Hardcoded Colors**: Use CSS variables mapped to semantic aliases (`bg-primary`, `text-foreground`).
- **Dark Mode**: Support via CSS variables scoped to a `.dark` parent class. No component-level conditionals.
- **Typography**: Use semantic typography tokens (`text-foreground`, `font-heading`, `text-sm`). No raw font sizes or families.
- **Responsive Behavior**: Always write mobile-first CSS. Use breakpoint modifiers (`md:`, `lg:`) to scale up. Test on mobile widths.
- **RTL Support**: Always use CSS logical properties — `ms-` instead of `ml-`, `start-` instead of `left-`, `pe-` instead of `pr-`.
- **Grid System**: Follow the 4px/8px spacing grid via design tokens.
- **Icons**: Accept icons as React nodes (children or props) rather than hardcoding SVG paths.

### Performance & SSR

- **SSR Safety**: Never access `window` or `document` during render. Gate browser-only logic in `useEffect`. Use `React.useId()` for stable IDs.
- **Render Optimization**: Wrap static sub-components in `React.memo`. Use `useCallback` for handlers passed to deep children.
- **Lazy Loading**: For heavy components, use `React.lazy` and dynamic imports.
- **Hardware-Accelerated Motion**: Only animate `transform` and `opacity`. Never animate `width`, `height`, `top`, or `left`.
- **Reduced Motion**: Always respect `@media (prefers-reduced-motion: reduce)` by disabling transitions.
- **Bundle Size**: Keep dependencies minimal. Ensure tree-shakeability.

### Forms & Inputs

- Custom inputs MUST expose a hidden native `<input>` or forward refs so `react-hook-form` can register them.
- **Validation Support**: Inputs must accept `aria-invalid` and `aria-describedby` to link error messages. Apply visual error states when `aria-invalid` is true.

### Mobile & Touch

- Ensure interactive elements have a minimum touch target of 44x44 pixels.
- Handle `onTouchStart` / `onClick` dual-firing to avoid double-triggering.
- Implement swipe gestures for mobile-first overlays (Drawers, Carousels).

---

## Self-Review Checklist

Before submitting your component, verify:

1. [ ] Semantic HTML and correct ARIA attributes
2. [ ] Focus trapped in modals, restored on close
3. [ ] Keyboard interactions (Enter, Space, Arrows, Escape)
4. [ ] Controlled and uncontrolled state support
5. [ ] Semantic CSS variables (no hardcoded values)
6. [ ] RTL-safe logical properties (`ms-`, `ps-`, `start-`)
7. [ ] SSR safe (no window/document in render)
8. [ ] Variants typed with CVA
9. [ ] `asChild` / `Slot` used instead of `as`
10. [ ] All refs properly forwarded
11. [ ] `className` merged properly with `cn()`
12. [ ] Forms support validation states (`aria-invalid`, `aria-describedby`)
13. [ ] Wrapped in `React.memo` if appropriate
14. [ ] Touch targets at least 44x44px

---

## Originality

All components must be original implementations. If your work was inspired by something, add a `credits` field to your metadata:

```ts
credits: 'Inspired by https://example.com'
```

---

## Questions?

Open an issue on [GitHub](https://github.com/Nexvyn/Nexvyn-ui) or reach out at nexvyndev@gmail.com.
