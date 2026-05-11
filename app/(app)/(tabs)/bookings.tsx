import { Text } from 'react-native'

import { ProfileGate, Screen } from '@/components'
import { useUser } from '@/hooks'

const Bookings = () => {
    const { user } = useUser()
    if (!user?.completed) return <ProfileGate />

    return (
        <Screen main centeredContent>
            <Text>Bookings — coming soon</Text>
        </Screen>
    )
}

export default Bookings
