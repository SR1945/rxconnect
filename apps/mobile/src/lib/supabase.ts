import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

/**
 * Supabase client for React Native.
 *
 * Key difference from web: React Native doesn't have cookies.
 * We use AsyncStorage instead — it's like localStorage for mobile apps.
 * Supabase uses it to persist the user's login session between app opens.
 */
export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: AsyncStorage,      // Persist session across app restarts
      autoRefreshToken: true,     // Silently refresh expired tokens
      persistSession: true,
      detectSessionInUrl: false,  // Not a web browser — no URL to detect
    },
  }
)
