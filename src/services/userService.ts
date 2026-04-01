import { User } from '@supabase/supabase-js'

import { tables } from '@/constants'
import { database } from '@/lib'
import { AppUser } from '@/types'

export const userService = {
    currentUser: async (): Promise<User | null> => {
        try {
            const {
                data: { user },
            } = await database.auth.getUser()
            return user
        } catch (error) {
            console.error('Unable to fetch current user', error)
            return null
        }
    },

    fetchProfile: async (): Promise<AppUser> => {
        try {
            const currentUser = await userService.currentUser()
            if (!currentUser) throw new Error('No user is logged in!')
            const { data, error } = await database
                .from(tables.users)
                .select('*')
                .eq('id', currentUser.id)
                .single()

            if (error) throw error

            if (!data) {
                throw new Error('No user is logged in!')
            }

            return {
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role,
                avatarUrl: data.avatar_url,
                location: data.location,
                phone: data.phone,
                createdAt: data.created_at,
            }
        } catch (error) {
            console.log('Unable to fetch user profile', error)
            throw error
        }
    },
}
