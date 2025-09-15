import { useContext, useEffect } from 'react'
import './App.css'
import Map from './components/Map'
import Results from './components/Results'
import Search from './components/Search'
import { useGeolocation } from './hooks/useGeolocation'
import { SearchContext } from "./context/SearchContext"

function App() {
  const {locationInfos, locationError} = useGeolocation()
  const { updateMap } = useContext(SearchContext)

  useEffect(() => {
    console.log('User geolocation : ', { locationError, locationInfos})
  }, [])
  

  return (
    <>
      <Search update={updateMap} />
      <Map />
      <Results />
    </>
  )
}

export default App
