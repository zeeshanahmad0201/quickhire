import { Category } from '@/constants'
import { PriceType } from './service'

export type AppUser = {
    id: string
    name: string
    email: string
    role: UserRole
    avatarUrl?: string
    bio?: string
    location?: { lat: number; lng: number }
    phone?: string
    createdAt: string
    completed: boolean
    companyName?: string
}

export type UserRole = 'client' | 'provider' | null

export type ProviderProfileForm = PersonalInfo & {
    title: string
    category: Category
    description: string
    pricingType: PriceType
    price: string
    location: { lat: number; lng: number }
    bio: string
}

export type ClientProfileForm = PersonalInfo & {
    companyName?: string
}

export type PersonalInfo = {
    name: string
    phone: string
    profileUrl: string
}
