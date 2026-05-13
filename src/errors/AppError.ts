export class AppError extends Error {
    userMessage: string
    constructor(userMessage: string, technicalMessage?: string, cause?: unknown) {
        super(technicalMessage ?? userMessage)
        this.name = this.constructor.name
        this.userMessage = userMessage
        if (cause) this.cause = cause
    }
}

export class AuthError extends AppError {}
export class PermissionError extends AppError {}
export class NotFoundError extends AppError {}
export class ValidationError extends AppError {}
export class NetworkError extends AppError {}
export class ServerError extends AppError {}
