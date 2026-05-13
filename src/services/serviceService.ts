import { gql } from 'graphql-request'

import { Service } from '@/types'
import { userService } from './userService'
import { gqlClient } from '@/lib'
import { translateError } from '@/errors'

export const serviceService = {
    getMyService: async (): Promise<Service | null> => {
        try {
            const userId = (await userService.currentUser()).id

            const query = gql`
                query MyService($providerId: UUID!) {
                    servicesCollection(filter: { provider_id: { eq: $providerId } }) {
                        edges {
                            node {
                                id
                                providerId: provider_id
                                title
                                description
                                category
                                price
                                priceType: price_type
                                lat
                                lng
                                images
                                isActive: is_active
                                createdAt: created_at
                            }
                        }
                    }
                }
            `
            const data = await gqlClient.request<{
                servicesCollection: { edges: { node: Service }[] }
            }>(query, { providerId: userId })

            return data.servicesCollection.edges[0]?.node ?? null
        } catch (error) {
            console.error('serviceService: getMyService', error)
            throw translateError(error)
        }
    },

    listServices: async (): Promise<Service[]> => {
        try {
            const query = gql`
                query ListServices {
                    servicesCollection(
                        filter: { is_active: { eq: true } }
                        orderBy: [{ created_at: DescNullsLast }]
                        first: 50
                    ) {
                        edges {
                            node {
                                id
                                providerId: provider_id
                                title
                                description
                                category
                                price
                                priceType: price_type
                                lat
                                lng
                                images
                                isActive: is_active
                                createdAt: created_at
                            }
                        }
                    }
                }
            `

            const response = await gqlClient.request<{
                servicesCollection: { edges: { node: Service }[] }
            }>(query)

            return response.servicesCollection.edges.map((s) => s.node)
        } catch (error) {
            console.error('serviceService: listServices', error)
            throw translateError(error)
        }
    },
}
