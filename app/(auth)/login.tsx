import { Text, StyleSheet } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Screen, Spacer, Input, Button, Error, TextButton } from '@/components'
import { colors, spacing, typography } from '@/constants'
import { router } from 'expo-router'
import { useAuth } from '@/hooks'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'

type LoginForm = {
    email: string
    password: string
}

const Login = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<LoginForm>()

    const email = watch('email')

    const { login, error, loading, forgotPassword } = useAuth()

    useEffect(() => {
        if (!loading && error) {
            Toast.show({
                type: 'error',
                text1: error,
                position: 'bottom',
            })
        }
    }, [loading])

    const onSubmit = async (data: LoginForm) => {
        await login(data)
        // do NOT navigate here
        // onAuthStateChange fires → store updates → layout redirect handles it
    }

    const onResetPassword = async () => {
        if (!email) return
        await forgotPassword(email)
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: `Password reset link has been sent to ${email} with instructions`,
            position: 'bottom',
        })
    }
    return (
        <Screen main>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <Text style={styles.title}>Welcome Back</Text>
                <Spacer height={spacing.sm} />
                <Text style={styles.subtitle}>Login to your account</Text>

                <Spacer height={spacing.xxl} />

                {/* Email */}
                <Controller
                    control={control}
                    name="email"
                    rules={{ required: 'Email is required' }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Input
                                preset="email"
                                returnKeyType="next"
                                value={value}
                                onChangeText={onChange}
                            />
                            {errors.email && <Error title={errors.email.message} />}
                        </>
                    )}
                />

                <Spacer height={spacing.lg} />

                {/* Password */}
                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters',
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Input
                                preset="password"
                                returnKeyType="done"
                                value={value}
                                onChangeText={onChange}
                            />

                            {errors.password && <Error title={errors.password.message} />}
                        </>
                    )}
                />

                {/* TODO: implement forgot password */}
                {/* <TextButton
                    title="Forgot password?"
                    onPress={onResetPassword}
                    style={styles.forgotPasswordContainer}
                    titleStyle={styles.forgotPasswordText}
                /> */}

                <Spacer height={spacing.xxl} />

                {/* Button */}
                <Button
                    title="Login"
                    onPress={handleSubmit(onSubmit)}
                    disabled={loading}
                    loading={loading}
                />

                {/* Register */}
                <TextButton
                    title="Register"
                    prefix="Don't have an account?"
                    onPress={() => router.push('/register')}
                    style={styles.register}
                />
            </KeyboardAwareScrollView>
        </Screen>
    )
}

export default Login

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
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        color: colors.light.primary,
    },
    register: {
        alignSelf: 'center',
    },
})
