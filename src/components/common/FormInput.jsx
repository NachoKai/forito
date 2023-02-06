import {
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Tooltip,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

export const FormInput = ({
	label,
	isRequired,
	helper,
	validation,
	child,
	leftIcon,
	rightIcon,
	placeholder,
	tooltip,
	dataCy,
	...rest
}) => (
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

		{validation && (
			<FormHelperText color='red.400' fontWeight='bold' mb='4px' whiteSpace='pre-wrap'>
				{validation}
			</FormHelperText>
		)}

		{child || (
			<InputGroup whiteSpace='pre-wrap'>
				{leftIcon && (
					<InputLeftElement color='gray.300' fontSize='1.2em'>
						{leftIcon}
					</InputLeftElement>
				)}
				<Input
					_placeholder={{ color: 'gray' }}
					autoComplete='off'
					bg='white'
					color='black'
					data-cy={dataCy}
					errorBorderColor='red.400'
					focusBorderColor='primary.200'
					placeholder={placeholder || label}
					variant='outline'
					whiteSpace='pre-wrap'
					{...rest}
				/>

				{rightIcon && (
					<InputRightElement color='gray.300' fontSize='1.2em'>
						{rightIcon}
					</InputRightElement>
				)}
			</InputGroup>
		)}

		{helper && <FormHelperText>{helper}</FormHelperText>}
	</FormControl>
)

FormInput.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	isInvalid: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	isRequired: PropTypes.bool,
	helper: PropTypes.string,
	validation: PropTypes.bool,
	autoFocus: PropTypes.bool,
	maxLength: PropTypes.string,
	onChange: PropTypes.func,
	child: PropTypes.node,
	type: PropTypes.string,
	leftIcon: PropTypes.node,
	rightIcon: PropTypes.node,
	placeholder: PropTypes.string,
	tooltip: PropTypes.string,
	dataCy: PropTypes.string,
}
