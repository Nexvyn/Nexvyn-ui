import Image from 'next/image'
import { AnimatedTitle } from '@/components/showcase/animated-title'
import { BentoCard, BentoTag } from '@/components/layout/bento-card'
import { COMPONENTS } from '@/lib/components-registry'
import { ALL_COMMITS } from '@/lib/git-history'
import { pageMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils'
import { HorizontalScroller } from './horizontal-scroller'
import { MotionTokens } from './motion-tokens'

export const metadata = pageMetadata({
  title: 'Design',
  description:
    'The Nexvyn/UI brand and design language: logo, color, voice, type, shape, spacing, and motion.',
  path: '/design',
})

const PRINCIPLES = [
  {
    title: 'One signature moment',
    body: 'Every component gets one motion people remember. Everything around it stays calm.',
  },
  {
    title: 'Accent with intent',
    body: 'The accent appears on focus, selection, and that signature moment. Everything else is neutral.',
  },
  {
    title: 'Regular weight',
    body: 'No bold anywhere. Hierarchy comes from size, color, and space.',
  },
  {
    title: 'Quiet geometry',
    body: 'Medium corners, a 4px grid, and a token behind every value.',
  },
]

const NEUTRALS = [
  { token: '--color-bg', label: 'Background' },
  { token: '--color-surface', label: 'Surface' },
  { token: '--color-surface-2', label: 'Surface 2' },
  { token: '--color-border', label: 'Border' },
  { token: '--color-border-strong', label: 'Border strong' },
  { token: '--color-subtle', label: 'Subtle' },
  { token: '--color-muted', label: 'Muted' },
  { token: '--color-fg', label: 'Foreground' },
]

const STATES = [
  { token: '--color-error', label: 'Error' },
  { token: '--color-success', label: 'Success' },
  { token: '--color-new', label: 'New' },
]

const TYPE_SCALE = [
  { className: 'text-3xl', size: 30, name: '3xl' },
  { className: 'text-2xl', size: 24, name: '2xl' },
  { className: 'text-xl', size: 20, name: 'xl' },
  { className: 'text-lg', size: 18, name: 'lg' },
  { className: 'text-base', size: 16, name: 'base' },
  { className: 'text-sm', size: 14, name: 'sm' },
  { className: 'text-xs', size: 12, name: 'xs' },
]

const RADII = [
  { className: 'rounded-sm', label: 'sm' },
  { className: 'rounded-md', label: 'md', standard: true },
  { className: 'rounded-lg', label: 'lg' },
  { className: 'rounded-xl', label: 'xl' },
]

const CORNERS = [
  { className: 'rounded-2xl', label: 'round' },
  { className: 'squircle-corners rounded-2xl', label: 'squircle' },
  { className: 'squircle', label: 'pill' },
]

const SPACING = [1, 2, 3, 4, 6, 8, 12, 16]

const VOICE_RULES = ['Plain words', 'No em dashes', 'Short sentences', 'Show, then tell']

function Token({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('font-mono text-xs text-(--color-subtle)', className)}>{children}</span>
  )
}

function ColorBlock({
  token,
  label,
  ink,
  className,
}: {
  token: string
  label: string
  ink: string
  className?: string
}) {
  return (
    <div
      className={cn('flex flex-col justify-end gap-0.5 p-4 sm:p-5', className)}
      style={{ background: `var(${token})`, color: `var(${ink})` }}
    >
      <span className="text-sm">{label}</span>
      <span className="font-mono text-xs opacity-70">{token}</span>
    </div>
  )
}

const SHEET =
  'squircle-corners absolute top-1/2 flex aspect-8/5 w-[44%] flex-col gap-2 overflow-hidden rounded-md border border-(--color-border) bg-(--color-bg) p-3 shadow-sm transition-[translate,rotate,scale] duration-(--motion-dur-slow) ease-(--motion-ease-out) motion-reduce:transition-none sm:w-[34%] sm:p-4'

