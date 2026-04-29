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
        } else if (!user.completed) {
            router.replace(user.role === 'provider' ? '/provider' : '/client')
        }
    }, [user])

    if (!authChecked) return null

    if (!user) return <Redirect href="/(auth)/login" />

    return (
        <UserOnly>
            <Stack>
                <Stack.Screen name="role-select" options={{ headerShown: false }} />
                <Stack.Screen name="(profile-setup)" options={{ headerShown: false }} />
            </Stack>
        </UserOnly>
    )
}

export default AppLayout
