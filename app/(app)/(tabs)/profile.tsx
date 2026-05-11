import { ClientProfileEditor, ProviderProfileEditor } from '@/components'
import { useUser } from '@/hooks'

const Profile = () => {
    const { user } = useUser()

    if (user?.role === 'provider') {
        return <ProviderProfileEditor />
    }

    if (user?.role === 'client') {
        return <ClientProfileEditor />
    }

    return null
}

export default Profile
