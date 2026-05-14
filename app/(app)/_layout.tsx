import { UserOnly } from '@/components'
import { useUser } from '@/hooks'
import { Redirect, router, Stack } from 'expo-router'
import { useEffect } from 'react'

const AppLayout = () => {
    const { data: user, isPending } = useUser()
    if (isPending) return null

    useEffect(() => {
        if (!user) return

        if (user.role === null) {
            router.replace('/role-select')
        }
    }, [user])

    if (!user) return <Redirect href="/(auth)/login" />

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
