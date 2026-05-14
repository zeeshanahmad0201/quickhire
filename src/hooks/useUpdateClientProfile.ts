import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

import { AuthError, errorMessage } from '@/errors'
import { queryClient } from '@/lib'
import { userService } from '@/services'
import { AppUser, ClientProfileForm } from '@/types'

export const useUpdateClientProfile = () => {
    return useMutation({
        mutationFn: (form: ClientProfileForm) => userService.upsertClientProfile(form),
        onSuccess: (freshUser: AppUser) => {
            queryClient.setQueryData(['user', 'me'], freshUser)
            Toast.show({
                type: 'success',
                text1: 'Profile updated',
                position: 'bottom',
            })
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Update failed',
                text2: errorMessage(error),
                position: 'bottom',
            })
        },
    })
}
