import { database } from '@/lib'
import { LoginRequest, RegisterRequest } from '@/types'
import { Session } from '@supabase/supabase-js'

export const authService = {
    login: async ({ email, password }: LoginRequest) => {
        const { data, error } = await database.auth.signInWithPassword({
            email,
            password,
        })

        if (error) throw error
        return data
    },

    register: async ({ name, email, password }: RegisterRequest) => {
        const { data, error } = await database.auth.signUp({
            email,
            password,
            options: {
                data: { name },
            },
        })

        if (error) throw error
        return data
    },

    logout: async () => {
        const { error } = await database.auth.signOut()
        if (error) throw error
    },

    onAuthStateChange: (callback: (session: Session | null) => void) => {
        const {
            data: { subscription },
        } = database.auth.onAuthStateChange((event, session) => callback(session))
        return subscription
    },

    forgotPassword: async (email: string) => {
        const { error } = await database.auth.resetPasswordForEmail(email, {
            redirectTo: process.env.EXPO_PUBLIC_SUPABASE_URL!,
        })
        if (error) throw error
    },
}
