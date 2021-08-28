import React from "react"
import { Provider } from "react-redux"
import { ChakraProvider } from "@chakra-ui/react"
import configureStore from "redux-mock-store"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import Navbar from "../components/Navbar"

const mockStore = configureStore([])

describe("Navbar", () => {
	let store

	beforeEach(() => {
		store = mockStore({
			myState: "sample text",
		})
	})

	test("should render", () => {
		render(
			<Provider store={store}>
				<ChakraProvider>
					<Navbar />
				</ChakraProvider>
			</Provider>,
			{ wrapper: MemoryRouter }
		)

		const heading = screen.getByRole("link", { name: /forito ✨/i })

		expect(heading).toHaveTextContent("Forito ✨")
	})
})
