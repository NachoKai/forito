import { useState, useEffect } from "react"
import { Flex, Text, Stack, Button, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { FaSun, FaMoon } from "react-icons/fa"

import Posts from "./components/Posts/Posts"
import Form from "./components/Form/Form"
import { getPosts } from "./redux/posts"
import Test from "./components/Test"
import ErrorPage from "./components/ErrorPage"

const App = () => {
	const dispatch = useDispatch()
	const [currentId, setCurrentId] = useState(null)
	const { colorMode, toggleColorMode } = useColorMode()
	const color = useColorModeValue("primary.600", "primary.100")

	useEffect(() => {
		dispatch(getPosts())
	}, [currentId, dispatch])

	return (
		<Router>
			<Flex
				flexGrow
				align="center"
				background={colorMode === "light" ? "white" : "gray.800"}
				h="60px"
				justify="space-between"
				paddingX="8"
				position="sticky"
				top="0"
				zIndex="3"
			>
				<Stack direction="row" spacing="2">
					<Text color={color} fontSize="xl" fontWeight="bold">
						<Link to="/">Forito</Link>
					</Text>
					<Text color={color} fontSize="xl">
						<Link to="/test">Test</Link>
					</Text>
				</Stack>
				<Button colorScheme="primary" onClick={toggleColorMode}>
					{colorMode === "light" ? <FaMoon /> : <FaSun />}
				</Button>
			</Flex>

			<Switch>
				<Route path="/test">
					<Test />
				</Route>

				<Route exact path="/">
					<Stack
						direction={{ sm: "column-reverse", md: "column-reverse", lg: "row", xl: "row" }}
						p="8"
						spacing={8}
						w="100%"
					>
						<Stack w="100%">
							<Posts setCurrentId={setCurrentId} />
						</Stack>
						<Stack>
							<Form currentId={currentId} setCurrentId={setCurrentId} />
						</Stack>
					</Stack>
				</Route>

				<Route path="*">
					<Flex flexGrow direction="column" p="8">
						<ErrorPage />
					</Flex>
				</Route>
			</Switch>
		</Router>
	)
}

export default App
