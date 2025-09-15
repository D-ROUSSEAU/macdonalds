import { createContext, useState } from "react"
import { getFastFood } from "../services/api"

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
    const [zoom, setZoom] = useState(6)
    const [coords, setCoords] = useState([48.866667, 2.33333])
    const [markers, setMarkers] = useState(null)
    const [title, setTitle] = useState('Aucun restaurant sélectionné')
    const [description, setDescription] = useState(null)
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [err, setErr] = useState(null)

    const updateMap = async (data) => {
        const fastFood = await getFastFood('search?addressdetails=1&q=', data.city)
        setCoords(data.coords)
        setZoom(15)
        setMarkers(fastFood.data)
    }

    const updateResults = (data) => {
        setTitle(data.name)
        setDescription(data.address.road + ', ' + data.address.city + ', ' + data.address.country)
    }

    return (
        <SearchContext.Provider value={{title, setTitle, description, setDescription, search, setSearch, results, setResults, err, setErr, zoom, setZoom, coords, setCoords, markers, setMarkers, updateMap, updateResults}}>
            {children}
        </SearchContext.Provider>
    )
}