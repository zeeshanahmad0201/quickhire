import { renderHook, waitFor } from '@testing-library/react-native'

import { useServices } from '../useServices'
import { makeWrapper } from '@/test/wrapper'

jest.mock('@/services', () => ({
    serviceService: {
        listServices: jest.fn(),
    },
}))

import { serviceService } from '@/services'

describe('useServices', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('fetches services and exposes them as data', async () => {
        const fixture = [{ id: 's-1', title: 'Plumbing' }]
        ;(serviceService.listServices as jest.Mock).mockResolvedValueOnce(fixture)

        const { Wrapper } = makeWrapper()
        const { result } = renderHook(() => useServices(), { wrapper: Wrapper })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))
        expect(result.current.data).toEqual(fixture)
        expect(serviceService.listServices).toHaveBeenCalledTimes(1)
    })
})
