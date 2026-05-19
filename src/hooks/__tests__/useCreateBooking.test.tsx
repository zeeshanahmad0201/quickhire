import { renderHook, waitFor, act } from '@testing-library/react-native'

import { useCreateBooking } from '../useCreateBooking'
import { createTestQueryClient, makeWrapper } from '@/test/wrapper'

jest.mock('@/services', () => ({
    bookingService: {
        createBooking: jest.fn(),
    },
}))

import { bookingService } from '@/services'

describe('useCreateBooking', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('creates a booking and invalidates the bookings query', async () => {
        const created = { id: 'b-1', service_id: 's-1', status: 'pending' }
        ;(bookingService.createBooking as jest.Mock).mockResolvedValueOnce(created)

        const queryClient = createTestQueryClient()
        const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

        const { Wrapper } = makeWrapper(queryClient)
        const { result } = renderHook(() => useCreateBooking(), { wrapper: Wrapper })

        const input = {
            serviceId: 's-1',
            providerId: 'p-1',
            scheduledAt: new Date().toISOString(),
            notes: null,
        }

        await act(async () => {
            await result.current.mutateAsync(input as never)
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))
        expect(bookingService.createBooking).toHaveBeenCalledWith(input)
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['bookings'] })
    })
})
