export default function LogoCloud() {
  const logos = [
    {
      src: "/logo/cloud/react.svg",
      alt: "React Logo",
      name: "React",
      showName: true,
      width: "w-8",
    },
    {
      src: "/logo/cloud/nextdotjs.svg",
      alt: "Next.js Logo",
      name: "Next.js",
      showName: true,
      width: "w-8",
    },
    {
      src: "/logo/cloud/tailwindcss.svg",
      alt: "Tailwind CSS Logo",
      name: "Tailwind",
      showName: true,
      width: "w-8",
    },
    {
      src: "/logo/cloud/framer.svg",
      alt: "Framer Logo",
      name: "Framer",
      showName: true,
      width: "w-8",
    },
    {
      src: "/logo/cloud/gsap.svg",
      alt: "GSAP Logo",
      name: "GSAP",
      showName: false,
      width: "w-12",
    },
    {
      src: "/logo/cloud/remix.svg",
      alt: "Remix Logo",
      name: "Remix",
      showName: true,
      width: "w-6",
    },
  ]

  return (
    <section className="mt-10 overflow-hidden">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-center md:flex-row">
          <div className="relative flex w-[90vw] justify-center gap-10 py-6">
            {logos.map((logo, index) => (
              <div key={index} className="text-muted-foreground flex items-center gap-3">
                <img
                  className={`mx-auto w-8 sm:${logo.width} opacity-30 dark:invert`}
                  src={logo.src}
                  alt={logo.alt}
                />
                {logo.showName && <span className="text-xs sm:text-sm">{logo.name}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