function StatsSheet({ components, commits }: { components: number; commits: number }) {
  const stats = [
    { value: components, label: 'components' },
    { value: commits, label: 'commits' },
  ]
  return (
    <div
      aria-hidden="true"
      className={cn(
        SHEET,
        'inset-s-0 -translate-y-1/2 -rotate-3 pe-[18%] scale-90 group-hover:-translate-x-3 group-hover:-rotate-6 rtl:group-hover:translate-x-3',
      )}
    >
      <span className="h-1 w-10 rounded-xs bg-(--color-accent)" />
      <p className="text-[10px] leading-tight text-(--color-fg) sm:text-xs">Shipped so far</p>
      <div className="mt-auto grid grid-cols-2 gap-1.5">
        {stats.map(({ value, label }) => (
          <div key={label} className="rounded-sm bg-(--color-surface-2) p-1.5">
            <p className="text-xs text-(--color-fg) sm:text-sm">{value}</p>
            <p className="truncate text-[8px] text-(--color-muted) sm:text-[10px]">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function HeadlineSheet() {
  return (
    <div
      aria-hidden="true"
      className={cn(
        SHEET,
        'z-1 inset-s-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md sm:w-[40%] group-hover:-translate-y-[54%] group-hover:scale-105 rtl:translate-x-1/2',
      )}
    >
      <p className="text-[8px] text-(--color-subtle) sm:text-[10px]">Nexvyn/UI</p>
      <p className="text-xs leading-snug text-(--color-fg) sm:text-base">
        Interfaces that feel built, not assembled.
      </p>
      <div className="mt-auto flex items-center gap-2">
        <span className="squircle-corners rounded-md bg-(--color-fg) px-2 py-1 text-[8px] text-(--color-bg) sm:text-[10px]">
          Components
        </span>
        <span className="squircle flex h-3 w-5 items-center justify-end bg-(--color-accent) p-0.5 sm:h-4 sm:w-7">
          <span className="squircle size-2 bg-(--color-bg) sm:size-3" />
        </span>
        <span className="squircle-corners rounded-md border border-(--color-border) px-1.5 py-0.5 text-[8px] text-(--color-muted) sm:text-[10px]">
          New
        </span>
      </div>
    </div>
  )
}

function ChartSheet() {
  const bars = [40, 65, 50, 90, 70]
  return (
    <div
      aria-hidden="true"
      className={cn(
        SHEET,
        'inset-e-0 -translate-y-1/2 rotate-3 ps-[18%] scale-90 group-hover:translate-x-3 group-hover:rotate-6 rtl:group-hover:-translate-x-3',
      )}
    >
      <p className="text-[10px] leading-tight text-(--color-fg) sm:text-xs">Motion budget</p>
      <div className="mt-auto flex h-3/5 items-end gap-1.5">
        {bars.map((height, i) => (
          <span
            key={i}
            className={cn(
              'flex-1 rounded-xs',
              i === 3 ? 'bg-(--color-accent)' : 'bg-(--color-surface-2)',
            )}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export default function DesignPage() {
  return (
    <div className="h-full w-full">
      <HorizontalScroller label="Design language" className="h-full overflow-auto">
        <div className="grid gap-3 px-4 pt-16 pb-8 md:h-full md:min-h-180 md:w-max md:auto-cols-[18rem] md:grid-flow-col md:grid-rows-3 md:gap-4 md:px-6 md:pb-6">
          <div className="flex flex-col justify-end gap-3 pb-2 md:col-start-1 md:row-start-1">
            <AnimatedTitle
              title="Design"
              className="text-2xl sm:text-3xl font-normal tracking-tight"
            />
            <p className="text-sm leading-relaxed text-(--color-muted) text-pretty">
              Fluid precision, editorial restraint. The brand and the tokens every Nexvyn component
              is built from, all CSS variables that follow light and dark theme.
            </p>
          </div>

          <BentoCard
            tag="Logo"
            tagTone="solid"
            className="min-h-60 md:min-h-0 md:col-start-1 md:row-start-2"
          >
            <div className="flex flex-1 items-center justify-center">
              <Image src="/favicon.svg" alt="Nexvyn mark" width={80} height={80} />
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-handwriting text-xl text-(--color-accent)">Nexvyn/Ui (...)</p>
              <Token>wordmark</Token>
            </div>
          </BentoCard>

          <BentoCard tag="Fonts" className="min-h-60 md:min-h-0 md:col-start-1 md:row-start-3">
            <p className="mt-auto text-8xl leading-none tracking-tight text-(--color-fg) short:text-7xl">
              Aa
            </p>
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm text-(--color-fg)">Geist</p>
              <Token>regular only</Token>
            </div>
          </BentoCard>

          <BentoCard
            aria-label="Colors"
            className="min-h-80 md:min-h-0 p-0 sm:p-0 md:col-span-2 md:col-start-2 md:row-span-2 md:row-start-1"
          >
            <div className="absolute inset-0 grid grid-rows-[3fr_2fr]">
              <ColorBlock token="--color-accent" label="Accent" ink="--color-bg" />
              <div className="grid grid-cols-2">
                <ColorBlock token="--color-fg" label="Foreground" ink="--color-bg" />
                <ColorBlock
                  token="--color-bg"
                  label="Background"
                  ink="--color-fg"
                  className="border-t border-(--color-border)"
                />
              </div>
            </div>
            <BentoTag className="absolute inset-s-4 top-4 z-1 bg-(--color-bg) sm:inset-s-5 sm:top-5">
              Colors
            </BentoTag>
          </BentoCard>

          <BentoCard
            tag="Tone of voice"
            className="min-h-60 md:min-h-0 md:col-span-2 md:col-start-2 md:row-start-3"
          >
            <p className="mask-b-from-20% text-2xl leading-tight text-(--color-fg) text-pretty sm:text-3xl short:text-2xl">
              Calm and precise. We sound like a craftsperson showing their work, not a brochure
              selling it.
            </p>
            <ul className="mt-auto flex flex-wrap gap-2 text-xs text-(--color-muted)">
              {VOICE_RULES.map((rule) => (
                <li
                  key={rule}
                  className="squircle-corners rounded-md border border-(--color-border) px-2 py-1"
                >
                  {rule}
                </li>
              ))}
            </ul>
          </BentoCard>

          <BentoCard
            tag="In use"
            className="group min-h-72 md:min-h-0 md:col-span-2 md:col-start-4 md:row-span-2 md:row-start-1"
          >
            <div className="relative flex-1">
              <StatsSheet components={COMPONENTS.length} commits={ALL_COMMITS.length} />
              <HeadlineSheet />
              <ChartSheet />
            </div>
          </BentoCard>

          <BentoCard tag="Principles" className="md:col-span-2 md:col-start-4 md:row-start-3">
            <ol className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {PRINCIPLES.map((principle, i) => (
                <li key={principle.title} className="flex flex-col gap-1">
                  <p className="flex items-baseline gap-2 text-sm text-(--color-fg)">
                    <Token>{String(i + 1).padStart(2, '0')}</Token>
                    {principle.title}
                  </p>
                  <p className="text-xs leading-relaxed text-(--color-muted) text-pretty short:line-clamp-2">
                    {principle.body}
                  </p>
                </li>
              ))}
            </ol>
          </BentoCard>

          <BentoCard tag="Palette" className="md:col-span-2 md:col-start-6 md:row-start-1">
            <div className="squircle-corners flex h-12 shrink-0 overflow-hidden rounded-md short:h-8 border border-(--color-border)">
              {NEUTRALS.map(({ token }) => (
                <div key={token} className="flex-1" style={{ background: `var(${token})` }} />
              ))}
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 short:gap-y-1.5">
              {[...NEUTRALS, ...STATES].map(({ token, label }) => (
                <div key={token} className="flex min-w-0 items-center gap-2" title={token}>
                  <span
                    aria-hidden="true"
                    className="squircle size-2.5 shrink-0 border border-(--color-border)"
                    style={{ background: `var(${token})` }}
                  />
                  <dt className="truncate text-xs text-(--color-fg)">{label}</dt>
                  <dd className="sr-only">{token}</dd>
                </div>
              ))}
            </dl>
          </BentoCard>

          <BentoCard tag="Type scale" className="md:col-start-6 md:row-span-2 md:row-start-2">
            <ul className="flex flex-1 flex-col justify-between divide-y divide-(--color-border)">
              {TYPE_SCALE.map(({ className, size, name }) => (
                <li key={name} className="flex items-baseline gap-3 py-2 first:pt-0 last:pb-0">
                  <Token className="w-16 shrink-0 whitespace-nowrap">
                    {size} · {name}
                  </Token>
                  <span className={cn(className, 'truncate text-(--color-fg)')}>Fluid</span>
                </li>
              ))}
            </ul>
          </BentoCard>

          <BentoCard tag="Shape" className="md:col-start-7 md:row-start-2">
            <ul className="grid grid-cols-4 gap-2">
              {RADII.map(({ className, label, standard }) => (
                <li key={label} className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      'size-12 border bg-(--color-surface) short:size-10',
                      className,
                      standard ? 'border-(--color-fg)' : 'border-(--color-border)',
                    )}
                  />
                  <Token className={standard ? 'text-(--color-fg)' : undefined}>{label}</Token>
                </li>
              ))}
            </ul>
            <ul className="grid grid-cols-3 gap-2">
              {CORNERS.map(({ className, label }) => (
                <li key={label} className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      'size-10 border border-(--color-border) bg-(--color-surface) short:size-8',
                      className,
                    )}
                  />
                  <Token>{label}</Token>
                </li>
              ))}
            </ul>
          </BentoCard>

          <BentoCard tag="Spacing" className="md:col-start-7 md:row-start-3">
            <ul className="flex flex-col gap-1.5 short:grid short:grid-flow-col short:grid-rows-4 short:gap-x-4 short:gap-y-1">
              {SPACING.map((step) => (
                <li key={step} className="flex items-center gap-3">
                  <Token className="w-10 shrink-0">{step * 4}px</Token>
                  <div
                    className="h-1.5 rounded-xs bg-(--color-border-strong)"
                    style={{ width: `${step * 4}px` }}
                  />
                </li>
              ))}
            </ul>
          </BentoCard>

          <BentoCard
            tag="Motion"
            className="md:col-span-2 md:col-start-8 md:row-span-3 md:row-start-1"
          >
            <MotionTokens />
          </BentoCard>
        </div>
      </HorizontalScroller>
    </div>
  )
}
