import { User } from '@supabase/supabase-js'
import * as FileSystem from 'expo-file-system/legacy'
import { decode } from 'base64-arraybuffer'
import { gql } from 'graphql-request'

import { tables } from '@/constants'
import { database, gqlClient } from '@/lib'
import { AppUser, UserRole, ProviderProfileForm, Service, ClientProfileForm } from '@/types'
import { AuthError, translateError } from '@/errors'

export const userService = {
    currentUser: async (): Promise<User> => {
        try {
            const {
                error,
                data: { session },
            } = await database.auth.getSession()
            if (error) throw error
            if (!session?.user) {
                throw new AuthError(
                    'No user is logged in',
                    'userService: currentUser returned null user'
                )
            }
            return session.user
        } catch (error) {
            console.error('userService: currentUser', error)
            throw new AuthError('No user is logged in', 'userService: currentUser returned no user')
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
                throw new AuthError(
                    'No user is logged in',
                    'userService: fetchProfile found no row'
                )
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
                bio: data.bio,
                companyName: data.company_name,
            }
        } catch (error) {
            console.error('userService: fetchProfile', error)
            throw translateError(error)
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
            console.error('userService: setRole', error)
            throw translateError(error)
        }
    },

    upsertProviderProfile: async (profile: ProviderProfileForm): Promise<Service> => {
        let uploadedPath: string | null = null
        const avatars = database.storage.from(tables.buckets.avatars)
        try {
            // upload image
            const uploaded = await userService.uploadProfileImage(profile.profileUrl)
            const avatarUrl = uploaded?.url ?? null
            uploadedPath = uploaded?.storagePath ?? null

            // save data to users
            const { data, error: updateError } = await database.rpc('upsert_provider_profile', {
                p_name: profile.name,
                p_phone: profile.phone,
                p_bio: profile.bio,
                p_lat: profile.location.lat,
                p_lng: profile.location.lng,
                p_avatar_url: avatarUrl,

                p_title: profile.title,
                p_category: profile.category,
                p_description: profile.description,
                p_price: parseFloat(profile.price),
                p_price_type: profile.pricingType,
            })

            if (updateError) throw updateError

            return data as Service
        } catch (error) {
            if (uploadedPath) await avatars.remove([uploadedPath])
            console.error('userService: upsertProviderProfile', error)
            throw translateError(error)
        }
    },

    upsertClientProfile: async (profile: ClientProfileForm): Promise<AppUser> => {
        let uploadedPath: string | null = null
        const avatars = database.storage.from(tables.buckets.avatars)
        try {
            const uploaded = await userService.uploadProfileImage(profile.profileUrl)
            const avatarUrl = uploaded?.url ?? null
            uploadedPath = uploaded?.storagePath ?? null

            const userId = (await userService.currentUser()).id

            const { error } = await database
                .from(tables.users)
                .update({
                    name: profile.name,
                    phone: profile.phone,
                    company_name: profile.companyName?.trim() || null,
                    avatar_url: avatarUrl,
                    profile_completed: true,
                })
                .eq('id', userId)

            if (error) throw error

            const data = await userService.fetchProfile()
            return data
        } catch (error) {
            if (uploadedPath) await avatars.remove([uploadedPath])
            console.error('userService: upsertClientProfile', error)
            throw translateError(error)
        }
    },

    uploadProfileImage: async (
        path?: string
    ): Promise<{ url: string; storagePath: string | null } | null> => {
        try {
            if (!path) return null

            const userId = (await userService.currentUser()).id
            const avatars = database.storage.from(tables.buckets.avatars)

            if (path?.startsWith('file://')) {
                const base64 = await FileSystem.readAsStringAsync(path, {
                    encoding: FileSystem.EncodingType.Base64,
                })
                const arrayBuffer = decode(base64)

                const ext = path.split('.').pop()?.toLowerCase() ?? 'jpg'
                const contentType = ext === 'png' ? 'image/png' : 'image/jpeg'
                const uploadedPath = `${userId}/avatar.${ext}`

                const { error } = await avatars.upload(uploadedPath, arrayBuffer, {
                    contentType,
                    upsert: true,
                })
                if (error) throw error
                const {
                    data: { publicUrl },
                } = avatars.getPublicUrl(uploadedPath)
                return { url: publicUrl, storagePath: uploadedPath }
            }
            return { url: path, storagePath: null }
        } catch (error) {
            console.error('userService: uploadProfileImage', error)
            throw translateError(error)
        }
    },
}
