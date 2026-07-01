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

### 3. Register the component

Import and add your metadata to `lib/components-registry.ts`:

```ts
import { myComponentMetadata } from '@/components/ui/Doc/my-component-metadata'

export const COMPONENTS: ComponentItem[] = [
  myComponentMetadata,
  // ... other components
]
```

### 4. Add a demo

Add a demo case in `app/components/[component]/page.tsx` inside the `ComponentDemo` switch statement.

### 5. Add to the registry

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

### 6. Test locally

Run `npm run dev` and navigate to `/components/my-component` to verify it works.

---

## Code Standards

- Use TypeScript exclusively
- Use `motion/react` for animations (not `framer-motion`)
- Use `cn()` from `@/lib/utils` for class merging
- Follow the existing component patterns in `components/ui/`
- Add `"use client"` directive for client components

---

## Questions?

Open an issue or DM on X: [@nexvyn](https://x.com/nexvyn)
