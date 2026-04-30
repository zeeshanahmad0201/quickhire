import MapView from 'react-native-maps'
import Toast from 'react-native-toast-message'
import { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { X, LocateFixed } from 'lucide-react-native'
import LottieView from 'lottie-react-native'

import { useLocation } from '@/hooks'
import { colors, radius, shadows, size, spacing } from '@/constants'
import { Button } from '@/components'
import { Coordinates } from '@/services'

type LocationResult = {
    location: Coordinates | null, 
    locationLabel: string | null
}

type LocationProps = {
    onClose: (location: LocationResult) => void
}

export const Location = ({ onClose }: LocationProps) => {
    const { loading, gpsLocation, error, requestLocation, location, locationLabel, setLocation } =
        useLocation()

    const mapRef = useRef<MapView>(null)
    const [isChanging, setChanging] = useState<boolean>(false)

    const defaultLocation: Coordinates = {
        lat: 37.78825,
        lng: -122.4324,
    }

    useEffect(() => {
        requestLocation()
    }, [])

    useEffect(() => {
        if (!loading && error) {
            Toast.show({
                type: 'error',
                text1: error,
                position: 'bottom',
            })
        }
    }, [loading, error])

    useEffect(() => {
        if (gpsLocation) {
            mapRef.current?.animateToRegion({
                latitude: gpsLocation.lat,
                longitude: gpsLocation.lng,
                longitudeDelta: 0.01,
                latitudeDelta: 0.01,
            })
        }
    }, [gpsLocation])

    return (
        <>
            <MapView
                style={{ flex: 1 }}
                ref={mapRef}
                initialRegion={{
                    latitude: gpsLocation?.lat ?? defaultLocation.lat,
                    longitude: gpsLocation?.lng ?? defaultLocation.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                onRegionChangeComplete={(region) => {
                    setLocation({ lat: region.latitude, lng: region.longitude })
                    setChanging(true)
                }}
                showsUserLocation
            />
            <SafeAreaView style={styles.closeBtnContainer}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => onClose({location: location ?? gpsLocation, locationLabel})}
                >
                    <X color={colors.light.onPrimary} size={size.iconMd} />
                </TouchableOpacity>
            </SafeAreaView>

            <View style={styles.markerContainer}>
                <LottieView
                    source={require('../../../assets/pin-animation.json')}
                    autoPlay={isChanging}
                    loop={false}
                    onAnimationFinish={() => setChanging(false)}
                    style={{ width: size.iconXXl, height: size.iconXXl }}
                />
            </View>

            <View style={styles.btn}>
                <Button
                    title="Pick Location"
                    onPress={() => onClose({location: location ?? gpsLocation, locationLabel})}
                />
            </View>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => {
                    if (gpsLocation) {
                        mapRef.current?.animateToRegion({
                            latitude: gpsLocation.lat,
                            longitude: gpsLocation.lng,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        })
                    }
                }}
            >
                <LocateFixed size={size.iconLg} color={colors.light.primary} />
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    closeBtnContainer: {
        position: 'absolute',
        top: spacing.xxl,
        right: spacing.md,
    },
    closeButton: {
        padding: spacing.sm,
        borderRadius: radius.full,
        backgroundColor: colors.light.primary,
        zIndex: 1,
    },
    markerContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: size.iconXXl,
        height: size.iconXXl,
        marginLeft: -30,
        marginTop: -30,
    },
    btn: {
        position: 'absolute',
        bottom: spacing.lg,
        left: spacing.pageHorizontal,
        right: spacing.pageVertical,
    },
    fab: {
        position: 'absolute',
        bottom: spacing.xxl + 60,
        right: spacing.md,
        backgroundColor: colors.light.background,
        borderRadius: radius.full,
        padding: spacing.md,
        ...shadows.light.sm,
    },
})
