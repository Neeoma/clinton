import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
  scale?: number
  duration?: number
  once?: boolean
  id?: string
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 26,
  x = 0,
  scale = 1,
  duration = 0.75,
  once = true,
  id,
}: RevealProps) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className} id={id}>{children}</div>

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, margin: '-70px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
