import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from './test-utils'
import Search from '../components/Search'

describe.skip('Search', () => {
	test('Renders component sections', () => {
		render(<Search />)
		// const searchSection = screen.getByRole('region', { name: /search/i })
		// const searchPostsTitle = screen.getByText(/search posts title/i)
		// const searchPostsInput = screen.getByRole('textbox', { name: /search posts title/i })
		// const searchTagsTitle = screen.getByText(/search tags/i)
		// const searchTagsHelper = screen.getByText(/insert tag with enter\/return\./i)
		// const searchButton = screen.getByRole('button', { name: /search/i })

		// expect(searchSection).toBeInTheDocument()
		// userEvent.click(searchSection)
		// expect(searchPostsTitle).toBeInTheDocument()
		// expect(searchPostsInput).toBeInTheDocument()
		// expect(searchTagsTitle).toBeInTheDocument()
		// expect(searchTagsHelper).toBeInTheDocument()
		// expect(searchButton).toBeInTheDocument()
	})
})
