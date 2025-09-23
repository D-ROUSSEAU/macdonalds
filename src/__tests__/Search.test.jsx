/**
* @jest-environment jsdom
*/

import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "../searchSlice"
import Search from "../components/Search"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function renderWithStore(ui) {
  const store = configureStore({ reducer: { search: searchReducer } })
  const queryClient = new QueryClient() 

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    </Provider>
  )
}

test("renders input and updates on change", () => {
  renderWithStore(<Search />)

  const input = screen.getByRole("textbox")
  fireEvent.change(input, { target: { value: "Paris" } })

  expect(input.value).toBe("Paris")
})

test("renders search button", () => {
  renderWithStore(<Search />)
  expect(screen.getByRole("button")).toBeInTheDocument()
})
