import * as React from "react"

/**
 * Component Registry Index
 * Maps component names to their React components for preview
 */

type RegistryEntry = {
  name: string
  component: React.ComponentType<unknown>
  description?: string
}

// Lazy load demo components
const ButtonDemo = React.lazy(() => import("@/registry/new-york-v4/examples/button-demo"))
const CardDemo = React.lazy(() => import("@/registry/new-york-v4/examples/card-demo"))
const InputDemo = React.lazy(() => import("@/registry/new-york-v4/examples/input-demo"))
const CardsDemo = React.lazy(() => import("@/registry/new-york-v4/examples/cards-demo"))
const ParallaxDemo = React.lazy(() => import("@/registry/new-york-v4/examples/parallax-demo"))
const MouseFollowerDemo = React.lazy(
  () => import("@/registry/new-york-v4/examples/mouse-follower-demo")
)

// Registry index - maps component names to their implementations
export const Index: Record<string, RegistryEntry> = {
  // Button component
  "button-demo": {
    name: "button-demo",
    component: ButtonDemo,
    description: "Button component with multiple variants",
  },

  // Card component
  "card-demo": {
    name: "card-demo",
    component: CardDemo,
    description: "Card component with header, content, and footer",
  },

  // Input component
  "input-demo": {
    name: "input-demo",
    component: InputDemo,
    description: "Input component with various types",
  },

  // Card Stack Animation component
  "cards-demo": {
    name: "cards-demo",
    component: CardsDemo,
    description: "Scroll-triggered card stack animation with GSAP",
  },

  // Parallax Scroll component
  "parallax-demo": {
    name: "parallax-demo",
    component: ParallaxDemo,
    description: "Smooth parallax scrolling with layered image animations",
  },

  // Mouse Follower component
  "mouse-follower-demo": {
    name: "mouse-follower-demo",
    component: MouseFollowerDemo,
    description: "Interactive mouse follower with image trail effect",
  },
}

export type ComponentName = keyof typeof Index
