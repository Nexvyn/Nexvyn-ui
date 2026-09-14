'use client'
import { cn } from '@/lib/utils'
import { HomeShowcaseGrid, HomeShowcaseRow, homeShowcaseColSpan } from './home-showcase-grid'
import { HomeShowcasePanel } from './home-showcase-panel'
import { blueprintPreviews } from '@/components/showcase/preview-map'

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
        className="mx-auto text-center text-balance font-light text-xl sm:text-2xl md:text-3xl tracking-tight text-(--color-fg)"
      >
        Every component, live and ready to explore.
      </h2>

      <HomeShowcaseGrid className="mt-8 sm:mt-10">
        <HomeShowcaseRow columnWeights={[6, 6]}>
          <HomeShowcasePanel
            className={cn(homeShowcaseColSpan[6], 'min-h-60 md:min-h-70')}
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
            className={cn(homeShowcaseColSpan[6], 'min-h-60 md:min-h-70')}
            lens
            href="/components/color-picker"
            title="Blossom Picker"
            diagram={<ColorPickerBlueprint />}
          >
            <ColorPickerPreview />
          </HomeShowcasePanel>
        </HomeShowcaseRow>

        <HomeShowcaseRow columnWeights={[7, 5]}>
          <HomeShowcasePanel
            className={cn(homeShowcaseColSpan[7], 'min-h-45 md:min-h-55')}
            lens
            href="/components/fader"
            title="Fader"
            diagram={<FaderBlueprint />}
          >
            <FaderPreview />
          </HomeShowcasePanel>
          <HomeShowcasePanel
            className={cn(homeShowcaseColSpan[5], 'min-h-45 md:min-h-55')}
            lens
            href="/components/dia-text"
            title="Dia Text"
            diagram={<DiaTextBlueprint />}
          >
            <div className="w-full px-4 text-center">
              <div className="text-center text-2xl font-light tracking-tight text-(--color-fg) sm:text-3xl">
                Make interfaces feel{' '}
                <DiaText
                  variant="sweep"
                  repeat
                  repeatDelay={1}
                  once={false}
                  className="inline-block font-normal"
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
