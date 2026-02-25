import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import WaitlistSection from '@/components/WaitlistSection'
import CinematicSection from '@/components/CinematicSection'
import Reveal from '@/components/Reveal'
import VideoBackground from '@/components/VideoBackground'
import StructuredData from '@/components/StructuredData'

const ROLES = [
  'Director',
  'Producer',
  'Line Producer',
  'Scriptwriter',
  'Cinematographer (DP)',
  'Camera Operator',
  'Assistant Director (AD)',
  'Production Manager',
  'Production Designer',
  'Editor',
  'Colorist',
  'VFX Artist',
  'Sound',
  'Studio Teams',
]

const STAGES = [
  { label: 'Write', keywords: ['Scripts', 'breakdowns', 'story'] },
  { label: 'Plan', keywords: ['Scheduling', 'budgeting', 'crew', 'locations'] },
  { label: 'Shoot', keywords: ['Production', 'dailies', 'continuity'] },
  { label: 'Deliver', keywords: ['Post', 'review', 'distribution'] },
]

export default function Home() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: 'linear-gradient(180deg, #070707 0%, #000000 100%)',
      }}
    >
      {/* Layer 2: very soft vignette — darker edges, slightly lighter center */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 85% 75% at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.12) 100%)',
        }}
      />

      <Header variant="transparent" />

      <main className="relative z-10">
        <StructuredData />
        {/* Hero */}
        <section
          className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28"
          style={{
            boxShadow: '0 8px 32px -8px rgba(0,0,0,0.18)',
          }}
        >
          {/* Soft radial light — studio spotlight (behind video, max opacity so video visible) */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              zIndex: -1,
              background:
                'radial-gradient(ellipse 140% 120% at 50% -10%, rgba(255,255,255,0.04) 0%, transparent 55%)',
            }}
          />
          {/* Hero video — cinematic bokeh motion layer
              DEBUG: If not visible, temporarily set opacity={0.35} filter="none" to confirm load.
              Final: opacity 0.14-0.18, brightness(0.75-0.85) contrast(1.08-1.15) */}
          <VideoBackground
            id="hero-video"
            src="/images/hero-bg-v3.mp4"
            opacity={0.38}
            filter="brightness(0.8) contrast(1.1)"
            objectFit="cover"
            preload="metadata"
            zIndex={0}
            hueCycleStages={[0, 10, -8, 16, -12]}
          />
          {/* Bottom fade overlay — curved mask, blends hero video into next section */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              zIndex: 1,
              background: 'radial-gradient(ellipse 120% 80% at 50% 100%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 85%)',
            }}
          />
          <div className="page-container relative z-10">
          <Reveal variant="fadeUp" delay={0}>
            <h1 className="text-center text-4xl font-light tracking-tight text-[#fafafa] sm:text-5xl md:text-6xl">
              Make films. Not chaos.
            </h1>
          </Reveal>
          <Reveal variant="fadeUp" delay={80}>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-400 sm:text-xl">
              Filmry is the end-to-end platform for modern film production — from script to delivery.
            </p>
          </Reveal>
          <Reveal variant="fadeUp" delay={160}>
            <div className="mx-auto mt-12">
              <WaitlistSection />
            </div>
          </Reveal>
          </div>
        </section>

        <CinematicSection />

        {/* Roles — section separation + micro shadow */}
        <section
          className="border-t border-white/5 py-20 sm:py-28"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.025) 0%, transparent 120px)',
            boxShadow: '0 8px 32px -8px rgba(0,0,0,0.12)',
          }}
        >
          <div className="page-container">
            <Reveal variant="fadeUp">
              <h2 className="text-center text-2xl font-light tracking-tight text-[#fafafa] sm:text-3xl">
                Built for the people behind the camera
              </h2>
            </Reveal>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {ROLES.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-gray-300"
                >
                  {role}
                </span>
              ))}
            </div>
            <Reveal variant="fadeIn" duration={600} className="mt-10 flex flex-col items-center">
              <span
                className="and-more-cinematic inline-block cursor-default text-center font-light text-base"
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  letterSpacing: '0.04em',
                }}
                aria-hidden
              >
                And many more behind the camera.
              </span>
            </Reveal>
          </div>
        </section>

        {/* Workflow — section separation depth */}
        <section
          className="relative overflow-hidden border-t border-white/5 py-20 sm:py-28"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 100px)',
          }}
        >
          {/* Mid-section video — subtle dust atmosphere (clean, no animations) */}
          <VideoBackground
            src="/images/mid-dust.mp4"
            opacity={0.15}
            filter="brightness(0.80) contrast(1.05)"
            objectFit="cover"
            preload="metadata"
            zIndex={0}
            lazy
          />
          <div className="page-container relative z-10">
            <Reveal variant="fadeUp">
              <h2 className="text-center text-2xl font-light tracking-tight text-[#fafafa] sm:text-3xl">
                One workflow. Every stage.
              </h2>
            </Reveal>
            <div className="mt-14 flex flex-col items-center gap-10 lg:flex-row lg:flex-wrap lg:items-start lg:justify-center lg:gap-x-2 lg:gap-y-4">
              {STAGES.flatMap((stage, i) => [
                ...(i > 0 ? [<span key={`arrow-${stage.label}`} className="hidden shrink-0 text-gray-600 lg:inline" aria-hidden>→</span>] : []),
                <div key={stage.label} className="flex min-w-0 flex-1 flex-col items-center text-center lg:max-w-[12rem]">
                  <span className="text-2xl font-light text-[#fafafa]">{stage.label}</span>
                  <p className="mt-2 text-sm text-gray-500">
                    {stage.keywords.map((kw, j) => (
                      <span key={kw}>
                        {j > 0 && ', '}
                        <span className="workflow-keyword" tabIndex={0}>{kw}</span>
                      </span>
                    ))}
                  </p>
                </div>,
              ])}
            </div>
          </div>
        </section>

        {/* Credibility — unified premium cinematic block */}
        <section
          className="border-t border-white/5 py-28 sm:py-32"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.03) 0%, transparent 80px)',
          }}
        >
          <div className="page-container">
            <Reveal variant="fadeUp">
              <div className="filmry-glass flex flex-col items-center rounded-2xl px-10 py-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-[#fafafa] sm:text-4xl">
                  Built with filmmakers. Not just for them.
                </h2>
                <p className="mt-6 text-lg font-normal text-gray-300">
                  Shaped inside real productions — from script to final delivery.
                </p>
                <p
                  className="mt-3 text-base font-normal"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  Designed for the chaos behind every production.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/[0.06] py-20">
          <Reveal variant="fadeUp">
            <div className="page-container flex flex-col items-center justify-center text-center">
              <Image
              src="/logo/filmry-logo-white.png"
              alt="Filmry"
              width={90}
              height={30}
              className="mb-6 h-7 w-[90px] object-contain opacity-70"
            />
            <p className="mt-2 text-xs text-gray-500">
              A product of Mavren Studios Ltd
            </p>
            <p className="mt-1 text-xs text-gray-600">Manchester, United Kingdom</p>
            <div className="mt-8 flex gap-8">
              <Link
                href="/privacy"
                className="text-xs text-gray-500 transition-colors hover:text-gray-400"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-gray-500 transition-colors hover:text-gray-400"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="text-xs text-gray-500 transition-colors hover:text-gray-400"
              >
                Contact
              </Link>
            </div>
            <p className="mt-8 text-xs text-gray-600">
              © {new Date().getFullYear()} Filmry. All rights reserved.
            </p>
            </div>
          </Reveal>
        </footer>
      </main>
    </div>
  )
}
