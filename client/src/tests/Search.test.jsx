import React from 'react'

import ColorPicker from '../components/ColorPicker'
import { render, screen } from './test-utils'

describe('ColorPicker', () => {
	test('Renders component sections', () => {
		render(<ColorPicker />)
		const selectedColor = screen.getByText(/blue\.500/i)
		const closeButton = screen.getByLabelText(/close/i)
		const redButton = screen.getByLabelText(/red\.500/i)
		const orangeButton = screen.getByLabelText(/orange\.400/i)
		const yellowButton = screen.getByLabelText(/yellow\.300/i)
		const greenButton = screen.getByLabelText(/green\.500/i)
		const tealButton = screen.getByLabelText(/teal\.300/i)
		const cyanButton = screen.getByLabelText(/cyan\.400/i)
		const purpleButton = screen.getByLabelText(/purple\.500/i)
		const pinkButton = screen.getByLabelText(/pink\.400/i)
		const grayButton = screen.getByLabelText(/gray\.500/i)

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
