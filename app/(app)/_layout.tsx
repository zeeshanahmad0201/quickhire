import { router, Stack } from 'expo-router'
import { useEffect } from 'react'

import { UserOnly } from '@/components'
import { useNotificationHandlers, usePushTokenRegistration, useUser } from '@/hooks'

const AppLayout = () => {
    const { data: user, isPending } = useUser()

    useEffect(() => {
        if (!user) {
            return router.replace('/(auth)/login')
        }

        if (user.role === null) {
            return router.replace('/role-select')
        }
    }, [user])

    usePushTokenRegistration()
    useNotificationHandlers()

    if (isPending) return null

    return (
        <UserOnly>
            <Stack>
                <Stack.Screen name="role-select" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
                <Stack.Screen name="services/[id]" options={{ title: 'Service Details' }} />
            </Stack>
        </UserOnly>
    )
}

export default AppLayout
