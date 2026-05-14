import { ViewProps, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// constants
import { spacing, colors, size } from '@/constants'
import { withOpacity } from '@/utils'

type ScreenProps = ViewProps & {
    main?: boolean
    centeredContent?: boolean
    loading?: boolean
}

export const Screen = ({
    main = false,
    centeredContent = false,
    loading = false,
    style,
    ...props
}: ScreenProps) => {
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

                {loading && (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size={size.iconXl} color={colors.light.onPrimary} />
                    </View>
                )}
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
    loaderContainer: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.light.overlay,
    },
})
