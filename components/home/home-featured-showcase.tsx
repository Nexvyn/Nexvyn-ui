'use client'
import { cn } from '@/lib/utils'
import { HomeShowcaseGrid, HomeShowcaseRow, homeShowcaseColSpan } from './home-showcase-grid'
import { HomeShowcasePanel } from './home-showcase-panel'
import { blueprintPreviews } from '@/components/showcase/preview-map'

// REAL NEXVYN COMPONENTS — not placeholders
import { DiaText } from '@/components/ui/dia-text'
import { NavigationCompass } from '@/components/illustration/navigation-compass'
import { LINKS as COMPASS_LINKS } from '@/components/ui/previews/navigation-compass-preview'
import { ColorPickerPreview } from '@/components/ui/previews/color-picker-preview'
import { FaderPreview } from '@/components/ui/previews/fader-preview'

const CompassBlueprint = blueprintPreviews['navigation-compass-blueprint']
const ColorPickerBlueprint = blueprintPreviews['color-picker-blueprint']
const FaderBlueprint = blueprintPreviews['fader-blueprint']
const DiaTextBlueprint = blueprintPreviews['dia-text-blueprint']

export function HomeFeaturedShowcase() {
  return (
    <section
      aria-labelledby="home-featured-showcase-heading"
      className="mt-24 overflow-visible sm:mt-32"
    >
      <h2
        id="home-featured-showcase-heading"
        className="mx-auto max-w-[18ch] text-center font-light text-[clamp(0.9rem,3.4vw,1.85rem)] tracking-[-0.07em] sm:max-w-none sm:whitespace-nowrap"
        style={{ color: 'var(--color-fg)' }}
      >
        Every component, live and ready to explore.
      </h2>

      <HomeShowcaseGrid className="mt-8 sm:mt-10">
        {/* Row 1: Navigation Compass (6) | Blossom Picker (6) */}
        <HomeShowcaseRow columnWeights={[6, 6]}>
          <HomeShowcasePanel
            className={cn(homeShowcaseColSpan[6], 'min-h-[240px] md:min-h-[280px]')}
            lens
            href="/components/navigation-compass"
            title="Navigation Compass"
            diagram={<CompassBlueprint />}
          >
            <div
              className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
              style={{ width: 'min(72vw, 512px)', height: 'min(72vw, 512px)' }}
            >
              <NavigationCompass
                links={COMPASS_LINKS}
                activeZoneAngle={75}
                roseRotation={30}
                transparentFace
                scrollTracking={false}
                className="size-full"
              />
            </div>
          </HomeShowcasePanel>
          <HomeShowcasePanel
            className={cn(homeShowcaseColSpan[6], 'min-h-[240px] md:min-h-[280px]')}
            lens
            href="/components/color-picker"
            title="Blossom Picker"
            diagram={<ColorPickerBlueprint />}
          >
            <ColorPickerPreview />
          </HomeShowcasePanel>
        </HomeShowcaseRow>

        {/* Row 2: Fader (7) | Dia Text (5) */}
        <HomeShowcaseRow columnWeights={[7, 5]}>
          <HomeShowcasePanel
            className={cn(homeShowcaseColSpan[7], 'min-h-[180px] md:min-h-[220px]')}
            lens
            href="/components/fader"
            title="Fader"
            diagram={<FaderBlueprint />}
          >
            <FaderPreview />
          </HomeShowcasePanel>
          <HomeShowcasePanel
            className={cn(homeShowcaseColSpan[5], 'min-h-[180px] md:min-h-[220px]')}
            lens
            href="/components/dia-text"
            title="Dia Text"
            diagram={<DiaTextBlueprint />}
          >
            <div className="w-full px-4 text-center">
              <div
                className="text-center text-2xl font-light tracking-tight sm:text-3xl"
                style={{ color: 'var(--color-fg)' }}
              >
                Make interfaces feel{' '}
                <DiaText
                  variant="sweep"
                  repeat
                  repeatDelay={1}
                  once={false}
                  className="inline-block font-medium"
                >
                  {['smooth.', 'focused.', 'refined.']}
                </DiaText>
              </div>
            </div>
          </HomeShowcasePanel>
        </HomeShowcaseRow>
      </HomeShowcaseGrid>
    </section>
  )
}
