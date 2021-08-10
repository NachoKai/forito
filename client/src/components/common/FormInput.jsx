import {
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from "@chakra-ui/react"

const FormInput = ({
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
	leftIcon,
	rightIcon,
}) => {
	return (
		<FormControl isRequired={isRequired}>
			<FormLabel>{label}</FormLabel>
			{helper && <FormHelperText>{helper}</FormHelperText>}
			{child ? (
				child
			) : (
				<InputGroup>
					{leftIcon && (
						<InputLeftElement color="gray.300" fontSize="1.2em">
							{leftIcon}
						</InputLeftElement>
					)}
					<Input
						_placeholder={{ color: "gray" }}
						autoFocus={autoFocus}
						bg="white"
						color="black"
						errorBorderColor="red.300"
						focusBorderColor="primary.200"
						maxLength={maxLength}
						name={name}
						placeholder={label}
						type={type}
						value={value}
						variant="outline"
						onChange={onChange}
					/>
					{rightIcon && (
						<InputRightElement color="gray.300" fontSize="1.2em">
							{rightIcon}
						</InputRightElement>
					)}
				</InputGroup>
			)}
		</FormControl>
	)
}

export default FormInput
