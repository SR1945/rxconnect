'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import type { NotificationPreference } from '@rxconnect/shared'

interface Profile {
  id: string
  full_name: string
  date_of_birth: string | null
  notification_preference: NotificationPreference
  subscription_plan: string
}

const NOTIFICATION_OPTIONS: {
  value: NotificationPreference
  emoji: string
  label: string
  desc: string
}[] = [
  { value: 'email', emoji: '📧', label: 'Email only',           desc: 'Get notified by email' },
  { value: 'push',  emoji: '📱', label: 'Push only',            desc: 'Notifications on your phone' },
  { value: 'both',  emoji: '🔔', label: 'Both (recommended)',   desc: 'Email + phone' },
]

export default function ProfileForm({
  profile,
  userId,
}: {
  profile: Profile | null
  userId: string
}) {
  const [fullName, setFullName]   = useState(profile?.full_name ?? '')
  const [dob, setDob]             = useState(profile?.date_of_birth ?? '')
  const [notifPref, setNotifPref] = useState<NotificationPreference>(
    profile?.notification_preference ?? 'both'
  )
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState('')

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError('')

    const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name:               fullName,
        date_of_birth:           dob || null,
        notification_preference: notifPref,
      })
      .eq('id', userId)

    if (error) {
      setError('Could not save your changes. Please try again.')
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 4000)
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSave}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6"
    >
      <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>

      {error && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
          {error}
        </div>
      )}
      {success && (
        <div role="status" className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 font-medium">
          ✅ Changes saved!
        </div>
      )}

      <Input
        label="Full name"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        autoComplete="name"
        required
      />

      <Input
        label="Date of birth"
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        hint="Used to verify your identity with the pharmacy"
      />

      {/* Notification preference — big tap targets for older adults */}
      <div>
        <p className="text-base font-semibold text-gray-700 mb-3">
          How would you like to be notified?
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {NOTIFICATION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setNotifPref(opt.value)}
              aria-pressed={notifPref === opt.value}
              className={[
                'flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all min-h-[100px]',
                notifPref === opt.value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300',
              ].join(' ')}
            >
              <span className="text-2xl mb-1">{opt.emoji}</span>
              <span className="font-semibold text-sm">{opt.label}</span>
              <span className="text-xs mt-1 opacity-75">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" loading={loading}>
        Save changes
      </Button>
    </form>
  )
}
