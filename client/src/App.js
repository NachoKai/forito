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
			<Flex direction="column">
				<Flex p="8">
					<Text fontSize="xl" color="primary.500">
						<Link href="/">Forito</Link>
					</Text>
				</Flex>

				<Flex p="8" direction={{ sm: "column", md: "column", lg: "row", xl: "row" }}>
					<Flex>
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
