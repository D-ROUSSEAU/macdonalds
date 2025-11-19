import axios from "axios"

const nominatimApiUrl = import.meta.env.VITE_NOMINATIM_API_URL

const api = axios.create({
    baseURL: nominatimApiUrl,
})

const cacheSearch = {}

export const fetchCity = async (query = "") => {
    if (cacheSearch[query]) return cacheSearch[query]

    const res = await api.get(
        `/search?q=${query}&format=json&countrycodes=fr&limit=10`
    )
    const filtered = res.data.filter(
        (item) => item.addresstype === "city" || item.addresstype === "town" || item.addresstype === "village"
    )

    cacheSearch[query] = filtered
    return filtered
}

export const fetchFastFood = async ({ query = "", viewbox }) => {
    const res = await api.get(
        `/search?q=McDonald%27s+${encodeURIComponent(query)}&format=json&addressdetails=1&countrycodes=fr&viewbox=${viewbox.join(",")}&bounded=1`
    );
    return res.data
}

export default api