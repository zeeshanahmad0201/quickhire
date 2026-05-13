import { FlashList } from '@shopify/flash-list'

import { useServices } from '@/hooks'
import { ActivityIndicator, Text, View } from 'react-native'
import { Button, Screen, ServiceListItem, Spacer } from '@/components'
import { spacing } from '@/constants'
import { errorMessage } from '@/errors'

const Services = () => {
    const { isPending, data: services, refetch, isRefetching, isError, error } = useServices()

    if (isPending) {
        return (
            <Screen main centeredContent>
                <ActivityIndicator />
            </Screen>
        )
    }

    if (isError) {
        return (
            <Screen main centeredContent>
                <Text>{errorMessage(error, 'Could not load services')}</Text>
                <Spacer height={spacing.md} />
                <Button title="Retry" onPress={() => refetch()} />
            </Screen>
        )
    }

    return (
        <Screen main>
            <FlashList
                data={services}
                keyExtractor={(s) => s.id}
                renderItem={({ item }) => <ServiceListItem service={item} />}
                ItemSeparatorComponent={() => <Spacer height={spacing.sm} />}
                onRefresh={refetch}
                refreshing={isRefetching}
                ListEmptyComponent={() => (
                    <View style={{ padding: spacing.lg, alignItems: 'center' }}>
                        <Text>No services available yet.</Text>
                    </View>
                )}
            />
        </Screen>
    )
}

export default Services
