import axios from "axios"

const api = axios.create({
    baseURL: "https://nominatim.openstreetmap.org",
})

export const fetchCity = async (query = "") => {
    const res = await api.get(
        `/search?q=${query}&format=json&countrycodes=fr`
    )
    return res.data.filter(
        (item) => item.addresstype === "city" || item.addresstype === "town"
    )
}

export const fetchFastFood = async (query = "") => {
    const res = await api.get(
        `/search?q=fast_food+in+${query}&format=json&limit=40`
    )
    return res.data
}

export default api