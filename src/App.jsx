import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './App.css'
import Map from './components/Map'
import Results from './components/Results'
import Search from './components/Search'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Search />
      <Map />
      <Results />
    </QueryClientProvider>
  )
}

export default App
