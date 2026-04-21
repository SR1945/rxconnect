import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/**
 * Dashboard Layout — wraps all /dashboard/* pages.
 * createClient() is now async (awaited), so this component is too.
 * Uses getUser() (server-verified) instead of getSession() for security.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-16">
          <span className="text-xl font-bold text-primary-700">💊 RxConnect</span>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="text-base text-gray-500 hover:text-gray-800 underline px-2 min-h-[44px]"
            >
              Sign out
            </button>
          </form>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
