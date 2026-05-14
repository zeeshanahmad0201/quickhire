import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'

import { Spacer } from '@/components'
import { colors, radius, size, spacing, typography } from '@/constants'
import { usePrefs, useUser } from '@/hooks'

// icons
import AppIcon from '../assets/icon.svg'

const Index = () => {
    const opacity = useSharedValue(0)

    useEffect(() => {
        opacity.value = withDelay(200, withTiming(1, { duration: 800 }))
    }, [opacity])

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }))

    const [minTimeElapsed, setMinTimeElapsed] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setMinTimeElapsed(true), 1500)
        return () => clearTimeout(timer)
    }, [])

    const { data: user, isPending } = useUser()
    const { hasOnboarded } = usePrefs()

    useEffect(() => {
        if (!minTimeElapsed || isPending) return

        if (!hasOnboarded) {
            return router.replace('/(onboarding)/')
        }

        return router.replace(user ? '/(app)/(tabs)/bookings' : '/(auth)/login')
    }, [minTimeElapsed, isPending, hasOnboarded, user])

    return (
        <LinearGradient
            colors={colors.light.gradient.primary}
            style={[StyleSheet.absoluteFill, styles.container]}
        >
            <StatusBar style="light" />

            <Animated.View style={[styles.content, animatedStyle]}>
                {/* App Icon */}
                <View style={styles.iconContainer}>
                    <AppIcon
                        width={size.iconXl}
                        height={size.iconXl}
                        color={colors.light.primary}
                    />
                </View>

                <Spacer height={spacing.lg} />

                {/* Title */}
                <Text style={styles.title}>QuickHire</Text>

                <Spacer height={spacing.xs} />

                {/* Subtitle */}
                <Text style={styles.subtitle}>Local services at your fingertips</Text>
            </Animated.View>

            <ActivityIndicator style={styles.loader} color={colors.light.onPrimary} />
        </LinearGradient>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        backgroundColor: colors.light.onPrimary,
        padding: spacing.xl,
        borderRadius: radius.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        ...typography.headlineLg,
        color: colors.light.onPrimary,
        textAlign: 'center',
    },
    subtitle: {
        ...typography.bodyMd,
        color: colors.light.onPrimary,
        textAlign: 'center',
    },
    loader: {
        marginBottom: spacing.md,
    },
})
