export type AppUser = {
    id: string
    name: string
    email: string
    role: UserRole
    avatarUrl?: string
    location?: string
    phone?: string
    createdAt: string
}

export type UserRole = 'client' | 'provider' | null
