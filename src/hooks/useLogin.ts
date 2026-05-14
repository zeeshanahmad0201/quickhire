import { errorMessage } from '@/errors'
import { authService } from '@/services'
import { LoginRequest } from '@/types'
import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

export const useLogin = () => {
    return useMutation({
        mutationFn: (request: LoginRequest) => authService.login(request),
        onError: (error) => {
            Toast.show({ type: 'error', text1: errorMessage(error), position: 'bottom' })
        },
    })
}
