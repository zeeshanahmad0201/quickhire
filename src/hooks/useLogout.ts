import Toast from 'react-native-toast-message'
import { useMutation } from '@tanstack/react-query'

import { errorMessage } from '@/errors'
import { queryClient } from '@/lib'
import { authService, notificationService } from '@/services'

export const useLogout = () => {
    return useMutation({
        mutationFn: async () => {
            try {
                await notificationService.deleteCurrentDeviceToken()
            } catch (error) {
                console.warn('useLogout: token cleanup failed, continuing logout', error)
            }

            await authService.logout()
        },
        onSuccess: () => {
            queryClient.setQueryData(['user', 'me'], null)
            queryClient.clear()
        },
        onError: (error) => {
            Toast.show({ type: 'error', text1: errorMessage(error), position: 'bottom' })
        },
    })
}
