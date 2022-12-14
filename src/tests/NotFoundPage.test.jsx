import React from 'react'

import NotFoundPage from '../components/NotFoundPage'
import { render, screen } from './test-utils'

describe('NotFoundPage', () => {
	test('Renders component sections', () => {
		render(<NotFoundPage />)
		const title = screen.getByRole('heading', { name: /404/i })
		const subTitle = screen.getByRole('heading', { name: /page not found/i })

		expect(title).toBeInTheDocument()
		expect(subTitle).toBeInTheDocument()
	})
})
