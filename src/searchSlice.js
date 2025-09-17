import { createSlice } from "@reduxjs/toolkit"

const searchSlice = createSlice({
  name: "search",
  initialState: {
    zoom: 6,
    coords: [48.866667, 2.33333],
    markers: null,
    title: "Aucun restaurant sélectionné",
    description: null,
    search: "",
    results: [],
    err: null,
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setDescription: (state, action) => {
      state.description = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setResults: (state, action) => {
      state.results = action.payload
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
    },
    updateResults: (state, action) => {
      const data = action.payload
      state.title = data.name
      state.description = data.display_name
    },
  },
})

export const {
  setTitle,
  setDescription,
  setSearch,
  setResults,
  setErr,
  setZoom,
  setCoords,
  setMarkers,
  updateResults,
} = searchSlice.actions

export default searchSlice.reducer