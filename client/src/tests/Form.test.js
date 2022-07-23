import React from 'react'

import Form from '../components/Form'
import { render, screen } from './test-utils'

describe.skip('Form', () => {
	test('Renders component sections', () => {
		render(<Form />)
		const loggedOutMessage = screen.getByText(/please login to create a post\./i)

		expect(loggedOutMessage).toBeInTheDocument()
	})
})
