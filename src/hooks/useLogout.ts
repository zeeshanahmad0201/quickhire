import Toast from 'react-native-toast-message'
import { useMutation } from '@tanstack/react-query'

import { errorMessage } from '@/errors'
import { queryClient } from '@/lib'
import { authService } from '@/services'

export const useLogout = () => {
    return useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            queryClient.setQueryData(['user', 'me'], null)
            queryClient.clear()
        },
        onError: (error) => {
            Toast.show({ type: 'error', text1: errorMessage(error), position: 'bottom' })
        },
    })
}
