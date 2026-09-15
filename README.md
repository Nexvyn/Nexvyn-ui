<img src="public/favicon.svg" alt="Nexvyn UI" width="48" height="48" />

# Nexvyn UI

Animated UI components with spring physics and fluid interactions. Built on shadcn/ui and Radix primitives.

## Install

Add the registry to your project:

```bash
pnpm dlx shadcn@latest registry add @nexvyn
```

Then install any component:

```bash
pnpm dlx shadcn@latest add @nexvyn/bounce-sidebar
pnpm dlx shadcn@latest add @nexvyn/goo-dropdown
```

Or install directly without adding the registry:

```bash
pnpm dlx shadcn@latest add https://ui.nexvyn.dev/r/bounce-sidebar.json
```

Dependencies resolve automatically. Motion animations require the `motion` package.

## What makes these different

- **Motion as information** - transitions make state changes legible, nothing moves for decoration
- **Spring physics** - springs replace fixed durations, adapting naturally to interruption
- **Drop-in compatible** - your existing shadcn theme and tokens apply automatically
- **Original implementations** - all components built from scratch with no copied code

## Tech stack

[![Tech stack](https://skillicons.dev/icons?i=nextjs,react,ts,tailwindcss,pnpm&theme=light)](https://skillicons.dev)

- Motion for animations
- Radix UI primitives
- shadcn/ui registry protocol
- Prettier for formatting

## Scripts

```bash
pnpm dev             # Start dev server
pnpm build           # Production build
pnpm build:registry  # Generate registry JSON files from source
pnpm format          # Format code with Prettier
pnpm format:check    # Check formatting without writing
pnpm lint            # Run ESLint
```

## License

All installable components (`components/ui/**`) and everything else in this
repository, including what ships through the shadcn registry, are licensed under
[MIT with the Commons Clause](LICENSE):

- Use the components in personal and commercial products, including paid apps
  and client work.
- Keep the copyright and license notice in the source files you copy
  (attribution). No visible credit in your product is required.
- Do not sell the components themselves, for example as a UI kit, component
  library, template, or any product whose value comes mainly from them.

**Exception:** the wireframe/anatomy diagram source in `components/diagrams/**`
and its shared drawing primitives (`components/diagrams/lib/diagram-parts.tsx`,
`components/diagrams/lib/anatomy-parts.tsx`) are licensed separately under
CC BY-NC 4.0 see [`components/diagrams/LICENSE`](components/diagrams/LICENSE).
These files are documentation-site assets only; they are never included in
any component's registry files and are not shipped to consumers who install
a component via the CLI.
