import { ViewProps, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// constants
import { spacing, colors } from '@/constants'

type ScreenProps = ViewProps & {
    main?: boolean
    centeredContent?: boolean
}

export const Screen = ({ main = false, centeredContent = false, style, ...props }: ScreenProps) => {
    const combinedStyle = [styles.container, centeredContent && styles.centered, style]
    if (main) {
        return <SafeAreaView style={[styles.main, combinedStyle]} {...props} />
    }

    return <View style={combinedStyle} {...props} />
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light.background,
    },
    main: {
        paddingHorizontal: spacing.pageHorizontal,
        flex: 1,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
