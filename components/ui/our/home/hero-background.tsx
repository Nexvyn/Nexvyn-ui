interface HeroBackgroundProps {
  /**
   * Number of vertical gradient stripes to render
   * @default 20
   */
  stripeCount?: number

  /**
   * Overall opacity of the background effect
   * @default 0.5
   */
  opacity?: number

  /**
   * URL path to the noise texture image
   * @default "/backgrounds/noise.png"
   */
  noiseUrl?: string

  /**
   * Additional CSS classes to apply to the container
   */
  className?: string
}

/**
 * HeroBackground Component
 *
 * A dynamic background effect featuring:
 * - Noise texture overlay
 * - Vertical gradient stripes that adapt to light/dark themes
 *
 * @example
 * ```tsx
 * <section className="relative h-screen">
 *   <HeroBackground stripeCount={20} />
 *   <div className="relative z-10">Your content</div>
 * </section>
 * ```
 */
export default function HeroBackground({
  stripeCount = 20,
  opacity = 0.5,
  noiseUrl = "/backgrounds/noise.png",
  className = "",
}: HeroBackgroundProps) {
  return (
    <div className={`absolute inset-0 z-0 flex overflow-hidden ${className}`} style={{ opacity }}>
      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 h-full w-full opacity-[0.2]"
        style={{
          backgroundImage: `url("${noiseUrl}")`,
          backgroundSize: "40%",
          backgroundPosition: "center",
        }}
      />

      {/* Vertical Gradient Stripes */}
      <div className="flex h-full w-full">
        {Array.from({ length: stripeCount }).map((_, i) => (
          <div
            key={i}
            className="h-full min-w-0 flex-1 bg-gradient-to-r from-neutral-100/20 to-transparent shadow-[2px_0px_0px_0px_rgba(0,0,0,0.05)] dark:from-neutral-900/30 dark:to-transparent dark:shadow-[2px_0px_0px_0px_rgba(255,255,255,0.05)]"
          />
        ))}
      </div>
    </div>
  )
}
