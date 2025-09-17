import { useDispatch, useSelector } from "react-redux"
import List from "./List"
import { setResults, setSearch, setErr, setCoords, setZoom, setMarkers } from "../searchSlice"
import { useQuery } from "@tanstack/react-query"
import { fetchCity, fetchFastFood } from "../services/api"

function Search() {
    const dispatch = useDispatch()
    const search = useSelector(state => state.search.search)
    const results = useSelector(state => state.search.results)
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
            dispatch(setResults(data))
        } catch (err) {
            dispatch(setErr(err.message))
        }
    }

    const resetResults = async (data) => {
        const fastFoods = await fetchFastFood(data.city)
        dispatch(setMarkers(fastFoods))
        dispatch(setResults([]))
        dispatch(setCoords(data.coords))
        dispatch(setZoom(15))
    }

    return (
        <div id="search">
            <p>Rechercher un restaurant :</p>
            <form onSubmit={handleSearch}>
                <div>    
                    <input type="text" value={search} onChange={handleChange} required />
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" stroke="black" strokeWidth=".4"/>
                        </svg>
                    </button>
                </div>
                {isLoading && <p>Chargement...</p>}
                {isError && <p>Erreur lors de la récupération des villes</p>}
                <ul>
                    {results.map(result => (<List key={result.place_id} data={result} onUpdate={resetResults} />))}
                </ul>
            </form>
        </div>
    )
}

export default Search