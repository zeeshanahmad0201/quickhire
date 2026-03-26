import { Text, StyleSheet } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Screen, Spacer, Input, Button, Error } from '@/components'
import { colors, spacing, typography } from '@/constants'

type LoginForm = {
    email: string
    password: string
}

const Login = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>()

    const onSubmit = (data: LoginForm) => console.log(data)
    return (
        <Screen main>
            <KeyboardAwareScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
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

                <Spacer height={spacing.xxl} />

                {/* Button */}
                <Button title="Login" onPress={handleSubmit(onSubmit)} />
            </KeyboardAwareScrollView>
        </Screen>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
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
})
