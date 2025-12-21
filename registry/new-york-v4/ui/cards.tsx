"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const CardStackAnimate = () => {
  const first = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({})
    const cards = gsap.utils.toArray(".card")

    tl.from(cards, {
      y: "100vh",
      stagger: 1,
      ease: "power3.out",
      duration: 1,
      scrollTrigger: {
        trigger: first.current,
        start: "top top",
        end: "2000",
        scrub: 1,
        pin: true,
      },
    })
  })

  const colors = [
    { name: "Pink", class: "bg-pink-300", link: "/card_animation/pink.png" },
    { name: "Blue", class: "bg-blue-300", link: "/card_animation/blue.png" },
    {
      name: "Yellow",
      class: "bg-yellow-200",
      link: "/card_animation/yellow.png",
    },
    { name: "Green", class: "bg-green-200", link: "/card_animation/green.png" },
    {
      name: "Purple",
      class: "bg-purple-200",
      link: "/card_animation/purple.png",
    },
    {
      name: "Orange",
      class: "bg-orange-200",
      link: "/card_animation/orange.png",
    },
  ]

  return (
    <div className="h-full w-full bg-black">
      <div
        ref={first}
        className="relative flex h-screen w-full items-center justify-center bg-black"
      >
        <div className="text-9xl font-light text-white">HEY GSAPPPPP</div>
        {colors.map((color, i) => (
          <div
            key={i}
            className={`card absolute h-[400px] w-[300px] rounded-3xl shadow-lg ${color.class} overflow-hidden p-4`}
            style={{
              left: `calc(50% + (${i * 70}px - ${(colors.length / 2) * 70}px))`,
              transform: `translateX(-50%) rotate(${(i - colors.length / 2) * 10}deg)`,
            }}
          >
            <div className="flex justify-between">
              <div className="text-xs text-neutral-700">Card {i + 1}</div>
              <div className="text-xs text-neutral-700">Color {color.class}</div>
            </div>
            <img src={color.link} alt={color.name} className="absolute left-0" />
          </div>
        ))}
      </div>
      <div className="flex h-screen w-full items-center justify-center">hi</div>
    </div>
  )
}

export default CardStackAnimate
