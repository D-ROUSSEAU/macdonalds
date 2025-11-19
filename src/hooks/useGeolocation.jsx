import { useEffect, useState } from "react"

export const useGeolocation = () => {
    const [locationInfos, setLocationInfos] = useState(null)
    const [locationError, setLocationError] = useState(null)

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setLocationError("La géolocalisation n'est pas supportée.")
            return
        }

        const onSuccess = (pos) => {
            setLocationInfos(pos.coords);
        };

        const onError = (err) => {
            setLocationError(err.message);
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            enableHighAccuracy: true,
            timeout: 8000,
            maximumAge: 0,
        });
    }, [])

    return { locationError, locationInfos }
}