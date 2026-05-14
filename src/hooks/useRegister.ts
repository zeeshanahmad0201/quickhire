import Toast from 'react-native-toast-message'
import { useMutation } from '@tanstack/react-query'

import { authService } from '@/services'
import { RegisterRequest } from '@/types'
import { errorMessage } from '@/errors'

export const useRegister = () => {
    return useMutation({
        mutationFn: (request: RegisterRequest) => authService.register(request),
        onError: (error) => {
            Toast.show({ type: 'error', text1: errorMessage(error), position: 'bottom' })
        },
    })
}
