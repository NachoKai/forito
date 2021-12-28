import React from 'react'
import { render, screen } from './test-utils'
import Footer from '../components/Footer'

describe('Footer', () => {
	test('Renders component sections', () => {
		render(<Footer />)
		const home = screen.getByRole('link', { name: /home/i })
		const about = screen.getByRole('link', { name: /about/i })
		const rights = screen.getByText(/© 2021 forito\. all rights reserved\./i)
		const madeBy = screen.getByText(/made with ❤ by/i)

		expect(home).toBeInTheDocument()
		expect(about).toBeInTheDocument()
		expect(rights).toBeInTheDocument()
		expect(madeBy).toBeInTheDocument()
	})
})
