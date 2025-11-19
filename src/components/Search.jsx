import { useDispatch, useSelector } from "react-redux"
import List from "./List"
import { setResults, setSearch, setErr, setCoords, setZoom, setMarkers, setEmptyResults } from "../searchSlice"
import { useQuery } from "@tanstack/react-query"
import { fetchCity, fetchFastFood } from "../services/api"
import { useState } from "react"

function Search() {
    const dispatch = useDispatch()
    const search = useSelector(state => state.search.search)
    const results = useSelector(state => state.search.results)
    const emptyResults = useSelector(state => state.search.emptyResults)
    const [loading, setLoading] = useState(false)
    const err = useSelector(state => state.search.err)

    const { refetch, isLoading, isError } = useQuery({
        queryKey: ["cities", search],
        queryFn: () => fetchCity(search),
        enabled: false,
        staleTime: 5 * 60 * 1000
    })

    const handleChange = (e) => {
        dispatch(setSearch(e.target.value))
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const { data } = await refetch()
            if(data.length > 0) {
                dispatch(setResults(data))
            } else {
                dispatch(setEmptyResults())
            }
        } catch (err) {
            dispatch(setErr(err.message))
        }
    }

    const getBoundsFromMarkers = (markers) => {
        if (!markers || markers.length === 0) return null

        let minLat = parseFloat(markers[0].lat)
        let maxLat = parseFloat(markers[0].lat)
        let minLon = parseFloat(markers[0].lon)
        let maxLon = parseFloat(markers[0].lon)

        markers.forEach(marker => {
            const lat = parseFloat(marker.lat)
            const lon = parseFloat(marker.lon)
            if (lat < minLat) minLat = lat
            if (lat > maxLat) maxLat = lat
            if (lon < minLon) minLon = lon
            if (lon > maxLon) maxLon = lon
        })

        return { minLat, maxLat, minLon, maxLon }
    }

    const getCenterFromBounds = (bounds) => {
        if (!bounds) return null
        const centerLat = (bounds.minLat + bounds.maxLat) / 2
        const centerLon = (bounds.minLon + bounds.maxLon) / 2
        return [centerLat, centerLon]
    }

    const calculateZoom = (bounds, mapWidth, mapHeight) => {
        if (!bounds) return 13

        const WORLD_DIM = { width: 256, height: 256 }
        const ZOOM_MAX = 18

        const latRad = (lat) => {
            const sin = Math.sin(lat * Math.PI / 180)
            const radX2 = Math.log((1 + sin) / (1 - sin)) / 2
            return radX2
        }

        const latFraction = (latRad(bounds.maxLat) - latRad(bounds.minLat)) / Math.PI
        let lonDiff = bounds.maxLon - bounds.minLon
        if (lonDiff < 0) lonDiff += 360
        const lonFraction = lonDiff / 360

        const latZoom = Math.floor(Math.log(mapHeight / WORLD_DIM.height / latFraction) / Math.LN2)
        const lonZoom = Math.floor(Math.log(mapWidth / WORLD_DIM.width / lonFraction) / Math.LN2)

        return Math.min(latZoom, lonZoom, ZOOM_MAX)
    }

    const resetResults = async (data, delta = 0.1) => {
        setLoading(true)

        const [lat, lon] = data.coords
        const minLat = lat - delta
        const maxLat = lat + delta
        const minLon = lon - delta
        const maxLon = lon + delta
        const fastFoods = await fetchFastFood({ query: data.city, viewbox: [minLon, minLat, maxLon, maxLat] })
        const mapContainer = document.getElementById("map")
        const mapWidth = mapContainer?.clientWidth || 800
        const mapHeight = mapContainer?.clientHeight || 600
        const bounds = getBoundsFromMarkers(fastFoods)
        const zoom = calculateZoom(bounds, mapWidth, mapHeight)
        const center = bounds ? getCenterFromBounds(bounds) : data.coords

        dispatch(setMarkers(fastFoods))
        dispatch(setResults([]))
        dispatch(setCoords(center))
        dispatch(setZoom(zoom))

        setLoading(false)
    }

    return (
        <div id="search">
            <form onSubmit={handleSearch}>
                <div>    
                    <input type="text" value={search} onChange={handleChange} placeholder="Rechercher..." required />
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" stroke="black" strokeWidth=".4"/>
                        </svg>
                    </button>
                </div>
                {isLoading && <p>Chargement...</p>}
                {isError && <p>Erreur lors de la récupération des villes</p>}
                {emptyResults && <p>Aucun résultat</p>}
                <ul>
                    {results.map(result => (<List key={result.place_id} data={result} onUpdate={resetResults} />))}
                </ul>
            </form>
            {loading && (
                <div className="loader">
                    <p>Chargement...</p>
                </div>
            )}
        </div>
    )
}

export default Search