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

  const images = [
    "https://cdn.cosmos.so/9beb0a06-e008-4b95-a5b8-15c2d255a4c4?format=jpeg",
    "https://cdn.cosmos.so/6a854a1b-5c06-45b1-b055-4a4652ba4e21?format=jpeg",
    "https://cdn.cosmos.so/3c35a1b1-717b-4219-9282-881a762724f2?format=jpeg",
    "https://cdn.cosmos.so/8a6998b4-fce7-48c4-b40c-9b90bcf0007c?format=jpeg",
    "https://cdn.cosmos.so/f798acc8-6bc8-4f2c-ace2-2440f2be4795?format=jpeg",
    "https://cdn.cosmos.so/39a80b7b-29fb-4079-a251-176df0fa15eb?format=jpeg",
    "https://cdn.cosmos.so/dfa2ba1c-97b6-44ba-a68b-7c619c9d416b?format=jpeg",
    "https://cdn.cosmos.so/97de8d7c-f9c0-4625-838f-3aaf8c286cdb?format=jpeg",
    "https://cdn.cosmos.so/71e10d8f-c92d-4761-96ce-4b6cc9eedcbe?format=jpeg",
    "https://cdn.cosmos.so/0cff1394-f353-4c9e-87f7-37c63d165bf9?format=jpeg",
    "https://cdn.cosmos.so/15a7b84c-ba74-470f-8813-25eb0a0d8ba2?format=jpeg",
  ]

  return (
    <div className="h-full w-full bg-background">
      <div
        ref={first}
        className="relative flex h-screen w-full items-center justify-center bg-background"
      >
        <div className="text-9xl font-light text-foreground">Hey Nexvyn</div>
        {images.map((src, i) => (
          <div
            key={i}
            className="card absolute h-[400px] w-[300px] overflow-hidden rounded-3xl shadow-lg"
            style={{
              left: `calc(50% + (${i * 70}px - ${(images.length / 2) * 70}px))`,
              transform: `translateX(-50%) rotate(${(i - images.length / 2) * 10}deg)`,
            }}
          >
            <img
              src={src}
              alt={`Card ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="flex h-screen w-full items-center justify-center bg-background text-9xl font-light text-foreground">END</div>
    </div>
  )
}

export default CardStackAnimate
