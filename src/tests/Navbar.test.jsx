import React from 'react'
import SearchNavbar from '../components/Navbar/Navbar'

import { render, screen } from './test-utils'

describe('Navbar', () => {
	test('Renders title', () => {
		render(<SearchNavbar />)
		const title = screen.getByRole('link', { name: /forito ✨/i })
		const themeButton = screen.getByRole('button', { name: /light|dark mode/i })
		const loginButton = screen.getByRole('button', { name: /login|logout/i })

		expect(title).toBeInTheDocument()
		expect(themeButton).toBeInTheDocument()
		expect(loginButton).toBeInTheDocument()
	})
})
