import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import LoginScreen from '../screens/auth/LoginScreen'
import SignupScreen from '../screens/auth/SignupScreen'
import DashboardScreen from '../screens/dashboard/DashboardScreen'

/**
 * Root navigation type — all screens and their params.
 * TypeScript uses this to catch navigation bugs at compile time.
 */
export type RootStackParamList = {
  Login: undefined
  Signup: undefined
  Dashboard: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

/**
 * Navigation Component
 *
 * This is the root of our mobile app's navigation.
 * It watches the Supabase auth state and switches between:
 *   - Auth screens (Login, Signup) when logged out
 *   - App screens (Dashboard, ...) when logged in
 *
 * No manual redirects needed — changing session state triggers a re-render
 * and React Navigation automatically shows the right screens.
 */
export default function Navigation() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for an existing session when the app opens
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Subscribe to login/logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Show nothing while we check the session — avoids a flicker
  if (loading) return null

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          // Logged in — show the main app
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        ) : (
          // Logged out — show auth screens
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
