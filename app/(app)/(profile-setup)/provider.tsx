import { useEffect } from 'react'

import { ProviderForm } from '@/components/forms'
import { useUser } from '@/hooks'
import Toast from 'react-native-toast-message'
import { ProviderProfileForm } from '@/types'

const ServiceProvider = () => {
    const { loading, error, storeProviderProfile, user } = useUser()

    useEffect(() => {
        if (!loading && error) {
            Toast.show({
                type: 'error',
                text1: error,
                position: 'bottom',
            })
        }
    }, [loading, error])

    const onSubmit = async (data: ProviderProfileForm) => {
        await storeProviderProfile(data)
    }

    return (
        <ProviderForm
            loading={loading}
            submitLabel="Save"
            initialValues={{
                name: user?.name ?? '',
            }}
            onSubmit={onSubmit}
        />
    )
}

export default ServiceProvider
