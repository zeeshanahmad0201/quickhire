import { colors, radius, shadows, spacing, typography } from '@/constants'
import { useState } from 'react'
import { TextInput, TextInputProps, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Eye, EyeOff } from 'lucide-react-native'

const inputPresets = {
    email: {
        keyboardType: 'email-address',
        autoCapitalize: 'none',
        autoCorrect: false,
        placeholder: 'Email',
    },
    password: {
        secureTextEntry: true,
        autoCapitalize: 'none',
        placeholder: 'Password',
    },
    name: {
        keyboardType: 'name',
        autoCapitalize: 'words',
        placeholder: 'Full name',
    },
}

type InputPreset = keyof typeof inputPresets

type InputProps = TextInputProps & {
    preset?: InputPreset
}

export const Input = ({ preset, ...props }: InputProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const presetProps = preset
        ? {
              ...inputPresets[preset],
              ...(preset === 'password' && { secureTextEntry: !isVisible }),
          }
        : {}

    const toggleVisibility = () => setIsVisible((prev) => !prev)

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} {...presetProps} {...props} />
            {preset === 'password' && (
                <TouchableOpacity style={styles.suffix} onPress={toggleVisibility}>
                    {isVisible ? (
                        <EyeOff color={colors.light.icon.normal} />
                    ) : (
                        <Eye color={colors.light.icon.normal} />
                    )}
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: radius.width,
        borderRadius: radius.sm,
        borderColor: colors.light.border,
        backgroundColor: colors.light.surface,
    },
    input: {
        width: '100%',
        ...typography.bodyMd,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.inputVertical,
        includeFontPadding: false,
        textAlignVertical: 'center',
        lineHeight: undefined,
    },
    suffix: {
        position: 'absolute',
        right: spacing.md,
    },
})
