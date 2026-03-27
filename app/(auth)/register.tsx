import { StyleSheet, Text } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button, Error, Input, Screen, Spacer, TextButton } from '@/components'
import { colors, spacing, typography } from '@/constants'
import { router } from 'expo-router'

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

    const onSubmit = (data: RegisterForm) => console.log(data)

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
                    rules={{
                        required: 'Full name is required',
                        validate: (value) => {
                            if (value.trim().length < 2) return 'Name must be at least 2 characters'
                            if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name can only contain letters'
                            return true
                        },
                    }}
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
                    rules={{
                        required: 'Email is required',
                        validate: (value) => {
                            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                                return 'Enter a valid email'
                            return true
                        },
                    }}
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
                    rules={{
                        required: 'Password is required',
                        validate: {
                            minLength: (v) => v.length >= 6 || 'At least 6 characters',
                            hasNumber: (v) => /\d/.test(v) || 'Must contain a number',
                            hasUppercase: (v) =>
                                /[A-Z]/.test(v) || 'Must contain an uppercase letter',
                        },
                    }}
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
                <Button title="Register" onPress={handleSubmit(onSubmit)} />

                <TextButton
                    title="Login"
                    prefix="Already have an account?"
                    onPress={() => router.dismiss()}
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
