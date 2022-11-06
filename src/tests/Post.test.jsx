import React from 'react'

import { Post } from '../components/Post'
import { render, screen } from './test-utils'

describe('Post', () => {
	let post
	let onOpen

	beforeEach(() => {
		post = null
		onOpen = null
	})

	test('Renders component sections', () => {
		post = {
			_id: '1',
			title: 'Test title 1',
			name: 'Test name 1',
			creator: 'Test creator 1',
			message: 'Test message 1',
			saves: ['1'],
			user: {
				id: '1',
				name: 'John Doe',
				avatar: 'https://avatars3.githubusercontent.com/u/1?s=460&v=4',
			},
			likes: ['1', '2', '3'],
			createdAt: '2020-01-01T00:00:00.000Z',
			privacy: 'public',
			tags: ['test1', 'test2'],
			comments: [
				{ userId: '1', comment: 'test comment 1', name: 'test name 1', _id: '1' },
				{ userId: '2', comment: 'test comment 2', name: 'test name 2', _id: '2' },
			],
		}
		onOpen = jest.fn()

		render(<Post post={post} onOpen={onOpen} />)
		const title = screen.getByRole('button', { name: /test title 1/i })
		const name = screen.getByRole('link', { name: /test name 1/i })
		const message = screen.getByText(/test message 1/i)
		const commentsButton = screen.getByText(/2 comments/i)
		const likesButton = screen.getByText(/3 likes/i)
		const tag1 = screen.getByRole('link', { name: /#test1/i })
		const tag2 = screen.getByRole('link', { name: /#test2/i })

		expect(title).toBeInTheDocument()
		expect(name).toBeInTheDocument()
		expect(message).toBeInTheDocument()
		expect(commentsButton).toBeInTheDocument()
		expect(likesButton).toBeInTheDocument()
		expect(tag1).toBeInTheDocument()
		expect(tag2).toBeInTheDocument()
	})
})
