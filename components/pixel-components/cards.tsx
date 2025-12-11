"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CardStackAnimate = () => {
  const first = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({});
    const cards = gsap.utils.toArray(".card");

    tl.from(cards, {
      y: "100vh",
      stagger: 1,
      ease: "power3.out",
      duration: 1,

      scrollTrigger: {
        trigger: first.current,
        start: "top top",
        end: "3000",
        scrub: 1,
        pin: true,
      },
    });
  });

  const colors = [
    { name: "Pink", class: "bg-pink-300" },
    { name: "Blue", class: "bg-blue-300" },
    {
      name: "Yellow",
      class: "bg-yellow-200",
      link: "/card_animation/yellow.png",
    },
    { name: "Green", class: "bg-green-200" },
    {
      name: "Purple",
      class: "bg-purple-200",
    },
    {
      name: "Orange",
      class: "bg-orange-200",
    },
  ];

  return (
    <div className="w-full h-full  ">
      <div
        ref={first}
        className="h-screen w-full flex items-center justify-center relative"
      >
        <div className=" text-white text-xl  font-pixelify">Pixel Perfect</div>
        {colors.map((color, i) => (
          <div
            key={i}
            className={`card absolute h-[400px] w-[300px] rounded-3xl shadow-lg ${color.class} p-4 overflow-hidden
            `}
            style={{
              left: `calc(50% + (${i * 70}px - ${(colors.length / 2) * 70}px))`, // offset X
              transform: `translateX(-50%) rotate(${
                (i - colors.length / 2) * 10
              }deg)`, // fan out rotation
            }}
          >
            <div className=" flex justify-between">
              <div className="text-neutral-700 text-xs">Card {i + 1}</div>
              <div className="text-neutral-700 text-xs">
                Color {color.class}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardStackAnimate;
