import { Platform } from 'react-native'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'

import { useUser } from './useUser'
import { DevicePlatform, notificationService } from '@/services'

export const usePushTokenRegistration = () => {
    const { data: user } = useUser()

    useEffect(() => {
        if (Platform.OS !== 'ios' && Platform.OS !== 'android') return
        if (!user) return

        const platform: DevicePlatform = Platform.OS

        const register = async () => {
            await notificationService.setupAndroidChannel()

            const granted = await notificationService.requestPermission()
            if (!granted) return

            const token = await notificationService.getPushToken()
            if (!token) return

            await notificationService.saveToken(token, platform)
        }

        register()

        // Listen for token rotation (OS reissues for various reasons)
        const sub = Notifications.addPushTokenListener(({ data: rotatedToken }) => {
            notificationService.saveToken(rotatedToken, platform)
        })

        return () => sub.remove()
    }, [user])
}
