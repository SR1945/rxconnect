# Supabase Setup Guide

RxConnect uses Supabase for authentication and the database.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click **New Project**, name it `rxconnect`
3. Set a strong database password — save it somewhere safe
4. Choose a region close to your users

## 2. Get Your API Keys

1. In your project dashboard → **Settings → API**
2. Copy:
   - **Project URL** (e.g. `https://abcdefgh.supabase.co`)
   - **Publishable key** (starts with `sb_publishable_...`)

## 3. Add Keys to Your Apps

**Web app — create `apps/web/.env.local`:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key-here
```

**Mobile app — create `apps/mobile/.env`:**
```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key-here
```

> ⚠️ Never commit these files to git. `.env.local` and `.env` are in `.gitignore`.

## 4. Enable Email Auth

1. Dashboard → **Authentication → Providers**
2. Email is enabled by default ✅
3. For local testing: turn off **Confirm email** so you don't need to verify every test account

## 5. Install Dependencies

```bash
# From the repo root
npm install

# Or install Supabase packages specifically
npm install @supabase/supabase-js @supabase/ssr --workspace=apps/web
```

## 6. Run the App

```bash
# Web (visit http://localhost:3000)
npm run dev --workspace=apps/web

# Mobile (scan QR with Expo Go on your phone)
npm run start --workspace=apps/mobile
```

You can now sign up, log in, and see the dashboard! 🎉
