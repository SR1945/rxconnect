# Stripe Setup Guide

RxConnect uses Stripe for subscription billing. Follow these steps to wire it up.

## 1. Create a Stripe Account

Go to [stripe.com](https://stripe.com) and sign up. It's free to get started and use test mode.

## 2. Get Your API Keys

1. In your Stripe dashboard → **Developers → API keys**
2. Copy your **Publishable key** and **Secret key** (use the test versions for now)
3. Add to `apps/web/.env.local`:
```
STRIPE_SECRET_KEY=sk_test_...
```

## 3. Create Products & Prices

1. Stripe Dashboard → **Product catalog → Add product**
2. Create **Plus** product:
   - Name: RxConnect Plus
   - Price: $4.99/month, recurring
   - Copy the **Price ID** (starts with `price_`)
3. Create **Family** product:
   - Name: RxConnect Family
   - Price: $9.99/month, recurring
   - Copy the **Price ID**
4. Add to `.env.local`:
```
STRIPE_PLUS_PRICE_ID=price_...
STRIPE_FAMILY_PRICE_ID=price_...
```

## 4. Set Up Webhooks (Local Testing)

Webhooks are how Stripe tells your app that a payment succeeded.

1. Install the Stripe CLI: [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Run your Next.js app: `npm run dev --workspace=apps/web`
3. In a new terminal, forward webhooks:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
4. Copy the **webhook signing secret** it prints (starts with `whsec_`)
5. Add to `.env.local`:
```
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 5. Add the App URL

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 6. Add Supabase Service Role Key

The webhook handler needs to update any user's profile (bypassing RLS).

1. Supabase Dashboard → **Settings → API**
2. Copy the **service_role** key (keep this secret — never expose to browser)
3. Add to `.env.local`:
```
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## 7. Test the Flow

1. Click **Upgrade to Plus** in the app
2. Use Stripe's test card: `4242 4242 4242 4242`, any future date, any CVC
3. You should be redirected to the success page
4. Check your Supabase `profiles` table — `subscription_plan` should be `plus`

## Production Checklist

- [ ] Switch to live Stripe keys
- [ ] Set up production webhook endpoint in Stripe dashboard
- [ ] Set `NEXT_PUBLIC_APP_URL` to your production URL
