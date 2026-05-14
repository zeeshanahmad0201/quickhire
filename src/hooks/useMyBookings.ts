import { useQuery } from '@tanstack/react-query'

import { bookingService } from '@/services'
import { useUser } from './useUser'

export const useMyBookings = () => {
    const { data: user } = useUser()

    return useQuery({
        queryKey: ['bookings', 'list'],
        queryFn: () => bookingService.listMyBookings(),
        enabled: !!user?.id,
    })
}
