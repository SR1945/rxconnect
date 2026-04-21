import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * POST /auth/signout
 * Signs the user out and redirects them to the login page.
 * Called by the sign out button in the dashboard nav.
 */
export async function POST() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
