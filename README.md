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

## Tech stack

- Next.js 16 + React 19
- Bun
- Tailwind CSS v4
- Motion (Framer Motion)
- Radix UI primitives
- shadcn/ui registry protocol

## License

MIT © Nexvyn
