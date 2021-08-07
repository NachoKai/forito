import { useState, useEffect } from "react"
import { ChakraProvider, Flex, Text, Link } from "@chakra-ui/react"
import { useDispatch } from "react-redux"

import theme from "./theme"
import Posts from "./components/Posts/Posts"
import Form from "./components/Form/Form"
import { getPosts } from "./redux/posts"

const App = () => {
	const dispatch = useDispatch()
	const [currentId, setCurrentId] = useState(null)

	useEffect(() => {
		dispatch(getPosts())
	}, [currentId, dispatch])

	return (
		<ChakraProvider theme={theme}>
			<Flex direction="column" p="8" w="100%">
				<Flex marginBottom="8" w="100%">
					<Text color="primary.500" fontSize="xl">
						<Link href="/">Forito</Link>
					</Text>
				</Flex>

				<Flex direction={{ sm: "column", md: "column", lg: "row", xl: "row" }} w="100%">
					<Flex w="100%">
						<Posts setCurrentId={setCurrentId} />
					</Flex>

					<Flex>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
					</Flex>
				</Flex>
			</Flex>
		</ChakraProvider>
	)
}

export default App
