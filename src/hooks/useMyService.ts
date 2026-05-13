import { useQuery } from '@tanstack/react-query'

import { useUserStore } from '@/stores'
import { serviceService } from '@/services'

export const useMyService = () => {
    const userId = useUserStore((s) => s.user?.id)

    return useQuery({
        queryKey: ['service', 'mine'],
        queryFn: () => serviceService.getMyService(),
        enabled: !!userId,
    })
}
