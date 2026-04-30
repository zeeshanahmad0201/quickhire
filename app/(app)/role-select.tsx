import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Briefcase, Search } from 'lucide-react-native'

import { Button, Screen, ServiceCard, Spacer } from '@/components'
import { colors, radius, shadows, spacing, typography } from '@/constants'
import { withOpacity } from '@/utils'
import { useEffect, useState } from 'react'
import { UserRole } from '@/types'
import { useUser } from '@/hooks'
import Toast from 'react-native-toast-message'
import { router } from 'expo-router'

const RoleSelect = () => {
    const [role, setRole] = useState<UserRole>()

    const { updateRole, loading, error } = useUser()

    useEffect(() => {
        if (!loading && error) {
            Toast.show({
                type: 'error',
                text1: error,
                position: 'bottom',
            })
        }
    }, [loading, error])

    const onSubmit = async () => {
        if (!role) return
        const success = await updateRole(role)
        if (success) router.replace('/(app)/(tabs)/bookings')
    }

    return (
        <Screen main>
            <Spacer height={spacing.xl} />

            <Text style={styles.title}>Choose Your Role</Text>
            <Spacer height={spacing.sm} />
            <Text style={styles.subtitle}>How do you plan to use QuickHire?</Text>

            <Spacer height={spacing.lg} />

            <ServiceCard
                icon={Search}
                title="I'm a Client"
                subtitle="I want to find and book local service providers"
                color={role === 'client' ? colors.light.primary : colors.light.disabled}
                onPress={() => setRole('client')}
                showBorder
            />

            <Spacer height={spacing.md} />

            <ServiceCard
                icon={Briefcase}
                title="I'm a Provider"
                subtitle="I want to offer my services and connect with clients"
                color={role === 'provider' ? colors.light.primary : colors.light.disabled}
                onPress={() => setRole('provider')}
                showBorder
            />

            <Spacer height={spacing.lg} />

            <View style={styles.banner}>
                <Text style={styles.bannerText}>
                    You can only choose one role. This decision cannot be changed later.
                </Text>
            </View>

            <Spacer height={spacing.xxl} />

            <Button title="Continue" disabled={loading} loading={loading} onPress={onSubmit} />
        </Screen>
    )
}

export default RoleSelect

const styles = StyleSheet.create({
    title: {
        ...typography.headlineSm,
    },
    subtitle: {
        ...typography.bodyMd,
        color: colors.light.text.subtle,
    },
    banner: {
        backgroundColor: withOpacity(colors.light.warning, 0.4),
        padding: spacing.md,
        borderRadius: radius.sm,
        borderWidth: radius.width,
        borderColor: colors.light.warning,
        ...shadows.light.sm,
    },
    bannerText: {
        ...typography.labelMd,
        color: colors.light.onPrimary,
    },
})
