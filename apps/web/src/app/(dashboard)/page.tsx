import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] ?? 'there'

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Hello, {firstName}! 👋
      </h1>
      <p className="text-gray-500 mb-8">
        Welcome to RxConnect. Your prescriptions will appear here.
      </p>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
        <p className="text-5xl mb-4">💊</p>
        <p className="text-lg font-semibold text-gray-700">No prescriptions yet.</p>
        <p className="text-gray-400 mt-2">Prescription management is coming in Stage 5.</p>
      </div>
    </div>
  )
}
