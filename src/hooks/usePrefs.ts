import { prefsService } from '@/services'

export const usePrefs = () => {
    const { hasOnboarded, setOnboarded } = prefsService

    return {
        hasOnboarded,
        setOnboarded,
    }
}
