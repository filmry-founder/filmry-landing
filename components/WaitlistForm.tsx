'use client'

import { useState, useEffect } from 'react'
import { collectTrackingData } from '@/lib/tracking'
import DarkSelect, { type DarkSelectOption } from '@/components/ui/DarkSelect'
import DarkCombobox from '@/components/ui/DarkCombobox'

type Step = 'email' | 'profile'

const USER_TYPES: DarkSelectOption[] = [
  { value: 'individual', label: 'Individual' },
  { value: 'studio', label: 'Studio' },
  { value: 'production_company', label: 'Production Company' },
  { value: 'agency', label: 'Agency' },
  { value: 'team', label: 'Team / Crew' },
]

const FOCUS_OPTIONS: DarkSelectOption[] = [
  { value: 'development_script', label: 'Development / Script' },
  { value: 'feature_films', label: 'Feature Films' },
  { value: 'short_films', label: 'Short Films' },
  { value: 'series_tv', label: 'Series / TV' },
  { value: 'documentary', label: 'Documentary' },
  { value: 'commercial_branded_content', label: 'Commercial / Branded Content' },
  { value: 'music_videos', label: 'Music Videos' },
  { value: 'post_production', label: 'Post-production' },
  { value: 'vfx_animation', label: 'VFX / Animation' },
  { value: 'ai_assisted_filmmaking', label: 'AI-assisted filmmaking' },
  { value: 'distribution', label: 'Distribution' },
  { value: 'studio_services_rental', label: 'Studio Services / Rental' },
  { value: 'production_services', label: 'Production Services' },
  { value: 'educational', label: 'Educational' },
  { value: 'other', label: 'Other' },
]

const EXPERIENCE_LEVEL_OPTIONS: DarkSelectOption[] = [
  { value: 'student', label: 'Student' },
  { value: 'emerging_filmmaker', label: 'Emerging Filmmaker' },
  { value: 'professional', label: 'Professional' },
  { value: 'established_studio', label: 'Established Studio' },
]

const ORG_NAME_LABEL_BY_USER_TYPE: Record<string, string> = {
  studio: 'Studio name',
  production_company: 'Production company name',
  agency: 'Agency name',
  team: 'Team / crew name',
}

const ROLES: DarkSelectOption[] = [
  { value: 'director', label: 'Director' },
  { value: 'producer', label: 'Producer' },
  { value: 'executive_producer', label: 'Executive Producer' },
  { value: 'line_producer', label: 'Line Producer' },
  { value: 'production_manager', label: 'Production Manager' },
  { value: '1st_assistant_director', label: '1st Assistant Director (1st AD)' },
  { value: '2nd_assistant_director', label: '2nd Assistant Director (2nd AD)' },
  { value: 'screenwriter', label: 'Screenwriter' },
  { value: 'script_supervisor', label: 'Script Supervisor' },
  { value: 'director_of_photography', label: 'Director of Photography (DP)' },
  { value: 'cinematographer', label: 'Cinematographer' },
  { value: 'camera_operator', label: 'Camera Operator' },
  { value: '1st_ac_focus_puller', label: '1st AC (Focus Puller)' },
  { value: '2nd_ac_clapper_loader', label: '2nd AC (Clapper/Loader)' },
  { value: 'dit', label: 'DIT (Digital Imaging Technician)' },
  { value: 'gaffer', label: 'Gaffer' },
  { value: 'key_grip', label: 'Key Grip' },
  { value: 'grip', label: 'Grip' },
  { value: 'sound_mixer', label: 'Sound Mixer' },
  { value: 'boom_operator', label: 'Boom Operator' },
  { value: 'sound_designer', label: 'Sound Designer' },
  { value: 'composer', label: 'Composer' },
  { value: 'editor', label: 'Editor' },
  { value: 'assistant_editor', label: 'Assistant Editor' },
  { value: 'colorist', label: 'Colorist' },
  { value: 'vfx_artist', label: 'VFX Artist' },
  { value: 'vfx_supervisor', label: 'VFX Supervisor' },
  { value: 'motion_graphics_artist', label: 'Motion Graphics Artist' },
  { value: 'production_designer', label: 'Production Designer' },
  { value: 'art_director', label: 'Art Director' },
  { value: 'set_decorator', label: 'Set Decorator' },
  { value: 'costume_designer', label: 'Costume Designer' },
  { value: 'hair_makeup', label: 'Hair & Makeup' },
  { value: 'location_manager', label: 'Location Manager' },
  { value: 'casting_director', label: 'Casting Director' },
  { value: 'actor', label: 'Actor' },
  { value: 'studio_runner_pa', label: 'Studio Runner / Production Assistant' },
  { value: 'other', label: 'Other' },
]

