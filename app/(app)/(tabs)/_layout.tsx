import { router, Tabs } from 'expo-router'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Bell, Calendar, MessageCircle, User } from 'lucide-react-native'

import { colors, size, spacing } from '@/constants'

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.light.primary,
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => router.push('/notifications')}
                        style={styles.bellContainer}
                    >
                        <Bell size={size.iconMd} color={colors.light.icon.normal} />
                    </TouchableOpacity>
                ),
            }}
        >
            <Tabs.Screen
                name="bookings"
                options={{
                    title: 'Bookings',
                    tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
                }}
            />

            <Tabs.Screen
                name="messages"
                options={{
                    title: 'Messages',
                    tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} />,
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    bellContainer: {
        paddingHorizontal: spacing.pageHorizontal,
    },
})

export default TabsLayout
