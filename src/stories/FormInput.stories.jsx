import React from 'react'
import { FormInput } from '../components/common/FormInput'

export default {
	title: 'FormInput',
	component: FormInput,
	argTypes: {
		label: { control: 'text' },
		isRequired: { control: 'boolean' },
		helper: { control: 'text' },
		validation: { control: 'text' },
		child: { control: 'text' },
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
		leftIcon='LeftIcon'
		maxLength='100'
		placeholder='Placeholder'
		tooltip='Tooltip'
	/>
)
