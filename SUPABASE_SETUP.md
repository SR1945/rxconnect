# Supabase Setup Guide

RxConnect uses Supabase for authentication and the database. Follow these steps to get your project running.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up (it's free)
2. Click **New Project**
3. Give it a name: `rxconnect`
4. Set a strong database password and save it somewhere safe
5. Choose a region close to your users (e.g. US East)

## 2. Get Your API Keys

1. In your project dashboard, go to **Settings → API**
2. Copy:
   - **Project URL** (looks like `https://abcdefgh.supabase.co`)
   - **anon / public key** (the long string starting with `eyJ...`)

## 3. Add Keys to Your Apps

**Web app:**
```bash
cd apps/web
cp .env.example .env.local
# Edit .env.local and paste your URL and anon key
```

**Mobile app:**
```bash
cd apps/mobile
cp .env.example .env
# Edit .env and paste your URL and anon key
```

## 4. Enable Email Auth

1. In Supabase dashboard, go to **Authentication → Providers**
2. Make sure **Email** is enabled (it is by default)
3. For development, you can turn off **Confirm email** so you don't need to verify every test account

## 5. Run the App

```bash
# Web
npm run dev --workspace=apps/web
# Visit http://localhost:3000

# Mobile (you'll need Expo Go app on your phone)
npm run start --workspace=apps/mobile
```

That's it! You can now sign up, log in, and see the dashboard. 🎉
