import { GraphQLClient } from 'graphql-request'
import { database, supabaseUrl, supabaseKey } from './supabase'

export const gqlClient = new GraphQLClient(`${supabaseUrl}/graphql/v1`, {
    requestMiddleware: async (request) => {
        const {
            data: { session },
        } = await database.auth.getSession()
        const token = session?.access_token ?? supabaseKey

        return {
            ...request,
            headers: {
                ...request.headers,
                apikey: supabaseKey,
                Authorization: `Bearer ${token}`,
            },
        }
    },
})
