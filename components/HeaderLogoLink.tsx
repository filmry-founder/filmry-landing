'use client'

import Image from 'next/image'

export default function HeaderLogoLink() {
  return (
    <a
      href="/"
      onClick={(e) => {
        e.preventDefault()
        window.location.href = '/'
      }}
      className="flex shrink-0 cursor-pointer"
      aria-label="Go to homepage"
    >
      <Image
        src="/logo/filmry-logo-white.png"
        alt="Filmry"
        width={130}
        height={44}
        priority
        className="h-9 w-[120px] object-contain object-left sm:w-[130px]"
      />
    </a>
  )
}
