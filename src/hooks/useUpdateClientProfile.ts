import { errorMessage } from '@/errors'
import { userService } from '@/services'
import { useUserStore } from '@/stores'
import { AppUser, ClientProfileForm } from '@/types'
import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

export const useUpdateClientProfile = () => {
    const setUser = useUserStore((s) => s.setUser)

    return useMutation({
        mutationFn: (form: ClientProfileForm) => userService.upsertClientProfile(form),
        onSuccess: (freshUser: AppUser) => {
            setUser(freshUser)
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
