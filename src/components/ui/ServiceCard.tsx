import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { LucideIcon } from 'lucide-react-native'

import { colors, radius, shadows, size, spacing, typography } from '@/constants'
import { withOpacity } from '@/utils'

type ServiceCardProps = {
    icon: LucideIcon
    title: string
    subtitle: string
    color?: string
    showBorder?: boolean
    onPress?: () => void
}

export const ServiceCard = ({
    icon: Icon,
    title,
    subtitle,
    color,
    showBorder,
    onPress,
}: ServiceCardProps) => {
    return (
        <TouchableOpacity
            style={[styles.container, showBorder && [styles.contentBorder, { borderColor: color }]]}
            onPress={onPress}
        >
            {/* Icon */}
            <View
                style={[
                    styles.iconContainer,
                    color && { backgroundColor: withOpacity(color, 0.2) },
                ]}
            >
                <Icon size={size.iconMd} color={color ? color : colors.light.primary} />
            </View>

            {/* Content */}
            <View style={styles.contentContainer}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>

                <Text style={styles.subtitle} numberOfLines={2}>
                    {subtitle}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: colors.light.surface,
        borderRadius: radius.sm,
        ...shadows.light.sm,
        padding: spacing.md,
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: withOpacity(colors.light.primary, 0.2),
        borderRadius: radius.sm,
        width: size.iconXl,
        height: size.iconXl,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentBorder: {
        borderWidth: radius.width,
    },
    title: {
        ...typography.titleMd,
    },
    subtitle: {
        ...typography.bodyMd,
        color: colors.light.text.subtle,
    },
    contentContainer: {
        flex: 1,
        paddingLeft: spacing.md,
        paddingRight: spacing.sm,
        gap: spacing.sm,
    },
})
