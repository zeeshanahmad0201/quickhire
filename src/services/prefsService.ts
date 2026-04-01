import { storage } from '@/lib'

const KEYS = {
    onboarding: 'onboarding',
}

export const prefsService = {
    hasOnboarded: storage.getBoolean(KEYS.onboarding) ?? false,
    setOnboarded: () => storage.set(KEYS.onboarding, true),
}
