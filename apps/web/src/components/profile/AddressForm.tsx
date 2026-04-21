'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import type { DeliveryAddress } from '@rxconnect/shared'

const LABELS = ['Home', 'Work', "Mom's house", "Dad's house", 'Other']

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
]

export default function AddressForm({
  userId,
  onSaved,
  onCancel,
}: {
  userId: string
  onSaved: (address: DeliveryAddress) => void
  onCancel: () => void
}) {
  const [label,  setLabel]  = useState('Home')
  const [street, setStreet] = useState('')
  const [city,   setCity]   = useState('')
  const [state,  setState]  = useState('')
  const [zip,    setZip]    = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { data, error } = await supabase
      .from('delivery_addresses')
      .insert({ user_id: userId, label, street, city, state, zip, is_default: false })
      .select()
      .single()

    if (error) {
      setError('Could not save address. Please try again.')
      setLoading(false)
      return
    }

    onSaved(data as DeliveryAddress)
  }

  return (
    <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6 space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Add Delivery Address</h3>

      {error && (
        <p role="alert" className="text-red-600 text-sm">{error}</p>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        {/* Label selector */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Address label
          </label>
          <select
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-4 py-3 text-base rounded-xl border-2 border-gray-300 bg-white focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 min-h-[52px]"
          >
            {LABELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <Input
          label="Street address"
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="123 Main St"
          autoComplete="street-address"
          required
        />
        <Input
          label="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          autoComplete="address-level2"
          required
        />

        {/* State selector */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className="w-full px-4 py-3 text-base rounded-xl border-2 border-gray-300 bg-white focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 min-h-[52px]"
          >
            <option value="">Select your state</option>
            {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <Input
          label="ZIP code"
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          maxLength={5}
          pattern="[0-9]{5}"
          placeholder="e.g. 10001"
          autoComplete="postal-code"
          required
        />

        <div className="flex gap-3">
          <Button type="submit" loading={loading}>Save address</Button>
          <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}
