import { FlashList } from '@shopify/flash-list'
import { ActivityIndicator, Text, View } from 'react-native'

import { BookingListItem, Button, Screen, Spacer } from '@/components'
import { spacing } from '@/constants'
import { useMyBookings, useUser } from '@/hooks'
import { ProfileGate } from '@/components'
import { errorMessage } from '@/errors'

const Bookings = () => {
    const { data: user } = useUser()
    const { data: bookings, isPending, isError, error, refetch, isRefetching } = useMyBookings()

    if (!user?.completed) return <ProfileGate />

    if (isError) {
        return (
            <Screen main centeredContent>
                <Text>{errorMessage(error, 'Could not load bookings')}</Text>
                <Spacer height={spacing.md} />
                <Button title="Retry" onPress={() => refetch()} />
            </Screen>
        )
    }

    return (
        <Screen main loading={isPending}>
            <FlashList
                data={bookings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <BookingListItem booking={item} />}
                ItemSeparatorComponent={() => <Spacer height={spacing.sm} />}
                onRefresh={refetch}
                refreshing={isRefetching}
                ListEmptyComponent={() => (
                    <View style={{ padding: spacing.lg, alignItems: 'center' }}>
                        <Text>No bookings yet.</Text>
                    </View>
                )}
            />
        </Screen>
    )
}

export default Bookings
