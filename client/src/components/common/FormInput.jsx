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
				<Tooltip
					hasArrow
					colorScheme='primary'
					label={tooltip}
					openDelay={200}
					placement='top'
				>
					<FormLabel>{label}</FormLabel>
				</Tooltip>
			) : (
				<FormLabel>{label}</FormLabel>
			)}
		</Flex>
		{validation && (
			<FormHelperText color='red.400' fontWeight='bold' marginBottom='4px'>
				{validation}
			</FormHelperText>
		)}
		{child ? (
			child
		) : (
			<InputGroup>
				{leftIcon && (
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

export default FormInput
