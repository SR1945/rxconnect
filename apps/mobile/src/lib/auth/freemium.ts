import { PLAN_LIMITS } from '@rxconnect/shared'
import type { SubscriptionPlan } from '@rxconnect/shared'

/**
 * Freemium gating for mobile.
 * Same logic as web — lives in shared constants but called here
 * to show native Alert dialogs when limits are hit.
 */

export function canAddPrescription(
  plan: SubscriptionPlan,
  currentCount: number
): { allowed: boolean; reason?: string } {
  const limit = PLAN_LIMITS[plan].prescriptions
  if (currentCount >= limit) {
    return {
      allowed: false,
      reason:
        plan === 'free'
          ? `Your free plan includes up to ${limit} prescriptions.\n\nUpgrade to Plus for unlimited prescriptions.`
          : `You've reached your prescription limit.`,
    }
  }
  return { allowed: true }
}

export function canAddPharmacy(
  plan: SubscriptionPlan,
  currentCount: number
): { allowed: boolean; reason?: string } {
  const limit = PLAN_LIMITS[plan].pharmacies
  if (currentCount >= limit) {
    return {
      allowed: false,
      reason:
        plan === 'free'
          ? `Your free plan includes ${limit} pharmacy.\n\nUpgrade to Plus to connect more pharmacies.`
          : `You've reached your pharmacy limit.`,
    }
  }
  return { allowed: true }
}
