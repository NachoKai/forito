import React from 'react'

import ErrorPage from '../components/ErrorPage'
import { render, screen } from './test-utils'

describe('ErrorPage', () => {
	beforeAll(() => {
		jest.spyOn(console, 'error').mockImplementation(() => null)
	})

	afterAll(() => {
		console.error.mockRestore()
	})

	afterEach(() => {
		console.error.mockClear()
	})

	test('Renders component sections', () => {
		const error = {
			name: 'Error Test',
			message: 'Error Test Message',
			code: 500,
		}

		render(<ErrorPage error={error} />)
		const title = screen.getByRole('heading', { name: /error/i })
		const subTitle = screen.getByRole('heading', { name: /something went wrong/i })

		expect(title).toBeInTheDocument()
		expect(subTitle).toBeInTheDocument()
		expect(console.error).toHaveBeenCalled()
		expect(console.error.mock.calls[0][0]).toContain('Error Test')
	})
})
