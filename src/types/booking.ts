export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export type Booking = {
    id: string
    serviceId: string
    clientId: string
    providerId: string
    status: BookingStatus
    scheduledAt: string
    notes?: string
    createdAt: string
}

export type CreateBookingInput = {
    serviceId: string
    providerId: string
    scheduledAt: string
    notes?: string
}
