import { View } from 'react-native'

import { colors, radius, spacing } from '@/constants'

type DividerProps = {
    backgroundColor?: string | null,
    marginVertical?: number,
}

export const Divider = ({ backgroundColor, marginVertical }: DividerProps) => {
    return (
        <View
            style={{
                width: '100%',
                backgroundColor: backgroundColor ?? colors.light.border,
                height: radius.width,
                borderRadius: radius.md,
                marginVertical: marginVertical ?? spacing.md,
            }}
        />
    )
}
