import { useState } from "react"

export const useGeolocation = () => {
    const [locationInfos, setLocationInfos] = useState(null)
    const [locationError, setLocationError] = useState(null)

    const {geolocation} = navigator

    const successFn = (res) => {
        setLocationInfos(res.coords)
    }

    const errorFn = (res) => {
        setLocationError(res.message)
    }

    if(!locationError && !locationInfos) {
        geolocation.getCurrentPosition(successFn, errorFn)
    }

    return { locationError, locationInfos}
}