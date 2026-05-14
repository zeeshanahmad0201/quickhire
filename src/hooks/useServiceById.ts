import { useQuery } from '@tanstack/react-query'

import { serviceService } from '@/services'
import { useUser } from './useUser'

export const useServiceById = (serviceId: string | undefined) => {
    const { data: user } = useUser()

    return useQuery({
        queryKey: ['services', serviceId],
        queryFn: () => serviceService.getServiceById(serviceId!),
        enabled: !!user?.id && !!serviceId,
    })
}
