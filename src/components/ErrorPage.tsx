import { Heading, Stack, Text } from '@chakra-ui/react'
import { FaExclamationCircle } from 'react-icons/fa'

interface ErrorPageProps {
	error?: {
		name?: string
		message?: string
		code?: string | number
	}
}

const ErrorPage = ({ error }: ErrorPageProps) => {
	const errorName = error?.name || 'Error'
	const errorMessage = error?.message || 'An error occurred.'
	const errorCode = error?.code

	console.error(errorName, errorMessage, errorCode)

	return (
		<Stack
			align='center'
			direction='column'
			h='100%'
			justify='flex-start'
			minH='100vh'
			p={{ sm: '6', md: '12', lg: '18', xl: '24' }}
			py={{ sm: '6', md: '12', lg: '18', xl: '24' }}
			spacing='4'
		>
			<Text color='primary.400' fontSize='6xl'>
				<FaExclamationCircle />
			</Text>
			<Heading color='primary.400' fontSize='6xl'>
				Error
			</Heading>
			<Heading color='primary.400' fontSize='3xl'>
				Something went wrong. Try again later.
			</Heading>
		</Stack>
	)
}

export default ErrorPage
