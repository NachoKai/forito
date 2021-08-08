import { FormControl, Input, FormLabel, FormHelperText } from "@chakra-ui/react"

const FormInput = ({
	label,
	name,
	value,
	isRequired,
	helper,
	autoFocus,
	maxLength,
	handleChange,
	child,
	type,
}) => {
	return (
		<FormControl isRequired={isRequired}>
			<FormLabel>{label}</FormLabel>
			{helper && <FormHelperText>{helper}</FormHelperText>}
			{child ? (
				child
			) : (
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
					onChange={handleChange}
				/>
			)}
		</FormControl>
	)
}

export default FormInput
