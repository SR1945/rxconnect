import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/**
 * Dashboard Layout — wraps all /dashboard/* pages.
 * Adds a top nav bar with links to Home and Profile.
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
          <div className="flex items-center gap-6">
            <span className="text-xl font-bold text-primary-700">💊 RxConnect</span>
            <div className="hidden sm:flex gap-1">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 text-base font-medium no-underline"
              >
                Home
              </Link>
              <Link
                href="/dashboard/profile"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 text-base font-medium no-underline"
              >
                Profile
              </Link>
            </div>
          </div>
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
