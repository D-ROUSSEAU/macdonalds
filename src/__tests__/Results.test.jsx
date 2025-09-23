/**
* @jest-environment jsdom
*/

import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "../searchSlice"
import Results from "../components/Results"

function renderWithStore(preloadedState) {
  const store = configureStore({ reducer: { search: searchReducer }, preloadedState })
  return render(<Provider store={store}><Results /></Provider>)
}

test("renders title and description from store", () => {
  const preloadedState = {
    search: {
      title: "McDonald's",
      description: "Fast food à Paris",
    },
  }

  renderWithStore(preloadedState)

  expect(screen.getByText("McDonald's")).toBeInTheDocument()
  expect(screen.getByText("Fast food à Paris")).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /Continuer/i })).toBeInTheDocument()
})
