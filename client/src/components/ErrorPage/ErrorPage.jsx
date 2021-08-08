import { Flex, Text } from "@chakra-ui/react"
import { FaExclamationCircle } from "react-icons/fa"

const ErrorPage = () => {
	return (
		<Flex flexGrow align="center" direction="column" h="100%" justify="center" p="8">
			<Text color="primary.400" fontSize="6xl">
				<FaExclamationCircle />
			</Text>
			<Text color="primary.400" fontSize="6xl">
				404
			</Text>
			<Text color="primary.400" fontSize="3xl">
				Page not found
			</Text>
		</Flex>
	)
}

export default ErrorPage
