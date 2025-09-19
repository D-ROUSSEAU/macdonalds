/**
* @jest-environment jsdom
*/

import { render, screen, fireEvent } from "@testing-library/react"
import Results from "../components/Results"
import { describe, expect, it, vi } from "vitest"

describe("Results", () => {
    it("Affiche l'état initial des résultats", () => {
        render(<Results />)
    })
})