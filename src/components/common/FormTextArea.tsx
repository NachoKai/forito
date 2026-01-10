import {
	FormControl,
	FormHelperText,
	FormLabel,
	Textarea,
	TextareaProps,
	Tooltip,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface FormTextAreaProps extends TextareaProps {
	label?: string
	helper?: string
	child?: ReactNode
	dataCy?: string
	tooltip?: string
}

export const FormTextArea = ({
	label,
	isRequired,
	helper,
	child,
	dataCy,
	tooltip,
	placeholder,
	...rest
}: FormTextAreaProps) => (
	<FormControl isRequired={isRequired} whiteSpace='pre-wrap'>
		{label && (
			<Tooltip
				hasArrow
				arrowSize={8}
				border='1px solid #000'
				borderRadius='8px'
				label={tooltip || ''}
				openDelay={150}
				placement='top'
				whiteSpace='pre-wrap'
			>
				<FormLabel fontWeight='bold' w='fit-content' whiteSpace='nowrap'>
					{label}
				</FormLabel>
			</Tooltip>
		)}

		{child || (
			<Textarea
				_placeholder={{ color: 'gray' }}
				bg='white'
				color='black'
				data-cy={dataCy}
				errorBorderColor='red.300'
				focusBorderColor='primary.200'
				placeholder={placeholder || label}
				variant='outline'
				whiteSpace='pre-wrap'
				{...rest}
			/>
		)}

		{helper && <FormHelperText>{helper}</FormHelperText>}
	</FormControl>
)
