import { AppError } from './AppError'

const DEFAULT_MESSAGE = 'Something went wrong. Please try again.'

export const errorMessage = (error: unknown, fallback?: string): string => {
    if (error instanceof AppError) return error.userMessage
    return fallback ?? DEFAULT_MESSAGE
}
