import { copyFileSync, writeFileSync } from 'node:fs'
import { ImageResponse } from 'next/og'
import type { CSSProperties, ReactElement, ReactNode } from 'react'

const size = { width: 1200, height: 630 }
const OUTPUT = 'app/opengraph-image.png'
const TWITTER_OUTPUT = 'app/twitter-image.png'

const ACCENT = '#7AA7C7'
const FG = '#0a0a0a'
const BG = '#ffffff'
const INK = '#4b4b55'
const TEXT = '#3f3f46'
const MUTED = '#80848f'
const FAINT = '#a1a1aa'
const LINE = `1.5px solid ${INK}`

type Corner = 'tl' | 'tr' | 'bl' | 'br'

const CORNER_POS: Record<Corner, CSSProperties> = {
  tl: { top: -3, left: -3 },
  tr: { top: -3, right: -3 },
  bl: { bottom: -3, left: -3 },
  br: { bottom: -3, right: -3 },
}

interface FrameProps {
  children: ReactNode
  label?: string
  labelAt?: 'top' | 'bottom'
  handles?: Corner[]
  padding?: CSSProperties['padding']
}

function Frame({
  children,
  label,
  labelAt = 'bottom',
  handles = ['tl', 'tr', 'bl', 'br'],
  padding = 5,
}: FrameProps) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        padding,
        border: `1px dashed ${ACCENT}`,
      }}
    >
      {handles.map((corner) => (
        <div
          key={corner}
          style={{
            position: 'absolute',
            width: 5,
            height: 5,
            border: `1px solid ${ACCENT}`,
            backgroundColor: BG,
            ...CORNER_POS[corner],
          }}
        />
      ))}
      {label ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            [labelAt]: -15,
            display: 'flex',
            justifyContent: 'center',
            fontSize: 9,
            color: FAINT,
          }}
        >
          {label}
        </div>
      ) : null}
      {children}
    </div>
  )
}

function Pill({ width, children }: { width: number; children: ReactNode }) {
  return (
    <div
      style={{
        width,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: LINE,
        borderRadius: 18,
        backgroundColor: BG,
        fontSize: 13,
        color: MUTED,
      }}
    >
      {children}
    </div>
  )
}

function EmailInput() {
  return (
    <div
      style={{
        width: 196,
        height: 34,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        border: LINE,
        borderRadius: 18,
        backgroundColor: BG,
        fontSize: 14,
        color: TEXT,
      }}
    >
      Email...
    </div>
  )
}

function Switch() {
  return (
    <div
      style={{
        position: 'relative',
        width: 68,
        height: 34,
        display: 'flex',
        border: LINE,
        borderRadius: 18,
        backgroundColor: BG,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 3,
          right: 3,
          width: 25,
          height: 25,
          border: LINE,
          borderRadius: 14,
          backgroundImage: `repeating-linear-gradient(45deg, ${FAINT} 0 1px, transparent 1px 4px)`,
        }}
      />
    </div>
  )
}

function Radio({ checked }: { checked?: boolean }) {
  return (
    <div
      style={{
        width: 18,
        height: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: LINE,
        borderRadius: 10,
      }}
    >
      {checked ? (
        <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: INK }} />
      ) : null}
    </div>
  )
}

function RadioGroup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '4px 6px' }}>
      {['Standard', 'Express'].map((option, index) => (
        <div key={option} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Radio checked={index === 0} />
          <div style={{ fontSize: 13, color: MUTED }}>{option}</div>
        </div>
      ))}
    </div>
  )
}

function Slider({ width, value }: { width: number; value: number }) {
  const thumb = Math.round((width - 18) * (value / 100))
  return (
    <div style={{ position: 'relative', width, height: 24, display: 'flex' }}>
      <div
        style={{
          position: 'absolute',
          top: 11,
          left: 0,
          right: 0,
          height: 2,
          borderRadius: 2,
          backgroundColor: INK,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 2,
          left: thumb,
          width: 18,
          height: 18,
          border: LINE,
          borderRadius: 10,
          backgroundColor: BG,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -20,
          left: thumb - 5,
          display: 'flex',
          padding: '1px 5px',
          border: `1.2px solid ${INK}`,
          borderRadius: 4,
          backgroundColor: BG,
          fontSize: 10,
          color: TEXT,
        }}
      >
        {value}
      </div>
    </div>
  )
}

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <path d="M2 3.5 L5 6.5 L8 3.5" fill="none" stroke={MUTED} strokeWidth="1.5" />
    </svg>
  )
}

