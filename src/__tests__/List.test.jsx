/**
* @jest-environment jsdom
*/

import { render, screen, fireEvent } from "@testing-library/react"
import List from "../components/List"
import { vi } from "vitest"

test("calls onUpdate when clicked", () => {
  const data = { lat: "48.8566", lon: "2.3522", display_name: "Paris", name: "Paris" }
  const mockOnUpdate = vi.fn()

  render(<List data={data} onUpdate={mockOnUpdate} />)

  const link = screen.getByText("Paris")
  fireEvent.click(link)

  expect(mockOnUpdate).toHaveBeenCalledWith({
    coords: [48.8566, 2.3522],
    name: "Paris",
    city: "Paris",
  })
})
