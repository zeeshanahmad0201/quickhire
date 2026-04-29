import { Category } from '@/constants'
import { PriceType } from './service'

export type AppUser = {
    id: string
    name: string
    email: string
    role: UserRole
    avatarUrl?: string
    location?: string
    phone?: string
    createdAt: string
    completed: boolean
}

export type UserRole = 'client' | 'provider' | null

export type ProviderProfileForm = {
    name: string
    phone: string
    bio: string
    location: { lat: number; lng: number }
    title: string
    category: Category
    description: string
    pricingType: PriceType
    price: string
    profileUrl: string
}
