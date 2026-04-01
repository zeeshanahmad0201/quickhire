import { PostgrestError } from '@supabase/supabase-js'

export const mapUserError = (error: unknown, defaultMsg?: string) => {
    if (error instanceof PostgrestError) {
        switch (error.code) {
            case 'PGRST116':
                return 'Profile not found'
            default:
                return error.message
        }
    }

    return defaultMsg ?? 'Something went wrong. Please try again.'
}