function Select() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div
        style={{
          width: 120,
          height: 26,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px',
          border: LINE,
          borderRadius: 4,
          backgroundColor: BG,
          fontSize: 10,
          color: TEXT,
        }}
      >
        Select
        <Chevron />
      </div>
      <div
        style={{
          width: 120,
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
          padding: '6px 8px',
          border: LINE,
          borderRadius: 4,
          backgroundColor: BG,
          fontSize: 9,
          color: MUTED,
        }}
      >
        <div>Option 1</div>
        <div>Option 2</div>
        <div>Option 3</div>
      </div>
    </div>
  )
}

function Card() {
  return (
    <div
      style={{
        width: 150,
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
        padding: '10px 12px',
        border: LINE,
        borderRadius: 8,
        backgroundColor: BG,
      }}
    >
      <div style={{ fontSize: 10, color: TEXT }}>User profile</div>
      <div style={{ fontSize: 9, lineHeight: '13px', color: MUTED }}>
        Manage your account preferences here.
      </div>
      <div
        style={{
          alignSelf: 'flex-end',
          display: 'flex',
          padding: '3px 12px',
          border: `1.2px solid ${INK}`,
          borderRadius: 4,
          fontSize: 8,
          color: TEXT,
        }}
      >
        Save
      </div>
    </div>
  )
}

function Checkbox() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div style={{ width: 22, height: 22, border: LINE, borderRadius: 4 }} />
      <div style={{ fontSize: 18, color: FAINT }}>Checkbox</div>
    </div>
  )
}

function Stepper() {
  return (
    <div
      style={{
        width: 176,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: LINE,
        borderRadius: 6,
        backgroundColor: BG,
      }}
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 10px',
          borderRight: LINE,
          fontSize: 13,
          color: MUTED,
        }}
      >
        Compact
        <div style={{ width: 4, height: 16, border: `1.2px solid ${INK}`, borderRadius: 2 }} />
      </div>
      <div style={{ paddingRight: 12, fontSize: 15, color: MUTED }}>30</div>
    </div>
  )
}

function Tooltip() {
  return (
    <div
      style={{
        width: 128,
        height: 34,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: LINE,
        borderRadius: 5,
        backgroundColor: BG,
        fontSize: 12,
        color: MUTED,
      }}
    >
      Tooltip
    </div>
  )
}

const RAIL_W = 390
const SLOT = { width: 260, height: 160 }

const PIECES = {
  email: () => (
    <Frame label="200">
      <EmailInput />
    </Frame>
  ),
  button: () => (
    <Frame label="108">
      <Pill width={104}>Button</Pill>
    </Frame>
  ),
  card: () => (
    <Frame label="150">
      <Card />
    </Frame>
  ),
  switch: () => (
    <Frame label="70" labelAt="top">
      <Switch />
    </Frame>
  ),
  tooltip: () => (
    <Frame>
      <Tooltip />
    </Frame>
  ),
  radio: () => (
    <Frame label="120" labelAt="top" padding="6px 8px">
      <RadioGroup />
    </Frame>
  ),
  select: () => <Select />,
  stepper: () => (
    <Frame label="180" labelAt="top" padding={4}>
      <Stepper />
    </Frame>
  ),
  slider: () => (
    <Frame padding="22px 10px 8px" handles={['tl', 'tr']}>
      <Slider width={130} value={35} />
    </Frame>
  ),
  checkbox: () => <Checkbox />,
} satisfies Record<string, () => ReactElement>

interface RailPiece {
  piece: keyof typeof PIECES
  x: number
  y: number
  scale: number
  opacity: number
}

