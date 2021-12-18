import {
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Textarea,
	Tooltip,
} from '@chakra-ui/react'

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
	tooltip,
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
		{child ? (
			child
		) : (
			<Textarea
				_placeholder={{ color: 'gray' }}
				autoFocus={autoFocus}
				bg='white'
				color='black'
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
		{helper && <FormHelperText>{helper}</FormHelperText>}
	</FormControl>
)

export default FormTextArea
