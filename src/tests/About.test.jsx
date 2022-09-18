import React from 'react'

import About from '../components/About'
import { render, screen } from './test-utils'

describe('About', () => {
	test('Renders component sections', () => {
		render(<About />)
		const title = screen.getByRole('heading', { name: /hi, i'm nacho!/i })
		const subTitle = screen.getByRole('heading', { name: /and this is forito ✨/i })
		const button = screen.getByRole('button', { name: /github/i })

		expect(title).toBeInTheDocument()
		expect(subTitle).toBeInTheDocument()
		expect(button).toBeInTheDocument()
	})
})
