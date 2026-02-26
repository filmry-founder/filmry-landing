'use client'

import { useEffect, useState } from 'react'
import { defaultConsent } from '@/lib/cookies/consent'
import { useCookieConsent } from '@/components/cookies/CookieConsentProvider'

export default function CookiePreferencesModal() {
  const { consent, isPreferencesOpen, closePreferences, setConsent } = useCookieConsent()
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    if (!isPreferencesOpen) return
    const base = consent ?? defaultConsent()
    setAnalytics(base.analytics)
    setMarketing(base.marketing)
  }, [isPreferencesOpen, consent])

  if (!isPreferencesOpen) return null

  const handleCancel = () => {
    closePreferences()
  }

  const handleSave = () => {
    setConsent({
      necessary: true,
      analytics,
      marketing,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm sm:px-6">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-white/12 bg-[#050505] p-5 shadow-2xl sm:p-6">
        <h2 className="text-base font-medium text-white">
          Cookie preferences
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-gray-400">
          Manage how Filmry uses cookies on this device. You can change your preferences at any time.
        </p>

        <div className="mt-5 space-y-4">
          <PreferenceRow
            label="Necessary"
            description="Required to make Filmry work. Always on."
            checked
            disabled
            onChange={() => {}}
          />
          <PreferenceRow
            label="Analytics"
            description="Helps us understand usage and improve Filmry."
            checked={analytics}
            onChange={setAnalytics}
          />
          <PreferenceRow
            label="Marketing"
            description="Used to provide relevant updates and campaigns."
            checked={marketing}
            onChange={setMarketing}
          />
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-gray-300 transition-colors hover:border-white/25 hover:text-white sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-gray-100 sm:w-auto"
          >
            Save preferences
          </button>
        </div>
      </div>
    </div>
  )
}

type PreferenceRowProps = {
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange: (value: boolean) => void
}

function PreferenceRow({ label, description, checked, disabled, onChange }: PreferenceRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-white/5 bg-black/40 px-3 py-3.5">
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="mt-1 text-xs text-gray-400">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-10 flex-shrink-0 cursor-pointer items-center rounded-full border border-white/15 transition-colors ${
          disabled
            ? 'bg-white/10 opacity-60'
            : checked
              ? 'bg-white/90'
              : 'bg-white/5 hover:bg-white/10'
        }`}
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}

