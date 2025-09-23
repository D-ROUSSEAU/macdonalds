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
        `/search?q=restaurant+in+${encodeURIComponent(query)}&format=json&limit=100&addressdetails=1&countrycodes=fr`
    );
    return res.data
}

export default api