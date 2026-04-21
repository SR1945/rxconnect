import { PLAN_LIMITS } from '@rxconnect/shared'
import type { SubscriptionPlan } from '@rxconnect/shared'

/**
 * Freemium Gating Utilities
 *
 * These functions check whether a user on a given plan is allowed to
 * add more prescriptions or pharmacies. They return a plain object
 * so the UI can show a friendly upgrade prompt.
 *
 * Free plan: 4 prescriptions, 1 pharmacy
 * Plus plan: unlimited
 * Family plan: unlimited
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
          ? `Your free plan includes up to ${limit} prescriptions. Upgrade to Plus for unlimited.`
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
          ? `Your free plan includes ${limit} pharmacy. Upgrade to Plus to connect more.`
          : `You've reached your pharmacy limit.`,
    }
  }
  return { allowed: true }
}
