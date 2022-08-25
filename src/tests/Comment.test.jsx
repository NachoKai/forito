import React from 'react'

import Comment from '../components/Comment'
import { render, screen } from './test-utils'

describe('Comment', () => {
	let comment

	beforeEach(() => {
		comment = null
	})

	test('Renders component sections', () => {
		comment = { userId: '1', comment: 'test comment', name: 'test name', _id: '1' }

		render(<Comment comment={comment} />)
		const componentComment = screen.getByText(/test comment/i)
		const componentLink = screen.getByRole('link')
		const componentLinkText = screen.getByText(/test name/i)

		expect(componentComment).toBeInTheDocument()
		expect(componentLink).toHaveAttribute('href', '/creator/1')
		expect(componentLinkText).toBeInTheDocument()
	})
})
