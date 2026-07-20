# Nexvyn UI

Animated UI components with spring physics and fluid interactions. Built on shadcn/ui and Radix primitives.

Live docs & demos | Browse components

## Install

Add the registry to your project:

```bash
bunx shadcn@latest registry add @nexvyn
```

Then install any component:

```bash
bunx shadcn@latest add @nexvyn/bounce-sidebar
bunx shadcn@latest add @nexvyn/goo-dropdown
```

Or install directly without adding the registry:

```bash
bunx shadcn@latest add https://ui.nexvyn.dev/r/bounce-sidebar.json
```

Dependencies resolve automatically. Motion animations require the `motion` package.

## What makes these different

- **Motion as information** - transitions make state changes legible, nothing moves for decoration
- **Spring physics** - springs replace fixed durations, adapting naturally to interruption
- **Drop-in compatible** - your existing shadcn theme and tokens apply automatically
- **Original implementations** - all components built from scratch with no copied code

## Tech stack

- Next.js 16 + React 19
- Bun
- Tailwind CSS v4
- Motion for animations
- Radix UI primitives
- shadcn/ui registry protocol
- Prettier for formatting

## Scripts

```bash
npm run dev           # Start dev server
npm run build         # Production build
npm run build:registry # Generate registry JSON files from source
npm run format        # Format code with Prettier
npm run format:check  # Check formatting without writing
npm run lint          # Run ESLint
```

## License

MIT © Nexvyn — all installable components (`components/ui/**`) and everything
else in this repository, including what ships through the shadcn registry.

**Exception:** the wireframe/anatomy diagram source in `components/diagrams/**`
and its two shared drawing primitives (`components/showcase/parts.tsx`,
`components/showcase/anatomy-parts.tsx`) are licensed separately under
CC BY-NC 4.0 — see [`components/diagrams/LICENSE`](components/diagrams/LICENSE).
These files are documentation-site assets only; they are never included in
any component's registry files and are not shipped to consumers who install
a component via the CLI.
