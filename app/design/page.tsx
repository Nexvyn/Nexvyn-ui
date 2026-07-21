import type { Metadata } from 'next'
import { AnimatedTitle } from '@/components/showcase/animated-title'

export const metadata: Metadata = {
  title: 'Design',
  description: 'Color, radius, typography, spacing, shape, and motion tokens for Nexvyn/UI.',
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-medium uppercase tracking-wide text-(--color-accent) mb-1">
        {eyebrow}
      </p>
      <h2 className="text-lg font-medium text-(--color-fg)">{title}</h2>
    </div>
  )
}

const COLOR_TOKENS: { token: string; label: string }[] = [
  { token: '--color-bg', label: 'Background' },
  { token: '--color-surface', label: 'Surface' },
  { token: '--color-surface-2', label: 'Surface 2' },
  { token: '--color-fg', label: 'Foreground' },
  { token: '--color-muted', label: 'Muted' },
  { token: '--color-subtle', label: 'Subtle' },
  { token: '--color-border', label: 'Border' },
  { token: '--color-border-strong', label: 'Border strong' },
  { token: '--color-accent', label: 'Accent' },
  { token: '--color-error', label: 'Error' },
  { token: '--color-success', label: 'Success' },
  { token: '--color-new', label: 'New' },
]

const RADIUS_TOKENS: { className: string; label: string; token: string }[] = [
  { className: 'rounded-sm', label: 'Small', token: '--radius-sm' },
  { className: 'rounded-md', label: 'Medium', token: '--radius-md' },
  { className: 'rounded-lg', label: 'Large', token: '--radius-lg' },
  { className: 'rounded-xl', label: 'Extra large', token: '--radius-xl' },
  { className: 'rounded-full', label: 'Full', token: '9999px' },
]

const TYPE_SCALE: { className: string; label: string }[] = [
  { className: 'text-xs', label: '12 / xs' },
  { className: 'text-sm', label: '14 / sm' },
  { className: 'text-base', label: '16 / base' },
  { className: 'text-lg', label: '18 / lg' },
  { className: 'text-xl', label: '20 / xl' },
  { className: 'text-2xl', label: '24 / 2xl' },
  { className: 'text-3xl', label: '30 / 3xl' },
]

const SPACING_SCALE = [1, 2, 3, 4, 6, 8, 12, 16]

export default function DesignPage() {
  return (
    <div className="h-full w-full flex flex-col">
      <div
        id="design-scroll-viewport"
        className="min-h-0 flex-1 overflow-y-auto h-full relative"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `#design-scroll-viewport::-webkit-scrollbar { display: none; }`,
          }}
        />
        <div className="max-w-2xl mx-auto py-8 md:py-12 px-4 sm:px-6">
          <AnimatedTitle
            title="Design"
            className="text-2xl sm:text-3xl font-normal tracking-tight mb-2"
          />
          <p className="text-sm text-(--color-muted) mb-14 max-w-lg">
            The tokens every component in this library is built from — neutral + one accent, a
            restrained radius scale, one signature motion moment per interaction. Nothing here is
            hardcoded downstream; every value below is a CSS variable.
          </p>

          <div className="flex flex-col gap-14">
            {/* Color */}
            <section>
              <SectionHeading eyebrow="Palette" title="Color" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {COLOR_TOKENS.map(({ token, label }) => (
                  <div key={token} className="flex flex-col gap-2">
                    <div
                      className="h-14 rounded-lg border border-(--color-border)"
                      style={{ background: `var(${token})` }}
                    />
                    <div>
                      <p className="text-xs text-(--color-fg)">{label}</p>
                      <p className="text-[11px] font-mono text-(--color-subtle)">{token}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Radius */}
            <section>
              <SectionHeading eyebrow="Shape" title="Radius" />
              <div className="flex flex-wrap items-end gap-6">
                {RADIUS_TOKENS.map(({ className, label, token }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div
                      className={`size-16 bg-(--color-surface-2) border border-(--color-border) ${className}`}
                    />
                    <div className="text-center">
                      <p className="text-xs text-(--color-fg)">{label}</p>
                      <p className="text-[11px] font-mono text-(--color-subtle)">{token}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Shape treatment */}
            <section>
              <SectionHeading eyebrow="Shape" title="Corner treatment" />
              <div className="flex flex-wrap gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="size-16 rounded-2xl bg-(--color-surface-2) border border-(--color-border)" />
                  <p className="text-xs text-(--color-fg)">Rounded</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="squircle-corners size-16 rounded-2xl bg-(--color-surface-2) border border-(--color-border)" />
                  <p className="text-xs text-(--color-fg)">Squircle</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="squircle size-16 bg-(--color-surface-2) border border-(--color-border)" />
                  <p className="text-xs text-(--color-fg)">Pill / squircle</p>
                </div>
              </div>
            </section>

            {/* Typography */}
            <section>
              <SectionHeading eyebrow="Type" title="Typography" />
              <div className="flex flex-col gap-3 mb-8">
                {TYPE_SCALE.map(({ className, label }) => (
                  <div key={label} className="flex items-baseline gap-4">
                    <span className="w-16 shrink-0 text-[11px] font-mono text-(--color-subtle)">
                      {label}
                    </span>
                    <span className={`${className} text-(--color-fg) font-sans`}>
                      The quick brown fox
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-[11px] font-mono text-(--color-subtle) mb-1">--font-sans</p>
                  <p className="font-sans text-lg text-(--color-fg)">
                    Segoe UI, ui-sans-serif, system-ui
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-mono text-(--color-subtle) mb-1">
                    --font-handwriting
                  </p>
                  <p
                    className="text-2xl text-(--color-fg)"
                    style={{ fontFamily: 'var(--font-handwriting)' }}
                  >
                    Nexvyn/Ui, handwritten accents
                  </p>
                </div>
              </div>
            </section>

            {/* Spacing */}
            <section>
              <SectionHeading eyebrow="Grid" title="Spacing" />
              <div className="flex flex-col gap-2">
                {SPACING_SCALE.map((step) => (
                  <div key={step} className="flex items-center gap-4">
                    <span className="w-12 shrink-0 text-[11px] font-mono text-(--color-subtle)">
                      {step * 4}px
                    </span>
                    <div
                      className="h-3 bg-(--color-accent) rounded-sm"
                      style={{ width: `${step * 4}px` }}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
