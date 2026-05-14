import { StyleSheet, Text, View } from 'react-native'

import { colors, radius, shadows, spacing, typography } from '@/constants'
import { Booking } from '@/types'

type BookingListItemProps = {
    booking: Booking
}

const statusColors: Record<string, string> = {
    pending: colors.light.warning,
    confirmed: colors.light.primary,
    completed: colors.light.success,
    cancelled: colors.light.error,
}

export const BookingListItem = ({ booking }: BookingListItemProps) => {
    const date = new Date(booking.scheduledAt)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.date}>
                    {date.toLocaleDateString()} at{' '}
                    {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <View style={[styles.badge, { backgroundColor: statusColors[booking.status] }]}>
                    <Text style={styles.badgeText}>{booking.status}</Text>
                </View>
            </View>

            {booking.notes && (
                <Text style={styles.notes} numberOfLines={2}>
                    {booking.notes}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light.surface,
        borderRadius: radius.sm,
        padding: spacing.md,
        gap: spacing.sm,
        ...shadows.light.sm,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        ...typography.titleMd,
    },
    badge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.sm,
    },
    badgeText: {
        ...typography.bodySm,
        color: colors.light.onPrimary,
        textTransform: 'capitalize',
    },
    notes: {
        ...typography.bodyMd,
        color: colors.light.text.muted,
    },
})
