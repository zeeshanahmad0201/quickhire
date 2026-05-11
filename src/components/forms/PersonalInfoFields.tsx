import { Controller, useFormContext } from 'react-hook-form'
import { Text, View, StyleSheet } from 'react-native'

import { PersonalInfo } from '@/types'
import { PhotoPicker, Input, Error, Spacer } from '@/components'
import { colors, spacing, typography } from '@/constants'
import { formRules } from '@/utils'

type PersonalInfoFieldProps = {
    initialValues?: Partial<PersonalInfo>
}

export const PersonalInfoFields = ({ initialValues }: PersonalInfoFieldProps) => {
    const {
        control,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<PersonalInfo>()

    const pickedImage = watch('profileUrl')

    return (
        <View>
            {/* Profile Logo */}
            <PhotoPicker
                initials={initialValues?.name?.substring(0, 2) ?? 'ab'}
                url={pickedImage}
                onImageSelected={(uri) => {
                    setValue('profileUrl', uri)
                }}
            />

            <Spacer height={spacing.lg} />

            <Text style={styles.title}>PERSONAL INFORMATION</Text>

            <Spacer height={spacing.md} />

            {/* Name */}
            <Controller
                control={control}
                name="name"
                rules={formRules.name}
                render={({ field: { onChange, value } }) => (
                    <>
                        <Input
                            preset="name"
                            returnKeyType="next"
                            value={value}
                            onChangeText={onChange}
                        />
                        {errors.name && <Error title={errors.name.message} />}
                    </>
                )}
            />

            <Spacer height={spacing.md} />

            {/* Phone */}
            <Controller
                control={control}
                name="phone"
                rules={formRules.phone}
                render={({ field: { onChange, value } }) => (
                    <>
                        <Input preset="phone" onChangeText={onChange} value={value} />
                        {errors.phone && <Error title={errors.phone.message} />}
                    </>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        ...typography.titleSm,
        color: colors.light.text.subtle,
    },
})
