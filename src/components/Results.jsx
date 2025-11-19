import { useSelector, useDispatch } from "react-redux"
import { clearResults } from "../searchSlice"

function Results() {
  const dispatch = useDispatch()
  const title = useSelector((state) => state.search.title)
  const description = useSelector((state) => state.search.description)
  const latitude = useSelector((state) => state.search.latitude)
  const longitude = useSelector((state) => state.search.longitude)

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  return (
    title && (
      <div id="results">
        <p className="title">{title}</p>
        <p className="description">{description}</p>
        <div><button onClick={openGoogleMaps}>Continuer</button><a onClick={() => dispatch(clearResults())}><span>x</span></a></div>
      </div>
    )
  )
}

export default Results
