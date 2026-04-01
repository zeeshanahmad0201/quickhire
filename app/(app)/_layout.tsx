import { UserOnly } from '@/components'
import { useUserStore } from '@/stores'
import { Redirect, Stack } from 'expo-router'

const AppLayout = () => {
    const { user, authChecked } = useUserStore()

    if (!authChecked) return null

    if (!user) return <Redirect href="/(auth)/login" />

    return (
        <UserOnly>
            <Stack />
        </UserOnly>
    )
}

export default AppLayout
