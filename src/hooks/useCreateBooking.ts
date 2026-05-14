import { errorMessage } from '@/errors'
import { bookingService } from '@/services'
import { Booking, CreateBookingInput } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

export const useCreateBooking = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (booking: CreateBookingInput) => bookingService.createBooking(booking),
        onSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Booking created successfully',
                position: 'bottom',
            })
            queryClient.invalidateQueries({ queryKey: ['bookings'] })
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: errorMessage(error),
                position: 'bottom',
            })
        },
    })
}
