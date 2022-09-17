import React from 'react'
import { FormTextArea } from '../components/common/FormTextArea'

export default {
	title: 'FormTextArea',
	component: FormTextArea,
	argTypes: {
		label: { control: 'text' },
		isRequired: { control: 'boolean' },
		helper: { control: 'text' },
		child: { control: 'text' },
		placeholder: { control: 'text' },
		tooltip: { control: 'text' },
		dataCy: { control: 'text' },
		autoFocus: { control: 'boolean' },
		maxLength: { control: 'text' },
		type: { control: 'text' },
		value: { control: 'text' },
	},
	parameters: { controls: { sort: 'requiredFirst' } },
}

export const Default = () => <FormTextArea />

export const Full = () => (
	<FormTextArea
		autoFocus={true}
		helper='Helper'
		isRequired={true}
		label='Label'
		maxLength='100'
		placeholder='Placeholder'
		tooltip='Tooltip'
		type='Type'
		value='Value'
	/>
)
