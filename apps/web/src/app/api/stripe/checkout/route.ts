import { NextResponse } from 'next/server'
import { stripe, STRIPE_PRICE_IDS } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

/**
 * POST /api/stripe/checkout
 *
 * Creates a Stripe Checkout Session for the given plan.
 * Returns a URL — the client redirects the user there.
 *
 * Flow:
 * 1. Verify user is logged in
 * 2. Get or create a Stripe Customer for this user
 * 3. Create a Checkout Session
 * 4. Return the session URL
 */
export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { planId } = await request.json()
  const priceId   = STRIPE_PRICE_IDS[planId]
  if (!priceId) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

  // Look up existing Stripe customer ID from the user's profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id, full_name')
    .eq('id', user.id)
    .single()

  let customerId = profile?.stripe_customer_id

  if (!customerId) {
    // First time upgrading — create a new Stripe Customer
    // We store their Supabase user ID in metadata so we can find them in webhooks
    const customer = await stripe.customers.create({
      email: user.email,
      name:  profile?.full_name ?? undefined,
      metadata: { supabase_user_id: user.id },
    })
    customerId = customer.id

    // Save the Stripe customer ID to Supabase so we don't create duplicates
    await supabase
      .from('profiles')
      .update({ stripe_customer_id: customerId })
      .eq('id', user.id)
  }

  // Create the Checkout Session
  // Stripe hosts the payment page — we never handle card numbers
  const session = await stripe.checkout.sessions.create({
    customer:             customerId,
    mode:                 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    metadata: {
      supabase_user_id: user.id,
      plan_id:          planId,
    },
  })

  return NextResponse.json({ url: session.url })
}
