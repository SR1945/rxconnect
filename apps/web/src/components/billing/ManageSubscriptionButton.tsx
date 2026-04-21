'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

/**
 * Manage Subscription Button
 * Opens Stripe's Customer Portal — users can update payment,
 * view invoices, or cancel their subscription there.
 */
export default function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false)

  async function handleManage() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const { url } = await res.json()
      window.location.href = url
    } catch {
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <Button variant="secondary" onClick={handleManage} loading={loading}>
      Manage subscription →
    </Button>
  )
}
