import { useUpdateClientProfile, useUser } from '@/hooks'
import { ClientProfileForm } from '@/types'
import { ClientForm } from '../forms'

export const ClientProfileEditor = () => {
    const { data: user } = useUser()
    const { mutate, isPending } = useUpdateClientProfile()

    const initialValues: Partial<ClientProfileForm> = {
        name: user?.name ?? '',
        phone: user?.phone ?? '',
        profileUrl: user?.avatarUrl ?? '',
        companyName: user?.companyName ?? '',
    }

    return <ClientForm initialValues={initialValues} isLoading={isPending} onSubmit={mutate} />
}
