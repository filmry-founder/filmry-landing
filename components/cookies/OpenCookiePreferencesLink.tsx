'use client'

import * as React from 'react'

type Props = {
  className?: string
  children?: React.ReactNode
}

export default function OpenCookiePreferencesLink({ className, children }: Props) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('filmry:open-cookie-preferences'))
    }
  }

  return (
    <a
      href="/cookies"
      onClick={handleClick}
      className={className}
    >
      {children ?? 'Cookie preferences'}
    </a>
  )
}

