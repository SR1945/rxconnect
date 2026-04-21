'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Your password must be at least 8 characters long.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          subscription_plan: 'free',  // Everyone starts on free
        },
      },
    })

    if (error) {
      setError('Something went wrong. Please check your details and try again.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  // Success state — email confirmation sent
  if (success) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
        <p className="text-5xl mb-4">📧</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Check your email!</h2>
        <p className="text-gray-500 leading-relaxed">
          We sent a confirmation link to{' '}
          <strong className="text-gray-800">{email}</strong>.<br />
          Click the link to activate your account.
        </p>
        <Link
          href="/login"
          className="block mt-8 text-primary-600 font-semibold no-underline hover:underline"
        >
          ← Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h2>
      <p className="text-gray-500 mb-4">Free to start. No credit card needed.</p>

      {/* Free tier callout */}
      <div className="bg-blue-50 rounded-xl px-4 py-3 mb-6 text-sm text-blue-700 font-medium">
        ✅ Free plan includes <strong>4 prescriptions</strong> and home delivery
      </div>

      {error && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-5">
        <Input
          label="Your full name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
          placeholder="e.g. Mary Johnson"
          required
        />
        <Input
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <Input
          label="Create a password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hint="Must be at least 8 characters"
          autoComplete="new-password"
          required
        />
        <Button type="submit" loading={loading} fullWidth>
          Create account — it&apos;s free
        </Button>
      </form>

      <p className="text-center mt-6 text-gray-500">
        Already have an account?{' '}
        <Link href="/login" className="text-primary-600 font-semibold no-underline hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
