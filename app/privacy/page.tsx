import Link from 'next/link'
import Header from '@/components/Header'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#ffffff]">
      <Header />
      <div className="px-6 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[860px]">
          <Link
            href="/"
            className="mb-12 inline-block text-sm text-[#111] opacity-60 transition-opacity hover:opacity-100"
          >
            ← Back to home
          </Link>

          <h1 className="mb-8 text-3xl font-light tracking-tight text-[#111] sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mb-8 text-lg text-[#111] opacity-70">
            How Filmry collects, uses, and protects your data.
          </p>

          <div className="prose prose-sm max-w-none text-[#111] prose-headings:text-[#111] prose-p:text-[#111] prose-li:text-[#111] prose-a:text-[#111] prose-a:underline prose-a:underline-offset-2 hover:prose-a:opacity-80">
          <p className="mb-4">
            Filmry is operated by:
          </p>
          <p className="mb-4">
            Mavren Studios Ltd<br />
            1 Balloon Street<br />
            City Centre<br />
            Manchester<br />
            M4 4BE<br />
            England
          </p>
          <p className="mb-4">
            Phone: 0161 527 6986<br />
            Email: hello@filmry.io
          </p>

          <h2 className="mt-8 mb-4 text-xl font-medium">Introduction</h2>
          <p className="mb-4">
            Filmry is an early-access platform built for filmmakers and production teams.
            We are committed to protecting your personal data and respecting your privacy.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-medium">Information We Collect</h2>
          <p className="mb-4">We may collect:</p>
          <ul className="mb-4 list-disc pl-6">
            <li>Email address</li>
            <li>Role selection</li>
            <li>Country</li>
            <li>IP address</li>
            <li>Browser/device data</li>
            <li>Referral and campaign information</li>
            <li>Usage analytics</li>
          </ul>

          <h2 className="mt-8 mb-4 text-xl font-medium">How We Use Your Data</h2>
          <p className="mb-4">We use collected data to:</p>
          <ul className="mb-4 list-disc pl-6">
            <li>Manage early access invitations</li>
            <li>Improve the Filmry platform</li>
            <li>Understand creator demand</li>
            <li>Communicate product updates</li>
            <li>Maintain security and performance</li>
          </ul>

          <h2 className="mt-8 mb-4 text-xl font-medium">Analytics</h2>
          <p className="mb-4">
            We may use privacy-focused analytics tools to understand traffic and platform usage.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-medium">Data Protection</h2>
          <p className="mb-4">
            We implement reasonable technical and organizational safeguards to protect your information.
            We process data in accordance with applicable international data protection laws.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-medium">Data Sharing</h2>
          <p className="mb-4">
            We do not sell personal data.
            Data may be processed by secure infrastructure providers (hosting, analytics, email).
          </p>

          <h2 className="mt-8 mb-4 text-xl font-medium">Your Rights</h2>
          <p className="mb-4">
            You may request access, correction, or deletion of your data at any time by contacting:
          </p>
          <p className="mb-4">
            <a href="mailto:hello@filmry.io" className="text-[#111] underline">hello@filmry.io</a>
          </p>

          <h2 className="mt-8 mb-4 text-xl font-medium">Updates</h2>
          <p className="mb-4">
            This policy may evolve as Filmry grows.
          </p>
          </div>
        </div>
      </div>
    </main>
  )
}

