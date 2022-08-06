import React from 'react'

import Dialog from '../components/common/Dialog'
import { render, screen } from './test-utils'

describe('Dialog', () => {
	let title
	let message
	let button
	let action
	let isDialogOpen
	let setIsDialogOpen

	beforeEach(() => {
		title = null
		message = null
		button = null
		action = null
		isDialogOpen = false
		setIsDialogOpen = () => {}
	})

	test('Renders component sections', () => {
		title = 'title'
		message = 'message'
		button = 'button'
		action = () => {}
		isDialogOpen = true
		setIsDialogOpen = () => {}

		render(
			<Dialog
				action={action}
				button={button}
				isDialogOpen={isDialogOpen}
				message={message}
				setIsDialogOpen={setIsDialogOpen}
				title={title}
			/>
		)
		const titleElement = screen.getByText(title)
		const messageElement = screen.getByText(message)
		const buttonElement = screen.getByText(button)
		const cancelButton = screen.getByRole('button', { name: /cancel/i })

		expect(titleElement).toBeInTheDocument()
		expect(messageElement).toBeInTheDocument()
		expect(buttonElement).toBeInTheDocument()
		expect(cancelButton).toBeInTheDocument()
	})
})
