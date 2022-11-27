import {
	Avatar,
	AvatarBadge,
	Button,
	Divider,
	Flex,
	HStack,
	Heading,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Text,
	useBoolean,
	useColorMode,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { useUser } from '../../hooks/useUser'
import { CreateGradColor } from '../../theme'
import { Form } from '../Form/Form'
import { ColorPicker } from './ColorPicker'
import { SearchNavbar } from './SearchNavbar'

const Navbar = ({ isOpen, onOpen, onClose }) => {
	const { user, handleLogout } = useUser()
	const userId = user?.result?.googleId || user?.result?._id
	const { colorMode, toggleColorMode } = useColorMode()
	const [isDropdownOpen, setIsDropdownOpen] = useBoolean()

	return (
		<Flex
			align='center'
			className={colorMode === 'light' ? 'glassmorphism-light' : 'glassmorphism-dark'}
			flexGrow='1'
			h='70px'
			justify='space-between'
			pos='sticky'
			px={{ sm: '6', md: '8', lg: '8', xl: '8' }}
			top='0'
			zIndex='3'
		>
			<HStack align='center' spacing='4'>
				<Heading
					as='h1'
					bgClip='text'
					bgGradient={CreateGradColor('primary', 300, 900, 50, 400)}
					fontSize={{ sm: '2xl', md: '2xl', lg: '3xl', xl: '3xl' }}
					fontWeight='bold'
				>
					<Link to='/'>Forito ✨</Link>
				</Heading>
			</HStack>

			<HStack align='center' spacing='4'>
				<SearchNavbar />
				<Form isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
				{user?.result ? (
					<HStack align='center' spacing={{ sm: '4', md: '8', lg: '8', xl: '8' }}>
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
									<HStack align='center' as='button' cursor='pointer'>
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
									</HStack>
								</PopoverTrigger>
								<PopoverContent className='container'>
									<PopoverCloseButton />
									<PopoverHeader>{user?.result?.name}</PopoverHeader>
									<PopoverBody fontWeight='bold'>
										<Flex justify='space-between'>
											Theme color:
											<ColorPicker />
										</Flex>
									</PopoverBody>
									<Link to={`/creator/${userId}`} onClick={setIsDropdownOpen.off}>
										<PopoverBody cursor='pointer' fontWeight='bold'>
											My Posts
										</PopoverBody>
									</Link>
									<Link to={`/saved/${userId}`} onClick={setIsDropdownOpen.off}>
										<PopoverBody cursor='pointer' fontWeight='bold'>
											Saved Posts
										</PopoverBody>
									</Link>
									<Link to={`/settings/${userId}`} onClick={setIsDropdownOpen.off}>
										<PopoverBody cursor='pointer' fontWeight='bold'>
											Settings
										</PopoverBody>
									</Link>
									<Divider />
									<PopoverBody cursor='pointer' fontWeight='bold' onClick={handleLogout}>
										Logout
									</PopoverBody>
								</PopoverContent>
							</Popover>
						)}
					</HStack>
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
			</HStack>
		</Flex>
	)
}

Navbar.propTypes = {
	isOpen: PropTypes.bool,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
}

export default Navbar
