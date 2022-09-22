import React from 'react'
import { FormInput } from '../components/common/FormInput'

export default {
	title: 'FormInput',
	component: FormInput,
	argTypes: {
		label: { control: 'text' },
		name: { control: 'text' },
		isInvalid: { control: 'boolean' },
		value: { control: 'text' },
		isRequired: { control: 'boolean' },
		helper: { control: 'text' },
		validation: { control: 'text' },
		autoFocus: { control: 'boolean' },
		maxLength: { control: 'text' },
		type: { control: 'text' },
		leftIcon: { control: 'text' },
		rightIcon: { control: 'text' },
		placeholder: { control: 'text' },
		tooltip: { control: 'text' },
		dataCy: { control: 'text' },
	},
	parameters: { controls: { sort: 'requiredFirst' } },
}

export const Default = () => <FormInput />

export const Full = () => (
	<FormInput
		autoFocus={true}
		helper='Helper'
		isRequired={true}
		label='Label'
		leftIcon='✨'
		maxLength='100'
		placeholder='Placeholder'
		tooltip='Tooltip'
	/>
)
