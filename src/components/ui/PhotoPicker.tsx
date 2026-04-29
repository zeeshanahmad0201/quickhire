import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image'
import { CameraIcon } from 'lucide-react-native'
import { LinearGradient } from 'expo-linear-gradient'
import * as ImagePicker from 'expo-image-picker'

import { colors, radius, shadows, size, spacing, typography } from '@/constants'

type PhotoPickerProps = {
    url?: string
    initials: string
    onImageSelected: (uri: string) => void
}

export const PhotoPicker = ({ url, initials, onImageSelected }: PhotoPickerProps) => {
    const hanldePicker = () => {
        Alert.alert('Profile Photo', 'Choose an option', [
            { text: 'Upload Photo', onPress: pickFromGallery },
            { text: 'Take Photo', onPress: pickFromCamera },
            { text: 'Cancel', style: 'cancel' },
        ])
    }

    const pickFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        })

        if (!result.canceled) onImageSelected(result.assets[0].uri)
    }

    const pickFromCamera = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()
        if (!granted) return
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        })

        if (!result.canceled) onImageSelected(result.assets[0].uri)
    }

    return (
        <TouchableOpacity onPress={hanldePicker} style={{ alignSelf: 'center' }}>
            <LinearGradient colors={colors.light.gradient.primary} style={styles.container}>
                {url ? (
                    <Image source={{ uri: url }} contentFit="cover" style={styles.image} />
                ) : (
                    <Text style={styles.initials}>{initials.substring(0, 2).toUpperCase()}</Text>
                )}
            </LinearGradient>

            <View style={styles.editIcon}>
                <CameraIcon size={size.iconSm} color={colors.light.icon.active} />
            </View>
        </TouchableOpacity>
    )
}

export default PhotoPicker

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
        borderRadius: radius.full,
        borderWidth: radius.width,
        borderColor: colors.light.primary,
        ...shadows.light.sm,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: radius.full,
    },
    initials: {
        ...typography.displaySm,
        color: colors.light.onPrimary,
        ...shadows.light.sm,
    },
    editIcon: {
        position: 'absolute',
        bottom: 3,
        right: 3,
        backgroundColor: colors.light.background,
        borderColor: colors.light.border,
        borderWidth: radius.width,
        borderRadius: radius.full,
        padding: spacing.sm,
        ...shadows.light.sm,
    },
})
