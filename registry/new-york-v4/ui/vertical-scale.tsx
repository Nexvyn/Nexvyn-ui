export function VerticalScale() {
  // Generate tick marks - small ticks every unit, larger ticks every 5 units
  const totalTicks = 50
  const ticks = Array.from({ length: totalTicks }, (_, i) => ({
    index: i,
    isLarge: i % 5 === 0,
  }))

  return (
    <div className="fixed top-0 right-0 h-full w-12 border-l border-gray-200 bg-white">
      {/* Tick marks container */}
      <div className="relative h-full w-full">
        {ticks.map((tick) => (
          <div
            key={tick.index}
            className="absolute right-0 border-t border-gray-400"
            style={{
              top: `${(tick.index / totalTicks) * 100}%`,
              width: tick.isLarge ? "16px" : "8px",
              borderWidth: tick.isLarge ? "1.5px" : "1px",
            }}
          />
        ))}

        {/* Yellow marker - positioned roughly in the middle */}
        <div
          className="absolute right-0 bg-yellow-400"
          style={{
            top: "48%",
            width: "20px",
            height: "8px",
          }}
        />
      </div>
    </div>
  )
}
