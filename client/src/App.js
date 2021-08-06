import { ChakraProvider } from "@chakra-ui/react"
import { Flex, Text } from "@chakra-ui/react"

import theme from "./theme"
import Posts from "./components/Posts/Posts"
import Form from "./components/Form/Form"

const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<Flex>
				<Text>Forito</Text>
			</Flex>

			<Flex>
				<Posts />
			</Flex>

			<Flex>
				<Form />
			</Flex>
		</ChakraProvider>
	)
}

export default App
