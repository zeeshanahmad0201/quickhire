import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services'

export const useUser = () => {
    return useQuery({
        queryKey: ['user', 'me'],
        queryFn: () => userService.fetchProfile(),
        staleTime: Infinity,
        retry: false,
    })
}
