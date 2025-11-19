import { createSlice } from "@reduxjs/toolkit"

const searchSlice = createSlice({
  name: "search",
  initialState: {
    zoom: 6,
    coords: [48.866667, 2.33333],
    markers: null,
    title: null,
    description: null,
    search: "",
    results: [],
    err: null,
    emptyResults: false,
    latitude: null,
    longitude: null
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setDescription: (state, action) => {
      state.description = action.payload
    },
    clearResults: (state, action) => {
      state.title = null
      state.description = null
      state.latitude = null
      state.longitude = null
    },
    setSearch: (state, action) => {
      state.emptyResults = false
      state.search = action.payload
    },
    setResults: (state, action) => {
      state.emptyResults = false
      state.results = action.payload
    },
    setEmptyResults: (state, action) => {
      state.results = []
      state.emptyResults = true
    },
    setErr: (state, action) => {
      state.err = action.payload
    },
    setZoom: (state, action) => {
      state.zoom = action.payload
    },
    setCoords: (state, action) => {
      state.coords = action.payload
    },
    setMarkers: (state, action) => {
      state.markers = action.payload
      state.title = null
      state.description = null
      state.latitude = null
      state.longitude = null
    },
    updateResults: (state, action) => {
      const data = action.payload
      state.title = data.name
      state.description = data.display_name
      state.latitude = data.lat
      state.longitude = data.lon
    },
  },
})

export const {
  setTitle,
  setDescription,
  setSearch,
  setResults,
  clearResults,
  setErr,
  setZoom,
  setCoords,
  setMarkers,
  updateResults,
  setEmptyResults
} = searchSlice.actions

export default searchSlice.reducer