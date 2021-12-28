import React from 'react'
import { render, screen } from './test-utils'
import Navbar from '../components/Navbar'

describe('Navbar', () => {
	test('Renders title', () => {
		render(<Navbar />)
		const title = screen.getByRole('link', { name: /forito ✨/i })

		expect(title).toBeInTheDocument()
	})
})
