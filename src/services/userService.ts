import { User } from '@supabase/supabase-js'

import { tables } from '@/constants'
import { database } from '@/lib'
import { AppUser, UserRole, ProviderProfileForm } from '@/types'

export const userService = {
    currentUser: async (): Promise<User> => {
        try {
            const {
                data: { user },
            } = await database.auth.getUser()
            return user!
        } catch (error) {
            console.error('Unable to fetch current user', error)
            throw new Error('No user is logged in!')
        }
    },

    fetchProfile: async (): Promise<AppUser> => {
        try {
            const currentUser = await userService.currentUser()

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
                completed: data.profile_completed,
            }
        } catch (error) {
            console.log('Unable to fetch user profile', error)
            throw error
        }
    },

    setRole: async (role: UserRole, userId: string) => {
        try {
            const { error } = await database
                .from(tables.users)
                .update({
                    role: role,
                })
                .eq('id', userId)
            if (error) throw error
        } catch (error) {
            console.error('userService: setRole ', error)
            throw error
        }
    },

    setProviderProfile: async (profile: ProviderProfileForm): Promise<boolean> => {
        let uploadedPath: string | null = null
        const avatars = database.storage.from(tables.buckets.avatars)
        try {
            const userId = (await userService.currentUser()).id

            // upload image
            let profileUrl: string | null = null
            if (profile.profileUrl) {
                const response = await fetch(profile.profileUrl)
                const blob = await response.blob()
                const ext = blob.type.split('/')[1]
                uploadedPath = `${userId}/avatar.${ext}`

                const { error } = await avatars.upload(uploadedPath, blob, {
                    contentType: blob.type,
                    upsert: true
                })
                if (error) throw error
                const {
                    data: { publicUrl },
                } = avatars.getPublicUrl(uploadedPath)
                profileUrl = publicUrl
            }

            // save data to users
            const { error: updateError } = await database.rpc('setup_provider_profile', {
                name: profile.name,
                phone: profile.phone,
                bio: profile.bio,
                location: profile.location,
                avatar_url: profileUrl,

                user_id: userId,
                title: profile.title,
                category: profile.category,
                description: profile.description,
                price: parseFloat(profile.price),
                price_type: profile.pricingType,
            })

            if (updateError) throw updateError

            return true
        } catch (error) {
            if (uploadedPath) await avatars.remove([uploadedPath])
            console.error('userService: setProfile', error)
            throw error
        }
    },
}
