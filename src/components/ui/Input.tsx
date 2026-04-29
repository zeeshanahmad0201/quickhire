import React, { useState } from 'react'
import { TextInput, TextInputProps, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Eye, EyeOff } from 'lucide-react-native'

import { colors, radius, spacing, typography } from '@/constants'

const inputPresets: Record<string, TextInputProps> = {
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
        autoCapitalize: 'words',
        placeholder: 'Full name',
        autoCorrect: false,
    },
    phone: {
        keyboardType: 'phone-pad',
        placeholder: 'Phone',
    },
    bio: {
        multiline: true,
        placeholder: 'Tell clients about your experience....',
    },
    serviceTitle: {
        autoCapitalize: 'sentences',
        placeholder: 'e.g. Professional Plumber',
        autoCorrect: false,
    },
    serviceDescription: {
        multiline: true,
        autoCapitalize: 'sentences',
        placeholder: 'Describe your service, experience, and what clients can expect...',
    },
    price: {
        keyboardType: 'decimal-pad',
        placeholder: '0.00',
    },
}

type InputPreset = keyof typeof inputPresets

type InputProps = TextInputProps & {
    preset?: InputPreset
    suffix?: string | React.ReactNode
    prefix?: string | React.ReactNode
}

export const Input = ({ prefix, preset, suffix, ...props }: InputProps) => {
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
            {prefix && (
                <View style={styles.prefix}>
                    {typeof prefix === 'string' ? (
                        <Text style={styles.suffixText}>{prefix}</Text>
                    ) : (
                        prefix
                    )}
                </View>
            )}
            <TextInput
                style={[
                    styles.input,
                    (presetProps.multiline || props.multiline) && styles.multilineInput,
                ]}
                {...presetProps}
                {...props}
            />
            {preset === 'password' && (
                <TouchableOpacity style={styles.suffix} onPress={toggleVisibility}>
                    {isVisible ? (
                        <EyeOff color={colors.light.icon.normal} />
                    ) : (
                        <Eye color={colors.light.icon.normal} />
                    )}
                </TouchableOpacity>
            )}
            {suffix && (
                <View style={styles.suffix}>
                    {typeof suffix === 'string' ? (
                        <Text style={styles.suffixText}>{suffix}</Text>
                    ) : (
                        suffix
                    )}
                </View>
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
        flex: 1,
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
    prefix: {
        position: 'relative',
        left: spacing.md,
    },
    multilineInput: {
        height: 150,
        textAlignVertical: 'top',
    },
    prefixText: {
        ...typography.bodyMd,
        color: colors.light.text.normal,
    },
    suffixText: {
        ...typography.bodyMd,
        color: colors.light.text.subtle,
    },
})
