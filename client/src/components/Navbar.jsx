import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { FaMoon, FaSun } from "react-icons/fa"
import {
	Button,
	Flex,
	Heading,
	Image,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Stack,
	Text,
	useColorMode,
} from "@chakra-ui/react"
import { Link, useHistory, useLocation } from "react-router-dom"
import decode from "jwt-decode"

import { logout } from "../redux/auth"
import { getUser } from "../utils/getUser"
import { CreateGradColor } from "../theme"

const Navbar = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const history = useHistory()
	const [user, setUser] = useState(getUser())
	const { colorMode, toggleColorMode } = useColorMode()
	const [isOpen, setIsOpen] = useState(false)
	const open = () => setIsOpen(!isOpen)
	const close = () => setIsOpen(false)

	const handleLogout = useCallback(() => {
		setUser(null)
		dispatch(logout(history))
	}, [dispatch, history])

	useEffect(() => {
		const token = user?.token

		if (token && decode(token).exp * 1000 < new Date().getTime()) handleLogout()
		setUser(getUser())
	}, [handleLogout, location, user?.token])

	return (
		<Flex
			flexGrow
			align="center"
			background={colorMode === "light" ? "white" : "gray.800"}
			h="70px"
			justify="space-between"
			paddingX="8"
			position="sticky"
			top="0"
			zIndex="3"
		>
			<Stack align="center" direction="row" spacing="4">
				<Heading
					as="h2"
					bgClip="text"
					bgGradient={CreateGradColor("primary", 300, 900, 50, 400)}
					fontSize="2xl"
					fontWeight="bold"
				>
					<Link to="/">Forito ✨</Link>
				</Heading>
			</Stack>

			<Stack align="center" direction="row" spacing="4">
				{user?.result ? (
					<Stack align="center" direction="row" spacing="8">
						{user?.result.name && (
							<Popover
								isLazy
								closeOnBlur={true}
								isOpen={isOpen}
								returnFocusOnClose={false}
								onClose={close}
								onOpen={open}
							>
								<PopoverTrigger>
									<Stack align="center" cursor="pointer" direction="row">
										<Image
											alt=""
											borderRadius="full"
											boxSize="30px"
											fallbackSrc="https://picsum.photos/30"
											loading="lazy"
											objectFit="cover"
											src={user?.result?.imageUrl}
										/>

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
									</Stack>
								</PopoverTrigger>
								<PopoverContent>
									<PopoverArrow />
									<PopoverCloseButton />
									<PopoverHeader>{user.result.name}</PopoverHeader>
									<PopoverBody cursor="pointer" fontWeight="bold">
										<Link to={`/creator/${user.result.name}`} onClick={close}>
											My Posts
										</Link>
									</PopoverBody>
									<PopoverBody cursor="pointer" fontWeight="bold">
										<Link to={`/saved`} onClick={close}>
											Saved Posts
										</Link>
									</PopoverBody>
								</PopoverContent>
							</Popover>
						)}

						<Button
							colorScheme="primary"
							size="sm"
							variant="outline"
							onClick={handleLogout}
						>
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
