/**
* @jest-environment jsdom
*/

import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "../searchSlice"
import Map from "../components/Map"
import { expect, test, vi } from "vitest"

// Mock des composants react-leaflet
vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }) => <div data-testid="map">{children}</div>,
  TileLayer: () => <div data-testid="tilelayer"></div>,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
}))

function renderWithStore(preloadedState) {
  const store = configureStore({ reducer: { search: searchReducer }, preloadedState })
  return render(<Provider store={store}><Map /></Provider>)
}

test("renders map with markers", () => {
  const preloadedState = {
    search: {
      zoom: 13,
      coords: [48.8566, 2.3522],
      markers: [
        {
          place_id: "1",
          lat: "48.8566",
          lon: "2.3522",
          name: "McDo Paris",
          display_name: "Paris 1",
        },
      ],
    },
  }

  renderWithStore(preloadedState)

  expect(screen.getByTestId("map")).toBeInTheDocument()
  expect(screen.getByTestId("marker")).toBeInTheDocument()
  expect(screen.getByText("McDo Paris")).toBeInTheDocument()
})
