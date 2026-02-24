'use client'

import { useRef, useState, useEffect } from 'react'

type Variant = 'fadeUp' | 'fadeIn' | 'fadeDown'

interface RevealProps {
  children: React.ReactNode
  variant?: Variant
  delay?: number
  duration?: number
  className?: string
  as?: 'div' | 'span'
}

export default function Reveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration,
  className = '',
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal-${variant} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{
        ['--reveal-delay' as string]: `${delay}ms`,
        ...(duration != null && {
          ['--motion-duration-slow' as string]: `${duration}ms`,
        }),
      } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}
