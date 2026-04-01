import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ActivityIndicator } from 'react-native'

import { colors, radius, shadows, spacing, typography } from '@/constants'

type ButtonProps = {
    title: string
    onPress: () => void
    disabled?: boolean
    loading?: boolean
    outlined?: boolean
}

export const Button = ({
    title,
    onPress,
    disabled = false,
    loading = false,
    outlined = false,
}: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.container,
                disabled && styles.disabled,
                outlined && styles.outlinedContainer,
            ]}
            activeOpacity={0.8}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator style={styles.icon} color={colors.light.onPrimary} />
            ) : (
                <Text
                    style={[
                        styles.title,
                        disabled && styles.disabled,
                        outlined && styles.titleOutlined,
                    ]}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.light.primary,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.md,
        borderRadius: radius.sm,
        ...shadows.light.md,
    },
    disabled: {
        backgroundColor: colors.light.disabled,
    },
    title: {
        ...typography.titleMd,
        color: colors.light.onPrimary,
        textAlign: 'center',
    },
    titleDisabled: {
        color: colors.light.onDisabled,
    },
    titleOutlined: {
        color: colors.light.text.normal,
    },
    icon: {
        alignSelf: 'center',
        color: colors.light.onPrimary,
    },
    outlinedContainer: {
        backgroundColor: colors.light.surface,
        borderColor: colors.light.primary,
        borderWidth: radius.width,
    },
})
