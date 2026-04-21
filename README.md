# 💊 RxConnect

> Automated prescription management & home delivery — built for everyone, especially older adults.

## What is RxConnect?

RxConnect lets users manage all their prescriptions in one place, automatically refills them with their preferred pharmacy, and has them delivered to their door. Built with accessibility at the core — large text, clear navigation, voice assistant support, and simple flows.

## Tech Stack

| Layer | Technology |
|---|---|
| Monorepo | Turborepo |
| Web | Next.js 14 + TypeScript + Tailwind CSS |
| Mobile | React Native + Expo + TypeScript |
| Database + Auth | Supabase |
| Email | Resend |
| Push Notifications | Expo Push + Web Push API |
| Voice Assistants | SiriKit / App Intents (iOS) + Google App Actions (Android) |
| Pharmacy API | NPI Registry + DoseSpot |
| Background Jobs | Supabase Edge Functions |
| Billing | Stripe |

## Project Structure

```
rxconnect/
├── apps/
│   ├── web/          # Next.js 14 web app
│   └── mobile/       # React Native + Expo mobile app
├── packages/
│   └── shared/       # Shared types, constants & utilities
├── turbo.json
└── package.json
```

## Getting Started

1. See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to set up your database
2. Install dependencies: `npm install`
3. Web: `npm run dev --workspace=apps/web`
4. Mobile: `npm run start --workspace=apps/mobile`

## Subscription Plans

| Plan | Price | Features |
|---|---|---|
| Free | $0 | Up to 4 prescriptions, 1 pharmacy |
| Plus | $4.99/mo | Unlimited prescriptions, 10 pharmacies |
| Family | $9.99/mo | Up to 6 family members, caregiver access |

## Voice Assistant Support

- *"Hey Siri, refill my Lisinopril in RxConnect"*
- *"Hey Google, when is my next refill due?"*
- *"Alexa, check my prescription status"*

## Build Stages

- [x] Stage 1 — Monorepo Setup & GitHub Repo
- [x] Stage 2 — Authentication + Freemium Gating
- [ ] Stage 3 — User Profile + Delivery Address
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
