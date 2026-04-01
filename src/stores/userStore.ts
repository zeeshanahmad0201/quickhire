import { AppUser } from '@/types'
import { create } from 'zustand'

type UserStore = {
    user?: AppUser | null
    authChecked: boolean

    setUser: (user: AppUser) => void
    setAuthChecked: (authChecked: boolean) => void
    clearUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    authChecked: false,

    setUser: (user) => set({ user }),
    setAuthChecked: (authChecked) => set({ authChecked }),
    clearUser: () => set({ user: null }),
}))
