import { useEffect } from "react"
import { ChakraProvider, Flex, Text } from "@chakra-ui/react"
import { useDispatch } from "react-redux"

import theme from "./theme"
import Posts from "./components/Posts/Posts"
import Form from "./components/Form/Form"
import { getPosts } from "./redux/posts"

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getPosts())
	}, [dispatch])

	return (
		<ChakraProvider theme={theme}>
			<Flex p="8">
				<Text>Forito</Text>
			</Flex>

			<Flex p="8">
				<Flex>
					<Posts />
				</Flex>

				<Flex>
					<Form />
				</Flex>
			</Flex>
		</ChakraProvider>
	)
}

export default App
