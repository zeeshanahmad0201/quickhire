import { database, supabaseUrl, supabaseKey } from './supabase'

const endpoint = `${supabaseUrl}/graphql/v1`

export const gqlClient = {
    request: async <T>(query: string, variables?: Record<string, unknown>): Promise<T> => {
        const {
            data: { session },
        } = await database.auth.getSession()

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            apikey: supabaseKey,
        }
        if (session?.access_token) {
            headers.Authorization = `Bearer ${session.access_token}`
        }

        const body = variables ? { query, variables } : { query }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        })
        const result = (await response.json()) as { data?: T; errors?: { message: string }[] }

        if (result.errors?.length) {
            throw new Error(result.errors[0]?.message ?? 'GraphQL error')
        }
        return result.data as T
    },
}
