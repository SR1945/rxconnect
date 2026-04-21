'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

interface Plan {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  highlight?: boolean
}

/**
 * PlanCard — displays one subscription tier.
 * Handles the upgrade button click — calls our checkout API
 * which creates a Stripe Checkout Session and redirects.
 */
export default function PlanCard({
  plan,
  isCurrentPlan,
}: {
  plan: Plan
  isCurrentPlan: boolean
}) {
  const [loading, setLoading] = useState(false)

  async function handleUpgrade() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: plan.id }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url   // Redirect to Stripe's hosted checkout page
    } catch {
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const isPaid = plan.price > 0

  return (
    <div
      className={[
        'bg-white rounded-2xl border-2 p-6 flex flex-col',
        plan.highlight && !isCurrentPlan
          ? 'border-primary-500 shadow-lg'
          : 'border-gray-100 shadow-sm',
        isCurrentPlan ? 'ring-4 ring-primary-100' : '',
      ].join(' ')}
    >
      {/* Most popular badge */}
      {plan.highlight && !isCurrentPlan && (
        <div className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-3">
          ⭐ Most popular
        </div>
      )}

      {/* Plan name + price */}
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
          {isPaid && <span className="text-gray-400 text-base">/mo</span>}
        </div>
        <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
      </div>

      {/* Feature list */}
      <ul className="space-y-2.5 mb-6 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      {isCurrentPlan ? (
        <div className="py-3 text-center text-primary-700 font-semibold bg-primary-50 rounded-xl border border-primary-100">
          ✅ Current plan
        </div>
      ) : plan.id === 'free' ? (
        <p className="text-center text-sm text-gray-400 py-3">
          Contact support to downgrade
        </p>
      ) : (
        <Button
          onClick={handleUpgrade}
          loading={loading}
          fullWidth
          variant={plan.highlight ? 'primary' : 'secondary'}
        >
          Upgrade to {plan.name} →
        </Button>
      )}
    </div>
  )
}
