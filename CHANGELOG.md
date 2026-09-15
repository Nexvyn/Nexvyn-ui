# Changelog

All notable changes to Nexvyn/UI will be documented in this file.

---

## [Unreleased]

### Removed

- **Id Reel**: Removed from the catalog.
- **Button, Combobox, Input, Input Message, Mobile Drawer, Table**: Removed from the catalog and registry. Their diagrams are kept. `components/ui/button.tsx` remains as an internal dependency of Action Button.

### Changed

- **Scroll Indicator**: Section markers and the sliding indicator now snap to the tick grid, so the active line sits exactly on its section instead of between ticks. Clicking a section scrolls its heading to a small offset from the top (new `scrollOffset` prop, default 16).
- **Input Copy**: The value is now a real read-only input with a separate copy button, a clipboard fallback, and a screen-reader announcement. New props: `failedLabel`, `buttonText`, `resetDelay`.
- **Fluid Orb**: Monochrome neutral palette with a subtle accent tint that follows light and dark theme. New `accentColor` prop.
- **Ratio Slider**: Readable label contrast in light theme. New `compactLeftLabelColor` and `compactRightLabelColor` props; the compact bar resize animates with a transform instead of height.
- **Adaptive Actions**: Roomier overflow menu and Hugeicons icons (`@hugeicons/react`, `@hugeicons/core-free-icons`).
- **Goo Dropdown**: The trigger and menu are visible in light theme, with no outline ring in dark theme.
- **Select**: Symmetric inline spacing in the dropdown.
- **Switch**: Thumb centered with equal inset in both positions, and RTL support.
- **Dia Text**, homepage: Regular weight text instead of bold.
- All components use `rounded-md` corners, with `squircle-corners` where a squircle shape is wanted.
- **License**: Code moved from plain MIT to MIT with the Commons Clause: free for personal and commercial use, the copyright and license notice must stay in source, and selling the components themselves (as a UI kit, component library, or template) is not allowed. Diagrams stay CC BY-NC 4.0.
- **Catalog**: Components are grouped into Unique (signature pieces) and Basic (standard primitives) on the sidebar and the components page.
- **Component cards**: The component name sits below the preview, and card entrance animations play once instead of restarting on scroll.
- **Search (Cmd/Ctrl+K)**: Opens on every page, includes site pages as well as components, and uses the Nexvyn design language.
- **Landing page**: Calmer dark theme (pixel trail, hero rails, sponsor card, screenshot brightness, page background), token-only colors, and clearer hero copy.
- **Colors**: Hardcoded hex/rgb colors, glows, and one-off durations replaced with design tokens across components; Dia Text now sweeps from the text color into the accent.
- **Anatomy diagrams**: Tags attach to their parts through a shared `AnatomyCallout` helper, every diagram has a screen-reader label, keyboard support (Tab between parts, Enter to pin, Esc to clear), a uniform 1.2x render scale, and an info line showing the hovered part's real measurements and a one-line caption. Anatomy diagrams now load only when opened.
- **Component pages**: New Examples view (Badge, Select, Switch) with a scrollable grid of variants, grouped sections, and copy-code buttons, loaded only when opened.
- **Landing page**: Visible headline, centered hero, copyable install line, reordered sections, two-row footer with links and license, skip link and main landmark, 44px CTA on mobile, and the pixel trail turns off with reduced motion and on touch devices. Hero rails now show only shipped components.
- **Diagrams**: Card blueprints redrawn from the current components with every annotation kept, a dev-only QA page at `/dev/diagrams`, touch support in anatomy, and a rule check (`npm run check:rules`) that runs before every build.

### Fixed

- **Registry installs**: 11 components were missing files or packages they import (for example Select, Switch, Fader, AI Input); installs now include everything they need.
- **Tooltips** on component pages no longer render off screen.
- **Anatomy** no longer shifts the layout when hovering parts.
- **Accessibility**: collapsed Accordion content is hidden from screen readers, Breadcrumbs mark the right current page and can expand collapsed items, Morph Nav's Back returns to the main menu, Nav Menu always has a tab stop, AI Input's mic button has a focus ring and Enter no longer stops streaming, Goo Dropdown's closed menu is hidden from screen readers.
- **Motion**: Bounce Sidebar respects reduced motion and no longer fires twice per click, Dia Text no longer animates width, Blossom Picker respects reduced motion, and the orbs pause when off screen.
- **Action Button**: Buttons no longer shrink and spring back when the pointer leaves them.
- **Bounce Sidebar diagram**: Row labels fit inside their rows and the annotations no longer overlap.

## [0.1.0] - 2026-07-04

### Added

- **Bounce Sidebar**: Vertical nav with a bouncing dot marker that springs between items using motion physics.
- **Color Picker**: Blossom-style picker with concentric petal layers, circular color bar, and arc slider for lightness.
- **Gooey Dropdown**: Dropdown that morphs its trigger into the panel using an SVG goo filter and spring physics.
- **Password Input**: Password field with an animated eye toggle that tracks your cursor and blinks periodically.
- **Ratio Slider**: Split slider with two color bars, a draggable divider, and responsive collapsing labels.
- **Scroll Indicator**: Vertical TOC with tick marks that tracks scroll position and highlights the active section.
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
