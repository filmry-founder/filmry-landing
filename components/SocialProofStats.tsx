'use client'

function formatCount(n: number): string {
  return n.toLocaleString()
}

export default function SocialProofStats({
  total,
  today,
  loading,
}: {
  total: number | null
  today: number | null
  loading: boolean
}) {
  if (loading && total === null) {
    return (
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-gray-500">
        <span className="inline-block h-5 w-32 animate-pulse rounded bg-white/10" />
        <span className="inline-block h-5 w-24 animate-pulse rounded bg-white/10" />
      </div>
    )
  }

  const displayTotal = total ?? 0
  const displayToday = today ?? 0

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-gray-400">
      <span>
        <strong className="font-medium text-gray-300">{formatCount(displayTotal)}</strong>{' '}
        creators on the waitlist
      </span>
      <span>
        Joined today: <strong className="font-medium text-gray-300">{formatCount(displayToday)}</strong>
      </span>
    </div>
  )
}
