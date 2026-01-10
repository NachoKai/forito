import {
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	InputProps,
	InputRightElement,
	Tooltip,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface FormInputProps extends InputProps {
	label?: string
	helper?: string
	validation?: string | boolean
	child?: ReactNode
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	tooltip?: string
	dataCy?: string
}

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
}: FormInputProps) => (
	<FormControl isInvalid={!!validation} isRequired={isRequired} whiteSpace='pre-wrap'>
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
