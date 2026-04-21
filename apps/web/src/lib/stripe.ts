import Stripe from 'stripe'

/**
 * Server-side Stripe client.
 * NEVER import this in client components — it uses the secret key.
 * The secret key must stay on the server only.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})

// Plan ID → Stripe Price ID mapping
export const STRIPE_PRICE_IDS: Record<string, string> = {
  plus:   process.env.STRIPE_PLUS_PRICE_ID!,
  family: process.env.STRIPE_FAMILY_PRICE_ID!,
}

// Stripe Price ID → Plan ID mapping (used in webhooks)
export function getPlanFromPriceId(priceId: string): string {
  const entry = Object.entries(STRIPE_PRICE_IDS).find(([, id]) => id === priceId)
  return entry?.[0] ?? 'free'
}
