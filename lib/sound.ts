'use client'

let audioCtx: AudioContext | null = null

function initAudio(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

// Global user interaction listener to unlock AudioContext immediately on first gesture
if (typeof window !== 'undefined') {
  const unlock = () => {
    initAudio()
    window.removeEventListener('pointerdown', unlock)
    window.removeEventListener('keydown', unlock)
    window.removeEventListener('touchstart', unlock)
  }
  window.addEventListener('pointerdown', unlock, { passive: true })
  window.addEventListener('keydown', unlock, { passive: true })
  window.addEventListener('touchstart', unlock, { passive: true })
}

export function getAudioContext(): AudioContext | null {
  return initAudio()
}

/**
 * Plays a soft, tactile micro-click sound for hover interactions.
 */
export function playHoverSound(volume = 0.12, pitch = 1.2) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(1400 * pitch, now)
    osc.frequency.exponentialRampToValueAtTime(350 * pitch, now + 0.012)

    gain.gain.setValueAtTime(volume, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.012)
  } catch {
    // Ignore audio initialization edge cases
  }
}

/**
 * Plays a crisp tactile click sound for click actions and selections.
 */
export function playClickSound(volume = 0.2, pitch = 1.0) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(850 * pitch, now)
    osc.frequency.exponentialRampToValueAtTime(160 * pitch, now + 0.02)

    gain.gain.setValueAtTime(volume, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.02)
  } catch {
    // Ignore audio initialization edge cases
  }
}

/**
 * Plays a subtle micro-tick sound for slider/fader dragging or value ticks.
 */
export function playTickSound(volume = 0.1, pitch = 1.5) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(1800 * pitch, now)
    osc.frequency.exponentialRampToValueAtTime(450 * pitch, now + 0.01)

    gain.gain.setValueAtTime(volume, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.01)
  } catch {
    // Ignore audio initialization edge cases
  }
}

/**
 * Plays a rich, clear "bouncing ball" boing/pop sound for bounce navigation.
 */
export function playBounceSound(volume = 0.3, pitch = 1.0) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    // Main oscillator for the bouncy pitch contour (boing / pop)
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(260 * pitch, now)
    osc.frequency.exponentialRampToValueAtTime(650 * pitch, now + 0.04)
    osc.frequency.exponentialRampToValueAtTime(190 * pitch, now + 0.14)

    gain.gain.setValueAtTime(volume, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.14)

    // Sub-pop oscillator for punchy ball impact body
    const subOsc = ctx.createOscillator()
    const subGain = ctx.createGain()

    subOsc.type = 'triangle'
    subOsc.frequency.setValueAtTime(420 * pitch, now)
    subOsc.frequency.exponentialRampToValueAtTime(120 * pitch, now + 0.05)

    subGain.gain.setValueAtTime(volume * 0.7, now)
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05)

    subOsc.connect(subGain)
    subGain.connect(ctx.destination)

    subOsc.start(now)
    subOsc.stop(now + 0.05)
  } catch {
    // Ignore audio initialization edge cases
  }
}
