import { Flex, Heading, Text } from '@chakra-ui/react'
import { FaExclamationCircle } from 'react-icons/fa'

const ErrorPage = () => (
	<Flex
		flexGrow
		align='center'
		direction='column'
		h='100%'
		justify='flex-start'
		minHeight='100vh'
		px={{ sm: '4', md: '10', lg: '16', xl: '24' }}
		py={{ sm: '4', md: '6', lg: '8', xl: '8' }}
	>
		<Text color='primary.400' fontSize='6xl'>
			<FaExclamationCircle />
		</Text>
		<Heading color='primary.400' fontSize='8xl'>
			404
		</Heading>
		<Heading color='primary.400' fontSize='3xl'>
			Page not found
		</Heading>
	</Flex>
)

export default ErrorPage
