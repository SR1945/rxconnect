import { NextResponse } from 'next/server'
import { stripe, getPlanFromPriceId } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

/**
 * POST /api/stripe/webhook
 *
 * Stripe calls this endpoint automatically when payment events happen.
 * This is the ONLY place we update subscription plans — never trust
 * the client to report its own payment status.
 *
 * We use the Supabase SERVICE ROLE key here (bypasses RLS) because
 * this route runs as our server, not as a specific user.
 * It's safe because:
 * 1. We verify the Stripe signature before doing anything
 * 2. This route is never called by users directly
 */
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const body      = await request.text()
  const signature = request.headers.get('stripe-signature')!

  // Verify the webhook is actually from Stripe (not a fake request)
  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle each event type
  switch (event.type) {

    // ✅ User completed checkout — upgrade their plan
    case 'checkout.session.completed': {
      const session = event.data.object
      const userId  = session.metadata?.supabase_user_id
      const planId  = session.metadata?.plan_id
      if (userId && planId) {
        await supabaseAdmin
          .from('profiles')
          .update({ subscription_plan: planId, subscription_status: 'active' })
          .eq('id', userId)
      }
      break
    }

    // 🔄 Subscription changed (plan switch, renewal, etc.)
    case 'customer.subscription.updated': {
      const subscription = event.data.object
      const customerId   = subscription.customer as string
      const priceId      = subscription.items.data[0].price.id
      const plan         = getPlanFromPriceId(priceId)
      const status       = subscription.status  // active, past_due, trialing, etc.

      await supabaseAdmin
        .from('profiles')
        .update({ subscription_plan: plan, subscription_status: status })
        .eq('stripe_customer_id', customerId)
      break
    }

    // ❌ Subscription canceled — downgrade to free
    case 'customer.subscription.deleted': {
      const subscription = event.data.object
      const customerId   = subscription.customer as string

      await supabaseAdmin
        .from('profiles')
        .update({ subscription_plan: 'free', subscription_status: 'active' })
        .eq('stripe_customer_id', customerId)
      break
    }

    default:
      // Ignore other event types
      break
  }

  return NextResponse.json({ received: true })
}
