import { AuthError, errorMessage } from '@/errors'
import { queryClient } from '@/lib'
import { userService } from '@/services'
import { ProviderProfileForm, Service } from '@/types'
import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

export const useUpdateProviderProfile = () => {
    return useMutation({
        mutationFn: (form: ProviderProfileForm) => userService.upsertProviderProfile(form),
        onSuccess: async (newService: Service) => {
            // 1. Hydrate TanStack cache with the new service row.
            //    Any useMyService() consumer re-renders automatically.
            queryClient.setQueryData(['service', 'mine'], newService)

            // 2. sync user cache
            const freshUser = await userService.fetchProfile()
            if (!freshUser) {
                throw new AuthError('No user is logged in', 'profile gone post-upsert')
            }
            queryClient.setQueryData(['user', 'me'], freshUser)
            Toast.show({
                type: 'success',
                text1: 'Profile updated',
                position: 'bottom',
            })
        },
        onError: (error: Error) => {
            Toast.show({
                type: 'error',
                text1: 'Update failed',
                text2: errorMessage(error),
                position: 'bottom',
            })
        },
    })
}
