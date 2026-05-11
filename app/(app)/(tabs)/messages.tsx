import { Text } from 'react-native'

import { ProfileGate, Screen } from '@/components'
import { useUser } from '@/hooks'

const Messages = () => {
    const { user } = useUser()
    if (!user?.completed) return <ProfileGate />

    return (
        <Screen main centeredContent>
            <Text>Messages — coming soon</Text>
        </Screen>
    )
}

export default Messages
