import { useContext } from "react";
import List from "./List";
import { getCity } from "../services/api";
import { SearchContext } from "../context/SearchContext";

function Search({update}) {

    const { search, setSearch, results, setResults, err, setErr } = useContext(SearchContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!search)
            return;

        try {
            const query = await getCity('search?q=', search);

            if(query.data.length > 0) {
                setResults(query.data);
                setErr(null);
            } else {
                setResults([]);
                setErr(<span>Aucun résultat</span>);
            }
        }catch(err){
            console.log(err);
        }
    }

    const resetResults = async (p) => {
        update(p);
        setResults([]);
    }

    return (
        <div id="search">
            <p>Rechercher un restaurant :</p>
            <form onSubmit={handleSubmit}>
                <div>    
                    <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} required />
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" stroke="black" strokeWidth=".4"/>
                        </svg>
                    </button>
                </div>
                {err}
                <ul>
                    {results.map(result => (<List key={result.place_id} data={result} onUpdate={resetResults} />))}
                </ul>
            </form>
        </div>
    )
}

export default Search;