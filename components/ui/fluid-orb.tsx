'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
} from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type Rgb01 = [number, number, number]

export type FluidOrbProps = ComponentProps<'div'> & {
  size?: number
  /** Base tone as any CSS color, including a token such as `var(--color-fg)`. */
  color?: string
  /** Tint mixed into the fluid highlights and core. */
  accentColor?: string
  audioLevel?: number
}

const DEFAULT_COLOR = 'var(--color-muted)'
const DEFAULT_ACCENT = 'var(--color-accent)'

const VERT = [
  'attribute vec2 a_pos;',
  'void main() {',
  '  gl_Position = vec4(a_pos, 0.0, 1.0);',
  '}',
].join('\n')

const FRAG = [
  'precision mediump float;',
  'uniform vec2 u_resolution;',
  'uniform float u_time;',
  'uniform float u_pulse;',
  'uniform vec3 u_color;',
  'uniform vec3 u_accent;',
  'float hash(vec2 p) {',
  '  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);',
  '}',
  'float noise(vec2 p) {',
  '  vec2 i = floor(p);',
  '  vec2 f = fract(p);',
  '  vec2 u = f * f * (3.0 - 2.0 * f);',
  '  return mix(',
  '    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),',
  '    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),',
  '    u.y',
  '  );',
  '}',
  'float fbm(vec2 p) {',
  '  float v = 0.0;',
  '  float a = 0.5;',
  '  for (int i = 0; i < 5; i++) {',
  '    v += a * noise(p);',
  '    p *= 2.0;',
  '    a *= 0.5;',
  '  }',
  '  return v;',
  '}',
  'void main() {',
  '  vec2 uv = gl_FragCoord.xy / u_resolution.xy;',
  '  vec2 p = uv - 0.5;',
  '  p.x *= u_resolution.x / max(u_resolution.y, 1.0);',
  '  float dist = length(p);',
  '  float edge = smoothstep(0.5, 0.49, dist);',
  '  vec3 sphereNormal = normalize(vec3(p.x, p.y, sqrt(max(0.0, 0.25 - dot(p, p)))));',
  '  float t = u_time * 0.15;',
  '  vec2 flow = vec2(t * 0.5, t * 0.3);',
  '  float fluid = fbm(p * 3.0 + flow);',
  '  fluid = pow(fluid, 1.5);',
  '  vec3 keyLightDir = normalize(vec3(-0.5, 0.6, 0.5));',
  '  vec3 fillLightDir = normalize(vec3(0.4, -0.3, 0.2));',
  '  float keyLight = max(dot(sphereNormal, keyLightDir), 0.0);',
  '  float fillLight = max(dot(sphereNormal, fillLightDir), 0.0);',
  '  vec3 viewDir = vec3(0.0, 0.0, 1.0);',
  '  vec3 halfVec = normalize(keyLightDir + viewDir);',
  '  float specular = pow(max(dot(sphereNormal, halfVec), 0.0), 48.0);',
  '  float coreRadius = 0.16 + 0.18 * u_pulse;',
  '  float coreMask = 1.0 - smoothstep(coreRadius, coreRadius + 0.22, dist);',
  '  vec3 tint = mix(u_color, u_accent, 0.35);',
  '  vec3 coreColor = mix(u_color * 0.6, tint * 1.15, u_pulse);',
  '  vec3 col = u_color * 0.22;',
  '  col = mix(col, mix(u_color * 1.2, tint, 0.25), fluid * 0.6);',
  '  col *= (0.55 + keyLight * 0.7 + fillLight * 0.25);',
  '  col += specular * 0.3;',
  '  col = mix(col, coreColor, coreMask * (0.35 + 0.4 * u_pulse));',
  '  gl_FragColor = vec4(col * edge, edge);',
  '}',
].join('\n')

const FALLBACK_RGB: Rgb01 = [0.5, 0.5, 0.5]

