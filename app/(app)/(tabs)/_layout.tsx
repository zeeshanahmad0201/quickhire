import { router, Tabs } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Bell, Calendar, LogOut, MessageCircle, Search, User } from 'lucide-react-native'

import { colors, size, spacing } from '@/constants'
import { useLogout, useUser } from '@/hooks'

const TabsLayout = () => {
    const { mutateAsync: logout } = useLogout()
    const { data: user } = useUser()

    const isClient = user?.role === 'client'

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.light.primary,
                headerRight: () => (
                    <View style={styles.headerActions}>
                        {/* Notification */}
                        <TouchableOpacity
                            onPress={() => router.push('/notifications')}
                            style={styles.iconButton}
                        >
                            <Bell size={size.iconMd} color={colors.light.icon.normal} />
                        </TouchableOpacity>
                        {/* Logout */}
                        <TouchableOpacity onPress={() => logout()}>
                            <LogOut style={styles.iconButton} color={colors.light.icon.normal} />
                        </TouchableOpacity>
                    </View>
                ),
            }}
        >
            <Tabs.Screen
                name="services"
                options={{
                    title: 'Services',
                    href: isClient ? '/services' : null,
                    tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
                }}
            />

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
    headerActions: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: spacing.sm,
        paddingHorizontal: spacing.pageHorizontal,
    },
    iconButton: {
        paddingHorizontal: spacing.sm,
    },
})

export default TabsLayout
