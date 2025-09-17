import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useEffect } from 'react'
import './App.css'
import Map from './components/Map'
import Results from './components/Results'
import Search from './components/Search'
import { useGeolocation } from './hooks/useGeolocation'

const queryClient = new QueryClient()

function App() {
  const {locationInfos, locationError} = useGeolocation()

  useEffect(() => {
    console.log('User geolocation : ', { locationError, locationInfos})
  }, [])
  

  return (
    <QueryClientProvider client={queryClient}>
      <Search />
      <Map />
      <Results />
    </QueryClientProvider>
  )
}

export default App
