'use client'

import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
} from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useCssColorRgb } from '@/lib/hooks/use-css-color-rgb'

export type FluidOrbProps = ComponentProps<'div'> & {
  size?: number
  /**
   * Hex color override. When omitted, uses the design-system muted/neutral
   * foreground token so the orb follows light/dark theme.
   */
  color?: string
  audioLevel?: number
}

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
  '  vec3 coreColor = mix(u_color * 0.45, u_color * 1.2, u_pulse);',
  '  vec3 col = u_color * 0.22;',
  '  col = mix(col, u_color * 1.25, fluid * 0.6);',
  '  col *= (0.55 + keyLight * 0.7 + fillLight * 0.25);',
  '  col += specular * 0.3;',
  '  col = mix(col, coreColor, coreMask * (0.35 + 0.4 * u_pulse));',
  '  gl_FragColor = vec4(col * edge, edge);',
  '}',
].join('\n')

function hexToRgb01(hex: string): [number, number, number] | null {
  let h = hex.replace('#', '').trim()
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
  }
  const n = parseInt(h, 16)
  if (h.length !== 6 || Number.isNaN(n)) return null
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function rgb255To01(rgb: [number, number, number]): [number, number, number] {
  return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255]
}

function rgb01Css([r, g, b]: [number, number, number], alpha = 1): string {
  return `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)} / ${alpha})`
}

const FALLBACK_MUTED: [number, number, number] = [115, 115, 115]

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
  ({ size = 280, color, audioLevel, className, style, ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const pulseRef = useRef(0)
    const audioLevelRef = useRef(audioLevel)
    const reduceMotion = useReducedMotion()
    const reduceMotionRef = useRef(reduceMotion)
    const glRef = useRef<WebGLRenderingContext | null>(null)
    const uColorRef = useRef<WebGLUniformLocation | null>(null)
    const [webglOk, setWebglOk] = useState(true)

    const mutedRgb = useCssColorRgb('--color-muted', FALLBACK_MUTED)
    const color01 = useMemo((): [number, number, number] => {
      if (color) {
        const parsed = hexToRgb01(color)
        if (parsed) return parsed
      }
      return rgb255To01(mutedRgb)
    }, [color, mutedRgb])
    const color01Ref = useRef(color01)

    useEffect(() => {
      audioLevelRef.current = audioLevel
    }, [audioLevel])

    useEffect(() => {
      reduceMotionRef.current = reduceMotion
    }, [reduceMotion])

    useEffect(() => {
      color01Ref.current = color01
      const gl = glRef.current
      const loc = uColorRef.current
      if (gl && loc && !gl.isContextLost()) {
        try {
          gl.uniform3f(loc, ...color01)
        } catch {
          /* context may be mid-teardown */
        }
      }
    }, [color01])

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
        uColorRef.current = uColor
        gl.uniform3f(uColor, ...color01Ref.current)

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
          if (!reduce) raf = requestAnimationFrame(render)
        }
        render(t0)
      }

      const boot = requestAnimationFrame(start)

      return () => {
        cancelled = true
        cancelAnimationFrame(boot)
        cancelAnimationFrame(raf)
        uColorRef.current = null
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
        ref={ref}
        data-slot="fluid-orb"
        className={cn('relative flex items-center justify-center', className)}
        style={{ width: size, height: size, ...style }}
        {...props}
      >
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-full transition-transform duration-100 ease-out motion-reduce:transition-none motion-reduce:transform-none"
          style={{
            transform: 'scale(1)',
            background: `radial-gradient(circle, ${rgb01Css(color01, 0.28)} 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />
        <canvas
          ref={canvasRef}
          className="relative h-full w-full rounded-full"
          style={{
            filter: `drop-shadow(0 0 15px ${rgb01Css(color01, 0.2)})`,
            opacity: webglOk ? 1 : 0,
          }}
          aria-hidden={!webglOk}
        />
        {!webglOk && (
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 35% 30%, ${rgb01Css(color01, 0.9)} 0%, ${rgb01Css(color01, 0.75)} 45%, ${rgb01Css(color01, 0.45)} 100%)`,
              boxShadow: `0 0 24px ${rgb01Css(color01, 0.25)}`,
            }}
          />
        )}
      </div>
    )
  },
)

FluidOrb.displayName = 'FluidOrb'

export default FluidOrb
