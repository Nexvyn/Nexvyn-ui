import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="relative min-h-screen w-full overflow-hidden  px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-16 rounded-2xl">
      <div
        className="absolute bottom-0 left-0 z-0 h-80 w-full"
        style={{
          background:
            "radial-gradient(1920px 100% at 50% 100%, rgba(59, 130, 246, 0.6) 0%, rgba(80, 56, 255, 0.5) 50%, transparent 100%)",
          maskImage:
            "radial-gradient(1920px 100% at 50% 100%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(1920px 100% at 50% 100%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 50%, transparent 100%)",
          opacity: 1,
        }}
      >
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')]",
          }}
        />
      </div>

      {/* Background watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 mx-auto translate-y-[10%] select-none text-center font-bold leading-none tracking-tighter text-black-500/65 lg:text-[240px] text-[140px]">
          Kresna
        </div>
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col gap-6 lg:gap-8 lg:flex-row lg:items-start">
        {/* Left Blue Card */}
        <div className="grain relative flex w-full shrink-0 flex-col justify-between overflow-hidden rounded-3xl sm:rounded-[32px] bg-gradient-to-b from-[#004CFF] to-[#66A3FF] p-6 sm:p-8 lg:h-[500px] lg:w-[380px] lg:p-10">
          <div>
            <div className="mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
              <div className="relative h-12 w-12 sm:h-14 sm:w-14">
                <svg
                  className="h-full w-full"
                  viewBox="0 0 1024 1024"
                  fill="red"
                >
                  <g
                    xmlns="http://www.w3.org/2000/svg"
                    transform="translate(0.000000,900.000000) scale(0.100000,-0.100000)"
                    stroke="none"
                  >
                    <path d="M4561 6274 c-12 -15 -21 -30 -21 -33 0 -4 -9 -17 -20 -29 -11 -12 -26 -38 -33 -59 -9 -27 -20 -39 -42 -46 -49 -16 -95 -52 -131 -104 -19 -26 -40 -57 -48 -68 -9 -12 -17 -55 -20 -105 -6 -94 -15 -126 -77 -250 -23 -46 -44 -102 -46 -125 -3 -22 -13 -58 -23 -80 -54 -123 -75 -165 -82 -165 -4 0 -8 -9 -8 -19 0 -29 -19 -36 -36 -15 -13 17 -14 14 -8 -28 7 -50 -8 -68 -20 -25 l-7 22 -12 -24 c-9 -19 -9 -25 1 -29 17 -5 15 -28 -5 -74 -18 -41 -33 -50 -33 -18 0 24 -15 26 -24 3 -4 -10 -1 -20 9 -25 19 -11 19 -42 0 -58 -8 -7 -15 -20 -15 -30 0 -10 -7 -23 -15 -30 -8 -7 -15 -16 -15 -21 0 -4 -13 -27 -29 -51 -16 -24 -32 -53 -35 -65 -4 -13 -11 -23 -16 -23 -5 0 -10 -10 -12 -22 -2 -17 -13 -25 -41 -31 -21 -5 -41 -17 -44 -26 -4 -9 -15 -29 -26 -44 -19 -22 -73 -72 -120 -112 -129 -109 -142 -122 -156 -157 -18 -41 -2 -80 35 -88 29 -6 173 9 236 24 70 17 208 40 282 47 62 6 74 4 79 -10 3 -9 0 -23 -7 -32 -13 -16 -28 -41 -50 -81 -7 -13 -19 -23 -27 -23 -13 0 -45 -34 -67 -71 -37 -64 -145 -284 -145 -295 0 -8 -4 -14 -10 -14 -5 0 -10 -13 -10 -30 0 -19 -5 -30 -14 -30 -8 0 -19 -12 -25 -27 -18 -43 -48 -100 -101 -190 -60 -102 -140 -266 -140 -287 0 -9 -4 -16 -10 -16 -5 0 -10 -9 -10 -20 0 -11 5 -20 10 -20 15 0 12 -29 -7 -61 -21 -36 -6 -59 20 -32 27 27 83 106 90 126 5 12 13 16 25 13 13 -4 37 12 83 56 35 34 82 73 104 87 23 14 54 38 70 54 16 15 41 27 55 27 34 0 78 31 175 125 23 22 58 51 78 65 26 18 37 32 37 51 0 14 7 48 15 75 9 27 23 72 31 99 23 75 41 118 105 250 31 66 69 146 83 177 36 78 48 88 109 89 29 0 81 6 117 12 51 10 67 18 75 35 8 18 18 22 56 22 37 0 48 4 51 18 5 20 59 32 137 32 20 0 68 7 106 15 82 17 221 20 230 4 5 -7 15 -3 31 11 26 26 71 21 80 -8 3 -9 12 -30 20 -45 7 -16 14 -35 14 -42 0 -14 20 -66 46 -118 8 -16 14 -37 14 -47 0 -10 13 -48 30 -85 23 -50 27 -71 20 -85 -13 -24 -13 -50 0 -50 6 0 10 7 10 15 0 25 17 17 24 -10 4 -17 1 -31 -9 -41 -8 -9 -15 -20 -15 -25 0 -18 -16 -7 -37 27 -13 20 -23 44 -23 53 0 10 -61 42 -115 17z" />
                    <path d="M3900 5050 c0 -11 5 -20 10 -20 6 0 10 9 10 20 0 11 -4 20 -10 20 -5 0 -10 -9 -10 -20z" />
                    <path d="M3840 4950 c0 -19 3 -21 12 -12 9 9 9 15 0 24 -9 9 -12 7 -12 -12z" />
                    <path d="M3777 4846 c-3 -8 -2 -18 3 -21 13 -8 24 15 12 27 -6 6 -11 4 -15 -6z" />
                    <path d="M4620 4158 c0 -23 3 -29 9 -19 8 12 4 51 -5 51 -2 0 -4 -15 -4 -32z" />
                    <path d="M4120 4165 c-10 -12 -10 -15 1 -15 8 0 24 -3 37 -6 18 -5 22 -2 22 15 0 25 -40 30 -60 6z" />
                    <path d="M4645 4090 c-4 -6 0 -21 8 -34 9 -12 17 -36 19 -51 2 -16 9 -30 16 -33 18 -6 16 57 -3 64 -8 4 -15 17 -15 29 0 27 -15 41 -25 25z" />
                  </g>
                </svg>
              </div>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Kresna
              </span>
            </div>

            <svg className="absolute inset-0 h-full w-full opacity-0">
              <defs>
                <filter id="paperFilter">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="2.5"
                    numOctaves="6"
                    stitchTiles="stitch"
                  />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
              </defs>
            </svg>

            {/* Tagline */}
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-semibold leading-tight text-white">
                Smarter sales automation,
              </h2>
              <p className="text-base sm:text-lg text-white/90">
                powered by AI.
              </p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="handjet-stay-in-touch text-lg sm:text-xl text-white">
              Stay in touch!
            </span>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A0A0A] transition-transform hover:scale-110"
              >
                <svg
                  className="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.077.077 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A0A0A] transition-transform hover:scale-110"
              >
                <svg
                  className="h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A0A0A] transition-transform hover:scale-110"
              >
                <Linkedin className="h-5 w-5 text-white" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A0A0A] transition-transform hover:scale-110"
              >
                <Github className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Light Gray Card */}
        <div className="relative w-full rounded-3xl sm:rounded-[32px] bg-[#F7F7F8] p-6 sm:p-8 lg:min-h-[500px] lg:p-12">
          <div className="absolute -right-4 -top-4 hidden lg:block">
            <div className="relative">
              <div className="relative h-28 w-28">
                {/* Neumorphic embossed icon */}
                <div className="absolute inset-0 rounded-3xl bg-[#F7F7F8] shadow-[8px_8px_16px_#d1d1d4,-8px_-8px_16px_#ffffff]">
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    {/* Inner shadow for depth */}
                    <div className="absolute inset-0 rounded-3xl shadow-[inset_2px_2px_4px_rgba(209,209,212,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]" />
                    {/* X shape in center with neumorphic effect */}
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="relative h-14 w-14">
                        <div className="absolute inset-0 rotate-45 rounded-sm border-[3px] border-[#004CFF] shadow-sm" />
                        <div className="absolute inset-0 -rotate-45 rounded-sm border-[3px] border-[#004CFF] shadow-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* "Feeling lucky?" text with soft shadow */}
              <p className="absolute -bottom-6 right-0 font-['Dancing_Script'] text-sm italic text-stone-500 drop-shadow-sm">
                Feeling lucky?
              </p>
            </div>
          </div>

          <div className="flex h-full flex-col justify-between gap-8 sm:gap-10 lg:gap-12">
            {/* Navigation columns */}
            <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:gap-12 lg:gap-16">
              {/* Navigation column */}
              <div className="space-y-4">
                <h3 className="font-['Dancing_Script'] text-lg text-stone-500">
                  Navigation
                </h3>
                <ul className="space-y-3">
                  {[
                    "How it works",
                    "Features",
                    "Pricing",
                    "Testimonials",
                    "FAQ",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-[#1A1A1A] transition-colors hover:text-[#004CFF]"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company column */}
              <div className="space-y-4">
                <h3 className="font-['Dancing_Script'] text-lg text-stone-500">
                  Company
                </h3>
                <ul className="space-y-3">
                  {[
                    "Blog",
                    "About",
                    "Terms and Condition",
                    "Privacy Policy",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-[#1A1A1A] transition-colors hover:text-[#004CFF]"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Subscription section - positioned at bottom right */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <p className="order-2 text-xs text-stone-400 lg:order-1">
                © 2025 Kresna. All rights reserved.
              </p>

              <div className="order-1 flex flex-col gap-4 sm:gap-6 lg:order-2 lg:ml-auto lg:max-w-md">
                <div className="space-y-2">
                  <p className="text-base sm:text-lg text-stone-600">
                    AI moves fast.
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                    Stay ahead with Kresna.
                  </h3>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    className="flex-1 rounded-full border-stone-200 bg-white px-5 sm:px-6 py-5 sm:py-6 text-sm focus-visible:ring-[#004CFF]"
                  />
                  <Button className="rounded-full bg-[#0A0A0A] px-6 sm:px-8 py-5 sm:py-6 text-sm font-medium hover:bg-[#1A1A1A]">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
