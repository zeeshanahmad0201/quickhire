import { View, StyleSheet, Text } from 'react-native'
import { LucideIcon } from 'lucide-react-native'

import { colors, radius, shadows, size, spacing, typography } from '@/constants'
import { withOpacity } from '@/utils'

type ServiceCardProps = {
    icon: LucideIcon
    title: string
    subtitle: string
}

export const ServiceCard = ({ icon: Icon, title, subtitle }: ServiceCardProps) => {
    return (
        <View style={styles.container}>
            {/* Icon */}
            <View style={styles.iconContainer}>
                <Icon size={size.iconMd} color={colors.light.primary} />
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: colors.light.surface,
        borderRadius: radius.sm,
        borderWidth: 0,
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
