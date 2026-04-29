import { StyleSheet, Text } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button, Error, Input, Screen, Spacer, TextButton } from '@/components'
import { colors, spacing, typography } from '@/constants'
import { router } from 'expo-router'
import { useAuth } from '@/hooks'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'
import { formRules } from '@/utils'

type RegisterForm = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

const Register = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterForm>()

    const password = watch('password')
    const { register, loading, error } = useAuth()

    useEffect(() => {
        if (!loading && error) {
            Toast.show({
                type: 'error',
                text1: error,
                position: 'bottom',
            })
        }
    }, [loading])

    const onSubmit = async (data: RegisterForm) => {
        await register({
            name: data.name,
            email: data.email,
            password: data.password,
        })

        // do NOT navigate here
        // onAuthStateChange fires → store updates → layout redirect handles it
    }

    return (
        <Screen main>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <Text style={styles.title}>Create Account</Text>
                <Spacer height={spacing.sm} />
                <Text style={styles.subtitle}>Join QuickHire to get started</Text>

                <Spacer height={spacing.lg} />

                {/* Name */}
                <Controller
                    control={control}
                    name="name"
                    rules={formRules.name}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Input
                                preset="name"
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="next"
                            />
                            {errors.name && <Error title={errors.name.message} />}
                        </>
                    )}
                />

                <Spacer height={spacing.md} />

                {/* Email */}
                <Controller
                    control={control}
                    name="email"
                    rules={formRules.email}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Input
                                preset="email"
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="next"
                            />
                            {errors.email && <Error title={errors.email.message} />}
                        </>
                    )}
                />

                <Spacer height={spacing.md} />

                {/* Password */}
                <Controller
                    control={control}
                    name="password"
                    rules={formRules.password}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Input
                                preset="password"
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="next"
                            />
                            {errors.password && <Error title={errors.password.message} />}
                        </>
                    )}
                />

                <Spacer height={spacing.md} />

                {/* Confirm password */}
                <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{
                        required: 'Please confirm your password',
                        validate: (value) => value === password || 'Passwords do not match',
                    }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Input
                                preset="password"
                                placeholder="Confirm password"
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="done"
                            />
                            {errors.confirmPassword && (
                                <Error title={errors.confirmPassword.message} />
                            )}
                        </>
                    )}
                />

                <Spacer height={spacing.lg} />

                {/* Button */}
                <Button
                    title="Register"
                    onPress={handleSubmit(onSubmit)}
                    disabled={loading}
                    loading={loading}
                />

                <TextButton
                    title="Login"
                    prefix="Already have an account?"
                    onPress={() => router.replace('/login')}
                    style={styles.login}
                />
            </KeyboardAwareScrollView>
        </Screen>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        ...typography.headlineLg,
    },
    subtitle: {
        ...typography.bodyMd,
        color: colors.light.text.subtle,
    },
    login: {
        alignSelf: 'center',
    },
})
