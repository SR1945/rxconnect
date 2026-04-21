import { createClient } from '@/lib/supabase/server'
import ProfileForm from '@/components/profile/ProfileForm'
import AddressList from '@/components/profile/AddressList'

/**
 * Profile Page — server component.
 * Fetches the user's profile and addresses in parallel,
 * then passes them down to the client-side form components.
 */
export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch profile and addresses at the same time (parallel, not sequential)
  const [{ data: profile }, { data: addresses }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user!.id).single(),
    supabase
      .from('delivery_addresses')
      .select('*')
      .eq('user_id', user!.id)
      .order('is_default', { ascending: false }),
  ])

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-500 mt-1">Keep your information up to date</p>
      </div>

      <ProfileForm profile={profile} userId={user!.id} />

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">🏠 Delivery Addresses</h2>
        <AddressList addresses={addresses ?? []} userId={user!.id} />
      </div>
    </div>
  )
}
