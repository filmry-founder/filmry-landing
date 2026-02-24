'use client'

import { useState } from 'react'
import WaitlistForm from '@/components/WaitlistForm'

export default function WaitlistSection() {
  const [profileCompleted, setProfileCompleted] = useState(false)

  return (
    <>
      <div id="waitlist" className="mx-auto max-w-md scroll-mt-24">
        <WaitlistForm
          variant="dark"
          onProfileCompleted={() => setProfileCompleted(true)}
        />
        {!profileCompleted && (
          <p className="mt-4 text-center text-sm text-gray-500">
            Private early access. Limited invites.
          </p>
        )}
      </div>
      {!profileCompleted && (
        <p className="mt-10 text-center text-xl font-light text-gray-400">
          Join the filmmakers shaping the future of production.
        </p>
      )}
    </>
  )
}
