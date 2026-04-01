import { Text } from 'react-native'

import { Button, Screen } from '@/components'
import { useUserStore } from '@/stores'
import { useUser } from '@/hooks'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'

const Home = () => {
    const { user } = useUserStore()
    const { logout, loading, error } = useUser()

    useEffect(() => {
        if (!loading && error) {
            Toast.show({
                type: 'error',
                text1: error,
                position: 'bottom',
            })
        }
    }, [loading, error])

    return (
        <Screen main centeredContent>
            <Text>Welcome to QuickHire, {user?.name ?? 'Guest'}</Text>

            <Button title="Logout" onPress={() => logout()} disabled={loading} loading={loading} />
        </Screen>
    )
}

export default Home
