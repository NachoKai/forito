import React from 'react'
import { render, screen } from './test-utils'
import Form from '../components/Form'

describe('Form', () => {
	test('Renders component sections', () => {
		render(<Form />)
		const loggedOutMessage = screen.getByText(/please login to create a post\./i)

		expect(loggedOutMessage).toBeInTheDocument()
	})
})
