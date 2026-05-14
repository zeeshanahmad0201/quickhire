import { useState } from 'react'
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { router, useLocalSearchParams } from 'expo-router'

import { Button, Input, Screen, Spacer } from '@/components'
import { colors, radius, spacing, typography } from '@/constants'
import { useCreateBooking, useServiceById, useUser } from '@/hooks'

const ServiceDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { data: service, isPending } = useServiceById(id!)
    const { data: user } = useUser()
    const { mutate, isPending: isBooking } = useCreateBooking()

    const [date, setDate] = useState(new Date())
    const [notes, setNotes] = useState('')
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)

    const isClient = user?.role === 'client'

    const onDateChange = (_: DateTimePickerEvent, selected?: Date) => {
        setShowDatePicker(Platform.OS === 'ios')
        if (selected) setDate(selected)
    }

    const onTimeChange = (_: DateTimePickerEvent, selected?: Date) => {
        setShowTimePicker(Platform.OS === 'ios')
        if (selected) setDate(selected)
    }

    const handleBooking = () => {
        if (!service) return
        mutate(
            {
                serviceId: service.id,
                providerId: service.providerId,
                scheduledAt: date.toISOString(),
                notes: notes.trim() || undefined,
            },
            {
                onSuccess: () => router.back(),
            }
        )
    }

    if (isPending) {
        return <Screen main centeredContent loading={isPending} />
    }

    if (!service) {
        return (
            <Screen main centeredContent>
                <Text>Service not found</Text>
            </Screen>
        )
    }

    const priceLabel = service.priceType === 'hourly' ? `$${service.price}/hr` : `$${service.price}`

    return (
        <Screen main>
            <Text style={styles.title}>{service.title}</Text>
            <Text style={styles.category}>{service.category}</Text>

            <Spacer height={spacing.md} />

            <Text style={styles.description}>{service.description}</Text>

            <Spacer height={spacing.md} />

            <Text style={styles.price}>{priceLabel}</Text>

            {isClient && (
                <>
                    <Spacer height={spacing.lg} />

                    <Text style={styles.sectionTitle}>Book this service</Text>

                    <Spacer height={spacing.md} />

                    <View style={styles.dateRow}>
                        <TouchableOpacity
                            style={styles.datePicker}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text>{date.toLocaleDateString()}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.datePicker}
                            onPress={() => setShowTimePicker(true)}
                        >
                            <Text>
                                {date.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            minimumDate={new Date()}
                            onChange={onDateChange}
                        />
                    )}

                    {showTimePicker && (
                        <DateTimePicker value={date} mode="time" onChange={onTimeChange} />
                    )}

                    <Spacer height={spacing.md} />

                    <Input
                        placeholder="Notes (optional)"
                        value={notes}
                        onChangeText={setNotes}
                        multiline
                        returnKeyType="done"
                    />

                    <Spacer height={spacing.md} />

                    <Button
                        title="Confirm Booking"
                        loading={isBooking}
                        disabled={isBooking}
                        onPress={handleBooking}
                    />
                </>
            )}
        </Screen>
    )
}

const styles = StyleSheet.create({
    title: {
        ...typography.titleLg,
    },
    category: {
        ...typography.bodyMd,
        color: colors.light.text.muted,
    },
    description: {
        ...typography.bodyMd,
        color: colors.light.text.normal,
    },
    price: {
        ...typography.titleMd,
        color: colors.light.primary,
    },
    sectionTitle: {
        ...typography.titleMd,
    },
    dateRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    datePicker: {
        flex: 1,
        padding: spacing.md,
        backgroundColor: colors.light.surface,
        borderRadius: radius.sm,
        borderWidth: radius.width,
        borderColor: colors.light.border,
        alignItems: 'center',
    },
})

export default ServiceDetails
