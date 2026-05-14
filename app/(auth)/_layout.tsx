
import { useUser } from '@/hooks'
import { Redirect, Stack } from 'expo-router'

const AuthLayout = () => {
    const { data: user, isPending } = useUser()
    if (isPending) return null

    if (user) return <Redirect href="/(app)/(tabs)/bookings" />

    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
    )
}

export default AuthLayout
