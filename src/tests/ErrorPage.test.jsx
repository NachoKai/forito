import React from 'react'

import ErrorPage from '../components/ErrorPage'
import { render, screen } from './test-utils'

describe('ErrorPage', () => {
	test('Renders component sections', () => {
		const error = {
			name: 'Error Test',
			message: 'Error Test Message',
			code: 500,
		}

		render(<ErrorPage error={error} />)
		const title = screen.getByRole('heading', { name: /error/i })
		const subTitle = screen.getByRole('heading', { name: /something went wrong/i })
		const errorName = screen.getByText(/error test/i)
		const errorMessage = screen.getByText(/error test message/i)
		const errorCode = screen.getByText(/500/i)

		expect(title).toBeInTheDocument()
		expect(subTitle).toBeInTheDocument()
		expect(errorName).toBeInTheDocument()
		expect(errorMessage).toBeInTheDocument()
		expect(errorCode).toBeInTheDocument()
	})
})
