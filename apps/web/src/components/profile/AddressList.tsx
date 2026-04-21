'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import AddressForm from './AddressForm'
import type { DeliveryAddress } from '@rxconnect/shared'

export default function AddressList({
  addresses: initial,
  userId,
}: {
  addresses: DeliveryAddress[]
  userId: string
}) {
  const [addresses, setAddresses] = useState<DeliveryAddress[]>(initial)
  const [showForm, setShowForm]   = useState(false)
  const [loading, setLoading]     = useState<string | null>(null)

  async function handleSetDefault(id: string) {
    setLoading(id)
    const supabase = createClient()
    // Clear all defaults, then set the selected one
    await supabase.from('delivery_addresses').update({ is_default: false }).eq('user_id', userId)
    await supabase.from('delivery_addresses').update({ is_default: true  }).eq('id', id)
    setAddresses((prev) => prev.map((a) => ({ ...a, is_default: a.id === id })))
    setLoading(null)
  }

  async function handleDelete(id: string) {
    setLoading(id)
    const supabase = createClient()
    await supabase.from('delivery_addresses').delete().eq('id', id)
    setAddresses((prev) => prev.filter((a) => a.id !== id))
    setLoading(null)
  }

  function handleAdded(address: DeliveryAddress) {
    setAddresses((prev) => [...prev, address])
    setShowForm(false)
  }

  return (
    <div className="space-y-4">
      {addresses.length === 0 && !showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <p className="text-3xl mb-2">🏠</p>
          <p className="text-gray-500">No delivery addresses yet. Add one below.</p>
        </div>
      )}

      {addresses.map((addr) => (
        <div
          key={addr.id}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-900 text-base">{addr.label}</span>
              {addr.is_default && (
                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                  Default
                </span>
              )}
            </div>
            <p className="text-gray-600">{addr.street}</p>
            <p className="text-gray-600">
              {addr.city}, {addr.state} {addr.zip}
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            {!addr.is_default && (
              <button
                onClick={() => handleSetDefault(addr.id)}
                disabled={loading === addr.id}
                className="text-sm text-primary-600 hover:underline min-h-[36px] disabled:opacity-50"
              >
                Set default
              </button>
            )}
            <button
              onClick={() => handleDelete(addr.id)}
              disabled={loading === addr.id}
              className="text-sm text-red-500 hover:underline min-h-[36px] disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {showForm ? (
        <AddressForm
          userId={userId}
          onSaved={handleAdded}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <Button variant="secondary" onClick={() => setShowForm(true)}>
          + Add delivery address
        </Button>
      )}
    </div>
  )
}
