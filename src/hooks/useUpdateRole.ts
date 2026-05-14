import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

import { errorMessage } from '@/errors'
import { queryClient } from '@/lib'
import { userService } from '@/services'
import { AppUser, UserRole } from '@/types'

export const useUpdateRole = () => {
    return useMutation({
        mutationFn: async (role: UserRole) => {
            const user = queryClient.getQueryData<AppUser>(['user', 'me'])
            if (!user) throw new Error('No user')
            await userService.setRole(role)
            return { ...user, role }
        },
        onSuccess: (fresh) => {
            queryClient.setQueryData(['user', 'me'], fresh)
        },
        onError: (error) => {
            Toast.show({ type: 'error', text1: errorMessage(error), position: 'bottom' })
        },
    })
}
