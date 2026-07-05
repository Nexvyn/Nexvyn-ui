# Changelog

All notable changes to Nexvyn/UI will be documented in this file.

---

## [0.1.0] - 2026-07-04

### Added

- **Bounce Sidebar** — Vertical nav with a bouncing dot marker that springs between items using motion physics.
- **Color Picker** — Blossom-style picker with concentric petal layers, circular color bar, and arc slider for lightness.
- **Gooey Dropdown** — Dropdown that morphs its trigger into the panel using an SVG goo filter and spring physics.
- **Password Input** — Password field with an animated eye toggle that tracks your cursor and blinks periodically.
- **Ratio Slider** — Split slider with two color bars, a draggable divider, and responsive collapsing labels.
- **Scroll Indicator** — Vertical TOC with tick marks that tracks scroll position and highlights the active section.
- Full metadata block with `metadataBase`, OpenGraph, Twitter cards, keywords, and icons.
- Auto-generated `sitemap.xml` and `robots.txt` via Next.js App Router.
- Responsive grid layout for the components listing page.
- Mobile disclaimer banners on component previews for small screens.
- Horizontal navigation strips for bounce-sidebar and scroll-indicator on mobile.
- Phosphor Icons for fullscreen, code, external link, copy, check, and chat icons.

### Changed

- Replaced `framer-motion` imports with `motion/react` across all components.
- Migrated layout properties to RTL-safe logical properties (`ms-`, `ps-`, `start-`, `pe-`).
- Added `useReducedMotion` support to bounce-sidebar and scroll-indicator.
- Improved focus-visible styles on bounce-sidebar and goo-dropdown.
- Updated component card to full-width on mobile.
- Updated AGENTS.md with comprehensive React UI library guidelines (naming, extensibility, responsive, render optimization, validation, touch).
- Updated CONTRIBUTING.md with full component architecture guide and 14-point self-review checklist.

### Fixed

- Scrollbar visibility on the components page by adding global `no-scrollbar` to `html` and `body`.
- Component previews breaking on small screens by adapting sidebar layouts and reducing spacing.
- Preview card border radius using canonical `rounded-3xl` class.
