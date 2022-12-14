import React from 'react'

import ErrorPage from '../components/ErrorPage'
import { render, screen } from './test-utils'

describe('ErrorPage', () => {
	test('Renders component sections', () => {
		render(<ErrorPage />)
		const title = screen.getByRole('heading', { name: /error/i })
		const subTitle = screen.getByRole('heading', { name: /something went wrong/i })

		expect(title).toBeInTheDocument()
		expect(subTitle).toBeInTheDocument()
	})
})
