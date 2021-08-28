import { FormControl, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react"

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
}) => {
	return (
		<FormControl isRequired={isRequired}>
			<FormLabel>{label}</FormLabel>
			{child ? (
				child
			) : (
				<Textarea
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
					whiteSpace="pre-wrap"
					onChange={onChange}
				/>
			)}
			{helper && <FormHelperText>{helper}</FormHelperText>}
		</FormControl>
	)
}

export default FormTextArea
