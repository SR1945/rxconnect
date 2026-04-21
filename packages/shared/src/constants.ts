// ============================================
// RxConnect — Shared Constants
// ============================================

export const APP_NAME = 'RxConnect'
export const APP_TAGLINE = 'Prescription management made simple.'

// Subscription pricing (USD/month)
export const SUBSCRIPTION_PRICES = {
  free:   0,
  plus:   4.99,
  family: 9.99,
} as const

// Human-readable labels
export const REFILL_FREQUENCY_LABELS: Record<string, string> = {
  '30_days': '30-day supply',
  '60_days': '60-day supply',
  '90_days': '90-day supply',
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending:          'Order Pending',
  confirmed:        'Order Confirmed',
  processing:       'Being Prepared',
  shipped:          'Shipped',
  out_for_delivery: 'Out for Delivery',
  delivered:        'Delivered',
  failed:           'Order Failed',
}

export const PRESCRIPTION_STATUS_LABELS: Record<string, string> = {
  active:       'Active',
  refill_due:   'Refill Due',
  order_placed: 'Order Placed',
  shipped:      'Shipped',
  delivered:    'Delivered',
  expired:      'Expired',
}

// Days before refill due date to trigger auto-order
export const REFILL_ADVANCE_DAYS = 7

// Free tier limits (updated: 4 prescriptions, 1 pharmacy)
export const FREE_TIER_MAX_PRESCRIPTIONS = 4
export const FREE_TIER_MAX_PHARMACIES = 1

// Voice assistant supported platforms
export const VOICE_PLATFORMS = ['siri', 'google_assistant', 'alexa'] as const

// Voice assistant intent names (used across iOS Siri + Google App Actions)
export const VOICE_INTENTS = {
  REFILL_PRESCRIPTION:    'RefillPrescription',
  CHECK_REFILL_STATUS:    'CheckRefillStatus',
  LIST_PRESCRIPTIONS:     'ListPrescriptions',
  CHECK_NEXT_REFILL_DATE: 'CheckNextRefillDate',
  TRACK_DELIVERY:         'TrackDelivery',
} as const
