-- ============================================
-- RxConnect Migration 001
-- Run this in your Supabase SQL Editor:
-- Dashboard → SQL Editor → New query → paste → Run
-- ============================================

-- 1. Profiles table
-- Extends Supabase auth.users with app-specific data.
-- Each user gets exactly one profile row.
CREATE TABLE IF NOT EXISTS profiles (
  id                      UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name               TEXT NOT NULL DEFAULT '',
  date_of_birth           DATE,
  notification_preference TEXT DEFAULT 'both'
    CHECK (notification_preference IN ('email', 'push', 'both')),
  subscription_plan       TEXT DEFAULT 'free'
    CHECK (subscription_plan IN ('free', 'plus', 'family')),
  voice_assistant_enabled BOOLEAN DEFAULT false,
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Delivery addresses table
-- Users can have multiple addresses (e.g. Home, Mom's house).
-- One address is marked as the default for auto-refill orders.
CREATE TABLE IF NOT EXISTS delivery_addresses (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  label      TEXT NOT NULL DEFAULT 'Home',
  street     TEXT NOT NULL,
  city       TEXT NOT NULL,
  state      TEXT NOT NULL,
  zip        TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
-- Critical: without RLS, any logged-in user could read anyone's data.
-- With RLS, Supabase enforces that users only access their own rows.
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_addresses ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies — profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 5. RLS Policies — delivery_addresses
CREATE POLICY "Users can manage own addresses"
  ON delivery_addresses FOR ALL USING (auth.uid() = user_id);

-- 6. Auto-create a profile row when a new user signs up.
-- This runs automatically after every INSERT into auth.users.
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 7. Auto-update updated_at whenever a profile row changes.
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
