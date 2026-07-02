'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface AnimatedTitleProps {
  title: string
  right?: string
  className?: string
  animate?: boolean
}

const EASE = [0.2, 0.7, 0.2, 1] as const
const STAGGER = 0.035
const DURATION = 0.55

function AnimatedChars({
  text,
  animate,
  delay = 0,
  className,
}: {
  text: string
  animate: boolean
  delay?: number
  className?: string
}) {
  return (
    <span className={cn('inline-flex', className)}>
      {text.split('').map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="relative inline-block overflow-hidden align-baseline"
          style={{ lineHeight: 1 }}
        >
          <motion.span
            initial={animate ? { y: '110%' } : false}
            animate={animate ? { y: '0%' } : undefined}
            transition={{
              duration: DURATION,
              delay: delay + i * STAGGER,
              ease: EASE,
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function AnimatedTitle({ title, right, className, animate = true }: AnimatedTitleProps) {
  return (
    <div className={cn('flex items-baseline justify-between leading-none', className)}>
      <AnimatedChars text={title} animate={animate} />
      {right && <AnimatedChars text={right} animate={animate} delay={title.length * STAGGER} />}
    </div>
  )
}
