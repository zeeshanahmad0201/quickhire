import { ClientError } from 'graphql-request'
import { isAuthError as isSupabaseAuthError } from '@supabase/supabase-js'

import {
    AppError,
    NetworkError,
    NotFoundError,
    PermissionError,
    AuthError,
    ValidationError,
    ServerError,
} from './AppError'

type PostgrestErrorShape = {
    code: string
    message: string
    details?: string
    hint?: string
}

const isPostgrestError = (error: unknown): error is PostgrestErrorShape =>
    !!error &&
    typeof error === 'object' &&
    'code' in error &&
    'message' in error &&
    typeof (error as { code: unknown }).code === 'string'

const isNetworkError = (error: unknown): boolean => {
    if (error instanceof TypeError) {
        return typeof error.message === 'string' && /network|fetch/i.test(error.message)
    }
    if (error && typeof error === 'object' && 'message' in error) {
        const msg = (error as { message: unknown }).message
        if (
            typeof msg === 'string' &&
            /network request failed|failed to fetch|network error/i.test(msg)
        ) {
            return true
        }
    }
    return false
}

export const translateError = (error: unknown): AppError => {
    // already translated - idempotent
    if (error instanceof AppError) return error

    // offline
    if (isNetworkError(error)) {
        return new NetworkError(
            "You're offline. Check your connection.",
            (error as Error).message,
            error
        )
    }

    // graphql-request http errors
    if (error instanceof ClientError) {
        const status = error.response.status
        const tech = error.message

        if (status >= 500) {
            return new ServerError('Service is unavailable. Please try again', tech, error)
        }

        switch (status) {
            case 401:
                return new AuthError('Session expired. Please login again', tech, error)
            case 403:
                return new PermissionError(
                    "You don't have permission to execute this operation",
                    tech,
                    error
                )
            case 404:
                return new NotFoundError('Not found', tech, error)
            case 422:
                return new ValidationError('Invalid input', tech, error)

            default:
                return new AppError('Something went wrong', tech, error)
        }
    }

    // supabase auth errors
    if (isSupabaseAuthError(error)) {
        const status = error.status ?? 0
        if (status === 401 || status === 403) {
            return new AuthError('Session expired. Please login again', error.message, error)
        }

        if (status === 422) return new ValidationError(error.message, error.message, error)

        return new AuthError('Authentication failed', error.message, error)
    }

    // supabase postgrest error (from database.from()...)
    if (isPostgrestError(error)) {
        if (error.code === 'PGRST116')
            return new NotFoundError('Record not found', error.message, error)
        if (error.code === '42501')
            return new PermissionError("You don't have access to this", error.message, error)
        if (error.code.startsWith('23'))
            return new ValidationError('Invalid data', error.message, error)
        return new AppError(error.message, error.message, error)
    }

    if (error instanceof Error) {
        return new AppError('Something went wrong', error.message, error)
    }
    return new AppError('Something went wrong', String(error))
}
