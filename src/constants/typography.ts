import { TextStyle } from 'react-native'

const family = {
    regular: 'PlusJakartaSans_400Regular',
    medium: 'PlusJakartaSans_500Medium',
    semiBold: 'PlusJakartaSans_600SemiBold',
    bold: 'PlusJakartaSans_700Bold',
}

export const typography: Record<string, TextStyle> = {
    // Display
    displayLg: {
        fontFamily: family.bold,
        fontSize: 48,
        lineHeight: 53,
        letterSpacing: -0.5,
    },
    displayMd: {
        fontFamily: family.bold,
        fontSize: 36,
        lineHeight: 40,
        letterSpacing: -0.25,
    },
    displaySm: {
        fontFamily: family.bold,
        fontSize: 32,
        lineHeight: 38,
        letterSpacing: 0,
    },

    // Headline
    headlineLg: {
        fontFamily: family.bold,
        fontSize: 24,
        lineHeight: 31,
        letterSpacing: 0,
    },
    headlineMd: {
        fontFamily: family.bold,
        fontSize: 20,
        lineHeight: 26,
        letterSpacing: 0.15,
    },
    headlineSm: {
        fontFamily: family.semiBold,
        fontSize: 18,
        lineHeight: 23,
        letterSpacing: 0.15,
    },

    // Title
    titleLg: {
        fontFamily: family.bold,
        fontSize: 18,
        lineHeight: 23,
        letterSpacing: 0.15,
    },
    titleMd: {
        fontFamily: family.semiBold,
        fontSize: 16,
        lineHeight: 22,
        letterSpacing: 0.1,
    },
    titleSm: {
        fontFamily: family.semiBold,
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.1,
    },

    // Body
    bodyLg: {
        fontFamily: family.medium,
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 0.5,
    },
    bodyMd: {
        fontFamily: family.regular,
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0.25,
    },
    bodySm: {
        fontFamily: family.regular,
        fontSize: 12,
        lineHeight: 17,
        letterSpacing: 0.25,
    },

    // Label
    labelLg: {
        fontFamily: family.semiBold,
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.1,
    },
    labelMd: {
        fontFamily: family.medium,
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.5,
    },
    labelSm: {
        fontFamily: family.semiBold,
        fontSize: 11,
        lineHeight: 14,
        letterSpacing: 0.4,
    },
}
