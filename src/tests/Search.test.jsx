import React from 'react'

import { ColorPicker } from '../components/Navbar/ColorPicker'
import { render, screen } from './test-utils'

describe('ColorPicker', () => {
	test('Renders component sections', () => {
		render(<ColorPicker />)
		const selectedColor = screen.getByText(/blue/i)
		const closeButton = screen.getByLabelText(/close/i)
		const redButton = screen.getByLabelText(/red/i)
		const orangeButton = screen.getByLabelText(/orange/i)
		const yellowButton = screen.getByLabelText(/yellow/i)
		const greenButton = screen.getByLabelText(/green/i)
		const tealButton = screen.getByLabelText(/teal/i)
		const cyanButton = screen.getByLabelText(/cyan/i)
		const purpleButton = screen.getByLabelText(/purple/i)
		const pinkButton = screen.getByLabelText(/pink/i)
		const grayButton = screen.getByLabelText(/gray/i)

		expect(selectedColor).toBeInTheDocument()
		expect(closeButton).toBeInTheDocument()
		expect(redButton).toBeInTheDocument()
		expect(orangeButton).toBeInTheDocument()
		expect(yellowButton).toBeInTheDocument()
		expect(greenButton).toBeInTheDocument()
		expect(tealButton).toBeInTheDocument()
		expect(cyanButton).toBeInTheDocument()
		expect(purpleButton).toBeInTheDocument()
		expect(pinkButton).toBeInTheDocument()
		expect(grayButton).toBeInTheDocument()
	})
})
