import { authService, userService } from '@/services'
import { useUserStore } from '@/stores'
import { useEffect } from 'react'

export const useAuthListener = () => {
    const { setAuthState } = useUserStore()

    useEffect(() => {
        const subscription = authService.onAuthStateChange((session) => {
            if (!session) {
                setAuthState(null, true)
                return
            }

            userService
                .fetchProfile()
                .then((profile) => setAuthState(profile, true))
                .catch(() => setAuthState(null, true))
        })

        return () => subscription.unsubscribe()
    }, [])
}
