import React from 'react'

import { Comments } from '../components/Comments'
import { render, screen } from './test-utils'

describe('Comments', () => {
	let postComments
	let postId
	let user

	beforeEach(() => {
		postComments = null
		postId = null
		user = null
	})

	test('Renders component sections when  logged out', () => {
		postComments = [
			{ userId: '1', comment: 'test comment 1', name: 'test name 1', commentId: '1' },
			{ userId: '2', comment: 'test comment 2', name: 'test name 2', commentId: '2' },
		]
		postId = '111'

		render(<Comments postComments={postComments} postId={postId} user={user} />)
		const loggedOutText = screen.getByText(/please login to comment a post\./i)

		expect(loggedOutText).toBeInTheDocument()
	})

	test('Renders component sections when logged in', () => {
		postComments = [
			{ userId: '1', comment: 'test comment 1', name: 'test name 1', commentId: '1' },
			{ userId: '2', comment: 'test comment 2', name: 'test name 2', commentId: '2' },
		]
		postId = '111'
		user = {
			result: {
				googleId: '111',
				name: 'test name',
			},
		}

		render(<Comments postComments={postComments} postId={postId} user={user} />)
		const firstComment = screen.getByText(/test comment 1/i)
		const firstCommentUser = screen.getByText(/test name 1/i)
		const firstCommentLink = screen.getAllByRole('link')[0]
		const secondComment = screen.getByText(/test comment 2/i)
		const secondCommentUser = screen.getByText(/test name 2/i)
		const secondCommentLink = screen.getAllByRole('link')[1]
		const textarea = screen.getByRole('textbox', { name: /write a comment/i })
		const commentButton = screen.getByRole('button', { name: /comment/i })
		const clearButton = screen.getByRole('button', { name: /clear/i })

		expect(firstComment).toBeInTheDocument()
		expect(firstCommentUser).toBeInTheDocument()
		expect(firstCommentLink).toHaveAttribute('href', '/creator/1')
		expect(secondComment).toBeInTheDocument()
		expect(secondCommentUser).toBeInTheDocument()
		expect(secondCommentLink).toHaveAttribute('href', '/creator/2')
		expect(textarea).toBeInTheDocument()
		expect(commentButton).toBeInTheDocument()
		expect(clearButton).toBeInTheDocument()
	})
})
