import React from 'react'

import { Likes } from '../components/Likes'
import { render, screen } from './test-utils'

describe('Likes', () => {
	let likes
	let hasUserLike

	beforeEach(() => {
		likes = null
		hasUserLike = null
	})

	test('Renders component sections with no likes', () => {
		render(<Likes hasUserLike={hasUserLike} likes={likes} />)
		const likeText = screen.getByText(/like/i)

		expect(likeText).toBeInTheDocument()
	})

	test('Renders component sections with 1 like', () => {
		likes = ['1']
		hasUserLike = true
		render(<Likes hasUserLike={hasUserLike} likes={likes} />)
		const likeText = screen.getByText(/1 like/i)

		expect(likeText).toBeInTheDocument()
	})

	test('Renders component sections with 2 likes', () => {
		likes = ['1', '2']
		hasUserLike = false
		render(<Likes hasUserLike={hasUserLike} likes={likes} />)
		const likeText = screen.getByText(/2 likes/i)

		expect(likeText).toBeInTheDocument()
	})

	test('Renders component sections with 3 likes', () => {
		likes = ['1', '2', '3']
		hasUserLike = true
		render(<Likes hasUserLike={hasUserLike} likes={likes} />)
		const likeText = screen.getByText(/you and 2 others/i)

		expect(likeText).toBeInTheDocument()
	})
})
