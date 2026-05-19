import { renderHook, waitFor, act } from '@testing-library/react-native'

import { useLogin } from '../useLogin'
import { makeWrapper } from '@/test/wrapper'

jest.mock('@/services', () => ({
    authService: {
        login: jest.fn(),
    },
}))

import { authService } from '@/services'

describe('useLogin', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('calls authService.login with credentials and resolves successfully', async () => {
        ;(authService.login as jest.Mock).mockResolvedValueOnce({ user: { id: 'u-1' } })

        const { Wrapper } = makeWrapper()
        const { result } = renderHook(() => useLogin(), { wrapper: Wrapper })

        await act(async () => {
            await result.current.mutateAsync({ email: 'x@y.com', password: 'pw' })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))
        expect(authService.login).toHaveBeenCalledWith({ email: 'x@y.com', password: 'pw' })
    })
})
