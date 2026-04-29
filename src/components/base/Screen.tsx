import { ViewProps, View, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// constants
import { spacing, colors } from '@/constants'

type ScreenProps = ViewProps & {
    main?: boolean
    centeredContent?: boolean
}

export const Screen = ({ main = false, centeredContent = false, style, ...props }: ScreenProps) => {
    if (main) {
        return (
            <SafeAreaView style={[styles.main, style]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        styles.scrollContent,
                        centeredContent && styles.centered,
                    ]}
                    {...props}
                />
            </SafeAreaView>
        )
    }

    return <View style={[styles.container, centeredContent && styles.centered, style]} {...props} />
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
    scrollContent: {
        flexGrow: 1,
        paddingBottom: spacing.pageVertical,
    },
})
