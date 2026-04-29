export const colors = {
    light: {
        primary: '#4F46E5',
        onPrimary: '#FFF',

        background: '#F9FAFB',
        surface: '#FFFFFF', // used for cards, inputs, modals
        border: '#E5E7EB',

        disabled: '#E5E7EB',
        onDisabled: '#9CA3AF',

        text: {
            normal: '#111827',
            muted: '#6B7280',
            subtle: '#9CA3AF',
            disabled: '#D1D5DB',
        },

        error: '#EF4444',
        success: '#22C55E',
        warning: '#F59E0B',

        icon: {
            normal: '#6B7280',
            muted: '#9CA3AF',
            active: '#4F46E5',
        },

        gradient: {
            primary: ['#4F46E5', '#7C3AED'] as const,
        },
    },
    dark: {
        primary: '#6366F1',
        onPrimary: '#FFF',

        background: '#1E293B',
        surface: '#0F172A', // used for cards, inputs, modals
        border: '#334155',

        disabled: '#1E293B',
        onDisabled: '#4B5563',

        text: {
            normal: '#F8FAFC',
            muted: '#94A3B8',
            subtle: '#64748B',
            disabled: '#334155',
        },

        error: '#F87171',
        success: '#4ADE80',
        warning: '#FCD34D',

        icon: {
            normal: '#94A3B8',
            muted: '#64748B',
            active: '#6366F1',
        },
        
        gradient: {
            primary: ['#4F46E5', '#7C3AED'] as const,
        },
    },
}
