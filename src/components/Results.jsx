import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

function Results() {

    const { title, description } = useContext(SearchContext)

    return (
        <div id="results">
            <p className="title">{title}</p>
            <p className="description">{description}</p>
            {description && <button>Continuer</button>}
        </div>
    )
}

export default Results;