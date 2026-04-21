import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { supabase } from '../../lib/supabase'

export default function DashboardScreen() {
  const [userName, setUserName] = React.useState('')

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      const name = user?.user_metadata?.full_name?.split(' ')[0] ?? 'there'
      setUserName(name)
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>💊 RxConnect</Text>
        <TouchableOpacity
          onPress={() => supabase.auth.signOut()}
          accessibilityRole="button"
          accessibilityLabel="Sign out"
          style={styles.signOutBtn}
        >
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.greeting}>Hello, {userName}! 👋</Text>
        <Text style={styles.subtitle}>
          Welcome to RxConnect. Your prescriptions will appear here.
        </Text>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>💊</Text>
          <Text style={styles.emptyTitle}>No prescriptions yet.</Text>
          <Text style={styles.emptyHint}>
            Prescription management is coming in Stage 5.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  appName: { fontSize: 20, fontWeight: 'bold', color: '#1d4ed8' },
  signOutBtn: { minHeight: 44, justifyContent: 'center' },
  signOutText: { fontSize: 16, color: '#6b7280', textDecorationLine: 'underline' },
  content: { flex: 1, padding: 20 },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 17, color: '#6b7280', lineHeight: 26, marginBottom: 24 },
  emptyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 36,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  emptyEmoji: { fontSize: 52, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: '#374151' },
  emptyHint: { fontSize: 15, color: '#9ca3af', marginTop: 6, textAlign: 'center', lineHeight: 22 },
})
