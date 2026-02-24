'use client'

import Reveal from '@/components/Reveal'

export default function CinematicSection() {
  return (
    <section
      style={{
        paddingTop: '120px',
        paddingBottom: '110px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.035) 0%, transparent 80px)',
        boxShadow: '0 8px 32px -8px rgba(0,0,0,0.14)',
      }}
    >
      <div className="page-container">
      <Reveal variant="fadeUp">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[#fcfcfc] sm:text-4xl md:text-5xl lg:text-6xl">
          The operating system for film production.
        </h2>
        <p
          className="mx-auto mt-8 max-w-[680px] text-base text-gray-500 sm:text-lg"
          style={{ opacity: 0.92 }}
        >
          From first idea to final delivery, Filmry brings every part of the filmmaking process into one connected system.
        </p>
        {/* divider: keep (cinematic breathing line) — do not remove */}
        <div
          className="cine-divider mx-auto mt-10"
          aria-hidden
        />
      </div>
      </Reveal>
      </div>
    </section>
  )
}
