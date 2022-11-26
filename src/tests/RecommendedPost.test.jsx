import React from 'react'

import { RecommendedPost } from '../components/RecommendedPost'
import { render, screen } from './test-utils'

describe('RecommendedPost', () => {
	const post = {
		_id: '123',
		title: 'Test Title',
		name: 'Test Name',
		message: 'Test Message',
		selectedFile: { url: 'test-url' },
		createdAt: '2021-08-01T00:00:00.000Z',
		tags: ['test', 'tag'],
	}

	test('Renders component sections', () => {
		render(<RecommendedPost post={post} />)
		const title = screen.getByRole('heading', { name: /test title/i })
		const name = screen.getByText(/test name over 1 year ago/i)
		const message = screen.getByText(/test name over 1 year ago/i)

		expect(title).toBeInTheDocument()
		expect(name).toBeInTheDocument()
		expect(message).toBeInTheDocument()
	})
})
