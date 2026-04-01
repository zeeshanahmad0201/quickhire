import { authService, userService } from '@/services'
import { useUserStore } from '@/stores'
import { useEffect } from 'react'

export const useAuthListener = () => {
    const { setUser, clearUser, setAuthChecked } = useUserStore()

    useEffect(() => {
        const subscription = authService.onAuthStateChange(async (session) => {
            if (session?.user) {
                try {
                    const profile = await userService.fetchProfile()
                    setUser(profile)
                } catch {
                    clearUser()
                }
            } else {
                clearUser()
            }
            setAuthChecked(true)
        })

        return () => subscription.unsubscribe()
    }, [])
}
