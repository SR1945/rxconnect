import React, { useEffect, useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, SafeAreaView,
  ActivityIndicator, Alert,
} from 'react-native'
import { supabase } from '../../lib/supabase'
import type { NotificationPreference } from '@rxconnect/shared'

const NOTIFICATION_OPTIONS: {
  value: NotificationPreference
  emoji: string
  label: string
}[] = [
  { value: 'email', emoji: '📧', label: 'Email only' },
  { value: 'push',  emoji: '📱', label: 'Push only'  },
  { value: 'both',  emoji: '🔔', label: 'Both (recommended)' },
]

export default function ProfileScreen() {
  const [fullName,  setFullName]  = useState('')
  const [dob,       setDob]       = useState('')
  const [notifPref, setNotifPref] = useState<NotificationPreference>('both')
  const [loading,   setLoading]   = useState(true)
  const [saving,    setSaving]    = useState(false)

  useEffect(() => { loadProfile() }, [])

  async function loadProfile() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (data) {
      setFullName(data.full_name ?? '')
      setDob(data.date_of_birth ?? '')
      setNotifPref(data.notification_preference ?? 'both')
    }
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name:               fullName,
        date_of_birth:           dob || null,
        notification_preference: notifPref,
      })
      .eq('id', user!.id)

    setSaving(false)
    if (error) {
      Alert.alert('Error', 'Could not save your changes. Please try again.')
    } else {
      Alert.alert('Saved! ✅', 'Your profile has been updated.')
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.subtitle}>Keep your information up to date</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          {/* Full name */}
          <View style={styles.field}>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              autoComplete="name"
              placeholder="Your full name"
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Date of birth */}
          <View style={styles.field}>
            <Text style={styles.label}>Date of birth</Text>
            <Text style={styles.hint}>Format: YYYY-MM-DD (e.g. 1955-04-12)</Text>
            <TextInput
              style={styles.input}
              value={dob}
              onChangeText={setDob}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#9ca3af"
              keyboardType="numbers-and-punctuation"
            />
          </View>

          {/* Notification preference — big tap targets */}
          <View style={styles.field}>
            <Text style={styles.label}>Notifications</Text>
            <Text style={styles.hint}>How would you like to be notified?</Text>
            <View style={styles.notifOptions}>
              {NOTIFICATION_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    styles.notifOption,
                    notifPref === opt.value && styles.notifOptionActive,
                  ]}
                  onPress={() => setNotifPref(opt.value)}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: notifPref === opt.value }}
                >
                  <Text style={styles.notifEmoji}>{opt.emoji}</Text>
                  <Text style={[
                    styles.notifLabel,
                    notifPref === opt.value && styles.notifLabelActive,
                  ]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, saving && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={saving}
            accessibilityRole="button"
          >
            {saving
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.buttonText}>Save changes</Text>
            }
          </TouchableOpacity>
        </View>

        {/* Sign out */}
        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={() => supabase.auth.signOut()}
          accessibilityRole="button"
          accessibilityLabel="Sign out"
        >
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' },
  container:  { flex: 1, backgroundColor: '#f9fafb' },
  scroll:     { padding: 20, paddingBottom: 48 },
  title:    { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#6b7280', marginBottom: 24 },
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, marginBottom: 24,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 20 },
  field:   { marginBottom: 22 },
  label:   { fontSize: 17, fontWeight: '600', color: '#374151', marginBottom: 4 },
  hint:    { fontSize: 13, color: '#9ca3af', marginBottom: 8 },
  input: {
    borderWidth: 1.5, borderColor: '#d1d5db', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 18, color: '#111827', backgroundColor: '#fff', minHeight: 56,
  },
  notifOptions: { gap: 10 },
  notifOption: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 1.5, borderColor: '#e5e7eb',
    borderRadius: 12, padding: 14, minHeight: 56,
  },
  notifOptionActive: { borderColor: '#2563eb', backgroundColor: '#eff6ff' },
  notifEmoji:       { fontSize: 22 },
  notifLabel:       { fontSize: 16, color: '#6b7280', fontWeight: '500' },
  notifLabelActive: { color: '#1d4ed8', fontWeight: '700' },
  button: {
    backgroundColor: '#2563eb', borderRadius: 14,
    paddingVertical: 16, alignItems: 'center', minHeight: 56, marginTop: 4,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText:     { color: '#fff', fontSize: 18, fontWeight: '700' },
  signOutBtn:  { alignItems: 'center', minHeight: 44, justifyContent: 'center' },
  signOutText: { fontSize: 16, color: '#9ca3af', textDecorationLine: 'underline' },
})
