import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

import { authService } from '@/services'
import { errorMessage } from '@/errors'

export const useForgotPass = () => {
    return useMutation({
        mutationFn: (email: string) => authService.forgotPassword(email),
        onSuccess: (_data, email) => {
            Toast.show({
                type: 'success',
                text1: 'Link sent',
                text2: `Password reset link has been sent to ${email} with instructions`,
                position: 'bottom',
            })
        },
        onError: (error) => {
            Toast.show({ type: 'error', text1: errorMessage(error), position: 'bottom' })
        },
    })
}
