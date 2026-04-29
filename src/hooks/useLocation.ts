import { useEffect, useState } from 'react'

import { Coordinates, locationService } from '@/services'

export const useLocation = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [gpsLocation, setGPSLocation] = useState<Coordinates | null>(null)
    const [location, setLocation] = useState<Coordinates | null>(null)
    const [locationLabel, setLocationLabel] = useState<string | null>(null)

    const requestLocation = async () => {
        try {
            setLoading(true)
            setError(null)

            const hasLocation = await locationService.hasPermission()
            console.log('hasLocation:', hasLocation)
            if (hasLocation) {
                const coords = await locationService.getCurrentLocation()
                setGPSLocation(coords)
            } else {
                const hasPermission = await locationService.requestPermission()
                console.log('hasPermission:', hasPermission)
                if (hasPermission) {
                    const coords = await locationService.getCurrentLocation()
                    setGPSLocation(coords)
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('Unable to request permission. Please try again!')
            }
        } finally {
            setLoading(false)
        }
    }

    const reverseGeocode = async (location: Coordinates) => {
        try {
            setLoading(true)
            setError(null)

            const label = await locationService.reverseGeocode(location)
            setLocationLabel(label)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Something went wrong!')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (location) {
            reverseGeocode(location)
        }
    }, [location])

    useEffect(() => {
        if (!location && gpsLocation) {
            setLocation(gpsLocation)
        }
    }, [gpsLocation])

    return {
        loading,
        error,
        gpsLocation,
        location,
        locationLabel,

        requestLocation,
        setGPSLocation,
        reverseGeocode,
        setLocation
    }
}
