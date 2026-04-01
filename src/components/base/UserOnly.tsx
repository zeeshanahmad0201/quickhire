import { useUserStore } from '@/stores'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { ViewProps } from 'react-native'

export const UserOnly = ({ children }: ViewProps) => {
    const { user, authChecked } = useUserStore()

    useEffect(() => {
        if (authChecked && !user) {
            router.replace('/(auth)/login')
        }
    }, [user, authChecked])

    if (!authChecked || !user) return null

    return children
}
