import React from 'react'

import PostDetails from '../components/PostDetails'
import { render, screen } from './test-utils'

describe('PostDetails', () => {
	test('Renders component sections', () => {
		render(<PostDetails />)
		const postNotFoundText = screen.getByRole('heading', { name: /post not found\./i })

		expect(postNotFoundText).toBeInTheDocument()
	})
})
