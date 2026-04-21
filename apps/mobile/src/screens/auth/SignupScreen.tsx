import React, { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView,
  Platform, ActivityIndicator,
} from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { supabase } from '../../lib/supabase'
import type { RootStackParamList } from '../../navigation'

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>
}

export default function SignupScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSignup() {
    if (!fullName || !email || !password) {
      setError('Please fill in all fields.')
      return
    }
    if (password.length < 8) {
      setError('Your password must be at least 8 characters long.')
      return
    }
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, subscription_plan: 'free' } },
    })
    if (error) {
      setError('Something went wrong. Please check your details and try again.')
      setLoading(false)
      return
    }
    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successEmoji}>📧</Text>
        <Text style={styles.successHeading}>Check your email!</Text>
        <Text style={styles.successBody}>
          We sent a confirmation link to{' '}
          <Text style={{ fontWeight: '700' }}>{email}</Text>.{' '}
          Tap the link to activate your account.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.backBtn}
          accessibilityRole="button"
        >
          <Text style={styles.backBtnText}>← Back to sign in</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.logo}>💊</Text>
        <Text style={styles.appName}>RxConnect</Text>
        <Text style={styles.tagline}>Prescription management made simple</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Create your account</Text>
          <Text style={styles.subheading}>Free to start. No credit card needed.</Text>

          {/* Free tier callout */}
          <View style={styles.freeCallout}>
            <Text style={styles.freeCalloutText}>
              ✅ Free plan includes <Text style={{ fontWeight: '700' }}>4 prescriptions</Text> and home delivery
            </Text>
          </View>

          {!!error && (
            <View style={styles.errorBox} accessibilityRole="alert">
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {[{label: 'Your full name', value: fullName, setter: setFullName, type: 'default', placeholder: 'e.g. Mary Johnson', secure: false},
            {label: 'Email address', value: email, setter: setEmail, type: 'email-address', placeholder: 'you@example.com', secure: false},
            {label: 'Create a password', value: password, setter: setPassword, type: 'default', placeholder: 'At least 8 characters', secure: true}
          ].map(({label, value, setter, type, placeholder, secure}) => (
            <View key={label} style={styles.field}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={setter}
                keyboardType={type as any}
                autoCapitalize={type === 'email-address' ? 'none' : 'words'}
                secureTextEntry={secure}
                placeholder={placeholder}
                placeholderTextColor="#9ca3af"
              />
            </View>
          ))}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignup}
            disabled={loading}
            accessibilityRole="button"
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Create account — it’s free</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.switchBtn}
          accessibilityRole="button"
        >
          <Text style={styles.switchText}>
            Already have an account?{' '}
            <Text style={styles.switchLink}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eff6ff' },
  scroll: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 24, paddingTop: 60 },
  logo: { fontSize: 56, marginBottom: 8 },
  appName: { fontSize: 30, fontWeight: 'bold', color: '#1d4ed8', marginBottom: 4 },
  tagline: { fontSize: 16, color: '#6b7280', marginBottom: 32, textAlign: 'center' },
  card: {
    backgroundColor: '#fff', borderRadius: 20, padding: 28, width: '100%',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3, marginBottom: 24,
  },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  subheading: { fontSize: 16, color: '#6b7280', marginBottom: 16 },
  freeCallout: {
    backgroundColor: '#eff6ff', borderRadius: 12, padding: 12, marginBottom: 20,
  },
  freeCalloutText: { color: '#1d4ed8', fontSize: 14 },
  errorBox: {
    backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fca5a5',
    borderRadius: 12, padding: 14, marginBottom: 20,
  },
  errorText: { color: '#dc2626', fontSize: 16, lineHeight: 22 },
  field: { marginBottom: 20 },
  label: { fontSize: 17, fontWeight: '600', color: '#374151', marginBottom: 8 },
  input: {
    borderWidth: 1.5, borderColor: '#d1d5db', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14, fontSize: 18,
    color: '#111827', backgroundColor: '#fff', minHeight: 56,
  },
  button: {
    backgroundColor: '#2563eb', borderRadius: 14, paddingVertical: 16,
    alignItems: 'center', marginTop: 4, minHeight: 56,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  switchBtn: { minHeight: 44, justifyContent: 'center' },
  switchText: { fontSize: 16, color: '#6b7280', textAlign: 'center' },
  switchLink: { color: '#2563eb', fontWeight: '600' },
  successContainer: {
    flex: 1, backgroundColor: '#eff6ff',
    alignItems: 'center', justifyContent: 'center', padding: 32,
  },
  successEmoji: { fontSize: 64, marginBottom: 16 },
  successHeading: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 12, textAlign: 'center' },
  successBody: { fontSize: 17, color: '#6b7280', textAlign: 'center', lineHeight: 26 },
  backBtn: { marginTop: 32, minHeight: 44, justifyContent: 'center' },
  backBtnText: { fontSize: 17, color: '#2563eb', fontWeight: '600' },
})
