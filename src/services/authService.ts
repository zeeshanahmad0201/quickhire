import { translateError } from '@/errors'
import { database } from '@/lib'
import { LoginRequest, RegisterRequest } from '@/types'
import { Session } from '@supabase/supabase-js'

export const authService = {
    login: async ({ email, password }: LoginRequest) => {
        try {
            const { data, error } = await database.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error
            return data
        } catch (error) {
            console.error('authService: login', error)
            throw translateError(error)
        }
    },

    register: async ({ name, email, password }: RegisterRequest) => {
        try {
            const { data, error } = await database.auth.signUp({
                email,
                password,
                options: {
                    data: { name },
                },
            })

            if (error) throw error
            return data
        } catch (error) {
            console.error('authService: register', error)
            throw translateError(error)
        }
    },

    logout: async () => {
        try {
            const { error } = await database.auth.signOut()
            if (error) throw error
        } catch (error) {
            console.error('authService: logout', error)
            throw translateError(error)
        }
    },

    onAuthStateChange: (callback: (session: Session | null) => void) => {
        const {
            data: { subscription },
        } = database.auth.onAuthStateChange((_, session) => callback(session))
        return subscription
    },

    forgotPassword: async (email: string) => {
        try {
            const { error } = await database.auth.resetPasswordForEmail(email, {
                redirectTo: process.env.EXPO_PUBLIC_SUPABASE_URL!,
            })
            if (error) throw error
        } catch (error) {
            console.error('authService: forgotPassword', error)
            throw translateError(error)
        }
    }
}
