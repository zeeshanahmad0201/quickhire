import { useQuery } from '@tanstack/react-query'

import { useUserStore } from '@/stores'
import { userService } from '@/services'

export const useMyService = () => {
    const userId = useUserStore((s) => s.user?.id)

    return useQuery({
        queryKey: ['service', 'mine'],
        queryFn: () => userService.getMyService(),
        enabled: !!userId,
    })
}
