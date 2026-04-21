import { createBrowserClient } from '@supabase/ssr'

/**
 * Supabase browser client — use in Client Components ('use client').
 * Uses the publishable key (safe to expose in the browser).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
