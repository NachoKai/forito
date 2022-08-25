import React from 'react'

import SearchNavbar from '../components/SearchNavbar'
import { render, screen } from './test-utils'

describe('SearchNavbar', () => {
	test('Renders component sections', () => {
		render(<SearchNavbar />)
		const searchPostsInput = screen.getByRole('textbox')
		const searchButton = screen.getByRole('button', { name: /search/i })

		expect(searchPostsInput).toBeInTheDocument()
		expect(searchButton).toBeInTheDocument()
	})
})
