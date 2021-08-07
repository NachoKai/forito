import { useState, useEffect } from "react"
import { ChakraProvider, Flex, Text } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import theme from "./theme"
import Posts from "./components/Posts/Posts"
import Form from "./components/Form/Form"
import { getPosts } from "./redux/posts"
import Test from "./components/Test"
import ErrorPage from "./components/ErrorPage"

const App = () => {
	const dispatch = useDispatch()
	const [currentId, setCurrentId] = useState(null)

	useEffect(() => {
		dispatch(getPosts())
	}, [currentId, dispatch])

	return (
		<ChakraProvider theme={theme}>
			<Router>
				<Flex paddingTop="8" paddingX="8">
					<Text color="primary.500" fontSize="xl">
						<Link to="/">Forito</Link>
						<Link to="/test">Test</Link>
					</Text>
				</Flex>

				<Switch>
					<Route path="/test">
						<Test />
					</Route>

					<Route exact path="/">
						<Flex direction="column" p="8" w="100%">
							<Flex direction={{ sm: "column", md: "column", lg: "row", xl: "row" }} w="100%">
								<Flex w="100%">
									<Posts setCurrentId={setCurrentId} />
								</Flex>

								<Flex>
									<Form currentId={currentId} setCurrentId={setCurrentId} />
								</Flex>
							</Flex>
						</Flex>
					</Route>

					<Route path="*">
						<Flex flexGrow direction="column" p="8" w="100%">
							<ErrorPage />
						</Flex>
					</Route>
				</Switch>
			</Router>
		</ChakraProvider>
	)
}

export default App
