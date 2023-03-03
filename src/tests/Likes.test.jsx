import React from 'react'

import { Likes } from '../components/Likes'
import { render, screen } from './test-utils'

describe('Likes', () => {
	let likes
	let isLiked

	beforeEach(() => {
		likes = null
		isLiked = null
	})

	test('Renders component sections with no likes', () => {
		render(<Likes isLiked={isLiked} likes={likes} />)
		const likeText = screen.getByText(/like/i)

		expect(likeText).toBeInTheDocument()
	})

	test('Renders component sections with 1 like', () => {
		likes = ['1']
		isLiked = true
		render(<Likes isLiked={isLiked} likes={likes} />)
		const likeText = screen.getByText(/1 like/i)

		expect(likeText).toBeInTheDocument()
	})

	test('Renders component sections with 2 likes', () => {
		likes = ['1', '2']
		isLiked = false
		render(<Likes isLiked={isLiked} likes={likes} />)
		const likeText = screen.getByText(/2 likes/i)

		expect(likeText).toBeInTheDocument()
	})

	test('Renders component sections with 3 likes', () => {
		likes = ['1', '2', '3']
		isLiked = true
		render(<Likes isLiked={isLiked} likes={likes} />)
		const likeText = screen.getByText(/you and 2 others/i)

		expect(likeText).toBeInTheDocument()
	})
})
