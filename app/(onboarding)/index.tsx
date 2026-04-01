import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Search, Briefcase, Lock } from 'lucide-react-native'

import { Button, Screen, ServiceCard, Spacer } from '@/components'
import { colors, radius, size, spacing, typography } from '@/constants'

import AppIcon from '../../assets/icon.svg'
import { usePrefs } from '@/hooks'
import { useEffect } from 'react'
import { router } from 'expo-router'

const Onboarding = () => {
    const { setOnboarded } = usePrefs()

    const onGetStarted = () => {
        setOnboarded()
        router.replace('/register')
    }

    const onSignIn = () => {
        setOnboarded()
        router.push('/login')
    }

    return (
        <Screen main>
            <ScrollView contentContainerStyle={styles.content}>
                <View>
                    {/* Header */}
                    <View style={styles.iconContainer}>
                        <AppIcon
                            width={size.iconLg}
                            height={size.iconLg}
                            color={colors.light.onPrimary}
                        />
                    </View>
                    <Spacer height={spacing.md} />
                    <Text style={styles.headerTitle}>Welcome to QuickHire</Text>
                    <Spacer height={spacing.xs} />
                    <Text style={styles.headerSubtitle}>
                        Connect with trusted local service providers in minutes
                    </Text>

                    <Spacer height={spacing.lg} />

                    {/* Services */}
                    <ServiceCard
                        title="Find Services Fast"
                        subtitle="Browse hundreds of verified local providers"
                        icon={Search}
                    />

                    <Spacer height={spacing.md} />

                    <ServiceCard
                        title="Book Instantly"
                        subtitle="Schedule services at your convenience"
                        icon={Briefcase}
                    />

                    <Spacer height={spacing.md} />

                    <ServiceCard
                        title="Trusted & Secure"
                        subtitle="Verified reviews and secure payments"
                        icon={Lock}
                    />
                </View>
            </ScrollView>

            <View>
                <Button title="Get Started" onPress={onGetStarted} />

                <Spacer height={spacing.md} />

                <Button title="I already have an account" onPress={onSignIn} outlined />
            </View>
        </Screen>
    )
}

export default Onboarding

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    iconContainer: {
        backgroundColor: colors.light.primary,
        padding: spacing.lg,
        borderRadius: radius.md,
        alignSelf: 'center',
    },
    headerTitle: {
        ...typography.headlineMd,
        textAlign: 'center',
    },
    headerSubtitle: {
        ...typography.bodyMd,
        textAlign: 'center',
        color: colors.light.text.subtle,
    },
})
