import {
	Flex,
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

const FormInput = ({
	label,
	name,
	isInvalid,
	value,
	isRequired,
	helper,
	validation,
	autoFocus,
	maxLength,
	onChange,
	child,
	type,
	leftIcon,
	rightIcon,
	placeholder,
	tooltip,
	dataCy,
}) => (
	<FormControl isRequired={isRequired}>
		<Flex>
			{tooltip ? (
				<Tooltip hasArrow label={tooltip} openDelay={200} placement='top'>
					<FormLabel>{label}</FormLabel>
				</Tooltip>
			) : (
				!!label && <FormLabel>{label}</FormLabel>
			)}
		</Flex>
		{!!validation && (
			<FormHelperText color='red.400' fontWeight='bold' marginBottom='4px'>
				{validation}
			</FormHelperText>
		)}
		{child || (
			<InputGroup>
				{!!leftIcon && (
					<InputLeftElement color='gray.300' fontSize='1.2em'>
						{leftIcon}
					</InputLeftElement>
				)}
				<Input
					_placeholder={{ color: 'gray' }}
					autoComplete='off'
					autoFocus={autoFocus}
					bg='white'
					color='black'
					data-cy={dataCy}
					errorBorderColor='red.400'
					focusBorderColor='primary.200'
					isInvalid={isInvalid}
					maxLength={maxLength}
					name={name}
					placeholder={placeholder || label}
					type={type}
					value={value}
					variant='outline'
					onChange={onChange}
				/>
				{!!rightIcon && (
					<InputRightElement color='gray.300' fontSize='1.2em'>
						{rightIcon}
					</InputRightElement>
				)}
			</InputGroup>
		)}
		{!!helper && <FormHelperText>{helper}</FormHelperText>}
	</FormControl>
)

export default FormInput

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
