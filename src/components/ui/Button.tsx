import { colors, radius, shadows, spacing, typography } from '@/constants'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

type ButtonProps = {
    title: string
    onPress: () => void
    disabled?: boolean
}

export const Button = ({ title, onPress, disabled = false }: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, disabled && styles.disabled]}
            activeOpacity={0.8}
            disabled={disabled}
        >
            <Text style={[styles.title, disabled && styles.disabled]}>{title}</Text>
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
})
