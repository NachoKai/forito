import React from 'react'

import FormInput from '../components/common/FormInput'
import { render, screen } from './test-utils'

describe('FormInput', () => {
	let label
	let name
	let isInvalid
	let value
	let isRequired
	let helper
	let validation
	let autoFocus
	let maxLength
	let onChange
	let child
	let type
	let leftIcon
	let rightIcon
	let placeholder
	let tooltip
	let dataCy

	beforeEach(() => {
		label = null
		name = null
		isInvalid = null
		value = null
		isRequired = null
		helper = null
		validation = null
		autoFocus = null
		maxLength = null
		onChange = null
		child = null
		type = null
		leftIcon = null
		rightIcon = null
		placeholder = null
		tooltip = null
		dataCy = null
	})

	test('Renders component sections', () => {
		label = 'Label'
		name = 'name'
		isInvalid = false
		value = 'value'
		isRequired = false
		helper = 'helper'
		validation = true
		autoFocus = true
		maxLength = '10'
		onChange = jest.fn()
		child = <div>Child</div>
		type = 'text'
		leftIcon = 'leftIcon'
		rightIcon = 'rightIcon'
		placeholder = 'placeholder'
		tooltip = 'tooltip'
		dataCy = 'dataCy'

		render(
			<FormInput
				autoFocus={autoFocus}
				child={child}
				dataCy={dataCy}
				helper={helper}
				isInvalid={isInvalid}
				isRequired={isRequired}
				label={label}
				leftIcon={leftIcon}
				maxLength={maxLength}
				name={name}
				placeholder={placeholder}
				rightIcon={rightIcon}
				tooltip={tooltip}
				type={type}
				validation={validation}
				value={value}
				onChange={onChange}
			/>
		)
		const input = screen.getByText(label)
		const helperText = screen.getByText(helper)
		const childElement = screen.getByText(/child/i)

		expect(input).toBeInTheDocument()
		expect(helperText).toBeInTheDocument()
		expect(childElement).toBeInTheDocument()
	})
})
