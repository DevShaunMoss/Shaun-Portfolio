import { m, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reducedMotion = useReducedMotion()
  return (
    <m.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-35px' }}
      transition={{
        duration: reducedMotion ? 0 : 0.6,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </m.div>
  )
}
