import React from 'react'
import { render, screen } from './test-utils'
import Footer from '../components/Footer'

describe.skip('Footer', () => {
	test('Renders component sections', () => {
		render(<Footer />)
		const home = screen.getByRole('link', { name: /home/i })
		const about = screen.getByRole('link', { name: /about/i })
		const rights = screen.getByText(/forito\. all rights reserved\./i)
		const madeBy = screen.getByText(/made with ❤ by/i)
		const link = screen.getByRole('link', { name: /nacho caiafa/i })

		expect(home).toBeInTheDocument()
		expect(about).toBeInTheDocument()
		expect(rights).toBeInTheDocument()
		expect(madeBy).toBeInTheDocument()
		expect(link).toBeInTheDocument()
	})
})
