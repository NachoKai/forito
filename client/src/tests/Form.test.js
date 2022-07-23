import React from 'react'

import Form from '../components/Form'
import { render, screen } from './test-utils'

describe.skip('Form', () => {
	test('Renders component sections', () => {
		render(<Form />)
		const titleLabel = screen.getByText(/title/i)

		expect(titleLabel).toBeInTheDocument()
	})
})
