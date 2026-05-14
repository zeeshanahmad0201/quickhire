import { useUser } from '@/hooks'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { ViewProps } from 'react-native'

export const UserOnly = ({ children }: ViewProps) => {
    const { data: user, isPending } = useUser()

    useEffect(() => {
        if (!user) {
            router.replace('/(auth)/login')
        }
    }, [user])

    if (isPending) return null

    if (!user) return null

    return children
}
