# 💊 RxConnect

> Automated prescription management & home delivery — built for everyone, especially older adults.

## What is RxConnect?

RxConnect lets users manage all their prescriptions in one place, automatically refills them with their preferred pharmacy, and has them delivered to their door. Built with accessibility at the core — large text, clear navigation, and simple flows.

## Tech Stack

| Layer | Technology |
|---|---|
| Monorepo | Turborepo |
| Web | Next.js 14 + TypeScript + Tailwind CSS |
| Mobile | React Native + Expo + TypeScript |
| Database + Auth | Supabase |
| Email | Resend |
| Push Notifications | Expo Push + Web Push API |
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
├── turbo.json        # Turborepo pipeline config
└── package.json      # Root workspace config
```

## Getting Started

```bash
# Install dependencies
npm install

# Run web app
npm run dev --workspace=apps/web

# Run mobile app
npm run start --workspace=apps/mobile
```

## Subscription Plans

| Plan | Price | Features |
|---|---|---|
| Free | $0 | Up to 3 prescriptions, 1 pharmacy |
| Plus | $4.99/mo | Unlimited prescriptions, 10 pharmacies |
| Family | $9.99/mo | Up to 6 family members, caregiver access |

## Stages

- [x] Stage 1 — Monorepo Setup & GitHub Repo
- [ ] Stage 2 — Authentication + Freemium Gating
- [ ] Stage 3 — User Profile + Delivery Address
- [ ] Stage 4 — Subscription Billing (Stripe)
- [ ] Stage 5 — Prescription Management + Savings Tips
- [ ] Stage 6 — Pharmacy Search & Connection
- [ ] Stage 7 — Pharmacy Partner Portal
- [ ] Stage 8 — Automated Refill Engine
- [ ] Stage 9 — Pharmacy Order Integration
- [ ] Stage 10 — Notifications
- [ ] Stage 11 — Delivery Tracking
- [ ] Stage 12 — Accessibility Polish + Final Review
