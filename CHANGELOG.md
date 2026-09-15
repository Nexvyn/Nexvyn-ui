# Changelog

All notable changes to Nexvyn/UI will be documented in this file.

---

## [Unreleased]

### Added

- **Accordion**: Stacked headings that unfold their sections with a grid-rows reveal, in single or multiple mode.
- **Action Button**: Async-aware button that moves from idle to pending to success or error, with abort support and auto reset.
- **Adaptive Actions**: Toolbar that measures its space and moves overflowing actions into an accessible menu.
- **AI Input**: Auto-growing composer with a send and stop morph, attachment slots, and Enter to send.
- **Badge**: Compact status label in solid, muted, and dot variants.
- **Bars Theme**: Five bars riding a traveling sine wave that reacts to volume.
- **Breadcrumbs**: Link trail that collapses into an ellipsis past `maxItems`.
- **Checkbox**: Drawn check animation, indeterminate state, and a hidden native input for forms.
- **Clipboard Field**: One-click install field that morphs between the command and a copied label.
- **Context Menu**: Right-click or long-press menu that unfurls from the pointer with shortcut hints.
- **Dia Text**: Diagonal clip-path reveal for display typography.
- **Dropdown Menu**: Action menu with a highlight that springs between items as the pointer moves.
- **Fader**: Mixing-console fader where the label and value live inside the track.
- **Fluid Orb** and **Glow Orb**: WebGL orbs that follow the theme and respond to state and volume.
- **Icon Bar**: Icon toolbar whose labels bloom open on hover and selection, with roving focus.
- **Input Copy**: Read-only value with a copy trigger and an animated check.
- **Laptop Mockup** and **Phone Mockup**: Device frames for showcasing app screens.
- **Morph Nav**: Floating action button that morphs through its menu states with directional panel slides.
- **Nav Menu**: Vertical navigation with a two-layer highlight and status dots.
- **Navigation Compass**: Draggable compass dial that doubles as a nav menu.
- **Radio Group**: Selection dot that travels from the previous option to the new one.
- **Rocket Launch**: Hand-drawn rocket that ignites and lifts off on demand.
- **Select**: Form select with a proximity highlight, drawn check, and a label morph on change.
- **Switch**: Toggle with thumb travel and a hidden checkbox for forms.
- **Table of Contents**: Floating block that tracks the active section and expands into a section list.
- **Tabs Subtle**: Pill tabs with a springing indicator and full roving focus.
- **Homepage**: A note from Nexvyn, a featured showcase with a compass dial and inspection lens, sponsors with a page ripple, and blueprint rails in the hero.
- **Search (Cmd/Ctrl+K)**: Command palette for components and site pages.
- **Design page**: Principles, brand, color, type, shape, spacing, and motion tokens in one place.
- **Share images**: Static Open Graph and Twitter images generated at build time.

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
- **Diagrams**: Card blueprints redrawn from the current components with every annotation kept, a dev-only QA page at `/dev/diagrams`, touch support in anatomy, and a rule check (`npm run check:rules`) that runs before every build.

### Fixed

- **Registry installs**: 11 components were missing files or packages they import (for example Select, Switch, Fader, AI Input); installs now include everything they need.
- **Tooltips** on component pages no longer render off screen.
- **Anatomy** no longer shifts the layout when hovering parts.
- **Accessibility**: collapsed Accordion content is hidden from screen readers, Breadcrumbs mark the right current page and can expand collapsed items, Morph Nav's Back returns to the main menu, Nav Menu always has a tab stop, AI Input's mic button has a focus ring and Enter no longer stops streaming, Goo Dropdown's closed menu is hidden from screen readers.
- **Motion**: Bounce Sidebar respects reduced motion and no longer fires twice per click, Dia Text no longer animates width, Blossom Picker respects reduced motion, and the orbs pause when off screen.
- **Action Button**: Buttons no longer shrink and spring back when the pointer leaves them.
- **Changelog page**: Releases render again on Windows line endings, including unreleased changes.
- **Bounce Sidebar diagram**: Row labels fit inside their rows and the annotations no longer overlap.
- **Breadcrumbs**: Separators now have a size-matched gap (6px at `md`) instead of touching the labels.
- **Diagrams**: Select, Table of Contents, Input Copy, Tabs Subtle and Bounce Sidebar annotations no longer collide with text or frames; Breadcrumbs, Checkbox and Radio Group guides match the real layout.
- **Homepage showcase**: Hover blueprints line up with the live Compass, Blossom Picker, Fader and Dia Text.

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
