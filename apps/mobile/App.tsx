import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>💊</Text>
      <Text style={styles.title}>RxConnect</Text>
      <Text style={styles.subtitle}>
        Prescription management made simple.{"\n"}
        Automatic refills, delivered to your door.
      </Text>
      <View style={styles.card}>
        <Text style={styles.stage}>
          🚧 Stage 1 complete — project scaffold ready.
        </Text>
        <Text style={styles.next}>
          Authentication coming in Stage 2.
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 34,        // Large, readable title
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,        // Accessible base size
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  stage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  next: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 8,
  },
})
