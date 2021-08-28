import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { FaMoon, FaSun } from "react-icons/fa"
import { Button, Flex, Heading, Image, Stack, Text, useColorMode } from "@chakra-ui/react"
import { Link, useHistory, useLocation } from "react-router-dom"
import decode from "jwt-decode"

import { LOGOUT } from "../redux/auth"
import { getUser } from "../utils/getUser"
import { createGradColor } from "../theme"

const Navbar = () => {
	const [user, setUser] = useState(getUser())
	const { colorMode, toggleColorMode } = useColorMode()
	const dispatch = useDispatch()
	const location = useLocation()
	const history = useHistory()

	const logout = () => {
		dispatch({ type: LOGOUT })
		setUser(null)
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
					bgGradient={createGradColor(600, 900, 400, 100)}
					fontSize="2xl"
					fontWeight="bold"
				>
					<Flex>
						<Link to="/">Forito </Link>
						<Link to="/about">✨</Link>
					</Flex>
				</Heading>
			</Stack>

			<Stack align="center" direction="row" spacing="2">
				{user?.result ? (
					<Stack align="center" direction="row" spacing="4">
						{user?.result.imageUrl && (
							<Image
								alt={user?.result?.name}
								borderRadius="full"
								boxSize="25px"
								loading="lazy"
								objectFit="cover"
								src={user?.result?.imageUrl}
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
