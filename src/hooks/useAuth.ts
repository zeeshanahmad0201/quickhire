import { useState } from 'react'

import { authService } from '@/services'
import { LoginRequest, RegisterRequest } from '@/types'
import { mapAuthError } from '@/utils'

export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const login = async (request: LoginRequest): Promise<boolean> => {
        try {
            setLoading(true)
            setError(null)

            await authService.login(request)
            return true
        } catch (error) {
            console.error('Failed to login: ', error)
            setError(mapAuthError(error))
            return false
        } finally {
            setLoading(false)
        }
    }

    const register = async (request: RegisterRequest): Promise<boolean> => {
        try {
            setLoading(true)
            setError(null)

            await authService.register(request)
            return true
        } catch (error) {
            console.error('Failed to register: ', error)
            setError(mapAuthError(error))
            return false
        } finally {
            setLoading(false)
        }
    }

    const logout = async (): Promise<boolean> => {
        try {
            setLoading(true)
            setError(null)

            await authService.logout()
            return true
        } catch (error) {
            console.error('Failed to logout: ', error)
            setError(mapAuthError(error))
            return false
        } finally {
            setLoading(false)
        }
    }

    const forgotPassword = async (email: string) => {
        try {
            setLoading(true)
            setError(null)

            await authService.forgotPassword(email)
        } catch (error) {
            setError(mapAuthError(error))
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,

        login,
        register,
        logout,
    forgotPassword,
    }
}
