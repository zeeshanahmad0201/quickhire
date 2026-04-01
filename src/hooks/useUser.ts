import { useState } from 'react'

import { authService, userService } from '@/services'
import { mapAuthError, mapUserError } from '@/utils'
import { useUserStore } from '@/stores'
import { UserRole } from '@/types'

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

    const updateRole = async (role: UserRole): Promise<boolean> => {
        try {
            if (!user) return false

            setLoading(true)
            setError(null)

            await userService.setRole(role, user.id)
            setUser({ ...user, role })
            return true
        } catch (error) {
            setError(mapUserError(error, 'Operation failed. Please try again'))
            return false
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, user, fetchProfile, logout, updateRole }
}
