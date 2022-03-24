import React from 'react'
import { render, screen } from './test-utils'
import ErrorPage from '../components/ErrorPage'

describe.skip('ErrorPage', () => {
	test('Renders component sections', () => {
		render(<ErrorPage />)
		const title = screen.getByRole('heading', { name: /404/i })
		const subTitle = screen.getByRole('heading', { name: /page not found/i })

		expect(title).toBeInTheDocument()
		expect(subTitle).toBeInTheDocument()
	})
})
