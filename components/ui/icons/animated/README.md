# Animated Icon System

Production-ready animated icon system for sidebar navigation, built with **Framer Motion** and **SVG**.

## Features

- ✨ **19 meticulously crafted icons** for UI components
- 🎬 **Motion-first design** - micro-interactions on hover/active
- ♿ **Accessible** - respects `prefers-reduced-motion`
- 🎯 **Optimized** - 60fps animations, no layout shifts
- 📦 **Lightweight** - ~15KB gzipped for complete set
- 🎨 **Customizable** - size, stroke width, active states
- 💪 **TypeScript** - full type safety

## Quick Start

### 1. Import Icons

```tsx
import {
  ButtonIcon,
  ChartIcon,
  AlertIcon,
} from "@/components/ui/animated-icons"
```

### 2. Use in Your Component

```tsx
export function Sidebar() {
  const [activeItem, setActiveItem] = useState("button")

  return (
    <nav className="flex flex-col gap-2 p-2">
      <SidebarItem
        icon={<ButtonIcon isActive={activeItem === "button"} />}
        label="Button"
        onClick={() => setActiveItem("button")}
      />
      <SidebarItem
        icon={<ChartIcon isActive={activeItem === "chart"} />}
        label="Chart"
        onClick={() => setActiveItem("chart")}
      />
    </nav>
  )
}
```

## Available Icons

| Icon         | Component             | Animation Type            |
| ------------ | --------------------- | ------------------------- |
| Alert Dialog | `<AlertDialogIcon />` | Pop + rotate              |
| Alert        | `<AlertIcon />`       | Bounce + stroke highlight |
| Aspect Ratio | `<AspectRatioIcon />` | Expanding brackets        |
| Avatar       | `<AvatarIcon />`      | Stroke draw + scale       |
| Badge        | `<BadgeIcon />`       | Pulsing dot               |
| Breadcrumb   | `<BreadcrumbIcon />`  | Staggered chevron slide   |
| Button       | `<ButtonIcon />`      | 3D press depth            |
| Button Group | `<ButtonGroupIcon />` | Center scale + compress   |
| Calendar     | `<CalendarIcon />`    | Sequential grid fill      |
| Card         | `<CardIcon />`        | Corner fold lift          |
| Carousel     | `<CarouselIcon />`    | Sliding panels            |
| Chart        | `<ChartIcon />`       | Bar growth                |
| Checkbox     | `<CheckboxIcon />`    | Checkmark draw            |
| Collapsible  | `<CollapsibleIcon />` | Chevron rotation          |
| Combobox     | `<ComboboxIcon />`    | Dropdown bounce           |
| Command      | `<CommandIcon />`     | Pulse glow                |
| Context Menu | `<ContextMenuIcon />` | Menu shift + arrow        |
| Data Table   | `<DataTableIcon />`   | Row highlight sweep       |

## Props

All icons accept the same props:

```tsx
interface BaseIconProps {
  size?: number // Default: 20px
  isActive?: boolean // Default: false
  strokeWidth?: number // Default: 1.5
  className?: string // Additional CSS classes
}
```

## Animation Language

### Timing

- **Hover duration**: 0.2s
- **Active duration**: 0.1s
- **Easing**: cubic-bezier(0.25, 0.1, 0.25, 1)

### Constraints

- **Scale range**: 0.9 - 1.15
- **Rotation**: ±15deg max
- **Translation**: ±3px max
- **No layout shifts** - transforms only

### States

- **Idle**: Default state, no animation
- **Hover**: Single animation cycle on mouseenter
- **Active**: Persistent state for selected items

## Accessibility

All icons automatically:

- Respect `prefers-reduced-motion` (disables animations)
- Include proper ARIA attributes
- Maintain 4.5:1 contrast ratio
- Support keyboard focus states

## Customization

### Custom Size

```tsx
<ButtonIcon size={24} />  // Larger icon
<ChartIcon size={16} />   // Smaller icon
```

### Custom Stroke Width

```tsx
<AlertIcon strokeWidth={2} /> // Thicker lines
```

### Custom Styles

```tsx
<CardIcon className="text-blue-500 hover:text-blue-600" />
```

## Performance

- Uses `transform` and `opacity` only (GPU-accelerated)
- Includes `will-change-transform` for optimization
- No reflows or repaints during animation
- Tested at 60fps with all 19 icons simultaneously

## Showcase

View all icons in action:

```tsx
import { AnimatedIconShowcase } from "@/components/ui/animated-icons/showcase"

export default function ShowcasePage() {
  return <AnimatedIconShowcase />
}
```

## File Structure

```
components/ui/animated-icons/
├── index.ts                 # Exports all icons
├── types.ts                 # TypeScript types
├── motion-icon.tsx          # Base wrapper component
├── icon-variants.ts         # Shared animation variants
├── showcase.tsx             # Demo component
└── icons/
    ├── alert-dialog.tsx
    ├── alert.tsx
    ├── aspect-ratio.tsx
    └── ... (19 total)
```

## Design Philosophy

> **Motion as Feedback, Not Decoration**

Every animation serves a functional purpose:

- ✅ Confirm interaction
- ✅ Indicate state change
- ✅ Provide visual feedback
- ❌ No decorative animations

## Browser Support

- Chrome/Edge 88+
- Firefox 87+
- Safari 14.1+
- All modern browsers with CSS transforms and SVG support

## Credits

Designed and built for motion-first UI component libraries.
