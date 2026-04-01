import { isAuthApiError } from '@supabase/supabase-js'

export const mapAuthError = (error: unknown): string => {
    if (isAuthApiError(error)) {
        switch (error.code) {
            case 'invalid_credentials':
                return 'Invalid email or password'
            case 'user_already_exists':
            case 'email_exists':
                return 'An account with this email already exists'
            case 'email_not_confirmed':
                return 'Please verify your email before logging in'
            case 'over_request_rate_limit':
                return 'Too many attempts. Please try again later'
            default:
                return error.message
        }
    }

    return 'Something went wrong. Please try again!'
}
