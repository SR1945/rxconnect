# 💊 RxConnect

> Automated prescription management & home delivery — built for everyone, especially older adults.

## Tech Stack

| Layer | Technology |
|---|---|
| Monorepo | Turborepo |
| Web | Next.js 14 + TypeScript + Tailwind CSS |
| Mobile | React Native + Expo + TypeScript |
| Database + Auth | Supabase |
| Email | Resend |
| Push Notifications | Expo Push + Web Push API |
| Voice Assistants | SiriKit (iOS) + Google App Actions (Android) + Alexa |
| Pharmacy API | NPI Registry + DoseSpot |
| Background Jobs | Supabase Edge Functions |
| Billing | Stripe |

## Getting Started

1. See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
2. Run the SQL in [supabase/migrations/001_profiles_and_addresses.sql](./supabase/migrations/001_profiles_and_addresses.sql)
3. `npm install` then `npm run dev --workspace=apps/web`

## Subscription Plans

| Plan | Price | Features |
|---|---|---|
| Free | $0 | Up to 4 prescriptions, 1 pharmacy |
| Plus | $4.99/mo | Unlimited prescriptions, 10 pharmacies |
| Family | $9.99/mo | Up to 6 family members, caregiver access |

## Build Stages

- [x] Stage 1 — Monorepo Setup & GitHub Repo
- [x] Stage 2 — Authentication + Freemium Gating
- [x] Stage 3 — User Profile + Delivery Address
- [ ] Stage 4 — Subscription Billing (Stripe)
- [ ] Stage 5 — Prescription Management + Savings Tips
- [ ] Stage 6 — Pharmacy Search & Connection
- [ ] Stage 7 — Pharmacy Partner Portal
- [ ] Stage 8 — Automated Refill Engine
- [ ] Stage 9 — Pharmacy Order Integration
- [ ] Stage 10 — Notifications (Push + Email)
- [ ] Stage 11 — Voice Assistant Integration (Siri + Google Assistant + Alexa)
- [ ] Stage 12 — Delivery Tracking
- [ ] Stage 13 — Accessibility Polish + Final Review
