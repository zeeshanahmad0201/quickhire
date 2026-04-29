import { useUserStore } from '@/stores'
import { router, Stack } from 'expo-router'
import { useEffect } from 'react'

const ProfileSetupLayout = () => {
    const { user } = useUserStore()

    useEffect(() => {
        if (user?.completed) {
            router.replace('/home')
        }
    }, [user?.completed])

    return (
        <Stack>
            <Stack.Screen name="provider" options={{ headerTitle: 'Profile' }} />
            <Stack.Screen name="client" options={{ headerShown: false }} />
        </Stack>
    )
}

export default ProfileSetupLayout
