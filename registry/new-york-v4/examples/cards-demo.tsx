"use client"

export default function CardsDemo() {
  return (
    <div className="relative h-full min-h-[350px] w-full overflow-hidden rounded-lg bg-black">
      {/* Static preview of the cards layout */}
      <div className="relative flex h-full items-center justify-center py-8">
        <div className="absolute text-4xl font-light text-white/20 md:text-6xl">GSAP Cards</div>
        {[
          { name: "Pink", class: "bg-pink-300" },
          { name: "Blue", class: "bg-blue-300" },
          { name: "Yellow", class: "bg-yellow-200" },
          { name: "Green", class: "bg-green-200" },
          { name: "Purple", class: "bg-purple-200" },
          { name: "Orange", class: "bg-orange-200" },
        ].map((color, i, arr) => (
          <div
            key={i}
            className={`absolute h-[180px] w-[130px] rounded-2xl shadow-lg md:h-[200px] md:w-[150px] ${color.class} p-3`}
            style={{
              left: `calc(50% + (${i * 30}px - ${(arr.length / 2) * 30}px))`,
              transform: `translateX(-50%) rotate(${(i - arr.length / 2) * 8}deg)`,
              zIndex: i,
            }}
          >
            <div className="text-xs font-medium text-neutral-700">Card {i + 1}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
