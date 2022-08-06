import React from 'react'

import Search from '../components/Search'
import { render, screen } from './test-utils'

describe('Search', () => {
	test('Renders component sections', () => {
		render(<Search />)
		const searchButton = screen.getByRole('button', { name: /search/i })

		expect(searchButton).toBeInTheDocument()
	})
})
