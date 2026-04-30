import { Controller, useForm } from 'react-hook-form'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useState } from 'react'
import { ChevronRight, MapPin } from 'lucide-react-native'

import {
    Screen,
    PhotoPicker,
    Input,
    Error,
    Spacer,
    Divider,
    Select,
    Button,
    CustomModal,
    Location,
} from '@/components'
import { categories, Category, colors, radius, size, spacing, typography } from '@/constants'
import { priceTypes, ProviderProfileForm } from '@/types'
import { formRules } from '@/utils'

type ProviderFormProps = {
    initialValues?: Partial<ProviderProfileForm>
    onSubmit: (data: ProviderProfileForm) => void | Promise<void>
    submitLabel?: string
    loading?: boolean
}

export const ProviderForm = ({
    initialValues,
    submitLabel = 'Save',
    loading = false,
    onSubmit,
}: ProviderFormProps) => {
    const {
        control,
        formState: { errors, isValid },
        watch,
        setValue,
        handleSubmit,
    } = useForm<ProviderProfileForm>({
        defaultValues: initialValues,
    })

    const priceType = watch('pricingType')
    const pickedImage = watch('profileUrl')

    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [locationLabel, setLocationLabel] = useState<string | null>(null)

    return (
        <>
            <Screen main>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                >
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

                    <Spacer height={spacing.md} />

                    {/* Bio */}
                    <Controller
                        control={control}
                        name="bio"
                        rules={formRules.bio}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Input
                                    preset="bio"
                                    onChangeText={onChange}
                                    value={value}
                                    returnKeyType="next"
                                />
                                {errors.bio && <Error title={errors.bio.message} />}
                            </>
                        )}
                    />

                    <Divider />

                    <Text style={styles.title}>SERVICE DETAILS</Text>

                    <Spacer height={spacing.md} />

                    {/* Title */}
                    <Controller
                        control={control}
                        name="title"
                        rules={formRules.serviceTitle}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Input
                                    preset="serviceTitle"
                                    onChangeText={onChange}
                                    value={value}
                                    returnKeyType="next"
                                />
                                {errors.title && <Error title={errors.title.message} />}
                            </>
                        )}
                    />

                    <Spacer height={spacing.md} />

                    {/* Category dropdown */}
                    <Controller
                        control={control}
                        name="category"
                        rules={formRules.required('Category')}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Select<Category>
                                    options={categories.map((c) => ({
                                        value: c.id,
                                        label: c.label,
                                    }))}
                                    placeholder="Select category"
                                    value={categories.find((o) => o.id === value)?.label ?? ''}
                                    onChange={onChange}
                                />
                                {errors.category && <Error title={errors.category!.message} />}
                            </>
                        )}
                    />

                    <Spacer height={spacing.md} />

                    {/* Description */}
                    <Controller
                        control={control}
                        name="description"
                        rules={formRules.serviceDescription}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Input
                                    preset="serviceDescription"
                                    onChangeText={onChange}
                                    value={value}
                                    returnKeyType="next"
                                />

                                {errors.description && (
                                    <Error title={errors.description!.message} />
                                )}
                            </>
                        )}
                    />

                    <Spacer height={spacing.md} />

                    {/* Pricing Type */}
                    <Controller
                        control={control}
                        name="pricingType"
                        render={({ field: { onChange, value } }) => (
                            <>
                                <SegmentedControl
                                    values={priceTypes.map((p) => p.toUpperCase())}
                                    selectedIndex={value === priceTypes[0] ? 0 : 1}
                                    onChange={(event) =>
                                        onChange(priceTypes[event.nativeEvent.selectedSegmentIndex])
                                    }
                                    tintColor={colors.light.primary}
                                    activeFontStyle={{ color: colors.light.onPrimary }}
                                    style={styles.segmented}
                                />

                                {errors.pricingType && (
                                    <Error title={errors.pricingType!.message} />
                                )}
                            </>
                        )}
                    />

                    <Spacer height={spacing.md} />

                    {/* Pricing */}
                    <Controller
                        control={control}
                        name="price"
                        rules={formRules.price}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Input
                                    preset="price"
                                    onChangeText={onChange}
                                    value={value}
                                    prefix={`$`}
                                    suffix={`/ ${priceType}`}
                                />
                                {errors.price && <Error title={errors.price!.message} />}
                            </>
                        )}
                    />

                    <Spacer height={spacing.md} />

                    {/* Location */}
                    {locationLabel ? (
                        <TouchableOpacity
                            style={styles.locationPicker}
                            onPress={() => setModalVisible(true)}
                        >
                            <MapPin
                                size={size.iconMd}
                                color={
                                    locationLabel ? colors.light.primary : colors.light.icon.normal
                                }
                            />
                            <Text
                                style={[styles.locationText, !locationLabel && styles.placeholder]}
                            >
                                {locationLabel ?? 'Select your location'}
                            </Text>
                            <ChevronRight size={size.iconSm} color={colors.light.icon.normal} />
                        </TouchableOpacity>
                    ) : (
                        <Button title="Select Location" onPress={() => setModalVisible(true)} />
                    )}

                    <Spacer height={spacing.md} />

                    <Button
                        title={submitLabel}
                        onPress={handleSubmit(onSubmit, (data) => console.log('data', data))}
                        loading={loading}
                        disabled={loading || !isValid}
                    />

                    <Spacer height={spacing.md} />
                </KeyboardAwareScrollView>
            </Screen>

            {/* Location popup */}
            <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)} fullScreen>
                <Location
                    onClose={({ location, locationLabel }) => {
                        if (location) {
                            setValue('location', location)
                            setLocationLabel(locationLabel)
                        }
                        setModalVisible(false)
                    }}
                />
            </CustomModal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        ...typography.titleSm,
        color: colors.light.text.subtle,
    },
    segmented: {
        ...typography.bodyMd,
        height: 50,
    },
    locationPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        borderWidth: radius.width,
        borderColor: colors.light.border,
        backgroundColor: colors.light.surface,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.inputVertical,
        borderRadius: radius.sm,
    },
    locationText: {
        flex: 1,
        ...typography.bodyMd,
        color: colors.light.text.normal,
    },
    placeholder: {
        color: colors.light.text.subtle,
    },
})
