import { errorMessage } from '@/errors'
import { userService } from '@/services'
import { useUserStore } from '@/stores'
import { ProviderProfileForm, Service } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

export const useUpdateProviderProfile = () => {
    const queryClient = useQueryClient()
    const setUser = useUserStore((s) => s.setUser)

    return useMutation({
        mutationFn: (form: ProviderProfileForm) => userService.upsertProviderProfile(form),
        onSuccess: async (newService: Service) => {
            // 1. Hydrate TanStack cache with the new service row.
            //    Any useMyService() consumer re-renders automatically.
            queryClient.setQueryData(['service', 'mine'], newService)

            // 2. Re-fetch the user to sync Zustand.
            const freshUser = await userService.fetchProfile()
            setUser(freshUser)
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
