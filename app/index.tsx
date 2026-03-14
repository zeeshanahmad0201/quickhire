import { Text, StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated'

// components
import { Screen, Spacer } from '@/components'

// constants
import { colors, radius, spacing, typography } from '@/constants'

// icons
import AppIcon from '../assets/icon.svg'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect } from 'react'
import { router } from 'expo-router'

const Index = () => {
    const opacity = useSharedValue(0)

    useEffect(() => {
        opacity.value = withDelay(200, withTiming(1, { duration: 800 }))

        const timer = setTimeout(() => {
            router.replace('/login')
        }, 1500) // 2 seconds

        return () => clearTimeout(timer)
    }, [opacity])

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }))

    return (
        <LinearGradient
            colors={['#4F46E5', '#7C3AED']}
            style={[StyleSheet.absoluteFill, styles.container]}
        >
            <StatusBar style="light" />

            <Animated.View style={[styles.content, animatedStyle]}>
                {/* App Icon */}
                <View style={styles.iconContainer}>
                    <AppIcon
                        width={spacing.xxl}
                        height={spacing.xxl}
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
        alignItems: 'center',
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
})
