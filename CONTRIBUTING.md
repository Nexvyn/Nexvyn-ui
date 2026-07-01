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

Export a `ComponentItem` object with id, name, collection, description, props, and usage.

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

export const COMPONENTS: ComponentItem[] = [
  myComponentMetadata,
]
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

Also add a matching file in `public/r/my-component.json`.

### 7. Test locally

Run `npm run dev` and navigate to `/components/my-component` to verify it works.

---

## Code Standards

- Use TypeScript exclusively
- Use `motion/react` for animations (not `framer-motion`)
- Use `cn()` from `@/lib/utils` for class merging
- Use design tokens (`var(--color-*)`) instead of hardcoded colors
- Add `"use client"` directive for client components

---

## Questions?

Open an issue on [GitHub](https://github.com/Nexvyn/Nexvyn-ui) or reach out at nexvyndev@gmail.com.
