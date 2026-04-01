import { AppUser } from '@/types'
import { create } from 'zustand'

type UserStore = {
    user?: AppUser | null
    authChecked: boolean

    setUser: (user: AppUser) => void
    setAuthState: (user: AppUser | null, authChecked: boolean) => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    authChecked: false,

    setUser: (user) => set({ user }),
    setAuthState: (user: AppUser | null, authChecked: boolean) => set({ user, authChecked }),
}))
