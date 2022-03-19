import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaMoon, FaSun } from 'react-icons/fa'
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
} from '@chakra-ui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import decode from 'jwt-decode'

import { logout } from '../redux/auth'
import { getUserLocalStorage } from '../utils/getUserLocalStorage'
import { CreateGradColor } from '../theme'
import getUserId from '../utils/getUserId'

const Navbar = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const navigate = useNavigate()
	const [user, setUser] = useState(() => getUserLocalStorage())
	const userId = getUserId(user)
	const { colorMode, toggleColorMode } = useColorMode()
	const [isOpen, setIsOpen] = useState(false)

	const open = () => setIsOpen(!isOpen)
	const close = () => setIsOpen(false)

	const handleLogout = useCallback(() => {
		setUser(null)
		dispatch(logout(navigate))
	}, [dispatch, navigate])

	useEffect(() => {
		const token = user?.token

		if (token && decode(token).exp * 1000 < new Date().getTime()) handleLogout()
		setUser(getUserLocalStorage())
	}, [handleLogout, location, user?.token])

	return (
		<Flex
			flexGrow
			align='center'
			className={colorMode === 'light' ? 'glassmorphism-light' : 'glassmorphism-dark'}
			h='70px'
			justify='space-between'
			paddingX={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			position='sticky'
			top='0'
			zIndex='3'
		>
			<Stack align='center' direction='row' spacing='4'>
				<Heading
					as='h1'
					bgClip='text'
					bgGradient={CreateGradColor('primary', 300, 900, 50, 400)}
					fontSize={{ sm: 'xl', md: '2xl', lg: '2xl', xl: '3xl' }}
					fontWeight='bold'
				>
					<Link to='/'>Forito ✨</Link>
				</Heading>
			</Stack>

			<Stack align='center' direction='row' spacing='4'>
				{user?.result ? (
					<Stack
						align='center'
						direction='row'
						spacing={{ sm: '4', md: '8', lg: '8', xl: '8' }}
					>
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
									<Stack align='center' cursor='pointer' direction='row'>
										<Image
											alt={`${user?.result.name}'s profile picture`}
											border='1px'
											borderColor='primary'
											borderRadius='full'
											h='30px'
											objectFit='cover'
											src={
												user?.result?.imageUrl
													? user?.result?.imageUrl
													: `${process.env.PUBLIC_URL}/images/avatar.png`
											}
											w='30px'
										/>

										<Text
											isTruncated
											data-cy='navbar-username'
											display={{
												sm: 'none',
												md: 'flex',
												lg: 'flex',
												xl: 'flex',
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
									<Link to={`/creator/${userId}`} onClick={close}>
										<PopoverBody cursor='pointer' fontWeight='bold'>
											My Posts
										</PopoverBody>
									</Link>
									<Link to={`/saved/${userId}`} onClick={close}>
										<PopoverBody cursor='pointer' fontWeight='bold'>
											Saved Posts
										</PopoverBody>
									</Link>
								</PopoverContent>
							</Popover>
						)}

						<Button
							colorScheme='primary'
							data-cy='navbar-logout-button'
							size='sm'
							variant='outline'
							onClick={handleLogout}
						>
							Logout
						</Button>
					</Stack>
				) : (
					<Flex>
						<Link to='auth'>
							<Button
								boxShadow='blue'
								colorScheme='primary'
								data-cy='navbar-login-button'
								size='sm'
								variant='solid'
							>
								Login
							</Button>
						</Link>
					</Flex>
				)}

				<Button
					colorScheme='primary'
					size='sm'
					variant='outline'
					onClick={toggleColorMode}
				>
					{colorMode === 'light' ? (
						<FaMoon aria-label='Dark Mode' />
					) : (
						<FaSun aria-label='Light Mode' />
					)}
				</Button>
			</Stack>
		</Flex>
	)
}

export default Navbar
