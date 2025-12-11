"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Parallax = () => {
  const containerRef = useRef(null);
  const container2 = useRef(null);
  const i1 = useRef(null);
  const i2 = useRef(null);
  const img = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(i1.current, { y: -220, ease: "power2" }, 0);
    tl.to(i2.current, { y: -150, ease: "power2" }, 0);

    gsap.from(img.current, {
      y: -120,
      ease: "linear",
      scrollTrigger: {
        trigger: container2.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <div className="       ">
      <div
        ref={containerRef}
        className=" flex justify-center items-start h-screen w-full  "
      >
        <div className=" relative mt-10 border-2">
          <img
            src="https://cdn.cosmos.so/493d0389-aea0-4144-8cdf-3fdaff93b364.?format=jpeg"
            alt=""
          />
          <img
            ref={i1}
            className=" absolute  bottom-[-20%] right-[50%] w-80"
            src="https://cdn.cosmos.so/e7624081-8784-4096-a44c-b6421e1a2b6f?format=jpeg"
            alt=""
          />
          <img
            ref={i2}
            src="https://cdn.cosmos.so/ba5f8f19-38cd-4da5-a947-46a53c3a7e56?format=jpeg"
            className=" absolute h-56 top-10 right-[-50%]"
            alt=""
          />
        </div>
      </div>
      <div
        ref={container2}
        className=" h-screen w-full flex justify-center items-center "
      >
        <div className="h-96 w-96 overflow-hidden ">
          <img
            ref={img}
            src="https://i.pinimg.com/736x/2a/72/9e/2a729ec22988b2a284a7fdf37f1847fd.jpg"
            alt=""
            className=" object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Parallax;
