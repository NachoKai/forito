import { Flex, Heading, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { FaExclamationCircle } from 'react-icons/fa'

const ErrorPage = ({ error }) => {
	const errorName = error?.name || 'Error'
	const errorMessage = error?.message || 'An error occurred.'
	const errorCode = error?.code

	console.error(errorName, errorMessage, errorCode)

	return (
		<Flex
			align='center'
			direction='column'
			flexGrow='1'
			h='100%'
			justify='flex-start'
			minH='100vh'
			px={{ sm: '4', md: '10', lg: '16', xl: '24' }}
			py={{ sm: '4', md: '6', lg: '8', xl: '8' }}
		>
			<Text color='primary.400' fontSize='6xl'>
				<FaExclamationCircle />
			</Text>
			<Heading color='primary.400' fontSize='8xl'>
				Error
			</Heading>
			<Heading color='primary.400' fontSize='3xl'>
				Something went wrong. Try again later.
			</Heading>
		</Flex>
	)
}

export default ErrorPage

ErrorPage.propTypes = {
	error: PropTypes.object,
}
