import React from 'react'

import Likes from '../components/Likes'
import { render, screen } from './test-utils'

describe('Likes', () => {
	let likes
	let isUserLike

	beforeEach(() => {
		likes = null
		isUserLike = null
	})

	test('Renders component sections with no likes', () => {
		render(<Likes isUserLike={isUserLike} likes={likes} />)
		const likeText = screen.getByText(/like/i)

		expect(likeText).toBeInTheDocument()
	})

	test('Renders component sections with 1 like', () => {
		likes = ['1']
		isUserLike = true
		render(<Likes isUserLike={isUserLike} likes={likes} />)
		const likeText = screen.getByText(/1 like/i)

		expect(likeText).toBeInTheDocument()
	})

	test('Renders component sections with 2 likes', () => {
		likes = ['1', '2']
		isUserLike = false
		render(<Likes isUserLike={isUserLike} likes={likes} />)
		const likeText = screen.getByText(/2 likes/i)

		expect(likeText).toBeInTheDocument()
	})

	test('Renders component sections with 3 likes', () => {
		likes = ['1', '2', '3']
		isUserLike = true
		render(<Likes isUserLike={isUserLike} likes={likes} />)
		const likeText = screen.getByText(/you and 2 others/i)

		expect(likeText).toBeInTheDocument()
	})
})
