import { createClient } from '@/lib/supabase/server'
import PlanCard from '@/components/billing/PlanCard'
import ManageSubscriptionButton from '@/components/billing/ManageSubscriptionButton'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    features: [
      'Up to 4 prescriptions',
      '1 pharmacy',
      'Home delivery',
      'Email notifications',
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    price: 4.99,
    description: 'For individuals with more needs',
    features: [
      'Unlimited prescriptions',
      '10 pharmacies',
      'Home delivery',
      'Push + email notifications',
      'Savings tips (GoodRx)',
      'Priority support',
    ],
    highlight: true,
  },
  {
    id: 'family',
    name: 'Family',
    price: 9.99,
    description: 'Manage the whole family',
    features: [
      'Up to 6 family members',
      'Unlimited prescriptions',
      '10 pharmacies',
      'Caregiver access',
      'Push + email notifications',
      'Savings tips (GoodRx)',
      'Priority support',
    ],
  },
]

/**
 * Billing Page — server component.
 * Fetches the user's current plan from Supabase,
 * then passes it to the plan cards.
 */
export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_plan, stripe_customer_id')
    .eq('id', user!.id)
    .single()

  const currentPlan        = profile?.subscription_plan ?? 'free'
  const hasStripeCustomer  = !!profile?.stripe_customer_id
  const isOnPaidPlan       = currentPlan !== 'free'

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Billing & Plan</h1>
      <p className="text-gray-500 mb-8">
        You’re on the{' '}
        <strong className="text-gray-800 capitalize">{currentPlan}</strong> plan.
        {currentPlan === 'free' && ' Upgrade anytime — cancel whenever you like.'}
      </p>

      {/* Plan cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-10">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isCurrentPlan={currentPlan === plan.id}
          />
        ))}
      </div>

      {/* Manage subscription button — only show for paying customers */}
      {isOnPaidPlan && hasStripeCustomer && (
        <div className="border-t border-gray-100 pt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Manage Subscription</h2>
          <p className="text-gray-500 mb-4">
            Update your payment method, view invoices, or cancel your plan.
          </p>
          <ManageSubscriptionButton />
        </div>
      )}
    </div>
  )
}
