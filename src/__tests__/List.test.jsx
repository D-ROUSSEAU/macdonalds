/**
* @jest-environment jsdom
*/

import { render, screen, fireEvent } from "@testing-library/react"
import List from "../components/List"
import { describe, expect, it, vi } from "vitest"

describe("List", () => {
  const mockData = {
    lat: "48.8566",
    lon: "2.3522",
    display_name: "Paris, Île-de-France, France",
    name: "Paris"
  }

  it("Affiche le display_name", () => {
    render(<List data={mockData} onUpdate={() => {}} />)
    expect(screen.getAllByText(/Paris, Île-de-France, France/i).length).toBeGreaterThan(0)
  })

  it("Appel onUpdate avec les bonnes variables lors du clic", () => {
    const onUpdateMock = vi.fn()

    render(<List data={mockData} onUpdate={onUpdateMock} />)

    const linkElement = screen.getAllByText(/Paris, Île-de-France, France/i)
    fireEvent.click(linkElement[1])

    expect(onUpdateMock).toHaveBeenCalledTimes(1)
    expect(onUpdateMock).toHaveBeenCalledWith({
      coords: [48.8566, 2.3522],
      name: "Paris, Île-de-France, France",
      city: "Paris"
    })
  })
})