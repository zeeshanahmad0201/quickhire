import { colors, radius, size, spacing, typography } from '@/constants'
import { TouchableOpacity, StyleSheet, Text, Modal, View, FlatList } from 'react-native'
import { Check, ChevronDown } from 'lucide-react-native'
import { useState } from 'react'
import { Divider } from './Divider'

type SelectOption<T extends string = string> = {
    label: string
    value: T
}

type SelectProps<T extends string = string> = {
    options: SelectOption<T>[]
    value: T | null
    onChange: (value: T) => void
    placeholder: string
}

export const Select = <T extends string>({
    value,
    placeholder,
    options,
    onChange,
}: SelectProps<T>) => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <TouchableOpacity style={styles.container} onPress={() => setOpen(true)}>
                {/* Content */}
                <Text
                    style={[
                        styles.content,
                        { color: value ? colors.light.text.normal : colors.light.text.subtle },
                    ]}
                >
                    {value ? value : placeholder}
                </Text>

                {/* Suffix */}
                <ChevronDown
                    color={value ? colors.light.icon.normal : colors.light.icon.muted}
                    size={size.iconSm}
                />
            </TouchableOpacity>

            <Modal visible={open} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    {/* Backdrop */}
                    <TouchableOpacity style={styles.backdrop} onPress={() => setOpen(false)} />

                    {/* Sheet */}
                    <View style={styles.sheet}>
                        <View style={styles.handle} />
                        <FlatList
                            data={options}
                            keyExtractor={(option) => option.value}
                            contentContainerStyle={styles.optionList}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => {
                                        onChange(item.value)
                                        setOpen(false)
                                    }}
                                >
                                    <Text style={styles.optionText}>{item.label}</Text>
                                    {value === item.value && (
                                        <Check size={size.iconSm} color={colors.light.primary} />
                                    )}
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={(_) => <Divider marginVertical={spacing.sm} />}
                        />
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderWidth: radius.width,
        borderRadius: radius.sm,
        borderColor: colors.light.border,
        backgroundColor: colors.light.surface,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.inputVertical,
    },
    content: {
        ...typography.bodyMd,
        flex: 1,
        color: colors.light.text.normal,
        marginRight: spacing.md,
        textAlignVertical: 'center',
    },
    sheet: {
        backgroundColor: colors.light.background,
        borderTopLeftRadius: radius.sm,
        borderTopRightRadius: radius.sm,
        paddingVertical: spacing.md,
        maxHeight: '50%',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.pageHorizontal,
        paddingVertical: spacing.md,
    },
    optionList: {
        paddingBottom: spacing.md,
    },
    optionText: {
        ...typography.bodyMd,
        color: colors.light.text.normal,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: radius.full,
        backgroundColor: colors.light.border,
        marginBottom: spacing.md,
        alignSelf: 'center',
    },
})
