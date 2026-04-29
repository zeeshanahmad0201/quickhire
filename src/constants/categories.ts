export const categories = [
    { id: 'cleaning', label: 'Cleaning' },
    { id: 'plumbing', label: 'Plumbing' },
    { id: 'electrical', label: 'Electrical' },
    { id: 'carpentry', label: 'Carpentry' },
    { id: 'painting', label: 'Painting' },
    { id: 'tutoring', label: 'Tutoring' },
    { id: 'photography', label: 'Photography' },
    { id: 'catering', label: 'Catering' },
    { id: 'moving', label: 'Moving' },
    { id: 'landscaping', label: 'Landscaping' },
]

export type Category = (typeof categories)[number]['id']
