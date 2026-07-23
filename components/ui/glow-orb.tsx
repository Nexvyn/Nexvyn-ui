'use client'

import { useEffect, useLayoutEffect, useRef, type AriaAttributes, type CSSProperties } from 'react'
import { useReducedMotion } from 'motion/react'
import { useCssColorRgb } from '@/lib/hooks/use-css-color-rgb'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export type OrbState = 'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking' | 'error'

type DataAttributeValue = string | number | boolean | null | undefined

export interface OrbHtmlAttributes extends AriaAttributes {
  id?: string
  title?: string
  role?: string
  tabIndex?: number
  [dataAttribute: `data-${string}`]: DataAttributeValue
}

export interface GlowOrbProps extends OrbHtmlAttributes {
  state: OrbState
  volume: number
  size: number
  className?: string
  style?: CSSProperties
  disabled?: boolean
  interactive?: boolean
  onClick?: () => void
}

type RGB = [number, number, number]

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.55;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 c = uv - 0.5;
  float r = length(c);
  float t = u_time;

  // fake sphere depth: 1 at center, 0 at rim
  float z = sqrt(max(1.0 - dot(c, c) * 4.0, 0.0));

  // wrap the cloud field around the sphere and drift it sideways
  vec2 drift = vec2(t * 0.35, -t * 0.16);
  vec2 p = c * (2.4 + (1.0 - z) * 1.6) + drift;

  // domain-warped fbm = soft billowing clouds
  vec2 q = vec2(fbm(p + t * 0.12), fbm(p + vec2(4.7, 2.3) - t * 0.09));
  float clouds = fbm(p * 1.6 + 1.4 * q);

  vec3 sky = u_color;
  vec3 skyLight = mix(u_color, vec3(1.0), 0.55);
  vec3 cloud = vec3(0.99, 1.0, 1.0);

  vec3 col = mix(sky, skyLight, smoothstep(0.30, 0.60, clouds));
  col = mix(col, cloud, smoothstep(0.56, 0.84, clouds));

  // spherical shading: brighter center/top, softly darker rim
  col *= 0.74 + 0.26 * z;
  col += (0.5 - uv.y) * -0.10 * z;
  col = clamp(col, 0.0, 1.0);

  float edge = smoothstep(0.5, 0.485, r);

  gl_FragColor = vec4(col * edge, edge);
}
`

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    if (log) console.error('[glow-orb] shader compile failed:', log)
    gl.deleteShader(shader)
    return null
  }
  return shader
}

interface FluidOrbProps {
  size: number
  colorRgb: RGB
  speed: number
}

function FluidOrb({ size, colorRgb, speed }: FluidOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef(colorRgb)
  const speedRef = useRef(speed)
  const redrawRef = useRef<(() => void) | null>(null)

  useIsomorphicLayoutEffect(() => {
    colorRef.current = colorRgb
    speedRef.current = speed
    redrawRef.current?.()
  }, [colorRgb, speed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { antialias: true, alpha: true })
    if (!gl) return

    const program = gl.createProgram()
    const vert = compileShader(gl, gl.VERTEX_SHADER, VERT)
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!program || !vert || !frag) return

    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(program)
      if (log) console.error('[glow-orb] program link failed:', log)
      return
    }
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const aPos = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uColor = gl.getUniformLocation(program, 'u_color')

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const px = Math.round(size * dpr)
    canvas.width = px
    canvas.height = px
    gl.viewport(0, 0, px, px)
    gl.uniform2f(uResolution, px, px)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let phase = 0
    let last = performance.now()
    let curSpeed = speedRef.current
    let curColor: RGB = [
      colorRef.current[0] / 255,
      colorRef.current[1] / 255,
      colorRef.current[2] / 255,
    ]

    const draw = () => {
      gl.uniform3f(uColor, curColor[0], curColor[1], curColor[2])
      gl.uniform1f(uTime, phase)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    if (reduce) {
      draw()
      redrawRef.current = () => {
        curColor = [
          colorRef.current[0] / 255,
          colorRef.current[1] / 255,
          colorRef.current[2] / 255,
        ]
        draw()
      }
    } else {
      const render = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.1)
        last = now

        curSpeed += (speedRef.current - curSpeed) * 0.05
        phase += dt * curSpeed

        const target: RGB = [
          colorRef.current[0] / 255,
          colorRef.current[1] / 255,
          colorRef.current[2] / 255,
        ]
        curColor = [
          curColor[0] + (target[0] - curColor[0]) * 0.05,
          curColor[1] + (target[1] - curColor[1]) * 0.05,
          curColor[2] + (target[2] - curColor[2]) * 0.05,
        ]

        draw()
        raf = requestAnimationFrame(render)
      }
      raf = requestAnimationFrame(render)
    }

    return () => {
      redrawRef.current = null
      cancelAnimationFrame(raf)
      gl.deleteProgram(program)
      gl.deleteShader(vert)
      gl.deleteShader(frag)
      gl.deleteBuffer(buffer)
    }
  }, [size])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

const STATE_COLOR_TOKEN: Record<OrbState, 'accent' | 'destructive'> = {
  idle: 'accent',
  connecting: 'accent',
  listening: 'accent',
  thinking: 'accent',
  speaking: 'accent',
  error: 'destructive',
}

const FALLBACK_ACCENT: RGB = [47, 124, 246]
const FALLBACK_DESTRUCTIVE: RGB = [232, 80, 80]

const STATE_SPEED: Record<OrbState, number> = {
  idle: 0.15,
  connecting: 0.3,
  listening: 0.5,
  thinking: 0.7,
  speaking: 1.1,
  error: 0.08,
}

const KEYFRAMES = `
@keyframes orb-circle-thinking-wave {
  0%   { transform: scale(1); }
  25%  { transform: scale(1.03); }
  50%  { transform: scale(0.97); }
  75%  { transform: scale(1.02); }
  100% { transform: scale(1); }
}
`

const SPEAK_BASE = 0.95
const SPEAK_RANGE = 0.08
const LISTEN_BASE = 0.92
const LISTEN_RANGE = 0.06
const LISTEN_GLOW = 0
const SPEAK_GLOW = 24
const LERP = 0.55
const SETTLE_RATE = 0.12
const SETTLE_SCALE_EPSILON = 0.002
const TRANSITION_RATE = 0.06

export function GlowOrb({
  state,
  volume,
  size,
  className,
  style,
  disabled = false,
  interactive = false,
  onClick,
  ...controlProps
}: GlowOrbProps) {
  const circleRef = useRef<HTMLSpanElement>(null)
  const glowRef = useRef<HTMLSpanElement>(null)
  const hoverRef = useRef<HTMLSpanElement>(null)
  const rafRef = useRef<number>(0)

  const reduceMotion = useReducedMotion()

  const volumeRef = useRef(volume)
  useIsomorphicLayoutEffect(() => {
    volumeRef.current = volume
  }, [volume])

  const accentRgb = useCssColorRgb('--color-accent', FALLBACK_ACCENT)
  const destructiveRgb = useCssColorRgb('--color-destructive', FALLBACK_DESTRUCTIVE)
  const accentRgbRef = useRef(accentRgb)
  const destructiveRgbRef = useRef(destructiveRgb)
  useEffect(() => {
    accentRgbRef.current = accentRgb
  }, [accentRgb])
  useEffect(() => {
    destructiveRgbRef.current = destructiveRgb
  }, [destructiveRgb])

  const currentScaleRef = useRef(1)
  const currentGlowRef = useRef(0)
  const currentColorRef = useRef<RGB>(accentRgb)
  const currentBaseRef = useRef(LISTEN_BASE)
  const currentRangeRef = useRef(LISTEN_RANGE)
  const touchEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (touchEndTimerRef.current) clearTimeout(touchEndTimerRef.current)
    },
    [],
  )

  useEffect(() => {
    const id = 'orb-circle-keyframes'
    if (!document.getElementById(id)) {
      const el = document.createElement('style')
      el.id = id
      el.textContent = KEYFRAMES
      document.head.appendChild(el)
    }
  }, [])

  useEffect(() => {
    const el = circleRef.current
    if (!el) return

    const targetToken = STATE_COLOR_TOKEN[state]
    const tRgb = targetToken === 'destructive' ? destructiveRgbRef.current : accentRgbRef.current

    if (!reduceMotion && (state === 'listening' || state === 'speaking')) {
      const base = state === 'speaking' ? SPEAK_BASE : LISTEN_BASE
      const range = state === 'speaking' ? SPEAK_RANGE : LISTEN_RANGE
      const glow = state === 'speaking' ? SPEAK_GLOW : LISTEN_GLOW

      const animate = () => {
        const vol = volumeRef.current

        currentBaseRef.current += (base - currentBaseRef.current) * TRANSITION_RATE
        currentRangeRef.current += (range - currentRangeRef.current) * TRANSITION_RATE

        const tScale = currentBaseRef.current + vol * currentRangeRef.current
        const tGlow = vol * glow

        if (state === 'listening') {
          currentScaleRef.current += (tScale - currentScaleRef.current) * LERP
          currentGlowRef.current += (tGlow - currentGlowRef.current) * LERP
        } else {
          currentScaleRef.current = tScale
          currentGlowRef.current = tGlow
        }

        const [cr, cg, cb] = currentColorRef.current
        currentColorRef.current = [
          cr + (tRgb[0] - cr) * 0.05,
          cg + (tRgb[1] - cg) * 0.05,
          cb + (tRgb[2] - cb) * 0.05,
        ]
        const [r, g, b] = currentColorRef.current.map(Math.round)

        el.style.transform = `scale(${currentScaleRef.current})`
        el.style.animation = 'none'

        const ge = glowRef.current
        if (ge) {
          const g2 = currentGlowRef.current
          ge.style.transform = `scale(${currentScaleRef.current})`
          ge.style.boxShadow = g2 > 0.5 ? `0 0 ${g2}px ${g2 * 0.4}px rgb(${r},${g},${b})` : 'none'
        }

        rafRef.current = requestAnimationFrame(animate)
      }

      rafRef.current = requestAnimationFrame(animate)

      return () => {
        cancelAnimationFrame(rafRef.current)
      }
    } else {
      cancelAnimationFrame(rafRef.current)

      const settle = () => {
        currentScaleRef.current += (1 - currentScaleRef.current) * SETTLE_RATE
        currentGlowRef.current += (0 - currentGlowRef.current) * SETTLE_RATE

        const [cr, cg, cb] = currentColorRef.current
        currentColorRef.current = [
          cr + (tRgb[0] - cr) * SETTLE_RATE,
          cg + (tRgb[1] - cg) * SETTLE_RATE,
          cb + (tRgb[2] - cb) * SETTLE_RATE,
        ]

        el.style.transform = `scale(${currentScaleRef.current})`
        el.style.animation = 'none'

        if (glowRef.current) {
          glowRef.current.style.transform = `scale(${currentScaleRef.current})`
          glowRef.current.style.boxShadow = 'none'
        }

        const scaleDone = Math.abs(currentScaleRef.current - 1) < SETTLE_SCALE_EPSILON
        const glowDone = currentGlowRef.current < 0.1
        const colorDone = currentColorRef.current.every(
          (channel, i) => Math.abs(channel - tRgb[i]) < 1,
        )

        if (scaleDone && glowDone && colorDone) {
          currentScaleRef.current = 1
          currentGlowRef.current = 0
          currentColorRef.current = tRgb

          el.style.transform = ''
          if (glowRef.current) {
            glowRef.current.style.transform = 'scale(1)'
            glowRef.current.style.boxShadow = 'none'
          }

          if (state === 'thinking' && !reduceMotion) {
            el.style.animation =
              'orb-circle-thinking-wave 2.4s cubic-bezier(0.37, 0, 0.63, 1) infinite'
          }

          return
        }

        rafRef.current = requestAnimationFrame(settle)
      }

      rafRef.current = requestAnimationFrame(settle)

      return () => cancelAnimationFrame(rafRef.current)
    }
  }, [state, reduceMotion])

  const d = size * 0.55
  const shaderSpeed = reduceMotion ? 0 : STATE_SPEED[state]
  const orbColorRgb = STATE_COLOR_TOKEN[state] === 'destructive' ? destructiveRgb : accentRgb

  const rootStyle: CSSProperties = {
    width: size,
    height: size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...style,
  }

  const content = (
    <span
      ref={hoverRef}
      onMouseEnter={() => {
        if (hoverRef.current && !disabled) {
          hoverRef.current.style.transform = 'scale(1.04)'
          hoverRef.current.style.filter = 'brightness(1.08)'
        }
      }}
      onMouseLeave={() => {
        if (hoverRef.current) {
          hoverRef.current.style.transform = 'scale(1)'
          hoverRef.current.style.filter = 'brightness(1)'
        }
      }}
      onTouchEnd={() => {
        touchEndTimerRef.current = setTimeout(() => {
          if (hoverRef.current) {
            hoverRef.current.style.transform = 'scale(1)'
            hoverRef.current.style.filter = 'brightness(1)'
          }
        }, 180)
      }}
      style={{
        position: 'relative',
        display: 'inline-block',
        transition: reduceMotion
          ? 'none'
          : 'transform 220ms cubic-bezier(0.23, 1, 0.32, 1), filter 220ms cubic-bezier(0.23, 1, 0.32, 1)',
        cursor: interactive ? (disabled ? 'not-allowed' : 'pointer') : 'default',
        borderRadius: '50%',
        lineHeight: 0,
      }}
    >
      <span
        ref={glowRef}
        style={{
          position: 'absolute',
          display: 'block',
          width: d,
          height: d,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <span
        style={{
          position: 'absolute',
          display: 'block',
          width: d,
          height: d,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.08)',
          filter: 'blur(8px)',
          transform: 'scale(1.15)',
          pointerEvents: 'none',
        }}
      />
      <span
        ref={circleRef}
        style={{
          position: 'relative',
          display: 'block',
          width: d,
          height: d,
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <FluidOrb size={d} colorRgb={orbColorRgb} speed={shaderSpeed} />
      </span>
    </span>
  )

  if (interactive) {
    return (
      <button
        {...controlProps}
        type="button"
        className={className}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          border: 0,
          padding: 0,
          margin: 0,
          background: 'transparent',
          color: 'inherit',
          font: 'inherit',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: reduceMotion ? 'none' : 'transform 160ms cubic-bezier(0.23, 1, 0.32, 1)',
          ...rootStyle,
        }}
        onMouseDown={(e) => {
          if (disabled) return
          ;(e.currentTarget as HTMLElement).style.transform = 'scale(0.96)'
        }}
        onMouseUp={(e) => {
          ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
        }}
      >
        {content}
      </button>
    )
  }

  return (
    <div {...controlProps} className={className} style={rootStyle}>
      {content}
    </div>
  )
}

export function GlowOrbPreview() {
  return <GlowOrb state="listening" volume={0.5} size={200} />
}
