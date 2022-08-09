import {
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Textarea,
	Tooltip,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const FormTextArea = ({
	label,
	name,
	value,
	isRequired,
	helper,
	autoFocus,
	maxLength,
	onChange,
	child,
	type,
	dataCy,
	tooltip,
}) => (
	<FormControl isRequired={isRequired}>
		<Flex>
			{tooltip ? (
				<Tooltip hasArrow label={tooltip} openDelay={200} placement='top'>
					<FormLabel>{label}</FormLabel>
				</Tooltip>
			) : (
				<FormLabel>{label}</FormLabel>
			)}
		</Flex>
		{child || (
			<Textarea
				_placeholder={{ color: 'gray' }}
				autoFocus={autoFocus}
				bg='white'
				color='black'
				data-cy={dataCy}
				errorBorderColor='red.300'
				focusBorderColor='primary.200'
				maxLength={maxLength}
				name={name}
				placeholder={label}
				type={type}
				value={value}
				variant='outline'
				whiteSpace='pre-wrap'
				onChange={onChange}
			/>
		)}
		{!!helper && <FormHelperText>{helper}</FormHelperText>}
	</FormControl>
)

export default FormTextArea

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
}
