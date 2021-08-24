import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { FaMoon, FaSun } from "react-icons/fa"
import {
	Button,
	Flex,
	Heading,
	Stack,
	Text,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react"
import { Link, useHistory, useLocation } from "react-router-dom"
import decode from "jwt-decode"

import { LOGOUT } from "../redux/auth"
import { getUser } from "../utils/getUser"

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	const gradColor = useColorModeValue(
		"linear(to-l, primary.600,primary.900)",
		"linear(to-l, primary.400,primary.100)"
	)
	const dispatch = useDispatch()
	const location = useLocation()
	const history = useHistory()
	const [user, setUser] = useState(getUser())

	const logout = () => {
		setUser(null)
		dispatch({ type: LOGOUT })
		history.push("/auth")
	}

	useEffect(() => {
		const token = user?.token

		if (token) {
			const decodedToken = decode(token)

			if (decodedToken.exp * 1000 < new Date().getTime()) logout()
		}
		setUser(getUser())
	}, [location])

	return (
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
			<Stack align="center" direction="row" spacing="2">
				<Heading
					as="h2"
					bgClip="text"
					bgGradient={gradColor}
					fontSize="2xl"
					fontWeight="bold"
				>
					<Link to="/">Forito ✨</Link>
				</Heading>
			</Stack>

			<Stack align="center" direction="row" spacing="2">
				{user?.result ? (
					<Stack align="center" direction="row" spacing="4">
						{user?.result.imageUrl && (
							<img
								alt={user?.result?.name}
								height="25px"
								loading="lazy"
								src={user?.result?.imageUrl}
								style={{ borderRadius: "100%" }}
								width="25px"
							/>
						)}
						{user?.result.name && (
							<Text
								isTruncated
								display={{
									sm: "none",
									md: "flex",
									lg: "flex",
									xl: "flex",
								}}
							>
								{user.result.name}
							</Text>
						)}
						<Button colorScheme="primary" size="sm" variant="outline" onClick={logout}>
							Logout
						</Button>
					</Stack>
				) : (
					<Flex>
						<Link to="/auth">
							<Button colorScheme="primary" size="sm" variant="solid">
								Login
							</Button>
						</Link>
					</Flex>
				)}
				<Button colorScheme="primary" size="sm" variant="ghost" onClick={toggleColorMode}>
					{colorMode === "light" ? (
						<FaMoon aria-label="Dark Mode" />
					) : (
						<FaSun aria-label="Light Mode" />
					)}
				</Button>
			</Stack>
		</Flex>
	)
}

export default Navbar