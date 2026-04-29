import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { AppState } from 'react-native'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
if (!supabaseUrl) throw new Error('Missing EXPO_PUBLIC_SUPABASE_URL')

const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY
if (!supabaseKey) throw new Error('Missing EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY')

export const database = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        database.auth.startAutoRefresh()
    } else {
        database.auth.stopAutoRefresh()
    }
})
