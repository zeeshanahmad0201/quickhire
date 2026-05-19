import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import Constants from 'expo-constants'

import { translateError } from '@/errors'
import { colors, tables } from '@/constants'
import { database } from '@/lib'

export type DevicePlatform = 'ios' | 'android'

export const notificationService = {
    setupAndroidChannel: async () => {
        if (Platform.OS !== 'android') return

        try {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'Default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: colors.light.primary,
            })
        } catch (error) {
            console.error('notificationService: setupAndroidChannel', error)
            throw translateError(error)
        }
    },

    requestPermission: async (): Promise<boolean> => {
        try {
            const { status: existing } = await Notifications.getPermissionsAsync()
            if (existing === 'granted') return true

            const { status } = await Notifications.requestPermissionsAsync()
            return status === 'granted'
        } catch (error) {
            console.error('notificationService: requestPermission', error)
            throw translateError(error)
        }
    },

    getPushToken: async (): Promise<string | null> => {
        try {
            const projectId = Constants.expoConfig?.extra?.eas?.projectId
            if (!projectId) {
                console.warn('notificationService: no Expo projectId configured')
                return null
            }

            const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId })
            return token
        } catch (error) {
            console.error('notificationService: getPushToken', error)
            return null
        }
    },

    saveToken: async (userId: string, token: string, platform: DevicePlatform): Promise<void> => {
        try {
            const { error } = await database.from(tables.deviceTokens).upsert(
                {
                    user_id: userId,
                    token,
                    platform,
                },
                { onConflict: 'token' }
            )

            if (error) throw error
        } catch (error) {
            console.error('notificationService: saveToken', error)
            throw translateError(error)
        }
    },

    deleteToken: async (token: string): Promise<void> => {
        try {
            const { error } = await database.from(tables.deviceTokens).delete().eq('token', token)

            if (error) throw error
        } catch (error) {
            console.error('notificationService: deleteToken', error)
            throw translateError(error)
        }
    },

    deleteCurrentDeviceToken: async (): Promise<void> => {
        try {
            const token = await notificationService.getPushToken()
            if (!token) return
            await notificationService.deleteToken(token)
        } catch (error) {}
    },
}
