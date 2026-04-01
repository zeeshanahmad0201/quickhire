import { authService, userService } from '@/services'
import { useUserStore } from '@/stores'
import { useEffect } from 'react'

export const useAuthListener = () => {
    const { setAuthState } = useUserStore()

    useEffect(() => {
        const subscription = authService.onAuthStateChange(async (session) => {
            if (session?.user) {
                try {
                    const profile = await userService.fetchProfile()
                    setAuthState(profile, true)
                } catch {
                    setAuthState(null, true)
                }
            } else {
                setAuthState(null, true)
            }
        })

        return () => subscription.unsubscribe()
    }, [])
}
