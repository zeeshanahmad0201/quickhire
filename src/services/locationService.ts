import * as Location from 'expo-location'

export type Coordinates = {
    lat: number
    lng: number
}

export const locationService = {
    requestPermission: async (): Promise<boolean> => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync()

            return status === Location.PermissionStatus.GRANTED
        } catch (error) {
            console.error('locationService: requestPermission', error)
            throw error
        }
    },

    getCurrentLocation: async (): Promise<Coordinates> => {
        try {
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            })

            return {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }
        } catch (error) {
            console.error('locationService: getCurrentLocation', error)
            throw error
        }
    },

    hasPermission: async (): Promise<boolean> => {
        try {
            const { status } = await Location.getForegroundPermissionsAsync()
            return status === Location.PermissionStatus.GRANTED
        } catch (error) {
            console.log('locationService: hasPermission', error)
            throw error
        }
    },

    reverseGeocode: async (location: Coordinates): Promise<string> => {
        try {
            const result = await Location.reverseGeocodeAsync({
                latitude: location.lat,
                longitude: location.lng,
            })

            const place = result[0]
            return [place.streetNumber, place.street, place.city, place.region]
                .filter(Boolean)
                .join(', ')
        } catch (error) {
            console.log('locationService: reverseGeocode', error)
            throw error
        }
    },
}
