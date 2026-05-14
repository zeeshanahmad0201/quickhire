import { queryClient } from '@/lib'
import { authService } from '@/services'
import { useEffect } from 'react'

export const useAuthListener = () => {
    useEffect(() => {
        const subscription = authService.onAuthStateChange(() => {
            queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
        })

        return () => subscription.unsubscribe()
    }, [])
}
