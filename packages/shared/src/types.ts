// ============================================
// RxConnect — Shared Types
// ============================================

// --- User ---
export interface User {
  id: string
  email: string
  full_name: string
  date_of_birth: string
  notification_preference: NotificationPreference
  subscription_plan: SubscriptionPlan
  voice_assistant_enabled: boolean
  created_at: string
}

// --- Notifications ---
export type NotificationPreference = 'email' | 'push' | 'both'

// --- Subscription Plans ---
export type SubscriptionPlan = 'free' | 'plus' | 'family'

export const PLAN_LIMITS: Record<SubscriptionPlan, { prescriptions: number; pharmacies: number }> = {
  free:   { prescriptions: 4,   pharmacies: 1  }, // Updated: 4 prescriptions free
  plus:   { prescriptions: 999, pharmacies: 10 },
  family: { prescriptions: 999, pharmacies: 10 },
}

// --- Prescription ---
export interface Prescription {
  id: string
  user_id: string
  medication_name: string
  dosage: string
  frequency: RefillFrequency
  prescribing_doctor: string
  quantity: number
  refills_remaining: number
  last_filled_at: string | null
  next_refill_at: string
  pharmacy_id: string
  status: PrescriptionStatus
  created_at: string
}

export type RefillFrequency = '30_days' | '60_days' | '90_days'

export type PrescriptionStatus =
  | 'active'
  | 'refill_due'
  | 'order_placed'
  | 'shipped'
  | 'delivered'
  | 'expired'

// --- Pharmacy ---
export interface Pharmacy {
  id: string
  npi: string          // National Provider Identifier
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  is_partner: boolean
}

// --- Delivery Address ---
export interface DeliveryAddress {
  id: string
  user_id: string
  label: string
  street: string
  city: string
  state: string
  zip: string
  is_default: boolean
}

// --- Orders ---
export interface Order {
  id: string
  user_id: string
  prescription_id: string
  pharmacy_id: string
  delivery_address_id: string
  status: OrderStatus
  tracking_number: string | null
  placed_at: string
  shipped_at: string | null
  delivered_at: string | null
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed'

// --- Savings Tips ---
export interface SavingsTip {
  prescription_id: string
  provider: 'goodrx' | 'costplus'
  savings_amount: number
  generic_name: string | null
  coupon_url: string
}

// --- Pharmacy Partner ---
export interface PharmacyPartner {
  id: string
  pharmacy_id: string
  contact_name: string
  contact_email: string
  billing_email: string
  per_order_fee: number
  total_orders: number
  joined_at: string
}

// --- Voice Assistant ---
export type VoicePlatform = 'siri' | 'google_assistant' | 'alexa'

export interface VoiceIntent {
  intent_name: string         // e.g. 'RefillPrescription'
  platform: VoicePlatform
  user_id: string
  prescription_id?: string    // Set when intent targets a specific med
  raw_utterance: string       // What the user actually said
  resolved_at: string
  success: boolean
}

// Voice shortcut a user has set up (e.g. 'Hey Siri, refill my blood pressure pill')
export interface VoiceShortcut {
  id: string
  user_id: string
  prescription_id: string
  platform: VoicePlatform
  phrase: string              // Custom phrase the user chose
  intent_name: string
  created_at: string
}
