import {
	FormControl,
	FormHelperText,
	FormLabel,
	Textarea,
	Tooltip,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

export const FormTextArea = ({
	label,
	isRequired,
	helper,
	child,
	dataCy,
	tooltip,
	placeholder,
	...rest
}) => (
	<FormControl isRequired={isRequired}>
		{label && (
			<Tooltip
				hasArrow
				arrowSize={8}
				label={tooltip || ''}
				openDelay={150}
				placement='top'
			>
				<FormLabel fontWeight='bold' w='fit-content'>
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

		{Boolean(helper) && <FormHelperText>{helper}</FormHelperText>}
	</FormControl>
)

FormTextArea.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	isRequired: PropTypes.bool,
	helper: PropTypes.string,
	autoFocus: PropTypes.bool,
	maxLength: PropTypes.string,
	onChange: PropTypes.func,
	child: PropTypes.node,
	type: PropTypes.string,
	dataCy: PropTypes.string,
	tooltip: PropTypes.string,
	placeholder: PropTypes.string,
}
