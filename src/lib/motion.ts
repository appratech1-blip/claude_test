import type { Variants } from 'motion/react'

export const EASE = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
}

export function staggerContainer(
  staggerChildren = 0.15,
  delayChildren = 0.1,
): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren, delayChildren },
    },
  }
}

export const goldGlowHover = {
  boxShadow: '0 0 40px 6px rgba(212, 175, 55, 0.35)',
  y: -2,
}
