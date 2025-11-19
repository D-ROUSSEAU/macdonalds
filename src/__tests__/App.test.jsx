/**
* @jest-environment jsdom
*/

import { render, screen } from "@testing-library/react"
import App from "../App"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "../searchSlice"

function renderWithProviders(ui) {
    const store = configureStore({ reducer: { search: searchReducer } })
    return render(<Provider store={store}>{ui}</Provider>)
}

test("renders Search, Map and Results", () => {
    const { container } = renderWithProviders(<App />)
    const map = container.querySelector('#map');

    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(map).toBeInTheDocument()
})
