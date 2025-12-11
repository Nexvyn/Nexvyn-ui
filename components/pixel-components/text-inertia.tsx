"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(InertiaPlugin, SplitText);

const singleText = "Welcome to Pixel Perfect";

const TextInertia = () => {
  const deltaX = useRef(0);
  const deltaY = useRef(0);

  useEffect(() => {
    let oldX = 0;
    let oldY = 0;

    const handleUpdateDelta = (e: any) => {
      deltaX.current = e.clientX - oldX;
      deltaY.current = e.clientY - oldY;

      oldX = e.clientX;
      oldY = e.clientY;
    };

    window.addEventListener("mousemove", handleUpdateDelta);

    return () => {
      window.removeEventListener("mousemove", handleUpdateDelta);
    };
  }, []);

  useGSAP(() => {
    const textElements = gsap.utils.toArray(".text-inertia");

    textElements.forEach((element: any) => {
      const splitText = new SplitText(element, { type: "words" });
      const words = splitText.words;

      const handleMouseEnter = () => {
        const tl = gsap.timeline();

        words.forEach((word: any) => {
          tl.to(
            word,
            {
              rotation: 0,
              y: 0,
              opacity: 1,
              inertia: {
                x: {
                  velocity: deltaX.current * 20,
                  end: 0,
                },
                y: {
                  velocity: deltaY.current * 20,
                  end: 0,
                },
                rotation: { velocity: (Math.random() - 0.5) * 300, end: 0 },
              },
            },
            0
          );
        });
      };

      element.addEventListener("mouseenter", handleMouseEnter);
    });

    return () => {
      textElements.forEach((element: any) => {
        element.removeEventListener("mouseenter", () => {});
      });
    };
  });

  return (
    <div className="flex justify-center items-center h-screen w-full overflow-hidden bg-black">
      <div className=" text-white text-center">{singleText}</div>
    </div>
  );
};

export default TextInertia;