const COUNTRIES: DarkSelectOption[] = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
].map((c) => ({ value: c, label: c }))

const inputBaseDark =
  'w-full border-b border-gray-600 bg-transparent px-0 py-3 text-base text-white placeholder-gray-500 focus:border-white focus:outline-none disabled:opacity-50'
const inputBaseLight =
  'w-full border-b border-gray-300 bg-transparent px-0 py-3 text-base placeholder-gray-400 focus:border-black focus:outline-none disabled:opacity-50'
const btnPrimaryDark =
  'w-full border border-white bg-white px-6 py-3 text-sm font-medium text-black rounded-[12px] transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:cursor-not-allowed disabled:opacity-50'
const btnPrimaryLight =
  'w-full border border-black bg-black px-6 py-3 text-sm font-medium text-white rounded-[12px] transition-colors hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
const btnSecondaryDark =
  'px-6 py-3 text-sm font-medium text-gray-400 rounded-[12px] transition-colors hover:text-white focus:outline-none disabled:opacity-50'
const btnSecondaryLight =
  'px-6 py-3 text-sm font-medium text-gray-600 rounded-[12px] transition-colors hover:text-gray-900 focus:outline-none disabled:opacity-50'

export default function WaitlistForm({
  variant = 'light',
  onJoinedWaitlist,
  onProfileCompleted,
}: {
  variant?: 'light' | 'dark'
  onJoinedWaitlist?: () => void
  onProfileCompleted?: () => void
}) {
  const isDark = variant === 'dark'
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState('')
  const [role, setRole] = useState('')
  const [orgName, setOrgName] = useState('')
  const [focus, setFocus] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('')
  const [country, setCountry] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isProfileCompleted, setIsProfileCompleted] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [trackingData, setTrackingData] = useState<ReturnType<typeof collectTrackingData> | null>(
    null
  )

  // Collect tracking data on mount
  useEffect(() => {
    setTrackingData(collectTrackingData())
  }, [])

  // After form exit animation (180ms), show success state
  useEffect(() => {
    if (!isExiting) return
    const timer = setTimeout(() => {
      setIsProfileCompleted(true)
      setIsExiting(false)
      onProfileCompleted?.()
    }, 180)
    return () => clearTimeout(timer)
  }, [isExiting, onProfileCompleted])

  const normalizeEmail = (email: string) => {
    return email.trim().toLowerCase()
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const normalizedEmail = normalizeEmail(email)

    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
          source: 'landing',
          attribution: trackingData?.attribution || {},
          meta: trackingData?.meta || {},
          columns: trackingData?.columns || {},
        }),
      })

      const data = await response.json()

      if (!data.ok) {
        setMessage({
          type: 'error',
          text: data.error || 'Something went wrong. Please try again.',
        })
      } else {
        setMessage({ type: 'success', text: "You're on the list." })
        setStep('profile')
        onJoinedWaitlist?.()
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const normalizedEmail = normalizeEmail(email)

    try {
      const response = await fetch('/api/waitlist-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
          user_type: userType || null,
          role: userType === 'individual' ? role || null : null,
          org_name: userType && userType !== 'individual' ? orgName || null : null,
          focus: focus || null,
          experience_level: experienceLevel || null,
          country: country || null,
          attribution: trackingData?.attribution || {},
          meta: trackingData?.meta || {},
        }),
      })

      const data = await response.json()

      if (!data.ok) {
        setMessage({
          type: 'error',
          text: data.error || 'Something went wrong. Please try again.',
        })
      } else {
        setIsExiting(true)
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  if (step === 'email') {
    return (
      <form onSubmit={handleEmailSubmit} className="filmry-glass mx-auto max-w-md rounded-xl px-6 py-6">
        <div className={`mb-4 ${isDark ? 'hero-email-wrap' : ''}`}>
          <label htmlFor={isDark ? 'hero-email' : 'email'} className="sr-only">
            Email address
          </label>
          <input
            id={isDark ? 'hero-email' : 'email'}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={isLoading}
            className={isDark ? 'w-full bg-transparent px-0 py-3 text-base text-white focus:outline-none disabled:opacity-50' : inputBaseLight}
          />
          {isDark && <div className="hero-email-underline" aria-hidden />}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          id="hero-join-cta"
          data-cta="join-waitlist"
          className={
            isDark
              ? 'hero-cta-premium w-full px-6 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50'
              : `${btnPrimaryLight} w-full px-6 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50`
          }
        >
          {isLoading ? 'Joining...' : 'Join waitlist'}
        </button>
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.type === 'success' ? (isDark ? 'text-gray-400' : 'text-gray-600') : isDark ? 'text-red-400' : 'text-red-600'
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    )
  }

  const showRoleSelector = userType === 'individual'
  const showOrgName = userType && userType !== 'individual'

  if (isProfileCompleted) {
    return (
      <div
        className="profile-complete-enter mx-auto max-w-md min-h-[280px] flex items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <p className={`flex items-center justify-center gap-2 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <svg
            className="h-4 w-4 shrink-0 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          You're on the list. Profile saved.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md min-h-[280px]">
      <form
        onSubmit={handleProfileSubmit}
        className={`filmry-glass rounded-xl px-6 py-6 ${isExiting ? 'profile-form-exit' : ''}`}
      >
        <div className="mb-4">
          <label id="user-type-label" htmlFor="user-type" className="sr-only">
            You are joining as
          </label>
          <DarkSelect
            id="user-type"
            options={USER_TYPES}
            value={userType}
            onChange={(v) => {
              setUserType(v)
              if (v !== 'individual') setRole('')
              if (v === 'individual') setOrgName('')
            }}
            placeholder="You are joining as:"
            disabled={isLoading}
          />
        </div>
        {showRoleSelector && (
          <div className="mb-4">
            <label id="role-label" htmlFor="role" className="sr-only">
              Role
            </label>
            <DarkSelect
              id="role"
              options={ROLES}
              value={role}
              onChange={setRole}
              placeholder="Select your role"
              disabled={isLoading}
            />
          </div>
        )}
        <div className="mb-4">
          <label id="experience-level-label" htmlFor="experience-level" className="sr-only">
            Experience level
          </label>
          <DarkSelect
            id="experience-level"
            options={EXPERIENCE_LEVEL_OPTIONS}
            value={experienceLevel}
            onChange={setExperienceLevel}
            placeholder="Experience level"
            disabled={isLoading}
          />
        </div>
        {showOrgName && (
          <div className="mb-4">
            <label
              htmlFor="org-name"
              className={`mb-1 block text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              {ORG_NAME_LABEL_BY_USER_TYPE[userType] ?? 'Company / Team name'}
            </label>
            <input
              id="org-name"
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              disabled={isLoading}
              className={isDark ? inputBaseDark : inputBaseLight}
            />
          </div>
        )}
        <div className="mb-4">
          <label id="focus-label" htmlFor="focus" className="sr-only">
            Focus
          </label>
          <DarkSelect
            id="focus"
            options={FOCUS_OPTIONS}
            value={focus}
            onChange={setFocus}
            placeholder="Focus"
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <label id="country-label" htmlFor="country" className="sr-only">
            Country
          </label>
          <DarkCombobox
            id="country"
            options={COUNTRIES}
            value={country}
            onChange={setCountry}
            placeholder="Country"
            disabled={isLoading}
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className={`btn-cinematic flex-1 ${isDark ? btnPrimaryDark : btnPrimaryLight}`}
          >
            {isLoading ? 'Saving...' : 'Complete profile'}
          </button>
          <button
            type="button"
            onClick={() => setStep('email')}
            disabled={isLoading}
            className={`btn-cinematic ${isDark ? btnSecondaryDark : btnSecondaryLight}`}
          >
            Skip
          </button>
        </div>
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.type === 'success' ? (isDark ? 'text-gray-400' : 'text-gray-600') : isDark ? 'text-red-400' : 'text-red-600'
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  )
}


