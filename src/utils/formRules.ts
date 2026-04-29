export const formRules = {
    required: (field: string) => ({ required: `${field} is required` }),

    name: {
        required: 'Name is required',
        validate: {
            minLength: (v: string) => v.trim().length >= 2 || 'Name must be at least 2 characters',
            lettersOnly: (v: string) => /^[a-zA-Z\s]+$/.test(v) || 'Name can only contain letters',
        },
    },
    email: {
        required: 'Email is required',
        validate: {
            format: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email',
        },
    },
    password: {
        required: 'Password is required',
        validate: {
            minLength: (v: string) => v.length >= 6 || 'At least 6 characters',
            hasNumber: (v: string) => /\d/.test(v) || 'Must contain a number',
            hasUppercase: (v: string) => /[A-Z]/.test(v) || 'Must contain an uppercase letter',
        },
    },
    phone: {
        required: 'Phone is required',
        validate: {
            format: (v: string) => /^[0-9+\-\s()]{7,15}$/.test(v) || 'Invalid phone number',
        },
    },
    bio: {
        required: 'Bio is required',
        validate: {
            minLength: (v: string) => v.trim().length >= 20 || 'Bio must be at least 20 characters',
            maxLength: (v: string) => v.trim().length <= 300 || 'Bio must be under 300 characters',
        },
    },
    serviceTitle: {
        required: 'Title is required',
        validate: {
            minLength: (v: string) => v.trim().length >= 5 || 'Title must be at least 5 characters',
            maxLength: (v: string) =>
                v.trim().length <= 100 || 'Title must be under 100 characters',
        },
    },
    serviceDescription: {
        required: 'Description is required',
        validate: {
            minLength: (v: string) =>
                v.trim().length >= 20 || 'Description must be at least 20 characters',
            maxLength: (v: string) =>
                v.trim().length <= 500 || 'Description must be under 500 characters',
        },
    },
    price: {
        required: 'Price is required',
        validate: {
            positive: (v: string) => parseFloat(v) > 0 || 'Price must be greater than 0',
            format: (v: string) => /^\d+(\.\d{1,2})?$/.test(v) || 'Enter a valid price',
        },
    },
}
