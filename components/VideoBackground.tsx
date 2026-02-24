'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const HUE_CYCLE_BASE_FILTER = 'brightness(0.82) contrast(1.12)'

type VideoBackgroundProps = {
  src: string
  opacity?: number
  filter?: string
  objectFit?: 'cover' | 'contain'
  className?: string
  /** Additional class applied to the video element (e.g. for animations) */
  videoClassName?: string
  /** If true, only load/play when in viewport (for below-fold videos) */
  lazy?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  /** z-index of video container (default -10 for behind content) */
  zIndex?: number
  /** Poster image when prefers-reduced-motion (show static image instead of video) */
  poster?: string
  /** id for the video element */
  id?: string
  /** Hue degrees per loop stage; when provided, hue changes only at loop restart (no loop attr, manual restart) */
  hueCycleStages?: number[]
}

export default function VideoBackground({
  src,
  opacity = 0.16,
  filter,
  objectFit = 'cover',
  className = '',
  videoClassName = '',
  lazy = false,
  preload = 'none',
  zIndex = -10,
  poster,
  id,
  hueCycleStages,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hueStage, setHueStage] = useState(0)
  const hueStageRef = useRef(0)

  const applyHueFilter = useCallback(
    (video: HTMLVideoElement, deg: number) => {
      video.style.filter = `hue-rotate(${deg}deg) ${HUE_CYCLE_BASE_FILTER}`
    },
    []
  )

  const handleEnded = useCallback(() => {
    const video = videoRef.current
    if (!video || !hueCycleStages || hueCycleStages.length === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const nextStage = (hueStageRef.current + 1) % hueCycleStages.length
    hueStageRef.current = nextStage
    setHueStage(nextStage)

    const deg = hueCycleStages[nextStage]
    applyHueFilter(video, deg)

    video.currentTime = 0
    video.play().catch(() => {})
  }, [hueCycleStages, applyHueFilter])

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    const playVideo = () => {
      if (!mq.matches) video.play().catch(() => {})
    }
    const pauseVideo = () => video.pause()

    const handleReducedMotion = () => {
      if (mq.matches) {
        pauseVideo()
      } else {
        if (!lazy || isInView) {
          playVideo()
        }
      }
    }

    let isInView = !lazy

    if (lazy && container) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          isInView = entry.isIntersecting
          if (isInView && !mq.matches) {
            video.setAttribute('preload', 'auto')
            playVideo()
          } else if (!isInView) {
            pauseVideo()
          }
        },
        { rootMargin: '100px' }
      )
      observer.observe(container)
      handleReducedMotion()
      mq.addEventListener('change', handleReducedMotion)
      return () => {
        observer.disconnect()
        mq.removeEventListener('change', handleReducedMotion)
      }
    }

    handleReducedMotion()
    mq.addEventListener('change', handleReducedMotion)
    return () => mq.removeEventListener('change', handleReducedMotion)
  }, [lazy])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !hueCycleStages || hueCycleStages.length === 0) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    hueStageRef.current = 0

    if (mq.matches) {
      video.style.filter = filter || HUE_CYCLE_BASE_FILTER
    } else {
      applyHueFilter(video, hueCycleStages[0])
    }
  }, [hueCycleStages, applyHueFilter, filter])

  const handleError = () => {
    console.warn(
      `[VideoBackground] Failed to load video: ${src}. Check that the file exists at public${src}`
    )
  }

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      style={{ zIndex }}
      aria-hidden
    >
      <video
        ref={videoRef}
        id={id}
        autoPlay
        loop={!hueCycleStages}
        muted
        playsInline
        preload={preload}
        poster={poster}
        className={`absolute inset-0 w-full h-full ${videoClassName}`.trim()}
        style={{
          opacity,
          filter: hueCycleStages
            ? `hue-rotate(${hueCycleStages[hueStage]}deg) ${HUE_CYCLE_BASE_FILTER}`
            : (filter || undefined),
          objectFit,
        }}
        onEnded={hueCycleStages ? handleEnded : undefined}
        onError={handleError}
      >
        <source src={src} type={src.endsWith('.mp4') ? 'video/mp4' : 'video/quicktime'} />
      </video>
    </div>
  )
}
