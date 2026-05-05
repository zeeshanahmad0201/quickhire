import { ProviderForm } from '@/components/forms'
import { useUser } from '@/hooks'

const Profile = () => {
    const { user } = useUser()

    return (
        <ProviderForm
            initialValues={{ name: user?.name }}
            submitLabel="Update"
            onSubmit={(data) => console.log('profile submit', data)}
        />
    )
}

export default Profile
