import { spacing } from '@/constants'
import { DimensionValue, View } from 'react-native'

type SpacerProps = {
    width?: DimensionValue
    height?: DimensionValue
}

export const Spacer = ({ width = '100%', height = spacing.lg }: SpacerProps) => {
    return <View style={{ width, height }} />
}
