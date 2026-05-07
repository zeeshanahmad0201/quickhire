import { User } from '@supabase/supabase-js'
import * as FileSystem from 'expo-file-system/legacy'
import { decode } from 'base64-arraybuffer'
import { gql } from 'graphql-request'

import { tables } from '@/constants'
import { database, gqlClient } from '@/lib'
import { AppUser, UserRole, ProviderProfileForm, Service } from '@/types'

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
                bio: data.bio,
            }
        } catch (error) {
            console.error('Unable to fetch user profile', error)
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

    upsertProviderProfile: async (profile: ProviderProfileForm): Promise<Service> => {
        let uploadedPath: string | null = null
        const avatars = database.storage.from(tables.buckets.avatars)
        try {
            const userId = (await userService.currentUser()).id

            // upload image
            let profileUrl: string | null = null
            if (profile.profileUrl?.startsWith('file://')) {
                const base64 = await FileSystem.readAsStringAsync(profile.profileUrl, {
                    encoding: FileSystem.EncodingType.Base64,
                })
                const arrayBuffer = decode(base64)

                const ext = profile.profileUrl.split('.').pop()?.toLowerCase() ?? 'jpg'
                const contentType = ext === 'png' ? 'image/png' : 'image/jpeg'
                uploadedPath = `${userId}/avatar.${ext}`

                const { error } = await avatars.upload(uploadedPath, arrayBuffer, {
                    contentType,
                    upsert: true,
                })
                if (error) throw error
                const {
                    data: { publicUrl },
                } = avatars.getPublicUrl(uploadedPath)
                profileUrl = publicUrl
            } else if (profile.profileUrl) {
                profileUrl = profile.profileUrl
            }

            // save data to users
            const { data, error: updateError } = await database.rpc('upsert_provider_profile', {
                p_name: profile.name,
                p_phone: profile.phone,
                p_bio: profile.bio,
                p_lat: profile.location.lat,
                p_lng: profile.location.lng,
                p_avatar_url: profileUrl,

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
            console.error('userService: setProfile', error)
            throw error
        }
    },

    getMyService: async (): Promise<Service | null> => {
        try {
            const userId = (await userService.currentUser()).id

            const query = gql`
                query MyService($providerId: UUID!) {
                    servicesCollection(filter: { provider_id: { eq: $providerId } }) {
                        edges {
                            node {
                                id
                                providerId: provider_id
                                title
                                description
                                category
                                price
                                priceType: price_type
                                lat
                                lng
                                images
                                isActive: is_active
                                createdAt: created_at
                            }
                        }
                    }
                }
            `
            const data = await gqlClient.request<{
                servicesCollection: { edges: { node: Service }[] }
            }>(query, { providerId: userId })

            return data.servicesCollection.edges[0]?.node ?? null
        } catch (error) {
            console.error('userService: getMyService', error)
            throw error
        }
    },
}
