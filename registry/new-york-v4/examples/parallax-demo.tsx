"use client"

export default function ParallaxDemo() {
  return (
    <div className="relative h-full min-h-[350px] w-full overflow-hidden rounded-lg bg-neutral-400">
      {/* Static preview of the parallax layout */}
      <div className="relative flex h-full items-start justify-center pt-12">
        <div className="relative">
          {/* Main image placeholder */}
          <div className="flex h-[180px] w-[280px] items-center justify-center rounded-lg bg-neutral-600 shadow-xl">
            <span className="text-sm text-white/30">Main Image</span>
          </div>
          {/* Overlay image 1 */}
          <div
            className="absolute flex h-[70px] w-[100px] items-center justify-center rounded-lg bg-neutral-500 shadow-lg"
            style={{
              bottom: "-15%",
              right: "45%",
            }}
          >
            <span className="text-[10px] text-white/30">Layer 1</span>
          </div>
          {/* Overlay image 2 */}
          <div
            className="absolute flex h-[60px] w-[90px] items-center justify-center rounded-lg bg-neutral-700 shadow-lg"
            style={{
              top: "15%",
              right: "-25%",
            }}
          >
            <span className="text-[10px] text-white/30">Layer 2</span>
          </div>
        </div>
      </div>
    </div>
  )
}
