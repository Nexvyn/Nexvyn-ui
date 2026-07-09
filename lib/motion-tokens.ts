export const durations = {
  instant: '50ms',
  fast: '120ms',
  base: '200ms',
  slow: '320ms',
} as const

export const easings = {
  out: 'cubic-bezier(0.22, 1, 0.36, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
} as const

export const springs = {
  fast: { type: 'spring', stiffness: 400, damping: 30, mass: 0.8 },
  press: { type: 'spring', stiffness: 700, damping: 32, mass: 1 },
  moderate: { type: 'spring', stiffness: 300, damping: 24, mass: 1 },
  settle: { type: 'spring', stiffness: 260, damping: 26, mass: 1 },
} as const
