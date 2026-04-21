import Link from 'next/link'

/**
 * Billing Success Page
 * Stripe redirects here after a successful checkout.
 * The webhook (not this page) is what actually upgrades the plan in Supabase.
 */
export default function BillingSuccessPage() {
  return (
    <div className="max-w-md mx-auto text-center py-16">
      <p className="text-6xl mb-6">🎉</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">You’re all set!</h1>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Your subscription is now active. You have full access to your new
        plan’s features.
      </p>
      <Link
        href="/dashboard"
        className="inline-block bg-primary-600 text-white font-semibold px-8 py-4 rounded-xl no-underline hover:bg-primary-700 transition-colors text-base"
      >
        Go to Dashboard →
      </Link>
    </div>
  )
}
