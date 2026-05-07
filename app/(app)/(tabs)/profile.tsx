import { Loader } from 'lucide-react-native'

import { ProviderForm } from '@/components/forms'
import { useMyService, useUser, useUpdateProviderProfile } from '@/hooks'
import { ProviderProfileForm } from '@/types'

const Profile = () => {
    const { user } = useUser()
    const { data: service, isPending } = useMyService()
    const { mutate, isPending: isSaving } = useUpdateProviderProfile()

    const initialValues: Partial<ProviderProfileForm> = {
        name: user?.name ?? '',
        phone: user?.phone ?? '',
        bio: user?.bio ?? '',
        profileUrl: user?.avatarUrl ?? '',
        location: service ? { lat: service.lat, lng: service.lng } : undefined,
        title: service?.title ?? '',
        category: service?.category,
        description: service?.description ?? '',
        price: service?.price?.toString() ?? '',
        pricingType: service?.priceType ?? 'hourly',
    }

    if (isPending) {
        return <Loader />
    }

    return (
        <ProviderForm
            loading={isPending || isSaving}
            initialValues={initialValues}
            submitLabel="Update"
            onSubmit={mutate}
        />
    )
}

export default Profile
