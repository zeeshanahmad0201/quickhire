import { View, Text, StyleSheet } from 'react-native'

import { colors, radius, spacing, typography } from '@/constants'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
} from 'react-native-reanimated'
import { useEffect } from 'react'

type ErrorProps = {
    title?: string
    banner?: boolean
}
export const Error = ({ title, banner = false }: ErrorProps) => {
    const opacity = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }))

    useEffect(() => {
        opacity.value = withSpring(1, { duration: 600 })
    }, [])

    if (!title) return null

    if (banner) {
        return (
            <Animated.View style={[animatedStyle, styles.container]}>
                <Text style={[styles.title, styles.titleBanner]}>{title}</Text>
            </Animated.View>
        )
    }

    return (
        <Animated.Text style={[animatedStyle, styles.title, styles.titleNormal]}>
            {title}
        </Animated.Text>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        justifyContent: 'center',
        backgroundColor: colors.light.error,
        marginVertical: spacing.md,
        borderRadius: radius.sm,
    },
    title: {
        ...typography.labelMd,
        color: colors.light.error,
    },
    titleBanner: {
        color: colors.light.onPrimary,
    },
    titleNormal: {
        paddingTop: spacing.sm,
        paddingLeft: spacing.sm,
    },
})
