import { useSelector } from "react-redux"

function Results() {
  const title = useSelector((state) => state.search.title)
  const description = useSelector((state) => state.search.description)

  return (
    <div id="results">
      <p className="title">{title}</p>
      <p className="description">{description}</p>
      {description && <button>Continuer</button>}
    </div>
  )
}

export default Results
