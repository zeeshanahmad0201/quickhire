export type Service = {
    id: string
    providerId: string
    title: string
    description: string
    category: string
    price: number
    images: string[]
    isActive: boolean
    createdAt: Date
    lat: number
    lng: number
    priceType: PriceType
}

export const priceTypes = ['hourly', 'fixed'] as const

export type PriceType = typeof priceTypes[number]
