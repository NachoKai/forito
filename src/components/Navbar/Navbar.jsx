import {
	Avatar,
	AvatarBadge,
	Button,
	Divider,
	Flex,
	Heading,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Stack,
	Text,
	useBoolean,
	useColorMode,
} from '@chakra-ui/react'
import decode from 'jwt-decode'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAuthStore } from '../../state/authStore'
import { CreateGradColor } from '../../theme.ts'
import { getUserLocalStorage } from '../../utils/getUserLocalStorage.ts'
import { Form } from '../Form/Form'
import { ColorPicker } from './ColorPicker'
import { SearchNavbar } from './SearchNavbar'

const Navbar = ({ isOpen, onOpen, onClose }) => {
	const navigate = useNavigate()
	const location = useLocation()
	const { logout } = useAuthStore()
	const [user, setUser] = useState(() => getUserLocalStorage())
	const userId = user?.result?.googleId || user?.result?._id
	const { colorMode, toggleColorMode } = useColorMode()
	const [isDropdownOpen, setIsDropdownOpen] = useBoolean()

	const handleLogout = useCallback(() => {
		setUser(null)
		logout(navigate)
	}, [logout, navigate])

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
			pos='sticky'
			px={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			top='0'
			zIndex='3'
		>
			<Stack align='center' direction='row' spacing='4'>
				<Heading
					as='h1'
					bgClip='text'
					bgGradient={CreateGradColor('primary', 300, 900, 50, 400)}
					fontSize={{ sm: '2xl', md: '2xl', lg: '3xl', xl: '3xl' }}
					fontWeight='bold'
				>
					<Link to='/'>Forito ✨</Link>
				</Heading>
			</Stack>

			<Stack align='center' direction='row' spacing='4'>
				<SearchNavbar />
				<Form isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
				{user?.result ? (
					<Stack
						align='center'
						direction='row'
						spacing={{ sm: '4', md: '8', lg: '8', xl: '8' }}
					>
						{Boolean(user?.result?.name) && (
							<Popover
								isLazy
								closeOnBlur={true}
								isOpen={isDropdownOpen}
								returnFocusOnClose={false}
								onClose={setIsDropdownOpen.off}
								onOpen={setIsDropdownOpen.toggle}
							>
								<PopoverTrigger>
									<Stack align='center' cursor='pointer' direction='row'>
										<Avatar
											name={user?.result.name}
											referrerPolicy='no-referrer'
											size='sm'
											src={user?.result?.imageUrl}
										>
											<AvatarBadge bg='green.500' boxSize='1em' />
										</Avatar>

										<Text
											data-cy='navbar-username'
											display={{ sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }}
										>
											{user?.result?.name}
										</Text>
									</Stack>
								</PopoverTrigger>
								<PopoverContent className='container'>
									<PopoverCloseButton />
									<PopoverHeader>{user?.result?.name}</PopoverHeader>
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
									<PopoverBody fontWeight='bold'>
										<Flex justify='space-between'>
											Theme color:
											<ColorPicker />
										</Flex>
									</PopoverBody>
									<Divider />
									<PopoverBody cursor='pointer' fontWeight='bold' onClick={handleLogout}>
										Logout
									</PopoverBody>
								</PopoverContent>
							</Popover>
						)}
					</Stack>
				) : (
					<Link to='auth'>
						<Button
							className='button'
							data-cy='navbar-login-button'
							size='sm'
							variant='solid'
						>
							Login
						</Button>
					</Link>
				)}

				<Button p='1' size='sm' variant='ghost' onClick={toggleColorMode}>
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

Navbar.propTypes = {
	isOpen: PropTypes.bool,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
}

export default Navbar
