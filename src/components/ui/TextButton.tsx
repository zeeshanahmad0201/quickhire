import { spacing, typography } from '@/constants'
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps, TextStyle } from 'react-native'

type TextButtonProps = TouchableOpacityProps & {
    title: string
    onPress: () => void
    prefix?: string
    titleStyle?: TextStyle
}

export const TextButton = ({
    title,
    onPress,
    prefix,
    titleStyle,
    style,
    ...props
}: TextButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={[style, styles.container]} {...props}>
            {prefix && <Text style={styles.prefix}>{prefix}</Text>}
            <Text style={[titleStyle, styles.title]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.sm,
        alignItems: 'center',
    },
    title: {
        ...typography.labelMd,
    },
    prefix: {
        ...typography.bodySm,
        marginRight: spacing.xs,
    },
})
