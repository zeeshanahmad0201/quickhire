import { useState } from 'react'

import { authService, userService } from '@/services'
import { mapAuthError, mapUserError } from '@/utils'
import { useUserStore } from '@/stores'

export const useUser = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const { user, setUser } = useUserStore()

    const fetchProfile = async () => {
        try {
            setLoading(true)
            setError(null)
            const profile = await userService.fetchProfile()
            setUser(profile)
        } catch (error) {
            setError(mapUserError(error, 'Session expired. Please login again!'))
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            setLoading(true)
            setError(null)

            await authService.logout()
        } catch (error) {
            setError(mapAuthError(error))
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, user, fetchProfile, logout }
}
