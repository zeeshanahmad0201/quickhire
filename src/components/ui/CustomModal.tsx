import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'

import { colors, radius, spacing } from '@/constants'

type CustomModalProps = {
    children: React.ReactNode
    visible: boolean
    onClose: () => void
    fullScreen?: boolean
}

export const CustomModal = ({ children, visible, onClose, fullScreen }: CustomModalProps) => {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={[styles.modalContainer, fullScreen && styles.fullScreenContainer]}>
                {/* Backdrop */}
                <TouchableOpacity style={styles.backdrop} onPress={onClose} />

                {/* Sheet */}
                <View style={[styles.sheet, fullScreen && styles.fullScreen]}>
                    <View style={styles.handle} />
                    {children}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    sheet: {
        backgroundColor: colors.light.background,
        borderTopLeftRadius: radius.sm,
        borderTopRightRadius: radius.sm,
        paddingVertical: spacing.md,
        maxHeight: '50%',
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: radius.full,
        backgroundColor: colors.light.border,
        marginBottom: spacing.md,
        alignSelf: 'center',
    },
    fullScreen: {
        flex: 1,
        maxHeight: '100%',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    fullScreenContainer: {
        justifyContent: 'flex-start',
    },
})
