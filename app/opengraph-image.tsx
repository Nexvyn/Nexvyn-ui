import { ImageResponse } from 'next/og'

export const alt = 'Nexvyn/UI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const ACCENT = '#7AA7C7'
const FG = '#0a0a0a'

const PIXELS = [
  { x: 1040, y: 520, color: FG, opacity: 0.08 },
  { x: 1080, y: 480, color: FG, opacity: 0.06 },
  { x: 1120, y: 520, color: ACCENT, opacity: 0.14 },
  { x: 1080, y: 560, color: FG, opacity: 0.05 },
  { x: 1000, y: 560, color: ACCENT, opacity: 0.1 },
  { x: 1120, y: 440, color: FG, opacity: 0.04 },
  { x: 80, y: 120, color: ACCENT, opacity: 0.1 },
  { x: 120, y: 80, color: FG, opacity: 0.05 },
  { x: 160, y: 120, color: FG, opacity: 0.07 },
  { x: 120, y: 160, color: ACCENT, opacity: 0.08 },
] as const

async function loadCaveatFont() {
  const css = await fetch('https://fonts.googleapis.com/css2?family=Caveat:wght@400', {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/533.21 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
    },
  }).then((res) => res.text())

  const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)
  if (!match?.[1]) {
    throw new Error('Failed to load Caveat font')
  }

  return fetch(match[1]).then((res) => res.arrayBuffer())
}

export default async function Image() {
  const caveat = await loadCaveatFont()

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          {PIXELS.map((pixel, index) => (
            <rect
              key={index}
              x={pixel.x}
              y={pixel.y}
              width="28"
              height="28"
              fill={pixel.color}
              opacity={pixel.opacity}
            />
          ))}
        </svg>

        <div
          style={{
            fontFamily: 'Caveat',
            fontSize: 128,
            color: ACCENT,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          Nexvyn/UI
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Caveat',
          data: caveat,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}