const LEFT_PIECES: RailPiece[] = [
  { piece: 'email', x: 18, y: 8, scale: 0.78, opacity: 0.45 },
  { piece: 'slider', x: 58, y: 16, scale: 0.8, opacity: 0.35 },
  { piece: 'checkbox', x: 22, y: 24, scale: 0.85, opacity: 0.45 },
  { piece: 'button', x: 62, y: 32, scale: 0.82, opacity: 0.32 },
  { piece: 'switch', x: 8, y: 40, scale: 0.9, opacity: 0.55 },
  { piece: 'tooltip', x: 48, y: 47, scale: 0.82, opacity: 0.3 },
  { piece: 'select', x: 84, y: 55, scale: 0.8, opacity: 0.2 },
  { piece: 'radio', x: 26, y: 59, scale: 0.8, opacity: 0.38 },
  { piece: 'card', x: 62, y: 72, scale: 0.78, opacity: 0.28 },
  { piece: 'stepper', x: 8, y: 77, scale: 0.84, opacity: 0.55 },
  { piece: 'button', x: 44, y: 88, scale: 0.8, opacity: 0.32 },
  { piece: 'switch', x: 12, y: 95, scale: 0.8, opacity: 0.42 },
]

const RIGHT_PIECES: RailPiece[] = [
  { piece: 'tooltip', x: 82, y: 8, scale: 0.8, opacity: 0.45 },
  { piece: 'slider', x: 44, y: 16, scale: 0.8, opacity: 0.35 },
  { piece: 'email', x: 80, y: 24, scale: 0.82, opacity: 0.45 },
  { piece: 'stepper', x: 38, y: 32, scale: 0.8, opacity: 0.32 },
  { piece: 'radio', x: 92, y: 41, scale: 0.88, opacity: 0.55 },
  { piece: 'button', x: 52, y: 47, scale: 0.82, opacity: 0.3 },
  { piece: 'select', x: 16, y: 56, scale: 0.8, opacity: 0.2 },
  { piece: 'card', x: 72, y: 62, scale: 0.8, opacity: 0.38 },
  { piece: 'checkbox', x: 36, y: 70, scale: 0.8, opacity: 0.28 },
  { piece: 'switch', x: 94, y: 77, scale: 0.86, opacity: 0.55 },
  { piece: 'email', x: 56, y: 85, scale: 0.8, opacity: 0.32 },
  { piece: 'button', x: 86, y: 94, scale: 0.8, opacity: 0.42 },
]

function Rail({ side, pieces }: { side: 'left' | 'right'; pieces: RailPiece[] }) {
  const offset = side === 'left' ? 0 : size.width - RAIL_W

  return (
    <>
      {pieces.map(({ piece, x, y, scale, opacity }, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: offset + (x / 100) * RAIL_W - SLOT.width / 2,
            top: (y / 100) * size.height - SLOT.height / 2,
            width: SLOT.width,
            height: SLOT.height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', flexShrink: 0, transform: `scale(${scale})`, opacity }}>
            {PIECES[piece]()}
          </div>
        </div>
      ))}
    </>
  )
}

function Fade({ style, direction }: { style: CSSProperties; direction: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        backgroundImage: `linear-gradient(${direction}, rgba(255,255,255,0), ${BG})`,
        ...style,
      }}
    />
  )
}

async function loadGoogleFont(family: string, weight: number) {
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/533.21 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
    },
  }).then((res) => res.text())

  const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)
  if (!match?.[1]) {
    throw new Error(`Failed to load ${family} font`)
  }

  return fetch(match[1]).then((res) => res.arrayBuffer())
}

async function renderImage() {
  const instrumentSans = await loadGoogleFont('Instrument+Sans', 400)

  return new ImageResponse(
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: BG,
        fontFamily: 'Instrument Sans',
      }}
    >
      {Rail({ side: 'left', pieces: LEFT_PIECES })}
      {Rail({ side: 'right', pieces: RIGHT_PIECES })}
      <Fade
        direction="to right"
        style={{ top: 0, left: RAIL_W * 0.7, width: RAIL_W * 0.3, height: size.height }}
      />
      <Fade
        direction="to left"
        style={{ top: 0, left: size.width - RAIL_W, width: RAIL_W * 0.3, height: size.height }}
      />
      <Fade
        direction="to bottom"
        style={{ top: size.height * 0.76, left: 0, width: size.width, height: size.height * 0.24 }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 88,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: FG,
        }}
      >
        Nexvyn/UI
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: 'Instrument Sans', data: instrumentSans, style: 'normal', weight: 400 }],
    },
  )
}

async function main() {
  const image = await renderImage()
  writeFileSync(OUTPUT, Buffer.from(await image.arrayBuffer()))
  copyFileSync(OUTPUT, TWITTER_OUTPUT)
  console.log(`Wrote ${OUTPUT} and ${TWITTER_OUTPUT}`)
}

main()