// getComputedStyle keeps oklch()/color() syntax, so a 2D canvas normalizes it to sRGB bytes.
function resolveColor(
  host: HTMLElement,
  input: string,
  ctx: CanvasRenderingContext2D,
): Rgb01 | null {
  const probe = document.createElement('span')
  probe.style.color = input
  probe.style.display = 'none'
  host.appendChild(probe)
  const computed = getComputedStyle(probe).color
  host.removeChild(probe)
  if (!computed) return null
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = computed
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
  if (a === 0) return null
  return [r / 255, g / 255, b / 255]
}

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  const ok = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!ok) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export const FluidOrb = forwardRef<HTMLDivElement, FluidOrbProps>(
  (
    {
      size = 280,
      color = DEFAULT_COLOR,
      accentColor = DEFAULT_ACCENT,
      audioLevel,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLDivElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const pulseRef = useRef(0)
    const audioLevelRef = useRef(audioLevel)
    const reduceMotion = useReducedMotion()
    const reduceMotionRef = useRef(reduceMotion)
    const glRef = useRef<WebGLRenderingContext | null>(null)
    const uColorRef = useRef<WebGLUniformLocation | null>(null)
    const uAccentRef = useRef<WebGLUniformLocation | null>(null)
    const colorRef = useRef<Rgb01>(FALLBACK_RGB)
    const accentRef = useRef<Rgb01>(FALLBACK_RGB)
    const redrawRef = useRef<(() => void) | null>(null)
    const isVisibleRef = useRef(true)
    const [webglOk, setWebglOk] = useState(true)

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      },
      [ref],
    )

    useEffect(() => {
      audioLevelRef.current = audioLevel
    }, [audioLevel])

    useEffect(() => {
      reduceMotionRef.current = reduceMotion
    }, [reduceMotion])

    useEffect(() => {
      const root = rootRef.current
      if (!root) return

      const handleVisibilityChange = () => {
        isVisibleRef.current = !document.hidden
      }

      if (typeof IntersectionObserver !== 'undefined') {
        const observer = new IntersectionObserver(([entry]) => {
          isVisibleRef.current = entry.isIntersecting
        })
        observer.observe(root)

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange)
          observer.disconnect()
        }
      }

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }, [])

    useEffect(() => {
      const host = rootRef.current
      if (!host) return
      const scratch = document.createElement('canvas')
      scratch.width = 1
      scratch.height = 1
      const ctx = scratch.getContext('2d', { willReadFrequently: true })
      if (!ctx) return

      const sync = () => {
        colorRef.current = resolveColor(host, color, ctx) ?? FALLBACK_RGB
        accentRef.current = resolveColor(host, accentColor, ctx) ?? FALLBACK_RGB
        const gl = glRef.current
        if (!gl || gl.isContextLost()) return
        try {
          if (uColorRef.current) gl.uniform3f(uColorRef.current, ...colorRef.current)
          if (uAccentRef.current) gl.uniform3f(uAccentRef.current, ...accentRef.current)
        } catch {
          return
        }
        redrawRef.current?.()
      }
      sync()

      const observer = new MutationObserver(sync)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme', 'style'],
      })
      return () => observer.disconnect()
    }, [color, accentColor])

    useLayoutEffect(() => {
      const canvas = canvasRef.current
      if (!canvas || typeof window === 'undefined') return

      let cancelled = false
      let raf = 0
      let program: WebGLProgram | null = null
      let vert: WebGLShader | null = null
      let frag: WebGLShader | null = null
      let buffer: WebGLBuffer | null = null
      let gl: WebGLRenderingContext | null = null

      const start = () => {
        if (cancelled) return

        const opts: WebGLContextAttributes = {
          antialias: true,
          alpha: true,
          premultipliedAlpha: true,
          preserveDrawingBuffer: false,
          powerPreference: 'default',
        }

        gl =
          (canvas.getContext('webgl', opts) as WebGLRenderingContext | null) ??
          (canvas.getContext('experimental-webgl', opts) as WebGLRenderingContext | null)

        if (!gl || gl.isContextLost()) {
          setWebglOk(false)
          return
        }

        program = gl.createProgram()
        vert = compile(gl, gl.VERTEX_SHADER, VERT)
        frag = compile(gl, gl.FRAGMENT_SHADER, FRAG)
        if (!program || !vert || !frag) {
          setWebglOk(false)
          glRef.current = null
          return
        }

        gl.attachShader(program, vert)
        gl.attachShader(program, frag)
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          setWebglOk(false)
          gl.deleteShader(vert)
          gl.deleteShader(frag)
          gl.deleteProgram(program)
          glRef.current = null
          return
        }

        gl.useProgram(program)
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
        gl.clearColor(0, 0, 0, 0)

        buffer = gl.createBuffer()
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
        const uPulse = gl.getUniformLocation(program, 'u_pulse')
        const uColor = gl.getUniformLocation(program, 'u_color')
        const uAccent = gl.getUniformLocation(program, 'u_accent')
        uColorRef.current = uColor
        uAccentRef.current = uAccent
        gl.uniform3f(uColor, ...colorRef.current)
        gl.uniform3f(uAccent, ...accentRef.current)

        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const px = Math.max(1, Math.round(size * dpr))
        canvas.width = px
        canvas.height = px
        gl.viewport(0, 0, px, px)
        gl.uniform2f(uResolution, px, px)

        glRef.current = gl
        setWebglOk(true)

        const t0 = performance.now()
        const render = (now: number) => {
          if (cancelled || !gl || gl.isContextLost()) return

          if (isVisibleRef.current) {
            const reduce = reduceMotionRef.current
            const time = (now - t0) / 1000
            const level = audioLevelRef.current
            const target =
              level !== undefined
                ? level
                : 0.22 + 0.14 * Math.sin(time * 1.3) + 0.1 * Math.sin(time * 2.1 + 1.7)
            pulseRef.current += (target - pulseRef.current) * 0.06

            gl.uniform1f(uTime, reduce ? 0 : time)
            gl.uniform1f(uPulse, reduce ? 0.3 : pulseRef.current)
            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.drawArrays(gl.TRIANGLES, 0, 6)
            if (glowRef.current) {
              glowRef.current.style.transform = `scale(${1 + pulseRef.current * 0.15})`
            }
          }

          if (!reduceMotionRef.current) raf = requestAnimationFrame(render)
        }
        redrawRef.current = () => {
          if (reduceMotionRef.current) render(performance.now())
        }
        render(t0)
      }

      const boot = requestAnimationFrame(start)

      return () => {
        cancelled = true
        cancelAnimationFrame(boot)
        cancelAnimationFrame(raf)
        uColorRef.current = null
        uAccentRef.current = null
        redrawRef.current = null
        glRef.current = null
        if (gl && !gl.isContextLost()) {
          if (buffer) gl.deleteBuffer(buffer)
          if (vert) gl.deleteShader(vert)
          if (frag) gl.deleteShader(frag)
          if (program) gl.deleteProgram(program)
        }
      }
    }, [size])

    return (
      <div
        ref={setRefs}
        data-slot="fluid-orb"
        className={cn('relative flex items-center justify-center', className)}
        style={
          {
            width: size,
            height: size,
            '--orb-base': color,
            '--orb-tint': `color-mix(in oklab, ${color} 70%, ${accentColor})`,
            ...style,
          } as CSSProperties
        }
        {...props}
      >
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--orb-tint)_26%,transparent)_0%,transparent_70%)] blur-xl transition-transform duration-(--motion-dur-instant) ease-(--motion-ease-out) motion-reduce:transition-none motion-reduce:transform-none"
        />
        <canvas
          ref={canvasRef}
          className={cn(
            'relative h-full w-full rounded-full drop-shadow-[0_0_15px_color-mix(in_oklab,var(--orb-tint)_18%,transparent)]',
            !webglOk && 'opacity-0',
          )}
          aria-hidden="true"
        />
        {!webglOk && (
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,color-mix(in_oklab,var(--orb-tint)_90%,transparent)_0%,color-mix(in_oklab,var(--orb-base)_75%,transparent)_45%,color-mix(in_oklab,var(--orb-base)_45%,transparent)_100%)] shadow-[0_0_24px_color-mix(in_oklab,var(--orb-tint)_25%,transparent)]"
          />
        )}
      </div>
    )
  },
)

FluidOrb.displayName = 'FluidOrb'

export default FluidOrb
