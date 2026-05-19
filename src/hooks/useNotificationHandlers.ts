import * as Notifications from 'expo-notifications'
import { router } from 'expo-router'
import { useEffect } from 'react'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
})

export const useNotificationHandlers = () => {
    useEffect(() => {
        const sub = Notifications.addNotificationResponseReceivedListener(({ notification }) => {
            const data = notification.request.content.data as { type?: string }

            if (data?.type === 'booking_created') {
                router.push('/(app)/(tabs)/bookings')
            }
        })

        return sub.remove()
    }, [])
}
