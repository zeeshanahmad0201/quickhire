import { useQuery } from '@tanstack/react-query'

import { serviceService } from '@/services'

export const useServices = () => {
    return useQuery({
        queryKey: ['services', 'list'],
        queryFn: () => serviceService.listServices(),
    })
}
