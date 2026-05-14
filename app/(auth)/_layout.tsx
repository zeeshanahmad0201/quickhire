import { Redirect, router, Stack } from 'expo-router'

import { useUser } from '@/hooks'
import { useEffect } from 'react'

const AuthLayout = () => {
    const { data: user, isPending } = useUser()

    useEffect(() => {
        if (user) {
            return router.replace('/(app)/(tabs)/bookings')
        }
    }, [user])

    if (isPending) return null

    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
    )
}

export default AuthLayout
