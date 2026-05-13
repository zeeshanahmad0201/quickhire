import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { colors, radius, shadows, size, spacing, typography } from '@/constants'
import { Service } from '@/types'

type ServiceListItemProps = {
    service: Service
    onPress?: () => void
}

export const ServiceListItem = ({ service, onPress }: ServiceListItemProps) => {
    const priceLabel = service.priceType === 'hourly' ? `$${service.price}/hr` : `$${service.price}`

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            {service.images?.[0] ? (
                <Image source={{ uri: service.images[0] }} style={styles.image} />
            ) : (
                <View style={[styles.image, styles.placeholder]} />
            )}

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>
                    {service.title}
                </Text>
                <Text style={styles.category} numberOfLines={1}>
                    {service.category}
                </Text>
                <Text style={styles.price}>{priceLabel}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.light.surface,
        borderRadius: radius.sm,
        padding: spacing.md,
        gap: spacing.md,
        alignItems: 'center',
        ...shadows.light.sm,
    },
    image: {
        width: size.iconXXl,
        height: size.iconXXl,
        borderRadius: radius.sm,
    },
    placeholder: {
        backgroundColor: colors.light.border,
    },
    content: {
        flex: 1,
        gap: spacing.xs,
    },
    title: {
        ...typography.titleMd,
    },
    category: {
        ...typography.bodyMd,
        color: colors.light.text.subtle,
    },
    price: {
        ...typography.bodyMd,
        color: colors.light.primary,
    },
})
