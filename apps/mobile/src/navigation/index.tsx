import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import LoginScreen from '../screens/auth/LoginScreen'
import SignupScreen from '../screens/auth/SignupScreen'
import DashboardScreen from '../screens/dashboard/DashboardScreen'
import ProfileScreen from '../screens/profile/ProfileScreen'

export type AuthStackParamList = {
  Login: undefined
  Signup: undefined
}

export type MainTabParamList = {
  Home: undefined
  Profile: undefined
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>()
const MainTab   = createBottomTabNavigator<MainTabParamList>()

/**
 * Main app tab bar — shown when logged in.
 * Two tabs: Home (prescriptions) and Profile.
 * Large icons + labels for older adults.
 */
function MainTabs() {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const icons: Record<string, string> = {
            Home:    '💊',
            Profile: '👤',
          }
          return (
            <Text style={{ fontSize: 24, opacity: focused ? 1 : 0.5 }}>
              {icons[route.name]}
            </Text>
          )
        },
        tabBarActiveTintColor:   '#2563eb',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarLabelStyle: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
        tabBarStyle:      { height: 64, paddingBottom: 10, paddingTop: 6 },
      })}
    >
      <MainTab.Screen name="Home"    component={DashboardScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
    </MainTab.Navigator>
  )
}

/**
 * Root Navigation
 * Watches Supabase auth state and switches between:
 * - Auth screens (Login, Signup) when logged out
 * - Main tabs (Home, Profile) when logged in
 */
export default function Navigation() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return null

  return (
    <NavigationContainer>
      {session ? (
        <MainTabs />
      ) : (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Login"  component={LoginScreen} />
          <AuthStack.Screen name="Signup" component={SignupScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  )
}
