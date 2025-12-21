// "use client";
// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { InertiaPlugin } from "gsap/InertiaPlugin";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(InertiaPlugin);

// const images = [
//   "https://i.pinimg.com/736x/63/5b/b8/635bb894b77cf88c78873aa43f02150e.jpg",
//   "https://i.pinimg.com/736x/1b/15/f2/1b15f21748612520d08c90c1b883627e.jpg",
//   "https://i.pinimg.com/736x/5e/31/d0/5e31d02ecfe0fed9c4e7767ebb86fe77.jpg",
//   "https://i.pinimg.com/736x/1d/66/96/1d669647743a55264389471098adc3bf.jpg",
//   "https://i.pinimg.com/736x/f4/3c/9f/f43c9f0f5bf4a70df07fa31d307ba48e.jpg",
//   "https://i.pinimg.com/1200x/ed/14/71/ed14717f99c678ffd75ba46df2245aa9.jpg",
//   "https://i.pinimg.com/736x/87/b2/d5/87b2d5a8653c7d06d7f3b5df5ad75bbf.jpg",
//   "https://i.pinimg.com/736x/69/25/2a/69252a688a59bcd684e43eb06a5629da.jpg",
//   "https://i.pinimg.com/736x/2a/eb/7c/2aeb7cbaeb168fe023d36a5b13485e9c.jpg",
// ];

// const InertiaCards = () => {
//   const deltaX = useRef(0);
//   const deltaY = useRef(0);

//   useEffect(() => {
//     let oldX = 0;
//     let oldY = 0;

//     const handleUpdateDelta = (e: any) => {
//       deltaX.current = e.clientX - oldX;
//       deltaY.current = e.clientY - oldY;

//       oldX = e.clientX;
//       oldY = e.clientY;
//     };

//     window.addEventListener("mousemove", handleUpdateDelta);

//     return () => {
//       window.removeEventListener("mousemove", handleUpdateDelta);
//     };
//   }, []);

//   useGSAP(() => {
//     const cards = gsap.utils.toArray(".cards");

//     const handleMouseEnter = (e) => {
//       const tl = gsap.timeline();
//       tl.to(e.currentTarget, {
//         rotation: 0,
//         inertia: {
//           x: {
//             velocity: deltaX.current * 20,
//             end: 0,
//           },
//           y: {
//             velocity: deltaY.current * 20,
//             end: 0,
//           },
//           rotation: { velocity: (Math.random() - 0.5) * 300, end: 0 }, // rotation inertia
//         },
//       });
//     };

//     cards.forEach((card: any) => {
//       card.addEventListener("mouseenter", (e: any) => {
//         handleMouseEnter(e);
//       });
//     });

//     return () => {
//       cards.forEach((card: any) => {
//         card.removeEventListener("mouseenter", handleMouseEnter);
//       });
//     };
//   });

//   return (
//     <div className="flex justify-center items-center h-screen w-full overflow-hidden">
//       <div className="grid grid-cols-3 gap-4">
//         {images.map((src, index) => (
//           <img
//             key={index}
//             className="cards w-52 h-52 rounded-3xl object-cover object-top will-change-transform"
//             src={src}
//             alt={`Inertia Card ${index}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InertiaCards;
