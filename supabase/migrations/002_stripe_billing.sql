-- ============================================
-- RxConnect Migration 002
-- Adds Stripe billing fields to profiles
-- Run in Supabase SQL Editor after migration 001
-- ============================================

-- Add Stripe customer ID so we can link a Supabase user to a Stripe customer
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'active'
    CHECK (subscription_status IN ('active', 'canceled', 'past_due', 'trialing'));

-- Index so webhook lookups by stripe_customer_id are fast
CREATE INDEX IF NOT EXISTS profiles_stripe_customer_id_idx
  ON profiles (stripe_customer_id);
