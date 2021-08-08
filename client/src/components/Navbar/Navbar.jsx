import { FaSun, FaMoon } from "react-icons/fa"
import { Flex, Text, Stack, Button, useColorMode, useColorModeValue, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	const color = useColorModeValue("primary.600", "primary.100")
	const user = null

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
			<Stack direction="row" spacing="2">
				<Text color={color} fontSize="xl" fontWeight="bold">
					<Link to="/">Forito</Link>
				</Text>
			</Stack>

			<Stack direction="row" spacing="4">
				{user?.result ? (
					<Flex>
						<Image
							alt={user?.result.name}
							borderRadius="full"
							boxSize="25px"
							objectFit="cover"
							src={user?.result.imageUrl}
						/>
						<Text>{user?.result.name}</Text>
						<Button colorScheme="primary" variant="outline">
							Logout
						</Button>
					</Flex>
				) : (
					<Flex>
						<Link to="/auth">
							<Button colorScheme="primary" variant="solid">
								Login
							</Button>
						</Link>
					</Flex>
				)}
				<Button colorScheme="primary" variant="ghost" onClick={toggleColorMode}>
					{colorMode === "light" ? <FaMoon /> : <FaSun />}
				</Button>
			</Stack>
		</Flex>
	)
}

export default Navbar
