import { UserOnly } from '@/components'
import { useUserStore } from '@/stores'
import { Redirect, router, Stack } from 'expo-router'
import { useEffect } from 'react'

const AppLayout = () => {
    const { user, authChecked } = useUserStore()

    useEffect(() => {
        if (!user) return

        if (user.role === null) {
            router.replace('/role-select')
        }
    }, [user])

    if (!authChecked) return null

    if (!user) return <Redirect href="/(auth)/login" />

    return (
        <UserOnly>
            <Stack>
                <Stack.Screen name="role-select" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
            </Stack>
        </UserOnly>
    )
}

export default AppLayout
