import { gql } from 'graphql-request'

import { tables } from '@/constants'
import { translateError } from '@/errors'
import { database, gqlClient } from '@/lib'
import { Booking, CreateBookingInput } from '@/types'
import { userService } from './userService'

const mapBookingRow = (row: any): Booking => ({
    id: row.id,
    serviceId: row.service_id,
    clientId: row.client_id,
    providerId: row.provider_id,
    status: row.status,
    scheduledAt: row.scheduled_at,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
})

export const bookingService = {
    createBooking: async (input: CreateBookingInput): Promise<Booking> => {
        try {
            const userId = userService.currentUser().id

            const { data, error } = await database
                .from(tables.bookings)
                .insert({
                    service_id: input.serviceId,
                    client_id: userId,
                    provider_id: input.providerId,
                    scheduled_at: input.scheduledAt,
                    notes: input.notes ?? null,
                })
                .select()
                .single()

            if (error) throw error

            return mapBookingRow(data)
        } catch (error) {
            console.error('bookingService: createBooking', error)
            throw translateError(error)
        }
    },

    listMyBookings: async (): Promise<Booking[]> => {
        try {
            const user = userService.currentUser()
            const userId = user.id
            const isClient = user.role === 'client'
            const { data, error } = await database
                .from(tables.bookings)
                .select()
                .eq(isClient ? 'client_id' : 'provider_id', userId)

            if (error) throw error

            return data.map(mapBookingRow)
        } catch (error) {
            console.error('bookingService: listMyBookings', error)
            throw translateError(error)
        }
    },
}
